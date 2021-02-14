<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
   <meta name="description" content="" />
   <meta name="author" content="" />
   <title>게시판 관리</title>
   <link href="/market/admin/css/styles.css" rel="stylesheet" />
   <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
   <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script> 
   <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script> 
   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</head>
<body>
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="/market/admin/adminIndex">아나바다</a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
            
            <!-- Navbar Search-->
            <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group">
                    	<a href="#" style="color:#FFFFFF;">관리자 아이디</a>"&nbsp; &nbsp; "<a href="#" style="color:#FFFFFF;">로그인시간</a>
                </div>
            </form>
            
            <!-- Navbar-->
            <ul class="navbar-nav ml-auto ml-md-0">
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="userDropdown" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                        <a class="dropdown-item" href="#">옵션1</a>
                        <a class="dropdown-item" href="#">옵션2</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="login.html">Logout</a>
                    </div>
                </li>
            </ul>
        </nav>
        
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            <div class="sb-sidenav-menu-heading">Core</div>
                            <a class="nav-link" href="/market/admin/adminIndex">HOME</a>
                            
                            <div class="sb-sidenav-menu-heading">Interface</div>
	                           <ul>
		                            <a class="nav-link" href="/market/admin/memberList">전체 회원 관리</a>
		                            <a class="nav-link" href="/market/admin/withdrawList">탈퇴 사유 분석</a>
		                            <a class="nav-link" href="/market/admin/storeList">전체 상점 관리</a>
		                            <a class="nav-link" href="/market/admin/productList">전체 상품 관리</a>
		                            <a class="nav-link" href="/market/admin/complainList">신고 내역 관리</a>
		                            <a class="nav-link" href="/market/admin/memberQna">1:1 문의 관리</a>
	                    		</ul>
                            

                            <div class="sb-sidenav-menu-heading">Addons</div>
                            <a class="nav-link" href="charts.jsp">
                                <div class="sb-nav-link-icon"><i class="fas fa-chart-area"></i></div>
                                Charts
                            </a>
                            
                        </div>
                    </div>
                    <div class="sb-sidenav-footer">
                        <div class="small">Logged in as:</div>
                       	 관리자 아이디
                    </div>
                </nav>
            </div>
            
               
<%-- ======================================================= --%>
<%-- ======================================================= --%>
<div id="layoutSidenav_content">
	<main>
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
				      	<select class="form-select form-select-sm" id="searchType" aria-label=".form-select-sm example">
						  <option selected>선택</option>
						  <option value="lowFrequency">낮은 이용빈도</option>
						  <option value="rejoin">재가입</option>
						  <option value="lowContents">상품 부족</option>
						  <option value="protectInfo">개인정보보호</option>
						  <option value="lowBenefit">혜택 부족</option>
						  <option value="others">기타</option>
						</select>
						
						<input class="form-control me-2" type="search" name=keyword" id="keyword" placeholder="Search" aria-label="Search">
			        	<button class="btn btn-outline-success" type="button" id="withdrawSearchBtn">Search</button>
				     </form>  

				      
				    </div>
				  </div>
			</nav>
			
			<div class="table-responsive-xxl">
				<table id="productTable" class="table table-bordered table-striped table table-sm">
			        <thead class="table-dark">
			            <tr>
			           		<th width="5%">no.</th>
			                <th width="20%">회원ID</th>
			                <th width="25%">탈퇴 사유</th>
			                <th width="40%">불편/개선사항</th>
			                <th width="10%">탈퇴일</th>
			            </tr>
			        </thead>
			        <tbody id="tbody">
			        	<tr></tr>
			        	
			        </tbody>
				   	<tfoot class="table-secondary">
			            <tr>
				            <th>no.</th>
			              	<th>회원ID</th>
			                <th>탈퇴 사유</th>
			                <th>불편/개선사항</th>
			                <th>탈퇴일</th>
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
    <div class="row my-2"> 
    <div class="col-lg-6"> 
    <div class="card"> <div class="card-body"> 
    <canvas id="myChart1"></canvas> </div> 
    <div class="card-footer text-center text-dark"> 
    <h5>탈퇴 사유</h5> </div> </div> </div> 


	<div class="container"> 
	<div class="row my-3"> 
	<div class="col"> 
	<h4>회원 현황</h4> </div> </div> 
	<div class="row my-2"> 
	<div class="col"> 
	<div class="card"> 
	<div class="card-body"> 
	<canvas id="myChart" height="100"></canvas> </div> </div> </div> </div> </div>


</div>  <%-- col-xl-7 --%>     
</div> <%--row --%> 
		</div> <%--container-fluid --%>
	</main>
                   
<%-- ======================================================= --%>
<%-- ======================================================= --%>
               
               
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2020</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
    <script src="/market/admin/js/withdrawList.js"></script>
    <script type="text/javascript">
	function boardPaging(pg){
		var keyword = document.getElementById("keyword").value;
		$('#pg').val(pg);
	
		 if(keyword ==''){
			location.href='/market/admin/withdrawList?pg='+pg+'&viewNum='+$('#viewNum').val();
		 }else{
			$('#withdrawSearchBtn').trigger('click','research');
		 }
	}
	</script>


</body>
