import { useState } from 'react';
import { Pressable, Switch, Text, TextInput, View } from 'react-native';
import type { SchoolConfig } from '../domain/demo';
import { Button, Card, ChildPicker, Screen, colors, styles } from '../ui/components';
import { useDemo } from '../ui/demo-context';

const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function SchoolForm({ childId, initial }: { childId: string; initial: SchoolConfig }) {
  const { save } = useDemo();
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const change = (next: SchoolConfig) => { setForm(next); setMessage(''); };
  const submit = () => {
    try { save(childId, form); setError(false); setMessage('Simulation enregistrée pour cette session. Aucune commande n’a été envoyée au bracelet.'); }
    catch (caught) { setError(true); setMessage(caught instanceof Error ? caught.message : 'Vérifiez les horaires et les jours choisis.'); }
  };
  return <>
    <Card><View style={[styles.row, { justifyContent: 'space-between' }]}><Text style={styles.value}>Mode école</Text><Switch accessibilityLabel="Activer le mode école simulé" value={form.enabled} onValueChange={enabled => change({ ...form, enabled })} trackColor={{ true: '#749953', false: '#CCD3CA' }} /></View><Text style={styles.body}>Préparez un créneau de concentration. Les restrictions du bracelet restent à confirmer avec le fabricant.</Text></Card>
    <Card><Text style={styles.value}>Les jours d’école</Text><View style={styles.row}>{weekdays.map((day, index) => {
      const selected = form.days.includes(index + 1);
      return <Pressable key={day} accessibilityRole="button" accessibilityLabel={day} accessibilityState={{ selected }} onPress={() => change({ ...form, days: selected ? form.days.filter(value => value !== index + 1) : [...form.days, index + 1].sort() })} style={[styles.childChip, { padding: 11, minHeight: 44 }, selected && { backgroundColor: colors.lime }]}><Text style={styles.childName}>{day}</Text></Pressable>;
    })}</View><Text style={styles.body}>Horaires de démonstration · fuseau Europe/Paris</Text><View style={styles.row}>{(['start', 'end'] as const).map(field => <View key={field} style={{ flex: 1, gap: 8 }}><Text style={styles.body}>{field === 'start' ? 'Début' : 'Fin'}</Text><TextInput accessibilityLabel={field === 'start' ? 'Heure de début' : 'Heure de fin'} value={form[field]} onChangeText={value => change({ ...form, [field]: value })} placeholder="08:30" maxLength={5} autoCorrect={false} style={{ backgroundColor: colors.background, borderRadius: 12, padding: 15, fontSize: 22, color: colors.green, borderWidth: 1, borderColor: colors.line }} /></View>)}</View><Text style={styles.body}>Format 24 heures : HH:mm. Le début doit précéder la fin.</Text><Button title="Enregistrer la simulation" onPress={submit} />{message ? <Text accessibilityRole={error ? 'alert' : undefined} accessibilityLiveRegion="polite" style={[styles.body, error && { color: '#AD3B31' }]}>{message}</Text> : null}</Card>
    <Text style={styles.body}>La disponibilité du SOS et les fonctions limitées seront vérifiées sur le matériel avant toute utilisation réelle.</Text>
  </>;
}
export default function School() {
  const { state, resetRevision } = useDemo();
  return <Screen title="Place à la concentration." subtitle="Imaginez une routine adaptée aux journées d’école."><ChildPicker /><SchoolForm key={`${state.selectedChildId}-${resetRevision}`} childId={state.selectedChildId} initial={state.schools[state.selectedChildId]} /></Screen>;
}
