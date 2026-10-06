const mainBanner = (scope = document) => {
	const instances = [];
	const roots = scope.querySelectorAll('.main-banner');

	if (roots.length > 0 && typeof Swiper !== 'undefined') {
		roots.forEach((root) => {
			const swiperEl = root.querySelector('.main-banner__swiper');
			if (!swiperEl) return;

			if (swiperEl.swiper) {
				instances.push(swiperEl.swiper);
				return;
			}

			const prevEl = root.querySelector('.main-banner__nav--prev');
			const nextEl = root.querySelector('.main-banner__nav--next');
			const paginationEl = root.querySelector('.main-banner__pagination');

			const instance = new Swiper(swiperEl, {
				speed: 0,
				loop: true,
				autoplay: {
					delay: 6000,
					disableOnInteraction: false,
				},
				pagination: {
					el: paginationEl,
					clickable: true,
				},
				navigation: {
					prevEl,
					nextEl,
				},
			});

			instances.push(instance);
		});
	}

	return instances;
};

export default mainBanner;
