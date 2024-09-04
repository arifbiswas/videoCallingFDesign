import {
  MediaStream,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
  mediaDevices
} from 'react-native-webrtc';

import { RTCSessionDescriptionInit } from 'react-native-webrtc/lib/typescript/RTCSessionDescription';

// Define the type for the peer connection constraints
const peerConstraints = {
  iceServers: [
    {
      urls: 'turn:192.168.10.202:9092',  // Your TURN server
      username: '123456',  // TURN server username
      credential: '123456'  // TURN server password
    }
  ]
};

// Initialize Peer as null initially
let Peer: RTCPeerConnection | null = null;

// Define constraints for creating offers and answers
const sessionConstraints = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true,
  voiceActivityDetection: true
};

// Define media constraints
const mediaConstraints = {
  audio: true,
  video: {
    frameRate: 30,
    facingMode: 'user'
  }
};

// Function to create a new peer connection
export const createPeerConnection = (): RTCPeerConnection => {
  Peer = new RTCPeerConnection(peerConstraints);



  return Peer;
};

// Initialize the peer connection
createPeerConnection();

// Get devices and add them to the peer connection
export const GetDevices = async (): Promise<MediaStream | undefined> => {
  try {
    const mediaStream = await mediaDevices.getUserMedia(mediaConstraints);

    mediaStream.getTracks().forEach(track => {
      if (Peer) {
        const existingSenders = Peer.getSenders();
        const trackAlreadyAdded = existingSenders.some(sender => sender.track?.id === track.id);

        if (trackAlreadyAdded) {
          console.log(`Track with ID ${track.id} already exists in a sender.`);
        } else {
          Peer.addTrack(track, mediaStream);
          console.log(`Track with ID ${track.id} added to the peer connection.`);
        }
      }
    });

    return mediaStream;
  } catch (error) {
    console.error("Error getting devices or media stream:", error);
  }
};

// Destroy devices
export const DestroyDevices = async (device: MediaStream) => {
  if (device) {
    device.getTracks().forEach(track => track.stop());
  }
};

// Start call by sending the offer
export const SendOffer = async (devices: MediaStream): Promise<RTCSessionDescriptionInit | undefined> => {
  if (devices) {
    devices.getTracks().forEach(track => Peer?.addTrack(track, devices));
  }

  try {
    const offer = await Peer?.createOffer(sessionConstraints);
    if (offer) {
      await Peer?.setLocalDescription(offer);
      return offer;
    }
  } catch (error) {
    console.log("Error creating and sending offer:", error);
  }
};

// Receive call and send the answer
export const SendAnswer = async (offer: RTCSessionDescription) => {
  if (!offer || !offer.sdp || !offer.type) {
      console.error('Invalid offer SDP:', offer);
      return;
  }

  try {
      await Peer?.setRemoteDescription(offer);
      const answer = await Peer?.createAnswer();
      await Peer?.setLocalDescription(answer);
      return answer;
  } catch (error) {
      console.error('Error during offer/answer exchange:', error);
      return null;
  }
};

// Receive call answer
export const ReceiveAnswer = async (answer: RTCSessionDescription | undefined) => {
  // console.log("get answer", answer);
  if (!answer || !answer.sdp || !answer.type) {
      console.error('Received an invalid SDP:', answer);
      return;
  }

  // console.log(answer);
  const remoteDesc = new RTCSessionDescription(answer);
  try {
      await Peer?.setRemoteDescription(remoteDesc);
  } catch (error) {
      console.error('Error setting remote description:', error);
  }
};

// Send ICE candidate
export const SendIceCandidate = async (iceCandidate: RTCIceCandidate) => {
  try {
    if (Peer?.remoteDescription) {
      await Peer.addIceCandidate(iceCandidate);
    } else {
      console.log("Remote description is not set. Unable to add ICE candidate.");
    }
  } catch (error) {
    console.log("Error adding ICE candidate:", error);
  }
};
