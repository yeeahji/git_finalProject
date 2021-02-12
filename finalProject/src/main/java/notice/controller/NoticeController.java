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
import notice.bean.QnaCateDTO;
import admin.bean.QnaDTO;
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
	public ModelAndView getFagContent(@RequestParam(required=false, defaultValue="1") int select2) {
		List<NoticeDTO> list = noticeService.getFagContent(select2);
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
//	[1:1문의]==============================================================================
	@RequestMapping(value="/qna", method=RequestMethod.GET)
	public String qna(Model model) {
		model.addAttribute("display", "/notice/qna.jsp");
		return "/index";
	}

	//대분류 가져오기
	@RequestMapping(value="/getMainCate", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getMainCate() {
		List<QnaCateDTO> list = noticeService.getMainCate();
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	//소분류 가져오기
	@RequestMapping(value="/getSubCate", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getSubCate(@RequestParam int qnaCate_mainCode) {
		List<QnaCateDTO> list = noticeService.getSubCate(qnaCate_mainCode);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
	//
//	@RequestMapping(value="/qnaCate_Content", method=RequestMethod.POST)
//	@ResponseBody
//	public ModelAndView qnaCate_Content(@RequestParam int qnaCate_sub_id) {
//		QnaDTO qnaDTO = noticeService.qnaCate_Content(qnaCate_sub_id);
//		
//		ModelAndView mav = new ModelAndView();
//		mav.addObject("qnaDTO", qnaDTO);
//		mav.setViewName("jsonView");
//		return mav;
//	}
	//1:1 문의하기
	@RequestMapping(value="writeQna", method=RequestMethod.POST)
	@ResponseBody
	public void writeQna(@ModelAttribute QnaDTO qnaDTO,
						 @RequestParam( "img[]") List<MultipartFile> list) {
		System.out.println("list:"+list);
		String filePath = "C:\\git_home\\git_final\\finalProject\\src\\main\\webapp\\storage";
		
		for(MultipartFile img: list) {
			System.out.println("사진이름:"+img.getOriginalFilename());
			System.out.println(list.size());
			String fileName = img.getOriginalFilename();
			File file = new File(filePath, fileName);
			
			//파일복사
			try {
				FileCopyUtils.copy(img.getInputStream(), new FileOutputStream(file));
			}catch (IOException e) {
				e.printStackTrace();
			}
			System.out.println("2 : "+fileName);
			qnaDTO.setQna_img1(fileName);
			qnaDTO.setQna_img2("");
			//DB
			noticeService.writeQna(qnaDTO);
			
		}//for
	}
	
	//1:1문의 내역으로 이동
	@RequestMapping(value="/qnaList", method=RequestMethod.GET)
	public String qnaList(Model model) {
		model.addAttribute("display", "/notice/qnaList.jsp");
		return "/index";
	}
		
	//1:1문의  내역불러오기
	@RequestMapping(value="/getQnaList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getQnaList(@RequestParam String mem_id) {
		List<QnaBoardDTO> list = noticeService.getQnaList(mem_id);
		System.out.println("mem_id:"+mem_id);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}
}
