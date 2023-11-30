window.addEventListener('load', () => {
	const reset = document.querySelector('button[name="confirm"]');

	if (reset) {
		reset.addEventListener('click', (event) => {
			if (!window.confirm("Are you sure?")) {
				event.preventDefault();
			}
		});
	}
});