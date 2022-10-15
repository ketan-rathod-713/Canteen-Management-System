
const upload = require("../middlewares/upload");
const dbConfig = {
  url: "mongodb+srv://admin-ketan:Ketan@cluster0.odeen.mongodb.net/", // for local development
  // url: `mongodb+srv://admin-ketan:Ketan@cluster0.odeen.mongodb.net/`, // for production, what was the error then
  // url: process.env.DB_STRING_FILES, // getting error in this idk
  database: "CanteenItems",
  imgBucket: "MyImagesBucket",
};
const { GridFSBucket } = require("mongodb");
const { default: mongoose } = require("mongoose");
const e = require("express");
const { response } = require("express");
const MongoClient= require("mongodb").MongoClient
const GridFsBucket = require("mongodb").GridFSBucket

// what is difference between {MongoClient} and when we write simply MongoClient
// Be carefull when not using async or callbacks, as do things step by step
// add try catch and render good error pages

const url = dbConfig.url;

const mongoClient = new MongoClient(url);

mongoClient.connect()

// const baseUrl = "https://fileuploades.herokuapp.com/images/" // for images link so that we can later see files/:fileName
// const baseUrl = "http://localhost:8080/images/"


const uploadFiles =async (req, res)=>{

  try{
    await upload(req, res);
    console.log("body is " + req.body.nspeakers)
    console.log(req.file)
    if (req.files.length <= 0) {
        return res
          .status(400)
          .send({ message: "You must select at least 1 file." });
      }
  
      // return res.status(200).send({
      //   message: "Files have been uploaded.",
      // });
      res.redirect("/images")
    } catch(err){
        res.render("error",{error:err})
    }
} // add try catch for errors and all 


const getListFiles =async (req, res)=>{
    // get list of files from collection 
try{
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database);
    const images = database.collection(dbConfig.imgBucket + ".files");

    const cursor = images.find({});

    if(await cursor.count === 0){
      res.status(500).send({message:"No data found"})
    }

    let fileInfos = [];


    var baseUrl = req.protocol + '://' + req.get('host') + req.originalUrl + "";
    baseUrl =  baseUrl.split("?")[0]
    baseUrl += '/'
    await cursor.forEach((doc) => {
      fileInfos.push({
        name: doc.filename,
        url: baseUrl + doc.filename,
      });
    });

    // return res.status(200).send(fileInfos);
    return res.status(200).render("files",{files:fileInfos})
    // return res.status(200).json({images:fileInfos})
  } 
  catch(err){
    return res.status(501).render("error",{error: err})
  }
    
}

const showImages = (req, res, next)=>{
  return res.status(200).render("images")
}

const download = async (req, res)=>{
  try{
    const fileName = req.params.name
    
    await mongoClient.connect();

    const database = mongoClient.db(dbConfig.database)
    const bucket = new GridFsBucket(database, { // required for important methods like openDownloadStream
      bucketName:dbConfig.imgBucket
    })

    const downloadStream = bucket.openDownloadStreamByName(fileName);

    downloadStream.pipe(res)
    // res.render("image") , I want to render this ejs page with a image in it and with some static content in it. I want to stream image
  } catch(err){
    res.status(501).render("error",{error: err})
  }
}

const downloadAll = async (req, res, next)=>{

  await mongoClient.connect()

  const database = mongoClient.db(dbConfig.database)
  const bucket = new GridFsBucket(database, { // required for important methods like openDownloadStream
    bucketName:dbConfig.imgBucket
  })

  const images = database.collection(dbConfig.imgBucket + ".files");

  const cursor = images.find({});

  var imagesInfo = []
  cursor.forEach(doc=>{
    imagesInfo.push(doc.filename)
    const downloadStream = bucket.openDownloadStreamByName(doc.filename)
    downloadStream.pipe(res)
  })
  
  // ;
  // res.json({message: "good"})
}

const getUploadImages = (req, res, next)=>{
  res.render("index")
}

const deleteImage =async (req, res, next)=>{
  const user=  req.user  // const objectId = req.params.id
  const imageName = req.params.name

  if(imageName.search(user.username)==-1 && !user.admin) return res.render("error",{error:"You are not authenticated to delete this file"}) // check if user same as the uploader or admin then

  await mongoClient.connect();
  const database = mongoClient.db(dbConfig.database)
  const bucket = new GridFsBucket(database, { // required for important methods like openDownloadStream
    bucketName:dbConfig.imgBucket
  })

  const images = database.collection(dbConfig.imgBucket + ".files");
  const cursor = images.find({filename: imageName})
  var objectId;
  await cursor.forEach((doc) => {
     objectId = doc._id
  });

  bucket.delete(new mongoose.Types.ObjectId(objectId), (err, data)=>{
    if(err) return res.json({message: err.message})
    else
    res.redirect("/images")   // res.json({message: `file with id ${objectId} is successfully deleted`})
  })
}

const deleteAllImages = (req, res, next)=>{
  bucket.drop()
}


module.exports = {
  uploadFiles: uploadFiles, 
  getListFiles: getListFiles, 
  download: download,
  getUploadImages: getUploadImages,
  deleteImage: deleteImage,
  downloadAll: downloadAll,
  showImages: showImages,
  getIndex: (req, res)=>{
    res.render("index")
  }
}