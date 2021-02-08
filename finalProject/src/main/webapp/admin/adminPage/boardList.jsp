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
		                            <a class="nav-link" href="/market/admin/memberList">전체 회원 목록</a>
		                            <a class="nav-link" href="/market/admin/productList">전체 상품 목록</a>
		                            <a class="nav-link" href="/market/admin/storeList">전체 상점 목록</a>
		                            <a class="nav-link" href="/market/admin/boardList">게시글목록</a>
		                            <a class="nav-link" href="/market/admin/complainList">신고관리</a>
		                            <a class="nav-link" href="/market/admin/memberQna">고객 상담관리</a>
		                            <a class="nav-link" href="/market/admin/noticeMG">공지사항 관리</a>
		                            <a class="nav-link" href="/market/admin/noticeWrite">공지사항 등록</a>
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
                   <h3 class="mt-4">게시판 관리</h3>
                   <hr>                  		
<div class="row">
	<div class="col-xl-4">
	    <div class="card mb-4">
	        <div class="card-header">
	            <i class="fas fa-chart-area mr-1"></i>
	            	게시판1
	            &nbsp;&nbsp;&nbsp;&nbsp;
		        <button type="button" class="btn btn-secondary btn-sm">조회</button>
		        <button type="button" class="btn btn-secondary btn-sm">이동하기</button>
	        </div>
	        <div class="card-body">
	        	<table class="table table-bordered border-primary table-sm">
				  <tbody>
				    <tr>
				      <th width="20%">총게시글</th><th width="80%"><span id="Span"></span></th> 
				    </tr>
				    <tr>
				      <th>신고된글</th><th><span id="birthSpan"></span></th> 
				    </tr>
				  </tbody>
				</table>
	        </div>
	    </div>
	</div>
	
	<div class="col-xl-4">
	    <div class="card mb-4">
	        <div class="card-header">
	            <i class="fas fa-chart-bar mr-1"></i>
	          	게시판2
	          	 &nbsp;&nbsp;&nbsp;&nbsp;
		        <button type="button" class="btn btn-secondary btn-sm">조회</button>
		        <button type="button" class="btn btn-secondary btn-sm">이동하기</button>
	        </div>
	        <div class="card-body">
	        	<table class="table table-bordered border-primary table-sm">
				  <tbody>
				   <tr>
				      <th width="20%">총게시글</th><th width="80%"><span id="Span"></span></th> 
				    </tr>
				    <tr>
				      <th>신고된글</th><th><span id="birthSpan"></span></th> 
				    </tr>
				  </tbody>
				</table>
	        </div>
	    </div>
	</div>
	
	<div class="col-xl-4">
	    <div class="card mb-4">
	        <div class="card-header">
	            <i class="fas fa-chart-bar mr-1"></i>
	           	게시판3
	           	 &nbsp;&nbsp;&nbsp;&nbsp;
		        <button type="button" class="btn btn-secondary btn-sm">조회</button>
		        <button type="button" class="btn btn-secondary btn-sm">이동하기</button>
	        </div>
	        <div class="card-body">
	        	<table class="table table-bordered border-primary table-sm">
				  <tbody>
				   <tr>
				      <th width="20%">총게시글</th><th width="80%"><span id="Span"></span></th> 
				    </tr>
				    <tr>
				      <th>신고된글</th><th><span id="birthSpan"></span></th> 
				    </tr>
				  </tbody>
				</table>
	        </div>
	    </div>
	</div>
</div>
	
	<nav class="navbar navbar-expand-lg navbar-light bg-light">
	  <div class="container-fluid">
	  
	    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
			<select class="form-select form-select-sm" id="selectPrint" aria-label=".form-select-sm example" >
			  <option value="10" selected>10개</option>
			  <option value="20">20개</option>
			  <option value="30">30개</option>
			  <option value="50">50개</option>
			  <option value="100">100개</option>
			</select>
			
		  &nbsp;&nbsp;
		  
	      <form class="d-flex" id="memberSearchForm">
	      	<input type="hidden" id="searchPg" name="searchPg" value="1">
	      	<select class="form-select form-select-sm" id="searchType" aria-label=".form-select-sm example">
			  <option selected>선택</option>
			  <option value="mem_name">제목</option>
			  <option value="mem_name">내용</option>
			  <option value="mem_id">아이디</option>
			</select>
	        <input class="form-control me-2" type="search" name="keyword" id="keyword" placeholder="Search" aria-label="Search">
	        <button class="btn btn-outline-success" type="button" id="memberSearchBtn">Search</button>
	      </form>  
	      
	    </div>
	  </div>
	</nav>
	
<div class="table-responsive-xxl">
	<table id="memberTable" class="table table-bordered table-striped table table-sm">
        <thead class="table-dark">
            <tr>
                <th>번호</th>
                <th>제목</th>
                <th>아이디</th>
                <th>조회수</th>
                <th>답글수</th>
            </tr>
        </thead>
        <tbody id="tbody">
        	<tr></tr>
        	
        </tbody>
	   	<tfoot class="table-secondary">
            <tr>
              	 <th>번호</th>
                <th>제목</th>
                <th>아이디</th>
                <th>조회수</th>
                <th>답글수</th>
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
    <script src="/market/admin/dist/js/scripts.js"></script>

</body>
