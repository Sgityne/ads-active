import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../lib/useAppwrite';
import { getUserActivities, signOut } from '../../lib/appwrite';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider'
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';

const Profile = () => {
  const { user, setUser, setIsLoggedIn} = useGlobalContext();
  const { data: activities} = useAppwrite(() => getUserActivities(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {}}
        ListHeaderComponent={() => (

          <View>
            <View className="w-full h-[316px] justify-between">

              <ImageBackground
                source={{uri: user?.banner}}
                className="absolute w-full h-60 self-start"
                resizeMode='cover'
                />

              <TouchableOpacity
                onPress={logout}
                activeOpacity={0.7}
                className="items-end"
              >
                <Image
                  source={icons.logout}
                  className="w-[26.67] h-6 m-4"
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <View className='flex-row justify-between items-end'>
                <Image
                  source={{uri: user?.avatar}}
                  style={{
                    borderColor:'#FFFFFF',
                    borderWidth: 4.5,
                    backgroundColor:'#FFFFFF'
                  }}
                  className=" w-[120px] h-[120px] rounded-full m-4"
                  resizeMode='cover'
                  />

                <TouchableOpacity
                  //onPress={} this needs to follow the person
                  activeOpacity={0.7}
                  className={"bg-primary border-2 rounded-lg w-[133px] h-10 justify-center items-center m-4"}
                  >
                  <Text className= {`text-black text-base font-rbold`}>
                    Follow
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <InfoBox
              user={user?.name}
              username={user?.username}
              containerStyle={"px-6"}
            />
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile;