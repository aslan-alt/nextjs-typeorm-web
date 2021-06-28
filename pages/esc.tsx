import { NextPage } from 'next';
import { useEffect } from 'react';

import styled from 'styled-components'

type Props = {

}
const Esc: NextPage<Props> = (props) => {
    useEffect(() => {
        if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
            window.location.href = "about:blank";
            window.close();
        } else {
            window.opener = null;
            window.open("", "_self");
            window.close();
        }
    }, [])
    return (
        <></>
    );
};
export default Esc;

