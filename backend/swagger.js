const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Full Stack Restaurants App',
    description: 'Order food online',
  },
  host: 'api.cyril-grazefullstackrestaurantapplication.com',
  schemes: ['https'],
  securityDefinitions: {
    jwt: {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = [
    './app.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc);