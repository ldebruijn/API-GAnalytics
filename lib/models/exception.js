'use strict';

const _ = require('lodash');
const HIT_TYPE = 'exception';

class Exception {

    constructor(err) {
        this.t = HIT_TYPE;
        this.setDescription(err.name);
        this.setIsFatal();
    }

    setDescription(description) {
        if (_.isString(description)) {
            this.exd = description;
        }
    }

    setIsFatal(isFatal) {
        if(_.isNumber(isFatal)) {
            this.exf = isFatal;
        }
    }
}

module.exports = Exception;
