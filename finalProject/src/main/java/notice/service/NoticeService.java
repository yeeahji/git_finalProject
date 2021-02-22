package notice.service;

import java.util.List;
import java.util.Map;

import admin.bean.QnaDTO;
import notice.bean.NoticeDTO;
import notice.bean.QnaCateDTO;

public interface NoticeService {

	public void noticeBoardWrite(Map<String, String> map);

	public List<NoticeDTO> getFagContent(int option2_id);

	public List<QnaCateDTO> getMainCate();

	public List<QnaCateDTO> getSubCate(int qnaCate_main);

	public QnaDTO qnaCate_Content(int qnaCate_sub);

	public void writeQna(QnaDTO qnaDTO);

	public List<QnaDTO> getQnaList(String mem_id);
	

	


}
