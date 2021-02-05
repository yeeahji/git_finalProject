package board.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import board.bean.BoardDTO;
import board.bean.BoardPaging;
import board.bean.CommentDTO;

public interface BoardService {

	public BoardPaging boardPaging(String pg);

	public void write(Map<String, String> map);

	public List<BoardDTO> showList(String pg);

	int getArticlesNum();

	public List<BoardDTO> getBoardSearch(Map<String, String> map);

	public BoardPaging boardPaging(Map<String, String> map);

	public void hitUpdate(String seq);

	public BoardDTO getArticle(String seq);

	public void modifyArticle(Map<String, String> map);

	public void deleteArticle(String seq);

	public void reply(Map<String, String> map);

	public void writeComment(Map<String, String> map);

	public List<CommentDTO> showComment(String board_seq);

	public void deleteComment(String comment_seq);

	public void modifyComment(Map<String, String> map);

	public CommentDTO getAComment(String comment_seq);

}
