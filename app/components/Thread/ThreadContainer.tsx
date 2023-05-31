import { FC } from "react";
import Thread from "~/classes/Thread";
import ThreadList from "./ThreadList";

interface ThreadContainerProps {
    category: string
}

const ThreadContainer: FC<ThreadContainerProps> = ({ category }) => {

    return (<div className="threadContainer">
        <h1>{category}</h1>
        <ThreadList />
    </div>);
}

export default ThreadContainer;