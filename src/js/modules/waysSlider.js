const waysSlider = () => {
	const root = document.querySelector('.ways-slider');
	if (!root || typeof Swiper === 'undefined') return;

	const swiperEl = root.querySelector('.ways-slider__swiper');
	const prevEl = root.querySelector('.ways-slider__nav--prev');
	const nextEl = root.querySelector('.ways-slider__nav--next');
	const paginationEl = root.querySelector('.ways-slider__pagination');
	if (!swiperEl) return;

	new Swiper(swiperEl, {
		slidesPerView: 'auto',
		spaceBetween: 16,
		grabCursor: true,
		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
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

export default waysSlider;
