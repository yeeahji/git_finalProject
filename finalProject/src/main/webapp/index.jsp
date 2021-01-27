<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>중고 제품의 바다 , 아나바다</title>
<link rel="stylesheet" href="/market/css/index/index.css">
<link rel="stylesheet" href="/market/css/bootstrap/bootstrap.min.css">

<!-- font awesome 5.10.0-->
<link
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
	rel="stylesheet">
<!--CDN 링크 -->

<script type="text/javascript" src="/market/js/bootstrap/bootstrap.js"></script>

</head>
<body>

	<!-- header -->
	<div id="header" class="fixed-top flex"> <!-- sticky-top -->
		<div id="headerLogin" class="container">
			<jsp:include page="/index/headerLogin.jsp" />
		</div>
		<div id="headerMain">
			<div class="container" >
				<jsp:include page="/index/header.jsp" />
			</div>
		</div>

	</div>

	<!-- container -->
	<div class="content container">

		<!-- section -->
		<div id="section">
			<div class="row">
				<c:if test="${not empty display}">
					<jsp:include page="${display}" />
				</c:if>
				<c:if test="${empty display }">
					<jsp:include page="/index/display.jsp" />
				</c:if>
			</div>
		</div>
		<!-- 아이템  -->
	</div>
	
	<!-- nav -->
	<div id="nav">
		<jsp:include page="/index/nav.jsp" />
	</div>
	<div class="content container">
	<!-- footer -->
	<div id="footer">
		<jsp:include page="/index/footer.jsp" />
	</div>
	</div>

	<ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
		<li><button class="dropdown-item" type="button">Action</button></li>
		<li><button class="dropdown-item" type="button">Another
				action</button></li>
		<li><button class="dropdown-item" type="button">Something
				else here</button></li>
	</ul>

</body>

<script type="text/javascript">
	function showMenu() {
		$(".dropdown-menu").show();
	}
</script>


</html>


