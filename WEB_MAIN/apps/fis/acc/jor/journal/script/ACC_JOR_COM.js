/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){

    switch(doWhat){
	    case 'DATE1':    //달력 조회 팝업 호출  
	    	var cal = new calendarPopup();
	        cal.select(formObj.f_deposit_dt, 'f_deposit_dt', 'MM-dd-yyyy');
	        formObj.deposit_chk.checked = true;
	        break;
	    
	    case 'DATE2':    //달력 조회 팝업 호출      
	    	var cal = new calendarPopup();
	        cal.select(formObj.f_void_dt, 'f_void_dt', 'MM-dd-yyyy');
	        formObj.void_chk.checked = true;
	        break;
	    
	    case 'DATE3':    //달력 조회 팝업 호출      
	    	var cal = new calendarPopup();
	        cal.select(formObj.f_post_dt, 'f_post_dt', 'MM-dd-yyyy');
	    
	        break;
    }
}

function searchGlBankInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var sheetObj = docObjects[0];
	var formObj  = document.frm1;
		
	if(doc[0]=='OK'){
		
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');
			sheetObj.CellValue(SELECTROW, "gl_no")   	= rtnArr[2];
			sheetObj.CellValue(SELECTROW, "gl_rmk") 	= rtnArr[3];
			
		}else{
			sheetObj.CellValue(SELECTROW, "gl_no")   	= "";
			sheetObj.CellValue(SELECTROW, "gl_rmk") 	= "";
			
	        
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

/**
 * GL_CD 관린 코드조회
 */
function getGlRmk(reqVal){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	var doc = getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			//조회해온 결과를 Parent에 표시함
			var rtnArr = doc[1].split('^@');

			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				sheetObj.CellValue(SELECTROW, "gl_no")  		= rtnArr[0];
				sheetObj.CellValue(SELECTROW, "gl_rmk") 		= rtnArr[1];
			}else{
				sheetObj.CellValue(SELECTROW, "gl_no")  		= "";
				sheetObj.CellValue(SELECTROW, "gl_rmk") 		= "";
				
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function setBankCurChkNo(){
	var formObj = document.frm1;
	formObj.f_cur_chk_no.value = "";
	ajaxSendPost(getBankCurChkNo, 'reqVal', '&goWhere=aj&bcKey=searchBankCurChkNo&bank_seq='+formObj.f_bank_cd.value, './GateServlet.gsl');
    formObj.f_chk_no.value =  formObj.f_cur_chk_no.value;
}

function setVoidDate(){
	var formObj  = document.frm1;
	
	if(formObj.void_chk.checked){
		//formObj.f_void_dt.value = TODAY;
		//LHK 20131112, File Block_dt 와 Post Date, Today 체크, MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT), Today 중 가장 최근 Date을 Set
		var post_dt		= formObj.f_post_dt.value;
		var f_void_dt	= "";
		
		if(NEXT_BLOCK_DT != ""){
			if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
				f_void_dt 	= 	NEXT_BLOCK_DT;
			}else{
				f_void_dt	=	post_dt;
			}
			
			if(compareTwoDate(TODAY, f_void_dt)){						//TODAY 비교, fromDate > toDate true
				f_void_dt 	= 	TODAY;
			}
			
		}else{
			if(compareTwoDate(TODAY, post_dt)){						//TODAY 비교, fromDate > toDate true
				f_void_dt 	= 	TODAY;
			}else{
				f_void_dt	=	post_dt;
			}
		}
		
		formObj.f_void_dt.value = f_void_dt;
	}else{
		formObj.f_void_dt.value = "";
	}
}

function setDepositDate(){
	var formObj  = document.frm1;
	
	if(formObj.deposit_chk.checked){
		if(formObj.f_deposit_dt.value == ""){
			
			/*
			// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
			var today = "";
			var slip_post = formObj.slip_post.value;
			
			if(slip_post != ""){
				today   = TODAY.replaceAll("-","");
				today   = today.substring(4,8)+today.substring(0,2)+today.substring(2,4);
				slip_post = slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
				if(slip_post >= today){
					formObj.f_deposit_dt.value = SLIP_POST_DT;
				}else{
					formObj.f_deposit_dt.value = TODAY;
				}
			}else{
				formObj.f_deposit_dt.value = TODAY;
			}
			*/
			
			//LHK 20131112, File Block_dt 와 Post Date, Today 체크, MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT), Today 중 가장 최근 Date을 Set
			var post_dt	= formObj.f_post_dt.value;
			var f_deposit_dt	= "";
			
			if(NEXT_BLOCK_DT != ""){
				if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
					f_deposit_dt 	= 	NEXT_BLOCK_DT;
				}else{
					f_deposit_dt	=	post_dt;
				}
				/* 정원영 수정 #25248
				*/
				if(compareTwoDate(TODAY, f_deposit_dt)){						//TODAY 비교, fromDate > toDate true
					f_deposit_dt 	= 	TODAY;
				}
			}else{
				/* 정원영 수정 #25248
				*/
				if(compareTwoDate(TODAY, post_dt)){						//TODAY 비교, fromDate > toDate true
					f_deposit_dt 	= 	TODAY;
				}else{
					f_deposit_dt	=	post_dt;
				}
			}
			
			formObj.f_deposit_dt.value = f_deposit_dt;
		}
	}else{
		formObj.f_deposit_dt.value = "";
	}
}

