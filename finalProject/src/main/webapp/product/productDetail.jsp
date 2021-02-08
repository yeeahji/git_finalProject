<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<sec:authentication property="principal" var="member"/> <!-- 사용자 정보 가져오기 -->
<!-- 리뷰; 시큐리티 로그인 중인 아이디 -->
<input type="hidden" class="loginId" value="${member.username}">
<!-- 리뷰; 주소로넘어온 -->
<%-- <input type="hidden" class="hiddenId" value="${param.id}"> --%>

	
<link rel="stylesheet" href="../css/product/productDetail.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script> 
<script src="../js/product/productDetail.js"></script>

<meta name="viewport" content="width=device-width, initial-scale=1">

<script src="https://unpkg.com/swiper/swiper-bundle.js"></script>
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

<body>
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
<!-- product_seq 받아옴  -->
<input type="hidden" class="hiddenProdSeq" value="${seq}">

<div class="detail__area">
<div class="detail__div">
	<!-- 상단 카테고리  -->
    <div id="prodDetailCateWrap1">
       <div id="prodDetailCateWrap2">
          <div class="cateHome"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAkRJREFUSA3tlb9LHEEUx2/vzhQXESxsTau1aWxsFDkQA0ljEcv78RfY2EQbwT/hflU2KjGkCASRgI1FQEVstNU2QkD0YnXn5x03x7vZXXfnXGzMwPBm3pv5fubNj10vNUCpVCpDTNuibpfL5e8DSKTSrpME6nneDvOWqLv1en3RVUPGO4ENtN1uf2RukzrUarW+4l8QMZcSG2xBb9Lp9DSgdRbxBrtH5nkXsBdncAB0tlgsnstcYmuYL2z/A/UD/gPxR5VI8FNQI27g9P9lMpnFQqHwy8TC7JPgOFAjrOBNjmGBzA9NLMiGnrELVIR5VmuYdWqOc//Bmc/QDi2BGbtCtbrK/I5tz7PtRzpu2r6MnwMVUZX5ME/tZ6PRkNvvK30ZPxeq1VXmt/jnWdBvHe9lnCRUACrzEbr7ZP5egzsZW9AU7zFfKpX29cBB29Vq9Vv3S/cXjTkWdCpaWRsqTsA3Yk1hTI4nMmn6YZYzvUf4UseB/un2R9E9YCGzJHWWRXCF4DjOE6yI5/REaQsU0WPbb/dFA1/flqoxsqB7GJsk8jnLQ9/AITXFao4JTEk7pDQRv7BjzHmLb8L26z6LX4YlC+uUrGnEsQJlm3wZ1Wq1qTg7ohm9W62dL9H+D36JXe4wnC4Xt3eMi1SyV8fFemf7ovpOYMTGgVSiROPEY4GBydenGiXIc7uKGmPiscB8Bq+ZUDaTkrCv7zkFbjVn+kk+g0lsKS9hkuqTCgQzahW4b3CSjj4wt1J+2r0/SJKg7svoST4CXawe/d9nd+gAAAAASUVORK5CYII=" width="15" height="15" alt="홈 아이콘">홈</div>
          <!-- 대분류 -->
          <div class="cateBigWrap">
             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAaVJREFUKBWFUz1LA0EQde9DIjaxSBNIG2shnR9whYVgIQqnjURikhP/QDqLVPoL9KJJEUHIgYggSFCs7K2tU6ZIrAwa73zvyB6bM8GB3Ox782Z2Z3YjZmCe5832er2WruvVYrH4Rm6aaQz0+/0ruC3f99v1en1xmpi85rpuNQiCfQL41HA4fGo0GhniSaYJIRZigQySnpGUivEhFKgqLmHwhzEBe7Ecx/lQee4QlEqlMsgbNYD1En4PGMicyodNI8nPZrN5+Ds1iPUKBnKLPk3JhwkElmUNk8nkHpIeZZAeR92Au4YPtVECg7Ztf5mmuY2kF2LFdmu12jmxUMho2Ww25weDQRtVlyOSYiHOxnaQwUQi4UMcSKz6PzuwQVS6h55njwycWy6Xj8Z2gIiYDY6JwbUw+mNm6/xIS6fTF1jnJaZHZU7NzuVyP8QGPzRM4RSVeYGqvWLUO5jetyTDI0FcgbgiyZHn09iE+FPlBZp0QPAoqr3jPlYLhUJXJbnmDmsxsgPx+iSxTDgYNcYGu4ZhUNyJFYlgeA98kXhknqZpJ//9RX8BYkCa7Y9z0J0AAAAASUVORK5CYII=" width="6" height="10" alt="카테고리 선택 아이콘">
             <div class="cateBigSelectWrap">
                <div class="cateBigSelect">
                   <div class="cateBigSelectText">
                     		 패션잡화
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" width="10" height="6" alt="카테고리 화살표 아이콘">
                   </div><!-- //text -->
                   <div class="cateBigOpen"></div><!-- 펼치면 나오는애들  -->
                </div>
             </div>
          </div><!-- //cateBigWrap  -->
           <!-- 소분류 -->
          <div class="cateSmallWrap">
             <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAUCAYAAAC58NwRAAAAAXNSR0IArs4c6QAAAaVJREFUKBWFUz1LA0EQde9DIjaxSBNIG2shnR9whYVgIQqnjURikhP/QDqLVPoL9KJJEUHIgYggSFCs7K2tU6ZIrAwa73zvyB6bM8GB3Ox782Z2Z3YjZmCe5832er2WruvVYrH4Rm6aaQz0+/0ruC3f99v1en1xmpi85rpuNQiCfQL41HA4fGo0GhniSaYJIRZigQySnpGUivEhFKgqLmHwhzEBe7Ecx/lQee4QlEqlMsgbNYD1En4PGMicyodNI8nPZrN5+Ds1iPUKBnKLPk3JhwkElmUNk8nkHpIeZZAeR92Au4YPtVECg7Ztf5mmuY2kF2LFdmu12jmxUMho2Ww25weDQRtVlyOSYiHOxnaQwUQi4UMcSKz6PzuwQVS6h55njwycWy6Xj8Z2gIiYDY6JwbUw+mNm6/xIS6fTF1jnJaZHZU7NzuVyP8QGPzRM4RSVeYGqvWLUO5jetyTDI0FcgbgiyZHn09iE+FPlBZp0QPAoqr3jPlYLhUJXJbnmDmsxsgPx+iSxTDgYNcYGu4ZhUNyJFYlgeA98kXhknqZpJ//9RX8BYkCa7Y9z0J0AAAAASUVORK5CYII=" width="6" height="10" alt="카태고리 선택 아이콘">
             <div class="cateSmallSelectWrap">
                <div class="cateSmallSelect">
                   <div class="cateSmallText">
                      	남성화
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAOCAYAAAAvxDzwAAAAAXNSR0IArs4c6QAAASVJREFUOBGlks9qwkAQxrMLihRKQXyUHjx58dBLEXqxUPCavIKvkpCQgxcTD0LpSQQfoBfpRXwHj16av37fYWWrJhvqwDCbb2d+O5NdYcFc120hzIQQkW3bS2pNzPf9blEUC+ROUffNGkEYQWVZvuE7xfq9CRR1T8hfw5/hR/jIcZyN8DyPsDEEZUZoEASPeZ6vUNdXRYi/aOZVYjGHp9pGC4kRDmLHV4bOHrIs+7qAWYDtoW0lx+OYqDRCwzDsIO8TPtBPQv0PYEOMfGCHVhNoHMftJEl4YcMqGHWhb3JMjguNt64slVJOoH/AR0pk1DtT+h8gxQqoyj/HWzBuXgEpmqBVsEpgHbQOVgu8BTXBjEAdCthOPQ3qdxn+6QsedO8uyH+LT8nvvwPGjeHzAAAAAElFTkSuQmCC" width="10" height="6" alt="카테고리 화살표 아이콘">
                   </div>
                   <div class="cateSmallOpen"></div><!-- 소분류 펼ㅊㅣ면 -->
                </div><!-- //cateSmallSelectWrapcateSmallSelect -->
             </div><!-- //cateSmallSelectWrap -->
          </div><!-- //cateSmallWrap -->
       </div><!-- //prodDetailCateWrap2 -->
    </div><!-- //prodDetailCateWrap1 -->

		
	<!-- 상품 정보 -->
	<div class="detail-info__area">
		<div class="detail-info__div">
			<div class="detail-info__image__div">
				<input id="prodno" type="hidden" data-no="78">
				<!-- 이미지 리스트 -->
				<div class="swiper-container detail-info__image__list">
					
					<div class="swiper-wrapper">
						<!-- productDetail.js -->
					</div><!-- //swiper-wrapper -->
					
					<!-- 워터마크 -->
					<div class="detail-info__image__watermark"></div>
					<!-- 확대 버튼-->
					<button class="detail-info__image--enlg" onclick="javascript:viewPic('../image/product/product_test.png')">
						<i class="fas fa-search"></i> 확대
					</button>
					<div class="detail-info__image--prev swiper-button-next swiper-button-white" onclick="moveSlides(-1)">&#10094;</div>
					<div class="detail-info__image--next swiper-button-prev swiper-button-white" onclick="moveSlides(1)">&#10095;</div>
					
					<!-- 슬라이더 버튼 수 -->
					<div class="swiper-pagination">
						<div class="paginationBtn" style="text-align: center">
							<!-- productDetail.js -->
						</div>
					</div>
					
				</div>
			</div><!-- //detail-info__image__div -->
			
			
			<div class="detail-info__text__div">
				<div class="detail-info__text__div2">
					<div class="detail-info__text__div3">
						<div class="detail-info__text-header">
							<!-- 상품명 -->
							<div class="detail-info__text-title"></div>
							<div class="detail-info__text-price__div">
								<!-- 상품가격 -->
								<div class="detail-info__price" id="product_price">
								</div>
							</div>
						</div>
						<div class="detail-info__text-body">
							<div class="detail-info__text-body-top">
								<!-- 찜, 조회수, 시간 -->
								<div class="detail-info__text-body-topL">
									<div class="detail-info--topL-item">
										<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAjhJREFUWAnFl1uPKUEUhbdCxF2Iu7h78f9/ixdexANeSNxCkJnz1ZwSRncrM0OvhK6ufVmrdiu1O/DxD/INq9VKFouFbDYbOR6PEggEJBKJSDqdlkKhIKFQ6FvE1+3pdJL5fC7EHw4HIXU4HJZEIiHZbFZSqdRdXOBaAEHj8VjW6/Wdo5kIBoNSLBalVCppYcxDNJvNNPn5fDaud9dkMimNRkMvxhgvAna7nQyHQ2EVNmBV3W5Xu45GI10tmziq1+v1JBaLaXctANLBYKDLbZPE+MTjcT3cbrdmyurKY+n3+/pRKiImk8nT5MRB/Cw5cfyu4ARqv9/LcrnUN+/8ghNuxcBhI7xcC5xwK7aMX4BbsfX8AtzKa9++Whjcij8WvwC3Yk/6BbiV+TPxQwTcKpPJ+MGtOeFWHBB+PAY44VYctZxu7waccOuzIJ/Pv7UKrB5OoAUopfQ5/a4q0BPAeRHAgG4nl8vpyVd+wQGXwZeM/3f1el2i0aix/fmV3HBc40YAZel0Oq4933Xgs2M6IXKb0pv4GwFM0ny22+1Lv2ccf3Pl195qtW56QZPvTgAG9mez2fwTEZCTy6kjhstRAAba6FqtxvBXIAe53OAqgADeASqVilvsw3liyeEFTwEElstl/fFK4mSzjXsogOSshBcRW+BrWzkrARBXq1UrEZDjawtrAUYEpXXDs+TkeUoAAZTWScRPyMnn/JqLxQPm+U6nU+2FIDPnEeZourycOlofTF4LeODqav4EUxqvNxGf2nsAAAAASUVORK5CYII=" width="16" height="16" alt="상품 상태 아이콘">
										<!-- 찜 수 -->
										<div id="zzim"></div>
									</div>
									<div class="detail-info--topL-item">
										<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAaCAYAAADMp76xAAAAAXNSR0IArs4c6QAABAdJREFUWAm9mFtIFFEYx9tZ11UW1tLoaoGEPShqq3ahgogyIgnqQXqIgih6qKgEH4JIqCgIIoowIrSn6i0irOxCQdAN7wb2IiSlSUZuGJGyumu/b9lZZo8zs7ObdeBwvvNd/uc/53zznWFcs9Js7e3tczVNWzs1NbUKiErGfJfLNYcxVyCRg8g/GAeZdiC3eTyeN2VlZd/Enm5zpRLY09Pjm5yc3EnMbghUMbpTiYd8BP8X9Dt+v/9uYWHhz1TixdcR4YGBgezh4eFD+J+gz5XAGWijYFzKycm5nArxpIQ5+hqAr9AXzgBJM4ggqXWyvLz8uplR1VkShmgOR3iVo9+jBv2LOWs9pu+H+JAdvilhyC4j6AldxqSNhT7g1Oh2u59mZWV9loDx8fGl4XB4C+IBHrpIdA7ad7C2V1RUvLPynUa4u7s7wIvVQsB8qyCDfgK5jgUaWChs0MdFyLo7OjoOo7hI98QN1sJvsHaB+cDMJYFwV1fXCnblJY5+M2dFN8GOVgcCgWeK3nQKdhXYDzE6IR2GdA2k76lgmq7o7OxcBGAzcydkJazOKVlxjvnWieyguTmZ25y21PiEFt3h/v7+rJGRkddYyhOsFhOe/gMvR6lVGliEzZL0YGPep5DTw16vd2VJScmAjhnd4WAweBaFI7KxwEaVLCQyIHOafB2ULrLo9IVkjMU0GnVJ5PmhUOim0UejIqwGuNaoTCZLNVB9yNFTkUikHqzF0kUWnepnFqv6GOdgbWYDDuo6jaduYOLWFU5Gvgk+qX4A73ei08ue6ms3B/ui3LbiozExLUd2AOxSQnWx850h2+f8/PyQYGksfoRxMhVguRRUf06qyYnOLFaNM87BjdAP0KMbq1Fu2phcMDolk2M3WIIbOGf5JjgD1hfpIosuwYmJWazqo8yvGG++6NH29vZmjo2NPcdxveJsOoXQ/yprXcKpsrLyt04kWtaKi4tDPp9vB0T6dIPdSN4Xxa5bO7dpNomR2GkGEwVchjIyMrYbyYpbwstDGSqkHL0CdJ4Jhqr6l1ezfNhvhGynumj8ahYDOSc7vI7+UeZJmke+DajjR3lAy7IoNvERX/CcfEd8pRBsMCMrfBJ2WCdITi8gpx8xD+g6u1FyGvtff15KSlLjt5aWllpumClhIdfX1+cdHR09D0gtu2TpZ/cgKdqasrOzj/M+/bKLS0qEb4JN5PU1QJbbAaVrY0M+UQKPkY73nWAkJSwgkoe84fsQ6+lLRDcD7Stkz3FV35Aq5RTPEWEdLFavt7HQXnTVPEimbnM4ThDbQtytvLy85oKCgnGHcXG3lAjHoxAogbNJlTWIq6VDQn6k5DLmih+y/EgJMsqPlFaOvZW3/y0v1A+xp9v+ADhPuomDsZuZAAAAAElFTkSuQmCC" width="21" height="13" alt="상품 상태 아이콘">
										<!-- 상품 조회수 -->
										<div id="view"></div>
									</div>
									<div class="detail-info--topL-item">
										<!-- 다시!!!!!!!!!!!!!!!!! 값 넘어오는 방법!!!!!!!!!!!!!! -->
										<img class="timeIcon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAuRJREFUWAnFV01rE1EUzUwSMWATENpFRNyIi0YI+eiui4LoogWFgkvBH6Dgpip+dONKgivdC3XlpkWELkTQRVw1H4QwWQmhLrKwq1IwxHyM54zvDck4mc6bTO3AY97MO/eeM/e9d+c+LeLzqlQq8Wg0ujIajW6ZprkIs7SmaRfQN9HvsOG5pev6h+Fw+LVYLPb9uNaOAzUajYXBYPAcPHeATR2HF+OHEPMuFou9yGazP71spgowDONMt9t9BOMNtDkvJx5jRxgrJRKJl5lM5rcbzlVArVabR6i3YbDsZhTgXRlTs57P5w+ctv8IAPkiwr2LdskJnuUZU7KPtgoRrXE/EwL45SDeC5tcEgoRS+OR0OUg55xhPyly8tA3OcgleW0BYsEpzTnm9THaknTm874suCy4JYBbDU9c7UoXvugzwllRMvoL3hCcEUsA9zneB91qAfgjc4IzojPD4UuYZP7rRU5y60yvYPab4cIUmSK3ztweplcVX+TWEYqMilGYWHJzEabDdKroK60jO52aAHLbiUhReShwTIHJNcBiYqYLX/IxoIMOIxBYANLweRIXCoWb2FJrEPJdUUiHa8BQNLLh2EY7+IM+a7fbZ3O53G4ymbwKf08B+GWDPDrAtrR6vX4dNdwnD5yfoR9w9hCReE9ws9m82Ov1XqF728sYUbuhMR0CxEoljGz4DdPyQP6gqtXqXayxt1NEHOL9vFWQAPgawHtTgEqvEQm4Mrcg5An6VxDdL24OMPYGEbtvCeCvsd/vcwGF+UdkZRyFmHMuAo7i8fhlVsxWHhClc8kFOMur1BRy+izJct1ORCydMVCehdGnbVlwWXBbAOt2zNs6wrbv05EyjL7JMX5GsAXQG6tVgFZPQgR90vd4RUzOCQFCRAtAFpphTkeZPkE+cSZwFSBEHGCerqG/icbjVdCLtpv05fxy6dDahvLB7X5qh1OnGMfxnFUUj+dWLYHtJo/nBhaZ0vH8D6NELRJSWvu9AAAAAElFTkSuQmCC" width="16" height="16" alt="상품 상태 아이콘">
										<!-- 시간 -->
										<c:set var="b_time" value="${product_logtime}" />
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
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAbBJREFUeNrsls9LAkEcxb+au+JSGIEQyGbBdg881CmConsE9Qd07S/p0qG69RcUdOzSoUt0UujS3c0kEQULU7R17c2wyhazNbvaesgHH9xZh3kzb35tpNfrUV/5fJ7+Stls9ks5FqCNKTDv/L6AjyAdiUrWi4AdcAXewDMwwTu4AQdAHbXxCrh3TJm55vpPAVvgHDyC7VEZM6M7sCbRlgGuwaGM8U9zvAkunbn0M/8nzvNpkBHr4MKnqVvHYDWI8RGY84wpFiNFUX5L8sxZlNJRL4E9UeVkMknpdJoSiQQvt9ttKpfLVK1WhVsXbIBb2RHvi96nUikyDGNgyhSPxymTyZCu614D2/UT9bqooqZpnrm6OyNYoNLGy6KKxWKRR/td3W6XCoWCV/sLfoyFJ5Bt29zAfbb3O9TpdLzaZzFND3NkcjUaDapUKoNyvV6nWq0ms7eHM2YqlUrUarXIsiwyTTPwbeX7dmJRs8hVVeXmoRkzNZtNzjCK0pg0MQ5NosX1BKwRetjCb6lcLje2ES+GHDk72G1m/MCu2hCNZ8HrZDv9j33MVtlMiJ58X38KMADfFnDPWur9bAAAAABJRU5ErkJggg==" width="15" height="15" alt="신고 아이콘">
									신고하기
								</button>
							</div>
							<div class="detail-info__text-body-bottom">
								<!-- 아이템 한개 -->
								<div class="detail-info__text-body-bItem">
									<div class="detail-info__text-body-bItem-title">상품상태</div>
									<!-- 상품상태 -->
									<div class="detail-info__text-body-bItem-content"
										id="product_condition"></div>
								</div>
								<div class="detail-info__text-body-bItem">
									<div class="detail-info__text-body-bItem-title">배송비</div>
									<!-- 배송비 -->
									<div class="detail-info__delivery" id="product_delivery_fee"></div>
								</div>
								<div class="detail-info__text-body-bItem">
									<div class="detail-info__text-body-bItem-title">거래지역</div>
									<!-- 거래지역 -->
									<div class="detail-info__location" id="product_location"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="detail-info__btn-list">
						<!-- productDetail.js -->
						<!-- 찜 메세지 -->
						
					</div> <!-- //버튼리스트 -->
				</div>
			</div>
		</div>
	</div><!-- //detail-info__area -->

	<!-- 연관상품목록 -->
	<input type="hidden" id="pg" value="${pg }"> <!-- 컨트롤러로부터 넘어오는  -->
	<div id="relatedProdWrap1">
		<div id="relatedProdWrap2">
			<!-- 제목  -->
			<div class="relatedProd_Title_Wrap">
			
				<div class="relatedProd_Title_Text" style="font-weight:500;">
				연관상품
				</div>
				<div class="relatedProd_Page">
				
				</div>
			</div><!-- //Title_Wrap -->
			
			<!-- 연관상품이미지리스트 -->
			<div class="relProd_ImgList">
				<!-- productDetail.js -->
			</div>
			
			<!-- 이미지리스트 넘기는 버튼 -->
			<div id="relProdPagingDiv" class="paging" align="center"></div>
			
		</div><!-- //wrap2 -->
	</div><!-- //wrap1 -->
	
	
	<!-- ****************** 하단 상품 정보 ******************-->
	<div id="btmProdInfo_Wrap1">
		<div id="btmProdInfo_Wrap2">
			<!-- '상품정보'-->
			<div class="btmProdInfo_TitleWrap">
				<div class="btmProdInfo_Title" style="font-weight: bold; font-size:20px;">
					상품정보 <span class="btmProdInfo_TitleSpan"></span>
				</div>
			</div><!-- // TitleWrap -->
			
			<!-- 상품정보  -->
			<div class="prodInfo_wrap1">
				<div class="prodInfo_wrap2">
					<div class="prodInfo_Content_Title">상품정보</div>
					<div class="prodInfo_contentWrap">
						<div class="content_marginTop"></div>
						<!-- 상품내용 -->
						<div class="prodInfo_contentText">
							<!-- productDetail.js -->
						</div>
						<!-- <div class="content_marginBottom"></div> -->
						<!-- 지역, 카테고리, 상품태그 -->
						<div class="prodInfo_detailWrap1">
							<!-- 지역 -->
							<div class="prodInfo_detailWrap2">
								<div class="detailTitleWrap">
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAiCAYAAABIiGl0AAAAAXNSR0IArs4c6QAAA6xJREFUWAm1l01IVFEUx51xNAtxIcEENuQIrqTxO8OEmj5IAncVUS2E2kS0axO4C5KiFi0lXIh9QBC1kKgwclNGjaNOSUEapVRiUSHoTOo4/c743vjem/vGp8xcuHPu+Z//Of9778y9740rz0EbGxsrjsViQait9JpEIuF1uVzbGCfo0/jT2GGwx6WlpQN+vz+Gn7G5MkXD4fAOil6C047dlImrxxCfg9tVUFBwtbq6ekbHrVYpzAoLo9FoJ+QL9AJrkkN/3u12d9bW1l5hMsvWnDTh4eHh8uXl5fvMutFK3qD/jLxTDQ0Nv4z5JuHR0VH/4uLiKwjy/WWtseJPLKTZKO7Wq4dCoa1LS0tP8bMqKvURrcT0TU1NbRZfWkqYWXVrhJVI9j+bZmZmbuplk1s9NDR0GNEnOpgrKz8ydBrZ8rBHRHCur0MsCvc1Pazl1GF301PbqOFpBh3Z4Rv0oIvVBgBG01hqYKCwsPBMIBD4bAxHIpGKhYWFbrB9RtxuzDEr9yB6zI5gwV/U19cfYLvktjI1mQh19rOI5wSCpqDC4bgelaXvUcRMEGJzAO0qUZ2oxdrx53XMzsI9KMJldgQDPsgPYtLgK4fCoeigMmgA2R2fCG83YMohxCFlQAHCDSlgE8Tkytx8yDZmbHCKMxIMQSdcJueWFU8Y8pRDiA3KgAJ0yJ1wJMwqGrlSWxQ6Jkg4wjWBamfCzQzfqmOrqGwNXo/c56uoeaTFejSuOWjxmNx7KXiHwYIlpnIr4I1xVo9TPF8nyFgwiYFV6LidhZfgJaFXv6vvUeCEHVmBy7UZ0fAAds3rUq+BcD8X0SFZcR5XWJcecGhFqEnrjkW12rfEJoV5PRlgJg+1QM4MGqG6uroHKWEZsNXnCfzNmWpe3iL1z9LjJmGuux+AF3MlTO1rrDb1FExutS5GQB5tj3Q/WxbRSElJyWVjPZOwBLxe70mI8sKXrTaZn59/pLKy8p+xYJqwz+eLFhUVtUH6aCRuZMwC/tBba2pqvlnz04SFUFVV9Zsj1krSd2vCOvwYNdo4sx9UOUphIfJ9f8XsRXxclbgGNiuiHNOXdjxbYUlgtuMINzN8Y1dAgU+BtTDxfkUsBWUUFhYFfmKCTKAvlWU/kDfPJo7mO3vKSiR5V69Fkrg8DPj32IHtwE2+FhvzmFivx+M5xz/ENV8sJM+xsC4yMjKyKx6P32YC8rdE2iz9HKu8m/QcfqxbWOry7N2CkRfznZzR0/yIvjBeV/sPFdozA8TD8zUAAAAASUVORK5CYII=" width="16" height="18" alt="거래지역 아이콘">
									거래지역
								</div>
								<div class="detailContentWrap">
									<div class="detailContent_location">
										<!-- productDetail.js -->
									</div>
								</div>
							</div>
							<!-- 카테고리 -->
							<div class="prodInfo_detailWrap2">
								<div class="detailTitleWrap">
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAYAAADo6zjiAAAAAXNSR0IArs4c6QAAANJJREFUWAntWEEKxCAMjGJ70h/4Aq/+/wm99gX9gTcVujsLe1pQoWj2kJyERCeZkNCOut9WSqHruiilRDjPtH3fyVpL3nvato1Uzvk+z5NqrTNxf942xlAIgTQqXw2ObIAJbA3auQzYenbPW8UBW7cCVvgkAXYGTK/PMcZeSNN/HEfT//8M9CpoljfgZGdAEhAGZA90GZA9MLDMHoXIGLIz0J0C+R6QPfBoyAcus08BfwL4R+cyaAXaOceF/xEqNJQKiAWrDZjAVqslGrQcrH8lmhfQ0lJsYYep+gAAAABJRU5ErkJggg==" width="16" height="18" alt="카테고리 아이콘">
									카테고리
								</div>
								<div class="detailContentWrap">
									<a href="#">
										<span class="detailContent_cate">
											<!-- productDetail.js -->
										</span>
									</a>
								</div>
							</div>
							<!-- 상품태그 -->
							<div class="prodInfo_detailWrap2">
								<div class="detailTitleWrap">
									<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAkCAYAAACaJFpUAAAAAXNSR0IArs4c6QAAAbpJREFUSA3tVzFSwkAU3c2EggKK1BxAoRAmXIKjYAkztsYDaCk34Ara6QEIVKAdDWoFDQUFDPF9hgxZJOEFRhvzZ3aS3f/ef5v3N0zQKmX0er0LrfWD0IIgaNXr9fc0JTQLHg6HzmKxuAX+GsPe8la4Pubz+btKpTLbriVejgriKezBYNBcr9ceKjkx1WaWZXm1Wq2Dp5dNxEaiYL/fb0DwHuMytkIkAbE3TFuu6z5Hlo3bg4K+74uACDUMNDmB8BOgbQjLBowwBLd98oBoYoR9MggpJmJtB/31ov3dCJJ9SqFlQI3+6rR9MkqlmEh/Mdoa71XA8nK5nCqVSqpQKGwo8/lcTSYTtVwu2RJ8n0SsXC4r29611nEcVSwW1Wg0okUtdmvyZFGxkCdrkmODFgxtPFQ4KbePpwX3iafOaUE5IHGRlNvn0IJyGlernz+TsiY5NnZH7ghDjr6cxj97LWQ/Ijoej49sLTlNW5pchs9mgrxXJDKzlDSKh2WW8l6RyMxS0ige9j8s/eINOQ+JD+FPsfTlvDI8G38pXi18V96AMuVpJyOnomVVq9UP3FyhTBfjN+yVml3REK1volCeXrtQ40gAAAAASUVORK5CYII=" width="15" height="18" alt="상품태그 아이콘">
									상품태그
								</div>
								<div class="detailContentWrap_hash">
									<!-- productDetail.js -->
								</div>
							</div>
						</div>
					</div>
				</div>
			
			</div><!-- //prodInfo_wrap1 -->
			
			</div><!-- //btmProdInfo_Wrap2 -->
			
			<div class="prodInfo_RightWrap">
				<!-- 공유링크 -->
				<div class="prodInfo_shareLink">
					<button type="button" class="prodInfo_shareLinkBtn">
						<img src="data:image/png;base64,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" width="25" height="25" alt="url 공유 아이콘">
						<span class="prodInfo_shareLinkClick">클릭하여 복사하기</span>
					</button>
				</div>
				<!-- 상점정보 -->
				<div class="prodInfo_storeWrap1">
					<div class="prodInfo_storeWrap2">
						<div class="storeInfo_Title">상점정보</div>
					</div><!-- //storeWrap2 -->
					<div class="prodInfo_storeDetailWrap">
						<!-- 상점사진 & 상점이름 & 상품 개수 -->
						<div class="storeDetailTop">
							<a class="storeProfileImg_Link" href="#">
								<!-- productDetail.js -->
							</a>
							<div class="storeInfoWrap">
								<a class="storeInfo_name" href="#" style="font-size:12pt;"><!-- productDetail.js --></a>
								<div class="storeInfo_productNum">
									<a class="productNumLink" href="#"><!-- productDetail.js --></a>
								</div>
							</div>
						</div><!-- //storeDetailTop -->
						<!-- 상점주인이 올린 최신 상품 2개  -->
						<div class="storeInfo_productWrap">
							<!-- productDetail.js -->
						</div>
						<div class="storeInfo_moreProd">
							<a class="moreProdLink" href="#">
								<span class="moreProdLink_Num"></span>
								상품 더보기
							</a>
						</div>
						<!-- 에코지수 & 상점평점 -->
						<div class="storeInfo_IndiWrap">
							<!-- 에코지수 -->
							<div class="echoIndi_title">
								<!-- productDetail.js -->
							</div>
							<!-- 상점평점 -->
							<div class="storeScore_title">
								<div style="margin-bottom:1px;">상점평점</div>
								<div class="storeStar"> 
									<img width="25" height="24" class="star1" alt="별 " src="" >
									<img width="25" height="24" class="star2" alt="별" src="" >
									<img width="25" height="24" class="star3" alt="별" src="" >
									<img width="25" height="24" class="star4" alt="별" src="" >
									<img width="25" height="24" class="star5" alt="별" src="" >
								</div>
							</div>
						
						</div>
						<!-- 연락하기 버튼 -->
						<div class="storeInfo_callBtn">
							<button class="callBtn">연락하기</button>
						</div>
						
					</div><!-- //storeDetailWrap -->
				</div><!-- //prodInfo_storeWrap1 -->
			</div><!-- //RightWrap -->
			
			
			
		
		
		
		
		
		
	</div><!-- //btmProdInfo_Wrap1 -->
		

	


</div>
</div>

</body>














