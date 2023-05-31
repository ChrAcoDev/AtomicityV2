import { redirect } from "@remix-run/node";
import { prisma } from "./database.server"
import { hash } from 'bcrypt';
import ROUTE_CONSTANTS from "~/constants/ROUTE_CONSTANTS";
import { commitSession, destroySession, getSession } from '~/sessions';

export async function destroyUserSession(request: globalThis.Request) {
    const session = await getSession(
        request.headers.get('Cookie')
    );
    return redirect('/', {
        headers: {
            'Set-Cookie': await destroySession(session)
        }
    })
};

export async function requireUserSession(request: globalThis.Request) {
    const userId = await getUserFromSession(request);
    if (!userId) {
        throw redirect('/auth?mode=login');
    }
    return userId;
}

export async function getUserFromSession(request: any) {
    const session = await getSession(
        request.headers.get('Cookie')
    );
    const userId = session.get('userId');
    if (!userId) {
        return null;;
    }
    return userId;
}

export const createNewUser = async (username: string, password: string, request: globalThis.Request) => {
    const session = await getSession(
        request.headers.get('Cookie')
    );
    const hashedPassword = await hash(password, 12);
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });
        session.set('userId', newUser.id);
        return redirect(ROUTE_CONSTANTS.HOME_PAGE, {
            headers: {
                'Set-Cookie': await commitSession(session)
            }
        });
    } catch (err) {
        console.log(err);
    }
};

export const loginUser = async (username: string, request: globalThis.Request) => {
    const session = await getSession(
        request.headers.get('Cookie')
    );
    try {
        const foundUser = await prisma.user.findFirst({
            where: {
                username
            }
        });
        if (!foundUser) {
            throw new Error("User/Password is not found");
        }
        session.set('userId', foundUser.id);
        return redirect(ROUTE_CONSTANTS.HOME_PAGE, {
            headers: {
                'Set-Cookie': await commitSession(session)
            }
        });
    } catch (err) {
        throw err;
    }
}