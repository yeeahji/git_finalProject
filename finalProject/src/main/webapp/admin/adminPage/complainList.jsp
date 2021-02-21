<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
<script src="https://code.jquery.com/jquery-3.4.1.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="/market/admin/js/complain.js"></script>



<div class="container-fluid">
    <h3 class="mt-4">신고 내역 관리</h3>
    <hr>                  		
<!-- <div class="container-fluid"> -->
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
			
		  &emsp;&emsp;&emsp;
		  
	      <form class="d-flex" id="memberSearchForm">
	      	<input type="hidden" id="searchPg" name="searchPg" value="1">
	      	<select class="form-select form-select-sm" id="searchType" aria-label=".form-select-sm example">
			  <option selected>선택</option>
			  <option value="mem_id">신고당한 회원</option>
			  <option value="reporter_id">신고자</option>
			</select>&nbsp; &nbsp;
	        <input class="form-control me-2" type="search" name="keyword" id="keyword" placeholder="Search" aria-label="Search">&nbsp;&nbsp;
	        <button class="btn btn-outline-success" type="button" id="memberSearchBtn">Search</button>
	      </form>  
	      
	    </div>
	  </div>
	</nav>
	
<div class="table-responsive-xxl">
	<table id="compTable" class="table table-bordered table-striped table table-sm">
        <thead class="table-dark">
            <tr>
                <th style="text-align:center;">번호</th><!-- complain_seq -->
                <th style="text-align:center;"><!-- category -->
                	<input type="hidden" id="viewNumHidden" name="viewNumHidden" value="20">
					<select class="form-select form-select-sm" id="withdrawCate" aria-label=".form-select-sm example" >
						<option selected>구분</option>
						<option value="store_seq">상점 신고</option>
						<option value="product_seq">상품 신고</option>
						<option value="review_seq">후기 신고</option>
						<option value="board_seq">게시글 신고</option>
						<option value="comment_seq">댓글 신고</option>
					</select>
			</th>
				<th style="text-align:center;">항목 번호</th><!-- eachPart_seq -->
				<th style="text-align:center;">내용</th><!-- complain_content -->
                <th style="text-align:center;">신고당한 사람</th><!-- mem_id -->
                <th style="text-align:center;">신고자</th><!--reporter_id -->
                <th style="text-align:center;">신고 날짜</th><!-- complain_logtime -->
                <th style="text-align:center;">처리</th><!-- complain_status -->
            </tr>
        </thead>
        <tbody id="complainTbody">
        	<tr>
        	
        	</tr>
        </tbody>
	   	<tfoot class="table-secondary">
            <tr>
              	<th style="text-align:center;">번호</th>
                <th style="text-align:center;">구분</th>
                <th style="text-align:center;">항목 번호</th><!-- eachPart_seq -->
				<th style="text-align:center;">내용</th><!-- complain_content -->
                <th style="text-align:center;">신고당한 사람</th><!-- mem_id -->
                <th style="text-align:center;">신고자</th><!--reporter_id -->
                <th style="text-align:center;">신고 날짜</th><!-- complain_logtime -->
                <th style="text-align:center;">처리</th><!-- complain_status -->
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
</div><!-- 좌측 끝 -->
<!-- ========================================= -->
<div class="col-xl-5"><!-- 우측 -->
<div class="card mb-4">
  <h5 class="card-header">신고 내용 확인</h5>
	 <div class="card-body">
       	<table class="table table-bordered border-primary table-sm">
		  <tbody>
		    <tr>
		      <th style="text-align:center;" width="20%">작성자 ID</th><th width="30%"><span class="col" id="reported_id"></span></th> 
		      <th style="text-align:center;" width="20%">작성일</th><th width="30%"><span class="col" id="reported_logtime"></span></th>
		    </tr>
		    <tr>
		      <th style="text-align:center;" id="mother" width="20%"></th><th width="30%"><span class="col" id="mother_seq"></span></th> 
		      <th style="text-align:center;" id="daughter" width="20%"></th><th width="30%"><span class="col" id="daughter_seq"></span></th>
		    </tr>
		    <tr>
		      <th style="text-align:center;">내용</th><th colspan="3"><span id="reported_content"></span></th>
		    </tr>
		   <tr>
		   </tr>
		  </tbody>
		</table>
		<input type="hidden" id="thisIs">
		<button type="button" class="btn btn-secondary btn-sm" id="goComplainPage">페이지로 이동</button>
		<button type="button" class="btn btn-secondary btn-sm" id="blindComplainBtn">신고글 블라인드 처리</button>
		<button type="button" class="btn btn-secondary btn-sm" id="stopMemberBtn">회원 영구 정지</button>

		   
	 </div>    
</div>
  </div>
</div><!-- 우측 끝 -->
</div><!-- end.row-->

