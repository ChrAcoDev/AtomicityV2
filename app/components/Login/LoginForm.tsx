import { Form, Link, useActionData, useNavigation, useSearchParams } from "@remix-run/react";
import { FC } from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AUTH_CONSTANTS from "~/constants/AUTH_CONSTANTS";
import NAVIGATION_CONSTANTS from "~/constants/NAVIGATION_CONSTANTS";
import Alert from "../UI/Alert";

const LoginForm: FC<{}> = () => {
    const isLogin: boolean = useSearchParams()[0].get('mode') === AUTH_CONSTANTS.LOGIN;
    const isLoading: boolean = useNavigation().state === NAVIGATION_CONSTANTS.LOADING;
    const errList: string[] | undefined = useActionData();

    return (<>
        {errList &&  <Alert errList={errList} />}
        <div className="auth-form">
            <div className="auth-icon">
                {isLogin ? <FontAwesomeIcon icon={faCircleUser} size="2xl" /> : <FontAwesomeIcon icon={faUserPlus} size="2xl" />}
            </div>
            <Form method="post">
                <div className="auth-fields">
                    <div>
                        <label htmlFor="username">Email Address</label>
                        <input type="email" id="username" name="username" required /> <br />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" required /> <br />
                    </div>
                    {!isLogin && <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required /> <br />
                    </div>}
                </div>
                {!isLoading && <button className="auth-submit">{isLogin ? 'Login' : 'Sign Up'}</button>}
                {isLoading && <p>{isLogin ? 'Authenticating...' : 'Signing Up...'}</p>}
            </Form >
            {isLogin && <p>New to this site? <Link to={`?mode=${AUTH_CONSTANTS.SIGN_UP}`}>Sign Up Here</Link></p>}
            {!isLogin && <p>Already have an account? <Link to={`?mode=${AUTH_CONSTANTS.LOGIN}`}>Log In</Link></p>}
        </div >
    </>);
}

export default LoginForm;