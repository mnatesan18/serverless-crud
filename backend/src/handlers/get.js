import { getItem } from '../libs/db.js';
import { ok, notFound } from '../libs/response.js';

export const handler = async (event) => {
  const id = event.pathParameters?.id;
  const { Item } = await getItem(id);
  if (!Item) return notFound();
  return ok(Item);
};
