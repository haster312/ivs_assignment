function getSignUpList(page, size) {
	return fetch(`/api/event/sign-up?page=${page}&size=${size}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${retrieveToken()}`
		}
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
			renderEventRecord(data.data);
			renderPagination(page, size, data.total_row);
		}).catch((error) => {
			alert(error);
		});
}

function renderEventRecord(rows) {
	const signUpTable = document.getElementById("sign-up-list");
	let rowContent = `<tr>
		<th>Name</th>
		<th>Email</th>
		<th>Created Date</th>
	</tr>`;

	for (const signUp of rows) {
		rowContent += `<tr>
			<td>${signUp.name}</td>
			<td>${signUp.email}</td>
			<td>${new Date(signUp.created_at).toISOString()}</td>
		</tr>`;
	}

	signUpTable.innerHTML = rowContent;
}

function renderPagination(currentPage, size, total) {
	const pages = Math.floor(total / size);
	const totalPage = total <= size ? 1 : total % size === 0 ? pages : pages + 1;
	const pagination = document.getElementById("pagination");
	pagination.innerHTML = "";

	for (let page = 1; page <= totalPage; page++) {
		const current = currentPage === page ? 'class="current"' : "";
		pagination.innerHTML += `<li><span onclick="getSignUpList(${page}, ${size})" ${current}>${page}</span></li>`
	}
}

(async () => {
	/**
	 * Get first sign up list with page 1, default 10 rows
	 */
	await checkAuth();
	await getSignUpList(1, 10);
})();