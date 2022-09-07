function doFrtWork(srcName){  
    var formObj  = document.frm1;
    if(srcName=="COMMAND04"||srcName=='COMMAND04_M'){
		//Selling/Auto Tariff 시
		frm1.intg_bl_seq.value = trim(frm1.intg_bl_seq.value);
		if(frm1.intg_bl_seq.value==''){
			//Please enter a [HBL]!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: FRT_CMM_UTIL.7");
			
			return;
		}
		else{
			//Do you want to auto-generate the [Freight] information?\r\n\r\nIf so, the former auto-generated one will be deleted.
			if(confirm(getLabel('COM_FRT_CFM002'))){
				formObj.f_cmd.value = COMMAND04;
				
				if(srcName=='COMMAND04'){
					getSdSheet().DoSearch4Post(getSdUrl(), FormQueryString(formObj)+'&f_house_bl_no='+frm1.house_bl_no.value, false);	
				}else{
					getSdSheet().DoSearch4Post(getSdUrl(), FormQueryString(formObj), false);
				}
			}
		}
		
    }else if(srcName=="COMMAND05"){	//Buying/Auto Tariff 시
		frm1.intg_bl_seq.value = trim(frm1.intg_bl_seq.value);
		if(frm1.intg_bl_seq.value==''){
			//Please enter a [HBL]!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: FRT_CMM_UTIL.26");
			
			return;
		}else{
			//Do you want to auto-generate the [Freight] information?\r\n\r\nIf so, the former auto-generated one will be deleted.
			if(confirm(getLabel('COM_FRT_CFM002'))){
				formObj.f_cmd.value = COMMAND05;
				getBcSheet().DoSearch4Post(getSdUrl(), FormQueryString(formObj)+'&f_house_bl_no='+frm1.house_bl_no.value, false);
			}
		}
    
	}else if(srcName=="COMMAND06_S"||srcName=="COMMAND06_M"){	//Selling/Debit Confirm시
		var doCnf = true;
		if(!allSaveCheck(getSdSheet(), '')){
			//You did not save some items! Confirm after saving the data.
			alert(getLabel('FMS_COM_ALT015') + "\n\n: FRT_CMM_UTIL.37");
			
		    doCnf = false;	
		}
		
		var sdSheet = getSdSheet();
		var fcData = checkCellSts('', sdSheet, 'FI');
		
		if(fcData>0){
			//'Do you want to \"Confirm\"?\n\nOnce you \"Confirm\", you cannot modify the \"Selling/Debit\" data!';
			if(doCnf && confirm(getLabel('COM_FRT_CFM001'))){
				formObj.f_cmd.value = COMMAND06;
				
				if(srcName=="COMMAND06_S"){
					sdSheet.DoAllSave(getSdUrl(), FormQueryString(formObj)+'&f_sell_tp=S');	
				}else{
					sdSheet.DoAllSave(getSdUrl(), FormQueryString(formObj));
				}
			}
		}else{
			//Confirm할 데이터를 선택하여 주십시오!
			alert(getLabel('FMS_COM_ALT004') + "\n\n: FRT_CMM_UTIL.61");
		}
	}
	else if(srcName=="COMMAND06_B"){	//Buying/Credit Confirm시
		var doCnf = true;
		if(!allSaveCheck(getBcSheet(), 'b_')){
			//You did not save some items! Confirm after saving the data.
			alert(getLabel('FMS_COM_ALT015') + "\n\n: FRT_CMM_UTIL.64");
			
		    doCnf = false;	
		}

		var bcSheet = getBcSheet(); 
		var fcData = checkCellSts('b_', bcSheet, 'FI');
		
		for(var i = 2; i < bcSheet.rows; i++){
			if(bcSheet.CellValue(i, 'b_frt_check')==1){
				if(bcSheet.CellValue(i, 'b_inv_sts_cd')=='FI'){
					fcData++;	
				}else{
					bcSheet.SetCellValue(i, 'b_frt_check', 0, 0);	
				}
			}
		}
		if(fcData>0){
			//상단 버튼 처리 flag
			//'Do you want to \"Confirm\"?\n\nOnce you \"Confirm\", you cannot modify the \"Buying/Credit\" data!';
			if(doCnf&&confirm(getLabel('COM_FRT_CFM001'))){
				formObj.f_cmd.value = COMMAND06;
				bcSheet.DoAllSave(getSdUrl(), FormQueryString(formObj));
			}
		}else{
			//Confirm할 데이터를 선택하여 주십시오!
			alert(getLabel('FMS_COM_ALT004') + "\n\n: FRT_CMM_UTIL.94");
		}
			
	}else if(srcName=="COMMAND07_S"||srcName=="COMMAND07_M"){	//Selling/Debit Confirm 취소 시
		var doCnf = true;
		if(!allSaveCheck(getSdSheet(), '')){
			//You did not save some items! Confirm after saving the data.
			alert(getLabel('FMS_COM_ALT015') + "\n\n: FRT_CMM_UTIL.97");
			
		    doCnf = false;	
		}

		var sdSheet = getSdSheet(); 
		var fcData = checkCellSts('', sdSheet, 'FC');
		
		if(fcData>0){
			//'Do you want to cancel \"Confirm\" the confirmed \"Selling/Debit\" data?';
			if(doCnf&&confirm(getLabel('FMS_COM_CFMCAN'))){
				formObj.f_cmd.value = COMMAND07;
			
				if(srcName=="COMMAND07_S"){
					sdSheet.DoAllSave(getSdUrl(), FormQueryString(formObj)+'&f_sell_tp=S');	
				}else{
					sdSheet.DoAllSave(getSdUrl(), FormQueryString(formObj));
				}
			}
		}else{
			//Confirm Cancel할 데이터를 선택하여 주십시오!
			alert(getLabel('FMS_COM_ALT004') + "\n\n: FRT_CMM_UTIL.122");
		}
			
	}else if(srcName=="COMMAND07_B"){	//Buying/Credit Confirm 취소 시
		var doCnf = true;
		
		if(!allSaveCheck(getBcSheet(), 'b_')){
			//You did not save some items! Confirm after saving the data.
			alert(getLabel('FMS_COM_ALT015') + "\n\n: FRT_CMM_UTIL.126");
			
		    doCnf = false;	
		}

		var fcData = 0;
		var bcSheet = getBcSheet(); 
		var fcData = checkCellSts('b_', bcSheet, 'FC');
		
		if(fcData>0){
			//상단 버튼 처리 flag
			//'Do you want to cancel \"Confirm\" the confirmed \"Buying/Credit\" data?';
			if(doCnf&&confirm(getLabel('FMS_COM_CFMCAN'))){
				formObj.f_cmd.value = COMMAND07;
				bcSheet.DoAllSave(getSdUrl(), FormQueryString(formObj));
			}
		}
		else{
			//Confirm Cancel할 데이터를 선택하여 주십시오!
			alert(getLabel('FMS_COM_ALT004') + "\n\n: FRT_CMM_UTIL.151");
		}
			
	}else if(srcName=="COMMAND08"||srcName=="COMMAND08_M"){	//Selling/Debit Invoice 직접생성
		frm1.intg_bl_seq.value = trim(frm1.intg_bl_seq.value);
		if(frm1.intg_bl_seq.value==''){
			//Please enter a [HBL]!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: FRT_CMM_UTIL.154");
			
			return;
		}else{
			frm1.inv_dt.value     = '';	//발행일
			frm1.tax_bil_flg.value= '';	//세금계산서 발행여부
			frm1.inv_due_dt.value = '';
			frm1.inv_rmk.value    = '';
			frm1.buy_inv_no.value = '';
			
			var selTp = '';
			var trdpCd= '';
			var sdSheet = getSdSheet(); 
			
			var trfCur  = '';
			var trfCurSe='';
			var invCur  = '';
			var isCheckOk = true;
			
			for(var i = 2; i < sdSheet.rows; i++){
				if(sdSheet.CellValue(i, 'frt_check')==1&&sdSheet.CellValue(i, 'inv_sts_cd')=='FC'){
					if(invCur==''){
						trfCur = sdSheet.CellValue(i, 'rat_curr_cd')
						invCur = sdSheet.CellValue(i, 'inv_curr_cd');

						selTp = sdSheet.CellValue(i, 'sell_buy_tp_cd');
						trdpCd= sdSheet.CellValue(i, 'trdp_cd');
						
					}else{
						//Invoice Currency는 동일해야 한다.
						if(invCur==sdSheet.CellValue(i, 'inv_curr_cd')){
						
							//Tariff Currency가 동인한 경우
							if(trfCur!=sdSheet.CellValue(i, 'rat_curr_cd')){
							
								if(trfCurSe==''){
									trfCurSe = sdSheet.CellValue(i, 'rat_curr_cd');
								}else if(trfCurSe!=sdSheet.CellValue(i, 'rat_curr_cd')){
									//Only two currency type allowed!\n\nPlease check the Tariff Currency
									alert(getLabel('COM_FRT_ALT006') + "\n\n: FRT_CMM_UTIL.187");
									
									sdSheet.SetCellValue(i, 'frt_check', 0, 0);
									isCheckOk = false;
								}
							}
							
						//동일하지 않은경우 선택취소
						}else{
							//Unable to make invoice!\n\nPlease check the Invoice Currency!
							alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_CURR') + "\n\n: FRT_CMM_UTIL.197");
							
							sdSheet.SetCellValue(i, 'frt_check', 0, 0);	
							isCheckOk = false;
						}
					}
				}else{
					sdSheet.SetCellValue(i, 'frt_check', 0, 0);	
				}
			}
		
			//검증완료시
			if(isCheckOk){
				if(selTp!=''){
			   		var rtnary = new Array(1);
			   		rtnary[0] = selTp;
			   		rtnary[1] = trdpCd;
			   		
					var rtnVal = window.showModalDialog('./SEE_FRT_0011.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:740px;dialogHeight:240px");
				    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					 	return;
					}else{
						//'[Selling/Debit Invoice]를 생성하시겠습니까?')){
						if(confirm(getLabel('FMS_COM_CFMCRE'))){
							
							var rtnRows = rtnVal.split("|");
							frm1.inv_dt.value     = rtnRows[0];	//발행일
							frm1.tax_bil_flg.value= rtnRows[1];	//세금계산서 발행여부
							
							frm1.inv_due_dt.value = rtnRows[2];
							frm1.inv_rmk.value    = rtnRows[3];
							frm1.buy_inv_no.value = rtnRows[4];
					
							formObj.f_cmd.value = COMMAND08;
							getSdSheet().DoAllSave(getSdUrl(), FormQueryString(formObj));
						}
					}
				}else{
					//Invoice를 만들 데이터를 선택하여 주십시오!
					alert(getLabel('FMS_COM_ALT004') + "\n\n: FRT_CMM_UTIL.236");
				}
			}
		}
	
	}else if(srcName=="COMMAND09"){	//Buying/Credit Invoice 직접생성
		frm1.intg_bl_seq.value = trim(frm1.intg_bl_seq.value);
		if(frm1.intg_bl_seq.value==''){
			//Please enter a [HBL]!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: FRT_CMM_UTIL.250");
			
			return;
		}else{
			frm1.inv_dt.value     = '';	//발행일
			frm1.tax_bil_flg.value= '';	//세금계산서 발행여부
			frm1.inv_due_dt.value = '';
			frm1.inv_rmk.value    = '';
			frm1.buy_inv_no.value = '';
			
			var selTp = '';
			var trdpCd= '';
			var bcSheet = getBcSheet(); 
			
			
			var trfCur  = '';
			var trfCurSe='';
			var invCur  = '';
			var isCheckOk = true;
			
			for(var i = 2; i < bcSheet.rows; i++){
				if(bcSheet.CellValue(i, 'b_frt_check')==1&&bcSheet.CellValue(i, 'b_inv_sts_cd')=='FC'){
					if(invCur==''){
						trfCur = bcSheet.CellValue(i, 'b_rat_curr_cd')
						invCur = bcSheet.CellValue(i, 'b_inv_curr_cd');

						selTp = bcSheet.CellValue(i, 'b_sell_buy_tp_cd');
						trdpCd= bcSheet.CellValue(i, 'b_trdp_cd');
						
					}else{
						//Invoice Currency는 동일해야 한다.
						if(invCur==bcSheet.CellValue(i, 'b_inv_curr_cd')){
						
							//Tariff Currency가 동인한 경우
							if(trfCur!=bcSheet.CellValue(i, 'b_rat_curr_cd')){
							
								if(trfCurSe==''){
									trfCurSe = bcSheet.CellValue(i, 'b_rat_curr_cd');
								}else if(trfCurSe!=bcSheet.CellValue(i, 'b_rat_curr_cd')){
									//Only two currency type allowed!\n\nPlease check the Tariff Currency
									alert(getLabel('COM_FRT_ALT006') + "\n\n: FRT_CMM_UTIL.282");
									
									bcSheet.SetCellValue(i, 'b_frt_check', 0, 0);
									isCheckOk = false;
								}
							}
							
						//동일하지 않은경우 선택취소
						}else{
							//Unable to make invoice!\n\nPlease check the Invoice Currency!
							alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_CURR') + "\n\n: FRT_CMM_UTIL.292");
							
							bcSheet.SetCellValue(i, 'b_frt_check', 0, 0);	
							isCheckOk = false;
						}
					}
				}else{
					bcSheet.SetCellValue(i, 'b_frt_check', 0, 0);	
				}
			}
			
			//검증완료시
			if(isCheckOk){
				if(selTp!=''){
					var rtnary = new Array(1);
			   		rtnary[0] = selTp;
			   		rtnary[1] = trdpCd;
			   		
					var rtnVal = window.showModalDialog('./SEE_FRT_0011.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:740px;dialogHeight:240px");
				    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
					 	return;
					}else{
						//'[Buying/Credit Invoice]를 생성하시겠습니까?')){
						if(confirm(getLabel('FMS_COM_CFMCRE'))){
							var rtnRows = rtnVal.split("|");
							frm1.inv_dt.value     = rtnRows[0];	//발행일
							frm1.tax_bil_flg.value= rtnRows[1];	//세금계산서 발행여부
							
							frm1.inv_due_dt.value = rtnRows[2];
							frm1.inv_rmk.value    = rtnRows[3];
							frm1.buy_inv_no.value = rtnRows[4];
	
							formObj.f_cmd.value = COMMAND09;
							getBcSheet().DoAllSave(getSdUrl(), FormQueryString(formObj));
						}
					}
				}else{
					//Invoice를 만들 데이터를 선택하여 주십시오!
					alert(getLabel('FMS_COM_ALT004') + "\n\n: FRT_CMM_UTIL.330");
				}
			}
		}
	}
}

