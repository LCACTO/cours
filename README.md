# Maths 4e — Version claire + onglets Cours

Web app statique (HTML/CSS/JS) — React UMD + Babel (pas d'étape d'installation). Thème clair lisible, onglets Cours/Quiz dans chaque chapitre, 10 QCM par thème avec correction détaillée, progression simple.

## Lancer en local
Double-cliquez `index.html` (ou servez le dossier avec `python3 -m http.server`).

## Déployer sur GitHub Pages
1. Créez un repo (ex. `maths-4e`).
2. Uploadez **tous** les fichiers à la racine.
3. Settings → Pages → Source: **Deploy from a branch** ; Branch: `main` ; Folder: `/ (root)` → Save.

## Personnaliser
- Cours : `LESSONS` dans `app.js`
- Questions : `BANK` dans `app.js`
- Couleurs / styles : `style.css`
