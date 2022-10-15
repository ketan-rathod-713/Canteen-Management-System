
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


const dbSchema = require('../config/dbSchema')
const Item = dbSchema.Item;

// what is difference between {MongoClient} and when we write simply MongoClient
// Be carefull when not using async or callbacks, as do things step by step
// add try catch and render good error pages

const url = dbConfig.url;

const mongoClient = new MongoClient(url);

mongoClient.connect()

// const baseUrl = "https://fileuploades.herokuapp.com/images/" // for images link so that we can later see files/:fileName
// const baseUrl = "http://localhost:8080/images/"


const uploadFiles =async (req, res)=>{

  // {
    console.log("text is "+ req.body.text)
    await upload(req, res);

    if (req.files.length <= 0) {
        return res
          .status(400)
          .send({ message: "You must select at least 1 file." });
      }
  
      // return res.status(200).send({
      //   message: "Files have been uploaded.",
      // });

      // here i got req.files which contains file name and also go req.body.text which contains item id

      
      const file_name = req.files[0].filename ||  "data:image/jpeg;base64,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"

      
      if(req.body.itemid && req.files){
        const date = req.body.date;
        const itemid = req.body.itemid;
      Item.findOneAndUpdate(
        {_id: date,"items.itemId":itemid  },
        { $set: { "items.$.filename": file_name } },
        { new: true, upsert: true },
        function (err, managerparent) {
          if (err) throw err;
          console.log(managerparent); // updated value here
        }
      );
      }

      res.send({body: req.body, file: req.files})
    // } catch(err){
    //     res.send({err: err})
    // }
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