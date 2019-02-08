import LocalizedStrings from 'react-localization';

import cs from '../assets/localization/cs.json';
import en from '../assets/localization/en.json';

class LocalizationStore {
	_strings;
	_subscribers = [];
	constructor() {
		this._strings = new LocalizedStrings({
			cs, en
		})
		this._strings.setLanguage('cs');
	}
	setLang(lang) {
		this._strings.setLanguage(lang);
		this.render();
	}
	get lang() {
		return this._strings.getLanguage();
	}
	get langs() {
		return this._strings.getAvailableLanguages();
	}
	get strings() {
		return this._strings;
	}
	render = () => {
		this._subscribers.forEach(component => {
			if (component.mounted && component.forceUpdate) {
				component.forceUpdate();
			}
		})
	}
	subscribe = (component) => {
		this._subscribers.push(component);
	}
	unsubscribe = (component) => {
		this._subscribers.splice(this._subscribers.indexOf(component), 1);
	}
}

export default new LocalizationStore();