/* @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { IPagination } from "./Pagination";

export const Pagination = (res: Response, data: IPagination) => {
	return res
		.status(200)
		.json({
			data: data.rows,
			current_page: data.current_page,
			total_row: data.total_row,
		})
		.end();
};

export const Success = (
	res: Response,
	data: [] | Record<string, any> | boolean | null,
	message = "",
	code = 200,
) => {
	return res
		.status(code)
		.json({
			data: data,
			message: message,
		})
		.end();
};

export const NotFound = (res: Response, message: string | string[] = "", code = 404) => {
	return res.status(code).json({ message: message }).end();
};

export const Abort = (res: Response, exception: any, code = 500) => {
	let message: string[] = [];

	if (typeof exception == "string") {
		message.push(exception);
	} else if (Array.isArray(exception)) {
		message = exception;
	} else {
		message.push(exception.message);
	}

	return res.status(code).json({ message: message }).end();
};

export const Unauthorized = (res: Response, message = "Forbidden") => {
	return res.status(403).json({ message: message }).end();
};

export const PDFResponse = (res: Response, data: any) => {
	res.set("Content-Type", "application/pdf");
	return res.send(data);
};

export const ExcelResponse = (res: Response, data: any, fileName: string) => {
	res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
	res.set("Content-Disposition", `attachment; filename=${fileName}`);

	return res.send(data);
};
