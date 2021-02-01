package admin.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import admin.bean.TestMemberDTO;

@Repository
@Transactional
public class TestMemberDAOMybatis implements TestMemberDAO {
	@Autowired
	private SqlSession sqlSession;

	@Override
	public List<TestMemberDTO> getMemberList() {
		return sqlSession.selectList("adminSQL.getMemberList");
	}
	
	
}
