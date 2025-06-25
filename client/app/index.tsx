import axios from "axios";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function Index() {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:3000")
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> Index Screen </Text>
      {data ? (
        <Text>{JSON.stringify(data, null, 2)}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
      <View style={{ marginTop: 20 }}>
        <View style={{ marginBottom: 10 }}>
          <Button
            title="Go to Login"
            onPress={() => router.push('/auth')}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Button
            title="Go to legal"
            onPress={() => router.push('/legal')}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Button
            title="Go to todo"
            onPress={() => router.push('/todo')}
          />
        </View>
      </View>
    </View>
  );
}
