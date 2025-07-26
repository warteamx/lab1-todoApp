import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
    View, 
    Text, 
    Button, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useAuth } from '@/providers/authProvider';
import { AvatarUpload, ProfileForm } from '@/components';
import { useProfile } from '@/api/profile.api';

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
            await Promise.all([
                refetch(),
                refreshProfile(),
            ]);
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
            <View style={styles.centerContainer}>
                <Text>Loading profile...</Text>
            </View>
        );
    }

    return (
        <ScrollView 
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.header}>
                <Text style={styles.title}>Profile</Text>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => setIsEditing(!isEditing)}
                >
                    <Text style={styles.editButtonText}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            </View>

            <AvatarUpload
                currentAvatarUrl={currentProfile?.avatar_url}
                onSuccess={handleAvatarUpdate}
            />

            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{session?.user.email}</Text>
                </View>
                
                {!isEditing ? (
                    <>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Username:</Text>
                            <Text style={styles.value}>
                                {currentProfile?.username || 'Not set'}
                            </Text>
                        </View>
                        
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Full Name:</Text>
                            <Text style={styles.value}>
                                {currentProfile?.full_name || 'Not set'}
                            </Text>
                        </View>
                        
                        {currentProfile?.website && (
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>Website:</Text>
                                <Text style={[styles.value, styles.link]}>
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

            <View style={styles.footer}>
                <Button
                    title="Sign out"
                    onPress={async () => await supabase.auth.signOut()}
                    color="#FF3B30"
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    editButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
    infoSection: {
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        flex: 1,
    },
    value: {
        fontSize: 16,
        color: '#333',
        flex: 2,
        textAlign: 'right',
    },
    link: {
        color: '#007AFF',
    },
    footer: {
        margin: 20,
        marginTop: 40,
    },
});

export default ProfileScreen;