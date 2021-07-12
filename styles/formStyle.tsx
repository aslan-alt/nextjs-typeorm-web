import styled from 'styled-components'


const FormWrapper = styled.div`
    padding-left:20px ;
    padding-right:20px ;
    border-radius: 4px;
    width: 400px;
    height: 400px;
    padding: 16px;
    background: transparent;
    display: flex;
    flex-direction: column;
    color: white;
   .form-item{
        display: flex;
        flex-direction: column;
        margin-bottom:26px;
        input{
            flex-grow: 1;
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255,255,255,0.5);
            outline:none;
            &::placeholder{
                color:rgba(255,255,255,0.5);
            }
        }
        .error{
            color: #E76F91;
        }
   }
   .go-to-sign-up{
        color: rgba(255,255,255);
        span{
            color:rgba(255,255,255,0.5);
        }
    }
   .submit{
        display: flex;
        margin-bottom:26px;
        button{
            color: rgba(255,255,255,0.5);
            background: rgba(255,255,255,0.1);
            padding:8px 16px;
            flex-grow: 1;
            font-size: 16px;
            border-radius: 4px;
            border: none;
            &:active{
                background: rgba(255,255,255,0.4);
            }
        }
   }
`
export default FormWrapper