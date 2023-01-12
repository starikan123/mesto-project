export const popupImage = document.querySelector(".profile__avatar");
export const popupAdd = document.querySelector(".popup_card-add");

export function openPopup(clickedPopup) {
  clickedPopup.classList.add("popup__opened");
  document.addEventListener("keydown", escHandler);
}

export function closePopup(clickedPopup) {
  clickedPopup.classList.remove("popup__opened");
  document.removeEventListener("keydown", escHandler);
}

export function escHandler(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__opened");
    closePopup(openedPopup);
  }
}
