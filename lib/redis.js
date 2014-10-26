var redis = require('redis');

var db = {};

db.connect = function(args, callback){
	if(typeof args == 'function' && !callback)
	{
		callback = args;
		args = null;
	}

	if(!callback)
		throw new Error('callback is required.');

	if(typeof callback != 'function')
		throw new Error('callback should be a function.');

	if(!args)
		return callback('redis server config is required.');

	if(typeof args != 'object')
		return callback('redis server config should be an object.');

	if(!('host' in args) || !args.host)
		return callback('redis server host address is required.');

	if(typeof args.host != 'string')
		return callback('redis server host address should be a string.');

	if(!('port' in args) || args.port == undefined || args.port == null)
		return callback('redis server port number is required.');

	if(typeof args.port != 'number')
		return callback('redis server port number should be a number.');

	if(args.port <= 0)
		return callback('redis server port number should be greater than zero.');

	if(!('db' in args) || args.db == undefined || args.db == null)
		return callback('redis server db number is required.');

	if(typeof args.db != 'number')
		return callback('redis server db number should be a number.');

	if(args.db < 0)
		return callback('redis server db number can\'t be less than zero.');

	var redisClient = redis.createClient(args.port, args.host);

	redisClient.on('connect', function(){
		redisClient.select(args.db, function(err, success){
			if(err)
				return callback(err);
			return callback(null, redisClient);
		});
	});

	redisClient.on('error', function(err){
		return callback(err);
	});
};

module.exports = db;
