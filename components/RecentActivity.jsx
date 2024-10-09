import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import PickIcon from './PickIcon';
import { icons } from '../constants';

const ActivityItem = ({activity}) => {
  const { type, distance, time } = activity;
  

  return(
      <View className="w-[159px] flex-row space-x-4 mr-4">

        <PickIcon
          iconType={type}
        />
                
        <View className="flex-1">
          <Text className="font-rbold text-base text-black tracking-wide">{distance} km</Text>
          <Text className="font-rregular text-sm text-black">{time}</Text>
        </View>
                
      </View>
  )
}
  
const RecentActivity = ({ activity }) => {
  return (
    <FlatList
    data={activity}
    keyExtractor={(item) => item.$id}
    horizontal
    renderItem={({ item }) => (
      <ActivityItem activity={item}/>
    )}
    ListEmptyComponent={() => (
      <View className="flex-row justify-center items-center space-x-4 py-4">
        <Image
          source={icons.searchPost}
          resizeMode="contain"
          className="w-9 h-9"
        />

        <Text className="text-lg font-rmedium text-black">
          No activity created yet
        </Text>
      </View>
    )}
    />
  )
}

export default RecentActivity;