/**
 * @package kona
 * @license MIT
 */

module.exports = class TempStorage {
    constructor() {
        this.store = [];
    }
    /**
     * Add an item into the storage array
     * @param {string} alias An alias to classify this object in memory as, used by select and delete
     * @param {any} data A mixed set of data, could be string, object, array, etc.
     */
    add(alias = '', data = {}) {
        this.store.push({
            known_as: alias,
            data
        });
    }
    /**
     * This is a getter, it will return a result by it's alias from the storage, or return null if the result does not exist in the storage array.
     * @param {string} alias The alias item to search for
     */
    select(alias) {
        var result;
        let store = this.store;
        store.forEach(item => {
            if(item.known_as === alias) {
                result = item;
            }
        });
        return result || null;
    }
    /**
     * This method will delete an item from the storage, if there are multiple instances of the stored item, ALL instances will be deleted in order of insert in the array.
     * @param {string} alias The alias given to delete from the temporary in-memory storage.
     */
    delete(alias) {
        var result;
        let store = this.store;
        store.forEach(item => {
            if(item.known_as === alias) {
                delete this.store[item];
                result = true;
            }
        });
        return result || false;
    }
    /**
     * Reset the storage array, effectively deleting everything from memory.
     */
    clear() {
        this.store = [];
    }
}