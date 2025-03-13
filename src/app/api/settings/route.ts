import { NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

import { auth } from '@/auth';

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const data = await req.json();
    const { name, bio } = data;

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name: name,
        bio: bio,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}

export async function GET(_req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        name: true,
        bio: true,
      },
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
