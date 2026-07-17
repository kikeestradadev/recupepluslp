const blogSlider = () => {
	const root = document.querySelector('.blog-slider');
	if (!root || typeof Swiper === 'undefined') return;

	const swiperEl = root.querySelector('.blog-slider__swiper');
	const prevEl = root.querySelector('.blog-slider__nav--prev');
	const nextEl = root.querySelector('.blog-slider__nav--next');
	const paginationEl = root.querySelector('.blog-slider__pagination');
	if (!swiperEl) return;

	new Swiper(swiperEl, {
		slidesPerView: 'auto',
		spaceBetween: 16,
		grabCursor: true,
		autoplay: {
			delay: 3500,
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

export default blogSlider;
