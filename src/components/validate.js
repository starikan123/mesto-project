// function showInputError(
//   form,
//   input,
//   errorMessage,
//   { inputErrorClass, errorClass }
// ) {
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

// function hideInputError(form, input, { inputErrorClass, errorClass }) {
//   const error = form.querySelector(`.${input.id}-error`);
//   error.textContent = "";
//   error.classList.remove(errorClass);
//   input.classList.remove(inputErrorClass);
//   input.classList.remove("popup__form-field_type_error");
// }

// function checkInputValidity(
//   form,
//   input,
//   {
//     inputErrorClass,
//     errorClass,
//     submitButtonSelector,
//     inactiveButtonClass,
//     inputSelector,
//   }
// ) {
//   input.addEventListener("input", () => {
//     if (input.validity.valid) {
//       hideInputError(form, input, { inputErrorClass, errorClass });
//     } else {
//       showInputError(form, input, input.validationMessage, {
//         inputErrorClass,
//         errorClass,
//       });
//     }
//     toggleSubmitButtonState(form, {
//       submitButtonSelector,
//       inactiveButtonClass,
//       inputSelector,
//     });
//   });
//   input.addEventListener("change", () => {
//     if (!input.validity.valid) {
//       showInputError(form, input, input.validationMessage, {
//         inputErrorClass,
//         errorClass,
//       });
//     }
//     toggleSubmitButtonState(form, {
//       submitButtonSelector,
//       inactiveButtonClass,
//       inputSelector,
//     });
//   });
// }

// function hasInvalidInput(inputs) {
//   return Array.prototype.some.call(inputs, function (input) {
//     return input.validity.valid === false;
//   });
// }

// function toggleSubmitButtonState(
//   form,
//   { submitButtonSelector, inactiveButtonClass, inputSelector }
// ) {
//   const inputs = form.querySelectorAll(inputSelector);
//   const buttons = form.querySelectorAll(submitButtonSelector);
//   if (hasInvalidInput(inputs)) {
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

// function setEventListeners(
//   form,
//   {
//     inputSelector,
//     submitButtonSelector,
//     inactiveButtonClass,
//     errorClass,
//     inputErrorClass,
//   }
// ) {
//   const inputs = Array.from(form.querySelectorAll(inputSelector));

//   inputs.forEach((input) => {
//     input.addEventListener("input", () => {
//       checkInputValidity(form, input, {
//         errorClass,
//         inputErrorClass,
//         submitButtonSelector,
//         inactiveButtonClass,
//         inputSelector,
//       });
//       toggleSubmitButtonState(form, {
//         submitButtonSelector,
//         inactiveButtonClass,
//         inputSelector,
//       });
//     });
//   });
//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     inputs.forEach((input) => {
//       checkInputValidity(form, input, { errorClass, inputErrorClass });
//     });
//   });
// }

// export function enableValidation(config) {
//   const { formSelector, ...rest } = config;
//   const forms = document.querySelectorAll(formSelector);

//   forms.forEach((form) => {
//     form.setAttribute("novalidate", true);
//     setEventListeners(form, rest);
//     toggleSubmitButtonState(form, rest);
//   });
// }
const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
};

const isInputValid = (formElement, inputElement, config) => {
  inputElement.setCustomValidity(
    inputElement.validity.patternMismatch
      ? inputElement.dataset.errorMessage
      : ""
  );

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

export const hasInvalidInput = (inputList) =>
  inputList.some((inputElement) => !inputElement.validity.valid);

const inactiveSubmitButton = (config, cardSubmitButton) =>
  cardSubmitButton.classList.add(
    config.inactiveButtonClass,
    (cardSubmitButton.disabled = true)
  );

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isInputValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
  toggleButtonState(inputList, buttonElement, config);
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};
