import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/authProvider';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    <View flex={1} padding="lg">
      <View flex={1} justifyContent="center">
        <View marginBottom="xl">
          <Text variant="headlineMedium" color="textPrimary" align="center">
            ✅ Welcome to Your Tasks App ✅
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
          <View flexDirection="row" style={{ flexWrap: 'wrap', gap: 12 }}>
            <View flex={1}>
              <Link href={'/(user)/ui-demo/ui-demo'} asChild>
                <Button
                  title="🎨 UI Demo"
                  variant="outline"
                  size="small"
                  fullWidth
                />
              </Link>
            </View>

            <View flex={1}>
              <Link href={'/(user)/version'} asChild>
                <Button
                  title="📱 Version"
                  variant="outline"
                  size="small"
                  fullWidth
                />
              </Link>
            </View>

            <View flex={1}>
              <Link href={'/docs'} asChild>
                <Button
                  title="📚 Docs"
                  variant="outline"
                  size="small"
                  fullWidth
                />
              </Link>
            </View>

            <View flex={1}>
              <Link href={'/(user)/profile/profile'} asChild>
                <Button
                  title="👤 Profile"
                  variant="outline"
                  size="small"
                  fullWidth
                />
              </Link>
            </View>
          </View>
        </View>
      </View>

      <View
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        style={{ gap: 8 }}
        marginTop="lg"
      >
        <Text>WarTeamX © 2025</Text>
        <Link href={'https://github.com/warteamx/lab1-todoApp'} asChild>
          <Ionicons name="logo-github" size={24} color="black" />
        </Link>
      </View>
    </View>
  );
};

export default Index;
