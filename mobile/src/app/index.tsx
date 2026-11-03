import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Button, Card, ChildPicker, Screen, SectionTitle, colors, styles } from '../ui/components';
import { useDemo } from '../ui/demo-context';
import { DemoMap } from '../ui/demo-map';
import { unreadCount } from '../domain/demo';

export default function Home() {
  const { state } = useDemo();
  const child = state.children.find(item => item.id === state.selectedChildId)!;
  const school = state.schools[child.id];
  return <Screen title={'Un petit lien,\nun grand quotidien.'} subtitle="Votre espace famille, à portée de main.">
    <Card dark><Text style={{ color: colors.lime, fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>BIENVENUE DANS VOTRE DÉMO</Text><Text style={{ color: 'white', fontSize: 22, fontWeight: '600', lineHeight: 30 }}>Découvrez le quotidien{ '\n' }avec Marize.</Text><Text style={{ color: '#C5D8CF', lineHeight: 21, fontSize: 13 }}>Explorez les fonctions avec deux profils fictifs. Aucun bracelet n’est associé.</Text></Card>
    <SectionTitle>Mes enfants</SectionTitle><ChildPicker />
    <DemoMap child={child} />
    <Card><View style={[styles.row, { justifyContent: 'space-between' }]}><Text style={styles.value}>{child.name}</Text><Text style={styles.body}>Batterie fictive · {child.battery} %</Text></View><Text style={{ color: colors.green, fontWeight: '600' }}>{child.place}</Text><Text style={styles.body}>Position simulée · {child.positionTime}</Text><Button title="Voir la localisation" onPress={() => router.push('/carte')} /></Card>
    <SectionTitle>À portée de main</SectionTitle>
    <Card><Text style={styles.value}>Un temps pour apprendre</Text><Text style={styles.body}>{school.enabled ? `Créneau simulé : ${school.start} – ${school.end}` : 'Le mode école est désactivé dans la démo.'}</Text><Button secondary title="Configurer le mode école" onPress={() => router.push('/ecole')} /></Card>
    <Card><Text style={styles.value}>{unreadCount(state)} alerte(s) à découvrir</Text><Text style={styles.body}>Des exemples pour explorer votre futur centre de notifications.</Text><Button secondary title="Consulter les alertes" onPress={() => router.push('/alertes')} /></Card>
  </Screen>;
}
