Szkic na 26.10 (NIE w app/). Źródło faktów: MF, „Certyfikaty KSeF”, https://ksef.podatki.gov.pl/informacje-ogolne-ksef-20/certyfikaty-ksef/ (opublikowano 01.11.2025, zmodyfikowano 21.07.2026), odczyt z VPS (curl) 19.10.2026 09:50. Oznaczenia [F1] do [F4] do usunięcia przy publikacji.

Adres: /strefa-wiedzy/certyfikat-ksef
Tytuł (49 zn.): Certyfikat KSeF: po co jest i jak go wyrobić | Fluxlab
Opis (152 zn.): Bez certyfikatu KSeF typu offline nie wystawisz faktury, gdy KSeF nie działa. Wyrobisz go w Aplikacji Podatnika KSeF, a ważny jest najwyżej 2 lata.
H1: Certyfikat KSeF: do czego służy i kiedy go wyrobić

Akapit 1 (wstęp, przykład):
We wtorek o 10:00 KSeF przestaje odpowiadać, a klient czeka na fakturę. Wystawisz ją offline, ale z drugim kodem QR, a ten kod wymaga certyfikatu KSeF typu offline. Jeśli wyrabiasz go dopiero w czasie awarii, nie zrobisz tego, bo wniosek składa się w samym KSeF. [F1, F3; wniosek w KSeF: F2]

H2: Dwa typy, dwa osobne certyfikaty
Typ 1 służy do logowania w KSeF, także z programu do faktur. Typ 2 (offline) podpisuje kod na fakturach w trybie offline24, przy niedostępności i w awarii. Jednego certyfikatu na oba cele wygenerować się nie da. [F3]

H2: Gdzie go wyrobić
W Aplikacji Podatnika KSeF albo przez API, po zalogowaniu Profilem Zaufanym, podpisem kwalifikowanym lub pieczęcią spółki. Certyfikat jest ważny najwyżej 2 lata, więc wpisz sobie datę wymiany. [F2, F4]

FAQ (4):

1. Czy certyfikat KSeF jest obowiązkowy?
   Do zwykłego wystawiania nie, logować się możesz też Profilem Zaufanym albo tokenem. Bez certyfikatu typu offline nie wystawisz jednak faktury w trybie offline ani w awarii. [F1, F3]
2. Czy pracownik może używać certyfikatu firmy?
   Tak. Spółka po zalogowaniu pieczęcią może pobrać kilka certyfikatów na swoje dane i przekazać je pracownikom; w KSeF widać wtedy spółkę, nie osobę. [F2]
3. Jak długo certyfikat jest ważny?
   Najwyżej 2 lata od wytworzenia albo od wskazanej daty początkowej. [F4]
4. Czy tokeny znikną z końcem 2026?
   Nie. MF zdecydowało, że tokeny zostają bezterminowo, a rozporządzenie zostanie znowelizowane. [strona F, sekcja „Certyfikaty KSeF a tokeny”]

Fakty ze źródła (dosłowny sens):
F1 Certyfikat jest wymagany do oznaczenia faktury kodem potwierdzającym tożsamość wystawcy w trybach offline24, offline (niedostępność) i awaryjnym; działa od 1.02.2026.
F2 Od lutego 2026 wniosek i pobranie w API KSeF 2.0 i Aplikacji Podatnika KSeF 2.0; logowanie Profilem Zaufanym, podpisem lub pieczęcią kwalifikowaną; spółka może pobrać wiele certyfikatów na swoje dane i przekazać pracownikom.
F3 Typ 1 do uwierzytelniania (sesja interaktywna i wsadowa), typ 2 offline do kodu na fakturze; generowane osobno, nie da się jednego na oba zastosowania.
F4 Ważny nie dłużej niż 2 lata od wytworzenia lub od wskazanej daty początkowej.

Linki w tekście: /strefa-wiedzy/faktura-gdy-ksef-nie-dziala (na „Wystawisz ją offline” w akapicie 1), /ksef-integracja (na „z programu do faktur” w H2 pierwszym), /slownik#ksef (pierwsze „KSeF” we wstępie).
Link przychodzący: z /strefa-wiedzy/faktura-gdy-ksef-nie-dziala na istniejącym słowie „certyfikatu KSeF typu offline” (linia 108) albo w FAQ „Po co certyfikat KSeF?” (linia 52), 0 nowych słów.
Sprawdzone 19.10: `ls app/strefa-wiedzy | grep -i certyfikat` puste; /ksef-integracja i lib/slownik.ts slug „ksef” istnieją. Bez numerów artykułów ustawy i rozporządzenia.
