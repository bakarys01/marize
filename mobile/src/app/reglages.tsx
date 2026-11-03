import { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Button, Card, Screen, colors, styles } from '../ui/components';
import { useDemo } from '../ui/demo-context';

export default function Settings() {
  const { reset } = useDemo();
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState('');
  return <Screen title="Votre espace, simplement." subtitle="Les informations utiles sur cette première version.">
    <Card><Text style={styles.value}>Marize · Prototype 0.1</Text><Text style={styles.body}>Le nom Marize est provisoire. Cette version permet de découvrir les parcours sur iPhone avant la connexion au fabricant.</Text></Card>
    <Card><Text style={styles.value}>Une démo locale</Text><Text style={styles.body}>Les enfants, positions et alertes sont fictifs. Aucun compte n’est créé et aucune donnée n’est transmise à un serveur.</Text><Text style={styles.body}>Vos changements restent en mémoire pendant la session. Ils sont perdus lorsque l’application est rechargée ou fermée complètement.</Text></Card>
    <Card><Text style={styles.value}>Bientôt, les bracelets</Text><Text style={styles.body}>L’association sécurisée, la localisation réelle et les notifications seront développées après validation du protocole du fabricant.</Text></Card>
    <Card><Text style={styles.value}>Recommencer la visite</Text><Text style={styles.body}>Retrouvez les alertes non lues et les réglages de départ.</Text><Button secondary title="Réinitialiser la démo" onPress={() => setConfirm(true)} />{message ? <Text accessibilityLiveRegion="polite" style={styles.body}>{message}</Text> : null}</Card>
    <Modal visible={confirm} transparent animationType="fade" onRequestClose={() => setConfirm(false)}><View style={modal.backdrop}><View accessibilityViewIsModal style={modal.box}><Text accessibilityRole="header" style={styles.value}>Revenir au début ?</Text><Text style={styles.body}>Les réglages simulés et l’état de lecture des alertes seront réinitialisés.</Text><Button title="Confirmer la réinitialisation" onPress={() => { reset(); setConfirm(false); setMessage('La démonstration a été réinitialisée.'); }} /><Button secondary title="Annuler" onPress={() => setConfirm(false)} /></View></View></Modal>
  </Screen>;
}
const modal = StyleSheet.create({ backdrop: { flex: 1, backgroundColor: '#102B2577', alignItems: 'center', justifyContent: 'center', padding: 24 }, box: { width: '100%', maxWidth: 420, backgroundColor: colors.white, borderRadius: 24, padding: 24, gap: 20 } });
