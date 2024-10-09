import { View, Text, FlatList, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'
import useAppwrite from '../../lib/useAppwrite';
import { getUserActivities } from '../../lib/appwrite'
import PickIcon from '../../components/PickIcon'


const Progress = () => {
  const { data: activities} = useAppwrite(() => getUserActivities(user.$id));
  const { user } = useGlobalContext();
  

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (

          <View className="w-full mt-8 px-4">
            <View className="justify-between items-center flex-row">

              <View>
                <Text className="font-rbold text-black text-2xl">
                  Progress
                </Text>
                
              </View>

              <TouchableHighlight
                onPress={() => router.push('/aux_screens/create')}
                className="w-12 h-12 justify-center items-center rounded-full"
                delayPressOut={500}
                underlayColor={'#CCCCCC'}
              >
                <Image
                  source={icons.addActivity}
                  className="w-6 h-6"
                  resizeMode='contain'
                />
              </TouchableHighlight>
            </View>
            
            <Text className="py-[18px] mt-4 font-rbold text-black text-xl">Recent Activities</Text>            
          </View>
        )}
        renderItem={({ item }) => (
          
          <View className="w-full flex-row px-6 py-3 space-x-4">

            <PickIcon
              iconType={item.type}
            />
            <View className="flex-1">
              <Text className="font-rbold text-base text-black tracking-wide">{item.distance} km</Text>
              <Text className="font-rregular text-sm text-black">{item.time}</Text>
            </View>
            <Text className="font-rmedium text-sm text-gray self-end pb-1">7 days ago</Text>

          </View>
        )}
    />

    </SafeAreaView>
  )
}

export default Progress