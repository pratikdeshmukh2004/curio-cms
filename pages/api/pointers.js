import { createRouter } from "next-connect";
import { connectToDatabase } from "../../lib/db";
import auth from "../../middleware/auth";
import formidable from "formidable";
import { ObjectId } from "mongodb";

const router = createRouter();

// Middleware to authenticate requests
router.use(auth);

// GET route to fetch diagrams
router.get(async (req, res) => {
  try {
    const db = await connectToDatabase();
    const id = req.query.id;
    if (!id) {
      res.redirect("/diagrams");
      return;
    }
    const diagrams = await db
      .collection("pointers")
      .find({ diagram_id: new ObjectId(id) })
      .toArray();
    res.status(200).json(diagrams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put(async (req, res) => {
  try {
    const db = await connectToDatabase();
    const data = { ...req.body, diagram_id: new ObjectId(req.body.diagram_id) };
    if (data._id) {
      const pointer_id = new ObjectId(data._id);
      delete data._id;
      await db
        .collection("pointers")
        .updateOne({ _id: pointer_id }, { $set: data });
      return res
        .status(201)
        .json({ status: true, message: "Pointer updated successfully" });
    }
    await db.collection("pointers").insertOne(data);
    return res
      .status(200)
      .json({ status: true, message: "Diagram updated successfully" });
  } catch(err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router.handler();
