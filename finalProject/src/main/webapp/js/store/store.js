// *********************** storeTop ***********************
// #닉네임 (유효성 검사 + 수정)
$('.storeTitleWrap').on("click", '#nickNameEdit', function(){
	// 닉네임 수정 창으로 변경
	$('div .storeTitleWrap').html(
			"<div class='nickNameWrapDiv'>" +
				"<div class='nickNameWrap'>" +
					"<input id='nickname' type='text'>" + // value="원래 닉"
					"<button type='button'>확인</button>" +
				"</div>" +
				"<div id='nicknameDiv'>" +
				"</div>" +
			"</div>");

	// 확인 버튼 클릭
	$('.nickNameWrap > button').click(function(){
		$('.nickNameWrap > input').empty(); 
		$('#nicknameDiv').empty();
		
		if($('.nickNameWrap > input').val() == ''){
			$('#nicknameDiv').text('닉네임을 입력하세요');
			$('#nicknameDiv').css('color', 'magenta');
    		$('#nicknameDiv').css('font-size', '8pt');
    		$('#nicknameDiv').css('font-weight','bold');
		}else {
			$.ajax({
				type:'get', 
				url: '/market/store/getMember',
				data: 'nickname='+$('#nickname').val(),
					   
			    success: function(data){ //storeDTO가 넘어오면
			    	if(data==''){
			    		alert("닉네임이 변경되었습니다.");
			    		//닉네임 수정 - 로그인 시 (세션?)아이디 들고 닉네임 변경
			    		/*$.ajax({
							type:'get',
							url: '/market/store/nicknameUpdate',
							data: {'nickname': $('#nickname').val(),
								   'mem_id': data.mem_ID },
						    success: function(result){
						    	if(result!=0){
						    		alert("닉네임이 변경되었습니다.");
						    	}   	
						    },
						    error: function(err){
						    	alert(err);
						    }
						});*/
		
			    		// html 변경
			    		$('div .storeTitleWrap').html(
			    				"<div class='nickName'>"+$('.nickNameWrap > input').val()+
			    				"<button class='nickNameEdit' id='nickNameEdit'>닉네임 수정</button></div>");
			    	}else {
			    		console.log(data);
			    		$('#nicknameDiv').text('이미 사용중인 닉네임');
			    		$('#nicknameDiv').css('color', 'red');
			    		$('#nicknameDiv').css('font-size', '8pt');
			    		$('#nicknameDiv').css('font-weight','bold');
			    	}//else	
			    },
			    error: function(err){
			    	alert(err);
			    }
			}); 
		}// else
	});// 클릭 이벤트
});


// #소개글 수정
$('#profileRight').on("click", '.introduceEditBtn', function(){

	$('div .introduce').attr('class','introduceWrap');
	$('.introduceWrap').html(
			"<textarea></textarea><button type='button'>확인</button>");
	$('div .introduceEdit').remove();
	
	$('.introduceWrap > button').click(function(){
			//alert($('.introduceWrap > textarea').val()); // test
			/*$.ajax({
				type:'get',
				url: '/market/store/introduceRegister',
				data: {'introduce':$('.introduceWrap > textarea').val()},
			    success: function(result){
			    	
			    },
			    error: function(err){
			    	alert(err);
			    }
			});*/
			$('div .introduceWrap').attr('class','introduce');
			$('.introduce').text($('textarea').val()); // DB
			$('.introduce').after("<div class='introduceEdit'>"+
					"<button class='introduceEditBtn'>소개글 수정</button></div>");
	});
});

