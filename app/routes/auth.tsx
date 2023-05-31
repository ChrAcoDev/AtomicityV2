import { ActionFunction } from "@remix-run/node";
import { FC } from "react";
import LoginForm from "~/components/Login/LoginForm";
import AUTH_CONSTANTS from "~/constants/AUTH_CONSTANTS";
import { createNewUser, loginUser } from "~/data/user.server";
import { validateLoginCredentials, validateNewUserCredentials } from "~/data/validation.server";
import sharedStyles from '~/styles/FormStyles.css';

const AuthPage: FC<{}> = () => {
    return (<>
        <LoginForm />
    </>);
}

export default AuthPage;

export const action: ActionFunction = async ({ request }) => {
    const { username, password, confirmPassword } = Object.fromEntries(await request.formData());
    let errList: string[];
    const searchParams = new URL(request.url).searchParams;
    const authMode = searchParams.get(AUTH_CONSTANTS.MODE) || AUTH_CONSTANTS.LOGIN;

    if (authMode === AUTH_CONSTANTS.LOGIN) {
        errList = await validateLoginCredentials(username + "", password + "");
        if (errList.length > 0) {
            return errList;
        }
        return await loginUser(username + "", request);
    } else {
        errList = await validateNewUserCredentials(username + "", password + "", confirmPassword + "");
        if (errList.length > 0) {
            return errList;
        }
        return await createNewUser(username + "", password + "", request);
    }
}

export function links() {
    return [{
        rel: 'stylesheet',
        href: sharedStyles
    }];
}