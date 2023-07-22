
const express = require('express');
const { pool } = require('../db');
const router = express.Router();
const { generateToken, verifyToken, verifyTokenMiddileware } = require('../auth/jwt');
const { v4: uuidv4 } = require('uuid');

let multer = require('multer')



let posts = [{postId:1,title:"t1",publishDate:"20-1-2012",content:"contshd" },{postId:2,title:"t1",publishDate:"20-1-2013",content:"contshd"},{postId:3,title:"t1",publishDate:"20-1-2012",content:"contshd"},{postId:4,title:"t1",publishDate:"20-1-2016",content:"contshd"},]



function generateUniqueImageName(originalName) {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const randomString = uuidv4().replace(/-/g, '');
  const fileExtension = originalName.split('.').pop();
  const uniqueName = `${timestamp}_${randomString}.${fileExtension}`;
  return uniqueName;
}
function uniqueString(){
    const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
    const randomString = uuidv4().replace(/-/g, '');
    const uniqueName = `${timestamp}_${randomString}`;
    return uniqueName;
}




const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/posts/'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {

    cb(null,generateUniqueImageName(file.originalname))
  },
});

const upload = multer({ storage: storage });



router.get("/",(req,res)=>{

    const query = `SELECT title, content, image_path, publish_date,post_id, image_name FROM post`
    pool.query(query,(err,result)=>{
     
        if(err){
       return res.status(400).json({ error: err.message });
        }
        console.log(result);
        res.send(result)

    })
    
})



router.post("/", upload.single('image'),async(req,res)=>{
        // console.log(req.body);
    try{
          if(!verifyToken(req.body.token)){
            return res.status(400).json({ error: 'not authorise' });
          }
         console.log("post rout calles");

        console.log(req.body);
    
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        } 
    
        console.log('File uploaded:', req.file);

        const query = 'INSERT INTO post SET ?';

   const data = {
      title: req.body.title,
      content:req.body.content,
      post_id:uniqueString(),
      image_path:`${req.file.destination}${req.file.filename}`,
      image_name:req.file.filename
   }
        // The "?" in the query is a placeholder for the data object
         pool.query(query, data,(err,result)=>{

             if(err){
                console.log(err);
                return res.status(200).json({ message: err.message });
             }
                  console.log(result);
             return res.status(200).json({ message: 'File uploaded successfully' });
         });

    }
    catch(err){
        console.log(err.message);
        res.send(err.message)
    }
   
  })











  router.put("/",upload.single('image'),async(req,res)=>{
   
        
    try{
         
         console.log("post rout calles");

        console.log(req.body);
    
        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
        } 
    
        console.log('File uploaded:', req.file);

        const query = 'INSERT INTO post SET ?';

   const data = {
      title: req.body.title,
      content:req.body.content,
      post_id:uniqueString(),
      image_path:`${req.file.destination}${req.file.filename}`,
      image_name:req.file.filename
   }
        // The "?" in the query is a placeholder for the data object
         pool.query(query, data,(err,result)=>{

             if(err){
                console.log(err);
                return res.status(200).json({ message: err.message });
             }
                  console.log(result);
             return res.status(200).json({ message: 'File uploaded successfully' });
         });

    }
    catch(err){
        console.log(err.message);
        res.send(err.message)
    }
   
  })








  
router.delete('/',(req,res)=>{
    
    let {post_id} = req.query
    console.log("hiii"+ req.query); 
   
   let query = "DELETE FROM post WHERE post_id = ?"

   pool.query(query,post_id,(err,result)=>{

    if(err){
        return res.status(400).json({ message: err.message });
    }
     res.status(200).json({ message: "deleted successfully" });

   })
   
})








  module.exports = router
  