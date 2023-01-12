function showInputError(form, input, errorMessage) {
  const error = form.querySelector(`.${input.id}-error`);
  error.classList.add("popup__eror-masage");
  if (input.value === "") {
    error.textContent = "Вы пропустили это поле";
  } else {
    error.textContent = errorMessage;
  }
  error.classList.add("popup__eror-masage_active");
}

function hideInputError(form, input) {
  const error = form.querySelector(`.${input.id}-error`);
  error.classList.remove("popup__eror-masage");
  error.textContent = "";
  error.classList.remove("popup__eror-masage_active");
  input.classList.remove("popup__form-field_type_error");
}

function checkInputValidity(form, input) {
  if (!input.validity.valid) {
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
  const button = form.querySelector(buttonSelector);
  if (hasInvalidInput(form.querySelectorAll(".popup__form-field"))) {
    button.classList.add(inactiveClass);
    button.setAttribute("disabled", true);
  } else {
    button.classList.remove(inactiveClass);
    button.removeAttribute("disabled");
  }
}

function setEventListeners(form, buttonSelector, inactiveClass) {
  const inputs = Array.from(form.querySelectorAll(".popup__form-field"));

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
