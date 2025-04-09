export const sanitizeContent = (content) =>
	content
		.replaceAll('&nbsp;', ' ')
		.replace(/ +/, ' ')
		.replaceAll('<br>', '\n')
		.replaceAll('<div>', '\n')
		.replaceAll('</div>', '');
