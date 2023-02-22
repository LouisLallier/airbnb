import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useState } from "react";
import { useNavigation } from "@react-navigation/core";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  const submit = async () => {
    try {
      setError("");
      // 1 - FRONT Vérifier que tous les champs sont remplis

      if (
        !email ||
        !username ||
        !password ||
        !confirmPassword ||
        !description
      ) {
        setError("Remplir tous les champs");
        return;
      }
      // 2 - FRONT Vérifier que les mdp sont identiques

      if (password !== confirmPassword) {
        setError("Les 2 mdp ne sont pas identiques !");
        return;
      }

      // alert("Vérifications passées ! ");
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        }
      );

      //si je reçois un token alors j'appelle la fonction setToken
      if (response.data) {
        console.log(response.data);
        setToken(response.data.token);
      }
    } catch (error) {
      // 3 - BACK  Vérifier que l'email soit dispo
      // 4 - BACK  Vérifier que le username soit dispo
      const message = error.response.data.error;
      const statusCode = error.response.status;

      // console.log(typeof error.response.status);
      // console.log(message);
      if (statusCode === 400) {
        setError(message);
      }
    }
    // setToken("39898DU983J8D9934");
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <TextInput
          textContentType="emailAddress"
          style={styles.input}
          value={email}
          placeholder="Your email"
          placeholderTextColor="gray"
          onChangeText={(input) => {
            setEmail(input);
          }}
        />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Your username"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(input) => {
            setPassword(input);
          }}
          placeholder="Your password"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          value={confirmPassword}
          onChangeText={(input) => {
            setConfirmPassword(input);
          }}
          placeholder="Confirm your password"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(input) => {
            setDescription(input);
          }}
          placeholder="Your description"
          placeholderTextColor="gray"
        />

        <Text style={{ color: "red", marginTop: 5 }}>{error}</Text>
        <TouchableOpacity
          onPress={() => {
            // alert("CLicked !");
            submit();
          }}
          style={styles.btn}
        >
          <Text>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text>Déja un compte ? Se Connecter.</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
