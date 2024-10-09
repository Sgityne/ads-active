import { Image, View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

import { icons } from "../constants"

const ActivityType = ({ handleChangeText, otherStyles }) => {
  const [isEnable, setIsEnable] = useState(false);
  const [value, setValue] = useState('');
  const toggleInterface = () => setIsEnable(previousState => !previousState);

  const onPress1 = () => {
    setValue("Running");
    handleChangeText("running");
  };
  const onPress2 = () => {
    setValue("Biking");
    handleChangeText("biking");
  };
  const onPress3 = () => {
    setValue("Skating");
    handleChangeText("skating");
  };

  return (
    <View
      className={`border-2 px-4 bg-secondary-100 rounded-lg
        ${isEnable ? "border-tertiary" : "border-secondary" }
        ${otherStyles}`}
    >

      <TouchableWithoutFeedback
        onPress={toggleInterface}
      >
        <View className="h-[62px] items-center flex-row">
          <TextInput 
            className={`flex-1 text-base font-rmedium ${isEnable ? "text-tertiary" : "text-secondary" }`}
            value={value}
            readOnly={true}
          />

          <Image
            source={!isEnable ? icons.downArrow : icons.upArrow}
            className="w-5 h-5"
            resizeMode='contain'
            />
        </View>
      </TouchableWithoutFeedback>
      { isEnable && 
        <View>
          <TouchableOpacity
            className="w-full h-[46.5px] justify-center"
            onPress={onPress1}
          >
            <Text className="text-base text-tertiary font-rmedium">
              Running
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full h-[46.5px] justify-center"
            onPress={onPress2}
          >
            <Text className="text-base text-tertiary font-rmedium">
              Biking
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-full h-[46.5px] justify-center"
            onPress={onPress3}
          >
            <Text className="text-base text-tertiary font-rmedium">
              Skating
            </Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}

export default ActivityType;