import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router';
import useAppwrite from '../../lib/useAppwrite';
import { searchProfile } from '../../lib/appwrite';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { icons } from '../../constants';

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: profile, refetch} = useAppwrite(() => searchProfile(query));

  useEffect(() => {
    refetch()
  }, [query])

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={profile}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          const Name = () => {
            const [hasName, setHasName] = useState(item.name)

            if (hasName !== null) {
              return(
                <>
                  <Text className="font-rbold text-black text-2xl">{item.name}</Text>
                  <Text className="font-rmedium text-gray-400 text-sm">{item.username}</Text>
                </>
              )
                  
            } else {
              return (
                <Text className="font-rbold text-black text-2xl">{item.username}</Text>
              )
            }}
              
          return(
            <TouchableOpacity
              //onPress={} this needs to go to the person profiles
              className="border border-gray-400 bg-primary overflow-hidden rounded-2xl mx-4 my-2 pb-4 "
            >
              <View className='h-[140px] flex-row justify-between items-end'>
                <ImageBackground
                  source={{uri: item.banner}}
                  className="absolute w-full h-[102px] self-start"
                  resizeMode='cover'
                  />
                <Image
                  source={{uri: item.avatar}}
                  style={{
                    borderColor:'#FFFFFF',
                    borderWidth: 4.5,
                    backgroundColor:'#FFFFFF'
                  }}
                  className=" w-[60px] h-[60px] rounded-full m-2"
                  resizeMode='cover'
                  />
                <TouchableOpacity
                  //onPress={} this needs to follow the person
                  activeOpacity={0.7}
                  className={"bg-primary border-2 rounded-lg w-[100px] h-[30px] justify-center items-center mr-2"}
                >
                  <Text className= {`text-black text-base font-rbold`}>
                    Follow
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="px-3">
                <Name/>
                <View className="flex-row space-x-1 py-1">

                  <Text className="font-rregular text-gray-500 text-xs tracking-wide">00 Followers</Text>
                  <View className="w-[1px] h-4 bg-gray-600"></View>
                  <Text className="font-rregular text-gray-500 text-xs tracking-wide">00 Following</Text>
                </View>

              </View>
              
            </TouchableOpacity>
          )}
        }
          ListHeaderComponent={() => (
           
            <View className="flex w-full px-4 mt-8 mb-6">
              <SearchInput initialQuery={query}/>
            </View>
        )}
          ListEmptyComponent={() => (
            <EmptyState
              image={icons.searchPost}
              title="No profiles found"
              subtitle="No profiles found for this search query"
            />
          )}
        />
    </SafeAreaView>
  )
}

export default Search;