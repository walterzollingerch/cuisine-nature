# Cuisine Nature – Claude Code Projekt

## Projektziel
Dieses Projekt ist eine mehrseitige Website für "Cuisine Nature", basierend auf einem Figma-Prototyp.
Das Ziel ist, das Projekt auf GitHub zu veröffentlichen und optional zu deployen.

## Aufgaben für Claude Code

1. **Git-Repository initialisieren**
   - `git init` im aktuellen Verzeichnis
   - `.gitignore` erstellen (node_modules, .DS_Store, etc.)
   - Ersten Commit erstellen mit allen HTML/CSS-Dateien

2. **GitHub-Repository erstellen**
   - Mit `gh repo create cuisine-nature --public` ein neues Repo erstellen
   - Falls `gh` nicht installiert: Anleitung zur Installation geben
   - Remote origin setzen und Code pushen

3. **Optional: Deployment**
   - GitHub Pages aktivieren (kostenloses Hosting direkt aus dem Repo)
   - Oder Netlify/Vercel Drop konfigurieren

## Projektstruktur
```
cuisine-nature/
├── index.html          # Homepage
├── produzentinnen.html # Produzent:innen-Seite
├── haus-am-see.html    # Haus am See Seite
├── produkte.html       # Produkte-Seite
├── styles.css          # Gemeinsames Stylesheet
└── CLAUDE.md           # Diese Datei
```

## Design-Entscheidungen
- Farben: Sage-Grün (#8BBF4E), Blau (#5B9BD5), Weiß
- Schrift: Playfair Display (Google Fonts)
- Layouts: CSS Grid, kein Framework
- Bilder: Unsplash Platzhalter (später durch echte Bilder ersetzen)

## GitHub Pages aktivieren
Nach dem Push:
1. GitHub Repo → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: main / root
4. Save → URL wird angezeigt (z.B. https://username.github.io/cuisine-nature)
