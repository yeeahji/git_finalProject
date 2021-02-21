<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<link href="/market/admin/css/memberQna.css" rel="stylesheet" />
<script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
<script src="/market/admin/js/memberQna.js"></script>

<div class="container-fluid">
<h3 class="mt-4">1:1 고객상담 관리</h3>
<hr>                  		
<div class="row">
  
	<div class="col-xl-7">
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
		<strong>출력 게시글 수</strong>&emsp;
		<input type="hidden" id="viewNumHidden" name="viewNumHidden" value="20">
		<select class="form-select form-select-sm" id="selectPrint" aria-label=".form-select-sm example" >
		  <option value="20" selected>20개</option>
		  <option value="50">50개</option>
		  <option value="100">100개</option>
		</select>
		
	  &nbsp;&nbsp;&emsp;
	  
      <form class="d-flex" id="memberSearchForm">
      	<input type="hidden" id="searchPg" name="searchPg" value="1">
      	<input type="hidden" id="qnaCate_mainName" name="qnaCate_mainName">
      	<select class="form-select form-select-sm" name ="qnaCate_main" 
      			id="qnaCate_main" aria-label=".form-select-sm example">
		  <option selected>카테고리1</option>
		</select>&emsp;
      	<select class="form-select form-select-sm" name="qnaCate_sub"
      			id="qnaCate_sub" aria-label=".form-select-sm example">
		  <option selected>카테고리2</option>
		</select>&emsp;&emsp;
        <input class="form-control me-2" type="search" name="keyword" id="keyword" placeholder="회원 아이디" aria-label="Search">
        <button class="btn btn-outline-success" type="button" id="memberQnaSearchBtn">search</button>
      </form>  
      
    </div>
  </div>
</nav>

<div class="table-responsive-xxl">
	<table id="memberTable" class="table table-bordered table-striped table table-sm">
        <thead class="table-dark">
            <tr>
                <th style="text-align:center;" width="5%">no.</th>
                <th style="text-align:center;" width="10%">카테고리1</th>
                <th style="text-align:center;" width="30%">카테고리2</th>
                <th style="text-align:center;" width="22%">작성자</th>
                <th style="text-align:center;" width="10%">등록일</th>
                <th style="text-align:center;" width="10%">답변여부</th>
                <th style="text-align:center;" width="8%">답변일</th>
            </tr>
        </thead>
        <tbody id="tbody">
        	<tr></tr>
        	
        </tbody>
	   	<tfoot class="table-secondary">
            <tr>
              	<th style="text-align:center;" width="5%">번호</th>
                <th style="text-align:center;" width="10%">카테고리1</th>
                <th style="text-align:center;" width="30%">카테고리2</th>
                <th style="text-align:center;" width="20%">작성자</th>
                <th style="text-align:center;" width="10%">등록일</th>
                <th style="text-align:center;" width="10%">답변여부</th>
                <th style="text-align:center;" width="120%">답변일</th>
            </tr>
        </tfoot>
	</table>
</div>

<!-- 페이징 -->
<input type="hidden" id="pg" name="pg" value="${pg }">
<input type="hidden" id="viewNum" name="viewNum" value="${viewNum }">
<!-- 페이징 -->
<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
	<div id="boardPagingDiv" class="paging" align="center"></div>
  </ul>
</nav>
 </div>
<%-- 우측 시작 ======================================================= --%>
    
<div class="col-xl-5">
  <div class="card mb-4">
      <div class="card-header">
       <i class="fas fa-chart-area mr-1"></i>
		 상품 상세정보 &nbsp;&nbsp;
	  </div><!-- card-header -->
  <div class="card-body">
  <table class="table table-bordered border-primary table-sm">
	  <tbody>
	    <tr>
	      <th style="text-align:center;" width="20%">문의글 번호</th><td colspan="3"><span id="qna_seq"></span></td> 
	    </tr>
	    <tr>
	      <th style="text-align:center;">카테고리1</th><td width="30%"><span id="qnaCate_main2"></span></td> 
	      <th style="text-align:center;" width="20%">카테고리2</th><td width="30%"><span id="qnaCate_sub2"></span></td>
	    </tr>
	    <tr>
	      <th style="text-align:center;">작성자 ID</th><td><span id="mem_id"></span></td> 
	      <th style="text-align:center;">작성일</th><td><span id="qna_logtime"></span></td>
	    </tr>
	    <tr>
	      <th style="text-align:center;">1:1문의 내용</th><td colspan="3"><span id="qnaContent"></span></td>
	    </tr>
	    <tr>
	      <th style="text-align:center;">사진</th><td colspan="3"><span id="product_imgSpan">
      	<img src="" class="img-thumbnail" id="qnaImg1" alt="첨부이미지1">
      	<span id="noImg"></span>
	      </span></td>
	    </tr>
	  </tbody>
</table>
<div class="input-group">
	  <span class="input-group-text">답변</span>
	  <textarea id="qnaAnswerTextarea" class="form-control" aria-label="With textarea"></textarea>
	  <button id="writeAnswerBtn" type="button" class="btn btn-secondary btn-sm">답변 등록</button>
</div></div></div></div></div></div>