/**
 * 상태를 확인하기 위한 메소드임
 */
function checkCellSts(objPrefix, sheetObj, checkStsCd){
	var fcData = 0;
	for(var i = 2; i < sheetObj.rows; i++){
		if(sheetObj.CellValue(i, objPrefix+'frt_check')==1){
			if(sheetObj.CellValue(i, objPrefix+'inv_sts_cd')==checkStsCd){
				fcData++;	
			}else{
				sheetObj.SetCellValue(i, objPrefix+'frt_check', 0, 0);	
			}
		}
	}
	return fcData;
}

//############################################################
//#  자동 완성기능
//############################################################
/**
 * 저장되지 않은 Row의 데이터가 있는지 확인함
 */
function allSaveCheck(sheetObj, objPfx){
	var isAllSaved = true;
	var frtRow = sheetObj.Rows;
	
	for(var i = 2; i < frtRow; i++){
		if(sheetObj.CellValue(i, objPfx+"frt_seq")==''){
			isAllSaved = false;	
		}
	}
	return isAllSaved;
}


/**
 * 자동완성 기능 처리하는 Function임
 */
function doAutoComplete(objPrefix, sheetObj, row, col){
	var colStr = sheetObj.ColSaveName(col);

	//Freight 코드 Name조회
	if(colStr==objPrefix+'frt_cd'||colStr==objPrefix+'frt_cd_nm'){
		var codeStr = sheetObj.CellValue(row, objPrefix+'frt_cd'); 	
		if(codeStr.length>2){
			
			//결과를 표시할 Col을 초기화함
			sheetObj.CellValue(row, objPrefix+'frt_cd_nm') = '';	
			doAutoSearch(sheetObj, row, objPrefix+'frt_cd', 'freight', codeStr, objPrefix+'frt_cd', objPrefix+'frt_cd_nm');	
			
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: FRT_CMM_UTIL.382");
			sheetObj.SelectCell(row, colStr);
		}
		
	//Trade Partner Code
	}else if(colStr==objPrefix+'trdp_cd'){
		var codeStr = sheetObj.CellValue(row, objPrefix+'trdp_cd'); 	
		if(codeStr.length>2){
			
			//결과를 표시할 Col을 초기화함
			sheetObj.CellValue(row, objPrefix+'trdp_nm') = '';	
			doAutoSearch(sheetObj, row, col, 'trdpcode', codeStr, objPrefix+'trdp_cd', objPrefix+'trdp_nm');	
			
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: FRT_CMM_UTIL.397");
			sheetObj.SelectCell(row, colStr);
		}
			
	//Tariff Currency 조회
	}else if(colStr==objPrefix+'rat_curr_cd'){
		var codeStr = sheetObj.CellValue(row, objPrefix+'rat_curr_cd'); 	
		if(codeStr.length>2){
			//결과를 표시할 Col을 초기화함
			doAutoSearch(sheetObj, row, col, 'currency', codeStr, objPrefix+'rat_curr_cd', objPrefix+'rat_curr_cd');	

		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: FRT_CMM_UTIL.410");
			sheetObj.SelectCell(row, colStr);
		}
		
	//Buying/Credit Invoice Currency
	}else if(colStr==objPrefix+'inv_curr_cd'){
		var codeStr = sheetObj.CellValue(row, objPrefix+'inv_curr_cd'); 	
		if(codeStr.length>2){
			
			var tmpCurr = codeStr.toUpperCase();
			if(tmpCurr==sheetObj.CellValue(row, objPrefix+'rat_curr_cd')){
				sheetObj.CellValue(row, objPrefix+'inv_xcrt') = 1;
			}
			
			//결과를 표시할 Col을 초기화함
			doAutoSearch(sheetObj, row, col, 'currency', codeStr, objPrefix+'inv_curr_cd', objPrefix+'inv_curr_cd');	

		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: FRT_CMM_UTIL.429");
			sheetObj.SelectCell(row, colStr);
		}
	}
}

//############################################################
//#  Event 처리
//############################################################
var sdCheckTrdp = '';
var sdCheckCnt  = 0;

var bcCheckTrdp = '';
var bcCheckCnt  = 0;
/**
 * Type/Size에 따른 Volume(수량) 체크
 */

