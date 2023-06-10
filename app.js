let express = require('express');
let app = express();
let port = process.env.PORT||7220;
let Mongo = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
let {dbConnect,getData,postData,updateOrder,deleteOrder} = require('./controller/dbController')

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors())

app.get('/',(req,res) => {
    res.send('Hiii From express')
})

// get all Categories
app.get('/category',async (req,res)=>{
    let query = {};
    let collection = "category"
    let output = await getData(collection,query)
    res.send(output)
})

// get all Student with Courses
app.get('/student',async (req,res)=>{
    let query = {};
    let collection = "student"
    let output = await getData(collection,query)
    res.send(output)
})

// get course data on categoryID
app.get('/course', async(req,res) => {
    let query = {}
    if(req.query.categoryId){
        query={category_id:Number(req.query.categoryId)}
    }else{
        query = {}
    }
    let collection = "course";
    let output = await getData(collection,query);
    res.send(output)
})

// course with edition
app.get('/filter/:courseId', async(req,res) => {
    let courseId = Number(req.params.courseId);
    let edition = Number(req.query.edition)
    if(courseId){
        query = {
            "course_id":courseId,
            "edition":edition
        }
    }else{
        query = {}
    }
    let collection = "course";
    let output = await getData(collection,query);
    res.send(output)
})


//details of course

app.get('/details/:id', async(req,res) => {
    let id = new Mongo.ObjectId(req.params.id)
    let query = {_id:id}
    let collection = "course";
    let output = await getData(collection,query);
    res.send(output)
})

// List of all the Bookorders

app.get('/orders',async(req,res) => {
    let query = {};
    if(req.query.email){
        query={email:req.query.email}
    }else{
        query = {}
    }
    let collection = "orders";
    let output = await getData(collection,query);
    res.send(output)
})

//placeOrder
app.post('/placeOrder',async(req,res) => {
    let data = req.body;
    let collection = "orders";
    console.log(">>>",data)
    let response = await postData(collection,data)
    res.send(response)
})

//course details {"id":[2,4,8]}
app.post('/courseDetails',async(req,res) => {
    if(Array.isArray(req.body.id)){
        let query = {course_id:{$in:req.body.id}};
        let collection = 'course';
        let output = await getData(collection,query);
        res.send(output)
    }else{
        res.send('Please Pass data in form of array')
    }
})

//update
app.put('/updateOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let data = {
        $set:{
            "status":req.body.status
        }
    }
    let output = await updateOrder(collection,condition,data)
    res.send(output)
})

//delete order
app.delete('/deleteOrder',async(req,res) => {
    let collection = 'orders';
    let condition = {"_id":new Mongo.ObjectId(req.body._id)}
    let output = await deleteOrder(collection,condition)
    res.send(output)
})

app.listen(port,(err) => {
    dbConnect()
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})
