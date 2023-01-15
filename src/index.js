"use strict";

import "./index.css";
import {
  openPopup,
  closePopup,
  escHandler,
  popupImage,
  popupAdd,
} from "./components/modal.js";
import {
  getInitialCards,
  getUserInformation,
  editProfileInfo,
  postAvatar,
  putLike,
  deleteLike,
} from "./components/api.js";
import {
  updateUserInformation,
  switchLoadingMesg,
} from "./components/utils.js";
import {
  addCard,
  popupPicture,
  popupCaption,
  changeLike,
  createInitialCard,
} from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import { elements } from "./components/constants.js";
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_profile-edit");
const popupChange = document.querySelector("#avatar-change");
const profileAdd = document.querySelector("#popupProfileAddButton");
const popupCardAdd = document.querySelector(".popup_card-add");
const popupChangeForm = document.querySelector(".popup_form_layout");
const allPopup = Array.from(document.querySelectorAll(".popup"));
const profileAddButton = profile.querySelector(".profile__add-button");
const formElementEdit = document.querySelector("#popupProfileEditForm");
const formElementAdd = document.querySelector("#popupProfileAddButton");
const nameInput = document.querySelector("#profile__name-input");
const jobInput = document.querySelector("#profile__description-input");
const inputName = document.querySelector("#profile__name");
const inputDescription = document.querySelector("#profile__description");
const placeNameInput = document.querySelector("#placeName-input");
const placeUrlInput = document.querySelector("#placeUrl-input");
const avatarChangeBtn = document.querySelector(
  ".profile__avatar-change-button"
);
const popupZoom = document.querySelector(".popup_image-zoom");
const avatarImage = document.querySelector(".profile__avatar");
const popupAvatarChange = document.querySelector("#avatar-change");
const avatarChangeInput = popupChangeForm.querySelector(
  ".popup__form-field[name=placeAvatar-change-input]"
);

const addCardSubmitBtn = document.querySelector("#addCardSubmitBtn");
const closeButtons = document.querySelectorAll(".popup__close-button");

Promise.all([getUserInformation(), getInitialCards()])
  .then(([me, cards]) => {
    profile.id = me._id;
    inputName.textContent = me.name;
    inputDescription.textContent = me.about;
    avatarImage.src = me.avatarImage;

    cards.forEach((card) => {
      const initialCard = createInitialCard(card, profile);
      elements.append(initialCard);
    });
  })
  .catch((err) => {
    console.error(err);
  });

export function bringNewCard(evt) {
  evt.preventDefault();

  addCardSubmitBtn.textContent = "Создание...";
  postNewCard(placeNameInput.value, placeUrlInput.value)
    .then((card) => {
      profileAdd.reset();
      elements.prepend(createInitialCard(card, profile));
      closePopup(popupCardAdd);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      addCardSubmitBtn.textContent = "Создать";
    });
}

// function renderInitialCards(container, json, myId) {
//   const seenIds = new Set();
//   json.forEach((card) => {
//     if (!seenIds.has(card["_id"])) {
//       seenIds.add(card["_id"]);
//       container.prepend(
//         addCard(
//           card.name,
//           card.link,
//           card["owner"]["_id"],
//           myId,
//           card["likes"],
//           card["_id"],
//           handleLikeCard
//         )
//       );
//     }
//   });
// }
export function handleLikeCard(initialCard, card, profile) {
  putLike(card._id)
    .then((data) => {
      changeLike(initialCard, data.likes, profile);
    })
    .catch((err) => {
      console.error(err);
    });
}
export function handleDislikeCard(initialCard, card, profile) {
  deleteLike(card._id)
    .then((data) => {
      changeLike(initialCard, data.likes, profile);
    })
    .catch((err) => {
      console.error(err);
    });
}
export function openPopupZoom(cardImage, cardInfo) {
  popupPicture.src = cardImage.src;
  popupPicture.alt = cardImage.alt;
  popupCaption.textContent = cardInfo.textContent;
  openPopup(popupZoom);
}
// getUserInformation().then((data) => {
//   updateUserInformation(popupImage, inputName, inputDescription, data);
//   const myId = data["_id"];
//   getInitialCards()
//     .then((json) => {
//       renderInitialCards(elements, json, myId);
//     })
//     .catch((err) => {
//       console.log(`Что-то пошло не так. Ошбика: ${err}`);
//     });
// });
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

profileEditButton.addEventListener("click", function () {
  openPopup(popupEdit);
});
allPopup.forEach((popup) => {
  addEventListener("mousedown", function (evt) {
    if (evt.target.classList.contains("popup__opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});
profileEditButton.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInput.value = inputName.innerText;
  jobInput.value = inputDescription.innerText;
});
popupProfileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  switchLoadingMesg(evt.submitter, true);
  editProfileInfo(nameInput.value, jobInput.value)
    .then((json) => {
      updateUserInformation(popupImage, inputName, inputDescription, json);
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
    .finally(() => {
      setTimeout(() => {
        switchLoadingMesg(evt.submitter, false);
      }, 300);
    });
});
profileAddButton.addEventListener("click", function () {
  openPopup(popupAdd);
});
avatarChangeBtn.addEventListener("click", function () {
  openPopup(popupChange);
});
popupAvatarChange.addEventListener("submit", (evt) => {
  evt.preventDefault();
  switchLoadingMesg(evt.submitter, true);
  postAvatar(avatarChangeInput.value)
    .then((json) => {
      updateUserInformation(popupImage, inputName, inputDescription, json);
      closePopup(popupChange);
      evt.target.reset();
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    })
    .finally(() => {
      setTimeout(() => {
        switchLoadingMesg(evt.submitter, false);
      }, 300);
    });
});

// formElementAdd.addEventListener("submit", function (evt) {
//   evt.preventDefault();
//   switchLoadingMesg(evt.submitter, true);
//   postNewCard(descriptionAddForm.value, linkAddForm.value)
//     .then((json) => {
//       elements.prepend(
//         addCard(
//           json["name"],
//           json["link"],
//           json["owner"]["_id"],
//           json["owner"]["_id"],
//           json["likes"],
//           json["_id"]
//         )
//       );
//       closePopup(popupAdd);
//       formElementAdd.reset();
//     })
//     .catch((err) => {
//       console.log(`Что-то пошло не так. Ошбика: ${err}`);
//     })
//     .finally(() => {
//       setTimeout(() => {
//         switchLoadingMesg(evt.submitter, false);
//       }, 300);
//     });
// });
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-field",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_notActive",
  inputErrorClass: "popup__eror-masage",
  errorClass: "popup__eror-masage_active",
};
enableValidation(config);
