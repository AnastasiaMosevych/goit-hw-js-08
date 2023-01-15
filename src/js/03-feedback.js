const form = document.querySelector(".feedback-form");
let formData = { email: "", message: "" };
const emailField = document.querySelector("input[name = 'email']");
const messageField = document.querySelector("textarea[name ='message']");
const throttle = require('lodash.throttle');

const throtteledFunction = throttle(function() {
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
}, 500);
  

form.addEventListener("input", (event) => {
    if (event.target.name === "email") {
        formData.email = event.target.value;
    } else if (event.target.name === "message") {
        formData.message = event.target.value;
    };

    throtteledFunction();
});

window.onload = function () {
    let storedFormData = null;
    try { storedFormData = JSON.parse(localStorage.getItem("feedback-form-state")); }
    catch (error) {
        console.log(error.name);
        console.log(error.message);
    }

    if (storedFormData === null) {
        return;
    } else {
        formData = storedFormData;
    }

    if (formData.email !== "") {
        emailField.value = formData.email;
    } 
    if (formData.message !== "") {
        messageField.value = formData.message;
    }
};

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    localStorage.clear();
    form.reset();
    console.log(formData);
};
