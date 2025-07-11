import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

import SecondScreen from "../screens/SecondScreen";
import SpatialNavigator from "../components/SpatialNavigator";

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen 
        name="MainTabs" 
        component={() => (
          <View style={{ flex: 1, backgroundColor: '#1C1C1E', padding: 8 }}>
            <View style={{ 
              flex: 1, 
              borderRadius: 16, 
              overflow: 'hidden',
              borderColor: 'orange',
              borderWidth: 8
            }}>
              <SpatialNavigator />
            </View>
          </View>
        )} 
      />
      <MainStack.Screen name="SecondScreen" component={SecondScreen} />
    </MainStack.Navigator>
  );
};

export default Main;
