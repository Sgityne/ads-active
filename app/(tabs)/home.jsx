import { View, Text, FlatList, Image, TouchableHighlight, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'

import { useGlobalContext } from '../../context/GlobalProvider'
import { getAllPosts, getAllProfiles } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'

import { icons } from '../../constants'
import ProfileExplorer from '../../components/ProfileExplorer'
import Post from '../../components/Post'
import PickName from '../../components/PickName'


const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: profile} = useAppwrite(() => getAllProfiles (user.$id));
  const { user } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  // Refresh the page with new infos geted from refetch method
  // To refresh the page, always will need to use refetch from useAppwrite class
  const onRefresh = async () => {
    setRefreshing(True);
    await refetch();
    setRefreshing(False);
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        ListHeaderComponent={() => (

          <View className="mt-8 mb-2 px-4">
            <View className="justify-between items-start flex-row">

              <View>
                <Text className="text-base font-rregular">
                  Welcome back
                </Text>
                <PickName
                  name={user?.name}
                  username={user?.username}
                  isOnHome={true}
                />
              </View>

              <TouchableHighlight
                onPress={() => router.push('/aux_screens/explore')}
                className="w-12 h-12 justify-center items-center rounded-full"
                delayPressOut={500}
                underlayColor={'#CCCCCC'}
              >
                <Image
                  source={icons.add1}
                  className="w-6 h-[17.45px]"
                  resizeMode='contain'
                />
              </TouchableHighlight>
            </View>

            <Text className="text-xl font-rmedium mt-4 py-2.5">
              Discover People
            </Text>

            <ProfileExplorer profile={profile ?? []}/>

            <View className="w-full h-[1px] bg-gray-300 mt-6 mb-4"></View>

            <Post posts={posts ?? []}/>

          </View>
        )}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
    />

    </SafeAreaView>
  )
}

export default Home