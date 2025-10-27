import { buildApp } from './app'

async function start() {
  const HOST = '0.0.0.0'
  const app = await buildApp()
  try{
    await app.listen({ port: 3000, host: HOST }).then(() =>{
      console.log(`Server is running on http://${HOST}:3000`)
   })
  }catch(err)
  {
    //app.log.error(err);
    process.exit(1);
  }
}

start()

//npx ts-node src/main.ts