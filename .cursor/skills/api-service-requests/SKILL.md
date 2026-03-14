---
name: api-service-requests
description: Standard pattern for API service modules: use apiClient, try/catch, return { ok, data, statusCode }. Use when creating or editing service files that call the backend (surveyService, authService, or new *Service.js in src/services/).
---

# API Service Requests Pattern

Use this pattern for every service in `src/services/` that calls the backend via `apiClient`.

## Setup

- Import: `import apiClient from '@/lib/axios'`
- Export an object with async methods (e.g. `export const surveyService = { ... }`).

## Method shape

Each method must:

1. Use `try/catch`.
2. Call `apiClient.get/post/put/delete(...)` and store the result in `res`.
3. Treat only specific status codes as success; everything else returns `{ ok: false }`.
4. Return the same shape: `{ ok: boolean, data, statusCode? }`.

## Success status codes

| HTTP method | Success statuses |
|-------------|------------------|
| GET         | 200              |
| POST        | 200, 201         |
| PUT         | 200              |
| DELETE      | 200, 204         |

Adjust per endpoint if the API contract differs (e.g. POST that only returns 201).

## Return values

- **Success**: `return { ok: true, data: res.data, statusCode: res.status }`
- **Non-success status**: `return { ok: false, data: res.data, statusCode: res.status }`
- **Caught error**: `return { ok: false, data: error }` (no `statusCode`; error may be normalized by axios interceptor)

## Template

```javascript
import apiClient from '@/lib/axios'

export const resourceService = {
  getList: async () => {
    try {
      const res = await apiClient.get('/api/resources')
      if (res.status !== 200) {
        return { ok: false, data: res.data, statusCode: res.status }
      }
      return { ok: true, data: res.data, statusCode: res.status }
    } catch (error) {
      return { ok: false, data: error }
    }
  },

  getOne: async (id) => {
    try {
      const res = await apiClient.get(`/api/resources/${id}`)
      if (res.status !== 200) {
        return { ok: false, data: res.data, statusCode: res.status }
      }
      return { ok: true, data: res.data, statusCode: res.status }
    } catch (error) {
      return { ok: false, data: error }
    }
  },

  create: async (body) => {
    try {
      const res = await apiClient.post('/api/resources', body)
      if (res.status !== 200 && res.status !== 201) {
        return { ok: false, data: res.data, statusCode: res.status }
      }
      return { ok: true, data: res.data, statusCode: res.status }
    } catch (error) {
      return { ok: false, data: error }
    }
  },

  update: async (id, body) => {
    try {
      const res = await apiClient.put(`/api/resources/${id}`, body)
      if (res.status !== 200) {
        return { ok: false, data: res.data, statusCode: res.status }
      }
      return { ok: true, data: res.data, statusCode: res.status }
    } catch (error) {
      return { ok: false, data: error }
    }
  },

  remove: async (id) => {
    try {
      const res = await apiClient.delete(`/api/resources/${id}`)
      if (res.status !== 200 && res.status !== 204) {
        return { ok: false, data: res.data, statusCode: res.status }
      }
      return { ok: true, data: res.data, statusCode: res.status }
    } catch (error) {
      return { ok: false, data: error }
    }
  },
}
```

## Rules

- Do not throw inside service methods; always return `{ ok, data, statusCode? }`.
- Use the same status checks as in the table; for custom endpoints (e.g. only 201 for create), use the appropriate condition.
- Follow Standard.js: 2 spaces, single quotes, no semicolons, space after commas and before `=>`.
- Keep one method per logical operation; add new methods following this pattern.
