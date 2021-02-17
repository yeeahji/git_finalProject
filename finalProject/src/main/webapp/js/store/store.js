// 내상점-남의상점 구분 
var loginId = $('.loginId').val();
var paramId = $('.hiddenId').val();

var userId;

if(loginId == paramId){ // 내 상점
	userId = loginId; // 둘 중 암거나 ㄱㅊ
}else if(loginId != paramId){ // 남의 상점
	userId = paramId;
}
// 상점 기본 정보 -----------------------------------------------------------------
var isStore = false; // ajax 중복 호출 방지
$(document).ready(function(){
	console.log("[상점] 로그인중인아이디는?"+$('.loginId').val());
	if(paramId=='') userId = loginId;
	
	if(isStore) return;
	isStore = true;
	
	$.ajax({
		type: 'GET',
		url: '/market/store/storeInfo',
		data: {'mem_id' : userId},
		dataType: 'json',
		success : function(data){
			console.log("상점데이타"+data.storeDTO);
			
			$.each(data, function(key, value){
				// 남의 상점 - 바다톡 연결
				$('.badaTalk_btn').click(function(){
					if($('.badaTalk_btn').find('input').length == 0) { //중복 설정 방지
						$('.badaTalk_btn').append($('<input/>', {
							type: 'hidden',
							name: 'other_store_nickname',
							value: value.store_nickname
	
						}))
					}
					
					window.open('', 'chatRoom', 'width=370 height=670');
					$('#storeForm').submit();
				})
				
				// [프로필] 
				$('.profileNickname').text(value.store_nickname); // 프로필 상점명
				
				if($('.goProductManage').val() == 'true'){
					$('#productManage').trigger('click', 'str');
				}
				
				$('.profileImage').attr('src', '/market/storage/'+value.store_img); // 프로필 사진
				
				// 프로필 사진 변경
				var isProfile = false; // ajax 중복호출방지
				$('.background2').on("click", '.imageEdit > label', function(){
					$("input[type='file']").change(function(e){
						  if(isProfile) return;
						  isProfile = true;
						 
						  var files = e.target.files;
					      var arr = Array.prototype.slice.call(files);
					      
					      //업로드 가능 파일인지 체크
					      for(var i=0;i<files.length;i++){
					        if(!checkExtension(files[i].name,files[i].size)) return false;
					      } 
					      
					      // DB
					      var formData = new FormData($('#profileImgForm')[0]);
					      formData.append('mem_id',userId); // 나중에 세션아이디로 수정,,
					     
					      $.ajax({
					            type:'post',
					            enctype: 'multipart/form-data',
					            processData: false, //데이터를 컨텐트 타입에 맞게 변환 여부
								contentType: false, //요청 컨텐트 타입
					            url: '/market/store/profileImgUpdate',
					            data: formData,
					            success: function(data){
					            	//alert("이미지 등록 완료");//test
					            	isProfile = false;
					             },
					            error: function(err){
					                alert(err);
					            }
					      });
					      
					      preview(arr);// 사진 등록
					    });//file change
					
					function checkExtension(fileName,fileSize){
						  var regex = new RegExp("(.*?)\.(jpg|gif|bmp|tif|png)$"); // 가능한 이미지 파일
					      var maxSize = 5000000; //5MB였나?  파일 크기는 다시 정해야 할 듯
					      
					      if(fileSize >= maxSize){
					        alert('파일 사이즈 초과');
					        $("input[type='file']").val("");  //파일 초기화
					        return false;
					      }
					      
					      if(regex.test(fileName)){
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
					          //str += '<img src="/resources/img/fileImg.png" title="'+f.name+'" width=100 height=100 />';
					          //$(str).appendTo('#preview');
					        }
					      });//arr.forEach
					 }
				}); //프로필 사진 변경
				
				
				// 상점 평점 계산 
				// 1. 리뷰 평점/리뷰수
				/*$.ajax({
					type:'get',
					url: '/market/store/reviewCalc',
					data: {'mem_id' : userId},
					dataType: 'json',
				    success: function(data){
				    	console.log('리뷰평점'+JSON.stringify(data.storeScoreAvg));
				    	// 여기부터 다시 수정
				    	
				    },
				    error: function(err){
				    	console.log(err);
				    }
				});*/
				
				// 상점평점
				var scoreAvg = value.store_scoreavg;
				switch(scoreAvg){
					case 0:
						$('.star1, .star2, .star3, .star4, .star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==');
						break;
					case 1:
						$('.star1').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAArVJREFUSA2tVs1rE0EUf28TWr8uBQU/AqLGhAh+QWhrTECwePJiC1r0IHit4MU/Qw8evAoe9OZRTwqCNVEpaC+Wpqle4gfiURobdvN8b9JdZ7a7k822C8u++b3fx87sZFqAlBc1jpfkTikHJ60Qer1pdac0SB9MOANyp7wwjY7eF49Q1/0iWhzJHsWJ5a/D+qSbcdedDoL0OgAHF+mCUVtivR6cFzCGXmqaLx4EcNtEoLSIQADZHFaXvweuCYrhZ0zeFT9U/FXNWIIsgzJ8MNL/7+tbRWF+L+Y51FLTQmEvdLyfvLYZ3Y9NPNiZ2Y/l5m8dt9VZqufPAmZ22UhBb92bCodKTzBc781Ro/gy4NoK8tZQHXsePSWiMzbudvUQ8RO/5nUHz60swdjoBKJzr79DtyvC9BFvyVBZnGl8Y6oXLvL5+5hnf8iUbW3Es/wGjnMTK81XvpOxq1XDGT3FxGc+YatP5SWeWqh4GjPWQ+hN/haPHxDQHh1PWiPgH+bewVrrUZQmNljIVD+WBw+fcPh4lDgO49APkKEbWFltxXPiOhs40YUszLcXOfzEAKpqc+hnqOZOI752bXzjG0cSP7bHGC9E9qLBAvQ10d0NdHDwGs7wbLNWF62puKzRoMhycDDRbKTSBibQ2DfXQukA/O3Kn8BNL8hCdTzycTkVfgc+LHqwYySH5aUf4Z4/3mToN9Sz414Nh/Lvssuhd6HauiS31ILpOqVhrY6Fa3sw0jVdoHYsOeNYW73PYXwE8s01CCa7Wb9CWr0ldWwwvS0d5l/ypC/gkIeQ2VfGWnPRx/ynwqQnnOCiyb5HABhFbDCQWmb2gl/oOJex2rqNlUbHUGsD6SmOcFnT/88kfrktwTTLBi8Ad5/E8yvPtQxrqbiiEW2C3W2Y0bt8js/qOQNMMRAP8YqS/gMbzegG1X8tjgAAAABJRU5ErkJggg==');
						$('.star2, .star3, .star4, .star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==');
						break;
					case 2:
						$('.star1, .star2').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAArVJREFUSA2tVs1rE0EUf28TWr8uBQU/AqLGhAh+QWhrTECwePJiC1r0IHit4MU/Qw8evAoe9OZRTwqCNVEpaC+Wpqle4gfiURobdvN8b9JdZ7a7k822C8u++b3fx87sZFqAlBc1jpfkTikHJ60Qer1pdac0SB9MOANyp7wwjY7eF49Q1/0iWhzJHsWJ5a/D+qSbcdedDoL0OgAHF+mCUVtivR6cFzCGXmqaLx4EcNtEoLSIQADZHFaXvweuCYrhZ0zeFT9U/FXNWIIsgzJ8MNL/7+tbRWF+L+Y51FLTQmEvdLyfvLYZ3Y9NPNiZ2Y/l5m8dt9VZqufPAmZ22UhBb92bCodKTzBc781Ro/gy4NoK8tZQHXsePSWiMzbudvUQ8RO/5nUHz60swdjoBKJzr79DtyvC9BFvyVBZnGl8Y6oXLvL5+5hnf8iUbW3Es/wGjnMTK81XvpOxq1XDGT3FxGc+YatP5SWeWqh4GjPWQ+hN/haPHxDQHh1PWiPgH+bewVrrUZQmNljIVD+WBw+fcPh4lDgO49APkKEbWFltxXPiOhs40YUszLcXOfzEAKpqc+hnqOZOI752bXzjG0cSP7bHGC9E9qLBAvQ10d0NdHDwGs7wbLNWF62puKzRoMhycDDRbKTSBibQ2DfXQukA/O3Kn8BNL8hCdTzycTkVfgc+LHqwYySH5aUf4Z4/3mToN9Sz414Nh/Lvssuhd6HauiS31ILpOqVhrY6Fa3sw0jVdoHYsOeNYW73PYXwE8s01CCa7Wb9CWr0ldWwwvS0d5l/ypC/gkIeQ2VfGWnPRx/ynwqQnnOCiyb5HABhFbDCQWmb2gl/oOJex2rqNlUbHUGsD6SmOcFnT/88kfrktwTTLBi8Ad5/E8yvPtQxrqbiiEW2C3W2Y0bt8js/qOQNMMRAP8YqS/gMbzegG1X8tjgAAAABJRU5ErkJggg==');
						$('.star3, .star4, .star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==');
						break;
					case 3:
						$('.star1, .star2, .star3').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAArVJREFUSA2tVs1rE0EUf28TWr8uBQU/AqLGhAh+QWhrTECwePJiC1r0IHit4MU/Qw8evAoe9OZRTwqCNVEpaC+Wpqle4gfiURobdvN8b9JdZ7a7k822C8u++b3fx87sZFqAlBc1jpfkTikHJ60Qer1pdac0SB9MOANyp7wwjY7eF49Q1/0iWhzJHsWJ5a/D+qSbcdedDoL0OgAHF+mCUVtivR6cFzCGXmqaLx4EcNtEoLSIQADZHFaXvweuCYrhZ0zeFT9U/FXNWIIsgzJ8MNL/7+tbRWF+L+Y51FLTQmEvdLyfvLYZ3Y9NPNiZ2Y/l5m8dt9VZqufPAmZ22UhBb92bCodKTzBc781Ro/gy4NoK8tZQHXsePSWiMzbudvUQ8RO/5nUHz60swdjoBKJzr79DtyvC9BFvyVBZnGl8Y6oXLvL5+5hnf8iUbW3Es/wGjnMTK81XvpOxq1XDGT3FxGc+YatP5SWeWqh4GjPWQ+hN/haPHxDQHh1PWiPgH+bewVrrUZQmNljIVD+WBw+fcPh4lDgO49APkKEbWFltxXPiOhs40YUszLcXOfzEAKpqc+hnqOZOI752bXzjG0cSP7bHGC9E9qLBAvQ10d0NdHDwGs7wbLNWF62puKzRoMhycDDRbKTSBibQ2DfXQukA/O3Kn8BNL8hCdTzycTkVfgc+LHqwYySH5aUf4Z4/3mToN9Sz414Nh/Lvssuhd6HauiS31ILpOqVhrY6Fa3sw0jVdoHYsOeNYW73PYXwE8s01CCa7Wb9CWr0ldWwwvS0d5l/ypC/gkIeQ2VfGWnPRx/ynwqQnnOCiyb5HABhFbDCQWmb2gl/oOJex2rqNlUbHUGsD6SmOcFnT/88kfrktwTTLBi8Ad5/E8yvPtQxrqbiiEW2C3W2Y0bt8js/qOQNMMRAP8YqS/gMbzegG1X8tjgAAAABJRU5ErkJggg==');
						$('.star4, .star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==');
						break;
					case 4:
						$('.star1, .star2, .star3, .star4').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAArVJREFUSA2tVs1rE0EUf28TWr8uBQU/AqLGhAh+QWhrTECwePJiC1r0IHit4MU/Qw8evAoe9OZRTwqCNVEpaC+Wpqle4gfiURobdvN8b9JdZ7a7k822C8u++b3fx87sZFqAlBc1jpfkTikHJ60Qer1pdac0SB9MOANyp7wwjY7eF49Q1/0iWhzJHsWJ5a/D+qSbcdedDoL0OgAHF+mCUVtivR6cFzCGXmqaLx4EcNtEoLSIQADZHFaXvweuCYrhZ0zeFT9U/FXNWIIsgzJ8MNL/7+tbRWF+L+Y51FLTQmEvdLyfvLYZ3Y9NPNiZ2Y/l5m8dt9VZqufPAmZ22UhBb92bCodKTzBc781Ro/gy4NoK8tZQHXsePSWiMzbudvUQ8RO/5nUHz60swdjoBKJzr79DtyvC9BFvyVBZnGl8Y6oXLvL5+5hnf8iUbW3Es/wGjnMTK81XvpOxq1XDGT3FxGc+YatP5SWeWqh4GjPWQ+hN/haPHxDQHh1PWiPgH+bewVrrUZQmNljIVD+WBw+fcPh4lDgO49APkKEbWFltxXPiOhs40YUszLcXOfzEAKpqc+hnqOZOI752bXzjG0cSP7bHGC9E9qLBAvQ10d0NdHDwGs7wbLNWF62puKzRoMhycDDRbKTSBibQ2DfXQukA/O3Kn8BNL8hCdTzycTkVfgc+LHqwYySH5aUf4Z4/3mToN9Sz414Nh/Lvssuhd6HauiS31ILpOqVhrY6Fa3sw0jVdoHYsOeNYW73PYXwE8s01CCa7Wb9CWr0ldWwwvS0d5l/ypC/gkIeQ2VfGWnPRx/ynwqQnnOCiyb5HABhFbDCQWmb2gl/oOJex2rqNlUbHUGsD6SmOcFnT/88kfrktwTTLBi8Ad5/E8yvPtQxrqbiiEW2C3W2Y0bt8js/qOQNMMRAP8YqS/gMbzegG1X8tjgAAAABJRU5ErkJggg==');
						$('.star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAAqNJREFUSA2tVk1rE0EYzrYbSKQXRYIfCaUiggaJJiH+AIsnL1poRQ+CBy8VvOivUA8evHgoeNCbRz3pH5B8HlIvYpG0VULxJBqMZn2eZWc7O5nZ7I5deJl33vf5yMzsTpvJWD6tVussw5KembMlgnc9CCsJa2PP81YYVq4gOTbEXq+3NB6PP5ObzWZPVSqVrbQ6ViuGKbfZf+Rc1JKMVsaO44RbLOdJDAUm9Va32+0TONtthM+FsYcoVqvVXSGaZEy9YhheE6Y0YM5aEjMZk9oY5PB8JSFdTWpPp6m2utlsHoXEN8S8IvUX82P1en1PqRunbrfbvYitOmRESI3JZLIMrGpKxDzOeb3T6byT4MYU2J8Orz2IvQLqghF5sI0ujG/O1Wq1j/l8/hImjxHewXrsq1GbHvSiZ+SM8alcxupfIE7uU/4/g+EO4jY+ufdCLWLMYr/fPzIajZ7DPLwkBNhmhOHrXC53t1wuf5f5U8aiidXfgflTxIKopRlh+ANxH6vc0PGMxgTjxTsN45dIGzpyTO0DTG/hLD+ZMLHGJMHYxep7GM+ZROQ6DDexygrGP3JdzWfeXPg2D8P0jEo0zYklx9QX9ZnGAPIlcwUhwUjszBdzpjFWcCOBWQSShBN7xribj+Os+Cdw6gei7l+P6C1HXDFBb4J6EXf3V7Un5lOCohGMq6opRH+j9wAv0BUG86AWUgPOaljQJLHGEFyTOZhvIhpYyROMvAK9IG+wp2AjXLnH3LjV+IQW8cu3ED4Gws8KhcLDUqn0SxXhfDAY5IfD4SPg1zkPftgSduUL5+pjXDEEuM3gO0OQruIyuGcypSh7xBBLDrnUYE/3xBnzbX7ruu55bOcbHVlXI5YccmGc7ovA/81FXJf+lunEk9aoQS0d/h/pAwlu3rYpxwAAAABJRU5ErkJggg==');
						break;
					case 5:
						$('.star1, .star2, .star3, .star4, .star5').attr('src','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAcCAYAAAB2+A+pAAAAAXNSR0IArs4c6QAAArVJREFUSA2tVs1rE0EUf28TWr8uBQU/AqLGhAh+QWhrTECwePJiC1r0IHit4MU/Qw8evAoe9OZRTwqCNVEpaC+Wpqle4gfiURobdvN8b9JdZ7a7k822C8u++b3fx87sZFqAlBc1jpfkTikHJ60Qer1pdac0SB9MOANyp7wwjY7eF49Q1/0iWhzJHsWJ5a/D+qSbcdedDoL0OgAHF+mCUVtivR6cFzCGXmqaLx4EcNtEoLSIQADZHFaXvweuCYrhZ0zeFT9U/FXNWIIsgzJ8MNL/7+tbRWF+L+Y51FLTQmEvdLyfvLYZ3Y9NPNiZ2Y/l5m8dt9VZqufPAmZ22UhBb92bCodKTzBc781Ro/gy4NoK8tZQHXsePSWiMzbudvUQ8RO/5nUHz60swdjoBKJzr79DtyvC9BFvyVBZnGl8Y6oXLvL5+5hnf8iUbW3Es/wGjnMTK81XvpOxq1XDGT3FxGc+YatP5SWeWqh4GjPWQ+hN/haPHxDQHh1PWiPgH+bewVrrUZQmNljIVD+WBw+fcPh4lDgO49APkKEbWFltxXPiOhs40YUszLcXOfzEAKpqc+hnqOZOI752bXzjG0cSP7bHGC9E9qLBAvQ10d0NdHDwGs7wbLNWF62puKzRoMhycDDRbKTSBibQ2DfXQukA/O3Kn8BNL8hCdTzycTkVfgc+LHqwYySH5aUf4Z4/3mToN9Sz414Nh/Lvssuhd6HauiS31ILpOqVhrY6Fa3sw0jVdoHYsOeNYW73PYXwE8s01CCa7Wb9CWr0ldWwwvS0d5l/ypC/gkIeQ2VfGWnPRx/ynwqQnnOCiyb5HABhFbDCQWmb2gl/oOJex2rqNlUbHUGsD6SmOcFnT/88kfrktwTTLBi8Ad5/E8yvPtQxrqbiiEW2C3W2Y0bt8js/qOQNMMRAP8YqS/gMbzegG1X8tjgAAAABJRU5ErkJggg==');
						break;
				}

				
				
				
				//[profileRight] --------------------------------------------------------------
				$('.introduce').text(value.store_intro); // 소개글 
				
				// 소개글 수정
				$('#profileRight').on("click", '.introduceEditBtn', function(){
					$('div .introduce').attr('class','introduceWrap');
					$('.introduceWrap').html("<textarea></textarea><button type='button'>확인</button>");
					$('div .introduceEdit').remove();
					
					$('.introduceWrap > button').click(function(){
							$.ajax({
								type:'get',
								url: '/market/store/introUpdate',
								data: {'mem_id' : userId,
									   'store_intro':$('.introduceWrap > textarea').val()},
								dataType: 'json',
							    success: function(data){
							    },
							    error: function(err){
							    	console.log(err);
							    }
							});
							
							$('div .introduceWrap').attr('class','introduce');
							$('.introduce').text($('textarea').val()); // DB
							$('.introduce').after("<div class='introduceEdit'>"+
									"<button class='introduceEditBtn'>소개글 수정</button></div>");
					});
				}); // 소개글 수정
				
				// 에코지수 
				var echoIndi = value.store_echo; // data에서 불러온 에코지수 
				if(echoIndi==0){
					echoIndi=20;
				}
				$('.echoIndication > img').attr('src','/market/image/store/echo'+echoIndi+'.svg'); // 0이면 알아서 아래서 업뎃
				
				// 에코지수 설정 ( 판매+구매 )
				$.ajax({
					type:'post',
					url: '/market/store/echoCalc', 
					data: {'mem_id' : userId},
					dataType: 'json',
				    success: function(data){
				    	actSum = data.actSum; // actSum = purchaseNum + salesNum;
				    	
				    	if(value.store_echo != actSum){
				    		//에코지수 업데이트
				    		$.ajax({
								type:'post',
								url: '/market/store/echoUpdate',
								data: {'mem_id' : userId,
									   'store_echo': actSum },
							    success: function(data){
							    	console.log('!!에코지수 업데이트 완료');
							    },error: function(err){
							    	console.log(err);
							    }
				    		});//ajax 
				    	}else{
				    		//console.log("원래 값과 같음");
				    	}
				    	
				    	// 다시 넘어온 actSum으로 이미지 설정
				    	$('.echoIndication > img').attr('src','/market/image/store/echo'+actSum+'.svg');
				    	
				    	// 상점 판매횟수 
				    	$('.sellIndicateNum').text(data.salesNum+'번');
				    },
				    error: function(err){
				    	console.log(err);
				    }
				});// 에코지수 업데이트
				
				
				// 닉네임 (유효성 검사 + 수정)
				// 타이틀 상점명
				$('.nickNameText').text(value.store_nickname);
				$('.hiddenNick').val(value.store_nickname);
				
				$('.storeTitleWrap').on("click", '#nickNameEdit', function(){
					// 닉네임 수정 창으로 변경
					$('div .storeTitleWrap').html(
						"<div class='nickNameWrapDiv'>" +
							"<div class='nickNameWrap'>" +
								"<input id='nickname' type='text' value=''> "+ // value="원래 닉" 뺌
								"<button type='button'>확인</button>" +
							"</div>" +
							"<div id='nicknameDiv'></div>" +
						"</div>");
					
					// 확인 버튼 클릭
					$('.nickNameWrap > button').click(function(){
						$('.nickNameWrap > input').empty(); 
						$('#nicknameDiv').empty();
						
						if($('#nickname').val() == ''){ // 닉넴 안 씀
							$('#nicknameDiv').text('닉네임을 입력하세요');
							$('#nicknameDiv').css('color', '#28288C');
				    		$('#nicknameDiv').css('font-size', '8pt');
				    		$('#nicknameDiv').css('font-weight','bold');
				    	}else if($('#nickname').val() == $('.hiddenNick').val()){ // 현재 닉이랑 같으면 
					    	alert("현재 사용 중인 상점명과 동일합니다.");
					    	$('div .storeTitleWrap').html(
		    				 "<div class='nickName'><div class='nickNameText'>"
				    		 +$('.nickNameWrap > input').val()+
		    				 "</div><button class='nickNameEdit' id='nickNameEdit'>닉네임 수정</button></div>");
						}else{
							$.ajax({ // 닉 중복체크
								type:'get', 
								url: '/market/store/getMember',
								data: 'nickname='+$('#nickname').val(),
									   
							    success: function(data){ //storeDTO
							    	if(data==''){ // 중복 없으면
							    		$.ajax({ // 닉 변경
											type:'get',
											url: '/market/store/nicknameUpdate',
											data: {'mem_id': userId, // 현재 상점주인의 아이디
												   'nickname': $('#nickname').val(),},
										    success: function(result){ // update 변경 체크 숫자 넘어옴
										    	if(result!=0) {
										    		alert("닉네임이 변경되었습니다.");
										    		
										    		$('.profileNickname').text($('#nickname').val()); // 프사 아래 닉도 같이 바로 변경되게
										    		
										    		$('.hiddenNick').val($('#nickname').val());
										    		
										    		$('div .storeTitleWrap').html(
								    				 "<div class='nickName'><div class='nickNameText'>"
										    		 +$('.nickNameWrap > input').val()+
								    				 "</div><button class='nickNameEdit' id='nickNameEdit'>닉네임 수정</button></div>");
										    	}
										    },
										    error: function(err){
										    	console.log(err);
										    }
										});
							    	}else{ // 중복 있으면
							    		$('#nicknameDiv').text('이미 사용중인 닉네임입니다.');
							    		$('#nicknameDiv').css('color', '#EB0000');
							    		$('#nicknameDiv').css('font-size', '8pt');
							    		$('#nicknameDiv').css('font-weight','bold');
							    	}//else	
							    },//success
							    error: function(err){
							    	alert(err);
							    }
							}); 
						}// else
					});// 클릭 이벤트
				}); // 닉네임
			});//each
			
			
			isStore = false;
		},error: function(err){
			console.log(err);
		}
	});// ajax 상점정보
	
	// 에코지수 마우스오버 - 설명 
	$('a[rel=tooltip]').mouseover(function(e){
		console.log("에코지수설명");
		
    	$('a[rel=tooltip]').attr('title','에코지수는 아나바다<br>사용자의 판매 및 구매 횟수를<br>기준으로 만든 지표입니다.'); // 문구
    	
        var tip = $(this).attr('title');         
        // 브라우져에서 제공하는 기본 툴 팁을 끈다
        $(this).attr('title','');
        
        // css와 연동하기 위해 html 태그를 추가해줌
        $(this).append('<div id="tooltip"><div class="tipBody">'+ tip + '</div></div>');               
     
	}).mousemove(function(e){
        //마우스가 움직일 때 툴 팁이 따라 다니도록 위치값 업데이트
        $('#tooltip').css('top', e.pageY + 10 );
        $('#tooltip').css('left', e.pageX + 10 );
          
    }).mouseout(function(){
        //위에서 껐던 브라우져에서 제공하는 기본 툴 팁을 복원
        $(this).attr('title',$('.tipBody').html());
        $(this).children('div#tooltip').remove();
    });
	
	
	
	

}); // ready


