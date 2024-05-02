// pages/api/posts.js

import { createRouter } from "next-connect";
import { connectToDatabase } from "../../lib/db";
import auth from "../../middleware/auth";
import formidable from "formidable";
import { GridFSBucket } from "mongodb";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const router = createRouter();

// Middleware to authenticate requests
router.use(auth);

// GET route to fetch diagrams
router.get(async (req, res) => {
  try {
    const db = await connectToDatabase();
    const diagrams = await db
      .collection("diagrams")
      .aggregate([
        {
          $lookup: {
            from: "pointers",
            localField: "_id",
            foreignField: "diagram_id",
            as: "pointers",
          },
        },
      ])
      .toArray();
    res.status(200).json(diagrams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post(async (req, res) => {
  try {
    const form = formidable({ multiples: true });
    const db = await connectToDatabase();
    form.parse(req, async function (err, fields, files) {
      const data = {
        id: fields.id[0],
        name: fields.name[0],
        intro: fields.introduction[0],
      };

      if (files.image) {
        const bucket = new GridFSBucket(db, { bucketName: "fs" });
        const name = files.image[0].originalFilename;
        const uploadStream = fs.createReadStream(files.image[0].filepath).pipe(
          bucket.openUploadStream(name, {
            chunkSizeBytes: 1048576,
          })
        );
        const fileId = uploadStream.id;
        data.image_name = name;
        data.image_id = fileId;
        // req.file.stream.pipe(uploadStream);
        uploadStream.on("finish", async () => {
          // Save diagram details to the database
          await db.collection("diagrams").insertOne(data);
          return res
            .status(201)
            .json({ status: true, message: "Diagram created successfully" });
        });
      } else {
        await db.collection("diagrams").insertOne(data);
        return res
          .status(200)
          .json({ status: true, message: "Diagram created successfully" });
      }
    });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router.handler();