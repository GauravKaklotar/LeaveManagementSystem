const express = require('express'); 
const router = express.Router();
require('../database/connection');
const verifyUser = require('../middleware/verifyUser');
const userController = require('../controller/userController');
const leaveTypeController = require('../controller/leaveTypeController');
const leaveController = require('../controller/leaveController');
// const cookieParser = require("cookie-parser");
// router.use(cookieParser());

//register route
router.post('/register', userController.registerUser);
//login route
router.post('/login', userController.loginUser);

//employee ///

//all users -admin
router.get('/user/allUsers',verifyUser.verifyUser, verifyUser.verifyAdmin, userController.allUsers);
//user detail- admin
router.get('/user/getUser/:id',verifyUser.verifyUser, verifyUser.verifyAdmin, userController.getUser);
//update user-user
router.put('/user/updateUser',verifyUser.verifyUser, userController.updateUser);
//update password-user
router.put('/user/updatePassword',verifyUser.verifyUser, userController.updatePassword);
//delete user by user-admin
router.delete('/user/deleteUser/:id',verifyUser.verifyUser, verifyUser.verifyAdmin, userController.deleteUser);
// //delete user by admin
// router.delete('/user/deleteUser/:id', verifyUser.verifyAdmin, userController.deleteUser);

//forget pass otp 
router.post('/sendOtp/:email', userController.sendOtp);
//verifyotp
router.get('/verifyOtp/:email/:otp', userController.verifyPassOtp);
//reset pass
router.post('/resetPassword/:email/:otp', userController.resetPassword);


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

//all leaves -user/hod/admin
router.get('/leave/allLeaves', verifyUser.verifyUser, leaveController.allLeaves);

//get leave -user/hod
router.get('/leave/getLeave/:id', verifyUser.verifyUser, leaveController.getLeave);

//update leave -user
router.put('/leave/updateLeave/:id', verifyUser.verifyUser, leaveController.updateLeave);
//update leave -hod
router.put('/leave/updateLeaveByHod/:id', verifyUser.verifyUser, leaveController.updateLeaveByHod);

//pending leaves -user
router.get('/leave/pendingLeaves', verifyUser.verifyUser, leaveController.pendingLeaves);
//pending leaves - hod
router.get('/leave/pendingLeavesByHod', verifyUser.verifyUser, leaveController.pendingLeavesByHod);
//pending leaves -admin
router.get('/leave/pendingLeavesByAdmin', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveController.pendingLeavesByAdmin);

//approved leaves -user
router.get('/leave/approvedLeaves', verifyUser.verifyUser, leaveController.approvedLeaves);
//approved leaves - hod
router.get('/leave/approvedLeavesByHod', verifyUser.verifyUser, leaveController.approvedLeavesByHod);
//approved leaves -admin
router.get('/leave/approvedLeavesByAdmin', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveController.approvedLeavesByAdmin);

//rejected leaves -user
router.get('/leave/rejectedLeaves', verifyUser.verifyUser, leaveController.rejectedLeaves);
//rejected leaves - hod
router.get('/leave/rejectedLeavesByHod', verifyUser.verifyUser, leaveController.rejectedLeavesByHod);
//rejected leaves -admin
router.get('/leave/rejectedLeavesByAdmin', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveController.rejectedLeavesByAdmin);

//updateStatus -hod
router.post('/leave/updateStatusByHod/:id', verifyUser.verifyUser, leaveController.updateStatusByHod);
//updateStatus -admin
router.post('/leave/updateStatusByAdmin/:id', verifyUser.verifyUser, verifyUser.verifyAdmin, leaveController.updateStatusByHod);



module.exports = router;