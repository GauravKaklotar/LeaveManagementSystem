const leaveModel = require("../model/leaveSchema");
const leaveTypeModel = require("../model/leaveTypeSchema");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const employees = require("../model/userSchema");
const { Types } = require("mongoose");

const createLeave = async function (req, res) {
  try {
    const { leaveType, password, numOfDays, leaveDetails, leaveStartDate } =
      req.body;
    if (!leaveType || !password || !numOfDays) {
      res.json({ error: "Fill all the fields" });
    }
    // const startDate = new Date(leaveStartDate);
    const isMatch = await leaveModel.findOne({
      userId: req.id,
      leaveStartDate: leaveStartDate,
    });
    if (isMatch) {
      res.json({ error: "Leave request on this day is already created" });
    } else {
      const leaveTypeData = await leaveTypeModel.findOne({
        leaveTypeName: leaveType,
      });
      if (!leaveTypeData || !leaveTypeData.leaveTypeStatus) {
        res.json({ error: "You cannot use this Leave type" });
      } else {
        const isPass = await bcrypt.compare(password, req.password);
        if (!isPass) {
          res.json({ error: "Enter correct Password" });
        }
        let hod = "Pending";
        if (req.roles === "HOD") {
          hod = "Approved";
        } else {
          // const leaveEndDate = new Date(leaveStartDate.getTime() + (numOfDays * 24 * 60 * 60 * 1000));
          // const endDate = new Date(startDate);
          // endDate.setDate(startDate.getDate() + numOfDays);
          const leave = new leaveModel({
            userId: req.id,
            leaveType: leaveTypeData._id,
            leaveDetails: leaveDetails,
            leaveStartDate: leaveStartDate,
            // leaveEndDate: endDate,
            numOfDays: numOfDays,
            hodStatus: hod,
          });
          await leave.save();
          res.json({ message: "leave created" });
          // console.log("leave created");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const allLeaves = async function (req, res) {
  try {
    const leaves = await leaveModel.find();
    if (!leaves) {
      res.json({ error: "No leaves are there" });
    } else {
      let allLeaves = [];
      for (let leave of leaves) {
        const { leaveType, userId } = leave;
        const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
        const leaveTypeName = leaveTypeData.leaveTypeName;
        const userData = await employees.findById(userId).exec();
        const username = userData.username;
        const { password, ...rest } = leave.toObject();
        allLeaves.push({ rest, username, leaveTypeName });
      }

      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const getLeave = async function (req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({ error: "No id provides as a params" });
    }
    const objId = new ObjectId(id);
    const leave = await leaveModel.findOne({ _id: objId });
    if (!leave) {
      res.json({ error: "Leave doesn't exists" });
    }
    else{
      const {leaveType, userId } = leave;
      const leaveTypeData = await leaveTypeModel.findOne({
        _id: leaveType,
      });
      const leaveTypeName = leaveTypeData.leaveTypeName;
      const userData = await employees.findOne({_id : userId});
      const username = userData.username;

      const { password, ...rest } = leave.toObject();
      res.json({rest, leaveTypeName, username});
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteLeave = async function (req, res){
  try{
    const {id} = req.params;
    if (!id) {
      res.json({ error: "Leave doesn't exists" });
    }
    const leave = await leaveModel.findOne({ _id: id });
    if (!leave) {
      res.json({ error: "Leave doesn't exists" });
    }
    if(leave.adminStatus === 'Pending'){
      await leaveModel.deleteOne({ _id: id });
      res.json({message : "Leave has been deleted !!"});
    }
    else{
      res.json({error : "Approved Or Rejected Leave can't be deleted !!"});
    }
  }catch (error) {
    console.log(error);
  }
};


const getUserLeaves = async function (req, res) {
  try {
    const id = req.id;
    if (!id) {
      res.json({ error: "No id provides as a params" });
    }
    const objId = new ObjectId(id);
    const leaves = await leaveModel.find({ userId: id });
    if (!leaves) {
      res.json({ error: "Leave doesn't exists" });
    } else {
      // const allLeaveTypes = leaves.map(async(leave) => {
      //   const leaveTypeData = await leaveTypeModel.findById(leave.leaveType).exec();
      //   const leaveTypeName = leaveTypeData.leaveTypeName;
      //   const id = leaveTypeData._id;
      //   return {id, leaveTypeName};
      // });

      //we cant use this leaveTYpeModel.findById in leaves.map bcs when its cant resolve promise until its starting next iteration so.....
      // const allLeaves = leaves.map((leave) => {
      //   const {leaveType} = leave;
      //   const { password, ...rest } = leave.toObject();
      //   const username = req.username;
      //   return {rest, username};
      // });

      let allLeaves = [];
      for (let leave of leaves) {
        const { leaveType } = leave;
        const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
        const leaveTypeName = leaveTypeData.leaveTypeName;
        const { password, ...rest } = leave.toObject();
        const username = req.username;
        allLeaves.push({ rest, username, leaveTypeName });
      }

      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const getUserLeaveCounts = async function (req, res) {
  try {
    const id = req.id;
    if (!id) {
      res.json({ error: "No id provides as a params" });
    }
    const objId = new ObjectId(id);
    const leaves = await leaveModel.find({ userId: objId });
    if (!leaves) {
      res.json({ error: "Leave doesn't exists" });
    } else {
      let total = 0,
        pending = 0,
        rejected = 0,
        approved = 0;
      leaves.map((leave) => {
        total += 1;
        if (leave.adminStatus === "Approved") {
          approved++;
        }
        if (leave.hodStatus === "Rejected") {
          rejected++;
        }
        if (leave.adminStatus === "Pending") {
          pending++;
        }
      });
      res.json({ total, pending, approved, rejected });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllLeaveCounts = async function (req, res) {
  try {
    const leaves = await leaveModel.find();
    if (!leaves) {
      res.json({ error: "Leave doesn't exists" });
    } else {
      let total = 0,
        pending = 0,
        rejected = 0,
        approved = 0;
      leaves.map((leave) => {
        total += 1;
        if (leave.adminStatus === "Approved") {
          approved++;
        }
        if (leave.hodStatus === "Rejected") {
          rejected++;
        }
        if (leave.adminStatus === "Pending") {
          pending++;
        }
      });
      res.json({ total, pending, approved, rejected });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllLeaveCountsByHod = async function (req, res) {
  try {
    const leaves = await leaveModel.find();
    if (!leaves) {
      res.json({ error: "Leave doesn't exists" });
    } else {
      let total = 0,
        pending = 0,
        rejected = 0,
        approved = 0;
      const hodPos = req.position;
      for (let leave of leaves) {
        const { userId } = leave;
        const userData = await employees.findById(userId).exec();
        const position = userData.position;
        if (position === hodPos) {
          total += 1;
          if (leave.hodStatus === "Approved") {
            approved++;
          }
          if (leave.hodStatus === "Rejected") {
            rejected++;
          }
          if (leave.hodStatus === "Pending") {
            pending++;
          }
        }
      }
      res.json({ total, pending, approved, rejected });
    }
  } catch (error) {
    console.log(error);
  }
};

const allLeavesByHod = async function (req, res) {
  try {
    const leaves = await leaveModel.find();
    if (!leaves) {
      res.json({ error: "No leaves are there" });
    } else {
      let allLeaves = [];
      const hodPos = req.position;
      for (let leave of leaves) {
        const { leaveType, userId } = leave;
        const userData = await employees.findById(userId).exec();
        const position = userData.position;
        if (position === hodPos) {
          const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
          const leaveTypeName = leaveTypeData.leaveTypeName;
          const username = userData.username;
          const { password, ...rest } = leave.toObject();
          allLeaves.push({ rest, username, leaveTypeName });
        }
      }
      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateLeave = async function (req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({ error: "Leave doesn't exists" });
    }
    const leave = await leaveModel.findOne({ _id: id });
    if (!leave) {
      res.json({ error: "Leave doesn't exists" });
    }
    if (leave.hodStatus === "Pending") {
      //for leaveType
      //If you try to save the document with a string value in a field that has been defined as an ObjectId type, Mongoose will throw a CastError. To avoid this error, you should make sure to convert the string value to an ObjectId before saving the document.
      const { leaveStartDate, leaveType, password } = req.body;
      if (leaveType) {
        const leaveTypeData = await leaveTypeModel.findOne({
          leaveTypeName: leaveType,
        });
        if (!leaveTypeData || !leaveTypeData.leaveTypeStatus) {
          res.json({ error: "You cannot use this Leave type" });
        }
      }
      if (leaveStartDate) {
        const isMatch = await leaveModel.findOne({
          userId: req.id,
          leaveStartDate: leaveStartDate,
        });
        if (isMatch) {
          res.json({ error: "Leave request on this day is already created" });
        }
      }
      if (!password) {
        res.json({ error: "Please provide a password to update a leave" });
      } else {
        const isPass = await bcrypt.compare(password, req.password);
        if (!isPass) {
          res.json({
            error: "Please provide a correct password to update a leave",
          });
        } else {
          const {
            password,
            leaveType,
            leaveStartDate,
            // leaveEndDate,
            numOfDays,
            leaveDetails,
          } = req.body;
          const leaveTypeData = await leaveTypeModel.findOne({
            leaveTypeName: leaveType,
          });
          await leaveModel.updateOne(
            { _id: id },
            {
              $set: {
                leaveType: leaveTypeData._id,
                leaveStartDate: leaveStartDate,
                // leaveEndDate: leaveEndDate,
                numOfDays: numOfDays,
                leaveDetails: leaveDetails,
              },
            },
            { new: true }
          );
          res.json({ message: "Leave Updated Successfully" });
        }
      }
    } else {
      res.json({
        error: "Can't update a Leave as its Approved or Rejected as one or more stage",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateLeaveByHod = async function (req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      res.json({ error: "Leave doesn't exists" });
    }
    const leave = await leaveModel.findOne({ _id: id });
    if (!leave) {
      res.json({ error: "Leave doesn't exists" });
    }
    if (leave.adminStatus === "Pending") {
      //for leaveType
      //If you try to save the document with a string value in a field that has been defined as an ObjectId type, Mongoose will throw a CastError. To avoid this error, you should make sure to convert the string value to an ObjectId before saving the document.
      const { leaveStartDate, leaveType, password } = req.body;
      if (leaveType) {
        const leaveTypeData = await leaveTypeModel.findOne({
          leaveTypeName: leaveType,
        });
        if (!leaveTypeData || !leaveTypeData.leaveTypeStatus) {
          res.json({ error: "You cannot use this Leave type" });
        }
      }
      if (leaveStartDate) {
        const isMatch = await leaveModel.findOne({
          userId: req.id,
          leaveStartDate: leaveStartDate,
        });
        if (isMatch) {
          res.json({ error: "Leave request on this day is already created" });
        }
      }
      if (!password) {
        res.json({ error: "Please provide a password to update a leave" });
      } else {
        const isPass = await bcrypt.compare(password, req.password);
        if (!isPass) {
          res.json({
            error: "Please provide a correct password to update a leave",
          });
        } else {
          const {
            password,
            leaveType,
            leaveStartDate,
            // leaveEndDate,
            numOfDays,
            leaveDetails,
          } = req.body;
          await leaveModel.updateOne(
            { _id: id },
            {
              $set: {
                leaveType: Types.ObjectId(leaveType._id),
                leaveStartDate: leaveStartDate,
                // leaveEndDate: leaveEndDate,
                numOfDays: numOfDays,
                leaveDetails: leaveDetails,
              },
            },
            { new: true }
          );
          res.json({ message: "Leave Updated Successfully" });
        }
      }
    } else {
      res.json({
        error: "Can't update a Leave as its Approved as one or more stage",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const pendingLeaves = async function (req, res) {
  try {
    const leaves = await leaveModel.find({
      userId: req.id,
      adminStatus: "Pending",
    });
    if (!leaves) {
      res.json({ error: "No Pending Leaves are there" });
    }
    let allLeaves = [];
    for (let leave of leaves) {
      const { leaveType } = leave;
      const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
      const leaveTypeName = leaveTypeData.leaveTypeName;
      const { password, ...rest } = leave.toObject();
      const username = req.username;
      allLeaves.push({ rest, username, leaveTypeName });
    }
    res.json(allLeaves);
  } catch (error) {
    console.log(error);
  }
};

const approvedLeaves = async function (req, res) {
  try {
    const leaves = await leaveModel.find({
      userId: req.id,
      adminStatus: "Approved",
    });
    if (!leaves) {
      res.json({ error: "No Approved Leaves are there" });
    } else {
      let allLeaves = [];
      for (let leave of leaves) {
        const { leaveType } = leave;
        const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
        const leaveTypeName = leaveTypeData.leaveTypeName;
        const { password, ...rest } = leave.toObject();
        const username = req.username;
        allLeaves.push({ rest, username, leaveTypeName });
      }

      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const rejectedLeaves = async function (req, res) {
  try {
    const leaves = await leaveModel.find({
      userId: req.id,
      hodStatus: "Rejected",
    });
    if (!leaves) {
      res.json({ error: "No rejected Leaves are there" });
    } else {
      let allLeaves = [];
      for (let leave of leaves) {
        const { leaveType } = leave;
        const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
        const leaveTypeName = leaveTypeData.leaveTypeName;
        const { password, ...rest } = leave.toObject();
        const username = req.username;
        allLeaves.push({ rest, username, leaveTypeName });
      }

      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const pendingLeavesByHod = async function (req, res) {
  try {
    const leaves = await leaveModel.find({ hodStatus: "Pending" });
    if (!leaves) {
      res.json({ error: "No pending Leaves are there" });
    }
    else {
      let allLeaves = [];
      const hodPos = req.position;
      for (let leave of leaves) {
        const { leaveType, userId } = leave;
        const userData = await employees.findById(userId).exec();
        const position = userData.position;
        if (position === hodPos) {
          const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
          const leaveTypeName = leaveTypeData.leaveTypeName;
          const username = userData.username;
          const { password, ...rest } = leave.toObject();
          allLeaves.push({ rest, username, leaveTypeName });
        }
      }
      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const approvedLeavesByHod = async function (req, res) {
  try {
    const leaves = await leaveModel.find({ hodStatus: "Approved" });
    if (!leaves) {
      res.json({ error: "No approved Leaves are there" });
    } else {
      let allLeaves = [];
      const hodPos = req.position;
      for (let leave of leaves) {
        const { leaveType, userId } = leave;
        const userData = await employees.findById(userId).exec();
        const position = userData.position;
        if (position === hodPos) {
          const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
          const leaveTypeName = leaveTypeData.leaveTypeName;
          const username = userData.username;
          const { password, ...rest } = leave.toObject();
          allLeaves.push({ rest, username, leaveTypeName });
        }
      }
      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const rejectedLeavesByHod = async function (req, res) {
  try {
    const leaves = await leaveModel.find({ hodStatus: "Rejected" });
    if (!leaves) {
      res.json({ error: "No rejected Leaves are there" });
    }
    else {
      let allLeaves = [];
      const hodPos = req.position;
      for (let leave of leaves) {
        const { leaveType, userId } = leave;
        const userData = await employees.findById(userId).exec();
        const position = userData.position;
        if (position === hodPos) {
          const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
          const leaveTypeName = leaveTypeData.leaveTypeName;
          const username = userData.username;
          const { password, ...rest } = leave.toObject();
          allLeaves.push({ rest, username, leaveTypeName });
        }
      }
      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateStatusByHod = async function (req, res) {
  try {
    const roles = req.roles;
    const { id } = req.params;
    if (roles === "HOD") {
      if (!id) {
        res.json({ error: "No id in Params" });
      }
      const { hodStatus, password, hodRemark } = req.body;
      const isPass = await bcrypt.compare(password, req.password);
      if (!isPass) {
        res.json({
          error: "Please provide a correct password to update a leave",
        });
      }
      await leaveModel.findOneAndUpdate(
        { _id: id },
        { hodStatus, hodRemark },
        { new: true }
      );
      res.json({ message: "Status Updated Successfully" });
    } else {
      res.json({ error: "Only Hod is permitted to do this" });
    }
  } catch (error) {
    console.log(error);
  }
};

const pendingLeavesByAdmin = async function (req, res) {
  try {
    const leaves = await leaveModel.find({ adminStatus: "Pending" });
    if (!leaves) {
      res.json({ error: "No pending Leaves are there" });
    } else {
      let allLeaves = [];
      for (let leave of leaves) {
        const { leaveType, userId } = leave;
        const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
        const leaveTypeName = leaveTypeData.leaveTypeName;
        const userData = await employees.findById(userId).exec();
        const username = userData.username;
        const { password, ...rest } = leave.toObject();
        allLeaves.push({ rest, username, leaveTypeName });
      }

      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const approvedLeavesByAdmin = async function (req, res) {
  try {
    const leaves = await leaveModel.find({ adminStatus: "Approved" });
    if (!leaves) {
      res.json({ error: "No approved Leaves are there" });
    } else {
      let allLeaves = [];
      for (let leave of leaves) {
        const { leaveType, userId } = leave;
        const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
        const leaveTypeName = leaveTypeData.leaveTypeName;
        const userData = await employees.findById(userId).exec();
        const username = userData.username;
        const { password, ...rest } = leave.toObject();
        allLeaves.push({ rest, username, leaveTypeName });
      }

      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const rejectedLeavesByAdmin = async function (req, res) {
  try {
    const leaves = await leaveModel.find({ adminStatus: "Rejected" });
    if (!leaves) {
      res.json({ error: "No rejected Leaves are there" });
    } else {
      let allLeaves = [];
      for (let leave of leaves) {
        const { leaveType, userId } = leave;
        const leaveTypeData = await leaveTypeModel.findById(leaveType).exec();
        const leaveTypeName = leaveTypeData.leaveTypeName;
        const userData = await employees.findById(userId).exec();
        const username = userData.username;
        const { password, ...rest } = leave.toObject();
        allLeaves.push({ rest, username, leaveTypeName });
      }

      res.json(allLeaves);
    }
  } catch (error) {
    console.log(error);
  }
};

const updateStatusByAdmin = async function (req, res) {
  try {
    const roles = req.roles;
    if (roles === "ADMIN") {
      const { id } = req.params;
      if (!id) {
        res.json({ error: "No id in Params" });
      }
      const { hodStatus, password, adminRemark } = req.body;
      const isPass = await bcrypt.compare(password, req.password);
      if (!isPass) {
        res.json({
          error: "Please provide a correct password to update a leave",
        });
      }
      await leaveModel.findOneAndUpdate(
        { _id: id },
        { hodStatus, adminRemark },
        { new: true }
      );
      res.json({ message: "Status Updated Successfully" });
    } else {
      res.json({ error: "Only Admin is permitted to do this" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createLeave,
  allLeaves,
  getLeave,
  deleteLeave,
  getUserLeaves,
  getUserLeaveCounts,
  getAllLeaveCounts,
  getAllLeaveCountsByHod,
  allLeavesByHod,
  updateLeave,
  pendingLeaves,
  approvedLeaves,
  rejectedLeaves,
  updateLeaveByHod,
  pendingLeavesByHod,
  approvedLeavesByHod,
  rejectedLeavesByHod,
  updateStatusByHod,
  pendingLeavesByAdmin,
  approvedLeavesByAdmin,
  rejectedLeavesByAdmin,
  updateStatusByAdmin,
};
