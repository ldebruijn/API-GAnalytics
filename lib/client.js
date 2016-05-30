'use strict';
var Utils = require('./utils');

var Client = function(options) {
    this.tid = options.trackingId;
    this.ds = options.hostname || 'API';
    this.v = '1';
    this.uip = null;
    this.cid = null;
    this.ul = null;
};

Client.prototype.setTrackingId = function(trackingId) {
    this.tid = trackingId || this.tid;
    return this;
};

Client.prototype.setClientIP = function(address) {
    if (address === '::1') {
        address = '127.0.0.1'
    }
    this.uip = address;
    return this;
};

Client.prototype.setLanguage = function(req, language) {
    if (req == null || language == null) {
        return this;
    }

    if (!language instanceof Array) {
        language = [ language ];
    }

    this.ul = Utils.traverseObjectByArray(req, language);
    return this;
};

Client.prototype.setClientID = function(req, clientId) {
    if (clientId == null || req == null) {
        return this;
    }

    if (!clientId instanceof Array) {
        clientId = [ clientId ];
    }
    this.cid = Utils.traverseObjectByArray(req, clientId);
    return this;
};

Client.prototype.setUserAgent = function(userAgent) {
    this.ua = userAgent;
    return this;
};

Client.prototype.toFormUrlEncodedString = function() {
    return Utils.objectToFormUrlEncodedString(this);
};


module.exports = Client;