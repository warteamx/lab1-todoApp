import { Stack } from "expo-router";
import AuthProvider from '@/providers/authProvider';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack />
    </AuthProvider>
  );
}
