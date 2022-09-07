function loadPage(){
	var formObj = document.frm1;
	var d = new Date();
	
}


function doWork(srcName){
    switch(srcName) {
		case 'Print':
			
   			var formObj = document.frm1;
   			
			formObj.file_name.value = 'booking_confirmation.mrd';
   			formObj.title.value = 'Booking Confirmation';

   			
   			
   			// Parameter Setting
   			var param = '';
   			param += '[' + formObj.intg_bl_seq.value + ']'; // $1
   			param += '[' + formObj.f_ofc_nm.value + ']';
   			param += '[' + formObj.f_email.value + ']';
   			//param += '[' + formObj.shpr_trdp_cd.value + ']';
   			//param += '[' + formObj.shpr_trdp_nm.value + ']';
   			param += '[' + formObj.shpr_trdp_addr.value + ']';
//   			param += '[' + formObj.i_ooh_bkg_rmk.value + ']';
   			
   			/* #20887 : [GPL] Export Print Major Forms 변경 - bkg confirmation 헤더정보 jsjang 2013.9.17 */
   			param += '[' + formObj.f_ofc_cd.value + ']';	//5
   			param += '[' + formObj.f_phone.value + ']';		//6
   			param += '[' + formObj.f_fax.value + ']';		//7
   			
   			
			//#24658 Booking Confirmation에다 Filing No. 추가
			if (prn_ofc_cd == "GPL") {
				param += '[Y]';								//8
			} else {
				param += '[N]';								//8
			}

   			formObj.rd_param.value = param;

			formObj.intg_bl_seq.value = formObj.intg_bl_seq.value;
			formObj.rpt_biz_tp.value = "OEH";
			formObj.rpt_biz_sub_tp.value = "BC";

			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);			
			
			window.close();

		break;
		
		case "CLOSE":
	    	window.close();
    	break;
    	
    }
}

function checkTrdpCode(obj){
	//alert(frm1.shpr_trdp_cd.value);
	//var formObj = document.frm1;
	if(frm1.shpr_trdp_cd.value==""){
		frm1.shpr_trdp_addr.value = obj.value;
	}
}


