# eatally design system

Żywa dokumentacja znajduje się w `design-system.html`. Uruchom `npm run dev` i otwórz `/design-system.html`.

## Zasada marki

Interfejs łączy charakter papierowego menu z tempem pracy kuchni. Newsreader odpowiada za nazwy dań i emocję, DM Sans za obsługę, a DM Mono za godziny, daty, numery i statusy.

## Tokeny

Wszystkie tokeny są dostępne jako CSS Custom Properties w `src/design-system.scss`:

- `--ea-ink`, `--ea-paper`, `--ea-white` — tekst, tło i powierzchnie;
- `--ea-yellow` — wyłącznie główne działanie lub aktywny wybór;
- `--ea-orange` — komunikaty, wyróżniki i fokus;
- `--ea-green` / `--ea-positive` — dostępność i sukces;
- `--ea-space-*`, `--ea-radius-*`, `--ea-shadow-*` — rytm, kształt i głębia.

## Reguły aplikacji zamówieniowej

1. Na ekranie powinna być jedna dominująca żółta akcja.
2. Nazwy dań używają Newsreader; opisy i kontrolki DM Sans; dane operacyjne DM Mono.
3. Tło aplikacji to `--ea-paper`, karty są białe, a atrament służy do nawigacji i finału zakupu.
4. Pomarańczowy informuje, zielony potwierdza. Nie używaj ich zamiennie.
5. Minimalny cel dotykowy ma 44 × 44 px; zawsze zachowuj widoczny `:focus-visible`.
6. Tekst przycisku opisuje rezultat: „Dodaj”, „Wybierz dostawę”, „Zamów i zapłać”.

## Przeniesienie do aplikacji

Najpierw skopiuj blok `:root` z `src/design-system.scss`, następnie przenoś komponenty `.ea-button`, `.ea-field`, `.ea-status`, `.ea-day-picker` i wzorzec `.dish-card`. Prefiks `ea-` ogranicza kolizje ze stylami istniejącej aplikacji.
