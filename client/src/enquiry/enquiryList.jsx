import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import React from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";

export function EnquiryList({ data, getAllEnqury, setFormData }) {

  // Delete a row
  const deleteRow = (delid) => {
    axios.delete(`https://user-enquiry-app-f0r1.onrender.com/api/website/enquiry/delete/${delid}`)
      .then((res) => {
        toast.success("Entry Deleted Successfully");
        getAllEnqury();
      })
      .catch(err => {
        console.error("Error deleting entry:", err);
        toast.error("Failed to delete entry");
      });
  };

  // Edit a row
  const editRow = (editid) => {
    axios.get(`https://user-enquiry-app-f0r1.onrender.com/api/website/enquiry/single/${editid}`)
      .then((res) => {
        const data = res.data;
        if (data.status) {
          setFormData(data.enquiry); // Fill form in parent component
        }
      })
      .catch(err => {
        console.error("Error fetching entry:", err);
        toast.error("Failed to fetch entry");
      });
  };

  return (
    <div className='bg-gray-200 p-4 mb-4'>
      <ToastContainer />
      <h2 className='text-[20px] font-bold mb-3'>Enquiry List</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeadCell>Sr No.</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>Message</TableHeadCell>
            <TableHeadCell>Edit</TableHeadCell>
            <TableHeadCell>Delete</TableHeadCell>
          </TableRow>
        </TableHead>

        <TableBody className="divide-y">
          {data.length >= 1 ? (
            data.map((item, index) => (
              <TableRow key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.message}</TableCell>
                <TableCell>
                  <button onClick={() => editRow(item._id)} className="font-medium text-blue-600 hover:underline dark:text-blue-500">
                    Edit
                  </button>
                </TableCell>
                <TableCell>
                  <button onClick={() => deleteRow(item._id)} className="font-medium text-red-600 hover:underline dark:text-red-500">
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="whitespace-nowrap font-medium text-gray-500" colSpan={7}>
                No Enquiry Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
