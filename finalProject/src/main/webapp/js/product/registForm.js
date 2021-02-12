
$('#registForm').ready(function(){
	$('#imageDiv').hide();
	$('#subjectDiv').hide();
	$('#categoryDiv').hide();
	$('#priceDiv').hide();
	$('#locationDiv').hide();
	initTagArea();
});


/* 상품 이미지 */
$('#inputImage').on('change', readURL); //파일 올릴 때마다 readURL 함수 호출
const fileBuffer = []; //파일저장용 전역변수

//이미지 미리 보기 함수
function readURL() {
	const maxSize = 10 * 1024 * 1024;//이미지 파일 당 최대 사이즈 설정 : 10MB
	const input = this;
	
	if(input.files && input.files[0]) { //크기가 정해지지 않은 files 배열
		var reader = new FileReader();
		
		//이미지 파일 개수 제한
		if($('.registUserImages').length + input.files.length > 5) {
			alert('사진은 최대 5장 까지 올릴 수 있습니다.');
			return false;
		}
		let index = 0;
		
		reader.onload = function(evt) {
			//이미지 파일 사이즈 비교
			const fileSize = input.files[index].size;
			if(fileSize > maxSize) {
				alert('이미지파일 사이즈는 10MB 이내로 등록 가능합니다.');
				return false;
			}
			const image = input.files[index];
			
			//이미지 파일 유효성 검사
			const fileEx = image.name.slice(image.name.lastIndexOf(".")+1).toLowerCase();
			if(fileEx != "jpg" && fileEx != "png" && fileEx != "gif" && fileEx != "bmp" && fileEx != "jpeg") {
				alert('파일은 이미지파일(jpg, jpeg, png, gif, bmp)만 가능합니다.');
				return false;
			}
			
			fileBuffer.push(image); //push
			
			//이미지 태그 생성
			const $li = $('<li></li>').attr({ draggable: 'false' }).addClass('registUserImages');
			const $div = $('<div></div>');
			const $image = $('<img/>').attr({ 'src': this.result, alt: '상품이미지' });
			const $button = $('<button></button>');

			//첫번째 이미지를 대표이미지로 설정
			if($('.registUserImages').length == 0){
				index = 0;
				$div.addClass('imageRepresentive').text('대표이미지');		
			}
			
			//태그 붙이기
			$('.registImages').append($li); //ul 태그의 하위 태그로 li 태그 붙이기
			$li.append($div, $image, $button); //li 태그의 하위 태그로 세가지 태그 붙이기
			
			//X버튼 클릭 시 deleteImage 함수 호출
			$button.attr('type', 'button').addClass('image_cancleBtn').click(deleteImage);
			
			//상품이미지(0/5) 개수 변경
			$('.image_sub small').text(`(${$('.registUserImages').length}/5)`);
			
			//한번에 이미지 여러개 넣기
			if(index < input.files.length - 1) {
				reader.readAsDataURL(input.files[++index]);
			}
		}
		//올린 파일 1개 데이터로 보내기
		reader.readAsDataURL(input.files[index]);
	}
}

//이미지 삭제 함수
function deleteImage() {
	//배열 내의 파일 제거
	const fileIndex = $(this).closest('li').index();
    fileBuffer.splice(fileIndex - 1, 1);
    
    //대표이미지를 지웠을 시 다음 이미지를 대표이미지로 지정
	if($(this).closest('li').children('div').hasClass('imageRepresentive')) {
		const $pre = $(this).closest('li').next().find('div').addClass('imageRepresentive').text('대표이미지');
	}
	$(this).closest('li').remove();
	$('.image_sub small').text(`(${$('.registUserImages').length}/5)`);
};




