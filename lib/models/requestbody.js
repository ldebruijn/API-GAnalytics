'use strict';

const url = require('url');
const NEWLINE = '\n';
const AMPERSAND = '&';

class RequestBody {

    constructor(req, general, session) {
        this.headers = {};
        this.headers['User-Agent'] = req.headers['user-agent'];
        
        this.sharedPayload = RequestBody.toQueryString(general);
        this.sharedPayload += AMPERSAND + RequestBody.toQueryString(session);

        this.payload = '';
    }

    setEvent(event) {
        this.appendToPayload(RequestBody.toQueryString(event));
        return this;
    }

    setPageview(pageview) {
        this.appendToPayload(RequestBody.toQueryString(pageview));
        return this;
    }

    setException(exception) {
        this.appendToPayload(RequestBody.toQueryString(exception));
        return this;
    }

    static toQueryString(object) {
        return url.format({query: object}).substring(1);
    }

    appendToPayload(object) {
        this.payload += this.sharedPayload + AMPERSAND + object + NEWLINE;
    }

}

module.exports = RequestBody;
