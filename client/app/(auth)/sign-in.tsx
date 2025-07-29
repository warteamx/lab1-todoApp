import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { View } from '@/components/ui/View';
import { Text } from '@/components/ui/Text';
import { TextInput } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  return (
    <View
      flex={1}
      padding="lg"
      backgroundColor="background"
      justifyContent="center"
    >
      <Stack.Screen options={{ title: 'Sign in' }} />

      <View style={{ maxWidth: 400, alignSelf: 'center', width: '100%' }}>
        <Text
          variant="displaySmall"
          color="textPrimary"
          align="center"
          style={{ marginBottom: 8 }}
        >
          Welcome Back
        </Text>
        <Text
          variant="bodyLarge"
          color="textSecondary"
          align="center"
          style={{ marginBottom: 32 }}
        >
          Sign in to your account to continue
        </Text>

        <View style={{ gap: 20 }}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="yourmail@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            variant="outline"
          />

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Your password"
            secureTextEntry
            variant="outline"
          />

          <Button
            title={loading ? 'Signing in...' : 'Sign in'}
            variant="primary"
            size="large"
            fullWidth
            onPress={signInWithEmail}
            disabled={loading}
            loading={loading}
          />

          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <Text variant="bodyMedium" color="textSecondary">
              Don't have an account?{' '}
            </Text>
            <Link href="/sign-up">
              <Text variant="bodyMedium" color="interactive">
                Create an account
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
