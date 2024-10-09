import { Image, View, Text,TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { icons } from "../constants"

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [ShowPassword, setShowPassword] = useState(false)

  return (
    <View className={`${otherStyles}` }>

      <View className="border-2 border-secondary h-[62px] px-4 bg-secondary-100 focus:border-tertiary rounded-lg items-center flex-row">
        <TextInput
          className="flex-1 text-base text-secondary font-rmedium"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#40D4CC"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !ShowPassword}
          {...props}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!ShowPassword)}>
            <Image
              source={!ShowPassword ? icons.eyeOn : icons.eyeOff}
              className="w-5 h-5"
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField