/*
 * FluxLab - reuzywalny szkielet kalkulatora lead-genowego (iframe/embed).
 * Buduje formularz z konfiguracji, liczy wynik, pokazuje podsumowanie
 * i bramkuje pelny raport za adresem e-mail (lead).
 *
 * Uzycie:
 *   FluxCalc.init({
 *     mount: "#app",
 *     brand: { nazwa, logo, kolor, kolorAkcent, stopka },
 *     tytul, opis,
 *     pola: [ { id, etykieta, typ, wartosc, min, max, krok, jednostka, opcje, pomoc } ],
 *     oblicz: function(values) { return { podsumowanie: [...], pelne: [...] } },
 *     lead: { tryb: "webhook"|"formspree"|"mailto"|"none", endpoint, temat, cta }
 *   });
 *
 * Bramka e-mail (lead) - tryb konfigurowalny, ZERO sekretow w kodzie:
 *   demo      -> nic nie wysyla, pokazuje komunikat (komunikatHtml) i odslania pelny wynik
 *   webhook   -> POST JSON na wlasny endpoint (URL podaje klient w configu)
 *   formspree -> POST na formspree-like endpoint (https://formspree.io/f/XXXX)
 *   mailto    -> otwiera klienta poczty z gotowa trescia
 *   none      -> brak bramki, pelny wynik od razu
 */
