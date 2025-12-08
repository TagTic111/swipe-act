import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Zap, Users, ArrowRight, ArrowLeft, RefreshCw, X, BookOpen, Layers, Activity, Clock, Search, Shuffle } from 'lucide-react';

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

// --- DATENBANK (TEIL B) - MIT DAUER & NEUEN SPIELEN ---
const EXERCISE_DB = [
  // NEU: SAMURAI
  {
    id: "samurai",
    title: "Samurai",
    category: "Energie & Konzentration",
    duration: "10-15 Min",
    tags: ["Reaktion", "Kampfkunst", "Energie"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Ein hochenergetisches Spiel, das Wachheit, Präzision und schnelle Reaktionen erfordert. Es weckt müde Gruppen sofort auf.",
      instructions: [
        "Die Gruppe steht im Kreis. Eine Person beginnt als Samurai, hebt das 'Schwert' (beide Hände zusammen) über den Kopf und ruft laut 'Hah!'.",
        "Sie 'schlägt' das Schwert nach unten und zeigt auf eine andere Person im Kreis.",
        "Diese Person reißt sofort die Hände hoch ('Hah!').",
        "Die beiden direkten Nachbar*innen der angezielten Person 'schlagen' nun seitlich in deren Bauchhöhe (ohne Berührung) und rufen ebenfalls 'Hah!'.",
        "Die Person in der Mitte übergibt den Impuls dann wieder an jemand anderen.",
        "Wer zögert oder einen Fehler macht, scheidet aus (oder läuft eine Runde um den Kreis)."
      ],
      variations: ["Zeitlupe-Runde.", "Ohne Töne (Silent Samurai)."]
    }
  },
  // NEU: KOTZENDES KÄNGURU
  {
    id: "puking-kangaroo",
    title: "Kotzendes Känguru",
    category: "Reaktion & Spaß",
    duration: "10-20 Min",
    tags: ["Lachen", "Schnelligkeit", "Fehlerkultur"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Ein extrem lustiges Reaktionsspiel, bei dem es darum geht, sich nicht zu ernst zu nehmen. Perfekt zum Lockerwerden.",
      instructions: [
        "Alle stehen im Kreis. Eine Person in der Mitte zeigt auf jemanden und nennt eine Figur (z.B. 'Toaster', 'Elefant', 'Kotzendes Känguru').",
        "Die angezeigte Person und ihre beiden Nachbar*innen müssen sofort gemeinsam diese Figur darstellen.",
        "**Toaster:** Mitte springt auf und ab, Nachbarn bilden mit Armen den Schlitz.",
        "**Elefant:** Mitte macht Rüssel, Nachbarn machen große Ohren.",
        "**Kotzendes Känguru:** Mitte hält Hände vor den Bauch wie Beutel und würgt, Nachbarn hüpfen panisch zur Seite.",
        "Wer zu langsam ist oder falsch reagiert, muss in die Mitte."
      ],
      variations: ["Eigene Figuren erfinden (z.B. Waschmaschine, Mixer)."]
    }
  },
  // NEU: GEFÜHLS-ORCHESTER
  {
    id: "emotion-orchestra",
    title: "Gefühls-Orchester",
    category: "Ausdruck & Stimme",
    duration: "15 Min",
    tags: ["Chor", "Emotion", "Dynamik"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Trainiert die stimmliche Vielfalt und das Zusammenspiel in der Gruppe. Die Teilnehmenden werden zu Instrumenten einer Emotion.",
      instructions: [
        "Die Gruppe steht im Halbkreis. Eine Person (Dirigent*in) steht davor.",
        "Der/Die Dirigent*in weist verschiedenen Gruppen oder Einzelpersonen bestimmte Emotionen zu (z.B. Wut, Trauer, hysterische Freude).",
        "Die Teilnehmenden dürfen nur Geräusche oder Gibberish (Kauderwelsch) nutzen, keine echten Wörter.",
        "Der/Die Dirigent*in 'spielt' das Orchester: Er/Sie bestimmt Lautstärke, Einsatz und Tempo durch Gesten.",
        "Ziel ist es, eine 'Symphonie der Gefühle' zu erzeugen."
      ],
      variations: ["Ein echtes Lied (z.B. 'Alle meine Entchen') nur mit emotionalen Lauten 'singen'."]
    }
  },
  // NEU: EIN-WORT-GESCHICHTE
  {
    id: "one-word-story",
    title: "Ein-Wort-Geschichte",
    category: "Erzählen & Fokus",
    duration: "5-10 Min",
    tags: ["Improvisation", "Zuhören", "Kreativität"],
    attributes: { focus: "intro", energy: "low", level: "beginner" },
    content: {
      context: "Fördert das Zuhören und das Akzeptieren von Angeboten. Die eigene Idee muss zugunsten der Gruppengeschichte aufgegeben werden.",
      instructions: [
        "Die Gruppe steht im Kreis.",
        "Das Ziel ist es, gemeinsam eine Geschichte zu erzählen. Jede Person darf aber immer nur genau **ein einziges Wort** beisteuern.",
        "Die Geschichte sollte grammatikalisch korrekt sein und Sinn ergeben (oder lustigen Unsinn).",
        "Beispiel: 'Es' - 'war' - 'einmal' - 'ein' - 'riesiger' - 'blauer' - 'Zwerg'...",
        "Wichtig: Nicht den Satz im Kopf vorplanen, sondern auf das Wort davor reagieren."
      ],
      variations: ["Als 'Experte' mit vier Köpfen, der Interviews gibt.", "Schnelligkeits-Runde: Wer zögert, ist raus."]
    }
  },
  // VORHERIGE SPIELE (ALLE AKTUALISIERT)
  {
    id: "the-machine",
    title: "Die Maschine",
    category: "Gruppendynamik & Rhythmus",
    duration: "10 Min",
    tags: ["Kooperation", "Körperarbeit", "Sound"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Eine großartige Übung, um eine Gruppe in Einklang zu bringen. Sie zeigt, wie individuelle Beiträge ein großes Ganzes ergeben.",
      instructions: [
        "Eine Person beginnt in der Mitte des Raumes mit einer sich wiederholenden Bewegung und einem dazu passenden Geräusch.",
        "Eine zweite Person kommt hinzu und fügt eine eigene Bewegung mit Geräusch an.",
        "Nacheinander kommen alle Teilnehmenden hinzu, bis eine riesige 'Maschine' entsteht.",
        "Die Spielleitung kann die Maschine 'schneller' oder 'langsamer' laufen lassen."
      ],
      variations: ["Die Maschine produziert ein bestimmtes Produkt.", "Die Maschine wird langsam dekonstruiert."]
    }
  },
  {
    id: "yes-lets",
    title: "Ja, genau! (Yes, Let's!)",
    category: "Aufwärmen & Akzeptanz",
    duration: "5-10 Min",
    tags: ["Improvisation", "Energie", "Bestätigung"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Dieses Spiel trainiert radikale Akzeptanz und bringt die Energie sofort hoch. Es verhindert langes Nachdenken.",
      instructions: [
        "Die Gruppe läuft kreuz und quer durch den Raum.",
        "Eine Person ruft laut einen Vorschlag: 'Lasst uns alle Bäume fällen!'",
        "Alle rufen sofort: 'Ja, genau!' und führen die Tätigkeit aus.",
        "Dann macht jemand anderes einen neuen Vorschlag."
      ],
      variations: ["Gefühle einbauen.", "Abstrakte Konzepte darstellen."]
    }
  },
  {
    id: "wink-murder",
    title: "Blinzel-Mörder*in",
    category: "Konzentration & Beobachtung",
    duration: "15-20 Min",
    tags: ["Spannung", "Wahrnehmung", "Stille"],
    attributes: { focus: "extra", energy: "low", level: "beginner" },
    content: {
      context: "Ein Klassiker, der die Beobachtungsgabe schärft. Ideal, um eine unruhige Gruppe zu fokussieren.",
      instructions: [
        "Eine Person (Detektiv*in) geht vor die Tür.",
        "Die Spielleitung bestimmt heimlich eine*n Mörder*in.",
        "Der/Die Mörder*in 'tötet' andere durch Zuwinkern. Wer angeblinzelt wird, stirbt dramatisch.",
        "Der/Die Detektiv*in muss den/die Täter*in finden."
      ],
      variations: ["Thematisches Sterben (z.B. Operntod)."]
    }
  },
  {
    id: "cross-circle",
    title: "Das Kreuz und der Kreis",
    category: "Aufwärmen & De-Mechanisierung",
    duration: "5 Min",
    tags: ["Koordination", "Gehirn-Jogging", "Scheitern"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Fördert die Unabhängigkeit der Gehirnhälften.",
      instructions: [
        "Rechte Hand zeichnet einen Kreis in die Luft.",
        "Linke Hand zeichnet ein Kreuz in die Luft.",
        "Beides gleichzeitig ausführen."
      ],
      variations: ["Hand und Fuß kombinieren."]
    }
  },
  {
    id: "bear-poitiers",
    title: "Der Bär von Poitiers",
    category: "Aufwärmen & De-Mechanisierung",
    duration: "10-15 Min",
    tags: ["Körperspannung", "Spaß", "Eisbrecher"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Fokus auf Körperspannung und Entspannung.",
      instructions: [
        "Ein 'Bär', Rest sind 'Holzfällende'.",
        "Wenn der Bär brüllt, stellen sich alle tot (entspannt).",
        "Der Bär prüft die Körperspannung (Arme heben etc.). Wer anspannt, wird auch Bär."
      ],
      variations: ["Thematische Anpassung (Statuen)."]
    }
  },
  {
    id: "bomb-shield",
    title: "Bombe und Schutzschild",
    category: "Raum & Dynamik",
    duration: "10 Min",
    tags: ["Raum", "Dynamik", "Paranoia"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Simuliert Massenbewegungen durch individuelle Ziele.",
      instructions: [
        "Jede*r wählt geheim eine 'Bombe' und ein 'Schild'.",
        "Ziel: Das Schild muss immer genau zwischen mir und der Bombe sein.",
        "Es entsteht ein dynamisches Chaos."
      ],
      variations: ["Maximaler Abstand zur Bombe, minimaler zum Schild."]
    }
  },
  {
    id: "colombian-hypnosis",
    title: "Kolumbianische Hypnose",
    category: "Vertrauen & Führung",
    duration: "15 Min",
    tags: ["Vertrauen", "Führung", "Macht"],
    attributes: { focus: "extra", energy: "low", level: "beginner" },
    content: {
      context: "Untersucht Führung und Hingabe non-verbal.",
      instructions: [
        "A hält Handfläche vor das Gesicht von B.",
        "B ist 'hypnotisiert' und muss den Abstand halten, während A ihn/sie führt."
      ],
      variations: ["Gegenseitige Hypnose."]
    }
  },
  {
    id: "budge",
    title: "Drängelkreis / Rutsch",
    category: "Aufwärmen & Reaktion",
    duration: "10 Min",
    tags: ["Reaktion", "Solidarität"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Energetisierendes Reaktionsspiel.",
      instructions: [
        "Alle sitzen im Kreis, eine Person in der Mitte.",
        "Mitte ruft 'Rutsch!' zu einer sitzenden Person.",
        "Diese muss wegrennen und einen neuen Platz suchen, Nachbarn müssen aufrücken."
      ],
      variations: ["Ohne Stühle."]
    }
  },
  {
    id: "zip-zap-boing",
    title: "Zip Zap Boing",
    category: "Fokus & Gruppe",
    duration: "5-10 Min",
    tags: ["Fokus", "Reaktion", "Gruppe"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Klassiker zur Energiefokussierung.",
      instructions: [
        "'Zip': Impuls zum Nachbarn.",
        "'Zap': Impuls durch den Kreis.",
        "'Boing': Impuls blocken."
      ],
      variations: ["Zoom, Schüttel."]
    }
  },
  {
    id: "glass-cobra",
    title: "Die Gläserne Kobra",
    category: "Gruppendynamik",
    duration: "15 Min",
    tags: ["Sinne", "Vertrauen", "Blind"],
    attributes: { focus: "intro", energy: "low", level: "beginner" },
    content: {
      context: "Fördert das Spüren der Gruppe als Organismus.",
      instructions: [
        "Polonaise, alle außer Anführer*in haben Augen zu.",
        "Führung durch Impulse auf die Schultern.",
        "Nicht abreißen lassen."
      ],
      variations: ["Führungswechsel."]
    }
  },
  {
    id: "human-knot",
    title: "Der Menschliche Knoten",
    category: "Problemlösung",
    duration: "10-15 Min",
    tags: ["Problemlösung", "Körperkontakt", "Kooperation"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Physisches Rätsel für Kooperation.",
      instructions: [
        "Alle greifen hände kreuz und quer.",
        "Den Knoten entwirren ohne loszulassen."
      ],
      variations: ["Stumm."]
    }
  },
  {
    id: "racing-chairs",
    title: "Rhythmus mit Stühlen",
    category: "Kooperation & Stress",
    duration: "15 Min",
    tags: ["Kooperation", "Stress", "De-Mechanisierung"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Kooperation unter Zeitdruck.",
      instructions: [
        "Gruppe steht auf Stuhlreihe, ein Stuhl ist frei.",
        "Der freie Stuhl muss von hinten nach vorne durchgereicht werden, ohne Bodenberührung."
      ],
      variations: ["Wettkampf."]
    }
  },
  {
    id: "count-to-20",
    title: "Zählen bis 20",
    category: "Zuhören & Fokus",
    duration: "10 Min",
    tags: ["Zuhören", "Gruppengefühl"],
    attributes: { focus: "intro", energy: "low", level: "beginner" },
    content: {
      context: "Kollektives Zuhören und Timing.",
      instructions: [
        "Augen zu. Gemeinsam bis 20 zählen.",
        "Wenn zwei gleichzeitig sprechen: Zurück auf 1."
      ],
      variations: ["Rückwärts."]
    }
  },
  {
    id: "great-game-power",
    title: "Das große Spiel der Macht",
    category: "Image Theatre",
    duration: "30 Min",
    tags: ["Analyse", "Visuell", "Politik"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Analyse von Machtverhältnissen im Raum.",
      instructions: [
        "Objekte (Stuhl, Flasche etc.) arrangieren.",
        "Aufgabe: Mach einen Stuhl zum Mächtigsten.",
        "Diskussion und Analyse."
      ],
      variations: ["Personen einfügen."]
    }
  },
  {
    id: "real-to-ideal",
    title: "Vom Realen zum Idealen Bild",
    category: "Image Theatre",
    duration: "45 Min",
    tags: ["Vision", "Veränderung", "Politik"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Visualisierung von Veränderungsprozessen.",
      instructions: [
        "Bild 1: Unterdrückung (Ist).",
        "Bild 2: Befreiung (Soll).",
        "Bild 3: Übergang (Wie kommen wir dahin?)."
      ],
      variations: ["Dynamisierung."]
    }
  },
  {
    id: "complete-image",
    title: "Vervollständige das Bild",
    category: "Image Theatre",
    duration: "10 Min",
    tags: ["Spontaneität", "Assoziation"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Training der schnellen Assoziation.",
      instructions: [
        "Zwei Personen frieren in Pose ein.",
        "Eine geht, eine kommt und ergänzt das Bild neu.",
        "Schneller Wechsel."
      ],
      variations: ["Thematisch."]
    }
  },
  {
    id: "status-cards",
    title: "Status Karten",
    category: "Status & Hierarchie",
    duration: "20 Min",
    tags: ["Status", "Komödie", "Johnstone"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Sichtbarmachung von sozialen Hierarchien.",
      instructions: [
        "Karte an der Stirn (man kennt eigenen Wert nicht).",
        "Andere entsprechend ihrem Wert behandeln.",
        "Eigenen Status erraten."
      ],
      variations: ["Zahlen 1-10."]
    }
  },
  {
    id: "master-servant",
    title: "Herrschaft und Bedienstete",
    category: "Status & Szene",
    duration: "20 Min",
    tags: ["Status", "Subversion", "Szenisch"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Erforschung von subtilem Widerstand.",
      instructions: [
        "Szene mit klarer Hierarchie.",
        "Bedienstete*r führt Befehle aus, untergräbt aber subtil den Status."
      ],
      variations: ["Statuswechsel."]
    }
  },
  {
    id: "rashomon",
    title: "Rashomon",
    category: "Konflikt & Wahrnehmung",
    duration: "30 Min",
    tags: ["Empathie", "Wahrnehmung"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Subjektive Wahrnehmung von Konflikten.",
      instructions: [
        "Szene spielen.",
        "Wiederholung streng aus Sicht A.",
        "Wiederholung streng aus Sicht B."
      ],
      variations: ["Beobachter-Perspektive."]
    }
  },
  {
    id: "push-not-win",
    title: "Push not to win",
    category: "Körperarbeit",
    duration: "10 Min",
    tags: ["Körperarbeit", "Dialektik"],
    attributes: { focus: "intro", energy: "high", level: "beginner" },
    content: {
      context: "Dynamisches Gleichgewicht statt Sieg.",
      instructions: [
        "Paare schieben gegeneinander.",
        "Wenn Partner*in fällt, sofort stützen/nachgeben.",
        "Gemeinsamer Widerstand."
      ],
      variations: ["Rücken an Rücken."]
    }
  },
  {
    id: "cops-in-head",
    title: "Der Polizist im Kopf",
    category: "Rainbow of Desire",
    duration: "45 Min",
    tags: ["Psychologie", "Blockaden", "Internalisierung"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Internalisierte Unterdrückung sichtbar machen.",
      instructions: [
        "Protagonist*in zeigt Blockade-Situation.",
        "Schauspielende verkörpern die inneren Stimmen ('Du kannst das nicht').",
        "Kampf gegen die Stimmen."
      ],
      variations: ["Gute Polizisten."]
    }
  },
  {
    id: "rainbow-desire",
    title: "Regenbogen der Wünsche",
    category: "Rainbow of Desire",
    duration: "45 Min",
    tags: ["Gefühle", "Komplexität"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Komplexität innerer Wünsche zeigen.",
      instructions: [
        "Szene stoppen.",
        "Alle widersprüchlichen Wünsche benennen.",
        "Schauspielende verkörpern je einen Wunsch extrem."
      ],
      variations: ["Wünsche interagieren."]
    }
  },
  {
    id: "image-antagonist",
    title: "Das Bild des Antagonisten",
    category: "Rainbow of Desire",
    duration: "30 Min",
    tags: ["Feindbild", "Verständnis"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Gegner verstehen lernen.",
      instructions: [
        "Bild des Gegners aus eigener Sicht (Monster).",
        "Bild des Gegners aus dessen Sicht (Held/Opfer).",
        "Vergleich."
      ],
      variations: ["Dritte Perspektive."]
    }
  },
  {
    id: "walking-grid",
    title: "Walking the Grid",
    category: "Viewpoints",
    duration: "15 Min",
    tags: ["Raum", "Präsenz", "Geometrie"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Raumbewusstsein schärfen.",
      instructions: [
        "Gehen nur in 90-Grad-Winkeln.",
        "Klare Entscheidungen für Stopp und Drehung.",
        "Soft Focus."
      ],
      variations: ["Tempowechsel."]
    }
  },
  {
    id: "7-levels",
    title: "7 Spannungszustände",
    category: "Lecoq Technik",
    duration: "20 Min",
    tags: ["Körper", "Ausdruck", "Skala"],
    attributes: { focus: "extra", energy: "high", level: "advanced" },
    content: {
      context: "Skala der körperlichen Präsenz.",
      instructions: [
        "Von 1 (Erschöpft) bis 7 (Tragisch/Versteinert) durch die Zustände gehen."
      ],
      variations: ["Szenen in Stufe 4 vs Stufe 6."]
    }
  },
  {
    id: "stick-ball-veil",
    title: "Stock, Ball, Schleier",
    category: "Chekhov Technik",
    duration: "15 Min",
    tags: ["Charakter", "Bewegung"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Bewegungszentren und Qualitäten.",
      instructions: [
        "Bewegen mit Zentrum Kopf (Stock).",
        "Zentrum Becken (Ball).",
        "Zentrum Herz/Hülle (Schleier)."
      ],
      variations: ["Charakterbau."]
    }
  },
  {
    id: "neutral-mask",
    title: "Die Neutrale Maske",
    category: "Lecoq Technik",
    duration: "20 Min",
    tags: ["Stille", "Präsenz", "Basis"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Nullpunkt des Schauspiels.",
      instructions: [
        "Mit neutraler Maske/Gesicht im Raum sein.",
        "Keine Geschichte, keine Vergangenheit, nur Präsenz."
      ],
      variations: ["Begegnung."]
    }
  },
  {
    id: "elements",
    title: "Elemente",
    category: "Lecoq Technik",
    duration: "15 Min",
    tags: ["Verkörperung", "Natur"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Verkörperung von Naturelementen.",
      instructions: [
        "Feuer, Wasser, Erde, Luft körperlich darstellen (nicht spielen, sondern sein)."
      ],
      variations: ["Materialien."]
    }
  },
  {
    id: "newspaper-theatre",
    title: "Zeitungstheater",
    category: "Politisches Theater",
    duration: "45 Min",
    tags: ["Medien", "Politik", "Textarbeit"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Dekonstruktion von Medien.",
      instructions: [
        "Techniken anwenden: Gekreuztes Lesen, Rhythmisches Lesen etc."
      ],
      variations: ["Social Media."]
    }
  }
];

