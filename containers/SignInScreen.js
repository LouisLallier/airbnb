import { useNavigation } from "@react-navigation/core";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("Louis456@mail.com");
  const [password, setPassword] = useState("Coucou");
  const [error, setError] = useState("");

  console.log(password);
  console.log(email);

  const submit = async () => {
    try {
      setError("");

      if (!email || !password) {
        setError("Remplir tous les champs");
        return;
      }

      const res = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email,
          password,
        }
      );

      const token = res.data.token;
      setToken(token);
    } catch (e) {
      const message = e.response.data.error;
      const statusCode = e.response.status;
      if (statusCode === 400) {
        setError(message);
      }
    }
  };

  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.mainContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="gray"
          style={styles.input}
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="gray"
          secureTextEntry={true}
        />
        {/*<Button*/}
        {/*  title="Sign in"*/}
        {/*  onPress={async () => {*/}
        {/*    const userToken = "secret-token";*/}
        {/*    setToken(userToken);*/}
        {/*  }}*/}
        {/*/>*/}
        <TouchableOpacity
          onPress={() => {
            submit();
            // setToken(userToken);
          }}
          style={styles.btn}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    marginVertical: 25,
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    borderBottomColor: "#ffbac0",
    borderBottomWidth: 2,
    height: 40,
    width: 300,
    marginTop: 40,
  },
  btn: {
    borderColor: "#ffbac0",
    borderWidth: 2,
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    margin: 40,
    borderRadius: 10,
  },
});
