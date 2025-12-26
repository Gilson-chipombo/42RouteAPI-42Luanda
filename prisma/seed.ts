import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();


// Função para gerar coordenadas aleatórias em Luanda
function generateLuandaCoordinates() {
  const lat = faker.number.float({ min: -9.0, max: -8.6 });
  const long = faker.number.float({ min: 13.0, max: 13.5 });
  return { lat, long };
}

async function main() {
  console.log("🌱 Seeding database...");

  // 🔥 Limpa tudo (ordem importa por causa das FKs)
  //await prisma.message.deleteMany();
  await prisma.driverCoordinates.deleteMany();
  await prisma.routeStops.deleteMany();
  await prisma.cadetes.deleteMany();
  await prisma.drivers.deleteMany();
  await prisma.routes.deleteMany();
  await prisma.miniBusStop.deleteMany();
  await prisma.admins.deleteMany();

  // 👮 Admin
  await prisma.admins.create({
    data: {
      full_name: "Admin Geral",
      username: "admin",
      email: "admin@email.com",
      passwrd: "123456"
    }
  });

  // 🚏 Paragens
  const stops = await Promise.all(
    Array.from({ length: 40 }).map(() =>
      prisma.miniBusStop.create({
        data: {
          stop_name: faker.location.street(),
          distrit: faker.location.city(),
          latitude: faker.number.float({ min: -9.0, max: -8.6 }),
          longitude: faker.number.float({ min: 13.0, max: 13.5 })
        }
      })
    )
  );

  // 🛣️ Rotas
  const route = await prisma.routes.create({
    data: {
      route_name: "Rota Principal",
      description: "Rota central da cidade"
    }
  });

  // Liga paragens à rota
  await Promise.all(
    stops.map((stop, index) =>
      prisma.routeStops.create({
        data: {
          route_id: route.id,
          stop_id: stop.id,
          position: index + 1
        }
      })
    )
  );

  // 🚗 Motoristas
  const drivers = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.drivers.create({
        data: {
          full_name: faker.person.fullName(),
          username: faker.internet.username(),
          email: faker.internet.email(),
          passwrd: "123456",
          phone: faker.number.int({ min: 900000000, max: 999999999 }),
          current_route_id: route.id
        }
      })
    )
  );

  // 📍 Coordenadas dos motoristas
  await Promise.all(
    drivers.map(driver =>
      prisma.driverCoordinates.create({
        data: {
          lat: faker.number.float({ min: -9.0, max: -8.6 }),
          long: faker.number.float({ min: 13.0, max: 13.5 }),
          id_driver: driver.id
        }
      })
    )
  );

  // 🎓 Cadetes
  const cadetes = await Promise.all(
    Array.from({ length: 6 }).map(() =>
      prisma.cadetes.create({
        data: {
          full_name: faker.person.fullName(),
          username: faker.internet.username(),
          email: faker.internet.email(),
          city: faker.location.city(),
          distrit: faker.location.city(),
          phone: faker.number.int({ min: 900000000, max: 999999999 }),
          passwrd: "123456",
          stop_id: faker.helpers.arrayElement(stops).id
        }
      })
    )
  );

  // 💬 Mensagens
  await prisma.message.create({
    data: {
      id_driver: drivers[0].id,
      id_cadete: cadetes[0].id,
      message: "Estou a caminho."
    }
  });

  console.log("✅ Seed concluído!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