function custEnterAction(obj, type){
	var formObj  = document.frm1;
	
	if(event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}
		else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}
		
	}
}

//그리드 전체를 삭제하면 INVOICE 를 삭제한다.
function checkDelete(){
	var sheetObj = docObjects[0];
	var returnFlag = true;
	
	for(var i=1; i<=sheetObj.LastRow; i++){
	    if(sheetObj.CellValue(i,"del_chk") == "1" && sheetObj.CellValue(i,"jnr_no") != ""){
		    sheetObj.CellValue(i, "ibflag") = "D";
	    }
    }

	// 조회한 row가 0이 아니고 delCnt가 시트의 row 갯수와 같을때 
	if(sheetObj.RowCount > 0 && sheetObj.CheckedRows("del_chk") == sheetObj.RowCount){
		returnFlag =  false;
	}

	return returnFlag
}

//POST DATE 변경시 INV_SEQ 가 없는 ROW의 POST_DATE 를 변경한다.
function setPostDt(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	for(var i=1; i<=sheetObj.LastRow;i++){
		if(sheetObj.CellValue(i, "inv_seq") == ""){
			sheetObj.CellValue(i, "inv_post_dt") = formObj.f_post_dt.value;
		}
	}
}

//Deposit Date를 입력하면 Deposit Check를 한다.
function checkDeposit(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	if(formObj.f_deposit_dt.value != ""){

		/*
		// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
		var bl_post   = formObj.f_deposit_dt.value;
		var slip_post = formObj.slip_post.value;
		
		//role_cd 가 'ADM' 인경우에는 수정가능하게 한다.
		if(formObj.role_cd.value != "ADM"){
			if(bl_post != "" && slip_post != ""){
				bl_post   = bl_post.replaceAll("-","");
				bl_post   = bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
				slip_post = slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
				if(slip_post >= bl_post){
//					alert("Invalid [Clear Date]");
					alert(getLabel('ACC_MSG28'));
					formObj.f_deposit_dt.value = SLIP_POST_DT;
					formObj.f_deposit_dt.select();
					return false;
				}
			}
		}
		
		//CLR_DT는 POST_DT 보다 같거나 커야한다.
		var post_dt = formObj.f_post_dt.value.replaceAll("-","");
		var clr_dt = formObj.f_deposit_dt.value.replaceAll("-","");
		post_dt = post_dt.substring(4,8)+post_dt.substring(0,2)+post_dt.substring(2,4);
		clr_dt = clr_dt.substring(4,8)+clr_dt.substring(0,2)+clr_dt.substring(2,4);

		if(post_dt > clr_dt){
//			alert("Invalid [Clear Date]");
			alert(getLabel('ACC_MSG28'));
			formObj.f_deposit_dt.focus();
			return;
		}
		*/
		
		var temp_dt     = "";
		var temp_val    = "";
		var f_deposit_dt    = formObj.f_deposit_dt.value;
		var post_dt			= formObj.f_post_dt.value;
		
		//LHK 20131112, File Block_dt 와 Post Date, MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
		if(NEXT_BLOCK_DT != ""){
			if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
				temp_dt 	= 	NEXT_BLOCK_DT;
			    temp_val    =  'B';
			}else{
				temp_dt	=	post_dt;
				temp_val    =   'P';
			}
			/* 정원영 #25248
			if(compareTwoDate(TODAY, temp_dt)){						//TODAY 비교, fromDate > toDate true
				temp_dt 	= 	TODAY;
			    temp_val    =   'T';
			}
			*/
		}else{
			temp_dt	=	post_dt;
			temp_val    =   'P';
			/* 정원영 #25248
			if(compareTwoDate(TODAY, post_dt)){						//TODAY 비교, fromDate > toDate true
				temp_dt 	= 	TODAY;
			    temp_val    =   'T';
			}else{
				temp_dt	=	post_dt;
				temp_val    =   'P';
			}
			*/
		}
		
		if(compareTwoDate(temp_dt, f_deposit_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			if(temp_val == 'B'){
				alert(getLabel2('ACC_MSG131',new Array(ORG_BLOCK_DT))); //The Void Date must be later than the block date (@)
			}else if(temp_val == 'P'){
				alert(getLabel2('ACC_MSG127',new Array(temp_dt))); //The Void Date must be later than or equal the Post date.
			}else if(temp_val == 'T'){
				alert(getLabel2('ACC_MSG132',new Array(temp_dt))); //The Void Date must be later than or equal the today
			}
			
			// formObj.f_deposit_dt.select();
			formObj.f_deposit_dt.value = '';
			formObj.deposit_chk.checked = false;
			return;
		}
		formObj.deposit_chk.checked = true;
	}
	else{
		formObj.deposit_chk.checked = false;
	}
}

