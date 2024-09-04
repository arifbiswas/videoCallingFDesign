import { Button, Colors, TextField } from 'react-native-ui-lib'
import { TexT, VieW } from '../utils/Ui'

import React from 'react'
import { useContextApi } from '../context/ContextApi'
import { NavigProps } from '../types/NavigationPros'
import { getSocket } from '../utils/socket'

const LoginScreen = ({navigation} : NavigProps<null>) => {
   const {setMe,setUsers} = useContextApi()
    const socket = getSocket()
    const [ valid , setValid] = React.useState(false)
    const [name, onChangeText] = React.useState('')
    // console.log(email);
    const handleAddNewUser =  React.useCallback(()=>{
      // add new user to the server
      if(valid){
        console.log('Add new user', name)
        // onChangeText('')
      if(socket){
        socket.emit("newUser", name)
        socket.on("me",(user)=>{
          setMe(user)
        })
        socket.on("user",(users)=>{
          setUsers(users)
        })

        navigation?.navigate("Home")
      }
        }
    },[name,valid])

  

  return (
    <VieW height="100%" width={"100%"} className='justify-center bg-slate-100 dark:bg-slate-700 items-center'>
      <TexT green30 text40H className="">Welcome to CallMe App</TexT>
      <VieW style={{
         width : "70%",
   
      }} >
      <TextField
  placeholder={'Name'}
  floatingPlaceholder
  containerStyle={{
    marginBottom : 10
  }}
   blurOnSubmit
  onChangeText={onChangeText}
  value={name}
  onChangeValidity={(value)=>{
    // console.log(value);
    setValid(value)
  }}
  enableErrors
  validateOnChange
  validate={['required']}
  validationMessage={['Name is required']}
  showCharCounter
  validateOnBlur
  showClearButton
/>

      <Button onPress={handleAddNewUser} label={'Submit'} size={Button.sizes.large} backgroundColor={Colors.green30}/>
      </VieW>
    </VieW>
  )
}

export default LoginScreen

