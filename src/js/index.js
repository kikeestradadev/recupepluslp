import componentLoader from './modules/componentLoader';
import mainMenu from './modules/mainMenu';
import momentSlider from './modules/momentSlider';
import productSlider from './modules/productSlider';
import alliesSlider from './modules/alliesSlider';
import storeLocator from './modules/storeLocator';
import waysSlider from './modules/waysSlider';
import believeCards from './modules/believeCards';
import reviewsSlider from './modules/reviewsSlider';
import guideSlider from './modules/guideSlider';
import ingredientsSlider from './modules/ingredientsSlider';
import blogSlider from './modules/blogSlider';
import blogFilter from './modules/blogFilter';
import productShowcase from './modules/productShowcase';
import mushroomsSplit from './modules/mushroomsSplit';
import mainSlider from './modules/mainSlider';
import mainBanner from './modules/mainBanner';

const initEagerComponents = () => {
	mainMenu();
	mainSlider();
	mainBanner();
	productShowcase();
	blogFilter();

	if (
		typeof window.Prism !== 'undefined' &&
		document.querySelector('code[class*="language-"], [class*="language-"] code')
	) {
		window.Prism.highlightAll();
	}
};

const initComponents = () => {
	document.documentElement.classList.remove('no-js');
	document.documentElement.classList.add('js');
	document.documentElement.dataset.componentsReady = 'true';

	initEagerComponents();
	componentLoader([
		{ selector: '.moment-slider', init: momentSlider },
		{ selector: '.product-slider', init: productSlider },
		{ selector: '.mushrooms-split', init: mushroomsSplit },
		{ selector: '.allies-slider', init: alliesSlider },
		{ selector: '.store-locator', init: storeLocator },
		{ selector: '.ways-slider', init: waysSlider },
		{ selector: '.believe-cards', init: believeCards },
		{ selector: '.reviews-slider', init: reviewsSlider },
		{ selector: '.guide-slider', init: guideSlider },
		{ selector: '.ingredients-slider', init: ingredientsSlider },
		{ selector: '.blog-slider', init: blogSlider },
	]);
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initComponents, { once: true });
} else {
	initComponents();
}
