export default {
    id: "1",
    title: "CPU Quiz",
    description: "This is a quiz",
    questions: [
        {
            id: "1",
            points: 1,
            type: "multiple-choice",
            title: "CPU: Befehlsausführung",
            question:
                "Was ist die richtige Durchführungsreihenfolge in der CPU?",
            hint: 'Die Notation "PC++" bedeutet, das der Programcounter (PC) inkrementiert wird.',
            options: [
                "PC++/ execute / fetch / decode",
                "PC++/ decode / execute / fetch",
                "fetch / PC++/ decode / execute",
                "PC++ / fetch / decode /execute",
                "decode / fetch / execute / PC++"
            ],
            solution: 2
        },
        {
            id: "2",
            points: 1,
            type: "multiple-choice",
            title: "Moore",
            question: "Was beschreibt das Mooresche Gesetz?",
            options: [
                "Die Anzahl der Transistoren innerhalb eines Schaltkreises verdoppelt sich alle 18 Monate.",
                "Die Leistung eines ICs verdoppelt sich alle 18 Monate.",
                "Die Verbindung zwischen Technologie und geographischen Veränderungen.",
                "Das Verhältis von Computer zu seinem Preis ist immer Faktor 0,5.",
                "Den Algorithmus, um beim Blackjack zu gewinnen."
            ],
            solution: 2
        },
        {
            id: "3",
            points: 1,
            type: "multiple-choice",
            title: "Gültige HEX-Zahlen",
            question:
                "Welche der folgenden Zahlen ist keine gültige Hexadezimalzahl ?",
            options: ["CAB", "DAD", "ACCEDED", "BED", "DECADE", "BAG", "DEAD"],
            solution: 2
        }
    ]
};
