let enquiryModel = require("../../models/enquiry.model.js");

let enquiryInsert = (req,res)=>{
    let {name,email,phone,message} = req.body;
    let enquiry = new enquiryModel({name,email,phone,message});
    enquiry.save().then(()=>{
        console.log("✅ Enquiry saved:", enquiry);
        return res.status(201).json({
            status:1,
            message:"Enquiry saved successfully",
            data:enquiry
        });
    }).catch((err)=>{
        console.error("❌ Error saving enquiry:", err);
        return res.status(500).json({
            status:0,
            message:"Error while saving enquiry",
            error: err.message
        });
    });
}

let enquiryList = async (req,res)=>{
    try{
        let enquiry = await enquiryModel.find();
        return res.status(200).json({status:1, enquiryList:enquiry});
    }catch(err){
        console.error("❌ enquiryList error:", err);
        return res.status(500).json({status:0, message:"Error fetching enquiries", error:err.message});
    }
}

let enquiryDelete = async (req,res)=>{
    try{
        let enid = req.params.id;
        let enquiry = await enquiryModel.deleteOne({_id:enid});
        return res.status(200).json({status:1, message:"Enquiry deleted successfully", enquiry});
    }catch(err){
        console.error("❌ enquiryDelete error:", err);
        return res.status(500).json({status:0, message:"Error deleting enquiry", error:err.message});
    }
}

let enquirysingleRow = async (req,res)=>{
    try{
        let enid = req.params.id;
        let enquiry = await enquiryModel.findOne({_id:enid});
        return res.status(200).json({status:1, enquiry});
    }catch(err){
        console.error("❌ enquirysingleRow error:", err);
        return res.status(500).json({status:0, message:"Error fetching enquiry", error:err.message});
    }
}

let enquiryUpdate = async (req,res)=>{
    try{
        let enquiryId = req.params.id;
        let {name,email,phone,message} = req.body;
        let updateObj = {name,email,phone,message};
        let updateRes = await enquiryModel.updateOne({_id:enquiryId}, updateObj);
        return res.status(200).json({status:1, message:"Enquiry updated successfully", updateRes});
    }catch(err){
        console.error("❌ enquiryUpdate error:", err);
        return res.status(500).json({status:0, message:"Error updating enquiry", error:err.message});
    }
}

module.exports = {enquiryInsert, enquiryList, enquiryDelete, enquirysingleRow, enquiryUpdate};
