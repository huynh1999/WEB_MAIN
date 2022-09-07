/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0330.js
*@FileTitle  : ?
*@author     : CLT
*@version    : 1.0
*@since      : 
=========================================================*/
var blRate = false;
var HBLEntryScreen = false;
var HBLEntryScreenRefNo = false;

function doWork(srcName, curObj, valObj){
	var formObj=document.frm1;	
	switch(srcName) {
		case "CLOSE":
			var retArray=false;
			ComClosePopup(retArray); 
		break;	       
		case "YES":
			
			var retArray="";	
			var arChk = formObj.ar_chk.checked?"Y":"N";
			var apChk = formObj.ap_chk.checked?"Y":"N";
			var dcChk = formObj.dc_chk.checked?"Y":"N";			
			var rtChk = formObj.rt_chk.checked?"Y":"N";
			
			/*Vinh.Vo (S)*/
			var shpr_csne_chk = formObj.shpr_csne_chk.checked?"Y":"N";
			var shmt_itm_chk = formObj.shmt_itm_chk.checked?"Y":"N";
			var mrk_desc_chk = formObj.mrk_desc_chk.checked?"Y":"N";
			var rmk_chk = formObj.rmk_chk.checked?"Y":"N";
			/*Vinh.Vo (E)*/
			
			var ref_no_chk = formObj.ref_no_chk.checked?"Y":"N";
			
			//#5878 [BNX-JAPAN] BNX C/S 요구사항
			var frt_trm_chk = formObj.frt_trm_chk.checked?"Y":"N";
			
			
			
			retArray += true
			retArray += "|";
			retArray += arChk;
			retArray += "|";
			retArray += apChk;
			retArray += "|";
			retArray += dcChk;
			
			/*Vinh.Vo (S)*/
			if(HBLEntryScreen){
				retArray += "|";
				retArray += shpr_csne_chk;
				retArray += "|";
				retArray += shmt_itm_chk;
				retArray += "|";
				retArray += mrk_desc_chk;
				retArray += "|";
				retArray += rmk_chk;
			}
			/*Vinh.Vo (E)*/
			
			if(blRate){
				retArray += "|";
				retArray += rtChk;
			}
			
			if(HBLEntryScreenRefNo){
				retArray += "|";
				retArray += ref_no_chk;
				//#5878 [BNX-JAPAN] BNX C/S 요구사항
				retArray += "|";
				retArray += frt_trm_chk;
			}
						
			ComClosePopup(retArray); 
		break;	       
		case "NO":
			var retArray=false;
			ComClosePopup(retArray); 
			break;	       
    }
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {	
	var arg=parent.rtnary;	
	if(arg[0] == "AIE_BMD_0040"){
		blRate = true;
		document.getElementById("col_rt_chk").style.display=""
		HBLEntryScreen = true;
		document.getElementById("col_mrk_desc_chk").style.display="";
	}else if (arg[0] == "HBL" ){//#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
		HBLEntryScreenRefNo = true;
		document.getElementById("tb_hbl_refno_chk").style.display="";
		
		HBLEntryScreen = true;	
		document.getElementById("col_mrk_desc_chk").style.display="";
		document.getElementById("col_rmk_chk").style.display="";
	}else if (arg[0] == "HBL1" ){//#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
		HBLEntryScreenRefNo = true;
		document.getElementById("tb_hbl_refno_chk").style.display="";
		
		HBLEntryScreen = true;	
		document.getElementById("col_mrk_desc_chk").style.display="";
	}else if(arg[0] == "OBL" ){ //#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
		HBLEntryScreen = true;
		document.getElementById("col_mrk_desc_chk").style.display="";
		document.getElementById("col_rmk_chk").style.display="";
	}else if (arg[0] == "ABL" ){
		HBLEntryScreen = true;
		document.getElementById("col_mrk_desc_chk").style.display="";
	}
		
	
	// S :: #48986 B/L Copy 경고메세지 출력 
	var pop_width = $(this).width();
	var txt_1 = "<p>B/L(AWB) basic data has been copied, do you want to copy more information?</p>";	// popup size 480 message
	var txt_2 = "<p>B/L(AWB) basic data has been copied, do you want to copy</p><p>more information?</p>"; // popup size 340 message
	var txt_3 = "<p>B/L(AWB) basic data has been copied,</p><p>do you want to copy more information?</p>"; // popup size 260 message
	
	// 팝업 사이즈에 따라 출력 텍스트 변경
	if(pop_width > 400){
		$(".warning_msg").append(txt_1);
	} 
	else if(pop_width > 300){
		$(".warning_msg").append(txt_2);
	}
	else if(pop_width > 200){
		$(".warning_msg").append(txt_3);
	}
	// E :: #48986 B/L Copy 경고메세지 출력 
}

function allCheck(obj) {
	var formObj=document.frm1;
	if (obj.checked) {
		formObj.ar_chk.checked = true;
		formObj.ap_chk.checked = true;
		formObj.dc_chk.checked = true;

		

		if(blRate){
			formObj.rt_chk.checked = true;
		}
		
		/*Vinh.Vo (S)*/
		if(HBLEntryScreen){
			
			formObj.shpr_csne_chk.checked = true;
			formObj.shmt_itm_chk.checked = true;
			formObj.mrk_desc_chk.checked = true;
			formObj.rmk_chk.checked = true;
			//#5878 [BNX-JAPAN] BNX C/S 요구사항
			formObj.frt_trm_chk.checked = true;
		}
		/*Vinh.Vo (E)*/
		//#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
		if(HBLEntryScreenRefNo){
			formObj.ref_no_chk.checked = true;
		}
		
	} else {
		formObj.ar_chk.checked = false;
		formObj.ap_chk.checked = false;
		formObj.dc_chk.checked = false;

		/*Vinh.Vo (S)*/
		if(HBLEntryScreen){
			formObj.shpr_csne_chk.checked = false;
			formObj.shmt_itm_chk.checked = false;
			formObj.mrk_desc_chk.checked = false;
			formObj.rmk_chk.checked = false;
			//#5878 [BNX-JAPAN] BNX C/S 요구사항
			formObj.frt_trm_chk.checked = false;
		}
		/*Vinh.Vo (E)*/

		if(blRate){
			formObj.rt_chk.checked = false;
		}
		//#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
		if(HBLEntryScreenRefNo){
			formObj.ref_no_chk.checked = false;
		}
	}
}