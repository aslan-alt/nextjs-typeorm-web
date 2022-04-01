import React from 'react';
import {NextPage, GetServerSideProps} from 'next';
import Link from 'next/link';
import {getDatabaseConnection} from 'lib/getDatabaseConnection';
import {Post} from 'src/entity/Post';

type Props = {
  post: string;
};
const postsShow: NextPage<Props> = (props) => {
  const {post} = props;
  const data: Post = JSON.parse(post);
  return (
    <div>
      <h1>{data.title}</h1>
      <div>{data.content}</div>
      <div>{data.author}</div>
      <div>{data.createdAt}</div>
      <Link href={`/posts/[id]/edit`} as={`/posts/${data.id}/edit`}>
        <a>编辑</a>
      </Link>
    </div>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<any, {id: string}> = async (context) => {
  const id = context.params?.id;

  const connection = await getDatabaseConnection();
  const post = await connection.manager.findOne(Post, id);

  return {
    props: {
      post: JSON.stringify(post || {}),
    },
  };
};