//Void Date를 입력하면 Void Check를 한다.
function checkVoid(){
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	var temp_dt     = "";
	var temp_val    = "";
	
	var old_void_dt   	= formObj.old_void_dt.value;
	var f_void_dt   	= formObj.f_void_dt.value;
	var f_post_dt		= formObj.f_post_dt.value;
	var f_deposit_dt	= formObj.f_deposit_dt.value;

	if(old_void_dt == f_void_dt){
		return;
	}
	
//	if(NEXT_BLOCK_DT != "" && f_deposit_dt!= ""){
//		return;
//	}
	
	if(f_void_dt != ""){
		
		temp_dt		=	f_post_dt;
		temp_val    =   'P';
		
		//LHK 20131112, File Block_dt 와 Post Date, MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
		if(NEXT_BLOCK_DT != ""){
			if(compareTwoDate(NEXT_BLOCK_DT, f_post_dt)){						//f_post_dt 와 block_dt 비교, fromDate > toDate true
				temp_dt 	= 	NEXT_BLOCK_DT;
			    temp_val    =  'B';
			}
			
			if(f_deposit_dt != ""){
				if(compareTwoDate(f_deposit_dt, temp_dt)){						//f_deposit_dt 비교, fromDate > toDate true
					temp_dt 	= 	f_deposit_dt;
				    temp_val    =   'C';
				}
			}
			
		}else{
			if(f_deposit_dt != ""){
				if(compareTwoDate(f_deposit_dt, f_post_dt)){						//f_deposit_dt 비교, fromDate > toDate true
					temp_dt 	= 	f_deposit_dt;
				    temp_val    =   'C';
				}
			}			
		}
		
		if(compareTwoDate(temp_dt, f_void_dt)){						//f_void_dt, post_dt, block, today 와 비교, fromDate > toDate true
			if(temp_val == 'B'){
				alert(getLabel2('ACC_MSG129',new Array(ORG_BLOCK_DT))); //The Void Date must be later than the block date (@)
			}else if(temp_val == 'P'){
				alert(getLabel2('ACC_MSG126',new Array(temp_dt))); //The Void Date must be later than or equal the Post date.
			}else if(temp_val == 'C'){
				alert(getLabel2('ACC_MSG136',new Array("Deposit Date"))); //The Void Date must be later than or equal the @. [Deposit Date (01-01-2014)].
			}
		
			/*
		    if(old_void_dt == ""){
		    	setVoidDate();
		    }else{
		    	formObj.f_void_dt.value = old_void_dt;
		    }
		    */
		    formObj.f_void_dt.value = old_void_dt;
			formObj.f_void_dt.select();
		}
		
		if(formObj.f_void_dt.value == ""){
	    	formObj.void_chk.checked = false;
	    }
		
	}
	else{
		formObj.void_chk.checked = false;
	}
}

