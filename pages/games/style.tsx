import styled from 'styled-components'

const GamesPage = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    background: #9293FE;
   
    @keyframes jump {
        from{
            bottom: 114px;
        }
        to{
            bottom: auto;
            top: calc(50% + 100px);
        }
    }
    @keyframes jump2 {
        from{
            left: 10%;
        }
        to{
            left: 20%;
        }
    }
    @keyframes shake { /* 水平抖动，核心代码 */
        10%, 90% { transform: translate3d(0, -2px, 0); }
        20%, 80% { transform: translate3d(0, +4px, 0); }
        30%, 70% { transform: translate3d(0, -8px, 0); }
        40%, 60% { transform: translate3d(0, +8px, 0); }
        50% { transform: translate3d(0, -8px, 0); }
    }
    .cloud1{
        height: 130px;
        position: absolute;
        left: 25%;
    }
    .cloud2{
        height: 180px;
        position: absolute;
        top: 10%;
        left: 52%;
    }
    .ground{
        height: 120px;
        width: 100vw;
        position: absolute;
        left: 0;
        bottom: 0;
        background-image:url('/ground.png')
    }
    .mountain{
        height: 120px;
        position: absolute;
        left: 0;
        bottom: 120px;
    }
    .pipe{
        position: absolute;
        width: 188px;
        right: 25%;
        bottom: 118px;
    }
    .noun{
        position: absolute;
        width: 100px;
        left: 38%;
        top:16%;
    }
    .noun2{
        position: absolute;
        width: 100px;
        left: 10%;
        top: 50%;
    }
    .mario{
        height: 100px;
        position: absolute;
        left: 31.5%;
        bottom: 114px;
        &.jump{
            animation: jump .1s linear;
        }
    }
   .game-wrapper{
       position: absolute;
       height: 160px;
       left: 32%;
       display: flex;
       width: 410px;
       justify-content: space-around;
       top: 50%;
       .game-snack{
            position: absolute;
            left: 0;
            height: 100px;
            border-radius: 4px;
            &.jump{
                animation: shake .8s linear;
            }
        }
        .wall{
            position: absolute;
            left: 100px;
            height: 100px;
        }
        .wall2{
            position: absolute;
            left: 300px;
            height: 100px;
        }
        .game-fruit{
            position: absolute;
            left: 200px;
            height: 100px;
            border-radius: 4px;
        }
   } 
   &.phone{
        position: fixed;
        right:0;
        top: 0;
       .ground{
            bottom: auto;
            top: 0;
            height: 100vh;
            width: 20px;
            background:#9A4900;
            border-right:2px solid black;
       }
       .cloud1{
            height: 80px;
            transform: rotate(90deg);
            left: 68%;
          
            top: 12%;
       }
       .cloud2{
            height: 100px;
            transform: rotate(90deg);
            top: 58%;
            left: 52%;
        }
        .mountain{
            height: 80px;
            transform: rotate(90deg);
            left: -55px;
            
            top: 8%;
        }
        .pipe{
            transform: rotate(90deg);
            width: 90px;
            left: 3%;
        }
        .noun{
            transform: rotate(90deg);
            width: 50px;
            left: 38%;
            top:16%;
        }
        .noun2{
            transform: rotate(90deg);
            width: 50px;
            left: 70%;
            top: 35%;
        }
        .mario{
            transform: rotate(90deg);
            height: 60px;
            top:34.5%;
            left: 2%;
            &.jump{
                animation: jump2 .1s ease;
            }
        }
        .game-wrapper{
            transform: rotate(90deg);
            height: 160px;
            left: auto;
            display: flex;
            width: 200px;
          
            justify-content: space-around;
            top:38%;
            left: 5%;
            .game-snack{
                transform: rotate(360deg);
                left: 0;
                height: 45px;
                border-radius: 4px;
                &.jump{
                    animation: shake .8s linear;
                }
            }
            .wall{
                transform: rotate(360deg);
                left: 45px;
                height: 45px;
            }
            .wall2{
                transform: rotate(360deg);
                left: 130px;
                height: 45px;
            }
            .game-fruit{
                transform: rotate(360deg);
                left: 90px;
                height: 45px;
                border-radius: 4px;
            }
        }
   }    
`;
const SnackWrapper = styled.div`
   
    .map{
        position:relative;
        width: 100vw;
        height: 100vh;
        background: #FEFFFE;
    }
    .body-item{
        width: 20px;
        height: 20px;
        position: absolute;
        border-radius: 50%;
        background: red;
        transition: all .3s;
        &.snack-head{
            z-index: 10;
            div{
                position: absolute;
                width: 8px;
                height: 8px;
                background: white;
                border-radius: 50%;
                &::before{
                    content: '';
                    display: block;
                    width: 2px;
                    height: 2px;
                    background: black;
                    border-radius: 50%;
                    position: absolute;
                    left: 50%;
                    top: 50%;
                }
                &.eye-left{
                    left: 50%;
                    margin-left:-4px;
                    bottom: -1px;
                }
                &.eye-right{
                    top:-1px;
                    right: 50%;
                    margin-right:-4px;
                }
            }
        }
        &.snack-tail{
            &::before{
                content: '';
                display: block;
                width: 18px;
                height: 2px;
                background: red;
                position: absolute;
                left: 50%;
                margin-left: -9px;
                transform: rotate(90deg);
            }
        }
        &.rotate{
            transform: rotate(90deg);
            transition: all .3s ease 3ms;
           
        }
       
    }
    .food{
        width: 10px;
        height: 10px;
        position: absolute;
        border-radius: 50%;
        background: red;
    }
`;
export {
    GamesPage,
    SnackWrapper
}