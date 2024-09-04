import React from 'react'
import { StyleSheet } from 'react-native'
import ContextApi from './src/context/ContextApi'
import AppRoutes from './src/routes/navigation'
import { initiateSocket } from './src/utils/socket'

const App = () => {

  React.useEffect(()=>{
    initiateSocket()
  },[])

  return (
 <ContextApi>
  <AppRoutes />
</ContextApi>
  )
}

export default App

const styles = StyleSheet.create({})