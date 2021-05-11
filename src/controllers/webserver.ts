import app from "../app";

const PORT: number = parseInt(process.env.PORT as string, 10);

if (!process.env.PORT) {
  process.exit(1);
}
app.listen(PORT, () => {
  return console.log(`server is listening on ${PORT}!`);
});
