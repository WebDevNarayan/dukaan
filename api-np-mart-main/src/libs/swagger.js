/**
 * @type import('swagger-jsdoc').Options
 */
export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Duk@an Api",
      version: "1.0.0",
      description: "Duk@an Api",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Narayan Dura",
        email: "narayandura5@gmail.com",
        url: "https://github.com/WebDevNarayan",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
