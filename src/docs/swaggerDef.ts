import config from '../config/config.js';

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: `Tatsat API documentation`,
    version:"1.0.0",
    license: {
      name: 'MIT',
    }
  },
  servers: [
    {
      url: `http://localhost:${config.port}/v1`
    }
  ]
};

export default swaggerDef;