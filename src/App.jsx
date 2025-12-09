import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Zap, Users, ArrowRight, ArrowLeft, RefreshCw, X, BookOpen, Layers, Activity, Clock, Search, Shuffle, Heart, Share2, Printer, Menu, Library, Home, Shield, Mic, FileText, Map, Lightbulb } from 'lucide-react';

// --- KONFIGURATION ---
const LOGO_URL = "/logo.jpeg"; 

// Farben (Polithea Design)
const BRAND_RED = "#E05D5D";     
const BRAND_YELLOW = "#FFD700";  
const BRAND_ORANGE = "#FF8C00";  
const BRAND_BLACK = "#1a1a1a";   

// Tailwind Klassen
const PRIMARY_COLOR = "bg-[#E05D5D]"; 
const PRIMARY_COLOR_HOVER = "hover:bg-[#c94545]";
const PRIMARY_TEXT_COLOR = "text-[#E05D5D]";
const ACCENT_COLOR_BG = "bg-[#FFD700]/10"; 
const ACCENT_COLOR_BORDER = "border-[#FFD700]/40";
const SELECTION_COLOR = "selection:bg-[#E05D5D]/30";
const GRADIENT_BG = "bg-gradient-to-br from-[#FFD700] via-[#FFB347] to-[#FF8C00]"; 

// --- HELPER: Textformatierung ---
const renderTextWithBold = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

