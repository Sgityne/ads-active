import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useAppwrite from '../../lib/useAppwrite';
import { getLatestActivities, signOut } from '../../lib/appwrite';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider'
import InfoBox from '../../components/InfoBox';
import { router } from 'expo-router';
import FavoriteActivity from '../../components/FavoriteActivity';
import RecentActivity from '../../components/RecentActivity';

const Profile = () => {
  const { user, setUser, setIsLoggedIn} = useGlobalContext();
  const { data: activities} = useAppwrite(() => getLatestActivities(user.$id));


  const logout = async () => {
    await signOut();
    setUser(null)
    setIsLoggedIn(false)

    router.replace('/sign-in')
  }
  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
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
                  onPress={() => router.push('/aux_screens/edit')}
                  activeOpacity={0.7}
                  className={"bg-primary border-2 rounded-lg w-[133px] h-10 justify-center items-center m-4"}
                  >
                  <Text className= {`text-black text-base font-rbold`}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <InfoBox
              user={user?.name}
              username={user?.username}
              containerStyle={"px-6"}
            /> 
            
            <Text className="font-rbold text-base text-black ml-6">Favorite Activity</Text>

            <FavoriteActivity
              activity={user?.favorite ?? []}
              otherStyles={"px-6"}
            />
            <View className="w-full px-6">

              <Text className="mt-1 font-rbold text-base text-black">Recent Activities</Text>
              
              <View className="w-full py-3">
                <RecentActivity activity={activities ?? []}/>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default Profile;