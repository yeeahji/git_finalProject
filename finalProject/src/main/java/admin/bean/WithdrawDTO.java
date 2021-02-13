package admin.bean;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class WithdrawDTO {
	private String mem_id;
	private String withdraw_lowFrequency;
	private String withdraw_rejoin;
	private String withdraw_lowContents;
	private String withdraw_protectInfo;
	private String withdraw_lowBenefit;
	private String withdraw_others;
	private String withdraw_detailReason;
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern = "yyyy.MM.dd")
	private Date withdraw_logtime;
}