//#2348 [IMPEX] Pop up error message not closing after click OK
var cntrTpSzFlag = true;

function mutiSheetOnChange(sheetObj, row, col, objPfx) {
	
	var colStr = sheetObj.ColSaveName(col);
	if(colStr==objPfx+'sell_buy_tp_cd'){
		var tpCd  = sheetObj.CellValue(row, objPfx+'sell_buy_tp_cd');
		var trfCur= sheetObj.CellValue(row, objPfx+'rat_curr_cd');
		
		var invCur= 'KRW';
		if(tpCd=='D'||tpCd=='C'){
			invCur= 'USD';
		}
		sheetObj. = 0(row, objPfx+'inv_curr_cd', invCur, 0);
		if(trfCur=='USD'&&invCur=='KRW'){
			sheetObj.CellValue(row, objPfx+'inv_xcrt') = frm1.dispCur.value;
			
		}else if(trfCur==invCur){
			sheetObj.CellValue(row, objPfx+'inv_xcrt') = 1;
			
		}else{
			sheetObj.CellValue(row, objPfx+'inv_xcrt') = 0;
		}
		
	}else if(colStr==objPfx+'frt_cd'){
		var codeStr = sheetObj.CellValue(row, objPfx+'frt_cd'); 	
		if(codeStr.length>2){
			sheetObj.SetCellValue(row, objPfx+"qty", '', 0);
			sheetObj.SetCellValue(row, objPfx+"trf_cur_sum_amt", '', 0);
		    sheetObj.SetCellValue(row, objPfx+"cntr_tpsz_cd", '', 0);
			
			//결과를 표시할 Col을 초기화함
			sheetObj.CellValue(row, objPfx+'frt_cd_nm') = '';	
			doAutoSearch(sheetObj, row, objPfx+'frt_cd', 'freight', codeStr, objPfx+'frt_cd', objPfx+'frt_cd_nm');	
			
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: FRT_CMM_UTIL.481");
			sheetObj.SelectCell(row, objPfx+'frt_cd');
		}
		
	//Trade Partner Code
	}else if(colStr==objPfx+'trdp_cd'){
		var codeStr = sheetObj.CellValue(row, objPfx+'trdp_cd'); 	
		if(codeStr.length>2){
			
			//결과를 표시할 Col을 초기화함
			sheetObj.CellValue(row, objPfx+'trdp_nm') = '';	
			doAutoSearch(sheetObj, row, col, 'trdpcode', codeStr, objPfx+'trdp_cd', objPfx+'trdp_nm');	
			
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: FRT_CMM_UTIL.496");
			sheetObj.SelectCell(row, colStr);
		}
			
	//Tariff Currency 조회
	}else if(colStr==objPfx+'rat_curr_cd'){
		var codeStr = sheetObj.CellValue(row, objPfx+'rat_curr_cd'); 	
		if(codeStr.length>2){
			
			var tmpCurr = codeStr.toUpperCase();
			if(tmpCurr==sheetObj.CellValue(row, objPfx+'inv_curr_cd')){
				sheetObj.CellValue(row, objPfx+'inv_xcrt') = 1;
			}else{
				sheetObj.CellValue(row, objPfx+'inv_xcrt') = 0;	
			}
			
			//결과를 표시할 Col을 초기화함
			doAutoSearch(sheetObj, row, col, 'currency', codeStr, objPfx+'rat_curr_cd', objPfx+'rat_curr_cd');	

		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: FRT_CMM_UTIL.517");
			sheetObj.SelectCell(row, colStr);
		}
		
	//Buying/Credit Invoice Currency
	}else if(colStr==objPfx+'inv_curr_cd'){
		var codeStr = sheetObj.CellValue(row, objPfx+'inv_curr_cd'); 	
		
		if(codeStr.length>2){
			var tmpCurr = codeStr.toUpperCase();

			if(tmpCurr==sheetObj.CellValue(row, objPfx+'rat_curr_cd')){
				sheetObj.CellValue(row, objPfx+'inv_xcrt') = 1;
			}
			else{
				sheetObj.CellValue(row, objPfx+'inv_xcrt') = 0;	
			}
			
			//결과를 표시할 Col을 초기화함
			doAutoSearch(sheetObj, row, col, 'currency', codeStr, objPfx+'inv_curr_cd', objPfx+'inv_curr_cd');	

		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT014') + "\n\n: FRT_CMM_UTIL.539");
			sheetObj.SelectCell(row, colStr);
		}
		
	//Unit 선택시
	}else if(colStr==objPfx+"frt_check"){
		if(sheetObj.CellValue(row, objPfx+"frt_check")==1){
			if(objPfx==''){
				if(sdCheckTrdp==''){
					sdCheckTrdp = row;
					
				}
				if(sheetObj.CellValue(sdCheckTrdp, objPfx+"sell_buy_tp_cd")!=sheetObj.CellValue(row, objPfx+"sell_buy_tp_cd")){
					sheetObj.SetCellValue(row, objPfx+"frt_check", 0, 0);
					//동일한 [Selling], [Buying] 경우에만 선택하수 있습니다!
					alert(getLabel('COM_FRT_ALT007') + "\n\n: FRT_CMM_UTIL.571");
					
				}else if(sheetObj.CellValue(sdCheckTrdp, objPfx+"trdp_cd")!=sheetObj.CellValue(row, objPfx+"trdp_cd")){
					sheetObj.SetCellValue(row, objPfx+"frt_check", 0, 0);
					//동일한 거래처인 경우에만 선택하수 있습니다!
					alert(getLabel('COM_FRT_ALT008') + "\n\n: FRT_CMM_UTIL.576");
				}
				else{
					sdCheckCnt++;					
				}
				
			}else{
				if(bcCheckTrdp==''){
					bcCheckTrdp = row;
				}
				if(sheetObj.CellValue(bcCheckTrdp, objPfx+"sell_buy_tp_cd")!=sheetObj.CellValue(row, objPfx+"sell_buy_tp_cd")){
					sheetObj.SetCellValue(row, objPfx+"frt_check", 0, 0);
					//동일한 [Selling], [Buying] 경우에만 선택하수 있습니다!
					alert(getLabel('COM_FRT_ALT007') + "\n\n: FRT_CMM_UTIL.588");
				}
				else if(sheetObj.CellValue(bcCheckTrdp, objPfx+"trdp_cd")!=sheetObj.CellValue(row, objPfx+"trdp_cd")){
					sheetObj.SetCellValue(row, objPfx+"frt_check", 0, 0);
					//동일한 거래처인 경우에만 선택하수 있습니다!
					alert(getLabel('COM_FRT_ALT008') + "\n\n: FRT_CMM_UTIL.594");
				}
				else{
					bcCheckCnt++;					
				}
			}
		}else{
			if(objPfx==''){
				sdCheckCnt--;
				if(sdCheckCnt==0){
					sdCheckTrdp = '';
				}
			}else{
				bcCheckCnt--;
				if(bcCheckCnt==0){
					bcCheckTrdp = '';
				}
			}
		}

	//Unit 선택시
	}else if(colStr==objPfx+"aply_ut_cd"){
		
		//Container인 경우 TP/SZ활성화
		if(sheetObj.CellValue(row, objPfx+"aply_ut_cd")=='SCN'){
			sheetObj.CellEditable(row, objPfx+"cntr_tpsz_cd") = true;
		}else{
			sheetObj.CellEditable(row, objPfx+"cntr_tpsz_cd") = false;
			
			sheetObj.CellValue(row,    objPfx+"cntr_tpsz_cd") = ' ';
			sheetObj.CellValue(row,    objPfx+"qty") = '';
			sheetObj.CellValue(row,    objPfx+"trf_cur_sum_amt") = '';
		}
	
	//Unit이 Container인 경우 TP/SZ선택시 해당 수량을 넣어줌
	}else if(colStr==objPfx+"cntr_tpsz_cd"){
		
		if(sheetObj.CellValue(row, objPfx+"aply_ut_cd")=='SCN'){
			var curFrtCd    = sheetObj.CellText(row, objPfx+"frt_cd");	//Freight Code
			var curCellText = trim(sheetObj.CellText(row, objPfx+"cntr_tpsz_cd"));
			
			if(curCellText==''){
				sheetObj.SetCellValue(row, objPfx+"qty", '', 0);
				sheetObj.SetCellValue(row, objPfx+"trf_cur_sum_amt", '', 0);
			}else{
				var minNum = 0;
				if(curCellText.length>1){
					for(var i = headerRowCnt; i < sheetObj.Rows; i++){
						if(i!=row){
							//동일한 Freight Code에 동일한  Container Size가 사용되었는지 확인함
							if(curFrtCd==sheetObj.CellText(i, objPfx+"frt_cd")&&curCellText==sheetObj.CellText(i, objPfx+"cntr_tpsz_cd")){
								minNum = minNum+parseInt(sheetObj.CellText(i, objPfx+"qty"));
							}
						}
					}
				}
				
				//이미 선택되었는지 확인한다.
				var curNum = '';
				var cntrSheet = docObjects[0];
				for(var i = 1; i < cntrSheet.Rows; i++){
					if(curCellText==cntrSheet.CellValue(i, 0)){
						curNum = cntrSheet.CellValue(i, 1);
						break;
					}
				}
				
				var cntrQty = parseInt(curNum)-minNum;
				if(cntrQty>0){
					sheetObj.SetCellValue(row, objPfx+"qty", cntrQty, 0);	
				}
				else{
					sheetObj.SetCellValue(row, objPfx+"qty", '', 0);
					sheetObj.SetCellValue(row, objPfx+"trf_cur_sum_amt", '', 0);
				    sheetObj.SetCellValue(row, objPfx+"cntr_tpsz_cd", '', 0);
				    
				    //Selected \"Type/Size\" is already in use.\n\n\Please select other \"Type/Size\".
				    
				    //#2348 [IMPEX] Pop up error message not closing after click OK
				    if(cntrTpSzFlag){
				    	alert(getLabel('COM_FRT_ALT009') + "\n\n: BL_FRT.1478");
				    	cntrTpSzFlag = false;
				    }
				}
			}
		}		

	//Tariff Currency
	}else if(colStr==objPfx+"rat_curr_cd"){
		
		//Tariff Currency를 기준으로 생성된 값들을 초기화 한다.
		resetCurCd(sheetObj, row, objPfx);

	//Rate 입력시 Vat 계산
	}else if(colStr==objPfx+"qty"||colStr==objPfx+"ru"||colStr==objPfx+"vat_rt"){		
		var valCnt = sheetObj.CellValue(row, objPfx+"qty");
		
		//수량인경우
		if(colStr==objPfx+"qty"){	
			
			var qty   = sheetObj.CellValue(row, objPfx+"qty");
			var ruStr = sheetObj.CellValue(row, objPfx+"aply_ut_cd");
			if(isNaN(qty)){
				//Please input Number!
				alert(getLabel('FMS_COM_ALT005') + "\n\n: FRT_CMM_UTIL.693");
				
				sheetObj.SetCellValue(row, objPfx+"qty", '', 0);
				return;
			}
			var totLen = qty.length;
			var dotIdx = qty.indexOf('.');
			if(ruStr=='CBM'||ruStr=='KGS'||ruStr=='AKG'||ruStr=='ACW'||ruStr=='AGW'||ruStr=='AMT'){
				if(dotIdx>0){
					totLen = totLen-(dotIdx+1);
					if(totLen==0){
						sheetObj.SetCellValue(row, objPfx+"qty", qty.substring(0, dotIdx), 0);
					}else if(totLen>2){
						dotIdx = dotIdx+4;
						sheetObj.SetCellValue(row, objPfx+"qty", qty.substring(0, dotIdx), 0);
					}
				}
			}else{
				
				if(dotIdx>0){
					sheetObj.SetCellValue(row, objPfx+"qty", qty.substring(0, dotIdx), 0);
				}
				
				if(ruStr=='SCN'){
					var curCellText = trim(sheetObj.CellText(row, objPfx+"cntr_tpsz_cd"));
					var curFrtCd    = sheetObj.CellText(row, objPfx+"frt_cd");	//Freight Code
					
					if(curCellText==''){
						sheetObj.SetCellValue(row, objPfx+"qty", 0, 0);
					}else{
					
						var minNum = 0;
						for(var i = headerRowCnt; i < sheetObj.Rows; i++){
							//동일한 Freight Code에 동일한  Container Size가 사용되었는지 확인함
							if(curFrtCd==sheetObj.CellText(i, objPfx+"frt_cd")&&curCellText==sheetObj.CellText(i, objPfx+"cntr_tpsz_cd")){
								minNum = minNum+parseInt(sheetObj.CellText(i, objPfx+"qty"));
							}
						}
						
						//이미 선택되었는지 확인한다.
						var curNum = '';
						var cntrSheet = docObjects[0];
						for(var i = 1; i < cntrSheet.Rows; i++){
							if(curCellText==cntrSheet.CellValue(i, 0)){
								curNum = cntrSheet.CellValue(i, 1);
								break;
							}
						}
						
						if(parseInt(curNum)<minNum){
							//Please check the Container qty!
							alert(getLabel('COM_FRT_ALT010') + "\n\n: BL_FRT.744");
							
							sheetObj.SetCellValue(row, objPfx+"qty", 0, 0);
							sheetObj.SelectCell(row, objPfx+"qty");
							return;
						}
					}
				}
			}
		}	
		if(valCnt==''){
			valCnt = 1;
		}
		
		var tmpSum = getMultiplyFloat(valCnt, sheetObj.CellValue(row, objPfx+"ru"));
		if(sheetObj.CellValue(row, objPfx+"vat_rt")>0){
			//단가별 Vat금액 = (세금비율*0.01)*단가 
			var tmpRt = sheetObj.CellValue(row, objPfx+"vat_rt")*0.01;
			tmpSum = getMultiplyFloat(tmpSum, tmpRt);
			sheetObj.CellValue(row, objPfx+"vat_amt") = tmpSum;
		}else{
			sheetObj.CellValue(row, objPfx+"vat_amt") = 0;
		}

		
		//Invoice Amt를계산함
		calcInvAmt(sheetObj, row, objPfx);
		
		//Performance Amt를 계산함
		calcPefrAmt(sheetObj, row, objPfx);
		
		//2010.12.20 김진혁 추가, Freight에 vol * rate 컬럼추가, 값 입력시 자동 계산로직 추가 
		sheetObj.CellValue(row, objPfx+"trf_cur_sum_amt") = sheetObj.CellValue(row, objPfx+"qty") * sheetObj.CellValue(row, objPfx+"ru");
	//Invoice Currency
	}else if(colStr==objPfx+"inv_curr_cd"){
		sheetObj.CellValue(row, objPfx+"inv_xcrt")   = '';      
		sheetObj.CellValue(row, objPfx+"inv_amt")    = '';       
		sheetObj.CellValue(row, objPfx+"inv_vat_amt")= '';   
		
		if(sheetObj.CellValue(row,  objPfx+"inv_curr_cd")==sheetObj.CellValue(row, objPfx+"rat_curr_cd")){
			sheetObj.CellValue(row, objPfx+"inv_xcrt") = 1;
		}
		
	}else if(colStr==objPfx+"inv_xcrt"||colStr==objPfx+"perf_xcrt"){
		//Invoice Amt를계산함
		calcInvAmt(sheetObj, row, objPfx);
		
		//Performance Amt를 계산함
		calcPefrAmt(sheetObj, row, objPfx);
		
	//inv_amt 및 inv_vat_amt 직접 수정시
	}else if(colStr==objPfx+"inv_amt"||colStr==objPfx+"inv_vat_amt"){
		var invAmt = sheetObj.CellValue(row, objPfx+"inv_amt");
		var valAmt = sheetObj.CellValue(row, objPfx+"inv_vat_amt");
		sheetObj.CellValue(row, objPfx+"inv_sum_amt") =  getSumFloat(invAmt, valAmt);
		
	}
}

