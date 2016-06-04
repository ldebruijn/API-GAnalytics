'use strict';

const _ = require('lodash');
const HIT_TYPE = 'event';

class Event {

    constructor(req, res) {
        if (!_.isObject(req)) {
            return;
        }

        this.t = HIT_TYPE;
        this.setAction(req.method);
        this.setCategory(req);
        this.setLabel(res.statusCode);
    }

    setAction(action) {
        if (_.isString(action)) {
            this.ea = action;
        }

    }

    setCategory(req) {
        this.ec = req.path;
        if (req.route && req.route.path && _.isString(req.route.path)) {
            this.ec = req.route.path;
        }
    }

    setLabel(label) {
        if (_.isNumber(label)) {
            this.el = label;
        }
    }
}

module.exports = Event;
