import { NextPage, GetServerSideProps } from 'next';
import qs from 'querystring'
import Link from 'next/link';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import { UAParser } from 'ua-parser-js';
import usePager from 'hooks/usePager';




type Props = {
  browser: {
    name: string;
    version: string;
    major: string;
  },
  posts: string;
  totalPage: number;
  pageNumber: number;
}
const index: NextPage<Props> = (props) => {
  const { posts, totalPage, pageNumber } = props;
  const data: Post[] = JSON.parse(posts)
  const { pager } = usePager({
    totalPage, pageNumber
  })
  return (
    <ul>

      {data.map(item => {
        return (
          <li>
            <Link key={item.id} href={`/posts/${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </li>
        )
      })
      }
      <footer>
        {pager}
      </footer>
    </ul>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connect = await getDatabaseConnection()
  const index = context.req.url.indexOf('?')
  const search = context.req.url.substr(index + 1)
  console.log('search------')
  console.log(search)
  const pageNumber = parseInt(qs.parse(search).page?.toString()) || 1
  const perPage = 3

  const [posts, count] = await connect.manager.findAndCount(Post, { skip: (pageNumber - 1) * perPage, take: perPage })
  const totalPage = Math.ceil(count / perPage)

  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts: JSON.stringify(posts),
      totalPage,
      perPage,
      pageNumber
    }
  };
};

