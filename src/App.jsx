import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Zap, Users, ArrowRight, ArrowLeft, RefreshCw, X, BookOpen, Layers, Activity } from 'lucide-react';

// --- KONFIGURATION ---
const LOGO_URL = "/logo.jpeg"; 

// Farben aus dem Logo
const BRAND_RED = "#E05D5D";     // Das Rot aus der Gesichtsmaske
const BRAND_YELLOW = "#FFD700";  // Das Gelb oben links
const BRAND_ORANGE = "#FF8C00";  // Das Orange unten rechts
const BRAND_BLACK = "#1a1a1a";   // Das Schwarz der Faust/Schrift

// Tailwind Klassen Mapping
const PRIMARY_COLOR = "bg-[#E05D5D]"; // Button-Hintergrund (Rot)
const PRIMARY_COLOR_HOVER = "hover:bg-[#c94545]";
const PRIMARY_TEXT_COLOR = "text-[#E05D5D]";
const ACCENT_COLOR_BG = "bg-[#FFD700]/10"; // Ganz leichtes Gelb für Tags
const ACCENT_COLOR_BORDER = "border-[#FFD700]/40";
const SELECTION_COLOR = "selection:bg-[#E05D5D]/30";
const GRADIENT_BG = "bg-gradient-to-br from-[#FFD700] via-[#FFB347] to-[#FF8C00]"; // Der Hintergrund-Verlauf (Gelb -> Orange)

// --- DATENBANK (TEIL B) ---
const EXERCISE_DB = [
  // KATEGORIE 1: AUFWÄRMEN & DE-MECHANISIERUNG
  {
    id: "cross-circle",
    title: "Das Kreuz und der Kreis",
    category: "Aufwärmen & De-Mechanisierung",
    tags: ["Koordination", "Gehirn-Jogging", "Scheitern"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Diese Übung fördert die Unabhängigkeit der Gehirnhälften und trainiert die Koordination. Sie hilft den Teilnehmenden, sich von mechanischen Bewegungsmustern zu lösen und einen spielerischen Umgang mit dem 'Scheitern' zu finden, da die Aufgabe anfangs oft als schwierig empfunden wird.",
      instructions: [
        "Alle Teilnehmenden stehen im Raum verteilt.",
        "Die rechte Hand zeichnet kontinuierlich und gleichmäßig einen großen Kreis in die Luft vor dem Körper.",
        "Gleichzeitig zeichnet die linke Hand ein großes Kreuz in die Luft, ebenfalls vor dem Körper.",
        "Die Herausforderung besteht darin, beide Bewegungen gleichzeitig und im gleichen Rhythmus auszuführen, ohne dass eine Hand die Bewegung der anderen übernimmt.",
        "Ermutigen Sie die Gruppe, über Fehler zu lachen und es immer wieder zu versuchen."
      ],
      variations: ["Rechte Hand Kreis, während das rechte Bein gleichzeitig ein 'A' oder den eigenen Namen auf den Boden schreibt.", "Wechsel der Hände: Linke Hand Kreis, rechte Hand Kreuz."]
    }
  },
  {
    id: "bear-poitiers",
    title: "Der Bär von Poitiers",
    category: "Aufwärmen & De-Mechanisierung",
    tags: ["Körperspannung", "Spaß", "Eisbrecher"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Ein dynamisches Spiel, das den Fokus auf Körperspannung und Entspannung legt. Es eignet sich hervorragend als Eisbrecher, um die Gruppe zu aktivieren und eine lockere Atmosphäre zu schaffen.",
      instructions: [
        "Ein Spieler wird als 'Bär' bestimmt. Alle anderen sind 'Holzfäller'.",
        "Der Bär dreht sich mit dem Rücken zur Gruppe und beginnt laut zu zählen (z.B. bis 10). Währenddessen bewegen sich die Holzfäller frei im Raum.",
        "Sobald der Bär sich umdreht und laut brüllt, müssen alle Holzfäller sofort 'tot' umfallen und regungslos am Boden liegen bleiben.",
        "Der Bär geht nun herum und prüft die 'Leichen'. Er darf sie berühren, Arme oder Beine anheben, Witze machen oder kitzeln, um eine Reaktion zu provozieren.",
        "Die Holzfäller müssen völlig entspannt bleiben. Wenn der Bär einen Arm anhebt, muss dieser schwer zu Boden fallen. Wer Spannung zeigt, lacht oder sich bewegt, wird ebenfalls zum Bären.",
        "Das Spiel endet, wenn alle zu Bären geworden sind oder nach einer festgelegten Zeit."
      ],
      variations: ["Mehrere Bären von Anfang an.", "Thematische Anpassung der Rollen (z.B. Statuen und Bildhauer)."]
    }
  },
  {
    id: "bomb-shield",
    title: "Bombe und Schutzschild",
    category: "Aufwärmen & De-Mechanisierung",
    tags: ["Raum", "Dynamik", "Paranoia"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Diese Übung simuliert komplexe Massenbewegungen und verdeutlicht, wie individuelle Ängste und Ziele zu kollektivem Chaos führen können. Sie schult die räumliche Wahrnehmung und Reaktionsfähigkeit.",
      instructions: [
        "Die Gruppe steht im Raum. Jede Person wählt geheim eine andere Person als 'Bombe' und eine dritte Person als 'Schutzschild' aus.",
        "Die Aufgabe für jeden Einzelnen ist es, sich so im Raum zu bewegen, dass das eigene 'Schutzschild' immer räumlich genau zwischen ihm und der 'Bombe' positioniert ist.",
        "Auf das Kommando 'Los' beginnen alle gleichzeitig, sich zu bewegen. Es entsteht sofort ein dynamisches Chaos, da sich die Bezugspunkte ständig verschieben.",
        "Das Spiel wird für einige Minuten laufen gelassen, bevor es gestoppt wird.",
        "In der anschließenden Analyse kann diskutiert werden: Wie entstehen Massenbewegungen durch individuelle Ziele? Wie fühlt es sich an, von äußeren Faktoren 'gesteuert' zu werden?"
      ],
      variations: ["Änderung der Regeln: Man muss sich so nah wie möglich an der 'Bombe' und so weit wie möglich vom 'Schutzschild' aufhalten."]
    }
  },
  {
    id: "colombian-hypnosis",
    title: "Kolumbianische Hypnose",
    category: "Aufwärmen & De-Mechanisierung",
    tags: ["Vertrauen", "Führung", "Macht"],
    attributes: { focus: "extra", energy: "low", level: "beginner" },
    content: {
      context: "Eine klassische Übung aus dem Theater der Unterdrückten, die auf non-verbale Weise Themen wie Führung, Hingabe und Vertrauen untersucht. Sie fördert die Sensibilität für den Partner und die gemeinsame Bewegung.",
      instructions: [
        "Die Gruppe bildet Paare. Person A hält ihre offene Handfläche etwa 20-30 cm vor das Gesicht von Person B.",
        "Person B ist nun 'hypnotisiert' und muss den Abstand zu der Hand von A exakt beibehalten. Ihr Blick ist auf die Handfläche fixiert.",
        "A beginnt langsam, B durch den Raum zu führen. A kann die Hand bewegen, hoch, tief, zur Seite, und B muss mit dem ganzen Körper folgen, um den Abstand zu wahren (z.B. in die Hocke gehen, sich strecken).",
        "Nach einer Weile werden die Rollen getauscht.",
        "Achten Sie darauf, dass die Bewegungen fließend sind und A die Verantwortung für die Sicherheit von B übernimmt."
      ],
      variations: ["Gegenseitige Hypnose: Beide Partner führen und folgen gleichzeitig, indem jeder eine Hand vor das Gesicht des anderen hält.", "Führung mit anderen Körperteilen (z.B. Ellbogen, Knie).", "Gruppenhypnose: Ein Anführer hypnotisiert mehrere Personen gleichzeitig."]
    }
  },
  {
    id: "budge",
    title: "Drängelkreis / Rutsch",
    category: "Aufwärmen & De-Mechanisierung",
    tags: ["Reaktion", "Solidarität"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Ein schnelles, energetisierendes Reaktionsspiel, das die Gruppe aufweckt und die Aufmerksamkeit fördert. Es kann auch genutzt werden, um Themen wie Platzmangel oder Verdrängung spielerisch einzuführen.",
      instructions: [
        "Alle Teilnehmenden sitzen in einem engen Kreis auf Stühlen. Eine Person steht in der Mitte, ihr Stuhl ist leer.",
        "Die Person in der Mitte geht zu einem sitzenden Spieler, zeigt auf ihn und ruft laut 'Rutsch!' (oder 'Budge!').",
        "Die angesprochene Person muss sofort aufstehen und versuchen, einen neuen, freien Platz im Kreis zu finden. Sie darf nicht auf ihren alten Platz zurückkehren.",
        "Gleichzeitig müssen die Nachbarn der angesprochenen Person (und oft weitere Spieler im Kreis, je nach Variante) aufrücken, um die entstehende Lücke zu schließen.",
        "Der Spieler aus der Mitte versucht ebenfalls, einen freien Platz zu ergattern.",
        "Die Person, die am Ende keinen Stuhl findet, bleibt in der Mitte und startet die nächste Runde."
      ],
      variations: ["Die Richtung des Aufrückens kann vorgegeben werden (z.B. immer nach rechts).", "Ohne Stühle: Spieler stehen im Kreis auf markierten Positionen."]
    }
  },
  {
    id: "zip-zap-boing",
    title: "Zip Zap Boing",
    category: "Aufwärmen & De-Mechanisierung",
    tags: ["Fokus", "Reaktion", "Gruppe"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Ein absoluter Klassiker unter den Aufwärmspielen. Es dient dazu, die Energie in der Gruppe zu fokussieren, die Reaktionsgeschwindigkeit zu erhöhen und den Kontakt untereinander herzustellen.",
      instructions: [
        "Die Gruppe steht im Kreis.",
        "Ein Spieler beginnt, indem er mit einer klaren Armbewegung und Blickkontakt ein 'Zip' zu seinem direkten Nachbarn (links oder rechts) sendet.",
        "Der Empfänger gibt das 'Zip' in die gleiche Richtung an seinen nächsten Nachbarn weiter.",
        "Ein Spieler kann das 'Zip' auch in ein 'Zap' umwandeln, indem er auf eine Person quer durch den Kreis zeigt und Blickkontakt herstellt. Der Empfänger des 'Zap' muss nun reagieren.",
        "Jeder Empfänger eines 'Zip' oder 'Zap' hat die Möglichkeit, den Impuls mit einem lauten 'Boing' zu blockieren. Dabei springt er leicht und macht eine abwehrende Geste mit beiden Händen.",
        "Wenn ein Impuls mit 'Boing' geblockt wird, muss der Sender (der das 'Zip' oder 'Zap' geschickt hat) ihn an eine andere Person im Kreis weiterschicken.",
        "Ziel ist es, den Energiefluss ohne Unterbrechung und mit steigendem Tempo aufrechtzuerhalten."
      ],
      variations: ["Einführung weiterer Kommandos (z.B. 'Zoom' für Richtungswechsel).", "Eliminationsmodus: Wer einen Fehler macht, scheidet aus (für Fortgeschrittene)."]
    }
  },

  // KATEGORIE 2: GRUPPENDYNAMIK & RAUM
  {
    id: "glass-cobra",
    title: "Die Gläserne Kobra",
    category: "Gruppendynamik & Raum",
    tags: ["Sinne", "Vertrauen", "Blind"],
    attributes: { focus: "intro", energy: "low", level: "beginner" },
    content: {
      context: "Eine intensive Vertrauensübung, die die non-verbale Kommunikation und das Spüren der Gruppe als einen einzigen Organismus fördert. Sie sensibilisiert für die Führung und das Folgen.",
      instructions: [
        "Die gesamte Gruppe stellt sich hintereinander zu einer Polonaise auf.",
        "Jeder legt seine Hände auf die Schultern der Person vor ihm. Nur die vorderste Person hat die Augen geöffnet.",
        "Alle anderen schließen die Augen und müssen sich vollständig auf die Impulse verlassen, die sie über die Schultern von ihrem Vordermann erhalten.",
        "Der Anführer beginnt langsam, die 'Kobra' durch den Raum zu führen. Er muss Hindernisse umgehen und das Tempo an die Gruppe anpassen.",
        "Die Impulse (Gehen, Stoppen, Drehen) werden wie eine Welle von vorne nach hinten durch die Körper der Teilnehmenden weitergegeben.",
        "Das Ziel ist es, sich als ein einziger, zusammenhängender Organismus zu bewegen, ohne dass die Kette reißt. Die Übung erfordert hohe Konzentration und Ruhe."
      ],
      variations: ["Die Führungsposition kann gewechselt werden, indem der Vorderste ans Ende der Schlange geht.", "Die Übung kann auch völlig blind durchgeführt werden, wenn der Raum sicher ist und der Anführer vorsichtig agiert."]
    }
  },
  {
    id: "human-knot",
    title: "Der Menschliche Knoten",
    category: "Gruppendynamik & Raum",
    tags: ["Problemlösung", "Körperkontakt", "Kooperation"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Ein physisches Rätsel, das die Gruppe zur Kooperation und Kommunikation zwingt, um ein gemeinsames Problem zu lösen. Es bricht Berührungsängste ab und fördert den Teamgeist.",
      instructions: [
        "Die Gruppe bildet einen engen Kreis, Schulter an Schulter.",
        "Alle schließen die Augen und strecken ihre Hände in die Mitte des Kreises.",
        "Jeder sucht sich zwei Hände von verschiedenen Personen und ergreift diese. Dabei darf man nicht die Hände des direkten Nachbarn greifen und nicht beide Hände derselben Person halten.",
        "Sobald alle Hände verbunden sind, öffnen die Teilnehmenden die Augen. Sie bilden nun einen 'menschlichen Knoten'.",
        "Die Aufgabe ist es, diesen Knoten zu entwirren, ohne die Hände loszulassen, bis die Gruppe wieder in einem einzigen, offenen Kreis steht (oder in mehreren kleineren, entwirrten Kreisen).",
        "Dies erfordert viel Kommunikation, Übersteigen, Durchkriechen und vorsichtiges Bewegen. Es ist wichtig, auf die Sicherheit aller zu achten."
      ],
      variations: ["Stumme Durchführung: Die Gruppe darf während des Entwirrens nicht sprechen.", "Knoten mit verbundenen Augen entwirren (für sehr erfahrene Gruppen)."]
    }
  },
  {
    id: "racing-chairs",
    title: "Rhythmus mit Stühlen",
    category: "Gruppendynamik & Raum",
    tags: ["Kooperation", "Stress", "De-Mechanisierung"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Diese Übung simuliert eine Situation, in der Kooperation unter extremem Zeitdruck und mit begrenzten Ressourcen erforderlich ist. Sie zeigt schnell auf, wie Gruppen unter Stress kommunizieren und sich organisieren.",
      instructions: [
        "Jeder Teilnehmer steht auf einem Stuhl. Die Stühle sind in einer langen Reihe hintereinander aufgestellt. Es gibt genau einen Stuhl mehr als Teilnehmer, dieser leere Stuhl steht am Ende der Reihe.",
        "Die Aufgabe der Gruppe ist es, sich gemeinsam von einem Ende des Raumes zum anderen zu bewegen, ohne dabei den Boden zu berühren.",
        "Um vorwärts zu kommen, muss der jeweils hinterste, freie Stuhl von der Gruppe nach vorne durchgereicht werden. Die Teilnehmer müssen sich auf den verbleibenden Stühlen zusammendrängen, um den Transport zu ermöglichen.",
        "Sobald der Stuhl vorne angekommen ist, kann die Gruppe aufrücken, und der nächste freie Stuhl von hinten wird nach vorne transportiert.",
        "Die Übung kann als Wettlauf gegen die Zeit oder zwischen zwei Gruppen durchgeführt werden."
      ],
      variations: ["Einführung von Hindernissen auf dem Weg.", "Verbot der verbalen Kommunikation."]
    }
  },
  {
    id: "count-to-20",
    title: "Zählen bis 20",
    category: "Gruppendynamik & Raum",
    tags: ["Zuhören", "Gruppengefühl"],
    attributes: { focus: "intro", energy: "low", level: "beginner" },
    content: {
      context: "Eine Übung zur Förderung des kollektiven Zuhörens und des Gespürs für das 'Timing' der Gruppe. Sie erfordert Geduld und hohe Konzentration auf die anderen.",
      instructions: [
        "Die Gruppe liegt entspannt auf dem Boden, die Augen sind geschlossen. Alternativ kann die Übung auch im Sitzen im Kreis durchgeführt werden.",
        "Das gemeinsame Ziel ist es, von 1 bis 20 zu zählen. Jede Zahl darf nur von einer Person ausgesprochen werden.",
        "Es gibt keine festgelegte Reihenfolge, und es darf nicht abgesprochen werden, wer wann spricht.",
        "Wenn zwei oder mehr Personen gleichzeitig eine Zahl sagen, muss die Gruppe wieder von vorne bei '1' beginnen.",
        "Die Übung erfordert, dass die Teilnehmenden ihre eigenen Impulse zurückhalten, auf die Stille hören und den richtigen Moment für ihren Beitrag finden.",
        "Es ist nicht das Ziel, schnell zu zählen, sondern gemeinsam das Ziel zu erreichen."
      ],
      variations: ["Zählen bis zu einer höheren Zahl (z.B. Anzahl der Teilnehmer).", "Rückwärts zählen."]
    }
  },

  // KATEGORIE 3: IMAGE THEATRE
  {
    id: "great-game-power",
    title: "Das große Spiel der Macht",
    category: "Image Theatre",
    tags: ["Analyse", "Visuell", "Politik"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Eine zentrale Übung des Bildertheaters, die analysiert, wie Machtverhältnisse durch räumliche Anordnung, Objekte und non-verbale Signale entstehen und wahrgenommen werden.",
      instructions: [
        "In der Mitte des Raumes werden verschiedene Alltagsgegenstände platziert (z.B. ein Stuhl, ein Tisch, eine Flasche, ein Buch).",
        "Die Aufgabe an die Gruppe (oder einzelne Freiwillige nacheinander) lautet: Arrangiere diese Objekte so im Raum, dass einer der Stühle der mächtigste Gegenstand im Ensemble wird.",
        "Die Teilnehmenden experimentieren mit Positionen, Höhenunterschieden, Abständen und Blickwinkeln, ohne die Objekte selbst zu verändern oder zu zerstören.",
        "Nach jedem Arrangement wird das Ergebnis in der Gruppe diskutiert: Warum wirkt dieser Stuhl mächtig? Welche Faktoren tragen dazu bei (z.B. Isolation, zentrale Position, Höhe, Fokus der anderen Objekte)?",
        "Im zweiten Schritt können sich Personen in das Bild stellen, um die Machtverhältnisse weiter zu verdeutlichen oder herauszufordern."
      ],
      variations: ["Fokus auf andere Attribute legen (z.B. der 'einsamste' Stuhl, der 'solidarischste' Stuhl).", "Verwendung von lebenden Statuen statt Objekten."]
    }
  },
  {
    id: "real-to-ideal",
    title: "Vom Realen zum Idealen Bild",
    category: "Image Theatre",
    tags: ["Vision", "Veränderung", "Politik"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Diese Methode nutzt die Kraft von Körperbildern, um soziale oder politische Probleme zu analysieren und Visionen für Veränderungen zu entwickeln. Sie macht den Weg von der Unterdrückung zur Befreiung sichtbar.",
      instructions: [
        "Die Gruppe oder ein Protagonist baut eine 'Statue der Unterdrückung' (Ist-Zustand), die ein konkretes Problem oder eine Situation der Ungerechtigkeit darstellt. Andere Teilnehmende können als 'Ton' für die Statue verwendet werden.",
        "Dieses Bild wird analysiert und diskutiert. Was sehen wir? Wer sind die Unterdrücker, wer die Unterdrückten? Wo liegen die Konflikte?",
        "Anschließend wird eine 'Statue der Befreiung' (Soll-Zustand) gebaut, die die ideale Lösung oder Überwindung des Problems darstellt.",
        "Auch dieses Bild wird analysiert. Ist es realistisch? Was hat sich verändert?",
        "Der entscheidende Schritt ist das 'Bild des Übergangs': Die Gruppe formt nun ein oder mehrere Zwischenbilder, die zeigen, wie man vom Ist-Zustand zum Soll-Zustand gelangen kann. Welche konkreten Schritte oder Handlungen sind notwendig?"
      ],
      variations: ["Dynamisierung der Bilder: Die Statuen können durch eine kurze Bewegung oder einen Satz zum Leben erweckt werden.", "Fokus auf innere Zustände statt äußerer Konflikte."]
    }
  },
  {
    id: "complete-image",
    title: "Vervollständige das Bild",
    category: "Image Theatre",
    tags: ["Spontaneität", "Assoziation"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Eine schnelle, assoziative Übung, die die Spontaneität trainiert und zeigt, wie sich die Bedeutung einer Pose durch den Kontext verändert.",
      instructions: [
        "Zwei Personen beginnen in der Mitte. Sie nehmen spontan eine gemeinsame Pose ein und frieren darin ein (z.B. ein Händedruck, eine Umarmung, eine drohende Geste).",
        "Die Gruppe betrachtet das Bild kurz.",
        "Nun verlässt eine der beiden Personen das Bild. Die andere Person bleibt in ihrer exakten Pose eingefroren.",
        "Eine neue Person aus der Gruppe tritt sofort hinzu und ergänzt das verbliebene Fragment durch ihre eigene Pose zu einem völlig neuen, sinnvollen Bild. Die Bedeutung der ursprünglichen Pose kann sich dabei komplett wandeln.",
        "Sobald das neue Bild steht, frieren beide kurz ein. Dann verlässt die Person, die schon länger im Bild war, die Szene, und eine weitere Person kommt hinzu, um das neue Fragment zu ergänzen.",
        "Das Spiel wird in schnellem Tempo fortgesetzt, sodass eine Kette von sich ständig wandelnden Bildern entsteht."
      ],
      variations: ["Thematische Vorgaben für die Bilder (z.B. 'Familie', 'Arbeitsplatz').", "Arbeit mit mehr als zwei Personen im Bild."]
    }
  },
  {
    id: "status-cards",
    title: "Hackordnung / Status Cards",
    category: "Image Theatre",
    tags: ["Status", "Komödie", "Johnstone"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Diese Übung, inspiriert von Keith Johnstone, macht soziale Hierarchien und Statusverhalten auf humorvolle Weise sichtbar und spielbar. Sie zeigt, wie wir unseren eigenen Status oft über die Reaktion der anderen wahrnehmen.",
      instructions: [
        "Jeder Teilnehmer zieht verdeckt eine Spielkarte aus einem normalen Kartenspiel. Ohne den Wert der eigenen Karte anzusehen, hält sich jeder die Karte so an die Stirn, dass alle anderen sie sehen können.",
        "Die Kartenwerte repräsentieren den sozialen Status: Ass ist der höchste Status (König/Boss), 2 ist der niedrigste (Diener/Außenseiter).",
        "Die Gruppe bewegt sich nun frei im Raum und interagiert miteinander (z.B. in einer improvisierten Party-Szene).",
        "Die Aufgabe ist es, die anderen Personen entsprechend dem Status zu behandeln, den ihre Karte anzeigt. Jemand mit einem hohen Status wird respektvoll, vielleicht unterwürfig behandelt, jemand mit niedrigem Status wird ignoriert, herumkommandiert oder herablassend behandelt.",
        "Gleichzeitig versucht jeder Spieler, anhand der Reaktionen der anderen auf ihn, seinen eigenen Status zu erraten und sich entsprechend zu verhalten.",
        "Nach einer Weile wird das Spiel gestoppt, und die Teilnehmenden stellen sich in einer Reihe auf, von der sie glauben, dass sie der Reihenfolge ihres Status entspricht (von niedrig nach hoch). Dann werden die Karten aufgedeckt."
      ],
      variations: ["Verwendung von Zahlenkarten (1-10) statt eines kompletten Spiels.", "Fokus auf subtile Statuswechsel während der Interaktion."]
    }
  },
  {
    id: "master-servant",
    title: "Herr und Diener",
    category: "Image Theatre",
    tags: ["Status", "Subversion", "Szenisch"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Eine szenische Übung zur Erforschung von klaren Statusverhältnissen und den Möglichkeiten des subtilen Widerstands. Sie zeigt, wie Macht von unten untergraben werden kann.",
      instructions: [
        "Zwei Spieler improvisieren eine Szene mit klarer Rollenverteilung: Ein 'Herr' (hoher Status) und ein 'Diener' (niedriger Status). Der Kontext kann frei gewählt werden (z.B. Chef und Angestellter, König und Diener).",
        "Der Herr gibt Befehle, der Diener muss diese ausführen.",
        "Die spezifische Aufgabe für den Diener ist es, jeden Befehl zwar äußerlich zu befolgen, aber dabei den Status des Herrn subtil zu untergraben. Dies kann durch Übereifer geschehen (den Befehl viel zu wörtlich oder zu intensiv ausführen), durch 'versehentliche' Missverständnisse, durch Tollpatschigkeit, die dem Herrn Probleme bereitet, oder durch versteckte Gesten des Widerstands, die der Herr nicht sieht.",
        "Ziel ist es, die Machtbalance in der Szene zum Wanken zu bringen, ohne dass der Diener offen rebelliert und seine Rolle verlässt.",
        "Die Übung erfordert präzises Spiel und ein gutes Gespür für Timing und Subtext."
      ],
      variations: ["Statuswechsel innerhalb der Szene.", "Der Herr versucht, seinen Status trotz des Widerstands aufrechtzuerhalten."]
    }
  },

  // KATEGORIE 4: FORUMTHEATER & KONFLIKT
  {
    id: "rashomon",
    title: "Rashomon (Perspektivenwechsel)",
    category: "Forumtheater & Konflikt",
    tags: ["Empathie", "Wahrnehmung"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Inspiriert durch Akira Kurosawas Film 'Rashomon', verdeutlicht diese Übung, wie subjektiv die Wahrnehmung von Konflikten ist und wie unterschiedlich dieselbe Situation von verschiedenen Beteiligten erlebt und erinnert wird.",
      instructions: [
        "Eine kurze Konfliktszene mit zwei oder mehr Personen wird von einer Gruppe vorbereitet und gespielt (z.B. ein Streit um einen Gegenstand, eine ungerechte Behandlung).",
        "Anschließend wird die Szene wiederholt, aber diesmal streng aus der subjektiven Perspektive einer der beteiligten Figuren (z.B. des 'Opfers'). In dieser Version dürfen die Ereignisse so dargestellt werden, wie diese Figur sie empfunden hat – Übertreibungen, Verzerrungen und die Fokussierung auf bestimmte Details sind erlaubt und erwünscht, um die emotionale Wahrheit dieser Person zu zeigen.",
        "Danach wird die Szene erneut gespielt, diesmal streng aus der Perspektive des 'Täters' oder Antagonisten. Auch hier soll die subjektive Wahrnehmung, die Rechtfertigung des eigenen Handelns und die Sicht auf die anderen Figuren im Vordergrund stehen.",
        "In der anschließenden Diskussion werden die Unterschiede zwischen den Versionen analysiert: Wie hat sich die Handlung verändert? Wie wurden die anderen Figuren dargestellt? Was sagt dies über unsere Wahrnehmung von Konflikten aus?"
      ],
      variations: ["Einbeziehung der Perspektive eines unbeteiligten Beobachters.", "Verwendung von 'Gedankenstimmen', die während der Szene laut ausgesprochen werden."]
    }
  },
  {
    id: "push-not-win",
    title: "Push not to win (Schieben nicht um zu gewinnen)",
    category: "Forumtheater & Konflikt",
    tags: ["Körperarbeit", "Dialektik"],
    attributes: { focus: "intro", energy: "high", level: "beginner" },
    content: {
      context: "Eine körperliche Metapher für dialektische Beziehungen und Konflikte. Sie lehrt, dass Widerstand nicht immer bedeutet, den anderen zu besiegen, sondern dass es um ein dynamisches Gleichgewicht und gegenseitige Abhängigkeit geht.",
      instructions: [
        "Die Gruppe bildet Paare. Die Partner stehen sich gegenüber und legen ihre Hände auf die Schultern des anderen.",
        "Auf ein Signal hin beginnen beide, gegeneinander zu schieben. Sie versuchen, den Partner aus dem Gleichgewicht zu bringen oder zurückzudrängen.",
        "Die entscheidende Regel lautet jedoch: 'Schiebe nicht, um zu gewinnen'. Das Ziel ist nicht, den Partner zu Boden zu werfen oder zu besiegen.",
        "Sobald ein Partner spürt, dass der andere das Gleichgewicht verliert oder zu fallen droht, muss er sofort seine Kraft nachlassen und den Partner stützen, um ihn wieder in eine stabile Position zu bringen.",
        "Es entsteht ein dynamisches Spiel aus Druck und Gegendruck, aus Angriff und Unterstützung. Es geht um die gemeinsame Aufrechterhaltung des Widerstands und das Spüren der Kraft des anderen, nicht um den Sieg.",
        "Die Übung erfordert hohe Achtsamkeit für den Partner und die Bereitschaft, die eigene Kraft zu kontrollieren."
      ],
      variations: ["Schieben Rücken an Rücken.", "Die Übung mit geschlossenen Augen durchführen, um die Sensibilität zu erhöhen."]
    }
  },

  // KATEGORIE 5: RAINBOW OF DESIRE
  {
    id: "cops-in-head",
    title: "Der Polizist im Kopf",
    category: "Rainbow of Desire",
    tags: ["Psychologie", "Blockaden", "Internalisierung"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Diese Technik aus dem 'Regenbogen der Wünsche' macht internalisierte Unterdrückung sichtbar. Sie untersucht die 'Stimmen' oder Blockaden in unserem Kopf, die uns daran hindern, in bestimmten Situationen frei zu handeln, selbst wenn keine äußere Bedrohung vorliegt.",
      instructions: [
        "Ein Protagonist erzählt eine persönliche Situation, in der er gerne gehandelt hätte, es aber nicht konnte (z.B. sich in einem Meeting zu Wort melden, jemandem die Meinung sagen). Die Szene wird kurz angespielt, bis zu dem Punkt der Blockade.",
        "Mit Hilfe der Gruppe und des Spielleiters werden die 'Stimmen im Kopf' des Protagonisten identifiziert. Das können verinnerlichte Sätze von Autoritätspersonen sein ('Du bist nicht gut genug', 'Sei still und brav', 'Das macht man nicht').",
        "Für jede dieser Stimmen wird ein Schauspieler aus der Gruppe ausgewählt. Diese 'Polizisten' verkörpern die Stimmen nun physisch und lautstark.",
        "Der Protagonist stellt sich wieder in die Situation. Die 'Polizisten' umringen ihn, flüstern oder rufen ihm ihre Sätze zu und halten ihn vielleicht sogar physisch fest oder blockieren seinen Weg.",
        "Die Aufgabe des Protagonisten ist es nun, sich physisch und stimmlich gegen diese internalisierten Unterdrücker durchzusetzen, sie abzuschütteln, zu übertönen oder mit ihnen zu verhandeln, um seine Handlungsfähigkeit zurückzugewinnen.",
        "Die Übung ist emotional intensiv und erfordert eine vertrauensvolle Atmosphäre."
      ],
      variations: ["Fokus auf die 'guten Polizisten' (unterstützende innere Stimmen).", "Die Polizisten können sich in verschiedene Bereiche des Raumes verteilen, die für den Protagonisten eine Bedeutung haben."]
    }
  },
  {
    id: "rainbow-desire",
    title: "Regenbogen der Wünsche",
    category: "Rainbow of Desire",
    tags: ["Gefühle", "Komplexität"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Diese Kerntechnik von Boals psychologischem Theater macht die Komplexität und Widersprüchlichkeit unserer inneren Wünsche und Emotionen in einer Konfliktsituation sichtbar. Sie zeigt das gesamte Spektrum (den Regenbogen) dessen, was wir gleichzeitig wollen und fühlen.",
      instructions: [
        "Eine Konfliktszene des Protagonisten wird gespielt und an einem Höhepunkt gestoppt.",
        "Der Protagonist wird gefragt: 'Was willst du in diesem Moment?' Er benennt alle, oft widersprüchlichen Wünsche, die er in dieser Sekunde empfindet (z.B. 'Ich will ihn anschreien', 'Ich will weglaufen', 'Ich will, dass er mich mag', 'Ich will cool bleiben').",
        "Für jeden genannten Wunsch tritt ein Schauspieler aus der Gruppe auf. Dieser Schauspieler verkörpert nun *ausschließlich* diesen einen Wunsch oder diese eine Emotion in ihrer reinsten, extremsten Form. Er wird zu einer lebendigen Allegorie dieses Wunsches.",
        "Die verschiedenen 'Wünsche' positionieren sich um den Protagonisten herum und interagieren mit ihm und dem Antagonisten der Szene, indem sie ihren Wunsch lautstark und körperlich ausdrücken.",
        "Der Protagonist sieht nun sein gesamtes inneres Spektrum an Wünschen außen vor sich agieren. Dies ermöglicht ihm, die Widersprüche zu erkennen, die ihn blockieren, und einen bewussteren Umgang mit seinen Emotionen zu finden.",
        "Die Übung hilft, die Komplexität menschlichen Handelns zu verstehen und vereinfachende Lösungen zu vermeiden."
      ],
      variations: ["Die Wünsche können untereinander in Konflikt geraten.", "Der Protagonist kann versuchen, die Wünsche zu 'dirigieren' oder zu ordnen."]
    }
  },
  {
    id: "image-antagonist",
    title: "Das Bild des Antagonisten",
    category: "Rainbow of Desire",
    tags: ["Feindbild", "Verständnis"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Diese Technik hilft, Strategien gegen einen Unterdrücker (Antagonisten) zu entwickeln, indem man versucht, ihn nicht nur als Feindbild, sondern in seiner eigenen Logik und Selbstwahrnehmung zu verstehen.",
      instructions: [
        "Ein Protagonist, der in einem Konflikt mit einem Antagonisten steht, wird gebeten, eine Statue (ein Bild) des Antagonisten zu formen, so wie er ihn sieht. Oft entsteht dabei ein Bild eines Monsters, eines Tyrannen oder einer Karikatur.",
        "Dieses Bild wird analysiert: Was drückt es aus? Welche Ängste des Protagonisten spiegeln sich darin?",
        "Im zweiten Schritt wird der Protagonist gebeten, ein Bild des Antagonisten zu formen, *so wie dieser sich selbst sehen könnte*. Dies erfordert einen Perspektivenwechsel und Empathie. Sieht er sich als Held, als Opfer der Umstände, als jemand, der nur seine Pflicht tut?",
        "Die beiden Bilder (Fremdbild und Selbstbild) werden nebeneinander gestellt und verglichen. Wo sind die Unterschiede? Wo gibt es vielleicht Gemeinsamkeiten oder Missverständnisse?",
        "Die Erkenntnisse aus diesem Vergleich können genutzt werden, um im Forumtheater realistischere Strategien im Umgang mit dem Antagonisten zu entwickeln, die über einfache Konfrontation hinausgehen."
      ],
      variations: ["Einbeziehung von Bildern, wie Dritte (z.B. Verbündete des Antagonisten) ihn sehen.", "Formen von Bildern der Beziehung zwischen Protagonist und Antagonist."]
    }
  },

  // KATEGORIE 6: SCHAUSPIEL-TECHNIK
  {
    id: "walking-grid",
    title: "Walking the Grid (Viewpoints)",
    category: "Schauspiel-Technik",
    tags: ["Raum", "Präsenz", "Geometrie"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Eine grundlegende Übung aus der Viewpoints-Methode (nach Anne Bogart/Tina Landau), die das Bewusstsein für den Raum, die eigene Präsenz und die geometrischen Beziehungen zu anderen schärft.",
      instructions: [
        "Die Gruppe bewegt sich im Raum. Die Vorgabe ist, sich ausschließlich in geraden Linien zu bewegen und nur im 90-Grad-Winkel abzubiegen. Der Raum wird als ein unsichtbares Raster (Grid) wahrgenommen.",
        "Die Teilnehmenden sollen ein Bewusstsein für die Linien im Raum entwickeln (parallel zu den Wänden, diagonal).",
        "Jeder Stopp, jede Drehung und jeder Tempowechsel soll eine klare, bewusste Entscheidung sein, kein zufälliges Herumschlendern.",
        "Die Gruppe soll einen 'Soft Focus' beibehalten: Das bedeutet, den Blick nicht auf einen Punkt oder eine Person zu fixieren, sondern das gesamte periphere Sichtfeld zu nutzen, um alles im Raum gleichzeitig wahrzunehmen (andere Personen, Architektur, Abstände).",
        "Ziel ist es, eine hohe Wachheit für die räumliche Komposition zu entwickeln, die in jedem Moment entsteht, und sich als Teil eines größeren Bildes zu begreifen."
      ],
      variations: ["Einführung von Tempowechseln (schnell, langsam, Stopp) auf dem Grid.", "Hinzufügen von Gesten oder kurzen Aktionen an den Wendepunkten."]
    }
  },
  {
    id: "7-levels",
    title: "Die 7 Spannungszustände (Lecoq)",
    category: "Schauspiel-Technik",
    tags: ["Körper", "Ausdruck", "Skala"],
    attributes: { focus: "extra", energy: "high", level: "advanced" },
    content: {
      context: "Diese von Jacques Lecoq entwickelte Skala hilft Schauspielern, verschiedene Ebenen der körperlichen Präsenz und Dramatik bewusst zu steuern und für die Charakterarbeit zu nutzen. Sie reicht von völliger Entspannung bis hin zu extremer Spannung.",
      instructions: [
        "Der Spielleiter führt die Gruppe durch die sieben Stufen der Muskelspannung. Die Teilnehmenden bewegen sich im Raum und verkörpern jeden Zustand mit dem ganzen Körper, der Atmung und der Stimme.",
        "1. **Erschöpft (Qualle):** Keine Spannung, der Körper ist schwer, Bewegungen sind mühsam, die Schwerkraft siegt.",
        "2. **Cool (Kalifornier):** Minimale Spannung, alles ist 'easy', lässige Haltung, wenig Energieaufwand.",
        "3. **Neutral (Ökonomisch):** Die notwendige Spannung, um aufrecht zu stehen und sich effizient zu bewegen. Keine überflüssigen Bewegungen, hohe Präsenz im 'Hier und Jetzt'. Der Nullpunkt.",
        "4. **Wach (Neugierig):** Erhöhte Aufmerksamkeit, der Körper ist bereit zur Reaktion, der Blick ist offen und interessiert.",
        "5. **Aktiv/Reaktiv (Drama):** Hohe Spannung, schnelle Aktionen und Reaktionen, Konfliktbereitschaft, der Körper ist unter Strom.",
        "6. **Leidenschaftlich (Oper):** Extreme Spannung, große Gesten, starke Emotionen (Liebe, Hass, Wut), die den ganzen Körper ergreifen.",
        "7. **Tragisch (Versteinert):** Die Spannung ist so hoch, dass Bewegung unmöglich wird. Der Körper ist wie zu Stein erstarrt, innerlich zerreißt es ihn.",
        "Die Gruppe kann zwischen den Stufen hin und her wechseln, um die Unterschiede zu spüren."
      ],
      variations: ["Anwendung der Spannungszustände auf eine kurze Szene oder einen Text.", "Charaktere entwickeln, die in einem bestimmten Spannungszustand 'leben'."]
    }
  },
  {
    id: "stick-ball-veil",
    title: "Stock, Ball, Schleier (Chekhov)",
    category: "Schauspiel-Technik",
    tags: ["Charakter", "Bewegung"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Diese Übung nach Michael Chekhov nutzt imaginäre Bilder, um die Qualität von Bewegungen zu verändern und verschiedene psychologische Zentren im Körper zu aktivieren. Sie hilft bei der Charakterentwicklung.",
      instructions: [
        "Die Teilnehmenden bewegen sich im Raum und stellen sich vor, dass sich ihr Bewegungszentrum an einem bestimmten Ort im Körper befindet und eine bestimmte Qualität hat.",
        "**Stock (Denken):** Das Zentrum ist im Kopf. Die Bewegungen sind gerade, direkt, linear, vielleicht etwas steif und analytisch. Der Kopf führt.",
        "**Ball (Wollen/Handeln):** Das Zentrum ist im Becken oder Bauch. Die Bewegungen sind rund, federnd, energisch, geerdet und impulsiv. Das Becken führt.",
        "**Schleier (Fühlen):** Das Zentrum ist in der Herzgegend, aber die Energie umhüllt den Körper wie ein weicher Schleier. Die Bewegungen sind fließend, weich, tastend, emotional und sensibel.",
        "Die Gruppe experimentiert mit den verschiedenen Qualitäten und beobachtet, wie sich Haltung, Gang und Interaktion verändern."
      ],
      variations: ["Kombination der Zentren für komplexere Charaktere.", "Anwendung auf spezifische Handlungen (z.B. eine Tasse Tee trinken mit 'Stock'-, 'Ball'- oder 'Schleier'-Qualität)."]
    }
  },
  {
    id: "neutral-mask",
    title: "Die Neutrale Maske",
    category: "Schauspiel-Technik",
    tags: ["Stille", "Präsenz", "Basis"],
    attributes: { focus: "intro", energy: "low", level: "advanced" },
    content: {
      context: "Die Arbeit mit der neutralen Maske (nach Lecoq) ist eine grundlegende Übung, um persönliche Eigenheiten abzulegen und einen Zustand reiner, unvoreingenommener Präsenz zu erreichen. Es ist der 'Nullpunkt', von dem aus Charakterarbeit beginnen kann.",
      instructions: [
        "Die Teilnehmenden tragen eine neutrale Maske (eine gesichtslose Maske, die keine Emotion ausdrückt). Alternativ kann versucht werden, einen vollkommen neutralen, entspannten Gesichtsausdruck beizubehalten.",
        "Die Aufgabe ist es, einfach im Raum zu stehen oder sich langsam zu bewegen, ohne eine Geschichte zu erzählen, ohne eine Emotion auszudrücken, ohne Vergangenheit und ohne Zukunft.",
        "Es geht um das reine Sein im 'Hier und Jetzt'. Jede Bewegung soll ökonomisch und frei von persönlicher Färbung sein.",
        "Die Maske zwingt den Körper, 'zu sprechen', da das Gesicht als Ausdrucksmittel wegfällt. Die Teilnehmenden lernen, wie viel sie normalerweise unbewusst über ihr Gesicht kommunizieren.",
        "Die Übung erfordert Stille und hohe Konzentration. Es geht darum, die eigene 'Leinwand' leer zu machen, bevor man sie neu bemalt."
      ],
      variations: ["Begegnung mit einem anderen neutralen Wesen im Raum.", "Reaktion auf einfache Impulse (ein Geräusch, ein Objekt) aus der Neutralität heraus."]
    }
  },
  {
    id: "elements",
    title: "Elemente (Lecoq)",
    category: "Schauspiel-Technik",
    tags: ["Verkörperung", "Natur"],
    attributes: { focus: "extra", energy: "high", level: "beginner" },
    content: {
      context: "Die Verkörperung von Naturelementen ist eine kraftvolle Methode, um neue Bewegungsqualitäten, Rhythmen und Energien für die Charakterarbeit zu entdecken. Es geht nicht um Pantomime, sondern um das 'Werden' des Elements.",
      instructions: [
        "Die Teilnehmenden bewegen sich im Raum und werden angeleitet, verschiedene Elemente mit ihrem ganzen Körper zu verkörpern.",
        "**Feuer:** Schnelle, zuckende, explosive Bewegungen. Staccato-Rhythmus, Hitze, Licht, verzehrende Energie, Aufwärtsbewegung.",
        "**Wasser:** Fließende, wellenförmige, runde Bewegungen. Schwere oder Leichtigkeit, Anpassungsfähigkeit, stetiger Fluss, Abwärtsbewegung oder Ausbreitung.",
        "**Luft:** Leichte, schwebende, chaotische Bewegungen. Schnelle Richtungswechsel, Unberechenbarkeit, Weite, Atem.",
        "**Erde:** Feste, schwere, stabile Bewegungen. Widerstand, Verwurzelung, Langsamkeit, Kraft, Bodenhaftung.",
        "Die Gruppe experimentiert damit, wie die Elemente miteinander interagieren (Feuer trifft Wasser, Luft trifft Erde)."
      ],
      variations: ["Verkörperung von spezifischen Materialien (Holz, Metall, Gummi).", "Entwicklung eines Charakters, der stark von einem Element geprägt ist."]
    }
  },

  // KATEGORIE 7: ZEITUNGSTHEATER
  {
    id: "newspaper-theatre",
    title: "Zeitungstheater (12 Techniken)",
    category: "Zeitungstheater",
    tags: ["Medien", "Politik", "Textarbeit"],
    attributes: { focus: "extra", energy: "low", level: "advanced" },
    content: {
      context: "Das Zeitungstheater ist die erste Form des Theaters der Unterdrückten, entwickelt von Augusto Boal. Es umfasst 12 Techniken, um Zeitungstexte (oder andere Medien) szenisch zu dekonstruieren, ihre verborgenen Ideologien offenzulegen und sie kritisch zu hinterfragen.",
      instructions: [
        "Es werden Zeitungsartikel ausgewählt, die ein aktuelles politisches oder soziales Thema behandeln.",
        "Die Gruppe experimentiert mit verschiedenen Techniken, um die Texte vorzutragen oder zu inszenieren. Hier eine Auswahl:",
        "**1. Gekreuztes Lesen:** Zwei Artikel mit widersprüchlichen Informationen oder Perspektiven zum gleichen Thema werden abwechselnd Zeile für Zeile (oder Absatz für Absatz) vorgelesen. Dadurch entstehen neue, oft absurde oder entlarvende Zusammenhänge.",
        "**2. Rhythmisches Lesen:** Ein Text (z.B. ein tragischer Bericht, eine politische Rede) wird zu einem völlig unpassenden musikalischen Rhythmus (z.B. Samba, Marschmusik, Werbejingle) gelesen oder gesungen. Der Kontrast zwischen Inhalt und Form ('Filterung') macht die Manipulation durch Medien deutlich.",
        "**3. Ergänzendes Lesen:** Der Text wird vorgelesen, aber an bestimmten Stellen werden Informationen laut hinzugefügt, die im Originaltext verschwiegen oder weggelassen wurden, aber für das Verständnis wichtig sind (z.B. Hintergründe, Profiteure, verschwiegene Opfer).",
        "**4. Parallele Handlung:** Der Text wird neutral vorgelesen, während im Hintergrund eine szenische Handlung abläuft, die die brutale Realität zeigt, die der Text beschönigt oder verschweigt (z.B. ein Text über 'Wirtschaftswachstum' wird gelesen, während im Hintergrund Ausbeutung gezeigt wird).",
        "Weitere Techniken sind z.B. Improvisation, Historisierung, Verstärkung, Konkretisierung des Abstrakten."
      ],
      variations: ["Anwendung der Techniken auf Social-Media-Posts, Werbetexte oder politische Reden.", "Entwicklung einer kompletten Aufführung basierend auf einer Tageszeitung."]
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
  return (
    <div className="w-full max-w-2xl mx-auto p-4 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Deine Auswahl ({results.length})</h2>
        <button onClick={onReset} className={`flex items-center text-sm font-medium text-slate-500 hover:${PRIMARY_TEXT_COLOR}`}>
          <RefreshCw size={16} className="mr-1" /> Neustart
        </button>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-slate-200">
          <p className="text-slate-500 mb-4">Keine exakten Treffer für diese Kombination.</p>
          <button onClick={onReset} className={`px-6 py-2 ${PRIMARY_COLOR} text-white rounded-lg ${PRIMARY_COLOR_HOVER}`}>
            Alles zurücksetzen
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {results.map((game) => (
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
                  <p className="text-sm text-slate-500 mb-2">{game.category}</p>
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
          <h2 className="text-3xl font-bold text-slate-900 mb-4">{game.title}</h2>
          
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
            <button 
              onClick={handleStart}
              className={`w-full py-4 ${PRIMARY_COLOR} text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-200/50 ${PRIMARY_COLOR_HOVER} hover:shadow-xl transition-all active:scale-95 flex items-center justify-center`}
            >
              Starten <ArrowRight className="ml-2" />
            </button>
            <p className="mt-8 text-xs text-slate-400">Powered by Polithea Osnabrück • Version 1.0</p>
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