//날짜더하기
function addDay(ymd, v_day){
	
	 ymd = ymd.replaceAll("-","");

	 var yyyy = ymd.substr(4,4);
	 var mm   = eval(ymd.substr(0,2) + "- 1") ;
	 var dd   = ymd.substr(2,2);
	 
	 var dt3 = new Date(yyyy, mm, eval(dd + '+' + v_day));

	 yyyy = dt3.getYear();
	 mm   = (dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd   = dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();

	 return  mm + "-" + dd + "-" + yyyy ;

}

function checkPostDate(){
	var formObj  = document.frm1;
	var post_dt = formObj.f_post_dt.value;
	
	if(post_dt == ""){
		alert(getLabel('ACC_MSG125'));
		formObj.f_post_dt.value = formObj.old_post_dt.value;
		formObj.f_post_dt.select();
		return;
	}
	
	//OnChange 시에 check 함
	if(post_dt == formObj.old_post_dt.value){
		return;
	}
	
	//Post Date 가 변경되는 경우에 NEXT_BLOCK_DT 보다 작으면 warnning massage 띄워줌
	if(NEXT_BLOCK_DT != "") {
		if(compareTwoDate(NEXT_BLOCK_DT, post_dt)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel2('ACC_MSG119',new Array(ORG_BLOCK_DT)));	//The Post Date must be later than the block date (@)";
			formObj.f_post_dt.value = formObj.old_post_dt.value;
			formObj.f_post_dt.select();
			return;
		}
	}
	
	if(formObj.f_deposit_dt.value != ""){
		if(compareTwoDate(formObj.f_post_dt.value, formObj.f_deposit_dt.value)){						//post_dt 와 block_dt 비교, fromDate > toDate true
			alert(getLabel('ACC_MSG127'));	//The Deposit Date must be later than the block date (@)";
			formObj.f_post_dt.value = formObj.old_post_dt.value;
			formObj.f_deposit_dt.select();
			return;
		}
	}
	
	if(formObj.f_void_dt.value != ""){
		if(compareTwoDate(formObj.f_post_dt.value, formObj.f_void_dt.value)){						//f_void_dt, post_dt 와 비교, fromDate > toDate true
			alert(getLabel('ACC_MSG126'));	//The Void Date must be later than or equal the Post date";
			formObj.f_post_dt.value = formObj.old_post_dt.value;
			formObj.f_void_dt.select();
			return;
		}
	}
	
}

function getBankChkForm(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			formObj.f_chk_form.value = doc[1];
		}else{
			formObj.f_chk_form.value = "";
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function getBankCurChkNo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var arrChkNo = doc[1].split("@");
			formObj.f_cur_chk_no.value = arrChkNo[0];
			formObj.f_lst_chk_no.value = arrChkNo[1];
			
		}else{
			formObj.f_cur_chk_no.value = "";
			formObj.f_lst_chk_no.value = "";
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function getInvModiTms(reqVal){
	vInvModiTms = '';
	var doc = getAjaxMsgXML(reqVal);
	// alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			vInvModiTms = doc[1];
		}
	}
}

function getDupCheckNo(reqVal){
	vDupCheckNo = '';
	var doc = getAjaxMsgXML(reqVal);
//	alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			vDupCheckNo = doc[1];
		}
	}
}

function chkNoChg() {
	depositProc();
}

/* #24673 LHK, 20131223, Deposit Check 시에 Void 할 수 없슴. */
function depositClick() {
	/** LHK, 20140116, #25248 Customer Payment/Payment Entry 화면 수정사항-1 4.Void 권한 제어 **/
	voidProc();
}

/* #24673 LHK, 20131223, Void Check 시에 Deposit 할 수 없슴. */
function voidClick() {
	depositProc();
}

function chageBankCurrCd(obj) {
	var formObj  = document.frm1;	
	var tmpBankAry = BK_CURR_CD.split("|");
	
	var curr_cd	= "";

	if(obj.value == ""){
		return;
	}

	for(var i=0; i<tmpBankAry.length; i++){
		var tmpBank = tmpBankAry[i].split("-");
		if(tmpBank[0] == obj.value){
			curr_cd = tmpBank[1];
			break;
		}
	}

	//변경한 Bank Currency 가 기존 Currency 와 동일한 경우에만 변경가능 
	if(formObj.f_jnr_no.value != ""){
		if(formObj.f_curr_cd.value != curr_cd){
			formObj.f_bank_cd.value = "";
			alert(getLabel('ACC_MSG139'));	//Please check the Bank Currency;";
			return;
		}
	}else{
		formObj.f_curr_cd.value = curr_cd;
	}
}

