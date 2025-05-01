# Argent Bank API - Phase 2: Transactions

Ce document décrit les endpoints proposés pour la gestion des transactions dans l'API d'Argent Bank. Ces endpoints permettent aux utilisateurs de :

- Visualiser toutes leurs transactions pour le mois en cours, groupées par compte.
- Visualiser les détails d'une transaction spécifique.
- Ajouter, modifier ou supprimer des informations sur une transaction.

Les spécifications des endpoints suivent les directives de Swagger et sont incluses dans le fichier `swagger.yaml` du backend.

---

## Endpoints pour les Transactions

### 1. **Récupérer les transactions d'un utilisateur**

- **Méthode HTTP** : `GET`
- **Route** : `/user/transactions`
- **Description** : Permet de récupérer toutes les transactions d'un utilisateur pour le mois en cours, groupées par compte.
- **Paramètres** :
  - **Authorization** (header) : Token JWT (obligatoire).
  - **transactionType** (query) : Filtrer par type de transaction (facultatif).
  - **category** (query) : Filtrer par catégorie (facultatif).
  - **date** (query) : Filtrer par date spécifique au format `YYYY-MM-DD` (facultatif).
- **Réponses** :
  - `200` : Transactions récupérées avec succès.
  - `400` : Champs invalides.
  - `500` : Erreur interne du serveur.

---

### 2. **Récupérer les détails d'une transaction**

- **Méthode HTTP** : `GET`
- **Route** : `/user/transactions/{transactionId}`
- **Description** : Permet de récupérer les détails d'une transaction spécifique.
- **Paramètres** :
  - **Authorization** (header) : Token JWT (obligatoire).
  - **transactionId** (path) : ID de la transaction (obligatoire).
- **Réponses** :
  - `200` : Détails de la transaction récupérés avec succès.
  - `400` : Champs invalides.
  - `404` : Transaction non trouvée.
  - `500` : Erreur interne du serveur.

---

### 3. **Ajouter une nouvelle transaction**

- **Méthode HTTP** : `POST`
- **Route** : `/user/transactions`
- **Description** : Permet d'ajouter une nouvelle transaction.
- **Paramètres** :
  - **Authorization** (header) : Token JWT (obligatoire).
  - **Body** (JSON) :
    - `accountId` (string) : ID du compte associé (obligatoire).
    - `amount` (number) : Montant de la transaction (obligatoire).
    - `description` (string) : Description de la transaction (facultatif).
    - `category` (string) : Catégorie de la transaction (facultatif).
    - `transactionType` (string) : Type de transaction (obligatoire).
- **Réponses** :
  - `201` : Transaction créée avec succès.
  - `400` : Champs invalides.
  - `500` : Erreur interne du serveur.

---

### 4. **Modifier une transaction existante**

- **Méthode HTTP** : `PUT`
- **Route** : `/user/transactions/{transactionId}`
- **Description** : Permet de modifier les informations d'une transaction existante.
- **Paramètres** :
  - **Authorization** (header) : Token JWT (obligatoire).
  - **transactionId** (path) : ID de la transaction (obligatoire).
  - **Body** (JSON) :
    - `category` (string) : Nouvelle catégorie (facultatif).
    - `notes` (string) : Notes supplémentaires (facultatif).
- **Réponses** :
  - `200` : Transaction mise à jour avec succès.
  - `400` : Champs invalides.
  - `404` : Transaction non trouvée.
  - `500` : Erreur interne du serveur.

---

### 5. **Supprimer une transaction**

- **Méthode HTTP** : `DELETE`
- **Route** : `/user/transactions/{transactionId}`
- **Description** : Permet de supprimer une transaction existante.
- **Paramètres** :
  - **Authorization** (header) : Token JWT (obligatoire).
  - **transactionId** (path) : ID de la transaction (obligatoire).
- **Réponses** :
  - `200` : Transaction supprimée avec succès.
  - `400` : Champs invalides.
  - `404` : Transaction non trouvée.
  - `500` : Erreur interne du serveur.

---

## Instructions pour tester les endpoints

1. Assurez-vous que le serveur est en cours d'exécution en suivant les instructions du fichier principal `README.md` du backend.
2. Accédez à la documentation Swagger à l'adresse suivante : [http://localhost:3001/api-docs](http://localhost:3001/api-docs).
3. Testez les endpoints directement via l'interface Swagger.

---

## Notes supplémentaires

- Les transactions sont associées à des comptes spécifiques, et les utilisateurs doivent être authentifiés pour accéder à ces endpoints.
- Les catégories et types de transactions sont définis dans le fichier `swagger.yaml` pour garantir la cohérence des données.
