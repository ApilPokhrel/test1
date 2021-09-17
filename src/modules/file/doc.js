module.exports = {
  "/file/:album": {
    get: {
      tags: ["Gallery CRUD operations"],
      description: "Get files from album",
      operationId: "files",
      parameters: [
        {
          name: "album",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A album id",
        },
      ],

      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/FileListBody",
            },
          },
        },
      },
      responses: {
        200: {
          description: "Files",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/FilePaging",
              },
            },
          },
        },
      },
    },
    post: {
      tags: ["Gallery CRUD operations"],
      description: "Upload a file to album",
      operationId: "upload",
      parameters: [
        {
          name: "album",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A album id",
        },
      ],
      security: [{ JWT: [] }],

      requestBody: {
        content: {
          "multipart/form-data": {
            schema: {
              $ref: "#/components/schemas/Upload",
            },
          },
        },
      },
      responses: {
        201: {
          description: "File uploaded successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/File",
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

  "/file/:id": {
    get: {
      tags: ["Gallery CRUD operations"],
      description: "Get file by id",
      operationId: "getFileById",
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A single file id",
        },
      ],

      responses: {
        200: {
          description: "successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/File",
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
      description: "Update file",
      operationId: "updateFileById",
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A single file id",
        },
      ],
      security: [{ JWT: [] }],

      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/FileInput",
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
                $ref: "#/components/schemas/File",
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
      description: "Delete file",
      operationId: "deleteFile",
      parameters: [
        {
          name: "id",
          in: "path",
          schema: {
            $ref: "#/components/schemas/id",
          },
          required: true,
          description: "A single file id",
        },
      ],
      security: [{ JWT: [] }],

      responses: {
        200: {
          description: "successfully",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/File",
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
