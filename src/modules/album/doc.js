module.exports = {
  "/album/": {
    get: {
      tags: ["Gallery CRUD operations"],
      description: "Get albums",
      operationId: "albums",
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/AlbumListBody",
            },
          },
        },
      },
      responses: {
        200: {
          description: "ALbums",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AlbumPaging",
              },
            },
          },
        },
      },
    },

    post: {
      tags: ["Gallery CRUD operations"],
      description: "add album",
      operationId: "addAlbum",
      parameters: [],
      security: [{ JWT: [] }],

      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Album",
            },
          },
        },
      },
      responses: {
        201: {
          description: "Album added successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Album",
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

  "/album/:id": {
    get: {
      tags: ["Gallery CRUD operations"],
      description: "Get album by id",
      operationId: "getAlbumById",
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A single album id",
        },
      ],

      responses: {
        200: {
          description: "successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Album",
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
      description: "Update album",
      operationId: "updateAlbumById",
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A single album id",
        },
      ],
      security: [{ JWT: [] }],

      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Album",
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
                $ref: "#/components/schemas/Album",
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
      description: "Delete album",
      operationId: "deleteAlbum",
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A single album id",
        },
      ],

      security: [{ JWT: [] }],

      responses: {
        200: {
          description: "successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Album",
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
