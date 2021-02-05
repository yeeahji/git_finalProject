package member.service;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Service;

@Service
public class MemberLoginFailHandler implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException {

		//에러 메시지 설정
		if (exception instanceof AuthenticationServiceException)  { //인증요청 시스템에 문제가 있을 때, 아이디가 없을 때 
			request.setAttribute("loginFailMsg", "존재하지 않는 사용자입니다.");
		
		} else if(exception instanceof BadCredentialsException) { //비밀번호가 일치하지 않을 때
			request.setAttribute("loginFailMsg", "아이디 또는 비밀번호를 다시 확인해주세요.");
			
		} else if(exception instanceof DisabledException) { //enabled=false일 때
			request.setAttribute("loginFailMsg", "비활성화된 계정입니다. 관리자에게 문의하세요.");
			
		}
		
		//포워딩 방식으로(POST) 다시 loginForm 페이지로 보내기
		RequestDispatcher dispatcher = request.getRequestDispatcher("/member/loginForm");
		dispatcher.forward(request, response);
	}

}
