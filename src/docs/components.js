const m2s = require("mongoose-to-swagger");
const User = require("../modules/user/Schema");
const Album = require("../modules/album/Schema");
const File = require("../modules/file/Schema");

module.exports = {
  components: {
    securitySchemes: {
      JWT: {
        description: "JWT token here..",
        type: "apiKey",
        name: "token",
        in: "header",
      },
    },
    schemas: {
      id: {
        type: "string",
        description: "An id of a data",
        example: "tyVgf",
      },
      User: m2s(User),
      Album: m2s(Album),
      File: m2s(File),
      FilePaging: {
        type: "object",
        properties: {
          limit: {
            type: "number",
          },
          start: {
            type: "number",
          },
          total: {
            type: "number",
          },
          data: {
            type: "File",
          },
        },
      },

      AlbumPaging: {
        type: "object",
        properties: {
          limit: {
            type: "number",
          },
          start: {
            type: "number",
          },
          total: {
            type: "number",
          },
          data: {
            type: "Album",
          },
        },
      },
      UserInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "user full name",
            required: true,
          },
          email: {
            type: "string",
            required: true,
          },
          password: {
            type: "string",
            required: true,
          },
        },
      },

      UserUpdateInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "user full name",
            required: true,
          },
          email: {
            type: "string",
            required: true,
          },
          status: {
            type: "string",
            required: true,
          },

          email_verified: {
            type: "boolean",
          },
        },
      },

      LoginInput: {
        type: "object",
        properties: {
          email: {
            type: "string",
            required: true,
          },
          password: {
            type: "string",
            required: true,
          },
        },
      },

      ResetPassInput: {
        type: "object",
        properties: {
          code: {
            type: "string",
            description: "code sent in email",
            required: true,
          },
          email: {
            type: "string",
            required: true,
          },
          password: {
            type: "string",
            required: true,
            description: "new password",
          },
        },
      },

      CodeInput: {
        type: "object",
        properties: {
          code: {
            type: "string",
            required: true,
          },
        },
      },
      EmailInput: {
        type: "object",
        properties: {
          email: {
            type: "string",
            required: true,
          },
        },
      },

      FileInput: {
        type: "object",
        properties: {
          name: {
            type: "string",
            required: true,
          },
        },
      },

      Upload: {
        type: "object",
        properties: {
          file: {
            type: "string",
            format: "binary",
          },
        },
      },

      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },

          status: {
            type: "number",
          },
        },
      },

      ValidationError: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
};
