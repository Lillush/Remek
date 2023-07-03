# GAMER-MANAGER Applikáció - Információs oldal kockáknak!

---

## 1. Az alkalmazás célja

- Az alkalmazás feladata, hogy streameket, streamer schedule-okat, esport eseményeket tartson nyilván, játékokkal kapcsolatos híreket mutasson be a látogatóknak.

---

## 2. Az alkalmazás telepítése

- Előfeltételek: Chrome böngésző, Angular keretrendszer, NodeJS futtató-környezet, Git verziókezelő, Docker Desktop konténer-management alkalmazás.

- A célgépre le kell klónozni az adott GitHub repository tartalmát.

https://github.com/Strukturavaltas-FullstackAPI-2023/fsapi-remek-assignment-Lillush

- A VSCode alkalmazásban a terminal-ban be kell lépni a backend mappába, majd kiadni a Docker indítóparancsot:

  npm run docker:compose

- Az alkalmazás a Docker indulása után a http://localhost:3000/ - oldalon fut.

- Az integrál tesztek futtatásához nincs szükség külön Mongo telepítésére a gépre, a Dockerből fut a DB.

---

## 3. Jogosultságok az alkalmazás teszteléséhez:

- Admin:
  - mail: admin@mail.com
  - pw: admin1234
- Streamer:
  - mail: teststreamer@mail.com
  - pw: teststreamer
- User:
  - mail: testuser@mail.com
  - pw: testuser

---

## 4. A végpontok dokumentációja

Swagger UI:
Az alábbi URL-en érhető el a böngészőben: https://localhost:3000/api/api-docs

---

---

# User Story

A Gamer-Maneger egy streamek, streamer schedule-ok, esport események nyilvántartása, valamint aktuális videójátékokkal kapcsolatos híreket tekinthetnek meg a felhasználók.

A rendszerbe felhasználók regisztrálhatnak sima user-ként vagy streamer-ként, híreket olvashatnak, naptárakban, listákban láthatják az eSport eseményeket, valamint a Streamerek hozzáadhatják a naptárhoz a saját tervezett közvetítéseiket.

---

## Entitások

### User

Felhasználók, akik lehetnek sima érdeklődők, akik csak böngészni szeretnének, vagy lehetnek streamerek, akik megoszthatják a saját közvetítési menetrendjüket a nézeldőkkel.

### Stream

A streamerek által létrehozott, beállított közvetítések

### Event

ESport események, online vagy LAN formátumban a világ minden tájáról, több játékban!

### Article

Hírek a játékok, eSport események világából.

---

## Képernyők

### Home

A főoldal, az applikáció megnyitásakor ez az oldal jelenik meg, itt találhatók a hírek. A hírek címére kattintva egy új oldalon megnyílik a teljes cikk.

### Login

A felhasználó bejelentkezhet e-mail cím és jelszó megadásával.

### Regisztráció

Erre az oldalra a Login oldalon található linkről juthatunk. A felhasználó létrehozhatja a felhasználói fiókját, e-mail, jelszó, név, felhasználónév, és egyéb adatok megadásával.

### Admin

Az "ADMIN" role-ú felhasználó táblázatos formában hozzáfér az összes entitás adatbázisához, szerkesztheti, törölheti a sorokat, hozzáadhat új elemket.

### eSport Calendar

Itt találhatóak az eSport események listás, táblázatos formában.

### Schedule

Ezen az oldalon érhető el a streamerek naptárja. A színes napokra kattintva alul megnyílik az arra a napra ütemezett streamek listája. A jobb felső sarokban található gombbal (streamer role, bejelentkezés után) hozzáadható új esemény a naptárhoz.

### Streamerek

Ezen az oldalon listázódnak a közvetítők.

### Oldalpanel

A minden tartalom megjelenítő oldalon (home, eSport Calendar, Admin) a jobb oldali panelen lévő keresőmezővel tudunk keresést indítani.

A jobb oldali panelen lévő naptárban az eSport rendezvények jelennek meg, a színes napra kattintva lenyílik az esemény weblapjának linkje.
