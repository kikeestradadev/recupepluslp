const alliesSlider = () => {
	const root = document.querySelector('.allies-slider');
	if (!root || typeof Swiper === 'undefined') return;

	const swiperEl = root.querySelector('.allies-slider__swiper');
	const paginationEl = root.querySelector('.allies-slider__pagination');
	if (!swiperEl) return;

	new Swiper(swiperEl, {
		slidesPerView: 'auto',
		spaceBetween: 12,
		grabCursor: true,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		pagination: {
			el: paginationEl,
			clickable: true,
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

export default alliesSlider;
