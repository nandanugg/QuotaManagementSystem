import fastify from "fastify";

const server = fastify({
  logger: true,
});

server.get("/", async (_, reply) => {
  reply.send("Hello, world!");
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
