import { Database } from "../database.js";
const database = new Database();

export function validateBody(body) {
  const errorMessages = [];
  if (!body) {
    errorMessages.push("Body is required");
  } else {
    if (!body.title) {
      errorMessages.push("Title is required");
    }
    if (!body.description) {
      errorMessages.push("Description is required");
    }
  }

  return errorMessages;
}

export function validateIdExists(id) {
  const task = database.selectById("tasks", id);
  if (!task) {
    return false;
  }
  return true;
}
