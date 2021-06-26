import Image from 'next/image'
import Link from 'next/link';
import styled from 'styled-components'

const TabWrapper = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    a{
        border-bottom: 1px solid #8BC264;
    }
    .block{
      margin-left: 5px;
    }
    .index-icon{
        width: 28px;
    }
`

type Props = {
    id: number;
    href: string;
    name?: string;
    currentIndex: number;
    alt: string;
    text: string;
    width?: number;
    height?: number;
    changeIndex: (e: number) => void
}
const OptionsItem = (props: Props) => {
    const { name, alt, width = 48, height = 22, href, text, currentIndex, id, changeIndex } = props
    return (
        <TabWrapper onClick={() => { changeIndex(id) }}>
            <div className="index-icon">
                {currentIndex === id && <Image {...{ src: `/index.svg`, alt, width: 20, height: 18 }} />}
            </div>
            <Link {...{ href }}><a className='block'>{text}</a></Link>
            {name && <Image {...{ src: `/${name}.svg`, alt, width, height }} />}
        </TabWrapper>
    );
};
export default OptionsItem;

