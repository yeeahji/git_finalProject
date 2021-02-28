package admin.dao;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

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
@Repository
@Transactional
public class AdminDAOMybatis implements AdminDAO {
	@Autowired
	private SqlSession sqlSession;
	@Override
	public List<MemberDTO> getMemberList(Map<String, Integer> map) {
		return sqlSession.selectList("adminSQL.getMemberList", map);
	}
	@Override
	public int getTotalA() {
		return sqlSession.selectOne("adminSQL.getTotalA");
	}

	@Override
	public List<MemberDTO> getSearchMember(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.getSearchMember", map);
	}

	@Override
	public int totalSellProduct(String id) {
		return sqlSession.selectOne("adminSQL.totalSellProduct", id);
	}

	// 검색한 후 총글
	@Override
	public int getTotalB(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.getTotalB", map);
	}
	@Override
	public AdminMembersDTO getMemberView(String id) {
		return sqlSession.selectOne("adminSQL.getMemberView", id);
	}
	//회원_영구정지
	@Override
	public void memberBlock(String id) {
		 sqlSession.update("adminSQL.memberBlock", id);
	}
	//회원_영구정지 복구
	@Override
	public void memberReleaseBtn(String id) {
		 sqlSession.update("adminSQL.memberReleaseBtn", id);
	}

	// 상점출력
	@Override
	public List<StoreDTO> getStoreList(Map<String, Integer> map) {
		return sqlSession.selectList("adminSQL.getStoreList", map);
	}
	@Override
	public int getTotalC() {
		return sqlSession.selectOne("adminSQL.getTotalC");
	}
	@Override
	public AdminMembersDTO getStoreView(String id) {
		return sqlSession.selectOne("adminSQL.getStoreView", id);
	}

	// 상점조건검색
	@Override
	public List<StoreDTO> getSearchStoreList(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.getSearchStoreList", map);
	}

	// 상점조건건색 페이징
	@Override
	public int getTotalD(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.getTotalD", map);
	}

	// 상점상세보기_물건출력
	@Override
	public List<ProductDTO> getStore_ProductList(String id) {
		return sqlSession.selectList("adminSQL.getStore_ProductList", id);
	}

	// 상점목록_물품리스트에서 삭제
	@Override
	public void store_productDelete(Map<String, String[]> map) {
		sqlSession.delete("adminSQL.store_productDelete", map);
	}
	//상점_상세조회_상품정보_판매중
	@Override
	public int sale_productSpan(String id) {
		return sqlSession.selectOne("adminSQL.sale_productSpan", id);
	}
	//상점_상세조회_상품정보_예약중
	@Override
	public int reservation_productSpan(String id) {
		return sqlSession.selectOne("adminSQL.reservation_productSpan", id);
	}
	//상점_상세조회_상품정보_판매완료
	@Override
	public int sold_productSpan(String id) {
		return sqlSession.selectOne("adminSQL.sold_productSpan", id);
	}
	//총 구매한 물건 개수
	@Override
	public int totalBuyProduct(String id) {
		return sqlSession.selectOne("adminSQL.totalBuyProduct", id);
	}
	

	// 물품전체 출력
	@Override
	public List<ProductDTO> getProductAllList(Map<String, Integer> map) {
		return sqlSession.selectList("adminSQL.getProductAllList", map);
	}

	// 물품리스트 페이징
	@Override
	public int getTotalE() {
		return sqlSession.selectOne("adminSQL.getTotalE");
	}

	// 물품관련 상세정보
	@Override
	public AdminMembersDTO getProductView(String seq) {
		return sqlSession.selectOne("adminSQL.getProductView", seq);
	}

	// 물품 조건검색
	@Override
	public List<ProductDTO> getSearchProductList(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.getSearchProductList", map);
	}

	// 물품 조건검색_페이징
	@Override
	public int getTotalF(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.getTotalF", map);
	}
	//물품_상세정보_카테고리
	@Override
	public AdminProductDTO getCatagory(String seq) {
		return sqlSession.selectOne("adminSQL.getCatagory", seq);
	}
	//물품_상세보기 대분류
	@Override
	public String getCate_code(String cate_code) {
		System.out.println(cate_code);
		return sqlSession.selectOne("adminSQL.getCate_code", cate_code);
	}

	// 상점_클릭후_후기 총 개수
	@Override
	public int storeReviewTotalA(String id) {
		return sqlSession.selectOne("adminSQL.storeReviewTotalA", id);
	}

	// 상점_정보출력 후 물품 정렬
	@Override
	public List<ProductDTO> getStoreViewOrderby(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.getStoreViewOrderby", map);
	}

//	[명경-신고]=========================================================================

	// A.신고 전체 리스트 출력
	@Override
	public List<StoreDTO> getComplainList(Map<String, Integer> map) {
		return sqlSession.selectList("adminSQL.getComplainList", map);
	}

