# Application de bracelets connectés pour enfants

Version : 0.1 — document de cadrage initial

Date : 3 novembre 2026

Statut : proposition à valider avant développement

Un premier prototype iPhone de démonstration est disponible dans `mobile/`. Son périmètre et ses instructions de lancement sont décrits dans [prototype-iphone.md](prototype-iphone.md). Il utilise uniquement des données fictives et ne constitue pas une intégration au fabricant. Le nom « Marize » utilisé dans ce prototype est provisoire.

## 1. Objectif du projet

Créer une application mobile destinée aux parents, associée à des bracelets connectés pour enfants commercialisés sous la marque du porteur de projet et fournis par un fabricant.

L’application doit permettre aux parents de consulter la localisation de leurs enfants, recevoir les alertes des bracelets et gérer certaines fonctions à distance. Un mode école doit limiter les distractions de l’enfant pendant les cours, selon les possibilités du matériel.

Le nom commercial de la marque et de l’application reste à définir.

## 2. Éléments connus et décisions ouvertes

### Éléments établis

- Le projet comporte une application mobile et des bracelets physiques.
- Les bracelets seront fournis par un fabricant et porteront la marque du projet.
- Les fonctions souhaitées sont la géolocalisation, les alertes, le mode école et le contrôle parental à distance.
- Le fabricant a indiqué qu’un élément fourni côté application serait nécessaire au transfert des données des bracelets. La nature de cet élément reste à préciser.

### Points à confirmer

- Modèle de bracelet, connectivité, autonomie et capacités réelles.
- Rôle exact du fabricant dans l’hébergement et la transmission des données.
- Documentation du protocole, API ou SDK et conditions d’utilisation.
- Disponibilité d’un bracelet de test ou d’un simulateur.
- Plateformes mobiles ciblées : Android, iOS ou les deux.
- Pays de lancement, langues, budget, calendrier et modèle économique.

Les fonctions décrites ci-dessous constituent une cible produit. Elles ne prouvent pas que le bracelet les prend en charge.

## 3. Utilisateurs et responsabilités

| Acteur | Rôle prévu |
| --- | --- |
| Parent ou responsable autorisé | Associer un bracelet, consulter les informations de l’enfant, recevoir les alertes et gérer les réglages autorisés. |
| Enfant | Porter le bracelet et utiliser ses fonctions disponibles. Aucun compte mobile enfant n’est prévu dans cette première proposition. |
| Fabricant | Fournir le matériel, la documentation d’intégration et les moyens de tester les échanges. La répartition du support reste à définir. |
| Équipe du projet | Concevoir et exploiter l’application et les services placés sous sa responsabilité. |

La première version proposée repose sur un compte parent pouvant gérer plusieurs enfants. Le partage d’accès entre plusieurs responsables est à cadrer séparément.

## 4. Périmètre proposé pour une première version

### 4.1 Compte parent

- Créer un compte, se connecter et se déconnecter.
- Vérifier le moyen de contact utilisé pour le compte.
- Récupérer l’accès au compte en cas d’oubli du mot de passe.
- Consulter et modifier les informations du compte.
- Demander la suppression du compte et des données associées selon les règles qui seront définies.

Le mode de connexion et les moyens de récupération restent à choisir.

### 4.2 Enfants et association des bracelets

- Créer un profil enfant avec le minimum d’informations nécessaires, par exemple un prénom ou un pseudonyme.
- Associer un bracelet au profil après vérification du droit à le gérer.
- Afficher le bracelet associé et son état connu.
- Retirer ou transférer un bracelet selon une procédure sécurisée à définir.

Le mécanisme d’association dépendra du fabricant : code, QR code, validation physique ou autre procédure documentée. Un identifiant de bracelet seul ne doit pas permettre à un tiers d’en prendre le contrôle.

### 4.3 Localisation

- Afficher la dernière position reçue sur une carte.
- Afficher systématiquement la date et l’heure de cette position.
- Indiquer la précision ou la source de localisation lorsqu’elles sont disponibles.
- Distinguer une position récente, une position ancienne et l’absence de position.
- Demander une nouvelle position si le protocole du bracelet le permet.

L’application ne doit pas présenter une dernière position connue comme une position en direct. La fréquence de transmission dépendra notamment du matériel, du réseau, de l’autonomie et des conditions du fabricant. Le seuil définissant une position ancienne sera fixé après les tests.

