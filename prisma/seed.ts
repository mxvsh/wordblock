import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const channelData: Prisma.ChannelCreateInput[] = [
  {
    channel_Id: "12343frfr435545",
  },
  {
    channel_Id: "1234rfrf3435545",
  },
  {
    channel_Id: "123434rfrf35545",
  },
  {
    channel_Id: "12ffrf45",
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
