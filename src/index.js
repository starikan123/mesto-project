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
} from "./components/api.js";
import {
  updateUserInformation,
  switchLoadingMesg,
} from "./components/utils.js";
import { renderInitialCards } from "./components/card.js";
import { enableValidation } from "./components/validate.js";
import { elements, enableValidationConstants } from "./components/constants.js";
const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_profile-edit");
const popupChange = document.querySelector("#avatar-change");
const popupChangeForm = document.querySelector(".popup_form_layout");
const allPopup = Array.from(document.querySelectorAll(".popup"));
const profileAddButton = profile.querySelector(".profile__add-button");
const formElementEdit = document.querySelector("#popupProfileEditForm");
const nameInput = document.querySelector("#profile__name-input");
const jobInput = document.querySelector("#profile__description-input");
const inputName = document.querySelector("#profile__name");
const inputDescription = document.querySelector("#profile__description");
const placeNameInput = document.querySelector("#placeName-input");
const placeUrlInput = document.querySelector("#placeUrl-input");
const avatarChangeBtn = document.querySelector(
  ".profile__avatar-change-button"
);
const avatarImage = document.querySelector(".profile__avatar");
const popupAvatarChange = document.querySelector("#avatar-change");
const avatarChangeInput = popupChangeForm.querySelector(
  ".popup__form-field[name=placeAvatar-change-input]"
);

const addCardSubmitBtn = document.querySelector("#addCardSubmitBtn");
const closeButtons = document.querySelectorAll(".popup__close-button");

getUserInformation().then((data) => {
  updateUserInformation(popupImage, inputName, inputDescription, data);
  const myId = data["_id"];
  getInitialCards()
    .then((json) => {
      renderInitialCards(elements, json, myId);
    })
    .catch((err) => {
      console.log(`Что-то пошло не так. Ошбика: ${err}`);
    });
});
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

enableValidation(enableValidationConstants);
