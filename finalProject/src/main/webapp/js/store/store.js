// test2로 테스트 중
// 상점 기본 정보
var isStore = false; // ajax 중복 호출 방지
$(document).ready(function(){
	if(isStore) return;
	isStore = true;
	
	$.ajax({
		type: 'GET',
		url: '/market/store/storeInfo',
		data: {'mem_id' : 'test2'}, // 상점 주인의 아이디
		dataType: 'json',
		success : function(data){ 
			//console.log('스토어 기본정보->'+JSON.stringify(data));
			
			$.each(data, function(key, value){
				// [프로필] 
				// 프로필 상점명
				$('.profileNickname').text(value.store_nickname);
				
				// 프로필 사진
				if(value.store_img != null){
					$('.profileImage').attr('src', '/market/storage/'+value.store_img);
				}else if(value.store_img == null){ 
					// 기본이미지
					$('.profileImage').attr('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbQAAAG0CAYAAABaNNJGAAAAAXNSR0IArs4c6QAAHX1JREFUeAHt3Q1T28YWBmBD8wnT//87Ow2hJbS9OeTaCWCzli3Je84+mmFCkC3vPmfDG0nr9dXDw8N/GxsBAgQIEEgucJ28/ZpPgAABAgSeBASagUCAAAECJQQEWoky6gQBAgQICDRjgAABAgRKCAi0EmXUCQIECBAQaMYAAQIECJQQEGglyqgTBAgQICDQjAECBAgQKCEg0EqUUScIECBAQKAZAwQIECBQQkCglSijThAgQICAQDMGCBAgQKCEgEArUUadIECAAAGBZgwQIECAQAkBgVaijDpBgAABAgLNGCBAgACBEgICrUQZdYIAAQIEBJoxQIAAAQIlBARaiTLqBAECBAgINGOAAAECBEoICLQSZdQJAgQIEBBoxgABAgQIlBAQaCXKqBMECBAgINCMAQIECBAoISDQSpRRJwgQIEBAoBkDBAgQIFBCQKCVKKNOECBAgIBAMwYIECBAoISAQCtRRp0gQIAAAYFmDBAgQIBACQGBVqKMOkGAAAECAs0YIECAAIESAgKtRBl1ggABAgQEmjFAgAABAiUEBFqJMuoEAQIECAg0Y4AAAQIESggItBJl1AkCBAgQEGjGAAECBAiUEBBoJcqoEwQIECAg0IwBAgQIECghINBKlFEnCBAgQECgGQMECBAgUEJAoJUoo04QIECAgEAzBggQIECghIBAK1FGnSBAgAABgWYMECBAgEAJAYFWoow6QYAAAQICzRggQIAAgRICAq1EGXWCAAECBASaMUCAAAECJQQEWoky6gQBAgQICDRjgAABAgRKCAi0EmXUCQIECBAQaMYAAQIECJQQEGglyqgTBAgQICDQjAECBAgQKCEg0EqUUScIECBAQKAZAwQIECBQQkCglSijThAgQICAQDMGCBAgQKCEgEArUUadIECAAAGBZgwQIECAQAkBgVaijDpBgAABAgLNGCBAgACBEgICrUQZdYIAAQIEBJoxQIAAAQIlBARaiTLqBAECBAgINGOAAAECBEoICLQSZdQJAgQIEBBoxgABAgQIlBAQaCXKqBMECBAgINCMAQIECBAoISDQSpRRJwgQIEBAoBkDBAgQIFBCQKCVKKNOECBAgIBAMwYIECBAoISAQCtRRp0gQIAAAYFmDBAg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');
				}
				
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
					      formData.append('mem_id','test2'); // 나중에 세션아이디로 수정,,
					     
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
						  //console.log("2. 체크익스텐션 - 파일확장자와 크기 확인");//test
						  var regex = new RegExp("(.*?)\.(jpg|gif|bmp|tif|png)$"); // 가능한 이미지 파일
					      var maxSize = 5000000; //5MB였나?  파일 크기는 다시 정해야 할 듯
					      
					      if(fileSize >= maxSize){
					        alert('파일 사이즈 초과');
					        $("input[type='file']").val("");  //파일 초기화
					        return false;
					      }
					      
					      if(regex.test(fileName)){
					          //console.log("3. 파일이 등록되었습니다(test)"); //test
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
				
				// 상점평점(★★★★★) 0~5
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
				// # 소개글 
				$('.introduce').text(value.store_intro);
				// # 소개글 수정
				$('#profileRight').on("click", '.introduceEditBtn', function(){
					// 수정 창으로 변경
					$('div .introduce').attr('class','introduceWrap');
					$('.introduceWrap').html("<textarea></textarea><button type='button'>확인</button>");
					$('div .introduceEdit').remove();
					
					$('.introduceWrap > button').click(function(){
							$.ajax({
								type:'get',
								url: '/market/store/introUpdate',
								data: {'mem_id' : 'test2',
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
				

				// # 에코지수 store_ECHO
				var echoIndi = value.store_echo; // data에서 불러온 에코지수 
				$('.echoIndication > img').attr('src','/market/image/store/echo'+echoIndi+'.svg');
				
				// 에코지수 설정 ( 판매+구매 )
				$.ajax({
					type:'post',
					url: '/market/store/echoCalc', 
					data: {'mem_id' : 'test2'},
					dataType: 'json',
				    success: function(data){
				    	actSum = data.actSum; // actSum = purchaseNum + salesNum;
				    	
				    	if(value.store_echo != actSum){
				    		console.log("현재 에코지수와 달름");
				    		
				    		//에코지수 업데이트
				    		$.ajax({
								type:'post',
								url: '/market/store/echoUpdate',
								data: {'mem_id' : 'test2',
									   'store_echo': actSum },
							    success: function(data){
							    	console.log('!!에코지수 업데이트 완료');
							    },error: function(err){
							    	console.log(err);
							    }
				    		});//ajax 
				    	}else{
				    		console.log("원래 값과 같음");
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
				
				
				// # 닉네임 (유효성 검사 + 수정)
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
											data: {'mem_id': 'test2', // 현재 상점주인의 아이디
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
	});// ajax 
	
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
		console.log("마우스따라다님");
		
		
        //마우스가 움직일 때 툴 팁이 따라 다니도록 위치값 업데이트
        $('#tooltip').css('top', e.pageY + 10 );
        $('#tooltip').css('left', e.pageX + 10 );
          
    }).mouseout(function(){
    	
    	
    	console.log("마우스뗌");
        //위에서 껐던 브라우져에서 제공하는 기본 툴 팁을 복원
        $(this).attr('title',$('.tipBody').html());
        $(this).children('div#tooltip').remove();
        
       
    });
	
}); // ready






// #신고하기 버튼 - 남의 상점(모달) -----------------------------------------------------
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



// *********************** storeBottom ***********************
// 메뉴바 클릭
$('#storeBottom').on('click', '.default, .before', function(){
	var nowMenu = $(this).attr('class','now');
	nowMenu.prevAll().attr('class','default');
	nowMenu.prev().attr('class','before');
	nowMenu.nextAll().attr('class','default');
});




//******** 내부 페이지 이동 ([상품]/[상품후기]/[구매내역]/[찜]/[내상품관리]) ******** 
//컨트롤러 이동안하고 jsp 파일 불러옴
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
	        url : "../store/reviews.jsp",
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













