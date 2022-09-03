function storeToken(token) {
	return localStorage.setItem("token", token);
}

function retrieveToken() {
	const token = localStorage.getItem("token");
	if (token == undefined) {
		return null;
	}

	return token;
}

function removeToken() {
	return localStorage.removeItem("token");
}

function validateTokenAndRedirect(status) {
	if (status === 403) {
		removeToken();
		window.location.href = "/login";
	}

	return true;
}

function adminLogin(email, password) {
	return fetch('/api/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password }),
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
			const token = data.data.token;
			storeToken(token);
			if (window.location.pathname === "/login") {
				window.location.href = "/sign-up";
			}
			showSuccess();
		}).catch((error) => {
			renderErrors(error.message.split(","));
		});
}

function checkAuth() {
	return fetch('/api/auth/check', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${retrieveToken()}`
		}
	})
		.then(async (response) => {
			const data = await response.json();
			if (response.status === 403) {
				if (window.location.pathname !== "/login") {
					window.location.href = "/login";
				}
				throw new Error("Forbidden");
			} else {
				return data;
			}
		})
		.then((data) => {
			if (window.location.pathname === "/login") {
				window.location.href = "/sign-up";
			}
		}).catch((error) => {});
}
