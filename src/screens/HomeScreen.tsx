import React, { useEffect } from 'react';
import { Text, View } from 'react-native'; // Correct import for React Native components
import { disconnectSocket, getSocket, initiateSocket } from '../utils/socket';

import { useColorScheme } from 'nativewind';
import { FlatList } from 'react-native';
import UserCard from '../components/cards/UserCard';
import { useContextApi } from '../context/ContextApi';
import { NavigProps } from '../types/NavigationPros';

require('react-native-ui-lib/config').setConfig({ appScheme: 'light' });

const HomeScreen = ({ navigation }: NavigProps<null>) => {
  useEffect(() => {
    initiateSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  return (
    <View  style={{ backgroundColor: 'white' }}>
      <DefaultScreen navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

export const DefaultScreen = ({ navigation }: NavigProps<null>) => {
  const socket = getSocket();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const { users, me } = useContextApi();

  useEffect(() => {
    socket?.on("sendOffer", (data) => {
      // console.log("Received offer data:", data);
      navigation?.navigate("IncomingCall",data);
    });

    return () => {
      socket?.off("sendOffer");
    };
  }, [colorScheme, socket, navigation]);

  return (
    <View>
      <View
        style={{ backgroundColor: '#d1e7dd', paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}
      >
        {/* Header part */}
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4caf50' }}>
          Welcome {me?.name}
        </Text>
        <View style={{ backgroundColor: '#c8e6c9', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 50 }}>
          <Text
            style={{ color: '#fff' }}
            onPress={() => toggleColorScheme()}
          >
            {colorScheme.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Body part */}
      <FlatList
        data={users.filter(u => u.id !== me.id)}
        renderItem={({ item }) => (
          <UserCard navigation={navigation} item={item} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
