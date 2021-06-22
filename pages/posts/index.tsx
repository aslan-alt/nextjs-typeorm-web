import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next';
import qs from 'querystring'
import Link from 'next/link';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import usePager from 'hooks/usePager';

type Props = {
  posts: string;
  totalPage: number;
  pageNumber: number;
}

const index: NextPage<Props> = (props) => {
  const { posts, totalPage, pageNumber } = props;
  const data: Post[] = JSON.parse(posts)
  const { pager } = usePager({ totalPage, pageNumber })

  return (
    <div>
      {data.map(item => {
        return (
          <li key={item.id}>
            <Link href={`/posts/${item.id}`} as={`/posts/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </li>
        )
      })
      }
      <footer>
        页脚
        {pager}
      </footer>
    </div>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const connect = await getDatabaseConnection()
  const index = context.req.url.indexOf('?')
  const search = context.req.url.substr(index + 1)
  const pageNumber = parseInt(qs.parse(search).page?.toString()) || 1
  const perPage = 3

  const [posts, count] = await connect.manager.findAndCount(Post, { skip: (pageNumber - 1) * perPage, take: perPage })
  const totalPage = Math.ceil(count / perPage)
  return {
    props: {
      posts: JSON.stringify(posts),
      totalPage,
      perPage,
      pageNumber
    }
  };
};

