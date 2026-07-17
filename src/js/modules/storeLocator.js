const storeLocator = () => {
	const root = document.querySelector('.store-locator');
	if (!root) return;

	const items = root.querySelectorAll('.store-locator__item');
	const pins = root.querySelectorAll('.store-locator__pin');
	const form = root.querySelector('.store-locator__search');

	const setActive = (index) => {
		items.forEach((item, i) => {
			item.classList.toggle('is-active', i === index);
		});

		pins.forEach((pin, i) => {
			pin.classList.toggle('is-active', i === index);
		});
	};

	items.forEach((item, index) => {
		const button = item.querySelector('.store-locator__item-btn');
		if (!button) return;

		button.addEventListener('click', () => {
			setActive(index);
		});
	});

	if (form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();
		});
	}
};

export default storeLocator;
