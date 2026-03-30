import { prisma } from "../src/lib/prisma";
import bcrypt from "bcrypt";
import config from "../src/config";
import { USER_ROLE } from "../src/modules/User/user.utils";

async function main() {
  const adminEmail = "admin@gmail.com";
  const adminPassword = "password123";

  // check if admin already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingAdmin) {
    console.log("Admin already exists!");
    return;
  }

  // hash password
  const hashedPassword = await bcrypt.hash(
    adminPassword,
    Number(config.bcrypt_salt_rounds),
  );

  // create admin
  const admin = await prisma.user.create({
    data: {
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: USER_ROLE.ADMIN, // ✅ FIXED
    },
  });

  console.log("✅ Admin created successfully:", admin.email);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
