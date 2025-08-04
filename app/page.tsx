"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Shuffle, Users, Heart, Moon, Sun } from "lucide-react"

interface Player {
  id: string
  name: string
  gender: string
  sexuality: string
  statistics: {
    completedChallenges: CompletedChallenge[]
    totalChallenges: number
    favoriteThemes: { [themeId: string]: number }
    difficultyPreferences: { [difficulty: string]: number }
    truthsCompleted: number
    daresCompleted: number
  }
}

interface CompletedChallenge {
  id: string
  type: "truth" | "dare"
  content: string
  theme: string
  difficulty: "easy" | "medium" | "hard"
  completedAt: Date
  rating?: number
}

interface Challenge {
  type: "truth" | "dare"
  content: string
  difficulty: "easy" | "medium" | "hard"
  theme: string
}

interface ThemePack {
  id: string
  name: string
  description: string
  icon: string
  color: string
  truths: { [key in "easy" | "medium" | "hard"]: string[] }
  dares: { [key in "easy" | "medium" | "hard"]: string[] }
  romanticDares?: { [key in "easy" | "medium" | "hard"]: string[] }
}

const themePacks: ThemePack[] = [
  {
    id: "classic",
    name: "Klassisch",
    description: "Traditionelle Wahrheit oder Pflicht Fragen",
    icon: "🎭",
    color: "bg-blue-500",
    truths: {
      easy: [
        "Was ist dein Lieblingslied?",
        "Welche Farbe magst du am liebsten?",
        "Was ist dein Lieblings-Snack?",
        "Welches Tier findest du am süßesten?",
        "Was machst du gerne in deiner Freizeit?",
        "Welcher ist dein Lieblings-Film?",
        "Was ist dein Lieblings-Essen?",
        "Welche Jahreszeit magst du am liebsten?",
        "Was ist dein Lieblings-Hobby?",
        "Welches Buch hast du zuletzt gelesen?",
        "Was ist dein Lieblings-Urlaubsziel?",
        "Welche App nutzt du am meisten?",
        "Was ist dein Lieblings-Getränk?",
        "Welchen Sport schaust du gerne?",
        "Was ist dein Lieblings-Wochentag?",
        "Welches ist dein peinlichstes Kindheitsfoto?",
        "Was ist dein Lieblings-Emoji?",
        "Welche Superkraft hättest du gerne?",
        "Was ist dein Lieblings-Videospiel?",
        "Welches Land möchtest du besuchen?",
        "Was ist dein Lieblings-Dessert?",
        "Welche Sprache würdest du gerne lernen?",
        "Was ist dein Lieblings-Zitat?",
        "Welcher Promi ist dein Vorbild?",
        "Was ist dein Lieblings-Parfum?",
        "Welche Musik hörst du beim Sport?",
        "Was ist dein Lieblings-Podcast?",
        "Welche Serie schaust du gerade?",
        "Was ist dein Lieblings-Kochrezept?",
        "Welches Haustier hättest du gerne?",
        "Was ist dein Lieblings-Reiseziel?",
        "Welche App könntest du nicht löschen?",
        "Was ist dein Lieblings-Kindheitsspielzeug?",
        "Welchen Job hättest du gerne?",
        "Was ist dein Lieblings-Wetter?",
        "Welche Pizza-Sorte ist deine Lieblings?",
        "Was ist dein Lieblings-Eisgeschmack?",
        "Welchen Namen findest du am schönsten?",
        "Was ist dein Lieblings-Feiertag?",
        "Welche Automarke gefällt dir am besten?",
        "Was ist dein Lieblings-Kindheitslied?",
        "Welche Blume magst du am liebsten?",
        "Was ist dein Lieblings-Brettspiel?",
        "Welche Süßigkeit isst du am liebsten?",
        "Was ist dein Lieblings-Cartoon?",
        "Welche Farbe würdest du nie tragen?",
        "Was ist dein Lieblings-Fastfood?",
        "Welchen Spitznamen hattest du als Kind?",
        "Was ist dein Lieblings-Schuljahr gewesen?",
        "Welche Aktivität entspannt dich am meisten?",
      ],
      medium: [
        "Was war dein peinlichstes Erlebnis bei einem Date?",
        "Hattest du schon mal einen Schwarm auf jemanden in diesem Raum?",
        "Was ist dein größter Abtörner bei einem potenziellen Partner?",
        "Was ist dein seltsamster Traum?",
        "Welchen Promi würdest du gerne daten?",
        "Was ist deine größte irrationale Angst?",
        "Hast du schon mal über dein Alter gelogen?",
        "Was ist das Kindischste, was du immer noch machst?",
        "Was ist deine Guilty-Pleasure TV-Show?",
        "Wessen Gedanken würdest du gerne lesen können?",
        "Was war das Spontanste, was du je getan hast?",
        "Hattest du schon mal einen geheimen Social Media Account?",
        "Was ist deine schlechteste Angewohnheit?",
        "Welche 3 Apps würdest du auf deinem Handy behalten?",
        "Wie lange warst du schon mal nicht duschen?",
        "Was war dein erstes Handy?",
        "Welche Lüge erzählst du am häufigsten?",
        "Was ist das Peinlichste in deinem Zimmer?",
        "Hast du schon mal Geld gestohlen?",
        "Was war dein schlimmster Haarschnitt?",
        "Hast du schon mal das Küssen an deiner Hand geübt?",
        "Was ist das Seltsamste, was du je gegoogelt hast?",
        "Welches Tier wäre am unhöflichsten, wenn es sprechen könnte?",
        "Was ist deine seltsamste Angewohnheit?",
        "Hast du schon mal so getan, als wärst du krank?",
        "Was ist das Peinlichste, was du in der Öffentlichkeit getan hast?",
        "Was ist deine seltsamste Phobie?",
        "Was ist das Verrückteste, was du je gekauft hast?",
        "Was ist dein peinlichster Moment beim Arzt?",
        "Was ist das Seltsamste, was du je gesammelt hast?",
        "Was ist dein peinlichster Moment in der Schule?",
        "Hast du schon mal einen imaginären Freund gehabt?",
        "Was ist das Dümmste, was du je gesagt hast?",
        "Was ist dein seltsamster Tick?",
        "Was war deine kreativste Ausrede?",
        "Hast du schon mal heimlich jemanden beobachtet?",
        "Was ist das Peinlichste, was du je getragen hast?",
        "Welche Lüge hast du als Kind am häufigsten erzählt?",
        "Was ist dein größter Fehler beim Kochen gewesen?",
        "Hast du schon mal etwas Wichtiges vergessen?",
        "Was ist das Seltsamste, was du je geträumt hast?",
        "Welche schlechte Angewohnheit hast du heimlich?",
        "Was ist das Peinlichste, was deine Eltern über dich erzählen?",
        "Hast du schon mal jemanden versehentlich verletzt?",
        "Was ist dein größter Aberglaube?",
        "Welche Ausrede hast du erfunden, um nicht zur Arbeit/Schule zu gehen?",
        "Was ist das Seltsamste, was du je als Geschenk bekommen hast?",
        "Hast du schon mal etwas Wichtiges kaputt gemacht und es verheimlicht?",
        "Was ist deine peinlichste Kindheitserinnerung?",
        "Welche dumme Regel hast du als Kind befolgt?",
        "Was ist das Verrückteste, was du je für Aufmerksamkeit getan hast?",
      ],
      hard: [
        "Was ist dein dunkelster Gedanke, den du nie jemandem erzählt hast?",
        "Hast du schon mal jemanden betrogen?",
        "Was ist das Schlimmste, was du jemals getan hast?",
        "Welches Geheimnis könntest du niemals preisgeben?",
        "Was bereust du am meisten in deinem Leben?",
        "Hast du schon mal jemanden richtig verletzt?",
        "Was ist deine größte Unsicherheit?",
        "Hast du schon mal etwas Illegales getan?",
        "Wen in diesem Raum findest du am attraktivsten?",
        "Hast du schon mal über einen Freund gelästert?",
        "Was ist deine schlimmste Eigenschaft?",
        "Hast du schon mal jemanden gehasst?",
        "Was ist das Gemeinste, was du je gesagt hast?",
        "Welche Fantasie hast du, die niemand wissen soll?",
        "Was ist dein größtes Versagen?",
        "Hast du schon mal Drogen genommen?",
        "Was ist das Peinlichste, was deine Eltern über dich wissen?",
        "Welchen Fehler würdest du am liebsten ungeschehen machen?",
        "Hast du schon mal jemanden angelogen, um ihn zu verletzen?",
        "Was ist dein größtes Versagen?",
        "Was ist das Gemeinste, was du je gesagt hast?",
        "Welche Fantasie hast du, die niemand wissen soll?",
        "Hast du schon mal jemanden gehasst?",
        "Was ist deine schlimmste Eigenschaft?",
        "Hast du schon mal über einen Freund gelästert?",
        "Wen in diesem Raum findest du am attraktivsten?",
        "Was ist dein peinlichstes sexuelles Erlebnis?",
        "Hast du schon mal etwas Illegales getan?",
        "Was ist deine größte Unsicherheit?",
        "Hast du schon mal jemanden richtig verletzt?",
        "Was bereust du am meisten in deinem Leben?",
        "Welches Geheimnis könntest du niemals preisgeben?",
        "Was ist das Schlimmste, was du jemals getan hast?",
        "Hast du schon mal jemanden betrogen?",
        "Was ist dein dunkelster Gedanke, den du nie jemandem erzählt hast?",
        "Hast du schon mal jemanden absichtlich manipuliert?",
        "Was ist das Schlimmste, was du je über jemanden gedacht hast?",
        "Welche Sünde würdest du niemals beichten?",
        "Hast du schon mal jemanden aus Eifersucht verletzt?",
        "Was ist dein größtes moralisches Versagen?",
        "Welche dunkle Seite hast du, die niemand kennt?",
        "Hast du schon mal jemanden bewusst im Stich gelassen?",
        "Was ist das Grausamste, was du je getan hast?",
        "Welches Verbrechen könntest du dir vorstellen zu begehen?",
        "Hast du schon mal jemanden erpresst oder bedroht?",
        "Was ist dein schlimmster Charakterzug?",
        "Welche Lüge erzählst du dir selbst?",
        "Hast du schon mal jemanden aus Rache verletzt?",
        "Was ist das Verwerflichste, was du je gedacht hast?",
        "Welches Geheimnis würde dein Leben ruinieren?",
        "Hast du schon mal jemanden bewusst bloßgestellt?",
      ],
    },
    dares: {
      easy: [
        "Mache deine beste Tiernachahmung",
        "Singe 'Happy Birthday' im Stil deines Lieblingskünstlers",
        "Mache 10 Hampelmänner",
        "Erzähle einen schlechten Witz",
        "Tanze 30 Sekunden ohne Musik",
        "Imitiere einen Promi für 1 Minute",
        "Mache 5 Liegestütze",
        "Singe ein Kinderlied",
        "Mache eine Grimasse für 30 Sekunden",
        "Hüpfe auf einem Bein durch den Raum",
        "Sprich 2 Minuten lang nur flüsternd",
        "Mache den Roboter-Tanz",
        "Erzähle ein Märchen in 1 Minute",
        "Mache Yoga-Posen für 1 Minute",
        "Sprich wie ein Pirat für 5 Minuten",
        "Sprich die nächsten 5 Minuten in Reimen",
        "Mache 30 Sekunden lang den Hühnertanz",
        "Tue so, als wärst du ein Roboter",
        "Belle wie ein Hund während du Hampelmänner machst",
        "Mache deine beste böse Lachen-Imitation",
        "Hüpfe wie ein Frosch durch den Raum",
        "Mache Tiergeräusche für 1 Minute",
        "Tue so, als wärst du ein Baby",
        "Mache eine Minute lang Affengeräusche",
        "Krieche wie eine Schlange",
        "Mache den Chicken Dance",
        "Imitiere einen Dinosaurier",
        "Mache Geräusche wie ein Traktor",
        "Tue so, als würdest du fliegen",
        "Mache eine Minute lang Vogelgeräusche",
        "Erstelle eine 30-sekündige Werbung für etwas Zufälliges im Raum",
        "Zeichne ein Porträt mit deiner schwächeren Hand",
        "Erfinde ein Lied über deinen Tag",
        "Designe ein Outfit nur mit Gegenständen aus diesem Raum",
        "Erfinde einen neuen Tanzschritt",
        "Mache eine Minute lang Katzenbewegungen",
        "Imitiere einen berühmten Politiker beim Reden",
        "Mache 20 Kniebeugen",
        "Singe ein Lied nur mit 'La la la'",
        "Mache eine Minute lang Pantomime",
        "Imitiere jemanden aus dem Raum für 2 Minuten",
        "Mache eine Modenschau durch den Raum",
        "Erzähle eine Geschichte nur mit Handbewegungen",
        "Mache 30 Sekunden lang Beatboxing",
        "Imitiere einen Nachrichtensprecher",
        "Mache eine Minute lang Standbildtheater",
        "Singe ein Duett mit dir selbst",
        "Mache eine Tanzchoreografie zu einem bekannten Lied",
        "Imitiere verschiedene Akzente für 2 Minuten",
        "Mache eine Minute lang Zaubertricks",
      ],
      medium: [
        "Mache eine dramatische Lesung deiner letzten gesendeten Nachricht",
        "Imitiere jemanden aus dem Raum für 2 Minuten",
        "Sprich die nächsten 5 Minuten nur in Reimen",
        "Mache einen Catwalk durch den Raum",
        "Singe alles was du sagst für die nächsten 3 Runden",
        "Trage deine Kleidung verkehrt herum für 10 Minuten",
        "Rede wie ein Nachrichtensprecher für 3 Minuten",
        "Mache 20 Kniebeugen",
        "Sprich nur in Fragen für die nächsten 5 Minuten",
        "Tanze zu einem Lied, das jemand anderes auswählt",
        "Erzähle eine Geschichte nur mit Handbewegungen",
        "Mache 1 Minute lang Standbildtheater",
        "Sprich in einem anderen Akzent für 10 Minuten",
        "Mache eine Modenschau mit Kleidung aus dem Raum",
        "Führe einen Monolog über Socken auf",
        "Mache 30 Sekunden lang Beatboxing",
        "Erzähle einen Witz in 3 verschiedenen Stimmen",
        "Mache eine Minute lang Pantomime",
        "Singe ein Lied rückwärts",
        "Führe einen Tanz aus den 80ern auf",
        "Tue so, als wärst du ein Nachrichtensprecher",
        "Imitiere ein weinendes Baby",
        "Laufe wie eine Krabbe durch den Raum",
        "Tue so, als wärst du ein Mime in einer Box",
        "Sprich wie ein Pirat für die nächsten 10 Minuten",
        "Mache eine Modenschau mit Klopapier",
        "Rede wie Donald Duck für 5 Minuten",
        "Mache eine Minute lang Yoga-Posen",
        "Tue so, als wärst du betrunken",
        "Imitiere einen berühmten Politiker",
        "Mache eine Minute lang Karate-Bewegungen",
        "Sprich nur in Fragen für 5 Minuten",
        "Mache eine Präsentation über Socken",
        "Tue so, als wärst du ein Superheld",
        "Imitiere einen Opernsänger",
        "Mache 50 Hampelmänner ohne Pause",
        "Führe ein Schauspiel über das Wetter auf",
        "Imitiere 5 verschiedene Tiere hintereinander",
        "Mache eine Minute lang Breakdance-Moves",
        "Erzähle eine Gruselgeschichte mit lustiger Stimme",
        "Mache eine Kochshow über ein imaginäres Gericht",
        "Imitiere einen Fitness-Trainer für 3 Minuten",
        "Mache eine Minute lang Salsa-Tanz",
        "Führe ein Interview mit einem imaginären Promi",
        "Mache eine Wettervorhersage im TV-Stil",
        "Imitiere einen Verkäufer, der etwas Verrücktes verkauft",
        "Mache eine Minute lang Moonwalk",
        "Führe eine Talkshow mit dir selbst",
        "Mache eine Aerobic-Stunde für alle",
        "Imitiere einen Lehrer in verschiedenen Situationen",
      ],
      hard: [
        "Rufe deine Mutter an und sage ihr, dass du sie liebst",
        "Poste ein peinliches Kindheitsfoto auf Social Media",
        "Lasse jemand anderen für 1 Minute durch deine Kamerarolle schauen",
        "Gehe live auf Social Media für 2 Minuten",
        "Rufe eine Pizzeria an und bestelle eine Pizza mit Ananas",
        "Poste einen peinlichen Status auf Facebook",
        "Lasse jemanden dein Handy für 5 Minuten benutzen",
        "Poste ein Video von dir beim Tanzen",
        "Rufe einen zufälligen Kontakt an und singe ihm ein Lied",
        "Schreibe eine peinliche Nachricht an deinen Chef",
        "Lasse jemanden deine Nachrichten für 2 Minuten lesen",
        "Poste ein Foto ohne Make-up/Filter",
        "Rufe deine Eltern an und gestehe eine Lüge",
        "Poste deine Handynummer für 10 Minuten öffentlich",
        "Schicke einem Fremden eine Freundschaftsanfrage",
        "Lasse jemanden deinen Browser-Verlauf sehen",
        "Poste ein Foto von deinem unaufgeräumten Zimmer",
        "Trage deine Kleidung verkehrt herum für den Rest des Spiels",
        "Lasse jemanden dein Gesicht mit Lebensmitteln bemalen",
        "Esse etwas Ekelhaftes, das die Gruppe aussucht",
        "Mache einen peinlichen Tanz vor der Kamera",
        "Rufe einen Fremden an und singe ihm ein Lied",
        "Laufe nackt um das Haus (wenn möglich und legal)",
        "Lasse dir die Augen verbinden und esse etwas Unbekanntes",
        "Mache 50 Liegestütze ohne Pause",
        "Trinke einen Smoothie aus seltsamen Zutaten",
        "Lasse jemanden deine Haare stylen",
        "Mache einen Handstand für 1 Minute",
        "Esse eine rohe Zwiebel",
        "Lasse dir Klebeband über den Mund kleben für 10 Minuten",
        "Mache Sit-ups während du singst",
        "Lasse jemanden dich kitzeln für 30 Sekunden",
        "Trinke ein Glas Wasser mit Salz",
        "Mache einen Purzelbaum",
        "Lasse dir die Nase zuhalten während du sprichst",
        "Schicke deinem Ex eine Entschuldigungs-Nachricht",
        "Poste ein Foto von dir beim Weinen",
        "Lasse jemanden deine peinlichsten Fotos sehen",
        "Rufe deinen Chef an und singe ihm ein Lied",
        "Poste deine Spotify-Playlist öffentlich",
        "Lasse jemanden deine Notizen-App durchsuchen",
        "Schicke allen deinen Kontakten eine Gruppennachricht",
        "Poste ein Video von dir beim Duschen (angezogen)",
        "Lasse jemanden deine Suchanfragen der letzten Woche sehen",
        "Rufe eine Hotline an und erzähle deine Lebensgeschichte",
        "Poste ein Foto von dir auf der Toilette (angezogen)",
        "Lasse jemanden deine Kamera-App für 10 Minuten kontrollieren",
        "Schicke deinem Schwarm eine Liebeserklärung",
        "Poste alle deine gespeicherten Memes",
        "Lasse jemanden deine Voice-Memos anhören",
      ],
    },
    romanticDares: {
      easy: [
        "Mache jemandem im Raum ein ehrliches Kompliment",
        "Beschreibe dein ideales erstes Date",
        "Schreibe ein kurzes Liebesgedicht und lies es vor",
        "Erzähle von deinem ersten Schwarm",
        "Beschreibe deinen Traumpartner",
        "Singe ein Liebeslied für jemanden",
        "Mache eine romantische Geste",
        "Erzähle deine romantischste Fantasie",
        "Beschreibe den perfekten Kuss",
        "Mache jemandem eine Liebeserklärung (als Scherz)",
      ],
      medium: [
        "Gib jemandem eine 10-sekündige Schultermassage",
        "Flirte 2 Minuten lang mit jemandem im Raum",
        "Erzähle von deinem ersten Kuss",
        "Tanze langsam mit jemandem für 1 Minute",
        "Halte jemandes Hand für 2 Minuten",
        "Schaue jemandem 30 Sekunden tief in die Augen",
        "Flüstere jemandem etwas Süßes ins Ohr",
        "Gib jemandem eine romantische Umarmung",
        "Mache mit jemandem einen romantischen Spaziergang",
        "Küsse jemandes Hand",
      ],
      hard: [
        "Küsse jemanden im Raum auf die Wange",
        "Gib jemandem einen Kuss auf die Hand",
        "Umarme jemanden 30 Sekunden lang",
        "Küsse jemanden auf die Stirn",
        "Mache jemandem einen Heiratsantrag (als Scherz)",
        "Kuschle 10 Minuten mit jemandem",
        "Küsse jemanden sanft auf die Lippen",
        "Verbring 15 Minuten in einem dunklen Raum mit jemandem",
        "Mache mit jemandem alles, was Paare machen (außer Sex)",
        "Schlafe eine Nacht neben jemandem (nur kuscheln)",
      ],
    },
  },
  {
    id: "party",
    name: "Party",
    description: "Wilde Party-Herausforderungen und Spaß",
    icon: "🎉",
    color: "bg-pink-500",
    truths: {
      easy: [
        "Was ist das Verrückteste, was du auf einer Party gemacht hast?",
        "Welche Musik lässt dich sofort tanzen?",
        "Was ist dein Lieblings-Partyspiel?",
        "Welches Kostüm würdest du gerne auf einer Party tragen?",
        "Was ist dein Lieblings-Partygetränk?",
        "Auf welcher Party warst du am längsten wach?",
        "Was ist dein bester Partytrick?",
        "Welche Party war die beste deines Lebens?",
        "Was machst du, wenn ein Lied läuft, das du hasst?",
        "Welchen Partytanz kannst du am besten?",
        "Was ist dein Lieblings-Karaoke-Song?",
        "Welche Party-App nutzt du am liebsten?",
        "Was ist dein bestes Party-Outfit?",
        "Welches Partyspiel gewinnst du immer?",
        "Was ist dein Lieblings-Party-Snack?",
        "Welcher DJ ist dein Lieblings-DJ?",
        "Was ist dein Lieblings-Cocktail?",
        "Welche Party-Location findest du am besten?",
        "Was ist dein Lieblings-Partyoutfit?",
        "Welches Lied bringt dich sofort in Partystimmung?",
        "Was ist dein bester Partytrick?",
        "Welche Partyspiele spielst du am liebsten?",
        "Was ist dein Lieblings-Partysnack?",
        "Welche Musik hörst du beim Vorglühen?",
        "Was ist dein Lieblings-Partygetränk ohne Alkohol?",
        "Welche Partygeschichte erzählst du am liebsten?",
        "Was ist dein Lieblings-Partymotto?",
        "Welche Partyaktivität machst du am liebsten?",
        "Was ist dein bestes Partykostüm gewesen?",
        "Welche Partymusik aus den 90ern liebst du?",
        "Was ist dein Lieblings-Partyspiel für große Gruppen?",
        "Welche Partydeko findest du am coolsten?",
        "Was ist dein Lieblings-Partydrink-Rezept?",
        "Welche Partyaktivität würdest du gerne mal ausprobieren?",
        "Was ist dein Lieblings-Partylied zum Mitsingen?",
      ],
      medium: [
        "Hast du schon mal auf einer Party gekotzt?",
        "Was war dein peinlichster Party-Moment?",
        "Hast du schon mal auf einer Party jemanden geküsst, den du nicht kanntest?",
        "Was war das Dümmste, was du betrunken gemacht hast?",
        "Hast du schon mal auf einer Party gelogen, um jemanden zu beeindrucken?",
        "Was war dein schlimmster Kater?",
        "Hast du schon mal heimlich eine Party verlassen?",
        "Was war das Peinlichste, was du betrunken gesagt hast?",
        "Hast du schon mal auf einer Party geweint?",
        "Was war dein schlimmster Partyfehler?",
        "Hast du schon mal auf einer Party gestohlen?",
        "Was war dein peinlichster Tanz auf einer Party?",
        "Hast du schon mal auf einer Party in die Hose gemacht?",
        "Was war das Verrückteste, was du für Aufmerksamkeit getan hast?",
        "Hast du schon mal eine Party ruiniert?",
        "Was war dein peinlichster Gruppenchat-Moment?",
        "Hast du schon mal Screenshots von privaten Chats gemacht?",
        "Welchen Promi verfolgst du heimlich online?",
        "Was war dein schlimmster Online-Kauf?",
        "Was war die fantasievollste Lüge, die du als Kind erzählt hast?",
        "Was war deine kreativste Problemlösung?",
        "Welchen neuen Feiertag würdest du erfinden?",
        "Was ist das Seltsamste, was du je geträumt hast?",
        "Hast du schon mal einen Albtraum gehabt, der dich tagelang beschäftigt hat?",
        "Was ist das Verrückteste, was du je für Aufmerksamkeit getan hast?",
        "Hast du schon mal auf einer Party jemanden angelogen?",
        "Was war dein schlimmster Partyunfall?",
        "Hast du schon mal auf einer Party etwas Peinliches getan?",
        "Was war dein schlimmster Partykater?",
        "Hast du schon mal auf einer Party jemanden blamiert?",
        "Was war das Peinlichste, was du betrunken gemacht hast?",
        "Hast du schon mal auf einer Party etwas verloren?",
        "Was war dein schlimmster Partyoutfit?",
        "Hast du schon mal auf einer Party eingeschlafen?",
        "Was war das Dümmste, was du auf einer Party gesagt hast?",
      ],
      hard: [
        "Hast du schon mal Sex auf einer Party gehabt?",
        "Was war dein wildester One-Night-Stand nach einer Party?",
        "Hast du schon mal Drogen auf einer Party genommen?",
        "Was war das Illegalste, was du auf einer Party getan hast?",
        "Hast du schon mal jemanden auf einer Party betrogen?",
        "Was war dein schlimmster Blackout?",
        "Hast du schon mal nackt auf einer Party getanzt?",
        "Was war das Perverseste, was du betrunken getan hast?",
        "Hast du schon mal eine Orgie erlebt?",
        "Was war dein schlimmster Party-Unfall?",
        "Hast du schon mal jemanden auf einer Party geschlagen?",
        "Was war das Gefährlichste, was du betrunken getan hast?",
        "Hast du schon mal auf einer Party erpresst worden?",
        "Was war dein schlimmster Moment mit der Polizei nach einer Party?",
        "Hast du schon mal eine Party mit Gewalt beendet?",
        "Was war dein schlimmster Moment mit der Polizei nach einer Party?",
        "Hast du schon mal eine Party mit Gewalt beendet?",
        "Was war das Gefährlichste, was du betrunken getan hast?",
        "Hast du schon mal jemanden auf einer Party geschlagen?",
        "Was war dein schlimmster Party-Unfall?",
        "Hast du schon mal eine Orgie erlebt?",
        "Was war das Perverseste, was du betrunken getan hast?",
        "Hast du schon mal nackt auf einer Party getanzt?",
        "Was war dein schlimmster Blackout?",
        "Hast du schon mal jemanden auf einer Party betrogen?",
        "Hast du schon mal auf einer Party etwas Illegales getan?",
        "Was war das Extremste, was du unter Alkoholeinfluss getan hast?",
        "Hast du schon mal auf einer Party jemanden sexuell belästigt?",
        "Was war dein schlimmster Moment der Selbstkontrolle?",
        "Hast du schon mal auf einer Party etwas getan, was du bereust?",
        "Was war das Riskanteste, was du auf einer Party getan hast?",
        "Hast du schon mal auf einer Party jemanden in Gefahr gebracht?",
        "Was war dein schlimmster Moment mit Alkohol?",
        "Hast du schon mal auf einer Party etwas Kriminelles getan?",
        "Was war das Verwerflichste, was du betrunken getan hast?",
      ],
    },
    dares: {
      easy: [
        "Tanze 2 Minuten lang zu deinem Lieblingslied",
        "Singe Karaoke zu einem Lied deiner Wahl",
        "Mache eine Minute lang Party-Moves",
        "Erfinde einen neuen Partytanz",
        "Mache eine Conga-Linie durch den Raum",
        "Singe ein Lied und alle anderen müssen mitsingen",
        "Mache 30 Sekunden lang Luftgitarre",
        "Tanze wie in den 80ern",
        "Mache eine Minute lang Disco-Moves",
        "Singe ein Duett mit jemandem",
        "Mache eine Tanzshow für alle",
        "Erfinde einen Partyruf und bringe ihn allen bei",
        "Tanze zu einem Lied, das du hasst",
        "Mache eine Minute lang Breakdance",
        "Singe ein Lied in einer anderen Sprache",
        "Mache eine Minute lang Salsa-Tanz",
        "Singe ein Lied nur mit Summen",
        "Mache eine Tanzchoreografie zu einem bekannten Lied",
        "Singe ein Lied im Rap-Stil",
        "Mache eine Minute lang Walzer",
        "Erfinde einen Partysong über die Anwesenden",
        "Mache eine Minute lang Tango",
        "Singe ein Kinderlied im Rock-Stil",
        "Mache eine Tanzperformance zu einem Schlager",
        "Singe ein Lied nur mit 'Na na na'",
        "Mache eine Minute lang Hip-Hop-Moves",
        "Erfinde einen Trinkspruch und bringe ihn allen bei",
        "Mache eine Tanzshow im Stil der 70er",
        "Singe ein Lied wie ein Opernsänger",
        "Mache eine Minute lang Swing-Tanz",
      ],
      medium: [
        "Trinke ein Glas Wasser in einem Zug",
        "Mache einen Handstand für 30 Sekunden",
        "Tanze auf einem Stuhl für 1 Minute",
        "Mache eine Minute lang Limbo",
        "Trinke etwas Ekelhaftes (aber Harmloses)",
        "Mache 50 Hampelmänner ohne Pause",
        "Tanze mit verbundenen Augen",
        "Mache eine Minute lang Hula-Hoop (imaginär)",
        "Trinke aus einem Schuh (sauber)",
        "Mache eine Minute lang Salsa",
        "Tanze nur mit deinen Armen",
        "Mache eine Minute lang Moonwalk",
        "Trinke ein Glas Wasser ohne Hände",
        "Tanze wie ein Roboter für 2 Minuten",
        "Mache eine Minute lang Bauchtanz",
        "Trinke 3 Gläser Wasser hintereinander",
        "Mache eine Minute lang Pole Dance (an einer Stange/Pfosten)",
        "Tanze 5 Minuten ohne Pause",
        "Trinke einen Smoothie aus seltsamen Zutaten",
        "Mache eine Minute lang Breakdance-Moves",
        "Tanze zu einem Lied, das jemand anderes auswählt",
        "Trinke ein Glas Wasser mit Zitrone",
        "Mache eine Tanzperformance auf dem Tisch",
        "Trinke etwas Scharfes",
        "Mache eine Minute lang Capoeira-Moves",
        "Tanze mit jemandem sehr eng für 2 Minuten",
        "Trinke ein Glas Wasser mit Salz",
        "Mache eine Tanzshow im Stil der 90er",
        "Trinke einen Energy-Drink in einem Zug",
        "Mache eine Minute lang Flamenco",
      ],
      hard: [
        "Trinke 5 Gläser Wasser hintereinander",
        "Tanze nackt (mit Unterwäsche) für 30 Sekunden",
        "Mache einen Striptease (bis zur Unterwäsche)",
        "Trinke etwas richtig Ekelhaftes",
        "Mache 100 Liegestütze ohne Pause",
        "Tanze auf dem Tisch für 2 Minuten",
        "Mache einen Kopfstand für 1 Minute",
        "Trinke Alkohol (wenn volljährig) bis du angetrunken bist",
        "Mache eine Minute lang Pole Dance (an einer Stange/Pfosten)",
        "Tanze mit jemandem sehr eng für 3 Minuten",
        "Mache einen Lap Dance für jemanden",
        "Trinke aus der Toilette (sauber)",
        "Tanze 10 Minuten ohne Pause",
        "Mache einen erotischen Tanz",
        "Trinke etwas mit Tabasco",
        "Mache einen Striptease für alle",
        "Tanze nackt für 1 Minute (wenn legal und alle einverstanden)",
        "Trinke 10 Shots Wasser hintereinander",
        "Mache eine erotische Tanzshow",
        "Trinke einen Liter Wasser in 5 Minuten",
        "Mache einen Lap Dance für jeden im Raum",
        "Tanze auf dem Tisch nackt (mit Unterwäsche)",
        "Trinke etwas richtig Scharfes",
        "Mache eine Striptease-Show für 5 Minuten",
        "Tanze erotisch mit jemandem für 10 Minuten",
        "Trinke Alkohol bis du richtig betrunken bist",
        "Mache einen Pole Dance nackt (mit Unterwäsche)",
        "Tanze 30 Minuten ohne Pause",
        "Trinke etwas Ekelhaftes aus einem Schuh",
        "Mache eine erotische Performance für alle",
      ],
    },
  },
  {
    id: "social-media",
    name: "Social Media",
    description: "Digitale Herausforderungen und Online-Leben",
    icon: "📱",
    color: "bg-purple-500",
    truths: {
      easy: [
        "Welches ist dein meistbenutztes Emoji?",
        "Wie viele Selfies machst du, bevor du eins postest?",
        "Wie lange warst du schon mal ohne dein Handy?",
        "Was ist dein Lieblings-Social-Media-App?",
        "Wie viele ungelesene Nachrichten hast du gerade?",
        "Welchen Filter benutzt du am liebsten?",
        "Wie oft checkst du dein Handy am Tag?",
        "Was war dein erstes Profilbild?",
        "Welche App nutzt du am meisten?",
        "Wie viele Follower hast du?",
        "Was war dein erster Post?",
        "Welches soziale Netzwerk magst du am liebsten?",
        "Wie viele Apps hast du auf deinem Handy?",
        "Was ist dein Lieblings-Meme?",
        "Welchen Hashtag benutzt du am häufigsten?",
        "Wie viele Stunden verbringst du täglich am Handy?",
        "Welche App hast du zuletzt heruntergeladen?",
        "Was ist dein Lieblings-YouTube-Kanal?",
        "Wie viele ungelesene E-Mails hast du?",
        "Welchen Influencer folgst du heimlich?",
        "Was ist dein Lieblings-TikTok-Trend?",
        "Wie oft postest du Stories?",
        "Was ist dein meistgenutzter Hashtag?",
        "Welche App nutzt du für Fotos?",
        "Wie viele Selfies machst du pro Tag?",
        "Welche Social Media Plattform nutzt du am wenigsten?",
        "Was ist dein Lieblings-Instagram-Filter?",
        "Wie viele Fotos hast du auf deinem Handy?",
        "Welchen YouTuber schaust du am liebsten?",
        "Was ist dein Lieblings-TikTok-Sound?",
        "Wie oft löschst du Posts wieder?",
        "Welche App würdest du nie löschen?",
        "Was ist dein Lieblings-Snapchat-Filter?",
        "Wie viele WhatsApp-Gruppen hast du?",
        "Welchen Podcast hörst du am liebsten?",
      ],
      medium: [
        "Was ist das Peinlichste in deiner Suchhistorie?",
        "Hast du schon mal stundenlang jemandes Social Media gestalkt?",
        "Hast du schon mal etwas gepostet und es sofort bereut?",
        "Was hast du schon mal aus Versehen geliked?",
        "Hast du schon mal jemanden wegen seiner Posts entfreundet?",
        "Welchen peinlichen Kommentar hast du mal geschrieben?",
        "Hast du schon mal ein Fake-Profil erstellt?",
        "Was war dein peinlichster Autocorrect-Fail?",
        "Hast du schon mal gelogen, um online besser auszusehen?",
        "Welchen Post bereust du am meisten?",
        "Hast du schon mal jemanden online gemobbt?",
        "Was war dein schlimmster Social Media Fail?",
        "Hast du schon mal Fotos von anderen ohne Erlaubnis gepostet?",
        "Welche App hast du heimlich installiert?",
        "Hast du schon mal für Likes gelogen?",
        "Was war dein peinlichster Online-Moment?",
        "Hast du schon mal jemanden online blockiert?",
        "Was war dein schlimmster Kommentar, den du geschrieben hast?",
        "Hast du schon mal Screenshots von privaten Chats gemacht?",
        "Was war dein peinlichster Gruppenchat-Moment?",
        "Hast du schon mal jemanden online verfolgt?",
        "Was war dein schlimmster Online-Kauf?",
        "Hast du schon mal eine Dating-App benutzt?",
        "Was war dein peinlichster Moment in einer Video-Konferenz?",
        "Hast du schon mal jemanden online angelogen?",
        "Was war dein schlimmster Moment mit Online-Gaming?",
        "Hast du schon mal einen Online-Streit gehabt?",
        "Was war dein peinlichster Moment beim Online-Shopping?",
        "Hast du schon mal jemanden online erpresst?",
        "Was war dein schlimmster Moment mit Online-Dating?",
      ],
      hard: [
        "Zeige deine peinlichsten gespeicherten Fotos",
        "Lies deine letzten 10 Suchanfragen vor",
        "Zeige deinen Browserverlauf der letzten Woche",
        "Welche App nutzt du heimlich, die niemand wissen soll?",
        "Was ist das Schlimmste, was du online über jemanden gesagt hast?",
        "Zeige deine peinlichsten Nachrichten",
        "Was ist das Schlimmste, was du je gegoogelt hast?",
        "Hast du schon mal Nacktfotos verschickt?",
        "Was ist dein peinlichstes Online-Dating-Erlebnis?",
        "Hast du schon mal jemanden online erpresst?",
        "Was ist das Illegalste, was du online getan hast?",
        "Hast du schon mal Pornos geschaut?",
        "Was ist dein dunkelster Internet-Verlauf?",
        "Hast du schon mal jemanden online betrogen?",
        "Was ist das Perverseste, was du online gemacht hast?",
        "Zeige deine peinlichsten Downloads",
        "Was ist das Schlimmste, was du je online gekauft hast?",
        "Hast du schon mal jemanden online gestalkt?",
        "Was ist dein peinlichstes Online-Video?",
        "Hast du schon mal Online-Pornos produziert?",
        "Was ist das Extremste, was du online getan hast?",
        "Hast du schon mal jemanden online bedroht?",
        "Was ist dein schlimmster Online-Moment?",
        "Hast du schon mal Online-Betrug begangen?",
        "Was ist das Verwerflichste, was du online getan hast?",
        "Zeige deine geheimsten Online-Accounts",
        "Was ist das Illegalste, was du je gedownloaded hast?",
        "Hast du schon mal Online-Drogen gekauft?",
        "Was ist dein dunkelster Online-Moment?",
        "Hast du schon mal jemanden online ruiniert?",
      ],
    },
    dares: {
      easy: [
        "Poste ein Foto ohne Filter",
        "Schicke deiner Mutter eine süße Nachricht",
        "Poste ein Kindheitsfoto",
        "Ändere dein Profilbild zu einem Foto, das die Gruppe auswählt",
        "Schicke einem zufälligen Kontakt ein Meme",
        "Poste einen lustigen Status",
        "Mache ein Selfie mit einer Grimasse",
        "Schicke jemandem ein Kompliment per DM",
        "Poste ein Foto von deinem Essen",
        "Ändere deinen Status zu etwas Lustigem",
        "Schicke einem Freund ein altes Foto von euch",
        "Poste ein Video von dir beim Singen",
        "Mache eine Story mit einem Filter",
        "Schicke jemandem ein GIF",
        "Poste ein Foto deines Haustieres oder Lieblingsgegenstands",
        "Mache ein Selfie mit jemandem aus der Gruppe",
        "Poste ein Foto von deinem Lieblings-Outfit",
        "Schicke jemandem einen lustigen Spruch",
        "Poste ein Video von dir beim Tanzen",
        "Ändere dein Profilbild zu einem Meme",
        "Schicke einem Freund eine Sprachnachricht",
        "Poste ein Foto von deinem Arbeitsplatz",
        "Mache eine Story über dein Lieblings-Hobby",
        "Schicke jemandem ein lustiges Video",
        "Poste ein Foto von deinem Lieblings-Ort",
        "Ändere deinen Status zu einem Zitat",
        "Schicke einem Kontakt eine alte Nachricht nochmal",
        "Poste ein Foto von deinem Lieblings-Buch",
        "Mache eine Story mit deinem Lieblings-Song",
        "Schicke jemandem ein Emoji-Rätsel",
      ],
      medium: [
        "Lasse jemand anderen deinen nächsten Social Media Post schreiben",
        "Schicke eine Sprachnachricht an deinen Schwarm",
        "Gehe 1 Minute live auf Social Media",
        "Poste eine TikTok-Style Tanzvideo",
        "Lasse jemanden 30 Sekunden durch deine Kamerarolle schauen",
        "Poste ein peinliches Video von dir",
        "Schicke deinem Ex eine Nachricht",
        "Poste einen Screenshot deiner letzten Google-Suche",
        "Ändere dein Profilbild zu einem Meme",
        "Poste ein Foto von deinem unaufgeräumten Zimmer",
        "Schicke einem Promi eine Nachricht",
        "Poste deine Spotify-Playlist",
        "Mache eine Story über deine peinlichsten Momente",
        "Schicke einem Lehrer/Professor eine lustige Nachricht",
        "Poste ein Throwback-Foto mit peinlicher Caption",
        "Lasse jemanden deine letzten 10 Fotos sehen",
        "Poste ein Video von dir beim Aufwachen",
        "Schicke allen deinen Kontakten das gleiche Meme",
        "Poste ein Foto von dir beim Sport",
        "Lasse jemanden deine Notizen-App durchsuchen",
        "Poste ein Video von dir beim Kochen",
        "Schicke einem zufälligen Kontakt eine Liebeserklärung",
        "Poste ein Foto von dir ohne Make-up",
        "Lasse jemanden deine Voice-Memos anhören",
        "Poste ein Video von dir beim Putzen",
        "Schicke deinen Eltern ein peinliches Meme",
        "Poste ein Foto von deinem Kühlschrank-Inhalt",
        "Lasse jemanden deine Kamera-App für 5 Minuten kontrollieren",
        "Poste ein Video von dir beim Zähneputzen",
        "Schicke einem Arbeitskollegen ein lustiges GIF",
      ],
      hard: [
        "Poste deine Handynummer für 10 Minuten öffentlich",
        "Rufe einen Ex an und entschuldige dich",
        "Lasse jemanden eine Woche lang deine Social Media Accounts verwalten",
        "Schicke deinem Chef eine lustige Nachricht",
        "Poste ein Nacktfoto (zensiert/künstlerisch)",
        "Rufe deine Eltern an und gestehe eine Lüge",
        "Poste deinen kompletten Chat-Verlauf mit jemandem",
        "Schicke allen deinen Kontakten eine peinliche Nachricht",
        "Lasse jemanden deinen Browser-Verlauf sehen",
        "Poste ein Video von dir beim Weinen",
        "Schicke einem Fremden eine Liebeserklärung",
        "Poste alle deine gespeicherten Fotos",
        "Lasse jemanden alle deine Apps sehen",
        "Poste ein Video von dir auf der Toilette (angezogen)",
        "Schicke deinen Eltern deine Suchhistorie",
        "Poste ein Nacktfoto von dir (künstlerisch zensiert)",
        "Lasse jemanden deine geheimsten Chats lesen",
        "Poste ein Video von dir beim Masturbieren (zensiert)",
        "Schicke allen deinen Kontakten ein Nacktfoto",
        "Lasse jemanden deine Pornos-Sammlung sehen",
        "Poste deine peinlichsten Nachrichten öffentlich",
        "Schicke deinem Chef ein Nacktfoto",
        "Lasse jemanden deine Dating-App-Chats lesen",
        "Poste ein Video von dir beim Sex (zensiert)",
        "Schicke deinen Eltern deine Pornos-Sammlung",
        "Lasse jemanden deine geheimsten Fotos sehen",
        "Poste deine Kreditkarten-Daten (nur die letzten 4 Ziffern)",
        "Schicke einem Fremden deine Adresse",
        "Lasse jemanden deine Bank-App sehen",
        "Poste ein Video von dir nackt (zensiert)",
      ],
    },
  },
  {
    id: "extreme",
    name: "Extrem",
    description: "Mutige und waghalsige Herausforderungen",
    icon: "🔥",
    color: "bg-red-500",
    truths: {
      easy: [
        "Was ist das Mutigste, was du je getan hast?",
        "Welche Extremsportart würdest du gerne ausprobieren?",
        "Was ist deine größte Angst?",
        "Hast du schon mal etwas Gefährliches getan?",
        "Was würdest du für 1 Million Euro tun?",
        "Welches Risiko würdest du gerne eingehen?",
        "Was ist das Verrückteste auf deiner Bucket List?",
        "Hast du schon mal eine Mutprobe gemacht?",
        "Was ist das Adrenalinreichste, was du erlebt hast?",
        "Welche Grenze würdest du niemals überschreiten?",
        "Was ist das Spontanste, was du je getan hast?",
        "Hast du schon mal etwas Verbotenes getan?",
        "Was würdest du tun, wenn du nur noch einen Tag zu leben hättest?",
        "Welches Abenteuer würdest du gerne erleben?",
        "Was ist das Gefährlichste, was du dir vorstellen kannst?",
        "Welche Extremsportart macht dir am meisten Angst?",
        "Was ist das Riskanteste, was du je getan hast?",
        "Welche Mutprobe würdest du niemals machen?",
        "Was ist das Verrückteste, was du für Geld getan hast?",
        "Welches Risiko bereust du, nicht eingegangen zu sein?",
        "Was ist das Gefährlichste, was du als Kind getan hast?",
        "Welche Extremsituation hast du schon mal erlebt?",
        "Was ist das Mutigste, was du für jemand anderen getan hast?",
        "Welche Angst hast du schon mal überwunden?",
        "Was ist das Extremste, was du dir vorstellen könntest zu tun?",
        "Welches Risiko würdest du für die Liebe eingehen?",
        "Was ist das Gefährlichste, was du je gesehen hast?",
        "Welche Extremsportart hast du schon mal ausprobiert?",
        "Was ist das Riskanteste, was du je gesagt hast?",
        "Welche Mutprobe hast du schon mal abgelehnt?",
      ],
      medium: [
        "Hast du schon mal etwas Illegales getan?",
        "Was war dein gefährlichster Moment?",
        "Hast du schon mal Drogen ausprobiert?",
        "Was war dein schlimmster Unfall?",
        "Hast du schon mal jemanden körperlich verletzt?",
        "Was war das Riskanteste, was du für Liebe getan hast?",
        "Hast du schon mal mit dem Tod gespielt?",
        "Was war dein wildester Moment?",
        "Hast du schon mal etwas gestohlen?",
        "Was war dein gefährlichstes Date?",
        "Hast du schon mal jemanden bedroht?",
        "Was war dein schlimmster Moment mit der Polizei?",
        "Hast du schon mal einen Unfall verursacht?",
        "Was war das Extremste, was du für Geld getan hast?",
        "Hast du schon mal jemanden erpresst?",
        "Was war das Riskanteste, was du unter Alkoholeinfluss getan hast?",
        "Hast du schon mal etwas Gefährliches gefahren?",
        "Was war dein schlimmster Moment der Selbstgefährdung?",
        "Hast du schon mal jemanden in Gefahr gebracht?",
        "Was war das Extremste, was du aus Wut getan hast?",
        "Hast du schon mal etwas Verbotenes gekauft?",
        "Was war dein gefährlichster Moment beim Sport?",
        "Hast du schon mal jemanden geschlagen?",
        "Was war das Riskanteste, was du je gefahren bist?",
        "Hast du schon mal etwas Gefährliches gebaut?",
        "Was war dein schlimmster Moment mit Feuer?",
        "Hast du schon mal etwas Explosives gemacht?",
        "Was war das Extremste, was du je geklettert bist?",
        "Hast du schon mal etwas Gefährliches gegessen?",
        "Was war dein riskantester Moment im Wasser?",
      ],
      hard: [
        "Was ist das Illegalste, was du je getan hast?",
        "Hast du schon mal jemanden schwer verletzt?",
        "Was war dein gefährlichster Moment mit Drogen?",
        "Hast du schon mal einen Unfall verursacht und bist abgehauen?",
        "Was ist das Riskanteste, was du für Sex getan hast?",
        "Hast du schon mal jemanden ernsthaft bedroht?",
        "Was war dein schlimmster Moment im Gefängnis?",
        "Hast du schon mal Gewalt angewendet?",
        "Was ist das Extremste, was du unter Drogen getan hast?",
        "Hast du schon mal jemanden in Lebensgefahr gebracht?",
        "Was war dein gefährlichster sexueller Moment?",
        "Hast du schon mal mit Waffen gespielt?",
        "Was ist das Verrückteste, was du auf Drogen getan hast?",
        "Hast du schon mal jemanden schwer enttäuscht durch riskantes Verhalten?",
        "Was war dein schlimmster Moment der Selbstgefährdung?",
        "Hast du schon mal jemanden fast getötet?",
        "Was ist das Extremste, was du je gestohlen hast?",
        "Hast du schon mal jemanden sexuell genötigt?",
        "Was war dein gefährlichster Moment mit Alkohol?",
        "Hast du schon mal jemanden schwer betrogen?",
        "Was ist das Illegalste, was du je verkauft hast?",
        "Hast du schon mal jemanden erpresst oder bedroht?",
        "Was war dein schlimmster Moment mit Gewalt?",
        "Hast du schon mal jemanden absichtlich verletzt?",
        "Was ist das Extremste, was du je für Rache getan hast?",
        "Hast du schon mal jemanden in den Ruin getrieben?",
        "Was war dein gefährlichster krimineller Moment?",
        "Hast du schon mal jemanden schwer traumatisiert?",
        "Was ist das Verwerflichste, was du je getan hast?",
        "Hast du schon mal jemanden das Leben zerstört?",
      ],
    },
    dares: {
      easy: [
        "Mache 50 Liegestütze ohne Pause",
        "Halte eine Planke für 2 Minuten",
        "Mache 100 Hampelmänner",
        "Springe 200 Mal auf der Stelle",
        "Mache einen Handstand für 1 Minute",
        "Laufe 5 Minuten ohne Pause",
        "Mache 30 Burpees",
        "Halte dich 1 Minute an einer Stange",
        "Mache 200 Sit-ups",
        "Springe 10 Minuten Seil",
        "Mache 50 Kniebeugen",
        "Laufe rückwärts 1 km",
        "Mache 20 Klimmzüge",
        "Halte einen Handstand für 3 Minuten",
        "Mache 500 Hampelmänner",
        "Laufe 10 Minuten ohne Pause",
        "Mache 100 Liegestütze ohne Pause",
        "Halte eine Planke für 5 Minuten",
        "Mache 50 Burpees ohne Pause",
        "Springe 500 Mal auf der Stelle",
        "Mache 100 Kniebeugen ohne Pause",
        "Laufe 2 km ohne Pause",
        "Mache 30 Klimmzüge ohne Pause",
        "Halte einen Handstand für 5 Minuten",
        "Mache 1000 Hampelmänner",
        "Springe 15 Minuten Seil",
        "Mache 1000 Sit-ups",
        "Laufe rückwärts 2 km",
        "Mache 50 Klimmzüge",
        "Halte einen Handstand für 10 Minuten",
      ],
      medium: [
        "Trinke 2 Liter Wasser in 10 Minuten",
        "Esse eine ganze Zwiebel",
        "Trinke ein Glas Essig",
        "Esse einen Löffel Senf",
        "Mache eine kalte Dusche für 5 Minuten",
        "Esse etwas richtig Scharfes",
        "Trinke etwas Ekelhaftes",
        "Lasse dir Eiswürfel auf den Rücken legen",
        "Esse Hundefutter",
        "Trinke saure Milch",
        "Esse rohen Knoblauch",
        "Trinke Salzwasser",
        "Esse eine Zitrone mit Schale",
        "Trinke heißes Wasser mit Chili",
        "Esse etwas Verschimmeltes (harmloses)",
        "Trinke 3 Liter Wasser in 15 Minuten",
        "Esse eine rohe Kartoffel",
        "Trinke ein Glas Zitronensaft",
        "Esse einen Löffel Zimt",
        "Mache eine Eisdusche für 10 Minuten",
        "Esse etwas extrem Scharfes",
        "Trinke etwas richtig Ekelhaftes mit Chili",
        "Lasse dir Eiswürfel auf den Bauch legen",
        "Esse Katzenfutter",
        "Trinke verdorbene Milch",
        "Esse rohen Ingwer",
        "Trinke Meerwasser",
        "Esse eine Limette mit Schale",
        "Trinke kochend heißes Wasser",
        "Esse etwas stark Verschimmeltes (harmloses)",
      ],
      hard: [
        "Springe von etwas Hohem (sicher!)",
        "Gehe nackt nach draußen für 1 Minute (wenn legal)",
        "Trinke Alkohol bis du betrunken bist (wenn volljährig)",
        "Mache etwas richtig Gefährliches (aber nicht lebensbedrohlich)",
        "Springe ins eiskalte Wasser",
        "Klettere irgendwo sehr hoch",
        "Mache etwas Illegales (aber Harmloses)",
        "Fahre ohne Hände Fahrrad",
        "Springe Bungee (wenn möglich)",
        "Gehe Fallschirmspringen (wenn möglich)",
        "Klettere eine Felswand",
        "Springe von einer Klippe ins Wasser",
        "Fahre Achterbahn mit geschlossenen Augen",
        "Mache eine extreme Mutprobe",
        "Tue etwas, was dir richtig Angst macht",
        "Springe von einem Hausdach (sicher!)",
        "Gehe nackt durch die Stadt (wenn legal)",
        "Trinke Alkohol bis zum Blackout (wenn volljährig)",
        "Mache etwas Lebensgefährliches (aber überlebe)",
        "Springe in einen See im Winter",
        "Klettere einen Wolkenkratzer",
        "Mache etwas Schwerverbrecherisches (aber harmlos)",
        "Fahre ohne Bremsen Auto",
        "Springe mit einem Fallschirm ohne Lehrer",
        "Gehe Base-Jumping (wenn möglich)",
        "Klettere einen Eisberg",
        "Springe von einer sehr hohen Klippe ins Wasser",
        "Fahre Achterbahn rückwärts",
        "Mache eine todesmutige Mutprobe",
        "Tue etwas, was dich fast umbringt",
      ],
    },
  },
  {
    id: "funny",
    name: "Lustig",
    description: "Verrückte und alberne Herausforderungen",
    icon: "😂",
    color: "bg-yellow-500",
    truths: {
      easy: [
        "Was ist das Lustigste, was dir je passiert ist?",
        "Welchen dummen Spitznamen hattest du als Kind?",
        "Was ist dein peinlichstes Kindheitsfoto?",
        "Welche seltsamste Angewohnheit hast du?",
        "Was ist das Dümmste, was du je gesagt hast?",
        "Welchen verrückten Traum hattest du letzte Nacht?",
        "Was ist das Seltsamste, was du je gegessen hast?",
        "Welche komische Phobie hast du?",
        "Was ist dein schlechtester Witz?",
        "Welche lustige Ausrede hast du schon mal benutzt?",
        "Was ist das Peinlichste, was du in der Öffentlichkeit getan hast?",
        "Welchen verrückten Tanz kannst du?",
        "Was ist das Seltsamste, was du gesammelt hast?",
        "Welche komische Gewohnheit hast du beim Schlafen?",
        "Was ist das Lustigste, was du je gehört hast?",
        "Welchen dummen Fehler hast du schon mal gemacht?",
        "Was ist dein peinlichster Moment im Restaurant?",
        "Welchen seltsamen Tick hast du?",
        "Was ist das Dümmste, was du je gekauft hast?",
        "Welchen verrückten Film hast du zuletzt gesehen?",
        "Was ist das Seltsamste, was du je angezogen hast?",
        "Welche komische Angewohnheit hast du beim Essen?",
        "Was ist dein schlechtester Flirtversuch gewesen?",
        "Welche lustige Lüge hast du schon mal erzählt?",
        "Was ist das Peinlichste, was du je geträumt hast?",
        "Welchen verrückten Sport hast du schon mal ausprobiert?",
        "Was ist das Seltsamste, was du je im Internet gefunden hast?",
        "Welche komische Tradition hast du in deiner Familie?",
        "Was ist dein schlechtester Ratschlag gewesen?",
        "Welche lustige Geschichte hast du mit Tieren erlebt?",
      ],
      medium: [
        "Hast du schon mal in der Öffentlichkeit gefurzt und so getan, als wärst du es nicht?",
        "Was ist das Peinlichste, was du beim Arzt erlebt hast?",
        "Hast du schon mal mit Essen gespielt?",
        "Was ist das Dümmste, was du betrunken gemacht hast?",
        "Hast du schon mal in die Hose gemacht als Erwachsener?",
        "Was ist das Seltsamste, was du je gegoogelt hast?",
        "Hast du schon mal mit einem Stofftier geschlafen?",
        "Was ist dein peinlichster Moment beim Essen?",
        "Hast du schon mal nackt geschlafen?",
        "Was ist das Verrückteste, was du je gekauft hast?",
        "Hast du schon mal in der Nase gebohrt und es gegessen?",
        "Was ist dein peinlichster Moment in der Schule?",
        "Hast du schon mal einen imaginären Freund gehabt?",
        "Was ist das Seltsamste, was du je geträumt hast?",
        "Hast du schon mal Windeln als Erwachsener getragen?",
        "Hast du schon mal jemanden mit einem falschen Namen angesprochen?",
        "Was ist dein peinlichster Moment beim Sport?",
        "Hast du schon mal etwas Dummes im Schlaf gemacht?",
        "Was ist das Verrückteste, was du je im Urlaub erlebt hast?",
        "Hast du schon mal etwas Seltsames im Supermarkt gemacht?",
        "Was ist dein peinlichster Moment beim Date?",
        "Hast du schon mal etwas Dummes im Job gemacht?",
        "Was ist das Verrückteste, was du je im Auto gemacht hast?",
        "Hast du schon mal etwas Seltsames im Kino gemacht?",
        "Was ist dein peinlichster Moment beim Tanzen?",
        "Hast du schon mal etwas Dummes beim Kochen gemacht?",
        "Was ist das Verrückteste, was du je im Flugzeug erlebt hast?",
        "Hast du schon mal etwas Seltsames im Bus gemacht?",
        "Was ist dein peinlichster Moment beim Einkaufen?",
        "Hast du schon mal etwas Dummes beim Trinken gemacht?",
      ],
      hard: [
        "Was ist das Peinlichste, was deine Eltern über dich wissen?",
        "Hast du schon mal in der Öffentlichkeit in die Hose gemacht?",
        "Was ist deine peinlichste sexuelle Fantasie?",
        "Hast du schon mal beim Masturbieren erwischt worden?",
        "Was ist das Ekelhafteste, was du je gegessen hast?",
        "Hast du schon mal nackt vor anderen gestanden?",
        "Was ist dein peinlichstes sexuelles Missgeschick?",
        "Hast du schon mal ins Bett gemacht als Erwachsener?",
        "Was ist das Seltsamste, womit du dich schon mal befriedigt hast?",
        "Hast du schon mal Unterwäsche mehrere Tage getragen?",
        "Was ist dein peinlichster Körpergeruch?",
        "Hast du schon mal heimlich jemanden beim Umziehen beobachtet?",
        "Was ist das Ekelhafteste an deinem Körper?",
        "Hast du schon mal in einen Gegenstand uriniert?",
        "Was ist das Peinlichste, was du beim Sex gesagt hast?",
        "Hast du schon mal etwas Peinliches mit deinem Haustier gemacht?",
        "Was ist dein peinlichster Moment mit deiner Familie?",
        "Hast du schon mal etwas Ekelhaftes im Restaurant gemacht?",
        "Was ist dein peinlichster Moment mit deinen Freunden?",
        "Hast du schon mal etwas Seltsames mit deinem Partner gemacht?",
        "Was ist dein peinlichster Moment mit deinen Arbeitskollegen?",
        "Hast du schon mal etwas Dummes mit deinem Chef gemacht?",
        "Was ist dein peinlichster Moment mit Fremden?",
        "Hast du schon mal etwas Verrücktes mit deinem Auto gemacht?",
        "Was ist dein peinlichster Moment mit deinen Nachbarn?",
        "Hast du schon mal etwas Seltsames mit deinen Eltern gemacht?",
        "Was ist dein peinlichster Moment mit deinen Geschwistern?",
        "Hast du schon mal etwas Dummes mit deinen Kindern gemacht?",
        "Was ist dein peinlichster Moment mit deinen Großeltern?",
        "Hast du schon mal etwas Verrücktes mit deinen Enkeln gemacht?",
      ],
    },
    dares: {
      easy: [
        "Mache 1 Minute lang Tiergeräusche",
        "Tue so, als wärst du ein Baby",
        "Imitiere einen berühmten Politiker",
        "Mache den Chicken Dance",
        "Sprich wie Donald Duck für 5 Minuten",
        "Tue so, als wärst du betrunken",
        "Mache eine Minute lang Affengeräusche",
        "Imitiere einen Dinosaurier",
        "Tue so, als wärst du ein Roboter",
        "Mache Geräusche wie ein Traktor",
        "Imitiere einen Opernsänger",
        "Tue so, als würdest du fliegen",
        "Mache eine Minute lang Vogelgeräusche",
        "Imitiere einen Affen",
        "Tue so, als wärst du ein Superheld",
        "Imitiere ein Tier deiner Wahl",
        "Tue so, als wärst du ein Alien",
        "Mache Geräusche wie ein Auto",
        "Imitiere einen Nachrichtensprecher",
        "Tue so, als wärst du ein Geist",
        "Imitiere einen Superhelden",
        "Tue so, als wärst du ein Zombie",
        "Imitiere einen Piraten",
        "Tue so, als wärst du ein Ninja",
        "Imitiere einen Cowboy",
        "Tue so, als wärst du ein Indianer",
        "Imitiere einen Eskimo",
        "Tue so, als wärst du ein Samurai",
        "Imitiere einen Ritter",
        "Tue so, als wärst du ein Wikinger",
      ],
      medium: [
        "Trage deine Kleidung verkehrt herum für 30 Minuten",
        "Rede wie ein Pirat für 15 Minuten",
        "Mache eine Modenschau mit Klopapier",
        "Tue so, als wärst du ein Mime in einer Box",
        "Sprich nur in Fragen für 10 Minuten",
        "Mache eine Präsentation über Socken",
        "Imitiere ein weinendes Baby für 2 Minuten",
        "Laufe wie eine Krabbe durch den Raum",
        "Sprich wie ein Roboter für 15 Minuten",
        "Mache eine Modenschau mit Handtüchern",
        "Tue so, als wärst du ein Zombie",
        "Mache eine Minute lang Breakdance",
        "Imitiere einen Nachrichtensprecher",
        "Mache eine Minute lang Karate-Bewegungen",
        "Tue so, als wärst du ein Mime",
        "Trage deine Schuhe auf den Händen für 10 Minuten",
        "Rede wie ein Alien für 5 Minuten",
        "Mache eine Modenschau mit Müllsäcken",
        "Tue so, als wärst du ein Superheld im Kampf",
        "Sprich nur in Reimen für 5 Minuten",
        "Mache eine Präsentation über Toilettenpapier",
        "Imitiere einen betrunkenen Piraten für 3 Minuten",
        "Laufe wie ein Pinguin durch den Raum",
        "Sprich wie ein Roboter mit Gefühlen für 10 Minuten",
        "Mache eine Modenschau mit Zeitungen",
        "Tue so, als wärst du ein Ninja im Versteck",
        "Sprich nur in Zitaten für 5 Minuten",
        "Mache eine Präsentation über Unterwäsche",
        "Imitiere einen weinenden Zombie für 3 Minuten",
        "Laufe wie ein Gorilla durch den Raum",
      ],
      hard: [
        "Lasse jemanden dein Gesicht mit Lebensmitteln bemalen",
        "Esse etwas Ekelhaftes, das die Gruppe aussucht",
        "Trage nur Unterwäsche für 1 Stunde",
        "Lasse dir die Augen verbinden und esse etwas Unbekanntes",
        "Trinke einen Smoothie aus seltsamen Zutaten",
        "Lasse jemanden deine Haare verrückt stylen",
        "Esse eine rohe Zwiebel",
        "Lasse dir Klebeband über den Mund kleben für 30 Minuten",
        "Lasse jemanden dich kitzeln für 2 Minuten",
        "Trinke ein Glas Wasser mit Salz",
        "Lasse dir die Nase zuhalten während du 10 Minuten sprichst",
        "Esse einen Löffel Senf",
        "Mache 30 Minuten lang alles mit der schwächeren Hand",
        "Lasse jemanden dich wie ein Baby behandeln für 1 Stunde",
        "Trage einen Tag lang einen Schnuller",
        "Lasse jemanden dein Gesicht mit Farbe bemalen",
        "Esse etwas sehr Scharfes, das die Gruppe aussucht",
        "Trage nur Socken für 1 Stunde",
        "Lasse dir die Haare von jemandem schneiden",
        "Trinke einen Smoothie aus sehr seltsamen Zutaten",
        "Lasse jemanden deine Augenbrauen zupfen",
        "Esse eine rohe Knoblauchzehe",
        "Lasse dir die Haare von jemandem färben",
        "Trinke ein Glas Wasser mit Essig",
        "Lasse jemanden dich wie ein Tier behandeln für 1 Stunde",
        "Trage einen Tag lang eine Windel",
        "Lasse jemanden dein Gesicht mit Make-up bemalen",
        "Esse etwas sehr Bitteres, das die Gruppe aussucht",
        "Trage nur einen Hut für 1 Stunde",
      ],
    },
  },
  {
    id: "intimate",
    name: "Intim",
    description: "Persönliche und intime Herausforderungen",
    icon: "💕",
    color: "bg-rose-500",
    truths: {
      easy: [
        "Was findest du am attraktivsten an einer Person?",
        "Wie war dein erster Kuss?",
        "Was ist dein romantischstes Date-Erlebnis?",
        "Welche Eigenschaften suchst du bei einem Partner?",
        "Was ist deine Lieblings-Liebesszene in einem Film?",
        "Wie stellst du dir die perfekte Beziehung vor?",
        "Was ist das Romantischste, was jemand für dich getan hat?",
        "Welche Rolle spielt körperliche Anziehung für dich?",
        "Was ist dein Lieblings-Liebesfilm?",
        "Wie wichtig ist dir Romantik in einer Beziehung?",
        "Was ist dein Lieblings-Liebeslied?",
        "Welche romantische Geste würdest du gerne erleben?",
        "Was ist dein Traumhochzeitsort?",
        "Wie stellst du dir den perfekten Partner vor?",
        "Was ist das Süßeste, was dir jemand je gesagt hat?",
        "Was ist dein Lieblings-Körperteil?",
        "Wie wichtig ist dir Ehrlichkeit in einer Beziehung?",
        "Was ist dein Lieblings-Kompliment?",
        "Wie stellst du dir die perfekte Familie vor?",
        "Was ist dein Lieblings-Geschenk?",
        "Wie wichtig ist dir Vertrauen in einer Beziehung?",
        "Was ist dein Lieblings-Date-Ort?",
        "Wie stellst du dir die perfekte Ehe vor?",
        "Was ist dein Lieblings-Liebesbrief?",
        "Wie wichtig ist dir Humor in einer Beziehung?",
        "Was ist dein Lieblings-Kuscheltier?",
        "Wie stellst du dir die perfekte Freundschaft vor?",
        "Was ist dein Lieblings-Liebeszitat?",
        "Wie wichtig ist dir Kommunikation in einer Beziehung?",
        "Was ist dein Lieblings-Liebesgedicht?",
      ],
      medium: [
        "Was ist deine größte sexuelle Fantasie?",
        "Hast du schon mal einen One-Night-Stand gehabt?",
        "Was ist das Intimste, was du je mit jemandem geteilt hast?",
        "Welche Körperstelle findest du am erotischsten?",
        "Hast du schon mal Sexting betrieben?",
        "Was ist dein größter Turn-On?",
        "Hast du schon mal Pornos geschaut?",
        "Was ist das Wildeste, was du im Bett gemacht hast?",
        "Welche sexuelle Erfahrung möchtest du noch machen?",
        "Hast du schon mal masturbiert?",
        "Was ist deine Lieblings-Sexstellung?",
        "Hast du schon mal einen Dreier gehabt?",
        "Was ist das Verrückteste, was du für Sex getan hast?",
        "Welche Fetische hast du?",
        "Hast du schon mal Sex in der Öffentlichkeit gehabt?",
        "Was ist dein peinlichstes sexuelles Erlebnis?",
        "Wie wichtig ist dir Zärtlichkeit beim Sex?",
        "Was ist dein Lieblings-Vorspiel?",
        "Wie stellst du dir den perfekten Sex vor?",
        "Was ist dein Lieblings-Sexspielzeug?",
        "Wie wichtig ist dir Romantik beim Sex?",
        "Was ist dein Lieblings-Kondom?",
        "Wie stellst du dir die perfekte sexuelle Beziehung vor?",
        "Was ist dein Lieblings-Sexfilm?",
        "Wie wichtig ist dir Abwechslung beim Sex?",
        "Was ist dein Lieblings-Massageöl?",
        "Wie stellst du dir die perfekte sexuelle Fantasie vor?",
        "Was ist dein Lieblings-Sexgeräusch?",
        "Wie wichtig ist dir Hygiene beim Sex?",
        "Was ist dein Lieblings-Sexduft?",
      ],
      hard: [
        "Was ist deine perverseste Fantasie?",
        "Hast du schon mal fremdgegangen?",
        "Was ist das Extremste, was du sexuell gemacht hast?",
        "Hast du schon mal Sex mit jemandem des gleichen Geschlechts gehabt?",
        "Was ist dein dunkelster sexueller Wunsch?",
        "Hast du schon mal für Sex bezahlt?",
        "Was ist das Illegalste, was du sexuell getan hast?",
        "Hast du schon mal eine Orgie erlebt?",
        "Was ist dein schlimmstes sexuelles Erlebnis?",
        "Hast du schon mal jemanden sexuell belästigt?",
        "Was ist das Perverseste, was du dir vorstellen kannst?",
        "Hast du schon mal Sex unter Drogen gehabt?",
        "Was ist deine schlimmste sexuelle Erfahrung?",
        "Hast du schon mal jemanden zum Sex gedrängt?",
        "Was ist das Gefährlichste, was du für Sex getan hast?",
        "Was ist dein peinlichster sexueller Unfall?",
        "Wie wichtig ist dir Dominanz beim Sex?",
        "Was ist dein Lieblings-SM-Spielzeug?",
        "Wie stellst du dir den perfekten Sadomaso-Sex vor?",
        "Was ist dein Lieblings-Sexsklave?",
        "Wie wichtig ist dir Unterwerfung beim Sex?",
        "Was ist dein Lieblings-Fessel?",
        "Wie stellst du dir die perfekte BDSM-Beziehung vor?",
        "Was ist dein Lieblings-Schmerzmittel?",
        "Wie wichtig ist dir Kontrolle beim Sex?",
        "Was ist dein Lieblings-Peitsche?",
        "Wie stellst du dir die perfekte sexuelle Erniedrigung vor?",
        "Was ist dein Lieblings-Knebel?",
        "Wie wichtig ist dir Respekt beim Sex?",
        "Was ist dein Lieblings-Sexvertrag?",
      ],
    },
    dares: {
      easy: [
        "Mache jemandem ein romantisches Kompliment",
        "Erzähle von deinem Traumdate",
        "Singe ein Liebeslied",
        "Schreibe ein Liebesgedicht",
        "Beschreibe deinen Traumpartner",
        "Mache eine romantische Geste",
        "Erzähle deine romantischste Fantasie",
        "Beschreibe den perfekten Kuss",
        "Mache jemandem eine Liebeserklärung (als Scherz)",
        "Tanze romantisch alleine",
        "Erzähle dein romantischstes Erlebnis",
        "Beschreibe deine Traumhochzeit",
        "Mache eine romantische Pose",
        "Erzähle von deinem ersten Schwarm",
        "Beschreibe deine Lieblings-Liebesszene",
        "Mache jemandem eine zärtliche Berührung",
        "Erzähle von deinem ersten Date",
        "Singe ein romantisches Lied für jemanden",
        "Schreibe einen Liebesbrief an jemanden",
        "Beschreibe deinen idealen Partner",
        "Mache eine romantische Überraschung",
        "Erzähle deine romantischste Erinnerung",
        "Beschreibe deine Traumreise",
        "Mache eine romantische Geste für jemanden",
        "Erzähle von deinem ersten Freund/Freundin",
        "Beschreibe deine Lieblings-Liebesgeschichte",
        "Mache jemandem ein süßes Geschenk",
        "Erzähle von deinem ersten Valentinstag",
        "Singe ein romantisches Lied unter der Dusche",
        "Schreibe ein Liebesgedicht auf eine Serviette",
      ],
      medium: [
        "Gib jemandem eine sinnliche Massage",
        "Flirte intensiv mit jemandem für 5 Minuten",
        "Tanze erotisch für 2 Minuten",
        "Mache einen verführerischen Blick",
        "Erzähle deine wildeste Fantasie",
        "Mache eine verführerische Pose",
        "Küsse jemanden leidenschaftlich auf die Wange",
        "Flüstere jemandem etwas Erotisches ins Ohr",
        "Mache einen sinnlichen Tanz",
        "Berühre jemanden zärtlich",
        "Mache verführerische Geräusche",
        "Erzähle von deinem besten sexuellen Erlebnis",
        "Mache eine erotische Pose",
        "Beschreibe deine Lieblings-Sexstellung",
        "Mache einen Lap Dance (angedeutet)",
        "Gib jemandem eine erotische Massage auf dem Rücken",
        "Flirte intensiv mit jemandem über Textnachrichten",
        "Tanze erotisch mit einem Stuhl",
        "Mache einen verführerischen Blick in den Spiegel",
        "Erzähle deine wildeste sexuelle Fantasie",
        "Mache eine erotische Pose für ein Foto",
        "Küsse jemanden leidenschaftlich auf die Hand",
        "Flüstere jemandem etwas Schmutziges ins Ohr",
        "Mache einen sinnlichen Tanz für jemanden",
        "Berühre jemanden an einer erogenen Zone",
        "Mache verführerische Geräusche beim Essen",
        "Erzähle von deinem ersten Mal",
        "Mache eine erotische Pose im Schlafzimmer",
        "Beschreibe deine Lieblings-Sexfantasie",
        "Mache einen Lap Dance für jemanden (angezogen)",
      ],
      hard: [
        "Küsse jemanden leidenschaftlich auf die Lippen",
        "Mache einen Striptease (bis zur Unterwäsche)",
        "Gib jemandem eine erotische Massage",
        "Mache einen echten Lap Dance",
        "Verbring 10 Minuten in einem dunklen Raum mit jemandem",
        "Küsse jemanden am Hals",
        "Mache etwas sehr Intimes mit jemandem",
        "Berühre jemanden an einer intimen Stelle (mit Einverständnis)",
        "Mache einen sehr erotischen Tanz",
        "Küsse jemanden überall außer auf die Lippen",
        "Mache etwas Sexuelles (aber nicht Sex)",
        "Ziehe dich bis auf die Unterwäsche aus",
        "Mache 7 Minuten im Himmel mit jemandem",
        "Berühre dich selbst vor anderen",
        "Mache etwas sehr Gewagtes mit jemandem",
        "Küsse jemanden leidenschaftlich auf den Mund",
        "Mache einen Striptease für jemanden (bis zur Unterwäsche)",
        "Gib jemandem eine erotische Ganzkörpermassage",
        "Mache einen echten Lap Dance für jemanden",
        "Verbring 30 Minuten in einem dunklen Raum mit jemandem",
        "Küsse jemanden überall am Körper",
        "Mache etwas sehr Intimes mit jemandem (mit Einverständnis)",
        "Berühre jemanden an allen intimen Stellen (mit Einverständnis)",
        "Mache einen sehr erotischen Tanz für jemanden",
        "Küsse jemanden überall außer auf die Genitalien",
        "Mache etwas Sexuelles (aber kein Geschlechtsverkehr)",
        "Ziehe dich komplett aus",
        "Mache 15 Minuten im Himmel mit jemandem",
        "Berühre dich selbst vor allen anderen",
        "Mache etwas sehr Gewagtes mit jemandem (mit Einverständnis)",
      ],
    },
    romanticDares: {
      easy: [
        "Halte jemandes Hand für 5 Minuten",
        "Schaue jemandem tief in die Augen",
        "Gib jemandem eine zärtliche Umarmung",
        "Flüstere jemandem etwas Süßes ins Ohr",
        "Tanze langsam mit jemandem",
        "Schenke jemandem ein Lächeln",
        "Gib jemandem ein Kompliment",
        "Sende jemandem eine liebevolle Nachricht",
        "Singe jemandem ein Liebeslied",
        "Lies jemandem ein Gedicht vor",
        "Mache jemandem ein kleines Geschenk",
        "Zeichne jemandem ein Bild",
        "Schreibe jemandem einen Brief",
        "Koche jemandem ein Essen",
        "Backe jemandem einen Kuchen",
      ],
      medium: [
        "Küsse jemanden sanft auf die Stirn",
        "Gib jemandem eine romantische Massage",
        "Kuschle 10 Minuten mit jemandem",
        "Küsse jemandes Hand",
        "Mache mit jemandem einen romantischen Spaziergang",
        "Schenke jemandem eine Blume",
        "Gib jemandem eine Umarmung von hinten",
        "Sende jemandem ein Kuss-Emoji",
        "Singe jemandem ein Liebeslied am Telefon",
        "Lies jemandem ein Gedicht am Telefon vor",
        "Mache jemandem ein selbstgemachtes Geschenk",
        "Zeichne jemandem ein Herz",
        "Schreibe jemandem einen Liebesbrief",
        "Koche jemandem ein romantisches Abendessen",
        "Backe jemandem einen Kuchen mit Herz",
      ],
      hard: [
        "Küsse jemanden leidenschaftlich",
        "Verbring eine halbe Stunde kuschelnd mit jemandem",
        "Mache mit jemandem ein romantisches Bad (angezogen)",
        "Schlafe eine Nacht neben jemandem (nur kuscheln)",
        "Mache mit jemandem alles, was Paare machen (außer Sex)",
        "Küsse jemanden auf den Mund",
        "Gib jemandem eine Ganzkörpermassage",
        "Verbring eine ganze Nacht kuschelnd mit jemandem",
        "Mache mit jemandem ein romantisches Bad (nackt)",
        "Schlafe eine Nacht mit jemandem (mit Sex)",
        "Mache mit jemandem alles, was Paare machen (mit Sex)",
      ],
    },
  },
]

