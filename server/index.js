let express  = require('express');
let mongoose = require('mongoose');
const enquiryRoute = require('./App/routes/web/enquiryRoute');
require('dotenv').config();
let cors = require('cors');
let app = express();
app.use(cors());
app.use(express.json());


//Routes
app.use('/api/website/enquiry' , enquiryRoute);

//connect to db
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("connected to db");
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port ${process.env.PORT}`);
    })
}).catch((err) =>{
    console.log("error connecting to db", err);
})
