import React, { useCallback } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { ButtoN, IcoN, TexT, VieW } from '../utils/Ui'
import { GetDevices, SendAnswer } from '../utils/webRtc'

import { Colors } from 'react-native-ui-lib'
import { RTCSessionDescription } from 'react-native-webrtc'
import { useContextApi } from '../context/ContextApi'
import { NavigProps } from '../types/NavigationPros'
import { getSocket } from '../utils/socket'

const IncomingCall = ({navigation, route} : NavigProps<{offers : RTCSessionDescription, receiverId : string, senderId : string}>) => {
   const { setLocalStream, localStream, me } = useContextApi();
   const socket = getSocket();
   const handleCancel = useCallback(()=>{
      socket?.emit('cancel', route?.params?.senderId);
      navigation?.goBack();
    },[socket]);

    const handelAccept = useCallback(() => {
        GetDevices().then(devices => {
            setLocalStream(devices);
            SendAnswer(route?.params?.offers).then((answer) => {
                if (answer && answer.sdp && answer.type) {
                    // console.log("get a anser" ,answer);
                    socket?.emit("sendAnswer", {
                        answer,
                        receiverId: route?.params?.receiverId,
                        senderId: route?.params?.senderId
                    });
                
                } else {
                    console.log("Invalid offer SDP", answer);
                }
            }).finally(()=>{
                navigation?.replace("Call");
            })
        });
    }, [socket]);
    

   React.useEffect(()=>{
      socket?.on("cancel",()=>{
         Alert.alert("Cancelled the call");
         navigation?.navigate("Home");
      });
    },[route?.params?.data, socket]);

  return (
   <VieW className='h-[100%]'>
    <VieW className='h-[100%] bg-slate-200 dark:bg-slate-700 z-1'>
        <TexT center className="text-lg py-5 font-semibold">Incoming Call...</TexT>
    </VieW>
    
    <VieW className='h-[10%] dark:bg-slate-700 rounded-t-xl flex-row px-3 w-[100%] justify-around items-center absolute bottom-[10%]'>
    <ButtoN backgroundColor={Colors.red10} size="xSmall" onPress={handleCancel}>
         <IcoN style={{ transform : [{rotate : "135deg"}] }} marginV-16 className='w-7 aspect-square' tintColor='white' assetName="call" assetGroup="icons" />
    </ButtoN>
    <ButtoN backgroundColor={Colors.green10} size="xSmall" onPress={handelAccept}>
         <IcoN style={{ transform : [{rotate : "250deg"}] }} marginV-16 className='w-7 aspect-square' tintColor='white' assetName="call" assetGroup="icons" />
    </ButtoN>
    </VieW>
   </VieW>
  );
}

export default IncomingCall;

const styles = StyleSheet.create({});