//신고하기 모달 -------------------------------------------------------------------
var className;
$('#profileRight').on("click", '.singoBtn', function(e) { 
	 e.stopImmediatePropagation();
	 
     $("#modalHidden").attr('id','modalDisplay'); 
          
     $('.contentList>button').mouseenter(function(){
         $(this).css('text-decoration', 'underline');
       
         $(this).off('click').click(function(){ //클릭 이벤트 중복호출 방지
        	 $.ajax({
				type : 'post',
				url : '/market/member/complain',
				data: {reporter_id: $('.loginId').val(),
						complain_content : $(this).text(),
						store_seq : $('.hiddenId').val(),//상점 고유 번호==상점 주인 아이디
						complain_category : '상점 신고',
						mem_id: $('.hiddenId').val(),
				},success: function(){
					alert("신고가 성공적으로 접수되었습니다.")
				},error: function(err){
					console.log(err)
				}
			});//ajax
         });
        
         $(this).mouseleave(function(){
            $(this).css('text-decoration', 'none');
         });
     });

     $('#singoModalBottom').on('click', '.singoTitle .titleBtn', function(e){
    	    e.stopImmediatePropagation();
    	    
    	    $(this).parent().attr('class','singoTitleOpen'); //$(this).parent() == $(".singoTitle")
    	     className = $(this).parent().next().attr('class');

    	    if(className == 'singoContentOther'){ // height=180;
    	       $(this).parent().next().attr('class','singoContentOtherOpen');
    	    }else if(className == 'singoContent') {
    	       $(this).parent().next().attr('class','singoContentOpen'); 
    	    }
    	    
    });

     // 닫기 (다시 클릭)
  	$('#singoModalBottom').on('click', '.singoTitleOpen .titleBtn', function(e){
  		e.stopImmediatePropagation();
  		 
  	    $(this).parent().attr('class','singoTitle');
  	    if(className == 'singoContentOtherOpen' || className =='singoContentOther'){
  	       $(this).parent().next().attr('class', 'singoContentOther');
  	    }else if(className == 'singoContentOpen' || className=='singoContent'){
  	       $(this).parent().next().attr('class', 'singoContent');            
  	    }

  	});	
	  	
	  	
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
		
		$("#modalDisplay").attr('id','modalHidden');
		return false;
    });
    
    return false;
}); // 신고모달