	// A.신고 전체 개수(for 신고 전체 리스트 페이징)
	@Override
	public int getComplainTotal() {
		return sqlSession.selectOne("adminSQL.getComplainTotal");
	}

	// B.신고 검색 결과 출력
	@Override
	public List<ComplainDTO> searchReportedMember(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.searchReportedMember", map);
	}

	// B.신고 검색 개수(for 신고 검색 리스트 페이징)
	@Override
	public int getTotalReportedMember(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.getTotalReportedMember", map);
	}
	
	//C. 신고 카테고리(게시글/댓글/상점/상품/리뷰) 검색 출력
	@Override
	public List<ComplainDTO> findWithdrawCate(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.findWithdrawCate", map);
	}
	
	//C. 신고 카테고리(게시글/댓글/상점/상품/리뷰) 검색 페이징 처리
	@Override
	public int getCateBP(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.getCateBP", map);
	}
	@Override
	public CommentDTO getCommentContent(String comment_seq) {
		return sqlSession.selectOne("adminSQL.getCommentContent", comment_seq);
	}

	@Override
	public ReviewDTO getReviewContent(String review_seq) {
		return sqlSession.selectOne("adminSQL.getReviewContent", review_seq);
	}

	@Override
	public void solveComplain(Map<String, Integer> map) {
		sqlSession.update("adminSQL.solveComplain", map);
	}
	//신고 내역 블라인드 처리(게시글/댓글/리뷰에 한하여)
	@Override
	public void blindComplain(String board_seq, String comment_seq, String review_seq, String thisIs) {
		if(thisIs.equals("게시글") ){
			sqlSession.update("adminSQL.boardBlindComplain", Integer.parseInt(board_seq));
			
		}else if(thisIs.equals("댓글")) {
			sqlSession.update("adminSQL.commentBlindComplain", Integer.parseInt(comment_seq));
			
		}else if(thisIs.equals("리뷰")) {
			sqlSession.update("adminSQL.reviewBlindComplain", Integer.parseInt(review_seq));
		}
	}
	//신고당한 수
	@Override
	public int totalReported(String id) {
		return sqlSession.selectOne("adminSQL.totalReported", id);
	}


//  [명경-1:1문의]=========================================================================
//  A.1:1문의 전체 리스트 출력
	@Override
	public List<QnaDTO> getQnaList(Map<String, Integer> map) {
		return sqlSession.selectList("adminSQL.getQnaList", map);
	}
	// A.1:1문의 전체 리스트 개수
	@Override
	public int getQnaTotal() {
		return sqlSession.selectOne("adminSQL.getQnaTotal");
	}
	@Override
	public QnaDTO getQnaContent(int qna_seq) {
		return sqlSession.selectOne("adminSQL.getQnaContent", qna_seq);
	}
	@Override
	public void writeAnswer(Map<String, Object> map) {
		sqlSession.update("adminSQL.writeAnswer", map);
	}
	//1:1문의 - 조건검색 후 문의 내역 출력
	@Override
	public List<QnaDTO> getSearchQnaList(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.getSearchQnaList", map);
	}
	//1:1문의 조건검색 후 문의 내역 출력 페이징
	@Override
	public int totalG(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.totalG", map);
	}
//	[명경-탈퇴회원관리]=========================================================================
	@Override
	//탈퇴사유 리스트 출력
	public List<WithdrawDTO> getWithdrawList(Map<String, Integer> map) {
		List<WithdrawDTO> list = sqlSession.selectList("adminSQL.getWithdrawList", map);
		return list;
	}

	//탈퇴사유 조건검색 리스트 출력
	@Override
	public List<WithdrawDTO> getSearchWithdrawList(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.getSearchWithdrawList", map);
	}
	//탈퇴사유 조건검색 리스트 출력_페이징
	@Override
	public int totalH(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.totalH", map);
	}	
	
//	[탈퇴사유 파이 그래프를 그리기 위한 데이터들(사유별 개수)]
	//탈퇴사유 전체 개수
	@Override
	public int getWithdrawTotal() {
		return sqlSession.selectOne("adminSQL.getWithdrawTotal");
	}
	
	//탈퇴사유 - '낮은 이용' 개수
	@Override
	public int getWithdraw_lowFrequencyTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_lowFrequencyTotal");
	}
	//탈퇴사유 - '재가입' 개수
	@Override
	public int getWithdraw_rejoinTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_rejoinTotal");
	}
	//탈퇴사유 - '적은 콘텐츠' 개수
	@Override
	public int getWithdraw_lowContentsTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_lowContentsTotal");
	}
	//탈퇴사유 - '개인정보보호' 개수
	@Override
	public int getWithdraw_protectInfoTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_protectInfoTotal");
	}
	//탈퇴사유 - '적은 혜택' 개수
	@Override
	public int getWithdraw_lowBenefitTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_lowBenefitTotal");
	}
	//탈퇴사유 - '기타 사유' 개수
	@Override
	public int getWithdraw_othersTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_othersTotal");
	}
	
	


	
}
