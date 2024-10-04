import { Text, FlatList, TouchableOpacity, ImageBackground, Linking } from 'react-native'
import React from 'react'
import EmptyState from '../components/EmptyState'
import { icons } from '../constants';

const PostItem = ({posts}) => {
  const { title, thumbnail, post } = posts;

  const handlePress = () => {
    Linking.openURL(post);
  };

  return(
    <TouchableOpacity
      className="justify-end"
      onPress={handlePress}
    >
      <ImageBackground
        source={{uri: thumbnail}}
        className="w-[183px] h-[250px] mr-2 rounded-lg overflow-hidden border-2 border-tertiary shadow-lg shadow-black/40"
        resizeMode='cover'
      />
      <Text className="absolute px-4 py-6 color-primary rounded-lg text-base font-rbold text-wrap">
        {title}
      </Text>
      
    </TouchableOpacity>
  )
}
  
const Post = ({ posts }) => {
  return (
    <FlatList
    data={posts}
    horizontal
    keyExtractor={(item) => item.$id}
    renderItem={({ item }) => (
      <PostItem posts={item}/>
    )}
    ListEmptyComponent={() => (
      <EmptyState
        image={icons.searchPost}
        title="No tips found"
        subtitle="No tips created yet"
      />
    )}
  />
  )
}

export default Post;