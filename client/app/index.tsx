import { View, ActivityIndicator, Button } from 'react-native';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/authProvider';

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  }

// Index component - 
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Link href={'/(user)'} asChild>
          <Button title=" 👀 See Task List" />
        </Link>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
        <Link href={'/(user)/todo/newTodo'} asChild>
          <Button title="➕ Add New Task" />
        </Link>
      </View>
    </View>
  );
};

export default index;