/**
 * OnClick Event처리
 */
function mutiSheetOnClick(sheetObj, row, col, objPfx) {
	var colStr = sheetObj.ColSaveName(col);
	if(colStr==objPfx+"cntr_tpsz_cd"){
		if(sheetObj.CellValue(row, objPfx+"aply_ut_cd")!='SCN'){
			//Unit이 Container인 항목만 선택이 가능합니다!
			alert(getLabel('COM_FRT_ALT012') + "\n\n: FRT_CMM_UTIL.812");
			
			sheetObj.SelectCell(row, objPfx+"aply_ut_cd")
			return;
		}
	
	//Rate 선택시
	}else if(colStr==objPfx+"ru"){
		//Unit 확인
		if(sheetObj.CellValue(row, objPfx+"qty")==''){
			//Please enter \"Volume!\"!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_VOLM') + "\n\n: FRT_CMM_UTIL.814");
		}

	//Invoice /Performance 선택시
	}else if(colStr==objPfx+"inv_xcrt"||colStr==objPfx+"inv_vat_amt"||colStr==objPfx+"perf_xcrt"||colStr==objPfx+"perf_vat_amt"){

		//Volume을 확인한다.
		if(sheetObj.CellValue(row, objPfx+"qty")==''){
			//Please enter \"Volume!\"!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_VOLM') + "\n\n: FRT_CMM_UTIL.823");
			sheetObj.SelectCell(row, objPfx+"qty");
			
		}else {
			//Invoice Amt
			if(col==objPfx+"inv_vat_amt"){
				if(sheetObj.CellValue(row, objPfx+"inv_xcrt")==''){
					//Please enter \"Invoice exchange rate\"!
					alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_EXRT') + "\n\n: FRT_CMM_UTIL.831");
					
					sheetObj.SelectCell(row, objPfx+"inv_xcrt");
				}
						
			//Performace Amt
			}else if(col==objPfx+"perf_vat_amt"){

				if(sheetObj.CellValue(row, objPfx+"perf_xcrt")==''){
					//Please enter \"Performed exchange rate!\"!
					alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_EXRT') + "\n\n: FRT_CMM_UTIL.841");
					
					sheetObj.SelectCell(row, objPfx+"perf_xcrt");
				}
			}			
		}
	}
}


/**
 * Double Click Evnet처리
 */
function mutiSheetDblClick(sheetObj, row, col, objPfx) {
	var colStr = sheetObj.ColSaveName(col);
	if(colStr==objPfx+"inv_no"){
		if(sheetObj.CellValue(row, objPfx+"inv_no")!=''){
		    var param = "open_type=I";
		    param += "&air_sea_clss_cd="+inv_viw_tp;
		    param += "&inv_no=" +        sheetObj.CellValue(row, objPfx+"inv_no");
		    param += "&sell_buy_tp_cd="+ sheetObj.CellValue(row, objPfx+"sell_buy_tp_cd");
		    param += "&frt_ask_clss_cd="+sheetObj.CellValue(row, objPfx+"frt_ask_clss_cd");
		    popGET('RPT_PRN_0040.clt?'+param, '', 385, 330, "scroll:yes;status:no;help:no;");	        	
		}
	}
}



