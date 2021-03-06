module.exports = class SQLEngineQueryBuilder {
    constructor() {
        this.where_statements = [];
        this.from_table = '';
        this.select_arrays = [];
        this.value_array = [];
    }
    table(name = 'default') {
        this.from_table = name;
        return this;
    }
    select(item, as = '') {
        if(as !== '') {
            this.select_arrays.push(item + ' as ' + as);
        }
        else {
            this.select_arrays.push(item);
        }
        return this;
    }
    where(condition, compare, value) {
        this.value_array.push({
            for: condition,
            val: value
        });
        this.where_statements.push(condition + ' = ?');
        return this;
    }
    write() {
        let self = this;
        var query = 'SELECT ' + this.select_arrays.join(', ') + ' FROM ' + this.from_table;
        query += ' WHERE ' + this.where_statements.join(' AND ');
        return {
            query,
            replacements: self.value_array
        };
    }
}