function goBL(bnd_clss_cd, biz_clss_cd, intg_bl_seq,  air_sea_clss_cd, bl_no){
    if(air_sea_clss_cd=='S'){
        if(biz_clss_cd=='H'){
        	if(bnd_clss_cd=='O'){
				var paramStr = "./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
			    parent.mkNewFrame('Booking & HB/L Entry', paramStr);
            }else{
            	var paramStr = "./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
			    parent.mkNewFrame('HB/L Entry', paramStr);
            }
        }else{
        	if(bnd_clss_cd=='O'){
        		var paramStr = "./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
			    parent.mkNewFrame('Master B/L Entry', paramStr);
            }else{
            	var paramStr = "./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
			    parent.mkNewFrame('Master B/L Entry', paramStr);
            }
        }
        
    }else {
    	if(biz_clss_cd=='H'){
    		if(bnd_clss_cd=='O'){
				var paramStr = "./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
				parent.mkNewFrame('Booking & HAWB Entry', paramStr);
            }else{
            	var paramStr = "./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
				parent.mkNewFrame('HAWB Entry', paramStr);
            }
        }else{
        	if(bnd_clss_cd=='O'){
        		var paramStr = "./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
				parent.mkNewFrame('MAWB Entry', paramStr);
            }else{
            	var paramStr = "./AII_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
				parent.mkNewFrame('MAWB Entry', paramStr);
            }
        }
    }
}

/* #27436, LHK, 20140331 Code 정리 */
function depositProc(){
	
	var formObj  = document.frm1;
	var depositFlag = false;	// false 비활성화, true 활성
	
	if (formObj.f_chk_no.value.length > 0) {
		// 정원영 수정 #25248
		if (formObj.deposit_chk.checked == false) {
			depositFlag = true;
		}else {
			depositFlag = false;
		}
	}
	
	if(formObj.void_chk.checked){
		formObj.deposit_chk.checked = false;
		formObj.f_deposit_dt_cal.value  = "";
		
		depositFlag = false;
	}
	
	if(depositFlag){
		formObj.deposit_chk.disabled = false;
		formObj.f_deposit_dt.disabled = false;
		formObj.f_deposit_dt.className = "search_form";
		formObj.f_deposit_dt_cal.style.display = "inline";
	}else{
		formObj.deposit_chk.checked = false;
		formObj.f_deposit_dt.value  = "";
		formObj.deposit_chk.disabled = true;
		formObj.f_deposit_dt.disabled = true;
		formObj.f_deposit_dt.className = "search_form-disable";
		formObj.f_deposit_dt_cal.style.display = "none";
	}
	
}


/* #27436, LHK, 20140331,  Acct Operation Bug 사전 예방, Void Flow 추가 
* Payment/Deposit 처리 시 Void 된 자료는 다시 Void 를 풀지 못하고 Block 되도록 로직 수정
* Deposit/Payment 자료를 생성하시는 경우에는 Void 항목을 아예 check 할 수 없도록 수정
*/
function voidProc(){
	
	var formObj  = document.frm1;
	var voidFlag = false;	// false 비활성화, true 활성
	
	/** LHK, 20140116, #25248 Customer Payment/Payment Entry 화면 수정사항-1 4.Void 권한 제어 **/
	if (formObj.vc_flg.value == "Y") {
		
		voidFlag	= true;
		
		if(formObj.deposit_chk.checked){
			
			formObj.void_chk.checked = false;
			formObj.f_void_dt.value  = "";
			
			//void를 비활성화 한다.
			voidFlag	= false;
			
		}
		
		if(formObj.f_jnr_no.value == ""){
			//void를 비활성화 한다.
			voidFlag	= false;
		}
		
		if(voidFlag){
			formObj.void_chk.disabled = false;
			formObj.f_void_dt.disabled = false;
			formObj.f_void_dt.className = "search_form";
			formObj.f_void_dt_cal.style.display = "inline";
		}else{
			formObj.void_chk.checked = false;
			formObj.f_void_dt.value  = "";
			formObj.void_chk.disabled = true;
			formObj.f_void_dt.disabled = true;
			formObj.f_void_dt.className = "search_form-disable";
			formObj.f_void_dt_cal.style.display = "none";
		}
	}
}

