import { TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-lg min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className= {`text-black text-base ${textStyles}`}>{title}</Text>

      {hasImage ? (
      <Image
        source={icon}
        className= "w-10 h-10"
        resizeMode='contain'
      />
      ) : null }
    </TouchableOpacity>
  )
}


export default CustomButton