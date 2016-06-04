'use strict';

const _ = require('lodash');
const HIT_TYPE = 'pageview';

class Pageview {

    constructor(req) {
        if (!_.isObject(req)) {
            return;
        }

        this.t = HIT_TYPE;
        this.setPath(req.path);
        this.setHostname(req.hostname);
        this.setTitle(req);

    }

    setPath(path) {
        if (_.isString(path)) {
            this.dp = path;
        }
    }

    setHostname(hostname) {
        if (_.isString(hostname)) {
            this.dh = hostname;
        }
    }

    setTitle(req) {
        if (req.route && req.route.path && _.isString(req.route.path)) {
            this.dt = req.route.path;
        }
    }
}

module.exports = Pageview;