/**
 * 팝업처리
 */
function mutiSheetOnPopupClick(sheetObj, row, col, objPfx) {
	
	var colStr = sheetObj.ColSaveName(col);
	//Freight Code조회
	if(colStr==objPfx+"frt_cd"){
   		var rtnary = new Array(1);
   		rtnary[0] = "2";
   		
        var rtnVal = window.showModalDialog('./CMM_POP_0070.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:556px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry = rtnVal.split("|");

			sheetObj.CellValue(row, objPfx+"frt_cd") = rtnValAry[0];
			sheetObj.CellValue(row, objPfx+"frt_cd_nm") = rtnValAry[1];
			
			//기존 입력값 초기화
			sheetObj.CellValue(row, objPfx+"cntr_tpsz_cd") = '';
			sheetObj.CellValue(row, objPfx+"qty")     = '';
			sheetObj.CellValue(row, objPfx+"vat_amt") = '';
			
			sheetObj.CellValue(row, objPfx+"inv_amt") = '';
			sheetObj.CellValue(row, objPfx+"inv_vat_amt")  = '';

			sheetObj.CellValue(row, objPfx+"perf_amt")= '0';               
			sheetObj.CellValue(row, objPfx+"perf_vat_amt") = '0';
			
			
			frm1.objPfx.value = objPfx;
			frm1.curRow2.value = row;
			
			var parmStr = '&goWhere=aj&bcKey=searchMyTaxRate';
			parmStr += '&f_frt_cd='+rtnValAry[0]; 
			ajaxSendPost(setTaxRate,  'reqVal', parmStr, './GateServlet.gsl');
		}
	//Customer Code조회
	}else if(colStr==objPfx+"trdp_cd"){
		
   		var rtnary = new Array(1);
   		rtnary[0] = "2";
   		rtnary[1] = "";
   		rtnary[2] = window;
   		
        var rtnVal = window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
        
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry = rtnVal.split("|");
			sheetObj.CellValue(row, objPfx+"trdp_cd") = rtnValAry[0];//trdp_cd
			sheetObj.CellValue(row, objPfx+"trdp_nm") = rtnValAry[2];//full_nm
		}    
    //Tarriff Currency조회
	}else if(colStr==objPfx+"rat_curr_cd"){
		
   		var rtnary = new Array(1);
   		rtnary[0] = "2";
   		var rtnVal = window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px");
        
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry = rtnVal.split("|");
			
			//formObj.s_currency_code.value = rtnValAry[0];//cd_val
			sheetObj.CellValue(row, objPfx+"rat_curr_cd") = rtnValAry[1];//cd_nm
		}

    //Buying/Credit인 경우 Invoice 환률을 선택한다.
	}else if(colStr==objPfx+"inv_curr_cd"){     
    	var rtnary = new Array(1);
   		rtnary[0] = "1";
   		
        var rtnVal = window.showModalDialog('./CMM_POP_0040.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px");
        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		 	
		}else{
			var rtnValAry = rtnVal.split("|");
			sheetObj.CellValue(row, col) = rtnValAry[0];
			
			sheetObj.CellValue(row, objPfx+'inv_xcrt') = '';
			sheetObj.CellValue(row, objPfx+'inv_amt')  = '';
			sheetObj.CellValue(row, objPfx+'inv_vat_amt') = '';
			
			if(sheetObj.CellValue(row,  objPfx+"inv_curr_cd")==sheetObj.CellValue(row, objPfx+"rat_curr_cd")){
				sheetObj.CellValue(row, objPfx+"inv_xcrt") = 1;
			}
		}
        
	//Invoice Exchange rate
	}else if(colStr==objPfx+"inv_xcrt"){

		//팝업 호출 조건을 확인한다.
   		if(sheetObj.CellValue(row, objPfx+'ru')==''){
   			//Please enter \"Rate!\"!'
   			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_RATE') + "\n\n: FRT_CMM_UTIL.977");
   			
   			return;
   		
   		//Currency 선택여부 확인
   		}else if(sheetObj.CellValue(row, objPfx+'inv_curr_cd')==''){
   			//Please select \"Currency!\"!
   			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_CURR') + "\n\n: FRT_CMM_UTIL.984");
   			
   			return;
   		}
		
		var rtnary = new Array(1);
   		rtnary[0] = "2";

   		//P/C 구분에 따라서 조회할 환률을 선택한다. 
   		var fndCurr = '';

   		
   		//2번 Sheet
   		if(objPfx==''){
   			fndCurr = sheetObj.CellValue(row, 'inv_curr_cd');
   			
   	   	//5번 Sheet
   		}else{
   			fndCurr = sheetObj.CellValue(row, 'b_inv_curr_cd');
   		}
   		
		var paramStr = '?f_fm_curr_cd='+sheetObj.CellValue(row, objPfx+"rat_curr_cd");
		paramStr+= '&f_inv_curr_cd='+fndCurr;
		paramStr+= '&f_dft_dt='+frm1.xcrtDt.value;
		paramStr+= '&f_trdp_cd='+sheetObj.CellValue(row, objPfx+"trdp_cd");
		paramStr+= '&f_trdp_nm='+sheetObj.CellValue(row, objPfx+"trdp_nm");

   		var rtnVal = window.showModalDialog('./CMM_POP_0220.clt'+paramStr, rtnary, "scroll:yes;status:no;help:no;dialogWidth:750px;dialogHeight:600px");
   		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry = rtnVal.split("|");
			
			sheetObj.CellValue(row, objPfx+"inv_xcrt")    = rtnValAry[0];//EX. Rate  inv_xcrt
			sheetObj.CellValue(row, objPfx+"inv_curr_cd") = rtnValAry[1];	//xch_curr_cd

			calcInvAmt(sheetObj, row, objPfx);
		}

	//Performance Exchange rate
	}else if(colStr==objPfx+"perf_xcrt"){
   		var rtnary = new Array(1);
   		rtnary[0] = "2";
		var paramStr = '?f_fm_curr_cd='+sheetObj.CellValue(row, objPfx+"rat_curr_cd");
		paramStr+= '&f_dft_dt='+frm1.xcrtDt.value;

   		var rtnVal = window.showModalDialog('./CMM_POP_0230.clt'+paramStr, rtnary, "scroll:yes;status:no;help:no;dialogWidth:750px;dialogHeight:600px");

   		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry = rtnVal.split("|");
			sheetObj.CellValue(row, objPfx+"perf_xcrt")    = rtnValAry[0];//Ex.Rate perf_xcrt
			sheetObj.CellValue(row, objPfx+"perf_curr_cd") = rtnValAry[1];//perf_curr_cd
			
			calcPefrAmt(sheetObj, row, objPfx);
		}
	}
}
//############################################################
//#  금액관련 연산
//############################################################
/**
 * Tariff Currency 변경시 등록된 Invoice Currency 및 Performance Currency초기화
 */
function resetCurCd(sheetObj, row, objPfx){
	sheetObj.CellValue(row, objPfx+"inv_xcrt") = '';      
	sheetObj.CellValue(row, objPfx+"inv_amt")  = '';       
	sheetObj.CellValue(row, objPfx+"inv_vat_amt") = '';   
	
	sheetObj.CellValue(row, objPfx+"perf_xcrt") = 0;     
	sheetObj.CellValue(row, objPfx+"perf_amt")  = 0;      
	sheetObj.CellValue(row, objPfx+"perf_vat_amt") = 0;  
}


/**
 * Invoice Amt를 계산한다.
 */
function calcInvAmt(sheetObj, row, objPfx){
	var tmpCntrCnt =  sheetObj.CellValue(row, objPfx+"qty");
	if(tmpCntrCnt==''){
		tmpCntrCnt = 1;
	}
	
	//((Rate*Countainer Count))*Ex.Rate
	var tmpSum = getMultiplyFloat(tmpCntrCnt, sheetObj.CellValue(row, objPfx+"ru"));
	    tmpSum = getMultiplyFloat(tmpSum,     sheetObj.CellValue(row, objPfx+"inv_xcrt"));
	
	//VAT AMT(VAT AMT*Ex.Rate)
	var vatSum = sheetObj.CellValue(row, objPfx+"vat_amt");
	    vatSum = getMultiplyFloat(vatSum, sheetObj.CellValue(row, objPfx+"inv_xcrt"));

	//원화인 경우
	if(sheetObj.CellValue(row, objPfx+'inv_curr_cd')=='KRW'){
		tmpSum = getFlRound(tmpSum, 1);
		vatSum = getFlRound(vatSum, 1);
	}
    sheetObj.CellValue(row, objPfx+"inv_amt")     = tmpSum;		//Invoice Amt = (Qty*Rate Unit)*Exchange Rate
    sheetObj.CellValue(row, objPfx+"inv_vat_amt") = vatSum;
	    
	//Total Amt( Total Amt = Inv_amt+Vat_amt) 
	sheetObj.CellValue(row, objPfx+"inv_sum_amt") = getSumFloat(tmpSum, vatSum);
	    
}

/**
 * Performance Amt를 계산한다.
 */
