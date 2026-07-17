import internalModule from './modules/internalModule';
import mainMenu from './modules/mainMenu';
import momentSlider from './modules/momentSlider';
import productSlider from './modules/productSlider';
import Prism from 'prismjs';
(() => {
	internalModule();
	mainMenu();
	momentSlider();
	productSlider();
	Prism.highlightAll(); // Corrected: Use Prism.highlightAll() instead of undefined prismjs()
})();
