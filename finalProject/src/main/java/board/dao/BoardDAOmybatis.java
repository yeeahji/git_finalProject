package board.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import board.bean.BoardDTO;
import board.bean.CommentDTO;

@Repository
@Transactional
public class BoardDAOmybatis implements BoardDAO {

	@Autowired
	private SqlSession sqlSession;
	

	
//	[글 목록]===============================================================================

	@Override
	public List<BoardDTO> showList(Map<String, Integer> map) {
		return sqlSession.selectList("boardSQL.showList",map);
	}

	@Override
	public int getArticlesNum() {
		return sqlSession.selectOne("boardSQL.getArticlesNum");
	}

//	- 검색
	@Override
	public List<BoardDTO> getBoardSearch(Map<String, String> map) {
		return sqlSession.selectList("boardSQL.getBoardSearch", map);
	}

	@Override
	public int getBoardSearchTotal(Map<String, String> map) {
		return sqlSession.selectOne("boardSQL.getBoardSearchTotal", map);
	} 
	
	
//	[글쓰기]===============================================================================
	@Override
	public void write(Map<String, String> map) {
		sqlSession.insert("boardSQL.write",map);
		
	}
//	[글보기]===============================================================================

	@Override
	public void hitUpdate(String seq) {
		sqlSession.update("boardSQL.hitUpdate", Integer.parseInt(seq));
		
	}

	@Override
	public BoardDTO getArticle(String seq) {
		return sqlSession.selectOne("boardSQL.getArticle", Integer.parseInt(seq));

	}
//	[글 수정]===============================================================================

	@Override
	public void modifyArticle(Map<String, String> map) {
		sqlSession.update("boardSQL.modifyArticle", map);
		
	}

	@Override
	public void deleteArticle(String seq) {
		sqlSession.delete("boardSQL.deleteArticle", Integer.parseInt(seq));
		
	}

	@Override
	public void reply(Map<String, String> map) {
		sqlSession.insert("boardSQL.reply", map);
		
	}
//	[댓글쓰기]===================================================================================

	@Override
	public void writeComment(Map<String, String> map) {
		sqlSession.insert("commentSQL.writeComment", map);
	}

	@Override
	public List<CommentDTO> showComment(String board_seq) {
		
		return sqlSession.selectList("commentSQL.showComment", Integer.parseInt(board_seq));
	}
	
	@Override
	public void deleteComment(String comment_seq) {
		sqlSession.selectList("commentSQL.deleteComment", Integer.parseInt(comment_seq));
	}

	
	@Override
	public CommentDTO getAComment(String comment_seq) {
		return sqlSession.selectOne("commentSQL.getAComment", Integer.parseInt(comment_seq));
	}
	@Override
	public void modifyComment(Map<String, String> map) {
		sqlSession.update("commentSQL.modifyComment", map);
		
	}

	

}
