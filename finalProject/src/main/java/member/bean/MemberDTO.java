package member.bean;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;

//담당 : 김명경 / SpringSecurity 이예지
@Getter
@Setter
public class MemberDTO implements UserDetails {
	private static final long serialVersionUID = 1L; //Warning 발생 방지
	
	//필드--------------------------------------------------------------
	private String mem_id; 
	private String mem_pwd;
	
	private String mem_name;
	private String mem_email;
	private String mem_tel;
	private String mem_add1;
	private String mem_add2;
	private int mem_postcode;
	private String mem_location;
	private int mem_kakao;
	private String mem_agree;

	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd")
	private Date mem_logtime;
	
	private boolean enabled;
	private List<GrantedAuthority> authority;
	
	
//	by 예지
	//세터(시큐리티 관련만)-----------------------------------------------------
	public void setUsername(String mem_id) {
		this.mem_id = mem_id;
	}

	public void setPassword(String mem_pwd) {
		this.mem_pwd = mem_pwd;
	}
	
	public void setAuthorities(List<String> authList) {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();

		for (int i = 0; i < authList.size(); i++) {
			authorities.add(new SimpleGrantedAuthority(authList.get(i)));
		}

		this.authority = authorities;
	}
	
	
	//게터(오버라이드)-----------------------------------------------------
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authority;
	}
	@Override
	public String getUsername() { //아이디
		return mem_id;
	}
	@Override
	public String getPassword() { //비밀번호
		return mem_pwd;
	}
	@Override
	public boolean isAccountNonExpired() { //계정 만료 여부(부정형이므로 true가 사용가능한 계정)
		return true;
	}
	@Override
	public boolean isAccountNonLocked() { //계정 잠금 여부(부정형이므로 true가 사용가능한 계정)
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() { //패스워드 만료 여부(부정형이므로 true가 사용가능한 계정)
		return true;
	}
	@Override
	public boolean isEnabled() { //계정 활성 여부
		return enabled;
	}

}
