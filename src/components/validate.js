// // import { enableValidationConstants } from "./constants.js";

// function showInputError(form, input, errorMessage) {
//   const error = form.querySelector(`.${input.id}-error`);
//   error.classList.add(inputErrorClass);
//   input.classList.add("popup__form-field_type_error");
//   if (input.value === "") {
//     error.textContent = "Вы пропустили это поле";
//   } else {
//     error.textContent = errorMessage;
//   }
//   error.classList.add(errorClass);
// }

// function hideInputError(form, input) {
//   const error = form.querySelector(`.${input.id}-error`);

//   error.classList.add(inputErrorClass);
//   error.textContent = "";
//   error.classList.add(errorClass);
//   input.classList.remove(inputErrorClass);
//   input.classList.remove("popup__form-field_type_error");
// }

// function checkInputValidity(form, input) {
//   input.addEventListener("focus", () => {
//     input.setAttribute("data-touched", true);
//   });
//   if (input.getAttribute("data-touched") && !input.validity.valid) {
//     input.classList.add("popup__form-field_type_error");
//     showInputError(form, input, input.validationMessage);
//   } else {
//     hideInputError(form, input);
//   }
// }

// function hasInvalidInput(inputs) {
//   return Array.prototype.some.call(inputs, function (input) {
//     return input.validity.valid === false;
//   });
// }
// function hasEmptyInput(inputs) {
//   return Array.prototype.some.call(inputs, function (input) {
//     return input.value === "";
//   });
// }

// function toggleSubmitButtonState(
//   form,
//   submitButtonSelector,
//   inactiveButtonClass
// ) {
//   const inputs = form.querySelectorAll(inputSelector);
//   const buttons = form.querySelectorAll(submitButtonSelector);
//   if (
//     hasInvalidInput(inputs) ||
//     Array.prototype.some.call(inputs, function (input) {
//       return input.value === "";
//     })
//   ) {
//     buttons.forEach(function (button) {
//       button.classList.add(inactiveButtonClass);
//       button.setAttribute("disabled", true);
//     });
//   } else {
//     buttons.forEach(function (button) {
//       button.classList.remove(inactiveButtonClass);
//       button.removeAttribute("disabled");
//     });
//   }
// }

// function setEventListeners(form, submitButtonSelector, inactiveButtonClass) {
//   const inputs = Array.from(form.querySelectorAll(inputSelector));

//   inputs.forEach((input) => {
//     input.addEventListener("input", () => {
//       checkInputValidity(form, input);
//       toggleSubmitButtonState(form, submitButtonSelector, inactiveButtonClass);
//     });
//   });
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//   });
// }

// export function enableValidation(config) {
//   const {
//     inputSelector,
//     formSelector,
//     submitButtonSelector,
//     inactiveButtonClass,
//     errorClass,
//     inputErrorClass,
//   } = config;
//   const forms = document.querySelectorAll(formSelector);

//   forms.forEach((form) => {
//     form.setAttribute("novalidate", true);
//     setEventListeners(form, submitButtonSelector, inactiveButtonClass);
//     toggleSubmitButtonState(form, submitButtonSelector, inactiveButtonClass);
//   });
// }

function showInputError(
  form,
  input,
  errorMessage,
  { inputErrorClass, errorClass }
) {
  const error = form.querySelector(`.${input.id}-error`);
  error.classList.add(inputErrorClass);
  input.classList.add("popup__form-field_type_error");
  if (input.value === "") {
    error.textContent = "Вы пропустили это поле";
  } else {
    error.textContent = errorMessage;
  }
  error.classList.add(errorClass);
}

function hideInputError(form, input, { inputErrorClass, errorClass }) {
  const error = form.querySelector(`.${input.id}-error`);

  error.classList.remove(inputErrorClass);
  error.textContent = "";
  error.classList.remove(errorClass);
  input.classList.remove(inputErrorClass);
  input.classList.remove("popup__form-field_type_error");
}

function checkInputValidity(form, input, { inputErrorClass, errorClass }) {
  input.addEventListener("focus", () => {
    input.setAttribute("data-touched", true);
  });
  if (input.getAttribute("data-touched") && !input.validity.valid) {
    showInputError(form, input, input.validationMessage, {
      inputErrorClass,
      errorClass,
    });
  } else {
    hideInputError(form, input, { inputErrorClass, errorClass });
  }
}
function hasInvalidInput(inputs) {
  return Array.prototype.some.call(inputs, function (input) {
    return input.validity.valid === false;
  });
}
function hasEmptyInput(inputs) {
  return Array.prototype.some.call(inputs, function (input) {
    return input.value === "";
  });
}
function toggleSubmitButtonState(
  form,
  { submitButtonSelector, inactiveButtonClass, inputSelector }
) {
  const inputs = form.querySelectorAll(inputSelector);
  const buttons = form.querySelectorAll(submitButtonSelector);
  if (hasInvalidInput(inputs) || hasEmptyInput(inputs)) {
    buttons.forEach(function (button) {
      button.classList.add(inactiveButtonClass);
      button.setAttribute("disabled", true);
    });
  } else {
    buttons.forEach(function (button) {
      button.classList.remove(inactiveButtonClass);
      button.removeAttribute("disabled");
    });
  }
}

function setEventListeners(
  form,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    errorClass,
    inputErrorClass,
  }
) {
  const inputs = Array.from(form.querySelectorAll(inputSelector));

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input, { errorClass, inputErrorClass });
      toggleSubmitButtonState(form, {
        submitButtonSelector,
        inactiveButtonClass,
        inputSelector,
      });
    });
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

export function enableValidation(config) {
  const { formSelector, ...rest } = config;
  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    form.setAttribute("novalidate", true);
    setEventListeners(form, rest);
    toggleSubmitButtonState(form, rest);
  });
}
