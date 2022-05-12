const { validationResult } = require('express-validator/check');
const Redis = require('redis');

// redis client
// for local
const redisClient = Redis.createClient({ legacyMode: true });

// for prod
// const redisClient = Redis.createClient({ url: url })

redisClient.connect();

// redis helper
exports.getOrSetCache = async (key, cb) => {
    const dataSavedInRedis = await redisClient.v4.get(key);

    if (dataSavedInRedis != null) {
        console.log('from redis');
        return JSON.parse(dataSavedInRedis);
    } else {
        const freshData = await cb();
        redisClient.setEx(key, 3600, JSON.stringify(freshData));
        return freshData;
    }
};

exports.flushRedis = async () => {
    await redisClient.flushAll();
    console.log('redis flushed');
};

exports.validate = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
        });
    }
};

// helper functions
exports.errorHandler = (err, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    if (err.response?.data?.error) {
        next(err.response.data.error);
    } else {
        next(err);
    }
};
