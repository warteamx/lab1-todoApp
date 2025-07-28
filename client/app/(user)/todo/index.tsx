
import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useTodos, useUpdateTodo } from '@/api/todo.api';
import { ThemedView as View } from '@/components/ui/View';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function TodoIndexTab() {
  const { data, isLoading, error } = useTodos();
  const updateTodo = useUpdateTodo();

  const handleMarkCompleted = (item: any) => {
    if (!item.is_complete) {
      updateTodo.mutate({ id: item.id, task: item.task, is_complete: true });
    }
  };

  return (
    <View flex={1} padding="md" backgroundColor="background">
      <Text variant="headlineMedium" color="textPrimary" style={{ marginBottom: 16 }}>
        Todo List
      </Text>
      
      {isLoading && (
        <View flex={1} justifyContent="center" alignItems="center">
          <ActivityIndicator size="large" />
        </View>
      )}
      
      {error && (
        <View marginBottom="md">
          <Card backgroundColor="error" padding="md">
            <Text variant="bodyMedium" color="textOnPrimary">
              Error: {error.message}
            </Text>
          </Card>
        </View>
      )}
      
      {!isLoading && !error && (
        <FlatList
          data={data}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <View marginBottom="md">
              <Card padding="lg">
                <View flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                  <View flex={1}>
                    <Text variant="titleMedium" color="textPrimary">
                      {item.id} - {item.task}
                    </Text>
                    <Text variant="bodySmall" color="textSecondary" style={{ marginTop: 4 }}>
                      {item.inserted_at.toLocaleString()}
                    </Text>
                    <Text variant="bodySmall" color="textTertiary">
                      Day {Math.floor((new Date().getTime() - new Date(item.inserted_at).getTime()) / (1000 * 60 * 60 * 24))} ago
                    </Text>
                    <Text 
                      variant="labelMedium" 
                      color={item.is_complete ? "success" : "textTertiary"}
                      style={{ marginTop: 8 }}
                    >
                      {item.is_complete ? 'Completed' : 'Pending'}
                    </Text>
                  </View>
                  
                  <View marginLeft="md">
                    <Link href={`/todo/editTodo?id=${item.id}`} asChild>
                      <Text variant="labelMedium" color="interactive">
                        ✏️ Edit
                      </Text>
                    </Link>
                  </View>
                </View>
                
                {!item.is_complete && (
                  <View marginTop="md">
                    <Button 
                      title="Mark as Completed" 
                      variant="secondary"
                      size="small"
                      onPress={() => handleMarkCompleted(item)} 
                    />
                  </View>
                )}
              </Card>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      
      {/* Add new todo button */}
      <View marginTop="lg">
        <Link href={'/(user)/todo/newTodo'} asChild>
          <Button 
            title="➕ Add New Task" 
            variant="primary"
            size="large"
            fullWidth
          />
        </Link>
      </View>
    </View>
  );
}