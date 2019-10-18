var expect = require('chai').expect;
var redis = require(__dirname + '/../lib/redis');

describe('redis', function(){

	describe('connect', function(){
		it('should throw an error if no callback', function(){
			var fn = function() { redis.connect(); };
			expect(fn).to.throw(/callback is required./);
		});

		it('should throw an error if callback isn\'t a function', function(){
			var fn = function() { redis.connect('config', 'callback'); };
			expect(fn).to.throw(/callback should be a function./);
		});

		it('should return an error if no configuration', function(done){
			redis.connect(function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('redis server config is required.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if configuration isn\'t an object', function(done){
			redis.connect('configuration', function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('redis server config should be an object.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if host configuration doesn\'t exist', function(done){
			redis.connect({
				host: null
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('redis server host address is required.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if host configuration isn\'t string', function(done){
			redis.connect({
				host: []
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('redis server host address should be a string.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if port configuration doesn\'t exist', function(done){
			redis.connect({
				host: 'redis',
				port: null
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('redis server port number is required.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if port configuration isn\'t number', function(done){
			redis.connect({
				host: 'redis',
				port: '1234'
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('redis server port number should be a number.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if port configuration is less than or equal 0', function(done){
			redis.connect({
				host: 'redis',
				port: 0
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('redis server port number should be greater than zero.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if db configuration doesn\'t exist', function(done){
			redis.connect({
				host: 'redis',
				port: 6379,
				db: null
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('redis server db number is required.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if db configuration isn\'t number', function(done){
			redis.connect({
				host: 'redis',
				port: 6379,
				db: '0'
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('redis server db number should be a number.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return an error if db configuration is less than 0', function(done){
			redis.connect({
				host: 'redis',
				port: 6379,
				db: -1
			}, function(err, client){
				expect(err).to.not.be.null;
				expect(err).to.be.equal('redis server db number can\'t be less than zero.');
				expect(client).to.be.undefined;
				done();
			});
		});

		it('should return a redis client object if database config is correct', function(done){
			redis.connect({
				host: 'redis',
				port: 6379,
				db: 0
			}, function(err, client){
				expect(err).to.be.null;
				expect(client).to.exist;
				done();
			});
		});
	});
});
