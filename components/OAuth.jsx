import { View, Text, Image } from 'react-native'
import React from 'react'
import CustomButton from './CustomButton'

import { icons } from '../constants'

const OAuth = () => {
  const handleGoogleSignIn = async() => {};
  return (
    <View>
      <View className="flex-row justify-center items-center mt-8">
        <View className="h-[1px] grow bg-secondary"></View>
        <Text className="text-base font-rmedium color-tertiary px-2">Or</Text>
        <View className="h-[1px] grow bg-secondary"></View>
      </View>
       
      <CustomButton
        title="Log In with Google"
        containerStyles="mt-8 bg-white border-2 border-secondary space-x-2"
        handlePress={handleGoogleSignIn}
        IconLeft={() => (
          <Image
            source={icons.GoogleIcon}
            resizeMode="contain"
            className="w-10 h-10"
          />
        )}
      >

      </CustomButton>
    
    </View>
  )
}

export default OAuth