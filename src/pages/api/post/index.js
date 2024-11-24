// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content

import prisma from "../../../../utils/prisma";

export default async function handle(req, res) {
    console.log("req.body: ", req.body);

    const { title, content, authorEmail } = req.body
    const result = await prisma.post.create({
        data: {
            title: title,
            content: content,
            author: { connect: { email: authorEmail } },
        },
    })
    res.json(result)
}

/*   
The connect operation is used to associate a Post with an Author in a Prisma database. It establishes a relationship between the Post and the Author by connecting them based on a specified condition.

In this specific code:

author is a relation field in the Post model, which indicates that a Post is associated with an Author.

{ connect: { email: authorEmail } } specifies how to connect the Post to an Author. It means that the Author associated with the Post must have an email value matching the provided authorEmail.

Here's what's happening in this code:

You are creating a new Post using prisma.post.create. The data object contains the fields for the new post.

In the author field, you use the connect operation to specify how to associate this post with an author. You provide the email of the author you want to connect to.

Prisma will perform a query to find the Author with the specified email, and then it associates the Post with that Author. This establishes the relationship between the Post and the Author in the database.

So, the connect operation is a way to create or update relationships between records in Prisma, allowing you to define how different models are connected in your database. In this case, it's used to link a Post to its respective Author based on the author's email.


*/