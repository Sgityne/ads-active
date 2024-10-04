import { Image, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'

import { icons } from "../constants"
import { router, usePathname } from 'expo-router'

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  return (
      <View className="border-2 border-secondary h-[62px] px-4 bg-secondary-100 focus:border-tertiary rounded-lg items-center flex-row">
        <TextInput
          className="flex-1 text-base text-black font-rregular"
          value={query}
          onChangeText={(e) => setQuery(e)}
        />

        <TouchableOpacity
          onPress={() => {

            if(!query) {
              return Alert.alert("Missing query", "Please input something to search results across database")
            };
            
            if (pathname.startsWith("/search")) router.setParams({ query });
            else router.push(`/search/${query}`);
          }}
        >
          <Image
            source={icons.searchPost}
            tintColor={"#40D4CC"}
            className="w-5 h-5"
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput