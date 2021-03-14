<h1 align="center">아나바다 마켓</h1>

<p align="center"><img src="https://user-images.githubusercontent.com/73110638/108618038-23b8e600-745e-11eb-9957-a14652bb7749.png" width="600" height="700"></p>

> <div align="center">아나바다 마켓은 환경을 생각하는 중고 거래 웹 페이지입니다.</div>

아나바다 마켓은 웹이라는 공간에서 보다 편리하게 중고물품을 거래할 수 있습니다.
사이트명 '아나바다'는 아껴 쓰고, 나눠 쓰고, 바꿔 쓰고, 다시 쓴다는 뜻으로 중고 거래를 의미하며
사이트를 대표하는 로고는 자연을 대표하는 바다를 상징으로 하여 중고 거래를 통해 환경 문제 개선에 도움을 준다는 사이트의 정체성을 뚜렷이 합니다.

 사이트 자체 회원가입 혹은 외부 소셜 로그인으로 회원 누구나 사용자나 판매자가 될 수 있으며
바다톡이라는 채팅 수단을 통해 상호 간의 거래가 가능합니다.
또한 커뮤니티 게시판을 통해 자유롭게 글을 남길 수 있고 고객센터를 통한 일대일 문의 서비스가 제공됩니다.
관리자는 회원 및 게시글을 간편하게 관리할 수 있습니다.

