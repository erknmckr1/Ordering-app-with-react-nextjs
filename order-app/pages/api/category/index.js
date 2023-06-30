import dbConnect from "@/util/dbConnect";
import Category from "@/models/Category";

  const handler = async (req, res) => {
  await dbConnect();
  const body = req.body;
  const { method } = req;
  if(method==="GET"){
    try{
      //! Db deki butun categorıyı categorıes parametresıne atadık.
      const categories = await Category.find();
      res.status(200).json({message:categories});
    }catch(err){
      console.log(err)
    }
  }
  if (method === "POST") {
    try {
      const category = await Category.findOne({ title: body.title });
      if (category) {
        res.status(400).json({ message: "Category already find" });
      } else {
        const newCategory = await new Category(body);
        await newCategory.save();
        res.status(200).json({ message: "Category Added" });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler ; 
