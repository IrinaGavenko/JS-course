/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {

  if (arguments.length == 1) 
	return JSON.parse(JSON.stringify(collection));

  var actions = [].slice.call(arguments, 1);
  var filters = [];
  var selects = [];

  actions.forEach(function(item, index) {     
    if (item.toString().includes('filter')) filters.push(index);
    else selects.push(index);
  });

  var newData = JSON.parse(JSON.stringify(collection));
   
  for (var i = 0; i < filters.length; i++)
    newData = actions[filters[i]](newData);

  for (var i = 0; i < selects.length; i++)
    newData = actions[selects[i]](newData);

  return newData;
}

/**
 * @params {String[]}
 */
function select(...fields) {
  return function (data) {
  var keys = Object.keys(data[0]);
  keys = new Set(keys);
    return data.map(function (x) {
      var item = {};
      fields.forEach(function (field) {
	if (keys.has(field)) {
          item[field] = x[field];
	}
      });
    return item;
   })
  }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(field, values) {
  return function (data) {
    return data.filter(function (x) {
      return values.indexOf(x[field]) > -1;
    })
  }
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};

