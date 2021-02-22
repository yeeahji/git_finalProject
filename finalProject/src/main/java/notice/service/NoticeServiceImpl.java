package notice.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import admin.bean.QnaDTO;
import notice.bean.NoticeDTO;
import notice.bean.QnaCateDTO;
import notice.dao.NoticeDAO;

@Service
public class NoticeServiceImpl implements NoticeService {
	@Autowired
	private NoticeDAO noticeDAO;

	@Override
	public void noticeBoardWrite(Map<String, String> map) {
		noticeDAO.noticeBoardWrite(map);
	}

	@Override
	public List<NoticeDTO> getFagContent(int option2_id) {
		List<NoticeDTO> list = noticeDAO.getFagContent(option2_id);
		return list;
	}
//	[1:1문의]==============================================================================

	@Override
	public List<QnaCateDTO> getMainCate() {
		return noticeDAO.getMainCate();
	}

	@Override
	public List<QnaCateDTO> getSubCate(int qnaCate_main) {
		return noticeDAO.getSubCate(qnaCate_main);
	}

	@Override
	public QnaDTO qnaCate_Content(int qnaCate_sub) {
		return noticeDAO.qnaCate_Content(qnaCate_sub);
	}

	@Override
	public void writeQna(QnaDTO qnaDTO) {
		noticeDAO.writeQna(qnaDTO);
	}

	@Override
	public List<QnaDTO> getQnaList(String mem_id) {
		return noticeDAO.getQnaList(mem_id);
	}
	


}
