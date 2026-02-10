# Koskessa

Koskessa on karttapohjainen sovellusprototyyppi (MVP), jonka tarkoituksena on esittää koskikalastuskohteita listan, yksittäisen kohdenäkymän ja karttanäkymän avulla. Projekti sisältää web- ja mobiiliversion, jotka hyödyntävät yhteistä datamallia (JSON ja GeoJSON).

---

## Vaatimukset

- Node.js (suositus: LTS-versio)
- npm
- Mobiilitestausta varten:
  - Expo Go -sovellus **tai**
  - Android Studio / Xcode emulaattoria varten

---

## Web-sovelluksen käynnistäminen

1. Siirry web-kansioon:
```bash
cd web
```

2. Asenna riippuvuudet:
```bash
npm install
```

3. Käynnistä kehityspalvelin:
```bash
npm run dev
```

4. Avaa selain ja siirry annettuun osoitteeseen

---

## Mobiilisovelluksen käynnistäminen (Expo)

1. Siirry mobile-kansioon:
```bash
cd mobile
```

2. Asenna riippuvuudet:
```bash
npm install
```

3. Käynnistä Expo-kehityspalvelin:
```bash
npx expo start
```
