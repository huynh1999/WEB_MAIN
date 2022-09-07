//=========================================================
//*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
//=========================================================
//=========================================================
//*@FileName   : SEE_BMD_0120.jsp
//*@FileTitle  : A.E.S 등록
//*@Description: A.E.S 등록 및 조회
//*@author     : PJK
//*@version    : 1.0 - 11/14/2011
//*@since      :
//
//*@Change history:
//*@author		: Tuan.Chau
//*@version		: 2.0 - 06/13/2014
//=========================================================
var s_fr_vat_rt;

function doFrtWork(srcName){ 
	var formObj=document.frm1;
    switch(srcName) {
		case "COMMAND02":	//Selling/Debit Confirm시 
			var doCnf=true;
			if(!allSaveCheck(getSdSheet(), '')){
				//You did not save some items! Confirm after saving the data.
				alert(getLabel('FMS_COM_ALT015') + "\n\n: BL_FRT.9");
  			    doCnf=false;	
			}
			var fcData=0;
			var sdSheet=getSdSheet(); 
			for(var i=2; i < sdSheet.LastRow(); i++){
				if(sdSheet.GetCellValue(i, 'fr_frt_check')==1){
					if(sdSheet.GetCellValue(i, 'fr_inv_sts_cd')=='FI'){
						fcData++;	
					}else{
						sdSheet.SetCellValue(i, 'fr_frt_check',0,0);
					}
				}
			}
			if(fcData>0){
				//상단 버튼 처리 flag
				//'Do you want to \"Confirm\"?\n\nOnce you \"Confirm\", you cannot modify the \"Selling/Debit\" data!';
				if(doCnf && confirm(getLabel('COM_FRT_CFM001'))){
					dispSd=false;
					formObj.f_cmd.value=COMMAND06;
					getSdSheet().DoAllSave(getSdUrl(), FormQueryString(formObj)+'&f_sell_tp=S');
				}
			}
			else{
				//Confirm할 데이터를 선택하여 주십시오!
				alert(getLabel('FMS_COM_ALT004') + "\n\n: BL_FRT.40");
			}
			break;
		case "COMMAND03":	//Buying/Credit Confirm 시
			var doCnf=true;
			if(!allSaveCheck(getBcSheet(), 'b_')){
				//Confirm할 데이터를 선택하여 주십시오!
				alert(getLabel('FMS_COM_ALT004') + "\n\n: BL_FRT.50");
  			    doCnf=false;	
			}
			var fcData=0;
			var bcSheet=getBcSheet(); 
			for(var i=2; i < bcSheet.LastRow(); i++){
				if(bcSheet.GetCellValue(i, 'b_fr_frt_check')==1){
					if(bcSheet.GetCellValue(i, 'b_fr_inv_sts_cd')=='FI'){
						fcData++;	
					}
					else{
						bcSheet.SetCellValue(i, 'b_fr_frt_check',0,0);
					}
				}
			}
			if(fcData>0){
				//상단 버튼 처리 flag
				//'Do you want to \"Confirm\"?\n\nOnce you \"Confirm\", you cannot modify the \"Buying/Credit\" data!';
				if(doCnf&&confirm(getLabel('COM_FRT_CFM001'))){
					dispSd=false;
					formObj.f_cmd.value=COMMAND06;
					bcSheet.DoAllSave(getSdUrl(), FormQueryString(formObj));
				}
			}else{
				//Confirm할 데이터를 선택하여 주십시오!
				alert(getLabel('FMS_COM_ALT004') + "\n\n: BL_FRT.80");
			}
			break;
		case "COMMAND04":	//Selling/Debit Confirm 취소 시
			var doCnf=true;
			if(!allSaveCheck(getSdSheet(), '')){
				//You did not save some items! Confirm after saving the data.
				alert(getLabel('FMS_COM_ALT015') + "\n\n: BL_FRT.90");
  			    doCnf=false;	
			}
			var fcData=0;
			var sdSheet=getSdSheet(); 
			for(var i=2; i < sdSheet.LastRow(); i++){
				if(sdSheet.GetCellValue(i, 'fr_frt_check')==1){
					if(sdSheet.GetCellValue(i, 'fr_inv_sts_cd')=='FC'){
						fcData++;	
					}else{
						sdSheet.SetCellValue(i, 'fr_frt_check',0,0);
					}
				}
			}
			if(fcData>0){
				//상단 버튼 처리 flag
				//'Do you want to cancel \"Confirm\" the confirmed \"Selling/Debit\" data?';
				if(doCnf&&confirm(getLabel('FMS_COM_CFMCAN'))){
					dispSd=false;
					formObj.f_cmd.value=COMMAND07;
					getSdSheet().DoAllSave(getSdUrl(), FormQueryString(formObj)+'&f_sell_tp=S');
				}
			}else{
				//Confirm할 데이터를 선택하여 주십시오!
				alert(getLabel('FMS_COM_ALT004') + "\n\n: BL_FRT.117");
			}
			break;
		case "COMMAND05":	//Buying/Credit Confirm 취소 시
			var doCnf=true;
			if(!allSaveCheck(getBcSheet(), 'b_')){
				//You did not save some items! Confirm after saving the data.
				alert(getLabel('FMS_COM_ALT015') + "\n\n: BL_FRT.129");
  			    doCnf=false;	
			}
			var fcData=0;
			var bcSheet=getBcSheet(); 
			for(var i=2; i < bcSheet.LastRow(); i++){
				if(bcSheet.GetCellValue(i, 'b_fr_frt_check')==1){
					if(bcSheet.GetCellValue(i, 'b_fr_inv_sts_cd')=='FC'){
						fcData++;	
					}
					else{
						bcSheet.SetCellValue(i, 'b_fr_frt_check',0,0);
					}
				}
			}
			if(fcData>0){
				//상단 버튼 처리 flag
				//'Do you want to cancel \"Confirm\" the confirmed \"Buying/Credit\" data?';
				if(doCnf&&confirm(getLabel('FMS_COM_CFMCAN'))){
					dispSd=false;
					formObj.f_cmd.value=COMMAND07;
					bcSheet.DoAllSave(getSdUrl(), FormQueryString(formObj));
				}
			}
			else{
				//Confirm할 데이터를 선택하여 주십시오!
				alert(getLabel('FMS_COM_ALT004') + "\n\n: BL_FRT.155");
			}
			break;
		case "COMMAND06":	//Selling/DeAuto Tariff 시
			frm1.intg_bl_seq.value=trim(frm1.intg_bl_seq.value);
			if(frm1.intg_bl_seq.value==''){
				//Please enter a [HBL]!
				alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: BL_FRT.168");
				return;
			}
			else{
				//Do you want to auto-generate the [Freight] information?\r\n\r\nIf so, the former auto-generated one will be deleted.
				if(confirm(getLabel('COM_FRT_CFM002'))){
					formObj.f_cmd.value=COMMAND04;
					getSdSheet().DoSearch("./SEE_FRT_0010_1GS.clt", FormQueryString(formObj)+'&f_house_bl_no='+frm1.bl_no.value+"&"+ false );
				}
			}
			break;
		case "COMMAND07":	//Buying/DeAuto Tariff 시
			frm1.intg_bl_seq.value=trim(frm1.intg_bl_seq.value);
			if(frm1.intg_bl_seq.value==''){
				//Please enter a Value first!
				alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: BL_FRT.178");
				return;
			}
			else{
				//Do you want to auto-generate the [Freight] information?\r\n\r\nIf so, the former auto-generated one will be deleted.
				if(confirm(getLabel('COM_FRT_CFM002'))){
					formObj.f_cmd.value=COMMAND05;
					getBcSheet().DoSearch("./SEE_FRT_0010_1GS.clt", FormQueryString(formObj)+'&f_house_bl_no='+frm1.bl_no.value+"&"+ false );
				}
			}
			break;
		case "COMMAND08":	//Selling/Debit Invoice 직접생성
			//20100906  김진혁 추가, 업무 진행상태가 S/R 생성 이후여야 인보이스 생성할 수 있음, 수출만 해당됨
			if(frm1.jb_tmplt_nm.value.substr(2, 1)=="E"){
				if(frm1.bl_sts_cd.value != 'SR' && frm1.bl_sts_cd.value != 'MC'){
					//PLS CREATE S/R OR MAWB BEFORE ISSUING INVOICE.
					alert(getLabel('COM_FRT_ALT004') + "\n\n: BL_FRT.198");
					return;
				}
			}
			frm1.intg_bl_seq.value=trim(frm1.intg_bl_seq.value);
			if(frm1.intg_bl_seq.value==''){
				//The [Rate Currency] is different with the [Invoice Currency]!\n\nPlease check the [Invoice Ex. Rate].
				alert(getLabel('COM_FRT_ALT005') + "\n\n: BL_FRT.206");
				return;
			}
			else{
				frm1.inv_dt.value='';	//발행일
				frm1.tax_bil_flg.value='';	//세금계산서 발행여부
				frm1.inv_due_dt.value='';
				frm1.inv_rmk.value='';
				frm1.buy_inv_no.value='';
				var selTp='';
				var trdpCd='';
				var sdSheet=getSdSheet(); 
				var trfCur='';
				var trfCurSe='';
				var invCur='';
				var isCheckOk=true;
				for(var i=2; i < sdSheet.LastRow(); i++){
					if(sdSheet.GetCellValue(i, 'fr_frt_check')==1&&sdSheet.GetCellValue(i, 'fr_inv_sts_cd')=='FC'){
						if(invCur==''){
							trfCur=sdSheet.GetCellValue(i, 'fr_rat_curr_cd')
							invCur=sdSheet.GetCellValue(i, 'fr_inv_curr_cd');
							selTp=sdSheet.GetCellValue(i, 'fr_sell_buy_tp_cd');
							trdpCd=sdSheet.GetCellValue(i, 'fr_trdp_cd');
						}else{
							//Invoice Currency는 동일해야 한다.
							if(invCur==sdSheet.GetCellValue(i, 'fr_inv_curr_cd')){
								//Tariff Currency가 동인한 경우
								if(trfCur!=sdSheet.GetCellValue(i, 'fr_rat_curr_cd')){
									if(trfCurSe==''){
										trfCurSe=sdSheet.GetCellValue(i, 'fr_rat_curr_cd');
									}else if(trfCurSe!=sdSheet.GetCellValue(i, 'fr_rat_curr_cd')){
										//Only two currency type allowed!\n\nPlease check the Tariff Currency
										alert(getLabel('COM_FRT_ALT006') + "\n\n: BL_FRT.249");
										sdSheet.SetCellValue(i, 'fr_frt_check',0,0);
										isCheckOk=false;
									}
								}
							//동일하지 않은경우 선택취소
							}else{
								//Unable to make invoice!\n\nPlease check the Invoice Currency!
								alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_CURR') + "\n\n: BL_FRT.259");
								sdSheet.SetCellValue(i, 'fr_frt_check',0,0);
								isCheckOk=false;
							}
						}
					}else{
						sdSheet.SetCellValue(i, 'fr_frt_check',0,0);
					}
				}
				//검증완료시
				if(isCheckOk){
					if(selTp!=''){
				   		rtnary=new Array(1);
				   		rtnary[0]=selTp;
				   		rtnary[1]=trdpCd;
				   		//2011.01.04 김진혁 추가, 인보이스 생성 시 총합 금액을 보여주기 위한 로직
				   		var sum=0;
				   		for(var i=2;i<sdSheet.LastRow();i++){
				   			if(sdSheet.GetCellValue(i, 'fr_frt_check')==1){
				   				//필요하면 buying, credit 구분 해야함.
				   				sum += parseFloat(sdSheet.GetCellValue(i, 'fr_inv_sum_amt'));
				   			}
				   		}
				   		rtnary[2]=doMoneyFmt(sum.toFixed(2));
						var rtnVal =  ComOpenWindow('./SEE_FRT_0011.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:740px;dialogHeight:240px" , true);
					    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
						 	return;
						}else{
							//'[Selling/Debit Invoice]를 생성하시겠습니까?')){
							if(confirm(getLabel('FMS_COM_CFMCRE'))){
								var rtnRows=rtnVal.split("|");
								frm1.inv_dt.value=rtnRows[0];	//발행일
								frm1.tax_bil_flg.value=rtnRows[1];	//세금계산서 발행여부
								frm1.inv_due_dt.value=rtnRows[2];
								frm1.inv_rmk.value=rtnRows[3];
								frm1.buy_inv_no.value=rtnRows[4];
								formObj.f_cmd.value=COMMAND08;
								getSdSheet().DoAllSave(getSdUrl(), FormQueryString(formObj));
							}
						}
					}else{
						//Invoice를 만들 데이터를 선택하여 주십시오!
						alert(getLabel('FMS_COM_ALT004') + "\n\n: BL_FRT.308");
					}
				}
			}
			break;
		case "COMMAND09":	//Buying/Credit Invoice 직접생성
			//20100906  김진혁 추가, 업무 진행상태가 S/R 생성 이후여야 인보이스 생성할 수 있음, 수출만 해당됨
			if(frm1.jb_tmplt_nm.value.substr(2, 1)=="E"){
				if(frm1.bl_sts_cd.value=='SR' || frm1.bl_sts_cd.value=='MC'){
				}else{
					//PLS CREATE S/R OR MAWB BEFORE ISSUING INVOICE.
					alert(getLabel('COM_FRT_ALT004') + "\n\n: BL_FRT.322");
					return;
				}
			}
			frm1.intg_bl_seq.value=trim(frm1.intg_bl_seq.value);
			if(frm1.intg_bl_seq.value==''){
				//Please enter a [HBL]!
				alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: BL_FRT.330");
				return;
			}else{
				frm1.inv_dt.value='';	//발행일
				frm1.tax_bil_flg.value='';	//세금계산서 발행여부
				frm1.inv_due_dt.value='';
				frm1.inv_rmk.value='';
				frm1.buy_inv_no.value='';
				var selTp='';
				var trdpCd='';
				var bcSheet=getBcSheet(); 
				var trfCur='';
				var trfCurSe='';
				var invCur='';
				var isCheckOk=true;
				for(var i=2; i < bcSheet.LastRow(); i++){
					if(bcSheet.GetCellValue(i, 'b_fr_frt_check')==1&&bcSheet.GetCellValue(i, 'b_fr_inv_sts_cd')=='FC'){
						if(invCur==''){
							trfCur=bcSheet.GetCellValue(i, 'b_fr_rat_curr_cd')
							invCur=bcSheet.GetCellValue(i, 'b_fr_inv_curr_cd');
							selTp=bcSheet.GetCellValue(i, 'b_fr_sell_buy_tp_cd');
							trdpCd=bcSheet.GetCellValue(i, 'b_fr_trdp_cd');
						}else{
							//Invoice Currency는 동일해야 한다.
							if(invCur==bcSheet.GetCellValue(i, 'b_fr_inv_curr_cd')){
								//Tariff Currency가 동인한 경우
								if(trfCur!=bcSheet.GetCellValue(i, 'b_fr_rat_curr_cd')){
									if(trfCurSe==''){
										trfCurSe=bcSheet.GetCellValue(i, 'b_fr_rat_curr_cd');
									}else if(trfCurSe!=bcSheet.GetCellValue(i, 'b_fr_rat_curr_cd')){
										//Only two currency type allowed!\n\nPlease check the Tariff Currency
										alert(getLabel('COM_FRT_ALT006') + "\n\n: BL_FRT.249");
										bcSheet.SetCellValue(i, 'b_fr_frt_check',0,0);
										isCheckOk=false;
									}
								}
							//동일하지 않은경우 선택취소
							}else{
								//Unable to make invoice!\n\nPlease check the Invoice Currency!
								alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_CURR') + "\n\n: BL_FRT.375");
								bcSheet.SetCellValue(i, 'b_fr_frt_check',0,0);
								isCheckOk=false;
							}
						}
					}else{
						bcSheet.SetCellValue(i, 'b_fr_frt_check',0,0);
					}
				}
				//검증완료시
				if(isCheckOk){
					if(selTp!=''){
						rtnary=new Array(1);
				   		rtnary[0]=selTp;
				   		rtnary[1]=trdpCd;
				   		//2011.01.04 김진혁 추가, 인보이스 생성 시 총합 금액을 보여주기 위한 로직
				   		var sum=0;
				   		for(var i=2;i<bcSheet.LastRow();i++){
				   			if(bcSheet.GetCellValue(i, 'b_fr_frt_check')==1){
				   				//필요하면 buying, credit 구분 해야함.
				   				sum += parseFloat(bcSheet.GetCellValue(i, 'b_fr_inv_sum_amt'));
				   			}
				   		}
				   		rtnary[2]=doMoneyFmt(sum.toFixed(2));
						var rtnVal =  ComOpenWindow('./SEE_FRT_0011.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:740px;dialogHeight:240px" , true);
					    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
						 	return;
						}else{
							//'[Buying/Credit Invoice]를 생성하시겠습니까?')){
							if(confirm(getLabel('FMS_COM_CFMCRE'))){
								var rtnRows=rtnVal.split("|");
								frm1.inv_dt.value=rtnRows[0];	//발행일
								frm1.tax_bil_flg.value=rtnRows[1];	//세금계산서 발행여부
								frm1.inv_due_dt.value=rtnRows[2];
								frm1.inv_rmk.value=rtnRows[3];
								frm1.buy_inv_no.value=rtnRows[4];
								formObj.f_cmd.value=COMMAND09;
								getBcSheet().DoAllSave(getBcUrl(), FormQueryString(formObj));
							}
						}
					}else{
						//Invoice를 만들 데이터를 선택하여 주십시오!
						alert(getLabel('FMS_COM_ALT004') + "\n\n: BL_FRT.424");
					}
				}
			}
			break;
		case "CNTRLIST":
			if(cntrListTd.width==1){
				cntrListTd.width=120;	
			}
			else{
				cntrListTd.width=1;
			}
			break;
    }
}
var headerRowCnt=2;
/**
 * 
 * @param doWhat
 * @param sheetObj
 * @param air_sea_clss_cd
 * @param bnd_clss_cd
 * @param biz_clss_cd
 * @param collVal : Add - 'A', Tab Add - 'T', Default - 'D', 추가 로직으로 Default 일때만 값 전송
 * @return
 */
