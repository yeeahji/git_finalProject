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
//  [신고]=========================================================================

	// 신고 전체 리스트 출력
	@Override
	public List<StoreDTO> getComplainList(Map<String, Integer> map) {
		return sqlSession.selectList("adminSQL.getComplainList", map);
	}

	// 신고 전체 개수(for 신고 전체 리스트 페이징)
	@Override
	public int getComplainTotal() {
		return sqlSession.selectOne("adminSQL.getComplainTotal");
	}

	// 신고 검색 결과 출력
	@Override
	public List<ComplainDTO> searchReportedMember(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.searchReportedMember", map);
	}

	// 신고 검색 개수(for 신고 검색 리스트 페이징)
	@Override
	public int getTotalReportedMember(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.getTotalReportedMember", map);
	}

	@Override
	public CommentDTO getCommentContent(String comment_seq) {
		return sqlSession.selectOne("adminSQL.getCommentContent", comment_seq);
	}

	@Override
	public ReviewDTO getReviewContent(String review_seq) {

		return sqlSession.selectOne("adminSQL.getReviewContent", review_seq);
	}

//	[신고]=========================================================================

	// 신고 전체 리스트 출력
	@Override
	public List<StoreDTO> getComplainList(Map<String, Integer> map) {
		return sqlSession.selectList("adminSQL.getComplainList", map);
	}

	// 신고 전체 개수(for 신고 전체 리스트 페이징)
	@Override
	public int getComplainTotal() {
		return sqlSession.selectOne("adminSQL.getComplainTotal");
	}

	// 신고 검색 결과 출력
	@Override
	public List<ComplainDTO> searchReportedMember(Map<String, String> map) {
		return sqlSession.selectList("adminSQL.searchReportedMember", map);
	}

	// 신고 검색 개수(for 신고 검색 리스트 페이징)
	@Override
	public int getTotalReportedMember(Map<String, String> map) {
		return sqlSession.selectOne("adminSQL.getTotalReportedMember", map);
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

//[1:1문의]=========================================================================
//A.1:1문의 전체 리스트 출력
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

//	[탈퇴회원관리]=========================================================================
	@Override
	public List<WithdrawDTO> getWithdrawList(Map<String, Integer> map) {
		List<WithdrawDTO> list = sqlSession.selectList("adminSQL.getWithdrawList", map);
		System.out.println("3:" + list);
		return list;
	}

	@Override
	public int getWithdrawTotal() {
		return sqlSession.selectOne("adminSQL.getWithdrawTotal");
	}

	@Override
	public int getWithdraw_lowFrequencyTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_lowFrequencyTotal");
	}

	@Override
	public int getWithdraw_rejoinTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_rejoinTotal");
	}

	@Override
	public int getWithdraw_lowContentsTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_lowContentsTotal");
	}

	@Override
	public int getWithdraw_protectInfoTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_protectInfoTotal");
	}

	@Override
	public int getWithdraw_lowBenefitTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_lowBenefitTotal");
	}

	@Override
	public int getWithdraw_othersTotal() {
		return sqlSession.selectOne("adminSQL.getWithdraw_othersTotal");
	}

	@Override
	public void blindComplain(String board_seq, String comment_seq, String review_seq, String thisIs) {
	if(thisIs.equals("게시글") ){
		System.out.println("aaa");
		sqlSession.update("adminSQL.boardBlindComplain", Integer.parseInt(board_seq));
		
	}else if(thisIs.equals("댓글")) {
		System.out.println("bbb");
		sqlSession.update("adminSQL.commentBlindComplain", Integer.parseInt(comment_seq));
		
	}else if(thisIs.equals("리뷰")) {
		System.out.println("ccc");
		sqlSession.update("adminSQL.reviewBlindComplain", Integer.parseInt(review_seq));
		
	}
	System.out.println("3:"+board_seq+"/"+comment_seq+"/"+review_seq+"/"+thisIs);

	//회원_영구정지
	@Override
	public void memberBlock(String id) {
		  System.out.println("영구정지 맵퍼에 들어가기전");
		  sqlSession.update("adminSQL.memberBlock", id);
		  System.out.println("영구정지 맵퍼에 들어가고난 후");
	}
	//회원_영구정지 복구
	@Override
	public void memberReleaseBtn(String id) {
		  System.out.println("계정복구 맵퍼에 들어가기전");
		  sqlSession.update("adminSQL.memberReleaseBtn", id);
		  System.out.println("계정복구 맵퍼에 들어가고난 후");
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
	}

}
