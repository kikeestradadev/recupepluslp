const momentSlider = () => {
	const root = document.querySelector('.moment-slider');
	if (!root || typeof Swiper === 'undefined') return;

	const swiperEl = root.querySelector('.moment-slider__swiper');
	const prevEl = root.querySelector('.moment-slider__nav--prev');
	const nextEl = root.querySelector('.moment-slider__nav--next');
	const paginationEl = root.querySelector('.moment-slider__pagination');
	if (!swiperEl) return;

	new Swiper(swiperEl, {
		slidesPerView: 'auto',
		spaceBetween: 16,
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
				spaceBetween: 20,
			},
			960: {
				spaceBetween: 24,
			},
		},
	});
};

export default momentSlider;
