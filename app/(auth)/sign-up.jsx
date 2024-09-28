import { ScrollView, View, Text, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { Link, router } from 'expo-router'
import { images } from '../../constants/';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import OAuth from '../../components/OAuth';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const {setUser, setIsLoggedIn } = useGlobalContext();

  const [isSubmitting, setisSubmitting] = useState(false)
  const [form, setform] = useState({
    username: "",
    email: "",
    password: "",
  })

  const submit = async () => {
    if(form.username === "" || form.email === "" || form.password === "") {
      Alert.alert('Error', 'Please fill in all fields');
    }

    setisSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username)
      setUser(result);
      setIsLoggedIn(true);

      router.replace('/home');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setisSubmitting(false)
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
              Sign up to Active
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setform({ ...form, username: e})}
            otherStyles="mt-8"
            placeholder="Username"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setform({ ...form, email: e})}
            otherStyles="mt-4"
            keyboardType="email-address"
            placeholder="Email Address"
          />
          
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setform({ ...form, password: e})}
            otherStyles="mt-4"
            placeholder="Password"
          />

          <CustomButton
              title="Sign Up"
              handlePress={submit}
              containerStyles='w-full mt-8'
              isLoading={isSubmitting}
          />

          <OAuth />

        </View>

        <View className= {"flex-row justify-center py-4 gap-1"}>
          <Text className="text-base font-rmedium color-black">
            Already have an account?
          </Text>
          
          <Link
            href={'/sign-in'}
            className= "text-base font-rmedium underline color-tertiary"
          >
            Login Now
          </Link>     
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp