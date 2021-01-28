package notice.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import notice.bean.NoticeDTO;
import notice.bean.QnaBoardDTO;
import notice.bean.QnaDTO;
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
	public List<NoticeDTO> getFagContent(int select2) {
		List<NoticeDTO> list = noticeDAO.getFagContent(select2);
		return list;
	}

	@Override
	public List<QnaDTO> getMain_id() {
		List<QnaDTO> list = noticeDAO.getMain_id();
		return list;
	}

	@Override
	public List<QnaDTO> getSub_id(int qnaCate_main_id) {
		List<QnaDTO> list = noticeDAO.getSub_id(qnaCate_main_id);
		return list;
	}

	@Override
	public QnaDTO qnaCate_Content(int qnaCate_sub_id) {
		QnaDTO qnaDTO = noticeDAO.qnaCate_Content(qnaCate_sub_id);
		return qnaDTO;
	}

	@Override
	public void qnaWrite(QnaBoardDTO qnaBoardDTO) {
		noticeDAO.qnaWrite(qnaBoardDTO);
	}

	@Override
	public List<QnaBoardDTO> getQnaList() {
		List<QnaBoardDTO> list = noticeDAO.getQnaList();
		return list;
	}

	


}
