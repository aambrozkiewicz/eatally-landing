# eatally design system

Żywa dokumentacja znajduje się w `design-system.html`. Uruchom `npm run dev` i otwórz `/design-system.html`.

## Zasada marki

Typografia odpowiada panelowi eatally: font systemowy dla nagłówków, opisów i kontrolek, DM Sans 700 dla logo oraz systemowy monospace dla danych operacyjnych. Wspólne rodziny definiuje `src/typography.scss`.

## Tokeny

Wszystkie tokeny są dostępne jako CSS Custom Properties w `src/design-system.scss`:

- `--ea-ink`, `--ea-paper`, `--ea-white` — tekst, tło i powierzchnie;
- `--ea-yellow` — wyłącznie główne działanie lub aktywny wybór;
- `--ea-orange` — komunikaty, wyróżniki i fokus;
- `--ea-green` / `--ea-positive` — dostępność i sukces;
- `--ea-space-*`, `--ea-radius-*`, `--ea-shadow-*` — rytm, kształt i głębia.

## Reguły aplikacji zamówieniowej

1. Na ekranie powinna być jedna dominująca żółta akcja.
2. Nagłówki, nazwy dań, opisy i kontrolki używają fontu systemowego; godziny i numery monospace; logo DM Sans 700.
3. Tło aplikacji to `--ea-paper`, karty są białe, a atrament służy do nawigacji i finału zakupu.
4. Zielony potwierdza (`#317159` na `#DCF2EA`), czerwony oznacza błąd (`#A52A34` na `#F8D7DA`). Pomarańczowy pozostaje akcentem marki.
5. Minimalny cel dotykowy ma 44 × 44 px; zawsze zachowuj widoczny `:focus-visible`.
6. Tekst przycisku opisuje rezultat: „Dodaj”, „Wybierz dostawę”, „Zamów i zapłać”.

## Przeniesienie do aplikacji

Najpierw skopiuj blok `:root` z `src/design-system.scss`, następnie przenoś komponenty `.ea-button`, `.ea-field`, `.ea-status`, `.ea-day-picker` i wzorzec `.dish-card`. Prefiks `ea-` ogranicza kolizje ze stylami istniejącej aplikacji.

## Spójność z panelem

`src/interface.scss` definiuje wspólne wartości przycisków i statusów na podstawie panelu: żółty `#F6C945`, obramowanie `#CBD4CE`, fokus w kolorze żółtym, promienie 4 px dla statusów, 8 px dla przycisków, 9 px dla pól, 11 px dla kart i 18 px dla dużych powierzchni. Landing zachowuje akcje o wysokości 44–50 px. Przyciski mają stany hover, active, focus i disabled oraz obsługują ograniczenie animacji.

Landing używa wyłącznie dwóch wariantów przycisków: żółtego głównego i białego dodatkowego. Biały przycisk zachowuje białe tło na hover; zmienia się jedynie obramowanie i cień. Żółta akcja na hover przyciemnia się do `#F2C235`, zgodnie z formularzem rejestracji panelu, bez białej krawędzi i unoszenia.
