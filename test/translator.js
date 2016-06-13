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
    it('should gives the expected array', function(done) {
      translator.get('Grullo', 'en', function(err, res) {
        should.not.exist(err);
        should.exist(res);
        res.should.be.deep.equal({
          fr: 'Souris (cheval)',
          fi: 'Hiirakko',
        });
        res.should.not.be.deep.equal({});
        done();
      });
    });
  });

  describe('filter', function() {
    it('should have property', function() {
      translator.should.have.property('filter');
    });
    it('should fail without param', function(done) {
      translator.filter(null, null, null, function(err) {
        should.exist(err);
        done();
      });
    });
    it('should gives the expected array', function(done) {
      translator.filter('./test/resources/file.txt', 'en', 'fr',
        function(err, res) {
        should.not.exist(err);
        should.exist(res);
        res.should.be.deep.equal([
          'Cheval: Animals',
          'Moteur de recherche: Computers',
          'Palagrakx: Mystery',
        ]);
        done();
      });
    });
  });
});