### 4.4 Alertes et notifications

- Recevoir et afficher les événements effectivement transmis par le bracelet.
- Envoyer une notification au parent pour les catégories d’alertes retenues.
- Afficher un historique des alertes avec l’enfant concerné, le type d’événement et son horodatage.
- Permettre au parent de distinguer les alertes lues et non lues.
- Gérer les doublons de transmission afin d’éviter les notifications répétées pour un même événement.

Exemples à vérifier avec le fabricant : bouton SOS, batterie faible et perte de connexion. Aucun de ces événements n’est confirmé à ce stade. Une perte de connexion pourrait aussi être déduite côté serveur si les règles de communication le permettent.

La lecture d’une alerte dans l’application ne signifie pas qu’une intervention a été effectuée. Les notifications ne constituent pas une garantie de réception immédiate ni une prise en charge par un service d’urgence.

### 4.5 Mode école

- Définir des plages horaires par jour de la semaine.
- Demander l’activation ou la désactivation du mode école.
- Afficher les restrictions prévues et l’état de leur application sur le bracelet.
- Prendre en compte le fuseau horaire utilisé pour la programmation.

Les fonctions à limiter restent à identifier avec le fabricant. La disponibilité des fonctions d’urgence pendant le mode école est une exigence à examiner et à tester avant validation du matériel.

Une programmation enregistrée dans l’application ne doit pas être présentée comme appliquée au bracelet sans confirmation suffisante.

### 4.6 Contrôle parental à distance

Pour la première version, le contrôle parental désigne la gestion du mode école et des seuls réglages documentés et autorisés du bracelet. Il ne désigne pas un contrôle général des appareils ou des activités numériques de l’enfant.

Pour chaque modification distante, l’application doit distinguer autant que le protocole le permet : demande enregistrée, envoi en cours, réception ou application confirmée, échec et résultat inconnu après expiration du délai d’attente.

### 4.7 Hors du périmètre initial proposé

- Paiement, abonnement et boutique en ligne.
- Appels, messagerie, écoute à distance, caméra ou enregistrement audio.
- Historique détaillé des déplacements et zones géographiques d’alerte.
- Partage du suivi avec plusieurs responsables.
- Mesures de santé et analyse comportementale.
- Interface complète d’administration et de support.

Ces éléments pourront faire l’objet d’une décision ultérieure. Leur présence dans cette liste ne suppose pas leur disponibilité sur le matériel.

## 5. Parcours principaux

### Première utilisation

1. Le parent crée et vérifie son compte.
2. Il prend connaissance des informations sur l’utilisation des données.
3. Il crée un profil enfant.
4. Il associe le bracelet en suivant la procédure prévue.
5. L’application confirme l’association et affiche les premières données disponibles, ou explique leur absence.

### Consultation de la localisation

1. Le parent sélectionne un enfant depuis l’accueil.
2. Il consulte la dernière position et son heure de réception.
3. Il peut demander une actualisation si cette commande existe.
4. En cas d’indisponibilité, l’application conserve une indication explicite de l’ancienneté des données.

### Réception d’une alerte

1. Un événement est reçu et rattaché au bon bracelet.
2. Le serveur enregistre l’alerte et déclenche la notification prévue.
3. Le parent ouvre l’alerte et consulte son contexte.
4. L’alerte reste accessible dans l’historique pendant la durée de conservation définie.

### Programmation du mode école

1. Le parent choisit l’enfant et les créneaux souhaités.
2. L’application vérifie la cohérence des horaires.
3. La configuration est enregistrée et transmise selon le protocole disponible.
4. L’application affiche le résultat confirmé ou l’absence de confirmation.

## 6. Écrans envisagés

| Écran | Contenu principal |
| --- | --- |
| Connexion et inscription | Accès au compte, vérification et récupération. |
| Accueil | Enfants associés, dernier état connu et alertes récentes. |
| Association du bracelet | Instructions, vérification et résultat de l’association. |
| Fiche enfant et carte | Dernière position, horodatage et informations disponibles du bracelet. |
| Alertes | Liste, filtres simples et détail d’un événement. |
| Mode école | Créneaux, restrictions et état de synchronisation. |
| Réglages | Compte, notifications, bracelets et gestion des données. |

## 7. Architecture envisagée

