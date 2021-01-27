package notice.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import notice.bean.NoticeDTO;
import notice.bean.QnaBoardDTO;
import notice.bean.QnaDTO;
import notice.service.NoticeService;

@Controller
@RequestMapping(value="notice")
public class NoticeController {
	@Autowired
	private NoticeService noticeService;
	
	//공지사항 페이지
	@RequestMapping(value="/noticeBoard", method=RequestMethod.GET)
	public String noticeBoard(Model model) {
		model.addAttribute("display", "/notice/noticeBoard.jsp");
		return "/index";
	}
	
	//운영정책 페이지
	@RequestMapping(value="/policy", method=RequestMethod.GET)
	public String policy(Model model) {
		model.addAttribute("display", "/notice/policy.jsp");
		return "/index";
	}
	
	//자주묻는 질문 페이지
	@RequestMapping(value="/fag", method=RequestMethod.GET)
	public String fag(Model model) {
		model.addAttribute("display", "/notice/fag.jsp");
		return "/index";
	}

	
	
	@RequestMapping(value="/noticeBoardWriteForm", method=RequestMethod.GET)
	public String noticeBoardWriteForm() {
		return "/notice/noticeBoardWriteForm";
	}
	
	//공지사항 등록
	@RequestMapping(value="/noticeBoardWrite", method=RequestMethod.POST)
	@ResponseBody
	public void noticeBoardWrite(@RequestParam Map<String, String> map) {
		noticeService.noticeBoardWrite(map);
	}
	
	//fag에 소분류 불러오기
	@RequestMapping(value="/getFagContent", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getFagContent(@RequestParam(required=false, defaultValue="1") int i) {
		List<NoticeDTO> list = noticeService.getFagContent(i);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	
	//자주묻는 질문
	@RequestMapping(value="/qna", method=RequestMethod.GET)
	public String qna(Model model) {
		model.addAttribute("display", "/notice/qna.jsp");
		return "/index";
	}

	//qna
	@RequestMapping(value="/getMain_id", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getMain_id() {
		List<QnaDTO> list = noticeService.getMain_id();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	@RequestMapping(value="/getSub_id", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getSub_id(@RequestParam int qnaCate_main_id) {
		List<QnaDTO> list = noticeService.getSub_id(qnaCate_main_id);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	@RequestMapping(value="/qnaCate_Content", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView qnaCate_Content(@RequestParam int qnaCate_sub_id) {
		QnaDTO qnaDTO = noticeService.qnaCate_Content(qnaCate_sub_id);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("qnaDTO", qnaDTO);
		mav.setViewName("jsonView");
		return mav;
	}
	
	@RequestMapping(value="qnaWrite", method=RequestMethod.POST)
	@ResponseBody
	public void qnaWrite(@ModelAttribute QnaBoardDTO qnaBoardDTO,
								@RequestParam("img[]") List<MultipartFile> list) {
		String filePath = "D:\\git_home\\git_exam\\finalProject\\src\\main\\webapp\\storage";
		
		for(MultipartFile img: list) {
			System.out.println("사진이름:"+img.getOriginalFilename());
			String fileName = img.getOriginalFilename();
			File file = new File(filePath, fileName);
			
			//파일복사
			try {
				FileCopyUtils.copy(img.getInputStream(), new FileOutputStream(file));
			}catch (IOException e) {
				e.printStackTrace();
			}
			System.out.println("2 : "+fileName);
			qnaBoardDTO.setQna_picture1(fileName);
			qnaBoardDTO.setQna_picture2(fileName);
			qnaBoardDTO.setQna_picture3(fileName);
			qnaBoardDTO.setQna_picture4(fileName);
			qnaBoardDTO.setQna_picture5(fileName);
			//qnaBoardDTO.setQna_picture("");
		
			//DB
			noticeService.qnaWrite(qnaBoardDTO);
			
		}//for
	}
	
	//qnaList(상담내역)
	@RequestMapping(value="/qnaList", method=RequestMethod.GET)
	public String qnaList(Model model) {
		model.addAttribute("display", "/notice/qnaList.jsp");
		return "/index";
	}
		
	//상담내역불러오기
	@RequestMapping(value="/getQnaList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getQnaList() {
		List<QnaBoardDTO> list = noticeService.getQnaList();
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
}
