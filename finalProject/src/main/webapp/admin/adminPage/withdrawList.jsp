<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<div class="container-fluid">
<h3 class="mt-4">탈퇴 회원 관리</h3>
<hr>                  		

<div class="row">
    <div class="col-xl-6">
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
	  <div class="container-fluid">
	    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
		  &nbsp;&nbsp;
		  <input type="hidden" id="viewNumHidden" name="viewNumHidden" value="20">
			<select class="form-select form-select-sm" id="selectPrint" aria-label=".form-select-sm example" >
			  <option value="20" selected>20개</option>
			  <option value="50">50개</option>
			  <option value="100">100개</option>
			</select>
			
		  &nbsp;&nbsp;
		  
	      <form class="d-flex" id="productSearchForm">
	      	<input type="hidden" id="searchPg" name="searchPg" value="1">
<!-- 	      	<select class="form-select form-select-sm" id="searchType" aria-label=".form-select-sm example"> -->
<!-- 			  <option selected>선택</option> -->
<!-- 			  <option value="lowFrequency">낮은 이용빈도</option> -->
<!-- 			  <option value="rejoin">재가입</option> -->
<!-- 			  <option value="lowContents">상품 부족</option> -->
<!-- 			  <option value="protectInfo">개인정보보호</option> -->
<!-- 			  <option value="lowBenefit">혜택 부족</option> -->
<!-- 			  <option value="others">기타</option> -->
<!-- 			</select> -->
			
			<input class="form-control me-2" type="search" name="keyword" id="keyword" 
					placeholder="불편/개선사항 검색" aria-label="Search">
	       	<button class="btn btn-outline-success" type="button" id="withdrawSearchBtn">Search</button>
	     </form>  
	    </div>
	  </div>
	</nav>
	
	<div class="table-responsive-xxl">
		<table id="productTable" class="table table-bordered table-striped table table-sm">
	        <thead class="table-dark">
	            <tr>
	           		<th style="text-align:center;" width="5%">no.</th>
	                <th style="text-align:center;" width="20%">회원ID</th>
	                <th style="text-align:center;" width="25%">탈퇴 사유</th>
	                <th style="text-align:center;" width="300px">불편/개선사항</th>
	                <th style="text-align:center;" width="10%">탈퇴일</th>
	            </tr>
	        </thead>
	        <tbody id="tbody">
	        	<tr></tr>
	        	
	        </tbody>
		   	<tfoot class="table-secondary">
	            <tr>
		            <th style="text-align:center;">no.</th>
	              	<th style="text-align:center;">회원ID</th>
	                <th style="text-align:center;">탈퇴 사유</th>
	                <th style="text-align:center;">불편/개선사항</th>
	                <th style="text-align:center;">탈퇴일</th>
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
	</div> <%--col-xl-5 --%>

<!--  우측   ================================================================================== -->
<div class="col-xl-6">
    <div class="container">
    <div class="row my-3"> 
    <div class="col-12"> 
    <h4>탈퇴 사유 분석</h4> 
    </div> </div> 
    <div class="row my"> 
    <div class="col-lg"> 
    <div class="card"> <div class="card-body"> 
    <canvas id="withdrawReason"></canvas> </div> 
    <div class="card-footer text-center text-dark"> 
    <h5>탈퇴 사유</h5> </div> </div> </div> 


<!-- 	<div class="container">  -->
<!-- 	<div class="row my-3">  -->
<!-- 	<div class="col">  -->
<!-- 	<h4>회원 현황</h4> </div> </div>  -->
<!-- 	<div class="row my-2">  -->
<!-- 	<div class="col">  -->
<!-- 	<div class="card">  -->
<!-- 	<div class="card-body">  -->
<!-- 	<canvas id="currentMember" height="100"></canvas> </div> </div> </div> </div> </div> -->


	</div>  <%-- col-xl-7 --%>     
	</div> <%--row --%> 
</div> <%--col-xl-6 --%>
	</div>
    </div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
<script src="/market/admin/js/withdrawList.js"></script>

</body>
