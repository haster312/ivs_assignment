const errorSection = document.getElementById("errors");
const successSection = document.getElementById("success");

function validateSignUp(form) {
	const errors = [];
	const { name, email } = getSignUpValues(form);

	if (!name && name === "") {
		errors.push("Name cannot be empty");
	}

	if (!email && email === "") {
		errors.push("Email cannot be empty");
	} else {
		if (!validateEmail(email)) {
			errors.push("Email is not valid");
		}
	}

	return errors;
}

function validateLogin(form) {
	const errors = [];
	const { email, password } = getSignInValues(form);

	if (!email && email === "") {
		errors.push("Email cannot be empty");
	} else {
		if (!validateEmail(email)) {
			errors.push("Email is not valid");
		}
	}

	if (!password && password === "") {
		errors.push("Password cannot be empty");
	} else {
		if (password.length < 8) {
			errors.push("Password length must be at least 8 characters");
		}
	}

	return errors;
}

function getSignUpValues(form) {
	const input = form.elements;
	const name = input['name'];
	const email = input['email'];

	return { name: name.value, email: email.value };
}

function getSignInValues(form) {
	const input = form.elements;
	const email = input['email'];
	const password = input['password'];

	return { email: email.value, password: password.value };
}

function validateEmail(email) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
}

function renderErrors(errors) {
	const listError = [];
	for (const error of errors) {
		listError.push(`<li>${error}</li>`);
	}

	errorSection.innerHTML = listError.join("");
	showError();
}

function hideError() {
	errorSection.classList.add("hide");
}

function showError() {
	errorSection.classList.remove("hide");
}

function hideSuccess() {
	successSection.classList.add("hide");
}

function showSuccess() {
	successSection.classList.remove("hide");
	setTimeout(() => hideSuccess(), 2000);
}