import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/authProvider';
import { AvatarUpload, ProfileForm } from '@/components';
import { useProfile } from '@/api/profile.api';
import { View } from '@/components/ui/View/View';
import { Text } from '@/components/ui/Text/Text';
import { Button } from '@/components/ui/Button/Button';
import { Card } from '@/components/ui/Card/Card';

const ProfileScreen = () => {
  const { profile: authProfile, session, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Use tanstack query for profile data
  const { data: profile, isLoading, refetch } = useProfile();

  const currentProfile = profile || authProfile;

  console.log('Current Profile:', currentProfile);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetch(), refreshProfile()]);
    } finally {
      setRefreshing(false);
    }
  };

  const handleProfileUpdate = async () => {
    setIsEditing(false);
    await onRefresh();
  };

  const handleAvatarUpdate = async (newAvatarUrl: string) => {
    await onRefresh();
  };

  if (isLoading && !currentProfile) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text variant="bodyMedium" color="textPrimary">
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View padding="lg" backgroundColor="background">
        {/* Header */}
        <View
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="lg"
        >
          <Text variant="headlineMedium" color="textPrimary">
            Profile
          </Text>
          <Button
            title={isEditing ? 'Cancel' : 'Edit'}
            variant="secondary"
            size="medium"
            onPress={() => setIsEditing(!isEditing)}
          />
        </View>

        <AvatarUpload
          currentAvatarUrl={currentProfile?.avatar_url}
          onSuccess={handleAvatarUpdate}
        />

        {/* Profile Info */}
        <View marginTop="lg">
          <Card padding="lg">
            <View style={{ gap: 16 }}>
              <View
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text variant="titleMedium" color="textSecondary">
                  Email:
                </Text>
                <Text variant="bodyMedium" color="textPrimary">
                  {session?.user.email}
                </Text>
              </View>

              {!isEditing ? (
                <>
                  <View
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text variant="titleMedium" color="textSecondary">
                      Username:
                    </Text>
                    <Text variant="bodyMedium" color="textPrimary">
                      {currentProfile?.username || 'Not set'}
                    </Text>
                  </View>

                  <View
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text variant="titleMedium" color="textSecondary">
                      Full Name:
                    </Text>
                    <Text variant="bodyMedium" color="textPrimary">
                      {currentProfile?.full_name || 'Not set'}
                    </Text>
                  </View>

                  {currentProfile?.website && (
                    <View
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text variant="titleMedium" color="textSecondary">
                        Website:
                      </Text>
                      <Text variant="bodyMedium" color="interactive">
                        {currentProfile.website}
                      </Text>
                    </View>
                  )}
                </>
              ) : (
                <ProfileForm
                  initialData={{
                    username: currentProfile?.username || '',
                    full_name: currentProfile?.full_name || '',
                    website: currentProfile?.website || '',
                  }}
                  onSuccess={handleProfileUpdate}
                />
              )}
            </View>
          </Card>
        </View>

        {/* Sign Out Button */}
        <View marginTop="xl">
          <Button
            title="Sign out"
            variant="secondary"
            size="large"
            fullWidth
            onPress={async () => await supabase.auth.signOut()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
