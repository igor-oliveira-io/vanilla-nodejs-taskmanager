import { parse } from "csv-parse";
import fs from "node:fs";

const tasksCsvPath = new URL("../tasks_example.csv", import.meta.url);

const stream = fs.createReadStream(tasksCsvPath);

const csvParse = parse({
  delimiter: ",",
  skipEmptyLines: true,
  fromLine: 2,
});
const lines = stream.pipe(csvParse);

for await (const line of lines) {
  const [title, description] = line;

  await fetch("http://localhost:3333/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
    }),
  });
}