function frtRowAdd(doWhat, sheetObj, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd, callVal){
	//alert(callVal);
	frm1.intg_bl_seq.value=trim(frm1.intg_bl_seq.value);
	if(doWhat=="ROWADD"){
		if(frm1.intg_bl_seq.value=='' && typeof(frm1.bkg_entry_yn) == "undefined"){
			//Please enter a [HBL]!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: BL_FRT.444");
			return;
		}
		else{
			/* #45884 - [IML] BL Entry화면들의 [Freight] Tab의 New Row는 Active Row 다음으로 추가되기를
			var intRows2=sheetObj.LastRow()+1; // +1
			var tmpRow=intRows2-1; 
			if(sheetObj.GetCellValue(tmpRow, 'fr_sell_buy_tp_cd')==''){
			  intRows2=tmpRow;
			}
			sheetObj.DataInsert(intRows2);
			*/
			
			var intRows2;
			
			var tmpRow = sheetObj.LastRow();
			
			if(sheetObj.GetCellValue(tmpRow, 'fr_sell_buy_tp_cd')==''){
				intRows2 = tmpRow;
				sheetObj.DataInsert(intRows2);
			} else {
				intRows2 = sheetObj.DataInsert();
			}
			
			//2012.12.26  Lee,Hae Kyoung , InitDataCombo 를 hidden 처리 하면서 수정함. fr_sell_buy_tp_cd 는 무조건 Selling 으로 처리
			sheetObj.SetCellValue(intRows2, 'fr_sell_buy_tp_cd','S',0);

			//2013.01.24  Lee,Hae Kyoung
			//Add 버튼 혹은 Tab 이동으로 Row Add 시 바로 위 row 의 customer, rate curr., Unit,  Curr., Ex.Rate 복사
			if(intRows2 > headerRowCnt){
				if (callVal != 'D') {
					if(sheetObj.GetCellValue(intRows2-1, 'fr_trdp_cd') != ""){
						//sheetObj.SetCellValue(intRows2, "fr_trdp_cd",sheetObj.GetCellValue(intRows2-1, "fr_trdp_cd"));
						//#3573 OE FRT AR Bill To 재정의
						if(air_sea_clss_cd == 'S' && bnd_clss_cd == 'O' && biz_clss_cd == 'H'){
							if(sheetObj.GetCellValue(intRows2,'fr_frt_term_cd')=='PP') {
								sheetObj.SetCellValue(intRows2,'fr_trdp_cd',frm1.act_shpr_trdp_cd.value);
								sheetObj.SetCellValue(intRows2,'fr_trdp_nm',frm1.act_shpr_trdp_nm.value);
							}else if(sheetObj.GetCellValue(intRows2,'fr_frt_term_cd')=='CC'){
								sheetObj.SetCellValue(intRows2,'fr_trdp_cd',frm1.prnr_trdp_cd.value);
								sheetObj.SetCellValue(intRows2,'fr_trdp_nm',frm1.prnr_trdp_nm.value);
							}
						}						
					}

					if(sheetObj.GetCellValue(intRows2-1, 'fr_aply_ut_cd') != ""){
						sheetObj.SetCellValue(intRows2, "fr_aply_ut_cd",sheetObj.GetCellValue(intRows2-1, "fr_aply_ut_cd"));
					}

					if(sheetObj.GetCellValue(intRows2, "fr_aply_ut_cd") != "SCN" && sheetObj.GetCellValue(intRows2-1, 'fr_qty') != ""){
						sheetObj.SetCellValue(intRows2, "fr_cntr_tpsz_cd",'',0);
						sheetObj.SetCellValue(intRows2, "fr_qty",sheetObj.GetCellValue(intRows2-1, "fr_qty"),0);
					}
				}
				if(sheetObj.GetCellValue(intRows2-1, 'fr_rat_curr_cd') != ""){
					sheetObj.SetCellValue(intRows2, "fr_rat_curr_cd",sheetObj.GetCellValue(intRows2-1, "fr_rat_curr_cd"),0);
				}
				if(sheetObj.GetCellValue(intRows2-1, 'fr_inv_curr_cd') != ""){
					sheetObj.SetCellValue(intRows2, "fr_inv_curr_cd",sheetObj.GetCellValue(intRows2-1, "fr_inv_curr_cd"),0);
				}
				if(sheetObj.GetCellValue(intRows2-1, 'fr_inv_xcrt') != ""){
					sheetObj.SetCellValue(intRows2, "fr_inv_xcrt",sheetObj.GetCellValue(intRows2-1, "fr_inv_xcrt"),0);
				}
				
				//#1840 - [PATENT] Pro Forma Profit Report - 오류사항
				if(typeof(frm1.bkg_entry_yn) != "undefined"){
					if(sheetObj.GetCellValue(intRows2-1, 'fr_inv_xcrt_dt') != ""){
						sheetObj.SetCellValue(intRows2, "fr_inv_xcrt_dt",sheetObj.GetCellValue(intRows2-1, "fr_inv_xcrt_dt"),0);
					}
				}
			}
			//#3411 [JTC]Accounting & Performance 수정사항
			//Unit Blank 삭제에 따른 Default Code Setting
			else {
				if (air_sea_clss_cd == 'S') {
					sheetObj.SetCellValue(intRows2, "fr_aply_ut_cd", "UNT");
				} else if (air_sea_clss_cd == 'A') {
					sheetObj.SetCellValue(intRows2, "fr_aply_ut_cd", "AUN");
				}
			}
			
			if(bnd_clss_cd=="I"){
				sheetObj.SetCellValue(intRows2, 'fr_frt_term_cd','CC',0);
			}else if(bnd_clss_cd=="O"){
				sheetObj.SetCellValue(intRows2, 'fr_frt_term_cd','PP',0);
			}

			if(sheetObj.GetCellValue(intRows2, 'fr_rat_curr_cd') == ""){	//위 row 값이 없는 경우 Set

				//#3411 [JTC]Accounting & Performance 수정사항
				//신규 row 생성시 Office Currency Setting - 아래 주석처리
				//#138 Local Currency 값으로 변경
				//sheetObj.SetCellValue(intRows2, "fr_rat_curr_cd",ofc_curr_cd,0);// ofc_curr_cd;
				//(typeof(ofc_locl_curr_cd) != 'undefined') ? sheetObj.SetCellValue(intRows2, "fr_rat_curr_cd",ofc_locl_curr_cd,0) : sheetObj.SetCellValue(intRows2, "fr_rat_curr_cd",ofc_curr_cd,0);
				sheetObj.SetCellValue(intRows2, "fr_rat_curr_cd", ofc_curr_cd, 0);
				//#3563 BL - FREIGHT TAB - CURR 항목 디폴트 값 세팅 기능 개발
				if(MULTI_CURR_FLAG == "Y"){
					(typeof(ofc_locl_curr_cd) != 'undefined') ? sheetObj.SetCellValue(intRows2, "fr_inv_curr_cd",ofc_locl_curr_cd,0) : sheetObj.SetCellValue(intRows2, "fr_inv_curr_cd",ofc_curr_cd,0);				
				} else {
					//#4203 [Great Luck v470 Test] Exchange Rate validation
					sheetObj.SetCellValue(intRows2, "fr_inv_curr_cd", ofc_curr_cd);
				}				
			}
			
			var vDateName = frm1.xcrtDt.value;
			
			if (vDateName != "" && biz_clss_cd == "H") {
				var mYear = vDateName.substr(4,4)
				var mMonth = vDateName.substr(0,2);
				var mDay = vDateName.substr(2,2);
				vDateName = mYear+""+mMonth+""+mDay;
			}
			if(MULTI_CURR_FLAG == "Y"){	//[20141212 OJG]Muti Currency 
				if(frm1.xcrtDt.value.length == 8){
					var xcrtDt=frm1.xcrtDt.value.substr(4, 4) + frm1.xcrtDt.value.substr(0, 2) + frm1.xcrtDt.value.substr(2, 2);
					sheetObj.SetCellValue(intRows2, "fr_inv_xcrt_dt",xcrtDt,0);
				}else{
					sheetObj.SetCellValue(intRows2, "fr_inv_xcrt_dt",frm1.post_dt.value,0);
				}
			}else{
				sheetObj.SetCellValue(intRows2, "fr_inv_xcrt_dt",vDateName,0);
			}
			
			//Japan Trust 470 테스트 
			//위 row 의 Ex.Date 의 값을 있을 경우그대로 Setting
			if(intRows2 > headerRowCnt){
				if(sheetObj.GetCellValue(intRows2-1, 'fr_inv_xcrt_dt') != ""){
					sheetObj.SetCellValue(intRows2, "fr_inv_xcrt_dt",sheetObj.GetCellValue(intRows2-1, "fr_inv_xcrt_dt"),0);
				}
			}
			
			
			//#1840 - [PATENT] Pro Forma Profit Report - 오류사항
			if(typeof(frm1.bkg_entry_yn) != "undefined" && sheetObj.GetCellValue(intRows2, "fr_inv_xcrt_dt") == ""){
				var bkg_dt_tm = frm1.bkg_dt_tm.value.replaceAll("-", "")
				var mYear = bkg_dt_tm.substr(4,4)
				var mMonth = bkg_dt_tm.substr(0,2);
				var mDay = bkg_dt_tm.substr(2,2);
				bkg_dt_tm = mYear+""+mMonth+""+mDay;
				sheetObj.SetCellValue(intRows2, "fr_inv_xcrt_dt",bkg_dt_tm,0);
			}
			
			
			//#3411 [JTC]Accounting & Performance 수정사항
			//위 row 의 fr_inv_curr_cd 의 값을 그대로 Setting 하기위해 주석처리함..
			//sheetObj.SetCellValue(intRows2, "fr_inv_curr_cd",sheetObj.GetCellValue(intRows2, "fr_rat_curr_cd"),0);
			//Japan Trust 470 테스트  
			if(sheetObj.GetCellValue(intRows2, "fr_inv_xcrt") == '' || sheetObj.GetCellValue(intRows2, "fr_inv_xcrt") == '0' ){
				
				//#3832 [JAPT] BL ENTRY - Freight tab,  Ex.rate 자동 표시 로직 보완
				var param = '';
				var tmp_dt = sheetObj.GetCellValue(intRows2, 'fr_inv_xcrt_dt');
				param += '&cur_dt=' + tmp_dt;
				param += '&trf_cur_cd=' + sheetObj.GetCellValue(intRows2, 'fr_rat_curr_cd');
				param += '&ofccurr_cd=' + sheetObj.GetCellValue(intRows2, 'fr_inv_curr_cd');
				ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
				if(getXcrtRate==0){
					//#4060 [JAPT] AR INVOICE ENTRY
					sheetObj.SetCellValue(intRows2, "fr_inv_xcrt",0,0);
				}else{
					sheetObj.SetCellValue(intRows2, "fr_inv_xcrt",getXcrtRate,0);
				}				
			}
			
			/*
			인보이스 환율은 Rate 환율로 보여준다. (이전로직 삭제)
			if(sheetObj.GetCellValue(intRows2, 'fr_inv_curr_cd') == ""){	//위 row 값이 없는 경우 Set
				var add_curr_cd="";
				if(biz_clss_cd=="M"){
					add_curr_cd=frm1.h_curr_cd.value;
				}else{
					add_curr_cd=frm1.h_curr_cd.value;
					if(add_curr_cd == ""){
						add_curr_cd=frm1.h_mbl_curr_cd.value;
					}
				}
				if(add_curr_cd == ""){
					add_curr_cd=ofc_curr_cd;
				}
				sheetObj.SetCellValue(intRows2, "fr_inv_curr_cd",add_curr_cd,0);
				//sheetObj.CellValue2(intRows2, "fr_inv_curr_cd") = frm1.ofc_curr.value;
			}			
			if(sheetObj.GetCellValue(intRows2, 'fr_inv_xcrt') == 0){	//위 row 값이 없는 경우 Set
				//if(frm1.ofc_curr.value==frm1.trf_cur_cd.value){	//Office Currency와 PPD의 Currency가 같은경우 Invoice curency를 1로
				if(sheetObj.GetCellValue(intRows2, "fr_rat_curr_cd")==sheetObj.GetCellValue(intRows2, "fr_inv_curr_cd")){
					sheetObj.SetCellValue(intRows2, "fr_inv_xcrt",1,0);
				}else{
					//sheetObj.CellValue2(intRows2, "fr_inv_xcrt") = frm1.dispCur.value;
				}
			}
			*/
			//perf_curr_cd
			sheetObj.SetCellValue(intRows2, "fr_perf_curr_cd",dfPerfCurr,0);
			sheetObj.SetCellValue(intRows2, "fr_perf_xcrt",0,0);
			sheetObj.SetCellValue(intRows2, "fr_perf_amt",0,0);
			sheetObj.SetCellValue(intRows2, "fr_perf_vat_amt",0,0);
			if(sheetObj.GetCellValue(intRows2, 'fr_trdp_cd') == ""){	//위 row 값이 없는 경우 Set
				if(biz_clss_cd=="H" || (air_sea_clss_cd == "S" && bnd_clss_cd == "O" && biz_clss_cd == "M")){
					//#3573 OE FRT AR Bill To 재정의
					//OEM - freight - AR Grid - Bill to 항목
					if(air_sea_clss_cd == "S" && bnd_clss_cd == "O" && biz_clss_cd == "M"){
						//PP면 Customer
						if(sheetObj.GetCellValue(intRows2,'fr_frt_term_cd')=='PP'){
							sheetObj.SetCellValue(intRows2, 'fr_trdp_cd',frm1.act_shpr_trdp_cd.value);
							sheetObj.SetCellValue(intRows2, 'fr_trdp_nm',frm1.act_shpr_trdp_nm.value);
						} 
						//CC면 Destination Agent, Destination Agent 없으면 Consignee 로 세팅
						else if (sheetObj.GetCellValue(intRows2,'fr_frt_term_cd')=='CC'){
							if(frm1.prnr_trdp_cd.value != ''){
								sheetObj.SetCellValue(intRows2, 'fr_trdp_cd',frm1.prnr_trdp_cd.value);
								sheetObj.SetCellValue(intRows2, 'fr_trdp_nm',frm1.prnr_trdp_nm.value);
							}else {
								sheetObj.SetCellValue(intRows2, 'fr_trdp_cd',frm1.cnee_trdp_cd.value);
								sheetObj.SetCellValue(intRows2, 'fr_trdp_nm',frm1.cnee_trdp_nm.value);
							}							
						}

					}else {
						sheetObj.SetCellValue(intRows2, 'fr_trdp_cd',frm1.act_shpr_trdp_cd.value);
					}
				}else{
					sheetObj.SetCellValue(intRows2, 'fr_trdp_cd','',0);
					sheetObj.SetCellValue(intRows2, 'fr_trdp_nm','',0);
				}
				
				// #1863 - [PATENT] Freight Tab - 오류 및 개선사항
				if(typeof(frm1.bkg_entry_yn) != "undefined"){
					sheetObj.SetCellValue(intRows2, 'fr_trdp_cd',frm1.act_shpr_trdp_cd.value);
					//sheetObj.SetCellValue(intRows2, 'fr_trdp_nm',frm1.act_shpr_trdp_nm.value); //(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
				}
			}
			if(sheetObj.GetCellValue(intRows2, 'fr_aply_ut_cd') == ""){	//위 row 값이 없는 경우 Set
				if(biz_clss_cd=="H"){
					if(air_sea_clss_cd=="A" && bnd_clss_cd=="I"){
						sheetObj.SetCellValue(intRows2, 'fr_aply_ut_cd',"ACW",0);
						sheetObj.SetCellValue(intRows2, 'fr_qty',frm1.chg_wgt.value,0);
					}else if(air_sea_clss_cd=="A" && bnd_clss_cd=="O"){
						//------------[20130208 OJG]-------------------------------------
						if(frm1.customer_unit_chk[0].checked){		//Selling Rate/Amount 무게 단위에 따라 무게 값 적용
							sheetObj.SetCellValue(intRows2, 'fr_aply_ut_cd',"ACW",0);
							sheetObj.SetCellValue(intRows2, 'fr_qty',frm1.agent_chg_wgt.value,0);//Kg 적용
						}else if(frm1.customer_unit_chk[1].checked){	
							sheetObj.SetCellValue(intRows2, 'fr_aply_ut_cd',"ACL",0);
							sheetObj.SetCellValue(intRows2, 'fr_qty',frm1.agent_chg_wgt1.value,0);//Lb 적용
						}	
						//------------[20130208 OJG]-------------------------------------
					}
				}
			}
			
		
			//ADD Row 시에  check box handling 불가, 저장에만 이용
			sheetObj.SetCellEditable(intRows2, 'fr_frt_check',0);
			//fr_inv_sum_amt 가 0 일 경우 warning
			warningTotalAmount(sheetObj, intRows2, 'fr_inv_sum_amt', sheetObj.GetCellValue(intRows2, 'fr_inv_sum_amt'));
			//focus 주기
			sheetObj.SelectCell(intRows2, 1);
		}
		//------[20130829 OJG]---------
		if(sheetObj.GetCellValue(intRows2, 'fr_aply_ut_cd') != "SCN"){	//Container 가 아니면.
			sheetObj.SetCellEditable(intRows2, "fr_cntr_tpsz_cd",0);
		}
		//------[20130829 OJG]---------
	//파트너 정보를 Default로 넣어 준다.
		
		

	}else if(doWhat=="BCROWADD"){
		if(frm1.intg_bl_seq.value=='' && typeof(frm1.bkg_entry_yn) == "undefined"){
			//Please enter a [HBL]!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: BL_FRT.520");
			return;
		}
		else{
			/* #45884 - [IML] BL Entry화면들의 [Freight] Tab의 New Row는 Active Row 다음으로 추가되기를
			var intRows5=sheetObj.LastRow() + 1; // +1
			var tmpRow=intRows5-1
			if(sheetObj.GetCellValue(tmpRow, "b_fr_sell_buy_tp_cd")==''){
			  intRows5=tmpRow;
			}
			sheetObj.DataInsert(intRows5);
			*/
			
			var intRows5;
			
			var tmpRow = sheetObj.LastRow(); 
			
			if(sheetObj.GetCellValue(tmpRow, 'b_fr_sell_buy_tp_cd')==''){
				intRows5 = tmpRow;
				sheetObj.DataInsert(intRows5);
			} else {
				intRows5 = sheetObj.DataInsert();
			}

			//2012.12.26  LHK , InitDataCombo 를 hidden 처리 하면서 수정함. b_fr_sell_buy_tp_cd 는 무조건 Buying 으로 처리
			sheetObj.SetCellValue(intRows5, 'b_fr_sell_buy_tp_cd','B',0);
			//2013.01.24  Lee,Hae Kyoung
			//Add 버튼 혹은 Tab 이동으로 Row Add 시 바로 위 row 의 customer, rate curr., Unit,  Curr., Ex.Rate 복사
			if(intRows5 > headerRowCnt){
				if (callVal != 'D') {
					if(sheetObj.GetCellValue(intRows5-1, "b_fr_trdp_cd") != ""){
						sheetObj.SetCellValue(intRows5, "b_fr_trdp_cd",sheetObj.GetCellValue(intRows5-1, "b_fr_trdp_cd"));
					}
					if(sheetObj.GetCellValue(intRows5-1, "b_fr_aply_ut_cd") != ""){
						sheetObj.SetCellValue(intRows5, "b_fr_aply_ut_cd",sheetObj.GetCellValue(intRows5-1, "b_fr_aply_ut_cd"));
					}
					if(sheetObj.GetCellValue(intRows5, "b_fr_aply_ut_cd") != "SCN" && sheetObj.GetCellValue(intRows5-1, "b_fr_qty") != ""){
						sheetObj.SetCellValue(intRows5, "b_fr_cntr_tpsz_cd",'',0);
						sheetObj.SetCellValue(intRows5, "b_fr_qty",sheetObj.GetCellValue(intRows5-1, "b_fr_qty"),0);
					}
				}
				if(sheetObj.GetCellValue(intRows5-1, "b_fr_rat_curr_cd") != ""){
					sheetObj.SetCellValue(intRows5, "b_fr_rat_curr_cd",sheetObj.GetCellValue(intRows5-1, "b_fr_rat_curr_cd"),0);
				}
				if(sheetObj.GetCellValue(intRows5-1, "b_fr_inv_curr_cd") != ""){
					sheetObj.SetCellValue(intRows5, "b_fr_inv_curr_cd",sheetObj.GetCellValue(intRows5-1, "b_fr_inv_curr_cd"),0);
				}
				if(sheetObj.GetCellValue(intRows5-1, "b_fr_inv_xcrt") != ""){
					sheetObj.SetCellValue(intRows5, "b_fr_inv_xcrt",sheetObj.GetCellValue(intRows5-1, "b_fr_inv_xcrt"),0);
				}
				
				//#1840 - [PATENT] Pro Forma Profit Report - 오류사항
				if(typeof(frm1.bkg_entry_yn) != "undefined"){
					if(sheetObj.GetCellValue(intRows5-1, 'b_fr_inv_xcrt_dt') != ""){
						sheetObj.SetCellValue(intRows5, "b_fr_inv_xcrt_dt",sheetObj.GetCellValue(intRows5-1, "b_fr_inv_xcrt_dt"),0);
					}
				}
			}
			//#3411 [JTC]Accounting & Performance 수정사항
			//Unit Blank 삭제에 따른 Default Code Setting
			else {
				if (air_sea_clss_cd == 'S') {
					sheetObj.SetCellValue(intRows5, "b_fr_aply_ut_cd", "UNT");
				} else if (air_sea_clss_cd == 'A') {
					sheetObj.SetCellValue(intRows5, "b_fr_aply_ut_cd", "AUN");
				}
			}
			
			if(sheetObj.GetCellValue(intRows5, "b_fr_rat_curr_cd") == ""){	//위 row 값이 없는 경우 Set
				//#3411 [JTC]Accounting & Performance 수정사항
				//신규 row 생성시 Office Currency Setting - 아래 주석처리
				//#138 Local Currency 로 변경
				//sheetObj.SetCellValue(intRows5, "b_fr_rat_curr_cd",ofc_curr_cd,0);
				//(typeof(ofc_locl_curr_cd) != 'undefined') ? sheetObj.SetCellValue(intRows5, "b_fr_rat_curr_cd",ofc_locl_curr_cd,0) : sheetObj.SetCellValue(intRows5, "b_fr_rat_curr_cd",ofc_curr_cd,0);
				sheetObj.SetCellValue(intRows5, "b_fr_rat_curr_cd", ofc_curr_cd, 0);

				//#3563 BL - FREIGHT TAB - CURR 항목 디폴트 값 세팅 기능 개발
				if(MULTI_CURR_FLAG == "Y"){
					(typeof(ofc_locl_curr_cd) != 'undefined') ? sheetObj.SetCellValue(intRows5, "b_fr_inv_curr_cd",ofc_locl_curr_cd,0) : sheetObj.SetCellValue(intRows5, "b_fr_inv_curr_cd",ofc_curr_cd,0);				
				} else {
					//#4203 [Great Luck v470 Test] Exchange Rate validation
					sheetObj.SetCellValue(intRows5, "b_fr_inv_curr_cd", ofc_curr_cd);
				}
			}

			
			var vDateName = frm1.xcrtDt.value;
			
			if (vDateName != "" && biz_clss_cd == "H") {
				var mYear = vDateName.substr(4,4)
				var mMonth = vDateName.substr(0,2);
				var mDay = vDateName.substr(2,2);
				vDateName = mYear+""+mMonth+""+mDay;
			}
			if(MULTI_CURR_FLAG == "Y"){	//[20141212 OJG]Muti Currency 
				if(frm1.xcrtDt.value.length == 8){
					var xcrtDt=frm1.xcrtDt.value.substr(4, 2) + frm1.xcrtDt.value.substr(6, 2) + frm1.xcrtDt.value.substr(0, 4);
					sheetObj.SetCellValue(intRows5, "b_fr_inv_xcrt_dt",xcrtDt,0);
				}else{
					sheetObj.SetCellValue(intRows5, "b_fr_inv_xcrt_dt",frm1.post_dt.value,0);
				}
			}else{
				sheetObj.SetCellValue(intRows5, "b_fr_inv_xcrt_dt",vDateName,0);
			}
			
			//Japan Trust 470 테스트 
			//위 row 의 Ex.Date 의 값을 있을 경우그대로 Setting
			if(intRows5 > headerRowCnt){
				if(sheetObj.GetCellValue(intRows5-1, 'b_fr_inv_xcrt_dt') != ""){
					sheetObj.SetCellValue(intRows5, "b_fr_inv_xcrt_dt",sheetObj.GetCellValue(intRows5-1, "b_fr_inv_xcrt_dt"),0);
				}
			}			
			
			//#1840 - [PATENT] Pro Forma Profit Report - 오류사항
			if(typeof(frm1.bkg_entry_yn) != "undefined" && sheetObj.GetCellValue(intRows5, "b_fr_inv_xcrt_dt") == ""){
				var bkg_dt_tm = frm1.bkg_dt_tm.value.replaceAll("-", "")
				var mYear = bkg_dt_tm.substr(4,4)
				var mMonth = bkg_dt_tm.substr(0,2);
				var mDay = bkg_dt_tm.substr(2,2);
				bkg_dt_tm = mYear+""+mMonth+""+mDay;
				sheetObj.SetCellValue(intRows5, "b_fr_inv_xcrt_dt",bkg_dt_tm,0);
			}

			
			
			//#3411 [JTC]Accounting & Performance 수정사항
			//위 row 의 fr_inv_curr_cd 의 값을 그대로 Setting 하기위해 주석처리함..
			//sheetObj.SetCellValue(intRows5, "b_fr_inv_curr_cd",sheetObj.GetCellValue(intRows5, 'b_fr_rat_curr_cd'),0);
			//Japan Trust 470 테스트 
			if(sheetObj.GetCellValue(intRows5, "b_fr_inv_xcrt") == '' || sheetObj.GetCellValue(intRows5, "b_fr_inv_xcrt") == '0' ){
				
				//#3832 [JAPT] BL ENTRY - Freight tab,  Ex.rate 자동 표시 로직 보완
				var param = '';
				var tmp_dt = sheetObj.GetCellValue(intRows5, 'b_fr_inv_xcrt_dt');
				param += '&cur_dt=' + tmp_dt;
				param += '&trf_cur_cd=' + sheetObj.GetCellValue(intRows5, 'b_fr_rat_curr_cd');
				param += '&ofccurr_cd=' + sheetObj.GetCellValue(intRows5, 'b_fr_inv_curr_cd');
				ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
				if(getXcrtRate==0){
					//#4060 [JAPT] AR INVOICE ENTRY
					sheetObj.SetCellValue(intRows5, "b_fr_inv_xcrt",0,0);
				}else{
					sheetObj.SetCellValue(intRows5, "b_fr_inv_xcrt",getXcrtRate,0);
				}					
			}			
			
			/*
			 인보이스 환율은 Rate 환율로 보여준다. (이전로직 삭제)
			if(sheetObj.GetCellValue(intRows5, 'b_fr_inv_curr_cd') == ""){	//위 row 값이 없는 경우 Set
				var add_curr_cd="";
				if(biz_clss_cd=="M"){
					add_curr_cd=frm1.h_curr_cd.value;
				}else{
					add_curr_cd=frm1.h_curr_cd.value;
					if(add_curr_cd == ""){
						add_curr_cd=frm1.h_mbl_curr_cd.value;
					}
				}
				if(add_curr_cd == ""){
					add_curr_cd=ofc_curr_cd;
				}
				sheetObj.SetCellValue(intRows5, "b_fr_inv_curr_cd",add_curr_cd,0);
			}
			if(sheetObj.GetCellValue(intRows5, 'b_fr_inv_xcrt') == 0){	//위 row 값이 없는 경우 Set
				if(sheetObj.GetCellValue(intRows5, "b_fr_rat_curr_cd")==sheetObj.GetCellValue(intRows5, "b_fr_inv_curr_cd")){
					sheetObj.SetCellValue(intRows5, "b_fr_inv_xcrt",1,0);
				}
			}
			*/
			sheetObj.SetCellValue(intRows5, "b_fr_auto_trf_flg",'N',0);
			sheetObj.SetCellValue(intRows5, "b_fr_perf_curr_cd",dfPerfCurr,0);
			sheetObj.SetCellValue(intRows5, "b_fr_perf_xcrt",0,0);
			sheetObj.SetCellValue(intRows5, "b_fr_perf_amt",0,0);
			sheetObj.SetCellValue(intRows5, "b_fr_perf_vat_amt",0,0);
			//2011.12.14  Kim,Jin-Hyuk
			//sheetObj.CellValue2(intRows5, 'b_fr_frt_term_cd') = 'PP';
			//2012.12.26  Lee,Hae Kyoung
			if(bnd_clss_cd=="I"){
				sheetObj.SetCellValue(intRows5, 'b_fr_frt_term_cd','CC',0);
			}else if(bnd_clss_cd=="O"){
				sheetObj.SetCellValue(intRows5, 'b_fr_frt_term_cd','PP',0);
			}
			//#22112  
			if(biz_clss_cd=="M"){
				sheetObj.SetCellValue(intRows5, 'b_fr_trdp_cd',frm1.carr_trdp_cd.value);
				sheetObj.SetCellValue(intRows5, 'b_fr_trdp_nm',frm1.carr_trdp_nm.value);
			}
			
			// Customer Booking Entry화면 Freight Tab에서 A/P 에 Billing Item 추가 시 Remit to에 Billing Carrier 자동 지정
			// #1863 - [PATENT] Freight Tab - 오류 및 개선사항
			if(typeof(frm1.bkg_entry_yn) != "undefined"){
				sheetObj.SetCellValue(intRows5, 'b_fr_trdp_cd',frm1.carr_trdp_cd.value);
				//sheetObj.SetCellValue(intRows5, 'b_fr_trdp_nm',frm1.carr_trdp_nm.value); //(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
			}
			
			if(sheetObj.GetCellValue(intRows5, 'b_fr_aply_ut_cd') == ""){	//위 row 값이 없는 경우 Set
				if(air_sea_clss_cd=="A"){
					//----------[20130208 OJG]-----------------------------------
					if(bnd_clss_cd=="O" && biz_clss_cd=="H"){
						if(frm1.customer_unit_chk[0].checked){
							sheetObj.SetCellValue(intRows5, 'b_fr_aply_ut_cd',"ACW",0);
							sheetObj.SetCellValue(intRows5, 'b_fr_qty',frm1.chg_wgt.value,0);
						}else if(frm1.customer_unit_chk[1].checked){
							sheetObj.SetCellValue(intRows5, 'b_fr_aply_ut_cd',"ACL",0);
							sheetObj.SetCellValue(intRows5, 'b_fr_qty',frm1.chg_wgt1.value,0);
						}
					}else{
						sheetObj.SetCellValue(intRows5, 'b_fr_aply_ut_cd',"ACW",0);
						sheetObj.SetCellValue(intRows5, 'b_fr_qty',frm1.chg_wgt.value,0);
					}
					//----------[20130208 OJG]-----------------------------------
				}
			}
			//ADD Row 시에  check box handling 불가, 저장에만 이용
			sheetObj.SetCellEditable(intRows5, "b_fr_frt_check",0);
			//fr_inv_sum_amt 가 0 일 경우 warning
			warningTotalAmount(sheetObj, intRows5, 'b_fr_inv_sum_amt', sheetObj.GetCellValue(intRows5, 'b_fr_inv_sum_amt'));
			//focus 주기
			sheetObj.SelectCell(intRows5, 1);
		}
		//------[20130829 OJG]---------
		if(sheetObj.GetCellValue(intRows5, 'b_fr_aply_ut_cd') != "SCN"){	//Container 가 아니면.
			sheetObj.SetCellEditable(intRows5, "b_fr_cntr_tpsz_cd",0);
		}
		//------[20130829 OJG]---------
	}else if(doWhat=="DCROWADD"){
		if(frm1.intg_bl_seq.value=='' && typeof(frm1.bkg_entry_yn) == "undefined"){
			//Please enter a [HBL]!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_BLNO') + "\n\n: BL_FRT.560");
			return;
		}
		else{
			/* #45884 - [IML] BL Entry화면들의 [Freight] Tab의 New Row는 Active Row 다음으로 추가되기를
			var intRows5=sheetObj.LastRow() + 1; // +1
			var tmpRow=intRows5-1
			if(sheetObj.GetCellValue(tmpRow, "dc_fr_sell_buy_tp_cd")==''){
			  intRows5=tmpRow;
			}
			sheetObj.DataInsert(intRows5);
			*/
			
			var intRows5;
			
			var tmpRow = sheetObj.LastRow(); 
			
			if(sheetObj.GetCellValue(tmpRow, 'dc_fr_sell_buy_tp_cd')==''){
				intRows5 = tmpRow;
				sheetObj.DataInsert(intRows5);
			} else {
				intRows5 = sheetObj.DataInsert();
			}

			//2013.01.24  Lee,Hae Kyoung
			//Add 버튼 혹은 Tab 이동으로 Row Add 시 바로 위 row 의 customer, rate curr., Unit,  Curr., Ex.Rate 복사
			if(intRows5 > headerRowCnt){
				if (callVal != 'D') {
					if(sheetObj.GetCellValue(intRows5-1, "dc_fr_sell_buy_tp_cd") != ""){
						sheetObj.SetCellValue(intRows5, "dc_fr_sell_buy_tp_cd",sheetObj.GetCellValue(intRows5-1, "dc_fr_sell_buy_tp_cd"));
					}
					if(sheetObj.GetCellValue(intRows5-1, "dc_fr_trdp_cd") != ""){
						sheetObj.SetCellValue(intRows5, "dc_fr_trdp_cd",sheetObj.GetCellValue(intRows5-1, "dc_fr_trdp_cd"));
					}
					if(sheetObj.GetCellValue(intRows5-1, "dc_fr_aply_ut_cd") != ""){
						sheetObj.SetCellValue(intRows5, "dc_fr_aply_ut_cd",sheetObj.GetCellValue(intRows5-1, "dc_fr_aply_ut_cd"));
					}
					if(sheetObj.GetCellValue(intRows5, "dc_fr_aply_ut_cd") != "SCN" && sheetObj.GetCellValue(intRows5-1, "dc_fr_qty") != ""){
						sheetObj.SetCellValue(intRows5, "dc_fr_cntr_tpsz_cd",'',0);
						sheetObj.SetCellValue(intRows5, "dc_fr_qty",sheetObj.GetCellValue(intRows5-1, "dc_fr_qty"),0);
					}
				}
				if(sheetObj.GetCellValue(intRows5-1, "dc_fr_rat_curr_cd") != ""){
					sheetObj.SetCellValue(intRows5, "dc_fr_rat_curr_cd",sheetObj.GetCellValue(intRows5-1, "dc_fr_rat_curr_cd"),0);
				}
				if(sheetObj.GetCellValue(intRows5-1, "dc_fr_inv_curr_cd") != ""){
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_curr_cd",sheetObj.GetCellValue(intRows5-1, "dc_fr_inv_curr_cd"),0);
				}
				if(sheetObj.GetCellValue(intRows5-1, "dc_fr_inv_xcrt") != ""){
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_xcrt",sheetObj.GetCellValue(intRows5-1, "dc_fr_inv_xcrt"),0);
				}
				
				//#1840 - [PATENT] Pro Forma Profit Report - 오류사항
				if(typeof(frm1.bkg_entry_yn) != "undefined"){
					if(sheetObj.GetCellValue(intRows5-1, 'dc_fr_inv_xcrt_dt') != ""){
						sheetObj.SetCellValue(intRows5, "dc_fr_inv_xcrt_dt",sheetObj.GetCellValue(intRows5-1, "dc_fr_inv_xcrt_dt"),0);
					}
				}
			}
			//#3411 [JTC]Accounting & Performance 수정사항
			//Unit Blank 삭제에 따른 Default Code Setting
			else {
				if (air_sea_clss_cd == 'S') {
					sheetObj.SetCellValue(intRows5, "dc_fr_aply_ut_cd", "UNT");
				} else if (air_sea_clss_cd == 'A') {
					sheetObj.SetCellValue(intRows5, "dc_fr_aply_ut_cd", "AUN");
				}
			}

			if(sheetObj.GetCellValue(intRows5, 'dc_fr_rat_curr_cd') == ""){	//위 row 값이 없는 경우 Set
				//sheetObj.SetCellValue(intRows5, "dc_fr_rat_curr_cd",'USD',0);
				// IMPEX 요건 - OFC의 기준 통화가 EUR인 경우 DC엔 EUR로 표기 이외는 USD기본값
				if (ofc_curr_cd == "EUR") {
					sheetObj.SetCellValue(intRows5, "dc_fr_rat_curr_cd", ofc_curr_cd, 0);

					//#3563 BL - FREIGHT TAB - CURR 항목 디폴트 값 세팅 기능 개발
					if(MULTI_CURR_FLAG == "Y") {
						//#4203 [Great Luck v470 Test] Exchange Rate validation
						sheetObj.SetCellValue(intRows5, "dc_fr_inv_curr_cd", 'USD', 0);
					} else {
						sheetObj.SetCellValue(intRows5, "dc_fr_inv_curr_cd", ofc_curr_cd, 0);
					}
				} else {
					sheetObj.SetCellValue(intRows5, "dc_fr_rat_curr_cd",'USD', 0);
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_curr_cd", 'USD', 0);
				}
				
				/* 요구사항 #25606 : [B/L Entry] B/L에서의 Freight Input 시 Currency 선택 옵션 변경
				if(air_sea_clss_cd=="S" && bnd_clss_cd=="O"){
					sheetObj.SetCellValue(intRows5, "dc_fr_rat_curr_cd",'USD',0);
				}else{
					sheetObj.SetCellValue(intRows5, "dc_fr_rat_curr_cd",ofc_curr_cd,0);
				}*/

				//#3563 BL - FREIGHT TAB - CURR 항목 디폴트 값 세팅 기능 개발
				//if(MULTI_CURR_FLAG == "Y"){
				//	//#4203 [Great Luck v470 Test] Exchange Rate validation
				//	sheetObj.SetCellValue(intRows5, "dc_fr_inv_curr_cd", 'USD', 0);
				//}
			}


			var vDateName = frm1.xcrtDt.value;
			
			if (vDateName != "" && biz_clss_cd == "H") {
				var mYear = vDateName.substr(4,4)
				var mMonth = vDateName.substr(0,2);
				var mDay = vDateName.substr(2,2);
				vDateName = mYear+""+mMonth+""+mDay;
			}
			if(MULTI_CURR_FLAG == "Y"){	//[20141212 OJG]Muti Currency 
				if(frm1.xcrtDt.value.length == 8){
					var xcrtDt=frm1.xcrtDt.value.substr(4, 2) + frm1.xcrtDt.value.substr(6, 2) + frm1.xcrtDt.value.substr(0, 4);
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_xcrt_dt",xcrtDt,0);
				}else{
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_xcrt_dt",frm1.post_dt.value,0);
				}
			}else{
				sheetObj.SetCellValue(intRows5, "dc_fr_inv_xcrt_dt",vDateName,0);
			}
			
			//Japan Trust 470 테스트 
			//위 row 의 Ex.Date 의 값을 있을 경우그대로 Setting
			if(intRows5 > headerRowCnt){
				if(sheetObj.GetCellValue(intRows5-1, 'dc_fr_inv_xcrt_dt') != ""){
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_xcrt_dt",sheetObj.GetCellValue(intRows5-1, "dc_fr_inv_xcrt_dt"),0);
				}
			}			
			
			//#1840 - [PATENT] Pro Forma Profit Report - 오류사항
			if(typeof(frm1.bkg_entry_yn) != "undefined" && sheetObj.GetCellValue(intRows5, "dc_fr_inv_xcrt_dt") == ""){
				var bkg_dt_tm = frm1.bkg_dt_tm.value.replaceAll("-", "")
				var mYear = bkg_dt_tm.substr(4,4)
				var mMonth = bkg_dt_tm.substr(0,2);
				var mDay = bkg_dt_tm.substr(2,2);
				bkg_dt_tm = mYear+""+mMonth+""+mDay;
				sheetObj.SetCellValue(intRows5, "dc_fr_inv_xcrt_dt",bkg_dt_tm,0);
			}
			
			//#3411 [JTC]Accounting & Performance 수정사항
			//일단 주석처리..
			//sheetObj.SetCellValue(intRows5, "dc_fr_inv_curr_cd",sheetObj.GetCellValue(intRows5, 'dc_fr_rat_curr_cd'),0);
			//Japan Trust 470 테스트 
			if(sheetObj.GetCellValue(intRows5, "dc_fr_inv_xcrt") == '' || sheetObj.GetCellValue(intRows5, "dc_fr_inv_xcrt") == '0' ){
				
				//#3832 [JAPT] BL ENTRY - Freight tab,  Ex.rate 자동 표시 로직 보완
				var param = '';
				var tmp_dt = sheetObj.GetCellValue(intRows5, 'dc_fr_inv_xcrt_dt');
				param += '&cur_dt=' + tmp_dt;
				param += '&trf_cur_cd=' + sheetObj.GetCellValue(intRows5, 'dc_fr_rat_curr_cd');
				param += '&ofccurr_cd=' + sheetObj.GetCellValue(intRows5, 'dc_fr_inv_curr_cd');
				ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
				if(getXcrtRate==0){
					//#4060 [JAPT] AR INVOICE ENTRY					
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_xcrt",1,0);
				}else{
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_xcrt",getXcrtRate,0);
				}		
				
			}	
			
			/*
			 인보이스 환율은 Rate 환율로 보여준다. (이전로직 삭제)
			if(sheetObj.GetCellValue(intRows5, 'dc_fr_inv_curr_cd') == ""){	//위 row 값이 없는 경우 Set
				var add_curr_cd="";
				if(biz_clss_cd=="M"){
					add_curr_cd=frm1.h_curr_cd.value;
				}else{
					add_curr_cd=frm1.h_curr_cd.value;
					if(add_curr_cd == ""){
						add_curr_cd=frm1.h_mbl_curr_cd.value;
					}
				}
				if(add_curr_cd == ""){
					add_curr_cd=ofc_curr_cd;
				}
				if(air_sea_clss_cd=="S" && bnd_clss_cd=="O"){
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_curr_cd",'USD',0);
				}else{
					//sheetObj.CellValue2(intRows5, "dc_fr_inv_curr_cd") = frm1.ofc_curr.value;
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_curr_cd",add_curr_cd,0);
				}
			}
			if(sheetObj.GetCellValue(intRows5, 'dc_fr_inv_xcrt') == 0){	//위 row 값이 없는 경우 Set
				if(sheetObj.GetCellValue(intRows5, "dc_fr_rat_curr_cd")==sheetObj.GetCellValue(intRows5, "dc_fr_inv_curr_cd")){
					sheetObj.SetCellValue(intRows5, "dc_fr_inv_xcrt",1,0);
				}
			}
			*/
			sheetObj.SetCellValue(intRows5, "dc_fr_auto_trf_flg",'N',0);
			sheetObj.SetCellValue(intRows5, "dc_fr_perf_curr_cd",dfPerfCurr,0);
			sheetObj.SetCellValue(intRows5, "dc_fr_perf_xcrt",0,0);
			sheetObj.SetCellValue(intRows5, "dc_fr_perf_amt",0,0);
			sheetObj.SetCellValue(intRows5, "dc_fr_perf_vat_amt",0,0);
			//2011.12.14  Kim,Jin-Hyuk
			sheetObj.SetCellValue(intRows5, 'dc_fr_frt_term_cd','CC',0);
			//2014.05.06 OYH #29339
			//OEM BL Type이 FORWARDING 인 경우 FRT의 DC의 ADD시 TRDP를 Destnation Agent로 설정한다.
			if (air_sea_clss_cd=="S" && biz_clss_cd=="M" && bnd_clss_cd=="O"){
				if(typeof(frm1.hbl_tp_cd) != "undefined"){
					var bltype=frm1.hbl_tp_cd.value;
					if (bltype == "DR" || bltype == "DT" || bltype == "FW") {
						sheetObj.SetCellValue(intRows5, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd.value);
						sheetObj.SetCellValue(intRows5, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm.value);
					}
				}
			}
			
			// #1863 - [PATENT] Freight Tab - 오류 및 개선사항
			if(typeof(frm1.bkg_entry_yn) != "undefined"){
				if(biz_clss_cd=="H"){
					sheetObj.SetCellValue(intRows5, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd.value);
					sheetObj.SetCellValue(intRows5, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm.value);
				}
			}
			
			//2012.12.28 LHK
			if(sheetObj.GetCellValue(intRows5, 'dc_fr_trdp_cd') == ""){	//위 row 값이 없는 경우 Set
				if(biz_clss_cd=="M"){
					if(bnd_clss_cd=="O"){
						sheetObj.SetCellValue(intRows5, 'dc_fr_trdp_cd',frm1.cnee_trdp_cd.value);
					}else if(bnd_clss_cd=="I"){
						sheetObj.SetCellValue(intRows5, 'dc_fr_trdp_cd',frm1.shpr_trdp_cd.value);
					}
				}else if(biz_clss_cd=="H"){
					if(typeof(frm1.prnr_trdp_cd2)!='undefined' && frm1.prnr_trdp_cd2.value!=''){
						sheetObj.SetCellValue(intRows5, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd2.value);
					}else{
						sheetObj.SetCellValue(intRows5, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd.value);
					}
				}else{
					sheetObj.SetCellValue(intRows5, 'dc_fr_trdp_cd','',0);
					sheetObj.SetCellValue(intRows5, 'dc_fr_trdp_nm','',0);
				}
			}	
			if(sheetObj.GetCellValue(intRows5, 'dc_fr_aply_ut_cd') == ""){	//위 row 값이 없는 경우 Set
				if(air_sea_clss_cd=="A"){
					//----------[20130208 OJG]-----------------------------------
					//LHK 20122026 오류수정
					if(bnd_clss_cd=="O" && biz_clss_cd=="H"){
						if(frm1.customer_unit_chk[0].checked){
							sheetObj.SetCellValue(intRows5, 'dc_fr_aply_ut_cd',"ACW",0);
							sheetObj.SetCellValue(intRows5, 'dc_fr_qty',frm1.chg_wgt.value,0);
						}else if(frm1.customer_unit_chk[1].checked){
							sheetObj.SetCellValue(intRows5, 'dc_fr_aply_ut_cd',"ACL",0);
							sheetObj.SetCellValue(intRows5, 'dc_fr_qty',frm1.chg_wgt1.value,0);
						}
					}else{
						sheetObj.SetCellValue(intRows5, 'dc_fr_aply_ut_cd',"ACW",0);
						sheetObj.SetCellValue(intRows5, 'dc_fr_qty',frm1.chg_wgt.value,0);
					}
					//----------[20130208 OJG]-----------------------------------
				}
			}
			//ADD Row 시에  check box handling 불가, 저장에만 이용
			sheetObj.SetCellEditable(intRows5, "dc_fr_frt_check",0);
		}
		//fr_inv_sum_amt 가 0 일 경우 warning
		//Revenue 일 경우 
		if(sheetObj.GetCellValue(intRows5, 'dc_fr_sell_buy_tp_cd') == "D"){
			//fr_inv_sum_amt 가 0 일 경우 warning
			warningTotalAmount(sheetObj, intRows5, 'dc_fr_inv_sum_amt', sheetObj.GetCellValue(intRows5, 'dc_fr_inv_sum_amt'));
			sheetObj.SetCellBackColor(intRows5, 'dc_fr_agent_amt',sheetObj.GetDataBackColor());
			//Credit 입력 제한 
			//sheetObj.SetCellEditable(intRows5, "dc_fr_ru",1);
			//sheetObj.SetCellValue(intRows5, 'dc_fr_agent_ru',0);
			//sheetObj.SetCellEditable(intRows5, "dc_fr_agent_ru",0);
			sheetObj.SetCellEditable(intRows5, "dc_fr_inv_sum_amt",1);
			sheetObj.SetCellValue(intRows5, 'dc_fr_agent_amt',0);
			sheetObj.SetCellEditable(intRows5, "dc_fr_agent_amt",0);
		}	
		//Cost 일 경우 
		if(sheetObj.GetCellValue(intRows5, 'dc_fr_sell_buy_tp_cd') == "C"){
			//fr_inv_sum_amt 가 0 일 경우 warning
			warningTotalAmount(sheetObj, intRows5, 'dc_fr_agent_amt', sheetObj.GetCellValue(intRows5, 'dc_fr_agent_amt'));
			sheetObj.SetCellBackColor(intRows5, 'dc_fr_inv_sum_amt',sheetObj.GetDataBackColor());
			//Debit 입력 제한
			//sheetObj.SetCellValue(intRows5, 'dc_fr_ru',0);
			//sheetObj.SetCellEditable(intRows5, "dc_fr_ru",0);
			//sheetObj.SetCellEditable(intRows5, "dc_fr_agent_ru",1);
			sheetObj.SetCellEditable(intRows5, "dc_fr_inv_sum_amt",0);
			sheetObj.SetCellValue(intRows5, 'dc_fr_inv_sum_amt',0);
			sheetObj.SetCellEditable(intRows5, "dc_fr_agent_amt",1);
		}
		//focus 주기
		sheetObj.SelectCell(intRows5, 1);
		//------[20130829 OJG]---------
		if(sheetObj.GetCellValue(intRows5, 'dc_fr_aply_ut_cd') != "SCN"){	//Container 가 아니면.
			sheetObj.SetCellEditable(intRows5, "dc_fr_cntr_tpsz_cd",0);
		}
		//------[20130829 OJG]---------
	}
}
//#993 [SHINE] B/L Freight 탭 A/R, A/P <-> D/C 간 항목 복사 기능