Aucune architecture d’intégration n’est arrêtée avant réception de la documentation du fabricant. Deux scénarios principaux sont à vérifier.

### Scénario A — Envoi vers les services du projet

```text
Bracelet → service de réception du projet → stockage → application parent
Application parent → serveur du projet → bracelet (chemin de commande à confirmer)
```

Le fabricant pourrait attendre une adresse de serveur et des paramètres de communication. Il ne faut pas supposer que les bracelets utilisent HTTP : le protocole peut imposer un autre type de service.

### Scénario B — Passage par la plateforme du fabricant

```text
Bracelet ↔ plateforme du fabricant ↔ serveur du projet ↔ application parent
```

Le projet utiliserait alors les interfaces du fabricant pour recevoir les événements, consulter les données et envoyer les commandes disponibles.

### Composants à prévoir

- Application mobile pour les parents.
- Serveur applicatif pour les comptes, les autorisations et les fonctions métier.
- Adaptateur d’intégration au protocole ou à la plateforme du fabricant.
- Stockage des données nécessaires au service.
- Service de notifications mobiles.
- Fournisseur de cartes, à sélectionner selon les besoins et les coûts.
- Journalisation technique et supervision des échanges.

Les identifiants techniques confidentiels du fabricant doivent rester côté serveur. Une interface interne stable permettra de développer le prototype avec des données simulées puis de connecter le fabricant.

## 8. Données principales

| Entité | Informations envisagées |
| --- | --- |
| Compte parent | Identifiant interne, moyen de contact vérifié et paramètres du compte. |
| Profil enfant | Identifiant interne, prénom ou pseudonyme et parent autorisé. |
| Bracelet | Identifiant fabricant, association active et capacités connues. |
| Position | Coordonnées, heure de mesure, heure de réception et précision si disponible. |
| Alerte | Identifiant d’événement, type, bracelet, horodatage et état de lecture. |
| Configuration école | Créneaux, fuseau horaire, configuration demandée et état confirmé. |
| Commande | Type, auteur, bracelet cible, dates et état de traitement. |

La dernière position est nécessaire à la fonction carte ; conserver tout l’historique des déplacements constitue une décision distincte. Les durées de conservation restent à définir par catégorie de données.

## 9. Exigences de sécurité et de confidentialité

Ces éléments sont des exigences de conception. Ils ne constituent pas une validation juridique du service.

- Vérifier les droits d’accès pour chaque enfant, bracelet, position et commande.
- Authentifier les échanges avec le fabricant selon les mécanismes disponibles et refuser les événements non autorisés.
- Valider les messages reçus : structure, identifiants, coordonnées et dates.
- Protéger les communications et les données stockées selon l’architecture retenue.
- Conserver les secrets dans un mécanisme adapté, hors du code et de l’application mobile.
- Limiter les tentatives de connexion, d’association et d’envoi de commandes.
- Éviter les coordonnées et autres données sensibles dans les journaux et les notifications affichées sur écran verrouillé.
- Prévoir la révocation des accès, la dissociation d’un bracelet et le traitement des demandes de suppression.
- Définir les modalités d’hébergement, de sauvegarde, de conservation et d’accès du support.
- Faire examiner avant lancement les obligations applicables au traitement des données d’enfants et de localisation dans les pays ciblés.

## 10. Fiabilité et cas d’erreur

L’application doit expliquer les situations suivantes sans afficher de succès non confirmé :

- Bracelet éteint, déchargé ou sans réseau.
- Localisation indisponible, ancienne ou imprécise.
- Notifications refusées dans les paramètres du téléphone.
- Événements reçus plusieurs fois ou dans un ordre différent de leur émission.
- Commande non prise en charge, échouée ou sans confirmation.
- Service du fabricant ou serveur du projet indisponible.
- Bracelet déjà associé à un autre compte.
- Changement de fuseau horaire affectant le mode école.

Les objectifs chiffrés de disponibilité, de délai d’alerte et de fraîcheur des positions seront définis après mesure sur le matériel et le réseau réels.

## 11. Questions et documents attendus du fabricant

