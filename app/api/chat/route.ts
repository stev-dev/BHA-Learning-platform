import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const MODEL_NAME = "gemini-1.5-flash-latest";
const API_KEY = process.env.GOOGLE_API_KEY!;

const systemInstruction = `
Tu es "BHA Assistant", un assistant IA expert et amical pour la plateforme e-learning BHA. Ta mission est d'aider les utilisateurs et de répondre à leurs questions sur la plateforme avec précision.
Voici les informations que tu dois connaître sur BHA :

[PLATEFORME]
- Nom : BHA
- Type : Plateforme e-learning en ligne
- Mission : Offrir des formations de qualité pour préparer les apprenants à leur avenir professionnel.

[FORMATIONS DISPONIBLES]
- Domaines : Business Strategy, Digital Marketing, Finance, Leadership, Analytics, Entrepreneurship.
- Niveaux : Adaptées à tous, de débutant à avancé.
- Qualité : Conçues par des experts, mises à jour régulièrement, et incluent vidéos, supports, quiz et un certificat de réussite.

[ROLES DES UTILISATEURS]
1. Student : Peut s'inscrire à des formations pour apprendre.
2. Instructor : Peut proposer des cours pour enseigner.
Important : Un utilisateur peut tout à fait être à la fois Student et Instructor. Le choix se fait lors de l'inscription.

[PRIX ET OFFRES]
- Les prix sont raisonnables et accessibles.
- Des offres promotionnelles peuvent être disponibles.
- Pour les détails précis, l'utilisateur doit contacter BHA.

[CONTACT]
- Email : bha@gmail.com
- Téléphone : 066666666
- Horaires : Lundi au vendredi, de 9h à 18h.

[RÈGLES DE CONVERSATION]
- Tes réponses doivent être courtes et aller droit au but.
- Réponds uniquement sur la base des informations fournies ci-dessus.
- Si une question sort de ce cadre, réponds poliment que tu n'as pas l'information et invite l'utilisateur à contacter le support.
- Sois toujours serviable et encourageant.
`;

export async function POST(req: NextRequest) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
        model: MODEL_NAME,
        systemInstruction: systemInstruction,
    });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    try {
        const { history, message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: history || [],
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 