// --- DATENBANK (TEIL B - PRAKTISCHE ÜBUNGEN) ---
const EXERCISE_DB = [
  // --- KATEGORIE: HIGH ENERGY & KOMPLEX ---
  {
    id: "space-cuts",
    title: "Raum-Schnitte (Space Cuts)",
    category: "Viewpoints & Energie",
    duration: "15-20 Min",
    tags: ["Raum", "Präsenz", "Tempo"],
    attributes: { focus: "extra", energy: "high", level: "advanced" },
    content: {
      context: "Eine fortgeschrittene Viewpoints-Übung. Sie trainiert, den Raum nicht nur zu füllen, sondern ihn durch Bewegung aktiv zu 'zerschneiden' und zu definieren.",
      instructions: [
        "**Phase 1 - Das Rasiermesser:** Alle bewegen sich im Raum. Das Grundtempo ist hoch. Stell dir vor, dein ganzer Körper ist eine scharfe Klinge.",
        "**Phase 2 - Der Widerstand:** Du bewegst dich nicht durch leere Luft, sondern durch eine zähe Masse. Jede Bewegung muss eine Intention haben.",
        "**Phase 3 - Die Geometrie:** Jede Richtungsänderung muss scharf, plötzlich und winklig sein. Keine Kurven.",
        "**Phase 4 - Der Schnitt:** Auf das Kommando 'Schnitt!' führen alle gleichzeitig eine extrem schnelle, raumgreifende Bewegung aus und frieren sofort ein.",
        "**Phase 5 - Das Freeze:** Im Freeze darf keine Energie verloren gehen. Die Spannung muss gehalten werden."
      ],
      variations: ["**Schwarm-Schnitte:** Ohne Kommando gleichzeitig stoppen.", "**Kontakt-Schnitte:** Haarscharf am Körper eines anderen vorbei."]
    }
  },
  {
    id: "rhythm-oppression",
    title: "Der Rhythmus der Unterdrückung",
    category: "Politisches Theater",
    duration: "20-30 Min",
    tags: ["Politik", "Körperarbeit", "Rhythmus"],
    attributes: { focus: "extra", energy: "high", level: "advanced" },
    content: {
      context: "Macht mechanische Arbeitsabläufe oder gesellschaftliche Zwänge körperlich erfahrbar. Verbindet die 'Maschine' mit Machtanalyse.",
      instructions: [
        "**Schritt 1:** Paare bilden. A ist 'das System', B ist 'der Mensch'.",
        "**Schritt 2:** A gibt einen strengen, repetitiven Rhythmus vor (Klatschen, Stampfen).",
        "**Schritt 3:** B muss sich in diesem Rhythmus bewegen/arbeiten und sich dem Takt unterwerfen.",
        "**Schritt 4:** A erhöht den Druck (Tempo, Lautstärke). B gerät in Stress.",
        "**Schritt 5:** B versucht, winzige Momente der Freiheit oder Rebellion zu finden (ein Blick, ein Innehalten), ohne aus dem Takt zu kommen."
      ],
      variations: ["**Kollaps:** Der Rhythmus wird so schnell, dass das System zusammenbricht."]
    }
  },
  {
    id: "status-chaos",
    title: "Status-Kampf im Chaos",
    category: "Status & Improvisation",
    duration: "15-20 Min",
    tags: ["Status", "Stress", "Szene"],
    attributes: { focus: "extra", energy: "high", level: "advanced" },
    content: {
      context: "Simuliert soziale Konflikte in Stresssituationen (z.B. überfüllter Bahnhof, Panik). Wie behalte ich Status im Chaos?",
      instructions: [
        "**Setup:** Raum eng begrenzen. Alle erhalten geheim einen Status (1-10).",
        "**Action:** Hohes Tempo, permanente Bewegung, niemand darf stehen bleiben.",
        "**Begegnung:** Bei jedem Kontakt sofort ein kurzes Status-Duell ausfechten (Blick, Ausweichen).",
        "**Ziel:** Den eigenen Status trotz des extremen äußeren Drucks durchhalten."
      ],
      variations: ["**Status-Wechsel:** Auf Kommando dreht sich die Hierarchie um."]
    }
  },
  
  // --- KATEGORIE: AUFWÄRMEN ---
  {
    id: "samurai",
    title: "Samurai",
    category: "Energie & Konzentration",
    duration: "10-15 Min",
    tags: ["Reaktion", "Kampfkunst", "Energie"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Weckt müde Gruppen sofort auf und synchronisiert die Aufmerksamkeit durch klare Impulse.",
      instructions: [
        "1. Kreisaufstellung. A hebt 'Schwert' über Kopf und ruft 'Hah!'.",
        "2. A schlägt nach unten und zeigt auf B.",
        "3. B reißt Hände hoch ('Hah!').",
        "4. Nachbarn von B schlagen seitlich in Bs Bauchhöhe ('Hah!').",
        "5. B übernimmt Führung und gibt weiter."
      ],
      variations: ["**Silent Samurai:** Ohne Töne, nur Atmen."]
    }
  },
  {
    id: "puking-kangaroo",
    title: "Kotzendes Känguru",
    category: "Reaktion & Spaß",
    duration: "10-20 Min",
    tags: ["Lachen", "Schnelligkeit", "Fehlerkultur"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Perfekt, um die Stimmung zu lockern und 'Coolness' abzulegen. Fehler machen ist erwünscht.",
      instructions: [
        "Kreis. Mitte zeigt auf jemanden und nennt Figur.",
        "**Toaster:** Mitte springt, Nachbarn bilden Kasten.",
        "**Elefant:** Mitte Rüssel, Nachbarn Ohren.",
        "**Känguru:** Mitte kotzt in Beutel, Nachbarn hüpfen weg.",
        "**James Bond:** Mitte Pose, Nachbarn schmachten an.",
        "Wer zu langsam ist, muss in die Mitte."
      ],
      variations: ["Eigene Figuren erfinden."]
    }
  },
  {
    id: "emotion-orchestra",
    title: "Gefühls-Orchester",
    category: "Ausdruck & Stimme",
    duration: "15 Min",
    tags: ["Chor", "Emotion", "Dynamik"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Teilnehmende werden zu Instrumenten einer Emotion. Trainiert stimmliche Vielfalt.",
      instructions: [
        "1. Gruppe im Halbkreis. Ein*e Dirigent*in.",
        "2. Zuweisung von Emotionen an Untergruppen (z.B. Wut, Trauer, Freude).",
        "3. Nur Laute/Gibberish nutzen.",
        "4. Dirigent*in steuert Lautstärke und Einsatz per Handzeichen.",
        "5. Ziel: Eine 'Symphonie der Gefühle'."
      ],
      variations: ["Lied nur mit Gefühls-Lauten singen."]
    }
  },
  {
    id: "one-word-story",
    title: "Ein-Wort-Geschichte",
    category: "Erzählen & Fokus",
    duration: "5-10 Min",
    tags: ["Improvisation", "Zuhören"],
    attributes: { focus: "intro", energy: "low", level: "beginner" },
    content: {
      context: "Fördert das Zuhören und 'Ja-Sagen' zu Angeboten. Die eigene Idee muss aufgegeben werden.",
      instructions: [
        "Im Kreis stehen.",
        "Gemeinsam eine Geschichte erzählen.",
        "Jeder darf immer nur **ein einziges Wort** sagen.",
        "Sofort auf das Wort davor reagieren, nicht vorplanen."
      ],
      variations: ["**Der Experte:** 4 Personen antworten synchron als eine Person."]
    }
  },
  {
    id: "the-machine",
    title: "Die Maschine",
    category: "Gruppendynamik",
    duration: "10-15 Min",
    tags: ["Kooperation", "Körper", "Sound"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Zeigt, wie individuelle Beiträge ein großes Ganzes ergeben.",
      instructions: [
        "Person 1 macht repetitive Bewegung + Geräusch.",
        "Person 2 dockt rhythmisch/logisch an.",
        "Alle kommen dazu, bis eine Riesen-Maschine entsteht.",
        "Joker variiert Tempo/Lautstärke."
      ],
      variations: ["Maschine produziert ein abstraktes Gefühl."]
    }
  },
  {
    id: "yes-lets",
    title: "Ja, genau! (Yes, Let's!)",
    category: "Aufwärmen",
    duration: "5 Min",
    tags: ["Impro", "Energie", "Bestätigung"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Trainiert radikale Akzeptanz und Energie.",
      instructions: [
        "Alle laufen durcheinander.",
        "Einer ruft Vorschlag: 'Lasst uns Bäume fällen!'",
        "Alle rufen 'Ja, genau!' und machen es sofort.",
        "Nächster Vorschlag."
      ],
      variations: ["Abstrakte Begriffe ('Seid rot!')."]
    }
  },
  {
    id: "wink-murder",
    title: "Blinzel-Mörder*in",
    category: "Konzentration",
    duration: "15 Min",
    tags: ["Spannung", "Wahrnehmung"],
    attributes: { focus: "extra", energy: "low", level: "beginner" },
    content: {
      context: "Schärft die Beobachtungsgabe in Stille.",
      instructions: [
        "Detektiv vor die Tür.",
        "Mörder wird bestimmt.",
        "Mörder tötet durch Zuwinkern.",
        "Getroffene sterben dramatisch.",
        "Detektiv muss Mörder finden."
      ],
      variations: ["Thematisches Sterben."]
    }
  },
  {
    id: "cross-circle",
    title: "Das Kreuz und der Kreis",
    category: "Gehirn-Jogging",
    duration: "5 Min",
    tags: ["Koordination", "Scheitern"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Fördert Unabhängigkeit der Gehirnhälften.",
      instructions: [
        "Rechte Hand: Kreis in die Luft.",
        "Linke Hand: Kreuz in die Luft.",
        "Beides gleichzeitig.",
        "Über das Scheitern lachen!"
      ],
      variations: ["Hand und Fuß kombinieren."]
    }
  },
  {
    id: "bear-poitiers",
    title: "Der Bär von Poitiers",
    category: "Körperspannung",
    duration: "10 Min",
    tags: ["Spannung", "Spaß"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Wechsel zwischen An- und Entspannung.",
      instructions: [
        "Bär zählt an der Wand. Holzfäller bewegen sich.",
        "Bär dreht sich und brüllt.",
        "Alle stellen sich tot (entspannt).",
        "Bär prüft Arme/Beine auf Spannung."
      ],
      variations: ["Mehrere Bären."]
    }
  },
  {
    id: "bomb-shield",
    title: "Bombe und Schutzschild",
    category: "Raum & Dynamik",
    duration: "10 Min",
    tags: ["Raum", "Dynamik"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Simuliert Massenbewegungen durch geheime Ziele.",
      instructions: [
        "Geheim wählen: 1 Bombe, 1 Schild.",
        "Ziel: Schild muss immer zwischen mir und Bombe sein.",
        "Bewegung startet gleichzeitig."
      ],
      variations: ["Umgekehrte Abstände."]
    }
  },
  {
    id: "colombian-hypnosis",
    title: "Kolumbianische Hypnose",
    category: "Vertrauen",
    duration: "15 Min",
    tags: ["Führung", "Macht"],
    attributes: { focus: "extra", energy: "low", level: "beginner" },
    content: {
      context: "Non-verbale Führung und Hingabe.",
      instructions: [
        "A hält Hand vor Gesicht von B.",
        "B muss Abstand exakt halten.",
        "A führt B durch den Raum (hoch, tief, drehen)."
      ],
      variations: ["Gegenseitige Hypnose."]
    }
  },
  {
    id: "budge",
    title: "Drängelkreis / Rutsch",
    category: "Reaktion",
    duration: "10 Min",
    tags: ["Reaktion", "Platzmangel"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Metapher für Verdrängung.",
      instructions: [
        "Kreis auf Stühlen. Mitte ruft 'Rutsch!' zu Person.",
        "Person muss wegrennen.",
        "Nachbarn rücken auf, Lücke wandert.",
        "Mitte versucht Platz zu klauen."
      ],
      variations: ["Ohne Stühle."]
    }
  },
  {
    id: "zip-zap-boing",
    title: "Zip Zap Boing",
    category: "Fokus",
    duration: "5-10 Min",
    tags: ["Impuls", "Energie"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Energiefokussierung.",
      instructions: [
        "Zip: Nachbar.",
        "Zap: Quer durch Kreis.",
        "Boing: Blocken.",
        "Blickkontakt ist Pflicht!"
      ],
      variations: ["Zoom (Richtungswechsel)."]
    }
  },
  {
    id: "glass-cobra",
    title: "Die Gläserne Kobra",
    category: "Gruppendynamik",
    duration: "15 Min",
    tags: ["Vertrauen", "Blind"],
    attributes: { focus: "intro", energy: "low", level: "beginner" },
    content: {
      context: "Gruppe als ein Organismus.",
      instructions: [
        "Polonaise. Alle blind außer Kopf.",
        "Steuerung durch Impulse auf Schulter.",
        "Nicht abreißen lassen."
      ],
      variations: ["Führungswechsel."]
    }
  },
  {
    id: "human-knot",
    title: "Der Menschliche Knoten",
    category: "Problemlösung",
    duration: "15 Min",
    tags: ["Kontakt", "Kooperation"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Abbau von Berührungsängsten.",
      instructions: [
        "Hände über Kreuz greifen.",
        "Knoten entwirren ohne loszulassen.",
        "Miteinander reden!"
      ],
      variations: ["Stumm."]
    }
  },
  {
    id: "racing-chairs",
    title: "Rhythmus mit Stühlen",
    category: "Kooperation",
    duration: "15 Min",
    tags: ["Stress", "Team"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Kooperation unter Ressourcenmangel.",
      instructions: [
        "Alle auf Stühlen in Reihe. 1 Stuhl zu viel.",
        "Freien Stuhl von hinten nach vorne reichen.",
        "Boden berühren verboten."
      ],
      variations: ["Wettkampf."]
    }
  },
  {
    id: "count-to-20",
    title: "Zählen bis 20",
    category: "Zuhören",
    duration: "10 Min",
    tags: ["Timing", "Ruhe"],
    attributes: { focus: "intro", energy: "low", level: "beginner" },
    content: {
      context: "Kollektives Gespür trainieren.",
      instructions: [
        "Augen zu. Gemeinsam bis 20 zählen.",
        "Keine Absprachen.",
        "Wenn zwei gleichzeitig: Zurück auf 1."
      ],
      variations: ["Rückwärts."]
    }
  },
  
  // --- KATEGORIE: IMAGE THEATRE (PRAXIS) ---
  {
    id: "great-game-power",
    title: "Das große Spiel der Macht",
    category: "Image Theatre",
    duration: "30-45 Min",
    tags: ["Analyse", "Visuell", "Politik"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Analyse von Machtverhältnissen im Raum.",
      instructions: [
        "Objekte in der Mitte (Stuhl, Tisch, Flasche).",
        "Aufgabe: 'Arrangiere so, dass ein Stuhl der Mächtigste ist.'",
        "Stummes Verändern nacheinander.",
        "Diskussion: Warum wirkt es so?"
      ],
      variations: ["Menschen ins Bild stellen."]
    }
  },
  {
    id: "real-to-ideal",
    title: "Vom Realen zum Idealen Bild",
    category: "Image Theatre",
    duration: "45-60 Min",
    tags: ["Vision", "Veränderung", "Politik"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Entwicklung von Lösungsstrategien durch Bilder.",
      instructions: [
        "1. **Bild der Unterdrückung (Ist):** Problem darstellen.",
        "2. **Bild der Befreiung (Soll):** Utopie darstellen.",
        "3. **Bild des Übergangs:** Wie kommen wir von A nach B?"
      ],
      variations: ["Dynamisierung (Bewegung hinzufügen)."]
    }
  },
  {
    id: "complete-image",
    title: "Vervollständige das Bild",
    category: "Image Theatre",
    duration: "10-15 Min",
    tags: ["Spontaneität", "Assoziation"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Training der schnellen visuellen Assoziation.",
      instructions: [
        "2 Personen frieren in Pose ein.",
        "Eine geht, eine kommt und ergänzt zu neuem Sinn.",
        "Schneller Wechsel."
      ],
      variations: ["Thematisch (Arbeitswelt)."]
    }
  },
  {
    id: "status-cards",
    title: "Status Karten",
    category: "Status",
    duration: "20-30 Min",
    tags: ["Hierarchie", "Komödie"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Sichtbarmachung von sozialen Hierarchien.",
      instructions: [
        "Karte an der Stirn (Wert unbekannt).",
        "Andere entsprechend ihrem Wert behandeln.",
        "Eigenen Wert erraten."
      ],
      variations: ["Statuswippe."]
    }
  },
  {
    id: "master-servant",
    title: "Herrschaft und Bedienstete",
    category: "Status",
    duration: "20 Min",
    tags: ["Subversion", "Szene"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Subtiler Widerstand in Hierarchien.",
      instructions: [
        "Szene Chef/Diener.",
        "Diener führt Befehle aus, sabotiert aber Status durch Übereifer oder Tollpatschigkeit.",
        "Ziel: Machtbalance stören."
      ],
      variations: ["Statuswechsel erzwingen."]
    }
  },
  
  // --- KATEGORIE: KONFLIKT & FORUM (PRAXIS) ---
  {
    id: "rashomon",
    title: "Rashomon",
    category: "Konflikt",
    duration: "30-45 Min",
    tags: ["Perspektive", "Wahrnehmung"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Subjektive Wahrnehmung von Realität.",
      instructions: [
        "Szene neutral spielen.",
        "Wiederholung aus Sicht Opfer (verzerrt/emotional).",
        "Wiederholung aus Sicht Täter (gerechtfertigt).",
        "Diskussion: Wie verändert Gefühl den Blick?"
      ],
      variations: ["Beobachter-Perspektive."]
    }
  },
  {
    id: "push-not-win",
    title: "Push not to win",
    category: "Körperarbeit",
    duration: "10-15 Min",
    tags: ["Dialektik", "Balance"],
    attributes: { focus: "intro", energy: "high", level: "beginner" },
    content: {
      context: "Widerstand ohne Sieg. Dialektik spüren.",
      instructions: [
        "Paare schieben gegeneinander.",
        "Fällt der Partner, sofort nachgeben/stützen.",
        "Dynamisches Gleichgewicht suchen."
      ],
      variations: ["Rücken an Rücken."]
    }
  },
  
  // --- KATEGORIE: RAINBOW (PRAXIS) ---
  {
    id: "cops-in-head",
    title: "Der Polizist im Kopf",
    category: "Rainbow of Desire",
    duration: "45-60 Min",
    tags: ["Psychologie", "Blockade"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Internalisierte Unterdrückung bearbeiten.",
      instructions: [
        "Szene der Blockade zeigen.",
        "Identifikation der Sätze im Kopf.",
        "Schauspieler verkörpern diese Stimmen physisch.",
        "Kampf gegen die Stimmen."
      ],
      variations: ["Ressourcen suchen."]
    }
  },
  {
    id: "image-antagonist",
    title: "Das Bild des Antagonisten",
    category: "Rainbow of Desire",
    duration: "30 Min",
    tags: ["Empathie", "Feindbild"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Gegner verstehen, um Strategien zu finden.",
      instructions: [
        "Bild wie ich ihn sehe (Monster).",
        "Bild wie er sich sieht (Held/Opfer).",
        "Vergleich und Analyse."
      ],
      variations: ["Dritte Sicht."]
    }
  },

  // --- KATEGORIE: SCHAUSPIEL-TECHNIK ---
  {
    id: "walking-grid",
    title: "Walking the Grid",
    category: "Viewpoints",
    duration: "15-20 Min",
    tags: ["Raum", "Geometrie"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Raumbewusstsein schärfen.",
      instructions: [
        "Gehen nur in 90-Grad-Winkeln.",
        "Klare Entscheidungen für Stopp/Start.",
        "Soft Focus (alles sehen)."
      ],
      variations: ["Tempowechsel."]
    }
  },
  {
    id: "7-levels",
    title: "7 Spannungszustände",
    category: "Lecoq",
    duration: "30-40 Min",
    tags: ["Körper", "Ausdruck"],
    attributes: { focus: "extra", energy: "high", level: "advanced" },
    content: {
      context: "Skala der körperlichen Präsenz.",
      instructions: [
        "Durchlaufen von 1 (Qualle) bis 7 (Versteinert).",
        "Jede Stufe körperlich füllen.",
        "Unterschiede spüren."
      ],
      variations: ["Szenen in Stufen spielen."]
    }
  },
  {
    id: "stick-ball-veil",
    title: "Stock, Ball, Schleier",
    category: "Chekhov",
    duration: "20 Min",
    tags: ["Charakter", "Imagination"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Bewegungszentren und Qualitäten.",
      instructions: [
        "**Stock:** Kopf/Denken. Linear.",
        "**Ball:** Becken/Wollen. Federnd.",
        "**Schleier:** Herz/Fühlen. Fließend."
      ],
      variations: ["Alltagshandlungen in Qualitäten."]
    }
  },
  {
    id: "neutral-mask",
    title: "Die Neutrale Maske",
    category: "Lecoq",
    duration: "30 Min",
    tags: ["Präsenz", "Basis"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Nullpunkt des Schauspiels. Ablegen von Eigenheiten.",
      instructions: [
        "Maske tragen (oder neutrales Gesicht).",
        "Keine Absicht, keine Geschichte.",
        "Reines Sein im Raum."
      ],
      variations: ["Begegnung."]
    }
  },
  {
    id: "elements",
    title: "Elemente",
    category: "Lecoq",
    duration: "20-30 Min",
    tags: ["Verkörperung", "Natur"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Elemente körperlich verkörpern.",
      instructions: [
        "Feuer (Staccato), Wasser (Fließend), Erde (Fest), Luft (Leicht).",
        "Bewegungsqualitäten erforschen."
      ],
      variations: ["Materialien."]
    }
  }
];

