'use strict';

var chai = require('chai');
var should = chai.should();
var translator = require('../utils/translator.js');

describe('Translator', function() {
  describe('get', function() {
    it('should have property', function() {
      translator.should.have.property('get');
    });
    it('should fail without param', function(done) {
      translator.get(null, null, function(err) {
        should.exist(err);
        done();
      });
    });
    it('should gives an empty array', function(done) {
      translator.get('Harzand_(horse)', 'en', function(err, res) {
        should.not.exist(err);
        should.exist(res);
        res.should.be.deep.equal({});
        done();
      });
    });
  });
});
