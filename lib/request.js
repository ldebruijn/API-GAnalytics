'use strict';

const https = require('https');

const ENV = process.env.NODE_ENV;
const ENV_PRODUCTION = 'production';

const DEBUG_PATH = '/debug/collect';

const REQUEST_CONFIG = {
    hostname : 'www.google-analytics.com',
    port : 443,
    path : '/batch',
    method : 'POST'
};

class Request {

    constructor(requestBody, debug) {
        this.requestBody = requestBody;
        this.debug = debug;
        Request.configureDebugMode(this.debug);
    }

    send() {
        if (!this.shouldMakeRequest()) {
            return;
        }

        REQUEST_CONFIG.headers = this.requestBody.headers;

        let request = https.request(
            REQUEST_CONFIG,
            (response) => {
                if (this.inDebugMode()) {
                    response.setEncoding('utf-8');
                    response.on('data', (d) => {
                        console.log(d)
                    });
                }
            });

        request.write(this.requestBody.payload);
        request.end();
    }

    /**
     * The module should only make requests to the GA server whenever one of the following scenario's is true:
     * The module is in debug mode
     * The module is running on production
     * @return {*|boolean}
     */
    shouldMakeRequest() {
        return this.inDebugMode() || ENV === ENV_PRODUCTION;
    }

    inDebugMode() {
        return this.debug;
    }

    static configureDebugMode(debug) {
        if (debug) {
            REQUEST_CONFIG.path = DEBUG_PATH;
        }
    }
}

module.exports = Request;
