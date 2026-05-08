import { getChannel } from "./export.config.js";

export const sendMessage = async (queue, message) => {
  try {
    const channel = getChannel();
    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    console.log(`Message sent to queue "${queue}":`, message);
  } catch (error) {
    console.error("Failed to send message to RabbitMQ:", error);
  }
};
