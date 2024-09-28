import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, isLoading, IconLeft}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`flex flex-row p-2 bg-secondary rounded-lg min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      {IconLeft && <IconLeft />}
      <Text className= {`text-black text-base font-rbold`}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton