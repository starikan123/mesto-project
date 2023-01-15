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

function hasMyLike(myId, likes) {
  const matchingLikes = likes.filter((obj) => {
    return obj["_id"] == myId;
  });
  return matchingLikes.length === 1;
}

export function changeLike(initialCard, likeCount, me) {
  const likeButton = initialCard.querySelector(".element__like-button");
  const likesCounter = initialCard.querySelector(".element__like-counter");
  if (likeCount.length !== 0) {
    likeCount.forEach((user) => {
      if (user._id === me.id) {
        likeButton.classList.add("element__like-button_active");
      } else {
        likeButton.classList.add("element__like-button_active");
      }
    });
  } else {
    likeButton.classList.remove("element__like-button_active");
  }
  likesCounter.textContent = likeCount.length;
}

export function createInitialCard(card, me) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  const cardInfo = cardElement.querySelector(".element__info");
  const cardImage = cardElement.querySelector(".element__image");
  const likeButton = cardElement.querySelector(".element__like-button");
  const deleteBtn = cardElement.querySelector(".element__delete-button");
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardInfo.textContent = card.name;
  cardImage.addEventListener("click", () => {
    popupPicture.src = cardImage.src;
    popupPicture.alt = cardInfo.textContent;
    popupCaption.textContent = cardInfo.textContent;
    openPopupZoom(cardImage, cardInfo);
  });

  likeButton.addEventListener("click", () => {
    if (!likeButton.classList.contains("element__like-button_active")) {
      handleLikeCard(cardElement, card, me);
    } else {
      handleDislikeCard(cardElement, card, me);
    }
  });
  changeLike(cardElement, card.likes, me);

  if (me.id === card.owner._id) {
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

// export function addCard(
//   name,
//   link,
//   OWNERID,
//   myId,
//   likes,
//   cardId,
//   hundleLikeCard
// ) {
//   const cardElement = cardTemplate.querySelector(".element").cloneNode(true);

//   likesCounter.textContent = likes.length;
//   if (hasMyLike(myId, likes)) {
//   }
//   likeButton.addEventListener("click", (evt) => {
//     if (hasMyLike(myId, likes)) {
//       deleteLike(cardId)
//         .then((updatedCard) => {
//           likesCounter.textContent = updatedCard["likes"].length;
//           evt.target.classList.toggle("element__like-button_active");
//           likes = updatedCard["likes"];
//         })
//         .catch((error) => {
//           console.log(`Что-то пошло не так. Ошбика: ${error}`);
//         });
//     } else {
//       putLike(cardId)
//         .then((updatedCard) => {
//           likesCounter.textContent = updatedCard["likes"].length;
//           evt.target.classList.toggle("element__like-button_active");
//           likes = updatedCard["likes"];
//         })
//         .catch((error) => {
//           console.log(`Что-то пошло не так. Ошбика: ${error}`);
//         });
//     }
//   });

//   const deleteBtn = cardElement.querySelector(".element__delete-button");
//   if (myId == OWNERID) {
//     deleteBtn.addEventListener("click", function () {
//       const newCard = deleteBtn.closest(".element");
//       deleteCard(cardId)
//         .then(() => newCard.remove())
//         .catch((err) => {
//           console.log(`Что-то пошло не так. Ошбика: ${err}`);
//         });
//     });
//   } else {
//     deleteBtn.remove();
//   }

//   const image = cardElement.querySelector(".element__image");
//   image.addEventListener("click", function () {
//     openPopup(popupZoom);
//     popupPicture.src = link;
//     popupPicture.alt = `Фото ${name}`;
//     popupCaption.textContent = name;
//   });

//   cardElement.querySelector(".element__info").textContent = name;
//   image.src = link;
//   image.setAttribute("alt", `Фото ${name}`);
//   return cardElement;
// }
