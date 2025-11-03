import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

let items = []; // 👈 in-memory array for offline use

const isOffline = !process.env.AWS_ACCESS_KEY_ID && process.env.IS_OFFLINE; // true when serverless-offline is running

let docClient;

if (isOffline) {
  console.log("🧠 Running in offline mode — using local mock DB");
  docClient = null; // no AWS
} else {
  const client = new DynamoDBClient({ region: "us-east-1" });
  docClient = DynamoDBDocumentClient.from(client);
}

// ---------- CRUD Functions ----------

export const putItem = async (item) => {
  if (isOffline) {
    items.push(item);
    return item;
  }
  await docClient.send(new PutCommand({
    TableName: process.env.TABLE_NAME,
    Item: item,
  }));
  return item;
};

export const scanItems = async () => {
  if (isOffline) return items;
  const result = await docClient.send(new ScanCommand({
    TableName: process.env.TABLE_NAME,
  }));
  return result.Items || [];
};

export const deleteItem = async (id) => {
  if (isOffline) {
    items = items.filter((i) => i.id !== id);
    return { message: "Deleted locally" };
  }
  await docClient.send(new DeleteCommand({
    TableName: process.env.TABLE_NAME,
    Key: { id },
  }));
  return { message: "Deleted" };
};

export const updateItem = async (id, data) => {
  if (isOffline) {
    const index = items.findIndex((i) => i.id === id);
    if (index === -1) return null;
    items[index] = { ...items[index], ...data };
    return items[index];
  }

  await docClient.send(new UpdateCommand({
    TableName: process.env.TABLE_NAME,
    Key: { id },
    UpdateExpression: "set #n = :name, #d = :description",
    ExpressionAttributeNames: { "#n": "name", "#d": "description" },
    ExpressionAttributeValues: { ":name": data.name, ":description": data.description },
    ReturnValues: "ALL_NEW",
  }));
};
