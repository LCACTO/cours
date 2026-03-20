# Maths 4e — Version claire + Cours détaillés

Web app statique (HTML/CSS/JS) — React UMD + Babel (aucune installation). Thème clair lisible, onglets Cours/Quiz, **cours structurés** (Prérequis, Idées-clés, Méthode, Exemples, Pièges, À retenir, Lien programme), **10 QCM** par thème avec correction détaillée, progression simple.

## Lancer en local
Double-cliquez `index.html` ou servez avec `python3 -m http.server` puis ouvrez `http://localhost:8000`.

## Déployer sur GitHub Pages
1. Créez un repo (ex. `maths-4e`).
2. Uploadez **tous** les fichiers à la racine du dépôt.
3. Settings → Pages → Source: **Deploy from a branch** ; Branch: `main` ; Folder: `/ (root)` → Save.

## Personnaliser
- Cours : objet `COURSES` dans `app.js`.
- Questions : objet `BANK` dans `app.js`.
- Couleurs / styles : `style.css`.
