'use strict';

const _ = require('lodash');
const uuid = require('uuid');

const UUID_SETTINGS = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0,
    nsecs: 0
};

class Session {
    constructor(req, options) {
        if (!_.isObject(req)) {
            return;
        }
        options = options || {};

        this.setClientId(req, options.userId);
        this.setUserId(req, options.userId);
        this.setIP(req.ip);
        this.setUserAgent(req.headers['user-agent']);
        this.setUserLanguage(req, options.locale);
    }

    setClientId(req, traversePath) {
        let result = _.get(req, traversePath);
        if (_.isNumber(result)) {
            UUID_SETTINGS.msecs = result;
            this.cid = uuid.v1(UUID_SETTINGS);
        }
    }

    setUserId(req, traversePath) {
        let result = _.get(req, traversePath);
        if (_.isNumber(result)) {
            this.uid = result;
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
