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


const OptionsItem = (props: IconItem) => {
    const { name, width = 48, height = 22, href, text, currentIndex, id, changeIndex } = props
    return (
        <TabWrapper onClick={() => { changeIndex(id) }}>
            <div className="index-icon">
                {currentIndex === id && <Image {...{ src: `/index.svg`, alt: name, width: 20, height: 18 }} />}
            </div>
            <Link {...{ href }}><a className='block'>{text}</a></Link>
            {name && <Image {...{ src: `/${name}.svg`, alt: name, width, height }} />}
        </TabWrapper>
    );
};
export default OptionsItem;