1. Quel élément attendez-vous de notre côté : adresse de serveur, API, webhook, application compilée ou autre ?
2. Les données vont-elles directement à nos services ou passent-elles par votre plateforme ?
3. Quel protocole utilisez-vous ? Pouvez-vous fournir sa documentation et des exemples de messages ?
4. Quelles API ou quels SDK sont disponibles, avec quelles versions, licences, limites et garanties de maintenance ?
5. Comment les bracelets et les services s’authentifient-ils ? Comment les communications sont-elles protégées ?
6. Comment associer, dissocier et transférer un bracelet de façon sécurisée ?
7. Quelles données de localisation sont disponibles, à quelle fréquence et avec quels horodatages ?
8. Quelles alertes sont émises ? Comment sont gérés les doublons, les accusés de réception et les retransmissions ?
9. Quelles commandes distantes sont disponibles et comment confirmer leur application ?
10. Que limite le mode école ? Où les horaires sont-ils stockés et que se passe-t-il sans réseau ?
11. Quelles fonctions d’urgence restent accessibles pendant le mode école ?
12. Quels réseaux, cartes SIM, abonnements et frais de plateforme sont nécessaires ?
13. Où les données sont-elles hébergées, qui y accède et comment sont-elles supprimées ou exportées ?
14. Peut-on disposer d’un bracelet de test, d’un compte de test et d’un interlocuteur technique ?
15. Comment sont gérées les mises à jour du firmware et la compatibilité entre modèles ?

## 12. Plan de réalisation proposé

| Étape | Livrable | Condition pour avancer |
| --- | --- | --- |
| Cadrage | Périmètre validé et décisions produit prioritaires. | Accord sur les fonctions de première version. |
| Maquettes | Parcours et écrans avec états normaux et erreurs. | Relecture des parcours par le porteur de projet. |
| Prototype simulé | Navigation et démonstration avec positions, alertes et commandes fictives clairement identifiées. | Parcours compréhensibles et cohérents. |
| Validation technique fabricant | Échanges documentés et essai de réception de données réelles. | Accès technique, matériel et capacités vérifiées. |
| Développement intégré | Application et serveur connectés aux bracelets. | Fonctions du périmètre testées sur matériel. |
| Pilote | Utilisation encadrée sur un petit groupe de test. | Anomalies bloquantes corrigées et conditions de lancement validées. |
| Préparation du lancement | Exploitation, support et distribution mobile préparés. | Validation produit, sécurité et obligations applicables. |

Le cadrage, les maquettes et le prototype simulé peuvent avancer avant la réponse du fabricant. Aucun budget ni délai ferme n’est fixé dans cette version du document.

## 13. Vérification et critères d’acceptation

Les règles métier seront couvertes par des tests unitaires, les échanges entre composants par des tests d’intégration et les parcours essentiels par des tests de bout en bout. La cible initiale de couverture automatisée est de 80 % minimum sur le code développé, complétée par des essais sur bracelet réel.

| Domaine | Résultat attendu |
| --- | --- |
| Autorisations | Un parent ne peut consulter ni commander le bracelet d’un autre compte. |
| Association | Une association non autorisée est refusée ; la procédure de transfert est vérifiée. |
| Localisation | La position est accompagnée de son heure ; les données anciennes sont signalées. |
| Alertes | Un même événement retransmis ne produit pas plusieurs alertes identiques. |
| Notifications | L’application explique quand la permission est désactivée ; la réception est testée sur téléphone réel. |
| Mode école | Les horaires et fuseaux sont cohérents ; l’état demandé reste distinct de l’état confirmé. |
| Commandes | Une commande sans confirmation n’est pas affichée comme appliquée. |
| Indisponibilité | Une panne ou une absence de réseau produit un état compréhensible. |
| Données | La révocation d’accès et les règles de suppression définies sont vérifiées. |

## 14. Décisions à prendre en priorité

1. Obtenir les documents techniques et un moyen de test du fabricant.
2. Confirmer Android, iOS ou les deux pour la première version.
3. Choisir les alertes prioritaires parmi celles réellement disponibles.
4. Définir les restrictions attendues du mode école.
5. Confirmer le modèle d’accès : un parent au lancement ou plusieurs responsables.
6. Définir le pays de lancement, le nom commercial et les contraintes de budget.
7. Valider ce périmètre avant de produire les maquettes détaillées.

## 15. Historique

| Version | Date | Évolution |
| --- | --- | --- |
| 0.1 | 3 novembre 2026 | Première formalisation à partir de `description.txt` et des échanges avec le porteur de projet. |
