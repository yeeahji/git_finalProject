<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>아나바다::상품등록</title>

<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script defer src="../js/product/registForm.js"></script>
<script defer src="../js/product/registForm_btn.js"></script>

<link rel="stylesheet" href="${pageContext.request.contextPath}/css/product/registForm.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/product/registForm_common.css">
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/product/registForm_btn.css">

</head>

<body>
	<form id="registForm">
	<div class="registWrap"> <!-- /* eFCEB */ -->
		<!--------- registTop : 상품등록, 상품관리  --------->
		<div class="registTop">
			<nav class="topArea">
				<div class="topList1">
					<a class="topText1" href="#">상품등록</a>
				</div>
				<div class="topList2">
					<a class="topText2" href="#">상품관리</a>
				</div>
			</nav>
		</div><!-- registTop -->
		
		<!--------- registBody : 본문  --------->
		<div class="registBody"> <!-- /* owOgK */ -->
			<main id="registMain"> <!-- /* fzZuLM */ -->
			
				<!-- section -->
				<section class="section">
					<h2>기본정보<span>*필수항목</span></h2>
					
					<ul class="listBody"> <!-- /* bEbvUk */ -->
						<li class="list">
							<div class="image_sub">상품이미지<span>*</span><small>(0/12)</small></div>
							<div class="image_con">
								<ul class="registImages">
									<li class="registImage" id="registImage">이미지 등록<input type="file" accept="image/jpg, image/jpeg, image/png" multiple=""></li>
									<li draggable="false" class="registImageOther">
										<div class="representImage">대표이미지</div>
										<img src="" alt="상품이미지">
										<button type="button" class="imageBtn"></button>
									</li>
									<li draggable="false" class="registImageOther">
										<img src="" alt="상품이미지">
										<button type="button" class="imageBtn"></button>
									</li>
								</ul>
								<div class="imageDiv" id="imageDiv">상품 사진을 등록해주세요.</div>
								
								<div class="textImage">
									<b>* 상품 이미지는 640x640에 최적화 되어 있습니다.</b><br>
									- 이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다.<br>
									- 이미지를 클릭 할 경우 원본이미지를 확인할 수 있습니다.<br>
									- 이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.<br>
									- 큰 이미지일경우 이미지가 깨지는 경우가 발생할 수 있습니다.<br>
									최대 지원 사이즈인 640 X 640 으로 리사이즈 해서 올려주세요.(개당 이미지 최대 10M)
								</div>
								<div class="blindImage">
									<div class="blindImageArea">
										<button type="button" class="imageBtn">
											<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAABACAYAAACjgtGkAAAAAXNSR0IArs4c6QAAAolJREFUeAHl20tSxCAQANCJW12ql3DtKTxE9GQ6h/AU7j2EutT12J1qUowhCZ/+AFLFgIEU9pvApjPDAcrpdLqH5gHqJ9TjMAzf0HZfIO4rCHKEegP1FeJ+u6Co36H9oIGRJtJQn80fDIwdDQ6DCxcmXEIftW6hdv2kBDBwV/ygxQyCf/wHlC2MBUjvKHsYQZBeUWIwVkF6Q4nF2ATpBSUFYxekdZRUjCiQVlFyMKJBWkPJxUgCaQWlBCMZpHaUUowskFpRODCyQWpD4cIoAqkFhROjGMQahRuDBcQKRQKDDUQbRQqDFUQLRRKDHUQaRRpDBEQKRQNDDIQbRQtDFIQLRRNDHKQURRtDBSQXxQJDDSQVxQpDFSQWxRJDHWQPxRrDBGQNBa9DcYlnzLXO6cVpROnjLJWptOa0DDwNfi75i9a+htYMA/8HMxBcnFCeoIsQWBDm2SWepyvKH+51COVl5+VCX0jo2nyDdMcMxDtA8enAJwMr9kcag65+Mfk2PAx8c2c6Myh08/dT1EFCGO7MgDH/oDV5aUcVZAvDbQ5rFDWQGIwaUFRAUjCsUcRBcjAsUURBSjCsUMRAODAsUERAODG0UdhBJDA0UVhBJDG0UNhANDA0UFhANDGkUYpBLDAkUYpALDGkULJBasCQQMkCqQmDGyUZpEYMTpQkkJoxuFCiQVrA4ECJAmkJoxRlF6RFjBKUTZCWMXJRVkF6wMhBCSaqesJAFEpzHKGLOSDMBY0QI6Y8FmUBQhNdFt7lRqYf+S7ubuiCh4IxIcpjCOVsy9CER7oBb3xxSSTod1H2YpxB9iZ2oUFBbMU6gWxN6AnCj2UtZneG3MFk3FddbhMfwvUDZwoaHH4B+xHVOFecBB4AAAAASUVORK5CYII="
												width="34" height="32" alt="닫기 버튼 아이콘">
										</button>
										<div class="productImage">
											<div class="productImage1">상품이미지</div>
											<div class="productImage2"></div>
											<div class="productImage3"></div>
										</div>
									</div>
								</div>
							</div>
						</li><!-- 상품이미지 -->
							
							
						<li class="list">
							<div class="subject_sub">제목<span>*</span></div>
							<div class="subject_con">
								<div class="contentArea">
									<div class="subjectBox">
										<input type="text" placeholder="상품 제목을 입력해주세요." class="subjectInput" id="subject">
										<button type="button" class="subjectCancle"></button>
									</div>
									<div class="subjectSize"><span>0</span>/40</div>
								</div>
								<div class="subjectDiv" id="subjectDiv">상품명을 2자 이상 입력해주세요.</div>
							</div>
						</li><!-- 제목 -->
							
							
						<li class="list">
							<div class="category_sub">카테고리<span>*</span></div>
							<div class="category_con">
								<div class="contentArea">
									<div class="categoryStep">
										<ul class="categories">
											<li class="category"><button type="button" class="btn">여성의류</button></li>
											<li class="category"><button type="button" class="btn">남성의류</button></li>
											<li class="category"><button type="button" class="btn">패션잡화</button></li>
											<li class="category"><button type="button" class="btn">생활/가구/식품</button></li>
											<li class="category"><button type="button" class="btn">디지털/가전</button></li>
											<li class="category"><button type="button" class="btn">유아동/출산</button></li>
											<li class="category"><button type="button" class="btn">도서/취미/애완</button></li>
											<li class="category"><button type="button" class="btn">스포츠/레저</button></li>
											<li class="category"><button type="button" class="btn">스타굿즈</button></li>
											<li class="category"><button type="button" class="btn">뷰티/미용</button></li>
											<li class="category"><button type="button" class="btn">차량/오토바이</button></li>
											<li class="category"><button type="button" class="btn">기타</button></li>
										</ul>
									</div>
									<div class="categoryStep">소분류 선택</div>
								</div>
								<div class="categoryDiv" id="categoryDiv">카테고리를 선택해주세요.</div>
								
								<h3 class="text">
									선택한 카테고리 : <b></b>
								</h3>
							</div>
						</li><!-- 카테고리 -->
						
						
						<li class="list">
							<div class="location_sub">거래지역<span>*</span></div>
							<div class="location_con">
								<div class="contentArea">
									<button type="button">내 지역</button>
									<button type="button">최근 지역</button>
									<button type="button">주소 검색</button>
								</div>
								<input placeholder="선호 거래 지역을 검색해주세요." class="locationInput" id="location" readonly>
								<div class="locationDiv" id="locationDiv">거래지역을 선택해주세요.</div>
							</div>
						</li><!-- 거래지역 -->
						
						
						<li class="list">
							<div class="condition_sub">상태<span>*</span></div>
							<div class="condition_con">
								<div class="contentArea">
									<label for="중고상품" class="usedCondition">
										<span id="usedConditionSpan">
										<input type="radio" name="conditions" id="usedCondition" value="0">중고상품
										</span>
									</label>
									
									<label for="새상품" class="newCondition">
										<span id="newConditionSpan">
										<input type="radio" name="conditions" id="newCondition" value="1">새상품
										</span>
									</label>
								</div>
							</div>
						</li><!-- 상태 -->
						
					
						<li class="list">
							<div class="price_sub">가격<span>*</span></div>
							<div class="price_con">
								<div class="priceBox">
									<input type="text" placeholder="숫자만 입력해주세요." class="priceInput" id="price">원
								</div>

								<!-- 배송비 포함 여부 -->
								<div class="deliveryArea">
									<div class="deliveryBox">
										<!-- <span class="freeDeliveryBefore"></span> -->
										<label for="freeDelivery" class="freeDelivery">
											<input id="freeDelivery" type="checkbox">배송비 포함
										</label>
									</div>
								</div>
								<div class="priceDiv" id="priceDiv">100원 이상 입력해주세요.</div>
							</div>
						</li><!-- 가격 -->
						
						
						<li class="list">
							<div class="instruction_sub">설명</div>
							<div class="instruction_con">
								<textarea placeholder="상품 설명을 입력해주세요." rows="6" class="instruction"></textarea>
								<div class="text">
									<a target="_blank" href="/market/notice/fag">
										<img src="/market/image/product/warning_icon.svg">거래금지품목
									</a><!-- 자주묻는질문 -> '거래하면 안되는 것들'로 새 창 띄우기-->
									<div class="limit">0/2000</div>
								</div>
							</div>
						</li><!-- 설명 -->
							
							
						<li class="list">
							<div class="tag_sub">연관태그</div>
							<div class="tag_con">
								<div class="inputArea">
									<div class="input">
										<div class="tag">
											<input type="text" placeholder="연관태그를 입력해주세요. (최대 5개)" value="">
										</div>
									</div>
								</div>
								<ul class="text">
									<li><p>태그는 띄어쓰기로 구분되며 최대 9자까지 입력할 수 있습니다.</p></li>
									<li><p>태그는 검색의 부가정보로 사용 되지만, 검색 결과 노출을 보장하지는 않습니다.</p></li>
									<li><p>검색 광고는 태그정보를 기준으로 노출됩니다.</p></li>
									<li><p>상품과 직접 관련이 없는 다른 상품명, 브랜드, 스팸성 키워드 등을 입력하면 노출이
											중단되거나 상품이 삭제될 수 있습니다.</p></li>
								</ul>
							</div>
						</li><!-- 연관태그 -->
					</ul>
				</section>
				
				
				<!-- btmText : 꼭 읽어주세요 -->
				<div class="btmText">
					<h3>꼭 읽어주세요
						<a href="/market/notice/policy" target="_blank" rel="noopener noreferrer">이용 가이드</a>
					</h3>
					<p>상품등록 시 <b>번개페이가 자동 적용(다른말쓰기)</b>됩니다. 거래완료 후 등록된 계좌로 입금되며 <b>정산 확인은 ‘마이메뉴 &lt; 구매/판매내역’</b>에서 가능합니다.</p>
				</div>
				
			</main><!-- registMain -->
		</div><!-- main -->
					
					
		<!--------- registBtm : 등록하기  --------->
		<footer class="registBtm">
			<div class="btmArea">
				<button type="button" class="registBtn" id="registBtn"></button>
			</div>
		</footer>

	</div><!-- registWrap -->
	</form>
</body>
</html>

















