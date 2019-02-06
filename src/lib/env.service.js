function get_env(key) {
	let react_key = 'REACT_APP_' + key;
	if (react_key in process.env) {
		return process.env[react_key];
	} else {
		throw new Error(`Enviromental varialble '${react_key}' does not exists!`);
	}
}

const env = {
	number: (key) => {
		let value = get_env(key);
		return Number.parseFloat(value);
	},
	get: (key) => {
		return get_env(key);
	},
	is: (key) => {
		let value = get_env(key);
		if (value === 'true') {
			return true;
		} else if (value === 'false') {
			return false;
		} else {
			throw new Error(`Parse error at ${key} enviromental variable!`);
		}
	}
}

export default env;