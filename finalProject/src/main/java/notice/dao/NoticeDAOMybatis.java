package notice.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import admin.bean.QnaDTO;
import notice.bean.NoticeDTO;
import notice.bean.QnaCateDTO;

@Repository
@Transactional
public class NoticeDAOMybatis implements NoticeDAO {
	@Autowired
	private SqlSession sqlSession;
	
	//공지사항 등록
	@Override
	public void noticeBoardWrite(Map<String, String> map) {
		sqlSession.insert("noticeSQL.noticeBoardWrite", map);
	}

	@Override
	public List<NoticeDTO> getFagContent(int select2) {
		return sqlSession.selectList("noticeSQL.getFagContent", select2);
	}

//	[1:1문의]==============================================================================

	@Override
	public List<QnaCateDTO> getMainCate() {
		return sqlSession.selectList("noticeSQL.getMainCate");
	}
	@Override
	public List<QnaCateDTO> getSubCate(int qnaCate_main) {
		return sqlSession.selectList("noticeSQL.getSubCate", qnaCate_main);
	}
	@Override
	public QnaDTO qnaCate_Content(int qnaCate_sub_id) {
		return sqlSession.selectOne("noticeSQL.qnaCate_Content", qnaCate_sub_id);
	}

	@Override
	public void writeQna(QnaDTO qnaDTO) {
		sqlSession.insert("noticeSQL.writeQna", qnaDTO);
	}


	
	
}
