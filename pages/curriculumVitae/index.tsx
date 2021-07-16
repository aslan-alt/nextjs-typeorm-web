import { NextPage } from 'next';
import styled from 'styled-components'


const TabWrapper = styled.label``;


type Props = {

}
const CvWrapper = styled.div`
    width: 820px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    .cv-head{
        color: white;
        border: 1px solid red;
        display: flex;
        align-items: flex-end;
        background: #244664;
        img{
            margin:16px;
            max-width:120px ;
        }
        .basic-info{
            margin-bottom: 16px;
        }
        .title{
            font-size: 18px;
            padding: 5px 10px;
           
        }
        .item{
            font-size: 12px;
           
            padding: 5px 10px;
        }
    }
    .cv-main{
        border: 1px solid red;
        flex-grow: 1;
    }
    @media (max-width: 600px) {
        width: 100vw;
    }
`;


const OptionsItem: NextPage<Props> = (props) => {
    return (
        <CvWrapper>
            <div className="cv-head">
                <img src="/cv.jpg" alt="" />
                <div className="basic-info">
                    <div className="title">熊静松 Aslan</div>
                    <div className="item">年龄</div>
                    <div className="item">联系电话</div>
                    <div className="item">电子邮箱</div>
                </div>
            </div>
            <div className="cv-main">f</div>
        </CvWrapper>
    );
};
export default OptionsItem;

