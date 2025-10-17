import React, { useEffect, useState } from 'react';
import { Button, Textarea, Label, TextInput } from "flowbite-react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EnquiryList } from './enquiry/enquiryList';

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Save or Update Enquiry
  const saveEnquiry = (e) => {
    e.preventDefault();

    if (formData._id) {
      // Update existing enquiry
      axios.put(`https://user-enquiry-app-f0r1.onrender.com/api/website/enquiry/update/${formData._id}`, formData)
        .then(res => {
          if (res.data && res.data.status === 1) {
            toast.success(res.data.message || "Enquiry Updated Successfully");
            setFormData({ _id:'', name:'', email:'', phone:'', message:'' });
            getAllEnqury();
          } else {
            toast.error("Failed to update enquiry");
          }
        })
        .catch(err => {
          console.error("Error updating enquiry:", err);
          toast.error("Server error while updating enquiry");
        });

    } else {
      // Insert new enquiry
      axios.post("https://user-enquiry-app-f0r1.onrender.com/api/website/enquiry/insert", formData)
        .then(res => {
          if (res.data && res.data.status === 1) {
            console.log("Server response:", res.data);
            toast.success(res.data.message || "Enquiry Saved Successfully");
            setFormData({ _id:'', name:'', email:'', phone:'', message:'' });
            getAllEnqury();
          } else {
            toast.error("Failed to save enquiry");
          }
        })
        .catch(err => {
          console.error("Error saving enquiry:", err);
          toast.error("Server error while saving enquiry");
        });
    }
  };

  // Fetch all enquiries
  const getAllEnqury = () => {
    axios.get("https://user-enquiry-app-f0r1.onrender.com/api/website/enquiry/view")
      .then(res => {
        if (res.data && res.data.status === 1) {
          setEnquiryList(res.data.enquiryList);
        }
      })
      .catch(err => {
        console.error("Error fetching enquiry list:", err);
      });
  };

  // Handle form input change
  const getValue = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getAllEnqury();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h1 className='text-[40px] text-center py-6 font-bold'>User Enquiry</h1>

      <div className='grid grid-cols-[30%_auto] gap-10'>
        <div className='bg-gray-200 p-4'>
          <h2 className='text-[20px] font-bold'>Enquiry Form</h2>
          <form onSubmit={saveEnquiry}>
            <div className='py-3'>
              <Label htmlFor="name">Your Name</Label>
              <TextInput
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={getValue}
                placeholder="Enter Your Name"
                required
              />
            </div>

            <div className='py-3'>
              <Label htmlFor="email">Your Email</Label>
              <TextInput
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={getValue}
                placeholder="Enter your Email"
                required
              />
            </div>

            <div className='py-3'>
              <Label htmlFor="phone">Phone No.</Label>
              <TextInput
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={getValue}
                placeholder="Enter your Phone No."
                required
              />
            </div>

            <div className='py-3'>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={getValue}
                placeholder="Leave a Message..."
                rows={4}
                required
              />
            </div>

            <div className='py-3'>
              <Button type="submit" className='bg-blue-700 w-[100%]'>
                {formData._id ? 'Update' : 'Save'}
              </Button>
            </div>
          </form>
        </div>

        <EnquiryList
          data={enquiryList}
          getAllEnqury={getAllEnqury}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
