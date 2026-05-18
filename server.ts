import express from "express";
import path from "path";
import cors from "cors";
import multer from "multer";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

async function parsePdf(buffer: Buffer) {
  if (typeof pdf === 'function') {
    return await pdf(buffer);
  } else if (pdf && typeof pdf.default === 'function') {
    return await pdf.default(buffer);
  } else {
    throw new Error("pdf-parse is not a function");
  }
}

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Gemini AI setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY as string,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Middleware to prevent unauthorized clones
const securityCheck = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authorizedDomain = process.env.VITE_AUTHORIZED_DOMAIN || process.env.AUTHORIZED_DOMAIN;
  if (authorizedDomain && authorizedDomain !== "*" && authorizedDomain !== "localhost" && authorizedDomain !== "127.0.0.1") {
    const host = req.get('host') || "";
    // Allow the authorized domain or the localhost for dev
    if (!host.includes(authorizedDomain)) {
      console.warn(`Tentative d'accès non autorisée depuis le domaine: ${host}`);
      return res.status(403).json({ 
        error: "PROJET CLONÉ NON AUTORISÉ. Ce projet est protégé contre le clonage non autorisé. Veuillez contacter le propriétaire original." 
      });
    }
  }
  next();
};

app.use("/api", securityCheck);

const SYSTEM_INSTRUCTION = `Tu es "Votre Avocat IA", un assistant juridique personnel francophone de niveau expert. Tu combines la rigueur d'un avocat expérimenté avec la pédagogie d'un conseiller accessible. Tu t'adresses à des particuliers, entrepreneurs et professionnels du droit.

CAPACITÉS PRINCIPALES:
1. Conseiller juridiquement en temps réel (travail, famille, immobilier, consommation, etc.).
2. Rédiger des documents juridiques personnalisés (contrats, NDA, baux, etc.).
3. Analyser des documents soumis et identifier les risques/clauses abusives.
4. Prédire l'issue probable d'une affaire.
5. Effectuer des recherches juridiques.
6. Assister les avocats.

CADRE JURIDIQUE: Par défaut, Droit Français.

MÉTHODE:
- Pour une question: Analyse -> Textes applicables -> Réponse structurée -> Actions concrètes.
- Pour une rédaction: TOUJOURS poser les questions de qualification avant de rédiger (Type, Parties, Objet, Durée, Conditions financières, Clauses, Loi).
- Pour une analyse: Résumé 5 lignes -> Points forts -> Risques/Ambiguïtés -> Modifications concrètes.

TON: Professionnel mais accessible, sans jargon inutile, direct et empathique.

LIMITES: Rappelle ponctuellement que tes conseils sont informatifs et ne remplacent pas une consultation avec un avocat pour les affaires complexes.`;

// Safety & Anonymization Utils
function anonymize(text: string): string {
  // Simple regex for emails and phone numbers as a demonstration
  let masked = text.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL_MASKÉ]");
  masked = masked.replace(/(\+33|0)[1-9](\s?\d{2}){4}/g, "[TÉLÉPHONE_MASKÉ]");
  return masked;
}

function checkSensitivity(text: string): string {
  const sensitiveKeywords = ["secret défense", "code nucléaire", "mot de passe", "password"];
  const found = sensitiveKeywords.filter(kw => text.toLowerCase().includes(kw));
  if (found.length > 0) {
    return `ALERTE SÉCURITÉ: Le message contient des termes sensibles (${found.join(", ")}). Blocage préventif par le système d'intégration "Legal Gateway".`;
  }
  return "";
}

// API Routes
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history, useAgenticMode } = req.body;

    const sensitivityAlert = checkSensitivity(message);
    if (sensitivityAlert) {
      return res.status(403).json({ error: sensitivityAlert });
    }

    const anonymizedMessage = anonymize(message);

    if (useAgenticMode) {
      // Step 1: Research & Planning
      const plannerPrompt = `REQUÊTE UTILISATEUR: ${anonymizedMessage}
      
      En tant qu'agent de recherche juridique (Manus-Style), décompose cette requête en étapes de recherche nécessaires. 
      Identifie les textes de loi, les points de vigilance et les informations manquantes éventuelles.
      Réponds uniquement sous forme de liste JSON d'étapes.`;

      const planningResult = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: plannerPrompt }] }],
        config: { systemInstruction: "Tu es un planificateur juridique stratégique." }
      });

      // Step 2: Synthesis (The "Manus" Execution)
      const synthesisPrompt = `REQUÊTE: ${anonymizedMessage}
      PLAN DE RECHERCHE DÉTECTÉ: ${planningResult.text}
      
      Produis maintenant la réponse juridique complète en suivant rigoureusement le plan ci-dessus. 
      Sois précis, cite les articles probables du code (Civil, Travail, etc.) et donne des conseils stratégiques.`;

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION + "\n\nMODE AGENTIQUE: Utilise une approche de recherche approfondie par étapes.",
        },
        history: history || [],
      });

      const finalResult = await chat.sendMessage({ message: synthesisPrompt });
      
      return res.json({ 
        text: finalResult.text,
        planning: planningResult.text // Pass back the plan for UI visualization
      });
    }

    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + "\n\nPOLITIQUE DE SÉCURITÉ: Ne demande jamais d'informations personnelles sensibles. Si tu en détectes, rappelle à l'utilisateur de les masquer.\n\nAUTOMATISATION: Tu as accès à des connecteurs virtuels (WhatsApp, Zapier). Si l'utilisateur demande une action d'automatisation, explique que tu es prêt à l'exécuter via les connecteurs configurés dans son infrastructure sécurisée.",
      },
      history: history || [],
    });

    const result = await chat.sendMessage({ message: anonymizedMessage });
    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: error.message || "An error occurred" });
  }
});

app.post("/api/analyze-doc", upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let fileContent = "";
    let mediaPart: any = null;

    if (file.mimetype === "application/pdf") {
      const data = await parsePdf(file.buffer);
      fileContent = data.text;
    } else if (file.mimetype.startsWith("image/")) {
      mediaPart = {
        inlineData: {
          data: file.buffer.toString("base64"),
          mimeType: file.mimetype,
        }
      };
    } else {
      fileContent = file.buffer.toString("utf-8");
    }

    // Anonymize content before sending to Gemini
    const anonymizedContent = anonymize(fileContent);

    const sensitivityAlert = checkSensitivity(anonymizedContent);
    if (sensitivityAlert) {
       return res.status(403).json({ error: sensitivityAlert });
    }

    const prompt = mediaPart 
      ? "Analyse ce document juridique (image). Résume, points forts, risques et modifications. Ignore les données masquées."
      : `Analyse ce document juridique suivant:\n\n${anonymizedContent}\n\nRésumé, points forts, risques et modifications. Si tu detectes des données masquées [MASKÉ], ignore-les pour l'analyse mais mentionne leur présence.`;

    const contents = mediaPart 
      ? { parts: [mediaPart, { text: "Analyse ce document juridique." }] }
      : prompt;

    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents as any,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    res.json({ text: result.text });
  } catch (error: any) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: error.message || "An error occurred" });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
