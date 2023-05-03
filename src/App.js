import { Button, Container, Navbar, Nav } from 'react-bootstrap';
import './App.css';
import { useState } from 'react';
// 작명 from 경로
import data from './data.js';
import Detail from './pages/Detail.js';
import Event from './event/event.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

// import bg from './image/bg.png';

// import 문법

/*
1. import 작명 from './이미지경로' 한 다음에

2. 이미지경로가 필요한 곳에서 작명한걸 사용하면 됩니다. 

<img>태그 쓰고싶으면 <img src={bg}/> 이렇게 써도 보입니다. 
*/

function App() {
  
  let [shoes, showChange] = useState(data);

  // 1. 페이지 이동 도와주는 useNavigate()
  //  
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" className='nav'>
        <Container>
          <Navbar.Brand href="#home">Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{

              // / 대신 1 적으면 앞으로 한페이지 이동 해달라는 구문 
              // -1 적으면 뒤로가기 이동
              navigate('/');
            }}>메인</Nav.Link>
            {/* 페이지 이동 */}
            <Nav.Link onClick={()=>{
              navigate('/detail')
            }} >Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      {/* 페이지 이동버튼은 Link to 라는 속성을 이용하여 링크의 주소 입력 */}
      


      <Routes>
        {
          /* 페이지 나누는법 */
          // 라우트 라는 컴포넌트는 페이지 라고 생각하면됨
          // /detail 로 접속하면 상세페이지 보여주고 싶다. 
        }
        {/* / 만 해놓으면 메인페이지 */}
        <Route path="/" element={
          <>
            <div className='mainBg'></div>
            <button className='arrSort' onClick={()=>{
              let newShoes = [...shoes];
              newShoes.sort(function(a, b){
                if(a.title < b.title){
                  return -1
                }
                
              });
              showChange(newShoes);
              console.log(shoes);
            }}>가나다순 정렬</button>
            <div className="container">
              <div className="row">
                {
                  data.map(function(a, i){
                    return(
                      <List key={i} title={shoes[i].title} src={shoes[i].src} content={shoes[i].content} price={shoes[i].price} ></List>
                    )
                  })
                }
              </div>
            </div> 
          </>
          /*
            비교 연산자
            a>b (좌측이 우측보다 클때 참)
            c<d (좌측이 우측보다 작을때 참)
            aa>=bb (좌측이 우측보다 크거나 같을때 참)
            cc<=dd (좌측이 우측보다 작거나 같을때 참)
            ss==hh (좌측과 우측이 같을때 탬 true)
            jj!=kk (좌측과 우측이 같지 않을때 참 true)
          */ 



        }></Route>
        {/* URL 파라미터 상세페이지 100개가 필요하다면? */}
        {/* URL 파라미터 문법 :URL파라미터 */}
        {/* /detail/아무거나 라는 뜻 */}

        {/* 100개든 똑같은 내용만 보여진다라는 문제가 생긴다. */}
        {/* 각각 다른 컴포넌트(페이지)를 100만개 만들던가 하나의 컴포넌트로 각각 다른 내용을 보여주든가 */}
        {/* 해결방법 props 활용하면 컴포넌트 1개로 각각 다른 내용가능 라우터 적으로 */}
        <Route  path="/detail/:id" element={<Detail shoes={shoes}></Detail>} >
          <Route path="*" element={<div>없는페이지입니다.</div>}></Route>
        </Route>
        {/* 404 페이지는... * 치면 이외에 모든것 (오타포함) */}
        {/* 이상한 페이지 가면 나옴 */}
        <Route path="/about" element={<About></About>} >
          {/* Nested Routes */}
          {/* Route 태그를 일일이 하나씩 만드는것보다 Nested Routes 문법을 이용하면 더 수월(태그 안에 태그가 들어갔다) */}
          {/* 아래의 실제 경로는 path="/about/member" */}
          {/* 
            장점
            1. 간단
            2. Nested route 접속시엔 element 2개나 보임

          */}
          {/* 
            Nested Routes 언제 쓰냐?

            - 여러 유사한 페이지 필요할 때

            
          */}
          <Route path="member" element={<div>멤버임</div>} ></Route>
          <Route path="location" element={<div>위치 정보임</div>} ></Route>
          <Route path="*" element={ <div>없는페이지임</div> } />
        </Route>
        <Route path="/event" element={<Event></Event>}>
          <Route path="one" element={<p>첫 주문시 양배추즙 서비스</p>} ></Route>
          <Route path="two" element={<p>생일기념 쿠폰받기</p>} ></Route>
          <Route path="*" element={ <p>없는페이지임</p> } />
        </Route>
        
       
        
          
        {/* 폴더구조 에 대한 */}
      </Routes>
      
      
      
    </div>
  );
}
function About(){
  return(
    <div>
      <h4>회사정보</h4>
      {/* 어디 보여줄지 정하려면 Outlet */}
      {/* /about/member 접속 시 <About>&<div>멤버임</div>  둘다 보인다.*/}
      {/* Nested routes 의 element 보여주는 곳은 <Outlet> */}
      <Outlet></Outlet>
    </div>
  )
}


function List(props){
  return(
    
    <div className="col-md-4">
      <img src={props.src} style={{width:'80%'}}/>
      <h4>{props.title}</h4>
      <p>{props.content}</p>
      <span>{props.price}</span>
    </div>
  )
}
export default App;
