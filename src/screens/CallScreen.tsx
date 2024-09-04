import React, { useEffect, useState } from 'react';
import { MediaStream, RTCSessionDescription, RTCView } from 'react-native-webrtc';
import { ButtoN, IcoN, VieW } from '../utils/Ui';
import { ReceiveAnswer, createPeerConnection } from '../utils/webRtc';

import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { useContextApi } from '../context/ContextApi';
import { NavigProps } from '../types/NavigationPros';
import { getSocket } from '../utils/socket';

const CallScreen = ({ navigation, route }: NavigProps<any>) => {
  const socket = getSocket();
  const Peer = createPeerConnection();
   console.log(route?.params?.data?.answer);
  

  const { localStream, setRemoteStream } = useContextApi();
  const [remoteStream, setRemoteStreamState] = useState<MediaStream | null>(null);
  const [videoOf, setVideoOf] = useState(false);
  const [micOf, setMicOf] = useState(false);

  useEffect(() => {
    if(route?.params?.data?.answer){
          ReceiveAnswer(route?.params?.data?.answer);
    }
    // Handle receiving answer SDP
  //   if (CallInfo?.answer) {
  // } else {
  //     console.log("Received an invalid or undefined answer");
  // }

    // Listen for the `track` event to get remote stream
    // Peer.addEventListener('track', (event) => {
    //   if (event.streams && event.streams[0]) {
    //     setRemoteStream(event.streams[0]);
    //     setRemoteStreamState(event.streams[0]);
    //   }
    // });

    // Handle ICE candidates
    // socket?.on("ice_candidate", ({ candidate }) => {
    //   Peer.addIceCandidate(candidate);
    // });

    // Peer.addEventListener('icecandidate', event => {
    //   if (event.candidate) {
    //     socket?.emit("ice_candidate", {
    //       candidate: event.candidate,
    //       receiverId: CallInfo?.receiverId,
    //       senderId: CallInfo?.senderId
    //     });
    //   }
    // });


    if(route?.params?.answer){
      if (Peer.signalingState === 'have-remote-offer') {
        Peer.setRemoteDescription(new RTCSessionDescription(route?.params?.answer))
        .then(() => {
            console.log("Remote description set successfully");
        })
        .catch(error => {
            console.log("Error setting remote description:", error);
        });
    } else {
        console.log("PeerConnection is in the wrong state:", Peer.signalingState);
    }
    }

  }, [route?.params?.data, socket, Peer]);

  return (
    <VieW className='h-[100%]'>
      <VieW className='h-[100%] bg-slate-200 dark:bg-slate-700 z-1'>
        {remoteStream && (
          <RTCView
            objectFit="cover"
            style={{ height: '100%', width: '100%', borderRadius: 10 }}
            streamURL={remoteStream?.toURL()}
          />
        )}
      </VieW>
      <VieW br30 className='absolute h-[20%] rounded-md w-[25%] top-4 right-4 shadow-xl bg-slate-500 dark:bg-slate-400'>
        <RTCView
          objectFit="cover"
          style={{ height: '100%', width: '100%', borderRadius: 10 }}
          streamURL={localStream?.toURL()}
        />
      </VieW>
      <VieW className='h-[85px] bg-white dark:bg-slate-700 rounded-t-xl flex-row px-3 w-[100%] justify-around items-center absolute bottom-0'>
        <ButtoN backgroundColor={Colors.green20} size="xSmall" className="shadow-md" onPress={() => {
          setMicOf(!micOf);
        }}>
          {micOf ? (
            <IcoN marginV-16 className='w-7 aspect-square' tintColor='white' assetName="micOf" assetGroup="icons" />
          ) : (
            <IcoN marginV-16 className='w-7 aspect-square' tintColor='white' assetName="micOn" assetGroup="icons" />
          )}
        </ButtoN>
        <ButtoN backgroundColor={Colors.green20} size="xSmall" onPress={() => {
          setVideoOf(!videoOf);
        }}>
          {videoOf ? (
            <IcoN marginV-16 className='w-7 aspect-square' tintColor='white' assetName="videoOf" assetGroup="icons" />
          ) : (
            <IcoN marginV-16 className='w-7 aspect-square' tintColor='white' assetName="videoOn" assetGroup="icons" />
          )}
        </ButtoN>
        <ButtoN backgroundColor={Colors.red10} size="xSmall" onPress={() => {
          // Add functionality to end call here
        }}>
          <IcoN marginV-16 className='w-7 aspect-square' tintColor='white' assetName="call" assetGroup="icons" />
        </ButtoN>
      </VieW>
    </VieW>
  );
}

export default CallScreen;

const styles = StyleSheet.create({});
