package board.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import board.bean.BoardDTO;
import board.bean.BoardPaging;
import board.bean.CommentDTO;
import board.service.BoardService;

//담당 : 김명경

@Controller
@RequestMapping(value="board")
public class BoardController {

	@Autowired
	private BoardService boardService;
//	[글 목록]===============================================================================
//	- 글 목록으로 이동
	@RequestMapping(value = "list", method =RequestMethod.GET)
	public String list(@RequestParam(required=false, defaultValue="1") String pg, Model model, HttpSession session) {
		model.addAttribute("pg", pg);
		model.addAttribute("sessionId", (String)session.getAttribute("sessionId"));
		model.addAttribute("display", "/board/list.jsp");
		return "/index";
	}
//	- 글 목록 가져오기
	@RequestMapping(value="showList", method=RequestMethod.POST)
	public ModelAndView showList(@RequestParam(required=false, defaultValue="1") String pg,
									 HttpSession session,
									 HttpServletResponse response) {
		
		List<BoardDTO> list = boardService.showList(pg);
		String sessionId = (String)session.getAttribute("sessionId");
		
		//조회수 - 새로고침 시 조회수 증가 방지(로그인한 회원에 한하여 조회수 카운팅)
		if(session.getAttribute("sessionId") != null) {
    		Cookie cookie = new Cookie("memHit", "0");//쿠키 생성
    		cookie.setMaxAge(30*60);//쿠키 생존기간(30분)
    		response.addCookie(cookie);//클라이언트에게 보내기
    	}
		//페이징처리
		BoardPaging boardPaging = boardService.boardPaging(pg);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", pg);
		mav.addObject("list", list);
		mav.addObject("boardPaging", boardPaging);
		mav.setViewName("jsonView");
		
		return mav;		
	}
//	- 검색 결과 리스트
	@RequestMapping(value="getBoardSearch", method=RequestMethod.POST)
	public ModelAndView getBoardSearch(@RequestParam Map<String,String> map) {
		//map : pg, searchType, searchText
		
		//searchType, searchText 바탕으로 검색한 글 리스트
		List<BoardDTO>list = boardService.getBoardSearch(map);
		
		//검색값 페이징 처리
		BoardPaging boardPaging = boardService.boardPaging(map);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("pg", map.get("pg"));
		mav.addObject("list", list);
		mav.addObject("boardPaging",boardPaging);
		mav.setViewName("jsonView");
		
		return mav;
	}
//	[글쓰기]===================================================================================
//	- 글쓰기 폼으로 이동
	@RequestMapping(value="/writeForm", method=RequestMethod.GET)
	public String writeForm(Model model) {
		model.addAttribute("display", "/board/writeForm.jsp");
		return "/index";
	}
//	- 글쓰기
	@RequestMapping(value="/write", method=RequestMethod.POST)
	@ResponseBody
	public void write(@RequestParam Map<String, String> map) {
		boardService.write(map);//subject, content 담겨있음
	}
	
	
	
//	[글 보기]===================================================================================
//	- 글보기 폼으로 이동
	@RequestMapping(value="/articleForm", method=RequestMethod.GET)
	public String articleForm(@RequestParam String seq,
							@RequestParam(required=false, defaultValue="1") String pg,
							Model model) {
		model.addAttribute("seq", seq);
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/board/article.jsp");
		return "/index";
	}
	@RequestMapping(value="/getArticle", method=RequestMethod.POST)
	public ModelAndView getArticle(@RequestParam String seq,
								 @CookieValue(value="memHit", required=false) Cookie cookie,
								 HttpServletResponse response) {
		//조회수 새로고침 방지
		if(cookie != null) {
			boardService.hitUpdate(seq); //조회수 증가
			cookie.setMaxAge(0); //쿠키 삭제
			response.addCookie(cookie); //쿠키 삭제된걸 클라이언트에게 보내주기.
		}
		BoardDTO boardDTO = boardService.getArticle(seq);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("boardDTO", boardDTO);
		mav.setViewName("jsonView");
		return mav;
	}
	
//	[글 수정]===================================================================================
	@RequestMapping(value="modifyArticleForm", method=RequestMethod.POST)
	public String modifyArticleForm(@RequestParam String seq,
								    @RequestParam(required=false, defaultValue="1") String pg,
									Model model) {//db:seq, web:pg
		model.addAttribute("seq", seq);
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/board/modifyArticleForm.jsp");
		
		return "/index";
	}
	@RequestMapping(value="modifyArticle", method=RequestMethod.POST)
	@ResponseBody
	public void boardModify(@RequestParam Map<String, String> map) {
		boardService.modifyArticle(map);
	}
//	[글 삭제]===================================================================================
	@RequestMapping(value="deleteArticle", method=RequestMethod.POST)
	@ResponseBody
	public void deleteArticle(@RequestParam String seq) {
		boardService.deleteArticle(seq);
	}
	
//	[답글쓰기]===================================================================================
	@RequestMapping(value="replyForm", method=RequestMethod.POST)
	public String replyForm(@RequestParam String seq, //답글의 원글번호
							@RequestParam(required=false, defaultValue="1") String pg,
							Model model) {
		model.addAttribute("pseq", seq);//원글번호
		model.addAttribute("pg", pg);
		model.addAttribute("display", "/board/reply.jsp");
		
		return "/index";
		
	}
	@RequestMapping(value="reply", method=RequestMethod.POST)
	@ResponseBody
	public void reply(@RequestParam Map<String, String> map) {
		boardService.reply(map);
	}
//	[댓글쓰기]===================================================================================
	
//	댓글 출력
	@RequestMapping(value="showComment", method=RequestMethod.POST)
	public ModelAndView showComment(@RequestParam(required=false) String board_seq) {
		List<CommentDTO> list = boardService.showComment(board_seq);
		
		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		
		return mav;
	}
		
//	댓글쓰기
	@RequestMapping(value="writeComment", method=RequestMethod.POST)
	@ResponseBody
	public void writeComment(@RequestParam Map<String, String> map) {
		
		boardService.writeComment(map);
	}
	
	
//	댓글 수정 1. 기존 댓글 가져오기
	@RequestMapping(value="getAComment", produces = "application/String;charset=UTF-8", method=RequestMethod.POST)
	@ResponseBody
	public String getAComment(@RequestParam String comment_seq) throws UnsupportedEncodingException  {
		CommentDTO commentDTO=boardService.getAComment(comment_seq);
		return commentDTO.getComment_content();
	}
	
//	댓글 수정2. 새로 쓴 댓글으로 덮어쓰기
	@RequestMapping(value="modifyComment",method=RequestMethod.POST)
	@ResponseBody
	public void modifyComment(@RequestParam Map<String, String> map) {
//		map : {comment_seq, comment_content}
		boardService.modifyComment(map);
	}
//	댓글 삭제
	@RequestMapping(value="deleteComment", method=RequestMethod.POST)
	@ResponseBody
	public void deleteComment(@RequestParam String comment_seq) {
		boardService.deleteComment(comment_seq);
	}
}