/**
 * #27585 [BINEX]Check/Deposit 수정 사항
 * Journal 상태를 확인 한다. Journal 상태에 따른 form, sheet 제어를 한다. 
 * "" : N/A, S:Save, C:Clear, V:Void, 
 * B:Block(Block 인 경우, sheet 만 제어하며, 위 상태에 따라 처리된다.)
 * @return
 */
function jnrStatusControl(){
	
	var sts_cd = getJnrStsCd();

	chkNoEditable(sts_cd);
	changeEditable(sts_cd);	// #25248 : jnr_no 가 있는경우 non-editable
	authControl();		/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
}
 
function getJnrStsCd(){
	
	var formObj  = document.frm1;
	var sheetObj = docObjects[0];
	
	var sts_cd = "";
	
	if(formObj.f_jnr_no.value != ""){
		
		sts_cd	= 'S';

		if(sheetObj.CellValue(1, "r_clr_yn") == "Y"){
			sts_cd	= 'C';
		}
		
		if(JNR_TYPE == "P"){	// Payment 인 경우만 해당됨. 
			if(sheetObj.CellValue(i,"chk_pnt_yn") == "Y" || isPrinted){
				if(formObj.prn_flg.value){
					sts_cd	= 'S';
				}else{
					sts_cd	= 'C';
				}
			}
		}
		
		if(sheetObj.CellValue(1, "r_void_yn") == "Y"){
			sts_cd	= 'V';
		}
	}
	
	return sts_cd;
}
 

function chkNoEditable(sts_cd){	
 	var formObj  = document.frm1;
 	
 	if(sts_cd == "C" || sts_cd == "V"){
 		formObj.f_chk_no.disabled = true;
 		formObj.f_chk_no.className = "search_form-disable";
 	}else{
 		formObj.f_chk_no.disabled = false;
 		formObj.f_chk_no.className = "search_form";
 	}
}

/*			
LHK, 20131218 QnA #22627 [BINEX]Deposit/Payment 시 이종 Currency 처리 문제
2) 인보이스 조회 시 인보이스의 Currency 가 Bank 의 Currency 와 다른 경우 Deposit/Payment 처리 안되도록 block 한다.
(Received, Payment 컬럼 disable, check box disable)
*/
function changeEditable(sts_cd){
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	
	for(var i=1;i<=sheetObj.LastRow;i++){
		// #25248 : jnr_no 가 있는경우 non-editable
		// #25620 LHK 20140123
		// LHK, 20140307, #26818 [BINEX]Check Print 이후 Payment 자료 수정이 되고 있음 
		if(sheetObj.CellValue(i,"jnr_no") != ""){
			
			//#25620, LHK 20140123, 한번 저장 후에는 POST DATE 변경 불가
			formObj.f_post_dt.disabled = true;
			formObj.f_post_dt.className = "search_form-disable";
			formObj.f_post_dt_cal.style.display = "none";
			
			if(sts_cd == "S"){

			}
			
			if(sts_cd == "C"){		
				sheetObj.CellEditable(i, "pay_amt") 		= false;
				sheetObj.CellBackColor(i, "pay_amt")		= sheetObj.RgbColor(239,235,239);
			}
			
			if(sts_cd == "V"){				
				if (formObj.vc_flg.value != "Y") {					
					formObj.void_chk.disabled = true;
					formObj.f_void_dt.disabled = true;
					formObj.f_void_dt.className = "search_form-disable";
					formObj.f_void_dt_cal.style.display = "none";
				}
			}	
			
			if (sheetObj.CellValue(i,"inp_type") == "M" && (sts_cd == "S" || sts_cd == "C")) {
				sheetObj.CellEditable(i, "gl_no") = true;
				sheetObj.CellBackColor(i, "gl_no")	= sheetObj.RgbColor(255,255,255);
				sheetObj.CellEditable(i, "ofc_cd") = true;
				sheetObj.CellBackColor(i, "ofc_cd")	= sheetObj.RgbColor(255,255,255);
			}
			
			if (sts_cd == "C" || sts_cd == "V") {
				formObj.deposit_chk.disabled = true;
				formObj.f_deposit_dt.disabled = true;
				formObj.f_deposit_dt.className = "search_form-disable";
				formObj.f_deposit_dt_cal.style.display = "none";

				addBtn01.style.display = "none";
				addBtn02.style.display = "none";
				invBtn01.style.display = "none";
				invBtn02.style.display = "none";

			}
			
		}else{
			//void를 비활성화 한다.
			formObj.void_chk.disabled = true;
			formObj.f_void_dt.disabled = true;
			formObj.f_void_dt.className = "search_form-disable";
			formObj.f_void_dt_cal.style.display = "none";
		}
		
		// #25248 : inp_type 가 있는 M인 경우 만  editable
		if (sheetObj.CellValue(i,"inp_type") == "M" ) {
			sheetObj.CellEditable(i, "bl_no") = true;
			sheetObj.CellBackColor(i, "bl_no")	= sheetObj.RgbColor(255,255,255);
			sheetObj.CellEditable(i, "ref_no") = true;
			sheetObj.CellBackColor(i, "ref_no")	= sheetObj.RgbColor(255,255,255);
		}

		if(formObj.f_curr_cd.value != sheetObj.CellValue(i, "inv_aply_curr_cd")){
			
			sheetObj.CellEditable(i, "pay_amt") = false;
			sheetObj.CellEditable(i, "chk_flag") = false;
			
			sheetObj.CellBackColor(i, "pay_amt")	= sheetObj.RgbColor(239,235,239);
			sheetObj.CellBackColor(i, "chk_flag")	= sheetObj.RgbColor(239,235,239);
			
			sheetObj.CellValue(i, "chk_flag") 		= "0";
			
		}
	}
	
}
	