function frtRowCopy(doWhat, copyObj, sheetObj, sheetObj2, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd){

	var copyPfx = "";
	var objPfx = "";
		
	if(doWhat=="DC"){
		copyPfx ="dc_";					
		var rowCnt = 0; 
		
		for(var i=headerRowCnt; i < copyObj.LastRow() + 1; i++){	
			if(copyObj.GetCellValue(i, copyPfx+"fr_frt_check") == 1){
				
				if (copyObj.GetCellValue(i, copyPfx+"fr_sell_buy_tp_cd") == "C"){//AR로 이동
					objPfx = "";
					rowCnt = sheetObj.LastRow()+1; 
					
					/* Billing Code 확인  Start */
					var param='&air_sea_clss_cd=' + air_sea_clss_cd;
					param += '&bnd_clss_cd=' + bnd_clss_cd;
					param += '&biz_clss_cd=' + biz_clss_cd;
					param += '&tabStr=' + objPfx;
					param += '&s_code=' + copyObj.GetCellValue(i, copyPfx+"fr_frt_cd");
					ajaxSendPost(getFrtCdAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getFrtCdInfo' + param, './GateServlet.gsl');
					/* Billing Code 확인  End */
					
					if (trdp_cd!=""){ 
						sheetObj.DataInsert(rowCnt);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_sell_buy_tp_cd", "S");
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_ru", copyObj.GetCellValue(i, copyPfx+"fr_ru"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_agent_ru", copyObj.GetCellValue(i, copyPfx+"fr_agent_ru"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_sum_amt", copyObj.GetCellValue(i, copyPfx+"fr_inv_sum_amt"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_agent_amt", copyObj.GetCellValue(i, copyPfx+"fr_agent_amt"),0);
						warningTotalAmount(sheetObj, rowCnt, objPfx+"fr_inv_sum_amt", sheetObj.GetCellValue(rowCnt, objPfx+"fr_inv_sum_amt"));
						warningTotalAmount(sheetObj, rowCnt, objPfx+"fr_agent_amt", sheetObj.GetCellValue(rowCnt, objPfx+"fr_agent_amt"));
						// Bill to 설정 - Customer					
						if(sheetObj.LastRow() > headerRowCnt){ //위 row값이 있을 경우
							if(sheetObj.GetCellValue(rowCnt-1, objPfx+"fr_trdp_cd") != ""){
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",sheetObj.GetCellValue(rowCnt-1, objPfx+"fr_trdp_cd"));
							}
						}			
						if(sheetObj.GetCellValue(rowCnt, objPfx+"fr_trdp_cd") == ""){	//위 row 값이 없는 경우 Set
							if(biz_clss_cd == "H" || (air_sea_clss_cd == "S" && bnd_clss_cd == "O" && biz_clss_cd == "M")){
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.act_shpr_trdp_cd.value);
							}else{
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",'',0);
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_nm",'',0);
							}
						}
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd", copyObj.GetCellValue(i, copyPfx+"fr_frt_cd"),0);	
						//#1824 [Split - 1] [PATENT]Freight Local Name 적용(AR, AP)
						//sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd_nm", copyObj.GetCellValue(i, copyPfx+"fr_frt_cd_nm"),0);	
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd_nm", frt_cd_locl_nm,0);	
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_aply_ut_cd", copyObj.GetCellValue(i, copyPfx+"fr_aply_ut_cd"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_cntr_tpsz_cd", copyObj.GetCellValue(i, copyPfx+"fr_cntr_tpsz_cd"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_term_cd", copyObj.GetCellValue(i, copyPfx+"fr_frt_term_cd"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_rat_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_rat_curr_cd"),0);										
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_trf_cur_sum_amt", copyObj.GetCellValue(i, copyPfx+"fr_trf_cur_sum_amt"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_inv_curr_cd"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_xcrt", copyObj.GetCellValue(i, copyPfx+"fr_inv_xcrt"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_xcrt_dt", copyObj.GetCellValue(i, copyPfx+"fr_inv_xcrt_dt"),0);				
						//sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_no", copyObj.GetCellValue(i, copyPfx+"fr_inv_no"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_sts_cd", "FI",0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_sts_nm", "FREIGHT QUOTED",0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_perf_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_perf_curr_cd"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_vat_rt", copyObj.GetCellValue(i, copyPfx+"fr_vat_rt"),0);
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_qty", copyObj.GetCellValue(i, copyPfx+"fr_qty"));
	
						rowCnt++;  
					}
					
				}else if (copyObj.GetCellValue(i, copyPfx+"fr_sell_buy_tp_cd") == "D"){	//AP로 이동				
					objPfx = "b_";
					rowCnt = sheetObj2.LastRow()+1;
					/* Billing Code 확인  Start */
					var param='&air_sea_clss_cd=' + air_sea_clss_cd;
					param += '&bnd_clss_cd=' + bnd_clss_cd;
					param += '&biz_clss_cd=' + biz_clss_cd;
					param += '&tabStr=' + objPfx;
					param += '&s_code=' + copyObj.GetCellValue(i, copyPfx+"fr_frt_cd");
					ajaxSendPost(getFrtCdAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getFrtCdInfo' + param, './GateServlet.gsl');
					/* Billing Code 확인  End */
					
					if (trdp_cd!=""){
						sheetObj2.DataInsert(rowCnt);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_sell_buy_tp_cd", "B");	
						//sheetObj2.SetCellValue(rowCnt, objPfx+"fr_ru", copyObj.GetCellValue(i, copyPfx+"fr_agent_ru"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_ru", copyObj.GetCellValue(i, copyPfx+"fr_ru"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_agent_ru", copyObj.GetCellValue(i, copyPfx+"fr_ru"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_inv_sum_amt", copyObj.GetCellValue(i, copyPfx+"fr_agent_amt"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_agent_amt", copyObj.GetCellValue(i, copyPfx+"fr_inv_sum_amt"),0);
						warningTotalAmount(sheetObj2, rowCnt, objPfx+"fr_inv_sum_amt", sheetObj2.GetCellValue(rowCnt, objPfx+"fr_inv_sum_amt"));
						warningTotalAmount(sheetObj2, rowCnt, objPfx+"fr_agent_amt", sheetObj2.GetCellValue(rowCnt, objPfx+"fr_agent_amt"));
						// Remit to 설정 - Vendor
						if(sheetObj2.LastRow() > headerRowCnt){ //위 row값이 있을 경우
							if(sheetObj2.GetCellValue(rowCnt-1, objPfx+"fr_trdp_cd") != ""){
								sheetObj2.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",sheetObj2.GetCellValue(rowCnt-1, objPfx+"fr_trdp_cd"));
							}
						}
						if(biz_clss_cd=="M"){
							sheetObj2.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.carr_trdp_cd.value); 
							sheetObj2.SetCellValue(rowCnt, objPfx+"fr_trdp_nm",frm1.carr_trdp_nm.value);
						}
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_frt_cd", copyObj.GetCellValue(i, copyPfx+"fr_frt_cd"),0);	
						//#1824 [Split - 1] [PATENT]Freight Local Name 적용(AR, AP)
						//sheetObj2.SetCellValue(rowCnt, objPfx+"fr_frt_cd_nm", copyObj.GetCellValue(i, copyPfx+"fr_frt_cd_nm"),0);	
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_frt_cd_nm", frt_cd_locl_nm,0);	
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_aply_ut_cd", copyObj.GetCellValue(i, copyPfx+"fr_aply_ut_cd"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_cntr_tpsz_cd", copyObj.GetCellValue(i, copyPfx+"fr_cntr_tpsz_cd"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_frt_term_cd", copyObj.GetCellValue(i, copyPfx+"fr_frt_term_cd"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_rat_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_rat_curr_cd"),0);				
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_trf_cur_sum_amt", copyObj.GetCellValue(i, copyPfx+"fr_trf_cur_sum_amt"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_inv_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_inv_curr_cd"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_inv_xcrt", copyObj.GetCellValue(i, copyPfx+"fr_inv_xcrt"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_inv_xcrt_dt", copyObj.GetCellValue(i, copyPfx+"fr_inv_xcrt_dt"),0);				
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_inv_no", copyObj.GetCellValue(i, copyPfx+"fr_inv_no"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_inv_sts_cd", "FI",0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_inv_sts_nm", "FREIGHT QUOTED",0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_perf_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_perf_curr_cd"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_vat_rt", copyObj.GetCellValue(i, copyPfx+"fr_vat_rt"),0);
						sheetObj2.SetCellValue(rowCnt, objPfx+"fr_qty", copyObj.GetCellValue(i, copyPfx+"fr_qty"));
	
						rowCnt++;  
					}
				}				
         
			}
			afterRowAdd('AP');
			afterRowAdd('AR');
		}//end for
	}else if(doWhat=="AR"){
		copyPfx = "";
		objPfx = "dc_";
		
		var rowCnt = 0; 
		rowCnt = sheetObj.LastRow()+1;
		for(var i=headerRowCnt; i < copyObj.LastRow() + 1; i++){			

			if(copyObj.GetCellValue(i, copyPfx+"fr_frt_check") == 1){
				/* Billing Code 확인  Start */
				var param='&air_sea_clss_cd=' + air_sea_clss_cd;
				param += '&bnd_clss_cd=' + bnd_clss_cd;
				param += '&biz_clss_cd=' + biz_clss_cd;
				param += '&tabStr=' + objPfx;
				param += '&s_code=' + copyObj.GetCellValue(i, copyPfx+"fr_frt_cd");
				ajaxSendPost(getFrtCdAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getFrtCdInfo' + param, './GateServlet.gsl');
				/* Billing Code 확인  End */
				
				if (trdp_cd!=""){	
				
					sheetObj.DataInsert(rowCnt);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_sell_buy_tp_cd", "D");						
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd", copyObj.GetCellValue(i, copyPfx+"fr_frt_cd"),0);
					//#1824 [Split - 1] [PATENT]Freight Local Name 적용(AR, AP)
					//sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd_nm", copyObj.GetCellValue(i, copyPfx+"fr_frt_cd_nm"),0);
					//sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd_nm", frt_cd_nm,0);
					//#4194 [JAPT] VAT checked missing, Freight name 's not being copied.
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd_nm", copyObj.GetCellValue(i, copyPfx+"fr_frt_cd_nm"),0);
	
					
					
					// Agent 설정 
					//OEM BL Type이 FORWARDING 인 경우 FRT의 DC의 ADD시 TRDP를 Destnation Agent로 설정한다.
					if(sheetObj.LastRow() > headerRowCnt){ //위 row값이 있을 경우
						if(sheetObj.GetCellValue(rowCnt-1, objPfx+"fr_trdp_cd") != ""){
							sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",sheetObj.GetCellValue(rowCnt-1, objPfx+"fr_trdp_cd"));
						}
					}
	
					if (air_sea_clss_cd=="S" && biz_clss_cd=="M" && bnd_clss_cd=="O"){
						if(typeof(frm1.hbl_tp_cd) != "undefined"){
							var bltype=frm1.hbl_tp_cd.value;
							if (bltype == "DR" || bltype == "DT" || bltype == "FW") {
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.prnr_trdp_cd.value);
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_nm",frm1.prnr_trdp_nm.value);
							}
						}
					}
					if(sheetObj.GetCellValue(rowCnt, objPfx+"fr_trdp_cd") == ""){	//위 row 값이 없는 경우 Set
						if(biz_clss_cd=="M"){
							if(bnd_clss_cd=="O"){
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.cnee_trdp_cd.value);
							}else if(bnd_clss_cd=="I"){
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.shpr_trdp_cd.value);
							}
						}else if(biz_clss_cd=="H"){
							if(typeof(frm1.prnr_trdp_cd2)!='undefined' && frm1.prnr_trdp_cd2.value!=''){
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.prnr_trdp_cd2.value);
							}else{
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.prnr_trdp_cd.value);
							}
						}else{
							sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",'',0);
							sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_nm",'',0);
						}
					}
					
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_aply_ut_cd", copyObj.GetCellValue(i, copyPfx+"fr_aply_ut_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_cntr_tpsz_cd", copyObj.GetCellValue(i, copyPfx+"fr_cntr_tpsz_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_term_cd", copyObj.GetCellValue(i, copyPfx+"fr_frt_term_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_rat_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_rat_curr_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_ru", copyObj.GetCellValue(i, copyPfx+"fr_ru"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_agent_ru", copyObj.GetCellValue(i, copyPfx+"fr_agent_ru"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_trf_cur_sum_amt", copyObj.GetCellValue(i, copyPfx+"fr_trf_cur_sum_amt"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_inv_curr_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_xcrt", copyObj.GetCellValue(i, copyPfx+"fr_inv_xcrt"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_xcrt_dt", copyObj.GetCellValue(i, copyPfx+"fr_inv_xcrt_dt"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_sum_amt", copyObj.GetCellValue(i, copyPfx+"fr_inv_sum_amt"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_agent_amt", copyObj.GetCellValue(i, copyPfx+"fr_agent_amt"),0);
					warningTotalAmount(sheetObj, rowCnt, objPfx+"fr_inv_sum_amt", sheetObj.GetCellValue(rowCnt, objPfx+"fr_inv_sum_amt"));
					//warningTotalAmount(sheetObj, rowCnt, objPfx+"fr_agent_amt", sheetObj.GetCellValue(rowCnt, objPfx+"fr_agent_amt"));
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_no", copyObj.GetCellValue(i, copyPfx+"fr_inv_no"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_sts_cd", "FI",0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_sts_nm", "FREIGHT QUOTED",0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_perf_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_perf_curr_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_vat_rt", copyObj.GetCellValue(i, copyPfx+"fr_vat_rt"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_qty", copyObj.GetCellValue(i, copyPfx+"fr_qty"));
	
					rowCnt++;      
				}
			}
		}//end for
		afterRowAdd('DC');
	}else if(doWhat=="AP"){
		copyPfx ="b_";
		objPfx = "dc_";
		
		var rowCnt = 0; 
		rowCnt = sheetObj.LastRow()+1;
		for(var i=headerRowCnt; i < copyObj.LastRow() + 1; i++){			

			if(copyObj.GetCellValue(i, copyPfx+"fr_frt_check") == 1){
				/* Billing Code 확인  Start */
				var param='&air_sea_clss_cd=' + air_sea_clss_cd;
				param += '&bnd_clss_cd=' + bnd_clss_cd;
				param += '&biz_clss_cd=' + biz_clss_cd;
				param += '&tabStr=' + objPfx;
				param += '&s_code=' + copyObj.GetCellValue(i, copyPfx+"fr_frt_cd");
				ajaxSendPost(getFrtCdAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getFrtCdInfo' + param, './GateServlet.gsl');
				/* Billing Code 확인  End */
				
				if (trdp_cd!=""){

					sheetObj.DataInsert(rowCnt);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_sell_buy_tp_cd", "C");						
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd", copyObj.GetCellValue(i, copyPfx+"fr_frt_cd"),0);
					//#1824 [Split - 1] [PATENT]Freight Local Name 적용(AR, AP)
					//sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd_nm", copyObj.GetCellValue(i, copyPfx+"fr_frt_cd_nm"),0);
					//sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd_nm", frt_cd_nm,0);
					//#4194 [JAPT] VAT checked missing, Freight name 's not being copied.
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_cd_nm", copyObj.GetCellValue(i, copyPfx+"fr_frt_cd_nm"),0);					
					// Agent 설정 
					//OEM BL Type이 FORWARDING 인 경우 FRT의 DC의 ADD시 TRDP를 Destnation Agent로 설정한다.
					if(sheetObj.GetCellValue(rowCnt-1, objPfx+"fr_trdp_cd") != ""){
						sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",sheetObj.GetCellValue(rowCnt-1, objPfx+"fr_trdp_cd"));
					}
					
					if (air_sea_clss_cd=="S" && biz_clss_cd=="M" && bnd_clss_cd=="O"){
						if(typeof(frm1.hbl_tp_cd) != "undefined"){
							var bltype=frm1.hbl_tp_cd.value;
							if (bltype == "DR" || bltype == "DT" || bltype == "FW") {
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.prnr_trdp_cd.value);
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_nm",frm1.prnr_trdp_nm.value);
							}
						}
					}
					if(sheetObj.GetCellValue(rowCnt, objPfx+"fr_trdp_cd") == ""){	//위 row 값이 없는 경우 Set
						if(biz_clss_cd=="M"){
							if(bnd_clss_cd=="O"){
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.cnee_trdp_cd.value);
							}else if(bnd_clss_cd=="I"){
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.shpr_trdp_cd.value);
							}
						}else if(biz_clss_cd=="H"){
							if(typeof(frm1.prnr_trdp_cd2)!='undefined' && frm1.prnr_trdp_cd2.value!=''){
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.prnr_trdp_cd2.value);
							}else{
								sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",frm1.prnr_trdp_cd.value);
							}
						}else{
							sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_cd",'',0);
							sheetObj.SetCellValue(rowCnt, objPfx+"fr_trdp_nm",'',0);
						}
					}
					
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_aply_ut_cd", copyObj.GetCellValue(i, copyPfx+"fr_aply_ut_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_cntr_tpsz_cd", copyObj.GetCellValue(i, copyPfx+"fr_cntr_tpsz_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_frt_term_cd", copyObj.GetCellValue(i, copyPfx+"fr_frt_term_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_rat_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_rat_curr_cd"),0);
					//sheetObj.SetCellValue(rowCnt, objPfx+"fr_ru", copyObj.GetCellValue(i, copyPfx+"fr_agent_ru"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_ru", copyObj.GetCellValue(i, copyPfx+"fr_ru"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_agent_ru", copyObj.GetCellValue(i, copyPfx+"fr_ru"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_trf_cur_sum_amt", copyObj.GetCellValue(i, copyPfx+"fr_trf_cur_sum_amt"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_inv_curr_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_xcrt", copyObj.GetCellValue(i, copyPfx+"fr_inv_xcrt"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_xcrt_dt", copyObj.GetCellValue(i, copyPfx+"fr_inv_xcrt_dt"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_sum_amt", copyObj.GetCellValue(i, copyPfx+"fr_agent_amt"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_agent_amt", copyObj.GetCellValue(i, copyPfx+"fr_inv_sum_amt"),0);
					//warningTotalAmount(sheetObj, rowCnt, objPfx+"fr_inv_sum_amt", sheetObj.GetCellValue(rowCnt, objPfx+"fr_inv_sum_amt"));
					warningTotalAmount(sheetObj, rowCnt, objPfx+"fr_agent_amt", sheetObj.GetCellValue(rowCnt, objPfx+"fr_agent_amt"));
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_no", copyObj.GetCellValue(i, copyPfx+"fr_inv_no"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_sts_cd", "FI",0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_inv_sts_nm", "FREIGHT QUOTED",0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_perf_curr_cd", copyObj.GetCellValue(i, copyPfx+"fr_perf_curr_cd"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_vat_rt", copyObj.GetCellValue(i, copyPfx+"fr_vat_rt"),0);
					sheetObj.SetCellValue(rowCnt, objPfx+"fr_qty", copyObj.GetCellValue(i, copyPfx+"fr_qty"));
	
					rowCnt++;  
				}
			}
		}//end for
		afterRowAdd('DC');
	}

	
}
/**
 * LHK, Total Amount 가 0 일 경우 warning
 */
function warningTotalAmount(sheet, row, col, amt){
	if(amt == 0){
		sheet.SetCellBackColor(row, col,"#FFB9B9");
	}else{
		sheet.SetCellBackColor(row, col,sheet.GetDataBackColor());
	}
}
/**
 * 열 추가시 Container 번호가 Container List에 있는지 확인함
 */
/*
function cntrSelect(objPfx){
	var cntrSize=docObjects[2].LastRow();
	var usedTpSz='';
	//Container Sheet이 조회가된 이후에 처리
	if(cntrSize>1){
		var hasCntr=false;
		var cntrTpsz=' |';
		var cntrLabel=' |';
		if(cntrSize>1){
			for(var i=1; i < cntrSize; i++){
var tmpTpsz=docObjects[2].GetCellValue(i, 'cntr_tpsz_cd');
				if( tmpTpsz!=''&&usedTpSz.indexOf(tmpTpsz)==-1){
					if(hasCntr){
						cntrTpsz    += '|';
						cntrLabel += '|';
					}else{
						hasCntr=true;
					}
					cntrTpsz  += tmpTpsz;
					cntrLabel += tmpTpsz;
				}
			}
			if(hasCntr){
				if(objPfx==''){
					getSdSheet().InitDataCombo (0, 'fr_cntr_tpsz_cd', cntrTpsz, cntrLabel);
				}else{
					getBcSheet().InitDataCombo (0, 'b_fr_cntr_tpsz_cd', cntrTpsz, cntrLabel);	
				}
			}
		}else{
			//먼저 Container List를 등록하여 주십시오!
		}
	}
}
*/
/**
 * 기본 세률 조회
 */
function setTaxRate(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	var sheetObj=getSdSheet();
    	if(frm1.objPfx.value=='b_'){
    		sheetObj=getBcSheet();
    	}
    	var cellNm=frm1.objPfx.value+"fr_vat_rt";
		sheetObj.SetCellValue(frm1.curRow2.value, cellNm,doc[1]);
    }
}
//Total을 처리함
function doSumFrt(sheetObj, dispType, objPfx){
	var invSell=0;
	var invDebit=0;
	var invTotal=0;
	var invVat=0;
	var pefSell=0;
	var pefDebit=0;
	var pefTotal=0;
	var pefVat=0;
	var cmpType1='S';
	var cmpType2='D';
	//Buying/Credit인 경우
	if(dispType==2){
		cmpType1='B';
		cmpType2='C';
	}
	for(var i=2; i < sheetObj.LastRow()+1; i++){
		//Selling or Buying
	if(sheetObj.GetCellValue(i, objPfx+"fr_sell_buy_tp_cd")==cmpType1){
		invSell=parseFloat(invSell)+parseFloat(rmMoneyFmt(sheetObj.GetCellValue(i, objPfx+"fr_inv_amt"))); //AMT
		pefSell=parseFloat(pefSell)+parseFloat(rmMoneyFmt(sheetObj.GetCellValue(i, objPfx+"fr_perf_amt")));	//AMT
		//Debit or Credit
	}else if(sheetObj.GetCellValue(i, objPfx+"fr_sell_buy_tp_cd")==cmpType2){
		invDebit=parseFloat(invDebit)+parseFloat(rmMoneyFmt(sheetObj.GetCellValue(i, objPfx+"fr_inv_amt"))); //AMT
		pefDebit=parseFloat(pefDebit)+parseFloat(rmMoneyFmt(sheetObj.GetCellValue(i, objPfx+"fr_perf_amt")));	//AMT
		}
	}	
	var invTot=0;
	if(obdtCur>0){
		invTot=getDivideFloat(invSell, obdtCur);
		invTot=strToFloatByNDecimalTp(invTot, 100);
	}
	//화면에 데이터 표시
	/*
	if(dispType==1){
		frm1.inv_sell.value=doMoneyFmt(invTot);
		frm1.inv_debit.value=doMoneyFmt(invDebit);	
		frm1.inv_total.value=doMoneyFmt(strToFloatByNDecimalTp(getSumFloat(invTot, invDebit), 100));
		frm1.pef_sell.value=doMoneyFmt(pefSell);
		frm1.pef_debit.value=doMoneyFmt(pefDebit);	
		frm1.pef_total.value=doMoneyFmt(getSumFloat(pefSell, pefDebit));
	}else{
		frm1.b_inv_sell.value=doMoneyFmt(invTot);
		frm1.b_inv_debit.value=doMoneyFmt(invDebit);	
		frm1.b_inv_total.value=doMoneyFmt(strToFloatByNDecimalTp(getSumFloat(invTot, invDebit), 100));
		frm1.b_pef_sell.value=doMoneyFmt(pefSell);
		frm1.b_pef_debit.value=doMoneyFmt(pefDebit);	
		frm1.b_pef_total.value=doMoneyFmt(getSumFloat(pefSell, pefDebit));
	}
	*/
	//Profit 표시
	//dispProfit();
}
function dispProfit(){
	var doSb=false;
	//selling-buying
	if(frm1.inv_sell.value!=''){
		var sbSum=0;
		if(obdtCur!=0){
			sbSum=parseFloat(rmMoneyFmt(frm1.inv_sell.value))-parseFloat(rmMoneyFmt(frm1.b_inv_sell.value));
		}
		sbSum=strToFloatByNDecimalTp(sbSum, 100);
	    frm1.sb_usd.value=doMoneyFmt(sbSum);
	    doSb=true;
	}
	//debit-credit
	var doDc=false;
	if(frm1.inv_debit.value!=''){
		var dcSum=0; 
		if(obdtCur!=0){	
			dcSum=parseFloat(rmMoneyFmt(frm1.inv_debit.value))-parseFloat(rmMoneyFmt(frm1.b_inv_debit.value));
		}
		dcSum=strToFloatByNDecimalTp(dcSum, 100);
		frm1.dc_usd.value=doMoneyFmt(dcSum);
		doDc=true;
	}
	//Profit
	if(doSb||doDc){
		if(!doSb){
			sbSum=0;
		}
		if(!doDc){
			dcSum=0;
		}
		var profSum=parseFloat(sbSum)+parseFloat(dcSum);
		profSum=strToFloatByNDecimalTp(profSum, 100);
		frm1.profit.value=doMoneyFmt(profSum);
	}
}
function mutiSheetOnClick(sheetObj, row, col, objPfx) {
	var colStr=sheetObj.ColSaveName(col);
	//Type/Size 선택시
	if(colStr==objPfx+"fr_cntr_tpsz_cd"){
		if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")!='SCN' && sheetObj.GetCellEditable(row, objPfx+"fr_cntr_tpsz_cd") == true){
			//Please check Unit Type.
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_UNTP') + "\n\n: BL_FRT.798");
			sheetObj.SelectCell(row, objPfx+"fr_aply_ut_cd")
			return;
		}
	//Rate 선택시
	}else if(colStr==objPfx+"fr_ru"){
		//Unit 확인
		if(sheetObj.GetCellValue(row, objPfx+"fr_qty")==''){
			//Please enter \"Volume!\"!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_VOLM') + "\n\n: BL_FRT.809");
		}
	//Invoice /Performance 선택시
	}else if(colStr==objPfx+"fr_inv_xcrt"||colStr==objPfx+"fr_inv_vat_amt"||colStr==objPfx+"fr_perf_xcrt"||colStr==objPfx+"fr_perf_vat_amt"){
		//Volume을 확인한다.
		if(sheetObj.GetCellValue(row, objPfx+"fr_qty")==''){
			//Please enter \"Volume!\"!
			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_VOLM') + "\n\n: BL_FRT.818");
			sheetObj.SelectCell(row, objPfx+"qty");
		}else {
			//Invoice Amt
			if(col==objPfx+"fr_inv_vat_amt"){
				if(sheetObj.GetCellValue(row, objPfx+"fr_inv_xcrt")==''){
					//Please enter \"Invoice exchange rate\"!
					alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_EXRT') + "\n\n: BL_FRT.826");
					sheetObj.SelectCell(row, objPfx+"fr_inv_xcrt");
				}
			//Performace Amt
			}else if(col==objPfx+"fr_perf_vat_amt"){
				if(sheetObj.GetCellValue(row, objPfx+"fr_perf_xcrt")==''){
					//Please enter \"Performed exchange rate!\"!
					alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_EXRT') + "\n\n: BL_FRT.836");
					sheetObj.SelectCell(row, objPfx+"fr_perf_xcrt");
				}
			}			
		}
	}
}
/**
 * Double Click Evnet처리
 */
function mutiSheetDblClick(sheetObj, row, col, objPfx) {
	/*
	var colStr=sheetObj.ColSaveName(col);
	if(colStr==objPfx+"fr_inv_no"){
if(sheetObj.GetCellValue(row, objPfx+"fr_inv_no")!=''){
if(sheetObj.GetCellValue(row, objPfx+"fr_inv_seq") != ""){
        		if(objPfx!="b_"){
        			ajaxSendPost(setRefCntCd,  'reqVal', '&goWhere=aj&bcKey=searchOfcCntCd&f_ref_ofc_cd=' + frm1.ref_ofc_cd.value, './GateServlet.gsl');
var inv_seq=sheetObj.GetCellValue(row, objPfx+"fr_inv_seq");
var inv_no=sheetObj.GetCellValue(row, objPfx+"fr_inv_no");
        			if(objPfx==""){
        				var print_type='LOCAL';
        			}else if(objPfx=="dc_"){
        				var print_type='CR/DB';
        			}
        			var bl_cnt_cd=frm1.h_ofc_cnt_cd.value;
        			var ref_ofc_cd=frm1.ref_ofc_cd.value;
        			var oth_seq='';
var trdp_cd=sheetObj.GetCellValue(row, objPfx+"fr_trdp_cd");
        			var reqParam='?f_inv_no='+ inv_no+'&f_print_type=' + print_type + '&f_inv_seq=' + inv_seq + '&f_bl_cnt_cd=' + bl_cnt_cd + '&f_ref_ofc_cd=' + ref_ofc_cd+ '&f_oth_seq=' + oth_seq + '&f_trdp_cd='+ trdp_cd;
        			popGET('ACC_INV_0050.clt'+reqParam, '', 390, 250, "scroll:yes;status:no;help:no;");
        		}
        	}
		}
	}
	*/
}
function setRefCntCd(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	frm1.h_ofc_cnt_cd.value=doc[1];
    }
}
/**
 * 팝업처리  BL_CODE_UTIL.js 파일의 전역변수 사용 ( cur_sheetObj / cur_rowIdx / cur_colIdx)
 */
