# Implementace tlačítka pro zobrazení karty zaměstnance

Požadavek na přidání tlačítka pro zobrazení detailu zaměstnance byl implementován:

## Provedené změny

1. **Přidáno nové tlačítko ve sloupci Actions:**
   - Tlačítko je umístěno na požadované pozici - mezi typem spolupráce a ikonou pro úpravu (tužkou)
   - Použita ikona oka (EyeIcon) z knihovny Heroicons, která je standardně používána pro akce typu "zobrazit detail"

2. **Tooltip:**
   - Přidán tooltip s textem "Zobrazit kartu zaměstnance"
   - Tooltip se zobrazí při najetí myší na ikonu
   - Text je zobrazen na černém pozadí pro dobrou čitelnost

3. **Funkčnost:**
   - Tlačítko je implementováno jako odkaz (Link)
   - Po kliknutí přesměruje uživatele na URL ve formátu /employees/[id]
   - Navigace je okamžitá bez nutnosti načítání stránky (client-side routing)

4. **Vizuální styl:**
   - Modrá barva pro odlišení od ostatních akcí (editace v purpurové, smazání v červené)
   - Konzistentní velikost s ostatními ikonami pro jednotný vzhled
   - Efekt změny barvy při najetí myší pro lepší interaktivitu

5. **Oprava typů:**
   - Opraveno typování v stránce pro editaci zaměstnance pro kompatibilitu s Next.js 15
   - Použita async arrow funkce s inline typováním parametrů
   - Ošetřeno pro případ, kdy ID není dostupné

Všechny změny byly provedeny a odeslány do repozitáře.