(function (root) {
  "use strict";

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      if (k === "class") e.className = attrs[k];
      else if (k === "html") e.innerHTML = attrs[k];
      else if (k === "text") e.textContent = attrs[k];
      else e.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) {
      if (c) e.appendChild(c);
    });
    return e;
  }

  function fmtPLN(x) {
    if (x === null || x === undefined || isNaN(x)) return "-";
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
      maximumFractionDigits: 0,
    }).format(x);
  }

  function fmtNum(x, jednostka) {
    if (x === null || x === undefined || isNaN(x)) return "-";
    var s = new Intl.NumberFormat("pl-PL", { maximumFractionDigits: 2 }).format(
      x,
    );
    return jednostka ? s + " " + jednostka : s;
  }

  function applyBrand(mount, brand) {
    brand = brand || {};
    if (brand.kolor) mount.style.setProperty("--fx-kolor", brand.kolor);
    if (brand.kolorAkcent)
      mount.style.setProperty("--fx-akcent", brand.kolorAkcent);
    if (brand.tlo) mount.style.setProperty("--fx-tlo", brand.tlo);
    if (brand.tekst) mount.style.setProperty("--fx-tekst", brand.tekst);
  }

  function budujPole(pole) {
    var wrap = el("div", { class: "fx-pole" });
    var lab = el("label", {
      class: "fx-label",
      for: "fx-" + pole.id,
      text: pole.etykieta,
    });
    wrap.appendChild(lab);

    var input;
    if (pole.typ === "select") {
      input = el("select", { id: "fx-" + pole.id, class: "fx-input" });
      (pole.opcje || []).forEach(function (o) {
        var opt = el("option", { value: String(o.wartosc), text: o.etykieta });
        if (String(o.wartosc) === String(pole.wartosc)) opt.selected = true;
        input.appendChild(opt);
      });
    } else {
      input = el("input", {
        id: "fx-" + pole.id,
        class: "fx-input",
        type: pole.typ || "number",
        value: pole.wartosc !== undefined ? String(pole.wartosc) : "",
      });
      if (pole.min !== undefined) input.min = pole.min;
      if (pole.max !== undefined) input.max = pole.max;
      if (pole.krok !== undefined) input.step = pole.krok;
      if (pole.jednostka) input.setAttribute("data-jednostka", pole.jednostka);
    }
    input.setAttribute("data-pole", pole.id);

    if (pole.jednostka && pole.typ !== "select") {
      var grupa = el("div", { class: "fx-input-grupa" }, [input]);
      grupa.appendChild(
        el("span", { class: "fx-jednostka", text: pole.jednostka }),
      );
      wrap.appendChild(grupa);
    } else {
      wrap.appendChild(input);
    }

    if (pole.pomoc)
      wrap.appendChild(el("small", { class: "fx-pomoc", text: pole.pomoc }));
    if (pole.widoczneGdy) {
      // Pole widoczne tylko gdy inne pole (id) ma podana wartosc.
      wrap.setAttribute("data-widoczne-id", pole.widoczneGdy.id);
      wrap.setAttribute(
        "data-widoczne-wartosc",
        String(pole.widoczneGdy.wartosc),
      );
    }
    return wrap;
  }

  function zbierzWartosci(mount) {
    var out = {};
    mount.querySelectorAll("[data-pole]").forEach(function (inp) {
      if (inp.disabled) return;
      var v = inp.value;
      out[inp.getAttribute("data-pole")] =
        inp.type === "number" || inp.tagName === "SELECT" ? Number(v) : v;
    });
    return out;
  }

  function renderWiersze(kontener, wiersze, wyroznionaForma) {
    kontener.innerHTML = "";
    wiersze.forEach(function (w) {
      if (w.naglowek) {
        kontener.appendChild(
          el("div", { class: "fx-wynik-naglowek", text: w.etykieta }),
        );
        return;
      }
      var klasa = "fx-wynik-wiersz" + (w.wyroznij ? " fx-wyroznij" : "");
      var wartosc =
        w.tekst !== undefined
          ? w.tekst
          : w.pln
            ? fmtPLN(w.wartosc)
            : fmtNum(w.wartosc, w.jednostka);
      kontener.appendChild(
        el("div", { class: klasa }, [
          el("span", { class: "fx-wynik-etykieta", text: w.etykieta }),
          el("span", { class: "fx-wynik-wartosc", text: wartosc }),
        ]),
      );
    });
  }

  function wyslijLead(lead, dane) {
    // Zwraca Promise. Bramka konfigurowalna, bez sekretow w kodzie.
    var payload = {
      email: dane.email,
      zrodlo: dane.zrodlo,
      wejscie: dane.wejscie,
      wynik: dane.wynik,
      ts: new Date().toISOString(),
    };
    if (lead.tryb === "webhook" || lead.tryb === "formspree") {
      if (!lead.endpoint)
        return Promise.reject(
          new Error("Brak endpointu bramki e-mail w konfiguracji."),
        );
      return fetch(lead.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      }).then(function (res) {
        if (!res.ok) throw new Error("Blad wysylki (" + res.status + ").");
        return true;
      });
    }
    if (lead.tryb === "fluxcrm") {
      var q = new URLSearchParams(window.location.search);
      var zgloszenie = {
        slug: lead.slug,
        token: lead.token,
        email: dane.email,
        imie: dane.imie || undefined,
        telefon: dane.telefon || undefined,
        wiadomosc: lead.wiadomosc ? lead.wiadomosc(dane) : undefined,
        zgody: { przetwarzanie: true },
        landing_page: lead.stronaZrodlowa || window.location.href,
        utm_source: q.get("utm_source") || undefined,
        utm_medium: q.get("utm_medium") || "kalkulator",
        utm_campaign: q.get("utm_campaign") || undefined,
        www: dane.www || "",
      };
      return fetch(lead.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zgloszenie),
      }).then(function (res) {
        if (!res.ok) throw new Error("spróbuj ponownie za chwilę.");
        return res.json();
      });
    }
    if (lead.tryb === "demo") {
      // Wersja demonstracyjna: nic nie jest wysylane nigdzie.
      return Promise.resolve(true);
    }
    if (lead.tryb === "mailto") {
      var temat = encodeURIComponent(lead.temat || "Zapytanie z kalkulatora");
      var body = encodeURIComponent(
        "Adres e-mail: " +
          dane.email +
          "\n\n" +
          "Wynik kalkulatora:\n" +
          JSON.stringify(dane.wynik, null, 2),
      );
      var adres = lead.endpoint || "";
      window.location.href =
        "mailto:" + adres + "?subject=" + temat + "&body=" + body;
      return Promise.resolve(true);
    }
    return Promise.resolve(true);
  }

  function init(cfg) {
    var mount =
      typeof cfg.mount === "string"
        ? document.querySelector(cfg.mount)
        : cfg.mount;
    if (!mount)
      throw new Error("FluxCalc: nie znaleziono elementu montowania.");
    mount.classList.add("fx-calc");
    applyBrand(mount, cfg.brand);

    var brand = cfg.brand || {};
    var lead = cfg.lead || { tryb: "none" };

    // Naglowek + branding
    var header = el("div", { class: "fx-header" });
    if (brand.logo) {
      header.appendChild(
        el("img", {
          class: "fx-logo",
          src: brand.logo,
          alt: brand.nazwa || "logo",
        }),
      );
    } else if (brand.nazwa) {
      header.appendChild(el("div", { class: "fx-marka", text: brand.nazwa }));
    }
    var tytuly = el("div", { class: "fx-tytuly" }, [
      el("h1", { class: "fx-tytul", text: cfg.tytul || "Kalkulator" }),
    ]);
    if (cfg.opis)
      tytuly.appendChild(el("p", { class: "fx-opis", text: cfg.opis }));
    header.appendChild(tytuly);
    mount.appendChild(header);

    // Formularz
    var form = el("form", { class: "fx-form" });
    (cfg.pola || []).forEach(function (p) {
      form.appendChild(budujPole(p));
    });
    function odswiezWidocznosc() {
      form.querySelectorAll("[data-widoczne-id]").forEach(function (w) {
        var sterujace = form.querySelector(
          '[data-pole="' + w.getAttribute("data-widoczne-id") + '"]',
        );
        var widoczne =
          !!sterujace &&
          String(sterujace.value) === w.getAttribute("data-widoczne-wartosc");
        w.hidden = !widoczne;
        w.querySelectorAll("[data-pole]").forEach(function (i) {
          i.disabled = !widoczne;
        });
      });
    }
    form.addEventListener("change", odswiezWidocznosc);
    var btn = el("button", {
      class: "fx-btn",
      type: "submit",
      text: cfg.ctaOblicz || "Oblicz",
    });
    form.appendChild(btn);
    odswiezWidocznosc();
    mount.appendChild(form);

    // Sekcja wyniku
    var sekcja = el("div", { class: "fx-wynik", hidden: "hidden" });
    var podsumowanie = el("div", { class: "fx-podsumowanie" });
    sekcja.appendChild(podsumowanie);

    var pelneBox = el("div", { class: "fx-pelne", hidden: "hidden" });
    var pelneWiersze = el("div", { class: "fx-pelne-wiersze" });
    pelneBox.appendChild(pelneWiersze);
    sekcja.appendChild(pelneBox);

    // Bramka e-mail
    var brama = el("div", { class: "fx-brama" });
    var stanWynik = { pelne: [], podsumowanie: [], wejscie: {} };

    if (lead.tryb && lead.tryb !== "none") {
      brama.appendChild(
        el("p", {
          class: "fx-brama-tekst",
          text:
            lead.tekst ||
            "Podaj e-mail, aby otrzymac pelny raport i indywidualna wycene.",
        }),
      );
      var leadForm = el("form", { class: "fx-lead-form" });
      var emailInp = el("input", {
        class: "fx-input",
        type: "email",
        required: "required",
        placeholder: "twoj@email.pl",
      });
      var leadBtn = el("button", {
        class: "fx-btn fx-btn-akcent",
        type: "submit",
        text: lead.cta || "Wyslij i pokaz pelny wynik",
      });
      var uslugiBox = null;
      if (lead.uslugi && lead.uslugi.length) {
        uslugiBox = el("fieldset", { class: "fx-uslugi" }, [
          el("legend", {
            class: "fx-label",
            text: lead.uslugiEtykieta || "Czego dotyczy zapytanie?",
          }),
        ]);
        lead.uslugi.forEach(function (u) {
          var cb = el("input", {
            type: "checkbox",
            value: u.etykieta,
            "data-usluga": u.id,
          });
          uslugiBox.appendChild(
            el("label", { class: "fx-check" }, [
              cb,
              el("span", { text: u.etykieta }),
            ]),
          );
        });
        leadForm.appendChild(uslugiBox);
      }
      emailInp.setAttribute("autocomplete", "email");
      emailInp.setAttribute("aria-label", "Adres e-mail");
      leadForm.appendChild(emailInp);
      var imieInp = null;
      var telInp = null;
      if (lead.kontakt) {
        imieInp = el("input", {
          class: "fx-input",
          type: "text",
          placeholder: "Imię (opcjonalnie)",
          autocomplete: "given-name",
          "aria-label": "Imię",
          maxlength: "100",
        });
        telInp = el("input", {
          class: "fx-input",
          type: "tel",
          placeholder: "Telefon (opcjonalnie)",
          autocomplete: "tel",
          "aria-label": "Telefon",
          maxlength: "40",
        });
        leadForm.appendChild(imieInp);
        leadForm.appendChild(telInp);
      }
      var pulapka = el("input", {
        type: "text",
        name: "www",
        tabindex: "-1",
        autocomplete: "off",
        class: "fx-pulapka",
        "aria-hidden": "true",
      });
      leadForm.appendChild(pulapka);
      if (lead.zgoda) {
        leadForm.appendChild(
          el("label", { class: "fx-check fx-zgoda" }, [
            el("input", { type: "checkbox", required: "required" }),
            el("span", { text: lead.zgoda }),
          ]),
        );
      }
      leadForm.appendChild(leadBtn);
      var status = el("div", { class: "fx-status", hidden: "hidden" });
      leadForm.appendChild(status);
      brama.appendChild(leadForm);

      leadForm.addEventListener("submit", function (ev) {
        ev.preventDefault();
        status.hidden = false;
        status.className = "fx-status";
        status.textContent = "Wysyłanie...";
        leadBtn.disabled = true;
        var wybrane = [];
        if (uslugiBox)
          uslugiBox.querySelectorAll("input:checked").forEach(function (c) {
            wybrane.push(c.value);
          });
        wyslijLead(lead, {
          email: emailInp.value,
          imie: imieInp ? imieInp.value.trim() : "",
          telefon: telInp ? telInp.value.trim() : "",
          uslugi: wybrane,
          www: pulapka.value,
          zrodlo: cfg.tytul || "kalkulator",
          wejscie: stanWynik.wejscie,
          podsumowanie: stanWynik.podsumowanie,
          wynik: stanWynik.pelne,
        })
          .then(function () {
            status.className = "fx-status fx-ok";
            if (lead.komunikatHtml) status.innerHTML = lead.komunikatHtml;
            else
              status.textContent =
                lead.komunikatOk ||
                "Dziekujemy! Odezwiemy sie z pelnym raportem.";
            pelneBox.hidden = false;
            brama.classList.add("fx-brama-zamknieta");
          })
          .catch(function (e) {
            status.className = "fx-status fx-blad";
            status.textContent = "Nie udało się wysłać: " + e.message;
            leadBtn.disabled = false;
          });
      });
      sekcja.appendChild(brama);
    } else {
      // Brak bramki - pelny wynik od razu.
      pelneBox.hidden = false;
    }

    mount.appendChild(sekcja);

    if (brand.stopka || cfg.stopka) {
      mount.appendChild(
        el("div", { class: "fx-stopka", html: brand.stopka || cfg.stopka }),
      );
    }

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var values = zbierzWartosci(mount);
      var wynik = cfg.oblicz(values);
      stanWynik.wejscie = values;
      stanWynik.podsumowanie = wynik.podsumowanie || [];
      stanWynik.pelne = wynik.pelne || [];
      renderWiersze(podsumowanie, wynik.podsumowanie || []);
      renderWiersze(pelneWiersze, wynik.pelne || []);
      sekcja.hidden = false;
      if (lead.tryb && lead.tryb !== "none") {
        pelneBox.hidden = true;
        brama.classList.remove("fx-brama-zamknieta");
        if (lead.zaznaczUslugi) {
          var doZaznaczenia = lead.zaznaczUslugi(values) || [];
          mount.querySelectorAll("[data-usluga]").forEach(function (c) {
            if (doZaznaczenia.indexOf(c.getAttribute("data-usluga")) >= 0)
              c.checked = true;
          });
        }
      }
      sekcja.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });

    return { mount: mount };
  }

  root.FluxCalc = { init: init, fmtPLN: fmtPLN, fmtNum: fmtNum };
})(typeof self !== "undefined" ? self : this);
