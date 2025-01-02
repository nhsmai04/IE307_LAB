import { View, Text,Button } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Places from './pages/Places'
import AddPlace from './pages/AddPlace'
import { useNavigation } from '@react-navigation/native';
import PickonMap from './pages/PickonMap'
import PlaceDetail from './pages/PlaceDetail'
import ShowMap from './pages/ShowMap'

const PlacesStack = createStackNavigator() 
export default function Placesstack() {
  return (
    <PlacesStack.Navigator initialRouteName='Places'>
        <PlacesStack.Screen name="Places" component={Places} 
        options={({navigation}) => ({
          title: 'My Places',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('AddPlace')}
              title="+"
              color="black"
              padding="10"
              backgroundColor="orange"
            />
          ),   
        })
      }
       
        />
        <PlacesStack.Screen name="AddPlace" component={AddPlace} 
         options={{
          title: 'Add a new Place',
         }}
        />
        <PlacesStack.Screen name="PickonMap" component={PickonMap}  />
        <PlacesStack.Screen name="PlaceDetail" component={PlaceDetail} />
        <PlacesStack.Screen name="ShowMap" component={ShowMap} />
    </PlacesStack.Navigator>
  )
}