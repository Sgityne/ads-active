import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import EmptyState from '../components/EmptyState'
import { images } from '../constants';
import { router, usePathname } from 'expo-router';

const ProfileItem = ({profile}) => {
  const { username, avatar, $id } = profile;

  const pathname = usePathname()
  const [oprofile, setOProfile] = useState($id);

  return(
    <TouchableOpacity
      onPress={() => {
        
        if (pathname.startsWith("/vprofile")) router.setParams({ oprofile });
        else router.push(`/vprofile/${oprofile}`)
      }}
      className="w-[183px] h-[250] rounded-lg justify-center items-center space-y-2 px-4 py-8 mr-4 bg-gray-200"
    >
      <Image
        source={{ uri: avatar }}
        resizeMode='cover'
        className="w-[107.55] h-[100] rounded-full"
        />

      <View>
        <Text className="font-rbold text-base text-center">
          {username}
        </Text>

        {/* <TouchableOpacity
          //onPress={handlePress}
          activeOpacity={0.7}
          className={"bg-gray-200 border-2 border-black w-[120px] h-[36px] mt-7 justify-center items-center"}
        >
          <Text className= {`text-black text-base font-rbold text-center`}>
            Follow
          </Text>
        </TouchableOpacity> */}
      </View>
    </TouchableOpacity>

  )
}
  
const ProfileExplorer = ({ profile }) => {
  return (
    <FlatList
    data={profile}
    horizontal
    keyExtractor={(item) => item.$id}
    renderItem={({ item }) => (
      <ProfileItem profile={item}/>
    )}
    ListEmptyComponent={() => (
      <EmptyState
        image={images.searchPerson}
        title="No people found"
        subtitle="No profiles created yet"
      />
    )}
    />
  )
}

export default ProfileExplorer;