
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var formObj  = document.form;
    
    switch(srcName) {
   		case "SEARCH01":
		    formObj.f_cmd.value = SEARCH01;
        	doShowProcess();
            formObj.action = "./SEC_FRT_0050.clt";
            formObj.submit();
   	   	break;
   	   	case "SEARCH02":
		    if(formObj.ca_no.value==""){
		    	//Please enter a [CA NO]!
		    	alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEC_FRT_0050.16");
            	break;
            }else{
            	formObj.f_cmd.value = SEARCH02;
	    		doShowProcess();
	            formObj.action = "./SEC_FRT_0050.clt";
	            formObj.submit();
            }

   	   	break;
		case "ISSUE":		
			if(formObj.cls_flg.value!="N"){
				//Not Closed B/L. Please confirm.
				alert(getLabel('SEA_COM_ALT001')+ "\n\n: SEC_FRT_0050.29");
            	break;
            	
			}else if(formObj.house_bl_no.value==""){
		   		//Please enter a [House B/L Number]!
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEC_FRT_0050.34");
            	break;
            	
			}else if(formObj.master_ca_sts_cd.value=="I"){
		   		//There is a registered CA among House B/L of Master B/L. Please confirm.
		   		alert(getLabel('SEA_COM_ALT002')+ "\n\n: SEC_FRT_0050.39");
            	break;
            	
			}else{
				chkBoxVal();
				/*if(formObj.ca_seq.value!=""){
					if(formObj.ca_sts_cd.value=="C"){					
						alert("이미 CONFIRM된 건입니다.");
						break;				
					}
				}*/
				formObj.ca_sts_cd.value = "I";
				//if(formObj.ca_seq.value==""){
					formObj.f_cmd.value = ADD;
					if(checkAddModiVal(formObj)){
			            //Do you want to issue?
						if(confirm(getLabel('FMS_COM_CFMISS'))){
		            	    doShowProcess();
				            formObj.action = "./SEC_FRT_0050.clt";
				            formObj.submit();
			            } 
			        }
	           // }
			}
       	break;
       	
		case "CONFIRM":
		
			if(formObj.ca_seq.value==""){
				//You can CONFIRM after [CA Issue].
				alert(getLabel('SEA_COM_ALT003')+ "\n\n: SEC_FRT_0050.68");
				break;
			}
		
			if(formObj.usr_id.value!=formObj.rgst_usrid.value){
				//Not permitted to CONFIRM.
				alert(getLabel('SEA_COM_ALT004')+ "\n\n: SEC_FRT_0050.68");
				break;
			}
			
			if(formObj.house_bl_no.value==""){
				//Please enter a [House B/L Number]!
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: SEC_FRT_0050.80");
            	break;
			}
			
			chkBoxVal()

			formObj.f_cmd.value = MODIFY01;
			formObj.ca_sts_cd.value = "C";
			if(checkAddModiVal(formObj)){
				//Do you want to Confirm?
				if(confirm(getLabel('FMS_COM_CFMCFM'))){
                	doShowProcess();
		            formObj.action = "./SEC_FRT_0050.clt";
		            formObj.submit();
	            }
	    	}

       	break;
       	case "CANCEL":
       		//Do you want to Delete?
			if(confirm(getLabel('FMS_COM_CFMDEL'))){
       			doShowProcess();
				formObj.f_cmd.value = REMOVE;
	            formObj.action = "./SEC_FRT_0050.clt";
	            formObj.submit();
       		}
       	break;   	   	
         
    }
}

/* val check*/
function checkAddModiVal(formObj){
	var isOk = true;
	
    /*var isOk = checkFileExt(formObj.brd_file.value, noticeDocExt);	//파일 확장자 확인
    if(!isOk){
    	//alert('You can\'t upload unauthorized file!\n\nThe premitted file extension is ['+noticeDocExt+']');
    }
    if(formObj.brd_file.value!=''){
    	if(getFileNameLength(formObj.brd_file.value)>40){
    		//alert('Please change selected file name! The file name must be in 40 character include file extensio!');
    		return false;
    	}	
    }*/
	if(checkInputVal(formObj.pre_info_txt.value, 1, 2000, "T", getLabel('SEA_COD_CURI'))!='O'){
    	isOk = false;
    }
	else if(checkInputVal(formObj.corr_info_txt.value, 1, 2000, "T", getLabel('SEA_COD_CORI'))!='O'){
    	isOk = false;
    }
	
    if(isOk){
    	return true;
    }
}

/*pop up open*/
function doPop(srcName){

    var formObj  = document.form;
    
    switch(srcName) {
   	   	
   	   	case "HBL_POPLIST":
          	var rtnary = new Array(1);
	   		
	   		rtnary[0] = "S";
	   		rtnary[1] = formObj.bnd_clss_cd.value;
	   		
   	        var rtnVal = window.showModalDialog('./CMM_POP_0170.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:818px;dialogHeight:480px");
   	       
   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
			
				var rtnValAry = rtnVal.split("|");
				formObj.house_bl_no.value = rtnValAry[0];//house_bl_no
				formObj.master_bl_no.value = rtnValAry[1];//master_bl_no
				formObj.ca_sts_cd.value = rtnValAry[2];//ca_sts_cd
				formObj.s_intg_bl_seq.value = rtnValAry[3];//intg_bl_seq
				formObj.bkg_no.value = rtnValAry[4];//bkg_no
			}

			doWork('SEARCH01');
			
		break; 
		
		case "PARTNER_POPLIST":
	   
	   		var rtnary = new Array(1);
	   		
	   		rtnary[0] = "1";
	   		rtnary[1] = "";
	   		rtnary[2] = window;
	   		
   	        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
   	        //window.open ('./CMM_POP_0010.clt', "list", "scrollbars=no,fullscreen=no,width=1024,height=480");
   	        
   	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
				return;
			}else{
			
				var rtnValAry = rtnVal.split("|");
				formObj.ntc_trdp_cd.value = rtnValAry[0];//trdp_cd
				formObj.ntc_trdp_short_nm.value = rtnValAry[1];//shrt_nm
				formObj.ntc_trdp_full_nm.value = rtnValAry[2];//full_nm
			}

         break; 
         
         case "HOUSEBL":	
		   	formObj.f_cmd.value = SEARCHLIST;
	    	formObj.action = "./SEI_BMD_0020.clt?f_bl_no="+formObj.house_bl_no.value+"&f_intg_bl_seq="+formObj.intg_bl_seq.value;
		    formObj.submit();
		break; 
         
    }
	
} 

function chkBoxVal(){

	var formObj  = document.form;
	
	if(formObj.grs_wgt_flg.checked == true){
		formObj.grs_wgt_flg.value ="Y";
	}
	if(formObj.cbm_flg.checked == true){
		formObj.cbm_flg.value ="Y";
	}
	if(formObj.mk_desc_flg.checked == true){
		formObj.mk_desc_flg.value ="Y";
	}
	if(formObj.vsl_flg.checked == true){
		formObj.vsl_flg.value ="Y";
	}
	if(formObj.cntr_flg.checked == true){
		formObj.cntr_flg.value ="Y";
	}
	if(formObj.frt_term_flg.checked == true){
		formObj.frt_term_flg.value ="Y";
	}
	
	if(formObj.shpr_pty_flg.checked == true){
		formObj.shpr_pty_flg.value ="Y";
	}
	if(formObj.cnee_pty_flg.checked == true){
		formObj.cnee_pty_flg.value ="Y";
	}
	if(formObj.ntfy_pty_flg.checked == true){
		formObj.ntfy_pty_flg.value ="Y";
	}
	if(formObj.cmdt_flg.checked == true){
		formObj.cmdt_flg.value ="Y";
	}
	if(formObj.rout_flg.checked == true){
		formObj.rout_flg.value ="Y";
	}
	if(formObj.trf_inv_amt_flg.checked == true){
		formObj.trf_inv_amt_flg.value ="Y";
	}
	if(formObj.otr_flg.checked == true){
		formObj.otr_flg.value ="Y";
	}
	    
}

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj  = document.form;
 	if( formObj.s_intg_bl_seq.value != "" ) {
 		doWork('SEARCH01');
 	}
}
