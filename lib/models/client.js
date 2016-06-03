'use strict';

const _ = require('lodash');
const Utils = require('../utils');

class Client {
    constructor(req, options) {
        if (!_.isObject(req)) {
            return;
        }
        options = options || {};

        this.setClientId(req, options.clientId);
        this.setIP(req.ip);
        this.setUserAgent(req.headers['user-agent']);
    }

    setClientId(req, traversePath) {
        let result = _.get(req, traversePath);
        if (_.isString(result) || _.isNumber(result)) {
            this.cid = result;
        }
        return this;
    }

    setIP(ip) {
        if (_.isString(ip)) {
            this.uip = ip;
        }
        return this;
    }

    setUserLanguage(locale) {
        this.ul = locale;
        return this;
    }

    setUserAgent(userAgent) {
        this.ua = userAgent;
        return this;
    }


}

module.exports = Client;
