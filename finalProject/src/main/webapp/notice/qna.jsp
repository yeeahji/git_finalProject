<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="../css/notice/qna.css?ver=1">
</head>
<body>
<div id="root">
 <div class="q_revel1">
  <div class="q_revel2">
  	<div class="q_revel2-1"></div>
  	<div class="q_revel2-2"></div>
  	<div class="q_revel2-3"></div>
  	<div class="q_revel2-4"></div>
  	<div class="q_revel2-5">
  		<main class="q_revel2-5_main">
  			<nav class="qmain_nav">
  				<a class="notice_qna" href="/market/notice/qna">
  					1:1문의하기
  					<div class="notice_qna_inner"></div>
  				</a>
  				<a class="notice_none" href="/market/notice/qnaList">상담내역</a>
  			</nav>
  		<form id="QnaWriteForm">
  			<div class="qmain_div">
  				<div calss="qmd_nav">
  					<div class="qmd_nav1">
  						<div class="qmd_nav2">
  							<div class="qmd_nav3">
 								<select id='qnaCate_main_name' name='qnaCate_main_name'>
									<option value="">선택</option>
								</select>
  							</div>
  							<div class="qmd_nav4"></div>
  						</div>
  					</div>
  				</div>
  				<div calss="qmd_nav">
  					<div class="qmd_nav1">
  						<div class="qmd_nav2">
  							<div class="qmd_nav3">
  								<select id='qnaCate_sub_name' name='qnaCate_sub_name'>
									<option value="">선택</option>
								</select>
  							</div>
  							<div class="qmd_nav4"></div>
  						</div>
  					</div>
  				</div>
  				<textarea rows="20" id="qna_content" name="qna_content" class="qmd_textarea"></textarea>
  				<div calss="qmd_div">
  					<input  id="fileUp" name="img[]" multiple="" type="file" accept="image/jpg, image/jpeg, image/png" class="sc-hgeeVt">
<!--   					<button class="qmd_divPictureBtn" for="fileUp">사진첨부</button> -->
  					<button class="qmd_divQnaBtn" id="QnaBtn">상담신청</button>
  				</div>
  			</div>
  		</form>
  		</main>
  		<din class="q_revel2-5_div">사진첨부하면나오는 수정하는 부분</div>
  	<div class="q_revel2-6"></div>
  	<div class="q_revel2-4"></div>
  	<div class="q_revel2-4"></div>
  	<div class="q_revel2-4"></div>
  </div> <%-- q_revel2 --%>
 </div> <%-- q_revel1 --%>
</div> <%-- root --%>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script type="text/javascript" src="../js/notice/qna.js"></script>
</body>
</html>