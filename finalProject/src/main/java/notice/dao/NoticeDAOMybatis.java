package notice.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import notice.bean.NoticeDTO;
import notice.bean.QnaBoardDTO;
import notice.bean.QnaDTO;

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
	public List<NoticeDTO> getFagContent(int i) {
		return sqlSession.selectList("noticeSQL.getFagContent", i);
	}

	//qna
	@Override
	public List<QnaDTO> getMain_id() {
		return sqlSession.selectList("noticeSQL.getMain_id");
	}
	@Override
	public List<QnaDTO> getSub_id(int qnaCate_main_id) {
		return sqlSession.selectList("noticeSQL.getSub_id", qnaCate_main_id);
	}
	@Override
	public QnaDTO qnaCate_Content(int qnaCate_sub_id) {
		return sqlSession.selectOne("noticeSQL.qnaCate_Content", qnaCate_sub_id);
	}

	@Override
	public void qnaWrite(QnaBoardDTO qnaBoardDTO) {
		sqlSession.insert("noticeSQL.qnaWrite", qnaBoardDTO);
	}

	@Override
	public List<QnaBoardDTO> getQnaList() {
		return sqlSession.selectList("noticeSQL.getQnaList");
	}

	
	
}
