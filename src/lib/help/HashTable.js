class HashTable {
	_table = {};
	constructor(entities, hash = (e) => e.id) {
		this.hash = hash;
		entities.forEach(e => {
			this._table[hash(e)] = e;
		});
	}
	add(entity) {
		let entities = [];
		if (!Array.isArray(entity)) {
			entities.push(entity);
		} else {
			entities = entity.slice();
		}
		this._add(entities);
	}
	_add(entities, overwrite = false) {
		entities.foreach(e => {
			let id = this.hash(e);
			if (!this._table[id] || overwrite) {
				this._table[id] = e;
			} else {
				throw new Error(`Entity with id '${id}' already exist!`);
			}
		})
	}
	get(hash) {
		return this._table[hash];
	}
	remove(hash) {
		delete this._table[hash];
	}
	clear() {
		this._table = {};
	}
}

export default HashTable;