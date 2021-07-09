import styled from 'styled-components'
const Home = styled.div`
  background: #272C33;
  padding: 16px;
  height: 100vh;
  width: 100vw;
  .home-head{
    padding-bottom: 10px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#E6E7E6;
    .head-front{
      border-bottom: 1px solid #E6E7E6;;
    }
    .shell{
      position: relative;
    }
  }
  .select-list-mobile{
    color:#8BC264;
    padding-left:2px;
    .welcome{
      display: flex;
      align-items: center;
    }
  }
`
export default Home