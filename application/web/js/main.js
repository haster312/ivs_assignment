async function onSignUp(formId) {
	const form = document.getElementById(formId);
	const errors = validateSignUp(form);
	hideError();

	if (errors.length > 0) {
		return renderErrors(errors);
	} else {
		const { name, email } = getSignUpValues(form);

		await signUpForEvent(name, email);
	}
}

async function onLogin(formId) {
	const form = document.getElementById(formId);
	const errors = validateLogin(form);
	hideError();

	if (errors.length > 0) {
		return renderErrors(errors);
	} else {
		const { email, password } = getSignInValues(form);

		await adminLogin(email, password);
	}
}

function signUpForEvent(name, email) {
	return fetch('/api/event/sign-up', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ name, email }),
	})
	.then(async (response) => {
		const data = await response.json();
		if (response.status === 400) {
			throw new Error(data.message.join(","));
		} else {
			return data;
		}
	})
	.then((data) => {
		successSection.innerHTML = "<li>You have signed up successful for the event</li>";
		showSuccess();
	}).catch((error) => {
		renderErrors(error.message.split(","));
	});
}
