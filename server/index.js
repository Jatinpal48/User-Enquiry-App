let express  = require('express');
let mongoose = require('mongoose');
const enquiryRoute = require('./App/routes/web/enquiryRoute');
require('dotenv').config();
let app = express();

// CORS setup
const corsOptions = {
    origin: [
        'https://user-enquiry-app.vercel.app', // production frontend
        'http://localhost:5173',               // local dev
        /\.vercel\.app$/                       // any vercel preview
    ],
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true,
};
app.use(cors(corsOptions));

// parse JSON bodies
app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader('Content-Type','application/json');
    next();
});

app.use('/api/website/enquiry' , enquiryRoute);

app.get('/', (req,res)=>{
    res.status(200).json({ ok:true, message:"Backend is running"});
});


//connect to db
mongoose.connect(process.env.DBURL).then(()=>{
    console.log("connected to db");
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port ${process.env.PORT}`);
    })
}).catch((err) =>{
    console.log("error connecting to db", err);
})
