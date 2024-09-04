import { ButtoN, IcoN, TexT, VieW } from "../../utils/Ui";

import React from "react";
import { IUser } from "../../context/ContextApi";
import { NavigProps } from "../../types/NavigationPros";

interface UserCardProps extends NavigProps<null>  {
    item: IUser;  // Assuming IUser is an interface representing a user object
}

const UserCard = ({navigation,item} : UserCardProps)=>{
    //  console.log(item);
   return(
    <VieW className="flex-row  justify-between items-center p-3  m-3 rounded-md">
    <VieW className="flex-row gap-2 items-center">
      <VieW className="h-14 w-14 justify-center items-center bg-slate-500 rounded-full">
        <TexT blue60 text50>
          {item?.name.slice(0,1).toLocaleUpperCase()}
        </TexT>
      </VieW>
      <VieW className="gap-1">
        <TexT className="text-xl text-gray-600 dark:text-gray-300">
          {item?.name}
        </TexT>
        <TexT  className="text-xs text-gray-600 dark:text-gray-300">
          {new Date(item?.created_at).toDateString()}
        </TexT>
      </VieW>
    </VieW>
    <ButtoN
      onPress={() => {
        navigation?.navigate('Calling', {data : item});
      }}
      className="text-base  p-2 rounded-lg  flex-row "
      bg-green30>
      <IcoN
      marginH-5
      marginV-2
        style={{
          width: 20,
          aspectRatio: 1,
          tintColor: 'white',
     
        }}
        assetName="video" assetGroup="icons" 
      />
      <TexT white text80BL>
        Call 
      </TexT>
    </ButtoN>
  </VieW>
   )
  }
  
export default React.memo(UserCard)