function calcPefrAmt(sheetObj, row, objPfx){
	var tmpCntrCnt =  sheetObj.CellValue(row, objPfx+"qty");
	if(tmpCntrCnt==''){
		tmpCntrCnt = 1;
	}

	//((Rate*Countainer Count)+Vat)*Ex.Rate
	var tmpSum = getMultiplyFloat(tmpCntrCnt, sheetObj.CellValue(row, objPfx+"ru"));
    tmpSum = getSumFloat     (tmpSum,     sheetObj.CellValue(row, objPfx+"vat_amt"));
    tmpSum = getMultiplyFloat(tmpSum,     sheetObj.CellValue(row, objPfx+"perf_xcrt"));
    
	sheetObj.CellValue(row, objPfx+"perf_amt")     = tmpSum;		//Invoice Amt 
	sheetObj.CellValue(row, objPfx+"perf_vat_amt") = getMultiplyFloat(tmpSum, sheetObj.CellValue(row, objPfx+"vat_rt"));
}


//##########################################HBL Freight용##########################################
//상단 Profit에 값을 넣기 위한 메소드임
function dispProfit(){
	var doSb = false;
	//selling-buying
	if(frm1.inv_sell.value!=''){
		var sbSum = 0;
		if(obdtCur!=0){
			sbSum = getMinusFloat(rmMoneyFmt(frm1.inv_sell.value),  rmMoneyFmt(frm1.b_inv_sell.value));
		}
	    frm1.sb_usd.value = doMoneyFmt(sbSum);
	    doSb = true;
	}
	
	//debit-credit
	var doDc = false;
	if(frm1.inv_debit.value!=''){
		var dcSum = 0; 
		if(obdtCur!=0){	
			dcSum = getMinusFloat(rmMoneyFmt(frm1.inv_debit.value), rmMoneyFmt(frm1.b_inv_debit.value));
		}
		frm1.dc_usd.value = doMoneyFmt(dcSum);
		doDc = true;
	}
	//Profit
	if(doSb||doDc){
		if(!doSb){
			sbSum = 0;
		}
		if(!doDc){
			dcSum = 0;
		}
		var profSum = getSumFloat(sbSum, dcSum);
		frm1.profit.value = doMoneyFmt(profSum);
	}
}


/**
 * 하단 Total의 PPD, CCT의 값을 입력함
 */
function doShowTotalTbl(frmSheetObj, ppdSheet, cctSheet){
	var ppCurCd = '';	//Prepared에 추가된 Currency Code 정보
	var ccCurCd = '';	//Collected에 추가된 Currency Code 정보

	var ppdCmpCd = '';	//Prepared에 추가된 사업장 코드
	var ppdCmpNm = '';	//Prepared에 추가된 사업장명
	
	var cctCmpCd = '';	//Collected에 추가된 사업장 코드
	var cctCmpNm = '';	//Collected에 추가된 사업장명
	
	var ppCd    = new Array();
	var ppRate  = new Array();
	var ppAmt   = new Array();
	var ppInvAmt= new Array();
	
	var ccCd    = new Array();
	var ccRate  = new Array();
	var ccAmt   = new Array();
	var ccInvAmt= new Array();
	
	var loopNum = 2;
	
	var ppdCurCd = '';
	var cctCurCd = '';
	
	for(var i = headerRowCnt; i < frmSheetObj.Rows; i++){

		var cdStr = frmSheetObj.CellValue(loopNum, "frt_term_cd"); 
		if('PP'==cdStr){

			//최초인 경우
			if((ppCurCd.indexOf(frmSheetObj.CellValue(loopNum,  "rat_curr_cd")))==-1){
				
				//Display할 사업장 코드와 사업장 명을 가지고 옵니다. 
				ppdCmpCd = frmSheetObj.CellValue(loopNum, "trdp_cd");
				ppdCmpNm = frmSheetObj.CellValue(loopNum, "trdp_nm");
				
				var curIdx = ppCd.length; 
				ppCd[curIdx]    = frmSheetObj.CellValue(loopNum,  "rat_curr_cd");	//Tariff Currency
				ppRate[curIdx]  = rmMoneyFmt(frmSheetObj.CellValue(loopNum, "inv_xcrt"));	//Ex Rate
				ppAmt[curIdx]   = rmMoneyFmt(frmSheetObj.CellValue(loopNum, "ru"));	//Rate컬럼
				ppInvAmt[curIdx]= rmMoneyFmt(frmSheetObj.CellValue(loopNum, "inv_amt"));	//Inv AMT
				
				
				ppCurCd += frmSheetObj.CellValue(loopNum, "rat_curr_cd");

				//공통 PPD 환률
				ppdCurCd = frmSheetObj.CellValue(loopNum, "inv_curr_cd");
				
				
			//중복인 경우
			}else{
				for(var pi = 0; pi < ppCd.length; pi++){
					
					//추가 항목중 다른 이름이 하나라도 잇으면 Display하지 않는다.
					if(ppdCmpCd!=frmSheetObj.CellValue(loopNum, "trdp_cd")){
						ppdCmpCd = '';
						ppdCmpNm = '';
					}
					
					//동일한 Currency 코드를 찾아 해당 코드인 경우 Sum함
					if(ppCd[pi]==frmSheetObj.CellValue(loopNum, "rat_curr_cd")){
						ppAmt[curIdx]    = getSumFloat(ppAmt[curIdx],    rmMoneyFmt(frmSheetObj.CellValue(loopNum,"ru"))); 

						ppInvAmt[curIdx] = getSumFloat(ppInvAmt[curIdx], rmMoneyFmt(frmSheetObj.CellValue(loopNum, "inv_amt")));
					}
				}
				
			}
			
		}else{		

			//최초인 경우
			if((ccCurCd.indexOf(frmSheetObj.CellValue(loopNum,  "rat_curr_cd")))==-1){
				
				var curIdx = ccCd.length;
				
				//Display할 사업장 코드와 사업장 명을 가지고 옵니다. 
				cctCmpCd = frmSheetObj.CellValue(loopNum, "trdp_cd");
				cctCmpNm = frmSheetObj.CellValue(loopNum, "trdp_nm");
				
				ccCd[curIdx]    = frmSheetObj.CellValue(loopNum,  "rat_curr_cd");	//Tariff Currency
				ccRate[curIdx]  = rmMoneyFmt(frmSheetObj.CellValue(loopNum, "inv_xcrt"));	//Ex Rate
				
				ccAmt[curIdx]   = rmMoneyFmt(frmSheetObj.CellValue(loopNum, "ru"));	//Rate컬럼
				ccInvAmt[curIdx]= rmMoneyFmt(frmSheetObj.CellValue(loopNum, "inv_amt"));	//Inv AMT

				ccCurCd += frmSheetObj.CellValue(loopNum, "rat_curr_cd");
				cctCurCd = frmSheetObj.CellValue(loopNum, "inv_curr_cd");
				
			//중복인 경우
			}else{
				for(var ci = 0; ci < ppCd.length; ci++){
					
					//추가 항목중 다른 이름이 하나라도 잇으면 Display하지 않는다.
					if(cctCmpCd!=frmSheetObj.CellValue(loopNum, "trdp_cd")){
						cctCmpCd = '';
						cctCmpNm = '';
					}
					
					//동일한 Currency 코드를 찾아 해당 코드인 경우 Sum함
					if(ccCd[ci]==frmSheetObj.CellValue(loopNum, "rat_curr_cd")){
						ccAmt[curIdx]    = getSumFloat(ccAmt[curIdx],    rmMoneyFmt(frmSheetObj.CellValue(loopNum,"ru"))); 
						ccInvAmt[curIdx] = getSumFloat(ccInvAmt[curIdx], rmMoneyFmt(frmSheetObj.CellValue(loopNum,"inv_amt")));						
					}
				}
			}
		}
		loopNum++;
	}
	//PPD AT. IBSheet에 데이터 표시
	if(ppdCurCd.length>2){
		frm1.ppdToCurrency.value = ppdCurCd;
		frm1.ppdOrgCurr.value = ppdCurCd;
	}
	
	frm1.ppdCmpCd.value = ppdCmpCd;
	frm1.ppdCmpNm.value = ppdCmpNm;
	
	var curIdx = ppdSheet.RowCount;
	for(var i = 0; i < ppCd.length; i++){

		//신규 Row 추가
		ppdSheet.DataInsert(++curIdx);
		
		//Main table의 정보를 Total에 옮긴다.
		ppdSheet.CellValue(curIdx, 0) = ppCd[i];	//Tariff Currency
		ppdSheet.CellValue(curIdx, 1) = ppRate[i];	//Ex Rate
		ppdSheet.CellValue(curIdx, 2) = ppAmt[i];	//Amt
		ppdSheet.CellValue(curIdx, 3) = ppInvAmt[i];//Invoce Amt
		
	}
	
	//PPD AT. IBSheet에 데이터 표시
	if(cctCurCd.length>2){
		frm1.cctToCurrency.value = cctCurCd;
		frm1.cctOrgCurr.value = cctCurCd;
	}
	frm1.cctCmpCd.value = cctCmpCd;
	frm1.cctCmpNm.value = cctCmpNm;

	curIdx = cctSheet.RowCount;
	for(var i = 0; i < ccCd.length; i++){

		//신규 Row 추가
		cctSheet.DataInsert(++curIdx);
		
		//Main table의 정보를 Total에 옮긴다.
		cctSheet.CellValue(curIdx, 0) = ccCd[i];	//Tariff Currency
		cctSheet.CellValue(curIdx, 1) = ccRate[i];	//Ex Rate
		cctSheet.CellValue(curIdx, 2) = ccAmt[i];	//Amt
		cctSheet.CellValue(curIdx, 3) = ccInvAmt[i];//Invoce Amt
	}
}

