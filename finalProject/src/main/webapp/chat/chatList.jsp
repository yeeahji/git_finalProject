<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<html>
<body>

<c:set var="profile" value='<%=session.getAttribute("login")%>' />
	<br>
 	<div class="" style="text-align:center">
		<a href=""><img src="/market/image/chat/talk.png"
			alt="바다톡" width="180px" class="img-fluid" /></a>
	</div>

	<div class="col-12" style="margin-top: 40px; clear: both;">
		<div class="col-10"
			style="margin: 20px auto; text-align: center; color: white; background-color: #59a9ff; border: 1px solid #01D1FE; padding: 10px 10px; border-radius: 8px;">
			목록
		</div>

	</div>
	<!-- 채팅 내용 -->
	<div class="col-12">
		<div class="col-11"
			style="margin: 0 auto; border: 1px solid #01D1FE; height: 400px; border-radius: 10px; overflow:scroll" id = "chatArea">
			
			<div id="chatMessageArea" style = "margin-top : 10px; margin-left:10px;"></div>

		</div>
	</div>

	<input type="button" value="1:1" style="height:30px;font-size:15px; border-radius:10px; cursor:pointer;
			  		  background-color:#59a9ff; color: white;" id="chatFormBtn">

<img id="profileImg" class="img-fluid"
					src="/displayFile?fileName=${userImage}&directory=profile" style = "display:none">
<input type="text" id="nickname" value = "${user_name }" style = "display:none">
 <input type="button" id="enterBtn" value="입장" style = "display:none">
 <input type="button" id="exitBtn" value="나가기" style = "display:none">
 
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script> 
<script type="text/javascript">
//바다톡
$('#chatFormBtn').click(function(){
	window.open("/market/chat/chatForm", "chat" ,"width=500 height=650 scrollbars=yes");
});
</script> 


</body>
</html>
