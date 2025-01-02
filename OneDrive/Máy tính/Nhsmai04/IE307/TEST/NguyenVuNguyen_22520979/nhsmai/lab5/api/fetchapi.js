import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios';

const MY_API_KEY = 'UHbxMRzfVuk5EZ8L3NuUURw_ibZ4LHQLQd67kNeV9Sg'; 
export  const getAddressFromCoordinates = async (latitude, longitude) => {
    const apiKey = MY_API_KEY; // Replace with your HERE API Key
    const url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apikey=${apiKey}`;
  
    try {
      const response = await axios.get(url);
      const address = response.data.items[0].address;
      
        return address.label;
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };