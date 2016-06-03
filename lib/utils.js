var url = require('url');

function objectToFormUrlEncodedString(object) {
    var encodedString = '';

    for(var key in object) {
        if (object.hasOwnProperty(key) && object[key] != null) {
            encodedString += '&' + key + '=' + object[key];
        }
    }

    return encodedString.substring(1);
}

function toUrlFormEcondedString(object) {
    return url.format({ query : object}).substring(1);
}

function combineUrlEncodedStrings() {
    var encodedStrings = arguments;
    var combined = '';

    for (var i = 0; i < encodedStrings.length; i++) {
        combined += encodedStrings[i] + '&'
    }

    return combined.slice(0, -1);

}

module.exports.objectToFormUrlEncodedString = objectToFormUrlEncodedString;
module.exports.combineUrlEncodedStrings = combineUrlEncodedStrings;
module.exports.toUrlFormEncodedString = toUrlFormEcondedString;