import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/authProvider';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';

const Index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

  return (
    <View flex={1} justifyContent="center" padding="lg">
      <View marginBottom="xl">
        <Text variant="headlineMedium" color="textPrimary" align="center">
          Welcome to Your To-Do App
        </Text>
        <Text
          variant="bodyLarge"
          color="textSecondary"
          align="center"
          style={{ marginTop: 8 }}
        >
          Manage your tasks efficiently
        </Text>
      </View>

      <View style={{ gap: 16 }}>
        <Link href={'/(user)'} asChild>
          <Button
            title="👀 See Task List"
            variant="primary"
            size="large"
            fullWidth
          />
        </Link>

        <Link href={'/(user)/todo/newTodo'} asChild>
          <Button
            title="➕Add New Task"
            variant="secondary"
            size="large"
            fullWidth
          />
        </Link>
      </View>
    </View>
  );
};

export default Index;
