import { updateItem } from '../libs/db.js';
import { ok, bad } from '../libs/response.js';

export const handler = async (event) => {
  try {
    const id = event.pathParameters?.id;
    if (!id) return bad('Missing item ID');

    const body = JSON.parse(event.body || '{}');
    if (!body.name) return bad('`name` is required');

    const now = new Date().toISOString();
    const updatedItem = {
      id,
      name: body.name,
      description: body.description || '',
      updatedAt: now,
    };

    await updateItem(updatedItem);
    return ok(updatedItem);
  } catch (e) {
    return bad(e.message);
  }
};