/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.12 */
function authControl(){

 	var formObj = document.frm1;
 	var sheetObj  = docObjects[0];
 	
 	// 1.Paid Amount 값이 >0 인지 체크
 	var fileBolckYn = sheetObj.CellValue(1, "clt_cmpl_flg") == "Y"?true:false;
 	var jrnYn = sheetObj.CellValue(1, "jnr_yn");
 	var clsYn = sheetObj.CellValue(1, "cls_yn");
 	
 	//false 이면 Block 된 경우
 	var blockYn = true;
 	
 	if (fileBolckYn) {
 		blockYn = false;	
 	}
 	
 	/* #21735, [COMMON]Invoice Edit 권한 jsjang 2013.11.13 */
 	if (jrnYn == "Y" || clsYn =="Y") {
 		blockYn = false;

 	} 
 	editInputForm(blockYn);
 	editSheet(blockYn);
} 
	 
/**
* Input Form 의 수정을 가능/불가 하게 한다
*/
function editInputForm(flg){

	// form 의 read Only 값을 false로 변경
	var sheetObj = docObjects[0];
	var collTxt = document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
			if(collTxt[i].name == "s_cust_cd" || collTxt[i].name == "s_paid_cd" || collTxt[i].name == "s_paid_nm" ||
					collTxt[i].name == "s_cust_nm" || collTxt[i].name == "f_chk_no" ||
					collTxt[i].name == "s_inv_no" ||collTxt[i].name == "f_post_dt"  ||
					collTxt[i].name == "f_remark"){
				if(!flg){
					collTxt[i].className = "search_form-disable";
				}else{
 					collTxt[i].readOnly  = !flg;
 				}
 			}	
		
			// Level 1 이 아닌 경우 Block Check 도 제어
			if(JNR_LEVEL != "1"){
				if(collTxt[i].name == "block_chk"){
					if(!flg){
						collTxt[i].className = "search_form-disable";
					}else{
						collTxt[i].readOnly  = !flg;
					}
				}
			}
		}	
 	}
 	
 	frm1.dept_chk1.disabled    = !flg;
 	frm1.dept_chk2.disabled  = !flg;
 	frm1.dept_chk3.disabled   = !flg;
 	frm1.his_chk[0].disabled  = !flg;
 	frm1.his_chk[1].disabled  = !flg;
 	frm1.f_bank_cd.disabled = !flg;
 	
 	
 	if (flg) {
 		frm1.s_cust_cd.onclick 	   	= function(){doWork("CUSTOMER_POPLIST");};
 		frm1.s_cust_cd.style.cursor 	= "hand";
 		
 		frm1.f_post_dt_cal.onclick	 = function(){doDisplay('DATE3', frm1);};
 		frm1.f_deposit_dt_cal.onclick	 = function(){doDisplay('DATE1', frm1);};
 	} else {
 		frm1.s_cust_cd.onclick 	   	= "";
 		frm1.s_cust_cd.style.cursor 	= "";

 		frm1.f_post_dt_cal.onclick	 = "";
 		frm1.f_deposit_dt_cal.onclick	 = "";
 	}
}

