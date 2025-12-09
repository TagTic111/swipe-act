import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Brain, Zap, Users, ArrowRight, ArrowLeft, RefreshCw, X, BookOpen, Layers, Activity, Clock, Search, Shuffle, Heart, Share2, Printer, Menu, Library, Home, Shield, Mic, FileText, Map, Lightbulb, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Dice5 } from 'lucide-react';

// --- HELPER: Textformatierung ---
const renderTextWithBold = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-slate-800">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

// --- DATENBANK (VOLLSTÄNDIG) ---
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
      context: "Eine fortgeschrittene Viewpoints-Übung. Sie trainiert, den Raum nicht nur zu füllen, sondern ihn durch Bewegung aktiv zu 'zerschneiden' und zu definieren. Erfordert hohe körperliche Präzision bei hohem Tempo.",
      instructions: [
        "**Phase 1 - Das Rasiermesser:** Alle bewegen sich im Raum. Das Grundtempo ist hoch (nicht rennen, aber sehr zügiges Gehen). Stell dir vor, dein ganzer Körper ist eine scharfe Klinge.",
        "**Phase 2 - Der Widerstand:** Du bewegst dich nicht durch leere Luft, sondern durch eine zähe Masse oder dicke Materie, die du zerschneiden musst. Jede Bewegung muss eine Intention haben.",
        "**Phase 3 - Die Geometrie:** Jede Richtungsänderung muss scharf, plötzlich und winklig sein. Keine Kurven, keine weichen Übergänge. Zacken und Linien.",
        "**Phase 4 - Der Schnitt:** Auf das Kommando 'Schnitt!' (oder ein Klatschen) führen alle gleichzeitig eine einzige, extrem schnelle, raumgreifende Bewegung aus (z.B. mit dem Arm durch die Luft 'schneiden' oder einen Ausfallschritt machen) und frieren sofort in der Endposition ein.",
        "**Phase 5 - Das Freeze:** Im Freeze darf keine Energie verloren gehen. Die Spannung muss bis in die Fingerspitzen gehalten werden. Nach 3-5 Sekunden löst der Spielleiter das Freeze auf ('Weiter!') und die Gruppe startet sofort wieder ins hohe Tempo."
      ],
      variations: ["**Schwarm-Schnitte:** Die Gruppe versucht, ohne Kommando gleichzeitig zu stoppen und zu schneiden.", "**Kontakt-Schnitte:** Man schneidet haarscharf am Körper eines anderen vorbei (Vorsicht & Vertrauen nötig!)."]
    }
  },
  {
    id: "rhythm-oppression",
    title: "Der Rhythmus der Unterdrückung",
    category: "Politisches Theater & Körper",
    duration: "20-30 Min",
    tags: ["Politik", "Körperarbeit", "Rhythmus"],
    attributes: { focus: "extra", energy: "high", level: "advanced" },
    content: {
      context: "Eine Übung, die mechanische Arbeitsabläufe, gesellschaftliche Zwänge oder bürokratische Mühlen körperlich erfahrbar macht. Sie verbindet das Prinzip der 'Maschine' mit einer politischen Machtanalyse.",
      instructions: [
        "**Schritt 1:** Die Gruppe bildet Paare. Person A ist 'das System' (oder die Maschine/der Taktgeber), Person B ist 'der Mensch' (oder der Arbeiter/das Individuum).",
        "**Schritt 2:** A gibt einen strengen, repetitiven, mechanischen Rhythmus vor. Das kann ein Klatschen, ein Stampfen, ein mechanisches Wort ('Zack! Zack!') oder eine Geste sein.",
        "**Schritt 3:** B muss sich in diesem Rhythmus bewegen oder eine Arbeit verrichten. B muss sich dem Takt vollständig unterwerfen.",
        "**Schritt 4:** A erhöht langsam den Druck: Das Tempo wird schneller, der Rhythmus komplexer oder aggressiver. B versucht, Schritt zu halten, gerät aber in Stress.",
        "**Schritt 5:** Die Aufgabe für B ist es nun, innerhalb dieses diktierten Systems winzige Momente der Freiheit, Individualität oder Rebellion zu finden (ein kurzer Blick, eine abweichende Handbewegung, ein kurzes Innehalten), *ohne* völlig aus dem Takt zu kommen oder 'gefeuert' zu werden.",
        "**Reflexion:** Wie viel Freiheit ist in einem repressiven System möglich? Wann bricht das System?"
      ],
      variations: ["**Der Antreiber:** Eine Person gibt den Takt für die ganze Gruppe vor.", "**Kollaps:** Der Rhythmus wird so schnell, dass das System zwangsläufig zusammenbricht."]
    }
  },
  {
    id: "status-chaos",
    title: "Status-Kampf im Chaos",
    category: "Status & Improvisation",
    duration: "15-20 Min",
    tags: ["Status", "Stressresistenz", "Szene"],
    attributes: { focus: "extra", energy: "high", level: "advanced" },
    content: {
      context: "Diese Übung simuliert soziale Konflikte in Stresssituationen (z.B. überfüllter Bahnhof, Panik, Demo). Die Frage ist: Wie behalte oder verliere ich meinen sozialen Status, wenn um mich herum Chaos herrscht?",
      instructions: [
        "**Setup:** Der Raum wird eng begrenzt (z.B. mit Stühlen oder Klebeband markieren). Alle Teilnehmenden befinden sich darin.",
        "**Status:** Alle erhalten geheim einen Status (Zahl 1-10) oder ziehen eine Spielkarte. (1 = ganz unten, 10 = ganz oben).",
        "**Action:** Es herrscht hohes Tempo. Alle müssen sich permanent bewegen, Kreuz und quer, niemand darf stehen bleiben. Der Raum ist eigentlich zu klein.",
        "**Begegnung:** Bei jeder Begegnung (Blickkontakt oder leichtes Anrempeln) muss sofort, im Bruchteil einer Sekunde, ein Status-Duell ausgefochten werden, das dem eigenen Rang entspricht. (Ein 10er weicht nicht aus, ein 1er macht sich klein).",
        "**Ziel:** Das Ziel ist es, den eigenen Status trotz des extremen äußeren Drucks, der Enge und der ständigen Bewegung konsequent durchzuhalten."
      ],
      variations: ["**Status-Wechsel:** Auf Kommando 'Wechsel!' dreht sich die Hierarchie um (1 wird 10).", "**Hochmut:** Alle haben Status 10 auf engstem Raum (führt zu maximalem Konflikt)."]
    }
  },
   
  // --- KATEGORIE: AUFWÄRMEN & ENERGIE ---
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
        "1. Die Gruppe steht im Kreis. Eine Person beginnt als Samurai, hebt das imaginäre Schwert (beide Hände zusammen) über den Kopf und ruft laut 'Hah!'.",
        "2. Sie 'schlägt' das Schwert energisch nach unten und zeigt dabei mit den gefalteten Händen auf eine andere Person im Kreis.",
        "3. Diese angezielte Person reißt sofort ihre Hände hoch über den Kopf und ruft ebenfalls 'Hah!'.",
        "4. **Wichtig:** Nun müssen die beiden direkten Nachbar*innen der angezielten Person reagieren: Sie 'schlagen' mit ihren Schwertern seitlich in die Bauchhöhe der mittleren Person (ohne Berührung) und rufen 'Hah!'.",
        "5. Die Person in der Mitte, die gerade 'angegriffen' wurde, übernimmt nun die Führung. Sie hat das Schwert noch oben und schlägt es nun wieder nach unten, um den Impuls an jemand anderen weiterzugeben.",
        "6. Wer zögert, die falsche Bewegung macht oder vergisst zu schreien, scheidet aus und feuert die anderen an."
      ],
      variations: ["**Zeitlupe:** Alles in Slow Motion.", "**Silent Samurai:** Ohne Töne, nur Atmen.", "**Re-Entry:** Wer rausfliegt, läuft eine Runde um den Kreis und darf wieder rein."]
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
      context: "Ein extrem lustiges Reaktionsspiel, bei dem es darum geht, sich nicht zu ernst zu nehmen und schnell im Team zu reagieren. Perfekt, um die Stimmung zu lockern und 'Coolness' abzulegen.",
      instructions: [
        "Alle stehen im Kreis. Eine Person steht in der Mitte, dreht sich, zeigt plötzlich auf jemanden im Kreis und nennt eine Figur (z.B. 'Elefant').",
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
        "1. Die Gruppe steht im Halbkreis (das Orchester). Eine Person (der/die Dirigent*in) steht davor.",
        "2. Der/Die Dirigent*in weist verschiedenen Gruppen oder Einzelpersonen bestimmte Emotionen zu (z.B. Gruppe A: 'Wut', Gruppe B: 'Trauer', Person C: 'hysterische Freude').",
        "3. Die Teilnehmenden dürfen nur Geräusche, Laute oder Gibberish (Kauderwelsch) nutzen, keine echten Wörter.",
        "4. Der/Die Dirigent*in 'spielt' nun das Orchester: Er/Sie zeigt auf Gruppen, bestimmt mit Handbewegungen die Lautstärke (hoch/runter) und das Tempo.",
        "5. Er/Sie kann Emotionen mischen, Solos vergeben oder ein Crescendo (alle laut) erzeugen. Ziel ist eine 'Symphonie der Gefühle'."
      ],
      variations: ["Ein echtes Lied (z.B. 'Alle meine Entchen') nur mit emotionalen Lauten 'singen'."]
    }
  },
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
      variations: ["**Der Experte:** Vier Personen sitzen eng nebeneinander und beantworten Fragen des Publikums als eine Person Wort für Wort.", "**Highspeed:** Wer zögert, fliegt raus."]
    }
  },
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
   
  // --- KATEGORIE: IMAGE THEATRE (PRAXIS) ---
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
        "Wenn ein interessantes Bild entsteht, wird diskutiert: Warum wirkt dieser Stuhl mächtig? (Höhe? Isolation? Blickachsen?)",
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
    category: "Status",
    duration: "20-30 Min",
    tags: ["Hierarchie", "Komödie"],
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
   
  // --- KATEGORIE: KONFLIKT & FORUM (PRAXIS) ---
  {
    id: "rashomon",
    title: "Rashomon (Perspektivenwechsel)",
    category: "Konflikt",
    duration: "30-45 Min",
    tags: ["Perspektive", "Wahrnehmung"],
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
    tags: ["Dialektik", "Balance"],
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
   
  // --- KATEGORIE: RAINBOW (PRAXIS) ---
  {
    id: "cops-in-head",
    title: "Der Polizist im Kopf",
    category: "Rainbow of Desire",
    duration: "45-60 Min",
    tags: ["Psychologie", "Blockade"],
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
 
  // --- KATEGORIE: SCHAUSPIEL-TECHNIK ---
  {
    id: "walking-grid",
    title: "Walking the Grid",
    category: "Viewpoints",
    duration: "15-20 Min",
    tags: ["Raum", "Geometrie"],
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
    tags: ["Körper", "Ausdruck"],
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
    title: "Stock, Ball, Schleier",
    category: "Chekhov",
    duration: "20 Min",
    tags: ["Charakter", "Imagination"],
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
    category: "Lecoq",
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
    title: "Elemente",
    category: "Lecoq",
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
  }
];

// --- THEORY DATABASE ---
const KNOWLEDGE_BASE = {
  forms: [
    { 
      title: "Bildertheater (Image Theatre)", 
      subtitle: "Die Sprache des Körpers",
      desc: "Das Bildertheater ist die Basis fast aller TdU-Methoden. Es geht davon aus, dass Sprache oft verschleiert oder lügt, während der Körper eine unmittelbarere Wahrheit ausdrückt. Teilnehmende formen sich selbst oder andere zu 'Statuen', um Themen, Gefühle oder Unterdrückung darzustellen. Es kann sowohl diagnostisch (Was ist das Problem?) als auch utopisch (Was wollen wir?) eingesetzt werden.",
      steps: [
        "**Real-Bild:** Wie ist die Situation jetzt? (Diagnose)",
        "**Ideal-Bild:** Wie wünschen wir sie uns? (Utopie)",
        "**Bild des Übergangs:** Wie kommen wir von A nach B? (Strategie)",
        "**Dynamisierung:** Die Statuen werden bewegt oder erhalten einen Satz/Gedanken."
      ],
      goal: "Demokratisierung der Sprache. Auch wer nicht gut reden kann, kann starke Bilder bauen. Analyse von Machtstrukturen im Raum."
    },
    { 
      title: "Forumtheater", 
      subtitle: "Die Probe für die Revolution",
      desc: "Die bekannteste Form. Eine kurze Szene wird gezeigt, in der ein Protagonist scheitert oder unterdrückt wird. Das Publikum ('Zuschau-Spielende') wird eingeladen, 'Stopp!' zu rufen, den Protagonisten zu ersetzen und eine alternative Handlung auszuprobieren. Es geht nicht darum, *die* eine richtige Lösung zu finden, sondern *mögliche* Wege zu erkunden und deren Konsequenzen zu erleben.",
      steps: [
        "**Aufwärmen:** Das Publikum muss aktiviert werden.",
        "**Anti-Modell:** Die Szene wird einmal komplett gezeigt. Sie muss schlecht enden (Scheitern des Protagonisten).",
        "**Joker-Fragen:** War das realistisch? Was hätten wir tun können?",
        "**Intervention:** Zuschauer kommen auf die Bühne, ersetzen den Protagonisten und probieren ihre Idee aus. Die Schauspieler improvisieren die Reaktion.",
        "**Reflexion:** Was hat funktioniert? Was nicht? War es magisch (unrealistisch) oder konkret?"
      ],
      goal: "Aktivierung des Publikums. Training für reales Handeln in Unterdrückungssituationen."
    },
    { 
      title: "Zeitungstheater", 
      subtitle: "Medien-Dekonstruktion",
      desc: "Eine der ersten Methoden Boals, entwickelt unter der brasilianischen Diktatur. Es dient dazu, Nachrichten oder Texte szenisch zu zerlegen, um die darin versteckte Ideologie, Manipulation oder Lücken sichtbar zu machen. Es verwandelt passiven Medienkonsum in aktive Analyse.",
      steps: [
        "**Auswahl:** Ein Artikel wird gewählt, der analysiert werden soll.",
        "**Technik:** Eine der 12 Techniken wird angewandt (siehe Tab 'Zeitungs-Techniken'), um den Text zu verfremden.",
        "**Aufführung:** Der Text wird neu inszeniert, oft satirisch oder entlarvend.",
        "**Ziel:** Zu zeigen, was *nicht* im Text steht oder wie Meinung gemacht wird."
      ],
      goal: "Kritisches Bewusstsein gegenüber Informationen schaffen. Medienkompetenz."
    },
    { 
      title: "Unsichtbares Theater", 
      subtitle: "Theater im realen Leben",
      desc: "Eine Szene wird im öffentlichen Raum (U-Bahn, Restaurant, Straße) gespielt, ohne dass die Umstehenden wissen, dass es Theater ist. Ziel ist es, eine Diskussion oder Reaktion bei unfreiwilligen Zuschauern zu provozieren und soziale Missstände sichtbar zu machen.",
      steps: [
        "**Vorbereitung:** Extrem genaues Proben nötig, da alles improvisiert wirken muss.",
        "**Durchführung:** Die Szene startet als 'realer Konflikt' (z.B. rassistische Belästigung im Bus).",
        "**Lockvögel:** Eingeweihte Schauspieler mischen sich unter das Publikum und regen die Diskussion an, ohne sich zu outen.",
        "**Auflösung:** Oft wird NICHT aufgelöst, dass es Theater war, damit die Diskussion echt bleibt und nachwirkt."
      ],
      goal: "Den öffentlichen Raum politisieren und passive Zuschauer zu aktiven Bürgern machen."
    },
    { 
      title: "Regenbogen der Wünsche", 
      subtitle: "Die therapeutische Dimension",
      desc: "Diese Methode untersucht internalisierte Unterdrückung ('Polizisten im Kopf'). Wenn keine äußere Unterdrückung sichtbar ist, wir aber trotzdem nicht handeln können, liegt das Problem innen. Komplexe Emotionen werden in einzelne Farben (Wünsche/Ängste) zerlegt und von Schauspielern verkörpert.",
      steps: [
        "**Szene:** Ein Protagonist zeigt eine persönliche Blockade.",
        "**Analyse:** Welche 'Stimmen' oder Gefühle hindern ihn?",
        "**Verkörperung:** Schauspieler spielen diese Stimmen oder Wünsche als eigene Personen.",
        "**Konfrontation:** Der Protagonist kämpft gegen sein eigenes Innenleben oder versucht, es zu ordnen."
      ],
      goal: "Psychologische Blockaden überwinden, um politisch handlungsfähig zu werden."
    },
    { 
      title: "Legislatives Theater", 
      subtitle: "Politik durch Theater",
      desc: "Die politische Weiterentwicklung. Forumtheater wird genutzt, um Gesetze zu entwerfen. Die Vorschläge des Publikums werden von anwesenden Anwälten protokolliert und in echte Gesetzesvorlagen umgewandelt. Boal praktizierte dies als Stadtrat in Rio de Janeiro.",
      steps: [
        "**Problem:** Ein Gemeindeproblem wird szenisch dargestellt.",
        "**Intervention:** Bürger spielen Lösungen auf der Bühne.",
        "**Metabolisierung:** Anwälte übersetzen die szenischen Lösungen in juristische Sprache (Gesetzentwürfe).",
        "**Abstimmung:** Das Publikum stimmt symbolisch über die Gesetzesvorschläge ab."
      ],
      goal: "Direkte Demokratie. Der Bürger wird zum Gesetzgeber."
    }
  ],
  newspaper: [
    { title: "1. Einfaches Lesen", desc: "Ein Artikel wird vorgelesen, aber vom Kontext gelöst (z.B. eine Kriegserklärung wird mit der Betonung eines Kochrezepts oder einer Liebeserklärung vorgelesen)." },
    { title: "2. Gekreuztes Lesen", desc: "Zwei Artikel mit widersprüchlichen Informationen (oder aus verschiedenen Zeitungen) werden abwechselnd Zeile für Zeile vorgelesen, was neue, oft absurde Zusammenhänge schafft." },
    { title: "3. Ergänzendes Lesen", desc: "Alles, was im Text verschwiegen wird (Hintergründe, Opfer, Profit), wird von einer zweiten Person an den passenden Stellen laut hinzugefügt." },
    { title: "4. Rhythmisches Lesen", desc: "Der Text wird zu einem völlig unpassenden musikalischen Rhythmus (z.B. Samba, Walzer, Marschmusik) gelesen, um den Inhalt zu 'filtern' und lächerlich zu machen." },
    { title: "5. Parallele Handlung", desc: "Der Text wird neutral vorgelesen, während im Hintergrund szenisch die brutale Realität gezeigt wird, die der Text verschleiert oder beschönigt." },
    { title: "6. Improvisation", desc: "Der Artikel dient als Ausgangspunkt für eine freie Improvisation, die die Konsequenzen der Nachricht weiterspinnt: Was passiert danach?" },
    { title: "7. Historische Lesung", desc: "Eine Nachricht von heute wird so gelesen, als wäre sie aus einer anderen Zeit (z.B. Mittelalter, NS-Zeit), oder umgekehrt, um Parallelen aufzuzeigen." },
    { title: "8. Verstärkung", desc: "Der Text wird von Liedern, Jingles oder Werbung begleitet oder unterbrochen, um die Absurdität zu steigern." },
    { title: "9. Konkretisierung des Abstrakten", desc: "Abstrakte Begriffe (Inflation, Kollateralschaden, Sparmaßnahme) werden in konkrete, schmerzhafte Bilder auf der Bühne übersetzt." },
    { title: "10. Text aus dem Kontext", desc: "Ein Text wird in einen völlig neuen Kontext gestellt (z.B. eine Rede des Kanzlers wird im Kindergarten oder im Gefängnis gehalten)." },
    { title: "11. Feld-Interview", desc: "Die Figuren, die im Artikel vorkommen, werden auf der Bühne 'interviewt', um ihre wahren Motive zu enthüllen." },
    { title: "12. Verhör", desc: "Der Autor des Artikels wird 'verhört': Warum hat er das geschrieben? Wer bezahlt ihn? Was hat er weggelassen?" }
  ],
  philosophy: [
    { title: "Spect-Actor (Zuschau-Spieler)", desc: "Der zentrale Begriff bei Boal. Wir sind keine passiven Zuschauer (Spectators), die nur konsumieren, sondern handelnde Akteure (Actors). Im TdU wird die Trennung zwischen Bühne und Saal aufgehoben. Jeder ist Experte seines eigenen Lebens und kann eingreifen." },
    { title: "Maieutik (Hebammenkunst)", desc: "Der Joker ist kein Lehrer, der Wissen eintrichtert ('Banking Concept' nach Freire). Er ist wie Sokrates eine 'Hebamme', die hilft, das Wissen, das die Gruppe bereits in sich trägt, zur Welt zu bringen. Er stellt Fragen, statt Antworten zu geben." },
    { title: "Aristoteles vs. Boal", desc: "Aristoteles wollte im Theater 'Katharsis' (Reinigung): Das Publikum erlebt Furcht und Mitleid, wird dadurch 'gereinigt' und geht ruhig nach Hause. Der Status Quo bleibt. Boal will das Gegenteil: 'Dynamisierung'. Das Theater soll den Wunsch nach Veränderung wecken, Unruhe stiften und zum Handeln in der Realität anregen." },
    { title: "De-Mechanisierung", desc: "Wir sind voll von mechanischen Mustern – wie wir gehen, wie wir denken, wie wir fühlen. Bevor wir Neues lernen können, müssen wir diese alten Muster aufbrechen. Spiele dienen der De-Mechanisierung von Körper und Geist." },
    { title: "Metaxis", desc: "Der Zustand, in zwei Welten gleichzeitig zu sein: Der Realität der eigenen Person und der Fiktion der Rolle. Dies ermöglicht uns, im Schutz der Fiktion reale Lösungen zu probieren, ohne die vollen Konsequenzen tragen zu müssen." },
    { title: "Osmose", desc: "Das Ziel ist nicht das Theaterstück selbst. Das Ziel ist, dass die Erfahrungen von der Bühne (der Mut, das Eingreifen) durch die 'Poren' in das reale Leben der Teilnehmenden sickern (Osmose)." }
  ],
  joker: [
    { title: "Fragen statt Sagen", desc: "Ein Joker gibt keine Antworten. Wenn die Gruppe fragt: 'War das gut so?', fragt der Joker zurück: 'Was hat das Publikum gesehen?' oder 'Hat es das Problem gelöst?'" },
    { title: "Allparteilichkeit", desc: "Du bist auf keiner Seite, sondern auf der Seite des demokratischen Prozesses. Du musst auch den Antagonisten (den 'Bösen') vor unsachlichen Angriffen schützen, damit die Analyse sauber bleibt." },
    { title: "Physisch bleiben", desc: "Du bist auf der Bühne. 'Zeig es uns, statt es zu erklären!' ist dein wichtigster Satz. Vermeide 'Sitz-Fußball' (lange Diskussionen ohne Aktion). Sobald jemand eine Idee hat: 'Komm auf die Bühne und mach es!'" },
    { title: "Fehler feiern", desc: "Im Theater der Unterdrückten gibt es keine 'falschen' Aktionen, nur unterschiedliche Konsequenzen. Ermutige zum Scheitern und Ausprobieren. Ein 'schlechter' Versuch lehrt uns oft mehr als ein guter." },
    { title: "Umgang mit Vielrednern", desc: "Wenn jemand Monologe hält: Unterbrich höflich aber bestimmt und bitte um eine *körperliche* Darstellung des Gesagten. Oder gib die Frage an die Gruppe weiter." },
    { title: "Das unrealistische Angebot", desc: "Wenn ein Zuschauer eine 'magische Lösung' spielt (z.B. der böse Chef wird plötzlich nett): Frage das Publikum: 'Ist das realistisch?'. Wenn alle 'Nein' sagen, muss neu gespielt werden." }
  ],
  safety: [
    { title: "De-Rolling", desc: "Nach intensiven Szenen (besonders für Antagonisten oder Opfer) ist es essenziell, die Rolle abzustreifen. Methoden: Namen sagen, Körper abklopfen, 'Ich bin nicht mehr der Vater, ich bin wieder Max', Grimassen schneiden." },
    { title: "Stopp-Regel", desc: "Jede*r darf jederzeit 'Stopp' sagen, wenn eine emotionale oder körperliche Grenze überschritten wird. Das Spiel wird sofort unterbrochen, ohne Diskussion. Sicherheit geht immer vor Kunst." },
    { title: "Emotionale Sicherheit", desc: "Unterscheide zwischen 'sicher' und 'bequem'. Theater darf unbequem sein und herausfordern, aber es darf niemanden retraumatisieren oder verletzen. Schaffe einen 'Brave Space'." },
    { title: "Check-In / Check-Out", desc: "Beginne und beende jede Session mit einer kurzen Runde (z.B. 'Ein Wort, wie es mir geht'), um die emotionale Verfassung der Gruppe zu prüfen. Niemand geht 'offen' oder verletzt nach Hause." }
  ]
};

// --- KOMPONENTEN ---

const SwipeCard = ({ step, onSwipe, direction }) => {
  const cards = [
    {
      step: 0,
      title: "Wonach suchst du?",
      icon: <Brain size={48} className="text-white mb-4" />,
      left: { label: "Innenwelt", desc: "Gefühle, Psychologie", val: "intro", color: 'bg-pink-600' },
      right: { label: "Außenwelt", desc: "Körper, Raum, Politik", val: "extra", color: 'bg-violet-600' }
    },
    {
      step: 1,
      title: "Energielevel?",
      icon: <Activity size={48} className="text-white mb-4" />,
      left: { label: "Fokussiert", desc: "Konzentration, Analyse", val: "low", color: 'bg-blue-600' },
      right: { label: "Aktivierend", desc: "Bewegung, Chaos", val: "high", color: 'bg-orange-600' }
    },
    {
      step: 2,
      title: "Erfahrung der Gruppe?",
      icon: <Layers size={48} className="text-white mb-4" />,
      left: { label: "Anfänger", desc: "Warm-up, Kennenlernen", val: "beginner", color: 'bg-green-600' },
      right: { label: "Fortgeschritten", desc: "Szenisch, Komplex", val: "advanced", color: 'bg-purple-600' }
    }
  ];

  const currentCard = cards[step];
  
  let cardClass = `absolute inset-0 w-full h-full rounded-2xl shadow-2xl flex flex-col items-center justify-center p-6 text-center transition-all duration-500 ease-out transform bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700`;
  
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
        <div className="bg-white/10 p-4 rounded-full mb-4">
          {currentCard.icon}
        </div>
        <h2 className="text-3xl font-black text-white mb-8 tracking-tight">{currentCard.title}</h2>
        
        {/* Left Indicator Overlay */}
        <div className="absolute bottom-0 left-0 w-1/2 h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/60 to-transparent rounded-bl-2xl">
           <ArrowLeft className="text-white opacity-80 mb-2" />
           <span className="text-white font-bold text-xl text-left">{currentCard.left.label}</span>
           <span className="text-slate-300 text-sm text-left">{currentCard.left.desc}</span>
        </div>

        {/* Right Indicator Overlay */}
        <div className="absolute bottom-0 right-0 w-1/2 h-full flex flex-col items-end justify-end p-6 bg-gradient-to-t from-black/60 to-transparent rounded-br-2xl">
           <ArrowRight className="text-white opacity-80 mb-2" />
           <span className="text-white font-bold text-xl text-right">{currentCard.right.label}</span>
           <span className="text-slate-300 text-sm text-right">{currentCard.right.desc}</span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="absolute -bottom-24 left-0 w-full flex justify-between px-4">
        <button 
          onClick={() => onSwipe('left', currentCard.left.val)}
          className={`flex-1 mr-4 py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex flex-col items-center justify-center ${currentCard.left.color} hover:brightness-110`}
        >
          <ArrowLeft size={24} className="mb-1" />
          {currentCard.left.label}
        </button>
        <button 
          onClick={() => onSwipe('right', currentCard.right.val)}
          className={`flex-1 ml-4 py-4 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex flex-col items-center justify-center ${currentCard.right.color} hover:brightness-110`}
        >
          <ArrowRight size={24} className="mb-1" />
          {currentCard.right.label}
        </button>
      </div>
    </div>
  );
};

