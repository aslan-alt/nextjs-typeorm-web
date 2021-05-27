import { GetServerSideProps, NextPage } from 'next';
import { UAParser } from 'ua-parser-js';
import { useEffect, useState } from 'react';
import { getDatabaseConnection } from '../lib/getDatabaseConnection';
import { Post } from 'src/entity/Post';

type Props = {
  browser: {
    name: string;
    version: string;
    major: string;
  },
  posts: string;
}
const index: NextPage<Props> = (props) => {
  const { browser, posts } = props;
  const [width, setWidth] = useState(0);
  const data: Post[] = JSON.parse(posts)

  useEffect(() => {
    const w = document.documentElement.clientWidth;
    setWidth(w);
  }, []);
  return (
    <div>
      <h1>你的浏览器是:ssss {browser.name}</h1>
      <h2>你的浏览器窗口大小是: {width} 像素</h2>
      {data.map(item => {
        return (
          <div key={item.id}>
            <div>{item.id + ':' + item.title}</div>
            <div>{item.author}</div>
            <div>{item.content}</div>
          </div>
        )
      })
      }
    </div>
  );
};
export default index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connect = await getDatabaseConnection()

  const posts = await connect.manager.find(Post)

  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts: JSON.stringify(posts)
    }
  };
};
