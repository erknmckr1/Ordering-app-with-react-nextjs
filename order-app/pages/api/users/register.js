import dbConnect from "@/util/dbConnect";
import User from "@/models/User";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
    await dbConnect();

    // istekten  gelen veriler body degıskenıne atandı.
    const body = req.body;

    // User modelinde bulunan kullanıcılar ile gelen istekteki emaili karsılastırıyoruz. Eğer varsa bize 400 durum kodu ile ilgili mesajı json olarak donecek ve asagıdakı kod satırlarına ınmeyecek. 
    const user = await User.findOne({email:body.email});
    if(user){
        res.status(400).json({message:"User already exists"})
        return;
    }

    try{
        const newUser = await new User(body);
        // generate salt to has password
        const salt = await bcrypt.genSalt(10);
        // create hash
        newUser.password = await bcrypt.hash(newUser.password,salt)
        newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword,salt)
        await newUser.save() 
        res.status(200).json(newUser)
        
    }catch(err){
        console.log(err)
    }
    
  };

export default handler;
 