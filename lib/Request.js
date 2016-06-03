'use strict';

const https = require('https');
const url = require('url');

const REQUEST_CONFIG = {
    hostname : 'www.google-analytics.com',
    port : 443,
    path : '/batch',
    method : 'POST'
};

class Request {

    constructor(general, session, event, pageview) {
        this.general = url.format({ query : general});
        this.session = url.format({ query : session});
        this.event = url.format({ query : event});
        this.pageview = url.format({ query : pageview});

        this.setPayload();
    }

    setPayload() {
        let payload = "";

        payload += this.general + '\n';
        payload += this.session + '\n';
        payload += this.event + '\n';
        payload += this.pageview;

        this.payload = payload;
    }

    send() {
        let request = https.request(
            REQUEST_CONFIG,
            function(response) {
                console.log(response.statusCode)
                response.setEncoding('utf8');
                response.on('data', function(data) {
                    console.log('response=', data);
                })
        });

        request.on('error', function(e){ console.log('Error in request', e) });
        request.write(this.payload);
        request.end();
        console.log('nailed it')
    }
}

module.exports = Request;