// ---------------------------- storeBottom ----------------------------
// 메뉴바 클릭
$('#storeBottom').on('click', '.default, .before', function(){
	var nowMenu = $(this).attr('class','now');
	nowMenu.prevAll().attr('class','default');
	nowMenu.prev().attr('class','before');
	nowMenu.nextAll().attr('class','default');
});




//----------- 내부 페이지 이동 ([상품]/[상품후기]/[구매내역]/[찜]/[내상품관리]) -----------
var isProd = false; //중복호출방지
$('#productPg').click(function(){
	if(isProd) return;
	isProd = true;
	 $("#productPg").removeAttr("href") //href="#" 새로고침 삭제
	 $.ajax({
	        type : "GET",
	        url : "../store/productPg.jsp",
	        dataType : "text",
	        success : function(data) {
	            $('.contentStore').html(data);
	            isProd = false;
	        }, error : function(err) {
	        	console.log(err);
	        }
	 });
});
var isRev = false;
$('#reviews').click(function(){
	if(isRev) return;
	isRev = true;
	 $("#reviews").removeAttr("href") //href="#" 새로고침 삭제
	 $.ajax({
	        type : "GET",
	        url : "../store/reviews.jsp?id="+paramId, // 내상점, 남의 상점 후기쓰기 구분 
	        dataType : "text",
	        success : function(data) {
	            $('.contentStore').html(data);
	            isRev = false;
	        }, error : function(err) {
	        	console.log(err);
	        }
	 });
});

var isPur = false;
$('#purchases').click(function(){
	if(isPur) return;
	isPur = true;
	 $("#purchases").removeAttr("href")
	 $.ajax({
	        type : "GET",
	        url : "../store/purchases.jsp",
	        dataType : "text",
	        success : function(data) {
	            $('.contentStore').html(data);
	            isPur = false;
	        }, error : function(err) {
	        	console.log(err);
	        }
	 });
});
var isFav = false;
$('#favorites').click(function(){
	if(isFav) return;
	isFav = true;
	 $("#favorites").removeAttr("href")
	 $.ajax({
	        type : "GET",
	        url : "../store/favorites.jsp",
	        dataType : "text",
	        success : function(data) {
	            $('.contentStore').html(data);
	            isFav = false;
	        }, error : function(err) {
	        	console.log(err);
	        }
	 });
});    
var isMan = false;
$('#productManage').click(function(){
	if(isMan) return;
	isMan = true;
	$("#productManage").removeAttr("href")
	$.ajax({
	        type : "GET",
	        url : "../store/productManage.jsp",
	        dataType : "text",
	        success : function(data) {
	        	
	            $('.contentStore').html(data);
	            isMan = false;
	        }, error : function(err) {
	        	console.log(err);
	        }
	 });
});    