// #신고하기 버튼 - 남의 상점(모달)
$('#profileRight').on("click", '.singoBtn', function(){
	//alert("모달 창 오픈");
	// 클래스명 찾아서 display:none ---> display:flex 으로
	$("#modalHidden").attr('id','modalDisplay'); 
	
	// 마우스오버 - 빨강 밑줄, 클릭 시 DB연동? -> alert창("접수완료")
	$('.contentList>button').mouseenter(function(){
		$(this).css('text-decoration', 'underline');
		
		$(this).click(function(){
			alert("신고가 접수되었습니다.(test)"); //Q. 왜 여러번 뜨는?ㅋ
		});
		
		$(this).mouseleave(function(){
			$(this).css('text-decoration', 'none');
		});
		
	});
	
	// 신고 카테고리 펼치기
	$('#singoModalBottom').on("click", '.singoTitle > .titleBtn', function(){
		
		$(this).parent().attr('class','singoTitleOpen'); //$(this).parent() == $(".singoTitle")
		
		var className = $(this).parent().next().attr('class');
		// height=180;인 애만 따로 처리
		if(className == 'singoContentOther'){
			$(this).parent().next().attr('class','singoContentOtherOpen');
		}else if(className == 'singoContent') {
			$(this).parent().next().attr('class','singoContentOpen'); 
		}
		
		// 닫히는 방법 2가지
		// (1) 펼친 상태에서 다른 카테고리 버튼 눌리면 알아서 접히기
		
		// (2) 닫기 (다시 클릭)
		$('#singoModalBottom').on("click", '.singoTitleOpen > .titleBtn', function(){
			$(this).parent().attr('class','singoTitle');
			
			if(className == 'singoContentOtherOpen' || className =='singoContentOther'){
				$(this).parent().next().attr('class', 'singoContentOther');
			}else if(className == 'singoContentOpen' || className=='singoContent'){
				$(this).parent().next().attr('class', 'singoContent');				
			}
		});//(2)닫기
		
	});//신고 카테고리 펼치기
	
	// 모달 창 닫기 modalCloseBtn
	$('.singoModalWrap').on("click", '.modalCloseBtn', function(){
		var openInBtn = $('.singoTitleOpen>button');
		var className = openInBtn.parent().next().attr('class'); //위의 className과 관련없음
		
		$(openInBtn).parent().attr('class','singoTitle');
		
		if(className == 'singoContentOtherOpen' || className =='singoContentOther'){
			$(openInBtn).parent().next().attr('class', 'singoContentOther');
		}else if(className == 'singoContentOpen' || className=='singoContent'){
			$(openInBtn).parent().next().attr('class', 'singoContent');				
		}
		//alert("모달 창 닫기");
		// display:flex ---> display:none 으로
		$("#modalDisplay").attr('id','modalHidden'); 
		});
});//


// #프로필 사진 변경
// *참고 중인 사이트 (https://ming9mon.tistory.com/94, https://bin-repository.tistory.com/118)
$('.background2').on("click", '.imageEdit>label', function(){
//$('.imageEdit>label').click(function(){
	$("input[type='file']").change(function(e){
	      $('#preview').empty(); // div 내용 비우기;empty -> 요소의 내용을 삭제
	      
	      var files = e.target.files;
	      var arr = Array.prototype.slice.call(files);
	      
	      //업로드 가능 파일인지 체크
	      for(var i=0;i<files.length;i++){
	        if(!checkExtension(files[i].name,files[i].size)){
	          return false;
	        }
	      } 
	      
	      // DB
	      var formData = new FormData($('#storeForm')[0]);
	      $.ajax({
	            type:'post',
	            enctype: 'multipart/form-data',
	            processData: false, //데이터를 컨텐트 타입에 맞게 변환 여부
				contentType: false, //요청 컨텐트 타입
	            url: '/market/store/profileImgUpdate',
	            data: formData,
	            success: function(data){
	                //alert("이미지 등록 완료");//test
	             },
	            error: function(err){
	                alert(err);
	            }
	      });
	      
	      console.log(arr[0].name); //파일이름 찍어봄
	      
	      preview(arr);// 사진 등록
	    });//file change
	
	function checkExtension(fileName,fileSize){
		  console.log("2. 체크익스텐션 - 파일확장자와 크기 확인");//test
		  var regex = new RegExp("(.*?)\.(jpg|gif|bmp|tif|png)$"); // 가능한 이미지 파일
	      var maxSize = 5000000; //5MB였나?  파일 크기는 다시 정해야 할 듯
	      
	      if(fileSize >= maxSize){
	        alert('파일 사이즈 초과');
	        $("input[type='file']").val("");  //파일 초기화
	        return false;
	      }
	      
	      if(regex.test(fileName)){
	          console.log("3. 파일이 등록되었습니다(test)"); //test
	      }else {
	    	  alert('jpg, gif, bmp, tif, png 형식의 파일만 첨부하실 수 있습니다.');
		      $("input[type='file']").val("");  //파일 초기화
		      return false;
	      }
	      return true;
	}// checkExtension
	
	function preview(arr){
		arr.forEach(function(f){  
	        if(f.type.match('image.*')){
	          var reader = new FileReader(); //파일을 읽기 위한 FileReader객체 생성
	          reader.onload = function (e) { //파일 읽어들이기를 성공했을때 호출되는 이벤트 핸들러
	        	$('#preview > .profileImage').remove();
	        	var str ='<img src="'+e.target.result+'"width="100" height="100" alt="상점 프로필 이미지" class="profileImage">';
	            $(str).appendTo('#preview');
	          } 
	          reader.readAsDataURL(f);
	        }else{
	          //뭐지이건
//	          str += '<img src="/resources/img/fileImg.png" title="'+f.name+'" width=100 height=100 />';
//	          $(str).appendTo('#preview');
	        }
	      });//arr.forEach
	 }
}); //프로필 사진 변경

