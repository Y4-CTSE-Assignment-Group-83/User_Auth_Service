import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Salon Auth Service API",
      version: "1.0.0",
      description: "Authentication microservice for Salon Booking System",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Swagger will read comments from routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