/**
* Sheet 의 수정을 가능/불가 하게 한다
*/
function editSheet(flg){
	var sheetObj  = docObjects[0];
	
	// Row Add 버튼 보이기/숨기기
	if (!flg) {	//Block 인 경우 invoice ADD, Add 버튼 없앰.
		addBtn01.style.display = "none";
		addBtn02.style.display = "none";
		invBtn01.style.display = "none";
		invBtn02.style.display = "none";	
	}
	
 	// sheet edit 가능/불가
 	sheetObj.Editable = flg;	 

} 
	
function setTotalAmount(){
	
 	var formObj = document.frm1;
 	var sheetObj  = docObjects[0];
 	
	//TOTAL 값을 계산한다.
	var inv_amt = 0;
	var bal_amt = 0;
	var pay_amt = 0;
	
	for(var i=1;i<=sheetObj.LastRow;i++){
		
		inv_amt += Number(sheetObj.CellValue(i, "inv_sum_amt"));
		bal_amt += Number(sheetObj.CellValue(i, "bal_sum_amt_1"));
		pay_amt += Number(sheetObj.CellValue(i, "pay_amt"));
		
		/* #21662 : [BINEX]Deposit, Payment 화면에서 Invoice Link jsjang 2013.10.31 : invoice link 걸기 */
		if(sheetObj.CellValue(i,"inp_type") == "S"){
			sheetObj.CellFont("FontUnderline", i,"buy_inv_no") = true;
			sheetObj.CellFontColor(i, "buy_inv_no") = sheetObj.RgbColor(0,0,255);
		}		
	}
	
	formObj.f_inv_amt.value = doMoneyFmt(parseFloat(roundXL(inv_amt,2)).toFixed(2));
	formObj.f_bal_amt.value = doMoneyFmt(parseFloat(roundXL(bal_amt,2)).toFixed(2));
	formObj.f_pay_amt.value = doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
		
	formObj.f_rcv_amt.value = doMoneyFmt(parseFloat(roundXL(pay_amt,2)).toFixed(2));
}


/** LHK, 20131025 #21734  [BINEX]Post Date Check 로직 적용
*  File Block_dt 와 Post Date 체크, Post Date Set, BL 생성시 post date 에는 MAX(JNR_DT) +1, MAX(BLOCK_DT) +1, MAX(POST_DT) 중 가장 최근 Date을 Set
**/
function setBlock_dt(){
	
	var formObj  = document.frm1;
	
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt', './GateServlet.gsl');
	
	if(NEXT_BLOCK_DT != "") {
		var nextBlockDtYMD  =   NEXT_BLOCK_DT.replaceAll("-", "");															//NEXT_BLOCK_DT  12-01-2013
			nextBlockDtYMD  =   nextBlockDtYMD.substring(4,8)+nextBlockDtYMD.substring(0,2)+nextBlockDtYMD.substring(2,4);	//nextBlockDtYMD 20131201
	
		var orgBlockDt   	= 	addDate('d', -1, nextBlockDtYMD, "");			
			ORG_BLOCK_DT	=   orgBlockDt.substring(4,6) + "-" + orgBlockDt.substring(6,8) + "-" + orgBlockDt.substring(0,4);
			
		//post_dt 와 block_dt 비교
		//fromDate > toDate true
		if(formObj.s_jnr_no.value == ""){
			if(compareTwoDate(NEXT_BLOCK_DT, formObj.f_post_dt.value)){
	 			formObj.f_post_dt.value	= NEXT_BLOCK_DT;
	 		}
			formObj.old_post_dt.value = formObj.f_post_dt.value;
		}	
	}
}

function getMaxBlockOrJnrNextDt(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			NEXT_BLOCK_DT	=   doc[1].substring(4,6) + "-" + doc[1].substring(6,8) + "-" + doc[1].substring(0,4);
		}else{
			NEXT_BLOCK_DT =  "";
		}
	}
}