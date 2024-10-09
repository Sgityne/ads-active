import {  View, Text } from 'react-native'
import React from 'react'

import { TextInputMask } from 'react-native-masked-text'

const MaskInput = ({value, text, type, options, placeholder, handleChangeText}) => {

  return (
    <View>
      <Text className="font-rmedium text-black text-base">{text}</Text>
      <View className="border-2 border-secondary h-[62px] px-4 bg-secondary-100 focus:border-tertiary rounded-lg mt-2">
        <TextInputMask
          className="flex-1 text-base text-secondary font-rmedium"
          
          type={type}
          options={options}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#40D4CC"
          onChangeText={handleChangeText}
          keyboardType="numeric"
        />
      </View>
    </View> 
  )
}

export default MaskInput