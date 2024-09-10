import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flashcard creator. 
Your task is to create clear, concise, and effective 
flashcards to help learners understand and remember key concepts. 
Each flashcard should consist of a question or prompt on the front and 
a detailed, yet succinct answer or explanation on the back. 
Ensure the content is engaging, accurate, and suitable 
for the intended audience's knowledge level. Use simple 
language, examples, and relevant analogies when necessary 
to enhance understanding. Prioritize clarity and educational 
value in your responses.
Only generate 10 flashcards
Ensure the flashcard is one word answer.
Retun in the following JSON format{
    "flashcards":[{
        "front": str,
        "back" : str
    }]
}
`
export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()
    const completion = await openai.chat.completions.create({
        messages:[
            {role:"system",content: systemPrompt},
            {role: "user", content: data},
        ],
        model: "gpt-4o",
        response_format:{type: 'json_object'},
})


const flashcards = JSON.parse(completion.choices[0].message.content)

return NextResponse.json(flashcards.flashcards)
}