import React from 'react';
import Image from 'next/image';
import {friendlyDate} from 'lib';

interface Props {
  comments?: CommentItem[];
}

export default function MessageList(props: Props) {
  const {comments} = props;
  return (
    <>
      {comments?.map((item) => {
        return (
          <div key={item.id} className="message-item">
            <div className="title-time-wrapper">
              <Image src="/avatars.jpg" alt="avatars" />
              <div className="nickname">{item.nickname}</div>
            </div>
            <div className="content-wrapper">
              <span className="create-time">{friendlyDate(item.createdAt)}</span>
              <div className="content">{item.content}</div>
            </div>
          </div>
        );
      })}
    </>
  );
}