function mutiSheetOnPopupClick(sheetObj, row, col, objPfx, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd, free) { //(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
	cur_sheetObj = sheetObj;
	cur_rowIdx = row;
	cur_colIdx = col;
	cur_objPfx = objPfx;
	var colStr=sheetObj.ColSaveName(col);
	//Freight Code조회
	if(colStr==objPfx+"fr_frt_cd"){
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		//파라미터 설정해서 해당 조건에 맞는 Freight Code 조회함
   		rtnary[1]=air_sea_clss_cd;//air_sea_clss_cd
   		rtnary[2]=bnd_clss_cd;	//bnd_clss_cd
   		rtnary[3]=biz_clss_cd;	//biz_clss_cd
   		rtnary[4]=objPfx;			//tabStr
   		callBackFunc = 'fr_frt_cd_callBackFunc';
   		modal_center_open('./CMM_POP_0070.clt',  rtnary,556,480,"yes");
        
	//Customer Code조회
	}else if(colStr==objPfx+"fr_trdp_cd"){
//   		rtnary=new Array(1);
//   		rtnary[0]="2";
//   		rtnary[1]="";
//   		rtnary[2]=window;
//   		callBackFunc = "gridPopCall_trdp_cd";
   		gridPopCall(sheetObj, row, col,  "trdp_cd", free);  ////(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
	}else if(colStr==objPfx+"fr_trdp_nm"){
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]=sheetObj.GetCellValue(row, col);
   		rtnary[2]=window;
   		
   		////////////여기
   		//(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
   		if(free == 'LOCAL')
   		{
   			callBackFunc = "SHEET_TRDP_POPUP_LOCAL";
   		}else{
   			callBackFunc = "SHEET_TRDP_POPUP";
   		}
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    //Tarriff Currency조회
	}else if(colStr==objPfx+"fr_rat_curr_cd"){
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		callBackFunc = 'fr_rat_curr_cd_callBackFunc';
   		modal_center_open('./CMM_POP_0040.clt',  rtnary, 656,480,"yes");
        
    //Buying/Credit인 경우 Invoice 환률을 선택한다.
	}else if(colStr==objPfx+"fr_inv_curr_cd"){     
    	rtnary=new Array(1);
   		rtnary[0]="1";
   		callBackFunc = 'fr_inv_curr_cd_callBackFunc';
   		modal_center_open('./CMM_POP_0040.clt',  rtnary,656,480,"yes");
        
	//Invoice Exchange rate
	}else if(colStr==objPfx+"fr_inv_xcrt"){
		//팝업 호출 조건을 확인한다.
		if(sheetObj.GetCellValue(row, objPfx+'fr_ru')==''){
   			//Please enter \"Rate!\"!
   			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_RATE') + "\n\n: BL_FRT.1033");
   			return;
   		//Currency 선택여부 확인
		}else if(sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd')==''){
   			//Please select \"Currency!\"!
   			alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_CURR') + "\n\n: BL_FRT.1040");
   			return;
   		}
		rtnary=new Array(1);
   		rtnary[0]="2";
   		//P/C 구분에 따라서 조회할 환률을 선택한다. 
   		var fndCurr='';
   		//2번 Sheet
   		if(objPfx==''){
   			fndCurr=sheetObj.GetCellValue(row, 'fr_inv_curr_cd');
   	   	//5번 Sheet
   		}else{
   			fndCurr=sheetObj.GetCellValue(row, 'b_fr_inv_curr_cd');
   		}
   		var paramStr='?f_fm_curr_cd='+sheetObj.GetCellValue(row, objPfx+"fr_rat_curr_cd");
   		paramStr+= '&f_inv_curr_cd='+sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
		paramStr+= '&f_dft_dt=' +sheetObj.GetCellValue(row, objPfx+"fr_inv_xcrt_dt");
		paramStr+= '&f_trdp_cd='+sheetObj.GetCellValue(row, objPfx+"fr_trdp_cd");
		paramStr+= '&f_trdp_nm='+sheetObj.GetCellValue(row, objPfx+"fr_trdp_nm");
//   		var rtnVal =  ComOpenWindow('./CMM_POP_0220.clt'+paramStr,  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:750px;dialogHeight:600px" , true);
		callBackFunc = 'fr_inv_xcrt_callBackFunc';
		modal_center_open('./CMM_POP_0220.clt'+paramStr, rtnary, 1150,600,"yes");
		
	//Performance Exchange rate
	}else if(colStr==objPfx+"fr_perf_xcrt"){
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		var paramStr='?f_fm_curr_cd='+sheetObj.GetCellValue(row, objPfx+"fr_rat_curr_cd");
		paramStr+= '&f_dft_dt='+frm1.obrd_dt_tm.value;
		callBackFunc = 'fr_perf_xcrt_callBackFunc';
		modal_center_open('./CMM_POP_0230.clt'+paramStr,  rtnary, 750,600,"yes");
   		
	}
}

function fr_perf_xcrt_callBackFunc(rtnVal){
if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 	return;
}else{
	var rtnValAry=rtnVal.split("|");
	cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+"fr_perf_xcrt",rtnValAry[0]);//Ex.Rate perf_xcrt
	cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+"fr_perf_curr_cd",rtnValAry[1]);//perf_curr_cd
	calcPefrAmt(cur_sheetObj, cur_rowIdx, cur_objPfx);
}
}

function fr_inv_xcrt_callBackFunc(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 	return;
}else{
	var rtnValAry=rtnVal.split("|");
	cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+"fr_inv_xcrt",rtnValAry[0]);//EX. Rate  inv_xcrt
	cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+"fr_inv_curr_cd",rtnValAry[1]);//xch_curr_cd
	calcInvAmt(cur_sheetObj, cur_rowIdx, cur_objPfx);
}
}

function fr_inv_curr_cd_callBackFunc(rtnVal){
if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 	return;
}else{
	var rtnValAry=rtnVal.split("|");
	cur_sheetObj.SetCellValue(cur_rowIdx, col,rtnValAry[0]);
	cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+'fr_inv_xcrt','');
	cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+'fr_inv_amt','');
	cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+'fr_inv_vat_amt','');
	if(cur_sheetObj.GetCellValue(cur_rowIdx,  cur_objPfx+"fr_inv_curr_cd")==cur_sheetObj.GetCellValue(cur_rowIdx, cur_objPfx+"fr_rat_curr_cd")){
		cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+"fr_inv_xcrt",1);
	}
}
}
function fr_rat_curr_cd_callBackFunc(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		//formObj.s_currency_code.value = rtnValAry[0];//cd_val
		cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+"fr_rat_curr_cd",rtnValAry[1]);//cd_nm
		cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+"fr_inv_curr_cd",rtnValAry[1]);//cd_nm
	}
}

function fr_frt_cd_callBackFunc(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+"fr_frt_cd",rtnValAry[0]);
		cur_sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+"fr_frt_cd_nm",rtnValAry[1]);
		//기존 입력값 초기화
		//sheetObj.CellValue(row, objPfx+"fr_cntr_tpsz_cd") = '';
		//sheetObj.CellValue(row, objPfx+"fr_qty")     = '';
		//sheetObj.CellValue(row, objPfx+"fr_vat_amt") = '';
		//sheetObj.CellValue(row, objPfx+"fr_inv_amt") = '';
		//sheetObj.CellValue(row, objPfx+"fr_inv_vat_amt") = '';
		//sheetObj.CellValue(row, objPfx+"fr_perf_amt")    = 0;               
		//sheetObj.CellValue(row, objPfx+"fr_perf_vat_amt")= 0;
		frm1.objPfx.value=cur_objPfx;
		frm1.curRow2.value=cur_rowIdx;
		var parmStr='&goWhere=aj&bcKey=searchMyTaxRate';
		parmStr += '&f_frt_cd='+rtnValAry[0]; 
		ajaxSendPost(setTaxRate,  'reqVal', parmStr, './GateServlet.gsl');
	}
}
/**
 * Tariff Currency 변경시 등록된 Invoice Currency 및 Performance Currency초기화
 */
function resetCurCd(sheetObj, row, objPfx){
//	sheetObj.CellValue(row, objPfx+"inv_curr_cd") = '';   
	sheetObj.SetCellValue(row, objPfx+"fr_inv_xcrt",1);
	sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",0);
	sheetObj.SetCellValue(row, objPfx+"fr_inv_vat_amt",0);
	sheetObj.SetCellValue(row, objPfx+"fr_perf_xcrt",1);
	sheetObj.SetCellValue(row, objPfx+"fr_perf_amt",0);
	sheetObj.SetCellValue(row, objPfx+"fr_perf_vat_amt",0);
}
/**
 * Invoice Amt를 계산한다.
 */
function calcInvAmt(sheetObj, row, objPfx){
	//[20140730 OJG] - replaceAll 제거 : var tmpCntrCnt=sheetObj.GetCellValue(row, objPfx+"fr_qty").replaceAll(",","");
	//var tmpCntrCnt=sheetObj.GetCellValue(row, objPfx+"fr_qty");	
	//if(tmpCntrCnt==''){
	//	tmpCntrCnt=1;
	//}
	//((Rate*Countainer Count))*Ex.Rate
	//var tmpSum=sheetObj.GetCellValue(row, objPfx+"fr_trf_cur_sum_amt");//getMultiplyFloat(tmpCntrCnt, sheetObj.GetCellValue(row, objPfx+"fr_ru"));
	//tmpSum=getMultiplyFloat(tmpSum,     sheetObj.GetCellValue(row, objPfx+"fr_inv_xcrt"));
	//VAT AMT(VAT AMT*Ex.Rate)
	//var vatSum=sheetObj.GetCellValue(row, objPfx+"fr_vat_amt");
	//vatSum=getMultiplyFloat(vatSum, sheetObj.GetCellValue(row, objPfx+"fr_inv_xcrt"));
	var vatSum =0;
	var trf_cur_sum_amt = 0;
	if(MULTI_CURR_FLAG == "Y" && sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd") == "C" ){		//Credit
		trf_cur_sum_amt = Number(sheetObj.GetCellValue(row, objPfx+"fr_qty")) * Number(sheetObj.GetCellValue(row, objPfx+"fr_ru"));
	}else{
		var calRu = 0;
		if( sheetObj.GetCellValue(row, objPfx+"fr_ru") == "" || Number(sheetObj.GetCellValue(row, objPfx+"fr_ru")) == 0){				
			calRu = Number(sheetObj.GetCellValue(row, objPfx+"fr_agent_ru"));
		}else{				
			calRu = Number(sheetObj.GetCellValue(row, objPfx+"fr_ru"));
		}	
		trf_cur_sum_amt = Number(sheetObj.GetCellValue(row, objPfx+"fr_qty")) * calRu;
	}
	
	//#4060 [JAPT] AR INVOICE ENTRY
	var tmpSum = 0;
	if(MULTI_CURR_FLAG == 'Y'){
		 tmpSum = trf_cur_sum_amt * Number(sheetObj.GetCellValue(row, objPfx+"fr_inv_xcrt"));
	} else {
		tmpSum = trf_cur_sum_amt * 1;
	}
	
	// Check if size of column on grid is bigger than its size on Database, show error message and reset its data to 0.
	if ((tmpSum || vatSum) >= 1000000000000000) {
		ComShowCodeMessage('COM03230');
		sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',0);
		return;
	} else {
		
		//((Agent Rate*Countainer Count))*Ex.Rate
		//[20140730 OJG] - replaceAll 제거 : var tmpSum1=getMultiplyFloat(tmpCntrCnt, sheetObj.GetCellValue(row, objPfx+"fr_agent_ru").replaceAll(",",""));
		//var tmpSum1=getMultiplyFloat(tmpCntrCnt, sheetObj.GetCellValue(row, objPfx+"fr_agent_ru"));
		//if(sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd") == "C"){
		//	tmpSum1 = getMultiplyFloat(tmpCntrCnt, sheetObj.GetCellValue(row, objPfx+"fr_ru"));
		//	tmpSum1=getMultiplyFloat(tmpSum1,     sheetObj.GetCellValue(row, objPfx+"fr_inv_xcrt"));
		//}
		
		
		
		//원화인 경우
		if(sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd')=='KRW' || sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd')=='JPY' || sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd')=='VND'){
			//tmpSum=getFlRound(tmpSum, 1);
			//vatSum=getFlRound(vatSum, 1);
			//tmpSum1=getFlRound(tmpSum1, 1);
			
			tmpSum = roundXL(tmpSum,0);
		}else{
			tmpSum = roundXL(tmpSum,2);
		}
		if(objPfx == 'dc_'){
			if(sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd") == "C"){
				
				sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",0);//Invoice Amt=(Qty*Rate Unit)*Exchange Rate
				sheetObj.SetCellValue(row, objPfx+"fr_inv_vat_amt",0);
			}else{
				
				sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",tmpSum);//Invoice Amt=(Qty*Rate Unit)*Exchange Rate
				sheetObj.SetCellValue(row, objPfx+"fr_inv_vat_amt",vatSum);
			}
		}else{
			
			sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",tmpSum);//Invoice Amt=(Qty*Rate Unit)*Exchange Rate
			sheetObj.SetCellValue(row, objPfx+"fr_inv_vat_amt",vatSum);
		}
		//Total Amt( Total Amt = Inv_amt+Vat_amt) 
	    //[20141213 OJG] Multi-Currency
	    if(MULTI_CURR_FLAG == "Y" && sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd") == "C" ){		//Credit
	        sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",0,0);
	        //sheetObj.CellValue2(row, objPfx+"fr_ru") = sheetObj.CellValue(row, objPfx+"fr_agent_ru").replaceAll(",","");
	    	//sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",getMultiplyFloat(tmpCntrCnt, sheetObj.GetCellValue(row, objPfx+"fr_agent_ru").replaceAll(",","")),0);
	        sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",roundXL(trf_cur_sum_amt,2),0);
	    }else{
	    	if(objPfx == 'dc_'){
	    		if(sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd") == "C"){
	    			
	    			sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",0,0);
	    		}else{
	    			
	    			sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",getSumFloat(tmpSum, vatSum),0);
	    		}
	    	}else{
	    		
	    		sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",getSumFloat(tmpSum, vatSum),0);
	    	}
	    }
		//Total Agent Amt( Total Agent Amt = Inv_amt+Vat_amt)
	    //Great Luck Test #19
	    if (sheetObj.GetCellValue(row, objPfx + "fr_sell_buy_tp_cd") == "C") {
			sheetObj.SetCellValue(row, objPfx + "fr_agent_amt", getSumFloat(tmpSum, vatSum), 0);
		} else {
			sheetObj.SetCellValue(row, objPfx + "fr_agent_amt", 0, 0);
		}	    
	}
}
/**
 * Performance Amt를 계산한다.
 */
function calcPefrAmt(sheetObj, row, objPfx){
	////[20140730 OJG] - replaceAll 제거 : var tmpCntrCnt=sheetObj.GetCellValue(row, objPfx+"fr_qty").replaceAll(",","");
	var colStr = sheetObj.ColSaveName();
	var tmpCntrCnt=sheetObj.GetCellValue(row, objPfx+"fr_qty");
	if(tmpCntrCnt==''){
		tmpCntrCnt=1;
	}
	//((Rate*Countainer Count)+Vat)*Ex.Rate
	var tmpSum=getMultiplyFloat(tmpCntrCnt, sheetObj.GetCellValue(row, objPfx+"fr_ru"));
	tmpSum=getSumFloat     (tmpSum,     sheetObj.GetCellValue(row, objPfx+"fr_vat_amt"));
	tmpSum=getMultiplyFloat(tmpSum,     sheetObj.GetCellValue(row, objPfx+"fr_perf_xcrt"));
	
	// Check if size of column on grid is bigger than its size on Database, show error message and reset its data to 0.
	if (tmpSum >= 1000000000000000) {
		ComShowCodeMessage('COM03230');
		sheetObj.SetCellValue(row, objPfx+"fr_qty",0);
		return;
	} else {
		sheetObj.SetCellValue(row, objPfx+"fr_perf_amt",tmpSum);//Invoice Amt
		sheetObj.SetCellValue(row, objPfx+"fr_perf_vat_amt",getMultiplyFloat(tmpSum, sheetObj.GetCellValue(row, objPfx+"fr_vat_rt")));
	}
}
/**
 * ADD Row 시에 customer, invoice currency 가 같은 경우만 check 해서 invoice 로 넘기기 위해 check box, customer, invoice currency handling 로직 추가
 */
