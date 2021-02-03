<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>상품상세정보</title>
<link rel="stylesheet" href="../css/product/productDetail.css">
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
									<img src="../image/product/product_test.png" alt="상세 상품 이미지"
										id="product_img" />
								</div>
							</div>
							<div class="detail-info__image__watermark"></div>
							<!-- 확대 버튼-->
							<button class="detail-info__image--enlg">
								<i class="fas fa-search"></i> 확대
							</button>
							<div
								class="detail-info__image--prev swiper-button-next swiper-button-white"></div>
							<div
								class="detail-info__image--next swiper-button-prev swiper-button-white"></div>
							<!-- 이미지 개수 ~ -->
							<div class="swiper-pagination"></div>
						</div>
					</div>
					<div class="detail-info__text__div">
						<div class="detail-info__text__div2">
							<div class="detail-info__text__div3">
								<div class="detail-info__text-header">
									<div class="detail-info__text-title">양말</div>
									<div class="detail-info__text-price__div">
										<div class="detail-info__price" id="product_price">
											1,200<span>원</span>
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
												<div id="view">34</div>
											</div>
											<div class="detail-info--topL-item">
												<i class="fas fa-clock"></i>
												<div id="product_logtime">1 일전</div>
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
								<div class="detail-article__text">양말이요 팔아요</div>
								<div class="detail-article__seller-list">
									<!-- 지역 아이템 -->
									<div class="detail-article__seller-item">
										<div class="detail-article-item__header">
											<i class="fas fa-map-marker-alt fa-2x"></i> 거래지역
										</div>
										<div class="detail-article-item__body">
											<div class="detail-article--location" id="product_location">서울</div>
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