사이트 [번개장터](https://m.bunjang.co.kr/)에서 UI와 전반적인 기능을, [당근마켓](https://www.daangn.com/)에서 에코지수(당근마켓의 매너온도)와 거래 성사 과정을 벤치마킹하였습니다.
<br/><br/><br/>


## 프로젝트 링크
 > AWS EC2 서버로 구축 및 RDS로 Oracle DB와 연동하였습니다. 보완 작업 중에 있습니다.

[아나바다 마켓](http://15.165.254.121:8080/market/) <- 클릭!
<br/><br/><br/>


## 프로젝트 규모
* 기간 - 2021년 1월 18일 ~ 2월 14일 (총 27일)
* 인원 - 5명
* 개발 환경
  * O/S - Windows 10 64bit
  * WAS - Apache Tomcat/9.0
  * RDBMS - Oracle
  * Pattern - Eclipse / SQL Developer
* 사용 기술
  * JAVA, Spring Security, Websockets, Maven
  * Java Script, HTML, CSS, JSP, jQuery, AJAX, JSON, XML
  * Spring Framework, myBatis, Bootstrap
  * 카카오 로그인 API, 카카오 우편번호 API
  * 그리고 Github :)
<br/><br/><br/>


## 구현 기능

* 일반 회원

|   기능   | 세부 기능 |
|:-----------:|:---:|
| 메인 | 전체 상품 목록 / 상품 리스트 더보기 / 찜한 상품 / 최근본 상품 / 상품 검색/ 최근 검색어 /  상품 카테고리 / 광고 슬라이드 |
| 회원 | 회원가입 / 로그인 / SNS 로그인 / 관리자 & 유저 권한 설정 / 회원 정보 수정 / 회원 탈퇴 / 아이디&비번 찾기 / 이메일 인증 |
| 상점 | 상점 정보 설정 / 에코지수, 상점평점 확인 / 상품 후기 / 찜 / 구매내역 / 내 상품 관리(상품 검색, 삭제, 상태변경) / 상점 신고 / 후기 신고 |
| 상품 | 상품 등록(이미지 미리보기, 대표이미지 설정, 카테고리화, 연관태그 그래픽화) / 상품 상세페이지(정보 확인, 찜 등록 및 해제, 연관 상품, 상품 신고) |
| 채팅 | 1:1 채팅(상대방과 자신 구분) / 채팅 내용 저장 및 불러오기 / 실시간 알림(음소거 가능) / 실시간 온라인 여부 / 이미지 첨부 / 이모티콘 첨부 / 주소 보내기 / 금지 태그, 금지 단어 설정 |
| 커뮤니티 | 게시글 / 댓글 / 답글 / 글 수정 / 글 삭제 / 검색 / 페이징 |
| 1:1문의 | 1:1 문의글 등록 / 문의글 및 답글 출력 |
<br/>

* 관리자

| 기능 | 세부 기능 |
|:---:|:---:|
| 전체 회원 관리 | 회원 목록 출력 / 회원 상세 정보 확인 /  회원 계정 영구 정지 |
| 탈퇴 사유 분석 | 탈퇴 사유 분석 |
| 전체 상점 관리 | 상점 목록 출력 / 상점 상세 정보 확인 |
| 전체 상품 관리 | 상품 목록 출력 / 상품 상세 정보 확인 |
| 신고 내역 관리 | 상점, 상품, 리뷰, 게시글, 댓글 신고 내역 출력 / 신고 상세 내용 확인 / 신고 내용 블라인드 처리 & 계정 영구정지 / 신고 내역 처리 여부 체크 |
| 1:1 문의 관리 | 1:1 문의 내역 출력 / 문의 상세 내용 확인 / 문의글 답변 달기 |   
<p/>
<br/><br/><br/>

## '이예지'의 Key summary
 > 제 담당파트는 크게 **시큐리티**, **상품 등록하기**, **바다톡(채팅)** 으로 나눌 수 있습니다. 이 외의 파트에도 여기저기 참여했지만요!
<br/>

* **_시큐리티_**
---------------

UserDetails를 커스텀하여 [MemberDTO.java](https://github.com/yeeahji/git_finalProject/blob/main/finalProject/src/main/java/member/bean/MemberDTO.java)를 생성했습니다.

UserDetailsService를 implements한 [MemberServiceImpl.java](https://github.com/yeeahji/git_finalProject/blob/main/finalProject/src/main/java/member/service/MemberServiceImpl.java)에서 커스텀한 UserDetails(= MemberDTO)에 사용자 정보를 넣어주었습니다. JAVA에서 사용자 정보를 가져오기 위해 Principal 혹은 @AuthenticationPrincipal를 사용하였고, JSP에서는 시큐리티 태그를 사용하였습니다.

로그아웃 실패 시 부가작업을 커스텀하기 위해 [MemberLoginFailHandler.java](https://github.com/yeeahji/git_finalProject/blob/main/finalProject/src/main/java/member/service/MemberLoginFailHandler.java)를 생성하였습니다.

이 외에도 자동 로그인, 로그인 페이지 커스텀, 접근 권한 에러 페이지 커스텀, 비밀번호 암호화 등을 구현했으며 [security-context.xml](https://github.com/yeeahji/git_finalProject/blob/main/finalProject/src/main/webapp/WEB-INF/spring/security-context.xml)에서 확인할 수 있습니다.
<br/><br/>

* **_상품 등록하기_**
---------------

상품 등록에 관한 프론트, 백 모두 구현하였습니다.

이미지는 최대 5개 첨부 가능하며 미리보기 및 대표이미지 설정이 가능합니다. 우편번호 및 지도 API를 사용하였고 연관태그의 입력을 시각화하였습니다.   

코드는 [registForm.jsp](https://github.com/yeeahji/git_finalProject/blob/main/finalProject/src/main/webapp/product/registForm.jsp)와 [registForm.js](https://github.com/yeeahji/git_finalProject/blob/main/finalProject/src/main/webapp/js/product/registForm.js) 그리고 [product.java](https://github.com/yeeahji/git_finalProject/tree/main/finalProject/src/main/java/product)에서 확인할 수 있습니다. (CSS 관련 파일은 따로 링크 걸지 않았습니다)
<br/><br/>

* **_바다톡(채팅)_**
---------------

중고 거래라는 특성으로 인해 이 사이트의 거래는 채팅으로 이루어집니다. 채팅에 관한 프론트, 백 모두 구현하였으며 웹소켓을 이용했습니다.   

메인의 헤더에 있는 바다톡, 상품 상세페이지, 상대방의 상점 페이지에서 채팅방으로 접근이 가능하며 상품 상세페이지에서 접근 시 해당 상품에 관심이 있다는 메시지와 링크가 자동으로 전송됩니다. 금지 언어, 금지 태그가 설정되어 있습니다. 상대방의 온라인/오프라인 표시와 실시간 알림 기능이 있으며 이모티콘 전송와 주소 전송이 가능하고 이 모든 메시지 내용은 저장됩니다.   

이미지 전송 기능이 있으나 5KB라는 용량 제한이 있어 사용자가 <img> 태그를 직접 입력하는 식으로 이루어집니다. 그리하여 추후 개선점으로 채팅방 내에서 주고받는 이미지도 상품 등록 페이지처럼 서버에 저장하여 보다 제약없는 이미지 전송이 가능하도록 업데이트 할 예정에 있습니다.   

코드는 [chat.js](https://github.com/yeeahji/git_finalProject/tree/main/finalProject/src/main/webapp/js/chat)와 [chat.jsp](https://github.com/yeeahji/git_finalProject/tree/main/finalProject/src/main/webapp/chat) 그리고 [chat.java](https://github.com/yeeahji/git_finalProject/tree/main/finalProject/src/main/java/chat)에서 확인할 수 있습니다. (CSS 관련 파일은 따로 링크 걸지 않았습니다)   
<br/><br/><br/>


## 사용 화면 예시 (일부분)

 > 상품 등록하기  /  상품 상세페이지  /  신고하기

<img src="https://user-images.githubusercontent.com/73110638/108618390-10f3e080-7461-11eb-971b-086e6779803b.png" width="200" height="250"> <img src="https://user-images.githubusercontent.com/73110638/108618981-76e26700-7465-11eb-9ac4-097ea5bc6577.png" width="200" height="250"> <img src="https://user-images.githubusercontent.com/73110638/108618990-8661b000-7465-11eb-9006-cd311f7d1940.png" width="200" height="250">
<br/>

 > 내 상점 - 상품, 상품 후기, 찜, 구매내역, 내 상품 관리

<img src="https://user-images.githubusercontent.com/73110638/108618795-51a12900-7464-11eb-99fd-e643351c731b.png" width="300" height="200"> <img src="https://user-images.githubusercontent.com/73110638/108618902-09ced180-7465-11eb-8325-ae61e972428f.png" width="300" height="200"> <img src="https://user-images.githubusercontent.com/73110638/108618891-fde30f80-7464-11eb-8462-6f18ce54f355.png" width="300" height="200"> <img src="https://user-images.githubusercontent.com/73110638/108618893-ffacd300-7464-11eb-818f-b4a70f58466a.png" width="300" height="200"> <img src="https://user-images.githubusercontent.com/73110638/108618661-371a8000-7463-11eb-86f9-9aff1f87562e.png" width="300" height="200"> <img src="https://user-images.githubusercontent.com/73110638/108618765-1141ab00-7464-11eb-81ea-69e570f75854.png" width="300" height="200">
<br/>

 > 채팅방

<img src="https://user-images.githubusercontent.com/73110638/108618519-65e42680-7462-11eb-9d37-e4918fe520fc.png" width="400" height="200">
<br/>

 > 관리자 페이지

<img src="https://user-images.githubusercontent.com/73110638/108619128-333c2d00-7466-11eb-9f88-3df82799b963.png" width="400" height="200">
