package notice.dao;

import java.util.List;
import java.util.Map;

import notice.bean.NoticeDTO;
import notice.bean.QnaBoardDTO;
import notice.bean.QnaDTO;

public interface NoticeDAO {

	public void noticeBoardWrite(Map<String, String> map);

	public List<NoticeDTO> getFagContent(int i);

	public List<QnaDTO> getMain_id();

	public List<QnaDTO> getSub_id(int qnaCate_main_id);

	public QnaDTO qnaCate_Content(int qnaCate_sub_id);

	public void qnaWrite(QnaBoardDTO qnaBoardDTO);

	public List<QnaBoardDTO> getQnaList();

}