/* 카테고리 */
var cate_code = null; //최종적으로 DB에 넘길 카테고리 코드
var cate_name = null; //카테고리 이름
var cate_parentName = null; //카테고리 부모 이름
$('.contentArea').on("click", '.category >.btn', function(){
	//클릭한 카테고리의 id값 가져오기
	cate_code = $(this).attr("id"); //카테고리 코드 갱신
	cate_name = $(this).text(); //카테고리 이름 갱신
	
	//선택된 리스트에 색깔 적용
	$('.category > .btn').removeClass('selectedList');
	$('#'+cate_code).addClass('selectedList');
	
	//소분류 리스트 불러오기
	if((cate_code % 100) == 0) { //대분류를 클릭한 경우에만 실행
		$.ajax({
			type: 'post',
			url: '/market/product/getSmallCategoryList',
			data: 'cate_parent='+cate_code, //현재 cate_code = 대분류 카테고리(cate_parent)
			dataType: 'json',
			success: function(data) {
				//소분류 리스트 비우기(중복 추가 방지) - gt와 eq 순서 주의
				$('#small_categories li:gt(0)').remove();
				$('#small_categories li:eq(0)').remove();
	
				$.each(data.list, function(index, items){
					console.log(items.cate_code);
					
					$('<li/>', {
						class: 'category'
							
					}).append($('<button/>', {
						type: 'button',
						class: 'btn',
						id: items.cate_code,
						text: items.cate_name
						
					})).appendTo($('#small_categories'));
				});//each
			},
			error: function(err) {
				console.log(err);
			}
		});//ajax
		
		//선택한 카테고리에 카테고리 이름 넣기(대분류ver)
		$('#selectedCategory').text(cate_name);
		cate_parentName = cate_name; //현재 이름을 부모 이름으로 저장
	}
	else if((cate_code % 100) != 0) {
		//선택한 카테고리에 카테고리 이름 넣기(소분류ver)
		$('#selectedCategory').text(cate_parentName+' > '+cate_name);
	}
});





/* 거래지역 */
//내 지역 ---> 여유되면 진짜 내 위치 가져오는걸로 수정
//$('#myLocation').click(function(){
//	$.ajax({
//		type: 'post',
//		url: '/market/product/getMyLocation',
//		dataType: 'text',
//		success: function(data){
//			data = 컨트롤러에서 보내온 값
//		},
//		error: function(err){
//			console.log(err);
//		}
//	});
//});

/*//최근 지역
$('#myRecentLocation').click(function(){
	$.ajax({
		type: 'post',
		url: '/market/product/getMyLocation',
		dataType: 'json',
		success: function(data){
			$('#product_location').val(data.myRecentLocation);
		},
		error: function(err){
			console.log(err);
		}
	});
});*/

//지도 (미리 생성)
var mapContainer = document.getElementById('map'), // 지도를 표시할 div
    mapOption = {
        center: new daum.maps.LatLng(37.537187, 127.005476), // 지도의 중심좌표
        level: 5 // 지도의 확대 레벨
    };

var map = new daum.maps.Map(mapContainer, mapOption); //지도를 미리 생성
var geocoder = new daum.maps.services.Geocoder(); //주소-좌표 변환 객체를 생성
var marker = new daum.maps.Marker({ //마커를 미리 생성
    position: new daum.maps.LatLng(37.537187, 127.005476),
    map: map
});

//주소 검색
$('#searchAddr').click(function(){
    new daum.Postcode({
        oncomplete: function(data) {
            var addr = data.address; // 최종 주소 변수

            // 주소 정보를 해당 필드에 넣는다.
            document.getElementById("product_location").value = addr;
            // 주소로 상세 정보를 검색
            geocoder.addressSearch(data.address, function(results, status) {
                // 정상적으로 검색이 완료됐으면
                if (status === daum.maps.services.Status.OK) {
                    var result = results[0]; //첫번째 결과의 값을 활용
                    // 해당 주소에 대한 좌표를 받아서
                    var coords = new daum.maps.LatLng(result.y, result.x);
                    // 지도를 보여준다.
                    mapContainer.style.display = "block";
                    map.relayout();
                    // 지도 중심을 변경한다.
                    map.setCenter(coords);
                    // 마커를 결과값으로 받은 위치로 옮긴다.
                    marker.setPosition(coords)
                }
            });
        }
    }).open();
});
//나중에 구매자한테 지도 보여줄 땐 여기서 result x, y 값 저장한 다음에 마커만 없애고 지도 확대레벨 조정하면 될듯!





