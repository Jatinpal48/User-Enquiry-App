let enquiryModel = require("../../models/enquiry.model.js");


let enquiryInsert = (req,res) =>{
   let {name , email , phone , message} = req.body;
    let enquiry = new enquiryModel({
        name ,
        email ,
        phone ,
        message
    });
    enquiry.save().then(() => {
        res.send({
            status:1,
            message :"enquiry saved successfully"
        })
    }).catch((err) =>{
        res.send({
            status: 0,
            message: "Error While saving Enquiry" , error : err
        })
    });
}

let enquiryList = async (req , res) => {
    let enquiry = await enquiryModel.find();
    res.send({status:1 , enquiryList:enquiry});
}

let enquiryDelete = async (req , res) => {
    let enid = req.params.id;
    let enquiry = await enquiryModel.deleteOne({_id : enid});
    res.send({status : 1, message : "enquiry deleted successfully", enquiry});
}

let enquirysingleRow = async (req , res) => {
    let enid = req.params.id;
    let enquiry = await enquiryModel.findOne({_id : enid});
    res.send({status : 1, enquiry});
}

let enquiryUpdate = async (req, res) => {
    let enquiryId = req.params.id;
     let {name , email , phone , message} = req.body;
     let updateObj = {
        name,
        email,
        phone,
        message
     }
     let updateRes = await enquiryModel.updateOne({_id : enquiryId} , updateObj);
     res.send({status : 1, message : "enquiry updated successfully", updateRes});
}

module.exports = {enquiryInsert , enquiryList , enquiryDelete , enquirysingleRow , enquiryUpdate};