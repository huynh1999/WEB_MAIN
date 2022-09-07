//=========================================================
//*@FileName   : MDM_MCM_0030.jsp
//*@FileTitle  : Sub Continent Code
//*@Description: Sub Continent Code
//*@author     : Choi,Gil-Ju - Cyberlogitec
//*@version    : 1.0 - 01/09/2009
//*@since      : 01/09/2009
//
//*@Change history:
//*@author     : tuan.Chau
//*@version    : 2.0 - 2014/08/12
//*@since      : 2014/08/12
//=========================================================
function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
		case "Print":
			formObj.title.value="I.T&T.E Report";			
			formObj.file_name.value="itnte_notice_i_hbl_01.mrd";
			//Parameter Setting
			var param="[" + formObj.f_intg_bl_seq.value + "]";
			param += "[" + ofcCd + "]";
			param += "[" + formObj.air_sea_tp.value + "]";
			param += "[" + formObj.title.value + "]";
			formObj.rd_param.value=param;
			if (formObj.air_sea_tp.value == "S") {
				formObj.rpt_biz_tp.value="OIH";
			} else if (formObj.air_sea_tp.value == "A") {
				formObj.rpt_biz_tp.value="AIH";
			}
			formObj.rpt_biz_sub_tp.value="IT";
			popPOST(formObj, "RPT_RD_0010.clt", "popTest", 1025, 740);
		break;
		case "CLOSE":
			ComClosePopup();
			window.close();
    	break;
    }
}