//Total을 처리함
function doSumFrt(sheetObj, dispType, objPfx){
	var invSell = 0;
	var invDebit= 0;
	var invTotal= 0;
	var invVat  = 0;
	
	var pefSell = 0;
	var pefDebit= 0;
	var pefTotal= 0;
	var pefVat  = 0;

	var cmpType1 = 'S';
	var cmpType2 = 'D';
	
	//Buying/Credit인 경우
	if(dispType==2){
		cmpType1 = 'B';
		cmpType2 = 'C';
	}
	
	for(var i = headerRowCnt; i < sheetObj.Rows; i++){
		
		//Selling or Buying
		if(sheetObj.CellValue(i, objPfx+"sell_buy_tp_cd")==cmpType1){
			invSell = parseFloat(invSell)+parseFloat(rmMoneyFmt(sheetObj.CellValue(i, objPfx+"inv_amt"))); //AMT
			pefSell = parseFloat(pefSell)+parseFloat(rmMoneyFmt(sheetObj.CellValue(i, objPfx+"perf_amt")));	//AMT 
			
		//Debit or Credit
		}else if(sheetObj.CellValue(i, objPfx+"sell_buy_tp_cd")==cmpType2){
			invDebit = parseFloat(invDebit)+parseFloat(rmMoneyFmt(sheetObj.CellValue(i, objPfx+"inv_amt"))); //AMT 
			pefDebit = parseFloat(pefDebit)+parseFloat(rmMoneyFmt(sheetObj.CellValue(i, objPfx+"perf_amt")));	//AMT 
		}
	}	
	
	var invTot = 0;
	if(obdtCur>0){
		invTot = getDivideFloat(invSell, obdtCur);
		invTot = strToFloatByNDecimalTp(invTot, 100);
	}
	
	//화면에 데이터 표시
	if(dispType==1){
		frm1.inv_sell.value = doMoneyFmt(invTot);
		frm1.inv_debit.value= doMoneyFmt(invDebit);	
		frm1.inv_total.value= doMoneyFmt(strToFloatByNDecimalTp(getSumFloat(invTot, invDebit), 100));

		frm1.pef_sell.value = doMoneyFmt(pefSell);
		frm1.pef_debit.value= doMoneyFmt(pefDebit);	
		frm1.pef_total.value= doMoneyFmt(getSumFloat(pefSell, pefDebit));
		
	}else{
		frm1.b_inv_sell.value = doMoneyFmt(invTot);
		frm1.b_inv_debit.value= doMoneyFmt(invDebit);	
		frm1.b_inv_total.value= doMoneyFmt(strToFloatByNDecimalTp(getSumFloat(invTot, invDebit), 100));
		
		frm1.b_pef_sell.value = doMoneyFmt(pefSell);
		frm1.b_pef_debit.value= doMoneyFmt(pefDebit);	
		frm1.b_pef_total.value= doMoneyFmt(getSumFloat(pefSell, pefDebit));
	}
	dispProfit();
}



//##########################################MBL Freight용##########################################
//상단 Profit에 값을 넣기 위한 메소드임
function dispMblProfit(){
	var doSb = false;
	//selling-buying
	if(frm1.inv_sell.value!=''){
		var sbSum = 0;
		if(obdtCur!=0){
			sbSum = rmMoneyFmt(frm1.inv_sell.value);
		}
	    frm1.sb_usd.value = doMoneyFmt(sbSum);
	    doSb = true;
	}
	
	//debit-credit
	var doDc = false;
	if(frm1.inv_debit.value!=''){
		var dcSum = 0; 
		if(obdtCur!=0){	
			dcSum = rmMoneyFmt(frm1.inv_debit.value);
		}
		frm1.dc_usd.value = doMoneyFmt(dcSum);
		doDc = true;
	}
	//Profit
	if(doSb||doDc){
		if(!doSb){
			sbSum = 0;
		}
		if(!doDc){
			dcSum = 0;
		}
		var profSum = getSumFloat(sbSum, dcSum);
		frm1.profit.value = doMoneyFmt(profSum);
	}
}


//Total을 처리함
function doMblSumFrt(sheetObj, dispType){
	var invSell = 0;
	var invDebit= 0;
	var invTotal= 0;
	var invVat  = 0;
	
	var pefSell = 0;
	var pefDebit= 0;
	var pefTotal= 0;
	var pefVat  = 0;

	//Buying/Credit인 경우
	var cmpType1 = 'B';
	var cmpType2 = 'C';
	
	for(var i = headerRowCnt; i < sheetObj.Rows; i++){
		
		//Selling or Buying
		if(sheetObj.CellValue(i, "sell_buy_tp_cd")==cmpType1){
			invSell = parseFloat(invSell)+parseFloat(rmMoneyFmt(sheetObj.CellValue(i, "inv_amt"))); //AMT
			pefSell = parseFloat(pefSell)+parseFloat(rmMoneyFmt(sheetObj.CellValue(i, "perf_amt")));	//AMT 
			
		//Debit or Credit
		}else if(sheetObj.CellValue(i, "sell_buy_tp_cd")==cmpType2){
			invDebit = parseFloat(invDebit)+parseFloat(rmMoneyFmt(sheetObj.CellValue(i, "inv_amt"))); //AMT 
			pefDebit = parseFloat(pefDebit)+parseFloat(rmMoneyFmt(sheetObj.CellValue(i, "perf_amt")));	//AMT 
		}
	}	
	
	var invTot = 0;
	if(obdtCur>0){
		invTot = getDivideFloat(invSell, obdtCur);
		invTot = strToFloatByNDecimalTp(invTot, 100);
	}
	
	//화면에 데이터 표시
	frm1.inv_sell.value = doMoneyFmt(invTot);
	frm1.inv_debit.value= doMoneyFmt(invDebit);	
	frm1.inv_total.value= doMoneyFmt(strToFloatByNDecimalTp(getSumFloat(invTot, invDebit), 100));

	frm1.pef_sell.value = doMoneyFmt(pefSell);
	frm1.pef_debit.value= doMoneyFmt(pefDebit);	
	frm1.pef_total.value= doMoneyFmt(getSumFloat(pefSell, pefDebit));
		
	
	//Profit 표시
	dispMblProfit();
}

//############################################################
//#  Default Freight 표시
//############################################################

var curTab;
/**
 * 해운용 Default 조회
 * Default Fregiht Display
 */
