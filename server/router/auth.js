const express = require('express'); 
const router = express.Router();
require('../database/connection');
const verifyUser = require('../middleware/verifyUser');
const userController = require('../controller/userController');
const leaveTypeController = require('../controller/leaveTypeController');
const leaveController = require('../controller/leaveController');
// const verifyLogin = require('../middleware/verifyLogin');
// const cookieParser = require("cookie-parser");
// router.use(cookieParser());

router.get('/', (req, res) => res.send("hello world"));

///first page :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//register route
router.post('/register', userController.registerUser);
//login route
router.post('/login', userController.loginUser);
//logout route
router.post('/logout', userController.logoutUser);
//login role get
router.get('/getRole', verifyUser.verifyUser, userController.getRole);

//forget pass otp 
router.post('/sendOtp/:email', userController.sendOtp);
//verifyotp
router.get('/verifyOtp/:email/:otp', userController.verifyPassOtp);
//reset pass
router.post('/resetPassword/:email/:otp', userController.resetPassword);


//after employee-logged in ::::::::::::::::::::::::::::::::::::::::::::::::::::

//all leaves per user
router.get('/leave/getUserLeaves',verifyUser.verifyUser, leaveController.getUserLeaves);
//all leaves count -pending, approved, accepted, rejected per user
router.get('/leave/getUserLeaveCounts', verifyUser.verifyUser, leaveController.getUserLeaveCounts);
//apply leave by user
router.post('/leave/createLeave', verifyUser.verifyUser, leaveController.createLeave);
//approved leaves -user
router.get('/leave/approvedLeaves', verifyUser.verifyUser, leaveController.approvedLeaves);
//pending leaves -user
router.get('/leave/pendingLeaves', verifyUser.verifyUser, leaveController.pendingLeaves);
//rejected leaves -user
router.get('/leave/rejectedLeaves', verifyUser.verifyUser, leaveController.rejectedLeaves);
//user detail- user, hod
router.get('/user/getUser',verifyUser.verifyUser, userController.getUser);
//update leave -user
router.put('/leave/updateLeave/:id', verifyUser.verifyUser, leaveController.updateLeave);
//get leave -user/hod
router.get('/leave/getLeave/:id', verifyUser.verifyUser, leaveController.getLeave);
//delete leave -user
router.delete('/leave/deleteLeave/:id', verifyUser.verifyUser, leaveController.deleteLeave);
//update password-user/HOD
router.put('/user/updatePassword',verifyUser.verifyUser, userController.updatePassword);


// After hod logged in :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//all leaves by all users total count -pending, approved, accepted, rejected per user
router.get('/leave/getAllLeaveCountsByHod', verifyUser.verifyUser, leaveController.getAllLeaveCountsByHod);
//all leaves by under hod users - hod
router.get('/leave/allLeavesByHod', verifyUser.verifyUser, leaveController.allLeavesByHod);
//approved leaves - hod
router.get('/leave/approvedLeavesByHod', verifyUser.verifyUser, leaveController.approvedLeavesByHod);
//pending leaves - hod
router.get('/leave/pendingLeavesByHod', verifyUser.verifyUser, leaveController.pendingLeavesByHod);
//rejected leaves - hod
router.get('/leave/rejectedLeavesByHod', verifyUser.verifyUser, leaveController.rejectedLeavesByHod);
//all users -hod
router.get('/user/allUsersByHod',verifyUser.verifyUser, userController.allUsersByHod);



// After admin logged in :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//all leaves by all users total count -pending, approved, accepted, rejected per user
router.get('/leave/getAllLeaveCounts', verifyUser.verifyUser, verifyUser.verifyAdmin ,leaveController.getAllLeaveCounts);
//all leaves -user/hod/admin
router.get('/leave/allLeaves', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveController.allLeaves);
//approved leaves -admin
router.get('/leave/approvedLeavesByAdmin', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveController.approvedLeavesByAdmin);
//pending leaves -admin
router.get('/leave/pendingLeavesByAdmin', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveController.pendingLeavesByAdmin);
//rejected leaves -admin
router.get('/leave/rejectedLeavesByAdmin', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveController.rejectedLeavesByAdmin);
//Admin detail- admin
router.get('/user/getAdmin',verifyUser.verifyUser, verifyUser.verifyAdmin ,userController.getUser);
//all users -admin
router.get('/user/allUsers',verifyUser.verifyUser, verifyUser.verifyAdmin, userController.allUsers);
//all hod -admin
router.get('/user/allhod',verifyUser.verifyUser, verifyUser.verifyAdmin, userController.allhod);
//update password-admin
router.put('/user/updatePasswordByAdmin',verifyUser.verifyUser, verifyUser.verifyAdmin ,userController.updatePassword);



//employee ///

//user detail- admin
router.get('/user/getUserByAdmin/:id',verifyUser.verifyUser, verifyUser.verifyAdmin, userController.getUser);
//update user-user
router.put('/user/updateUser',verifyUser.verifyUser, userController.updateUser);
//delete user by user-admin
router.delete('/user/deleteUser/:id',verifyUser.verifyUser, verifyUser.verifyAdmin, userController.deleteUser);
// //delete user by admin
// router.delete('/user/deleteUser/:id', verifyUser.verifyAdmin, userController.deleteUser);



//leaveType///////

//leaveType create -admin
router.post('/leaveType/createLeaveType',verifyUser.verifyUser, verifyUser.verifyAdmin, leaveTypeController.leaveTypeCreate);
//leavetype all -admin
router.get('/leaveType/allLeaveTypes',verifyUser.verifyUser, verifyUser.verifyAdmin, leaveTypeController.allLeaveTypes);
//leavetype all-admin
router.get('/leaveType/getLeaveType/:id',verifyUser.verifyUser, verifyUser.verifyAdmin, leaveTypeController.getLeaveType);
//leavetype all -admin
router.put('/leaveType/updateLeaveType/:id', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveTypeController.updateLeaveType);
//leavetype all -admin
router.delete('/leaveType/deleteLeaveType/:id', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveTypeController.deleteLeaveType);

//leave///

//createleave -user/hod
router.post('/leave/createLeave', verifyUser.verifyUser, leaveController.createLeave);



//update leave -hod
router.put('/leave/updateLeaveByHod/:id', verifyUser.verifyUser, leaveController.updateLeaveByHod);




//updateStatus -hod
router.post('/leave/updateStatusByHod/:id', verifyUser.verifyUser, leaveController.updateStatusByHod);
//updateStatus -admin
router.post('/leave/updateStatusByAdmin/:id', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveController.updateStatusByHod);



module.exports = router;