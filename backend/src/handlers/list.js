import { scanItems } from "../libs/db.js";
import { ok } from "../libs/response.js";

export const handler = async () => {
  const { Items = [] } = await scanItems();
  return ok(Items);
};
