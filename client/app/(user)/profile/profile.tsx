import { supabase } from '@/lib/supabase';
import { View, Text, Button, Image } from 'react-native';
import { useAuth } from '@/providers/authProvider';

const ProfileScreen = () => {
  const { profile, session } = useAuth();

  console.log('👀 Profile:', profile);


  return (
    <View>
      <Text>Email: {session?.user.email}</Text>
     

      <View style={{ marginTop: 20, alignItems: 'center' }}>
            <Image
        source={{ uri: profile?.avatar_url || 'https://api.dicebear.com/9.x/bottts/svg' }}
        style={{ width: 150, height: 150 }}
      />
       <Text>Username: {profile?.username?? 'Unknown'}</Text>
      </View>


      <View style={{ marginTop: 20 }}>
      <Button
        title="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
      </View>
    </View>
  );
};

export default ProfileScreen;