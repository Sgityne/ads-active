import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/GlobalProvider'
import Map from '../../components/Map'
import { icons } from '../../constants'
import SelectActivity from '../../components/SelectActivity'
import { createActivity } from '../../lib/appwrite'
import { router } from 'expo-router'

const Active = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false)
  const [isActive, setIsActive] = useState(null)
  const [running, setRunning] = useState(false)
  const [calories, setCalories] = useState(0)
  const [distance, setDistance] = useState(0)
  const [form, setForm] = useState({
    type: null,
    time: "00:00:00", // Alterado para string
    distance: "0.00",  // Alterado para string
  })
  
  const submit = async () => {
    if (!form.type || form.time === "00:00:00" || form.distance === "0.00"){
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
      setForm({ type: null, time: "00:00:00", distance: "0.00" });
      setCalories(0);
      setUploading(false);
    }
  }

  const timer = useRef(null)
  const distanceTimer = useRef(null)
  const caloriesTimer = useRef(null)

  useEffect(() => {
    if (running) {
      timer.current = setInterval (() => {
        setForm((prevForm) => {
          const newTime = prevForm.time.split(":").map(Number);
          newTime[2]++;
          
          if (newTime[2] >= 60) {
            newTime[2] = 0;
            newTime[1]++;
          }
          
          if (newTime[1] >= 60) {
            newTime[1] = 0;
            newTime[0]++;
          }

          return {
            ...prevForm,
            time: newTime.map(num => (num < 10 ? '0' + num : num)).join(':')
          };
        });
      }, 1000)

      distanceTimer.current = setInterval(() => {
        setDistance((prevDistance) => {
          const newDistance = prevDistance + 0.00278;
          setForm((prevForm) => ({
            ...prevForm,
            distance: newDistance.toFixed(2),
          }));
          return newDistance;
        });
      }, 1000);
      

      caloriesTimer.current = setInterval(() => {
        setCalories((prevCalories) => prevCalories + 0.00006394);
      }, 1000)
    }
    return () => {
      clearInterval(timer.current);
      clearInterval(distanceTimer.current);
      clearInterval(caloriesTimer.current);
    }
  }, [running])

  const formatCalories = (calories) => {
    return calories.toFixed(2);
  }
    const formatDistance = (distance) => {
    const formattedDistance = distance.toFixed(2).toString(); // "99.99"
    const [integerPart, decimalPart] = formattedDistance.split('.');
    return `${integerPart}:${(decimalPart + '00').slice(0, 2)}`; // formata para "99:99"
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="w-full h-[280px] justify-between px-4">
        <View className="flex-row w-full py-4 justify-between itens-center">
          <Text className="text-2xl text-black font-rbold">Active</Text>
          <SelectActivity
            handleChangeText={(e) => setForm({ ...form, type: e})}
            isLoading={isActive}
          />
        </View>

        <View className="items-center">
          <Text className="text-5xl leading-[46px] font-rbold text-black">
            {form.time}
          </Text>
          <Text className="text-base font-rmedium text-black">Current Time</Text>
        </View>

        <View className="flex-row py-4 px-4 justify-between">
          <View className="w-28 justify-center items-center">
            <Text className="font-rbold text-[40px] text-black text-center">
              {formatCalories(calories)}
            </Text>
            <Text className="text-base font-rmedium text-center">Calories (kcal)</Text>
          </View>

          <View className="w-28 justify-center items-center">
            <Text className="font-rbold text-[40px] text-black text-center">
              {formatDistance(distance)}
            </Text>
            <Text className="text-base font-rmedium text-center">Distance (km)</Text>
          </View>
        </View>
      </View>

      <View className="h-1.5 bg-gray-300"></View>

      <View className="grow flex items-center justify-end">
        <Map/>
        <TouchableOpacity
          onPress={() => {
            if (form.type) {
              if (running){
                clearInterval(timer.current)
                clearInterval(distanceTimer.current)
                clearInterval(caloriesTimer.current)
                submit()
                setIsActive(false)
              }
              setRunning(!running)
              setIsActive(true)
            } else {
              return Alert.alert("Please select an activity first")
            }
          }}
          className="h-[60px] w-[60px] absolute bg-white translate-y-[-16px] border border-secondary rounded-full justify-center items-center"
          disabled={uploading}
        >
          <View className="h-[50px] w-[50px] bg-secondary border-secondary justify-center items-center rounded-full">
            <Image
              source={running ? icons.stop : icons.play}
              className="h-6 w-[18.86px] ml-[3px]"
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Active
