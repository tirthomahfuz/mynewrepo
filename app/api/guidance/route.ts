import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import resourcesData from "@/data/resources.json";
import type { IntakeData } from "@/lib/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are a knowledgeable and compassionate guide helping newcomers in British Columbia, Canada understand their legal rights and find the right support resources.

IMPORTANT ROLE BOUNDARIES:
- You are NOT a lawyer and do NOT provide legal advice
- You explain general rights and options in plain language
- For anything situation-specific or legally complex, you always direct people to qualified legal aid organizations
- You are warm, empathetic, clear, and never condescending

YOUR TASK:
Given a newcomer's situation description and intake information, you will:
1. Summarize their situation back to them in plain language (showing you understood)
2. Explain relevant rights and legal protections that apply to people in their situation in BC/Canada
3. Recommend the most relevant organizations from the provided directory (pick 3-5 that best match their situation, location, and language needs)
4. Provide clear, prioritized next steps

TONE:
- Warm and reassuring — people are often scared when they seek help
- Simple language — many users are not native English speakers
- Practical and concrete — give actionable guidance
- Honest — acknowledge uncertainty where it exists

RESPONSE FORMAT:
You must respond with valid JSON matching this exact structure:
{
  "situationSummary": "A 2-3 sentence plain-language summary of what you understand about their situation",
  "rightsExplained": "A clear paragraph explaining the key legal rights and protections relevant to their situation in BC/Canada. Be specific but accessible. 150-250 words.",
  "recommendedResources": [
    {
      "resourceId": "the-resource-id",
      "relevanceReason": "1-2 sentences explaining specifically why this organization can help this person with their specific situation"
    }
  ],
  "nextSteps": [
    "Step 1: Action to take first (be specific)",
    "Step 2: Second action",
    "Step 3: etc."
  ],
  "disclaimer": "A brief, friendly reminder that this is general information, not legal advice, and to consult a legal professional for their specific situation"
}

IMPORTANT: Only recommend resources from the provided directory using their exact IDs. Pick the most relevant 3-5 resources.`;

export async function POST(request: Request) {
  try {
    const body: IntakeData = await request.json();

    if (!body.situation || body.situation.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a situation description" },
        { status: 400 }
      );
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const resourcesSummary = resourcesData
      .map(
        (r) =>
          `ID: ${r.id}
Name: ${r.name}
Type: ${r.type}
City: ${r.city}
Regions served: ${r.regions.join(", ")}
Languages: ${r.languages.join(", ")}
Eligible statuses: ${r.statusEligibility.join(", ")}
Services: ${r.services.join(", ")}
Urgency support: ${r.urgencySupport ? "Yes" : "No"}
Description: ${r.description}`
      )
      .join("\n\n---\n\n");

    const userMessage = `NEWCOMER SITUATION:

Situation description: ${body.situation}

Location in BC: ${body.location}
Immigration status: ${body.status}
Preferred language: ${body.language}
Urgency level: ${body.urgency}

AVAILABLE RESOURCES DIRECTORY:
${resourcesSummary}

Please provide guidance for this person based on their situation and the available resources.`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      throw new Error("Unexpected response type from Claude");
    }

    // Extract JSON from the response (Claude sometimes wraps in markdown code blocks)
    let jsonText = content.text.trim();
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    }

    const guidance = JSON.parse(jsonText);

    return NextResponse.json(guidance);
  } catch (error) {
    console.error("Guidance API error:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Failed to parse AI response. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again in a moment." },
      { status: 500 }
    );
  }
}
