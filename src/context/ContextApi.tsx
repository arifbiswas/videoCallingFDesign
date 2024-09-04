import React, { createContext } from 'react';
import { MediaStream, RTCIceCandidate, registerGlobals } from 'react-native-webrtc';

import { getSocket } from '../utils/socket';
import { createPeerConnection } from '../utils/webRtc';

registerGlobals();

export const useContextApi = ()=>{
  return React.useContext(ContextProvider)
}

export interface IUser {
  id: string;
  name: string;
  created_at : Date;
}

interface ICreateContextProps {
  me : IUser;
  setMe : Function
  users: Array<IUser>
  setUsers: Function
  localStream: MediaStream
  setLocalStream: Function
  remoteStream: MediaStream
  setRemoteStream: Function
  iceCandidate: RTCIceCandidate
  setIceCandidate: Function,
  receiverId : string, 
  setReceiverId : Function
}

export const ContextProvider = createContext<ICreateContextProps>(
{  users: null ,
  me: null,  // set user details here
  setMe: () => {},  // set user details here
  setUsers: () => {},
  localStream: null,
  setLocalStream: () => {},
  remoteStream: null,
  setRemoteStream: () => {},
  iceCandidate: null,
  setIceCandidate: () => {},
  receiverId : null,
  setReceiverId : () => {},
  
 }
)


const ContextApi = ({children} : {children  : React.ReactNode}) => {
  const socket = getSocket()
  const Peer = createPeerConnection()
    const [me, setMe] = React.useState({})
    const [receiverId, setReceiverId] = React.useState("")
    const [users, setUsers] = React.useState([])
    const [localStream, setLocalStream] = React.useState(null)
    const [remoteStream, setRemoteStream] = React.useState(null)
    const [iceCandidate, setIceCandidate] = React.useState(null)
    
    const values={
      me,
      setMe,
      users,
      setUsers,
      localStream,
      setLocalStream,
      remoteStream,
      setRemoteStream,
      iceCandidate, setIceCandidate,
      receiverId, setReceiverId
    }

    React.useEffect(()=>{
      Peer.addEventListener('track', event => {
        console.log("Remote stream added:", event.streams[0]);
        setRemoteStream(event.streams[0]);
      });
      Peer.addEventListener('addstream', event => {
        console.log("Remote stream added:", event.stream);
        setRemoteStream(event.stream);
      });
    },[])

  return (
    <ContextProvider.Provider value={values}>
     {children}
    </ContextProvider.Provider>
  )
}

export default ContextApi;
