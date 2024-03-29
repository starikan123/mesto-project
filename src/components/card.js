"use strict";

import { openPopup, closePopup, popupImage, popupAdd } from "./modal.js";
import { deleteCard, putLike, deleteLike, postNewCard } from "./api.js";
import { switchLoadingMesg } from "./utils.js";
import { elements } from "./constants.js";
import { openPopupZoom, handleLikeCard, handleDislikeCard } from "../index.js";

export const popupPicture = document.querySelector(".popup__image");
export const popupCaption = document.querySelector(".popup__caption");
const popupZoom = document.querySelector(".popup_image-zoom");
const cardTemplate = document.querySelector("#card-template").content;

const descriptionAddForm = popupAdd.querySelector(
  ".popup__form-field[name=placeName-input]"
);
const linkAddForm = popupAdd.querySelector(
  ".popup__form-field[name=placeUrl-input]"
);

export function changeLike(initialCard, likeCount, userId) {
  const likeButton = initialCard.querySelector(".element__like-button");
  const likesCounter = initialCard.querySelector(".element__like-counter");
  if (likeCount.length !== 0) {
    if (likeCount.some((user) => user._id === userId)) {
      likeButton.classList.add("element__like-button_active");
    } else {
      likeButton.classList.remove("element__like-button_active");
    }
  } else {
    likeButton.classList.remove("element__like-button_active");
  }
  likesCounter.textContent = likeCount.length;
}

export function createInitialCard(card, userId) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardInfo = cardElement.querySelector(".element__info");
  const cardImage = cardElement.querySelector(".element__image");
  const likeButton = cardElement.querySelector(".element__like-button");
  const deleteBtn = cardElement.querySelector(".element__delete-button");
  const likesCounter = cardElement.querySelector(".element__like-counter");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardInfo.textContent = card.name;
  likesCounter.textContent = card.likes.length;

  cardImage.addEventListener("click", () => {
    popupPicture.src = cardImage.src;
    popupPicture.alt = cardInfo.textContent;
    popupCaption.textContent = cardInfo.textContent;
    openPopupZoom(cardImage, cardInfo);
  });

  likeButton.addEventListener("click", () => {
    if (!likeButton.classList.contains("element__like-button_active")) {
      handleLikeCard(cardElement, card, userId);
    } else {
      handleDislikeCard(cardElement, card, userId);
    }
  });

  card.likes.forEach((user) => {
    if (user._id === userId) {
      likeButton.classList.add("element__like-button_active");
    }
  });

  if (userId === card.owner._id) {
    deleteBtn.classList.add("element__delete-button_active");
    deleteBtn.addEventListener("click", function () {
      const newCard = deleteBtn.closest(".element");
      deleteCard(card._id)
        .then(() => newCard.remove())
        .catch((err) => {
          console.log(`Что-то пошло не так. Ошбика: ${err}`);
        });
    });
  } else {
    deleteBtn.remove();
  }

  cardElement.dataset.id = card._id;
  return cardElement;
}
