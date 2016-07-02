var config = {};
// Database (MongoDB) configurations
config.development = {
    path: 'mongodb://localhost/portfolio-zaky'
};

config.test = {
    path: 'mongodb://localhost/portfolio-zaky-test'
};

config.staging = {
    path: 'some-uri'
};

config.production = {
    path: 'some-uri'
};

module.exports = config;
