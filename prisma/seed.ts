import { PrismaClient } from '@prisma/client'
// import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {

  // await prisma.todo.createMany({
  //   data: Array.from({ length: 20 }, () => {
  //     return {
  //       title: faker.lorem.words({ min: 2, max: 5 }),
  //       body: faker.lorem.words({ min: 1, max: 10 }),
  //       user_id:"user_2hqRielRkVneOqQ7qBp3mXLug18"
  //     }
  //   })
  // })
}

// main()
//   .catch(async (e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })