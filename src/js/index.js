import mainMenu from './modules/mainMenu';
import momentSlider from './modules/momentSlider';
import productSlider from './modules/productSlider';
import alliesSlider from './modules/alliesSlider';
import storeLocator from './modules/storeLocator';
import waysSlider from './modules/waysSlider';
import foundersCards from './modules/foundersCards';
import believeCards from './modules/believeCards';
import reviewsSlider from './modules/reviewsSlider';
import guideSlider from './modules/guideSlider';
import ingredientsSlider from './modules/ingredientsSlider';
import blogSlider from './modules/blogSlider';
import blogFilter from './modules/blogFilter';
import mainSlider from './modules/mainSlider';

const initComponents = () => {
	mainMenu();
	mainSlider();
	momentSlider();
	productSlider();
	alliesSlider();
	storeLocator();
	waysSlider();
	believeCards();
	foundersCards();
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
