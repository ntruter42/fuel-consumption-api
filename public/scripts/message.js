window.addEventListener('load', () => {
	const time = 4000;
	const message = document.querySelector('.message');

	if (message) {
		setTimeout(() => {
			message.classList.add('hidden');
		}, time);
	}
});