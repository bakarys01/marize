import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button, Card, Screen, colors, styles } from '../ui/components';
import { useDemo } from '../ui/demo-context';
import { unreadCount } from '../domain/demo';

export default function Alerts() {
  const { state, read } = useDemo();
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const alerts = state.alerts.filter(item => !unreadOnly || !item.read);
  return <Screen title="Les petites nouvelles." subtitle={`${unreadCount(state)} alerte(s) non lue(s) · événements de démonstration`}>
    <View style={styles.row}>{[{ label: 'Toutes', value: false }, { label: 'Non lues', value: true }].map(filter => <Pressable key={filter.label} accessibilityRole="button" accessibilityState={{ selected: unreadOnly === filter.value }} onPress={() => setUnreadOnly(filter.value)} style={[styles.childChip, unreadOnly === filter.value && { backgroundColor: colors.lime }]}><Text style={styles.childName}>{filter.label}</Text></Pressable>)}</View>
    {alerts.length === 0 ? <Card><Text style={styles.value}>Tout est lu.</Text><Text style={styles.body}>Vous avez consulté toutes les alertes de démonstration.</Text></Card> : alerts.map(item => {
      const child = state.children.find(entry => entry.id === item.childId)!;
      return <Card key={item.id}><View style={[styles.row, { justifyContent: 'space-between' }]}><Text style={{ color: colors.green, fontWeight: '700' }}>{child.name} · {item.time}</Text>{!item.read && <Text style={{ color: '#57732A', fontSize: 11, fontWeight: '700' }}>NON LUE</Text>}</View><Text style={styles.value}>{item.title}</Text><Button secondary title={expanded === item.id ? 'Fermer le détail' : 'Voir le détail'} onPress={() => setExpanded(expanded === item.id ? null : item.id)} />{expanded === item.id && <><Text style={styles.body}>{item.detail}</Text><Text style={styles.footnote}>Événement fictif · Aucune notification réelle</Text>{!item.read && <Button title="Marquer comme lue" onPress={() => read(item.id)} />}</>}</Card>;
    })}
  </Screen>;
}
