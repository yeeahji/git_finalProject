<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<div class="container-fluid">
    <h3 class="mt-4">전체 상점리스트</h3>
    <hr>        

				
 <div class="row">
    <div class="col-xl-5">
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <div class="container-fluid">
		  
		    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
		      
			  &nbsp;&nbsp;
			  <input type="hidden" id="viewNumHidden" name="viewNumHidden" value="20">
			  <input type="hidden" id="memberList_id" name="memberList_id" value="${id }")>
				<select class="form-select form-select-sm" id="selectPrint" aria-label=".form-select-sm example" >
				  <option value="20" selected>20개</option>
				  <option value="50">50개</option>
				  <option value="100">100개</option>
				</select>
				
			  &nbsp;&nbsp;
			  
		      <form class="d-flex" id="storeSearchForm">
		      	<input type="hidden" id="searchPg" name="searchPg" value="1">
		      	<select class="form-select form-select-sm" id="searchType" aria-label=".form-select-sm example">
				  <option selected>선택</option>
				  <option value="store_nickname">상점이름</option>
				  <option value="mem_id">아이디</option>
				</select>
		        <input class="form-control me-2" type="search" name="storeKeyword" id="storeKeyword" placeholder="Search" aria-label="Search">
		        <button class="btn btn-outline-success" type="button" id="storeSearchBtn">Search</button>
		      </form>  
		      
		    </div>
		  </div>
		</nav>
			
		<div class="table-responsive-xxl">
			<table id="storeTable" class="table table-bordered table-striped table table-sm">
		        <thead class="table-dark">
		            <tr>
		                <th width="20%">아이디</th>
		                <th width="70%">상점이름</th>
		                <th width="10%">에코점수</th>
		            </tr>
		        </thead>
		        <tbody id="tbody">
		        	<tr></tr>
		        	
		        </tbody>
			   	<tfoot class="table-secondary">
		            <tr>
		              	<th>mem_id</th>
		                <th>store_nickname</th>
		                <th>store_echo</th>
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
    
      <div class="col-xl-7">
	    <div class="card mb-4">
	        <div class="card-header">
	            <i class="fas fa-chart-area mr-1"></i>
	            	상세정보
	        </div>
	        <div class="card-body">
	        	<table class="table table-bordered border-primary table-sm">
				  <tbody>
				    <tr>
				      <th width="20%">이름</th><th width="30%"><span id="nameSpan"></span></th> 
				      <th width="20%">상점이름</th><th width="30%"><span id="storeNameSpan"></span></th>
				    </tr>
				    <tr>
				      <th>판매등록상품수</th><th><span id="total_Product1Span"></span></th> 
				      <th>후기수</th><th><span id="reviewSpan"></span></th>
				    </tr>
				    <tr>
				      <th>사진유무</th><th><a href="#"><span id="pictureSpan"></span></a></th> 
				      <th>등급</th><th><span id="echoSpan"></span></th>
				    </tr>
				    <tr>
				    	<th>상점소개글</th><th colspan="3"><span id="introSpan"></span></th>
				    </tr>
				    
				  </tbody>
				</table>
	        </div>
	    </div>
	    
	    <div class="card mb-4">
	        <div class="card-header">
	            <i class="fas fa-chart-bar mr-1"></i>
	           	상품정보
	           	
	           	<div class="btn-group" role="group" aria-label="Basic example" id="product_manage" value="">
				  <button type="button" class="btn btn-secondary btn-sm" value="0">전체</button>
				  <button type="button" class="btn btn-secondary btn-sm" value="1">판매중</button>
				  <button type="button" class="btn btn-secondary btn-sm" value="2">예약중</button>
				  <button type="button" class="btn btn-secondary btn-sm" value="3">판매완료</button>
				</div>
	           	<button type="button" class="btn btn-danger btn-sm" id="choiceDeleteBtn">삭제</button>
	        </div>
	        <div class="card-body">
	        	<table class="table table-bordered border-primary table-sm">
				  <tbody>
				    <tr>
				      <th width="11%">총개수</th><th width="13%"><span id="total_Product2Span"></span></th>
				      <th width="11%">판매중</th><th width="13%"><span id="sale_productSpan"></span></th>  
				      <th width="11%">예약중</th><th width="13%"><span id="reservation_productSpan"></span></th>  
				      <th width="11%">판매완료</th><th width="13%"><span id="sold_productSpan"></span></th>  
				    </tr>
				  </tbody>
				</table>
				
		<form id="store_productListForm" method="get" action="store_productDelete">
			<div class="table-responsive-xxl">
				<table id="store_product_Table" class="table table-bordered table-striped table table-sm">
			        <thead class="table-dark">
			            <tr>
			            	<th width="5%"><input type="checkbox" id="all"></th>
			                <th width="10%">번호</th>
			                <th width="40%">이름</th>
			                <th width="10%">수량</th>
			                <th width="15%">가격</th>
			                <th width="20%">판매상태</th>
			            </tr>
			        </thead>
			        <tbody id="store_product_tbody">
			        	<tr></tr>
			        	
			        </tbody>
				   	<tfoot class="table-secondary">
			            <tr>
			              	<th width="5%"></th>
			                <th width="10%">번호</th>
			                <th width="40%">이름</th>
			                <th width="10%">수량</th>
			                <th width="15%">가격</th>
			                <th width="20%">판매상태</th>
			            </tr>
			        </tfoot>
				</table>
			</div>
		</form>
	        </div>
	    </div>
	</div>
</div>
</div>
      

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
<script src="/market/admin/js/storeList.js"></script>
<script type="text/javascript">
function boardPaging(pg){
	var storeKeyword = document.getElementById("storeKeyword").value;
	$('#pg').val(pg);

	 if(storeKeyword ==''){
		location.href='/market/admin/storeList?pg='+pg+'&viewNum='+$('#viewNum').val();
	 }else{
		$('#storeSearchBtn').trigger('click','research');
	 }
}
</script>
