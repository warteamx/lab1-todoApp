import axios from "axios"
import { useState, useEffect } from "react"
import { Text, View, Button } from "react-native"
import { useRouter } from 'expo-router'

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
      <Text> Login Screen </Text>
      {data ? (
        <Text>{JSON.stringify(data, null, 2)}</Text>
      ) : (
        <Text>Loading...</Text>
      )}

      <View style={{ marginBottom: 10 }}>
        <Button
          title="Go to User"
          onPress={() => router.push('/auth/user')}
        />
      </View>
    </View>
  );
}
