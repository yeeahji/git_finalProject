package admin.service;

import java.util.List;
import java.util.Map;

import admin.bean.AdminBoardPaging;
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

public interface AdminService {
	//전체회원출력
	public List<MemberDTO> getMemberList(String pg, String viewNum);
	
	public AdminBoardPaging boardPaging(String pg, String viewNum);
	//잔체회원수
	public int totalMember();
	
	public List<MemberDTO> getSearchMember(Map<String, String> map);

	public AdminBoardPaging searchBoardPaging(Map<String, String> map);
	//회원상세보기
	public AdminMembersDTO getMemberView(String id);
	//판매하는물건 총개수
	public int totalSellProduct(String id);
	
	//상점리스트출력
	public List<StoreDTO> getStoreList(String pg, String viewNum);
    //상점리스트페이징
	public AdminBoardPaging StoreBP(String pg, String viewNum);
	//상점상세보기
	public AdminMembersDTO getStoreView(String id);
	//상점상세보기_물건출력
	public List<ProductDTO> getStore_ProductList(String id);
	//상점조건검색
	public List<StoreDTO> getSearchStoreList(Map<String, String> map);
	//상점조건검색 페이징
	public AdminBoardPaging getSearchStoreBP(Map<String, String> map);
	//상점목록_물품리스트에서 삭제
	public void store_productDelete(String[] check);
	//물품리스트출력
	public List<ProductDTO> getProductAllList(String pg, String viewNum);
	//물품리스트 페이징
	public AdminBoardPaging ProductBP(String pg, String viewNum);
	//물품관련 상세정보
	public AdminMembersDTO getProductView(String seq);
	//물품 조건검색
	public List<ProductDTO> getSearchProductList(Map<String, String> map);
	//물품 조건검색_페이징
	public AdminBoardPaging getSearchProductBP(Map<String, String> map);
	//상점_클릭후_후기 총 개수
	public int storeReviewTotalA(String id);
	//상점_정보출력 후 물품 정렬
	public List<ProductDTO> getStoreViewOrderby(Map<String, String> map);


	//신고내역 출력
	public List<StoreDTO> getComplainList(String pg, String viewNum);
	public AdminBoardPaging adminComplainBP(String pg, String viewNum);

	public List<ComplainDTO> searchReportedMember(Map<String, String> map);
	public AdminBoardPaging getSearchReportedBP(Map<String, String> map);

	public CommentDTO getCommentContent(String comment_content);

	public ReviewDTO getReviewContent(String review_seq);

	public void solveComplain(Map<String, Integer> map);

	
	//1:1 문의내역 출력
	public List<QnaDTO> getQnaList(String pg, String viewNum);
	public AdminBoardPaging qnaBP(String pg, String viewNum);
	public QnaDTO getQnaContent(int qna_seq);
	public void writeAnswer(Map<String, Object> map);

	
	//탈퇴회원관리
	public List<WithdrawDTO> getWithdrawList(String pg, String viewNum);
	public AdminBoardPaging withdrawBP(String pg, String viewNum);

	public Map <String, Integer> getWithdrawTotal();

	public void blindComplain(String board_seq, String comment_seq, String review_seq, String thisIs);

	
	
	//회원 영구정지
	public void memberBlock(String id);
	//회원_영구정지 복구
	public void memberReleaseBtn(String id);
	//물품_상세정보_카테고리
	public AdminProductDTO getCatagory(String seq);
	//물품_상세보기 대분류
	public String getCate_code(String cate_code);
   
   

	


}