// #별다섯개(상품후기평점)
// DB에서 점수 받아와서 뿌리기 ( 점수계산은 데이터 넣을 때....)





// *********************** storeBottom ***********************
// 메뉴바 클릭
$('#storeBottom').on('click', '.default, .before', function(){
	var nowMenu = $(this).attr('class','now');
	nowMenu.prevAll().attr('class','default');
	nowMenu.prev().attr('class','before');
	nowMenu.nextAll().attr('class','default');
});

// 카테고리 리스트; 마우스오버
$('.categoryWrap').mouseenter(function(){
	$('.categoryList').css('display', 'block');
	// 리스트에서 마우스오버
	$('.categoryList').mouseenter(function(){
		$('.categoryOther').mouseenter(function(){
			var categoryHover = $(this).attr('class','categoryCheck');
			categoryHover.prevAll().attr('class', 'categoryOther');
			categoryHover.nextAll().attr('class', 'categoryOther');
		});
	});
	// 마우스 뗄 때
	$('.categoryWrap').mouseleave(function(){
		$('.categoryList').css('display', 'none');	
	});
});

// 최신순, 인기순, 저가순, 고가순 클릭 이벤트
$('.listTopInner').on('click', '.groupOther', function(){
	var clicked = $(this).attr('class','groupChecked');
	clicked.prevAll().attr('class','groupOther');
	clicked.nextAll().attr('class','groupOther');
});

//******** 내부 페이지 이동 ([상품]/[상품후기]/[구매내역]/[찜]/[내상품관리]) ******** 
//컨트롤러 이동안하고 jsp 파일 불러옴
$('#productPg').click(function(){
	 $("#productPg").removeAttr("href") //href="#" 새로고침 삭제
	 $.ajax({
	        type : "GET",
	        url : "../store/productPg.jsp",
	        dataType : "text",
	        success : function(data) {
	            $('.contentStore').html(data);
	        }, error : function(err) {
	        	console.log(err);
	        }
	 });
});
$('#reviews').click(function(){
	 $("#reviews").removeAttr("href") //href="#" 새로고침 삭제
	 $.ajax({
	        type : "GET",
	        url : "../store/reviews.jsp",
	        dataType : "text",
	        success : function(data) {
	            $('.contentStore').html(data);
	        }, error : function(err) {
	        	console.log(err);
	        }
	 });
});
$('#purchases').click(function(){
	 $("#purchases").removeAttr("href")
	 $.ajax({
	        type : "GET",
	        url : "../store/purchases.jsp",
	        dataType : "text",
	        success : function(data) {
	            $('.contentStore').html(data);
	        }, error : function(err) {
	        	console.log(err);
	        }
	 });
});
$('#favorites').click(function(){
	 $("#favorites").removeAttr("href")
	 $.ajax({
	        type : "GET",
	        url : "../store/favorites.jsp",
	        dataType : "text",
	        success : function(data) {
	            $('.contentStore').html(data);
	        }, error : function(err) {
	        	console.log(err);
	        }
	 });
});    
$('#productManage').click(function(){
	 $("#productManage").removeAttr("href")
	 $.ajax({
	        type : "GET",
	        url : "../store/productManage.jsp",
	        dataType : "text",
	        success : function(data) {
	            $('.contentStore').html(data);
	        }, error : function(err) {
	        	console.log(err);
	        }
	 });
});    













