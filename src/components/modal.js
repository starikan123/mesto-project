export function openPopup(clickedPopup) {
  clickedPopup.classList.add("popup__opened");
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
