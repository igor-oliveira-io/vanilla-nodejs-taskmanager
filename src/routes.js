import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-rout-path.js";
import { validateBody, validateIdExists } from "./utils/validate-request.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: async (req, res) => {
      const { search } = req.query;
      const tasks = database.select("tasks", search ? { title: search } : null);
      return res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: async (req, res) => {
      const errorMessages = validateBody(req.body);
      if (errorMessages.length > 0) {
        console.error("Validation errors:", errorMessages);
        return res
          .writeHead(400)
          .end(JSON.stringify({ errors: errorMessages }));
      }

      const { title, description } = req.body;
      console.log(title, description);
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      database.insert("tasks", task);
      return res.writeHead(201).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: async (req, res) => {
      const { id } = req.params;
      if (!validateIdExists(id)) {
        return res.writeHead(404).end("Tarefa não encontrada");
      }

      database.delete("tasks", id);
      return res.writeHead(204).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: async (req, res) => {
      const { id } = req.params;
      if (!validateIdExists(id)) {
        return res.writeHead(404).end("Tarefa não encontrada");
      }
      const errorMessages = validateBody(req.body);
      if (errorMessages.length > 0) {
        console.error("Validation errors:", errorMessages);
        return res
          .writeHead(400)
          .end(JSON.stringify({ errors: errorMessages }));
      }

      const { title, description } = req.body;

      database.update("tasks", id, { title, description });
      return res.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: async (req, res) => {
      const { id } = req.params;
      if (!validateIdExists(id)) {
        return res.writeHead(404).end("Tarefa não encontrada");
      }

      database.completeTask("tasks", id);
      return res.writeHead(204).end();
    },
  },
];
