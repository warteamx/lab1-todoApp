import { View, Text, ActivityIndicator, Button } from 'react-native';
import React from 'react';
// import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/authProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }


  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Text>TEXT</Text>
        <Link href={'/(user)'} asChild>
          <Button title=" 👀 See Task List" />
        </Link>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Text>TEXT</Text>
        <Link href={'/(user)/todo/newTodo'} asChild>
          <Button title="➕ Add New Task" />
        </Link>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Button onPress={() => supabase.auth.signOut()} title="Sign out" />
      </View>
    </View>
  );
};

export default index;
