import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useQueryClient } from '@tanstack/react-query';
import { Todo, useTodos, useUpdateTodo } from '@/api/todo.api';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

type ViewMode = 'all' | 'day' | 'week' | 'month';
type StatusFilter = 'all' | Todo['status'];
type ImportanceFilter = 'all' | Todo['importance'];

const formatDateYMDHM = (value: unknown): string => {
  const d = value instanceof Date ? value : new Date(value as string);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `📅 ${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ⏰ ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};

const FILTER_BUTTON_STYLE = { marginRight: 8, marginBottom: 8 };

export default function TodoIndexTab() {
  const [showFilters, setShowFilters] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<ViewMode>('day');
  const [statusFilter, setStatusFilter] =
    React.useState<StatusFilter>('pending');
  const [importanceFilter, setImportanceFilter] =
    React.useState<ImportanceFilter>('all');
  const [orderingTodoId, setOrderingTodoId] = React.useState<
    string | number | null
  >(null);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useTodos({
    view: viewMode === 'all' ? undefined : viewMode,
    status: statusFilter === 'all' ? undefined : statusFilter,
    importance: importanceFilter === 'all' ? undefined : importanceFilter,
    limit: 300,
  });
  const updateTodo = useUpdateTodo();

  const todos = useMemo(() => data ?? [], [data]);

  const persistDailyOrder = async(items: Todo[]) => {
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];
      await updateTodo.mutateAsync({
        id: item.id,
        task: item.task,
        is_complete: item.is_complete,
        status: item.status,
        importance: item.importance,
        display_order: index + 1,
      });
    }
    await queryClient.invalidateQueries({ queryKey: ['todos'] });
  };

  const moveTodo = async(sourceIndex: number, targetIndex: number) => {
    if (viewMode !== 'day') return;
    if (targetIndex < 0 || targetIndex >= todos.length) return;
    const reordered = [...todos];
    const [moved] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    setOrderingTodoId(moved.id);
    try {
      await persistDailyOrder(reordered);
    } finally {
      setOrderingTodoId(null);
    }
  };

  const handleMarkCompleted = (item: Todo) => {
    if (!item.is_complete) {
      updateTodo.mutate({
        id: item.id,
        task: item.task,
        is_complete: true,
        status: 'completed',
        importance: item.importance,
        display_order: item.display_order,
      });
    }
  };

  const renderFilterRow = (
    title: string,
    values: string[],
    selected: string,
    onPress: (value: string) => void
  ) => (
    <View marginBottom="sm">
      <Text
        variant="labelMedium"
        color="textSecondary"
        style={{ marginBottom: 8 }}
      >
        {title}
      </Text>
      <View flexDirection="row" style={{ flexWrap: 'wrap' }}>
        {values.map(value => (
          <Button
            key={`${title}-${value}`}
            title={value}
            size="small"
            variant={selected === value ? 'primary' : 'outline'}
            style={FILTER_BUTTON_STYLE}
            onPress={() => onPress(value)}
          />
        ))}
      </View>
    </View>
  );

  return (
    <View flex={1} padding="lg" backgroundColor="background">
      <Text
        variant="headlineMedium"
        color="textPrimary"
        style={{ marginBottom: 16 }}
      >
        ToDo List
      </Text>

      <View marginBottom="md" maxWidth={220}>
        <Button
          title={showFilters ? '▼ Filter' : '▶ Filter'}
          variant="outline"
          size="small"
          onPress={() => setShowFilters(prev => !prev)}
        />
      </View>

      {showFilters && (
        <Card padding="md" style={{ marginBottom: 12 }}>
          {renderFilterRow(
            'View',
            ['all', 'day', 'week', 'month'],
            viewMode,
            value => setViewMode(value as ViewMode)
          )}
          {renderFilterRow(
            'Importance',
            ['all', 'high', 'medium', 'low'],
            importanceFilter,
            value => setImportanceFilter(value as ImportanceFilter)
          )}
          {renderFilterRow(
            'Status',
            ['all', 'pending', 'in_progress', 'completed'],
            statusFilter,
            value => setStatusFilter(value as StatusFilter)
          )}
        </Card>
      )}

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
          data={todos}
          keyExtractor={item => String(item.id)}
          renderItem={({ item, index }) => (
            <View
              marginBottom="md"
              maxWidth={900}
              alignSelf="center"
              width="100%"
            >
              <Card padding="lg">
                <View
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <View flex={1}>
                    <Text variant="titleMedium" color="textPrimary">
                      {item.task}
                    </Text>
                    <Text
                      variant="bodySmall"
                      color="textSecondary"
                      style={{ marginTop: 6 }}
                    >
                      {formatDateYMDHM(item.inserted_at ?? item.created_at)}
                    </Text>
                    <Text
                      variant="bodySmall"
                      color="textTertiary"
                      style={{ marginTop: 4 }}
                    >
                      Importance: {item.importance}
                    </Text>
                    <Text
                      variant="labelMedium"
                      color="textPrimary"
                      style={{ marginTop: 6 }}
                    >
                      Status: {item.status}
                    </Text>
                  </View>

                  <View marginLeft="md" alignItems="flex-end">
                    <Link href={`/(user)/todo/editTodo?id=${item.id}`} asChild>
                      <Text variant="labelMedium" color="interactive">
                        ✏️ Edit
                      </Text>
                    </Link>
                    {viewMode === 'day' && (
                      <View marginTop="sm">
                        <Button
                          title="↑"
                          size="small"
                          variant="outline"
                          style={{ marginBottom: 6 }}
                          onPress={() => moveTodo(index, index - 1)}
                          disabled={index === 0 || orderingTodoId === item.id}
                        />
                        <Button
                          title="↓"
                          size="small"
                          variant="outline"
                          onPress={() => moveTodo(index, index + 1)}
                          disabled={
                            index === todos.length - 1 ||
                            orderingTodoId === item.id
                          }
                        />
                      </View>
                    )}
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
          ListEmptyComponent={
            <View marginTop="lg" alignItems="center">
              <Text variant="bodyMedium" color="textSecondary">
                No tasks found for selected filters.
              </Text>
            </View>
          }
        />
      )}

      <View marginTop="lg" maxWidth={420} alignSelf="center" width="100%">
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
