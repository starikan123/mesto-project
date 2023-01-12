"use strict";

import { openPopup, closePopup } from "./modal.js";
import { deleteCard, putLike, deleteLike, postNewCard } from "./api.js";
import { switchLoadingMesg } from "./utils.js";
import { elements } from "./../index.js";
export const popupImage = document.querySelector(".profile__avatar");
export const popupAdd = document.querySelector(".popup_card-add");
const popupZoom = document.querySelector(".popup_image-zoom");
const cardTemplate = document.querySelector("#card-template").content;
const popupCaption = document.querySelector(".popup__caption");
const formElementAdd = document.querySelector("#popupProfileAddButton");
const descriptionAddForm = popupAdd.querySelector(
  ".popup__form-field[name=placeName-input]"
);
const linkAddForm = popupAdd.querySelector(
  ".popup__form-field[name=placeUrl-input]"
);
export function renderInitialCards(container, json, myId) {
  const seenIds = new Set();
  json.forEach((card) => {
    if (!seenIds.has(card["_id"])) {
      seenIds.add(card["_id"]);
      container.prepend(
        addCard(
          card.name,
          card.link,
          card["owner"]["_id"],
          myId,
          card["likes"],
          card["_id"]
        )
      );
    }
  });
}

function hasMyLike(myId, likes) {
  const matchingLikes = likes.filter((obj) => {
    return obj["_id"] == myId;
  });
  return matchingLikes.length === 1;
}

export function addCard(name, link, OWNERID, myId, likes, cardId) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const likeButton = cardElement.querySelector(".element__like-button");
  const likesCounter = cardElement.querySelector(".element__like-counter");
  likesCounter.textContent = likes.length;
  if (hasMyLike(myId, likes)) {
    likeButton.classList.add("element__like-button_active");
  }
  likeButton.addEventListener("click", (evt) => {
    if (hasMyLike(myId, likes)) {
      deleteLike(cardId)
        .then((updatedCard) => {
          likesCounter.textContent = updatedCard["likes"].length;
          evt.target.classList.toggle("element__like-button_active");
          likes = updatedCard["likes"];
        })
        .catch((error) => {
          console.log(`Что-то пошло не так. Ошбика: ${error}`);
        });
    } else {
      putLike(cardId)
        .then((updatedCard) => {
          likesCounter.textContent = updatedCard["likes"].length;
          evt.target.classList.toggle("element__like-button_active");
          likes = updatedCard["likes"];
        })
        .catch((error) => {
          console.log(`Что-то пошло не так. Ошбика: ${error}`);
        });
    }
  });

  const deleteBtn = cardElement.querySelector(".element__delete-button");
  if (myId == OWNERID) {
    deleteBtn.addEventListener("click", function () {
      const newCard = deleteBtn.closest(".element");
      deleteCard(cardId)
        .then(() => newCard.remove())
        .catch((err) => {
          console.log(`Что-то пошло не так. Ошбика: ${err}`);
        });
    });
  } else {
    deleteBtn.remove();
  }

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
  evt.preventDefault();
  switchLoadingMesg(evt.submitter, true);
  postNewCard(descriptionAddForm.value, linkAddForm.value)
    .then((json) => {
      elements.prepend(
        addCard(
          json["name"],
          json["link"],
          json["owner"]["_id"],
          json["owner"]["_id"],
          json["likes"],
          json["_id"]
        )
      );
      closePopup(popupAdd);
      formElementAdd.reset();
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