function frFrtCheck(sheetObj, row, objPfx, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd){
	var chk_fr_sell_buy_tp_cd=sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd");
	var chk_fr_trdp_cd=sheetObj.GetCellValue(row, objPfx+"fr_trdp_cd");
	var chk_fr_term_cd=sheetObj.GetCellValue(row, objPfx+"fr_frt_term_cd");
	var chk_fr_inv_curr_cd=sheetObj.GetCellValue(row, objPfx+"fr_inv_curr_cd");
	var chk_fr_inv_sts_cd=sheetObj.GetCellValue(row, objPfx+"fr_inv_sts_cd");
	//confirm 인 경우 check 못함, 
	//LHK, 20131118 #22727 [BINEX]Ocean Import Master Credit 생성을 위해 OIH Freight Create D/C 버튼 활성화,invoice 생성된 data 도 check 가능하도록 수정.(Import 모두 적용)
	if(sheetObj.GetCellValue(row, objPfx+"fr_inv_sts_cd") == "FC" && !(bnd_clss_cd == "I" && biz_clss_cd == "H" && objPfx == "")){
		//sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0);
		//sheetObj.SetCellEditable(row, objPfx+"fr_frt_check",0);
		return;
	}
	if(sheetObj.GetCellValue(row, objPfx+"fr_frt_check") == 1){
		for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
			if(bnd_clss_cd == "I" && biz_clss_cd == "H" && objPfx == ""){	// LHK, 20131118 #22727 추가 로직
				if(chk_fr_trdp_cd == sheetObj.GetCellValue(i, objPfx+"fr_trdp_cd")
						&& chk_fr_inv_curr_cd == sheetObj.GetCellValue(i, objPfx+"fr_inv_curr_cd")
						&& chk_fr_inv_sts_cd == sheetObj.GetCellValue(i, objPfx+"fr_inv_sts_cd")){
					sheetObj.SetCellValue(i, objPfx+"fr_frt_check",1,0);
				}else{
					sheetObj.SetCellValue(i, objPfx+"fr_frt_check",0,0);
				}
			//#25833 OEH-AR 전용 
			}else if(air_sea_clss_cd == "S" && bnd_clss_cd == "O" && biz_clss_cd == "H" && objPfx == ""){	
				if(chk_fr_trdp_cd == sheetObj.GetCellValue(i, objPfx+"fr_trdp_cd")
						&& chk_fr_term_cd == sheetObj.GetCellValue(i, objPfx+"fr_frt_term_cd_h")
						&& chk_fr_inv_curr_cd == sheetObj.GetCellValue(i, objPfx+"fr_inv_curr_cd")
						&& sheetObj.GetCellValue(i, objPfx+"fr_ibflag") != 'I'
							&& sheetObj.GetCellValue(i, objPfx+"fr_inv_sts_cd") != "FC"){
					sheetObj.SetCellValue(i, objPfx+"fr_frt_check",1,0);
				}else{
					sheetObj.SetCellValue(i, objPfx+"fr_frt_check",0,0);
				}
			}else{	//기존로직
				if(chk_fr_trdp_cd == sheetObj.GetCellValue(i, objPfx+"fr_trdp_cd")
						&& chk_fr_inv_curr_cd == sheetObj.GetCellValue(i, objPfx+"fr_inv_curr_cd")
						&& sheetObj.GetCellValue(i, objPfx+"fr_ibflag") != 'I'
							&& sheetObj.GetCellValue(i, objPfx+"fr_inv_sts_cd") != "FC" ){
					if(sheetObj.GetCellValue(i, objPfx+"fr_buy_inv_no") == ""){	//Pierpass 가 아닌 경우
						sheetObj.SetCellValue(i, objPfx+"fr_frt_check",1,0);
					}else{																			//Pierpass 인 경우 check 한 값만 선택됨. 
						if(i == row){
							sheetObj.SetCellValue(i, objPfx+"fr_frt_check",1,0);
						}else{
							sheetObj.SetCellValue(i, objPfx+"fr_frt_check",0,0);
						}
					}
				}else{
					sheetObj.SetCellValue(i, objPfx+"fr_frt_check",0,0);
				}
			}
		}
	}
	/*
if(sheetObj.GetCellValue(row, objPfx+"fr_ibflag") == 'U'){
		alert(getLabel('COM_FRT_CFM003'));
		sheetObj.SetCellValue(i, objPfx+"fr_frt_check",0,0);
		sheetObj.SetCellEditable(row, objPfx+"fr_cntr_tpsz_cd",0);
		return;
    }
	var sRow=sheetObj.FindCheckedRow(objPfx+"fr_frt_check");
	var arrRow=sRow.split("|");
	for (idx=0; idx<arrRow.length-1; idx++){ 
		//alert(arrRow[idx]); 
	}
	if(sheetObj.CheckedRows(objPfx+"fr_frt_check") == 1){
		if(objPfx == ""){
			fr_chk_row=arrRow[0];
		}
		if(objPfx == "b_"){
			b_fr_chk_row=arrRow[0];
		}
		if(objPfx == "dc_"){
			dc_fr_chk_row=arrRow[0];
		}
	}
	if(sheetObj.CheckedRows(objPfx+"fr_frt_check") > 1){
		var chk_row="";
		if(objPfx == ""){
			chk_row=fr_chk_row;
		}
		if(objPfx == "b_"){
			chk_row=b_fr_chk_row;
		}
		if(objPfx == "dc_"){
			chk_row=dc_fr_chk_row;
		}
if(sheetObj.GetCellValue(chk_row, objPfx+"fr_sell_buy_tp_cd") !=sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd")){
			sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
			//동일한 [Selling], [Buying] 경우에만 선택하수 있습니다!
			alert(getLabel('COM_FRT_ALT007'));
			return;
		}
if(sheetObj.GetCellValue(chk_row, objPfx+"fr_trdp_cd")!=sheetObj.GetCellValue(row, objPfx+"fr_trdp_cd")){
			sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
			//동일한 거래처인 경우에만 선택하수 있습니다!
			alert(getLabel('COM_FRT_ALT008'));
			return;
		}
if(sheetObj.GetCellValue(chk_row, objPfx+"fr_inv_curr_cd")!=sheetObj.GetCellValue(row, objPfx+"fr_inv_curr_cd")){
			sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
			//동일한 거래처인 경우에만 선택하수 있습니다!
			alert(getLabel('COM_FRT_ALT013'));
			return;
		}
	}
	*/
}
function frFrtCheckRow(sheetObj, objPfx){ 
	var isChkVal=false;
	/*
	var iCheckRow=sheetObj.CheckedRows(objPfx+"fr_frt_check");
	if(iCheckRow == 0){
	    alert(getLabel('FMS_COM_ALT007'));
		isChkVal=true;
	}
	*/
	return isChkVal;
}
var sdCheckTrdp='';
var sdCheckCnt=0;
var bcCheckTrdp='';
var bcCheckCnt=0;
function mutiSheetOnChange(sheetObj, row, col, objPfx, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd, free) { //(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
	var colStr=sheetObj.ColSaveName(col);
	//check 된 경우 ,수정된 데이터 check false
	/*if(colStr!=objPfx+"fr_frt_check" && sheetObj.GetCellValue(row, objPfx+"fr_frt_check") == 1){
			//sheetObj.CellValue2(row, objPfx+"fr_frt_check") = 0;
			//sheetObj.CellEditable(row, objPfx+"fr_cntr_tpsz_cd") = false;
	}*/
	if(colStr==objPfx+'fr_sell_buy_tp_cd'){
		var tpCd=sheetObj.GetCellValue(row, objPfx+'fr_sell_buy_tp_cd');
		var trfCur=sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd');
		/*
		var invCur='KRW';
		if(tpCd=='D'||tpCd=='C'){
			invCur='USD';
		}
		sheetObj.SetCellValue(row, objPfx+'fr_inv_curr_cd',invCur,0);
		if(trfCur=='USD'&&invCur=='KRW'){
//			sheetObj.CellValue(row, objPfx+'fr_inv_xcrt') = frm1.dispCur.value;
		}else if(trfCur==invCur){
			sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
		}else{
			sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
		}
		*/
		if(objPfx == 'dc_' && sheetObj.GetCellValue(row, objPfx+'fr_sell_buy_tp_cd') == 'D'){
			//DC , Revenue 일 때 credit 입력 제한
			//sheetObj.SetCellEditable(row, objPfx+"fr_ru",1);
			//sheetObj.SetCellValue(row, objPfx+'fr_agent_ru',0);
			//sheetObj.SetCellEditable(row, objPfx+"fr_agent_ru",0);
			sheetObj.SetCellEditable(row, objPfx+"fr_inv_sum_amt",1);
			// #1903 - [CLT] CONTAINER LIST, DEBIT/CREDIT NOTE ERROR
			sheetObj.SetCellValue(row, objPfx+'fr_inv_sum_amt',sheetObj.GetCellValue(row, objPfx+"fr_agent_amt"));
			sheetObj.SetCellValue(row, objPfx+'fr_agent_amt',0);
			sheetObj.SetCellEditable(row, objPfx+"fr_agent_amt",0);
		}
		if(objPfx == 'dc_' && sheetObj.GetCellValue(row, objPfx+'fr_sell_buy_tp_cd') == 'C'){
			//DC , Cost 일 때 revenue 입력 제한
			//sheetObj.SetCellValue(row, objPfx+'fr_ru',0);
			//sheetObj.SetCellEditable(row, objPfx+"fr_ru",0);
			//sheetObj.SetCellEditable(row, objPfx+"fr_agent_ru",1);
			sheetObj.SetCellEditable(row, objPfx+"fr_agent_amt",1);
			// #1903 - [CLT] CONTAINER LIST, DEBIT/CREDIT NOTE ERROR
			sheetObj.SetCellValue(row, objPfx+'fr_agent_amt',sheetObj.GetCellValue(row, objPfx+"fr_inv_sum_amt"));
			sheetObj.SetCellValue(row, objPfx+'fr_inv_sum_amt',0);
			sheetObj.SetCellEditable(row, objPfx+"fr_inv_sum_amt",0);
		}
	}else if(colStr==objPfx+'fr_frt_cd'){
		var codeStr=sheetObj.GetCellValue(row, objPfx+'fr_frt_cd');
		if(codeStr.length>1){
			//결과를 표시할 Col을 초기화함
			sheetObj.SetCellValue(row, objPfx+'fr_frt_cd_nm','',0);
			//sheetObj.CellValue2(row, objPfx+"fr_qty") = '';
		    sheetObj.SetCellValue(row, objPfx+"fr_cntr_tpsz_cd",'',0);
		    //sheetObj.CellValue2(row, objPfx+"fr_trf_cur_sum_amt") = '';
		    //param setting
		    //#1773 [PATENT] Freight Default Unit Option
		    var param='&air_sea_clss_cd=' + air_sea_clss_cd;
			param += '&bnd_clss_cd=' + bnd_clss_cd;
			param += '&biz_clss_cd=' + biz_clss_cd;
			param += '&tabStr=' + objPfx;
			param += '&frt_ofc_cd=' + frm1.ref_ofc_cd.value;
			if(air_sea_clss_cd=="S"){
				param += '&frt_shp_mod=' + frm1.shp_mod_cd.value;
			}
			doAutoSearch(sheetObj, row, objPfx+'fr_frt_cd', 'freight', codeStr, objPfx+'fr_frt_cd', objPfx+'fr_frt_cd_nm', param, free);	 //(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
			//LHK 2013.08.10 #16896 레드마인 요구사항
			//A/P : Row Add 하고 Billing Code 선택 시, 해당 Billing Code 의 Group 이 "FC" 인 경우 (tb_frt_cd.frt_clss_cd = 'FC') Customer 는
			//OEM 의 경우 B/L 의 Billing Carrier(tb_bl_prnr.BL_TRDP_TP_CD = 'B01') 로, AEM 인 경우 AWB 의 Carrier (tb_bl_prnr.BL_TRDP_TP_CD = 'L01') 자동 선택
			// --> Customer 가 없는 경우 Set 함.
			if(objPfx == "b_" && sheetObj.GetCellValue(row, objPfx+'fr_ibflag') == "I"){
				var param=''; 
				param += '&s_code=' + codeStr;
				ajaxSendPost(getFrtCdInfoAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getFrtCdInfo' + param, './GateServlet.gsl');
				if(h_temp_frt_clss_cd == 'FC'){
					if(air_sea_clss_cd == "S" && bnd_clss_cd=="O" && biz_clss_cd =="M"){
						sheetObj.SetCellValue(row, objPfx+'fr_trdp_cd',frm1.carr_trdp_cd.value);
					}
					if(air_sea_clss_cd == "A" && bnd_clss_cd=="O" && biz_clss_cd =="M"){
						sheetObj.SetCellValue(row, objPfx+'fr_trdp_cd',frm1.lnr_trdp_cd.value);
					}
				}	
				h_temp_frt_clss_cd="";
			}
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT150'));
			sheetObj.SelectCell(row, objPfx+'fr_frt_cd');
		}
	//Trade Partner Code
	}else if(colStr==objPfx+'fr_trdp_cd'){
		var codeStr=sheetObj.GetCellValue(row, objPfx+'fr_trdp_cd');
		if(codeStr.length>=2){
			//결과를 표시할 Col을 초기화함
			sheetObj.SetCellValue(row, objPfx+'fr_trdp_nm','');
			doAutoSearch(sheetObj, row, col, 'trdpcode', codeStr, objPfx+'fr_trdp_cd', objPfx+'fr_trdp_nm', '', free);	 //(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
		}else{
			//The code is not enough to search
//			alert(getLabel('FMS_COM_ALT014') + "\n\n: BL_FRT.1171");
//			sheetObj.SelectCell(row, colStr);
			//sheetObj, row, col, objPfx, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd
//			alert(sheetObj);
		}
	//Tariff Currency 조회
	}else if(colStr==objPfx+'fr_rat_curr_cd'){
		var codeStr=sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd');
		if(codeStr.length>2){
			var tmpCurr=codeStr.toUpperCase();

			//#3411 [JTC]Accounting & Performance 수정사항
			//TB_SYS_PROP 테이블의 MULTI_CURR_FLAG 가 'N' 인경우 Rate Currency 와 Invoice Currency 를 동일하게 하기 위함.
			//                                      'Y' 인경우는 Rate Currency 변경시에도 영향받지 않도록 함.
			if(MULTI_CURR_FLAG == 'N') { 
				//#2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가
				sheetObj.SetCellValue(row, objPfx+'fr_inv_curr_cd',tmpCurr);
			}

			if(tmpCurr==sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd')){
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
			}else{
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
			}
			//결과를 표시할 Col을 초기화함
			doAutoSearch(sheetObj, row, col, 'currency', codeStr, objPfx+'fr_rat_curr_cd', objPfx+'fr_rat_curr_cd');	
			var param='';
			var tmp_dt='';
			if(bnd_clss_cd=='O'){
				tmp_dt=frm1.etd_dt_tm.value.replaceAll("-", "");
				tmp_dt=tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
			}else{
				tmp_dt=frm1.eta_dt_tm.value.replaceAll("-", "");
				tmp_dt=tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
			}
			
			/* #3795 팀장님 지시  fr_inv_xcrt_dt가 존재할시 유지
			if(typeof(frm1.bkg_entry_yn) != "undefined"){
				tmp_dt = sheetObj.GetCellValue(row, objPfx+'fr_inv_xcrt_dt');
			}
			*/
			//#3795 팀장님 지시  fr_inv_xcrt_dt가 존재할시 유지
			if(sheetObj.GetCellValue(row, objPfx+'fr_inv_xcrt_dt') != null 
				&& sheetObj.GetCellValue(row, objPfx+'fr_inv_xcrt_dt') != ''
			){
				tmp_dt = sheetObj.GetCellValue(row, objPfx+'fr_inv_xcrt_dt');
			}
			
			
			param += '&cur_dt=' + tmp_dt;
			param += '&trf_cur_cd=' + sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd');
			param += '&ofccurr_cd=' + sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
			ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
			if(getXcrtRate==0){
				if(tmpCurr==sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd')){
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
				}else{
					//4060 [JAPT] A/R INVOICE ENTRY
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',0);
				}
				/* #3795 팀장님 지시  fr_inv_xcrt_dt가 존재할시 유지
				if(typeof(frm1.bkg_entry_yn) == "undefined"){
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt','',0);
				}
				*/
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt',tmp_dt,0);	
			}else{
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',getXcrtRate);//[20180228 HJW] Exhange Rate 변경으로 Event 발생
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt',tmp_dt,0);
			}
			//#2116 - 1. Booking, B/L 화면의 Freight 탭에서 Rate Curr 변경 시 Invoice Curr가 함께 변경됨 (Invoice Curr는 변동되지 않고 처음 설정된 Local Currency, 혹은 B/L Currency가 유지되도록 보완 #37)
			//sheetObj.SetCellValue(row, objPfx+'fr_inv_curr_cd',codeStr,0);
			//sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
			//if(typeof(frm1.bkg_entry_yn) == "undefined"){
			//	sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt','',0);
			//}
			
			//#2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가
			if(typeof(bl_inv_auto_creation) != "undefined"){
				if(bl_inv_auto_creation == "Y"){
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
					
					var post_dt = frm1.post_dt.value.replaceAll("-", "");
					post_dt=post_dt.substring(4,8) + post_dt.substring(0,2) + post_dt.substring(2,4);
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt',post_dt);
				}
			}			
			
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT151'));
			sheetObj.SelectCell(row, colStr);
		}
	//Buying/Credit Invoice Currency
	}else if(colStr==objPfx+'fr_inv_curr_cd'){
		var codeStr=sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
		if(codeStr.length>2){
			var tmpCurr=codeStr.toUpperCase();
//			if(tmpCurr==sheetObj.CellValue(row, objPfx+'fr_rat_curr_cd')){
//				sheetObj.CellValue(row, objPfx+'fr_inv_xcrt') = 1;
//			}else{
//				sheetObj.CellValue(row, objPfx+'fr_inv_xcrt') = 0;	
//			}
			//결과를 표시할 Col을 초기화함
			doAutoSearch(sheetObj, row, col, 'currency', codeStr, objPfx+'fr_inv_curr_cd', objPfx+'fr_inv_curr_cd');	
			var param='';
			var tmp_dt='';
			//Export일 경우 ETD
			if(bnd_clss_cd=='O'){
				tmp_dt=frm1.etd_dt_tm.value.replaceAll("-", "");
				tmp_dt=tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
			//Import ETA
			}else{
				tmp_dt=frm1.eta_dt_tm.value.replaceAll("-", "");
				tmp_dt=tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
			}
			
			/* #3795 팀장님 지시  fr_inv_xcrt_dt가 존재할시 유지
			if(typeof(frm1.bkg_entry_yn) != "undefined"){
				tmp_dt = sheetObj.GetCellValue(row, objPfx+'fr_inv_xcrt_dt');
			}
			*/
			
			//#3795 팀장님 지시  fr_inv_xcrt_dt가 존재할시 유지
			if(sheetObj.GetCellValue(row, objPfx+'fr_inv_xcrt_dt') != null 
				&& sheetObj.GetCellValue(row, objPfx+'fr_inv_xcrt_dt') != ''
			){
				tmp_dt = sheetObj.GetCellValue(row, objPfx+'fr_inv_xcrt_dt');
			}			
			
			param += '&cur_dt=' + tmp_dt;
			param += '&trf_cur_cd=' + sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd');
			param += '&ofccurr_cd=' + sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
			ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
			if(getXcrtRate==0){
				if(tmpCurr==sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd')){
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',1);
				}else{
					//4060 [JAPT] A/R INVOICE ENTRY					
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',0);
				}
				
				/* 팀장님 지시  fr_inv_xcrt_dt가 존재할시 유지
				if(typeof(frm1.bkg_entry_yn) == "undefined"){
					//CSR - #3610 BL - FRIEGHT TAB ,  EX.DATE BLANK 로직 수정
					sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt',tmp_dt,0);
				}
				*/
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt',tmp_dt,0);	
				
			}else{
				var tempXcrtRate = sheetObj.GetCellValue(row, objPfx+'fr_inv_xcrt') * 1;
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',getXcrtRate);//[20141212 OJG] Exhange Rate 변경으로 Event 발생
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt_dt',tmp_dt,0);
				//#6271 - [JAPT] Invoice Amount decimal numbers mismatch with Balance Amount
				if(tempXcrtRate == getXcrtRate){
					//Invoice Amt를계산함
					calcInvAmt(sheetObj, row, objPfx);
					//Performance Amt를 계산함
					calcPefrAmt(sheetObj, row, objPfx);
				}
			}
		}else{
			//The code is not enough to search
			alert(getLabel('FMS_COM_ALT151'));
			sheetObj.SelectCell(row, colStr);
		}
	
	//#1840 - [PATENT] Pro Forma Profit Report - 오류사항
	}else if(colStr==objPfx+'fr_inv_xcrt_dt'){
		//#3832 [JAPT] BL ENTRY - Freight tab,  Ex.rate 자동 표시 로직 보완
		//if(typeof(frm1.bkg_entry_yn) != "undefined"){
			var param = '';
			var tmp_dt = sheetObj.GetCellValue(row, objPfx+'fr_inv_xcrt_dt');
			param += '&cur_dt=' + tmp_dt;
			param += '&trf_cur_cd=' + sheetObj.GetCellValue(row, objPfx+'fr_rat_curr_cd');
			param += '&ofccurr_cd=' + sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
			ajaxSendPost(getCurrency, 'reqVal', '&goWhere=aj&bcKey=getCurrency' + param, './GateServlet.gsl');
			if(getXcrtRate==0){
				//4060 [JAPT] A/R INVOICE ENTRY				
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',0);
			}else{
				sheetObj.SetCellValue(row, objPfx+'fr_inv_xcrt',getXcrtRate);//[20141212 OJG] Exhange Rate 변경으로 Event 발생
			}
		//}
		
	}else if(colStr==objPfx+"fr_frt_check"){
		/*
if(sheetObj.GetCellValue(row, objPfx+"fr_frt_check")==1){
			if(objPfx==''){
				if(sdCheckTrdp==''){
					sdCheckTrdp=row;
				}
if(sheetObj.GetCellValue(sdCheckTrdp, objPfx+"fr_sell_buy_tp_cd")!=sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd")){
					sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
					//동일한 [Selling], [Buying] 경우에만 선택하수 있습니다!
					//alert(getLabel('COM_FRT_ALT007') + "\n\n: BL_FRT.1342");
				}
else if(sheetObj.GetCellValue(sdCheckTrdp, objPfx+"fr_trdp_cd")!=sheetObj.GetCellValue(row, objPfx+"fr_trdp_cd")){
					sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
					//동일한 거래처인 경우에만 선택하수 있습니다!
					//alert(getLabel('COM_FRT_ALT008') + "\n\n: BL_FRT.1347");
				}
				else{
					sdCheckCnt++;
				}
			}else{
				if(bcCheckTrdp==''){
					bcCheckTrdp=row;
				}
if(sheetObj.GetCellValue(bcCheckTrdp, objPfx+"fr_sell_buy_tp_cd")!=sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd")){
					sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
					//동일한 [Selling], [Buying] 경우에만 선택하수 있습니다!
					//alert(getLabel('COM_FRT_ALT007') + "\n\n: BL_FRT.1359");
				}
else if(sheetObj.GetCellValue(bcCheckTrdp, objPfx+"fr_trdp_cd")!=sheetObj.GetCellValue(row, objPfx+"fr_trdp_cd")){
					sheetObj.SetCellValue(row, objPfx+"fr_frt_check",0,0);
					//동일한 거래처인 경우에만 선택하수 있습니다!
					//alert(getLabel('COM_FRT_ALT008') + "\n\n: BL_FRT.1347");
				}
				else{
					bcCheckCnt++;					
				}
			}
		}else{
			if(objPfx==''){
				sdCheckCnt--;
				if(sdCheckCnt==0){
					sdCheckTrdp='';
				}
			}else{
				bcCheckCnt--;
				if(bcCheckCnt==0){
					bcCheckTrdp='';
				}
			}
		}
		*/
		//ADD Row 시에 customer, invoice currency 가 같은 경우만 check 해서 invoice 로 넘기기 위해 check box handling 로직 추가
		frFrtCheck(sheetObj, row, objPfx, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd);
	//Unit 선택시
	}else if(colStr==objPfx+"fr_aply_ut_cd"){
		if(air_sea_clss_cd=="S"){
			//Container인 경우 TP/SZ활성화
			if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='SCN'){
				sheetObj.SetCellEditable(row, objPfx+"fr_cntr_tpsz_cd",1);
				var curSheet=null;
				var cntrCnt=0;
				var cntrTpsz='';
				/*
				if(bnd_clss_cd=="O"){
					curSheet=docObjects[2];
				}else{
					if(biz_clss_cd=="M"){
						curSheet=docObjects[2];
					}else{
						curSheet=docObjects[1];
					}
				}
				*/
				curSheet=getCrtrSheet();
				/*
				for(var i=1 ; i<curSheet.LastRow() ; i++){
if(curSheet.GetCellValue(i, "cntr_no")!=""){
						cntrCnt++;
cntrTpsz=curSheet.GetCellValue(i, 'cntr_tpsz_cd');
					}
				}
				*/
				for(var i=1 ; i<curSheet.LastRow()+1 ; i++){	//+1
				    var qtyCnt=0;
				    for(var j=2 ; j<sheetObj.LastRow()+1 ; j++){	//+1
					   if( j != row 
							   //&& curSheet.CellValue(j, "cntr_no")!=""
							   && sheetObj.GetCellValue(j, objPfx+"fr_aply_ut_cd")=='SCN'
								   && sheetObj.GetCellValue(j, objPfx+"fr_cntr_tpsz_cd") == curSheet.GetCellValue(i, 0)
							   && sheetObj.GetCellText(j, objPfx+"fr_frt_cd") == sheetObj.GetCellText(row, objPfx+"fr_frt_cd")
							   && sheetObj.GetCellValue(j, objPfx+"fr_sell_buy_tp_cd") == sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd")){
						   qtyCnt=qtyCnt + parseInt(sheetObj.GetCellValue(j, objPfx+"fr_qty"));
					   }
					}
				    if(curSheet.GetCellValue(i, 1) - qtyCnt > 0){
				    	cntrTpsz=curSheet.GetCellValue(i, 0);
				    	cntrCnt=curSheet.GetCellValue(i, 1)-qtyCnt;
						break;
					}
				}
				//sheetObj.CellValue(row,		objPfx+'fr_cntr_tpsz_cd') = cntrTpsz;
				//sheetObj.CellValue2(row,		objPfx+"fr_qty") = cntrCnt;
				if(cntrTpsz != ""){
					sheetObj.SetCellValue(row, objPfx+"fr_cntr_tpsz_cd",curSheet.GetCellValue(i, 0),0);
					sheetObj.SetCellValue(row, objPfx+"fr_qty",cntrCnt);
				}else{
					sheetObj.SetCellValue(row,  objPfx+"fr_qty",'',0);
					sheetObj.SetCellValue(row,  objPfx+"fr_trf_cur_sum_amt",'',0);
				    sheetObj.SetCellValue(row, objPfx+"fr_cntr_tpsz_cd",'',0);
					//Selected \"Type/Size\" is already in use.\n\n\Please select other \"Type/Size\".
				    
				    //#2348 [IMPEX] Pop up error message not closing after click OK
				    if(cntrTpSzFlag){
				    	cntrTpSzFlag = false;
				    	alert(getLabel('COM_FRT_ALT009'));
				    }
				}
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='CBM'){
				sheetObj.SetCellEditable(row,  objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	objPfx+"fr_cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.meas.value);
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='CFT'){
				sheetObj.SetCellEditable(row,  objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	objPfx+"fr_cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.meas1.value);
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='KGS'){
				sheetObj.SetCellEditable(row,  objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	objPfx+"fr_cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.grs_wgt.value);
				
			// #48771 - [IMPEX] UNIT M/T와 R/T 로직 추가
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='MET'){
				sheetObj.SetCellEditable(row,  objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	objPfx+"fr_cntr_tpsz_cd",' ',0);
				sheetObj.SetCellValue(row,		objPfx+"fr_qty", roundXL(frm1.grs_wgt.value.replaceAll(",","") / 1000, 3));
				
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='RET'){
				sheetObj.SetCellEditable(row,  objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,	objPfx+"fr_cntr_tpsz_cd",' ',0);
				
				var grs_wgt = roundXL(frm1.grs_wgt.value.replaceAll(",","") / 1000, 3);
				var meas = Number(frm1.meas.value.replaceAll(",",""));
				
				if(grs_wgt > meas){
					sheetObj.SetCellValue(row,objPfx+"fr_qty",grs_wgt);
				} else {
					sheetObj.SetCellValue(row,objPfx+"fr_qty",meas);
				}
				
			}else{
				sheetObj.SetCellEditable(row, objPfx+"fr_cntr_tpsz_cd",0);
				sheetObj.SetCellValue(row,		objPfx+"fr_cntr_tpsz_cd",' ',0);
				//#3411 [JTC]Accounting & Performance 수정사항
				//Unit 을 변경해도 Vol. 변경 하지 않도록 주석처리
				//Japan Trust 470 테스트 
				sheetObj.SetCellValue(row,		objPfx+"fr_qty",'1');
				//Bug #23228  B/L Entry - Freight Tab 각 Billing Item 입력 시 Unit 선택에 따른 계산로직 오류
//				sheetObj.CellValue2(row,		objPfx+"fr_trf_cur_sum_amt") = '';
			}
		}else{
			//-----[20130208 OJG] 아래 부분에 Air Export -> Booking & House AWB Entry 메뉴의 Freight 탭 화면에서 ------
			// Account Receivable Debit/Credit Account Payable해당 내용을 세팅   
			if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='ACW'){
				if(air_sea_clss_cd=="A" && bnd_clss_cd=="O" && biz_clss_cd=="H" && objPfx==""){
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.agent_chg_wgt.value);
				}else{
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.chg_wgt.value);
				}
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='AGW'){
				if(air_sea_clss_cd=="A" && bnd_clss_cd=="O" && biz_clss_cd=="H" && objPfx==""){
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.agent_grs_wgt.value);
				}else{
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.grs_wgt.value);
				}
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='ACL'){
				if(air_sea_clss_cd=="A" && bnd_clss_cd=="O" && biz_clss_cd=="H" && objPfx==""){
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.agent_chg_wgt1.value);
				}else{
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.chg_wgt1.value);
				}
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='AGL'){
				if(air_sea_clss_cd=="A" && bnd_clss_cd=="O" && biz_clss_cd=="H" && objPfx==""){
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.agent_grs_wgt1.value);
				}else{
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.grs_wgt1.value);
				}
			//#1575	[BNX] INDIA - AWB FREIGHT UNIT에 PKG QTY 항목 추가
			}else if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='PKG'){
				if(air_sea_clss_cd=="A"){
					sheetObj.SetCellValue(row,		objPfx+"fr_qty",frm1.pck_qty.value);
				}	
			}else{
				sheetObj.SetCellValue(row,		objPfx+"fr_qty",'1');
				//sheetObj.CellValue2(row,		objPfx+"fr_trf_cur_sum_amt") = '';
			}
			//-----[20130208 OJG] -------------------------
		}
	//Unit이 Container인 경우 TP/SZ선택시 해당 수량을 넣어줌
	}else if(colStr==objPfx+"fr_cntr_tpsz_cd"){
		if(sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd")=='SCN'){
			var curFrtCd=sheetObj.GetCellText(row, objPfx+"fr_frt_cd");	//Freight Code
			var curGetCellText=trim(sheetObj.GetCellText(row, objPfx+"fr_cntr_tpsz_cd"));
			var curCellbuyTpCd=sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd");
			if(curGetCellText==''){
				sheetObj.SetCellValue(row, objPfx+"fr_qty",'',0);
				sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",'');
				//#4096 (GLI) 리허설 서버 반영 테스트 결과 49
				if(MULTI_CURR_FLAG == "Y"){
					sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",'');
				}
			}else{
				var minNum=0;
				if(curGetCellText.length>1){
					for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
						if(i!=row){
							//동일한 Freight Code에 동일한  Container Size가 사용되었는지 확인함
							if(sheetObj.GetCellValue(i, objPfx+"fr_aply_ut_cd")=='SCN'
								&& curFrtCd==sheetObj.GetCellText(i, objPfx+"fr_frt_cd")
									&&curGetCellText==sheetObj.GetCellText(i, objPfx+"fr_cntr_tpsz_cd")
									&&curCellbuyTpCd==sheetObj.GetCellValue(i, objPfx+"fr_sell_buy_tp_cd")){//dc_ 비교를 위해서 조건 추가, AR/AP 는 sell buy type 이 항상 같기때문에 상관없슴.
								minNum=minNum+parseInt(sheetObj.GetCellValue(i, objPfx+"fr_qty"));
							}
						}
					}
				}
				//이미 선택되었는지 확인한다.
				var curNum='';
				var cntrSheet=getCrtrSheet();
				for(var i=1; i < cntrSheet.LastRow() + 1; i++){
					if(curGetCellText==cntrSheet.GetCellValue(i, 0)){
						curNum=cntrSheet.GetCellValue(i, 1);
						break;
					}
				}
				var cntrQty=parseInt(curNum)-minNum;
				if(cntrQty>0){
					sheetObj.SetCellValue(row, objPfx+"fr_qty",cntrQty);
				}
				else{
					sheetObj.SetCellValue(row, objPfx+"fr_qty",'',0);
					sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",'',0);
				    sheetObj.SetCellValue(row, objPfx+"fr_cntr_tpsz_cd",'',0);
					//Selected \"Type/Size\" is already in use.\n\n\Please select other \"Type/Size\".
				    
				    //#2348 [IMPEX] Pop up error message not closing after click OK
				    if(cntrTpSzFlag){
				    	cntrTpSzFlag = false;
				    	alert(getLabel('COM_FRT_ALT009') + "\n\n: BL_FRT.1478");
				    }
				}
			}
		}		
	//P/C
	}else if(colStr==objPfx+"fr_frt_term_cd"){
		//Default Prepaid
//		var trdpCd = frm1.hid_shp_cd.value;
//		var trdpNm = frm1.hid_shp_nm.value;
//		
//		//Collected
//		if(sheetObj.CellValue(row, objPfx+"fr_frt_term_cd")=='CC'){
//			trdpCd = frm1.cnee_trdp_cd.value;
//			trdpNm = frm1.cnee_trdp_nm.value;
//		}
//	    sheetObj.CellValue(row, objPfx+"fr_trdp_cd") = trdpCd;
//	    sheetObj.CellValue(row, objPfx+"fr_trdp_nm") = trdpNm;
	//Tariff Currency
	}
	/*
	else if(colStr==objPfx+"fr_rat_curr_cd"){
		//Tariff Currency를 기준으로 생성된 값들을 초기화 한다.
		resetCurCd(sheetObj, row, objPfx);
	//Rate 입력시 Vat 계산
	}
	*/
	else if(colStr==objPfx+"fr_qty"||colStr==objPfx+"fr_ru"||colStr==objPfx+"fr_vat_rt"||colStr==objPfx+"fr_agent_ru"){		
		var valCnt=sheetObj.GetCellValue(row, objPfx+"fr_qty"); // .replaceAll(",","");
		//수량인경우
		if(colStr==objPfx+"fr_qty"){	
			var qty=sheetObj.GetCellValue(row, objPfx+"fr_qty");
			var ruStr=sheetObj.GetCellValue(row, objPfx+"fr_aply_ut_cd");
			if(isNaN(qty)){
				//Please input Number!
				alert(getLabel('FMS_COM_ALT005') + "\n\n: BL_FRT.1519");
				sheetObj.SetCellValue(row, objPfx+"fr_qty",'',0);
				return;
			}
			var totLen=qty.length;
			var dotIdx=(qty+"").indexOf('.');	// qty.indexOf('.');
			// 2011.08.19 김진혁 추가, RET 도 소수 3째 자리까지 입력할 수 있어야 함.
			//if(ruStr=='CBM'||ruStr=='KGS'||ruStr=='AKG'||ruStr=='ACW'||ruStr=='AGW'||ruStr=='AMT'||ruStr=='RET'){	//[20130401 OJG]
			if(ruStr=='CBM'||ruStr=='KGS'||ruStr=='AKG'||ruStr=='ACW'||ruStr=='AGW'||ruStr=='AMT'||ruStr=='RET' || ruStr=='HRS' || ruStr=='DAY' || ruStr=='UNT' || ruStr=='SHP'){	//[20130401 OJG]
				if(dotIdx>0){
					totLen=totLen-(dotIdx+1);
					if(totLen==0){
						sheetObj.SetCellValue(row, objPfx+"fr_qty",qty.substring(0, dotIdx),0);
					}else if(totLen>2){
						dotIdx=dotIdx+4;
						sheetObj.SetCellValue(row, objPfx+"fr_qty",qty.substring(0, dotIdx),0);
					}
				}
			}else{
				if(dotIdx>0){
					sheetObj.SetCellValue(row, objPfx+"fr_qty",qty.substring(0, dotIdx),0);
				}
				if(ruStr=='SCN'){
					var curGetCellText=trim(sheetObj.GetCellText(row, objPfx+"fr_cntr_tpsz_cd"));
					var curFrtCd=sheetObj.GetCellText(row, objPfx+"fr_frt_cd");	//Freight Code
					var curCellbuyTpCd=sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd");
					if(curGetCellText==''){
						sheetObj.SetCellValue(row, objPfx+"fr_qty",0,0);
					}else{
						var minNum=0;
						for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
							//동일한 Freight Code에 동일한  Container Size가 사용되었는지 확인함
							if(sheetObj.GetCellValue(i, objPfx+"fr_aply_ut_cd")=='SCN'
								&& curFrtCd==sheetObj.GetCellText(i, objPfx+"fr_frt_cd")
								&& curGetCellText==sheetObj.GetCellText(i, objPfx+"fr_cntr_tpsz_cd")
								&&curCellbuyTpCd==sheetObj.GetCellValue(i, objPfx+"fr_sell_buy_tp_cd")){//dc_ 비교를 위해서 조건 추가, AR/AP 는 sell buy type 이 항상 같기때문에 상관없슴.
								minNum=minNum+parseInt(sheetObj.GetCellValue(i, objPfx+"fr_qty"));
							}
						}
						//이미 선택되었는지 확인한다.
						var curNum='';
						var cntrSheet=getCrtrSheet();
						for(var i=1; i < cntrSheet.LastRow() + 1; i++){
							if(curGetCellText==cntrSheet.GetCellValue(i, 0)){
								curNum=cntrSheet.GetCellValue(i, 1);
								break;
							}
						}

						if(parseInt(curNum)<minNum){
							//#3411 [JTC]Accounting & Performance 수정사항
							//It does not match the Quantity!
							//alert(getLabel('COM_FRT_ALT010') + "\n\n: BL_FRT.1568");
							//Container Quantity is not matched. Do you want to proceed?
							//Warning Message 및 계속 진행 여부 확인 - 'true' 인 경우 그대로 진행
							//                                      'false' 인 경우 기존 값 유지
							if(!confirm(getLabel('COM_FRT_ALT010') + '\n\n: BL_FRT.1568')) {
								sheetObj.SetCellValue(row, objPfx+"fr_qty", free, 0);
								sheetObj.SelectCell(row, objPfx+"fr_qty");
								return;
							}
						}
					}
				}
			}
		}
		if(valCnt==''){
			valCnt=1;
		}
		//[20140730 OJG] - replaceAll 제거 : var tmpSum=getMultiplyFloat(valCnt, sheetObj.GetCellValue(row, objPfx+"fr_ru").replaceAll(",",""));
		var tmpSum=getMultiplyFloat(valCnt, sheetObj.GetCellValue(row, objPfx+"fr_ru"));
		if(sheetObj.GetCellValue(row, objPfx+"fr_vat_rt")>0){
			//단가별 Vat금액 = (세금비율*0.01)*단가 
			//[20150126 OJG] - VAT Cal 버튼 클릭시 Operation 별 VAT Freight 에 해당되는 Freight Row를 추가하는 방식으로 변경 - 아래 로직 제거
			/*
			var tmpRt=sheetObj.GetCellValue(row, objPfx+"fr_vat_rt")*0.01;
			tmpSum=getMultiplyFloat(tmpSum, tmpRt);
			sheetObj.SetCellValue(row, objPfx+"fr_vat_amt",tmpSum);
			*/
			
		}else{
			sheetObj.SetCellValue(row, objPfx+"fr_vat_amt",0);
		}
		//2010.12.20 김진혁 추가, Freight에 vol * rate 컬럼추가, 값 입력시 자동 계산로직 추가
		//[20140730 OJG] - replaceAll 제거 : sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",sheetObj.GetCellValue(row, objPfx+"fr_qty").replaceAll(",","") * sheetObj.GetCellValue(row, objPfx+"fr_ru").replaceAll(",",""));
//		sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",sheetObj.GetCellValue(row, objPfx+"fr_qty") * sheetObj.GetCellValue(row, objPfx+"fr_ru"));
		//[20141205 OJG] - Multi Currency
		if(MULTI_CURR_FLAG == "Y" && sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd") == "C" ){		//Credit
			//sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",sheetObj.GetCellValue(row, objPfx+"fr_qty") * sheetObj.GetCellValue(row, objPfx+"fr_agent_ru"));
			var trf_cur_sum_amt = Number(sheetObj.GetCellValue(row, objPfx+"fr_qty")) * Number(sheetObj.GetCellValue(row, objPfx+"fr_ru"));
			if(trf_cur_sum_amt >= 1000000000000000) {//15 digit
				ComShowCodeMessage('COM03230');
				if(colStr==objPfx+"fr_ru") {
					sheetObj.SetCellValue(row, objPfx+"fr_ru",0);
				} else {
					sheetObj.SetCellValue(row, objPfx+"fr_qty",0);
				}
				return;
			} else if(trf_cur_sum_amt <= -1000000000000000) {//15 digit
				ComShowCodeMessage('COM03233');
				sheetObj.SetCellValue(row, objPfx+"fr_qty",0);
				return;
			} else {
				sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",roundXL(trf_cur_sum_amt,2));
			}
		}else{
		//#1005  [CARGOZONE] OCEAN BUYING, SELLING RATE LOGIC : OEH Entry 기존 로직 수정
			var calRu = 0;
			
			if( sheetObj.GetCellValue(row, objPfx+"fr_ru") == "" || Number(sheetObj.GetCellValue(row, objPfx+"fr_ru")) == 0){				
				calRu = Number(sheetObj.GetCellValue(row, objPfx+"fr_agent_ru"));
			}else{				
				calRu = Number(sheetObj.GetCellValue(row, objPfx+"fr_ru"));
			}	
			var trf_cur_sum_amt = Number(sheetObj.GetCellValue(row, objPfx+"fr_qty")) * calRu;
			if(trf_cur_sum_amt >= 1000000000000000) {//15 digit
				ComShowCodeMessage('COM03230');
				if(colStr==objPfx+"fr_ru") {
					sheetObj.SetCellValue(row, objPfx+"fr_ru",0);
				} else {
					sheetObj.SetCellValue(row, objPfx+"fr_qty",0);
				}
				return;
			} else if(trf_cur_sum_amt <= -1000000000000000) {//15 digit
				ComShowCodeMessage('COM03233');
				sheetObj.SetCellValue(row, objPfx+"fr_qty",0);
				return;
			} else {
				sheetObj.SetCellValue(row, objPfx+"fr_trf_cur_sum_amt",roundXL(trf_cur_sum_amt,2));
			}
			
		}
		//Invoice Amt를계산함
		calcInvAmt(sheetObj, row, objPfx);
		//Performance Amt를 계산함
		calcPefrAmt(sheetObj, row, objPfx);
	//Invoice Currency
	}
	/*
	else if(colStr==objPfx+"fr_inv_curr_cd"){
		sheetObj.SetCellValue(row, objPfx+"fr_inv_xcrt",0);
		sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",0);
		sheetObj.SetCellValue(row, objPfx+"fr_inv_vat_amt",0);
	if(sheetObj.GetCellValue(row,  objPfx+"fr_inv_curr_cd")==sheetObj.GetCellValue(row, objPfx+"rat_curr_cd")){
			sheetObj.SetCellValue(row, objPfx+"fr_inv_xcrt",1);
		}
	}
	*/
	else if(colStr==objPfx+"fr_inv_xcrt"||colStr==objPfx+"fr_perf_xcrt"){
		//Invoice Amt를계산함
		calcInvAmt(sheetObj, row, objPfx);
		//Performance Amt를 계산함
		calcPefrAmt(sheetObj, row, objPfx);
	//inv_amt 및 inv_vat_amt 직접 수정시
	}else if(colStr==objPfx+"fr_inv_amt"||colStr==objPfx+"fr_inv_vat_amt"){
		var invCur=sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
		if(invCur=="KRW" || invCur=="JPY" || invCur=="VND"){
			sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_amt")).toFixed(0),0);
			sheetObj.SetCellValue(row, objPfx+"fr_inv_vat_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_vat_amt")).toFixed(0),0);
		}else{
			sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_amt")).toFixed(2),0);
			sheetObj.SetCellValue(row, objPfx+"fr_inv_vat_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_vat_amt")).toFixed(2),0);
		}
		var invAmt=sheetObj.GetCellValue(row, objPfx+"fr_inv_amt");
		var valAmt=sheetObj.GetCellValue(row, objPfx+"fr_inv_vat_amt");
		sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",getSumFloat(invAmt, valAmt));
	}else if(colStr==objPfx+"fr_inv_sum_amt"){
		var invCur=sheetObj.GetCellValue(row, objPfx+'fr_inv_curr_cd');
		if(invCur=="KRW" || invCur=="JPY" || invCur=="VND"){
			sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_sum_amt")).toFixed(0),0);
		}else{
			sheetObj.SetCellValue(row, objPfx+"fr_inv_sum_amt",parseFloat(sheetObj.GetCellValue(row, objPfx+"fr_inv_sum_amt")).toFixed(2),0);
		}
		if(sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd") == "D" || sheetObj.GetCellValue(row, objPfx+"fr_sell_buy_tp_cd") == "C"){		// Debit / Credit
			var invSumAmt=sheetObj.GetCellValue(row, objPfx+"fr_inv_sum_amt");
			var valAmt=sheetObj.GetCellValue(row, objPfx+"fr_inv_vat_amt") * -1;
			sheetObj.SetCellValue(row, objPfx+"fr_inv_amt",getSumFloat(invSumAmt, valAmt),0);
		}
	}
	//값이 변경 될 경우 Total Amount 를 확인 한 후 0 인 경우 warning 을 보여준다. 
	if(objPfx == 'dc_'){
		//Revenue 일 경우 
		if(sheetObj.GetCellValue(row, objPfx+'fr_sell_buy_tp_cd') == "D"){
			//fr_inv_sum_amt 가 0 일 경우 warning
			warningTotalAmount(sheetObj, row, objPfx+'fr_inv_sum_amt', sheetObj.GetCellValue(row, objPfx+'fr_inv_sum_amt'));
			sheetObj.SetCellBackColor(row, objPfx+'fr_agent_amt',sheetObj.GetDataBackColor());
		}	
		//Cost 일 경우 
		if(sheetObj.GetCellValue(row, objPfx+'fr_sell_buy_tp_cd') == "C"){
			//fr_inv_sum_amt 가 0 일 경우 warning
			warningTotalAmount(sheetObj, row, objPfx+'fr_agent_amt', sheetObj.GetCellValue(row, objPfx+'fr_agent_amt'));
			sheetObj.SetCellBackColor(row, objPfx+'fr_inv_sum_amt',sheetObj.GetDataBackColor());
		}
	}else{
		warningTotalAmount(sheetObj, row, objPfx+'fr_inv_sum_amt', sheetObj.GetCellValue(row, objPfx+'fr_inv_sum_amt'));
	}
}
function mutiSheetOnSearchEnd(sheetObj, row, col, callType, objPfx) {
	sdCheckTrdp='';
	sdCheckCnt=0;
	bcCheckTrdp='';
	bcCheckCnt=0;
	//Freight 항목이 등록이 된 경우에만 후 처리
	if(sheetObj.GetCellValue(2, objPfx+'fr_trdp_cd')!=''){
		doSumFrt(sheetObj, callType, objPfx);
	}else{
		/*
		if(objPfx==''){
			frm1.inv_sell.value=0;
			frm1.inv_debit.value=0;
			frm1.inv_total.value=0;
		}else{
			frm1.b_inv_sell.value=0;
			frm1.b_inv_debit.value=0;
			frm1.b_inv_total.value=0;
		}
		*/
	}
	//LHK 20130321 
	//Debit or Credit 일 경우 Prepaid 일 경우 Revenue 일 경우 Debit 에 agnet_amt Cost 일 경우 Credit 에 amt 를 출력
	if(objPfx == 'dc_'){
		for(var i=2; i < sheetObj.LastRow() + 1; i++){
			if(sheetObj.GetCellValue(i, objPfx+"fr_frt_term_cd")=='PP'){
				if(sheetObj.GetCellValue(i, objPfx+"fr_sell_buy_tp_cd")=='D'){
					sheetObj.SetCellValue(i, objPfx+"fr_inv_sum_amt",sheetObj.GetCellValue(i, objPfx+"fr_org_agent_amt"),0);
				}
				if(sheetObj.GetCellValue(i, objPfx+"fr_sell_buy_tp_cd")=='C'){
					sheetObj.SetCellValue(i, objPfx+"fr_agent_amt",sheetObj.GetCellValue(i, objPfx+"fr_org_agent_amt"),0);
				}
			}
			/*if(sheetObj.GetCellValue(i, objPfx+"fr_sell_buy_tp_cd")=='D'){
				sheetObj.SetCellValue(i, objPfx+"fr_agent_ru",0,0);
			}
			if(sheetObj.GetCellValue(i, objPfx+"fr_sell_buy_tp_cd")=='C'){
				sheetObj.SetCellValue(i, objPfx+"fr_ru",0,0);
			}*/
			if(sheetObj.GetCellValue(i, objPfx+'fr_inv_sts_cd') == 'FI' || sheetObj.GetCellValue(i, objPfx+'fr_inv_sts_cd') == ''){
				//fr_inv_sum_amt 가 0 일 경우 warning
				//Revenue 일 경우 
				if(sheetObj.GetCellValue(i, objPfx+'fr_sell_buy_tp_cd') == "D"){
					//fr_inv_sum_amt 가 0 일 경우 warning
					warningTotalAmount(sheetObj, i, objPfx+'fr_inv_sum_amt', sheetObj.GetCellValue(i, objPfx+'fr_inv_sum_amt'));
					sheetObj.SetCellBackColor(i, objPfx+'fr_agent_amt',sheetObj.GetDataBackColor());
					//Credit 입력 제한 
					//sheetObj.SetCellEditable(i, objPfx+'fr_ru',1);
					//sheetObj.SetCellValue(i, objPfx+'fr_agent_ru',0);
					//sheetObj.SetCellEditable(i, objPfx+'fr_agent_ru',0);
					sheetObj.SetCellEditable(i, objPfx+'fr_inv_sum_amt',1);
					sheetObj.SetCellValue(i, objPfx+'fr_agent_amt',0);
					sheetObj.SetCellEditable(i, objPfx+'fr_agent_amt',0);
				}	
				//Cost 일 경우 
				if(sheetObj.GetCellValue(i, objPfx+'fr_sell_buy_tp_cd') == "C"){
					//fr_inv_sum_amt 가 0 일 경우 warning
					warningTotalAmount(sheetObj, i, objPfx+'fr_agent_amt', sheetObj.GetCellValue(i, objPfx+'fr_agent_amt'));
					sheetObj.SetCellBackColor(i, objPfx+'fr_inv_sum_amt',sheetObj.GetDataBackColor());
					//Debit 입력 제한
					//sheetObj.SetCellValue(i, objPfx+'fr_ru',0);
					//sheetObj.SetCellEditable(i, objPfx+'fr_ru',0);
					//sheetObj.SetCellEditable(i, objPfx+'fr_agent_ru',1);
					sheetObj.SetCellEditable(i, objPfx+'fr_inv_sum_amt',0);
					sheetObj.SetCellValue(i, objPfx+'fr_inv_sum_amt',0);
					sheetObj.SetCellEditable(i, objPfx+'fr_agent_amt',1);
				}
			}
		}			
	}	
}
function confirmCheck(sheetObj, row, objPfx){
	for(var i=headerRowCnt; i < sheetObj.LastRow() ; i++){
		if(sheetObj.GetCellValue(i, objPfx+"fr_inv_sts_cd") == "FC"){
			sheetObj.SetCellEditable(i, objPfx+"fr_frt_check",0);
		}else{
			sheetObj.SetCellEditable(i, objPfx+"fr_frt_check",1);
		}
	}
}
/**
 * 저장되지 않은 Row의 데이터가 있는지 확인함
 */
