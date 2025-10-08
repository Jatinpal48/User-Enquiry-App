let express = require('express');
const { enquiryInsert, enquiryList, enquiryDelete , enquirysingleRow , enquiryUpdate } = require('../../controllers/web/enquiryController');
let enquiryRoute = express.Router();

enquiryRoute.post('/insert' , enquiryInsert);
enquiryRoute.get('/view' , enquiryList)
enquiryRoute.delete('/delete/:id' , enquiryDelete)
enquiryRoute.get('/single/:id' , enquirysingleRow)
enquiryRoute.put('/update/:id' , enquiryUpdate)

module.exports = enquiryRoute;
