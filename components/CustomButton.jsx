import { TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'

const CustomButton = ({ title, icon, handlePress, containerStyles, isLoading, hasImage}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-lg min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >{/* set to always have text and check if is needed to hasimage, after set to flex-row and
      add a gap of 8px (propably will be a margin left) | verify which one is better */}
      {hasImage ? (
      <Image
        source={icon}
        className= "w-10 h-10"
        resizeMode='contain'
      />
      ) : (
      <Text className= {`text-black text-base font-rbold`}>
        {title}
      </Text>
      )}
    </TouchableOpacity>
  )
}

export default CustomButton