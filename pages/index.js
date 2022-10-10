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
const popup = document.querySelector(".popup");
const popupCloseButtonEdit = document.querySelector("#closePopupEdit");
const profileAddButton = profile.querySelector(".profile__add-button");
const popupCloseButtonAdd = document.querySelector("#closePopupAdd");
const elements = document.querySelector(".elements");
const cardTemplate = document.querySelector("#card-template").content;
const formElementEdit = popup.querySelector("#popupProfileEditForm");
const nameInput = document.querySelector("#profile__name-input");
const jobInput = document.querySelector("#profile__description-input");
const inputName = document.querySelector("#profile__name");
const inputDescription = document.querySelector("#profile__description");
const formElementAdd = document.querySelector("#popupProfileAddButton");
const placeNameInput = document.querySelector("#placeName-input");
const placeUrlInput = document.querySelector("#placeUrl-input");
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

const addCardSubmitBtn = document.querySelector("#addCardSubmitBtn");
function loadCards() {
  initialCards.forEach((card) =>
    elements.prepend(addCard(card.name, card.link))
  );
}
loadCards();

function openPopup(clickedPopup) {
  clickedPopup.classList.add("popup__opened");
}

function closePopup(clickedPopup) {
  clickedPopup.classList.remove("popup__opened");
}
profileEditButton.addEventListener("click", function () {
  openPopup(popupEdit);
});
profileEditButton.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInput.value = inputName.innerText;
  jobInput.value = inputDescription.innerText;
});
popupProfileEditForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  inputName.innerText = nameInput.value;
  inputDescription.innerText = jobInput.value;
  nameInput.value = "";
  jobInput.value = "";
  closePopup(popupEdit);
});

popupCloseButtonEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});
profileAddButton.addEventListener("click", function () {
  openPopup(popupAdd);
});
popupCloseButtonAdd.addEventListener("click", function () {
  closePopup(popupAdd);
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
  imgZoomClose.addEventListener("click", function () {
    closePopup(popupZoom);
  });

  cardElement.querySelector(".element__info").textContent = name;
  image.src = link;
  image.setAttribute("alt", `Фото ${name}`);
  return cardElement;
}
formElementAdd.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const descriptionAddForm = popupAdd.querySelector(
    ".popup__form-field[name=placeName-input]"
  );
  const linkAddForm = popupAdd.querySelector(
    ".popup__form-field[name=placeUrl-input]"
  );
  elements.prepend(addCard(descriptionAddForm.value, linkAddForm.value));
  closePopup(popupAdd);
  addElementForm.reset();
});
