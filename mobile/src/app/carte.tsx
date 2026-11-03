import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Card, ChildPicker, Screen, styles } from '../ui/components';
import { useDemo } from '../ui/demo-context';
import { DemoMap } from '../ui/demo-map';

export default function MapScreen() {
  const { state } = useDemo();
  const child = state.children.find(item => item.id === state.selectedChildId)!;
  const [message, setMessage] = useState('');
  return <Screen title="Tout près, sur la carte." subtitle="Un aperçu de la future localisation du bracelet.">
    <ChildPicker /><DemoMap child={child} />
    <Card><Text style={styles.value}>{child.name} · {child.place}</Text><Text style={styles.body}>Dernière position fictive : {child.positionTime}</Text><View style={{ height: 1, backgroundColor: '#E5EAE3' }} /><Text style={styles.body}>Ce plan est une illustration. Il ne représente aucun lieu réel et ne suit aucun enfant.</Text><Button title="Simuler une actualisation" onPress={() => setMessage('Simulation terminée. La position fictive reste inchangée ; aucune requête n’a été envoyée à un bracelet.')} />{message ? <Text accessibilityLiveRegion="polite" style={styles.body}>{message}</Text> : null}</Card>
    <Text style={styles.body}>La position réelle et sa fréquence de mise à jour dépendront de l’intégration avec le fabricant.</Text>
  </Screen>;
}
