'use strict';

const _ = require('lodash');

class Session {
    constructor(req, options) {
        if (!_.isObject(req)) {
            return;
        }
        options = options || {};

        this.setClientId(req, options.clientId);
        this.setIP(req.ip);
        this.setUserAgent(req.headers['user-agent']);
        this.setUserLanguage(req, options.locale);
    }

    setClientId(req, traversePath) {
        let result = _.get(req, traversePath);
        if (_.isString(result) || _.isNumber(result)) {
            this.cid = result;
        }
    }

    setIP(ip) {
        if (_.isString(ip)) {
            this.uip = ip;
        }
    }

    setUserLanguage(req, traversePath) {
        let result = _.get(req, traversePath);
        if (_.isString(result)) {
            this.ul = result;
        }
    }

    setUserAgent(userAgent) {
        if (_.isString(userAgent)) {
            this.ua = userAgent;
        }
    }


}

module.exports = Session;
