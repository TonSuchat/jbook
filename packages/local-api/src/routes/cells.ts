import express from "express";
import fs from "fs/promises";
import path from "path";

type Cell = {
  id: string;
  content: string;
  type: "text" | "code";
};

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json());
  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else throw error;
    }

    // read the file
    // parse a list of cells out of it.
    // send list of cells back to brwoser
  });

  router.post("/cells", async (req, res) => {
    // take the list of cells from the request obj
    // serialize them
    const { cells }: { cells: Cell[] } = req.body;
    // write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");
    res.send({ status: "ok" });
  });

  return router;
};
