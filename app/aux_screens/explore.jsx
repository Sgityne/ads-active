import { View, FlatList, } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'

const Explore = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
        <FlatList

          ListHeaderComponent={() => (
            <View className="flex w-full px-4 mt-8">

              <SearchInput/>
            </View>
            
          )}
        />


    </SafeAreaView>
  )
}

export default Explore