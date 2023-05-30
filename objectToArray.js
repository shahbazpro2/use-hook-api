function objectToArray(obj, arr = [], tempKey = null) {
	if (Array.isArray(obj)) {
		for (let i = 0; i < obj.length; i++) {
			if (typeof obj[i] === "object") {
				objectToArray(obj[i], arr, tempKey);
			} else {
				arr.push(obj[i]);
			}
		}
	} else if (typeof obj === "object") {
		for (const key in obj) {
			if (!Number.isNaN(Number(key))) {
				tempKey = key;
			}
			if (typeof obj[key] === "object") {
				objectToArray(obj[key], arr, tempKey);
			} else {
				if (
					key === "icabbi_error" ||
					(typeof obj[key] === "string" &&
						['This field is required.', 'This field is required'].includes(obj[key])
					)
				) {
					arr.push(`${tempKey}: ${obj[key]}`);
				} else if (key !== "code") {
					arr.push(obj[key]);
				}
			}
		}
	} else {
		arr.push(obj);
	}

	return arr;
}

export default objectToArray;
