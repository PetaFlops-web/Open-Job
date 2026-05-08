import "dotenv/config";
import { connectRabbitMQ, getChannel } from "../src/export/export.config.js";
import ApplicationService from "./application.service.js";
import MailSender from "./MailSender.js";
import Listener from "./Listener.js";

const startConsumer = async () => {
  await connectRabbitMQ();

  const channel = getChannel();
  const queue = "application_created";

  const listener = new Listener(new ApplicationService(), new MailSender());

  await channel.assertQueue(queue, { durable: true });
  channel.prefetch(1);

  console.log(`Consumer listening on queue "${queue}"...`);

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {
      await listener.listen(msg);
      channel.ack(msg);
    } catch (error) {
      console.error("Gagal memproses message:", error.message);
      channel.ack(msg);
    }
  });
};

startConsumer();
