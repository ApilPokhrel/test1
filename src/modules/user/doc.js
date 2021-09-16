module.exports = {
  "/user/me": {
    get: {
      tags: ["Gallery CRUD operations"],
      description: "Get user",
      operationId: "me",
      parameters: [],
      security: [{ JWT: [] }],
      responses: {
        200: {
          description: "Me",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        404: {
          description: "User is not found",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
                example: {
                  message: "can't find the user",
                  internal_code: "Invalid auth",
                },
              },
            },
          },
        },
      },
    },
  },

  "/user/register": {
    post: {
      tags: ["Gallery CRUD operations"],
      description: "Register user",
      operationId: "register",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserInput",
            },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
        400: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ValidationError",
              },
            },
          },
        },
      },
    },
  },

  "/user/login": {
    post: {
      tags: ["Gallery CRUD operations"],
      description: "Login user",
      operationId: "login",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/LoginInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "User logged in successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
        404: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
                example: {
                  message: "can't find the user",
                  internal_code: "Invalid auth",
                },
              },
            },
          },
        },

        400: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ValidationError",
              },
            },
          },
        },
      },
    },
  },

  "/user/reset-pass": {
    post: {
      tags: ["Gallery CRUD operations"],
      description: "Reset pass",
      operationId: "reset-pass",
      parameters: [],
      security: [{ JWT: [] }],

      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ResetPassInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },
  },

  "/user/code": {
    post: {
      tags: ["Gallery CRUD operations"],
      description: "Verify code",
      operationId: "verifyCode",
      parameters: [],
      security: [{ JWT: [] }],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/CodeInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },

    get: {
      tags: ["Gallery CRUD operations"],
      description: "send code",
      operationId: "sendCode",
      parameters: [],
      security: [{ JWT: [] }],
      responses: {
        200: {
          description: "successfully",
        },
        500: {
          description: "Server error",
        },
      },
    },
  },

  "/user/sendcode": {
    post: {
      tags: ["Gallery CRUD operations"],
      description: "Send code for not logged in user",
      operationId: "sendCodeUnverified",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/EmailInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },
  },

  "/user/:id": {
    get: {
      tags: ["Gallery CRUD operations"],
      description: "Get user by id",
      operationId: "getUserById",
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A single user id",
        },
      ],
      security: [{ JWT: [] }],

      responses: {
        200: {
          description: "successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },

    patch: {
      tags: ["Gallery CRUD operations"],
      description: "Update user",
      operationId: "updateUserById",
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A single user id",
        },
      ],
      security: [{ JWT: [] }],

      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserUpdateInput",
            },
          },
        },
      },
      responses: {
        200: {
          description: "successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },

    delete: {
      tags: ["Gallery CRUD operations"],
      description: "Delete user",
      operationId: "deleteUser",
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A single user id",
        },
      ],
      security: [{ JWT: [] }],

      responses: {
        200: {
          description: "successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        500: {
          description: "Server error",
        },
      },
    },
  },
};