function allSaveCheck(sheetObj, objPfx){
	var isAllSaved=true;
	var frtRow=sheetObj.LastRow();
	if(frtRow==2){
		isAllSaved=false;	
	}else{
		for(var i=2; i < frtRow; i++){
			if(sheetObj.GetCellValue(i, objPfx+"fr_frt_seq")==''){
				isAllSaved=false;	
			}
		}
	}
	return isAllSaved;
}
/**
 * 자동완성 기능 처리하는 Function임
 */
/*
function doAutoCdFind(objPrefix, sheetObj, row, col, keyCode){
	//Tab인 경우
	if(keyCode==9){
		var curCols=sheetObj.cols;
		curCols--;
		if(curCols!=col){
			col--;
		}
		var colStr=sheetObj.ColSaveName(col);
		//Freight 코드 Name조회
		if(colStr==objPrefix+'fr_frt_cd'||colStr==objPrefix+'fr_frt_cd_nm'){
var codeStr=sheetObj.GetCellValue(row, objPrefix+'fr_frt_cd');
			if(codeStr.length>2){
				//결과를 표시할 Col을 초기화함
				sheetObj.SetCellValue(row, objPrefix+'fr_frt_cd_nm','');
				doAutoSearch(sheetObj, row, objPrefix+'fr_frt_cd', 'freight', codeStr, objPrefix+'fr_frt_cd', objPrefix+'fr_frt_cd_nm');	
			}else{
				//The code is not enough to search
				alert(getLabel('FMS_COM_ALT014') + "\n\n: BL_FRT.1643");
				sheetObj.SelectCell(row, objPrefix+'fr_frt_cd');
			}
		//Trade Partner Code
		}else if(colStr==objPrefix+'fr_trdp_cd'){
var codeStr=sheetObj.GetCellValue(row, objPrefix+'fr_trdp_cd');
			if(codeStr.length>2){
				//결과를 표시할 Col을 초기화함
				sheetObj.SetCellValue(row, objPrefix+'fr_trdp_nm','');
				doAutoSearch(sheetObj, row, col, 'trdpcode', codeStr, objPrefix+'fr_trdp_cd', objPrefix+'fr_trdp_nm');	
			}else{
				//The code is not enough to search
				alert(getLabel('FMS_COM_ALT014') + "\n\n: BL_FRT.1658");
				sheetObj.SelectCell(row, colStr);
			}
		//Tariff Currency 조회
		}else if(colStr==objPrefix+'fr_rat_curr_cd'){
var codeStr=sheetObj.GetCellValue(row, objPrefix+'fr_rat_curr_cd');
			if(codeStr.length>2){
				//결과를 표시할 Col을 초기화함
				doAutoSearch(sheetObj, row, col, 'currency', codeStr, objPrefix+'fr_rat_curr_cd', objPrefix+'fr_rat_curr_cd');	
			}else{
				//The code is not enough to search
				alert(getLabel('FMS_COM_ALT014') + "\n\n: BL_FRT.1671");
				sheetObj.SelectCell(row, colStr);
			}
		//Buying/Credit Invoice Currency
		}else if(colStr==objPrefix+'fr_inv_curr_cd'){
var codeStr=sheetObj.GetCellValue(row, objPrefix+'fr_inv_curr_cd');
			if(codeStr.length>2){
				var tmpCurr=codeStr.toUpperCase();
if(tmpCurr==sheetObj.GetCellValue(row, objPrefix+'fr_rat_curr_cd')){
					sheetObj.SetCellValue(row, objPrefix+'fr_inv_xcrt',1);
				}
				//결과를 표시할 Col을 초기화함
				doAutoSearch(sheetObj, row, col, 'currency', codeStr, objPrefix+'fr_inv_curr_cd', objPrefix+'fr_inv_curr_cd');	
			}else{
				//The code is not enough to search
				alert(getLabel('FMS_COM_ALT014') + "\n\n: BL_FRT.1690");
				sheetObj.SelectCell(row, colStr);
			}
		}
	}
}
*/
var curTab;
/**
 * Sea Default Fregiht Display
 */
function setDfltFrt(tabStr, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd){
	curTab=tabStr;
	var tmp_dt=frm1.xcrtDt.value.replaceAll("-", "");
	var param=''; 
	param += '&cur_dt=' + tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
	param += '&air_sea_clss_cd=' + air_sea_clss_cd;
	param += '&bnd_clss_cd=' + bnd_clss_cd;
	param += '&biz_clss_cd=' + biz_clss_cd;
	param += '&tabStr=' + tabStr;
	ajaxSendPost(dispDfltAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getDfltFrt&f_sea_use_flg=Y' + param, './GateServlet.gsl');
}
/**
 * Air Default Fregiht Display
 */
function setAirDfltFrt(tabStr, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd){
	curTab=tabStr;
	var tmp_dt=frm1.xcrtDt.value.replaceAll("-", "");
	var param=''; 
	param += '&cur_dt=' + tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
	param += '&air_sea_clss_cd=' + air_sea_clss_cd;
	param += '&bnd_clss_cd=' + bnd_clss_cd;
	param += '&biz_clss_cd=' + biz_clss_cd;
	param += '&tabStr=' + tabStr;
	ajaxSendPost(dispDfltAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getDfltFrt&f_air_use_flg=Y' + param, './GateServlet.gsl');
}
/**
 * Sea Default Fregiht Display
 */
function setDfltFrtInvS(tabStr, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd){
	curTab=tabStr;
	var tmp_dt=frm1.xcrtDt.value.replaceAll("-", "");
	var param=''; 
	param += '&cur_dt=' + tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
	param += '&air_sea_clss_cd=' + air_sea_clss_cd;
	param += '&bnd_clss_cd=' + bnd_clss_cd;
	param += '&biz_clss_cd=' + biz_clss_cd;
	param += '&tabStr=';
	ajaxSendPost(dispDfltInvAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getDfltFrt&f_sea_use_flg=Y' + param, './GateServlet.gsl');
}
/**
 * Sea Default Fregiht Display
 */
function setDfltFrtInvB(tabStr, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd){
	curTab=tabStr;
	var tmp_dt=frm1.xcrtDt.value.replaceAll("-", "");
	var param=''; 
	param += '&cur_dt=' + tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
	param += '&air_sea_clss_cd=' + air_sea_clss_cd;
	param += '&bnd_clss_cd=' + bnd_clss_cd;
	param += '&biz_clss_cd=' + biz_clss_cd;
	param += '&tabStr=b_';
	ajaxSendPost(dispDfltInvAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getDfltFrt&f_sea_use_flg=Y' + param, './GateServlet.gsl');
}
/**
 * Sea Default Fregiht Display
 */
function setDfltFrtInvDC(tabStr, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd){
	curTab=tabStr;
	var tmp_dt=frm1.xcrtDt.value.replaceAll("-", "");
	var param=''; 
	param += '&cur_dt=' + tmp_dt.substring(4,8) + tmp_dt.substring(0,2) + tmp_dt.substring(2,4);
	param += '&air_sea_clss_cd=' + air_sea_clss_cd;
	param += '&bnd_clss_cd=' + bnd_clss_cd;
	param += '&biz_clss_cd=' + biz_clss_cd;
	param += '&tabStr=dc_';
	ajaxSendPost(dispDfltInvAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getDfltFrt&f_sea_use_flg=Y' + param, './GateServlet.gsl');
}
/**
 * 열추가 표시
 */
function doDispDfltFrtInv(rtnArr, curTab, addRowStr, curSheet){
	var loopLen=rtnArr.length;
	loopLen--;
	for(var i=0; i < loopLen; i++){
		var masterVals=rtnArr[i].split('@^');	
		var usedFrtCd=false;
		var tmpTotRows=curSheet.LastRow();
		//사용된 Freight Code가 아닌 경우 열추가 및 코드값 입력
		if(!usedFrtCd){
			// frtRowAdd(addRowStr, curSheet, masterVals[8], masterVals[9], masterVals[10], 'D');
			doWork(addRowStr);
			tmpTotRows=curSheet.LastRow()+1;	
			tmpTotRows--;
			// #4962 [JH Logistics] Billing Code Unit assignment not working
			//if(curTab!='dc_') {
				curSheet.SetCellValue(tmpTotRows, 'frt_cd',masterVals[0], 1);
			//}else{
			//	curSheet.SetCellValue(tmpTotRows, 'frt_cd',masterVals[0], 0);
			//}
			curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1],0);
			/*
			curSheet.SetCellValue(tmpTotRows, "rat_curr_cd",masterVals[2],0);
			if(curSheet.GetCellValue(tmpTotRows, "inv_aply_curr_cd")==masterVals[2]){
				curSheet.SetCellValue(tmpTotRows, 'inv_xcrt',1,0);
			}else{
				curSheet.SetCellValue(tmpTotRows, 'inv_xcrt',masterVals[4],0);
			}
			curSheet.SetCellValue(tmpTotRows, 'inv_xcrt_dt',masterVals[3],0);
			*/
			if(masterVals[8]=="A"){
				if(masterVals[9]=='O' && masterVals[10]=="H"){
					if(eval(frm1.chg_wgt.value) + eval(frm1.chg_wgt1.value) == 0 ){
						//#2657 [CLC]Default New 버튼 Billing Code 연계
						if(curSheet.GetCellValue(tmpTotRows, 'aply_ut_cd') == ""){
							curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd',"UNIT",0);
						}
						curSheet.SetCellValue(tmpTotRows, 'cntr_tpsz_cd','',0);
						curSheet.SetCellValue(tmpTotRows, 'qty',1,0);
					}else if(frm1.customer_unit_chk.value == 'K'){
						//#2657 [CLC]Default New 버튼 Billing Code 연계
						if(curSheet.GetCellValue(tmpTotRows, 'aply_ut_cd') == ""){
							curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd',"ACW",0);
						}
						curSheet.SetCellValue(tmpTotRows, 'cntr_tpsz_cd','',0);
						curSheet.SetCellValue(tmpTotRows, 'qty',frm1.chg_wgt.value,0);
					}else{
						//#2657 [CLC]Default New 버튼 Billing Code 연계
						if(curSheet.GetCellValue(tmpTotRows, 'aply_ut_cd') == ""){
							curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd',"ACL",0);
						}
						curSheet.SetCellValue(tmpTotRows, 'cntr_tpsz_cd','',0);
						curSheet.SetCellValue(tmpTotRows, 'qty',frm1.chg_wgt1.value,0);
					}
				}else{
					//#2657 [CLC]Default New 버튼 Billing Code 연계
					if(curSheet.GetCellValue(tmpTotRows, 'aply_ut_cd') == ""){
						curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd',"ACW",0);
					}
					curSheet.SetCellValue(tmpTotRows, 'cntr_tpsz_cd','',0);
					curSheet.SetCellValue(tmpTotRows, 'qty',frm1.chg_wgt.value,0);
				}
			}else{
				//#2657 [CLC]Default New 버튼 Billing Code 연계
				if(curSheet.GetCellValue(tmpTotRows, 'aply_ut_cd') == ""){
					curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd','B/L',0);
				}
				curSheet.SetCellValue(tmpTotRows, 'cntr_tpsz_cd','',0);
				// #4174 [BNX] V461.11 RATE, AMOUNT ERROR
				if(curSheet.GetCellValue(tmpTotRows, 'qty') == ""){
					curSheet.SetCellValue(tmpTotRows, 'qty',1,0);
				}
			}
			if(curTab=='dc_') {
				/*
				 * Agent_rt, Customer_rt 반영
				 * masterVals[9] == bnd_clss_cd (해상 수출, 항공 수출)
				 * masterVals[7] == frt_clss_cd (FC)
				 */
				if(masterVals[8]=="A" && masterVals[9]=='O'){
					if(masterVals[7]=="FC" || masterVals[7]=="SC"){
						curSheet.SetCellValue(tmpTotRows, 'sell_buy_tp_cd','D',0);
						curSheet.SetCellValue(tmpTotRows, 'frt_term_cd','CC',0);
						//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
						if(masterVals[10]=="H"){
							if(frm1.cust_rt.value == ""){
								curSheet.SetCellValue(tmpTotRows, 'ru',0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'ru', frm1.cust_rt.value);
							}
							if(frm1.cust_amt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'inv_amt', 0);
								curSheet.SetCellValue(tmpTotRows, 'inv_sum_amt', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'inv_amt', frm1.cust_amt.value.replaceAll(",","")*1);
								curSheet.SetCellValue(tmpTotRows, 'inv_sum_amt', frm1.cust_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'inv_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));// dc_fr_inv_amt
							//curSheet.SetCellValue(tmpTotRows, 'inv_sum_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));//dc_fr_inv_sum_amt
							if(frm1.cust_rt.value!=''){
								if(masterVals[7]=="FC"){
									//Bug #25736 - [20140128 OJG] DC ENTRY 화면에서 Default New 버튼클릭할때 에러발생된 지점.
									if(frm1.customer_unit_chk.value == 'K'){
										curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'frt_cd_nm') + "(" + frm1.chg_wgt.value + " * " + Number(frm1.cust_rt.value).toFixed(2) + ")",0);//dc_fr_frt_cd_nm
									}else {
										curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'frt_cd_nm') + "(" + frm1.chg_wgt1.value + " * " + Number(frm1.cust_rt.value).toFixed(2) + ")",0);
									}
								}else{
									curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'frt_cd_nm'),0);
								}
							}
						}
						//Agent row를 하나 더 추가한다.
						// frtRowAdd(addRowStr, curSheet, masterVals[8], masterVals[9], masterVals[10], 'D');
						doWork(addRowStr);
						
						tmpTotRows=curSheet.LastRow()+1; // curSheet.Rows--> curSheet.LastRow() + 1 로 변경
						tmpTotRows--;
						curSheet.SetCellValue(tmpTotRows, 'sell_buy_tp_cd','C',0);
						//Bug #25736 - [20140128 OJG] DC ENTRY 화면에서 Default New 버튼클릭할때 에러발생된 지점.
						if(masterVals[7]=="FC"){
							if(frm1.customer_unit_chk.value == 'K'){
								if(curSheet.GetCellValue(tmpTotRows, 'sell_buy_tp_cd') == 'C'){
									curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1] + "(" + frm1.grs_wgt.value + " * " + Number(frm1.agent_rt.value).toFixed(2) + ")",0);//dc_fr_frt_cd_nm
								}else{
									curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1] + "(" + frm1.chg_wgt.value + " * " + Number(frm1.cust_rt.value).toFixed(2) + ")",0);//dc_fr_frt_cd_nm
								}
							}else {
								if(curSheet.GetCellValue(tmpTotRows, 'sell_buy_tp_cd') == 'C'){
									curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1] + "(" + frm1.grs_wgt1.value + " * " + Number(frm1.agent_rt.value).toFixed(2) + ")",0);
								}else{
									curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1] + "(" + frm1.chg_wgt1.value + " * " + Number(frm1.cust_rt.value).toFixed(2) + ")",0);
								}
							}
						}else{
							curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1],0);//dc_fr_frt_cd_nm
						}
						if(masterVals[10]=="H"){
							curSheet.SetCellValue(tmpTotRows, 'trdp_cd',frm1.prnr_trdp_cd.value,0);
							curSheet.SetCellValue(tmpTotRows, 'trdp_nm',frm1.prnr_trdp_nm.value,0);
							if(frm1.agent_rt.value==''){
								curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1],0);
							}
							//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
							if(frm1.agent_rt.value == ""){
								curSheet.SetCellValue(tmpTotRows, 'agent_ru', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'agent_ru', frm1.agent_rt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'agent_ru',frm1.agent_rt.value==''? 0 : frm1.agent_rt.value.replaceAll(",",""));
							//curSheet.SetCellValue(tmpTotRows, 'agent_amt',frm1.agent_amt.value==''? 0 : frm1.agent_amt.value.replaceAll(",",""));
						}
						curSheet.SetCellValue(tmpTotRows, 'frt_cd',masterVals[0],0);
						/*
						curSheet.SetCellValue(tmpTotRows, 'rat_curr_cd',masterVals[2],0);
						if(curSheet.GetCellValue(tmpTotRows, 'inv_aply_curr_cd')==masterVals[2]){
							curSheet.SetCellValue(tmpTotRows, 'inv_xcrt',1,0);
						}else{
							curSheet.SetCellValue(tmpTotRows, 'inv_xcrt',masterVals[4],0);
						}
						curSheet.SetCellValue(tmpTotRows, 'inv_xcrt_dt',masterVals[3],0);
						*/
						if(masterVals[8]=="A"){
							if(masterVals[9]=='O' && masterVals[10]=="H"){
								if(eval(frm1.chg_wgt.value) + eval(frm1.chg_wgt1.value) == 0 ){
									curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd',"UNIT",0);
									curSheet.SetCellValue(tmpTotRows, 'cntr_tpsz_cd','',0);
									curSheet.SetCellValue(tmpTotRows, 'qty',1,0);
								}else if(frm1.agent_unit_chk.value == 'K'){
									curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd',"AGW",0);
									curSheet.SetCellValue(tmpTotRows, 'cntr_tpsz_cd','',0);
									curSheet.SetCellValue(tmpTotRows, 'qty',frm1.grs_wgt.value,0);
								}else{
									curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd',"AGL",0);
									curSheet.SetCellValue(tmpTotRows, 'cntr_tpsz_cd','',0);
									curSheet.SetCellValue(tmpTotRows, 'qty',frm1.grs_wgt1.value,0);
								}
							}else{
								curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd',"ACW",0);
								curSheet.SetCellValue(tmpTotRows, 'cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, 'qty',frm1.chg_wgt.value,0);
							}
						}else{
							curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd','B/L',0);
							curSheet.SetCellValue(tmpTotRows, 'cntr_tpsz_cd','',0);
							curSheet.SetCellValue(tmpTotRows, 'qty',1,0);
						}
						curSheet.SetCellValue(tmpTotRows, 'ru',Number(frm1.agent_rt.value).toFixed(3));
						//alert(curSheet.CellValue(tmpTotRows, 'ru'));
					}
					/*
					if(masterVals[8]=="A"){
						if(masterVals[10]=="H"){
							if(frm1.customer_unit_chk.value == 'K'){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd',"AGW",0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.grs_wgt.value,0);
								alert(curSheet.GetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd') );
							}else if(frm1.agent_unit_chk[1].checked){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd',"AGL",0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.grs_wgt1.value,0);
								alert(curSheet.GetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd') );
							}
						}
					}
					*/
				}
				//원래 조건
				//if(masterVals[8]=="S" && masterVals[9]=='O' && masterVals[10]=='H'){
				if(masterVals[8]=="S" && masterVals[9]=='O'){
					if(masterVals[7]=="FC" || masterVals[7]=="SC"){
						curSheet.SetCellValue(tmpTotRows, 'sell_buy_tp_cd','D',0);
						curSheet.SetCellValue(tmpTotRows, 'frt_term_cd','CC',0);
						if(frm1.shp_mod_cd.value=="FCL"){
							//LHK 2013.01.31 FCL 인 경우 BL 선택 QTY 1, Debit/Credit Rate 에  Amount 를 Set.
							if(curSheet.GetCellValue(tmpTotRows, 'sell_buy_tp_cd') == 'D'){
								curSheet.SetCellValue(tmpTotRows, 'ru',curSheet.GetCellValue(tmpTotRows, 'inv_sum_amt'),0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'agent_ru',curSheet.GetCellValue(tmpTotRows, 'agent_amt'),0);
							}
						}
						//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
						if(masterVals[10]=="H"){
							if(frm1.cust_rt.value == ""){
								curSheet.SetCellValue(tmpTotRows, 'ru',0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'ru',frm1.cust_rt.value.replaceAll(",","")*1);
							}
							if(frm1.cust_amt.value == ""){
								curSheet.SetCellValue(tmpTotRows, 'inv_amt',0);
								curSheet.SetCellValue(tmpTotRows, 'inv_sum_amt',0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'inv_amt',frm1.cust_amt.value.replaceAll(",","")*1);
								curSheet.SetCellValue(tmpTotRows, 'inv_sum_amt',frm1.cust_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'ru',frm1.cust_rt.value==''? 0 : frm1.cust_rt.value.replaceAll(",",""));
							//curSheet.SetCellValue(tmpTotRows, 'inv_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));
							//curSheet.SetCellValue(tmpTotRows, 'inv_sum_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));
							//LHK 2013.01.31 FCL 인 경우 BL 선택 QTY 1, Debit/Credit Rate 에  Amount 를 Set
							if(frm1.shp_mod_cd.value=="FCL"){
								curSheet.SetCellValue(tmpTotRows, 'ru',curSheet.GetCellValue(tmpTotRows, 'inv_sum_amt'));
							//#1005  [CARGOZONE] OCEAN BUYING, SELLING RATE LOGIC
							}else{ 								
								var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
								var retWgt=roundXL(grsWgtKg / 1000, 3);
								var cbm=frm1.meas.value.replaceAll(",","");
								if(cbm<1){
									cbm=1;
								}
								if(retWgt<1){
									retWgt=1;
								}
								if(retWgt > cbm){
									curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd','RET',0);
									curSheet.SetCellValue(tmpTotRows, 'qty',retWgt);
								}else{
									curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd','CBM');
									curSheet.SetCellValue(tmpTotRows, 'qty',frm1.meas.value);
								}
							}
							if(frm1.cust_rt.value!=''){
								if(masterVals[7]=="FC"){
									//#1005  [CARGOZONE] OCEAN BUYING, SELLING RATE LOGIC 
									//curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'frt_cd_nm') + "("+ frm1.meas.value + " * " + Number(frm1.cust_rt.value).toFixed(2) +")",0);
									var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
									var retWgt=roundXL(grsWgtKg / 1000, 3);
									var cbm=frm1.meas.value.replaceAll(",","");
									if(cbm<1){
										cbm=1;
									}
									if(retWgt<1){
										retWgt=1;
									}
									if(retWgt > cbm){
										curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1] + "(" + Number(retWgt).toFixed(2) + " * " + Number(frm1.cust_rt.value).toFixed(2) + ")",0);
									}else{
										curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1] + "(" + cbm + " * " + Number(frm1.cust_rt.value).toFixed(2) + ")",0);
									}
									
								}else{
									curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'frt_cd_nm'),0);
								}
							}
						}
						//Agent row를 하나 더 추가한다.
						// frtRowAdd(addRowStr, curSheet, masterVals[8], masterVals[9], masterVals[10], 'D');
						doWork(addRowStr);
						tmpTotRows=curSheet.LastRow()+1; // curSheet.Rows--> curSheet.LastRow() + 1 로 변경
						tmpTotRows--;
						if(masterVals[10]=="H"){
							curSheet.SetCellValue(tmpTotRows, 'trdp_cd',frm1.prnr_trdp_cd.value,0);
							curSheet.SetCellValue(tmpTotRows, 'trdp_nm',frm1.prnr_trdp_nm.value,0);
							if(frm1.agent_rt.value==''){
								curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1],0);
							}else{
								if(masterVals[7]=="FC"){
									//#1005  [CARGOZONE] OCEAN BUYING, SELLING RATE LOGIC 
									//curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1] + "("+ frm1.meas.value + " * " + Number(frm1.agent_rt.value).toFixed(2) +")",0);
									var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
									var retWgt=roundXL(grsWgtKg / 1000, 3);
									var cbm=frm1.meas.value.replaceAll(",","");
									if(cbm<1){
										cbm=1;
									}
									if(retWgt<1){
										retWgt=1;
									}
									if(retWgt > cbm){
										curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1] + "(" + Number(retWgt).toFixed(2) + " * " + Number(frm1.agent_rt.value).toFixed(2) + ")",0);
									}else{
										curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1] + "(" + cbm + " * " + Number(frm1.agent_rt.value).toFixed(2) + ")",0);
									}
								}else{
									curSheet.SetCellValue(tmpTotRows, 'frt_cd_nm',masterVals[1],0);
								}
							}
							//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
							if(frm1.agent_rt.value == ""){
								curSheet.SetCellValue(tmpTotRows, 'agent_ru',0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'agent_ru',frm1.agent_rt.value.replaceAll(",","")*1);
							}
							if(frm1.agent_amt.value == ""){
								curSheet.SetCellValue(tmpTotRows, 'agent_amt',0);
							}else{
								/* #811	[CLT] Debit/Note - Sellling / Buying Rate 중 - Buying Rate 적용문제
								 * before : curSheet.SetCellValue(tmpTotRows, 'agent_amt',frm1.agent_amt.value.replaceAll(",","")*1,0);
								 * after  : curSheet.SetCellValue(tmpTotRows, 'agent_amt',frm1.agent_amt.value.replaceAll(",","")*1);
								*/
								curSheet.SetCellValue(tmpTotRows, 'agent_amt',frm1.agent_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'agent_ru',frm1.agent_rt.value==''? 0 : frm1.agent_rt.value.replaceAll(",",""));
							//curSheet.SetCellValue(tmpTotRows, 'agent_amt',frm1.agent_amt.value==''? 0 : frm1.agent_amt.value.replaceAll(",",""));
						}
						curSheet.SetCellValue(tmpTotRows, 'frt_cd',masterVals[0],0);
						/*
						curSheet.SetCellValue(tmpTotRows, 'rat_curr_cd',masterVals[2],0);
						if(curSheet.GetCellValue(tmpTotRows, 'inv_aply_curr_cd')==masterVals[2]){
							curSheet.SetCellValue(tmpTotRows, 'inv_xcrt',1,0);
						}else{
							curSheet.SetCellValue(tmpTotRows, 'inv_xcrt',masterVals[4],0);
						}
						curSheet.SetCellValue(tmpTotRows, 'inv_xcrt_dt',masterVals[3],0);
						*/
						curSheet.SetCellValue(tmpTotRows, 'qty',1,0);
						curSheet.SetCellValue(tmpTotRows, 'sell_buy_tp_cd','C',0);
						if(frm1.shp_mod_cd.value=="FCL"){
							curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd','B/L',0);
							curSheet.SetCellValue(tmpTotRows, 'qty',1,0);
							//LHK 2013.01.31 FCL 인 경우 BL 선택 QTY 1, Debit/Credit Rate 에  Amount 를 Set.
							if(curSheet.GetCellValue(tmpTotRows, 'sell_buy_tp_cd') == 'D'){
								curSheet.SetCellValue(tmpTotRows, 'ru',curSheet.GetCellValue(tmpTotRows, 'inv_sum_amt'),0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'agent_ru',curSheet.GetCellValue(tmpTotRows, 'agent_amt'),0);
							}
						//#1005  [CARGOZONE] OCEAN BUYING, SELLING RATE LOGIC
						}else{ 
							var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
							var retWgt=roundXL(grsWgtKg / 1000, 3);
							var cbm=frm1.meas.value.replaceAll(",","");
							if(cbm<1){
								cbm=1;
							}
							if(retWgt<1){
								retWgt=1;
							}
							if(retWgt > cbm){
								curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd','RET',0);
								curSheet.SetCellValue(tmpTotRows, 'qty',retWgt,0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'aply_ut_cd','CBM');
								curSheet.SetCellValue(tmpTotRows, 'qty',frm1.meas.value,0);
							}	
							curSheet.SetCellValue(tmpTotRows, 'ru',Number(frm1.agent_rt.value).toFixed(3));
						}
					}
				}
				//fr_inv_sum_amt 가 0 일 경우 warning
				//Revenue 일 경우 
				if(curSheet.GetCellValue(tmpTotRows, 'sell_buy_tp_cd') == "D"){
					//fr_inv_sum_amt 가 0 일 경우 warning
					warningTotalAmount(curSheet, tmpTotRows, 'inv_sum_amt', curSheet.GetCellValue(tmpTotRows, 'inv_sum_amt'));
					curSheet.SetCellBackColor(tmpTotRows, 'agent_amt',curSheet.GetDataBackColor());
					//Credit 입력 제한 
					curSheet.SetCellEditable(tmpTotRows, "ru",1);
					curSheet.SetCellValue(tmpTotRows, 'agent_ru',0);
					curSheet.SetCellEditable(tmpTotRows, "agent_ru",0);
					curSheet.SetCellEditable(tmpTotRows, "inv_sum_amt",1);
					curSheet.SetCellValue(tmpTotRows, 'agent_amt',0);
					curSheet.SetCellEditable(tmpTotRows, "agent_amt",0);
				}	
				//Cost 일 경우 
				if(curSheet.GetCellValue(tmpTotRows, 'sell_buy_tp_cd') == "C"){
					//fr_inv_sum_amt 가 0 일 경우 warning
					warningTotalAmount(curSheet, tmpTotRows, 'agent_amt', curSheet.GetCellValue(tmpTotRows, 'agent_amt'));
					curSheet.SetCellBackColor(tmpTotRows, 'inv_sum_amt',curSheet.GetDataBackColor());
					//Debit 입력 제한
					//curSheet.CellValue(tmpTotRows, 'ru') = 0;
//					curSheet.SetCellEditable(tmpTotRows, "ru",0);
					//#2585 [CNR] Debit/Credit Entry Rate Input
					curSheet.SetCellEditable(tmpTotRows, "ru",1);
					curSheet.SetCellEditable(tmpTotRows, "agent_ru",1);
					curSheet.SetCellEditable(tmpTotRows, "agent_amt",1);
					curSheet.SetCellValue(tmpTotRows, 'inv_sum_amt',0);
					curSheet.SetCellEditable(tmpTotRows, "inv_sum_amt",0);
				}
			}
			curSheet.SetCellEditable(tmpTotRows, "cntr_tpsz_cd",0);
		}
	}
}
/**
 * 열추가 표시
 */
