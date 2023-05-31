import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import MainHeader from "~/components/UI/MainHeader";
import sharedStyles from '~/styles/RootStyles.css';
import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { getUserFromSession } from "./data/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserFromSession(request);
  return userId;

};

export default function App() {
  const userId = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body >
        <MainHeader isLoggedOn={!!userId} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [{
    rel: 'stylesheet',
    href: sharedStyles
  }];
}

export const meta: V2_MetaFunction = () => {
  return [{
    title: 'Atomicity V2'
  }];
}

export function ErrorBoundary() {
  return (
    <html lang="en">
      <head>
        <title>Atomicity V2: Something went wrong</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body >
        <p>Something went wrong</p>
        <Link to="/">Navigate to safety</Link>
        <ScrollRestoration />
        <LiveReload />
      </body>
    </html>
  );
}