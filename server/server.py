import string
import random
from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


meetingId=''
class Item(BaseModel):
    id:str
def createMeeting():
    import requests
    global meetingId

    url = "https://api.cluster.dyte.in/v1/organizations/a308ef5a-9a5c-41cb-b631-d5fec5c9b723/meeting"

    payload = {
    "title": "Vidify",
    "authorization": {"waitingRoom": False}
           }
    headers = {
    "Content-Type": "application/json",
    "Authorization": "5a2d372de36a1a26b8f5"
                }

    response = requests.request("POST", url, json=payload, headers=headers)
    meetingData = response.json()
    meetingId = meetingData['data']['meeting']['id']
    roomName = meetingData['data']['meeting']['roomName']
    return(roomName,meetingId)

    
def joinMeeting():
    global meetingId
    N = 7
    res = ''.join(random.choices(string.ascii_lowercase, k=N))
    import requests

    url = 'https://api.cluster.dyte.in/v1/organizations/a308ef5a-9a5c-41cb-b631-d5fec5c9b723/meetings/%s/participant' %(meetingId)

    payload = {
        "clientSpecificId": res,
        "userDetails": {
        "name": "\t",
    },
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": "5a2d372de36a1a26b8f5"
    }

    response = requests.request("POST", url, json=payload, headers=headers)
    userData = response.json()
    authToken = userData['data']['authResponse']['authToken']
    return (authToken)

def getMeeting():
    import requests
    global meetingId

    url = 'https://api.cluster.dyte.in/v1/organizations/a308ef5a-9a5c-41cb-b631-d5fec5c9b723/meetings/%s' %(meetingId)

    headers = {
        "Content-Type": "application/json",
        "Authorization": "5a2d372de36a1a26b8f5"
    }

    response = requests.request("GET", url, headers=headers)
    meetingData= response.json()
    roomName = meetingData['data']['meeting']['roomName']
    return roomName
    

@app.get('/')
def root():
    return{"hello": "world"}

@app.get('/create')
def create():
   meetingInfo = createMeeting()
   userInfo = joinMeeting()
   return(meetingInfo,userInfo)

@app.post('/join')
def join(id :Item):
    global meetingId
    meetingId = id.id
    meetingInfo = getMeeting()
    userInfo = joinMeeting()
    return(meetingInfo,userInfo)
