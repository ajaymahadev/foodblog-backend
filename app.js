const express = require('express')
const app = express()
const cors = require('cors') //cross origin resourse sharing ------> npm i cors

let port = 4000;

const mongoose = require('mongoose')


//REQUIRE MONGOOSE MODELS

//require user model
const User = require('./model/signup')

//require addPost model
const Post = require('./model/addpost')




const dburl = 'mongodb://localhost:27017/foodBlog'
mongoose.connect(dburl).then(() => {
    console.log("connected to database....!!!");
})


// MiddleWare---------->runs between req and res
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())


//Signin
app.post('/signin', (req, res) => {
    User.findOne({ email: req.body.email }).then((userData) => {
        if (userData) {
            if (req.body.password === userData.password) {
                res.send({ message: 'Login Successfull' })
            } else {
                res.send({ message: ' Incorrect Password Login Failed' })
            }
        } else {
            res.send({ message: 'User not found' })
        }
    })
})






//Sign Up
app.post('/signup', async (req, res) => {

    //findOne => used to check user Existence.
    User.findOne({ email: req.body.email }).then((userData) => {

        if (userData) {

            res.send({ message: "user already exists" })

        } else {
            let userData = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })

            userData.save().then(() => {
                res.send({ message: "User registered Successfully" })
            }).catch((err) => {
                res.send(err)
            })

            // userData.save(() => {
            //     if (err) {
            //         res.send(err)
            //     }
            //     else {
            //         res.send({ message: "User registered Successfully" })

            //     }
            // })

        }
    })

})


//Posts

app.get('/posts', async (req, res) => {
    //using mongodb method i.e find()
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        console.log(err);
    }

})

// single post
app.get('/posts/:id',async(req,res)=>{
    // const postid=req.params.id
    const {id}=req.params
    try{
        const posts=await Post.findById(id)
        res.send(posts)
    }catch(err){
        console.log(err);
    }
})







//addpost
app.post('/addpost', async (req, res) => {

    let postData = new Post({
        titlle: req.body.titlle,
        author: req.body.author,
        summary: req.body.summary,
        image: req.body.image,
        location: req.body.location
    })


    postData.save().then(() => {
        res.send({ message: "Post added Successfully" })
    }).catch((err) => {
        res.send({ message: "Error while adding post" })
    })

})
// get sign up no of happy customers
app.get('/signup', async(req,res)=>{
    try{
        const post=await User.find()
        res.json(post)
    }catch(err){
        console.log(err);
    }
})



app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})