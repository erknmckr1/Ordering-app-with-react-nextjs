import dbConnect from "@/util/dbConnect";
import Product from "@/models/Product";

const handler = async (req, res) => {
  await dbConnect();
  const { method } = req

  const {
    title,
    description,
    category,
    extras,
    prices,
    image,
  } = req.body;
  
  const productData = {
    title,
    description,
    category,
    extras,
    prices,
    image,
  };

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json({ message: products });
    } catch (err) {
      console.log(err);
    }
  }

  if (method === "POST") {
    console.log(req.body)
    try {
      const product = await Product.findOne({ title });
      if (product) {
        res.status(400).json({ message: "The product already exists" });
      } else {
        const newProduct = await Product.create(productData);
        
        res.status(200).json({ message: "Product added" });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;
