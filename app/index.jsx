import { TouchableOpacity, ScrollView, Text, View, Image } from 'react-native';
import { Redirect, router, Link } from 'expo-router';
import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from 'expo-status-bar'; |//  for futures implementations for dark mode

import { images } from "../constants";
import CustomButton from '../components/CustomButton';
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const {isLoading, isLoggedIn } = useGlobalContext

  if(!isLoading && isLoggedIn) return <Redirect href="/home"/>

  return (
    <SafeAreaView className= "bg-primary h-full">

      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        height:"100%"
        }}
      >
        <View className= "flex w-full justify-center grow space-y-12 px-4">
          
          <View className= "items-center space-y-2" >
            <Image
              source={images.logo}
              className= "w-[120px] h-[98px]"
              resizeMode='contain'
            />
            <Text className= "text-[28px] font-rblack" >
              Welcome to Active!
            </Text>
          </View>

          <View className= "space-y-4">
            <CustomButton
              title="Login"
              handlePress={() => router.push('/sign-in')}
              containerStyles='w-full'
            />

            <TouchableOpacity
              onPress={() => router.push('/sign-up')}
              activeOpacity={0.7}
              className={`rounded-lg min-h-[62px] justify-center items-center w-full border-2 border-secondary bg-primary`}
            >
              <Text className= {`text-secondary text-base font-rbold`}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View className= {"self-center py-4"}>
          <Link
            href={'/home'}
            className= "text-base font-rmedium underline color-tertiary"
        >
          Continue as a guest
          </Link>     
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
