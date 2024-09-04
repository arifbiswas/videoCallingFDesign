import { RTCIceCandidate } from "react-native-webrtc";
import { useContextApi } from "../context/ContextApi";

export const UseSetIceCandidate = (iceCandidate : RTCIceCandidate)=>{
  // Implement your logic to set the ice candidate in your WebRTC peer connection
   const {setIceCandidate} = useContextApi()
   setIceCandidate(iceCandidate)
}