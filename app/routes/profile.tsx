import { LoaderFunction } from "@remix-run/node";
import { requireUserSession } from "~/data/user.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserSession(request);
  return userId;
}

const Profile = () => {
  return (<>
    <p>Profile</p>

  </>);
}

export default Profile;