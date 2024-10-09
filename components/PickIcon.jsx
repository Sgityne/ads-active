import { Image } from 'react-native'
import React from 'react'
import { icons } from "../constants"

const PickIcon = ({iconType}) => {
  
  switch (iconType) {
    case "running":
      return (
        <Image
        source={icons.running}
        className="w-12 h-12"
        resizeMode='contain'
        />
      );

    case "biking":
      return (
        <Image
        source={icons.biking}
        className="w-12 h-12"
        resizeMode='contain'
        />
      );

    case "skating":
      return (
        <Image
        source={icons.skating}
        className="w-12 h-12"
        resizeMode='contain'
        />
      );
  }
}

export default PickIcon