import Comments from "@/models/Comments";
import dbConnect from "@/util/dbConnect";
const handler = async (req, res) => {
  await dbConnect();
  const { method } = req;

  if (method === "GET") {
    try {
      const comments = await Comments.find();
      res.status(200).json(comments);
    } catch (err) {
      console.log(err);
    }
  }
  if (method === "POST") {
    try {
      const newComment = await new Comments(req.body);
      newComment.save();
      res.status(200).json({message:"Comments Created!"})
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
