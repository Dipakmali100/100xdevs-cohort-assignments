const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course}=require("../db");
const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;

    if(username && password){
        await User.create({
            username:username,
            password:password
        }).then(
            res.json({
                message: 'User created successfully'
            })
        )
    }else{
        res.json({
            message: 'User not created'
        })
    }
});

router.post('/signin', async (req, res) => {
    // Implement user signup logic
    const username=req.body.username;
    const password=req.body.password;
    
    const user= await User.findOne({
        username:username,
        password:password
    })
    if(user){
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

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    const courses=await Course.find({});
    
    res.json({
        courses:courses
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.username;
    console.log(courseId);
    console.log(username);

    await User.updateOne({
        username:username
    },{
        "$push":{
            purchaseCourse: courseId
        }
    })
    res.json({
        message: 'Course purchased successfully'
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user= await User.findOne({
        username:req.username
    });
    // console.log(user.purchaseCourse[0]);

    const courses= await Course.find({
        _id:{
            "$in":user.purchaseCourse
        }
    })

    res.json({
        courses:courses
    })
});

module.exports = router