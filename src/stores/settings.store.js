import { observable, computed } from 'mobx';
//import env from '../lib/env.service';

const LOG_KEY = 'SETTINGS';
const PAGINATION_STORAGE_KEY = 'PAGINATION';

class SettingsStore {
	@observable _pageSizes = [ 10, 15, 20, 30, 50, 100 ];
	@observable _tableSize = 'middle';
	@observable _pageSize = 10;

	constructor() {
		this._pageSize = parseInt(localStorage.getItem(PAGINATION_STORAGE_KEY) || 10, 10) || 10;
	}

	@computed get pageSizes() {
		return this._pageSizes.slice().map(item => item.toString());
	}
	get pageSize() {
		return this._pageSize;
	}
	set pageSize(value) {
		value = parseInt(value, 10);
		if (Number.isInteger(value) && value > 0) {
			this._pageSize = value;
			localStorage.setItem(PAGINATION_STORAGE_KEY, value);
		} else {
			console.err(`'pageSize' must be greater then 0!`, LOG_KEY);
		}
	}
	get tableSize() {
		return this._tableSize;
	}
	set tableSize(value) {
		this._setTableSize(value);
	}
	_setTableSize(size) {
		switch (size) {
			case 'sm':
				this.tableSize = 'small';
				break;
			case 'md':
				this.tableSize = 'middle';
				break;
			case 'lg':
				this.tableSize = 'default';
				break;
			default:
				console.err(`Size must be one of [ 'sm', 'md', 'lg' ]`, LOG_KEY);
		}
	}
}

export default new SettingsStore();