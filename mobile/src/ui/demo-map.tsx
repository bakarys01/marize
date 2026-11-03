import { StyleSheet, Text, View } from 'react-native';
import type { Child } from '../domain/demo';
import { colors } from './components';

export function DemoMap({ child }: { child: Child }) {
  return <View accessibilityLabel={`Plan fictif : ${child.name}, ${child.place}`} style={map.canvas}>
    <View style={map.park}><Text style={map.parkText}>PARC DES TILLEULS</Text><Text style={{ fontSize: 28 }}>♧</Text></View>
    <View style={[map.street, { top: '55%', transform: [{ rotate: '-18deg' }] }]} />
    <View style={[map.street, { top: '25%', transform: [{ rotate: '34deg' }] }]} />
    <View style={[map.crossStreet, { left: '64%' }]} />
    <View style={[map.block, { left: 20, bottom: 23 }]} />
    <View style={[map.block, { right: 18, top: 20, width: 45, height: 35 }]} />
    <View style={map.school}><Text style={map.schoolText}>ÉCOLE</Text></View>
    <View style={[map.pin, { left: child.id === 'lea' ? '45%' : '65%' }]}><View style={[map.avatar, { backgroundColor: child.color }]}><Text style={map.initials}>{child.initials}</Text></View><View style={map.point} /></View>
    <View style={map.label}><Text style={map.labelText}>PLAN FICTIF · NON GÉOGRAPHIQUE</Text></View>
  </View>;
}
const map = StyleSheet.create({
  canvas: { height: 260, borderRadius: 23, overflow: 'hidden', backgroundColor: '#EAEDE4', position: 'relative', borderWidth: 1, borderColor: colors.line },
  park: { position: 'absolute', backgroundColor: '#D7E7BE', width: '46%', height: 115, top: 8, left: 8, borderRadius: 30, alignItems: 'center', justifyContent: 'center', gap: 8 },
  parkText: { fontSize: 8, letterSpacing: 1, color: '#567B45', fontWeight: '700' },
  street: { position: 'absolute', width: '140%', left: '-20%', height: 24, backgroundColor: '#FFFFFF' },
  crossStreet: { position: 'absolute', height: '120%', width: 20, top: '-10%', backgroundColor: '#FFFFFF', transform: [{ rotate: '15deg' }] },
  block: { position: 'absolute', width: 70, height: 40, borderRadius: 10, backgroundColor: '#D8DBD0' },
  school: { position: 'absolute', right: 24, bottom: 53, width: 73, height: 53, backgroundColor: '#E5DCCB', borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  schoolText: { fontSize: 9, color: '#80745F', fontWeight: '700' },
  pin: { position: 'absolute', top: '36%', alignItems: 'center' },
  avatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 4, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  initials: { fontSize: 16, color: colors.green, fontWeight: '800' },
  point: { width: 8, height: 8, backgroundColor: colors.green, borderRadius: 4, marginTop: 4 },
  label: { position: 'absolute', bottom: 10, left: 10, padding: 7, backgroundColor: '#FFFFFFE8', borderRadius: 6 },
  labelText: { fontSize: 8, fontWeight: '700', letterSpacing: 0.5, color: colors.muted },
});
