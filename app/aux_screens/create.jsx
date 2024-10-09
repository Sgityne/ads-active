import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton'
import ActivityType from '../../components/ActivityType'
import { router } from 'expo-router'
import { createActivity } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import MaskInput from '../../components/MaskInput'

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    type: null,
    time: null,
    distance: null,
  })

  const submit = async () => {
    if ((form.type === "") | (form.time === "") | (form.distance === "")){
      return Alert.alert("Please fill in all the fields")
    }

    setUploading(true);

    try {
      await createActivity({
        ...form, userId: user.$id
      })

      Alert.alert("Sucess", "Activity created successfully")
      router.push('/progress')
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setForm({
        type: null,
        time: null,
        distance: null,
      })

      setUploading(false);
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full px-4">

        <Text className="mt-9 mb-7 font-rbold text-black text-2xl">Create New Activity </Text>
        
        <Text className="font-rmedium text-black text-base">Activity Type</Text>
        <ActivityType
          handleChangeText={(e) => setForm({ ...form, type: e})}
          otherStyles={"mt-2"}
        />

        <View className="flex-row space-x-2 mt-2">
          <View className="flex-1">

            <MaskInput
              value={form.time}
              text={"Total Time"}
              type={'datetime'}
              options={{format: 'HH:mm:ss'}}
              placeholder={"00:00:00"}
              handleChangeText={(e) => setForm({ ...form, time: e})}
              />
          </View>

          <View className="flex-1">
            
            <MaskInput
              value={form.distance}
              text={"Distance traveled"}
              type={'custom'}
              options={{mask: '99.99'}}
              placeholder={"00:00 km"}
              handleChangeText={(e) => setForm({ ...form, distance: e})}
            />
          </View>
        </View>
        
        <CustomButton
          title={"Submit"}
          handlePress={submit}
          containerStyles={"mt-12"}
          isLoading={uploading}
        />
      </View>
    </SafeAreaView>
  )
}

export default Create