import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";

const ProfileScreen = () => {
  const { params } = useRoute();
  return (
    <View>
      <Text>user id : {params.userId}</Text>
    </View>
  );
};
export default ProfileScreen;
