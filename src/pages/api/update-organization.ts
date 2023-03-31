import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

import { Organizations } from "@/types/Organizations";

const filePath = path.join(process.cwd(), "public/data", "organizations.json");

const readJsonFile = (): Organizations[] => {
  const file = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(file) as Organizations[];
  return data;
};

const writeJsonFile = (data: Organizations[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const updateOrganization = (req: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV === "production") {
    res.status(404).json({ message: "Not found" });
    return;
  }
  if (req.method === "PUT") {
    const { data } = req.body;
    const organizations = readJsonFile();
    const newOrganizations = [...organizations, data].sort((a, b) =>
      a.name.toString().toLowerCase() < b.name.toString().toLowerCase() ? -1 : 1
    );
    writeJsonFile(newOrganizations);
    res.status(200).json({ message: "Successfully updated organization" });
  } else {
    res.status(400).json({ message: "Invalid request method" });
  }
};

export default updateOrganization;
