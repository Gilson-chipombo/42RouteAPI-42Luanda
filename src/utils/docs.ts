// src/utils/docs.ts

interface SchemaDocs {
  list: object;
  get: object;
  create: object;
  update: object;
  delete: object;
}

export function autoDocs(entity: string, label: string): SchemaDocs {
  return {
    list: {
      tags: [label],
      summary: `Listar ${label}`,
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              name: { type: 'string' },
              email: { type: 'string' },
              phone: { type: 'string' },
              created_at: { type: 'string' }
            }
          }
        }
      }
    },

    get: {
      tags: [label],
      summary: `Buscar ${label} por ID`,
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        },
        required: ['id']
      },
      response: {
        200: { type: 'object' },
        404: { type: 'object' }
      }
    },

    create: {
      tags: [label],
      summary: `Criar ${label}`,
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' }
        },
        required: ['name', 'email', 'phone']
      },
      response: {
        201: { type: 'object' }
      }
    },

    update: {
      tags: [label],
      summary: `Atualizar ${label}`,
      params: {
        type: 'object',
        properties: { id: { type: 'number' } },
        required: ['id']
      },
      body: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          phone: { type: 'string' }
        }
      },
      response: {
        200: { type: 'object' },
        404: { type: 'object' }
      }
    },

    delete: {
      tags: [label],
      summary: `Eliminar ${label}`,
      params: {
        type: 'object',
        properties: { id: { type: 'number' } },
        required: ['id']
      },
      response: {
        204: { type: 'null' },
        404: { type: 'object' }
      }
    }
  };
}
