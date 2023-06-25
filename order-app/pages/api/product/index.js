import dbConnect from "@/util/dbConnect";
import Product from "@/models/Product";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json({ message: products });
    } catch (err) {
      console.log(err);
    }
  }

  if(method === "POST"){
    
    try{    
        const product = await Product.findOne({title:req.body.title});
        console.log("post")
        if(product){
            res.status(400).json({message:"The product already exists"})
        }else{
            const newProduct = await new Product(req.body);
            await newProduct.save();
            res.status(200).json({message:"Product added"})
        }
    }catch(err){
        console.log(err)
    }
  }
};

export default handler;
