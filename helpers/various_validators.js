const isValidNumber = (number, positive = true) => {
	const negativeCase = positive ? number < 0 : false;

	return !(isNaN(number) || negativeCase);
};

module.exports = {
	isValidNumber,
};
