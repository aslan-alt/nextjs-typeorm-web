import React from 'react';
import {isNumber} from 'lodash';
import {NextPage, GetServerSideProps} from 'next';
import Link from 'next/link';
import {Post} from '@database/entity/Post';
import {getConnection} from '@database/getConnection';

type Props = {
  post: string;
};
const PostsShow: NextPage<Props> = (props) => {
  const {post} = props;
  const data: Post = JSON.parse(post);
  return (
    <div>
      <h1>{data.title}</h1>
      <div>{data.content}</div>

      <Link href={`/posts/[id]/edit`} as={`/posts/${data.id}/edit`} legacyBehavior>
        <a>编辑</a>
      </Link>
    </div>
  );
};

export default PostsShow;

export const getServerSideProps: GetServerSideProps<any, {id: string}> = async (context) => {
  const id = context.params?.id;

  const connection = await getConnection();

  return {
    props: {
      post: isNumber(id) ? await connection.manager.findOne(Post, {where: {id}}) : {},
    },
  };
};
