import BookTable from "@/models/BookTable";
import axios from "axios";

const handler = async (req,res) => {
    const {method} = req ;

    if(method==="GET"){
        try {
            const booktable = await BookTable.find();
            res.status(200).json(booktable)
        } catch (err) {
            console.log(err)
        }
    }

    if(method === "POST"){
        try{
            const booktable = await BookTable.findOne({email:req.body.email})
            
            if(booktable){
                res.status(400).json({message:"Already has find"})
            }else{
                const newBooktable = await new BookTable(req.body);
                newBooktable.save();
                res.status(200).json({message:"Revervation created!"})
            }
        }catch(err){
            console.log(err)
        }
    }
    
}

export default handler;