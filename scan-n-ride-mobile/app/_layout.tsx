import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import VehicleMap from './VehicleMap';
import TicketList from './TicketList';
import AuthScreen from './auth';
import BuyTicketScreen from './BuyTicket';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (

    <Tab.Navigator>
      <Tab.Screen 
        name="VehicleMap" 
        component={VehicleMap} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="map-marked-alt" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="TicketList" 
        component={TicketList} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="auth" 
        component={AuthScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="BuyTicket" 
        component={BuyTicketScreen} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="ticket-alt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
    
  );
};
