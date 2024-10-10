import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'
import useAppwrite from '../../lib/useAppwrite';
import { getCurrentUser, getUserActivities, updateProfile } from '../../lib/appwrite'
import PickIcon from '../../components/PickIcon'

const Select = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: activities} = useAppwrite(() => getUserActivities(user.$id));
  const [uploading, setUploading] = useState(false);
  const [ form, setForm ] = useState({
    favorite: null,
  });

  const submit = async () => {
    setUploading(true);

    try {
      await updateProfile(form, user.$id);

      setUser(null)
      setIsLoggedIn(false)
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.push('/profile')
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {

      setUploading(false);
    }
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
        data={activities}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (

          <View className="w-full mt-8 px-4">

            <TouchableOpacity
              onPress={() => router.push('/aux_screens/edit')}
            >
              <Image
                source={icons.leftArrow}
                className="w-6 h-6 mx-1 mb-2 justify-center items-center"
                resizeMode='contain'
              />
            </TouchableOpacity>

            <Text className="font-rbold text-black text-xl my-[18px]">
              Select activity for showcase
            </Text>           
          </View>
        )}
        renderItem={({ item }) => (
          
          <TouchableOpacity
            onPressIn={() => setForm((prevForm) => ({ ...prevForm, favorite: item.$id }))}
            onPressOut={submit}
            disabled={uploading}
            className="w-full flex-row px-6 py-3 space-x-4"
          >

            <PickIcon
              iconType={item.type}
            />
            <View className="flex-1">
              <Text className="font-rbold text-base text-black tracking-wide">{item.distance} km</Text>
              <Text className="font-rregular text-sm text-black">{item.time}</Text>
            </View>
            <Text className="font-rmedium text-sm text-gray self-end pb-1">7 days ago</Text>

          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  )
}

export default Select;