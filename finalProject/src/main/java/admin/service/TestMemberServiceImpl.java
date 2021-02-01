package admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.bean.TestMemberDTO;
import admin.dao.TestMemberDAO;

@Service
public class TestMemberServiceImpl implements TestMemberService {
	@Autowired
	private TestMemberDAO testMemberDAO;

	@Override
	public List<TestMemberDTO> getMemberList() {
		 List<TestMemberDTO> list = testMemberDAO.getMemberList();
		return list;
	}

}
