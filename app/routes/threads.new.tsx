import { ActionFunction, LoaderFunction } from "@remix-run/node";
import NewThreadForm from "~/components/Thread/NewThreadForm";
import { requireUserSession } from "~/data/user.server";
import sharedStyles from '~/styles/FormStyles.css';

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserSession(request);
  return userId;
}

const NewThreadPage = () => {
  return (<>
    <NewThreadForm />
  </>);
}

export default NewThreadPage;

export const action: ActionFunction = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  
  return null;
}

export function links() {
  return [{
    rel: 'stylesheet',
    href: sharedStyles
  }];
}