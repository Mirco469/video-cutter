const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

// Configurazione cartelle e file
const inputDir = "./input"; // Cartella da cui caricare il file
const outputDir = "./output"; // Cartella in cui salvare il file modificato

const inputFileName = "Steins;Gate_Ep_01_ITA.mp4";
const outputFileName = "Steins;Gate_Ep_01_ITA_editato.mp4";

// Percorsi completi sicuri e cross-platform
const inputFile = path.join(inputDir, inputFileName);
const outputFile = path.join(outputDir, outputFileName);

// Crea la cartella di output se non esiste
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Intervalli (basati sull'analisi precedente) in secondi
const intervals = [
  { start: 0, end: 397 },
  { start: 450, end: 635 },
  { start: 720, end: 811 },
  { start: 1072, end: 1216 },
  { start: 1242, end: 1437 },
];

const command = ffmpeg(inputFile);

// Generazione filtri per trim e concat
let filterComplex = "";
let concatInputs = "";

intervals.forEach((range, i) => {
  filterComplex += `[0:v]trim=start=${range.start}:end=${range.end},setpts=PTS-STARTPTS[v${i}]; `;
  filterComplex += `[0:a]atrim=start=${range.start}:end=${range.end},asetpts=PTS-STARTPTS[a${i}]; `;
  concatInputs += `[v${i}][a${i}]`;
});

filterComplex += `${concatInputs}concat=n=${intervals.length}:v=1:a=1[outv][outa]`;

command
  .complexFilter(filterComplex, ["outv", "outa"])
  .on("start", (cmd) => console.log("Esecuzione FFmpeg:", cmd))
  .on("error", (err) => console.error("Errore:", err))
  .on("end", () =>
    console.log("Editing completato! File salvato in:", outputFile),
  )
  .save(outputFile);
