'use strict';

const should = require('should');
const Pageview = require('../../lib/models/pageview');

describe('Pageview model', function() {
    let pageview;

    beforeEach(function(done) {
        pageview = new Pageview();
        done();
    });

    describe('Page Path', function() {

        it('Should not allow non-string values', function(done) {
            pageview.setPath(1);
            should.not.exist(pageview.dp);

            pageview.setPath(null);
            should.not.exist(pageview.dp);

            pageview.setPath(undefined);
            should.not.exist(pageview.dp);

            done();
        });

        it('Should allow string values', function(done) {
            pageview.setPath('hello path');
            pageview.dp.should.equal('hello path');

            done();
        });
    });

    describe('Page Hostname', function() {

        it('Should not allow non-string values', function(done) {
            pageview.setHostname(1);
            should.not.exist(pageview.dh);

            pageview.setHostname(null);
            should.not.exist(pageview.dh);

            pageview.setHostname(undefined);
            should.not.exist(pageview.dh);

            done();
        });

        it('Should allow string values', function(done) {
            pageview.setHostname('hello');
            pageview.dh.should.equal('hello');

            done();
        });
    });

    describe('Page title', function() {
        let req = {
            route : {
                path : 'hello path'
            }
        };

        it('Should not allow non-string values', function(done) {
            req.route.path = 1;

            pageview.setTitle(req);
            should.not.exist(pageview.dt);

            req.route.path = null;

            pageview.setTitle(req);
            should.not.exist(pageview.dt);

            req.route.path = undefined;

            pageview.setTitle(req);
            should.not.exist(pageview.dt);

            done();
        });

        it('Should allow string values', function(done) {
            req.route.path = 'hello path';

            pageview.setTitle(req);
            pageview.dt.should.equal('hello path');

            done();
        });
    })
});
