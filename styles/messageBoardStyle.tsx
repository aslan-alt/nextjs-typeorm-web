import styled from 'styled-components'


const MessageWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .message-list{
        width: 40vw;
        @media (max-width: 600px) {
            width: 70vw;
        }
        
    }
    .add-message{
        width: 40vw;
        @media (max-width: 600px) {
            width: 70vw;
        }
        textarea{}
        .button-wrapper{
            display: flex;
            min-height: 30px;
            justify-content: flex-end;
        } 
    }

`
const Content = styled.div`
    .go-to-sign-up{
        color:#1790FE;
    }
`
export {
    MessageWrapper,
    Content
}