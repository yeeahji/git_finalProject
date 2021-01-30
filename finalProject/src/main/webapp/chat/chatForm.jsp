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
	<input type="button" value="목록" style="margin-top : 20px; height:30px;font-size:15px; border-radius:10px; cursor:pointer;
			 								border:0; color: black;" id="chatListBtn">
	<div class="col-12" style=" clear: both;">
		<div class="col-10"
			style="margin:10px auto; text-align: center; color: white; background-color: #59a9ff; border: 1px solid #01D1FE; padding: 10px 10px; border-radius: 8px;">
			${mem_id} 님과 대화
		</div>

	</div>
	<!-- 채팅 내용 -->
	<div class="col-12">
		<div class="col-11"
			style="margin: 0 auto; border: 1px solid #01D1FE; height: 400px; border-radius: 10px; overflow:scroll" id = "chatArea">

			<div id="chatMessageArea" style = "margin-top : 10px; margin-left:10px;"></div>

		</div>
	</div>

	<!-- 채팅 입력창 -->
	<br>
		<div class="" style="float: left">
			<input type="text" id="message" name="message" 
				   style="border: 1px solid #59a9ff; height: 35px; float: left; width: 370px; margin-right:20px;"
				   size="25" autofocus>
			<input type="button" value="전송" style="height:30px;font-size:15px; border-radius:10px; cursor:pointer;
			  		  background-color:#59a9ff; color: white;" id="sendBtn">
		</div>



<input type="text" id="nickname" value = "${mem_id}" style = "display:none">
 <input type="button" id="enterBtn" value="입장" style = "display:none">
 <input type="button" id="exitBtn" value="나가기" style = "display:none">
 
<script type="text/javascript" src="https://code.jquery.com/jquery-3.5.1.min.js"></script> 
<script type="text/javascript">
//바다톡
$('#chatListBtn').click(function(){
	window.open("/market/chat/chatList", "chat" ,"width=500 height=650 scrollbars=yes");
});
</script> 

</body>
</html>