// --- THEORY DATABASE (INTERNES KOMPENDIUM - ERWEITERT & STRUKTURIERT) ---
const KNOWLEDGE_BASE = {
  // DIE 5 SÄULEN (GROSSFORMEN) - Gleichberechtigt dargestellt
  forms: [
    { 
      title: "Bildertheater (Image Theatre)", 
      subtitle: "Die Sprache des Körpers",
      desc: "Das Bildertheater ist die Basis fast aller TdU-Methoden. Es geht davon aus, dass Sprache oft verschleiert, während der Körper eine unmittelbarere Wahrheit ausdrückt. Teilnehmende formen sich selbst oder andere zu 'Statuen', um Themen darzustellen.",
      steps: [
        "**Real-Bild:** Wie ist die Situation jetzt? (Diagnose)",
        "**Ideal-Bild:** Wie wünschen wir sie uns? (Utopie)",
        "**Bild des Übergangs:** Wie kommen wir von A nach B? (Strategie)"
      ],
      goal: "Demokratisierung der Sprache. Bilder sprechen universell."
    },
    { 
      title: "Forumtheater", 
      subtitle: "Die Probe für die Revolution",
      desc: "Eine Szene, die schlecht ausgeht (Unterdrückung), wird gezeigt. Das Publikum ('Zuschau-Spielende') kann 'Stopp' rufen, den Protagonisten ersetzen und alternative Handlungsstrategien ausprobieren. Es geht nicht um *die* Lösung, sondern um das Erkunden von Möglichkeiten.",
      steps: [
        "**Anti-Modell:** Die Szene endet schlecht.",
        "**Joker-Fragen:** War das realistisch? Was tun?",
        "**Intervention:** Zuschauer kommen auf die Bühne.",
        "**Reflexion:** Was hat funktioniert?"
      ],
      goal: "Aktivierung des Publikums. Training für reales Handeln."
    },
    { 
      title: "Zeitungstheater", 
      subtitle: "Medien-Dekonstruktion",
      desc: "Eine der ersten Methoden Boals. Es dient dazu, Nachrichten oder Texte szenisch zu zerlegen, um die darin versteckte Ideologie oder Manipulation sichtbar zu machen. Es verwandelt passiven Medienkonsum in aktive Analyse.",
      steps: [
        "**Auswahl:** Ein Artikel wird gewählt.",
        "**Technik:** Eine der 12 Techniken wird angewandt (siehe Tab 'Zeitungs-Techniken').",
        "**Aufführung:** Der Text wird neu inszeniert."
      ],
      goal: "Kritisches Bewusstsein gegenüber Informationen schaffen."
    },
    { 
      title: "Unsichtbares Theater", 
      subtitle: "Theater im realen Leben",
      desc: "Eine Szene wird im öffentlichen Raum gespielt, ohne dass die Umstehenden wissen, dass es Theater ist. Ziel ist es, eine Diskussion oder Reaktion bei unfreiwilligen Zuschauern zu provozieren.",
      steps: [
        "**Vorbereitung:** Extrem genaues Proben nötig.",
        "**Durchführung:** Szene startet als 'realer Konflikt'.",
        "**Lockvögel:** Eingeweihte mischen sich ein.",
        "**Auflösung:** Oft KEINE Auflösung."
      ],
      goal: "Den öffentlichen Raum politisieren."
    },
    { 
      title: "Regenbogen der Wünsche", 
      subtitle: "Die therapeutische Dimension",
      desc: "Untersucht internalisierte Unterdrückung ('Polizisten im Kopf'). Wenn keine äußere Unterdrückung sichtbar ist, wir aber trotzdem nicht handeln, liegt das Problem innen. Emotionen werden in 'Farben' zerlegt.",
      steps: [
        "**Szene:** Protagonist zeigt Blockade.",
        "**Verkörperung:** Schauspieler spielen innere Stimmen.",
        "**Konfrontation:** Kampf gegen das eigene Innenleben."
      ],
      goal: "Psychologische Blockaden überwinden."
    },
    { 
      title: "Legislatives Theater", 
      subtitle: "Politik durch Theater",
      desc: "Die politische Weiterentwicklung. Forumtheater wird genutzt, um Gesetze zu entwerfen. Vorschläge des Publikums werden protokolliert und in echte Gesetzesvorlagen umgewandelt.",
      steps: [
        "**Problem:** Gemeindeproblem szenisch darstellen.",
        "**Intervention:** Bürger spielen Lösungen.",
        "**Metabolisierung:** Anwälte formulieren Gesetze.",
        "**Abstimmung:** Publikum stimmt ab."
      ],
      goal: "Direkte Demokratie."
    }
  ],
  // ZEITUNGSTHEATER (SPEZIAL-TAB)
  newspaper: [
    { title: "1. Einfaches Lesen", desc: "Artikel vom Kontext gelöst vorlesen (z.B. Kriegserklärung wie Kochrezept)." },
    { title: "2. Gekreuztes Lesen", desc: "Zwei widersprüchliche Artikel abwechselnd Zeile für Zeile lesen." },
    { title: "3. Ergänzendes Lesen", desc: "Verschwiegene Infos laut hinzufügen." },
    { title: "4. Rhythmisches Lesen", desc: "Text zu unpassendem Rhythmus (Samba) lesen (Filterung)." },
    { title: "5. Parallele Handlung", desc: "Text neutral lesen, Hintergrund zeigt brutale Realität." },
    { title: "6. Improvisation", desc: "Konsequenzen der Nachricht weiterspielen." },
    { title: "7. Historische Lesung", desc: "Nachricht lesen, als wäre sie aus einer anderen Zeit." },
    { title: "8. Verstärkung", desc: "Text mit Liedern/Jingles unterbrechen." },
    { title: "9. Konkretisierung", desc: "Abstrakte Begriffe in konkrete Bilder übersetzen." },
    { title: "10. Text aus Kontext", desc: "Text in neuem Kontext (Kanzlerrede im Kindergarten)." },
    { title: "11. Feld-Interview", desc: "Figuren aus Artikel 'interviewen'." },
    { title: "12. Verhör", desc: "Autor des Artikels 'verhören'." }
  ],
  // PHILOSOPHIE
  philosophy: [
    { title: "Spect-Actor (Zuschau-Spieler)", desc: "Wir sind keine passiven Zuschauer, sondern handelnde Akteure. Das TdU hebt die Trennung zwischen Bühne und Saal auf. Jeder ist Experte seines eigenen Lebens." },
    { title: "Maieutik (Hebammenkunst)", desc: "Der Joker ist kein Lehrer, der Wissen eintrichtert. Er ist wie Sokrates eine 'Hebamme', die hilft, das Wissen der Gruppe zur Welt zu bringen." },
    { title: "Aristoteles vs. Boal", desc: "Aristoteles wollte Katharsis (Reinigung) durch Furcht und Mitleid, um den Status Quo zu erhalten. Boal will 'Dynamisierung': Den Wunsch nach Veränderung wecken, nicht beruhigen." },
    { title: "De-Mechanisierung", desc: "Wir sind voll von mechanischen Mustern (Körper, Denken). Bevor wir Neues lernen, müssen wir diese Muster aufbrechen. Spiele dienen der De-Mechanisierung." },
    { title: "Metaxis", desc: "Der Zustand, in zwei Welten gleichzeitig zu sein: Der Realität und der Fiktion. Dies ermöglicht uns, im Schutz der Fiktion reale Lösungen zu probieren." },
    { title: "Osmose", desc: "Das Ziel ist, dass die Erfahrungen von der Bühne durch die 'Poren' in das reale Leben der Teilnehmenden sickern." }
  ],
  // JOKER & SAFETY
  joker: [
    { title: "Fragen statt Sagen", desc: "Gib keine Antworten. Frage zurück: 'Was hat das Publikum gesehen?'" },
    { title: "Allparteilichkeit", desc: "Du bist auf keiner Seite, sondern auf der Seite des demokratischen Prozesses. Schütze auch den Antagonisten vor unsachlichen Angriffen." },
    { title: "Physisch bleiben", desc: "'Zeig es uns, statt es zu erklären!' ist dein wichtigster Satz. Vermeide 'Sitz-Fußball' (Diskussion ohne Aktion)." },
    { title: "Fehler feiern", desc: "Es gibt keine falschen Interventionen, nur unterschiedliche Konsequenzen." },
    { title: "De-Rolling (Safety)", desc: "Lass niemanden in einer schweren Rolle stecken. Schüttle sie ab, nenne den eigenen Namen." },
    { title: "Stopp-Regel (Safety)", desc: "Jeder darf 'Stopp' sagen. Sicherheit geht vor Kunst." }
  ]
};

