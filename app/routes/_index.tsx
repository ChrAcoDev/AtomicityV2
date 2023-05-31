import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { FC } from "react";
import Thread from "~/classes/Thread";
import ThreadContainer from "~/components/Thread/ThreadContainer";
import { getUserFromSession } from "~/data/user.server";

const DUMMY_CATEGORIES: string[] = ["One", "Two", "Three", "Four"];

interface LoaderData {
  threads: Thread[],
  userId: string | null
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserFromSession(request);
  return json<LoaderData>({
    threads: [
      {
        _id: "1",
        title: 'string',
        category: 'string',
        text: 'string',
      }, {
        _id: "2",
        title: 'string 2',
        category: 'string 2',
        text: 'string 2',
      }, {
        _id: "3",
        title: 'string 3',
        category: 'string 3',
        text: 'string 3',
      }, {
        _id: "4",
        title: 'string 4',
        category: 'string 4',
        text: 'string 4',
      },
    ],
    userId
  });
}

const Index: FC<{}> = () => {
  const { userId } = useLoaderData();
  return (<>
    {!userId && <div className="loginPrompt">
      <p>You are not logged on. Feel free to <Link to='/auth?mode=login'>Log in</Link> or <Link to='/auth?mode=signup'>Sign Up</Link></p>
    </div>}
    <div className="grid-container">
      <div>
        {DUMMY_CATEGORIES.map(category => {
          return (<div key={category}>
            <ThreadContainer category={category} />
          </div>);
        })}
      </div>
      {userId && <div>
        <Link id="login-button" to="/threads/new">Start a new Thread</Link>
      </div>}

    </div>
  </>);
}

export default Index;