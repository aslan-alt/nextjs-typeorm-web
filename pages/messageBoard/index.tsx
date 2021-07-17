import { GetServerSideProps, NextPage } from 'next';
import { Modal } from 'antd'
import deepClone from 'lib/deepClone';
import Square from 'components/Square'
import { Comment } from 'src/entity/Comment';
import { MessageWrapper } from 'styles/messageBoardStyle'
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import MessageList from 'components/MessageBard/MessageList';
import AddMessage from 'components/MessageBard/AddMessage';
import { UAParser } from 'ua-parser-js';

type Props = {
    leaveMessageList: CommentItem[],
    result: IUAParser.IResult
}

const messageBoard: NextPage<Props> = (props) => {
    const { leaveMessageList, result } = props
    const [modal, contextHolder] = Modal.useModal();
    const left = result?.device?.model ? 105 : 100
    return (
        <MessageWrapper>
            {contextHolder}
            <img className="background-img" src="/ying.jpg" alt="" />
            <div className="message-list">
                <Square {...{ top: 5, left }} />
                <MessageList {...{ leaveMessageList }} />
            </div>
            <AddMessage {...{ modal }} />
        </MessageWrapper>
    );
};
export default messageBoard;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const ua = context.req.headers['user-agent'];
    const result = new UAParser(ua).getResult();

    const connect = await getDatabaseConnection()
    let found: Comment[] = []
    try {
        found = (await connect.manager.find(Comment)).sort(function (a, b) { return a.createdAt < b.createdAt ? 1 : -1 })
    } catch (e) {
    }
    return {
        props: {
            leaveMessageList: deepClone(found),
            result: deepClone(result)
        }
    };
};

