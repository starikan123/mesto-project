import { enableValidationConstants } from "./constants.js";

function showInputError(form, input, errorMessage) {
  const error = form.querySelector(`.${input.id}-error`);
  error.classList.add(enableValidationConstants.inputErrorClass);
  if (input.value === "") {
    error.textContent = "Вы пропустили это поле";
  } else {
    error.textContent = errorMessage;
  }
  error.classList.add(enableValidationConstants.errorClass);
}

function hideInputError(form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  error.classList.add(enableValidationConstants.inputErrorClass);
  error.textContent = "";
  error.classList.add(enableValidationConstants.errorClass);
  input.classList.remove(enableValidationConstants.inputErrorClass);
}

function checkInputValidity(form, input) {
  if (!input.validity.valid && input.value !== "") {
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
  const inputs = form.querySelectorAll(enableValidationConstants.inputSelector);
  const button = form.querySelector(buttonSelector);
  let isInputEmpty = false;
  inputs.forEach((input) => {
    if (input.value === "") {
      isInputEmpty = true;
    }
  });
  if (hasInvalidInput(inputs) || isInputEmpty) {
    button.classList.add(inactiveClass);
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove(inactiveClass);
    button.removeAttribute("disabled");
  }
}

function setEventListeners(form, buttonSelector, inactiveClass) {
  const inputs = Array.from(
    form.querySelectorAll(enableValidationConstants.inputSelector)
  );

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

export function enableValidation(enableValidationConstants) {
  const forms = document.querySelectorAll(
    enableValidationConstants.formSelector
  );

  forms.forEach((form) => {
    form.setAttribute("novalidate", true);
    setEventListeners(
      form,
      enableValidationConstants.submitButtonSelector,
      enableValidationConstants.inactiveButtonClass
    );
  });
}