export default function TruthOrDareGame() {
  const [gameState, setGameState] = useState<"setup" | "playing">("setup")
  const [players, setPlayers] = useState<Player[]>([])
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [newPlayerName, setNewPlayerName] = useState("")
  const [newPlayerGender, setNewPlayerGender] = useState("")
  const [newPlayerSexuality, setNewPlayerSexuality] = useState("")
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [selectedThemes, setSelectedThemes] = useState<string[]>(["classic"])
  const [showStatistics, setShowStatistics] = useState(false)
  const [selectedPlayerStats, setSelectedPlayerStats] = useState<Player | null>(null)
  const [lastSelectedPlayerId, setLastSelectedPlayerId] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(false)

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Check if two players are compatible for romantic challenges
  const arePlayersCompatible = (player1: Player, player2: Player): boolean => {
    if (player1.sexuality === "asexual" || player2.sexuality === "asexual") return false

    // Same gender compatibility
    if (player1.gender === player2.gender) {
      return (
        player1.sexuality === "gay" ||
        player1.sexuality === "lesbian" ||
        player1.sexuality === "bisexual" ||
        player1.sexuality === "pansexual" ||
        player2.sexuality === "gay" ||
        player2.sexuality === "lesbian" ||
        player2.sexuality === "bisexual" ||
        player2.sexuality === "pansexual"
      )
    }

    // Different gender compatibility
    if (player1.gender !== player2.gender) {
      const straightCompatible = player1.sexuality === "straight" || player2.sexuality === "straight"
      const biPanCompatible =
        player1.sexuality === "bisexual" ||
        player1.sexuality === "pansexual" ||
        player2.sexuality === "bisexual" ||
        player2.sexuality === "pansexual"

      return straightCompatible || biPanCompatible
    }

    return false
  }

  const getCompatiblePlayers = (currentPlayer: Player): Player[] => {
    return players.filter((p) => p.id !== currentPlayer.id && arePlayersCompatible(currentPlayer, p))
  }

  const getFilteredChallenges = (type: "truths" | "dares", player: Player) => {
    let allChallenges: string[] = []

    selectedThemes.forEach((themeId) => {
      const theme = themePacks.find((t) => t.id === themeId)
      if (theme) {
        allChallenges = [...allChallenges, ...theme[type][difficulty]]

        // Add romantic dares if compatible players exist and it's a dare
        if (type === "dares" && theme.romanticDares) {
          const compatiblePlayers = getCompatiblePlayers(player)
          if (compatiblePlayers.length > 0) {
            allChallenges = [...allChallenges, ...theme.romanticDares[difficulty]]
          }
        }
      }
    })

    return allChallenges
  }

  const addPlayer = () => {
    if (newPlayerName && newPlayerGender && newPlayerSexuality) {
      const newPlayer: Player = {
        id: Date.now().toString(),
        name: newPlayerName,
        gender: newPlayerGender,
        sexuality: newPlayerSexuality,
        statistics: {
          completedChallenges: [],
          totalChallenges: 0,
          favoriteThemes: {},
          difficultyPreferences: {},
          truthsCompleted: 0,
          daresCompleted: 0,
        },
      }
      setPlayers([...players, newPlayer])
      setNewPlayerName("")
      setNewPlayerGender("")
      setNewPlayerSexuality("")
    }
  }

  const removePlayer = (playerId: string) => {
    setPlayers(players.filter((p) => p.id !== playerId))
  }

  const startGame = () => {
    if (players.length >= 2) {
      setGameState("playing")
      setLastSelectedPlayerId(null) // Reset last selected player when starting
      selectRandomPlayer()
    }
  }

  const selectRandomPlayer = () => {
    // If there's only one player, they have to continue
    if (players.length === 1) {
      setCurrentPlayer(players[0])
      setCurrentChallenge(null)
      return
    }

    // Filter out the last selected player to ensure fair rotation
    const availablePlayers = players.filter((player) => player.id !== lastSelectedPlayerId)

    // If all players were filtered out (shouldn't happen), use all players
    const playersToChooseFrom = availablePlayers.length > 0 ? availablePlayers : players

    const randomIndex = Math.floor(Math.random() * playersToChooseFrom.length)
    const selectedPlayer = playersToChooseFrom[randomIndex]

    setCurrentPlayer(selectedPlayer)
    setLastSelectedPlayerId(selectedPlayer.id)
    setCurrentChallenge(null)
  }

  const selectTruthOrDare = (type: "truth" | "dare") => {
    if (!currentPlayer) return

    let challenge: Challenge

    if (type === "truth") {
      const truths = getFilteredChallenges("truths", currentPlayer)
      const randomTruth = truths[Math.floor(Math.random() * truths.length)]

      // Find which theme this truth belongs to
      let selectedTheme = "classic"
      for (const themeId of selectedThemes) {
        const theme = themePacks.find((t) => t.id === themeId)
        if (theme && theme.truths[difficulty].includes(randomTruth)) {
          selectedTheme = themeId
          break
        }
      }

      challenge = {
        type: "truth",
        content: randomTruth,
        difficulty: difficulty,
        theme: selectedTheme,
      }
    } else {
      const dares = getFilteredChallenges("dares", currentPlayer)
      const randomDare = dares[Math.floor(Math.random() * dares.length)]

      // If it's a romantic dare, specify a compatible player
      let finalDare = randomDare
      if (randomDare.includes("jemanden") || randomDare.includes("jemandem")) {
        const compatiblePlayers = getCompatiblePlayers(currentPlayer)
        if (compatiblePlayers.length > 0) {
          const randomCompatiblePlayer = compatiblePlayers[Math.floor(Math.random() * compatiblePlayers.length)]
          finalDare = randomDare.replace(/jemanden|jemandem/g, randomCompatiblePlayer.name)
        }
      }

      // Find which theme this dare belongs to
      let selectedTheme = "classic"
      for (const themeId of selectedThemes) {
        const theme = themePacks.find((t) => t.id === themeId)
        if (theme) {
          if (
            theme.dares[difficulty].includes(randomDare) ||
            (theme.romanticDares && theme.romanticDares[difficulty].includes(randomDare))
          ) {
            selectedTheme = themeId
            break
          }
        }
      }

      challenge = {
        type: "dare",
        content: finalDare,
        difficulty: difficulty,
        theme: selectedTheme,
      }
    }

    setCurrentChallenge(challenge)
  }

  const nextTurn = () => {
    selectRandomPlayer()
  }

  const resetGame = () => {
    setGameState("setup")
    setCurrentPlayer(null)
    setCurrentChallenge(null)
    setLastSelectedPlayerId(null) // Clear last selected player when resetting
  }

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyText = (diff: string) => {
    switch (diff) {
      case "easy":
        return "Einfach"
      case "medium":
        return "Mittel"
      case "hard":
        return "Schwer"
      default:
        return "Mittel"
    }
  }

  const getThemeInfo = (themeId: string) => {
    return themePacks.find((t) => t.id === themeId)
  }

  const completeChallenge = (rating?: number) => {
    if (!currentPlayer || !currentChallenge) return

    const completedChallengeData: CompletedChallenge = {
      id: Date.now().toString(),
      type: currentChallenge.type,
      content: currentChallenge.content,
      theme: currentChallenge.theme,
      difficulty: currentChallenge.difficulty,
      completedAt: new Date(),
      rating: rating,
    }

    const updatedPlayers = players.map((player) => {
      if (player.id === currentPlayer.id) {
        const newStats = { ...player.statistics }

        // Add completed challenge
        newStats.completedChallenges.push(completedChallengeData)
        newStats.totalChallenges += 1

        // Update type counters
        if (currentChallenge.type === "truth") {
          newStats.truthsCompleted += 1
        } else {
          newStats.daresCompleted += 1
        }

        // Update favorite themes
        newStats.favoriteThemes[currentChallenge.theme] = (newStats.favoriteThemes[currentChallenge.theme] || 0) + 1

        // Update difficulty preferences
        newStats.difficultyPreferences[currentChallenge.difficulty] =
          (newStats.difficultyPreferences[currentChallenge.difficulty] || 0) + 1

        return { ...player, statistics: newStats }
      }
      return player
    })

    setPlayers(updatedPlayers)
    nextTurn()
  }

  const getFavoriteTheme = (player: Player): string => {
    const themes = player.statistics.favoriteThemes
    const maxTheme = Object.keys(themes).reduce((a, b) => (themes[a] > themes[b] ? a : b), Object.keys(themes)[0])
    return maxTheme || "classic"
  }

  const getFavoriteDifficulty = (player: Player): string => {
    const difficulties = player.statistics.difficultyPreferences
    const maxDifficulty = Object.keys(difficulties).reduce(
      (a, b) => (difficulties[a] > difficulties[b] ? a : b),
      Object.keys(difficulties)[0],
    )
    return maxDifficulty || "medium"
  }

  const getCompletionRate = (player: Player): number => {
    if (player.statistics.totalChallenges === 0) return 0
    return Math.round((player.statistics.completedChallenges.length / player.statistics.totalChallenges) * 100)
  }

  const StatisticsModal = () =>
    showStatistics && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="dark:text-white">Spieler Statistiken</CardTitle>
              <Button
                variant="ghost"
                onClick={() => setShowStatistics(false)}
                className="dark:text-white dark:hover:bg-gray-700"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player) => (
                <Card key={player.id} className="p-4 dark:bg-gray-700 dark:border-gray-600">
                  <h3 className="font-bold text-lg mb-2 dark:text-white">{player.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Herausforderungen:</span>
                      <Badge className="dark:bg-gray-600 dark:text-white">{player.statistics.totalChallenges}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Wahrheiten:</span>
                      <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                        {player.statistics.truthsCompleted}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Pflichten:</span>
                      <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                        {player.statistics.daresCompleted}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Lieblings-Thema:</span>
                      <Badge className={getThemeInfo(getFavoriteTheme(player))?.color || "bg-gray-500"}>
                        {getThemeInfo(getFavoriteTheme(player))?.icon} {getThemeInfo(getFavoriteTheme(player))?.name}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="dark:text-gray-300">Lieblings-Schwierigkeit:</span>
                      <Badge className={getDifficultyColor(getFavoriteDifficulty(player))}>
                        {getDifficultyText(getFavoriteDifficulty(player))}
                      </Badge>
                    </div>
                    <div className="mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedPlayerStats(player)}
                        className="w-full dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600"
                      >
                        Details anzeigen
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )

  const PlayerDetailModal = () =>
    selectedPlayerStats && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="dark:text-white">{selectedPlayerStats.name} - Detaillierte Statistiken</CardTitle>
              <Button
                variant="ghost"
                onClick={() => setSelectedPlayerStats(null)}
                className="dark:text-white dark:hover:bg-gray-700"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-3 dark:bg-gray-700 dark:border-gray-600">
                <h4 className="font-semibold mb-2 dark:text-white">Themen-Verteilung</h4>
                {Object.entries(selectedPlayerStats.statistics.favoriteThemes).map(([themeId, count]) => (
                  <div key={themeId} className="flex justify-between items-center mb-1">
                    <span className="text-sm dark:text-gray-300">{getThemeInfo(themeId)?.name}</span>
                    <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                      {count}
                    </Badge>
                  </div>
                ))}
              </Card>
              <Card className="p-3 dark:bg-gray-700 dark:border-gray-600">
                <h4 className="font-semibold mb-2 dark:text-white">Schwierigkeits-Verteilung</h4>
                {Object.entries(selectedPlayerStats.statistics.difficultyPreferences).map(([diff, count]) => (
                  <div key={diff} className="flex justify-between items-center mb-1">
                    <span className="text-sm dark:text-gray-300">{getDifficultyText(diff)}</span>
                    <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                      {count}
                    </Badge>
                  </div>
                ))}
              </Card>
            </div>

            <Card className="p-3 dark:bg-gray-700 dark:border-gray-600">
              <h4 className="font-semibold mb-2 dark:text-white">Letzte Herausforderungen</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {selectedPlayerStats.statistics.completedChallenges
                  .slice(-10)
                  .reverse()
                  .map((challenge, index) => (
                    <div key={index} className="p-2 bg-gray-50 dark:bg-gray-600 rounded text-sm">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant={challenge.type === "truth" ? "default" : "destructive"}>
                          {challenge.type === "truth" ? "Wahrheit" : "Pflicht"}
                        </Badge>
                        <div className="flex gap-1">
                          <Badge className={getDifficultyColor(challenge.difficulty)}>
                            {getDifficultyText(challenge.difficulty)}
                          </Badge>
                          {challenge.rating && <span className="text-yellow-500">⭐</span>}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{challenge.content}</p>
                    </div>
                  ))}
              </div>
            </Card>
          </CardContent>
        </Card>
      </div>
    )

  if (gameState === "setup") {
    return (
      <div
        className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-pink-100 to-purple-100"} p-2 sm:p-4`}
      >
        <div className="max-w-4xl mx-auto">
          <Card className="mb-4 sm:mb-6 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1"></div>
                <div className="flex-1 flex justify-center">
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-purple-800 dark:text-purple-300 flex items-center justify-center gap-2">
                    <Heart className="h-6 w-6 sm:h-8 sm:w-8" />
                    Wahrheit oder Pflicht
                  </CardTitle>
                </div>
                <div className="flex-1 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleDarkMode}
                    className="dark:text-white dark:hover:bg-gray-700"
                  >
                    {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              <CardDescription className="dark:text-gray-300">
                Ein inklusives Spiel für alle mit verschiedenen Themen
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="mb-4 sm:mb-6 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl dark:text-white">
                <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                Spieler hinzufügen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="name" className="dark:text-gray-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder="Name eingeben"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="gender" className="dark:text-gray-300">
                    Geschlecht
                  </Label>
                  <Select value={newPlayerGender} onValueChange={setNewPlayerGender}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Geschlecht wählen" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="male" className="dark:text-white dark:hover:bg-gray-600">
                        Männlich
                      </SelectItem>
                      <SelectItem value="female" className="dark:text-white dark:hover:bg-gray-600">
                        Weiblich
                      </SelectItem>
                      <SelectItem value="non-binary" className="dark:text-white dark:hover:bg-gray-600">
                        Nicht-binär
                      </SelectItem>
                      <SelectItem value="genderfluid" className="dark:text-white dark:hover:bg-gray-600">
                        Genderfluid
                      </SelectItem>
                      <SelectItem value="other" className="dark:text-white dark:hover:bg-gray-600">
                        Andere
                      </SelectItem>
                      <SelectItem value="prefer-not-to-say" className="dark:text-white dark:hover:bg-gray-600">
                        Keine Angabe
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sexuality" className="dark:text-gray-300">
                    Sexualität
                  </Label>
                  <Select value={newPlayerSexuality} onValueChange={setNewPlayerSexuality}>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Sexualität wählen" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                      <SelectItem value="straight" className="dark:text-white dark:hover:bg-gray-600">
                        Heterosexuell
                      </SelectItem>
                      <SelectItem value="gay" className="dark:text-white dark:hover:bg-gray-600">
                        Schwul
                      </SelectItem>
                      <SelectItem value="lesbian" className="dark:text-white dark:hover:bg-gray-600">
                        Lesbisch
                      </SelectItem>
                      <SelectItem value="bisexual" className="dark:text-white dark:hover:bg-gray-600">
                        Bisexuell
                      </SelectItem>
                      <SelectItem value="pansexual" className="dark:text-white dark:hover:bg-gray-600">
                        Pansexuell
                      </SelectItem>
                      <SelectItem value="asexual" className="dark:text-white dark:hover:bg-gray-600">
                        Asexuell
                      </SelectItem>
                      <SelectItem value="demisexual" className="dark:text-white dark:hover:bg-gray-600">
                        Demisexuell
                      </SelectItem>
                      <SelectItem value="questioning" className="dark:text-white dark:hover:bg-gray-600">
                        Unentschlossen
                      </SelectItem>
                      <SelectItem value="other" className="dark:text-white dark:hover:bg-gray-600">
                        Andere
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={addPlayer} className="w-full">
                Spieler hinzufügen
              </Button>
            </CardContent>
          </Card>

          {players.length > 0 && (
            <Card className="mb-4 sm:mb-6 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Spieler ({players.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  {players.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div>
                        <span className="font-medium dark:text-white">{player.name}</span>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          <Badge variant="outline" className="text-xs dark:border-gray-500 dark:text-gray-300">
                            {player.gender}
                          </Badge>
                          <Badge variant="outline" className="text-xs dark:border-gray-500 dark:text-gray-300">
                            {player.sexuality}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm" onClick={() => removePlayer(player.id)}>
                        Entfernen
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-4 sm:mb-6 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Schwierigkeitsgrad wählen</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Wähle den Schwierigkeitsgrad für das Spiel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["easy", "medium", "hard"].map((diff) => (
                  <div
                    key={diff}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      difficulty === diff
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                    onClick={() => setDifficulty(diff as "easy" | "medium" | "hard")}
                  >
                    <div className="text-center">
                      <div className={`w-6 h-6 rounded-full mx-auto mb-2 ${getDifficultyColor(diff)}`}></div>
                      <h3 className="font-semibold text-lg dark:text-white">{getDifficultyText(diff)}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {diff === "easy" && "Harmlose und lustige Aufgaben"}
                        {diff === "medium" && "Mittlere Herausforderungen"}
                        {diff === "hard" && "Mutige und gewagte Aufgaben"}
                      </p>
                      <Badge
                        variant={difficulty === diff ? "default" : "outline"}
                        className="mt-2 dark:border-gray-500"
                      >
                        {difficulty === diff ? "Ausgewählt" : "Wählen"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-4 sm:mb-6 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Themen wählen</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Wähle welche Themen-Pakete du einschließen möchtest (mindestens eins)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {themePacks.map((theme) => (
                  <div
                    key={theme.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedThemes.includes(theme.id)
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-400"
                        : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                    }`}
                    onClick={() => {
                      if (selectedThemes.includes(theme.id)) {
                        if (selectedThemes.length > 1) {
                          setSelectedThemes(selectedThemes.filter((id) => id !== theme.id))
                        }
                      } else {
                        setSelectedThemes([...selectedThemes, theme.id])
                      }
                    }}
                  >
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl mb-2">{theme.icon}</div>
                      <h3 className="font-semibold text-base sm:text-lg dark:text-white">{theme.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{theme.description}</p>
                      <Badge
                        variant={selectedThemes.includes(theme.id) ? "default" : "outline"}
                        className={`mt-2 ${selectedThemes.includes(theme.id) ? theme.color + " text-white" : "dark:border-gray-500 dark:text-gray-300"}`}
                      >
                        {selectedThemes.includes(theme.id) ? "Ausgewählt" : "Wählen"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Ausgewählte Themen: {selectedThemes.length} • Mindestens ein Thema muss ausgewählt sein
              </p>
            </CardContent>
          </Card>

          <Button onClick={startGame} disabled={players.length < 2} className="w-full text-lg py-6">
            Spiel starten (Mindestens 2 Spieler)
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900" : "bg-gradient-to-br from-pink-100 to-purple-100"} p-2 sm:p-4`}
    >
      <div className="max-w-2xl mx-auto">
        <Card className="mb-4 sm:mb-6 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1"></div>
              <div className="flex-1 flex justify-center">
                <CardTitle className="text-xl sm:text-2xl font-bold text-purple-800 dark:text-purple-300">
                  Wahrheit oder Pflicht
                </CardTitle>
              </div>
              <div className="flex-1 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="dark:text-white dark:hover:bg-gray-700"
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Badge className={`text-white ${getDifficultyColor(difficulty)}`}>{getDifficultyText(difficulty)}</Badge>
              {currentChallenge && (
                <Badge className={`text-white ${getThemeInfo(currentChallenge.theme)?.color || "bg-gray-500"}`}>
                  {getThemeInfo(currentChallenge.theme)?.icon} {getThemeInfo(currentChallenge.theme)?.name}
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={selectRandomPlayer}
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 bg-transparent"
              >
                <Shuffle className="h-4 w-4 mr-2" />
                Neuer Spieler
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={resetGame}
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 bg-transparent"
              >
                Spiel beenden
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowStatistics(true)}
                className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                📊 Statistiken
              </Button>
            </div>
          </CardHeader>
        </Card>

        {currentPlayer && (
          <Card className="mb-4 sm:mb-6 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="text-center">
              <CardTitle className="text-lg sm:text-xl dark:text-white">{currentPlayer.name} ist dran</CardTitle>
              <div className="flex justify-center gap-2 mt-2 flex-wrap">
                <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                  {currentPlayer.gender}
                </Badge>
                <Badge variant="outline" className="dark:border-gray-500 dark:text-gray-300">
                  {currentPlayer.sexuality}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              {!currentChallenge ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => selectTruthOrDare("truth")}
                    className="text-lg py-6 px-8 bg-blue-500 hover:bg-blue-600 w-full sm:w-auto"
                  >
                    Wahrheit
                  </Button>
                  <Button
                    onClick={() => selectTruthOrDare("dare")}
                    className="text-lg py-6 px-8 bg-red-500 hover:bg-red-600 w-full sm:w-auto"
                  >
                    Pflicht
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="flex justify-center gap-2 flex-wrap">
                    <Badge
                      variant={currentChallenge.type === "truth" ? "default" : "destructive"}
                      className="text-base sm:text-lg px-4 py-2"
                    >
                      {currentChallenge.type === "truth" ? "WAHRHEIT" : "PFLICHT"}
                    </Badge>
                    <Badge className={`text-white ${getDifficultyColor(currentChallenge.difficulty)}`}>
                      {getDifficultyText(currentChallenge.difficulty)}
                    </Badge>
                  </div>
                  <p className="text-base sm:text-lg font-medium p-4 bg-white dark:bg-gray-700 dark:text-white rounded-lg border-2 border-dashed dark:border-gray-600">
                    {currentChallenge.content}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button onClick={() => completeChallenge()} className="text-base sm:text-lg py-4 px-6">
                      Erledigt
                    </Button>
                    <Button
                      onClick={() => completeChallenge(5)}
                      variant="outline"
                      className="text-base sm:text-lg py-4 px-6 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      ⭐ Super!
                    </Button>
                    <Button
                      onClick={nextTurn}
                      variant="ghost"
                      className="text-base sm:text-lg py-4 px-6 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Überspringen
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-center dark:text-white">Spielregeln</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            <p className="dark:text-gray-300">
              • Wähle <strong>Wahrheit</strong>, um eine Frage ehrlich zu beantworten
            </p>
            <p className="dark:text-gray-300">
              • Wähle <strong>Pflicht</strong>, um eine Herausforderung zu meistern
            </p>
            <p className="dark:text-gray-300">
              • Jeder sollte sich wohlfühlen - überspringe alles, womit du nicht einverstanden bist
            </p>
            <p className="dark:text-gray-300">• Romantische Aufgaben erscheinen nur zwischen kompatiblen Spielern</p>
            <p className="dark:text-gray-300">
              • Verschiedene Themen bieten unterschiedliche Arten von Herausforderungen
            </p>
            <p className="dark:text-gray-300">• Hab Spaß und sei respektvoll zu allen!</p>
          </CardContent>
        </Card>
      </div>
      <StatisticsModal />
      <PlayerDetailModal />
    </div>
  )
}
