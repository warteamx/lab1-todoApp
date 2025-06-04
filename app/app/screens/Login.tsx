import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { Auth } from "aws-amplify";

// Ensure you have configured AWS Amplify in your project
// This typically involves calling Amplify.configure() with your AWS configuration
// import Amplify from 'aws-amplify';
// import awsConfig from './aws-exports'; // Adjust the path as necessary
// Amplify.configure(awsConfig);
// EXPO AUTH: https://docs.expo.dev/versions/latest/sdk/auth-session/
// https://docs.expo.dev/guides/authentication/

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => {
    try {
      const user = await Auth.signIn(email, password);
      Alert.alert("Success", `Welcome ${user.username}`);
    } catch (error: any) {
      Alert.alert("Login Error", error.message || "Unknown error");
    }
  };

  const handleMetaLogin = async () => {
    try {
      const result = await Auth.federatedSignIn({ provider: "Facebook" });
      console.log(result);
    } catch (error: any) {
      Alert.alert("Meta Login Error", error.message || "Unknown error");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "100%",
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: "100%",
          marginBottom: 20,
          paddingHorizontal: 10,
        }}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login with Email" onPress={handleEmailLogin} />

      <View style={{ marginVertical: 10 }} />

      <Button title="Login with Meta" onPress={handleMetaLogin} />
    </View>
  );
}
