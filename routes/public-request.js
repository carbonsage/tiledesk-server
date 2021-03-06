var express = require('express');
var router = express.Router();
var Message = require("../models/message");
var Request = require("../models/request");
var User = require("../models/user");
var Project = require("../models/project");
var emailService = require("../models/emailService");





  router.get('/:requestid/messages', function(req, res) {
  
    console.log(req.params);
    console.log("here");    
    return Message.find({"recipient": req.params.requestid}).sort({updatedAt: 'asc'}).exec(function(err, messages) { 
      if (err) {
        return res.status(500).send({success: false, msg: 'Error getting object.'});
      }

      if(!messages){
        return res.status(404).send({success: false, msg: 'Object not found.'});
      }

      return res.json(messages);
    });

  });


  router.get('/:requestid/messages.html', function(req, res) {
  
    console.log(req.params);
    console.log("here");    
    return Message.find({"recipient": req.params.requestid}).sort({updatedAt: 'asc'}).exec(function(err, messages) { 
      if (err) {
        return res.status(500).send({success: false, msg: 'Error getting object.'});
      }

      if(!messages){
        return res.status(404).send({success: false, msg: 'Object not found.'});
      }

      return res.render('messages', { title: 'Tiledesk', messages: messages});
    });

  });

  router.post('/:requestid/notify/email', function(req, res) {
  
    console.log("req.params", req.params);
    console.log("req.query", req.query);

    var user_id = req.query.user_id;


    // savedRequest.first_text
    // savedRequest.requester_id}
    // savedRequest.id_project
    // savedRequest.request_id

    // return Request.findOne({request_id: req.params.requestid, id_project:  req.projectid}, function(err, request) {
      return Request.findOne({request_id: req.params.requestid}, function(err, request) {
      if (err) {
        console.error(err);
        return res.status(500).send({err:err});
      }
      if (!request) {

        request = {
          first_text: req.body.first_text,
          requester_id: req.body.requester_id,
          id_project: req.body.id_project,
          request_id: req.body.request_id
        };
        
      }

      console.log("request", request);

      return User.findById( user_id, function (err, user) {
        if (err) {
          console.error("Error notify user " + user_id, err);
          return res.status(500).send({err:err});
        }
        if (!user) {
          console.warn("User not found",  user_id);
          return res.status(404).send({ success: false, msg: 'User not found' });
        } else {
          console.log("Sending sendNewAssignedRequestNotification to user with email", user.email);

          return Project.findById(request.id_project, function(err, project) {
            emailService.sendNewAssignedRequestNotification(user.email, request, project);
            return res.json({ success: true});
          });
         
        }
      });


      
    });

  
  });


  


module.exports = router;
