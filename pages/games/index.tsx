import { NextPage } from 'next';

import styled from 'styled-components'

const TabWrapper = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    a{
        border-bottom: 1px solid #8BC264;
    }
`
type Props = {
    href: string;
    name: string;
    alt: string;
    text: string;
    width?: number;
    height?: number;
}
const OptionsItem: NextPage<Props> = (props) => {
    const { name, alt, width = 26, height = 18, href, text } = props
    return (
        <div>游戏页面首页</div>
    );
};
export default OptionsItem;

