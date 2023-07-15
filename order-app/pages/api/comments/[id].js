import Comments from "@/models/Comments";
import dbConnect from "@/util/dbConnect";

const handler =  async (req,res) =>{
    const {method,query:{id}} = req;

    if(method === "GET"){
        try {
            const comment = await Comments.findById(id);
            res.status(200).json(comment);
        } catch (err) {
            console.log(err);
        }
    }

    if(method ==="DELETE"){
        try{
            const comment = await Comments.findByIdAndDelete(id);
            res.status(200).json(comment);
        }catch(err){
            console.log(err);
        }
    }

}

export default handler