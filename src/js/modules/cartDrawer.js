const cartDrawerInstances = new WeakMap();

const formatColon = (value) => {
	const amount = Math.round(Number(value) || 0);
	return `₡${amount.toLocaleString('es-CR').replace(/,/g, ' ')}`;
};

const cartDrawer = (scope = document) => {
	const roots = scope.querySelectorAll('[data-cart-drawer], .cart-drawer');
	if (!roots.length) return;

	roots.forEach((root) => {
		if (cartDrawerInstances.has(root)) return;

		const panel = root.querySelector('[data-cart-drawer-panel], .cart-drawer__panel');
		const openTriggers = Array.from(
			document.querySelectorAll('[data-cart-drawer-open], .main-menu__cart')
		);
		const closeTriggers = Array.from(root.querySelectorAll('[data-cart-drawer-close]'));
		const list = root.querySelector('[data-cart-drawer-list]');
		const subtotalEl = root.querySelector('[data-cart-drawer-subtotal]');
		const countEl = root.querySelector('[data-cart-drawer-count]');
		const controller = new AbortController();
		const { signal } = controller;
		let lastFocus = null;

		const setOpen = (open) => {
			root.classList.toggle('cart-drawer--open', open);
			root.setAttribute('aria-hidden', String(!open));
			document.body.classList.toggle('cart-drawer-open', open);

			openTriggers.forEach((trigger) => {
				trigger.setAttribute('aria-expanded', String(open));
			});

			if (open) {
				lastFocus = document.activeElement;
				const focusTarget =
					root.querySelector('[data-cart-drawer-close].cart-drawer__close') ||
					panel;
				window.requestAnimationFrame(() => focusTarget?.focus?.());
			} else if (lastFocus && typeof lastFocus.focus === 'function') {
				lastFocus.focus();
				lastFocus = null;
			}
		};

		const recalculate = () => {
			const items = Array.from(root.querySelectorAll('[data-cart-item]'));
			let subtotal = 0;
			let count = 0;

			items.forEach((item) => {
				const unit = Number(item.getAttribute('data-unit-price') || 0);
				const input = item.querySelector('[data-cart-item-input]');
				const totalEl = item.querySelector('[data-cart-item-total]');
				const qty = Math.max(1, Number(input?.value || 1));
				if (input) input.value = String(qty);
				const line = unit * qty;
				subtotal += line;
				count += qty;
				if (totalEl) totalEl.textContent = formatColon(line);
			});

			if (subtotalEl) subtotalEl.textContent = formatColon(subtotal);
			if (countEl) countEl.textContent = String(count);

			document.querySelectorAll('[data-cart-drawer-badge]').forEach((badge) => {
				badge.textContent = String(count);
				badge.hidden = count < 1;
			});
		};

		const onOpenClick = (event) => {
			event.preventDefault();
			setOpen(true);
		};

		const onCloseClick = (event) => {
			event.preventDefault();
			setOpen(false);
		};

		const onKeyDown = (event) => {
			if (event.key === 'Escape' && root.classList.contains('cart-drawer--open')) {
				setOpen(false);
			}
		};

		const onListClick = (event) => {
			const decrease = event.target.closest('[data-cart-item-decrease]');
			const increase = event.target.closest('[data-cart-item-increase]');
			const remove = event.target.closest('[data-cart-item-remove]');
			if (!decrease && !increase && !remove) return;

			event.preventDefault();
			const item = event.target.closest('[data-cart-item]');
			if (!item) return;

			if (remove) {
				item.remove();
				recalculate();
				if (!root.querySelector('[data-cart-item]')) {
					const content = root.querySelector('[data-cart-drawer-content]');
					const footer = root.querySelector('.cart-drawer__footer');
					footer?.remove();
					if (content && !content.querySelector('.cart-drawer__empty')) {
						content.innerHTML = `
							<div class="cart-drawer__empty">
								<p class="cart-drawer__empty-message woocommerce-mini-cart__empty-message">Tu carrito está vacío.</p>
								<button class="cart-drawer__continue" type="button" data-cart-drawer-close>Seguir comprando</button>
							</div>
						`;
						content
							.querySelector('[data-cart-drawer-close]')
							?.addEventListener('click', onCloseClick, { signal });
					}
					if (countEl) countEl.hidden = true;
				}
				return;
			}

			const input = item.querySelector('[data-cart-item-input]');
			if (!input) return;
			let qty = Number(input.value || 1);
			if (decrease) qty = Math.max(1, qty - 1);
			if (increase) qty = Math.min(99, qty + 1);
			input.value = String(qty);
			recalculate();
		};

		openTriggers.forEach((trigger) => {
			if (!trigger.getAttribute('aria-controls') && root.id) {
				trigger.setAttribute('aria-controls', root.id);
			}
			trigger.setAttribute('aria-expanded', 'false');
			trigger.setAttribute('aria-haspopup', 'dialog');
			trigger.addEventListener('click', onOpenClick, { signal });
		});

		closeTriggers.forEach((trigger) => {
			trigger.addEventListener('click', onCloseClick, { signal });
		});

		list?.addEventListener('click', onListClick, { signal });
		document.addEventListener('keydown', onKeyDown, { signal });

		if (!root.id) root.id = 'cart-drawer';
		openTriggers.forEach((trigger) => {
			trigger.setAttribute('aria-controls', root.id);
		});

		recalculate();

		cartDrawerInstances.set(root, () => {
			controller.abort();
			setOpen(false);
			cartDrawerInstances.delete(root);
		});
	});
};

export default cartDrawer;
