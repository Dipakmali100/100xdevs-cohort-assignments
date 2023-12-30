const express = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin, Course}=require('../db');
const router = express.Router();

// Admin Routes
router.post('/signup', async (req, res) => {

    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    
    console.log(username);
    console.log(password);
    
    if(username && password){
        await Admin.create({
            username:username,
            password:password
        })
        res.json({
            "msg":"Admin created successfully"
        })
    }else{
        res.json({
            "msg":"Admin not created"
        })
    }
    
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic

    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price=req.body.price;

    const course=await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        "msg":"Course created successfully",
        "courseId":course._id
    })
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic

    const courses= await Course.find();

    res.json({
        courses: courses
    })
});

module.exports = router;