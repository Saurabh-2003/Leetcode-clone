import { db } from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {

        const body = await request.json();
        const { userName } = body;

        if (!userName) {
            return new NextResponse("Missing Username", { status: 402 });
        }

        const user = await db.user.findUnique({
            where: {
                username: userName
            }
        })


        if (!user) {
            return new NextResponse("invalid username", { status: 400 });
        }

        const submissions = await db.submission.findMany({
            where: {
                userId: user?.id
            }
        })
        if (!submissions.length) {
            return new NextResponse("No submissions found", { status: 404 });
        }

        // Fetch problem titles for each submission
        const problemTitles = await Promise.all(
            submissions.map(async (submission) => {
                const problem = await db.problem.findUnique({
                    where: {
                        id: submission.problemId
                    },
                    select: {
                        title: true
                    }
                });

                return problem?.title;
            })
        );

        return NextResponse.json({ submissions, problemTitles });
    }
    catch (error) {
        console.log(error, "Error");
        return new NextResponse('internal error', { status: 500 })
    }
}


export async function PATCH(
    request: Request
) {
    try {
        const body = await request.json();
        const { userName, code, status, problemId } = body;
        console.log(userName)
        if (!userName) {
            return new NextResponse("Missing Username", { status: 402 });
        }

        const user = await db.user.findUnique({
            where: {
                username: userName
            }
        })

        if (!user) {
            return new NextResponse("Missing User", { status: 402 });
        }

        const submission = await db.submission.create({
            data: {
                id: uuidv4(),
                code,
                status,
                createdAt: new Date(),
                userId: user.id,
                problemId
            }
        })

        const problem = await db.problem.findUnique({
            where: {
                id: problemId
            }
        })

        if (!problem) {
            return new NextResponse("ProblemID doesnt exist", { status: 402 });
        }

        const dif = problem.difficulty;
        if (status == "ACCEPTED") {
            if (dif == "EASY") { user.easySolved+=1; console.log(user.easySolved)} 
            else if (dif == "MEDIUM") { user.mediumSolved+=1; }
            else { user.hardSolved+=1; }

        }
        const updatedUser = await db.user.update({
            where: {
                id: user.id
            },
            data: {
                easySolved: user.easySolved,
                mediumSolved: user.mediumSolved,
                hardSolved: user.hardSolved
            }
        });


        return NextResponse.json(submission);
    }
    catch (error) {
        console.log(error, "Error");
        return new NextResponse('internal error', { status: 500 })
    }
}

