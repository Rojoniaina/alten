Vous avez deux solution pour lancer l'application:

- Lancer avec docker
- Sans docker

## Lancer avec docker

Tout d'abord veillez installer docker (https://docs.docker.com/engine/install/).
Puis docker-compose (https://docs.docker.com/compose/install/) et lancer le.
Et dans le fichier .env du dossier api utilise cette DATABASE_URL et commente l'autre:

```
DATABASE_URL="mongodb://mongo:27017/alten-db"

```

Apres dans le racine du dossier lance la commande ci-dessous pour build nos image et lancer l'application:

```
docker-compose up --build

```

Enfin vous pouvez test l'application sur le lien: http://localhost:5173/

## Sans docker

Il faut installer mongodb, puis dans chaque dossier "api" et "front" lance la commande:

```
npm install

```

Aller danns le fichier .env du dossier api utilise cette DATABASE_URL et commente l'autre:

```
DATABASE_URL="mongodb://localhost:27017/alten-db"

```

Dans chaque dossier "api" et "front" lance la commande pour lancer le frontend et le backend:

```
npm run dev

```

Enfin vous pouvez test l'application sur le lien: http://localhost:5173/

## Créer un utilisateur

Pour pouvoir créer des produit sur le front vous devez créer un utilisateur avec l'email: admin@admin.com
