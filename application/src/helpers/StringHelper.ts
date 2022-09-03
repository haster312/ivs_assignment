export const parseError = (message: Record<string, any> | string) => {
	if (typeof message === "object") {
		return Object.keys(message).map((val) => {
			if (message[val].msg) {
				return message[val].msg;
			} else if (message[val].message) {
				return message[val].message;
			}
		});
	} else {
		return message;
	}
};
