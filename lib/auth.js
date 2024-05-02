const VerifyUser = async (req, res) => {
  try {
    if (req.query.access_id !== process.env.NEXT_PUBLIC_ACCESS_ID) {
      res.status(401).json({ message: "Unauthorized" });
      return false;
    }
    return true;
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
    return false;
  }
};

export default VerifyUser;