function setDfltFrt(tabStr){
	curTab = tabStr;
	ajaxSendPost(dispDfltAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getDfltFrt&f_sea_use_flg=Y&cur_dt='+frm1.xcrtDt.value, './GateServlet.gsl');
}

/**
 * 항공용 Default 조회
 * Default Fregiht Display
 */
function setAirDfltFrt(tabStr){
	curTab = tabStr;
	ajaxSendPost(dispDfltAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getDfltFrt&f_air_use_flg=Y&cur_dt='+frm1.xcrtDt.value, './GateServlet.gsl');
}


/**
 * 열추가 표시
 */
function doDispDfltFrt(rtnArr, curTab, addRowStr, curSheet){
	var loopLen = rtnArr.length;
	loopLen--;
	for(var i = 0; i < loopLen; i++){
		var masterVals = rtnArr[i].split('@@^');	
		var usedFrtCd = false;
		var tmpTotRows = curSheet.rows;
		/*
		for(var j =2; j < tmpTotRows; j++){
			//동일한 Freight Code가 이미 사용된 경우
			if(curSheet.CellValue(j, curTab+'frt_cd')==masterVals[0]){
				usedFrtCd = true;
				break;
			}
		}
		*/
		//사용된 Freight Code가 아닌 경우 열추가 및 코드값 입력
		if(!usedFrtCd){
			doWork(addRowStr);
			tmpTotRows = curSheet.rows;
			tmpTotRows--;
			
			if(curTab==''){
				curSheet.SetCellValue(tmpTotRows, 'trdp_cd', frm1.hid_act_cd.value, 0);
				curSheet.SetCellValue(tmpTotRows, 'trdp_nm', frm1.hid_act_nm.value, 0);
			}else if(curTab=='b_'){
				curSheet.SetCellValue(tmpTotRows, 'b_trdp_cd',  frm1.hid_lin_cd.value, 0);
				curSheet.SetCellValue(tmpTotRows, 'b_trdp_nm', frm1.hid_lin_nm.value, 0);
			}
			
			curSheet.SetCellValue(tmpTotRows, curTab+'frt_cd', masterVals[0], 0);
			curSheet.SetCellValue(tmpTotRows, curTab+'frt_cd_nm', masterVals[1], 0);
			
			
			curSheet.SetCellValue(tmpTotRows,    curTab+"rat_curr_cd", masterVals[2], 0);
			if(curSheet.CellValue(tmpTotRows,  curTab+"inv_curr_cd")==masterVals[2]){
				curSheet.SetCellValue(tmpTotRows,curTab+'inv_xcrt', 1, 0);
			}else{
				curSheet.SetCellValue(tmpTotRows,curTab+'inv_xcrt', masterVals[4], 0);
			}
			curSheet.SetCellValue(tmpTotRows, curTab+'inv_xcrt_dt',masterVals[3], 0);
			

		}
	}
}


function doMblDispDfltFrt(rtnArr, curTab, addRowStr, curSheet){
	var loopLen = rtnArr.length;
	loopLen--;
	for(var i = 0; i < loopLen; i++){
		var masterVals = rtnArr[i].split('@@^');	
		var usedFrtCd = false;
		var tmpTotRows = curSheet.rows;
		/*
		for(var j =2; j < tmpTotRows; j++){
			//동일한 Freight Code가 이미 사용된 경우
			if(curSheet.CellValue(j, curTab+'frt_cd')==masterVals[0]){
				usedFrtCd = true;
				break;
			}
		}
		*/
		//사용된 Freight Code가 아닌 경우 열추가 및 코드값 입력
		if(!usedFrtCd){
			doWork(addRowStr);
			tmpTotRows = curSheet.rows;
			tmpTotRows--;
			
			curSheet.SetCellValue(tmpTotRows, curTab+'trdp_cd', frm1.hid_lin_cd.value, 0);
			curSheet.SetCellValue(tmpTotRows, curTab+'trdp_nm', frm1.hid_lin_nm.value, 0);
			
			curSheet.CellValue(tmpTotRows, curTab+'frt_cd')   = masterVals[0];
			curSheet.CellValue(tmpTotRows, curTab+'frt_cd_nm')= masterVals[3];
		}
	}
}
//############################################################
//#  입력값 유효성 검증
//############################################################
function checkInpuVals(sheetObj, objPfx){
	var totRow = sheetObj.Rows;
	var isOk = true; 
	var workItems = 0;
	
	for(var i = 2; i < totRow ; i++){
		if(sheetObj.CellValue(i, objPfx+'ibflag')=='U'||sheetObj.CellValue(i, objPfx+'ibflag')=='I'){
			
			if(checkInputVal(sheetObj.CellValue(i,       objPfx+'frt_cd'),     3, 3, "T", getLabel('ITM_FRT_CD'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'trdp_cd'),    5, 10,"T", getLabel('ITM_TRDP_CD'))!='O'){
				isOk = false;
				break;

			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'rat_curr_cd'),3, 6, "T", getLabel('ITM_TARIFF_CURR'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'aply_ut_cd'), 3, 6, "T", getLabel('ITM_UNIT'))!='O'){
				isOk = false;
				break;
			}
			
			if(sheetObj.CellValue(i, objPfx+'aply_ut_cd')=='SCN'&&sheetObj.CellValue(i, objPfx+'cntr_tpsz_cd')==''){
				//Please select \"TP/SZ\"!
				alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_TPSZ') + "\n\n: FRT_CMM_UTIL.1589");
				isOk = false;
				break;
			}	
			
			if(checkInputVal(sheetObj.CellValue(i, objPfx+'qty'), 1, 8, "N", getLabel('ITM_VOL'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'ru'),          1, 26, "N",  getLabel('ITM_RATE'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'vat_rt'),      1, 8, "N", getLabel('ITM_VAT'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'vat_amt'),     1, 31, "N", getLabel('ITM_VAT_RATE'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'inv_curr_cd'), 3, 6, "T", getLabel('ITM_INV_CURR'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'inv_xcrt'),    1, 18, "N", getLabel('ITM_INV_EXRT'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'inv_amt'),     1, 31, "N", getLabel('ITM_INV_AMT'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'inv_vat_amt'), 1, 31, "N", getLabel('ITM_INV_VAT_AMT'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'perf_curr_cd'),3,  6, "T", getLabel('ITM_PERF_CURR'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'perf_xcrt'),   1, 18, "N",  getLabel('ITM_PERF_EXRT'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'perf_amt'),    1, 31, "N", getLabel('ITM_PERF_AMT'))!='O'){
				isOk = false;
				break;
				
			}else if(checkInputVal(sheetObj.CellValue(i, objPfx+'perf_vat_amt'), 1, 31, "N", getLabel('ITM_PERF_VAT_AMT'))!='O'){
				isOk = false;
				break;
				
			}else if(sheetObj.CellValue(i, objPfx+'rat_curr_cd')==sheetObj.CellValue(i, objPfx+'inv_curr_cd')&&sheetObj.CellValue(i, objPfx+'inv_xcrt')!=1){
				//Because [Tariff Currency] and [Invoice Currency] are the same,\n\nthe [Invoice Ex.Rate] is "1"!\n\nPlease check the [Invoice Ex.Rate].
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_EXRT') + "\n\n: FRT_CMM_UTIL.1648");
				
				isOk = false;
				break;
				
			}else if(sheetObj.CellValue(i, objPfx+'inv_xcrt')==1&&sheetObj.CellValue(i, objPfx+'rat_curr_cd')!=sheetObj.CellValue(i, objPfx+'inv_curr_cd')){
				//The [Tariff Currency] is different with the [Invoice Currency]!\n\nPlease check the [Invoice Ex.Rate].
				alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_CURR') + "\n\n: FRT_CMM_UTIL.1655");

				isOk = false;
				break;					
			}
			
			if(sheetObj.CellValue(i, objPfx+'inv_curr_cd')=='KRW'){
				var invAmtStr   = sheetObj.CellValue(i, objPfx+'inv_amt');
				var invVatStr   = sheetObj.CellValue(i, objPfx+'inv_vat_amt');
				var invTotAmtStr= sheetObj.CellValue(i, objPfx+'inv_sum_amt');
				if(invAmtStr.indexOf('.')!=-1){
					//[Invoice Currency]가 KRW입니다.\n[Invoice Amount]를 절사 또는 절상하여 주십시요!
					alert(getLabel('COM_FRT_ALT011') + "\n\n: FRT_CMM_UTIL.1667");
					
					isOk = false;
					break;
					
				}else if(invVatStr.indexOf('.')!=-1){
					//[Invoice Currency]가 KRW입니다.\n[Invoice VAT]를 절사 또는 절상하여 주십시요!
					alert(getLabel('COM_FRT_ALT011') + "\n\n: FRT_CMM_UTIL.1674");
					
					isOk = false;
					break;
					
				}else if(invTotAmtStr.indexOf('.')!=-1){
					//[Invoice Currency]가 KRW입니다.\n[Invoice Total Amount]를 절사 또는 절상하여 주십시요!
					alert(getLabel('COM_FRT_ALT011') + "\n\n: FRT_CMM_UTIL.1681");
					
					isOk = false;
					break;
				}
			}
			
			if(sheetObj.CellValue(i, objPfx+'ibflag')=='U'){
				if(sheetObj.CellValue(i, objPfx+'frt_seq')==''){
					//Invalid data!
					alert(getLabel('FMS_COM_ALT007') + "\n\n: FRT_CMM_UTIL.1683");
					
					isOk = false;
					break;
				}
			}
			workItems++;
			
		//삭제인경우
		}else if(sheetObj.CellValue(i, objPfx+'ibflag')=='D'){
			workItems++;
		}
	}
	if(isOk){
		if(workItems==0){
			return 'NI';
		}else{
			return 'OK';
		}
	}else{
		return 'IV';
	}
}

//############################################################
//#  Util Methods
//############################################################
/**
 * Sheet의 일기/쓰기를 Control함
 * @sheetObj 처리할 IBsheet인 Sheet Instance
 * @isWrite  true: Editalb  false: Unable to edit
 * @startIdx 설정을 시작할 Row의 번호
 */
function toRowEdit(sheetObj, isWrite, startIdx){
	for(var i = startIdx; i < sheetObj.rows; i++){
		sheetObj.RowEditable(i) = isWrite;
	}
}

/**
 * Cell의 읽기/쓰기를 Control함
 * @sheetObj 처리할 IBsheet인 Sheet Instance
 * @isWrite  true: Editalb  false: Unable to edit
 * curRow 설정할 Row의 번호
 */
function toCellEdit(sheetObj, isWrite, curRow, totCol){
	for(var i = 0; i < totCol; i++){
		sheetObj.CellEditable(curRow, i) = isWrite;
	}
}

//############################################################
//#  버튼 Display 처리
//############################################################
/**
 * Confirm 버튼 표시 function
 */
function cnfCntr(callTp){
	
	var objPreFix = '';
	var curSheetObj = getSdSheet();
	if(callTp=='BC'){
		objPreFix = 'b_';
		curSheetObj = getBcSheet();
	}
	var sheetLen = curSheetObj.Rows;
	
	var invRows = 0;
	var isFi = false;
	var isFc = false;
	var isInv= false;
	for(var i = 2; i < sheetLen; i++){
		//저장된 경우
		if(curSheetObj.CellValue(i, objPreFix+'frt_seq')!=''){
			
			//입력된 건
			if(curSheetObj.CellValue(i, objPreFix+'inv_sts_cd')=='FI'){
				curSheetObj.CellEditable(i, objPreFix+'frt_check') = true;
				isFi = true;
				
			//Confirm 이후 된건
			}else{
				//Freight Confirm인경우
				if(curSheetObj.CellValue(i, objPreFix+'inv_sts_cd')=='FC'){
					//Invoice를 생성할 데이터를 선택할 수 있도록 Row의 Editable를 수정 가능 상태로 
					toCellEdit(curSheetObj, false, i, 29);
					curSheetObj.CellEditable(i, objPreFix+'frt_check') = true;
				
					isFc = true;
					
				//Freight가 Invoice로 생성된 이후
				}else{
					isInv = true;
					curSheetObj.RowEditable(i) = false;	
					invRows++;
				}
			}
		}else if(curSheetObj.CellValue(i, objPreFix+'trf_ctrt_no')!=''){
			curSheetObj.SetCellValue(i, objPreFix+'ibflag', 'I', 0);
		}
	}
}