// --- KOMPONENTEN ---

const SwipeCard = ({ step, onSwipe, direction }) => {
  const cards = [
    {
      step: 0,
      title: "Wonach suchst du?",
      icon: <Brain size={48} className="text-white mb-4" />,
      left: { label: "Innenwelt", desc: "Gefühle, Psychologie", val: "intro", color: PRIMARY_COLOR },
      right: { label: "Außenwelt", desc: "Körper, Raum, Politik", val: "extra", color: PRIMARY_COLOR }
    },
    {
      step: 1,
      title: "Energielevel?",
      icon: <Activity size={48} className="text-white mb-4" />,
      left: { label: "Fokussiert", desc: "Konzentration, Analyse", val: "low", color: PRIMARY_COLOR },
      right: { label: "Aktivierend", desc: "Bewegung, Chaos", val: "high", color: PRIMARY_COLOR }
    },
    {
      step: 2,
      title: "Erfahrung der Gruppe?",
      icon: <Layers size={48} className="text-white mb-4" />,
      left: { label: "Anfänger", desc: "Warm-up, Kennenlernen", val: "beginner", color: PRIMARY_COLOR },
      right: { label: "Fortgeschritten", desc: "Szenisch, Komplex", val: "advanced", color: PRIMARY_COLOR }
    }
  ];

  const currentCard = cards[step];
  
  let cardClass = `absolute inset-0 w-full h-full rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 text-center transition-all duration-500 ease-out transform ${GRADIENT_BG}`;
  
  if (direction === 'left') {
    cardClass += " -translate-x-full rotate-[-20deg] opacity-0";
  } else if (direction === 'right') {
    cardClass += " translate-x-full rotate-[20deg] opacity-0";
  } else {
    cardClass += " translate-x-0 rotate-0 opacity-100";
  }

  return (
    <div className="relative w-full max-w-md h-[450px] mx-auto mt-8 perspective-1000">
      <div className={cardClass}>
        <div className="bg-black/10 p-4 rounded-full mb-4">
          {currentCard.icon}
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-8">{currentCard.title}</h2>
        
        <div className="absolute bottom-0 left-0 w-1/2 h-full flex flex-col justify-end p-4 bg-gradient-to-t from-black/20 to-transparent rounded-bl-2xl">
           <ArrowLeft className="text-slate-900 opacity-60 mb-2" />
           <span className="text-slate-900 font-bold text-lg text-left">{currentCard.left.label}</span>
           <span className="text-slate-800 text-xs text-left">{currentCard.left.desc}</span>
        </div>

        <div className="absolute bottom-0 right-0 w-1/2 h-full flex flex-col items-end justify-end p-4 bg-gradient-to-t from-black/20 to-transparent rounded-br-2xl">
           <ArrowRight className="text-slate-900 opacity-60 mb-2" />
           <span className="text-slate-900 font-bold text-lg text-right">{currentCard.right.label}</span>
           <span className="text-slate-800 text-xs text-right">{currentCard.right.desc}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute -bottom-24 left-0 w-full flex justify-between px-4">
        <button 
          onClick={() => onSwipe('left', currentCard.left.val)}
          className={`flex-1 mr-4 py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex flex-col items-center justify-center ${PRIMARY_COLOR} ${PRIMARY_COLOR_HOVER}`}
        >
          <ArrowLeft size={24} className="mb-1" />
          {currentCard.left.label}
        </button>
        <button 
          onClick={() => onSwipe('right', currentCard.right.val)}
          className={`flex-1 ml-4 py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex flex-col items-center justify-center ${PRIMARY_COLOR} ${PRIMARY_COLOR_HOVER}`}
        >
          <ArrowRight size={24} className="mb-1" />
          {currentCard.right.label}
        </button>
      </div>
    </div>
  );
};

