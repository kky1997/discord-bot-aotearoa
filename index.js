import dotenv from 'dotenv';
import { Client, GatewayIntentBits, WebhookClient, AttachmentBuilder } from 'discord.js';
import cron from 'node-cron';

dotenv.config();

/* OLD WEB CLIENT ARCHITECTURE
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});*/

// New webhook architecture
const webhook = new WebhookClient({
  url: process.env.WEBHOOK_URL,
});

const images = {
  1: "public/thumb-1920-645529.jpeg",
  2:"public/thumb-1920-645530.jpeg",
  3:"public/thumb-1920-1352186.png",
  4: "public/thumb-1920-1352188.png",
  5: "public/thumb-1920-1352189.png",
  6: "public/thumb-1920-1352190.png",
  7: "public/thumb-1920-1394172.png",
  8: "public/thumb-1920-1394173.png",
  9: "public/thumb-1920-1394174.png",
  10: "public/thumb-1920-1394198.png",
  11: "public/thumb-1920-1394199.png",
}

const nzFacts = {
  10: 'New Zealand has no native land snakes.',
  9: 'The kea is the worlds only alpine parrot.',
  8: 'New Zealand was one of the last major landmasses settled by humans.',
  7: 'Aotearoa is a Māori name commonly used for New Zealand.',
  6: 'Fiordland is one of the wettest regions in New Zealand.',
  5: 'New Zealand has more than 50 volcanoes, many of them around the Taupō Volcanic Zone.',
  4: 'The kiwi is flightless, nocturnal, and has nostrils near the tip of its beak.',
  3: 'Milford Sound was carved by glaciers during successive ice ages.',
  2: 'New Zealand sits on the boundary between the Pacific and Australian tectonic plates.',
  1: 'The Southern Alps stretch for roughly 500 km along New Zealands South Island.',
};

const CLIMB_YEAR = 2027;
const CLIMB_MONTH = 7;

function getMonthsUntilClimb() {
  const now = new Date();

  const parts = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Adelaide',
    year: 'numeric',
    month: 'numeric',
  }).formatToParts(now);

  const year = Number(parts.find((part) => part.type === 'year').value);
  const month = Number(parts.find((part) => part.type === 'month').value);

  return (CLIMB_YEAR - year) * 12 + (CLIMB_MONTH - month);
}

/* OLD WEB CLIENT ARCHITECTURE
cron.schedule('0 9 28 * *', async () => {
  const channel = await client.channels.fetch(process.env.CHANNEL_ID);
  const monthsUntilClimb = getMonthsUntilClimb();

  if(channel?.isTextBased()) {
      await channel.send({
        content: `${monthsUntilClimb} months until we climb`,
        files: [images[monthsUntilClimb] ? images[monthsUntilClimb + 1] : images[1]],
      });
    }
  },
  {
    timezone: 'Australia/Adelaide'
  }
);


client.login(process.env.DISCORD_TOKEN);
*/

// New webhook architecture, this doesn't actually use the bot anymore, just webhook into the channel
async function sendCountdown() {
  const monthsUntilClimb = getMonthsUntilClimb();

  const imagePath =
    images[monthsUntilClimb + 1] ?? images[1];

  const attachment = new AttachmentBuilder(imagePath);

  const fact = nzFacts[monthsUntilClimb];

  await webhook.send({
    content: `${monthsUntilClimb} months until we climb 🏔️ **NZ fact:** ${fact}`,
    files: [attachment],
  });
}

sendCountdown()
  .then(() => {
    console.log('Countdown sent successfully');
  })
  .catch((error) => {
    console.error('Failed to send countdown:', error);
  });