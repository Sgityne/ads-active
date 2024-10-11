import { View, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_MAP_KEY } from '../constants/googleMapKey'
import MapViewDirections from 'react-native-maps-directions';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
 } from 'expo-location';
import { icons } from '../constants';

const Map = () => {
  const [location, setLocation] = useState<LocationObject | null>(null)
  const mapRef = useRef();
  
  async function requestLocationPermission() {
    const { granted } = await requestForegroundPermissionsAsync();

    if ( granted ) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermission();
  },[]);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval:1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
    })
  },[])

  return (
    <View style={styles.container}>
      
      {
         location &&
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          {/* <MapViewDirections
            origin={location.coords}
            destination={}
            apikey={GOOGLE_MAP_KEY}
            strokeWidth={3}
            strokeColor='#24857E'
            optimizeWaypoints={true}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates,{
                edgePadding:{
                  right: 30,
                  bottom: 300,
                  left: 30,
                  top: 100,
                }
              })
            }}
          /> */}

          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            >
            <Image
              source={icons.marker}
              style={styles.marker}
            />
          </Marker>
        </MapView>
      }

    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute'
  },

  marker: {
    width: 12,
    height: 12,
  },
});

export default Map