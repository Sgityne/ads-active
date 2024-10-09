import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import PickIcon from './PickIcon';
import { icons } from '../constants';
  
const FavoriteActivity = ({ activity, otherStyles }) => {
  
  return (
    <FlatList
    ListHeaderComponent={() => {
        if (activity && activity.type) {

          return(
            <View className={`w-full flex-row py-3 space-x-4 ${otherStyles}`}>
      
              <PickIcon
                iconType={activity.type}
              />
                
              <View className="flex-1">
                <Text className="font-rbold text-base text-black tracking-wide">{activity.distance} km</Text>
                <Text className="font-rregular text-sm text-black">{activity.time}</Text>
              </View>
        
              <Text className="font-rmedium text-sm text-gray self-end pb-1">7 days ago</Text>
            </View>
          )
          } else {
              return (
              <View className="flex-row justify-center items-center space-x-4 py-4">
                <Image
                  source={icons.searchPost}
                  resizeMode="contain"
                  className="w-9 h-9"
                />

                <Text className="text-lg font-rmedium text-black">
                  No activity on the showcase yet
                </Text>
              </View>
              )
            }
      }}
    />
  )
}

export default FavoriteActivity;