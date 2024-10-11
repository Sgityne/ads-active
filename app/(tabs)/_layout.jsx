import { Image, View, Text } from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import { icons } from '../../constants';
import { useGlobalContext } from '../../context/GlobalProvider';

const TabIcon = ({icon, color, name}) => {
  return (
    <View className={"pt-3 pb-4 items-center justify-center gap-1"}>
      <View className={"flex-row px-5 py-1 justify-center items-center"}>
        <Image
          source={icon}
          resizeMode='contain'
          tintColor={color}
          className="w-6 h-6"
        />
      </View>
      <Text className='text-xs font-iregular' style={{ color: '#000000' }}>
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && !isLoggedIn) return <Redirect href="/sign-in"/>;
  
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#24857E',
          tabBarInactiveTintColor: "#40D4CC",
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#CAC4D0',
            paddingHorizontal: 8,
            gap: 8,
            height: 80,
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon 
                icon={icons.home}
                color={color}
                name='Home'
              />
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: 'Progress',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon 
                icon={icons.progress}
                color={color}
                name='Progress'
              />
            ),
          }}
        />
        <Tabs.Screen
          name="active"
          options={{
            title: 'Active',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon 
                icon={icons.active}
                color={color}
                name='Active'
              />
            ),
          }}
        />
        {/* <Tabs.Screen
          name="social"
          options={{
            title: 'Social',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon 
                icon={icons.social}
                color={color}
                name='Social'
              />
            ),
          }}
        /> */}
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <TabIcon 
                icon={icons.profile}
                color={color}
                name='Profile'
              />
            ),
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout