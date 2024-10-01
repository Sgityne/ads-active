import { View, Text, Image } from "react-native";

const EmptyState = ({ image, title, subtitle }) => {
  return (
    <View className="justify-center items-center space-y-1 mb-2">
      <Image
        source={image}
        resizeMode="contain"
        className="w-[150px] h-[150px] mb-2"
      />

      <Text className="text-xl font-rbold text-black">
        {title}
      </Text>

      <Text className="text-sm text-center font-rbold text-gray-100">
        {subtitle}
      </Text>

    </View>
  );
};

export default EmptyState;