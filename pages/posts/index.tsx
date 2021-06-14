import { NextPage, GetServerSideProps } from 'next';
import qs from 'querystring'
import Link from 'next/link';
import { getDatabaseConnection } from 'lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';
import { UAParser } from 'ua-parser-js';




type Props = {
  browser: {
    name: string;
    version: string;
    major: string;
  },
  posts: string;
  count: number
}
const index: NextPage<Props> = (props) => {
  const { posts, count } = props;
  const data: Post[] = JSON.parse(posts)
  return (
    <ul>
      文章列表 :{count}
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
    </ul>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connect = await getDatabaseConnection()
  const index = context.req.url.indexOf('?')
  const search = context.req.url.substr(index + 1)
  const pageNumber = parseInt(qs.parse(search).page.toString())
  const perPage = 3
  const [posts, count] = await connect.manager.findAndCount(Post, { skip: (pageNumber - 1) * perPage, take: perPage })


  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts: JSON.stringify(posts),
      count
    }
  };
};

