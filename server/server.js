const express = require('express')
const app = express()
const port = 3001
const axios = require("axios");
var cors = require('cors');
app.use(cors());
app.use(express.json())
var crypto = require("crypto");


var meetingData = {}
var meetingid ='5b48b0cc-9e0f-427a-a4c5-a25bfe9633ed'
var roomname ='nvxioq-aopmqp'
var userdata = {}
var authtoken =''
var id = crypto.randomBytes(20).toString('hex');



var options = {
    method: 'POST',
    url: 'https://api.cluster.dyte.in/v1/organizations/a308ef5a-9a5c-41cb-b631-d5fec5c9b723/meeting',
    headers: {'Content-Type': 'application/json', Authorization: '5a2d372de36a1a26b8f5'},
    data: {title: 'Video Deck', authorization: {waitingRoom: false}}
  };

  var options2 = {
    method: 'POST',
    url: `https://api.cluster.dyte.in/v1/organizations/a308ef5a-9a5c-41cb-b631-d5fec5c9b723/meetings/${meetingid}/participant`,
    headers: {'Content-Type': 'application/json', Authorization: '5a2d372de36a1a26b8f5'},
    data: {
      clientSpecificId: id,
      userDetails: {name: '\t'},
    }
  };

  var options3 = {
    method: 'GET',
    url: `https://api.cluster.dyte.in/v1/organizations/a308ef5a-9a5c-41cb-b631-d5fec5c9b723/meetings/${meetingid}`,
    headers: {'Content-Type': 'application/json', Authorization: '5a2d372de36a1a26b8f5'}
  };

  const joinmeeting =()=>{
    axios.request(options2).then(function (response) {
        userdata = response.data;
        authtoken =userdata.data.authResponse.authToken
        console.log(authtoken)


      }).catch(function (error) {
        console.error(error);
      });

  }

  
  const createmeeting =()=>{
    axios.request(options).then(function (response) {
        meetingData = response.data;
        meetingid = meetingData.data.meeting.id;
        roomname = meetingData.data.meeting.roomName

        // console.log(meetingid)
        // console.log(roomname)
    
      }).catch(function (error) {
        console.error(error);
      });

      
  }

  const getmeeting = ()=>{
    axios.request(options3).then(function (response) {
    
      meetingData = response.data
      roomname = meetingData.data.meeting.roomName
      console.log(roomname)
      
    }).catch(function (error) {
      console.error(error);
    });
  }


app.get('/',(req,res)=>{
 
})


app.get('/create', (req, res) => {
    
    createmeeting()
    joinmeeting()

    
    res.send([roomname,authtoken,meetingid])
})


app.get('/join',(req,res)=>{

    console.log(req.body.meetingid)
    meetingid= req.body.meetingid
    getmeeting()
    joinmeeting()

    res.send([roomname,authtoken])

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})