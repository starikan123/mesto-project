"use strict";

import "./index.css";
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const profile = document.querySelector(".profile");
const profileEditButton = profile.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_profile-edit");
const popupAdd = document.querySelector(".popup_card-add");
const popupZoom = document.querySelector(".popup_image-zoom");
const popupChange = document.querySelector("#avatar-change");
const popupChangeForm = document.querySelector(".popup_form_layout");
const popup = document.querySelector(".popup");
const allPopup = Array.from(document.querySelectorAll(".popup"));
const popupCloseButtonEdit = document.querySelector("#closePopupEdit");
const profileAddButton = profile.querySelector(".profile__add-button");
const popupCloseButtonAdd = document.querySelector("#closePopupAdd");
const elements = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const formElementEdit = document.querySelector("#popupProfileEditForm");
const nameInput = document.querySelector("#profile__name-input");
const jobInput = document.querySelector("#profile__description-input");
const inputName = document.querySelector("#profile__name");
const inputDescription = document.querySelector("#profile__description");
const formElementAdd = document.querySelector("#popupProfileAddButton");
const placeNameInput = document.querySelector("#placeName-input");
const placeUrlInput = document.querySelector("#placeUrl-input");
const popupButton = document.querySelectorAll(".popup__button");
const avatarChangeBtn = document.querySelector(
  ".profile__avatar-change-button"
);
const profileAvatar = document.querySelector(".profile__avatar");
const popupAvatarChange = document.querySelector("#avatar-change");
const avatarchangeForm = document.forms["user-avatar"];
const avatarChangeInput = popupChangeForm.querySelector(
  ".popup__form-field[name=placeAvatar-change-input]"
);
const images = document.querySelectorAll(".element__image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const imgZoomClose = document.querySelector("#closePopupImgZoom");
const elementLikeButtonActive = document.querySelectorAll(
  ".element__like-button"
);
const elementRemoveButton = document.querySelectorAll(
  ".element__delete-button"
);
const descriptionAddForm = popupAdd.querySelector(
  ".popup__form-field[name=placeName-input]"
);
const linkAddForm = popupAdd.querySelector(
  ".popup__form-field[name=placeUrl-input]"
);

const addCardSubmitBtn = document.querySelector("#addCardSubmitBtn");
const closeButtons = document.querySelectorAll(".popup__close-button");

function showInputError(form, input, errorMessage) {
  const error = form.querySelector(`.${input.id}-error`);
  error.classList.add("popup__eror-masage");
  if (input.value === "") {
    error.textContent = "Вы пропустили это поле";
  } else {
    error.textContent = errorMessage;
  }
  error.classList.add("popup__eror-masage_active");
}

function hideInputError(form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  error.classList.remove("popup__eror-masage");
  error.textContent = "";
  error.classList.remove("popup__eror-masage_active");
  input.classList.remove("popup__form-field_type_error");
}

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
}

function hasInvalidInput(inputs) {
  return Array.prototype.some.call(inputs, function (input) {
    return input.validity.valid === false;
  });
}

function toggleSubmitButtonState(form, buttonSelector, inactiveClass) {
  const button = form.querySelector(buttonSelector);
  if (hasInvalidInput(form)) {
    button.classList.add(inactiveClass);
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove(inactiveClass);
    button.removeAttribute("disabled");
  }
}

function setEventListeners(form, inputSelector, buttonSelector, inactiveClass) {
  const inputs = Array.from(form.querySelectorAll(".popup__form-field"));
  const button = form.querySelector(buttonSelector);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      toggleSubmitButtonState(form, buttonSelector, inactiveClass);
      checkInputValidity(form, input);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    form.setAttribute("novalidate", true);

    setEventListeners(
      form,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass
    );
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-field",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_notActive",
  inputErrorClass: "popup__eror-masage",
  errorClass: "popup__eror-masage_active",
});

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});
function loadCards() {
  initialCards.forEach((card) =>
    elements.prepend(addCard(card.name, card.link))
  );
}
loadCards();
function openPopup(clickedPopup) {
  clickedPopup.classList.add("popup__opened");
}
function escHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__opened");
    closePopup(openedPopup);
  }
}
function closePopup(clickedPopup) {
  clickedPopup.classList.remove("popup__opened");
  document.removeEventListener("keydown", escHandler);
}
document.addEventListener("keyup", escHandler);
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
popupProfileEditForm.addEventListener("submit", function () {
  inputName.innerText = nameInput.value;
  inputDescription.innerText = jobInput.value;
  closePopup(popupEdit);
});
profileAddButton.addEventListener("click", function () {
  openPopup(popupAdd);
});
avatarChangeBtn.addEventListener("click", function () {
  openPopup(popupChange);
});

function addCard(name, link) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__like-button_active");
    });
  const deleteBtn = cardElement.querySelector(".element__delete-button");
  deleteBtn.addEventListener("click", function () {
    const card = deleteBtn.closest(".element");
    card.remove();
  });
  const image = cardElement.querySelector(".element__image");
  image.addEventListener("click", function () {
    openPopup(popupZoom);
    popupImage.src = link;
    popupImage.alt = `Фото ${name}`;
    popupCaption.textContent = name;
  });

  cardElement.querySelector(".element__info").textContent = name;
  image.src = link;
  image.setAttribute("alt", `Фото ${name}`);
  return cardElement;
}
formElementAdd.addEventListener("submit", function (evt) {
  elements.prepend(addCard(descriptionAddForm.value, linkAddForm.value));
  closePopup(popupAdd);
  formElementAdd.reset();
});
