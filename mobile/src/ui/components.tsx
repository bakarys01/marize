import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDemo } from './demo-context';

export const colors = { background: '#F7F8F5', green: '#163F36', muted: '#66766E', lime: '#D9EF9F', line: '#E5EAE3', white: '#FFFFFF' };

export function Screen({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
        <View style={styles.row}><Text style={styles.brand}>marize<Text style={{ color: '#8BAF55' }}>.</Text></Text><View style={styles.badge}><Text style={styles.badgeText}>DÉMONSTRATION</Text></View></View>
        <View style={{ gap: 7 }}><Text accessibilityRole="header" style={styles.heading}>{title}</Text><Text style={styles.subtitle}>{subtitle}</Text></View>
        {children}
        <Text style={styles.footnote}>Données fictives · Aucun bracelet connecté</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  </SafeAreaView>;
}

export function Card({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <View style={[styles.card, dark && { backgroundColor: colors.green }]}>{children}</View>;
}
export function Button({ title, onPress, secondary = false, disabled = false }: { title: string; onPress: () => void; secondary?: boolean; disabled?: boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={({ pressed }) => [styles.button, secondary && styles.secondary, { opacity: disabled ? 0.5 : pressed ? 0.75 : 1 }]}><Text style={[styles.buttonText, secondary && { color: colors.green }]}>{title}</Text></Pressable>;
}
export function ChildPicker() {
  const { state, select } = useDemo();
  return <View style={styles.row}>{state.children.map(child => {
    const active = child.id === state.selectedChildId;
    return <Pressable key={child.id} accessibilityRole="button" accessibilityState={{ selected: active }} accessibilityLabel={`Sélectionner ${child.name}`} onPress={() => select(child.id)} style={[styles.childChip, active && { backgroundColor: colors.green, borderColor: colors.green }]}><View style={[styles.avatarSmall, { backgroundColor: child.color }]}><Text style={styles.initials}>{child.initials}</Text></View><Text style={[styles.childName, active && { color: 'white' }]}>{child.name}</Text></Pressable>;
  })}</View>;
}
export function SectionTitle({ children }: { children: ReactNode }) { return <Text accessibilityRole="header" style={styles.section}>{children}</Text>; }

export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  page: { padding: 24, paddingBottom: 36, gap: 22, maxWidth: 680, width: '100%', alignSelf: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, flexWrap: 'wrap' },
  brand: { fontSize: 28, fontWeight: '800', color: colors.green, letterSpacing: -1, flex: 1 },
  badge: { backgroundColor: '#E8EFDF', borderRadius: 8, paddingHorizontal: 9, paddingVertical: 6 },
  badgeText: { fontSize: 9, letterSpacing: 1, fontWeight: '800', color: colors.green },
  heading: { fontSize: 31, lineHeight: 37, fontWeight: '700', color: colors.green, letterSpacing: -0.8 },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 22 },
  section: { fontSize: 19, fontWeight: '700', color: colors.green },
  card: { backgroundColor: colors.white, borderRadius: 24, padding: 22, gap: 14, borderWidth: 1, borderColor: colors.line },
  button: { minHeight: 48, paddingVertical: 14, paddingHorizontal: 18, backgroundColor: colors.green, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  secondary: { backgroundColor: '#EDF2E8' },
  buttonText: { color: 'white', fontWeight: '700', fontSize: 14, textAlign: 'center' },
  childChip: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 9, paddingRight: 17, borderRadius: 28, borderWidth: 1, borderColor: colors.line, backgroundColor: 'white' },
  childName: { color: colors.green, fontSize: 15, fontWeight: '600' },
  avatarSmall: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.green, fontSize: 12, fontWeight: '800' },
  footnote: { fontSize: 12, lineHeight: 19, color: colors.muted, textAlign: 'center' },
  body: { fontSize: 14, color: colors.muted, lineHeight: 23 },
  value: { fontSize: 22, fontWeight: '700', color: colors.green },
});
