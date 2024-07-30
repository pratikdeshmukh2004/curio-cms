import { createRouter } from "next-connect";
import { connectToDatabase } from "../../lib/db";
import auth from "../../middleware/auth";
import formidable from "formidable";
import { ObjectId } from "mongodb";

const router = createRouter();

// Middleware to authenticate requests
router.use(auth);

router.put(async (req, res) => {
  try {
    const db = await connectToDatabase();
    const data = { active_diagram: new ObjectId(req.body.active_diagram) };
    delete data._id;
    await db
      .collection("clients")
      .updateOne({ _id: new ObjectId("66a8ba786e590c65401399bd")}, { $set: data });
    return res
      .status(201)
      .json({ status: true, message: "Diagram updated successfully" });
  } catch (err) {
    console.log("====================================");
    console.log(err);
    console.log("====================================");
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router.handler();