function doDispDfltFrt(rtnArr, curTab, addRowStr, curSheet){
	var loopLen=rtnArr.length;
	loopLen--;
	for(var i=0; i < loopLen; i++){
		var masterVals=rtnArr[i].split('@^');	
		var usedFrtCd=false;
		var tmpTotRows=curSheet.LastRow();
		//사용된 Freight Code가 아닌 경우 열추가 및 코드값 입력
		if(!usedFrtCd){
			curSheet.SetSelectRow(tmpTotRows);
			frtRowAdd(addRowStr, curSheet, masterVals[8], masterVals[9], masterVals[10], 'D');
			tmpTotRows=curSheet.LastRow() + 1; // + 1
			tmpTotRows--;
			
			if(curTab==''){
				if(masterVals[10] == "H" || (masterVals[8] == "S" && masterVals[9] == "O" && masterVals[10] == "M")){
					curSheet.SetCellValue(tmpTotRows, 'fr_trdp_cd',frm1.act_shpr_trdp_cd.value,0);
					curSheet.SetCellValue(tmpTotRows, 'fr_trdp_nm',frm1.act_shpr_trdp_nm.value,0);
				}else{
				}
			}else if(curTab=='b_'){
//				curSheet.CellValue2(tmpTotRows, 'b_fr_trdp_cd') = frm1.lnr_trdp_cd.value;
//				curSheet.CellValue2(tmpTotRows, 'b_fr_trdp_nm') = frm1.lnr_trdp_nm.value;
			}else if(curTab=='dc_'){
				if(masterVals[10]=="H"){
					if(typeof(frm1.prnr_trdp_cd2)!='undefined' && frm1.prnr_trdp_cd2.value!=''){
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd2.value,0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm2.value,0);
					}else{
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd.value,0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm.value,0);
					}
				}else{
				}
			}
			curSheet.SetCellValue(tmpTotRows, curTab+'fr_frt_cd',masterVals[0], 1);
			curSheet.SetCellValue(tmpTotRows, curTab+'fr_frt_cd_nm',masterVals[1],0);
			/*
			curSheet.SetCellValue(tmpTotRows, curTab+"fr_rat_curr_cd",masterVals[2],0);
			if(curSheet.GetCellValue(tmpTotRows, curTab+"fr_inv_curr_cd")==masterVals[2]){
				curSheet.SetCellValue(tmpTotRows, curTab+'fr_inv_xcrt',1,0);
			}else{
				curSheet.SetCellValue(tmpTotRows, curTab+'fr_inv_xcrt',masterVals[4],0);
			}
			curSheet.SetCellValue(tmpTotRows, curTab+'fr_inv_xcrt_dt',masterVals[3],0);
			*/
			//2011.12.14  Kim,Jin-Hyuk 추가
			//단위를 BL로 수량을 1로 셋팅
			if(masterVals[8]=="A"){
				if(masterVals[9]=='O' && masterVals[10]=="H"){
					if(frm1.customer_unit_chk[0].checked){
						if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') == ""){
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACW",0);
						}
						curSheet.SetCellValue(tmpTotRows, curTab+'fr_cntr_tpsz_cd','',0);
						curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.chg_wgt.value,0);
					}else if(frm1.customer_unit_chk[1].checked){
						if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') == ""){
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACL",0);
						}
						curSheet.SetCellValue(tmpTotRows, curTab+'fr_cntr_tpsz_cd','',0);
						curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.chg_wgt1.value,0);
					}
				}else{
					if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') == ""){
						curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACW",0);
					}
					curSheet.SetCellValue(tmpTotRows, curTab+'fr_cntr_tpsz_cd','',0);
					curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.chg_wgt.value,0);
				}
			}else{
				if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') == ""){
					curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd','B/L',0);
				}
				curSheet.SetCellValue(tmpTotRows, curTab+'fr_cntr_tpsz_cd','',0);
				// #4174 [BNX] V461.11 RATE, AMOUNT ERROR
				if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_qty') == ""){
					curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',1,0);
				}
			}
			if(curTab==''){
				//VAT 요율 셋팅
				if(masterVals[5]=="Y"){
					curSheet.SetCellValue(tmpTotRows, 'fr_vat_rt',masterVals[6],0);
				}
				if(masterVals[10]=="H"){
					if(masterVals[8]=="A" && masterVals[9]=='O'){
						//curSheet.CellValue2(tmpTotRows, curTab+'fr_qty') = frm1.agent_chg_wgt.value;
						//------[20130215 ojg]-----------
						if(frm1.customer_unit_chk[0].checked){		//Selling Rate/Amount 무게 단위에 따라 무게 값 적용
							if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') == ""){
								curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACW",0);
							}
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.agent_chg_wgt.value,0);//Kg 적용
						}else if(frm1.customer_unit_chk[1].checked){
							if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') == ""){
								curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACL",0);
							}
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.agent_chg_wgt1.value,0);//Lb 적용
						}	
						//------[20130215 ojg]-----------
					}
				}else{
				}
				//fr_inv_sum_amt 가 0 일 경우 warning
				warningTotalAmount(curSheet, tmpTotRows, 'fr_inv_sum_amt', curSheet.GetCellValue(tmpTotRows, 'fr_inv_sum_amt'));
			}else if(curTab=='b_'){
				//VAT 요율 셋팅
				if(masterVals[5]=="Y"){
					curSheet.SetCellValue(tmpTotRows, 'b_fr_vat_rt',masterVals[6],0);
				}			
				//fr_inv_sum_amt 가 0 일 경우 warning
				warningTotalAmount(curSheet, tmpTotRows, 'b_fr_inv_sum_amt', curSheet.GetCellValue(tmpTotRows, 'b_fr_inv_sum_amt'));
				if(masterVals[10]=="H"){
					if(masterVals[8]=="A" && masterVals[9]=='O'){
						//curSheet.CellValue2(tmpTotRows, curTab+'fr_qty') = frm1.agent_chg_wgt.value;
						//------[20130215 ojg]-----------
						if(frm1.customer_unit_chk[0].checked){		//Selling Rate/Amount 무게 단위에 따라 무게 값 적용
							if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') == ""){
								curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACW",0);
							}
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.agent_chg_wgt.value,0);//Kg 적용
						}else if(frm1.customer_unit_chk[1].checked){
							if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') == ""){
								curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"ACL",0);
							}
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',frm1.agent_chg_wgt1.value,0);//Lb 적용
						}	
						//------[20130215 ojg]-----------
					}
				}
			}else if(curTab=='dc_'){
				/*
				 * Agent_rt, Customer_rt 반영
				 * masterVals[9] == bnd_clss_cd (해상 수출, 항공 수출)
				 * masterVals[7] == frt_clss_cd (FC)
				 */
				//if(masterVals[8]=="A" && masterVals[9]=='O'){
				if(masterVals[8]=="A" && masterVals[9]=='O'){
					if(masterVals[7]=="FC" || masterVals[7]=="SC"){
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd','D',0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_term_cd','CC',0);
						//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
						//curSheet.CellValue(tmpTotRows, 'dc_fr_ru') = frm1.cust_amt.value;
						if(masterVals[10]=="H"){
							if(frm1.cust_rt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', frm1.cust_rt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',frm1.cust_rt.value==''? 0 : frm1.cust_rt.value.replaceAll(",",""));
							if(frm1.cust_amt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt', 0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt', frm1.cust_amt.value.replaceAll(",","")*1);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt', frm1.cust_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));
							
							if(frm1.cust_rt.value!=''){
								if(masterVals[7]=="FC"){
									if(frm1.customer_unit_chk[0].checked){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm') + "(" + frm1.chg_wgt.value + " * " + Number(frm1.cust_rt.value).toFixed(2) + ")",0);
									}else if(frm1.customer_unit_chk[1].checked){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm') + "(" + frm1.chg_wgt1.value + " * " + Number(frm1.cust_rt.value).toFixed(2) + ")",0);
									}
								}else{
									curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm'),0);
								}
							}
						}else{
						}
						//Agent row를 하나 더 추가한다.
						frtRowAdd(addRowStr, curSheet, masterVals[8], masterVals[9], masterVals[10], 'D');
						tmpTotRows=curSheet.LastRow() + 1; // + 1
						tmpTotRows--;
						if(masterVals[10]=="H"){
							if(typeof(frm1.prnr_trdp_cd2)!='undefined' && frm1.prnr_trdp_cd2.value!=''){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd2.value,0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm2.value,0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd.value,0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm.value,0);
							}
							if(frm1.agent_rt.value==''){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1],0);
							}else{
								if(masterVals[7]=="FC"){
									if(user_ofc_cnt_cd=="JP"){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1] + "(" + frm1.chg_wgt.value + " * " + Number(frm1.agent_rt.value).toFixed(2) + ")",0);
									}else{
										if(frm1.agent_unit_chk[0].checked){
											curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1] + "(" + frm1.grs_wgt.value + " * " + Number(frm1.agent_rt.value).toFixed(2) + ")",0);
										}else if(frm1.agent_unit_chk[1].checked){
											curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1] + "(" + frm1.grs_wgt1.value + " * " + Number(frm1.agent_rt.value).toFixed(2) + ")",0);
										}
									}
								}else{
									curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1],0);
								}
							}
							//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
							//curSheet.CellValue(tmpTotRows, 'dc_fr_agent_ru') = frm1.agent_amt.value;
							if(frm1.agent_rt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru', frm1.agent_rt.value.replaceAll(",","")*1);
							}
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', curSheet.GetCellValue(tmpTotRows, 'dc_fr_agent_ru'), 0);
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru',frm1.agent_rt.value==''? 0 : frm1.agent_rt.value.replaceAll(",",""));
							if(frm1.agent_amt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt', frm1.agent_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt',frm1.agent_amt.value==''? 0 : frm1.agent_amt.value.replaceAll(",",""));
						}
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd',masterVals[0],0);
						/*
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_rat_curr_cd',masterVals[2],0);
						if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_curr_cd')==masterVals[2]){
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt',1,0);
						}else{
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt',masterVals[4],0);
						}
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt_dt',masterVals[3],0);
						*/
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',1,0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd','C',0);
						if(masterVals[8]=="A"){
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_term_cd','PP',0);
							if(user_ofc_cnt_cd=="JP"){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd',"ACW",0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.chg_wgt.value,0);
							}else{
								//LHK 20132026 오류수정
								if(masterVals[10]=="H"){
									if(frm1.agent_unit_chk[0].checked){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd',"AGW",0);
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.grs_wgt.value,0);
									}else if(frm1.agent_unit_chk[1].checked){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd',"AGL",0);
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.grs_wgt1.value,0);
									}
								}
							}
						}else if(masterVals[8]=="S"){
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_term_cd','CC',0);
							if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') == ""){
								curSheet.SetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd',"B/L",0);
							}
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
							curSheet.SetCellValue(tmpTotRows, curTab+'fr_qty',1);
						}
					}
				}
				//원래 조건
				//if(masterVals[8]=="S" && masterVals[9]=='O' && masterVals[10]=='H'){
				if(masterVals[8]=="S" && masterVals[9]=='O'){
					if(masterVals[7]=="FC" || masterVals[7]=="SC"){
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd','D',0);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_term_cd','CC',0);
						if(frm1.shp_mod_cd.value=="FCL"){
							//LHK 2013.01.31 FCL 인 경우 BL 선택 QTY 1, Debit/Credit Rate 에  Amount 를 Set.
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','B/L',0);
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',1,0);
							if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd') == 'D'){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt'),0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru',curSheet.GetCellValue(tmpTotRows, 'dc_fr_agent_amt'),0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', curSheet.GetCellValue(tmpTotRows, 'dc_fr_agent_ru'), 0);
							}
						}else{
							//2012.05.02 CBM / Weight 중 높은 기준으로 적용 (RT)
							var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
							var retWgt=roundXL(grsWgtKg / 1000, 3);
							var cbm=frm1.meas.value.replaceAll(",","");
							if(cbm<1){
								cbm=1;
							}
							if(retWgt<1){
								retWgt=1;
							}
							if(retWgt > cbm){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','RET',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',retWgt,0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','CBM',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.meas.value,0);
							}
						}
						//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
						//curSheet.CellValue(tmpTotRows, 'dc_fr_ru') = frm1.cust_amt.value;
						if(masterVals[10]=="H"){
							if(frm1.cust_rt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', frm1.cust_rt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',frm1.cust_rt.value==''? 0 : frm1.cust_rt.value.replaceAll(",",""));
							if(frm1.cust_amt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt', 0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt', frm1.cust_amt.value.replaceAll(",","")*1);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt', frm1.cust_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt',frm1.cust_amt.value==''? 0 : frm1.cust_amt.value.replaceAll(",",""));
							//LHK 2013.01.31 FCL 인 경우 BL 선택 QTY 1, Debit/Credit Rate 에  Amount 를 Set
							if(frm1.shp_mod_cd.value=="FCL"){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt'),0);
							}
							if(frm1.cust_rt.value!=''){
								if(masterVals[7]=="FC"){
									//#1005  [CARGOZONE] OCEAN BUYING, SELLING RATE LOGIC 
									//curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm') + "("+ frm1.meas.value + " * " + Number(frm1.cust_rt.value).toFixed(2) +")",0);
									var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
									var retWgt=roundXL(grsWgtKg / 1000, 3);
									var cbm=frm1.meas.value.replaceAll(",","");
									if(cbm<1){
										cbm=1;
									}
									if(retWgt<1){
										retWgt=1;
									}
									if(retWgt > cbm){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm') + "("+ Number(retWgt).toFixed(2) + " * " + Number(frm1.cust_rt.value).toFixed(2) +")",0);
									}else{
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm') + "("+ cbm + " * " + Number(frm1.cust_rt.value).toFixed(2) +")",0);
									}
								}else{
									curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',curSheet.GetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm'),0);
								}
							}
						}else{
						}
						//Agent row를 하나 더 추가한다.
						frtRowAdd(addRowStr, curSheet, masterVals[8], masterVals[9], masterVals[10], 'D');
						tmpTotRows=curSheet.LastRow() + 1; // +1
						tmpTotRows--;
						
						/* #1131 [CARGOZONE] ONE OF BILLING CODE NOT SHOWING THE NAME */
						/* Freight Name Setting 누락으로 인해 Name Setting 추가... CJS */
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1],0);
						
						if(masterVals[10]=="H"){
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_cd',frm1.prnr_trdp_cd.value,0);
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_trdp_nm',frm1.prnr_trdp_nm.value,0);
							if(frm1.agent_rt.value==''){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1],0);
							}else{
								if(masterVals[7]=="FC"){
									//#1005  [CARGOZONE] OCEAN BUYING, SELLING RATE LOGIC 
									//curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1] + "("+ frm1.meas.value + " * " + Number(frm1.agent_rt.value).toFixed(2) +")",0);
									var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
									var retWgt=roundXL(grsWgtKg / 1000, 3);
									var cbm=frm1.meas.value.replaceAll(",","");
									if(cbm<1){
										cbm=1;
									}
									if(retWgt<1){
										retWgt=1;
									}
									if(retWgt > cbm){
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1] + "("+ Number(retWgt).toFixed(2) + " * " + Number(frm1.agent_rt.value).toFixed(2) +")",0);
									}else{
										curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1] + "("+ cbm + " * " + Number(frm1.agent_rt.value).toFixed(2) +")",0);
									}
								}else{
									curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd_nm',masterVals[1],0);
								}
							}
							//강성덕수석님 요청으로 아래의 소스 수정함. 미심적은 부분있으면 문의할 것 2012.02.01 PJK
							//curSheet.CellValue(tmpTotRows, 'dc_fr_agent_ru') = frm1.agent_amt.value;
							
							if(frm1.agent_rt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru', frm1.agent_rt.value.replaceAll(",","")*1);
							}
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', curSheet.GetCellValue(tmpTotRows, 'dc_fr_agent_ru'), 0);
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru',frm1.agent_rt.value==''? 0 : frm1.agent_rt.value.replaceAll(",",""));
							if(frm1.agent_amt.value==""){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt', 0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt', frm1.agent_amt.value.replaceAll(",","")*1);
							}
							//curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt',frm1.agent_amt.value==''? 0 : frm1.agent_amt.value.replaceAll(",",""));
						}else{
						}
						
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_frt_cd',masterVals[0],0);
						
						/*
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_rat_curr_cd',masterVals[2],0);
						if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_curr_cd')==masterVals[2]){
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt',1,0);
						}else{
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt',masterVals[4],0);
						}
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_xcrt_dt',masterVals[3],0);
						*/
						//#1005 [CARGOZONE] OCEAN BUYING, SELLING RATE LOGIC : 수정 중 House Entry amount 계산 오류 수정
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',1);
						curSheet.SetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd','C',0);
						if(frm1.shp_mod_cd.value=="FCL"){
							//LHK 2013.01.31 FCL 인 경우 BL 선택 QTY 1, Debit/Credit Rate 에  Amount 를 Set.
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','B/L',0);
							curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',1,0);
							if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd') == 'D'){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt'),0);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru',curSheet.GetCellValue(tmpTotRows, 'dc_fr_agent_amt'),0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru', curSheet.GetCellValue(tmpTotRows, 'dc_fr_agent_ru'), 0);
							}
						}else{
							//2012.05.02 CBM / Weight 중 높은 기준으로 적용 (RT)
							var grsWgtKg=frm1.grs_wgt.value.replaceAll(",","");
							var retWgt=roundXL(grsWgtKg / 1000, 3);
							var cbm=frm1.meas.value.replaceAll(",","");
							if(cbm<1){
								cbm=1;
							}
							if(retWgt<1){
								retWgt=1;
							}
							if(retWgt > cbm){
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','RET',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',retWgt);
							}else{
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_aply_ut_cd','CBM',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_cntr_tpsz_cd','',0);
								curSheet.SetCellValue(tmpTotRows, 'dc_fr_qty',frm1.meas.value);
							}
						}
					}
				}
				//fr_inv_sum_amt 가 0 일 경우 warning
				//Revenue 일 경우 
				if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd') == "D"){
					//fr_inv_sum_amt 가 0 일 경우 warning
					warningTotalAmount(curSheet, tmpTotRows, 'dc_fr_inv_sum_amt', curSheet.GetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt'));
					curSheet.SetCellBackColor(tmpTotRows, 'dc_fr_agent_amt',curSheet.GetDataBackColor());
					//Credit 입력 제한 
					//curSheet.SetCellEditable(tmpTotRows, "dc_fr_ru",1);
					//curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_ru',0);
					//curSheet.SetCellEditable(tmpTotRows, "dc_fr_agent_ru",0);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_inv_sum_amt",1);
					curSheet.SetCellValue(tmpTotRows, 'dc_fr_agent_amt',0);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_agent_amt",0);
				}	
				//Cost 일 경우 
				if(curSheet.GetCellValue(tmpTotRows, 'dc_fr_sell_buy_tp_cd') == "C"){
					//fr_inv_sum_amt 가 0 일 경우 warning
					warningTotalAmount(curSheet, tmpTotRows, 'dc_fr_agent_amt', curSheet.GetCellValue(tmpTotRows, 'dc_fr_agent_amt'));
					curSheet.SetCellBackColor(tmpTotRows, 'dc_fr_inv_sum_amt',curSheet.GetDataBackColor());
					//Debit 입력 제한
					//curSheet.SetCellValue(tmpTotRows, 'dc_fr_ru',0);
					//curSheet.SetCellEditable(tmpTotRows, "dc_fr_ru",0);
					//curSheet.SetCellEditable(tmpTotRows, "dc_fr_agent_ru",1);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_agent_amt",1);
					curSheet.SetCellValue(tmpTotRows, 'dc_fr_inv_sum_amt',0);
					curSheet.SetCellEditable(tmpTotRows, "dc_fr_inv_sum_amt",0);
				}
			}
			//------[20130829 OJG]---------
			if(curSheet.GetCellValue(tmpTotRows, curTab+'fr_aply_ut_cd') != "SCN"){	//Container 가 아니면.
				curSheet.SetCellEditable(tmpTotRows, curTab+"fr_cntr_tpsz_cd",0);
			}
			//------[20130829 OJG]---------
		}
	}
}
/**
 * Confirm 버튼 표시 function
 */
function cnfCntr(callTp){
	var objPreFix='';
	var curSheetObj=getSdSheet();
	if(callTp=='BC'){
		objPreFix='b_';
		curSheetObj=getBcSheet();
	}else if(callTp=='DC'){
		objPreFix='dc_';
		curSheetObj=getDcSheet();
	}
	var sheetLen=curSheetObj.LastRow() + 1;
	
	for(var i=2; i < sheetLen; i++){
		//저장된 경우
		if(curSheetObj.GetCellValue(i, objPreFix+'fr_frt_seq')!=''){
			//Freight Confirm인경우
			if(curSheetObj.GetCellValue(i, objPreFix+'fr_inv_sts_cd')=='FC'){
				//Set editable false for all columns which frt_sts_nm is "INVOICE CREATE", expect for CHECK column.
				toCellEdit(curSheetObj, false, i, 42);
			}	
		} else if(curSheetObj.GetCellValue(i, objPreFix+'fr_trf_ctrt_no')!=''){
			curSheetObj.SetCellValue(i, objPreFix+'fr_ibflag','I',0);
		}
	}
	
	//#2105 [PATENT] Option 에 따른 Invoice 자동 생성 기능 추가
	if(callTp=='BC' || callTp=='SD' ){
		if(typeof(bl_inv_auto_creation) != "undefined"){
			if(bl_inv_auto_creation == "Y"){
				var info = {KeyField:1};
				curSheetObj.SetColProperty( objPreFix+"fr_trdp_cd", info);				
				curSheetObj.SetColProperty( objPreFix+"fr_trdp_nm", info);
				
				curSheetObj.SetColEditable( objPreFix+'fr_inv_curr_cd',0);
				curSheetObj.SetColEditable( objPreFix+'fr_inv_xcrt',0);
				curSheetObj.SetColEditable( objPreFix+'fr_inv_xcrt_dt',0);
			}
		}
	}
}
/**
 * HBL 화면상 처리 버튼의 Display를 Control함
 */
function doApplyBtnView(curSheetObj, sheetLen, objPreFix, btPreFix){
	/*
	var invRows=0;
	var isFi=false;
	var isFc=false;
	var isInv=false;
	for(var i=2; i < sheetLen; i++){
		//저장된 경우
if(curSheetObj.GetCellValue(i, objPreFix+'fr_frt_seq')!=''){
			//입력된 건
if(curSheetObj.GetCellValue(i, objPreFix+'fr_inv_sts_cd')=='FI'){
if(curSheetObj.GetCellValue(i, objPreFix+'fr_inv_sts_cd')=='FI'){
					curSheetObj.SetCellEditable(i, objPreFix+'fr_frt_check',1);
					isFi=true;
				}
			//Confirm 이후 된건
			}else{
				//alert(curSheetObj.CellValue(i, objPreFix+'fr_inv_sts_cd'));
				//Freight Confirm인경우
if(curSheetObj.GetCellValue(i, objPreFix+'fr_inv_sts_cd')=='FC'){
					//Invoice를 생성할 데이터를 선택할 수 있도록 Row의 Editable를 수정 가능 상태로 
					toCellEdit(curSheetObj, false, i, 29);
					curSheetObj.SetCellEditable(i, objPreFix+'fr_frt_check',1);
					isFc=true;
				//Freight가 Invoice로 생성된 이후
				}else{
					isInv=true;
					curSheetObj.SetRowEditable(i,0);
					invRows++;
				}
			}
		}
	}
	var dfGrsObj=getObj(btPreFix+'Btns');
	var invGrsObj=getObj(btPreFix+'InvBtns');
	var cnfBtObj=getObj(btPreFix+'Cnf');
	var unCnfBtObj=getObj(btPreFix+'UnCnfTb');
	var invCreBtObj=getObj(btPreFix+'InvCreTb');
	//Freight입력시
	if(isFi){
		dfGrsObj.style.display='block';
		invGrsObj.style.display='none';
		cnfBtObj.style.display='block';
	//Confirm이후 Inv생성전
	}else if(isFc&&!isInv){
		dfGrsObj.style.display='none';
		invGrsObj.style.display='block';
		unCnfBtObj.style.display='block';
		invCreBtObj.style.display='block';
		cnfBtObj.style.display='none';
	//Invoice생성후
	}else if(isInv){
		unCnfBtObj.style.display='none';
		invGrsObj.style.display='block';
		sheetLen=sheetLen-2;
		if(invRows!=sheetLen){
			invGrsObj.style.display='block';
			unCnfBtObj.style.display='none';
			invCreBtObj.style.display='block';	
		}else{
			invGrsObj.style.display='none';
			unCnfBtObj.style.display='none';
			invCreBtObj.style.display='none';
		}
	}else{
		cnfBtObj.style.display='none';
	}
	*/
}
/**
 * Cell의 읽기/쓰기를 Control함
 * @sheetObj 처리할 IBsheet인 Sheet Instance
 * @isWrite  true: Editalb  false: Unable to edit
 * curRow 설정할 Row의 번호
 */
function toCellEdit(sheetObj, isWrite, curRow, totCol){
	for(var i=0; i < totCol; i++){
		if(i != sheetObj.SaveNameCol('dc_fr_frt_check') && i != sheetObj.SaveNameCol('fr_frt_check') && i != sheetObj.SaveNameCol('b_fr_frt_check')) {
			sheetObj.SetCellEditable(curRow, i,isWrite);
		}
	}
}
function inpuValCheck(sheetObj, f_cmd, objPrefix){
	var rowCnt=sheetObj.LastRow();
	var isOk=true;
	var checkVal=false;
	var loopNum=0;
	for(var i=1; i < rowCnt; i++){
var stat=sheetObj.GetCellValue(i, objPrefix+'fr_ibflag');
	   if(stat!='R'){
		   if(f_cmd==ADD&&stat=='I'){
			   checkVal=true;
			   loopNum++;
		   }else if(f_cmd==MODIFY&&stat=='U'){
			   checkVal=true;
			   loopNum++;
		   }	
	   }
	}
	return loopNum;
}
/*
//Zero 이면 true
//arrSheetObj, arrDelChk, arrIbFlag, arrColNm
function isZeroAmtFrt(arrSheetObj, arrDelChk, arrIbFlag, arrColNm){
	var sheetObj;
	// N: 0값은 저장하지 않음 , Y: 0값 저장함
	var isZeroFlg="N";
	var isRtn=false;
	for (var i=0; i<arrSheetObj.length; i++) {
		var sheetObjTmp=arrSheetObj[i];
		for(var j=2;j<=sheetObjTmp.LastRow();j++){
if(     sheetObjTmp.GetCellValue(j, arrDelChk[i]) != "1"
&&  sheetObjTmp.GetCellValue(j, arrColNm[i])  == 0
&& (sheetObjTmp.GetCellValue(j, arrIbFlag[i]) == 'U' || sheetObjTmp.GetCellValue(j,arrIbFlag[i]) == 'I')
			){
					isRtn=true;
					break;
			}
		}
		if (isRtn) break;
	}
	// 0인 인보이스가 있는 경우
	if (isRtn) {
		if (confirm(getLabel('COM_FRT_CFM004'))) {
			// Confirm 인 경우 0 포함 저장
			isZeroFlg="Y";
		} else {
			// Cancel 인 경우 0 저장 안함
			isZeroFlg="N";
		}
	}
	return isZeroFlg;
}
*/
/**
 * Freight항목 입력값 체크
 */

//#4084 (JAPT) same currency invoice - exchange rate validation
var ecrtFrtList = "";
var ecrtCnt = 0;

function frCheckInpuVals(sheetObj, objPfx){
	var totRow=sheetObj.LastRow() + 1;
	var isOk=true; 
	var workItems=0;
	var isZeroFlg="";
	var addFrtMsg=" [Account Receivable]";
	
	//#4084 (JAPT) same currency invoice - exchange rate validation

	var frtName = "";
	
	if (objPfx == 'b_') {
		addFrtMsg=" [Account Payable]";
	} else if (objPfx == 'dc_') {
		addFrtMsg=" [Debit/Credit]";
	}
	// amount가 0인 것들은 삭제 처리하고 진행한다.
	for(var k=totRow-1; k > 1 ; k--){
		if(    (sheetObj.GetCellValue(k, objPfx+'fr_inv_sum_amt') == 0 && sheetObj.GetCellValue(k, objPfx+'fr_agent_amt') == 0)
				&&  sheetObj.GetCellValue(k, objPfx+'fr_del_chk') != '1'
					&& (sheetObj.GetCellValue(k, objPfx+'fr_ibflag') == 'U' || sheetObj.GetCellValue(k, objPfx+'fr_ibflag') == 'I')
			)
		  {
			if (isZeroFlg == "") {
				if (confirm(getLabel('COM_FRT_CFM004')+addFrtMsg)) {
					// Confirm 인 경우 0 포함 저장
					isZeroFlg="N";
				} else {
					// Cancel 인 경우 0 저장 안함
					isZeroFlg="Y";
				}
			}
			if (isZeroFlg == "N") {
				/* jsjang 8.10 #18567 : B/L FRT Tab - Billig Code 없이 저장 가능한 문제 처리 */
				sheetObj.RowDelete(k, false);
			}
			/*
			var frtMsg1=objPfx+'fr_inv_sum_amt';
			var frtMsg2=objPfx+'fr_agent_amt';
if(sheetObj.GetCellValue(k, objPfx+'fr_inv_sum_amt') == 0)
			{
				alert(getLabel('FMS_COM_ALT007') + "\n - " + frtMsg1 + "\n\n: BL_FRT.3057");
			}else{
				alert(getLabel('FMS_COM_ALT007') + "\n - " + frtMsg2 + "\n\n: BL_FRT.3057");
			}
			*/
			//return 'IV';
		}
	}
	
	
	//#4084 (JAPT) same currency invoice - exchange rate validation
	if(MULTI_CURR_FLAG == 'Y'){
		for(var k=totRow-1; k > 1 ; k--){
			if ((sheetObj.GetCellValue(k, objPfx+'fr_rat_curr_cd') == sheetObj.GetCellValue(k, objPfx+'fr_inv_curr_cd'))
					&&  (sheetObj.GetCellValue(k, objPfx+'fr_inv_xcrt') != '1')
					&&  ((sheetObj.GetCellValue(k, objPfx+'fr_inv_sts_cd') == 'FI' || (sheetObj.GetCellValue(k, objPfx+'fr_inv_sts_cd') == '')))
					&&  (sheetObj.GetCellValue(k, objPfx+'fr_del_chk') != '1')
				){
				//ttl amt onchange event먹어서 타는지 확인하기
				ecrtCnt++;
				frtName = frtName + sheetObj.GetCellValue(k, objPfx+'fr_frt_cd_nm') +", ";
				sheetObj.SetCellValue(k, objPfx+'fr_inv_xcrt',1);
			}
		}	
		
		if(frtName.length>0) {
			//맨 뒤에 콤마, 스페이스 공백 지우기
			frtName = frtName.substr(0,frtName.length-2);
			if(ecrtFrtList == "") {
				ecrtFrtList= " ";
			}
			if(ecrtFrtList.length>1){
				ecrtFrtList = ecrtFrtList + "\n" + " " + addFrtMsg + ": " +  frtName;
			} else {
				ecrtFrtList = "\n" + ecrtFrtList + addFrtMsg + ": " +  frtName;
			}
		}
	}
	
//no support[check again]CLT 	totRow=sheetObj.LastRow();
	var msgPreFix="Please check the [Freight Tab]\n";
	//for(var i = 2; i < totRow ; i++){
	for(var i=totRow-1; i > 1 ; i--){
		if(sheetObj.GetCellValue(i, objPfx+'fr_ibflag')=='U'||sheetObj.GetCellValue(i, objPfx+'fr_ibflag')=='I'){
			if(checkInputVal(sheetObj.GetCellValue(i,       objPfx+'fr_frt_cd'),     1, 10, "T", getLabel('ITM_FRT_CD'))!='O'){
				isOk=false;
				break;
			}
			/*
else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_trdp_cd'),    5, 10,"T", getLabel('ITM_TRDP_CD'))!='O'){
				isOk=false;
				break;
			}
			*/
			/*
			 * 2012.03.06  KJH
			 * vol, rate에 값이 없으면 vol = 1, rate = amt로 셋팅한다. 
			 */
			if(sheetObj.GetCellValue(i, objPfx+'fr_qty')==''){
				sheetObj.SetCellValue(i, objPfx+'fr_qty',1,0);
				if(sheetObj.GetCellValue(i, objPfx+'fr_inv_sum_amt')==0){
					sheetObj.SetCellValue(i, objPfx+'fr_agent_ru',sheetObj.GetCellValue(i, objPfx+'fr_agent_amt'),0);
				}else{
					sheetObj.SetCellValue(i, objPfx+'fr_ru',sheetObj.GetCellValue(i, objPfx+'fr_inv_sum_amt'),0);
				}
			}
			/*
else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_rat_curr_cd'),3, 6, "T", getLabel('ITM_TARIFF_CURR'))!='O'){
				isOk=false;
				break;
}else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_aply_ut_cd'), 3, 6, "T", getLabel('ITM_UNIT'))!='O'){
				isOk=false;
				break;
			}
if(frm1.intg_bl_seq.value!=''&&sheetObj.GetCellValue(i, objPfx+'fr_aply_ut_cd')=='SCN'&&sheetObj.GetCellValue(i, objPfx+'fr_cntr_tpsz_cd')==''){
				//Please select \"TP/SZ\"!
				alert(getLabel('FMS_COM_ALT006') + " - " + getLabel('FMS_COD_TPSZ') + "\n\n: BL_FRT.2346");
				isOk=false;
				break;
			}	
if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_qty'), 1, 8, "N", getLabel('ITM_VOL'))!='O'){
				isOk=false;
				break;
}else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_ru'),          1, 26, "N",  getLabel('ITM_RATE'))!='O'){
				isOk=false;
				break;
}else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_vat_rt'),      1, 8, "N", getLabel('ITM_VAT'))!='O'){
				isOk=false;
				break;
}else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_vat_amt'),     1, 31, "N", getLabel('ITM_VAT_RATE'))!='O'){
				isOk=false;
				break;
}else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_inv_curr_cd'), 3, 6, "T", getLabel('ITM_INV_CURR'))!='O'){
				isOk=false;
				break;
			}
			*/
			/*
else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_inv_xcrt_dt'), 8, 8, "N", getLabel('ITM_XCRT_DT'))!='O'){
				isOk=false;
				break;
			}
			*/
			/*
else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_inv_xcrt'),    1, 18, "N", getLabel('ITM_INV_EXRT'))!='O'){
				isOk=false;
				break;
}else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_inv_amt'),     1, 31, "N", getLabel('ITM_INV_AMT'))!='O'){
				isOk=false;
				break;
}else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_inv_vat_amt'), 1, 31, "N", getLabel('ITM_INV_VAT_AMT'))!='O'){
				isOk=false;
				break;
}else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_perf_curr_cd'),3,  6, "T", getLabel('ITM_PERF_CURR'))!='O'){
				isOk=false;
				break;
}else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_perf_xcrt'),   1, 18, "N",  getLabel('ITM_PERF_EXRT'))!='O'){
				isOk=false;
				break;
}else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_perf_amt'),    1, 31, "N", getLabel('ITM_PERF_AMT'))!='O'){
				isOk=false;
				break;
			}
			*/
			/*
else if(sheetObj.GetCellValue(i, objPfx+'fr_inv_sum_amt')==0){
				//'Please check the Invoice [Total Amount]! alert
				isOk=false;
				break;
			}
			*/
			/*
else if(checkInputVal(sheetObj.GetCellValue(i, objPfx+'fr_perf_vat_amt'), 1, 31, "N", getLabel('ITM_PERF_VAT_AMT'))!='O'){
				isOk=false;
				break;
}else if(sheetObj.GetCellValue(i, objPfx+'fr_rat_curr_cd')==sheetObj.GetCellValue(i, objPfx+'fr_inv_curr_cd')&&sheetObj.GetCellValue(i, objPfx+'fr_inv_xcrt')!=1){
				//Because [Tariff Currency] and [Invoice Currency] are the same,\n\nthe [Invoice Ex.Rate] is "1"!\n\nPlease check the [Invoice Ex.Rate]. alert
				isOk=false;
				break;					
}else if(sheetObj.GetCellValue(i, objPfx+'fr_inv_xcrt')==1&&sheetObj.GetCellValue(i, objPfx+'fr_rat_curr_cd')!=sheetObj.GetCellValue(i, objPfx+'fr_inv_curr_cd')){
				//The [Tariff Currency] is different with the [Invoice Currency]!\n\nPlease check the [Invoice Ex.Rate].' alert
				isOk=false;
				break;					
			}
			*/
			/*	
if(sheetObj.GetCellValue(i, objPfx+'fr_inv_curr_cd')=='KRW'){
var invAmtStr=sheetObj.GetCellValue(i, objPfx+'fr_inv_amt');
var invVatStr=sheetObj.GetCellValue(i, objPfx+'fr_inv_vat_amt');
var invTotAmtStr=sheetObj.GetCellValue(i, objPfx+'fr_inv_sum_amt');
				if(invAmtStr.indexOf('.')!=-1){
					//[Invoice Currency]가 KRW입니다.\n[Invoice Amount]를 절사 또는 절상하여 주십시요!
					isOk=false;
					break;
				}else if(invVatStr.indexOf('.')!=-1){
					//[Invoice Currency]가 KRW입니다.\n[Invoice VAT]를 절사 또는 절상하여 주십시요!
					isOk=false;
					break;
				}else if(invTotAmtStr.indexOf('.')!=-1){
					//[Invoice Currency]가 KRW입니다.\n[Invoice Total Amount]를 절사 또는 절상하여 주십시요!' alert
					isOk=false;
					break;
				}
			}
			*/	
			if(sheetObj.GetCellValue(i, objPfx+'fr_ibflag')=='U'){
				if(sheetObj.GetCellValue(i, objPfx+'fr_frt_seq')==''){
					//Invalid data!
					alert(getLabel('FMS_COM_ALT007') + "\n\n: BL_FRT.2461");
					isOk=false;
					break;
				}
			}
			workItems++;
		//삭제인경우
	}else if(sheetObj.GetCellValue(i, objPfx+'fr_ibflag')=='D'){
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
/**
 * Default Fregiht를 화면에 표시함
 */
function dispDfltAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split(';');
			var curSheet;
			if(curTab=='b_'){
				doDispDfltFrt(rtnArr, 'b_', 'BCROWADD', getBcSheet())
				afterRowAdd('AP');
			}else if(curTab=='dc_'){
				doDispDfltFrt(rtnArr, 'dc_', 'DCROWADD', getDcSheet())
				afterRowAdd('DC');
			}else{
				doDispDfltFrt(rtnArr, '',   'ROWADD',   getSdSheet())
				afterRowAdd('AR');
			}
		}
	}
	else{
		//Data load failed.
		alert(getLabel('FMS_COM_ALT019') + "\n\n: BL_FRT.2507");
	}
}
/**
 * Default Fregiht를 화면에 표시함
 */
function dispDfltInvAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split(';');
			var curSheet=docObjects[0];;
			//LHK, 20131119 #23549 AR Entry화면 - Invoice 선택 없이 Default New 클릭 시 메시지 표시문제
			//doDispDfltFrtInv 에서 ADDROW 호출시 BUG, ADDROW function 에서 처리 되지 않도록 미리 validation 선처리 한다.
			if(!rowaddChkVal()){
				return;
			}
			if(curTab=='dc_'){
				doDispDfltFrtInv(rtnArr, 'dc_', 'ROWADD', curSheet);
			} else {
				doDispDfltFrtInv(rtnArr, '',   'ROWADD',  curSheet);
			}
		}
	}
	else{
		//Data load failed.
		alert(getLabel('FMS_COM_ALT019') + "\n\n: BL_FRT.2507");
	}
}
/**
 * Freight Info
 */ 
 var h_temp_frt_clss_cd="";
function getFrtCdInfoAjaxReq(reqVal){
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnListArr=doc[1].split(';');
			var rtnArr=rtnListArr[0].split('@^');
			h_temp_frt_clss_cd=rtnArr[2];
		}
	}
	else{
		//Data load failed.
		alert(getLabel('FMS_COM_ALT019') + "\n\n: BL_FRT.2507");
	}
} 
var trdp_cd = "";
//#1824 [Split - 1] [PATENT]Freight Local Name 적용(AR, AP)
var frt_cd_nm = "";
var frt_cd_locl_nm = "";
function getFrtCdAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnListArr=doc[1].split(';');
			var rtnArr=rtnListArr[0].split('@^');
			trdp_cd = rtnArr[0];
			frt_cd_nm = rtnArr[1];
			frt_cd_locl_nm = rtnArr[3];
		}else{
			trdp_cd ="";
		}
	}else{
		//Data load failed.
		alert(getLabel('FMS_COM_ALT019') + "\n\n: BL_FRT.2507");
	}
} 
/**
 * 복사시 복사된 Freight가 입력상태로 초기화 시킬 때 사용하는 Method임
 */
function resetCopyFrt(sdSheet, bcSheet){
	if(sdSheet.LastRow()>2){
		if(sdSheet.GetCellValue(2, 'fr_frt_cd')!=''){
			for(var i=2; i < sdSheet.LastRow(); i++){
				sdSheet.SetCellValue(i, 'fr_ibflag','I');
			}
		}
	}
	if(bcSheet.LastRow()>2){
		if(bcSheet.GetCellValue(2, 'b_fr_frt_cd')!=''){
			for(var i=2; i < bcSheet.LastRow(); i++){
				bcSheet.SetCellValue(i, 'b_fr_ibflag','I');
			}
		}
	}	
}
/**
 * 환률 조회일자로 해당환률을 조회한다.
 */
function getXcrtInfo(xcrt_dt){
	if(xcrt_dt!=''){
		var parmStr='&goWhere=aj&bcKey=getXcrtChk';
		parmStr += '&cur_dt='+xcrt_dt;
		ajaxSendPost(setFrtXcrtInfo,  'reqVal', parmStr, './GateServlet.gsl');		
	}
}
function setFrtXcrtInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	var rtnArr=doc[1].split('^@');
    	frm1.xcrtDt.value=rtnArr[0];
    	frm1.ofc_curr.value=rtnArr[1];
    	frm1.trf_cur_cd.value=rtnArr[2];
    	//frm1.dispCur.value   = rtnArr[3];
    	obdtCur=rtnArr[3];
    }
}
var getXcrtRate=0;
function getCurrency(reqVal){
	var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	getXcrtRate=doc[1];
    }
}
/**
* LHK, 2013.01.28 저장 전 Freight Status Check
* Freight Edit/Delete 는 TB_FRT.INV_STS_CD 가 FI 인 경우에만 허용, 아닌 경우 delete, modify 허용 안함.
* sheetObj[] : [0]A/R, [1]D/C, [2]A/P
*/
var frtChkPrefix="";
var frtChkSheet="";
var frtChkStsCnt=0;
var strFrtChkVal="";
function unCheckSet(sheetObjArr){
	for(var i=0; i < sheetObjArr.length; i++){
		if(i==0) frtChkPrefix="fr_";
		if(i==1) frtChkPrefix="dc_fr_";
		if(i==2) frtChkPrefix="b_fr_";
		frtChkSheet=sheetObjArr[i];
		for(var j=2 ; j<sheetObjArr[i].LastRow()+1 ; j++){
			if(frtChkSheet.GetCellValue(j, frtChkPrefix+'frt_check') == 1){
				frtChkSheet.SetCellValue(j, frtChkPrefix+'frt_check',0);
			}
		}
	}	
	frtChkPrefix="";
}
function checkFrtSts(sheetObjArr){
	var rtnVal=true;
	var f_frt_seq="";
	unCheckSet(sheetObjArr);
	for(var i=0; i < sheetObjArr.length; i++){
		if(i==0) frtChkPrefix="fr_";
		if(i==1) frtChkPrefix="dc_fr_";
		if(i==2) frtChkPrefix="b_fr_";
		frtChkSheet=sheetObjArr[i];
		for(var j=2 ; j<sheetObjArr[i].LastRow()+1 ; j++){
			f_frt_seq=frtChkSheet.GetCellValue(j, frtChkPrefix+'frt_seq');
			//if(f_frt_seq != '' &&  frtChkSheet.CellValue(j, frtChkPrefix+'ibflag') != 'R'){
			if(f_frt_seq != '' && frtChkSheet.GetCellValue(j, frtChkPrefix+'inv_sts_cd') != 'FC'){
				ajaxSendPost(chkFrtStsAjaxReq,  'reqVal', '&goWhere=aj&bcKey=checkFrtSts&frt_row='+ j + '&frt_seq=' + f_frt_seq, './GateServlet.gsl');
			}	
		}
	}	
	if(frtChkStsCnt > 0){
		alert(getLabel2('FMS_COM_ALT032', new Array(strFrtChkVal)));
		rtnVal=false;
	}
	frtChkPrefix="";
	frtChkSheet="";
	frtChkStsCnt=0;
	strFrtChkVal="";
	return rtnVal;
}
/**
* Fregiht Status Check
*/
function chkFrtStsAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnListArr=doc[1].split(';');
			var rtnArr=rtnListArr[0].split('@^');
			//LHK 20130812 변경
//			if(rtnArr[2] != "" && rtnArr[3] != "FI" &&  frtChkSheet.CellValue(rtnArr[0], frtChkPrefix+'ibflag') != 'R'){
//			if(rtnArr[2] != "" && rtnArr[3] != "FI" &&  frtChkSheet.CellValue(rtnArr[0], frtChkPrefix+'inv_seq') == ''){
			if(rtnArr[3] == "FC" &&  frtChkSheet.GetCellValue(rtnArr[0], frtChkPrefix+'inv_sts_cd') != 'FC'){
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'del_chk',0);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'frt_check',0);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'frt_seq',rtnArr[1]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'inv_seq',rtnArr[2]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'inv_sts_cd',rtnArr[3]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'sell_buy_tp_cd',rtnArr[4]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'rat_curr_cd',rtnArr[5]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'frt_cd',rtnArr[6]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'frt_cd_nm',rtnArr[7]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'trdp_cd',rtnArr[8]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'eng_nm AS trdp_nm',rtnArr[9]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'trdp_tp_cd',rtnArr[10]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'aply_ut_cd',rtnArr[11]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'cntr_tpsz_cd',rtnArr[12]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'qty',rtnArr[13]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'scg_incl_flg',rtnArr[14]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'frt_term_cd',rtnArr[15]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'ru',rtnArr[16]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'inv_curr_cd',rtnArr[17]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'inv_xcrt',rtnArr[18]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'inv_xcrt_dt',rtnArr[19]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'inv_amt',rtnArr[20]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'inv_vat_amt',rtnArr[21]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'inv_sum_amt',rtnArr[22]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'perf_curr_cd',rtnArr[23]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'perf_xcrt',rtnArr[24]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'perf_amt',rtnArr[25]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'perf_vat_amt',rtnArr[26]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'frt_biz_clss_cd',rtnArr[27]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'vat_rt',rtnArr[28]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'vat_amt', rtnArr[29]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'intg_bl_seq',rtnArr[30]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'frt_ask_clss_cd',rtnArr[31]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'trf_ctrt_no',rtnArr[32]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'trf_dtl_seq',rtnArr[33]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'auto_trf_flg',rtnArr[34]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'inv_sts_nm',rtnArr[35]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'inv_no',rtnArr[36]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'proc_usrnm',rtnArr[37]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'cd_nm AS proc_dept_nm',rtnArr[38]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'trf_cur_sum_amt',rtnArr[39]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'agent_ru',rtnArr[40]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'agent_amt',rtnArr[41]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'cr_amt',rtnArr[42]);
				frtChkSheet.SetCellValue(rtnArr[0], frtChkPrefix+'buy_inv_no',rtnArr[43]);
                frtChkSheet.SetRowEditable(rtnArr[0],0);
                if(frtChkPrefix == "fr_"){
                	strFrtChkVal += "[A/R Billing Item "+ rtnArr[7] + "]\n\r";
                }
                if(frtChkPrefix == "dc_fr_"){
                	strFrtChkVal += "[D/C Billing Item "+ rtnArr[7] + "]\n\r";
                }
                if(frtChkPrefix == "b_fr_"){
                	strFrtChkVal += "[A/P Billing Item "+ rtnArr[7] + "]\n\r";
                }
				frtChkStsCnt++;
			}
		}
	}
	else{
		//Data load failed.
		alert(getLabel('FMS_COM_ALT019'));
	}
}	
/**
 * Pier Pass Freight 항목추가. [20130913 OJG]
*/
var tempSellBuyTpCd=""
function addPierPassFrt(intgBlSeq, bizClssCd, shpModCd, bndClssCd, sellBuyTpCd){
	var param=''; 
	param += '&intg_bl_seq=' + intgBlSeq;
	param += '&biz_clss_cd=' + bizClssCd;
	param += '&shp_mod_cd=' + shpModCd;
	param += '&bnd_clss_cd=' + bndClssCd;
	tempSellBuyTpCd=sellBuyTpCd;
	ajaxSendPost(dispPissPassAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getPierPassFrtList' + param, './GateServlet.gsl');
}
function addCtfCfFrt(intgBlSeq, bizClssCd, shpModCd, bndClssCd, sellBuyTpCd, ctfCf){
	
	var param=''; 
	param += '&intg_bl_seq=' + intgBlSeq;
	param += '&biz_clss_cd=' + bizClssCd;
	param += '&shp_mod_cd=' + shpModCd;
	param += '&bnd_clss_cd=' + bndClssCd;
	param += '&ctfCf=' + ctfCf;
	tempSellBuyTpCd=sellBuyTpCd;
	ajaxSendPost(dispCtfCfAjaxReq, 'reqVal', '&goWhere=aj&bcKey=getCtfCfFrtList' + param, './GateServlet.gsl');
}
/**
 * Pier Pass  Fregiht를 화면에 표시함  [20130913 OJG]
 */
function dispPissPassAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split(';');
			if(tempSellBuyTpCd == "S"){
				var sheetObj=getSdSheet();	// Account Receivable  Sheet
				for(var i=0; i<rtnArr.length-1; i++){
					//frtRowAdd('BCROWADD', sheetObj, 'S', 'I', 'M');
					var intRows5=sheetObj.LastRow() + 1;
					var tmpRow=intRows5-1
					if(sheetObj.GetCellValue(tmpRow, "fr_sell_buy_tp_cd")==''){
					  intRows5=tmpRow;
					}
					sheetObj.DataInsert(intRows5);
					dataArr=rtnArr[i].split('@^');
					var idx=0;
					sheetObj.SetCellValue(sheetObj.LastRow() , 'fr_sell_buy_tp_cd',"S",0);
					sheetObj.SetCellValue(sheetObj.LastRow() , 'fr_frt_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_frt_cd_nm',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_trdp_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_trdp_nm',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_rat_curr_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_aply_ut_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_cntr_tpsz_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_qty',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_frt_term_cd',dataArr[idx++],0);//
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_ru',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_trf_cur_sum_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_vat_rt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_vat_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_curr_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_xcrt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_vat_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_sum_amt',dataArr[idx++],0);
					//sheetObj.CellValue2(sheetObj.LastRow(), 'fr_inv_no')     =            dataArr[idx++]; 		//Container No
					
					if(sheetObj.GetCellValue(sheetObj.LastRow(), 'fr_aply_ut_cd') == "CBM"){
						sheetObj.SetCellEditable(sheetObj.LastRow(), 'fr_cntr_tpsz_cd',0);
						if(sheetObj.GetCellValue(sheetObj.LastRow(), 'fr_trf_cur_sum_amt')  < 5.00){
							sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_amt',5,0);
							sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_sum_amt',5,0);
						}
					}else{
						sheetObj.SetCellEditable(sheetObj.LastRow(), 'fr_cntr_tpsz_cd',1);
					}
				}
			}else if(tempSellBuyTpCd == "B"){
				var sheetObj=getBcSheet();	//Account Payable
				for(var i=0; i<rtnArr.length-1; i++){
					//frtRowAdd('BCROWADD', sheetObj, 'S', 'I', 'M');
					var intRows5=sheetObj.LastRow() + 1;
					var tmpRow=intRows5-1;
					if(sheetObj.GetCellValue(tmpRow, "b_fr_sell_buy_tp_cd")==''){
					  intRows5=tmpRow;
					}
					sheetObj.DataInsert(intRows5);
					dataArr=rtnArr[i].split('@^');
					var idx=0;
					sheetObj.SetCellValue(sheetObj.LastRow() , 'b_fr_sell_buy_tp_cd',"B",0);
					sheetObj.SetCellValue(sheetObj.LastRow() , 'b_fr_frt_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow() , 'b_fr_frt_cd_nm',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_trdp_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_trdp_nm',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_rat_curr_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_aply_ut_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_cntr_tpsz_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_qty',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_frt_term_cd',dataArr[idx++],0);//
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_ru',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_trf_cur_sum_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_vat_rt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_vat_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_curr_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_xcrt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_vat_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_sum_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_buy_inv_no',dataArr[idx++],0);//Container No
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_reserve_field03',sheetObj.GetCellValue(sheetObj.LastRow(), 'b_fr_buy_inv_no') ,0);//Container No
					//alert(sheetObj.CellValue(sheetObj.LastRow(), 'b_fr_aply_ut_cd') );
					
					if(sheetObj.GetCellValue(sheetObj.LastRow(), 'b_fr_aply_ut_cd') == "CBM"){
						sheetObj.SetCellEditable(sheetObj.LastRow(), 'b_fr_cntr_tpsz_cd',0);
						if(sheetObj.GetCellValue(sheetObj.LastRow(), 'b_fr_trf_cur_sum_amt')  < 5.00){
							sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_amt',5,0);
							sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_sum_amt',5,0);
						}
					}else{
						sheetObj.SetCellEditable(sheetObj.LastRow(), 'b_fr_cntr_tpsz_cd',1);
					}
				}
			}
		}
	}
	else{
		//Data load failed.
		alert(getLabel('FMS_COM_ALT019') + "\n\n: BL_FRT.2507");
	}
}
function dispCtfCfAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split(';');
			if(tempSellBuyTpCd == "S"){
				var sheetObj=getSdSheet();	// Account Receivable  Sheet
				for(var i=0; i<rtnArr.length-1; i++){
					//frtRowAdd('BCROWADD', sheetObj, 'S', 'I', 'M');
					var intRows5=sheetObj.LastRow() + 1;
					var tmpRow=intRows5-1
					if(sheetObj.GetCellValue(tmpRow, "fr_sell_buy_tp_cd")==''){
					  intRows5=tmpRow;
					}
					sheetObj.DataInsert(intRows5);
					dataArr=rtnArr[i].split('@^');
					var idx=0;
					sheetObj.SetCellValue(sheetObj.LastRow() , 'fr_sell_buy_tp_cd',"S",0);
					sheetObj.SetCellValue(sheetObj.LastRow() , 'fr_frt_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_frt_cd_nm',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_trdp_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_trdp_nm',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_rat_curr_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_aply_ut_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_cntr_tpsz_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_qty',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_frt_term_cd',dataArr[idx++],0);//
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_ru',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_trf_cur_sum_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_vat_rt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_vat_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_curr_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_xcrt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_vat_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_sum_amt',dataArr[idx++],0);
					//sheetObj.CellValue2(sheetObj.LastRow(), 'fr_inv_no')     =            dataArr[idx++]; 		//Container No
					
					if(sheetObj.GetCellValue(sheetObj.LastRow(), 'fr_aply_ut_cd') == "CBM"){
						sheetObj.SetCellEditable(sheetObj.LastRow(), 'fr_cntr_tpsz_cd',0);
						if(sheetObj.GetCellValue(sheetObj.LastRow(), 'fr_trf_cur_sum_amt')  < 5.00){
							sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_amt',5,0);
							sheetObj.SetCellValue(sheetObj.LastRow(), 'fr_inv_sum_amt',5,0);
						}
					}else{
						sheetObj.SetCellEditable(sheetObj.LastRow(), 'fr_cntr_tpsz_cd',1);
					}
				}
			}else if(tempSellBuyTpCd == "B"){
				var sheetObj=getBcSheet();	//Account Payable
				for(var i=0; i<rtnArr.length-1; i++){
					//frtRowAdd('BCROWADD', sheetObj, 'S', 'I', 'M');
					var intRows5=sheetObj.LastRow() + 1;
					var tmpRow=intRows5-1;
					if(sheetObj.GetCellValue(tmpRow, "b_fr_sell_buy_tp_cd")==''){
					  intRows5=tmpRow;
					}
					sheetObj.DataInsert(intRows5);
					dataArr=rtnArr[i].split('@^');
					var idx=0;
					sheetObj.SetCellValue(sheetObj.LastRow() , 'b_fr_sell_buy_tp_cd',"B",0);
					sheetObj.SetCellValue(sheetObj.LastRow() , 'b_fr_frt_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow() , 'b_fr_frt_cd_nm',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_trdp_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_trdp_nm',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_rat_curr_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_aply_ut_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_cntr_tpsz_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_qty',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_frt_term_cd',dataArr[idx++],0);//
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_ru',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_trf_cur_sum_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_vat_rt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_vat_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_curr_cd',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_xcrt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_vat_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_sum_amt',dataArr[idx++],0);
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_buy_inv_no',dataArr[idx++],0);//Container No
					sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_reserve_field03',sheetObj.GetCellValue(sheetObj.LastRow(), 'b_fr_buy_inv_no') ,0);//Container No
					//alert(sheetObj.CellValue(sheetObj.LastRow(), 'b_fr_aply_ut_cd') );
					
					if(sheetObj.GetCellValue(sheetObj.LastRow(), 'b_fr_aply_ut_cd') == "CBM"){
						sheetObj.SetCellEditable(sheetObj.LastRow(), 'b_fr_cntr_tpsz_cd',0);
						if(sheetObj.GetCellValue(sheetObj.LastRow(), 'b_fr_trf_cur_sum_amt')  < 5.00){
							sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_amt',5,0);
							sheetObj.SetCellValue(sheetObj.LastRow(), 'b_fr_inv_sum_amt',5,0);
						}
					}else{
						sheetObj.SetCellEditable(sheetObj.LastRow(), 'b_fr_cntr_tpsz_cd',1);
					}
				}
			}
		}
	}
	else{
		//Data load failed.
		alert(getLabel('FMS_COM_ALT019') + "\n\n: BL_FRT.2507");
	}
}
/**
 * 	추가 Callback 함수 정의
 */
function SHEET_TRDP_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+'fr_trdp_cd', rtnValAry[0], 0);//trdp_cd
		sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+'fr_trdp_nm', rtnValAry[2], 0);//full_nm
	}
    sheetObj.SelectCell(cur_rowIdx, cur_objPfx+'fr_trdp_nm');
}

/**(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
 * 	추가 Callback 함수 정의
 */
function SHEET_TRDP_POPUP_LOCAL(rtnVal){
	var sheetObj = cur_sheetObj;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+'fr_trdp_cd', rtnValAry[0], 0);//trdp_cd
		sheetObj.SetCellValue(cur_rowIdx, cur_objPfx+'fr_trdp_nm', rtnValAry[10]);//local Name
	}
	sheetObj.SelectCell(cur_rowIdx, cur_objPfx+'fr_trdp_nm');
}

//#2348 [IMPEX] Pop up error message not closing after click OK
var cntrTpSzFlag = true;

//BL_COPY 시트초기화 용 함수
function setBlFrtCopy(sheetObj, objPfx, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd) {
	
	sheetObj.SetEditable(1);
	//#6779 [JAPT] Freight Copy function works abnormally for tax
	getTaxMgmtuse();
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		
		sheetObj.SetRowEditable(i,1);
		
		sheetObj.SetCellValue(i, objPfx+"fr_frt_seq","",0);
		
		//#455 [ACL MEXICO] BL COPY > FREIGHT TAB'S FREIGHT UNIT TO COPY
//		sheetObj.SetCellValue(i, objPfx+"fr_aply_ut_cd","",0);
		sheetObj.SetCellValue(i, objPfx+"fr_inv_no","",0);		
		sheetObj.SetCellValue(i, objPfx+"fr_buy_inv_no","",0);		
		sheetObj.SetCellValue(i, objPfx+"fr_inv_sts_cd","",0);		
		sheetObj.SetCellValue(i, objPfx+"fr_inv_sts_nm","",0);		
		sheetObj.SetCellValue(i, objPfx+"fr_inv_seq","",0);		
		sheetObj.SetCellValue(i, objPfx+"fr_trf_dtl_seq",0,0);	
		sheetObj.SetCellValue(i, objPfx+"fr_ibflag","I",0);	
		sheetObj.SetCellValue(i, objPfx+"fr_auto_trf_flg","N",0);	
		//sheetObj.SetCellValue(i, objPfx+"fr_inv_xcrt_dt","",0);  //#3873 [JAPT]  T/S popup , validation and sync.

		//#141 #49037 - [IMPEX] OIH COPY후 OIM FILING# 입력 후 | {CO} MB/L and HB/L, MAWB and HAWB items copy rule opti
//		sheetObj.SetCellValue(i, objPfx+"fr_agent_ru",0,0);
//		sheetObj.SetCellValue(i, objPfx+"fr_agent_amt",0,0);
//		sheetObj.SetCellValue(i, objPfx+"fr_qty",0,0);
//		sheetObj.SetCellValue(i, objPfx+"fr_trf_cur_sum_amt",0,0);
//		sheetObj.SetCellValue(i, objPfx+"fr_vat_amt",0,0);
//		sheetObj.SetCellValue(i, objPfx+"fr_inv_amt",0,0);
//		sheetObj.SetCellValue(i, objPfx+"fr_inv_vat_amt",0,0);		
//		sheetObj.SetCellValue(i, objPfx+"fr_inv_sum_amt",0,0);		
//		sheetObj.SetCellValue(i, objPfx+"fr_org_agent_amt",0,0);
		
		//D/C일 경우 P/C default value 'CC'로 세팅
		if(objPfx == 'dc_'){
			//#4037 [JAPT] keeping Sales PIC , Freight code.
			//sheetObj.SetCellValue(i, objPfx+"fr_frt_term_cd","CC", 0);
			//#455 [ACL MEXICO] BL COPY > FREIGHT TAB'S FREIGHT UNIT TO COPY
			mutiSheetOnChange(sheetObj, i, "7", objPfx, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd)
		} 
		//AP/AR일 경우 Export 'PP', Import 'CC'로 default value 세팅
		else {
			if(bnd_clss_cd == "O"){
				//#4037 [JAPT] keeping Sales PIC , Freight code.
				//sheetObj.SetCellValue(i, objPfx+"fr_frt_term_cd","PP", 0);
			}
			else if(bnd_clss_cd == "I") {
				sheetObj.SetCellValue(i, objPfx+"fr_frt_term_cd","CC", 0);
			}
			//#455 [ACL MEXICO] BL COPY > FREIGHT TAB'S FREIGHT UNIT TO COPY
			mutiSheetOnChange(sheetObj, i, "6", objPfx, air_sea_clss_cd, bnd_clss_cd, biz_clss_cd)
		}
		
		if(objPfx == ''){
			
		} else if(objPfx == 'b'){
			
		} else if(objPfx == 'dc_'){
			
			//fr_inv_sum_amt 가 0 일 경우 warning
			//Revenue 일 경우 
			if(sheetObj.GetCellValue(i, objPfx+'fr_sell_buy_tp_cd') == "D"){
				sheetObj.SetCellBackColor(i, objPfx+'fr_agent_amt',sheetObj.GetDataBackColor());
				//Credit 입력 제한 
				//sheetObj.SetCellEditable(i, objPfx+'fr_ru',1);
				//sheetObj.SetCellValue(i, objPfx+'fr_agent_ru',0);
				//sheetObj.SetCellEditable(i, objPfx+'fr_agent_ru',0);
				sheetObj.SetCellEditable(i, objPfx+'fr_inv_sum_amt',1);
				sheetObj.SetCellValue(i, objPfx+'fr_agent_amt',0);
				sheetObj.SetCellEditable(i, objPfx+'fr_agent_amt',0);
			}	
			//Cost 일 경우 
			if(sheetObj.GetCellValue(i, objPfx+'fr_sell_buy_tp_cd') == "C"){
				sheetObj.SetCellBackColor(i, objPfx+'fr_inv_sum_amt',sheetObj.GetDataBackColor());
				//Debit 입력 제한
				//sheetObj.SetCellValue(i, objPfx+'fr_ru',0);
				//sheetObj.SetCellEditable(i, objPfx+'fr_ru',0);
				//sheetObj.SetCellEditable(i, objPfx+'fr_agent_ru',1);
				sheetObj.SetCellEditable(i, objPfx+'fr_inv_sum_amt',0);
				sheetObj.SetCellValue(i, objPfx+'fr_inv_sum_amt',0);
				sheetObj.SetCellEditable(i, objPfx+'fr_agent_amt',1);
			}		
		}
		//#6779 [JAPT] Freight Copy function works abnormally for tax
		if(tax_mgmt_use != "Y"){
			var codeTp = "freight";
			var param='&air_sea_clss_cd=' + air_sea_clss_cd; 
			param += '&bnd_clss_cd=' + bnd_clss_cd;
			param += '&biz_clss_cd=' + biz_clss_cd;
			param += '&tabStr=' + objPfx;
			
			//#6745 [BNX-TOR] BL freight copy malfunction with special character billing code escaping
			var s_code = encodeURIComponent(sheetObj.GetCellValue(i, objPfx+'fr_frt_cd'));
			
			ajaxSendPost(setRtnVatRt, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+codeTp+'&s_code='+ s_code + param, './GateServlet.gsl');
			sheetObj.SetCellValue(i, objPfx + "fr_vat_rt", s_fr_vat_rt, 0);	// Tax Rate
		}
	}
}

/**
 * Code Return 값을 Cell에 담는다 (var_rt)
 */
function setRtnVatRt(rtnMsg){
    var doc=getAjaxMsgXML(rtnMsg);
    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            var rtnArr=doc[1].split('@@;');
            var masterVals=rtnArr[0].split('@@^');
            s_fr_vat_rt = masterVals[24];
        }
    }else{
        alert(AJ_FND_ERR);
    }
}


//#4084 (JAPT) same currency invoice - exchange rate validation
function exchangeRateVal(){
	if(ecrtCnt != 0){
		   alert("Below Frieght's Ex.Rate will set as 1.\nBecause 'Rate Curr.' and 'Curr.' are same. " + ecrtFrtList);
			ecrtCnt = 0;
			frtName = "";
			ecrtFrtList = " ";
	}
}
//#6779 [JAPT] Freight Copy function works abnormally for tax
function getTaxMgmtuse(){
	var opt_key = "TAX_MGMT_USE";
	ajaxSendPost(setTaxMgmtUse, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}
var tax_mgmt_use = "N";
function setTaxMgmtUse(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		tax_mgmt_use=doc[1];
	} 
}

//OFVFOUR-7147 [ACL US] Other BL deleted after invoice created
var blExisted;
function checkExistedBL(){
	ajaxSendPost(checkBLExistence, 'reqVal', '&goWhere=aj&bcKey=checkBLExistence&oth_seq='+frm1.f_oth_seq.value + "&intg_bl_seq=" + frm1.f_intg_bl_seq.value, './GateServlet.gsl');
}
function checkBLExistence(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK' && doc[1] != 0 ){
			blExisted = true;
	} else blExisted = false; 
}