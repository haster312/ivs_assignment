export type IPagination = {
	rows: Record<string, any>[];
	current_page?: number;
	total_page?: number;
	total_row: number;
};

export type IPagingParam = {
	skip: number;
	total: number;
	per_page: number;
};

export type IPaginationResult = {
	total: number;
	rows: any[];
};

export function getPaginationData(total: number, filter: Record<string, any> = {}): Record<string, any> {
	let resultPage = 1;
	let resultSize = 10;

	if (filter.page !== undefined) {
		resultPage = parseInt(filter.page);
	}

	if (filter.size !== undefined) {
		resultSize = parseInt(filter.size);
	}

	let skip;
	if (resultPage == 1) {
		skip = 0;
	} else {
		skip = resultSize * (resultPage - 1);
	}

	const pages = Math.floor(total / resultSize);
	const totalPage = total <= resultSize ? 1 : total % resultSize == 0 ? pages : pages + 1;

	return {
		...filter,
		skip: skip,
		total_page: totalPage,
		per_page: resultSize,
	};
}
