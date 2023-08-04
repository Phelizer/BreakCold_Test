// TODO: add a 5 sec delay
export async function mockedAPI() {
  return await fetch("https://jsonplaceholder.typicode.com/posts");
}
