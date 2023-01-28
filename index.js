require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { Configuration, OpenAIApi } = require("openai");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Hello! I am a bot that can answer your questions using the OpenAI API. How can I help you today?');
});

bot.on('message', async (msg) => {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: msg.text,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    bot.sendMessage(msg.chat.id, response.data.choices[0].text);
});