// --- KOMPONENTEN ---

const SwipeCard = ({ step, onSwipe, direction }) => {
  const cards = [
    {
      step: 0,
      title: "Wonach suchst du?",
      icon: <Brain size={48} className="text-white mb-4" />,
      left: { label: "Innenwelt", desc: "Gefühle, Psychologie, Introspektion", val: "intro", color: PRIMARY_COLOR },
      right: { label: "Außenwelt", desc: "Körper, Raum, Politik, Gesellschaft", val: "extra", color: PRIMARY_COLOR }
    },
    {
      step: 1,
      title: "Energielevel?",
      icon: <Activity size={48} className="text-white mb-4" />,
      left: { label: "Fokussiert", desc: "Konzentration, Analyse, Ruhe", val: "low", color: PRIMARY_COLOR },
      right: { label: "Aktivierend", desc: "Bewegung, Chaos, High Energy", val: "high", color: PRIMARY_COLOR }
    },
    {
      step: 2,
      title: "Erfahrung der Gruppe?",
      icon: <Layers size={48} className="text-white mb-4" />,
      left: { label: "Anfänger", desc: "Warm-up, Einfache Regeln, Kennenlernen", val: "beginner", color: PRIMARY_COLOR },
      right: { label: "Fortgeschritten", desc: "Szenisch, Komplex, Schauspiel", val: "advanced", color: PRIMARY_COLOR }
    }
  ];

  const currentCard = cards[step];
  
  // Animation classes
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

const DetailModal = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-slideUp">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
        >
          <X size={20} className="text-slate-600" />
        </button>

        <div className="p-8">
          <span className={`text-xs font-bold uppercase tracking-wider ${PRIMARY_TEXT_COLOR} mb-2 block`}>
            {game.category}
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{game.title}</h2>
          
          {/* Duration Badge */}
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
                  <span>{step}</span>
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
  const [view, setView] = useState('start'); // start, swipe, results
  const [swipeStep, setSwipeStep] = useState(0); // 0, 1, 2
  const [filters, setFilters] = useState({ focus: null, energy: null, level: null });
  const [slideDir, setSlideDir] = useState(null); // 'left', 'right', null
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

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
    if (slideDir) return; // Prevent double clicks

    setSlideDir(direction);
    
    // Update filters based on step
    const newFilters = { ...filters };
    if (swipeStep === 0) newFilters.focus = value;
    if (swipeStep === 1) newFilters.energy = value;
    if (swipeStep === 2) newFilters.level = value;
    setFilters(newFilters);

    // Wait for animation
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
    // Filter Logic
    const results = EXERCISE_DB.filter(game => {
      const matchFocus = game.attributes.focus === finalFilters.focus;
      const matchEnergy = game.attributes.energy === finalFilters.energy;
      const matchLevel = game.attributes.level === finalFilters.level;
      return matchFocus && matchEnergy && matchLevel;
    });

    // Fallback logic
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

  return (
    <div className={`min-h-screen bg-slate-50 font-sans text-slate-900 ${SELECTION_COLOR}`}>
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
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

      {/* CONTENT */}
      <main className="max-w-md mx-auto relative min-h-[calc(100vh-80px)] overflow-hidden">
        
        {/* VIEW: START */}
        {view === 'start' && (
          <div className="flex flex-col items-center justify-center h-full pt-16 px-6 animate-fadeIn text-center">
            <div className="mb-8 mx-auto flex items-center justify-center">
                <img 
                  src={LOGO_URL} 
                  alt="Polithea Logo" 
                  className="object-contain" 
                  style={{ maxWidth: '160px', height: 'auto' }}
                />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 leading-tight">
              Du bereitest die Probe vor und suchst die passenden Spiele und Übungen?
            </h2>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto text-lg font-medium">
              Geilo, du bist hier richtig!
            </p>
            <div className="w-full space-y-4">
              <button 
                onClick={handleStart}
                className={`w-full py-4 ${PRIMARY_COLOR} text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-200/50 ${PRIMARY_COLOR_HOVER} hover:shadow-xl transition-all active:scale-95 flex items-center justify-center`}
              >
                Starten <ArrowRight className="ml-2" />
              </button>
              
              <button 
                onClick={handleRandom}
                className="w-full py-3 bg-white text-slate-600 border-2 border-slate-200 rounded-xl font-bold text-base hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 flex items-center justify-center"
              >
                <Shuffle size={18} className="mr-2" /> Zufälliges Spiel
              </button>
            </div>
            <p className="mt-8 text-xs text-slate-400">Powered by Polithea Osnabrück • Version 1.1</p>
          </div>
        )}

        {/* VIEW: SWIPE */}
        {view === 'swipe' && (
          <div className="h-full flex flex-col">
            <div className="flex justify-center pt-8 space-x-2 mb-4">
              <div className={`h-1.5 w-8 rounded-full transition-colors ${swipeStep >= 0 ? PRIMARY_COLOR : 'bg-slate-200'}`} />
              <div className={`h-1.5 w-8 rounded-full transition-colors ${swipeStep >= 1 ? PRIMARY_COLOR : 'bg-slate-200'}`} />
              <div className={`h-1.5 w-8 rounded-full transition-colors ${swipeStep >= 2 ? PRIMARY_COLOR : 'bg-slate-200'}`} />
            </div>
            
            <div className="px-4">
                <SwipeCard 
                step={swipeStep} 
                onSwipe={handleSwipe} 
                direction={slideDir} 
                />
            </div>
          </div>
        )}

        {/* VIEW: RESULTS */}
        {view === 'results' && (
          <div className="pt-6 pb-20">
            <ResultsView 
              results={filteredGames} 
              onReset={handleStart} 
              onSelect={setSelectedGame}
            />
          </div>
        )}

        {/* MODAL: DETAILS */}
        {selectedGame && (
          <DetailModal 
            game={selectedGame} 
            onClose={() => setSelectedGame(null)} 
          />
        )}

      </main>

      {/* Global CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}