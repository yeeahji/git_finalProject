<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="../css/notice/qnaList.css">
</head>
<body>
<div id="root">
 <div class="qL_revel1">
  <div class="qL_revel2">
  	<div class="qL_revel2-1"></div>
  	<div class="qL_revel2-2"></div>
  	<div class="qL_revel2-3"></div>
  	<div class="qL_revel2-4"></div>
  	<div class="qL_revel2-5">
  		<main class="revel2_5_main">
  			<nav class="main_nav">
	  			<a class="notice_none" href="/market/notice/qna">1:1문의하기</a>
	  			<a class="notice_qnsList" href="/market/notice/qnaList">
	  			상담내역
	  			<div class="notice_qnaList_inner"></div>
	  			</a>
  			</nav>
  			
  			<table id="QnaBoardListTable" border="1" width="90%" cellpadding="3" cellspacing="0" align="center" frame="hsides" rules="rows">
  			 <tr id="abc">
		         <th width="300">제목</th>
		         <th width="100">작성일</th>
		      </tr>
  			</table>
<!--   			<ul class="main_ul"> -->
<!--    				<article id="qnaListA" class="qnaListB">버튼누르면 여기 클래스 변경 -->
<!--   					<button class="article_btn"> -->
<!--   						<div class="article_btn_subject"> -->
<!--   							<h1>메인 > 서브</h1> -->
<!--   							<time class="article_time"></time> -->
<!--   						</div> -->
<!--   						<div class="article_btn_atatus">?span써야할듯</div> -->
<!--   						<span class="btn_arrow"></span> -->
<!--   					</button> -->
  					
<!--   					<div class="qnaListA_div"> -->
<!--   						<section class="qnaListA_div_section"> -->
<!--   							<div class="qds_div"> -->
<!--   								<img class="div_img" src="https://hawaiiseoulcdn.bunjang.net/images/crop/199870305_w300.jpg" width="40" height="40"> -->
<!--   								<div class="div_subject"> -->
<!--   									<h2 class="div_subject_h2">번장운영센터 답변</h2> -->
<!--   									<time class="div_subject_time">로그타임</time> -->
<!--   								</div> -->
<!--   							</div> -->
<!--   							<p class="qnaListA_div_section_content"> -->
<!--   								운영자가 답변하는 내용 -->
<!--   							</p> -->
<!--   						</section> -->
  						
<!--   						<section class="qnaListA_div_section"> -->
<!--   							<div class="qds_div"> -->
<!--   								<img class="div_img" src="https://hawaiiseoulcdn.bunjang.net/images/crop/199870305_w300.jpg" width="40" height="40"> -->
<!--   								<div class="div_subject"> -->
<!--   									<h2 class="div_subject_h2">문의내용</h2> -->
<!--   									<time class="div_subject_time">로그타임</time> -->
<!--   								</div> -->
<!--   							</div> -->
<!--   							<p class="qnaListA_div_section_content"> -->
<!--   								내가 문의한 내용 -->
<!--   							</p> -->
<!--   						</section> -->
<!--   					</div> -->
<!--   				</article> -->
<!--   			</ul> -->
  		</main>
  		<div class="revel2_5_div">사진첨부하면 보여지는곳?</div>
  	</div>
  	<div class="qL_revel2-6"></div>
  	<div class="qL_revel2-4"></div>
  	<div class="qL_revel2-4"></div>
  	<div class="qL_revel2-4"></div>
  </div> <%-- qL_revel2 --%>
 </div> <%-- qL_revel1 --%>
</div> <%-- root --%>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="../js/notice/qnaList.js"></script>
</body>
</html>