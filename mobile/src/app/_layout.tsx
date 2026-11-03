import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../ui/components';
import { DemoProvider, useDemo } from '../ui/demo-context';
import { unreadCount } from '../domain/demo';

function Navigation() {
  const { state } = useDemo();
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: colors.green, tabBarInactiveTintColor: '#829087', tabBarStyle: { backgroundColor: '#FFFFFF', borderTopColor: colors.line }, tabBarLabelStyle: { fontSize: 10, fontWeight: '600' } }}>
    <Tabs.Screen name="index" options={{ title: 'Accueil', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 23 }}>⌂</Text> }} />
    <Tabs.Screen name="carte" options={{ title: 'Carte', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>◎</Text> }} />
    <Tabs.Screen name="alertes" options={{ title: 'Alertes', tabBarBadge: unreadCount(state) || undefined, tabBarBadgeStyle: { backgroundColor: colors.lime, color: colors.green }, tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>♧</Text> }} />
    <Tabs.Screen name="ecole" options={{ title: 'École', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>▤</Text> }} />
    <Tabs.Screen name="reglages" options={{ title: 'Réglages', tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 22 }}>⚙</Text> }} />
  </Tabs>;
}
export default function Layout() {
  return <SafeAreaProvider><DemoProvider><StatusBar style="dark" /><Navigation /></DemoProvider></SafeAreaProvider>;
}
