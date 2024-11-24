import prisma from "../../../utils/prisma";

// GET /api/filterPosts?searchString=:searchString
export default async function handle(req, res) {
  if (!req.query) {
    return res.status(400).json({ error: "Query parameters are required" });
  }

  const { searchString } = req.query;

  if (!searchString) {
    return res
      .status(400)
      .json({ error: "searchString query parameter is required" });
  }

  try {
    const resultPosts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
    res.json(resultPosts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
