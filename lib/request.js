'use strict';

const https = require('https');
const url = require('url');

const ENV = process.env.NODE_ENV;
const ENV_PRODUCTION = 'production';

const REQUEST_CONFIG = {
    hostname : 'www.google-analytics.com',
    port : 443,
    path : '/debug/collect',
    method : 'POST'
};

class Request {

    constructor(req, general, session, event, pageview) {
        this.headers = {};
        this.headers['User-Agent'] = req.headers['user-agent'];

        this.prefix = url.format({ query : general}).substring(1);
        this.prefix += '&' + url.format({ query : session}).substring(1);

        this.event = url.format({ query : event}).substring(1);
        this.pageview = url.format({ query : pageview}).substring(1);

        this.setPayload();
    }

    setPayload() {
        let payload = '';

        payload += this.prefix + '&' + this.event + '\n';
        payload += this.prefix + '&' + this.pageview + '\n';

        this.payload = payload;
    }

    send() {
        if (ENV !== ENV_PRODUCTION) {
            return;
        }
        
        REQUEST_CONFIG.headers = this.headers;

        let request = https.request(
            REQUEST_CONFIG,
            (response) => {
                response.setEncoding('utf-8');
                response.on('data', (d) => {
                    console.log(d)
                });
            });

        request.write(this.payload);
        request.end();
    }
}

module.exports = Request;
