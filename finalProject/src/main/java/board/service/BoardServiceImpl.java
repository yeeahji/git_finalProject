package board.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import board.bean.BoardDTO;
import board.bean.BoardPaging;
import board.bean.CommentDTO;
import board.dao.BoardDAO;

@Service
public class BoardServiceImpl implements BoardService {
	
	@Autowired
	private BoardDAO boardDAO;
	@Autowired
	private HttpSession session;
	@Autowired
	private BoardPaging boardPaging;
	
	
	public String sessionId(HttpSession session) {
		String sessionId = null;
		int memKakao=Integer.parseInt(session.getAttribute("memKakao").toString());
		System.out.println("memKakao:"+memKakao);

		if(memKakao==1) {//카카오 로그인 시
			sessionId = (String) session.getAttribute("memEmail");
		}else if(memKakao==0){
			sessionId = (String) session.getAttribute("memId");
		}

		return sessionId;
	}
	
//	[글 목록]===============================================================================
	@Override
	public List<BoardDTO> showList(String pg) {
		int endNum = Integer.parseInt(pg) * 10;
		int startNum = endNum - 9;
		
		Map <String, Integer> map = new HashMap<String, Integer>();
		map.put("startNum", startNum);
		map.put("endNum", endNum);
		
		List<BoardDTO> list = boardDAO.showList(map);
		
		return list;
	}
	@Override
	public int getArticlesNum() {
		return boardDAO.getArticlesNum();
	}
	@Override
	public BoardPaging boardPaging(String pg) {//기본 리스트 출력용
		int total = boardDAO.getArticlesNum();
		System.out.println("총 글 개수:"+total);
		boardPaging.setCurrentPage(Integer.parseInt(pg));
		boardPaging.setPageBlock(5);
		boardPaging.setPageSize(10);
		boardPaging.setTotal(total);
		boardPaging.makePagingHTML();
		
		return boardPaging;
	}
	
//	검색
	@Override
	public List<BoardDTO> getBoardSearch(Map<String, String> map) {
		System.out.println("서비스map:"+map);
		int endNum = Integer.parseInt(map.get("pg")) * 10;
		int startNum = endNum - 9;
		
		map.put("startNum", startNum+"");
		map.put("endNum", endNum+"");
		
		return boardDAO.getBoardSearch(map); 
	}

	@Override
	public BoardPaging boardPaging(Map<String, String> map) {//검색용
		int total=boardDAO.getBoardSearchTotal(map); //맵퍼파일은 동일한 함수명을 넣을 수 없기때문에 오버로드 메소드와 다른 이름으로 지어준다.
		
		boardPaging.setCurrentPage(Integer.parseInt(map.get("pg")));
		boardPaging.setPageBlock(5);
		boardPaging.setPageSize(10);
		boardPaging.setTotal(total);
		boardPaging.makePagingHTML();
		
		return boardPaging;
	}
	
	
//	[글쓰기/수정/삭제]===============================================================================
	@Override
	public void write(Map<String, String> map) {
		
		String sessionId = sessionId(session);
		map.put("sessionId",sessionId);
		boardDAO.write(map);//subject, content, id 담겨있음
	}

	@Override
	public void hitUpdate(String seq) {
		boardDAO.hitUpdate(seq);
	}

	@Override
	public BoardDTO getArticle(String seq) {
		return boardDAO.getArticle(seq);
	}

	@Override
	public void modifyArticle(Map<String, String> map) {
		boardDAO.modifyArticle(map);
		
	}

	@Override
	public void deleteArticle(String seq) {
		boardDAO.deleteArticle(seq);
		
	}
//	[답글]===============================================================================

	@Override
	public void reply(Map<String, String> map) {
		
		String sessionId = sessionId(session);
//		원글
		map.put("sessionId",sessionId);
		BoardDTO pDTO = boardDAO.getArticle(map.get("pseq"));
		
		map.put("ref", pDTO.getBoard_ref() + ""); //ref==원글 ref
		map.put("step", pDTO.getBoard_step() +"");
		
		map.put("board_lev", pDTO.getBoard_lev() + 1 + ""); //lev == 원글 lev +1
		map.put("board_step", pDTO.getBoard_step() + 1+ ""); //step ==원글step+1
//		map안에 갖고 있는 데이터 : pseq, subject, content,id,그룹번호(==원글의 그룹번호).
		boardDAO.reply(map);
		
	}
//	[댓글]===================================================================================

	@Override
	public void writeComment(Map<String, String> map) {
		String sessionId = sessionId(session);
		map.put("sessionId", sessionId);
		boardDAO.writeComment(map);
	}
	@Override
	public List<CommentDTO> showComment(String board_seq) {
		return boardDAO.showComment(board_seq);
	}
	@Override
	public void deleteComment(String comment_seq) {
		boardDAO.deleteComment(comment_seq);
	}
	@Override
	public void modifyComment(Map<String, String> map) {
		
		boardDAO.modifyComment(map);
	}
	@Override
	public CommentDTO getAComment(String comment_seq) {
		return boardDAO.getAComment(comment_seq);
		
	}
	


	
}
