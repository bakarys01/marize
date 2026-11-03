# Marize — prototype de bracelet connecté pour enfants

Première application mobile en français pour explorer les parcours parents : profils enfants, localisation fictive, alertes et programmation du mode école.

**Démonstration uniquement** : aucun bracelet connecté, aucune géolocalisation réelle, aucun compte parent ni serveur métier. Les modifications restent en mémoire pendant la session. Le nom Marize est provisoire.

## Démarrer sur iPhone

Prérequis : Node.js 22.13+ sur la branche 22 et Expo Go compatible avec Expo SDK 58.

```powershell
cd mobile
npm.cmd ci
npx.cmd expo login --browser
npm.cmd start -- --go --clear
```

Connecter l’iPhone et le PC au même réseau Wi-Fi et utiliser le même compte Expo dans Expo Go et le terminal. Scanner le QR code avec l’appareil photo de l’iPhone.

Si l’ouverture automatique du navigateur échoue dans Git Bash, démarrer la connexion avec `BROWSER=none npx.cmd expo login --browser`, puis ouvrir manuellement le lien affiché et terminer l’authentification. Vérifier le compte avec `npx.cmd expo whoami`.

## Vérifications

Depuis `mobile` :

```powershell
npm.cmd run test:coverage
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run test:e2e
npm.cmd run export:ios
```

La couverture concerne la logique métier. Les tests de parcours utilisent Chrome ou Edge au format mobile ; ils ne remplacent pas la validation sur iPhone physique. L’export iOS ne produit pas une application autonome signée.

## Organisation

- `mobile/` : application Expo, logique métier et tests.
- `docs/projet.md` : cadrage, fonctionnalités et questions au fabricant.
- `docs/prototype-iphone.md` : lancement, limites et résultats de vérification.
- `description.txt` : description initiale du projet.

L’intégration au fabricant, l’authentification parent et les notifications réelles restent à développer. Les alertes de sécurité transitives connues sont décrites dans la documentation du prototype et doivent être réévaluées avant distribution publique.
