import { View, Text } from 'react-native'
import React from 'react'
import PickName from './PickName'

const InfoBox = ({ user, username, containerStyle }) => {

  return (
    <View className={`${containerStyle}`}>

      <PickName
          name={user}
          username={username}
      />

      <View className="flex-row space-x-1 py-3">

        {/* <Text className="font-rregular text-gray-500 text-xs tracking-wide">00 Followers</Text>
        <View className="w-[1px] h-4 bg-gray"></View>
        <Text className="font-rregular text-gray-500 text-xs tracking-wide">00 Following</Text> */}
      </View>
    </View>
  )
}

export default InfoBox