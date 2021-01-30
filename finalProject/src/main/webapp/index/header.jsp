<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div class="first">
	<div class="main-logo">
		<img src="/market/image/index/fleamarket.png" style="width: 180px; height: 50px; cursor:pointer;"
			alt="로고들어갈 곳" onclick="location.href='/market/index.jsp'">
		<!-- <h5>플리마켓</h5> -->
	</div>

	<!-- 검색창 영역 -->
	<div class="search-area">
		<!-- 검색 입력 -->
		<div class="input-group">
			<input type="text"> <i class="fas fa-search"></i>
		</div>
	</div>

	<!-- 우측메뉴 -->
	<div class="header-btn">
		<button type="button" class="btn btn-primary" onclick="location.href='/market/product/registForm'">
			<i class="fas fa-won-sign"></i> 판매하기
		</button>
		<button type="button" class="btn btn-primary" onclick="location.href='/market/store/store'">
			<i class="fas fa-user-check"></i> 내 상점
		</button>
		<button type="button" class="btn btn-primary">
			<i class="far fa-comments"></i> 번개톡
		</button>
		<button type="button" class="btn btn-primary">
			<i class="fas fa-book-open"></i> 커뮤니티
		</button>
	</div>

</div> 

<div class="dropdown">
	<a id="btn_menu" data-bs-toggle="dropdown" aria-expanded="false">
		<i class="fas fa-bars"></i>
	</a>
</div>
