const productSlider = () => {
	const root = document.querySelector('.product-slider');
	if (!root || typeof Swiper === 'undefined') return;

	const groups = root.querySelectorAll('.product-slider__slider');

	groups.forEach((group) => {
		const swiperEl = group.querySelector('.product-slider__swiper');
		const prevEl = group.querySelector('.product-slider__nav--prev');
		const nextEl = group.querySelector('.product-slider__nav--next');
		const paginationEl = group.querySelector('.product-slider__pagination');
		if (!swiperEl) return;

		new Swiper(swiperEl, {
			slidesPerView: 'auto',
			spaceBetween: 12,
			grabCursor: true,
			freeMode: true,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			navigation: {
				prevEl,
				nextEl,
			},
			breakpoints: {
				640: {
					spaceBetween: 16,
				},
				960: {
					spaceBetween: 20,
				},
			},
		});
	});
};

export default productSlider;
