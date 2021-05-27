import { GetStaticProps, NextPage } from 'next';
import { usePosts } from '../../hooks/usePosts';
import { useCallback } from 'react';
import { getPosts } from '../../lib/posts';
import Link from 'next/link';

type Post = {
  id: string;
  date: string;
  title: string;
  content: string;
  htmlContent: string;
}


type Props = {
  posts: Post[];
}
const PostsIndex: NextPage<Props> = (props) => {
  const { posts } = props;

  return (
    <div>
      <h1>文章列表</h1>
      {posts.map(p => <div key={p.id}>
        <Link href={`/posts/${p.id}`}>
          <a>
            {p.id}
          </a>
        </Link>
      </div>)}
    </div>
  );
};

export default PostsIndex;

export const getStaticProps = async () => {
  const posts = await getPosts();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    }
  };
};
