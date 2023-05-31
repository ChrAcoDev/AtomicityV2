import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { FC } from "react";
import NAVIGATION_CONSTANTS from "~/constants/NAVIGATION_CONSTANTS";

const NewThreadForm: FC<{}> = () => {
    const isLoading: boolean = useNavigation().state === NAVIGATION_CONSTANTS.LOADING;
    const userId = useLoaderData();
    return (<div className=".auth-form">
        <Form method="post">
            <div className="auth-fields">
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" required /> <br />
                </div>
                <div>
                    <label htmlFor="title">Category</label>
                    <select name="cars" id="cars">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select> <br />
                </div>
                <div>
                    <textarea id="content" name="content" required /> <br />
                </div>
            </div>
            <input type="hidden" name="userId" value={userId} />
            {!isLoading && <button className="auth-submit">Submit</button>}
        </Form>
    </div>);
}

export default NewThreadForm;