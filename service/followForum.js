const express = require('express')
const DB = require('../model/database/mongoDB/Dao')
const router = express.Router();

router.post("/forum/join", (req, res) => {
    const joinUser = req.body.userName;
    const joinForum = req.body.forumName;
      
})
module.exports = router;