import internalModule from './modules/internalModule';
import mainMenu from './modules/mainMenu';
import momentSlider from './modules/momentSlider';
import productSlider from './modules/productSlider';
import alliesSlider from './modules/alliesSlider';
import storeLocator from './modules/storeLocator';
import waysSlider from './modules/waysSlider';
import reviewsSlider from './modules/reviewsSlider';
import guideSlider from './modules/guideSlider';
import blogSlider from './modules/blogSlider';
import Prism from 'prismjs';
(() => {
	internalModule();
	mainMenu();
	momentSlider();
	productSlider();
	alliesSlider();
	storeLocator();
	waysSlider();
	reviewsSlider();
	guideSlider();
	blogSlider();
	Prism.highlightAll(); // Corrected: Use Prism.highlightAll() instead of undefined prismjs()
})();
