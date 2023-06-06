import dbConnect from "@/util/dbConnect";
import User from "@/models/User";

const handler = async (req, res) => {
    await dbConnect();
    const { method } = req;
    if (method === "GET") {
      try {
        // User.find() ile veri tabanındakı kullanıcıları bulup users degıskenıne atıyoruz. Eğer bulursa yanıt olarak json formatında users degıskenını yolluyoruz. 
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        console.log(err);
      }
    }
    // Eğer istek post isteği ise asagıdakı şart blogu calısacak. 
    if (method === "POST") {
      try {
        const newUser = await User.create(req.body);
        res.status(200).json(newUser);
      } catch (err) {
        console.log(err);
      }
    }
  };

export default handler;
 