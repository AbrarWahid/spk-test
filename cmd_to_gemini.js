const promptSync = require('prompt-sync')({sigint: true});
const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMINI_API_KEY = ""; 

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function formatTask(rawText) {
    console.log("Processing with Gemini AI...");
    
    const systemPrompt = `
    Tugas kamu adalah mengekstrak informasi dari kalimat mentah di bawah ini dan mengubahnya menjadi format tugas (Task) yang efisien, rapi, dan terstruktur.
    
    Contoh Kalimat Mentah: "Tugas baru untuk andri agar mencatat tugas orang lain, deadline minggu depan"
    Format yang Diharapkan:
    Assignee: Andri
    Task:
    1. Mencatat tugas orang lain
    Due Date: [Sebutkan kira-kira tanggal atau keterangan waktunya, misal: Minggu Depan]
    Task Status: Todo
    
    Kalimat yang harus kamu proses: "${rawText}"
    
    Berikan hanya format akhirnya saja, tanpa teks pengantar tambahan.
    `;

    try {
        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error(`Failed to connect to Gemini API: ${error.message}`);
        return null;
    }
}

async function main() {
    console.log("AI Task Generator CLI");
    console.log("Type 'exit' or 'keluar' to stop the program.\n");
    
    while (true) {
        const inputStr = promptSync('Enter instruction: ');
        
        if (inputStr === null || ['exit', 'keluar'].includes(inputStr.toLowerCase())) {
            console.log("Program terminated.");
            break;
        }
        
        if (inputStr.trim() === '') {
            console.log("Input cannot be empty.");
            continue;
        }
        
        const formattedTask = await formatTask(inputStr);
        
        if (formattedTask) {
            console.log("\nFORMATTED TASK:");
            console.log(formattedTask);
        } else {
            console.log("Failed to process input through AI.");
        }
    }
}

main();
