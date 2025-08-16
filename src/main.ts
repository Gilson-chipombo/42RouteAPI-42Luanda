import { buildApp } from './app'

async function start() {
  const app = await buildApp()
  await app.listen({ port: 3000 }).then(() =>{
    console.log('Server is running on http://localhost:3000')
  })
}

start()

//npx ts-node src/main.ts