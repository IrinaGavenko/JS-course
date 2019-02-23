// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
	var _command = command.split(' ');

        // 'ADD Ivan 555-10-01,555-10-03'
        if (_command[0] == "ADD") {
            var name = _command[1];
            var _number = _command[2].split(',');
            var number = '';
            if (name in phoneBook) {
              if (phoneBook[name] != '') {
                number = phoneBook[name];
                number += ', ';
              }
            }
            for (var i = 0; i < _number.length; i++) {
                if (i != (_number.length - 1)) {
                    number += _number[i];
                    number += ', ';
                }
                else {
                    number += _number[i];
                }
            }
            phoneBook[name] = number;
            //console.log('ADD: ', phoneBook);
        }

        // 'REMOVE_PHONE 555-10-03'
        if (_command[0] == "REMOVE_PHONE") {
            var del_n = _command[1];
            var name = '';
            var line = [];
            for (key in phoneBook) {
                var flag = false;
                var number = phoneBook[key];
                var _number = number.split(', ');
                for (var i = 0; i < _number.length; i++) {
                    if (_number[i] == del_n) {
                        name = key;
                        _number.splice(i, 1);
                        line = _number;
                        flag = true;
                        break;
                    }
                }
                if (flag) break;
            }
            if (flag) {
                var new_number = '';
                for (var i = 0; i < line.length; i++) {
                    if (i != (_number.length - 1)) {
                        new_number += line[i];
                        new_number += ', ';
                    }
                    else {
                        new_number += line[i];
                    }
                }
                phoneBook[name] = new_number;
                //console.log('Remove: ', name, new_number);
                return true;
            }
            else {
                //console.log('not found');
                return false;
            }
        }

        //'SHOW'
        if (_command[0] == "SHOW") {
            var sorted = [];

            for(var key in phoneBook) {
                sorted[sorted.length] = key;
            }
            sorted.sort();
            var result = [];
            for (var i=0; i < sorted.length; ++i) {
                var key = sorted[i];
                if (phoneBook[key] != '') {
                  //console.log('why , ???', phoneBook[key]);
                  line = key + ': ' + phoneBook[key] + ', ';
                  result.push(line.substring(0, line.length - 2));
                }
            }
            //console.log('SHOW: ', result);
            return result;
        }
};
