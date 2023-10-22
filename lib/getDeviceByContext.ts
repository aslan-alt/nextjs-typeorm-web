import {GetServerSideProps} from 'next';
import {UAParser} from 'ua-parser-js';

export const getDeviceByContext: GetServerSideProps = async (context) => {
  const userAgentString = context.req.headers['user-agent'];
  const result = new UAParser(userAgentString).getResult();
  const deviceType = result.device.type;
  const osName = result.os.name;
  const browserName = result.browser.name;

  // 判断设备类型
  const isPhone = (() => {
    const notIsPC = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgentString ?? ''
    );
    return (
      deviceType === 'mobile' ||
      notIsPC ||
      osName === 'iOS' ||
      (osName === 'Android' && browserName === 'Chrome Mobile')
    );
  })();

  // 进一步根据操作系统和浏览器信息判断

  return {
    props: {
      isPhone,
    },
  };
};
