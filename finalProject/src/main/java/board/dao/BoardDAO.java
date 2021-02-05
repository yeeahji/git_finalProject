package board.dao;

import java.util.List;
import java.util.Map;

import board.bean.BoardDTO;
import board.bean.CommentDTO;

public interface BoardDAO {

	public void write(Map<String, String> map);

	public List<BoardDTO> showList(Map<String, Integer> map);

	public int getArticlesNum();

	public List<BoardDTO> getBoardSearch(Map<String, String> map);

	public int getBoardSearchTotal(Map<String, String> map);

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
