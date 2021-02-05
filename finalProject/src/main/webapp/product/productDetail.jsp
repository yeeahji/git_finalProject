<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
	
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상품상세정보</title>
<link rel="stylesheet" href="../css/product/productDetail.css">
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="/resources/vendor/jquery/jquery-3.5.1.min.js"></script>
<script src="../js/product/product.js"></script>
<script type="text/javascript">
	var imgCommonPreview = new Image();
	function viewPic(filepath) {
		if (filepath == "") {
			alert('등록된 이미지가 없습니다.');
			return;
		}
		imgCommonPreview.src = filepath;
		setTimeout("createPreviewWin(imgCommonPreview)", 100);
	}
	function createPreviewWin(imgCommonPreview) {
		if (!imgCommonPreview.complete) {
			setTimeout("createPreviewWin(imgCommonPreview)", 100);
			return;
		}
		var scrollsize = 17;
		var swidth = screen.width - 10;
		var sheight = screen.height - 90;
		var wsize = imgCommonPreview.width;
		var hsize = imgCommonPreview.height;
		if (wsize < 50)
			wsize = 50; // 가로 최소 크기
		if (hsize < 50)
			hsize = 50; // 세로 최소 크기
		if (wsize > swidth)
			wsize = swidth; // 가로 최대 크기
		if (hsize > sheight)
			hsize = sheight; // 세로 최대 크기

		// 세로가 최대크기를 초과한경우 세로스크롤바 자리 확보
		if ((wsize < swidth - scrollsize) && hsize >= sheight)
			wsize += scrollsize;
		// 가로가 최대크기를 초과한경우 가로스크롤바 자리 확보
		if ((hsize < sheight - scrollsize) && wsize >= swidth)
			hsize += scrollsize;
		// IE 6,7 전용 : 가로세로 크기가 보통일때 세로 스크롤바 자리 확보
		if ((wsize < swidth - scrollsize)
				&& hsize < sheight
				&& (navigator.userAgent.indexOf("MSIE 6.0") > -1 || navigator.userAgent
						.indexOf("MSIE 7.0") > -1))
			wsize += scrollsize;

		// 듀얼 모니터에서 팝업 가운데 정렬하기 
		var mtWidth = document.body.clientWidth;
		// 현재 브라우저가 있는 모니터의 화면 폭 사이즈 
		var mtHeight = document.body.clientHeight;
		// 현재 브라우저가 있는 모니터의 화면 높이 사이즈 
		var scX = window.screenLeft;
		// 현재 브라우저의 x 좌표(모니터 두 대를 합한 총 위치 기준) 
		var scY = window.screenTop;
		// 현재 브라우저의 y 좌표(모니터 두 대를 합한 총 위치 기준) 
		var popX = scX + (mtWidth - wsize) / 2 - 50;
		// 팝업 창을 띄울 x 위치 지정(모니터 두 대를 합한 총 위치 기준) 
		var popY = scY + (mtHeight - hsize) / 2 - 50;
		// 팝업 창을 띄울 y 위치 지정(모니터 두 대를 합한 총 위치 기준) 
		// window.open('주소', '이름(공란가능)', '속성');
		imageWin = window.open("", "", "top=" + popY + ",left=" + popX
				+ ",width=" + wsize + ",height=" + hsize
				+ ",scrollbars=yes,resizable=yes,status=no");
		imageWin.document
				.write("<html><title>Preview</title><body style='margin:0;cursor:pointer;' title='Close' onclick='window.close()'>");
		imageWin.document.write("<img src='" + imgCommonPreview.src + "'>");
		imageWin.document.write("</body></html>");
	}
</script>
</head>
<body>
	<div class="detail__area">
		<div class="detail__div">
			<!-- 상단 메뉴 -->
			<div class="detail-menu__div">
				<div class="detail-menu-home">
					<i class="fas fa-home"></i> 홈
				</div>
				<div class="detail-menu-cbox__item">
					<i class="fas fa-chevron-right"></i>
					<div class="detail-menu-cbox__area">
						<div class="detail-menu-cbox__div">
							<div class="detail-menu-cbox__display">
								<select name="combobox" id="cate_name">
									<option value="test1">1차카테고리</option>
									<option value="test2">카테고리</option>
									<option value="test2">카테고리</option>
								</select>
								<div class="detail-menu-cbox__list">
									<select name="combobox" id="cate_parent">
										<option value="test1">2차카테고리</option>
										<option value="test2">카테고리</option>
										<option value="test2">카테고리</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 상품 정보 -->
			<div class="detail-info__area">
				<div class="detail-info__div">
					<div class="detail-info__image__div">
						<input id="prodno" type="hidden" data-no="78">
						<!-- 이미지 리스트 -->
						<div class="swiper-container detail-info__image__list">
							<!-- 상세 상품 이미지 1장-->
							<div class="swiper-wrapper">
								<div class="swiper-slide">