const ResultsView = ({ results, onReset, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = results.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fadeIn">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Ergebnisse ({filteredResults.length})</h2>
        <button onClick={onReset} className={`flex items-center text-sm font-medium text-slate-500 hover:${PRIMARY_TEXT_COLOR}`}>
          <RefreshCw size={16} className="mr-1" /> Neustart
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-400" />
        </div>
        <input
          type="text"
          placeholder="Suche nach Spiel oder Tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E05D5D] focus:border-transparent sm:text-sm transition-all shadow-sm"
        />
      </div>

      {filteredResults.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-500 mb-4">Keine Übungen gefunden.</p>
          <button onClick={onReset} className={`px-6 py-2 ${PRIMARY_COLOR} text-white rounded-lg ${PRIMARY_COLOR_HOVER}`}>
            Alles zurücksetzen
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredResults.map((game) => (
            <div 
              key={game.id} 
              onClick={() => onSelect(game)}
              className={`bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-[#FFDE59] cursor-pointer transition-all group`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-lg font-bold text-slate-800 group-hover:${PRIMARY_TEXT_COLOR} transition-colors`}>
                    {game.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 mb-2">
                    <span className="mr-3">{game.category}</span>
                    {game.duration && (
                      <span className="flex items-center text-xs bg-slate-100 px-2 py-0.5 rounded-full">
                        <Clock size={12} className="mr-1" /> {game.duration}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`bg-slate-100 p-2 rounded-full group-hover:${ACCENT_COLOR_BG} transition-colors`}>
                  <ArrowRight size={16} className={`text-slate-400 group-hover:${PRIMARY_TEXT_COLOR}`} />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {game.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- NEUE VIEW: KATALOG ---
const CatalogView = ({ onSelect }) => {
  const categories = [...new Set(EXERCISE_DB.map(g => g.category))];
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fadeIn pb-24">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Alle Spiele</h2>
      {categories.map(cat => (
        <div key={cat} className="mb-8">
          <h3 className="text-lg font-bold text-slate-600 mb-3 uppercase tracking-wider">{cat}</h3>
          <div className="grid gap-3">
            {EXERCISE_DB.filter(g => g.category === cat).map(game => (
              <div key={game.id} onClick={() => onSelect(game)} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-[#E05D5D] cursor-pointer flex justify-between items-center">
                <span className="font-bold text-slate-800">{game.title}</span>
                <ArrowRight size={16} className="text-slate-300" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- NEUE VIEW: WISSEN (KOMPENDIUM - 4 TABS & EXPANDABLE) ---
const TheoryView = () => {
  const [activeTab, setActiveTab] = useState('forms'); // forms, newspaper, philosophy, joker
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (i) => {
    setExpandedId(expandedId === i ? null : i);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'forms': return KNOWLEDGE_BASE.forms;
      case 'newspaper': return KNOWLEDGE_BASE.newspaper;
      case 'philosophy': return KNOWLEDGE_BASE.philosophy;
      case 'joker': return KNOWLEDGE_BASE.joker;
      default: return [];
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fadeIn pb-24">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Kompendium</h2>
      <p className="text-slate-500 mb-6 text-sm">Das gesammelte Wissen des Theaters der Unterdrückten.</p>
      
      {/* TABS SCROLLABLE */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
        <button onClick={() => {setActiveTab('forms'); setExpandedId(null)}} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${activeTab === 'forms' ? `${PRIMARY_COLOR} text-white` : 'bg-slate-100 text-slate-500'}`}>
          <Map size={16} className="inline mr-1" /> Die 5 Säulen
        </button>
        <button onClick={() => {setActiveTab('newspaper'); setExpandedId(null)}} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${activeTab === 'newspaper' ? `${PRIMARY_COLOR} text-white` : 'bg-slate-100 text-slate-500'}`}>
          <FileText size={16} className="inline mr-1" /> Zeitungs-Techniken
        </button>
        <button onClick={() => {setActiveTab('philosophy'); setExpandedId(null)}} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${activeTab === 'philosophy' ? `${PRIMARY_COLOR} text-white` : 'bg-slate-100 text-slate-500'}`}>
          <Lightbulb size={16} className="inline mr-1" /> Philosophie
        </button>
        <button onClick={() => {setActiveTab('joker'); setExpandedId(null)}} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${activeTab === 'joker' ? `${PRIMARY_COLOR} text-white` : 'bg-slate-100 text-slate-500'}`}>
          <Mic size={16} className="inline mr-1" /> Joker & Safety
        </button>
      </div>

      <div className="grid gap-4">
        {renderContent().map((item, i) => (
          <div key={i} className={`bg-white rounded-xl shadow-sm border border-slate-200 transition-all duration-300 ${expandedId === i ? 'ring-2 ring-[#E05D5D]' : ''}`}>
            {/* Header / Clickable */}
            <div 
              onClick={() => toggleExpand(i)}
              className="p-5 cursor-pointer flex justify-between items-start"
            >
              <div>
                <h3 className="text-lg font-bold text-[#E05D5D] mb-1">{item.title}</h3>
                {item.subtitle && <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.subtitle}</p>}
                {!expandedId && expandedId !== i && <p className="text-slate-500 text-sm mt-2 line-clamp-2">{item.desc}</p>}
              </div>
              <div className="mt-1 ml-2 text-slate-400">
                {expandedId === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {/* Expanded Content */}
            {expandedId === i && (
              <div className="px-5 pb-5 pt-0 animate-fadeIn">
                <p className="text-slate-700 leading-relaxed mb-4">{item.desc}</p>
                {item.steps && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
                    <h4 className="font-bold text-slate-700 text-sm mb-2 uppercase">Ablauf / Struktur:</h4>
                    <ul className="space-y-2">
                      {item.steps.map((step, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start">
                          <span className="mr-2 mt-1 w-1.5 h-1.5 bg-[#E05D5D] rounded-full flex-shrink-0"></span>
                          <span>{renderTextWithBold(step)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.goal && (
                  <div className="flex items-start text-sm text-[#E05D5D] font-medium bg-[#E05D5D]/5 p-3 rounded-lg">
                    <Zap size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                    Ziel: {item.goal}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- NEUE VIEW: FAVORITEN ---
const FavoritesView = ({ favorites, onSelect, onRemove }) => {
  const handlePrint = () => {
    window.print();
  };

  const favoriteGames = EXERCISE_DB.filter(g => favorites.includes(g.id));

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fadeIn pb-24 print:p-0">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-2xl font-bold text-slate-800">Merkliste ({favorites.length})</h2>
        {favorites.length > 0 && (
          <button onClick={handlePrint} className="flex items-center text-sm font-bold text-[#E05D5D] bg-[#E05D5D]/10 px-3 py-2 rounded-lg hover:bg-[#E05D5D]/20">
            <Printer size={16} className="mr-2" /> Drucken
          </button>
        )}
      </div>

      {/* Print Header */}
      <div className="hidden print:block mb-8 text-center">
        <h1 className="text-3xl font-bold">Workshop-Plan</h1>
        <p>Erstellt mit Polithea Swipe & Act</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Heart size={48} className="mx-auto mb-2 opacity-20" />
          <p>Noch keine Favoriten gespeichert.</p>
        </div>
      ) : (
        <div className="grid gap-4 print:block">
          {favoriteGames.map((game) => (
            <div key={game.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 relative group print:shadow-none print:border-b print:border-t-0 print:border-x-0 print:rounded-none print:mb-6 print:break-inside-avoid">
              <div onClick={() => onSelect(game)} className="cursor-pointer">
                <h3 className="text-lg font-bold text-slate-800">{game.title}</h3>
                <div className="flex items-center text-sm text-slate-500 mb-2">
                  <span className="mr-3">{game.category}</span>
                  <span className="flex items-center text-xs bg-slate-100 px-2 py-0.5 rounded-full print:border print:bg-white">
                    <Clock size={12} className="mr-1" /> {game.duration}
                  </span>
                </div>
                {/* Short Description for Print */}
                <div className="hidden print:block text-slate-600 text-sm mt-2">
                  <p className="italic mb-2">{game.content.context}</p>
                  <ul className="list-disc pl-4">
                    {game.content.instructions.map((step, i) => (
                      <li key={i}>{step.replace(/\*\*/g, '')}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onRemove(game.id); }}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 transition-colors print:hidden"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- DETAIL MODAL MIT SHARE & FAVORITE ---
const DetailModal = ({ game, onClose, isFavorite, toggleFavorite }) => {
  if (!game) return null;

  const handleShare = () => {
    const text = `Spiel: ${game.title}\nKategorie: ${game.category}\n\n${game.content.context}`;
    if (navigator.share) {
      navigator.share({ title: game.title, text: text }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert("In die Zwischenablage kopiert!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-slideUp">
        <div className="absolute top-4 right-4 flex space-x-2">
          <button onClick={handleShare} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-600">
            <Share2 size={20} />
          </button>
          <button onClick={() => toggleFavorite(game.id)} className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-600">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <span className={`text-xs font-bold uppercase tracking-wider ${PRIMARY_TEXT_COLOR} mb-2 block`}>
            {game.category}
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{game.title}</h2>
          
          {game.duration && (
             <div className="flex items-center text-slate-500 text-sm mb-4">
               <Clock size={16} className="mr-1.5" />
               <span className="font-medium">{game.duration}</span>
             </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-6">
            {game.tags.map((tag, i) => (
              <span key={i} className={`text-xs font-medium px-2.5 py-1 ${ACCENT_COLOR_BG} text-slate-900 rounded-md border ${ACCENT_COLOR_BORDER}`}>
                #{tag}
              </span>
            ))}
          </div>

          <div className="mb-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
            <h4 className="flex items-center text-sm font-bold text-orange-800 mb-1">
              <Sparkles size={16} className="mr-2" /> Warum spielen?
            </h4>
            <p className="text-sm text-orange-900/80 italic">{game.content.context}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
              <BookOpen size={20} className={`mr-2 ${PRIMARY_TEXT_COLOR}`} /> Anleitung
            </h3>
            <ol className="space-y-3">
              {game.content.instructions.map((step, i) => (
                <li key={i} className="flex items-start text-slate-700">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-slate-100 rounded-full text-xs font-bold mr-3 mt-0.5 text-slate-500">
                    {i + 1}
                  </span>
                  <span>{renderTextWithBold(step)}</span>
                </li>
              ))}
            </ol>
          </div>

          {game.content.variations && game.content.variations.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-3">Variationen</h3>
              <ul className="space-y-2">
                {game.content.variations.map((v, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start">
                    <span className={`mr-2 ${PRIMARY_TEXT_COLOR}`}>•</span> {v}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-100 sticky bottom-0">
          <button 
            onClick={onClose}
            className={`w-full py-3 ${PRIMARY_COLOR} text-white rounded-xl font-bold ${PRIMARY_COLOR_HOVER} transition-colors`}
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function ActAndSwipeApp() {
  const [view, setView] = useState('start'); // start, swipe, results, catalog, favorites, theory
  const [swipeStep, setSwipeStep] = useState(0); 
  const [filters, setFilters] = useState({ focus: null, energy: null, level: null });
  const [slideDir, setSlideDir] = useState(null);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage
  useEffect(() => {
    const savedFavs = localStorage.getItem('polithea_favs');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  const toggleFavorite = (id) => {
    let newFavs;
    if (favorites.includes(id)) {
      newFavs = favorites.filter(favId => favId !== id);
    } else {
      newFavs = [...favorites, id];
    }
    setFavorites(newFavs);
    localStorage.setItem('polithea_favs', JSON.stringify(newFavs));
  };

  const handleStart = () => {
    setView('swipe');
    setSwipeStep(0);
    setFilters({ focus: null, energy: null, level: null });
  };

  const handleRandom = () => {
    const randomGame = EXERCISE_DB[Math.floor(Math.random() * EXERCISE_DB.length)];
    setSelectedGame(randomGame);
  };

  const handleSwipe = (direction, value) => {
    if (slideDir) return; 
    setSlideDir(direction);
    const newFilters = { ...filters };
    if (swipeStep === 0) newFilters.focus = value;
    if (swipeStep === 1) newFilters.energy = value;
    if (swipeStep === 2) newFilters.level = value;
    setFilters(newFilters);

    setTimeout(() => {
      setSlideDir(null);
      if (swipeStep < 2) {
        setSwipeStep(swipeStep + 1);
      } else {
        finishSwiping(newFilters);
      }
    }, 400);
  };

  const finishSwiping = (finalFilters) => {
    const results = EXERCISE_DB.filter(game => {
      const matchFocus = game.attributes.focus === finalFilters.focus;
      const matchEnergy = game.attributes.energy === finalFilters.energy;
      const matchLevel = game.attributes.level === finalFilters.level;
      return matchFocus && matchEnergy && matchLevel;
    });
    
    let finalResults = results;
    if (results.length === 0) {
        finalResults = EXERCISE_DB.filter(game => {
            let score = 0;
            if (game.attributes.focus === finalFilters.focus) score++;
            if (game.attributes.energy === finalFilters.energy) score++;
            if (game.attributes.level === finalFilters.level) score++;
            return score >= 2;
        });
    }
    setFilteredGames(finalResults);
    setView('results');
  };

  // Navigation Logic
  const NavButton = ({ icon: Icon, label, targetView }) => (
    <button 
      onClick={() => setView(targetView)} 
      className={`flex flex-col items-center justify-center w-full py-2 ${view === targetView ? PRIMARY_TEXT_COLOR : 'text-slate-400'}`}
    >
      <Icon size={24} />
      <span className="text-[10px] font-bold mt-1 uppercase">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen bg-slate-50 font-sans text-slate-900 ${SELECTION_COLOR} flex flex-col`}>
      
      {/* HEADER (Nur anzeigen, wenn nicht im Print-Modus) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('start')}>
             <img src={LOGO_URL} alt="Polithea Logo" className="h-10 w-auto" />
            <h1 className="text-xl font-black tracking-tight text-slate-900">SWIPE & ACT</h1>
          </div>
          {view === 'results' && (
            <button onClick={handleStart} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
              <RefreshCw size={18} className="text-slate-600" />
            </button>
          )}
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="flex-1 max-w-md mx-auto w-full relative overflow-hidden">
        
        {view === 'start' && (
          <div className="flex flex-col items-center justify-center h-full pt-8 px-6 animate-fadeIn text-center pb-20">
            <div className="mb-8 mx-auto flex items-center justify-center">
                <img src={LOGO_URL} alt="Polithea Logo" className="object-contain" style={{ maxWidth: '160px', height: 'auto' }} />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 leading-tight">
              Du bereitest die Probe vor und suchst die passenden Spiele?
            </h2>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto text-lg font-medium">Geilo, du bist hier richtig!</p>
            <div className="w-full space-y-4">
              <button onClick={handleStart} className={`w-full py-4 ${PRIMARY_COLOR} text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-200/50 ${PRIMARY_COLOR_HOVER} hover:shadow-xl transition-all active:scale-95 flex items-center justify-center`}>
                Starten <ArrowRight className="ml-2" />
              </button>
              <button onClick={handleRandom} className="w-full py-3 bg-white text-slate-600 border-2 border-slate-200 rounded-xl font-bold text-base hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center">
                <Shuffle size={18} className="mr-2" /> Zufälliges Spiel
              </button>
            </div>
          </div>
        )}

        {view === 'swipe' && (
          <div className="h-full flex flex-col">
            <div className="flex justify-center pt-8 space-x-2 mb-4">
              <div className={`h-1.5 w-8 rounded-full transition-colors ${swipeStep >= 0 ? PRIMARY_COLOR : 'bg-slate-200'}`} />
              <div className={`h-1.5 w-8 rounded-full transition-colors ${swipeStep >= 1 ? PRIMARY_COLOR : 'bg-slate-200'}`} />
              <div className={`h-1.5 w-8 rounded-full transition-colors ${swipeStep >= 2 ? PRIMARY_COLOR : 'bg-slate-200'}`} />
            </div>
            <div className="px-4"><SwipeCard step={swipeStep} onSwipe={handleSwipe} direction={slideDir} /></div>
          </div>
        )}

        {view === 'results' && <ResultsView results={filteredGames} onReset={handleStart} onSelect={setSelectedGame} />}
        
        {view === 'catalog' && <CatalogView onSelect={setSelectedGame} />}
        
        {view === 'theory' && <TheoryView />}
        
        {view === 'favorites' && <FavoritesView favorites={favorites} onSelect={setSelectedGame} onRemove={toggleFavorite} />}

        {selectedGame && (
          <DetailModal 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
            isFavorite={favorites.includes(selectedGame.id)}
            toggleFavorite={toggleFavorite}
          />
        )}
      </main>

      {/* BOTTOM NAVIGATION (Print-Hidden) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 pb-safe pt-1 z-40 print:hidden">
        <div className="max-w-md mx-auto flex justify-around">
          <NavButton icon={Home} label="Start" targetView="start" />
          <NavButton icon={Menu} label="Katalog" targetView="catalog" />
          <NavButton icon={Library} label="Wissen" targetView="theory" />
          <NavButton icon={Heart} label="Merkliste" targetView="favorites" />
        </div>
      </nav>

      {/* GLOBAL STYLES */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .perspective-1000 { perspective: 1000px; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 20px); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @media print {
          body * { visibility: hidden; }
          .print\\:block, .print\\:block * { visibility: visible; }
          .print\\:hidden { display: none !important; }
          .print\\:shadow-none { box-shadow: none !important; }
          .print\\:p-0 { padding: 0 !important; }
        }
      `}</style>
    </div>
  );
}