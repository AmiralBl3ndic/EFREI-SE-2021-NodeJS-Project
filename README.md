## Synopsis

Pour ce projet de Event-driven asynchronous programming, nous avons décidé de faire une application Web de prise de note. Bien qu’il en existe déjà plusieurs (tel que _Notion_ par exemple), nous aimerions concevoir notre projet web avec un ajout bien particulier et inédit : le versionning pour apporter certaines fonctionnalités du gestionnaire de versions **git** à des utilisateurs non techniques.
Quand quelqu’un modifie une note, c’est enregistré comme une modification, et le rendu finale correspond ainsi à la somme de ces modifications. Chaque modification sera associé à un utilisateur, et il est envisagé d’implémenter éventuellement du realtime. Nous souhaiterions également implémenter un moteur de recherche via MeilliSearch.

### Features

#### Must have

- Frontend fonctionnel
  - Création de compte utilisateur via un formulaire
  - Connexion à un compte via un formulaire
  - Déconnexion d’un compte via un bouton
  - Suppression d’un compte via un bouton avec confirmation
  - Consultation des notes sous forme de liste / grille
  - Création et modification de notes via un éditeur Markdown ou WYSIWYG (besoin de précisions et de consulter les composants existants pour la stack choisie)
  - Champ de recherche pour les notes de l’utilisateur connecté
- Backend fonctionnel
  - API REST CRUD pour les notes
    - Protégée par authentification
  - API REST CRUD pour comptes utilisateurs
  - API REST authentification des utilisateurs
    - Génération de tokens JWT signés pour l’authentification
    - Vérification de tokens et de la signature
  - Protection de routes par authentification requise
  - Persistance des données dans une base de données
  - Moteur de recherche full-text pour la recherche dans les notes de l’utilisateur connecté
- Architecture
  - Application containerizée
  - Architecture en docker-compose

#### Should have

- Frontend
  - Interface de partage
  - bouton + sélection d’exportation de fichier
    - Export HTML
    - Export Markdown
    - Export PDF
    - Export DOCX
  - Possibilité de créer une note en tant qu’utilisateur non authentifié, mais pas de la sauvegarder sans compte (intégration d’un call to action pour la création de comptes utilisateurs)
- Backend
  - Gestion d’accès

#### Nice to have

- Panneau d’administration avec métriques
  - Utilisateurs
  - Notes créées
- Publication de notes publiques en read-only via une URL auto-générée et partageable

### Stack technologique

- Frontend
  - **Vue.js**
    - Framework **Nuxt.js**
    - Gestion de l’état avec **VueX**
  - Style graphique façon Bootstrap
    - Framework CSS **Halfmoon**
  - Composant tiers pour l’éditeur WYSIWYG
  - Tests
    - Test unitaire avec **Mocha** et **Chai**
    - Test e2e avec **Cypress**
- Backend
  - **Node.js**
    - Framework **Nuxt.js**
    - Framework **Express**
  - **JWT**
  - SDK **Supabase**
  - SDK **MeiliSearch**
  - Test
    - Test unitaire avec **Mocha** et **Chai**
- Architecture
  - Application containerizée
    - **Docker**
    - **docker-compose**
  - Base de données PostgreSQL dans le cloud
    - Plateforme open source **Supabase**
  - Moteur de recherche full-text
    - Solution open-source **MeiliSearch**

### Rôles

- Camille

  - _Product Owner_
  - Architecture SI
  - Développement backend
    - Intégration dans l’architecture
    - API recherche full-text
  - Assistance développement frontend
  - Test frontend
  - Test backend

- Jules

  - _Scrum Master_
  - Développement frontend
  - Assistance développement backend
  - Assistance développement architecture
  - Test frontend

- Maximilien

  - Développement back
    - API gestion des notes
      - Modification de notes
  - Test backend

- Théo

  - Développement back
  - API gestion des utilisateurs
  - Assistance développement frontend
  - Test backend

- Elodie
  - Développement back
    - API gestion des notes
      - Création de notes
      - Lecture de notes
      - Suppression de notes
  - Test backend
