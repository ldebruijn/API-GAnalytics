'use strict';

const Utils = require('../lib/utils');
const _ = require('lodash');

describe('Utils test', function () {

    it('TraverseObject should end up at the right destination', function(done) {
        let req = {
           user : {
               id : 1
           },
           headers : {}
        };

        let result = _.get(req, ['user', 'id']);
        result.should.equal(1);

        done();
    });
});
