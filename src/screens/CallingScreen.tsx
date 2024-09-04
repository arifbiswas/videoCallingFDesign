import React, { useCallback } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { IUser, useContextApi } from '../context/ContextApi'
import { ButtoN, IcoN, TexT, VieW } from '../utils/Ui'
import { DestroyDevices, GetDevices, SendOffer } from '../utils/webRtc'

import { Colors } from 'react-native-ui-lib'
import { RTCView } from 'react-native-webrtc'
import { NavigProps } from '../types/NavigationPros'
import { getSocket } from '../utils/socket'
import { Hight } from '../utils/Ui.config'

const CallingScreen = ({navigation, route} : NavigProps<IUser>) => {
   const { setLocalStream, localStream, me } = useContextApi();
   const socket = getSocket();

   const handleCancel = useCallback(()=>{
      socket?.emit('cancel', route?.params?.data?.id);
    },[socket]);

    React.useEffect(()=>{
      GetDevices().then(devices=>{
         setLocalStream(devices);
         SendOffer(devices).then(offers=>{
            socket?.emit("sendOffer", { offers, receiverId: route?.params?.data?.id, senderId: me.id });
         });
      });

      socket?.on("cancel",()=>{
         Alert.alert("Cancelled the call");
         navigation?.navigate("Home");
      });
      
      socket?.on("sendAnswer", (data)=>{
         console.log(data);
         navigation?.replace("Call", {data});
      });
      
      return()=>{
         // DestroyDevices(localStream, Peer)
      };
    },[route?.params?.data, socket]);

  return (
   <VieW className='h-[100%]'>
   { localStream?._id && (
      <RTCView
        objectFit="cover"
        style={{ width: "100%", height: Hight * .7 }}
        streamURL={localStream.toURL()} // Use toURL() to pass the stream URL
      />
    )}

    <VieW className='h-[100%] bg-slate-200 dark:bg-slate-700 z-1'>
        <TexT center className="text-lg py-5 font-semibold">Calling...</TexT>
    </VieW>
    
    <VieW className='h-[10%] dark:bg-slate-700 rounded-t-xl flex-row px-3 w-[100%] justify-around items-center absolute bottom-[5%]'>
    <ButtoN backgroundColor={Colors.red10} size="xSmall" onPress={()=>{
      DestroyDevices(localStream).then(()=>{
         navigation?.goBack();
         handleCancel();
      });
    }}>
         <IcoN style={{ transform : [{rotate : "135deg"}] }} marginV-16 className='w-7 aspect-square' tintColor='white' assetName="call" assetGroup="icons" />
    </ButtoN>
    </VieW>
   </VieW>
  );
}

export default CallingScreen;

const styles = StyleSheet.create({});
