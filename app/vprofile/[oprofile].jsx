import { View, Text, FlatList, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import useAppwrite from '../../lib/useAppwrite';
import { getLatestActivities, searchProfilebyId,} from '../../lib/appwrite';

import InfoBox from '../../components/InfoBox';
import FavoriteActivity from '../../components/FavoriteActivity';
import RecentActivity from '../../components/RecentActivity';
import { router, useLocalSearchParams } from 'expo-router';
import { icons } from '../../constants';

const ViewProfile = () => {
  const { oprofile } = useLocalSearchParams();
  const { data: profile } = useAppwrite(() => searchProfilebyId(oprofile))
  const { data: activities} = useAppwrite(() => oprofile ? getLatestActivities(oprofile) : { data: null });

  
  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        ListHeaderComponent={() => (

          <View>
            <View className="w-full h-[316px] justify-between">

              <ImageBackground
                source={{uri: profile.banner}}
                className="absolute w-full h-60 self-start"
                resizeMode='cover'
                />

              <TouchableOpacity
                onPress={() => router.push('/home')}
                activeOpacity={0.7}
              >
                <Image
                  source={icons.leftArrow}
                  className="w-[26.67] h-6 m-4"
                  resizeMode='contain'
                />
              </TouchableOpacity>

              <View className='flex-row justify-between items-end'>
                <Image
                  source={{uri: profile.avatar}}
                  style={{
                    borderColor:'#FFFFFF',
                    borderWidth: 4.5,
                    backgroundColor:'#FFFFFF'
                  }}
                  className=" w-[120px] h-[120px] rounded-full m-4"
                  resizeMode='cover'
                  />

                <TouchableOpacity
                  //onPress={}
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
              user={profile.name}
              username={profile.username}
              containerStyle={"px-6"}
            /> 
            
            <Text className="font-rbold text-base text-black ml-6">Favorite Activity</Text>

            <FavoriteActivity
              activity={profile.favorite ?? []}
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

export default ViewProfile;