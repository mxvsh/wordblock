import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const channelData: Prisma.ChannelCreateInput[] = [
  {
    channelId: "12343frfr435545",
  },
  {
    channelId: "1234rfrf3435545",
  },
  {
    channelId: "123434rfrf35545",
  },
  {
    channelId: "12ffrf45",
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of channelData) {
    const channel = await prisma.channel.create({
      data: u,
    })
    console.log(`Created channel with id: ${channel.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
