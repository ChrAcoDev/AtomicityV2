import { FC } from "react";

interface AlertProps {
    errList: string[],
}

const Alert: FC<AlertProps> = ({ errList }) => {

    return (<>
        <div className="alert">
            {errList.map(err => {
                return (<>
                    <p>{err}</p>
                </>);
            })}
        </div>
    </>);
}


export default Alert;