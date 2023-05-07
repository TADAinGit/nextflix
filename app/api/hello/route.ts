export async function GET(request: Request) {
  const test = process.env.TMDB_API;
  console.log(test);
  return new Response("Hello, Next.js!");
}
