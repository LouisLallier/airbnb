import {
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(res.data);
      } catch (e) {
        console.log(e.response.data.error);
      }
    };
    fetchData();
  }, []);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item._id)}
      renderItem={({ item }) => {
        console.log(item._id);
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate("Home", { id: item._id })}
          >
            <Image
              style={{ width: 380, height: 200 }}
              source={{ uri: item.photos[0].url }}
            />
            <Text>{item.price}</Text>
            <Text>{item.title}</Text>
            <Image
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={{ uri: item.user.account.photo.url }}
            />
          </TouchableOpacity>
        );
      }}
    />
  );
}
