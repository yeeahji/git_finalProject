package admin.dao;
import java.util.List;
import java.util.Map;

import admin.bean.AdminMembersDTO;
import admin.bean.AdminProductDTO;
import admin.bean.QnaDTO;
import admin.bean.WithdrawDTO;
import board.bean.CommentDTO;
import member.bean.ComplainDTO;
import member.bean.MemberDTO;
import product.bean.ProductDTO;
import store.bean.ReviewDTO;
import store.bean.StoreDTO;

public interface AdminDAO {
	public List<MemberDTO> getMemberList(Map<String, Integer> map);
	public int getTotalA();
	public List<MemberDTO> getSearchMember(Map<String, String> map);
	//검색한 후 총글
	public int getTotalB(Map<String, String> map);
	//회원상세보기
	public AdminMembersDTO getMemberView(String id);
	//판매하는물건 총개수
	public int totalSellProduct(String id);
	
	//상점출력
	public List<StoreDTO> getStoreList(Map<String, Integer> map);
	//상점총글수
	public int getTotalC();
	//상점상세보기
	public AdminMembersDTO getStoreView(String id);
	//상점상세보기_물건출력
	public List<ProductDTO> getStore_ProductList(String id);
	//상점조건 검색
	public List<StoreDTO> getSearchStoreList(Map<String, String> map);
	//상점조건 건색 페이징
	public int getTotalD(Map<String, String> map);
	//상점목록_물품리스트에서 삭제
	public void store_productDelete(Map<String, String[]> map);
	//물품전체 출력
	public List<ProductDTO> getProductAllList(Map<String, Integer> map);
	//물품리스트 페이징
	public int getTotalE();
	//물품관련 상세정보
	public AdminMembersDTO getProductView(String seq);
	//물품 조건검색
	public List<ProductDTO> getSearchProductList(Map<String, String> map);
	//물품 조건검색_페이징
	public int getTotalF(Map<String, String> map);
	//상점_클릭후_후기 총 개수
	public int storeReviewTotalA(String id);
	//상점_정보출력 후 물품 정렬
	public List<ProductDTO> getStoreViewOrderby(Map<String, String> map);


  //신고
  	public List<StoreDTO> getComplainList(Map<String, Integer> map);
  	public List<ComplainDTO> searchReportedMember(Map<String, String> map);
  	
  	public int getComplainTotal();
  	public int getTotalReportedMember(Map<String, String> map);
  	
  	
  	public CommentDTO getCommentContent(String comment_content);
  	public ReviewDTO getReviewContent(String review_seq);
  	
  	public void solveComplain(Map<String, Integer> map);
  	
  	
  	//1:1문의
  	public List<QnaDTO> getQnaList(Map<String, Integer> map);
  	public int getQnaTotal();
  	public QnaDTO getQnaContent(int qna_seq);
  	public void writeAnswer(Map<String, Object> map);
  	
  	//탈퇴회원관리
  	public List<WithdrawDTO> getWithdrawList(Map<String, Integer> map);
  	public int getWithdrawTotal();
  	 
  	public int getWithdraw_lowFrequencyTotal() ;
  	public int getWithdraw_rejoinTotal() ;
  	public int getWithdraw_lowContentsTotal();
  	public int getWithdraw_protectInfoTotal() ;
  	public int getWithdraw_lowBenefitTotal() ;
  	public int getWithdraw_othersTotal() ;
  	public void blindComplain(String board_seq, String comment_seq, String review_seq, String thisIs);
    	//회원 영구정지
  	public void memberBlock(String id);
  	//회원_영구정지 복구
  	public void memberReleaseBtn(String id);
  	//물품_상세정보_카테고리
  	public AdminProductDTO getCatagory(String seq);
  	//물품_상세보기 대분류
  	public String getCate_code(String cate_code);

  	//조건검색 후 문의 내역 출력
	public List<QnaDTO> getSearchQnaList(Map<String, String> map);
	//조건검색 후 문의 내역 출력 페이징
	public int totalG(Map<String, String> map);
	
	//탈퇴회원 조건검색 리스트 출력
	public List<WithdrawDTO> getSearchWithdrawList(Map<String, String> map);
	//탈퇴회원 조건검색 리스트 출력_페이징
	public int totalH(Map<String, String> map);
	
	
	//상점_상세조회_상품정보_판매중
	public int sale_productSpan(String id);
	//상점_상세조회_상품정보_예약중
	public int reservation_productSpan(String id);
	//상점_상세조회_상품정보_판매완료
	public int sold_productSpan(String id);
	

}