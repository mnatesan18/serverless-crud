import { deleteItem } from '../libs/db.js';
import { noContent } from '../libs/response.js';

export const handler = async (event) => {
  const id = event.pathParameters?.id;
  await deleteItem(id);
  return noContent();
};
