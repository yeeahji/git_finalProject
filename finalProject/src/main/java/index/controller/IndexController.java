package index.controller;

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

import index.bean.CategoryDTO;

import index.bean.ProductDTO;
import index.service.IndexService;

@Controller
@RequestMapping(value="index")
public class IndexController {
	@Autowired
	private IndexService indexService;
	

	@RequestMapping(value ="/getProductList", method=RequestMethod.POST)
	@ResponseBody
	public ModelAndView getProductList(@RequestParam(name = "page") int page ) {
		List<ProductDTO> list = indexService.getProductList(page);	
		
		System.out.print(" /getProductList ");
		System.out.print(" page " + page);

		ModelAndView mav = new ModelAndView();
		mav.addObject("list", list);
		mav.setViewName("jsonView");
		return mav;
	}

}













