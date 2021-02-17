package notice.dao;

import java.util.List;
import java.util.Map;

import notice.bean.NoticeDTO;
import notice.bean.QnaCateDTO;
import admin.bean.QnaDTO;

public interface NoticeDAO {

	public void noticeBoardWrite(Map<String, String> map);

	public List<NoticeDTO> getFagContent(int select2);

	public List<QnaCateDTO> getMainCate();

	public List<QnaCateDTO> getSubCate(int qnaCate_main);

	public QnaDTO qnaCate_Content(int qnaCate_sub);

	public void writeQna(QnaDTO qnaDTO);

	public List<QnaDTO> getQnaList(String mem_id);
	

	

}
