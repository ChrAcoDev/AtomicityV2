import { createCookieSessionStorage } from "@remix-run/node";

const SESSION_SECRET: string = process.env.SESSION_SECRET ? process.env.SESSION_SECRET : "";


type SessionData = {
    userId: string;
};

type SessionFlashData = {
    error: string;
};

export const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        secrets: [SESSION_SECRET],
        sameSite: 'lax',
        maxAge: 2592000,
        httpOnly: true,
        path: '/'
    }
});