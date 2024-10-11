import { Image, View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { icons } from "../constants"

const ActivityType = ({ handleChangeText, isLoading }) => {
  const [isEnable, setIsEnable] = useState(false);
  const [selected1, setSelected1] = useState('')
  const [selected2, setSelected2] = useState('')
  const [selected3, setSelected3] = useState('')
  const [value, setValue] = useState(null);
  const toggleInterface = () => setIsEnable(previousState => !previousState);

  const onPress1 = () => {
    setValue(icons.running);
    setSelected1('#40D4CC')
    handleChangeText("running");
    setSelected2('#000000')
    setSelected3('#000000')
    
  };
  const onPress2 = () => {
    setValue(icons.biking);
    setSelected2('#40D4CC')
    handleChangeText("biking");
    setSelected1('#000000')
    setSelected3('#000000')
  };
  const onPress3 = () => {
    setValue(icons.skating);
    setSelected3('#40D4CC')
    handleChangeText("skating");
    setSelected1('#000000')
    setSelected2('#000000')
  };

  return (
    <View
      className={`shrink flex-row bg-white`}
    >

      <TouchableWithoutFeedback
        onPress={toggleInterface}
        disabled={isLoading}
      >
        <View className="h-6 items-center flex-row">

          <Image
            source={isEnable ? icons.selectR : value ?? icons.selectL}
            className={`w-6 h-6 ${isEnable ? 'mr-4' : []}`}
            resizeMode='contain'
            />

        </View>
      </TouchableWithoutFeedback>

      { isEnable && 
        <View className="flex-row space-x-4">
          <TouchableOpacity
            className="w-6 h-6"
            onPress={onPress1}
          >
            <Image
              source={icons.running}
              className="w-6 h-6"
              resizeMode='contain'
              tintColor={selected1}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-6 h-6"
            onPress={onPress2}
          >
            <Image
              source={icons.biking}
              className="w-6 h-6"
              resizeMode='contain'
              tintColor={selected2}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="w-6 h-6"
            onPress={onPress3}
          >
            <Image
              source={icons.skating}
              className="w-6 h-6"
              resizeMode='contain'
              tintColor={selected3}
            />
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}

export default ActivityType;