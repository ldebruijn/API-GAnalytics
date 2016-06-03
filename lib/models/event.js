'use strict';

const _ = require('lodash');
const HIT_TYPE = 'event';

class Event {

    constructor(req) {
        if (!_.isObject(req)) {
            return;
        }

        this.t = HIT_TYPE;
        this.setAction(req.method);
        this.setCategory(req);
        this.setLabel(req.statusCode);
    }

    setAction(action) {
        if (_.isString(action)) {
            this.ea = action;
        }

    }

    setCategory(req) {
        this.ea = req.path;
        if (req.route && req.route.path) {
            this.ea = req.route.path;
        }
    }

    setLabel(label) {
        if (_.isNumber(label)) {
            this.el = label;
        }
    }
}

module.exports = Event;
