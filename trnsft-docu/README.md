# Trnsft Docu. ✦

Dépose tes fichiers et récupère-les en un seul fichier, dans plus de 100 extensions (PDF, Word, Excel, ZIP, 7z, ISO, MP3…). Tout se passe sur ton ordinateur : rien n'est envoyé en ligne.

## Contenu du dossier

| Fichier | Rôle |
|---|---|
| `index.html` | L'application complète (double-clic pour l'utiliser sans l'installer) |
| `manifest.webmanifest` | Nom, icônes et types de fichiers de l'appli installée |
| `sw.js` | Garde l'appli et ses outils sur le PC pour qu'elle marche hors ligne |
| `icons/` | Icônes du menu Démarrer et de la barre des tâches |

## Installer l'appli sur Windows (gratuit, sans rien coder)

Windows n'installe une application web que si elle est en ligne en HTTPS. GitHub Pages l'héberge gratuitement.

1. Crée un compte : <https://github.com/signup>
2. Crée un dépôt **public** nommé `trnsft-docu` : <https://github.com/new>
3. Sur la page du dépôt, clique sur **uploading an existing file**, glisse **le contenu** de ce dossier (`index.html`, `manifest.webmanifest`, `sw.js`, `README.md` et le dossier `icons`), puis **Commit changes**.
4. Va dans **Settings → Pages**. Sous *Build and deployment*, choisis **Deploy from a branch**, branche **main**, dossier **/ (root)**, puis **Save**.
5. Après une à deux minutes, l'appli est en ligne à l'adresse `https://TON-PSEUDO.github.io/trnsft-docu/`.
6. Ouvre cette adresse dans **Microsoft Edge**, puis clique sur le bouton **Installer l'appli** en haut de la page. Tu peux aussi passer par le menu **⋯ → Applications → Installer Trnsft Docu.**

L'appli apparaît alors dans le menu Démarrer, s'épingle à la barre des tâches, s'ouvre dans sa propre fenêtre, marche hors ligne et se désinstalle dans **Paramètres → Applications → Applications installées**. Tu peux aussi faire clic droit sur un fichier, puis **Ouvrir avec → Trnsft Docu.**

## Mettre à jour l'appli

1. Remplace `index.html` dans le dépôt GitHub.
2. Dans `sw.js`, change `trnsft-docu-v1` en `trnsft-docu-v2` (puis `v3`, etc.) et envoie-le aussi.

L'appli installée se met à jour seule à la prochaine ouverture avec Internet.

## Option : la publier sur le vrai Microsoft Store

1. Ouvre un compte développeur individuel (gratuit) : <https://storedeveloper.microsoft.com>
2. Dans le Partner Center (<https://partner.microsoft.com/dashboard>), va dans **Apps and games → New product → MSIX or PWA app** et réserve le nom « Trnsft Docu. ». Dans **Product identity**, note le *Package ID*, le *Publisher ID* et le *Publisher display name*.
3. Sur <https://www.pwabuilder.com>, colle l'adresse GitHub Pages de l'appli, choisis **Package for stores → Windows**, entre les trois valeurs notées, puis télécharge le paquet `.msix`.
4. Dans le Partner Center, crée une soumission. Envoie le `.msix`, des captures d'écran, une description et la classification d'âge, puis soumets. Microsoft vérifie l'appli, en général en quelques jours.

Guide officiel : <https://learn.microsoft.com/microsoft-edge/progressive-web-apps/how-to/microsoft-store>
