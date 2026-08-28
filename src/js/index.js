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

const initComponents = () => {
	mainMenu();
	mainSlider();
	mainBanner();
	momentSlider();
	productSlider();
	productShowcase();
	mushroomsSplit();
	alliesSlider();
	storeLocator();
	waysSlider();
	believeCards();
	reviewsSlider();
	guideSlider();
	ingredientsSlider();
	blogSlider();
	blogFilter();

	if (
		typeof window.Prism !== 'undefined' &&
		document.querySelector('code[class*="language-"], [class*="language-"] code')
	) {
		window.Prism.highlightAll();
	}
};

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initComponents, { once: true });
} else {
	initComponents();
}
