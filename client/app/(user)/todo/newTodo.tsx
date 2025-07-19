import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, TextInput, Switch } from 'react-native';
import { useAuth } from '@/providers/authProvider';

export default function NewTodoTab() {

    const [task, setTask] = useState('');
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { session } = useAuth();

    const userJWT = session?.access_token;
    const JSWexpires = (session?.expires_at) ? new Date(session.expires_at * 1000).toLocaleString() : 'No expiration time';
    console.log("User JWT:", userJWT);
    console.log("JWT Expires At:", JSWexpires);

    const handleAddTodo = async () => {
        if (!task.trim()) return;
        setLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/todo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task, is_completed: isCompleted }),
            });
            if (!response.ok) throw new Error('Failed to add todo');
            const newTodo = await response.json();
            if (response.ok) {
                setTask('');
                setIsCompleted(false);
                // Optionally, you can handle the new todo item here, e.g., update a list or show a success message
                console.log('🤗 New Todo Added:', newTodo);
            }
        } catch (err) {
            setError('⚠️ Something went wrong while adding the todo. Try refreshing the page. Try again later.');
            console.error('Error adding todo:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View>
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>New Todo Tab</Text>
                <TextInput
                    value={task}
                    onChangeText={setTask}
                    placeholder="Enter task"
                    style={{ borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10 }}
                />
                <Switch
                    value={isCompleted}
                    onValueChange={setIsCompleted}
                    style={{ marginBottom: 10 }}
                />
                <Button title="Add Todo" onPress={handleAddTodo} disabled={loading} />
                {loading && <ActivityIndicator size="large" color="#888" />}
                {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
            </View>
            <Text> New Task Created </Text>
        </View>
    );
}