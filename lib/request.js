'use strict';

const https = require('https');

const ENV = process.env.NODE_ENV;
const ENV_PRODUCTION = 'production';

const REQUEST_CONFIG = {
    hostname : 'www.google-analytics.com',
    port : 443,
    path : '/debug/collect',
    method : 'POST'
};

class Request {

    constructor(requestBody) {
        this.requestBody = requestBody;
    }


    send() {
        if (ENV !== ENV_PRODUCTION) {
            return;
        }
        
        REQUEST_CONFIG.headers = this.requestBody.headers;

        let request = https.request(
            REQUEST_CONFIG,
            (response) => {
                response.setEncoding('utf-8');
                response.on('data', (d) => {
                    console.log(d)
                });
            });
        
        request.write(this.requestBody.payload);
        request.end();
    }
}

module.exports = Request;
