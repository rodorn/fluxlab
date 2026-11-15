export type Pytanie = {
  nazwa: string;
  etykieta: string;
  typ: "tekst" | "wybor" | "dlugi";
  opcje?: string[];
  opcjonalne?: boolean;
  podpowiedz?: string;
};

export const PYTANIA: Pytanie[] = [
  { nazwa: "firma", etykieta: "1. Pełna nazwa firmy", typ: "tekst", podpowiedz: "np. Jan Kowalski Sklep Rowerowy albo Rowery Max sp. z o.o." },
  { nazwa: "forma", etykieta: "2. Forma prawna", typ: "wybor", opcje: ["Jednoosobowa działalność gospodarcza", "Spółka z o.o.", "Spółka cywilna", "Inna spółka"] },
  { nazwa: "adres", etykieta: "3. Adres siedziby", typ: "tekst", podpowiedz: "ulica, numer, kod, miasto" },
  { nazwa: "nip", etykieta: "4. NIP (i REGON, jeśli chcesz podać)", typ: "tekst" },
  { nazwa: "email", etykieta: "5. E-mail do kontaktu w sprawach sklepu i danych", typ: "tekst" },
  { nazwa: "telefon", etykieta: "6. Telefon kontaktowy", typ: "tekst", opcjonalne: true },
  { nazwa: "sklep", etykieta: "7. Adres sklepu lub strony", typ: "tekst", podpowiedz: "np. https://twojsklep.pl" },
  { nazwa: "oferta", etykieta: "8. Co sprzedajesz", typ: "wybor", opcje: ["Towary fizyczne", "Produkty cyfrowe do pobrania", "Usługi", "Towary i usługi"] },
  { nazwa: "dostawa", etykieta: "9. Dostawa: metody, czas i koszt", typ: "dlugi", podpowiedz: "np. kurier InPost i DPD, 1-3 dni robocze, od 12 zł, odbiór osobisty bezpłatny" },
  { nazwa: "platnosci", etykieta: "10. Płatności: metody i operator", typ: "dlugi", podpowiedz: "np. BLIK, karta i szybki przelew przez Przelewy24, przelew tradycyjny" },
  { nazwa: "zwroty", etykieta: "11. Zwroty: odstąpienie od umowy i wyjątki", typ: "dlugi", podpowiedz: "np. 14 dni ustawowo; wyłączone towary robione na zamówienie i bielizna po rozpakowaniu" },
  { nazwa: "reklamacje", etykieta: "12. Reklamacje: adres do wysyłki i czas odpowiedzi", typ: "dlugi", podpowiedz: "np. adres siedziby, odpowiedź w 14 dni, a gdy trzeba, wymiana lub zwrot pieniędzy" },
  { nazwa: "konto", etykieta: "13. Konto klienta i newsletter", typ: "wybor", opcje: ["Jest konto i newsletter", "Jest tylko konto", "Jest tylko newsletter", "Zakupy bez konta, bez newslettera"] },
  { nazwa: "narzedzia", etykieta: "14. Narzędzia na stronie", typ: "dlugi", podpowiedz: "np. Google Analytics, Meta Pixel, Google Ads, czat Tidio, wtyczka Hotjar; napisz też, czego nie ma" },
  { nazwa: "odbiorcy", etykieta: "15. Komu przekazujesz dane klientów", typ: "dlugi", podpowiedz: "np. kurierom, biuru rachunkowemu, operatorowi płatności, firmie hostingowej, programowi do faktur" },
];
