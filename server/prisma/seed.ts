import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    await prisma.widget.createMany({
        data: [
            {
                title: "Notes",
                description: "Seeded widget",
            },
            {
                title: "Stats",
                description: "Another widget",
            },
        ],
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })