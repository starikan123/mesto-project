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

function openPopupEdit() {
  popupEdit.style.visibility = "visible";
  popupEdit.style.opacity = "1";
}
function closePopupEdit() {
  popupEdit.style.visibility = "hidden";
  popupEdit.style.opacity = "0";
}
function openPopupAdd() {
  popupAdd.style.visibility = "visible";
  popupAdd.style.opacity = "1";
}
function closePopupAdd() {
  popupAdd.style.visibility = "hidden";
  popupAdd.style.opacity = "0";
}
function closePopupZoom() {
  popupZoom.style.visibility = "hidden";
  popupZoom.style.opacity = "0";
}
const formElementEdit = popup.querySelector("#popupProfileEditForm");
const nameInput = document.getElementById("profile__name-input");
const jobInput = document.getElementById("profile__description-input");
const inputName = document.getElementById("profile__name");
const inputDescription = document.getElementById("profile__description");
function formSubmitHandler(evt) {
  evt.preventDefault();
  inputName.innerText = nameInput.value;
  inputDescription.innerText = jobInput.value;

  nameInput.value = "";
  jobInput.value = "";
}

const formElementAdd = document.getElementById("popupProfileAddButton");
const placeNameInput = document.getElementById("placeName-input");
const placeUrlInput = document.getElementById("placeUrl-input");

const elementLikeButtonActive = document.querySelectorAll(
  ".element__like-button"
);
function likeEvenetListenerAdd(element) {
  element.addEventListener("click", function (evt) {
    evt.target.classList.toggle("element__like-button_active");
  });
}
for (let i = 0; i < elementLikeButtonActive.length; i++) {
  likeEvenetListenerAdd(elementLikeButtonActive[i]);
}

const elementRemoveButton = document.querySelectorAll(
  ".element__delete-button"
);

function deleteEventListenerAdd(element) {
  element.addEventListener("click", function () {
    const elementItem = element.closest(".element");
    elementItem.remove();
  });
}
for (let i = 0; i < elementRemoveButton.length; i++) {
  deleteEventListenerAdd(elementRemoveButton[i]);
}

const images = document.querySelectorAll(".element__image");

function imageLarge(element, text) {
  element.addEventListener("click", function (evt) {
    popupZoom.style.visibility = "visible";
    popupZoom.style.opacity = "1";
    const popupImage = document.querySelector(".popup__image");
    popupImage.src = evt.target.src;
    const popupCaption = document.querySelector(".popup__caption");
    popupCaption.textContent = text;
  });
}

for (let i = 0; i < images.length; i++) {
  imageLarge(images[i]);
}

const cardElementLoad = document
  .querySelector("#card-template")
  .cloneNode(true);
function loadCards() {
  initialCards.forEach((card) =>
    cardElementLoad.prepend(createElementNew(card.name, card.link))
  );
}
loadCards();
formElementEdit.addEventListener("submit", formSubmitHandler);
formElementAdd.addEventListener("submit", formSubmitHandlerAdd);
profileEditButton.addEventListener("click", openPopupEdit);
popupCloseButtonEdit.addEventListener("click", closePopupEdit);
profileAddButton.addEventListener("click", openPopupAdd);
popupCloseButtonAdd.addEventListener("click", closePopupAdd);
popupZoom.addEventListener("click", closePopupZoom);

function createElementNew(name, link) {
  const article = document.createElement("article");
  article.classList.add("element");

  const image = document.createElement("img");
  image.classList.add("element__image");
  image.src = link;

  article.appendChild(image);

  const elementDescription = document.createElement("div");
  elementDescription.classList.add("element__description");

  const elementInfo = document.createElement("h2");
  elementInfo.classList.add("element__info");
  elementInfo.textContent = name;
  elementDescription.appendChild(elementInfo);

  const elementLikeBtn = document.createElement("button");
  elementLikeBtn.classList.add("element__like-button");
  elementLikeBtn.setAttribute("type", "button");
  elementDescription.appendChild(elementLikeBtn);

  article.appendChild(elementDescription);

  const elementDeleteBtn = document.createElement("button");
  elementDeleteBtn.classList.add("element__delete-button");
  article.appendChild(elementDeleteBtn);

  const elements = document.querySelector(".elements");
  elements.appendChild(article);

  likeEvenetListenerAdd(elementLikeBtn);

  deleteEventListenerAdd(elementDeleteBtn);

  imageLarge(image, elementInfo.textContent);
}

const addCardSubmitBtn = document.getElementById("addCardSubmitBtn");
function formSubmitHandlerAdd(evt) {
  evt.preventDefault();

  createElementNew(placeNameInput.value, placeUrlInput.value);
  closePopupAdd();
}
addCardSubmitBtn.addEventListener("submit", formSubmitHandlerAdd);
