import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage ,AIMessage, tool, createAgent} from "langchain";
import * as z from 'zod'
import { searchInternet } from "./internet.service.js";
import { describe } from "zod/v4/core";

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

const searchInternetTool = tool(
  searchInternet,
  {
    name:"searchInternet",
    descrrption:"use this tool to get latest info from internet ",
    schema: z.object({
      query:z.string().describe("the search query to look up on the intenet")
    })
  }
)

const agent = createAgent({
  model:mistralModel,
  tools:[searchInternetTool]
})

export async function genrateResponse(message , history=[]) {

  const chatHistory = history.map(msg => {
    if(msg.role === "user") {
      return new HumanMessage(msg.content)
    }

    return new AIMessage(msg.content)
  })
  const response = await agent.invoke({
      messages:[
        new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),

    ...chatHistory,
    new HumanMessage(message)
      ]
});

console.log("Agent Response:", response)

  const lastresponse =  response.messages.at(-1)
  return lastresponse.content
}



export async function generateChatTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
      You are a helpful assistant that generates concise and descriptive titles for chat conversations.
    `),
    new HumanMessage(
      `Generate a concise and descriptive title for the following chat conversation: ${message}`
    ),
  ]);

  return response.content;
}