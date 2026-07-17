const blogFilter = () => {
	const root = document.querySelector('.blog-filter');
	if (!root || typeof Swiper === 'undefined') return;

	const perPage = Number(root.dataset.perPage) || 6;
	const chips = [...root.querySelectorAll('.blog-filter__chip')];
	const gridCards = [...root.querySelectorAll('[data-blog-grid] .blog-filter__card')];
	const mobileSlides = [...root.querySelectorAll('[data-blog-mobile-track] .blog-filter__slide')];
	const paginationEl = root.querySelector('[data-blog-pagination]');
	const filtersSwiperEl = root.querySelector('.blog-filter__filters-swiper');
	const filtersPrev = root.querySelector('.blog-filter__filters-nav--prev');
	const filtersNext = root.querySelector('.blog-filter__filters-nav--next');
	const postsSwiperEl = root.querySelector('[data-blog-swiper]');
	const bulletsEl = root.querySelector('.blog-filter__bullets');
	const desktopQuery = window.matchMedia('(min-width: 960px)');

	let activeFilter = 'all';
	let currentPage = 1;
	let filtersSwiper = null;
	let postsSwiper = null;

	const getFiltered = (items) =>
		items.filter((item) => activeFilter === 'all' || item.dataset.category === activeFilter);

	const setChipState = () => {
		chips.forEach((chip) => {
			chip.classList.toggle('blog-filter__chip--active', chip.dataset.filter === activeFilter);
		});
	};

	const renderPagination = (totalPages) => {
		if (!paginationEl) return;
		paginationEl.innerHTML = '';

		if (totalPages <= 1) return;

		const addButton = (label, page, options = {}) => {
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = `blog-filter__page${options.active ? ' blog-filter__page--active' : ''}${options.nav ? ' blog-filter__page--nav' : ''}`;
			btn.textContent = label;
			btn.disabled = Boolean(options.disabled || options.active);
			if (!options.active && !options.disabled) {
				btn.addEventListener('click', () => {
					currentPage = page;
					updateView();
				});
			}
			paginationEl.appendChild(btn);
		};

		addButton('‹', Math.max(1, currentPage - 1), {
			nav: true,
			disabled: currentPage === 1,
		});

		for (let page = 1; page <= totalPages; page += 1) {
			addButton(String(page), page, { active: page === currentPage });
		}

		addButton('›', Math.min(totalPages, currentPage + 1), {
			nav: true,
			disabled: currentPage === totalPages,
		});
	};

	const updateDesktopGrid = () => {
		const filtered = getFiltered(gridCards);
		const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
		if (currentPage > totalPages) currentPage = totalPages;

		const start = (currentPage - 1) * perPage;
		const end = start + perPage;

		gridCards.forEach((card) => {
			card.hidden = true;
		});

		filtered.slice(start, end).forEach((card) => {
			card.hidden = false;
		});

		renderPagination(totalPages);
	};

	const destroyPostsSwiper = () => {
		if (postsSwiper) {
			postsSwiper.destroy(true, true);
			postsSwiper = null;
		}
	};

	const updateMobileSlider = () => {
		const track = root.querySelector('[data-blog-mobile-track]');
		if (!postsSwiperEl || !track) return;

		destroyPostsSwiper();

		const filtered = getFiltered(mobileSlides);
		track.innerHTML = '';
		filtered.forEach((slide) => {
			slide.hidden = false;
			slide.style.display = '';
			track.appendChild(slide);
		});

		if (filtered.length === 0) return;

		postsSwiper = new Swiper(postsSwiperEl, {
			slidesPerView: 'auto',
			spaceBetween: 16,
			grabCursor: true,
			watchOverflow: true,
			pagination: {
				el: bulletsEl,
				clickable: true,
			},
			breakpoints: {
				640: {
					spaceBetween: 20,
				},
			},
		});
	};

	const updateView = () => {
		setChipState();

		if (desktopQuery.matches) {
			destroyPostsSwiper();
			updateDesktopGrid();
		} else {
			if (paginationEl) paginationEl.innerHTML = '';
			updateMobileSlider();
		}
	};

	const initFiltersSwiper = () => {
		if (!filtersSwiperEl) return;

		if (desktopQuery.matches) {
			if (filtersSwiper) {
				filtersSwiper.destroy(true, true);
				filtersSwiper = null;
			}
			return;
		}

		if (filtersSwiper) return;

		filtersSwiper = new Swiper(filtersSwiperEl, {
			slidesPerView: 'auto',
			spaceBetween: 10,
			freeMode: true,
			grabCursor: true,
			watchOverflow: true,
			navigation: {
				prevEl: filtersPrev,
				nextEl: filtersNext,
			},
		});
	};

	chips.forEach((chip) => {
		chip.addEventListener('click', () => {
			activeFilter = chip.dataset.filter || 'all';
			currentPage = 1;
			updateView();
		});
	});

	const onViewportChange = () => {
		initFiltersSwiper();
		updateView();
	};

	if (typeof desktopQuery.addEventListener === 'function') {
		desktopQuery.addEventListener('change', onViewportChange);
	} else {
		desktopQuery.addListener(onViewportChange);
	}

	initFiltersSwiper();
	updateView();
};

export default blogFilter;
