
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useAuth } from '@/providers/authProvider';

type Todo = {
  id: number;
  inserted_at: Date;
  task: string;
  is_completed: boolean;
};
// API fetcher function
async function fetchTodosApi(yourAccessToken: string): Promise<Todo[]> {
  const response = await fetch('http://localhost:3000/api/todo', {
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `${yourAccessToken}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
}

// Custom hook to fetch todos
function useTodos() {
  const { session } = useAuth();
  const yourAccessToken = session?.access_token!;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchTodosApi(yourAccessToken)
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
              <Text style={{ fontWeight: 'bold' }}>{item.id}- {item.task}</Text>
              <Text>{item.inserted_at.toLocaleString()}</Text>
              <Text> Day {Math.floor((new Date().getTime() - new Date(item.inserted_at).getTime()) / (1000 * 60 * 60 * 24))} ago </Text>
              <Text style={{ color: item.is_completed ? 'green' : 'gray' }}>
                {item.is_completed ? 'Completed' : 'Pending'}
              </Text>
            </View>
          )}
        />
      )}
      { /* Button Add new Todo Modal */ }
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Add New Todo</Text>
        {/* Modal for adding new todo would go here */}
        </View>
    </View>
  );
}