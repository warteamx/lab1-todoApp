
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
type Todo = {
  id: number;
  inserted_at: Date;
  task: string;
  is_completed: boolean;
};
// API fetcher function
async function fetchTodosApi() {
  const response = await fetch('http://localhost:3000/api/todo');
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
}

function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchTodosApi()
      .then(data => {
        if (isMounted) setTodos(data);
      })
      .catch(err => {
        if (isMounted) setError(err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  return { todos, loading, error };
}

export default function TodoIndexTab() {
  const { todos, loading, error } = useTodos();
console.log("TODOS", todos);
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Todo Index Tab</Text>
      {loading && <ActivityIndicator size="large" color="#888" />}
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      {!loading && !error && (
        <FlatList
          data={todos}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={{ padding: 8, borderBottomWidth: 1, borderColor: '#eee' }}>
              <Text style={{ fontWeight: 'bold' }}>{item.task}</Text>
              <Text>{item.inserted_at.toString()}</Text>
              <Text style={{ color: item.is_completed ? 'green' : 'gray' }}>
                {item.is_completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}