// --- VIEW: RESULTS ---
const ResultsView = ({ results, onReset, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = results.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fadeIn pb-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Ergebnisse ({filteredResults.length})</h2>
        <button onClick={onReset} className="flex items-center text-sm font-medium text-slate-500 hover:text-pink-600 transition-colors">
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
          placeholder="Suche..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all shadow-sm"
        />
      </div>

      {filteredResults.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-500 mb-4">Keine Übungen gefunden.</p>
          <button onClick={onReset} className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
            Alles zurücksetzen
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredResults.map((game) => (
            <div 
              key={game.id} 
              onClick={() => onSelect(game)}
              className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-pink-300 cursor-pointer transition-all group"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                    {game.title}
                  </h3>
                  <div className="flex items-center text-sm text-slate-500 mb-2">
                    <span className="mr-3 font-medium text-slate-400 uppercase text-xs tracking-wider">{game.category}</span>
                    {game.duration && (
                      <span className="flex items-center text-xs bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                        <Clock size={12} className="mr-1" /> {game.duration}
                      </span>
                    )}
                  </div>
                </div>
                <div className="bg-slate-50 p-2 rounded-full group-hover:bg-pink-50 transition-colors">
                  <ArrowRight size={16} className="text-slate-400 group-hover:text-pink-600" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {game.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md font-medium">
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

// --- VIEW: KATALOG ---
const CatalogView = ({ onSelect }) => {
  const categories = [...new Set(EXERCISE_DB.map(g => g.category))];
  
  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fadeIn pb-24">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Alle Spiele</h2>
      {categories.map(cat => (
        <div key={cat} className="mb-8">
          <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider pl-1">{cat}</h3>
          <div className="grid gap-3">
            {EXERCISE_DB.filter(g => g.category === cat).map(game => (
              <div key={game.id} onClick={() => onSelect(game)} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 hover:border-pink-300 cursor-pointer flex justify-between items-center group transition-all">
                <span className="font-bold text-slate-800 group-hover:text-pink-700 transition-colors">{game.title}</span>
                <ArrowRight size={16} className="text-slate-300 group-hover:text-pink-400" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- VIEW: WISSEN (FIXED SCROLL) ---
const TheoryView = () => {
  const [activeTab, setActiveTab] = useState('forms'); // forms, newspaper, philosophy, joker
  const [expandedId, setExpandedId] = useState(null);
  const scrollContainerRef = useRef(null);

  const toggleExpand = (i) => {
    setExpandedId(expandedId === i ? null : i);
  };

  const scrollTabs = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'forms': return KNOWLEDGE_BASE.forms;
      case 'newspaper': return KNOWLEDGE_BASE.newspaper;
      case 'philosophy': return KNOWLEDGE_BASE.philosophy;
      case 'joker': return [...KNOWLEDGE_BASE.joker, ...KNOWLEDGE_BASE.safety];
      default: return [];
    }
  };

  const TabButton = ({ id, label, icon: Icon, colorClass }) => (
    <button 
        onClick={() => {setActiveTab(id); setExpandedId(null)}} 
        className={`flex-shrink-0 px-5 py-3 rounded-xl whitespace-nowrap text-sm font-bold transition-all flex items-center gap-2 ${activeTab === id ? `${colorClass} text-white shadow-md` : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}
    >
        <Icon size={18} /> {label}
    </button>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fadeIn pb-24">
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Kompendium</h2>
      <p className="text-slate-500 mb-6 text-sm">Das gesammelte Wissen des Theaters der Unterdrückten.</p>
      
      {/* TABS SCROLLABLE CONTAINER */}
      <div className="relative mb-6 group">
        {/* Scroll Buttons */}
        <button 
            onClick={() => scrollTabs('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 shadow-md rounded-full border border-slate-100 text-slate-600 hover:text-slate-900 md:hidden"
        >
            <ChevronLeft size={20} />
        </button>
        <button 
            onClick={() => scrollTabs('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white/90 shadow-md rounded-full border border-slate-100 text-slate-600 hover:text-slate-900 md:hidden"
        >
            <ChevronRight size={20} />
        </button>

        <div ref={scrollContainerRef} className="flex space-x-3 overflow-x-auto pb-4 px-1 scrollbar-hide scroll-smooth">
            <TabButton id="forms" label="Formen" icon={Map} colorClass="bg-pink-600" />
            <TabButton id="newspaper" label="Zeitung" icon={FileText} colorClass="bg-blue-600" />
            <TabButton id="philosophy" label="Philosophie" icon={Lightbulb} colorClass="bg-violet-600" />
            <TabButton id="joker" label="Joker & Safety" icon={Mic} colorClass="bg-orange-600" />
        </div>
      </div>

      <div className="grid gap-4">
        {renderContent().map((item, i) => (
          <div key={i} className={`bg-white rounded-xl shadow-sm border border-slate-200 transition-all duration-300 overflow-hidden ${expandedId === i ? 'ring-2 ring-pink-500 border-transparent' : 'hover:border-pink-200'}`}>
            <div 
              onClick={() => toggleExpand(i)}
              className="p-5 cursor-pointer flex justify-between items-start hover:bg-slate-50 transition-colors"
            >
              <div>
                <h3 className={`text-lg font-bold mb-1 ${expandedId === i ? 'text-pink-600' : 'text-slate-800'}`}>{item.title}</h3>
                {item.subtitle && <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.subtitle}</p>}
                {!expandedId && <p className="text-slate-500 text-sm mt-2 line-clamp-2">{item.desc}</p>}
              </div>
              <div className={`mt-1 ml-2 text-slate-400 transition-transform duration-300 ${expandedId === i ? 'rotate-180 text-pink-500' : ''}`}>
                <ChevronDown size={20} />
              </div>
            </div>

            {expandedId === i && (
              <div className="px-5 pb-5 pt-0 animate-fadeIn">
                <p className="text-slate-700 leading-relaxed mb-4">{item.desc}</p>
                {item.steps && (
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-4">
                    <h4 className="font-bold text-slate-700 text-sm mb-2 uppercase flex items-center gap-2">
                        <Activity size={14} className="text-pink-500" /> Ablauf:
                    </h4>
                    <ul className="space-y-3 mt-3">
                      {item.steps.map((step, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-start">
                          <span className="mr-3 mt-1.5 w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0"></span>
                          <span>{renderTextWithBold(step)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {item.goal && (
                  <div className="flex items-start text-sm text-pink-700 font-medium bg-pink-50 p-3 rounded-lg border border-pink-100">
                    <Zap size={16} className="mr-2 mt-0.5 flex-shrink-0 text-pink-500" />
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

// --- VIEW: FAVORITEN ---
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
          <button onClick={handlePrint} className="flex items-center text-sm font-bold text-pink-600 bg-pink-50 px-4 py-2 rounded-lg hover:bg-pink-100 transition-colors">
            <Printer size={16} className="mr-2" /> Drucken
          </button>
        )}
      </div>

      <div className="hidden print:block mb-8 text-center">
        <h1 className="text-3xl font-bold">Workshop-Plan</h1>
        <p>Erstellt mit Polithea Swipe & Act</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <Heart size={48} className="mx-auto mb-4 opacity-20" />
          <p>Noch keine Favoriten gespeichert.</p>
        </div>
      ) : (
        <div className="grid gap-4 print:block">
          {favoriteGames.map((game) => (
            <div key={game.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 relative group print:shadow-none print:border-b print:border-t-0 print:border-x-0 print:rounded-none print:mb-6 print:break-inside-avoid">
              <div onClick={() => onSelect(game)} className="cursor-pointer">
                <h3 className="text-lg font-bold text-slate-800">{game.title}</h3>
                <div className="flex items-center text-sm text-slate-500 mb-2">
                  <span className="mr-3 uppercase text-xs font-bold tracking-wider text-slate-400">{game.category}</span>
                  <span className="flex items-center text-xs bg-slate-100 px-2 py-0.5 rounded-full print:border print:bg-white text-slate-600">
                    <Clock size={12} className="mr-1" /> {game.duration}
                  </span>
                </div>
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

// --- DETAIL MODAL ---
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-slideUp">
        <div className="sticky top-0 right-0 left-0 bg-white/95 backdrop-blur border-b border-slate-100 p-4 flex justify-end gap-2 z-10">
          <button onClick={handleShare} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-600 transition-colors">
            <Share2 size={20} />
          </button>
          <button onClick={() => toggleFavorite(game.id)} className={`p-2 rounded-full transition-colors ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2 py-1 rounded inline-block mb-3">
            {game.category}
          </span>
          <h2 className="text-3xl font-black text-slate-900 mb-2 leading-tight">{game.title}</h2>
          
          {game.duration && (
             <div className="flex items-center text-slate-500 text-sm mb-6 font-medium">
               <Clock size={16} className="mr-1.5" />
               <span>{game.duration}</span>
             </div>
          )}
          
          <div className="flex flex-wrap gap-2 mb-8">
            {game.tags.map((tag, i) => (
              <span key={i} className="text-xs font-bold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          <div className="mb-8 p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 shadow-sm">
            <h4 className="flex items-center text-sm font-bold text-slate-800 mb-2 uppercase tracking-wide">
              <Sparkles size={16} className="mr-2 text-yellow-500" /> Warum spielen?
            </h4>
            <p className="text-slate-600 italic leading-relaxed">{game.content.context}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
              <BookOpen size={24} className="mr-2 text-pink-600" /> Anleitung
            </h3>
            <ol className="space-y-4">
              {game.content.instructions.map((step, i) => (
                <li key={i} className="flex items-start text-slate-700 leading-relaxed">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-slate-900 text-white rounded-full text-xs font-bold mr-4 mt-0.5 shadow-sm">
                    {i + 1}
                  </span>
                  <span>{renderTextWithBold(step)}</span>
                </li>
              ))}
            </ol>
          </div>

          {game.content.variations && game.content.variations.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4">Variationen</h3>
              <ul className="space-y-3">
                {game.content.variations.map((v, i) => (
                  <li key={i} className="text-sm text-slate-600 flex items-start bg-slate-50 p-3 rounded-lg">
                    <span className="mr-2 text-pink-500 font-bold">•</span> {v}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white border-t border-slate-100 sticky bottom-0">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 active:scale-[0.98] transition-all shadow-lg"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};

// --- APP ---

export default function ActAndSwipeApp() {
  const [view, setView] = useState('start'); 
  const [swipeStep, setSwipeStep] = useState(0); 
  const [filters, setFilters] = useState({ focus: null, energy: null, level: null });
  const [slideDir, setSlideDir] = useState(null);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [favorites, setFavorites] = useState([]);

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

  const NavButton = ({ icon: Icon, label, targetView, activeColor }) => {
    const isActive = view === targetView;
    return (
        <button 
        onClick={() => setView(targetView)} 
        className={`flex flex-col items-center justify-center w-full py-2 transition-colors ${isActive ? activeColor : 'text-gray-400 hover:text-gray-600'}`}
        >
        <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
        <span className="text-[10px] font-bold mt-1 uppercase tracking-wide">{label}</span>
        </button>
    );
  };

  return (
    <div className="font-sans h-screen w-full bg-slate-50 overflow-hidden flex flex-col mx-auto max-w-md shadow-2xl relative text-slate-900">
      
      {/* Scrollable Content Area */}
      <div className={`flex-1 overflow-y-auto no-scrollbar ${view === 'start' ? 'bg-slate-900' : 'bg-slate-50'}`}>
        
        {view === 'start' && (
          <div className="flex flex-col h-full text-white p-6 justify-center">
             <header className="mb-12">
                <h1 className="text-5xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
                SWIPE & ACT
                </h1>
                <p className="text-slate-400 text-lg font-medium">Dein digitaler Proben-Assistent.</p>
            </header>

            <main className="flex flex-col gap-6">
                <div className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 shadow-xl border border-slate-700 relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 text-slate-700/30 group-hover:text-slate-700/50 transition-colors">
                        <Dice5 size={140} />
                    </div>
                    <h2 className="text-2xl font-bold mb-6 relative z-10">Was probst du heute?</h2>
                    <button 
                        onClick={handleStart}
                        className="w-full relative z-10 bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-3 mb-3"
                    >
                        <Shuffle size={20} />
                        Filter Starten
                    </button>
                    <button 
                        onClick={handleRandom}
                        className="w-full relative z-10 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-xl shadow transition active:scale-95 flex items-center justify-center gap-2 text-sm"
                    >
                        <Sparkles size={16} className="text-yellow-400" />
                        Zufälliges Spiel
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setView('theory')} className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-blue-500/50 transition flex flex-col items-center gap-2">
                        <div className="bg-blue-500/20 p-3 rounded-full text-blue-400">
                            <BookOpen size={24} />
                        </div>
                        <span className="font-semibold text-sm">Wissen</span>
                    </button>
                    <button onClick={() => setView('favorites')} className="bg-slate-800 p-4 rounded-xl border border-slate-700 hover:border-pink-500/50 transition flex flex-col items-center gap-2">
                        <div className="bg-pink-500/20 p-3 rounded-full text-pink-400">
                            <Heart size={24} />
                        </div>
                        <span className="font-semibold text-sm">Merkliste</span>
                    </button>
                </div>
            </main>
          </div>
        )}

        {view === 'swipe' && (
          <div className="h-full flex flex-col pt-6">
            <div className="flex justify-center pt-4 space-x-2 mb-4">
              <div className={`h-1.5 w-8 rounded-full transition-colors ${swipeStep >= 0 ? 'bg-slate-800' : 'bg-slate-200'}`} />
              <div className={`h-1.5 w-8 rounded-full transition-colors ${swipeStep >= 1 ? 'bg-slate-800' : 'bg-slate-200'}`} />
              <div className={`h-1.5 w-8 rounded-full transition-colors ${swipeStep >= 2 ? 'bg-slate-800' : 'bg-slate-200'}`} />
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
      </div>

      {/* Bottom Navigation */}
      {view !== 'start' && (
        <nav className="bg-white border-t border-gray-200 px-6 py-2 flex justify-between items-center z-20 shrink-0 safe-area-bottom shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
          <NavButton icon={Home} label="Start" targetView="start" activeColor="text-slate-900" />
          <NavButton icon={Menu} label="Katalog" targetView="catalog" activeColor="text-slate-900" />
          <NavButton icon={Library} label="Wissen" targetView="theory" activeColor="text-blue-600" />
          <NavButton icon={Heart} label="Merkliste" targetView="favorites" activeColor="text-pink-600" />
        </nav>
      )}
    </div>
  );
}