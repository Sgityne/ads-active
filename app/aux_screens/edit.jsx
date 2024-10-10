import { View, Text, TouchableOpacity, Image, ImageBackground, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as ImagePicker from "expo-image-picker";

import { icons, images } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider'
import FavoriteActivity from '../../components/FavoriteActivity';
import { getCurrentUser, updateProfile } from '../../lib/appwrite';

const edit = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    name: null,
    bio: null,
    avatar: null,
    banner: null,
  })

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled) {
      if(selectType === 'banner') {
        setForm({ ...form, banner: result.assets[0] })
      }

      if(selectType === 'avatar') {
        setForm({ ...form, avatar: result.assets[0] })
      }
    }
  }
  

  const submit = async () => {

    setUploading(true);

    try {
      await updateProfile(form, user.$id);

      setUser(null)
      setIsLoggedIn(false)
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      Alert.alert("Sucess", "Profile updated successfully")
      router.push('/profile')
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setForm({
        name: null,
        bio: null,
        avatar: null,
        banner: null,
      })

      setUploading(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className=" h-[316px] justify-between">

        <ImageBackground
          source={{uri: form.banner?.uri ?? user?.banner}}
          className="absolute w-full h-60 self-start"
          resizeMode='cover'
        />

        <View className="flex-row bg-primary w-full justify-center items-center space-x-5 px-4 py-3">
          <TouchableOpacity onPress={() => router.push('../profile')}>
            <Image
              source={icons.leftArrow}
              className="w-6 h-6"
              resizeMode='contain'
            />
          </TouchableOpacity>
                
          <Text className="flex-1 text-xl font-rmedium text-black text-justify">
            Edit Profile
          </Text>

          <TouchableOpacity
           onPress={submit}
           disabled={uploading}
          >
            <Text className="text-base font-rmedium text-black">
              Save
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => openPicker('banner')}
          className="w-full pt-[38px] items-center"
        >
  
          <Image
            source={images.changePhoto}
            className={"w-12 h-12"}
            resizeMode='contain'
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => openPicker('avatar')}>
          <Image
            source={{uri: form.avatar?.uri ?? user?.avatar}}
            style={{
              borderColor:'#FFFFFF',
              borderWidth: 4.5,
              backgroundColor:'#FFFFFF'
            }}
            className="w-[120px] h-[120px] rounded-full m-4"
            resizeMode='cover'
          />
          <Image
            source={images.changePhoto}
            className={"w-12 h-12 absolute translate-x-[52px] translate-y-[52px]"}
            resizeMode='contain'
            tintColor={"#636363"}
          />
        </TouchableOpacity>
      </View>
      <View className="w-full px-6">

        <Text className="font-rregular text-base text-gray-400">
          Name
        </Text>

        <View className="border-b-2 border-gray-400 h-[30px] bg-primary mt-1">
          <TextInput 
            className="flex-1 text-lg text-black font-rmedium"
            value={form.name}
            onChangeText={(e) => setForm({ ...form, name: e})}
            cursorColor={'#000000'}
            placeholder={user?.name ? user?.name: ''}
            placeholderTextColor={"#636363"}
          />
        </View>

        {/* <Text className="font-rregular text-base text-gray-400 mt-8">
          Bio
        </Text>

        <View className="border-b-2 border-gray-400 h-[90px] bg-primary mt-1">
          <TextInput 
            className="flex-1 text-lg text-black font-rmedium"
            value={form.bio}
            onChangeText={(e) => setForm({ ...form, bio: e})}
            multiline={true}
            maxLength={140}
            textAlignVertical='top'
            cursorColor={'#000000'}
            placeholder={user.bio}
            placeholderTextColor={"#636363"}
          />
        </View> */}

        <Text className="font-rregular text-base text-gray-400 mt-8">
          Current activity selected
        </Text>
        
        <TouchableOpacity
          onPress={() => router.push('/aux_screens/select')}
          className="mt-3 border rounded-2xl px-4 bg-primary"
        >
          <FavoriteActivity
            activity={user?.favorite ?? []}
            otherStyles={""}
          />
        </TouchableOpacity>
              
      </View>
    </SafeAreaView>
  )
}

export default edit;