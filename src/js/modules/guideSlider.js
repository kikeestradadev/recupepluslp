const guideSlider = () => {
	const root = document.querySelector('.guide-slider');
	if (!root || typeof Swiper === 'undefined') return;

	const swiperEl = root.querySelector('.guide-slider__swiper');
	const prevEl = root.querySelector('.guide-slider__nav--prev');
	const nextEl = root.querySelector('.guide-slider__nav--next');
	const paginationEl = root.querySelector('.guide-slider__pagination');
	if (!swiperEl) return;

	new Swiper(swiperEl, {
		slidesPerView: 'auto',
		spaceBetween: 12,
		grabCursor: true,
		autoplay: {
			delay: 3200,
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
				spaceBetween: 16,
			},
			960: {
				spaceBetween: 20,
			},
		},
	});
};

export default guideSlider;
