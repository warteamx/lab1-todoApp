import React from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useTodos, useUpdateTodo } from '@/api/todo.api';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

// Fast date formatter: "YYYY-MM-DD HH:mm"
const formatDateYMDHM = (value: any): string => {
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return ` 📅 ${yyyy}-${mm}-${dd} ⏰ ${hh}:${mi}`;
};

export default function TodoIndexTab() {
  const { data, isLoading, error } = useTodos();
  const updateTodo = useUpdateTodo();

  const handleMarkCompleted = (item: any) => {
    if (!item.is_complete) {
      updateTodo.mutate({ id: item.id, task: item.task, is_complete: true });
    }
  };

  return (
    <View flex={1} padding="lg" backgroundColor="background">
      <Text
        variant="headlineMedium"
        color="textPrimary"
        style={{ marginBottom: 16 }}
      >
        ToDo List
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
            <View marginBottom="md" maxWidth={800} alignSelf="center" width="100%">
              <Card padding="lg">
                <View
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <View flex={1}>
                    <Text variant="titleMedium" color="textPrimary">
                      {item.id} - {item.task}
                    </Text>
                    <Text
                      variant="bodySmall"
                      color="textSecondary"
                      style={{ marginTop: 4 }}
                    >
                      {formatDateYMDHM(item.inserted_at)}
                    </Text>
                    <Text variant="bodySmall" color="textTertiary">
                      Day{' '}
                      {Math.floor(
                        (new Date().getTime() -
                          new Date(item.inserted_at).getTime()) /
                        (1000 * 60 * 60 * 24)
                      )}{' '}
                      ago
                    </Text>
                    <Text
                      variant="labelMedium"
                      color={item.is_complete ? 'success' : 'textTertiary'}
                      style={{ marginTop: 8 }}
                    >
                      {item.is_complete ? 'Completed' : 'Pending'}
                    </Text>
                  </View>

                  <View marginLeft="md">
                    <Link href={`/(user)/todo/editTodo?id=${item.id}`} asChild>
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
      <View marginTop="lg" maxWidth={400} alignSelf="center" width="100%">
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
