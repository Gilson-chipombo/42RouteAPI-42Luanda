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
  await prisma.message.deleteMany();
  await prisma.driverCoordinates.deleteMany();
  await prisma.routeStops.deleteMany();
  await prisma.cadetes.deleteMany();
  await prisma.drivers.deleteMany();
  await prisma.route.deleteMany();
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

  // 🚏 Paragens (20 paragens em Luanda)
  const stops = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      prisma.miniBusStop.create({
        data: {
          stop_name: faker.location.street(),
          distrit: faker.location.city(),
          latitude: faker.number.float({ min: -9.0, max: -8.6 }),  // Latitude entre -9.0 e -8.6
          longitude: faker.number.float({ min: 13.0, max: 13.5 })  // Longitude entre 13.0 e 13.5
        }
      })
    )
  );

  // 🛣️ Rotas (4 rotas)
  const routes = await Promise.all(
    Array.from({ length: 4 }).map(() =>
      prisma.route.create({
        data: {
          route_name: faker.lorem.word(),
          description: faker.lorem.sentence()
        }
      })
    )
  );

  // Cada rota vai ter paragens (5 paragens aleatórias por rota)
  await Promise.all(
    routes.map((route) =>
      Promise.all(
        stops
          .slice(0, 5) // Usa 5 paragens por rota
          .map((stop, index) =>
            prisma.routeStops.create({
              data: {
                route_id: route.id,
                stop_id: stop.id,
                position: index + 1
              }
            })
          )
      )
    )
  );

  // 🚗 Motoristas (6 motoristas) com coordenadas de Luanda
  const drivers = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.drivers.create({
        data: {
          full_name: faker.person.fullName(),
          username: faker.internet.username(),
          email: faker.internet.email(),
          passwrd: "123456",
          phone: faker.number.int({ min: 900000000, max: 999999999 }),
          current_route_id: faker.helpers.arrayElement(routes).id
        }
      })
    )
  );

  // 📍 Coordenadas dos motoristas em Luanda
  await Promise.all(
    drivers.map(driver =>
      prisma.driverCoordinates.create({
        data: {
          lat: faker.number.float({ min: -9.0, max: -8.6 }), // Latitude entre -9.0 e -8.6
          long: faker.number.float({ min: 13.0, max: 13.5 }), // Longitude entre 13.0 e 13.5
          id_driver: driver.id
        }
      })
    )
  );

  // 🎓 Cadetes (500 cadetes)
  const cadetes = await Promise.all(
    Array.from({ length: 50  }).map(() =>
      prisma.cadetes.create({
        data: {
          full_name: faker.person.fullName(),
          username: faker.internet.username(),
          email: faker.internet.email(),
          city: faker.location.city(),
          distrit: faker.location.city(),
          phone: faker.number.int({ min: 900000000, max: 999999999 }),
          passwrd: "123456",
          stop_id: faker.helpers.arrayElement(stops).id // Associa cada cadete a uma paragem
        }
      })
    )
  );

  // 💬 Mensagens (gerando algumas mensagens para cadetes e motoristas)
  await prisma.message.create({
    data: {
      id_driver: drivers[0].id,
      id_cadete: cadetes[0].id,
      message: "Estou a caminho da próxima paragem."
    }
  });

  console.log("✅ Seed concluído!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
