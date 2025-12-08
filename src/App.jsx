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

// --- DATENBANK (TEIL B) - VOLLSTÄNDIG DETAILLIERT ---
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
      context: "Ein hochenergetisches Spiel, das Wachheit, Präzision und schnelle Reaktionen erfordert. Es weckt müde Gruppen sofort auf und synchronisiert die Aufmerksamkeit.",
      instructions: [
        "Die Gruppe steht im Kreis. Eine Person beginnt als Samurai, hebt das imaginäre Schwert (beide Hände zusammen) über den Kopf und ruft laut 'Hah!'.",
        "Sie 'schlägt' das Schwert energisch nach unten und zeigt dabei auf eine andere Person im Kreis.",
        "Diese angezielte Person reißt sofort ihre Hände hoch über den Kopf und ruft ebenfalls 'Hah!'.",
        "Nun müssen die beiden direkten Nachbar*innen der angezielten Person reagieren: Sie 'schlagen' mit ihren Schwertern seitlich in die Bauchhöhe der mittleren Person (ohne Berührung) und rufen 'Hah!'.",
        "Die Person in der Mitte, die gerade 'angegriffen' wurde, übernimmt nun die Führung und schlägt das Schwert wieder nach unten, um den Impuls an jemand anderen weiterzugeben.",
        "Wer zögert, die falsche Bewegung macht oder vergisst zu schreien, scheidet aus und feuert die anderen an."
      ],
      variations: ["Zeitlupe-Runde.", "Ohne Töne (Silent Samurai).", "Wer rausfliegt, läuft eine Runde um den Kreis, um wieder reinzukommen."]
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
      context: "Ein extrem lustiges Reaktionsspiel, bei dem es darum geht, sich nicht zu ernst zu nehmen und schnell im Team zu reagieren. Perfekt, um die Stimmung zu lockern.",
      instructions: [
        "Alle stehen im Kreis. Eine Person steht in der Mitte, zeigt auf jemanden im Kreis und nennt eine Figur (z.B. 'Elefant').",
        "Die angezeigte Person und ihre beiden direkten Nachbar*innen müssen sofort gemeinsam diese Figur darstellen.",
        "**Der Toaster:** Die mittlere Person springt auf und ab. Die Nachbarn bilden mit ihren Armen einen Kasten um sie herum.",
        "**Der Elefant:** Die Mitte macht mit den Armen einen Rüssel. Die Nachbarn formen mit ihren Armen große Ohren an den Seiten der mittleren Person.",
        "**Kotzendes Känguru:** Die Mitte hält die Hände wie einen Beutel vor den Bauch und macht Würgegeräusche. Die Nachbarn hüpfen panisch als kleine Kängurus zur Seite.",
        "**James Bond:** Die Mitte macht eine Pistolen-Pose. Die Nachbarn schmachten die Mitte an ('Oh, James!').",
        "Wer zu langsam ist oder falsch reagiert, muss in die Mitte und die nächste Figur ansagen."
      ],
      variations: ["Die Gruppe erfindet eigene Figuren (z.B. Waschmaschine, Mixer, Palme)."]
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
      context: "Trainiert die stimmliche Vielfalt und das Zusammenspiel in der Gruppe. Die Teilnehmenden werden zu Instrumenten einer Emotion, statt Musik zu machen.",
      instructions: [
        "Die Gruppe steht im Halbkreis (das Orchester). Eine Person (der/die Dirigent*in) steht davor.",
        "Der/Die Dirigent*in weist verschiedenen Gruppen oder Einzelpersonen bestimmte Emotionen zu (z.B. 'Ihr seid die Wut', 'Ihr seid die Trauer', 'Du bist hysterische Freude').",
        "Die Teilnehmenden dürfen nur Geräusche, Laute oder Gibberish (Kauderwelsch) nutzen, keine echten Wörter.",
        "Der/Die Dirigent*in 'spielt' nun das Orchester: Er/Sie zeigt auf Gruppen, bestimmt mit Handbewegungen die Lautstärke (hoch/runter) und das Tempo.",
        "Er/Sie kann Emotionen mischen, Solos vergeben oder ein Crescendo (alle laut) erzeugen. Ziel ist eine 'Symphonie der Gefühle'."
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
      context: "Fördert das Zuhören und das Akzeptieren von Angeboten (Ja-Sagen). Die eigene Idee muss zugunsten der Gruppengeschichte aufgegeben werden.",
      instructions: [
        "Die Gruppe steht im Kreis.",
        "Das Ziel ist es, gemeinsam eine zusammenhängende Geschichte zu erzählen. Jede Person darf aber immer nur genau **ein einziges Wort** beisteuern.",
        "Die Geschichte sollte grammatikalisch korrekt sein und Sinn ergeben (oder lustigen Unsinn).",
        "Beispiel: Person A: 'Es', Person B: 'war', Person C: 'einmal', Person D: 'ein', Person E: 'riesiger'...",
        "Wichtig ist, nicht den Satz im eigenen Kopf vorzuplanen, sondern spontan auf das Wort davor zu reagieren. Wenn der Satz zu Ende ist, sagt die nächste Person 'Punkt' und beginnt einen neuen."
      ],
      variations: ["Als 'Experte' mit vier Köpfen: Vier Personen sitzen eng nebeneinander und beantworten Fragen des Publikums als eine Person Wort für Wort."]
    }
  },
  // KATEGORIE 1: AUFWÄRMEN
  {
    id: "the-machine",
    title: "Die Maschine",
    category: "Gruppendynamik & Rhythmus",
    duration: "10-15 Min",
    tags: ["Kooperation", "Körperarbeit", "Sound"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Eine großartige Übung, um eine Gruppe in Einklang zu bringen. Sie zeigt, wie individuelle Beiträge ein großes Ganzes ergeben und fördert das Zuhören.",
      instructions: [
        "Eine Person beginnt in der Mitte des Raumes mit einer sich wiederholenden, mechanischen Bewegung und einem dazu passenden Geräusch.",
        "Eine zweite Person beobachtet dies kurz, kommt hinzu und fügt eine eigene Bewegung mit Geräusch an, die sich logisch, rhythmisch oder körperlich auf die erste bezieht (z.B. ein Zahnrad, das in das erste greift).",
        "Nacheinander kommen alle Teilnehmenden hinzu, bis eine riesige, komplexe 'Maschine' aus Körpern und Klängen entsteht.",
        "Die Spielleitung kann die Maschine 'manipulieren': 'Schneller!', 'Zeitlupe!', 'Lauter!', oder 'Stecker ziehen' (alle fallen zusammen)."
      ],
      variations: ["Die Maschine produziert ein bestimmtes Produkt (z.B. 'Hoffnung').", "Die Maschine wird langsam dekonstruiert, Person für Person."]
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
      context: "Dieses Spiel trainiert radikale Akzeptanz und bringt die Energie sofort hoch. Es verhindert langes Nachdenken ('Zensur im Kopf') und fördert das gemeinsame Tun.",
      instructions: [
        "Die Gruppe läuft ziellos kreuz und quer durch den Raum.",
        "Eine Person ruft laut einen Vorschlag für eine Tätigkeit in den Raum, z.B.: 'Lasst uns alle Bäume fällen!' oder 'Lasst uns wie Hühner gackern!'",
        "Alle anderen rufen sofort laut und begeistert: 'Ja, genau!' (oder 'Yes, let's!') und führen die vorgeschlagene Tätigkeit sofort pantomimisch aus.",
        "Nach kurzer Zeit macht eine andere Person einen neuen Vorschlag, wieder rufen alle 'Ja, genau!' und wechseln die Tätigkeit.",
        "Ziel ist es, so viele Impulse wie möglich schnell hintereinander umzusetzen, ohne sie zu bewerten."
      ],
      variations: ["Gefühle einbauen ('Lasst uns wütend sein!').", "Abstrakte Konzepte ('Lasst uns rot sein!')."]
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
      context: "Ein Klassiker, der die Beobachtungsgabe schärft und eine knisternde Atmosphäre erzeugt. Ideal, um eine unruhige Gruppe zu fokussieren.",
      instructions: [
        "Die Gruppe sitzt im Kreis oder läuft durcheinander. Eine Person wird als Detektiv*in bestimmt und vor die Tür geschickt.",
        "Die Spielleitung bestimmt heimlich eine*n 'Mörder*in' (z.B. durch Antippen auf den Rücken, während alle die Augen zu haben).",
        "Der/Die Detektiv*in kommt zurück in die Mitte.",
        "Der/Die Mörder*in 'tötet' andere Teilnehmende durch diskretes Zuwinkern (Blinzeln).",
        "Wer angeblinzelt wird, wartet kurz (damit es nicht zu offensichtlich ist) und stirbt dann dramatisch (mit Geräusch/Umfallen).",
        "Der/Die Detektiv*in muss herausfinden, wer der Mörder ist. Er/Sie hat drei Versuche."
      ],
      variations: ["Thematisches Sterben (z.B. wie in einer Oper sterben).", "Zwei Mörder gleichzeitig."]
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
      context: "Diese Übung fördert die Unabhängigkeit der Gehirnhälften. Sie soll schwierig sein! Das Ziel ist, über das eigene Scheitern zu lachen, statt frustriert zu sein.",
      instructions: [
        "Alle Teilnehmenden stehen bequem im Raum.",
        "Hebt die rechte Hand und zeichnet kontinuierlich einen großen Kreis in die Luft.",
        "Wenn das läuft, nehmt die linke Hand dazu und zeichnet ein großes Plus-Zeichen (Kreuz) in die Luft.",
        "Versucht, beide Bewegungen gleichzeitig und im gleichen Tempo auszuführen.",
        "Meistens beginnt eine Hand, der anderen zu folgen. Schüttelt die Arme aus und versucht es erneut."
      ],
      variations: ["Rechte Hand Kreis, rechtes Bein schreibt den eigenen Namen auf den Boden.", "Wechsel: Linke Hand Kreis, rechte Hand Kreuz."]
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
      context: "Fokus auf das bewusste Umschalten zwischen Körperspannung und totaler Entspannung. Ein sehr physischer Eisbrecher.",
      instructions: [
        "Eine Person ist der 'Bär', alle anderen sind 'Holzfällende'.",
        "Der Bär dreht sich um, schließt die Augen und zählt laut (z.B. bis 5). Die Holzfällenden bewegen sich frei im Raum.",
        "Der Bär dreht sich blitzschnell um und brüllt laut. Alle Holzfällenden müssen sofort 'tot' umfallen und regungslos (entspannt) liegen bleiben.",
        "Der Bär geht herum und prüft die 'Leichen': Er hebt Arme oder Beine an. Diese müssen schwer und entspannt zurückfallen.",
        "Wer Spannung zeigt, lacht oder hilft (den Arm festhält), wird ebenfalls zum Bären und hilft beim Prüfen."
      ],
      variations: ["Thematische Anpassung: Bildhauer und Tonfiguren.", "Mehrere Bären von Anfang an."]
    }
  },
  {
    id: "bomb-shield",
    title: "Bombe und Schutzschild",
    category: "Raum & Dynamik",
    duration: "10-15 Min",
    tags: ["Raum", "Dynamik", "Paranoia"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Simuliert komplexe Massenbewegungen. Zeigt, wie individuelle, geheime Ziele zu kollektivem Chaos führen können.",
      instructions: [
        "Alle gehen durch den Raum. Jede*r wählt geheim eine Person als 'Bombe' und eine andere Person als 'Schutzschild' aus.",
        "Die einzige Regel: Du musst dich immer so bewegen, dass dein 'Schutzschild' räumlich genau zwischen dir und der 'Bombe' ist.",
        "Auf 'Los' versuchen alle gleichzeitig, diese Position einzunehmen.",
        "Da sich Bombe und Schild auch bewegen, entsteht ein dynamisches, nie endendes Chaos.",
        "Stoppen und Reflektieren: Wie fühlt es sich an, von außen gesteuert zu werden?"
      ],
      variations: ["Umgekehrte Regel: Sei so nah wie möglich an der Bombe und so weit wie möglich vom Schild."]
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
      context: "Untersucht Führung und Hingabe auf non-verbale Weise. Fördert Empathie für die Grenzen des Partners.",
      instructions: [
        "Paarbildung. Person A hält die Handfläche ca. 20-30cm vor das Gesicht von Person B.",
        "Person B ist 'hypnotisiert': Sie muss ihren Kopf so bewegen, dass der Abstand zur Handfläche immer exakt gleich bleibt.",
        "A beginnt langsam, die Hand zu bewegen (hoch, runter, drehen, durch den Raum gehen). B muss mit dem ganzen Körper folgen (in die Knie gehen, strecken).",
        "A ist verantwortlich für die Sicherheit von B (nirgendwo gegenstoßen!).",
        "Nach 3-5 Minuten Rollenwechsel."
      ],
      variations: ["Gegenseitige Hypnose: A führt B mit der rechten Hand, B führt A mit der linken Hand.", "Gruppenhypnose: Einer führt drei Leute gleichzeitig."]
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
      context: "Ein schnelles Spiel, das wach macht. Es kann auch als Metapher für Verdrängung oder Platzmangel genutzt werden.",
      instructions: [
        "Alle sitzen im Kreis auf Stühlen. Eine Person steht in der Mitte (hat keinen Stuhl).",
        "Die Person in der Mitte geht zu jemandem im Kreis, zeigt auf ihn und ruft laut 'Rutsch!' (oder 'Budge!').",
        "Die angesprochene Person muss sofort aufstehen und wegrennen, um einen *neuen* Platz zu finden.",
        "Gleichzeitig müssen die beiden Nachbarn der angesprochenen Person einen Platz aufrücken, um die Lücke zu schließen. Es entsteht Bewegung.",
        "Die Person aus der Mitte versucht, einen der freiwerdenden Stühle zu ergattern.",
        "Wer übrig bleibt, muss in die Mitte."
      ],
      variations: ["Ohne Stühle: Markierungen am Boden nutzen.", "Die Richtung des Aufrückens variieren."]
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
      context: "Der Klassiker zur Energiefokussierung. Es geht um klare Impulse, Augenkontakt und schnelles Reagieren.",
      instructions: [
        "Alle im Kreis. Wir schicken Energie herum.",
        "**Zip:** Ein Klatschen mit Blickkontakt zum direkten Nachbarn (links oder rechts). Die Energie fließt weiter.",
        "**Zap:** Ein Klatschen quer durch den Kreis zu einer beliebigen Person. Blickkontakt ist essenziell!",
        "**Boing:** Wenn man ein Zip oder Zap bekommt, kann man 'Boing' rufen und mit beiden Händen abwehren. Der Sender muss den Impuls dann woanders hinschicken.",
        "Das Tempo sollte stetig gesteigert werden. Wer schläft, fliegt raus (oder alle jubeln ihm zu)."
      ],
      variations: ["Zoom (Auto-Geräusch) für Richtungswechsel.", "Toaster (als Strafrunde)."]
    }
  },
  {
    id: "glass-cobra",
    title: "Die Gläserne Kobra",
    category: "Gruppendynamik",
    duration: "15-20 Min",
    tags: ["Sinne", "Vertrauen", "Blind"],
    attributes: { focus: "intro", energy: "low", level: "beginner" },
    content: {
      context: "Fördert das Spüren der Gruppe als einen Organismus. Man muss die Kontrolle abgeben und auf feine Signale hören.",
      instructions: [
        "Die Gruppe formt eine Polonaise. Alle schließen die Augen, außer der allerersten Person (Kopf der Kobra).",
        "Jede*r legt die Hände auf die Schultern der Vorderperson.",
        "Der Kopf führt die Schlange langsam durch den Raum. Er muss Hindernisse umgehen.",
        "Die Impulse (Stopp, Rechts, Links, Schneller) müssen rein körperlich über die Hände/Schultern von vorne nach ganz hinten durchgegeben werden.",
        "Das Ziel: Die Kobra darf nicht zerreißen. Wenn der Kontakt abreißt, frieren alle ein."
      ],
      variations: ["Der Kopf geht ans Ende der Schlange, die nächste Person übernimmt (Augen auf).", "Komplett blind (nur für sichere Räume)."]
    }
  },
  {
    id: "human-knot",
    title: "Der Menschliche Knoten",
    category: "Problemlösung",
    duration: "15 Min",
    tags: ["Problemlösung", "Körperkontakt", "Kooperation"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Ein physisches Rätsel, das Berührungsängste abbaut und Kooperation erzwingt.",
      instructions: [
        "Alle stehen eng im Kreis, Schulter an Schulter.",
        "Alle schließen die Augen und strecken die Hände in die Mitte.",
        "Jede Hand sucht eine andere Hand zum Greifen. Regeln: Nicht die Hand des direkten Nachbarn und nicht beide Hände derselben Person.",
        "Augen auf. Jetzt ist die Gruppe verknotet.",
        "Aufgabe: Entwirrt den Knoten, bis wieder ein großer Kreis (oder mehrere kleine) entsteht, ohne die Hände loszulassen.",
        "Man muss übereinander steigen, drunter durch kriechen usw. Vorsicht ist geboten!"
      ],
      variations: ["Stumm (ohne Sprechen).", "Mit verbundenen Augen (sehr schwer!)."]
    }
  },
  {
    id: "racing-chairs",
    title: "Rhythmus mit Stühlen",
    category: "Kooperation & Stress",
    duration: "15-20 Min",
    tags: ["Kooperation", "Stress", "De-Mechanisierung"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Kooperation unter Zeitdruck und Ressourcenmangel. Zeigt, wie Gruppen sich unter Stress organisieren.",
      instructions: [
        "Stelle eine Reihe von Stühlen auf (Anzahl der Teilnehmenden + 1).",
        "Alle stellen sich auf die Stühle hintereinander. Der letzte Stuhl ist frei.",
        "Ziel: Die Gruppe muss eine bestimmte Strecke zurücklegen (oder den Raum durchqueren), ohne den Boden zu berühren.",
        "Dazu muss der jeweils freie Stuhl von hinten nach vorne durchgereicht werden.",
        "Alle müssen eng zusammenrücken, um Platz zu machen. Wenn jemand den Boden berührt, geht es zurück zum Start."
      ],
      variations: ["Wettkampf: Zwei Teams gegeneinander.", "Verbot der verbalen Kommunikation."]
    }
  },
  {
    id: "count-to-20",
    title: "Zählen bis 20",
    category: "Zuhören & Fokus",
    duration: "10-15 Min",
    tags: ["Zuhören", "Gruppengefühl"],
    attributes: { focus: "intro", energy: "low", level: "beginner" },
    content: {
      context: "Trainiert das kollektive Zuhören und das Gespür für den richtigen Moment (Timing). Bringt Ruhe rein.",
      instructions: [
        "Alle liegen am Boden oder sitzen im Kreis, Augen geschlossen.",
        "Aufgabe: Die Gruppe muss gemeinsam von 1 bis 20 zählen.",
        "Regeln: Keine Absprachen, keine feste Reihenfolge. Jede Zahl darf nur von einer Person gesagt werden.",
        "Wenn zwei oder mehr Leute gleichzeitig eine Zahl sagen, stoppt das Spiel und die Gruppe muss wieder bei '1' anfangen.",
        "Es erfordert Geduld: Man muss lernen, Impulse zurückzuhalten."
      ],
      variations: ["Rückwärts zählen.", "Bis zur Anzahl der Gruppenteilnehmer zählen."]
    }
  },
  {
    id: "great-game-power",
    title: "Das große Spiel der Macht",
    category: "Image Theatre",
    duration: "30-45 Min",
    tags: ["Analyse", "Visuell", "Politik"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Eine zentrale Übung des Bildertheaters, die analysiert, wie Machtverhältnisse allein durch räumliche Anordnung entstehen.",
      instructions: [
        "In der Mitte des Raumes werden verschiedene Alltagsgegenstände platziert (z.B. ein Stuhl, ein Tisch, eine Flasche, ein Buch).",
        "Aufgabe an die Gruppe: 'Arrangiere diese Objekte so im Raum, dass einer der Stühle der absolut mächtigste Gegenstand im Ensemble wird.'",
        "Die Teilnehmenden treten nacheinander vor und verändern das Bild (ohne zu sprechen).",
        "Wenn ein interessantes Bild entsteht, wird diskutiert: Warum wirkt dieser Stuhl mächtig? (Höhe? Isolation? Alle anderen schauen ihn an?)",
        "Im zweiten Schritt stellen sich Personen in das Bild, um die Machtverhältnisse zu verstärken oder herauszufordern."
      ],
      variations: ["Den 'einsamsten' Stuhl bauen.", "Den 'solidarischsten' Raum bauen."]
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
      context: "Nutzt Körperbilder, um soziale Probleme zu analysieren und konkrete Visionen für Veränderung zu entwickeln.",
      instructions: [
        "1. **Bild des Ist-Zustands:** Die Gruppe (oder ein Protagonist) baut eine Statue, die ein reales Problem oder eine Unterdrückung darstellt. Analyse: Was sehen wir?",
        "2. **Bild des Soll-Zustands:** Die Gruppe baut das ideale Gegenbild (die Befreiung/Lösung). Ist das realistisch?",
        "3. **Bild des Übergangs:** Das wichtigste Bild. Die Gruppe formt Schritt für Schritt den Weg vom Ist zum Soll. Wie kommen wir dahin?",
        "Es entstehen mehrere 'Zwischenbilder', die konkrete Handlungsschritte symbolisieren."
      ],
      variations: ["Dynamisierung: Die Statuen dürfen sich bewegen oder einen Satz sagen."]
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
      context: "Training der schnellen visuellen Assoziation. Zeigt, wie Kontext Bedeutung verändert.",
      instructions: [
        "Zwei Personen gehen in die Mitte und nehmen spontan eine Pose ein (z.B. ein Händedruck). Sie frieren ein.",
        "Eine Person verlässt das Bild. Die verbleibende Person bleibt eingefroren.",
        "Eine neue Person kommt rein und ergänzt die verbliebene Pose zu einem *völlig neuen* Bild (z.B. wird aus dem Händedruck-Arm jemand, der eine Klippe hochgezogen wird).",
        "Einfrieren. Die alte Person geht, eine neue kommt.",
        "Das Spiel wird in schnellem Tempo fortgesetzt."
      ],
      variations: ["Thematische Vorgaben (z.B. 'Familie', 'Arbeitsplatz').", "Arbeit mit mehr als zwei Personen im Bild."]
    }
  },
  {
    id: "status-cards",
    title: "Status Karten",
    category: "Status & Hierarchie",
    duration: "20-30 Min",
    tags: ["Status", "Komödie", "Johnstone"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Sichtbarmachung von sozialen Hierarchien. Inspiriert von Keith Johnstone.",
      instructions: [
        "Jede*r Teilnehmende zieht verdeckt eine Spielkarte aus einem Deck.",
        "Ohne den Wert anzusehen, hält man sich die Karte vor die Stirn (alle anderen sehen den Wert, man selbst nicht).",
        "Ass/König = Hoher Status. 2/3 = Niedriger Status.",
        "Die Gruppe bewegt sich durch den Raum (Party-Situation). Man behandelt die anderen entsprechend ihrem Kartenwert (respektvoll, unterwürfig, herablassend, ignorierend).",
        "Ziel: Jede*r muss am Ende raten, welchen Status/Wert er oder sie selbst hat."
      ],
      variations: ["Zahlenkarten 1-10 nutzen.", "Statuswippe spielen (Status während einer Szene tauschen)."]
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
      context: "Erforschung von subtilem Widerstand und Machtverhältnissen.",
      instructions: [
        "Zwei Personen improvisieren eine Szene mit klarer Rollenverteilung: Eine Person spielt 'hohen Status' (Chef*in/König*in), die andere 'niedrigen Status' (Bedienstete*r).",
        "Die Chef-Person gibt Befehle, die andere muss diese ausführen.",
        "Die spezifische Aufgabe für die untergeordnete Rolle ist es, jeden Befehl zwar äußerlich zu befolgen, aber dabei den Status des/der Vorgesetzten subtil zu untergraben.",
        "Techniken: Übereifer, 'versehentliche' Missverständnisse, Tollpatschigkeit, die dem Chef schadet.",
        "Ziel: Die Machtbalance zum Wanken bringen, ohne offen zu rebellieren."
      ],
      variations: ["Statuswechsel innerhalb der Szene erzwingen."]
    }
  },
  {
    id: "rashomon",
    title: "Rashomon (Perspektivenwechsel)",
    category: "Konflikt & Wahrnehmung",
    duration: "30-45 Min",
    tags: ["Empathie", "Wahrnehmung"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Diese Übung verdeutlicht, wie subjektiv Wahrnehmung ist. Inspiriert von Kurosawas Film, zeigt sie dieselbe Szene aus verschiedenen emotionalen Blickwinkeln.",
      instructions: [
        "Eine kurze Konfliktszene (Streit um etwas) wird einmal 'neutral' oder objektiv gespielt.",
        "**Wiederholung 1:** Die Szene wird streng aus der subjektiven Sicht von Person A (z.B. Opfer) wiederholt. Die Darstellung darf verzerrt sein, so wie A es 'gefühlt' hat (B wirkt riesig und aggressiv, A wirkt klein und hilflos).",
        "**Wiederholung 2:** Die Szene wird streng aus der subjektiven Sicht von Person B (z.B. Täter) wiederholt. B sieht sich vielleicht als gerechtfertigt, ruhig oder provoziert.",
        "Diskussion: Wie verändern Emotionen unsere Wahrnehmung der Realität?"
      ],
      variations: ["Eine dritte Version aus Sicht einer unbeteiligten Beobachtung."]
    }
  },
  {
    id: "push-not-win",
    title: "Push not to win",
    category: "Körperarbeit",
    duration: "10-15 Min",
    tags: ["Körperarbeit", "Dialektik"],
    attributes: { focus: "intro", energy: "high", level: "beginner" },
    content: {
      context: "Eine körperliche Übung für dialektische Beziehungen. Sie lehrt, dass Widerstand nicht immer bedeutet, den anderen zu besiegen, sondern dass es um ein dynamisches Gleichgewicht geht.",
      instructions: [
        "Die Gruppe bildet Paare. Die Partner*innen stehen sich gegenüber und legen ihre Hände auf die Schultern des/der anderen.",
        "Auf ein Signal hin beginnen beide, gegeneinander zu schieben. Beide wollen Raum gewinnen.",
        "Die entscheidende Regel lautet: **'Schiebe nicht, um zu gewinnen'**. Das Ziel ist nicht, den/die Partner*in zu Boden zu werfen.",
        "Sobald jemand spürt, dass der/die Partner*in das Gleichgewicht verliert, muss er/sie sofort die Kraft nachlassen und den/die Partner*in stützen.",
        "Es entsteht ein dynamisches Spiel aus Druck und Gegendruck, aus Angriff und Fürsorge."
      ],
      variations: ["Schieben Rücken an Rücken.", "Mit geschlossenen Augen (erhöht die Sensibilität)."]
    }
  },
  {
    id: "cops-in-head",
    title: "Der Polizist im Kopf",
    category: "Rainbow of Desire",
    duration: "45-60 Min",
    tags: ["Psychologie", "Blockaden", "Internalisierung"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Diese Technik aus dem Theater der Unterdrückten macht internalisierte Unterdrückung sichtbar. Wir untersuchen die Stimmen, die uns am Handeln hindern, auch wenn keine äußere Gefahr droht.",
      instructions: [
        "Ein*e Protagonist*in spielt eine Szene aus dem eigenen Leben, in der er/sie gerne gehandelt hätte, aber blockiert war.",
        "Wir identifizieren die Sätze der Blockade ('Du bist zu dumm', 'Sei brav', 'Männer weinen nicht').",
        "Schauspielende aus der Gruppe verkörpern diese Stimmen als 'Polizisten'. Sie umringen den Protagonisten, flüstern ihm die Sätze zu oder halten ihn körperlich fest.",
        "Der/Die Protagonist*in muss nun versuchen, die Szene erneut zu spielen und sich dabei physisch und verbal gegen die Polizisten durchzusetzen.",
        "Ziel ist die Rückgewinnung der Handlungsfähigkeit."
      ],
      variations: ["Suche nach 'Guten Polizisten' (Ressourcen/Unterstützer)."]
    }
  },
  {
    id: "rainbow-desire",
    title: "Regenbogen der Wünsche",
    category: "Rainbow of Desire",
    duration: "45-60 Min",
    tags: ["Gefühle", "Komplexität", "Psychodrama"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Eine der tiefgehendsten Methoden Boals. Sie zerlegt eine Handlung in ihre emotionalen Bestandteile, um innere Widersprüche sichtbar zu machen.",
      instructions: [
        "1. Eine Konfliktszene wird gespielt und an einem Höhepunkt gestoppt.",
        "2. Der/Die Protagonist*in wird gefragt: **'Was willst du in diesem Moment tun?'**. Er/Sie nennt alle, auch widersprüchliche Wünsche (z.B. 'Ich will zuschlagen', 'Ich will weglaufen', 'Ich will geliebt werden').",
        "3. Für jeden genannten Wunsch tritt eine Person aus der Gruppe auf und verkörpert *nur* diesen Wunsch in extremer, körperlicher Form (Allegorie).",
        "4. Die verschiedenen 'Wünsche' interagieren nun mit dem Antagonisten. Der Protagonist sieht sein komplexes Innenleben als Szene vor sich.",
        "5. Analyse: Welcher Wunsch ist dominant? Welcher wird unterdrückt?"
      ],
      variations: ["Der Protagonist versucht, seine Wünsche zu ordnen oder wie ein Dirigent zu steuern."]
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
      context: "Hilft, Strategien gegen Unterdrückende zu entwickeln, indem man versucht, sie nicht nur als Feindbild, sondern in ihrer eigenen Logik zu verstehen.",
      instructions: [
        "1. Der/Die Protagonist*in formt eine Statue des/der Antagonist*in, so wie er/sie ihn subjektiv wahrnimmt (oft als Monster, kalt oder brutal).",
        "2. **Perspektivwechsel:** Der/Die Protagonist*in wird gebeten, ein Bild des/der Antagonist*in zu formen, *so wie dieser sich selbst sehen könnte* (z.B. als missverstandener Held, Opfer der Umstände, pflichtbewusst).",
        "3. Die beiden Bilder werden nebeneinander gestellt. Wo liegen die Unterschiede? Wo sind die blinden Flecken?",
        "Dies dient als Vorbereitung für das Forumtheater, um realistischere Interventionen zu finden."
      ],
      variations: ["Einbeziehung von Bildern, wie Dritte (z.B. Kollegen) die Person sehen."]
    }
  },

  // KATEGORIE 6: SCHAUSPIEL-TECHNIK
  {
    id: "walking-grid",
    title: "Walking the Grid (Viewpoints)",
    category: "Schauspiel-Technik",
    duration: "15-20 Min",
    tags: ["Raum", "Präsenz", "Geometrie"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Eine grundlegende Übung aus der Viewpoints-Methode (Bogart/Landau), die das Bewusstsein für den Raum, Architektur und geometrische Beziehungen schärft.",
      instructions: [
        "Die Gruppe bewegt sich im Raum. Die Vorgabe ist, sich ausschließlich in geraden Linien zu bewegen und nur im 90-Grad-Winkel abzubiegen (wie auf einem Schachbrett).",
        "Die Teilnehmenden sollen ein Bewusstsein für die Linien im Raum entwickeln (parallel zu Wänden).",
        "Jeder Stopp, jede Drehung und jeder Tempowechsel soll eine klare, bewusste Entscheidung sein, kein Zufall.",
        "Einen 'Soft Focus' beibehalten: Nicht auf eine Person starren, sondern den ganzen Raum im Blick haben.",
        "Ziel ist es, eine hohe Wachheit für die räumliche Komposition zu entwickeln und sich als Teil eines größeren Bildes zu begreifen."
      ],
      variations: ["Einführung von extremen Tempowechseln.", "Hinzufügen von Gesten an den Wendepunkten."]
    }
  },
  {
    id: "7-levels",
    title: "Die 7 Spannungszustände (Lecoq)",
    category: "Schauspiel-Technik",
    duration: "30-40 Min",
    tags: ["Körper", "Ausdruck", "Skala"],
    attributes: { focus: "extra", energy: "high", level: "advanced" },
    content: {
      context: "Diese Skala von Jacques Lecoq hilft Schauspielenden, ihre körperliche Präsenz präzise zu steuern. Die Gruppe bewegt sich nacheinander durch alle Stufen:",
      instructions: [
        "1. **Erschöpft (Qualle):** Keine Spannung, der Körper ist schwer wie Blei, fast bewegungsunfähig.",
        "2. **Cool (Kalifornier*in):** Minimale Spannung, alles ist 'easy', lässig, entspannt. Nichts ist wichtig.",
        "3. **Neutral (Ökonomisch):** Die notwendige Spannung, um präsent zu sein. Keine Geschichte, pure Anwesenheit. Der 'Nullpunkt'.",
        "4. **Wach (Neugierig):** Erhöhte Aufmerksamkeit, der Blick ist offen, man ist bereit zu reagieren.",
        "5. **Aktiv/Reaktiv (Drama):** Hohe Spannung, es gibt ein Ziel, Zeitdruck, Konfliktbereitschaft.",
        "6. **Leidenschaftlich (Oper):** Extreme Spannung, große Emotionen (Wut, Liebe), der Körper vibriert, Gesten werden groß.",
        "7. **Tragisch (Versteinert):** Die Spannung ist so hoch, dass Bewegung unmöglich wird. Der Körper erstarrt, innerlich zerreißt es ihn."
      ],
      variations: ["Szenen in unterschiedlichen Zuständen spielen (z.B. Person A in Stufe 2, Person B in Stufe 6)."]
    }
  },
  {
    id: "stick-ball-veil",
    title: "Stock, Ball, Schleier (Chekhov)",
    category: "Schauspiel-Technik",
    duration: "20 Min",
    tags: ["Charakter", "Bewegung", "Imagination"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Nutzt imaginäre Bilder im Körper, um die Qualität von Bewegungen zu verändern und Charaktere zu finden (nach Michael Chekhov).",
      instructions: [
        "Die Teilnehmenden bewegen sich im Raum und stellen sich vor, dass ihr Bewegungszentrum eine bestimmte Qualität hat:",
        "**Stock (Denken):** Das Zentrum ist im Kopf/Nacken. Man hat einen Stock verschluckt. Bewegungen sind gerade, direkt, hölzern, linear, analytisch.",
        "**Ball (Wollen):** Das Zentrum ist im Becken. Ein Energieball treibt an. Bewegungen sind rund, federnd, energisch, impulsiv, erdverbunden.",
        "**Schleier (Fühlen):** Das Zentrum ist in der Herzgegend, Energie umhüllt den Körper wie ein weicher Schleier oder Nebel. Bewegungen sind fließend, tastend, weich, emotional."
      ],
      variations: ["Kombination der Zentren für komplexere Charaktere.", "Alltagshandlungen (Tee trinken) in den drei Qualitäten ausführen."]
    }
  },
  {
    id: "neutral-mask",
    title: "Die Neutrale Maske",
    category: "Schauspiel-Technik",
    duration: "30 Min",
    tags: ["Stille", "Präsenz", "Basis"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Der 'Nullpunkt' des Schauspiels. Es geht darum, persönliche Eigenheiten und Ticks abzulegen, um eine universelle Präsenz zu erreichen.",
      instructions: [
        "Die Teilnehmenden tragen eine neutrale Maske (oder versuchen, das Gesicht vollkommen zu entspannen und ausdruckslos zu halten).",
        "Aufgabe: Durchquere den Raum. Habe keine Vergangenheit, keine Zukunft, keine Absicht, keinen Konflikt. Nur reines Sein.",
        "Es ist extrem schwer, 'nichts' zu erzählen. Jede kleine asymmetrische Bewegung wird sichtbar.",
        "Ziel ist die 'Ökonomie der Bewegung' und das reine Sein im Hier und Jetzt."
      ],
      variations: ["Begegnung mit einem anderen neutralen Wesen.", "Reaktion auf einen einfachen Impuls (ein Geräusch, Regen) aus der Neutralität heraus."]
    }
  },
  {
    id: "elements",
    title: "Elemente (Lecoq)",
    category: "Schauspiel-Technik",
    duration: "20-30 Min",
    tags: ["Verkörperung", "Natur"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Die Verkörperung von Naturelementen ist eine kraftvolle Methode, um neue Bewegungsqualitäten für die Charakterarbeit zu entdecken.",
      instructions: [
        "Die Teilnehmenden bewegen sich im Raum und werden angeleitet, Elemente mit ihrem ganzen Körper zu 'werden' (nicht pantomimisch zu spielen):",
        "**Feuer:** Schnelle, explosive, zuckende Bewegungen. Staccato, Hitze, verzehrend, nach oben strebend.",
        "**Wasser:** Fließende, runde, schwere Bewegungen. Stetig, anpassungsfähig, abwärts fließend.",
        "**Luft:** Leichte, schwebende, chaotische Bewegungen. Schnell, richtungslos, überall im Raum.",
        "**Erde:** Feste, schwere, stabile Bewegungen. Widerstand, Verwurzelung, langsam, unbeweglich."
      ],
      variations: ["Verkörperung von Materialien (Öl, Kaugummi, Stein, Zellophan).", "Entwicklung eines Charakters, der zu 80% aus 'Feuer' besteht."]
    }
  },

  // KATEGORIE 7: ZEITUNGSTHEATER
  {
    id: "newspaper-theatre",
    title: "Zeitungstheater (12 Techniken)",
    category: "Politisches Theater",
    duration: "45-90 Min",
    tags: ["Medien", "Politik", "Textarbeit"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Methoden von Augusto Boal, um Zeitungstexte oder Nachrichten szenisch zu dekonstruieren und die Manipulation oder Ideologie darin sichtbar zu machen.",
      instructions: [
        "Wähle einen aktuellen Artikel. Wende eine der Techniken an:",
        "**1. Gekreuztes Lesen:** Zwei widersprüchliche Artikel (z.B. über Armut und Luxusleben) werden abwechselnd Zeile für Zeile gelesen.",
        "**2. Rhythmisches Lesen:** Ein Text wird zu einem völlig unpassenden musikalischen Rhythmus (z.B. gregorianischer Choral oder Samba) gelesen, um den Inhalt zu 'filtern'.",
        "**3. Ergänzendes Lesen:** Alles, was im Text verschwiegen wird, wird von einer zweiten Person an den passenden Stellen laut hinzugefügt.",
        "**4. Parallele Handlung:** Der Text wird neutral vorgelesen, während im Hintergrund szenisch die brutale Realität gezeigt wird, die der Text verschleiert."
      ],
      variations: ["Anwendung auf Social-Media-Posts oder Politiker-Reden."]
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