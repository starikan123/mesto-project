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
  postNewCard,
} from "./components/api.js";
import {
  updateUserInformation,
  switchLoadingMesg,
} from "./components/utils.js";
import {
  popupPicture,
  popupCaption,
  changeLike,
  createInitialCard,
} from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import {
  elements,
  profileEditButton,
  popupEdit,
  popupChange,
  profileAdd,
  popupCardAdd,
  popupChangeForm,
  allPopup,
  profile,
  profileAddButton,
  nameInput,
  jobInput,
  inputName,
  inputDescription,
  placeNameInput,
  placeUrlInput,
  avatarChangeBtn,
  popupZoom,
  avatarImage,
  popupAvatarChange,
  avatarChangeInput,
  addCardSubmitBtn,
  closeButtons,
} from "./components/constants.js";

Promise.all([getUserInformation(), getInitialCards()])
  .then(([me, cards]) => {
    profile.id = me._id;
    inputName.textContent = me.name;
    inputDescription.textContent = me.about;
    avatarImage.src = me.avatar;

    cards.forEach((card) => {
      elements.appendChild(createInitialCard(card, profile));
    });
  })
  .catch((err) => {
    console.error(err);
  });

export async function bringNewCard(evt) {
  evt.preventDefault();
  try {
    addCardSubmitBtn.textContent = "Создание...";
    const card = await postNewCard(placeNameInput.value, placeUrlInput.value);
    profileAdd.reset();

    elements.prepend(createInitialCard(card, profile));
    closePopup(popupCardAdd);
  } catch (err) {
    console.error(err);
  } finally {
    addCardSubmitBtn.textContent = "Создать";
  }
}

profileAdd.addEventListener("submit", bringNewCard);
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

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-field",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_notActive",
  inputErrorClass: "popup__form-field_type_error",
  errorClass: "popup__eror-masage_active",
};
enableValidation(config);
