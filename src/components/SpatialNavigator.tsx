import React from 'react';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';

// Import all screens
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import MessagesScreen from '../screens/MessagesScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HistoryScreen from '../screens/HistoryScreen';

const SpatialNavigator = () => {
  return (
    <PagerView style={{ flex: 1 }} initialPage={1}>
      <View key="1">
        <ProfileScreen />
      </View>
      <View key="2">
        <PagerView style={{ flex: 1 }} orientation="vertical" initialPage={1}>
          <View key="1">
            <NotificationsScreen />
          </View>
          <View key="2">
            <HomeScreen />
          </View>
          <View key="3">
            <HistoryScreen />
          </View>
        </PagerView>
      </View>
      <View key="3">
        <MessagesScreen />
      </View>
    </PagerView>
  );
};

export default SpatialNavigator;
