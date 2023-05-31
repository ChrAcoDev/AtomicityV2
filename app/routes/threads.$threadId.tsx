import { Link, useParams } from "@remix-run/react";

const Thread = () => {
    const { threadId } = useParams();

    return (<>
        <p>thread {threadId}</p>
    </>);
}

export default Thread;