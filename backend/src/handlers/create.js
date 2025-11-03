import { randomUUID } from 'node:crypto';
import { putItem } from '../libs/db.js';
import { created, bad } from '../libs/response.js';

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');
    if (!body.name) return bad('`name` is required');
    const now = new Date().toISOString();
    const item = {
      id: randomUUID(),
      name: body.name,
      description: body.description || '',
      createdAt: now,
      updatedAt: now,
    };
    await putItem(item);
    return created(item);
  } catch (e) {
    return bad(e.message);
  }
};
