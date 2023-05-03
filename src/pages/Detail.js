import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from 'styled-components'
import { useEffect, useState } from "react";
// styled-components 장점
// 1. CSS 파일 안열어도 됨
// 2. 스타일이 다른 js 파일로 오염되지 않음
// 3. 페이지 로딩시간 단축
// 만약 오염방지하려면 컴포넌트.module.css 만들면됨
// Q. 오렌지색 버튼이 필요하다면 props 문법 쓰면 됨
// 조건문 운용가능

// 단점
// 1. JS파일 매우복잡해짐
// 2. 중복스타일은 컴포넌트간 import 할텐데 css와 다를 바가 없음
// 3. 협업시 CSS담당의 숙련도 이슈
let YellowBtn = styled.button`
    background : ${ props => props.bg };
    color : ${ props => props.bg == 'blue' ? 'white' : 'black'};
    padding : 10px;
`;
let Box = styled.div`
    width : ${ props => props.width};
    height: ${ props => props.height};
    padding :10px;
    background : ${props => props.bg};

`

// let NewBtn = styled.button(YellowBtn)`
//     asdasd
// `

function Detail(props){

    let [count, setCount] = useState(0);
    let [clear, setclear] = useState(true);
    // 쓰는 이유 랜더링이 되고난 후 실행
    useEffect(()=>{
        // useEffect 안에 적는 코드들은
        // 컴포넌트가 장착, 업데이트시 코드 실행
        // 어려운 연산 , 서버에서 데이터가져오는 작업
        // 타이머 장착하기
        let timer = setTimeout(()=>{
            setclear(false);
            console.log(2);
        },2000);
        return ()=>{
            //  useEffect 동작 전에 실행되는 코드 작성 란
            // 기존 타이머는 제거해주세요.
            console.log(1);
            clearTimeout(timer);

            // 대충 서버로 데이터 요청하는 코드 (몇초 소요)
            // 기존 데이터요청은 제거해주세요


        }
        // useEffect 실행조건 넣을 수 있는 곳은 []
    }) // <- 컴포넌트 mount시 1회만 실행하고 싶으면 이렇게 작성 만약 이렇게 작성을 안할 시 mount, update시 실행됨

   
    /*
        useEffect(()=>{}) 1. 재랜더링마다 코드실행하고 싶으면
        useEffect(()=>{}, []) 2. mount시 1회 코드실행하고 싶으면
        useEffect(()=>{}, []) 3. unmount시 1회 코드실행하고 싶으면
        
        4. useEffect 실행 전에 뭔가 실행하려면 언제나 return ()={}
        5. 특정 state 변경시에만 실행하려면 [state명]
    */ 
   

    // 유저가 URL 파라미터에 입력한거 가져오려면 useParams()
    // 유저가 :id 자리에 적은거 가져와줌
    let {id} = useParams();


    let returnValue = props.shoes.find(function(date){
        return date.id == id
    });
 
    // console.log(returnValue);

    if(!isNaN(id)){
        return(
            <div className="container">
                {/*                 
                    <YellowBtn bg="blue">버트</YellowBtn>
                    <YellowBtn bg="orange">버트</YellowBtn>
                    <GreenBox width="200px" height="100px" bg="blue"></GreenBox> */
                }
                {
                    clear == true ? <Box width="100%" height="auto" bg="yellow">5초이내 구매시 할인</Box> : null
                }
                
     
                {count}
                <button onClick={()=>{
                    setCount(count+1);
                }}>버튼</button>
                <div className="row">
                    <div className="col-md-6">
                        <img src={returnValue.src} width="100%" />
                    </div>
                    <div className="col-md-6 mt-4">
                        {/* 현재 url에 입력한 숫자 */}
                        <h4 className="pt-5">{returnValue.title}</h4>
                        <p>{returnValue.content}</p>
                        <p>{returnValue.price}원</p>
                        <button className="btn btn-danger">주문하기</button>
                        <Outlet></Outlet>
                    </div>
                    
                </div>
            </div>  
        )
    } else if(id > props.shoes.length){
        return(
            <div>상품없음.</div>
        )
    } else if(isNaN(id)){
        return (
            <div>잘못된 페이지 입니다.</div>
        )
    } 
    
}


export default Detail;