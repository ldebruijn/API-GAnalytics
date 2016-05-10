'use strict';
var utils = require('./utils');

var PageView = function(req) {
    this.t = 'pageview';
    this.setPath(req);
};

PageView.prototype.setHostname = function(name) {
    this.dh = name;
    return this;
};

/**
 * Sets the path after the hostname. In order to aggregate requests using ID's
 * or other params, the usage of `req.route.path` is recommended.
 *
 * http://expressjs.com/en/4x/api.html#req.route
 *
 * @param path - The currently-matched route as a string
 * @param query - An object of query parameters
 * @return {PageView}
 */
PageView.prototype.setPath = function(req) {
    let path = req.path;

    if (req.route && req.route.path) {
        path = req.route.path;
        path += '?';
        path +=  utils.objectToFormUrlEncodedString(req.query);
    }

    this.dp = path;

    return this;
};

PageView.prototype.toFormUrlEncodedString = function() {
    return utils.objectToFormUrlEncodedString(this);
};

module.exports = PageView;