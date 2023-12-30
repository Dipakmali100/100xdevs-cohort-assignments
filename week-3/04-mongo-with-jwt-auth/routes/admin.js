const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const {Admin, Course}=require("../db");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;

    if(username && password){
        await Admin.create({
            username:username,
            password:password
        }).then(
            res.json({
                message: 'Admin created successfully'
            })
        )
    }else{
        res.json({
            message: 'Admin not created'
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement admin signup logic
    const username=req.body.username;
    const password=req.body.password;
    
    const admin= await Admin.findOne({
        username:username,
        password:password
    })
    if(admin){
        const token=jwt.sign({
            username
        },JWT_SECRET);

        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message: "Wrong Credentials"
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
    const courses= await Course.find({});

    res.json({
        courses:courses
    })
});

module.exports = router;