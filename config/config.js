var config = {
    // Database (MongoDB) configurations
    development: {
        path: 'mongodb://localhost/portfolio-zaky',
        secret: 'secret123'
    },
    test: {
        path: 'mongodb://localhost/portfolio-zaky-test'
    },
    staging: {
        path: 'some-uri'
    },
    production: {
        path: 'some-uri'
    },
    getDbPath: function (environment) {
        switch (environment)
        {
            case 'development':
                return config.development.path;
                break;

            case 'test':
                return config.test.path;
                break;

            case 'staging':
                break;

            case 'production':
                break;
        }
    }
};

module.exports = config;
