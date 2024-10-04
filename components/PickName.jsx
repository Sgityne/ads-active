import { Text } from 'react-native'
import React, { useState } from 'react'

const PickName = ({ name, username, isOnHome}) => {
  const [hasName, setHasName] = useState(name)
  const [onHome, setOnHome] = useState(isOnHome)
  
  if (hasName !== null && onHome) {
    return(
      <Text className="font-rbold text-black text-2xl">{name}</Text>
    )
  }

  if (hasName !== null && !onHome) {
    return(
      <>
        <Text className="font-rbold text-black text-2xl">{name}</Text>
        <Text className="font-rmedium text-gray-400 text-sm">{username}</Text>
      </>
    )
  } else {
    return (
      <Text className="font-rbold text-black text-2xl">{username}</Text>
    )
  }
}

export default PickName