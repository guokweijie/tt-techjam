import openai from "@/lib/openai";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("body.input:", body.input)
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: body.input,
      },
    ],
    model: "gpt-4o",
  });
  const data = response.choices[0].message.content;
  console.log(data)
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
