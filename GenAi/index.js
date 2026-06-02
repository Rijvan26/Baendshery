import "dotenv/config";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage , tool, createAgent } from "langchain";
import { sendEmail } from "./mail.service.js";
import { Schema } from "mongoose";
import * as z from "zod";

const emailTool = tool(
  sendEmail,
  {
      name:"sendEmail",
    description: "send an email",
    schema: z.object({
        to:z.string().describe("the receipt email"),
        subject:z.string().describe("the eamil subject"),
        html:z.string().describe("the email body")
     })
  }
)





const rl = readline.createInterface({ input, output });

const model = new ChatMistralAI({
  model: "mistral-small-latest",
});


const agent = createAgent({
    model,
    tools:[emailTool],
})

const messages = []

while (true) {
  const userInput = await rl.question("You: ");
  messages.push(new HumanMessage(userInput))

  const response = await agent.invoke({
    messages
  });

  messages.push(response.messages[response.messages.length - 1])

  console.log("AI:", response.messages[response.messages.length - 1].text);
}