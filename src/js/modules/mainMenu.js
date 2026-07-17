const mainMenu = () => {
	const menu = document.querySelector('.main-menu');
	if (!menu) return;

	const hamburger = menu.querySelector('.main-menu__hamburger');
	const dropdownItems = menu.querySelectorAll('.main-menu__item--has-children');
	const desktopQuery = window.matchMedia('(min-width: 960px)');

	const isDesktop = () => desktopQuery.matches;

	const closeMenu = () => {
		menu.classList.remove('main-menu--open');
		if (hamburger) {
			hamburger.setAttribute('aria-expanded', 'false');
			hamburger.setAttribute('aria-label', 'Abrir menú');
		}
	};

	const openMenu = () => {
		menu.classList.add('main-menu--open');
		if (hamburger) {
			hamburger.setAttribute('aria-expanded', 'true');
			hamburger.setAttribute('aria-label', 'Cerrar menú');
		}
	};

	const closeDropdowns = () => {
		dropdownItems.forEach((item) => {
			item.classList.remove('is-open');
		});
	};

	if (hamburger) {
		hamburger.addEventListener('click', () => {
			if (menu.classList.contains('main-menu--open')) {
				closeMenu();
			} else {
				openMenu();
			}
		});
	}

	dropdownItems.forEach((item) => {
		const trigger = item.querySelector('.main-menu__link');
		if (!trigger) return;

		trigger.addEventListener('click', (event) => {
			if (isDesktop()) return;

			event.preventDefault();
			const isOpen = item.classList.contains('is-open');
			closeDropdowns();

			if (!isOpen) {
				item.classList.add('is-open');
			}
		});
	});

	document.addEventListener('click', (event) => {
		if (!menu.contains(event.target)) {
			closeDropdowns();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeMenu();
			closeDropdowns();
		}
	});

	desktopQuery.addEventListener('change', () => {
		if (isDesktop()) {
			closeMenu();
			closeDropdowns();
		}
	});
};

export default mainMenu;