/* 태그 영역 */
function initTagArea() {
	$('#tagInput').on('keyup', hashTagEvent);
	$('#tagInput').on('keydown', function(event) {if(event.keyCode == 13 || event.keyCode==32) event.preventDefault();});
	const $inputDiv = $('#tagInput').closest('div.tagInputWrap');

	//태그 생성
	function hashTagEvent(event) {
		event.preventDefault();
		const $this = $(this);
		if($this.val().length > 8) {
			alert('태그명은 8자 이내로 작성해주세요');
			$this.val($this.val().substring(0,8));
			return false;
		}
		
		if(!(event.keyCode == 13 || event.keyCode == 32)) return false;
		if(!document.getElementById('tagInput').value.trim().length) return false;
		
		let $ul; 
		
		if($('.hash_div').length == 0) {
			const $div = $('<div></div>').addClass('hash_div');
			$ul = $('<ul></ul>').addClass('hash_ul');
			$div.append($ul);
			$('.tagInputWrap').before($div);
		} else {
			$ul = $('.hash_ul');
		}
		
		const $li = $('<li></li>').addClass('hash_li');
		const $btn = $('<button></button>').addClass('hash_btnText').text(`#${$(this).val()}`).dblclick(editTag).click(function(e) {e.preventDefault();});
		const $closeBtn = $('<button></button>').addClass('hash_btnClose').click(deleteTag);
		const $fas = $('<i></i>').addClass('fas fa-times');
		
		const $frag = $(document.createDocumentFragment());
		$frag.append($li);
		$closeBtn.append($fas);
		$li.append($btn, $closeBtn);
		$ul.append($frag);
		$(this).val('');
			
		if($('li.hash_li').length == 5) {
			$inputDiv.hide();
		}
	}
	
	//태그 삭제
	function deleteTag(e) {
		e.preventDefault();
		$(this).closest('li').remove();
		if($inputDiv.css('display') == 'none') {
			$inputDiv.show();
		}
	}

	//태그 수정
	function editTag(e) {
		e.preventDefault();
		const $this = $(this);
		const val = $this.text();
		$this.closest('li').remove();
		$('#tagInput').val(val.substring(1));
		if($inputDiv.css('display') == 'none') {
			$inputDiv.show();
		}
	}
}




/* 등록하기 */
$('#registBtn').click(function(){
	$('#imageDiv').hide();
	$('#subjectDiv').hide();
	$('#categoryDiv').hide();
	$('#priceDiv').hide();
	$('#locationDiv').hide();
	
	console.log("중간임다");

	
	//유효성 검사
	if(!fileBuffer.length) { $('#imageDiv').show(); $('#inputImage').focus(); }
	else if($('#product_subject').val()=='') { $('#subjectDiv').show(); $('#product_subject').focus(); }
	else if(cate_code == null) { $('#categoryDiv').show(); $('#large_categories').focus(); } //!!!!!!!!포커스 안됨. 해결하기
	else if($('#product_location').val()=='') { $('#locationDiv').show(); $('#product_location').focus(); }
	else if($('#product_price').val()=='') { $('#priceDiv').show(); $('#product_price').focus(); 
	console.log("유효성검사완료");//test
	}
	
	else{

		alert("뜽록");
		
		$.each(fileBuffer, function(index, items){
			console.log(items.name);
		});
		$.each($('.hash_btnText'), function(index, items){
			console.log(items.innerText);
		});
		
		
		$('#registForm').ajaxForm({
			type: 'post',
			enctype: 'multipart/form-data',
			processData: false, //데이터를 컨텐트 타입에 맞게 변환 여부
			contentType: false, //요청 컨텐트 타입
			url: '/market/product/productRegist',
			dataType: 'json',
			beforeSubmit: function(data, form, option) { //submit 전 실행
				//이미지 정보 동적 할당
				console.log("비폴써빔ㅅ");
				console.log("비폴써빔ㅅ");
				console.log("비폴써빔ㅅ");
				console.log("비폴써빔ㅅ");
				console.log("비폴써빔ㅅ");
				fileBuffer.forEach(function(e, i) {
					const imgObj = {
						name : 'img',
						id : 'product_img'+i,
						type : 'file',
						value : e
					}
					data.push(imgObj);
				});
				
				//카테고리 설정
				const cateObj = {
						name : 'cate_code',
						value : cate_code
				}
				data.push(cateObj);
				
				//배송비 설정
				const deliveryFeeObj = {
						name : 'product_delivery_fee',
						value : $('#freeDelivery').prop('checked') ? 1 : 0
				}
				data.push(deliveryFeeObj);
				
				//태그 정보 동적 할당
				$('.hash_btnText').each(function(i, e) {
					const tagObj = {
							name : 'hashtag',
							id : 'product_hashtag'+i,
							value : e.innerText
					}
					data.push(tagObj);
				});
				
				console.log("비폴썹밋 끘");
			},
			success: function(data) {
				alert('상품이 등록되었습니다.');
				location.href='/market/product/productDetail?seq='+data.seq;
			},
			error: function(error) {
				alert('error : ', error);
			}
			
		});
	}
});

