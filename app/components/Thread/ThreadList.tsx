import { useLoaderData, useNavigate, } from "@remix-run/react";
import { FC } from "react";
import Thread from "~/classes/Thread";

const ThreadList: FC<{}> = () => {
    const { threads } = useLoaderData();
    const nav = useNavigate();

    const onCLickHandler = (threadId: string) => {
        nav(`threads/${threadId}`);
    }

    return (<>
        <table className="threadList">
            {threads.map((thread: Thread) => {
                return (
                    <tr key={thread._id} className="threadRow" >
                        <td className="threadCategory">
                            {thread.category}
                        </td>
                        <td className="threadTitle" onClick={() => { onCLickHandler(thread._id) }}>
                            {thread.title}
                        </td>
                    </tr>
                );
            })}
        </table>
    </>);
}

export default ThreadList;