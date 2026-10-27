# Robotik erleben – Wirtschaftsschule Gunzenhausen

Webseite des Robotikkurses: https://marconicklas.github.io/robotik-wirtschaftsschule-gunzenhausen/

Einfache statische Seite für GitHub Pages. Keine Tracker, keine externen Schriften oder Skripte.

## Aufbau

| Datei | Inhalt |
|---|---|
| `index.html` | Die Seite |
| `projekte.json` | **Alle Inhalte**: Bereiche und Anwendungen |
| `bilder/` | Fotos (nur gute, freigegebene Bilder ohne erkennbare Personen) |
| `css/style.css`, `js/app.js` | Gestaltung und Anzeige – müssen für neue Inhalte nicht geändert werden |

## Neue Anwendung hinzufügen

1. Foto (ca. 900 px breit, JPG) in den Ordner `bilder/` hochladen: *Add file → Upload files*.
2. `projekte.json` öffnen, auf den Stift klicken und unter `"anwendungen": [` einen neuen Eintrag **ganz oben** einfügen:

```json
{
  "id": "kurzer-name-ohne-leerzeichen",
  "bereich": "spike",
  "titel": "Titel der Anwendung",
  "zeitraum": "November 2026",
  "text": "Zwei bis drei Sätze, was gebaut und programmiert wurde.",
  "bilder": [ { "datei": "bilder/dateiname.jpg", "text": "Bildunterschrift" } ],
  "links": []
},
```

   `bereich` ist `spike`, `fischertechnik` oder `pib`. Ohne Foto: `"bilder": []`. Ein neuer Bereich kommt unter `"bereiche"` dazu.
3. *Commit changes* – nach 1–2 Minuten ist der Eintrag online.

Ausblenden ohne Löschen: `"sichtbar": false` in den Eintrag schreiben.