<!-- 									<img src="../image/product/product_test.png" alt="상세 상품 이미지"
										id="product_img" />
								</div>

								<div class="swiper-slide">
									<img src="../image/product/1.png" alt="상세 상품 이미지" -->
									<img src="/market/storage/${productDTO.product_img1}" alt="상세 상품 이미지"
										id="product_img" />
								</div>

								<div class="swiper-slide">
									<img src="../image/product/2.png" alt="상세 상품 이미지"
										id="product_img" />
								</div> 
							</div>
							<div class="detail-info__image__watermark"></div>
							<!-- 확대 버튼-->
							<button class="detail-info__image--enlg"
								onclick="javascript:viewPic('../image/product/product_test.png')">
								<i class="fas fa-search"></i> 확대
							</button>
							<div
								class="detail-info__image--prev swiper-button-next swiper-button-white"
								onclick="moveSlides(-1)">&#10094;</div>
							<div
								class="detail-info__image--next swiper-button-prev swiper-button-white"
								onclick="moveSlides(1)">&#10095;</div>
							<!-- 이미지 개수 ~ -->
							<div class="swiper-pagination">
								<div style="text-align: center">
									<span class="dot" onclick="currentSlide(0)"></span> <span
										class="dot" onclick="currentSlide(1)"></span> <span
										class="dot" onclick="currentSlide(2)"></span>
								</div>
							</div>
						</div>
					</div>
					<div class="detail-info__text__div">
						<div class="detail-info__text__div2">
							<div class="detail-info__text__div3">
								<div class="detail-info__text-header">
									<div class="detail-info__text-title">${productDTO.product_subject}</div>
									<div class="detail-info__text-price__div">
										<div class="detail-info__price" id="product_price">
											${productDTO.product_price}<span>원</span>
										</div>
									</div>
								</div>
								<div class="detail-info__text-body">
									<div class="detail-info__text-body-top">
										<!-- 찜, 조회수, 시간 -->
										<div class="detail-info__text-body-topL">
											<!-- <div class="detail-info--topL-item">
												<i class="fas fa-heart"></i>
												<div id="zzim">3</div>
											</div> -->
											<div class="detail-info--topL-item">
												<i class="fas fa-eye"></i>
												<div id="view">${productDTO.product_view}</div>
											</div>
											<div class="detail-info--topL-item">
												<i class="fas fa-clock"></i>
												
												<c:set var="b_time" value="${productDTO.product_logtime}" />
												<c:set var="time"
													value="${ b_time > (60 * 24) ? Math.round( b_time / (60 * 24) ) : ( b_time > 60 ? Math.round( b_time / 60 ) : b_time ) }" />
										
												<c:if test="${60 > b_time }">
													<c:set var="unit" value="분 전" />
												</c:if>
												<c:if test="${ b_time > 60 }">
													<c:set var="unit" value="시간 전" />
												</c:if>
												<c:if test="${ b_time > (60 * 24) }">
													<c:set var="unit" value="일 전" />
												</c:if>
												
												<div id="product_logtime"> ${time}${unit}</div>
											</div>
										</div>
										<button class="detail-info__text-body-topR">
											<i class="fas fa-lightbulb fa-"></i> 신고하기
										</button>
									</div>
									<div class="detail-info__text-body-bottom">
										<!-- 아이템 한개 -->
										<div class="detail-info__text-body-bItem">
											<div class="detail-info__text-body-bItem-title">상품상태</div>
											<div class="detail-info__text-body-bItem-content"
												id="product_condition">새상품</div>
										</div>
										<!-- 아이템 한개 -->
										<!-- <div class="detail-info__text-body-bItem">
											<div class="detail-info__text-body-bItem-title">교환여부</div>
											<div class="detail-info__text-body-bItem-content">교환불가능</div>
										</div> -->
										<!-- 아이템 한개 -->
										<div class="detail-info__text-body-bItem">
											<div class="detail-info__text-body-bItem-title">배송비</div>
											<div class="detail-info__delivery" id="product_delivery_fee">배송비
												별도</div>
										</div>
										<!-- 아이템 한개 -->
										<div class="detail-info__text-body-bItem">
											<div class="detail-info__text-body-bItem-title"
												id="product_location">거래지역</div>
											<div class="detail-info__location" id="product_location">서울</div>
										</div>
									</div>
								</div>
							</div>
							<div class="detail-info__btn-list">
								<div class="detail-info__btn-zzim__div">
									<button class="detail-info__btn-zzim" id="zzimBtn">
										<i class="fas fa-heart"></i> <span>찜</span> <span
											id="favoriteCnt">3</span>
									</button>
									<!-- 찜 메시지 -->
									<div class="detail-zzim--div" id="favoriteToast">
										<i class="fas fa-heart"></i> <span class="detail-zzim--msg"
											id="favoriteMsg">찜이 해제</span> 되었습니다.
									</div>
								</div>
								<button class="detail-call__btn" id="callBtn">연락하기</button>
								<!-- <button class="detail-buy_btn" id="buyBtn">바로구매</button> -->
							</div>
							<!-- 신고 모달-->
							<div class="detail-modal" id="productReportModal">
								<div class="report-modal__area">
									<div class="report-modal__head">
										<div class="report-modal__title">
											<div class="report-modal__subject">신고하기</div>
											<button class="report-modal__close">
												<i class="fas fa-times"></i>
											</button>
										</div>
									</div>
									<div class="report-modal__body">
										<!-- 아이템 1개 -->
										<div class="report-modal__item">
											<div class="report-modal__item-title">
												<span>광고(상점홍보, 낚시글, 도배글)</span>
												<button type="button">
													<i class="fas fa-chevron-down"></i>
												</button>
											</div>
											<div class="report-modal__item-content">
												<div class="report-modal--report">
													<button type="button">상점홍보</button>
												</div>
												<div class="report-modal--input">
													<input type="text" placeholder="기타(사유)" />
													<button type="button">등록</button>
												</div>
											</div>
										</div>
										<!-- 아이템 1개 -->
										<div class="report-modal__item">
											<div class="report-modal__item-title">
												<span>광고(상점홍보, 낚시글, 도배글)</span>
												<button type="button">
													<i class="fas fa-chevron-down"></i>
												</button>
											</div>
											<div class="report-modal__item-content">
												<div class="report-modal--report">
													<button type="button">상점홍보</button>
												</div>
												<div class="report-modal--input">
													<input type="text" placeholder="기타(사유)" />
													<button type="button">등록</button>
												</div>
											</div>
										</div>
										<!-- 아이템 1개 -->
										<div class="report-modal__item">
											<div class="report-modal__item-title">
												<span>광고(상점홍보, 낚시글, 도배글)</span>
												<button type="button">
													<i class="fas fa-chevron-down"></i>
												</button>
											</div>
											<div class="report-modal__item-content">
												<div class="report-modal--report">
													<button type="button">상점홍보</button>
												</div>
												<div class="report-modal--input">
													<input type="text" placeholder="기타(사유)" />
													<button type="button">등록</button>
												</div>
											</div>
										</div>
										<!-- 아이템 1개 -->
										<div class="report-modal__item">
											<div class="report-modal__item-title">
												<span>광고(상점홍보, 낚시글, 도배글)</span>
												<button type="button">
													<i class="fas fa-chevron-down"></i>
												</button>
											</div>
											<div class="report-modal__item-content">
												<div class="report-modal--report">
													<button type="button">상점홍보</button>
												</div>
												<div class="report-modal--input">
													<input type="text" placeholder="기타(사유)" />
													<button type="button">등록</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- 연관상품목록 -->
			<div class="product-rel-body">
				<div class="product-rel-div">
					<div class="product-rel-contents">
						<div class="product-rel-content-div">
							<a class="product-rel-content-a" href="#">
								<div class="product-rel-contents-div">
									<img src="../image/product/product_test.png" width="194"
										height="194" alt="상세 상품 이미지">
								</div>
								<div class="product-rel-content-disc">
									<div class="product-rel-content-disc-title">연관상품1</div>
								</div>
							</a>
						</div>
						<div class="product-rel-content-div">
							<a class="product-rel-content-a" href="#">
								<div class="product-rel-contents-div">
									<img src="../image/product/product_test.png" width="194"
										height="194" alt="상세 상품 이미지">
								</div>
								<div class="product-rel-content-disc">
									<div class="product-rel-content-disc-title">연관상품2</div>
								</div>
							</a>
						</div>
						<div class="product-rel-content-div">
							<a class="product-rel-content-a" href="#">
								<div class="product-rel-contents-div">
									<img src="../image/product/product_test.png" width="194"
										height="194" alt="상세 상품 이미지">
								</div>
								<div class="product-rel-content-disc">
									<div class="product-rel-content-disc-title">연관상품3</div>
								</div>
							</a>
						</div>
						<div class="product-rel-content-div">
							<a class="product-rel-content-a" href="#">
								<div class="product-rel-contents-div">
									<img src="../image/product/product_test.png" width="194"
										height="194" alt="상세 상품 이미지">
								</div>
								<div class="product-rel-content-disc">
									<div class="product-rel-content-disc-title">연관상품4</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- 상품 정보 -->
			<div class="detail-product__area">
				<!-- 상품 설명 및 댓글 -->
				<div class="detail-explain__div">
					<div class="detail-explain__tabs">
						<div class="detail-explain__tab">
							<span>상품 정보</span>
							<!--  <span class="detail-explain-span"></span>
							<span class="tab__count"></span>-->
						</div>
					</div>
					<div class="detail-explain__content">
						<!-- 상품 설명 영역 -->
						<div class="detail-explain__content-info">
							<div class="detail-explain__title">상품정보</div>
							<div class="detail-explain__article">
								<div class="detail-article__margin"></div>
								<div class="detail-article__text">${productDTO.product_content}</div>
								<div class="detail-article__seller-list">
									<!-- 지역 아이템 -->
									<div class="detail-article__seller-item">
										<div class="detail-article-item__header">
											<i class="fas fa-map-marker-alt fa-2x"></i> 거래지역
										</div>
										<div class="detail-article-item__body">
											<div class="detail-article--location" id="product_location">${prductDTO.product_location}</div>
										</div>
									</div>
									<!-- 카테고리 아이템 -->
									<div class="detail-article__seller-item">
										<div class="detail-article-item__header">
											<i class="fas fa-folder fa-2x"></i> 카테고리
										</div>
										<div class="detail-article-item__body">
											<a class="detail-article--category" id="cate_name"> 의류<i
												class="fas fa-chevron-right"></i>
											</a>
										</div>
									</div>
									<!-- 상품태그 아이템 -->
									<div class="detail-article__seller-item">
										<div class="detail-article-item__header">
											<i class="fas fa-tags fa-2x"></i> 상품태그
										</div>
										<div class="detail-article-item__body">
											<div class="detail-article--tag-list" id="product_hashtag">
												양말/스타킹
												<!-- 태그 아이템 1개 -->
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 상점 정보-->
				<div class="detail-store__area">
					<div class="detail-export__link-list">
						<button id="kakao-link-btn" class="detail-export_kakao">
							<img src="../image/product/kakao.png" width="10px" />
						</button>
						<button type="button" class="detail-export__url" id="shareUrlBtn">
							<img src="../image/product/url.png" alt="url 아이콘"> <span
								class="url__msg"> 클릭하여 복사하기 </span>
						</button>
					</div>
					<div class="detail-store__div">
						<div class="detail-store__title">상점정보</div>
						<div class="detail-store__content">
							<div class="detail-store__content--title">
								<a class="store-content-title__left" href="#"> <img
									src="../image/product/profile_test.png" alt="판매자 프로필 이미지"
									id="store_img" />
								</a>
								<div class="store-content-title__right">
									<a class="store-content-title__link" href="#"
										id="store_nickname "> 판매자이름</a>
									<div class="store-content-info__list">
										<a class="store-content-info__score" id="store_scoreAvg">
											평균평점</a>
									</div>
								</div>
							</div>
							<!-- 판매자 에코지수 -->
							<div class="detail-store__eco">
								<!-- 에코지수 이미지-->
								<div class="detail-store__image-eco">
									<a class="detail-store__image-ecoIcon"> <img
										src="../image/product/seedling-solid.svg" width="126px"
										height="96px" alt="에코지수이미지" /> <i class="fas fa-seedling"></i>
										<!-- <div class="detail-store__image-price">
											<span>100</span>원
										</div>  -->
									</a>
								</div>
								<!-- 에코지수 상세 -->
								<div class="detail-store__eco">
									이 판매자의 에코지수는 <a class="detail-store__text-eco" id="store_echo">
										10 </a> 입니다
								</div>
							</div>

							<!-- 상점 리뷰 -->
							<div class="detail-store__review-div">
								<div class="detail-review__head">
									상점후기 <span class="detail--empha">0</span>
								</div>
								<div class="detail-review__body">
									<div class="detail-review-nothing--area">
										<div class="detail-review-nothing--msg">
											등록된 후기가 없습니다.<br>첫 후기를 등록해보세요!
										</div>
										<a class="detail-review-nothing--link"> 후기작성 </a>
									</div>
								</div>
							</div>
							<!-- 하단 버튼 -->
							<div class="detail-bottom__btns">
								<!--  <div class="detail-bottom__call-btn" id="bottomCallBtn">
									연락하기</div>-->
								<div class="detail-bottom__buy-btn" id="bottomBuyBtn">
									연락하기</div>
							</div>
						</div>

					</div>

				</div>
			</div>

			<!--<div class="detail-modal" id="callModal">
				<div class="call-modal__area">
					<button class="call-modal__close">
						<i class="fas fa-times"></i>
					</button>
					<img src="../image/product/profile_test.png" alt="연락하기 프로필 이미지"
						class="call-modal__profile">
					<div class="call-modal__title">
						<div class="call-modal__title-text" id="store_nickname ">판매자이름</div>
					</div>
					<div class="call-modal__content">
						<div class="call-modal__item">
							<div class="call-modal__item-title">연락가능시간</div>
							<div class="call-modal__item-content">
								<span class="detail--empha">24시간</span>
							</div>
						</div>
						<div class="call-modal__item">
							<div class="call-modal__item-title">상점별점후기</div>
							<div class="call-modal__item-content">
								<div class="call-modal__item-stars">
									<img src="../images/product/zero.png" width="15px"
										height="14px" /> <img src="../images/product/zero.png"
										width="15px" height="14px" /> <img
										src="../images/product/zero.png" width="15px" height="14px" />
									<img src="../images/product/zero.png" width="15px"
										height="14px" /> <img src="../images/product/zero.png"
										width="15px" height="14px" />
								</div>
							</div>
						</div>
						<div class="call-modal__item">
							<div class="call-modal__item-title" id="mem_tel">상점연락처</div>
							<div class="call-modal__item-content">연락처 비공개</div>
						</div>
					</div>
					<div class="call-modal__btn">
						<button class="call-modal__link">
							<i class="fas fa-phone"></i> 연락하기
						</button>
					</div>
				</div>
			</div>
			
			 <div class="detail-modal" id="buyModal">
				<form name="myPurchase" id="purchases" method="POST"
					action="purchases.do">
					<div class="buy-modal__area">
						<h2 class="buy-modal__title">
							<img src="../image/product/profile_test.png" alt="">안전결제 <a
								href="#" target="_blank" rel="noopener noreferrer"> <i
								class="fas fa-truck"></i> 안전결제란?
							</a>
						</h2>
						<div class="buy-modal__content">
							<input type="hidden" value="78" name="productNo"> <input
								type="hidden" value="76" name="productSeller"> <input
								type="hidden" value="양말" name="productName"> <input
								type="hidden" value="N" name="productFreeShippingSt"> <input
								type="hidden" value="1200" name="productPrice"> <a
								class="buy-modal-content--item" target="_blank" href="#">
								<div class="buy-content__text">
									<div class="buy-content__div">
										<h3 class="buy-content__title">안전거래(택배거래)</h3>
										<span class="buy-content__gray">안전하게 상품을 받을 때까지,<br>네모내모가
											결제금액을 보관해요
										</span>
									</div>
								</div> <i class="fas fa-chevron-right"></i>
							</a>
						</div>
					</div>
				</form> -->
		</div>
	</div>

</body>
</html>