
import { useEffect, useRef, useState } from "react";
import './App.css'

//--------------------we need to add compat here or it will show error
import firebase from 'firebase/compat/app'
import {initializeApp} from 'firebase/app'
import 'firebase/compat/firestore' //for db
import 'firebase/compat/auth'  
// import "../../server"

import { getAnalytics } from "firebase/analytics";


//hooks used for react and firebase use
import {useAuthState} from "react-firebase-hooks/auth"
import {useCollectionData} from "react-firebase-hooks/firestore"
import { BrowserRouter, Navigate, Route, Routes, redirect, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { addDoc, collection, disablePersistentCacheIndexAutoCreation, getFirestore, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { where } from "firebase/firestore";
import {getDownloadURL, getStorage, listAll, ref, uploadBytes,getMetadata} from 'firebase/storage'
import { v4 } from "uuid";

{



//for video from livekit   its opensource but charges money .
//if you want to change this in future .
//make different account on livekit
//twilio or direct webrtc
// import {LiveKitRoom,VideoConference,GridLayout,ParticipantTile, RoomAudioRenderer, ControlBar, useTracks} from '@livekit/components-react'
// import '@livekit/components-styles'
// import { Track } from "livekit-client";
// import process from "./process";


//-----------------------------------for video call
// import { io } from "socket.io-client";
// import { Flag } from "@material-ui/icons";
// import  Button  from "@material-ui/core";
// import IconButton from "@material-ui/core";
// import TextField from "@material-ui/core";
// import {AssignmentIcon} from "@material-ui/icons/Assignment"
// import {PhoneIcon} from "@material-ui/icons/Phone"
// import CopyToClipboard from "react-copy-to-clipboard";
// import {Peer} from "simple-peer";
// import Peer from "simple-peer"

}


import React from "react";
import axios, { Axios } from "axios";
import { saveAs } from "file-saver";

{
//------------------------------------------------------for video call ----------------- this also didnt work
// import Webcam from "react-webcam";
// import Peer from "peerjs";
// import { response } from "express";

// const servers={
//  iceServers:[
//   {
//     urls:['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']
//   },
//  ],iceCandidatePoolSize:10,
// }

// let pc = new RTCPeerConnection(servers);
// let localStream= null;
// let remoteStream = null;


//------------------------------------------------------------- havent tried but i am not wasting my time on this

// import Videoroom from "./Pages/video";



//----------------------------------------------------------------random comics
// import {SuperAgent} from 'superagent'
// import './index'
// import { superagent } from "./index";





}











//here u have connected to firebase
firebase.initializeApp({
  apiKey: "AIzaSyBOCu3bN5FLm8dC1HL59rYV2y4KPqVNrSc",

  authDomain: "chat-app-1-b60a9.firebaseapp.com",

  projectId: "chat-app-1-b60a9",
  
  storageBucket: "chat-app-1-b60a9.appspot.com",

  messagingSenderId: "820516829593",

  appId: "1:820516829593:web:ea0de7174a2ec42b473b08",

  measurementId: "G-Q1W65N6XE0"

})

const app = initializeApp({
  apiKey: "AIzaSyBOCu3bN5FLm8dC1HL59rYV2y4KPqVNrSc",

  authDomain: "chat-app-1-b60a9.firebaseapp.com",

  projectId: "chat-app-1-b60a9",

  storageBucket: "chat-app-1-b60a9.appspot.com",

  messagingSenderId: "820516829593",

  appId: "1:820516829593:web:ea0de7174a2ec42b473b08",

  measurementId: "G-Q1W65N6XE0"

})

const db = getFirestore(app);


const auth = firebase.auth();
const firestore = firebase.firestore();
const msgdbref = collection(db,"messages");
const storage = getStorage(app);


//----------------------------------------------------app--------------------------------------














function App() {







// useEffect(()=>fetch('https://xkcd.com/118/info.0.json').then(data=>data.json()).then(result=>console.log(result)))


//---------------------downloads  guess it
// const downloadImage = () => {
//   saveAs('https://source.unsplash.com/random/1200x800', 'image.jpg') // Put your image URL here.
// }
// downloadImage()


  
  const Oooo = async () => {
  try{
    
    const img = await (await axios.get('https://xkcd.vercel.app/?comic=303'))


    // axios.get('https://www.reddit.com/r/anysubreddit.json').then((response)=>{
      //     console.log("response is")
    //     let pinghu = "";
    //     // console.log(response.data.data.children[3].data.media_embed.content)
    //      pinghu =response.data.data.children[3].data.media_embed.content;
    //     console.log(pinghu)

    //     var link = pinghu.match(/https?:\/\/[^\s]+/)[0]
    //     console.log(link)
        
    //   })
    console.log(img.data)
    
    
    }catch(e){
      console.log("error si :",e)
    }
  
    return ;
  }


Oooo()




 



  
  //tells is the object "user" has info or is null
  //we can use this to tell if someone llogged in
  // const [isin,setisin] = useState(false);
const [user]= useAuthState(auth);
const biscuit = new Cookies();
const [isauth,setisauth]=useState(biscuit.get("auth-token"));
// console.log(isauth);

var [room ,setroom] = useState(null);
console.log("room="+room);
const [username,setusername] =useState('');
const [roomslist,setroomslist] = useState([]);

const vid = biscuit.get("chat-room")



  return (
    <>
    
    <div className="universe flex flex-row grow justify-center absolute" style={{height:"auto",color:"white"}}>

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landingpage isauth={isauth} setisauth={setisauth}/>}/>
      <Route path="/auth" element={<Authen isauth={isauth} setisauth={setisauth}/>}/>
      <Route path="/selectchat" element={<Selectchat isauth={isauth} setroom={setroom} room={room} setusername={setusername} username={username}/>}/>
      {/* <Route path="/chatroom" element={<Chatroom setisauth={setisauth} room={room} isauth={isauth} setusername={setusername} username={username}/>}/> */}

      <Route path="/chat_layout/" element={<Chat_layout room={room} isauth={isauth}  roomslist={roomslist} setroomslist={setroomslist} />}/>

      {/* <Route path="/prototype" element={<Prototype room={room} isauth={isauth}/>}/> */}
    </Routes>
    </BrowserRouter>
</div>
    </>
  )
}

export default App





//----------------------landing page------------------------------


const Landingpage = ()=>{
  return(
    <div>
      <div className="hpage ">

<nav className="navbar p-3 flex flex-row justify-center sticky top-0">


<div className="a3 flex flex-row justify-between">


  <div className="flex flex-row">
    <div><img src="./src/assets/images/logo.png" className="h-8"/></div>
    <div className="w-1 "></div>
    <div className="fon flex flex-col justify-center text-bg">OrionChat</div>
    <div className="w-6 "></div>
    <div className="mon flex flex-col justify-center ">Home</div>
    <div className="w-6 "></div>
    <div className="mon flex flex-col justify-center ">Home</div>
    <div className="w-6 "></div>
    <div className="mon flex flex-col justify-center ">Home</div>

  </div>


  <div className="flex flex-row">
  <button className="navbtn1 mon pt-0.5">Log in</button>
  <div className="w-5"></div>
  <button className="navbtn">Sign Up</button>
  <div className="w-4"></div>
  <button className="navbtn3">Stealth View</button>
  </div>



</div>


</nav>


    <div className="h-20"></div>
    <div className="quote1"> 
    <div className="c1 flex flex-row justify-center"><div className="d1 flex justify-center"> Chatting Beyond the Stars  </div></div>
    <div className="c1 flex flex-row justify-center"><div className="d1 flex justify-center ">OrionChat  </div></div>
    <div className="h-4"></div>
    </div>
    <div className="c2 flex flex-row justify-center"><div className="d1 flex justify-center ">Experience seamless, anonymous connections and vibrant discussions  </div></div>
    <div className="c2 flex flex-row justify-center"><div className="d1 flex justify-center ">designed to bring people together effortlessly </div></div>
    <div className="h-12"></div>
    <div className="c3 flex flex-row justify-center"><div className="d1 flex justify-center ">  <button className="navbtn4">Get Started {">"}</button> </div></div>
    


<img src="./src/assets/images/img1.jpg" className="img1 opacity-20" alt="" /> 
     

    <div className="h-10"></div>
    <div className="h-10"></div>
    <div className="h-10"></div>
    <div className="h-10"></div>
    
    <div className="h-10"></div>
    <div className="h-10"></div>
  {/* -------------------------------------------------------------------------------------------------------------------- */}
    <div className="c2 flex flex-row justify-center ">
      <div className="a3 flex flex-row">

      <img src="./src/assets/images/img2.jpg" className="img2"alt="" />
      <div className="w-20"></div>
      <div className="d2 flex  px-10 py-11 break"> <p> Enter the untamed realm of <span className="bg bg-blue-600">Anonymous Browsing</span> , where conversations flow freely, your identity stays secret, and authentic interactions know no bounds.</p></div>

       </div>
    </div>


    {/* -------------------------------------------------------------------------------------------------------------------------- */}
    <div className="h-10"></div>
    <div className="h-10"></div>
    <div className="flex justify-center"><div className="line1 h-0.5 bg-slate-400"></div></div>
    <div className="h-10"></div>
    <div className="h-10"></div>
    




    {/* -------------------------------------------------------------------------------------------------------------------------- */}

    <div className="c2 flex flex-row-reverse justify-center ">
      <div className="a3 flex flex-row-reverse">

      <img src="./src/assets/images/img3.jpg" className="img2"alt="" />
      <div className="w-20"></div>
      <div className="d2 flex  px-10 py-11"><p> Crafting seamless conversations starts with our refined, <span className="bg bg-blue-600">User-friendly Interface</span>, ensuring you're in command of every interaction, effortlessly.</p></div>

       </div>
    </div>

    {/* -------------------------------------------------------------------------------------------------------------------------- */}

    <div className="h-10"></div>
    <div className="h-10"></div>
    <div className="flex justify-center"><div className="line2 h-0.5 bg-slate-400"></div></div>


    <div className="h-10"></div>
    <div className="h-10"></div>
    {/* -------------------------------------------------------------------------------------------------------------------------- */}

    <div className="c2 flex flex-row-reverse justify-center ">
      <div className="a3 flex flex-row">

      <img src="./src/assets/images/img4.png" className="img2"alt="" />
      <div className="w-20"></div>
      <div className="d2 flex  px-10 py-11"><p>Design captivating online spaces effortlessly. Create <br/><span className="bg bg-blue-600">Chat Rooms</span> to connect, share, and engage with diverse communities, all within our elegant platform</p></div>

       </div>
    </div>
    {/* -------------------------------------------------------------------------------------------------------------------------- */}

    <div className="h-10"></div>
    <div className="h-10"></div>
    <div className="flex justify-center"><div className="line3 h-0.5 bg-slate-400"></div></div>


    <div className="h-10"></div>
    <div className="h-10"></div>




    <div className="c2 flex flex-row-reverse justify-center ">
      <div className="a3 flex flex-row-reverse">

      <img src="./src/assets/images/img3.jpg" className="img2"alt="" />
      <div className="w-20"></div>
      <div className="d2 flex  px-10 py-11"><p> Crafting seamless conversations starts with our refined, <span className="bg bg-blue-600">User-friendly Interface</span>, ensuring you're in command of every interaction, effortlessly.</p></div>

       </div>
    </div>




    </div>

    </div>
  )
}






//--------------------------------------chat layout------------------------------



const Chat_layout = (props)=>{
  const {room,isauth,roomslist,setroomslist}=props
  const biscuit = new Cookies()
  const goto = useNavigate()
  
  useEffect(()=>{
    console.log(isauth);

    //fixing routing
    /*
    (biscuit.get("auth-token")===undefined)?goto("/auth"):goto("/chat_layout");
    */
    
  },[]);


return(
  <div>
    <div className="universe flex flex-row grow justify-center absolute" style={{height:"auto",width:"100vw",color:"white"}}>

<div className="leftsideuniverse sticky top-0" >
<Leftuniv roomslist={roomslist} setroomslist={setroomslist}/>
</div>

<div className="routerdiv flex ">

{
(biscuit.get("chat-room")===undefined)?

<div className="nochat flex justify-center content-center "><div>Select a Chat</div></div>
:
<Testchatrom room={room} isauth={isauth}/>
  
} 



</div>

</div>
  </div>
)
}

















//------------------------------left universe-------------------------------------




export const Leftuniv = ({roomslist,setroomslist}) => {
  const biscuit = new Cookies();

  return (
    <div className="left-god sticky top-0">

      {((biscuit.get("auth-token")!=undefined && biscuit.get("user-id")!=undefined))?

        <div className="">
        <Chatroomlist roomslist={roomslist} setroomslist={setroomslist}/>
      </div>
      :
      <div>
        login
      </div>
      }
    </div>
  )
}


//------------------------------------chat room list---------------------------------------


export const Chatroomlist = ({roomslist,setroomslist}) => {
  const biscuit = new Cookies()
  //changes when page refreshed . so stored in localstorage with key as inroom
  const [inroom,setinroom] = useState("")
  


  useEffect(()=>{
    const querymsg = query(msgdbref,where("user","==",biscuit.get("user-id")))

    onSnapshot(querymsg,(snapshot)=>{
      let roomss=[];
      snapshot.forEach((doc)=>{
        roomss.push(doc.data().room)
      })


      function removeDuplicates(roomss) {
        return roomss.filter((item,
            index) => roomss.indexOf(item) === index);
    }
    const rroom = removeDuplicates(roomss)

    setroomslist(rroom)
    // console.log(roomslist)
  


    })
  },[])

  return (
    <>
       <div className="chat-banner sticky top-0">
      <div className="room-banner-2 flex flex-row justify-center sticky top-0">
        <div></div>
      <p className="roomname rounded-xl p-5 text-xl">
      Rooms
      </p>
      <div className="out text-xl flex  flex-row justify-center">
        <div className="center  inline-block py-10">
        {/* <Signout/> */}
        </div>
        </div>
      </div>

      
      </div>
    <div className="scroll-god " onClick={  ()=>{  console.log(roomslist);   window.location.reload();    }  }>
      <div className="roomattopstick sticky">

          
 


      
      <div className="ahuja h-5"></div>
      {roomslist.map((roomslist)=>{
        return(
          <div>

          <div className="oiho flex flex-row justify-between flex-grow" >
            <div className="twins"></div>

        <div className="click-chat grow" style={{    backgroundColor:`${localStorage.getItem("inroom")===roomslist?"#222627":""}`  }}  onClick={()=>{ biscuit.set("chat-room",roomslist); localStorage.setItem("inroom",roomslist)}}>


          <div className="room-deco-out ">

          <img src="https://picsum.photos/200" className="room-photo-l"/>
          <div className="" style={{width:"20px"}}></div>
          <div className="room-deco-l" >
          {roomslist}
          </div>


          </div>
          </div>
          <div className="twins"></div>
          </div>
          <div className="h-1"></div>
          </div>
        );
      })}
    </div>
    </div>
</>
  )
}





//------------------------------right universe-------------------------------------




export const Rightuniv = () => {
  return (
    <div className="right-univ sticky top-0">
    <Explore/>
    </div>
  )
}





//---------------------------------explore ------------------------------------


const Explore = ()=>{
  return(
    <div className="explore-div-outer sticky top-0">
     
     <div className="chat-banner-3 ">
      <div className="room-banner-2 flex flex-row justify-center sticky top-0">
        <div></div>
      <p className="roomname rounded-xl p-5 text-xl">
      Explore
      </p>
      <div className="out text-xl flex  flex-row justify-center">
        <div className="center  inline-block py-10">
        {/* <Signout/> */}
        </div>
        </div>
      </div>  
      </div>

      <div className="a-1 h-4"></div>
<div className="exp-cnt flex flex-rowflex-grow">
<div className="twin w-4 grow-0"></div>

<div className="exp-cnt-main  flex-grow">
  
  {/* //general */}
  <div className="general flex flex-row ">
    <div className="card card-hover  grow p-3 ">hi</div>
    <div className="twin w-4 grow-0"></div>
    <div className="card card-hover  grow p-3 ">hi</div>
  </div>

  <div className="a-1 h-5"></div>

    <Trendingdiscussions/>

    <div className="a-1 h-5"></div>

<div className="twin w-4 grow-0"></div>

  <BetaPlayground/>

</div>
<div className="twin w-4 grow-0"></div>


</div>


    </div>
  )
}


//----------------------------------BETA playground-----------------



const BetaPlayground =()=>{
  return(
    <div>
      <div className="tren-heading">BETA PLAYGROUND</div>
      <div className="twin h-4"></div>

      <div className="betacards flex flex-row flex-grow ">

      <div className="card-31 card-hover  col grow flex flex-col flex-grow">hi</div>
      <div className="twin w-4 grow-0"></div>

      <div className="flex flex-col grow">
      <div className="card-3 card-hover ">hi</div>
      <div className="a-1 h-4"></div>

      <div className="card-3 card-hover ">hi</div>
      </div>

      </div>
    </div>
  )
}






//--------------------------------trending discussions----------------------


const Trendingdiscussions = ()=>{
  return(
    <div>
      <div className="tren-heading">TRENDING HUBS</div>
      <div className="a-2 h-5"></div>

      <div className="card-2 card-hover  p-2">hi</div>
      <div className="a-2 h-3"></div>
      <div className="card-2 card-hover  p-2">hi</div>
      <div className="a-2 h-3"></div>
      <div className="card-2 card-hover  p-2">hi</div>
    </div>
  )
}











//------------------------------------------videoroom--------------------------





// export const Videoroom = () => {
// const webcamVideo = useRef()
// const remoteVideo = useRef();
// const webcamButton = useRef()
// const callButton = useRef()
// const callInput = useRef()
// const answerButton = useRef()
// const hangupButton = useRef()

// const webcamfn = async ()=>{
//   localStream = await navigator.mediaDevices.getUserMedia({video:true , audio:true})
//   //empty mediastream created
//   remoteStream = new MediaStream();

//   //push track from localstream to peer connection
//   localStream.getTracks().forEach((track)=>{
//     pc.addTrack(track,localStream)
//   })

//   //pull track from remotestream , then add to video stream
//   pc.ontrack= event=>{
//     event.streams[0].getTracks().forEach(track=>{
//       remoteStream.addTrack(track)
//     })
//   }

//   webcamVideo.current.srcObject= localStream;
//   remoteVideo.current.srcObject = remoteStream;
// }

// const callfn = async()=>{
//   const callDoc = firestore.collection('calls').doc();
//   const offerCandidates = callDoc.collection('offerCandidates')
//   const answerCandidates = callDoc.collection('answerCandidates')

//   //firebase random id generated
//   callInput.current.value= callDoc.id

//   //icecandidate contain ip address and port info which used to make peer to peer connection 
//   pc.onicecandidate = event =>{
//     event.candidate && offerCandidates.add(event.candidate.toJSON())
//   }


//   //createofferand save to online db
//   const offerDescription = await pc.createOffer()
//   await pc.setLocalDescription(offerDescription)
// //sdp = session desc protocol. it has all the info about video codec+connection 
//  const offer = {
//   //offer desc called . so ice candidates generated
//   sdp: offerDescription.sdp,
//   type: offerDescription.type,
//  }

//  //send  the object to firebase
//  await callDoc.set({offer})

// //now we need to listed to other users
// callDoc.onSnapshot((snapshot)=>{
//   const data = snapshot.data();
//   // searching db for ans ///forming initial connection
//   if(!pc.currentRemoteDescription && data?.answer){
//     //when ans found 
//     const answerDescription = new RTCSessionDescription();
//     //update ans on peer connection
//     pc.setRemoteDescription(answerDescription)

//   }

// })

// //we see icecandidates FROM answering user 
// // we do this by listening to collection of answercondidate 
// //when answered add candidate to peer connection
// answerCandidates.onSnapshot(snapshot=>{
//   // only see docs that are added to collection 
//   snapshot.docChanges().forEach((change)=>{
//     if (change.type==='added'){
//       const candidate = new RTCIceCandidate(change.doc.data());
//       pc.addIceCandidate(candidate)
//       //currently we are listening to updates from answer side 
//       // we need to interact user and answer side
//     }
//   })

// })

// }

// const ansfn = async()=>{
//   const callId = callInput.current.value;
//   console.log("callid:"+callId)
//   const callDoc = firestore.collection('calls').doc(`${callId}`)
//   console.log("calldoc"+callDoc)
//   const answerCandidates = callDoc.collection('answerCandidates')
//   console.log("anscnd"+answerCandidates)

//   const offerCandidates = callDoc.collection('offerCandidates')

//   pc.onicecandidate= (event)=>{
//     event.candidate && answerCandidates.add(event.candidate.toJSON())
    
//   }
//   const callData = (await callDoc.get());
//   const offerDescription = callData.offer;

//   await pc.setRemoteDescription(new RTCSessionDescription(offerDescription))

//   const answerDescription = await pc.createAnswer()
//   await pc.setLocalDescription(answerDescription)

//   const answer = {
//     //offer desc called . so ice candidates generated
//     sdp: answerDescription.sdp,
//     type: answerDescription.type,
//    }

//    await callDoc.update({answer})


//    offerCandidates.onSnapshot((snapshot)=>{
//     snapshot.docChanges().forEach((change)=>{
//       console.log("change is:"+change)
//       if(change.type==="added"){
//         let data = change.doc.data()
//         pc.addIceCandidate(new RTCIceCandidate(data))
//       }
//     })

//    })








// }


//   return (
//     <div>


//       <div className="videos flex flex-row">
//         <div className="video"><video ref={webcamVideo} autoPlay playsInline></video></div>
//         <div className="video "><video ref={remoteVideo} autoPlay playsInline></video></div>
//       </div>

//       <div className=" grid grid-rows-2">
//       <div className="vidbtndiv"><button className="vidbtn" ref={webcamButton} onClick={webcamfn}>start webcam</button></div>
//       <div className="call"><button className="vidbtn" ref={callButton} onClick={callfn}>start call</button></div>
//       <div className="inputkey"><input type="text" className="text-black" ref={callInput}/><button className="vidbtn " ref={answerButton} onClick={ansfn}>answer call</button></div>
//       <div className="end"><button className="vidbtn" ref={hangupButton}>EndCall</button></div>
//       </div>


//     </div>
//   )
// }












//---------------------------------videoroom- usong gpt (starts a vvideo but dont know what ot do then/ stopped because undefined time )----------------------------------------




// export const Videoroom = () => {

  
//     const [localStream, setLocalStream] = useState(null);
//     const [remoteStream, setRemoteStream] = useState(null);
//     const [peer, setPeer] = useState(null);
  
//     useEffect(() => {
//       // Create a new PeerJS instance
//       const peer = new Peer();
  
//       // Get access to the user's webcam
//       navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//         .then((stream) => {
//           setLocalStream(stream);
  
//           // Answer calls from other peers
//           peer.on('call', (call) => {
//             call.answer(stream);
  
//             call.on('stream', (remoteStream) => {
//               setRemoteStream(remoteStream);
//             });
//           });
//         })
//         .catch((error) => {
//           console.error('Error accessing webcam:', error);
//         });
  
//       setPeer(peer);
  
//       // Clean up when the component unmounts
//       return () => {
//         peer.disconnect();
//       };
//     }, []);
  
//     const startCall = (remotePeerId) => {
//       if (peer) {
//         const call = peer.call(remotePeerId, localStream);
  
//         call.on('stream', (remoteStream) => {
//           setRemoteStream(remoteStream);
//         });
//       }
//     };
  
//     return (
//       <div>
//         <LocalVideo />
//         {remoteStream && <RemoteVideo stream={remoteStream} />}
//         <button onClick={() => startCall('remote-peer-id')}>
//           Start Call
//         </button>
//       </div>
//     );
//   };
  
  




//---------------------------------------------

// LocalVideo.js

// const LocalVideo = () => {
//   const webcamRef = React.useRef(null);

//   return (
//     <div>
//       <Webcam audio={false} ref={webcamRef} />
//     </div>
//   );
// };



// const RemoteVideo = ({ stream }) => {
//   const videoRef = React.useRef(null);

//   React.useEffect(() => {
//     if (stream && videoRef.current) {
//       videoRef.current.srcObject = stream;
//     }
//   }, [stream]);

//   return (
//     <div>
//       <video ref={videoRef} autoPlay playsInline />
//     </div>
//   );
// };


//--------------------------------------------------------------------------------------------until here used gpt

// export const Videoroom = () => {
//   const [me,setme]= useState("")
//   const [stream,setstream]= useState()
//   const [recievingCall,setrecievingCall] = useState(false)
//   const [caller,setcaller]  = useState("")
//   const [callerSignal,setcallerSignal] = useState()
//   const [callAccepted,setcallAccepted] = useState(false)
//   const [idToCall,setidToCall] = useState("")
//   const [callEnded,setcallEnded] = useState(false)
//   const [name,setname] = useState("")


//   const myVideo  = useRef()
//   const userVideo = useRef()
//   const connectionRef  = useRef()

// useEffect(()=>{
//   //permission is asked to use webcm, then stream is set.
//   navigator.mediaDevices.getUserMedia({video:true,audio:true}).then((stream)=>{
//     setstream(stream)
//     myVideo.current.srcObject=stream;
//   })

//   socket.on('me',(id)=>{
//     setme(id)
//   })

//   socket.on("callUser",(data)=>{
//     setrecievingCall(true)
//     setcaller(data.form)
//     setname(data.name)
//     setcallerSignal(data.signal)
//   })

// },[])






// const callUser = (id) => {
// 		const peer = new SinglePeer({
// 			initiator: true,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {
// 			socket.emit("callUser", {
// 				userToCall: id,
// 				signalData: data,
// 				from: me,
// 				name: name
// 			})
// 		})
// 		peer.on("stream", (stream) => {
			
// 				userVideo.current.srcObject = stream
			
// 		})
// 		socket.on("callAccepted", (signal) => {
// 			setcallAccepted(true)
// 			peer.signal(signal)
// 		})

// 		connectionRef.current = peer
// 	}






//   const answerCall =() =>  {
// 		setcallAccepted(true)
// 		const peer = new SinglePeer({
// 			initiator: false,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {
// 			socket.emit("answerCall", { signal: data, to: caller })
// 		})
// 		peer.on("stream", (stream) => {
// 			userVideo.current.srcObject = stream
// 		})

// 		peer.signal(callerSignal)
// 		connectionRef.current = peer
// 	}




















  
//   return (
//     <div className="jj bg-black">
//       <div>
// vid
//       </div>
      
//     </div>
//   )
// }


//------------------------------livekit components----------------------------------

//  function LiveKit() {
//   return (
//     <LiveKitRoom
//       video={true}
//       audio={true}
//       token={token}
//       connectOptions={{ autoSubscribe: false }}
      
//       // serverUrl={process}
//       serverUrl = 'wss://chatapp-ii0tj31f.livekit.cloud'

      
//       // Use the default LiveKit theme for nice styles.
//       data-lk-theme="default"
//       style={{ height: '100vh' }}
//     >
//       {/* Your custom component with basic video conferencing functionality. */}
//       <MyVideoConference />
//       {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
//       <RoomAudioRenderer />
//       {/* Controls for the user to start/stop audio, video, and screen 
//       share tracks and to leave the room. */}
//       <ControlBar />
//     </LiveKitRoom>
//   );
// }

// function MyVideoConference() {
//   // `useTracks` returns all camera and screen share tracks. If a user
//   // joins without a published camera track, a placeholder track is returned.
//   const tracks = useTracks(
//     [
//       { source: Track.Source.Camera, withPlaceholder: true },
//       { source: Track.Source.ScreenShare, withPlaceholder: false },
//     ],
//     { onlySubscribed: false },
//   );
//   return (
//     <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
//       {/* The GridLayout accepts zero or one child. The child is used
//       as a template to render all passed in tracks. */}
//       <ParticipantTile />
//     </GridLayout>
//   );
// }

//---------------------------------prototype-------------------------------------------


export const Prototype = () => {
  return (
    <div className="prot bg-gray-400">
      <Uploadbtn/>
    </div>
  )
}




//--------------------------------upload button---------------------------------------




export const Uploadbtn = () => {
  const [trig,settrig] =useState(false);
  return (
    <>
    <div className="ppp  flex justify-center flex-col">
      <button className="buttonupload " onClick={()=>{console.log("pressed");settrig(true)}}>+</button>
    </div>
      <Popup settrig={settrig} trig={trig}/>
    </>
  )
}


//----------------------------------popup----------------------------------------------



export const Popup = (props) => {
  const biscuit = new Cookies();
  const {trig,settrig}= props;
  const imgfref = ref(storage,'images/');
  const [img ,setimg] =useState(null);

  const [imgname ,setimgname] =useState("");
  const [imgurl,setimgurl] = useState("");
  // const 





  const Uploadimg= async ()=>{
    if(img==null){return;}
    const a = img.name + v4();
    setimgname(`${a}`)
    const imgdburlref = ref(storage,`images/${a}`);

    console.log("is this item")
    console.log(imgdburlref)
    const imgref = ref(storage,`images/${a}`)

    await uploadBytes(imgref,img).then(()=>{
      alert("Your File is Uploaded")
    })
    
    biscuit.set("img-name",a);
    
    const imgurll = await getDownloadURL(imgdburlref)
    const viddata = await getMetadata(imgdburlref)
    console.log("metaddata")
    console.log(viddata.contentType)
    // console.log(imgurll)

    await addDoc(msgdbref,{
      text: "",
      createdAt: serverTimestamp(),
      user: biscuit.get("auth-token")==="browsing_anonymously"?biscuit.get("user-id"):auth.currentUser.uid,
      photo: (!(biscuit.get("auth-token")==="browsing_anonymously"))?auth.currentUser.photoURL:"https://picsum.photos/200",
      room : biscuit.get("chat-room"),
      content_url:imgurll,
      messaged_photo_name:a,
      msgtype:viddata.contentType,
      user_name:biscuit.get("username")

    });

    
    
  }
  
  // useEffect(()=>{
  //   // console.log("imgref")


  //   listAll(imgfref).then((Response)=>{
  //     // console.log(imgfref);
  //     Response.items.forEach((item)=>{
  //       console.log("this is item:")
  //       console.log(item)
  //       getDownloadURL(item).then((URL)=>{
  //         // console.log("url is"+URL)
  //       })
  //     })
  //   })
  // },[])


  return trig?(
    <>
    <div className="popuppp flex flex-row justify-center" >
      <div className="centerrr flex flex-col justify-center ">

    <div className="popupp flex flex-row justify-between">

    <div className="div w-1">

    </div>

      <div>
      <p className="text text-3xl">Select File</p>
      </div>
        <button className="closebtn" onClick={()=>{settrig(false)}}>close</button>


    </div>
    <div className="filesu bg-black">
      <div className="d flex flex-row justify-center">

      <div className="c flex flex-col justify-center">
      <div className="h h-20 w-5"></div>
      <input type="file" onChange={(e)=>{setimg(e.target.files[0]) }} className="text-xl"/>
      <div className="h h-8 w-5"></div>
      <button onClick={Uploadimg} className="button">Upload Anything</button>
      </div>
      </div>
    </div>

      </div>
    </div>
    </>
  ):"";
}


//---------------------------------testchatroom-------------------------------------------





export const Testchatrom = (props) => {

  const {room,isauth} =props;
  const biscuit = new Cookies();
  const [newmsg,setnewmsg] = useState("");
  const msgref = useRef();
  const [messages,setmessages] = useState([]);
  const dum=useRef();
  // const goto = useNavigate();
  const goto = useNavigate();





  useEffect(
    ()=>{
      console.log("from left universe");
      console.log(biscuit.get("room"));

      //fixing routing
      /*
      biscuit.get("room")==null?goto("/"):goto("/chat_layout");
      */


      // console.log("from testroom: isauth="+isauth);
      // isauth?goto("/testchatroom"):goto("/");

      const querymsg = query(msgdbref,
        where("room","==",biscuit.get("chat-room")),
        orderBy("createdAt")
        );


    onSnapshot(querymsg,
      //---snapshot has data of snapshot
        (snapshot)=>{
          // console.log("it isss working")
          let messages= []
          // console.log("its working")
          snapshot.forEach((doc)=>{
            messages.push({...doc.data(),id:doc.id})
          })
          setmessages(messages);
          // console.log(messages);
          // console.log(messages[18].user===biscuit.get("user-id"));
        })

        // unsubscribe()
        // return unsubscribe();
      }
      ,[]);
      


      const formsubmit =async (e)=>{
    e.preventDefault();
    console.log("current user is")
    console.log(auth.currentUser);
  
    if (newmsg===""){return;}
    biscuit.get("username")?"":biscuit.set("username",auth.currentUser.displayName);
    await addDoc(msgdbref,
      {
        text: newmsg,
        createdAt: serverTimestamp(),
        user: biscuit.get("auth-token")==="browsing_anonymously"?biscuit.get("user-id"):auth.currentUser.uid,
        photo: (!(biscuit.get("auth-token")==="browsing_anonymously"))?auth.currentUser.photoURL:"https://picsum.photos/200",
        room : biscuit.get("chat-room"),
        content_url:"",
        messaged_photo_name:"",
        msgtype:"text",
        user_name:biscuit.get("username")

        
      });
      dum.current.scrollIntoView({behaviour:"smooth"});

      

      msgref.current.value = "";
      setnewmsg("");
      // console.log("yes "+newmsg);
      
    }


    
 
      return (
        <div className="testroom text-8xl">

      <div className="tt2 ">

<div className="borderdiv"> 
      <div className="room-banner flex flex-row justify-center sticky top-0">
        <div></div>
      <p className="roomname rounded-xl p-5 text-xl">
      {biscuit.get("chat-room")}
      </p>
      <div className="out text-xl flex  flex-row justify-center">
        <div className="center  inline-block py-10">
        {/* <Signout/> */}
        </div>
        </div>
      </div>

    <div className="spacex"></div>

      <div className="allmessages">



        <div className="texts flex flex-col">
          {messages.map((messages)=><>
          
          <div className={`message1 text-xl flex ${messages.user===biscuit.get("user-id")?" flex-row-reverse":" flex-row"} `}>

            <img src={messages.photo} className="photooo " />
            <div className="d w-2"></div>
            

            <div className="msg-container-outline">
              <div className="img-deco">

            {
            messages.msgtype==="image/png"?
            <img src={messages.content_url} className={`imageee ${messages.user===biscuit.get("user-id")?"m-sent":"m-recieved"}`} alt="" />
            :messages.msgtype==="video/mp4"?
            <video src={messages.content_url} className={`videooo ${messages.user===biscuit.get("user-id")?"m-sent":"m-recieved"}`} controls></video>
            :messages.msgtype==="text"?
            <div className={`m-deco rounded-md  `}> <p className={`m-deco-txt flex flex-col justify-center py-0 px-2 rounded ${messages.user===biscuit.get("user-id")?"m-sent":"m-recieved"}`}>    <p className="user-name">{  messages.user===biscuit.get("user-id")?"":`~${messages.user_name}`  }</p>   <p className="mesg-padding">{messages.text}</p></p></div>
            :
            <a  href={messages.content_url} target="_blank" className={`message22 flex ${messages.user===biscuit.get("user-id")?"m-sent":"m-recieved"}`} > <p className={`m-deco-txt flex flex-col justify-center pb-1 px-2 rounded ${messages.user===biscuit.get("user-id")?"m-sent":"m-recieved"}`}><u> Link</u></p></a>
          }
               </div>
               </div>

          
          
          </div>
              <div className="k1 h-2"></div>
              
              
              </>
              )}
            </div>
      
      
      
      </div>
      <div className="dummyy" ref={dum}></div>

</div>
      <form  className="msg  flex-row sticky bottom-0" onSubmit={formsubmit}>
        <div className="dd sticky bottom-0   flex flex-col justify-center">

        <div className="yesss ">
          <div className="nooo justify-between flex flex-row">

        

        <Uploadbtn className="text-xl"/>
        <input type="text" className="message-input text-xs px-5" ref={msgref} placeholder="Type a message"/>
        <div></div>
        <button className="msg-send-btn " onClick={(e)=>{setnewmsg(msgref.current.value)}}>send </button>
        <div></div>
        </div>
        </div>
        </div>

      </form>
        {/* <Prototype/> */}

      </div>

    </div>


  )
}





//-----------------------------------auth---------------------------------------------------

export const Authen = ({isauth,setisauth}) => {

  const goto = useNavigate();
  // const {setisauth,isauth} = props;
  const biscuit = new Cookies()
  
  //fixing routing
/*

  try{

  useEffect(()=>{
    console.log(isauth);
    // console.log(biscuit.get("auth-token"))

    (biscuit.get("auth-token")===undefined)?goto("/auth"):goto("/selectchat");
    
  },[]);


  }catch(err){
    console.log("this is error:");
    console.error(err);
    console.log("this was error^");

  }


*/

  return (
    <div className="authentication"> 
      <SigninWithGoogle setisauth={setisauth}/>
    <Signout setisauth={setisauth} />
    <Anonymous setisauth={setisauth}/>
    
    </div>
  )
}

//-----------------------------sign in-------------------------------------------------------

export const SigninWithGoogle = ({isauth,setisauth}) => {
  // const {setisauth}=props;
  const goto = useNavigate();
  const biscuit= new Cookies();

  const googlesignin = async ()=>{
    
    
    
    try{
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
      biscuit.set("auth-token",result.user.refreshToken);
      biscuit.set("user-id",result.user.uid);
      setisauth(true);
      goto("/selectchat");
    }catch(err){
      console.error(err);
    }
    
    
  }



  return (
    <div className='auth '>
      <button onClick={googlesignin} className="apple rounded-xl ">sign in</button>
    </div>
  )
}

//-----------------------------sign out-------------------------------------------------------

const Signout = ({isauth,setisauth})=>{
  const bis = new Cookies();
  const goto = useNavigate();
  return (
  
  // auth.currentUser &&
    <>      <button onClick={()=>{
      auth.signOut();    
      if(!bis.get("auth-token")==="browsing_anonymously"){
      }
        bis.remove("auth-token"); 
       bis.remove("user-id"); 
       bis.remove("username"); 
        goto("/"); 
        
        }}  className="sout apple bg-black text-white "> sign out</button>
    </>
  );
}


//-----------------------------sign in anonymously-------------------------------------------------------
const Anonymous=({setisauth})=>{
  const goto = useNavigate();

  const biscuit = new Cookies();
  return(
    <div>
      <button className="button" onClick={()=>{biscuit.set("auth-token","browsing_anonymously");      goto("/selectchat");       setisauth(true);

}}>anonymously</button>
    </div>
  )
}



//----------------------------Chatroom------------------------------------------------------

export const Chatroom = ({setisauth,room,isauth}) => {


  // const goto = useNavigate();


  // console.log("from chatroom");
  // isauth?goto("/chatroom"):goto("/");




  const messagesref = firestore.collection("messages");
  const query = messagesref.orderBy('createdAt').limit(25);

  //query sent. and stored in array of messages
  const [messages] = useCollectionData(query,{idField:'id'});

  const [FormValue,setFormValue] = useState("");

  const dum = useRef();

  const SendMessage = async (e)=>{

    //stops the form from refresfhing =------------------------------------so we can take the value
    e.preventDefault();

    const {uid,photoURL,room}= auth.currentUser; 

    if(FormValue===""){

    }else{

      
      //-------------------------------------------------------------------send messages to firebase to a particular datastack
      await messagesref.add({
        text:FormValue,
        createdAt:firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL        
      });
      
    }
    //------------------------------------------------------------------imp === setformvalue ="" as we already used it
    setFormValue("");

    dum.current.scrollIntoView({behaviour:"smooth"});

  }
  return  (
    <div className="chatroom flex flex-col">
    
    <div className="ssout"></div>
    <div className="out"><Signout setisauth={setisauth}/></div>
    <div className="ssout h-5"></div>
    
    <div className="messages flex flex-col space-y-5">


      {messages && messages.map(msg=><Chatmessage key = {msg.id} message = {msg}/>)}

      <div className="dummy" ref={dum}></div>
    </div>
    <div className="space h-10"></div>
<form onSubmit={SendMessage} className="form flex flex-row">
  {/* //--------------------------------------------------------------------------------------------this is importaant-------how to use event e */}
  <div className="iii text-white">
<input value={FormValue} onChange={(e)=>setFormValue(e.target.value)} className="inputv" />
  </div>
<div className="space w-5"></div>
<button type="submit" className="button sendbtn text-2xl">send</button>

</form>
<div className="space h-10"></div>

    </div>
    
  )
}



//-----------------------------chatmessaage----------------------------------------------------
 

export const Chatmessage = (props) => {
//-----------------------------------------------------------everything sent is copied to props
//----------------------------------------------------------- then we can extract from it 

const {text,uid,photoURL} = props.message;

const messageclass = uid===auth.currentUser.uid ? 'sent' :'recieved';


  return (

<div className={`message-${messageclass} rounded-xl  flex `}>
  <div className={`lr-${messageclass} flex `}>

<img src={photoURL} style={{height:"40px"}} className="image rounded-xl "/>
<div className="space w-5"></div>
<p className={`messsagecnt ${messageclass} text-2xl rounded-xl p-2 text-white`}>{text}</p>
  </div>
</div>

    );
}


//----------------------------enter chat----------------------------------------------------------

const Selectchat= ({isauth,setisauth,setroom,room,setusername,username})=>{

  const biscuit = new Cookies();
  const goto = useNavigate();
  const usernameref = useRef(null);
  const inputref = useRef(null);


//fixing routing
  /*
  useEffect(()=>{
    console.log("from selectchat");
    // console.log(biscuit.get("auth-token"))

    (biscuit.get("auth-token")===undefined)?goto("/"):goto("/selectchat");
    (biscuit.get("chat-room")===undefined)?goto("/selectchat"):goto("/chat_layout");


    
  },[]);
*/

  return(
    <div className="selectchat">
      <div className="things">

      <input type="text" 
      className="input text-black"
      ref={inputref}
       />

       <input type="text" className="imput text-black" ref={usernameref} enterKeyHint="apple"/>

      <button className="button text-white" onClick={()=>{
        if ( usernameref.current.value==="" ){}else{

          if(inputref.current.value==="" ){}else{
          setroom(inputref.current.value);
          }
          biscuit.set("username",usernameref.current.value)
          if(biscuit.get("auth-token")==="browsing_anonymously"){
            biscuit.set("user-id",usernameref.current.value);
          }
          setusername(usernameref.current.value);
          console.log("username:"+biscuit.get("username"));
          console.log("all set , entering room...") 
          console.log(room)
          if(inputref.current.value==="" ){}else{
            biscuit.set("chat-room",inputref.current.value)
            }
          goto("/chat_layout")
        }
        }}
        >enter chat</button>
        <div className="hhh text-white">hii</div>
        <Signout/>
      </div>
    </div>
  );
}

