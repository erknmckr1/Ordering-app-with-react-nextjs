import dbConnect from "@/util/dbConnect";
import Footer from "@/models/Footer";

const handler =  async (req,res) => {
    dbConnect();
    const {method,query:{id}} = req;
    
    if(method === "GET"){
        try{
        const footer = await Footer.findById(id);
        res.status(200).json(footer);
        }catch(err){
            console.log(err)
        }
    }

    if(method === "PUT" ){
        try {
            const updateFooter = await Footer.findByIdAndUpdate(id,req.body,{
                new:true
            });
            res.status(200).json(updateFooter);
        } catch (error) {
            console.log(error)
        }
    }
    
}

export default handler