import { ScrollView, View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'

import { images } from '../../constants/';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import OAuth from '../../components/OAuth';

import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    email: "",
    password: "",
  })

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
      console.log(error)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className= "bg-primary h-full">

      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        height:"100%"
        }}
      >
        <View className= "flex w-full grow px-4 mt-4">

          <View className= "flex-row space-x-2 my-2">
            <Image
              source={images.logo}
              className="w-[51] h-[60]"
              resizeMode='contain'
            />
            <Text className="text-[36px] font-rblack">
              Active
            </Text>
          </View>

          <Text className= "text-[28px] font-rbold mt-8">
              Log in to Active
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e})}
            otherStyles="mt-8"
            keyboardType="email-address"
            placeholder="Email Address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e})}
            otherStyles="mt-4"
            placeholder="Password"
          />

          <TouchableOpacity
            onPress={() => router.push('/home')}
            className= {"self-end mt-4 px-2"}
          >
            <Text className= "text-base font-rmedium color-tertiary">
              Forgot Password
            </Text>       
          </TouchableOpacity>

          <CustomButton
              title="Login"
              handlePress={submit}
              containerStyles='w-full mt-6'
              isLoading={isSubmitting}
          />

          {/* <OAuth /> */}
        </View>

        <View className= {"flex-row justify-center py-4 gap-1"}>

          <Text className="text-base font-rmedium color-black">
            Don't have an account?
          </Text>

          <Link
            href={'/sign-up'}
            className= "text-base font-rmedium underline color-tertiary"
          >
            Sign Up Now
          </Link>     
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn