import prisma from "../../../utils/prisma";

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const result = await prisma.user.create({
      data: {
        ...req.body,
      },
    });
    res.json(result);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
