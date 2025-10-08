import React, { useEffect, useState } from 'react'
import { Button, Textarea, Label, TextInput } from "flowbite-react";
import axios from 'axios';
//through react tostify we can show on the screen when we save data
 import { ToastContainer, toast } from 'react-toastify';
import { EnquiryList } from './enquiry/enquiryList';

export default function Enquiry() {
  let [enquiryList , setEnquiryList] = useState([])
  let [formData , setFormData] = useState({
    _id: '',       
    name:'',
    email:'',
    phone:'',
    message:''
  })

  let saveEnquiry = (e) =>{
    //alert("Enquiry Saved")
    e.preventDefault();
  //   let formData = {
  //   name:e.target.name.value,
  //   email:e.target.email.value,
  //   phone:e.target.phone.value,
  //   message:e.target.message.value
  // }
    if(formData._id){
        axios.put(`http://localhost:8000/api/website/enquiry/update/${formData._id}` , formData)
        .then((res) =>{
          toast.success("Enquiry Updated Successfully") 
          setFormData({
            _id: '',
            name:'',
            email:'',
            phone:'',
            message:''
          })
          getAllEnqury();
        })
        .catch(err => {
          console.error("Error updating enquiry:", err);
          toast.error("Failed to update enquiry");
        });
    }else{
       axios.post("http://localhost:8000/api/website/enquiry/insert" , formData)
  .then((res) =>{
    console.log(res.data);
    toast.success("Enquiry Saved Successfully")

    setFormData({
      name:'',
      email:'',
      phone:'',
      message:'',
      id:''
    })
    getAllEnqury();
  })
    .catch(err => {
        console.error("Error saving enquiry:", err);
      });
  }

  }
 

  let getAllEnqury = () =>{
    axios.get("http://localhost:8000/api/website/enquiry/view")
    .then((res) =>{
      return res.data;
    })
    .then((finalData) => {
      if(finalData.status){
        setEnquiryList(finalData.enquiryList);
      }
    })
  }

  let getValue = (e) =>{
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = {...formData}
    oldData[inputName] = inputValue;
    setFormData(oldData);
  }

  useEffect( () =>{
    getAllEnqury();
  } , []);

  return (
    <div>
       <ToastContainer/>
      <h1 className='text-[40px] text-center py-6 font-bold' >User Enquiry</h1>

      <div className='grid grid-cols-[30%_auto] gap-10'>
        <div className='bg-gray-200 p-4'>
          <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
          <form action="" onSubmit={saveEnquiry}>
           
            <div className='py-3'>
              <Label htmlFor="name">Your Name</Label>
              </div>
            <TextInput id="name" type="name" value={formData.name} onChange={getValue} name = 'name' placeholder="Enter Your Name" required />
            <div className='py-3'>
              <Label htmlFor="email">Your Email</Label>
              </div>
            <TextInput id="email" type="email"  value={formData.email} onChange={getValue} name = 'email' placeholder="Enter your Email" required />
            <div className='py-3'>
              <Label htmlFor="phone">Phone No.</Label>
              </div>
            <TextInput id="phone" type="phone"  value={formData.phone} onChange={getValue} name = 'phone'placeholder="Enter your Phone No." required />
            <div>
            <div className="mb-2 block">
              <Label htmlFor="message">message</Label>
            </div>
            <Textarea id="message"  value={formData.message} onChange={getValue} name = 'message' placeholder="Leave a Message..." required rows={4} />
            </div>
            <div className='py-3'>
              <Button type="save" className='bg-blue-700 w-[100%]' >
                {formData._id ? 'Update': 'Save'}
              </Button>
            </div>
          </form>
        </div>
        <EnquiryList data = {enquiryList} getAllEnqury ={getAllEnqury}  setFormData={setFormData}/>
       
      </div>
    </div>
  )
}

