const passwordHelper = {
  showPassword(inputId, buttonId) {
    let element = document.getElementById(inputId);
    let button = document.getElementById(buttonId);
    if (element.type === "password") {
      element.type = "text";
    } else {
      element.type = "password";
    }
    if (button.value === "show") {
      button.value = "hide";
    } else {
      button.value = "show";
    }
  },
  showPasswords(buttonClass) {
    let rawElements = document.getElementsByClassName(buttonClass);
    let formattedElements = Array.from(rawElements);
    formattedElements.forEach(element => {
      if (element.type === "password") {
        element.type = "text";
      } else {
        element.type = "password";
      }
    });
  }
};

module.exports = {
  passwordHelper
};
