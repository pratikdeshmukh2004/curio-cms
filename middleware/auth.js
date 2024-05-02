const auth = async (req, res, next) => {
  const { access_id } = req.query;
  if (access_id !== process.env.NEXT_PUBLIC_ACCESS_ID) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
export default auth;
