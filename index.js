import fetch from 'node-fetch';
import mongoose from 'mongoose';

mongoose
  .connect("mongodb://127.0.0.1:27017/PMS")
  .then(() => {
    console.log(`Database connected successfully!`);
  })
  .catch((err) => {
    console.log("Database connection error: ", err.message);
    server.close(() => {
      process.exit(1);
    });
    // TRY AGAIN / ANOTHER DB
    // ELSE WRITE FILE TO JSON
  });

const postSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    last:{
        type:Number,
        required:true
    },
    buy:{
        type:Number,
        required:true
    },
    sell:{
        type:Number,
        required:true
    },
    volume:{
        type:Number,
        required:true
    },
    base_unit:{
        type:String,
        required:true
    },

});

const Post = mongoose.model('Post',postSchema);

async function getPosts(){
try {
        const myPosts = await fetch("https://api.wazirx.com/api/v2/tickers");
        const response = await myPosts.json();
        
        for(let i=0; i<response.length; i++){
             
          const post = await Post.create({
             name:response[i]['name'],
             last:response[i]['last'],
             buy:response[i]['buy'],
             sell:response[i]['sell'],
             volume:response[i]['volume'],
             base_unit:response[i]['base_unit'],

            });
     
        }
     }catch (error) {
        console.log(error)
    }
     
} 

getPosts();



