
import { View, Text, ActivityIndicator, FlatList, Button } from 'react-native';
import { Link } from 'expo-router';
import { useTodos, useUpdateTodo } from '@/api/todo.api';


export default function TodoIndexTab() {
  const { data, isLoading, error } = useTodos();
  const updateTodo = useUpdateTodo();

  const handleMarkCompleted = (item: any) => {
    if (!item.is_complete) {
      updateTodo.mutate({ id: item.id, task: item.task, is_complete: true });
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Todo Index Tab</Text>
      {isLoading && <ActivityIndicator size="large" color="#888" />}
      {error && <Text style={{ color: 'red' }}>Error: {error.message }</Text>}
      {!isLoading && !error && (
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View style={{ padding: 8, borderWidth: 1,  borderColor: '#888' }}>
              <View>
                <Link href={`/todo/editTodo?id=${item.id}`} asChild>
                  <Text>✏️ Edit</Text>
                </Link>
              </View>
              <Text style={{ fontWeight: 'bold' }}>{item.id}- {item.task}</Text>
              <Text>{item.inserted_at.toLocaleString()}</Text>
              <Text> Day {Math.floor((new Date().getTime() - new Date(item.inserted_at).getTime()) / (1000 * 60 * 60 * 24))} ago </Text>
              <Text style={{ color: item.is_complete ? 'green' : 'gray' }}>
                {item.is_complete ? 'Completed' : 'Pending'}
              </Text>
              {!item.is_complete && (
                <Button title="Mark as Completed" onPress={() => handleMarkCompleted(item)} />
              )}
            </View>
          )}
        />
      )}
      {/* Button Add new Todo Modal */}
      <View style={{ marginTop: 10 }}>
        <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
          <Text>TEXT</Text>
          <Link href={'/(user)/todo/newTodo'} asChild>
            <Button title="➕ Add New Task" />
          </Link>
        </View>
      </View>
    </View>
  );
}