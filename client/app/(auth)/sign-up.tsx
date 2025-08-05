import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Link, Stack } from 'expo-router';
import { supabase } from '@/lib/supabase';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { TextInput } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });

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
      <Stack.Screen options={{ title: 'Sign up' }} />

      <View style={{ maxWidth: 400, alignSelf: 'center', width: '100%' }}>
        <Text
          variant="displaySmall"
          color="textPrimary"
          align="center"
          style={{ marginBottom: 8 }}
        >
          Create Account
        </Text>
        <Text
          variant="bodyLarge"
          color="textSecondary"
          align="center"
          style={{ marginBottom: 32 }}
        >
          Sign up to get started
        </Text>

        <View style={{ gap: 20 }}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="jon@gmail.com"
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
            title={loading ? 'Creating account...' : 'Create account'}
            variant="primary"
            size="large"
            fullWidth
            onPress={signUpWithEmail}
            disabled={loading}
            loading={loading}
          />

          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <Text variant="bodyMedium" color="textSecondary">
              Already have an account?{' '}
            </Text>
            <Link href="/sign-in">
              <Text variant="bodyMedium" color="interactive">
                Sign in
              </Text>
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
