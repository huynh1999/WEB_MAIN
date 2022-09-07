var isInvChg=false;
var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
	try {
		switch(srcName) {
			case "INV_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]="C";
				callBackFunc = "INV_POPLIST";
		   		modal_center_open('./CMM_POP_0240.clt', rtnary, 756,454,"yes");
		   		
				
			break;  
    	   	case "NEW":
		   		frm1.f_cmd.value='';
		    	frm1.submit();
    	   	break;
    	   	case "SEARCH":
    	   		if(frm1.f_inv_no.value!=''){
    		   		frm1.f_cmd.value=SEARCH;
    		    	frm1.submit();
    	   		}
    	   	break;
    	   	case "SEARCHLIST":
    	   		if(frm1.cmb_inv_seq.value!=''){
    		   		frm1.f_cmd.value=SEARCHLIST;
    		   		docObjects[1].DoSearch("./ACC_INV_0080_1GS.clt", FormQueryString(formObj) );
    	   		}
    	   	break;
    	    case "FRTADD":	//Freight 선택
    	       rtnary=new Array(1);
    	       rtnary[0]=getFrtSndParam();
    	       callBackFunc = "setRtnVal";
		   	   modal_center_open('./ACC_INV_0081.clt', rtnary, 758,710,"yes");
		   		
       	   break;
    	   case "ADD":	//저장
    		   /*
    		   //if(checkInputVal(frm1.inv_dt.value, 10, 10, "D", 'Billing Date')!='O'){
    			   frm1.inv_dt.focus();
    		   }else //if(checkInputVal(frm1.clt_due_dt.value, 10, 10, "D", 'Due Date')!='O'){
    			   frm1.clt_due_dt.focus();
    		   }else{
	    		   if(confirm(getLabel('FMS_COM_CFMSAV'))){
	        		   frm1.f_cmd.value=ADD;
	        		   setInvAmtInfos();
//no support[check again]CLT 	        		   var intRows=docObjects[0].LastRow() + 1;
	       			   docObjects[0].DataInsert(--intRows);
	        		   docObjects[0].SetCellValue(1, 1,1);
	            	   docObjects[0].DoAllSave("./ACC_INV_0080GS.clt", FormQueryString(frm1)+'&'+docObjects[1].GetSaveString(false), true);
	    		   }
    		   }
    		   */
    		   if(frm1.inv_dt.value == ""){
    			   //[Billing Date] is mandatory field.
    			   alert(getLabel('FMS_COM_ALT001') + "\n\n: ACC_INV_0080.70");
    			   frm1.inv_dt.focus();
    			   return;
    		   }
    		   else{
    			   if(confirm(getLabel('FMS_COM_CFMSAV'))){
            		   frm1.f_cmd.value=ADD;
            		   setInvAmtInfos();
            		   var intRows=docObjects[0].LastRow() + 1;
           			   docObjects[0].DataInsert(intRows);
            		   docObjects[0].SetCellValue(1, 1,1);
                	   docObjects[0].DoAllSave("./ACC_INV_0080GS.clt", FormQueryString(frm1)+'&'+docObjects[1].GetSaveString(false), true);
        		   }
    		   }
    	   break; 	
    	   case "MODIFY":	//수정
    		   var isOk=true; 
    		   isInvChg=false;
      		   var invLst=docObjects[1].GetSaveString(false);
    		   //삭제요구시
    		   if(invLst != ''){
    			   if(docObjects[1].LastRow() + 1==2){
    				   //Unable to remove invoice info.!\n\nAt least one invoice is required!'); //???
    				   alert(getLabel('FMS_COM_ALT007') + "\n\n: ACC_INV_0080.99");
    				   isOk=false;
    			   }
    			   else{
    				   isInvChg=true;
    			   }
    		   }
    		   if(isOk&&confirm(getLabel('FMS_COM_CFMSAV'))){
    			   //docObjects[2].RemoveAll();
        		   frm1.f_cmd.value=MODIFY;
        		   setInvAmtInfos();
        		   var intRows=docObjects[0].LastRow() + 1;
       			   docObjects[0].DataInsert(intRows);
        		   docObjects[0].SetCellValue(1, 1,1);
            	   docObjects[0].DoAllSave("./ACC_INV_0080GS.clt", FormQueryString(frm1)+'&'+invLst, true);
    		   }
           break;
    	   case "REMOVE":	//수정
    		   if(confirm(getLabel('FMS_COM_CFMDEL'))){
        		   frm1.f_cmd.value=REMOVE;
        		   frm1.submit();
    		   }
           break;
    	   case "COMMAND01":	//저장
    		   if(confirm(getLabel('FMS_COM_CFMSAV'))){
        		   frm1.f_cmd.value=COMMAND01;
        		   var intRows=docObjects[0].LastRow() + 1;
       			   docObjects[0].DataInsert(intRows);
        		   docObjects[0].SetCellValue(1, 1,1);
            	   docObjects[0].DoAllSave("./ACC_INV_0080GS.clt", FormQueryString(frm1), true);
            	   frm1.inv_sts_cd.value="IC";
            	   frm1.sts_label.value="INVOICE CONFIRM";
            	   btnLoad();
    		   }
    	   break; 	
    	   case "COMMAND02":	//저장
    		   if(confirm(getLabel('FMS_COM_CFMCAN'))){
        		   frm1.f_cmd.value=COMMAND02;
        		   var intRows=docObjects[0].LastRow() + 1;
       			   docObjects[0].DataInsert(intRows);
        		   docObjects[0].SetCellValue(1, 1,1);
            	   docObjects[0].DoAllSave("./ACC_INV_0080GS.clt", FormQueryString(frm1), true);
    		   }
    	   break; 	
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: ACC_INV_0080.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: ACC_INV_0080.002");
        } 	
	}
}
function setInvAmtInfos(){
	var totLen=docObjects[2].LastRow() + 1;
	var inv_aply_curr_cd='inv_aply_curr_cd';
	var inv_ttl_amt='inv_ttl_amt'
	var inv_ttl_vat_amt='inv_ttl_vat_amt';
	var inv_ttl_sum_amt='inv_ttl_sum_amt';
	/*
	for(var i=1; i < totLen; i++){
if('TOTAL'==docObjects[2].GetCellValue(i, inv_aply_curr_cd)){
frm1.in_inv_amt.value=docObjects[2].GetCellValue(i, inv_ttl_amt);
frm1.in_inv_vat_amt.value=docObjects[2].GetCellValue(i, inv_ttl_vat_amt);
frm1.in_inv_sum_amt.value=docObjects[2].GetCellValue(i, inv_ttl_sum_amt);
		}else{
frm1.in_frgn_curr_cd.value=docObjects[2].GetCellValue(i, inv_aply_curr_cd);
frm1.in_frgn_amt.value=docObjects[2].GetCellValue(i, inv_ttl_amt);
frm1.in_frgn_vat_amt.value=docObjects[2].GetCellValue(i, inv_ttl_vat_amt);
frm1.in_frgn_sum_amt.value=docObjects[2].GetCellValue(i, inv_ttl_sum_amt);
		}
	}
	*/
}
function doDisplay(doWhat, formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 팝업 호출      
	        var cal=new ComCalendar();
	        cal.select(formObj.inv_dt, 'MM-dd-yyyy');
	    break;
	    case 'DATE2':   //달력 조회 팝업 호출      
	        var cal=new ComCalendar();
	        cal.select(formObj.clt_due_dt, 'MM-dd-yyyy');
	    break;
    }
}
/**
 * Invoice에 포함된 Freight정보를 Freight 팝업으로 넘김
 */
function getFrtSndParam(){
   var keyYn='';
   if(frm1.inv_sts_cd.value!='NA'){
	   keyYn='Y';
   }
   var curHblStr='';
   var divStr='^';
   var clsStr=';';
   for(var i=1; i< docObjects[1].LastRow() + 1; i++){
	   curHblStr+= frm1.trdp_cd.value;
	   curHblStr+= divStr; 
	   curHblStr+= frm1.trdp_nm.value;
	   curHblStr+= divStr;
	   curHblStr+= frm1.sell_buy_tp_cd.value;
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_no');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_curr_cd');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_amt');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_vat_amt');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_sum_amt');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_seq');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'acc_ibflag');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'frgn_curr_cd');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'frgn_sum_amt');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'locl_amt');
	   curHblStr+= divStr;
	   // 2012/03/06 HBL/MBL 추가
curHblStr+= docObjects[1].GetCellValue(i, 'bl_no');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'mbl_no');
	   curHblStr+= divStr;
curHblStr+= docObjects[1].GetCellValue(i, 'inv_dt');
	   curHblStr+= clsStr;
   }
   return curHblStr;
}
/**
 * Return 된 Freight정보를 Invoice에 추가함
 */
function setRtnVal(rtnVal){
	//HBL ADD이후
	if(rtnVal!=''&&typeof(rtnVal)!='undefined'){
  	   var rtnArr=rtnVal.split(';');
  	   var isBegin=true;
  	   var savedHbl='';
    	//기존 HBL목록을 초기화
  	    var totRow=docObjects[1].LastRow() + 1;
       	if(totRow>1){
      		totRow--;
      		for(var i=totRow; 0 < i; i--){
if(docObjects[1].GetCellValue(i, 'acc_ibflag')!='R'){
      				docObjects[1].RowDelete(i, false);
      			}else{
savedHbl+= docObjects[1].GetCellValue(i, 'inv_seq');
      				savedHbl+= ':';
      			}
      		}
      	}
       	//현재 선택된 HBL정보를 표시함 
	    var intRows=docObjects[1].LastRow() + 1;
	    var newRow=intRows;
	    var dispArr;
	    var totPck=0;
	    var totMeas=0;
	    var totActWgt=0;
	    var totWgt=0;
	    var blSeq='';
	    var curArr=new Array();
	    var curAmt=new Array();
	    var curInv=new Array();
	    var curSum=new Array();
	    var isAL=false;
	    var loopCnt=0;
  	    for(var i=0; i < rtnArr.length; i++){
  		   var hblArr=rtnArr[i].split('^');
  		   if(rtnArr[i]!=''){
  			   //BL번호가 저장되어있지 않음경우
  			   if(savedHbl.indexOf(hblArr[1])==-1){
  				   //화면표시
  				   if(i==0){
  					   dispArr=hblArr;
  				   }
					docObjects[1].DataInsert(newRow);
					docObjects[1].SetCellValue(intRows, 'inv_no',hblArr[0]);
					docObjects[1].SetCellValue(intRows, 'inv_seq',hblArr[1]);
					docObjects[1].SetCellValue(intRows, 'frgn_curr_cd',hblArr[14]);
					docObjects[1].SetCellValue(intRows, 'frgn_sum_amt',hblArr[15]);
					docObjects[1].SetCellValue(intRows, 'locl_amt',hblArr[16]);
					docObjects[1].SetCellValue(intRows, 'inv_sum_amt',hblArr[8]);
					docObjects[1].SetCellValue(intRows, 'inv_curr_cd',hblArr[5]);
					docObjects[1].SetCellValue(intRows, 'inv_amt',hblArr[6]);
					docObjects[1].SetCellValue(intRows, 'inv_vat_amt',hblArr[7]);
					docObjects[1].SetCellValue(intRows, 'buy_inv_no',hblArr[17]);
					docObjects[1].SetCellValue(intRows, 'bl_no',hblArr[18]);
					docObjects[1].SetCellValue(intRows, 'mbl_no',hblArr[19]);
					docObjects[1].SetCellValue(intRows, 'inv_dt',hblArr[20]);
					docObjects[1].SetCellValue(intRows, 'ofc_cd',hblArr[21]);
					if(loopCnt==0){
					    curArr[0]=hblArr[5];	//Currency
					    curAmt[0]=hblArr[6];	//Amount
					    curInv[0]=hblArr[7];	//VAT Amount
					    curSum[0]=hblArr[8];	//Sum Amount
					}else{
						var usedCur=false;
						var arrLen=curArr.length;
						for(var p=0; p < arrLen; p++){
							//동일한 Currency인 경우
							if(curArr[p]==hblArr[5]){
							    curAmt[p]=parseFloat(curAmt[p])+parseFloat(hblArr[6]);	//Amount
							    curInv[p]=parseFloat(curInv[p])+parseFloat(hblArr[7]);	//VAT Amount
							    curSum[p]=parseFloat(curSum[p])+parseFloat(hblArr[8]);	//Sum Amount
								usedCur=true;
							}
						}
						//처음 확인된 Currency인 경우
						if(!usedCur){
						    curArr[arrLen]=hblArr[5];	//Currency
						    curAmt[arrLen]=hblArr[6];	//Amount
						    curInv[arrLen]=hblArr[7];	//VAT Amount
						    curSum[arrLen]=hblArr[8];	//Sum Amount
						}
					}
				   newRow++;
				   intRows++;
				   loopCnt++;
  			   }
  		   }
  	   }
  	   if(typeof(dispArr)!='undefined'&&newRow>0){
  		   //화면에 기본값 표시
  		   frm1.air_sea_clss_cd.value=dispArr[12];
  		   frm1.bnd_clss_cd.value=dispArr[13];
  		   frm1.trdp_cd.value=dispArr[2];	//TRDP_NM
  		   frm1.trdp_nm.value=dispArr[3];	//TRDP_NM
  		   frm1.sell_buy_tp_cd.value=dispArr[4];	//SELL_BUY_TP_CD
  		   if(dispArr[4]=='S'){
  			 frm1.sell_buy_tp_nm.value='Selling';   
  		   }else if(dispArr[4]=='B'){
  			 frm1.sell_buy_tp_nm.value='Buying';
  		   }else if(dispArr[4]=='D'){
  			 frm1.sell_buy_tp_nm.value='Debit';
  		   }else{
  			 frm1.sell_buy_tp_nm.value='Credit';  
  		   }
  		   frm1.inv_aply_curr_cd.value=dispArr[5];
			frm1.inv_dt.className='search_form';
			frm1.inv_dt.readOnly=false;
			//Debit/Credit인경우
			if(dispArr[4]=='D'||dispArr[4]=='C'){
				var tmpOpt=frm1.tax_bil_flg.options;
				if(tmpOpt.length==2){
					tmpOpt.remove(0);
				}
			}else{
				var tmpOpt=frm1.tax_bil_flg.options;
				if(tmpOpt.length==1){
					var oOption=document.createElement('OPTION');
					tmpOpt.options.add(oOption, 0);
					oOption.innerHTML="Yes";
					oOption.value="Y";
				}
			}
  	       getBtnObj('btnAdd').style.display='block';
  	   }
  	   // INVOICE의 합계를 구한다.
  	   var sheetObj1=docObjects[1];
  	   var sheetObj2=docObjects[2];
  	   var inv_amt=0;
  	   var vat_amt=0
  	   var tot_amt=0;
var inv_curr=sheetObj1.GetCellValue(1, "inv_curr_cd");
  	   for(var i=1; i<=sheetObj1.LastRow(); i++){
inv_amt += Number(sheetObj1.GetCellValue(i, "inv_amt"));
vat_amt += Number(sheetObj1.GetCellValue(i, "inv_vat_amt"));
tot_amt += Number(sheetObj1.GetCellValue(i, "inv_sum_amt"));
  	   }
  	if(sheetObj2.LastRow() + 1 > 1){
  		 sheetObj2.SetCellValue(1, "inv_aply_curr_cd",inv_curr);
  		 sheetObj2.SetCellValue(1, "inv_ttl_amt",inv_amt);
  		 sheetObj2.SetCellValue(1, "inv_ttl_vat_amt",vat_amt);
  		 sheetObj2.SetCellValue(1, "inv_ttl_sum_amt",tot_amt);
  		 sheetObj2.SetCellValue(1, "smryIbflag","R");
  	   }else{
  		 var intRows=sheetObj2.LastRow() + 1;
  		 sheetObj2.DataInsert(intRows);
  		 sheetObj2.SetCellValue(intRows, "inv_aply_curr_cd",inv_curr);
  		 sheetObj2.SetCellValue(intRows, "inv_ttl_amt",inv_amt);
  		 sheetObj2.SetCellValue(intRows, "inv_ttl_vat_amt",vat_amt);
  		 sheetObj2.SetCellValue(intRows, "inv_ttl_sum_amt",tot_amt);
  		 sheetObj2.SetCellValue(intRows, "smryIbflag","R");
  	   }
  	   //HIDDEN VALUE 셋팅
  	   frm1.in_inv_amt.value=inv_amt;
  	   frm1.in_inv_vat_amt.value=vat_amt;
  	   frm1.in_inv_sum_amt.value=tot_amt;
  	   frm1.in_inv_krw_amt.value=tot_amt;
  	   /*
  	   if(loopCnt>0){
  	       //Invoice 선택시 금액정보를 재조회함
  	       getInvAmtInfo(getInvSeqKeys());
  	   }
  	   */
	}
}
var trdpCd='';
function getDueDate(){
	if(frm1.inv_dt.value.length==10&&frm1.clt_due_dt.value==''){
		//ajaxSendPost(setDueDate, 'reqVal', '&goWhere=aj&bcKey=getDueDate&callId=O&trdp_cd='+frm1.trdp_cd.value+'&fm_dt='+frm1.inv_dt.value, './GateServlet.gsl');
		// POST_DATE의 30일을 더한다.
		var rtnDay=addDay(frm1.inv_dt.value, 30);
		frm1.clt_due_dt.value=rtnDay;
	}
}
//날짜더하기
function addDay(ymd, v_day){
	 ymd=ymd.replaceAll("-","");
	 var yyyy=ymd.substr(4,4);
	 var mm=eval(ymd.substr(0,2) + "- 1") ;
	 var dd=ymd.substr(2,2);
	 var dt3=new Date(yyyy, mm, eval(dd + '+' + v_day));
	 yyyy=dt3.getFullYear();
	 mm=(dt3.getMonth()+1)<10? "0" + (dt3.getMonth()+1) : (dt3.getMonth()+1) ;
	 dd=dt3.getDate()<10 ? "0" + dt3.getDate() : dt3.getDate();
	 return  mm + "-" + dd + "-" + yyyy ;
}
function setDueDate(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			frm1.clt_due_dt.value=rtnArr[1];
			frm1.clt_due_dt.className='search_form';
			frm1.clt_due_dt.readOnly=false;
		}
	}
	else{
		//Unable to retrieve [Due Date]
		alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0080.13");
	}
}
function getInvAmtInfo(toInvSeqs){
	if(toInvSeqs!=''){
		ajaxSendPost(getApplyInvAmt, 'reqVal', '&goWhere=aj&bcKey=searchInvSumInfo&f_inv_seqs='+toInvSeqs, './GateServlet.gsl');		
	}
}
/**
 * 생성 및 수정시 Currency 별 금액을 표시합니다.
 */
function getApplyInvAmt(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	docObjects[2].RemoveAll();
    	var invInfo=doc[1].split('@@^');
    	var intRows=docObjects[2].LastRow() +1 ;
		var newRow=intRows;
		if(invInfo[2]>0){
			docObjects[2].DataInsert(newRow);
			docObjects[2].SetCellValue(intRows, "inv_aply_curr_cd",frm1.inv_aply_curr_cd.value);
			docObjects[2].SetCellValue(intRows, "inv_ttl_amt",invInfo[0]);//Amount
			docObjects[2].SetCellValue(intRows, "inv_ttl_vat_amt",invInfo[1]);//VAT Amount
			docObjects[2].SetCellValue(intRows, "inv_ttl_sum_amt",invInfo[2]);//Sum Amount
			newRow++;
			intRows++;
		}
		frm1.inv_aply_xcrt.value=invInfo[7];
		//Foreign Currency가 있는경우
		if(invInfo[3]!=''){
			docObjects[2].DataInsert(newRow);
			docObjects[2].SetCellValue(intRows, "inv_aply_curr_cd",invInfo[3]);
			docObjects[2].SetCellValue(intRows, "inv_ttl_amt",invInfo[4]);//Amount
			docObjects[2].SetCellValue(intRows, "inv_ttl_vat_amt",invInfo[5]);//VAT Amount
			//invInfo[8] LOCL변환 Amt,  invInfo[9] LOCL변환 VAT
			docObjects[2].SetCellValue(intRows, "inv_ttl_sum_amt",invInfo[10]);//LOCL 변환 Sum Amount
		}
		sumInvAmtVal(invInfo)
    }else{
//        alert(getLabel('SEE_BMD_MSG43'));       
    }
}
function sumInvAmtVal(invInfo){
	if(invInfo[3]!=''){
		frm1.in_frgn_curr_cd.value=invInfo[3];
		frm1.in_frgn_amt.value=invInfo[4];
		frm1.in_frgn_vat_amt.value=invInfo[5];
		frm1.in_frgn_sum_amt.value=parseFloat(invInfo[4])+parseFloat(invInfo[5]);
	}
	frm1.in_inv_amt.value=parseFloat(invInfo[0])+parseFloat(invInfo[8]);
	frm1.in_inv_vat_amt.value=parseFloat(invInfo[1])+parseFloat(invInfo[9]);
	frm1.in_inv_sum_amt.value=parseFloat(invInfo[2])+parseFloat(invInfo[10]);
	frm1.in_inv_krw_amt.value=invInfo[11];
}
/**
 * 조회시 Currency별 금액을 표시합니다.
 */
function loadSum(){
	if(frm1.cmb_inv_seq.value!=''){
		var intRows=docObjects[2].LastRow() + 1;
		var newRow=intRows;
		if(frm1.org_sum_amt.value>0){
			docObjects[2].DataInsert(newRow);
			docObjects[2].SetCellValue(intRows, "inv_aply_curr_cd",frm1.inv_aply_curr_cd.value);
			docObjects[2].SetCellValue(intRows, "inv_ttl_amt",frm1.org_amt.value);//Amount
			docObjects[2].SetCellValue(intRows, "inv_ttl_vat_amt",frm1.org_vat_amt.value);//VAT Amount
			docObjects[2].SetCellValue(intRows, "inv_ttl_sum_amt",frm1.org_sum_amt.value);//Sum Amount
			newRow++;
			intRows++;
		}
		//Foreign Currency가 있는경우
		if(frm1.in_frgn_curr_cd.value!=''){
			docObjects[2].DataInsert(newRow);
			docObjects[2].SetCellValue(intRows, "inv_aply_curr_cd",frm1.in_frgn_curr_cd.value);
			docObjects[2].SetCellValue(intRows, "inv_ttl_amt",frm1.in_frgn_amt.value);//Amount
			docObjects[2].SetCellValue(intRows, "inv_ttl_vat_amt",frm1.in_frgn_vat_amt.value);//VAT Amount
			docObjects[2].SetCellValue(intRows, "inv_ttl_sum_amt",frm1.in_frgn_sum_amt.value);//Sum Amount
		}
	}
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
	case 1:     
		with (sheetObj) {
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	
	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('ACC_INV_0080_HDR1_1'), Align:"Center"} ];
	        InitHeaders(headers, info);
	
	        var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_inv_seq" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_inv_no" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_cd" },
	               {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sv_bl_sts_label" } ];
	         
	        InitColumns(cols);
	
	        SetEditable(1);
	        SetVisible(0);

		}
        break;
		case 2:      //IBSheet1 init
		    with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('ACC_INV_0080_HDR2_1'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"del",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"inv_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:1,   SaveName:"buy_inv_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"inv_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"et_dt_tm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"frgn_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"frgn_sum_amt",  KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1, Width:100,  Align:"Right",   ColMerge:1,   SaveName:"locl_amt",      KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"dept_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"inv_curr_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Float",     Hidden:0,  Width:105,  Align:"Right",   ColMerge:1,   SaveName:"inv_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Float",     Hidden:0,  Width:60,   Align:"Right",   ColMerge:1,   SaveName:"inv_vat_amt",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Float",     Hidden:0,  Width:105,  Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:1, Width:0,    Align:"Right",   ColMerge:1,   SaveName:"inv_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Text",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"acc_ibflag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	             
	            InitColumns(cols);
	
	            SetEditable(1);
	            SetHeaderRowHeight(21);
	            //InitViewFormat(0, "inv_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	            SetSheetHeight(380);
		   }                                                      
		break;
		case 3:     
			with (sheetObj) {
		        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	
		        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		        var headers = [ { Text:getLabel('ACC_INV_0080_HDR3_1'), Align:"Center"} ];
		        InitHeaders(headers, info);
	
		        var cols = [ {Type:"Text",     Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"inv_aply_curr_cd" },
		               {Type:"Float",     Hidden:0,  Width:95,   Align:"Right",   ColMerge:0,   SaveName:"inv_ttl_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2 },
		               {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:0,   SaveName:"inv_ttl_vat_amt",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2 },
		               {Type:"AutoSum",   Hidden:0, Width:95,   Align:"Right",   ColMerge:0,   SaveName:"inv_ttl_sum_amt",   KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2 },
		               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"smryIbflag" } ];
		         
		        InitColumns(cols);
	
		        SetCountPosition(0);
		        SetEditable(1);
		        SetSheetHeight(100);
			}
	    break;
    }
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
frm1.inv_sts_cd.value=docObjects[0].GetCellValue(1, "sv_bl_sts_cd");
frm1.sts_label.value=docObjects[0].GetCellValue(1, "sv_bl_sts_label");
	if(frm1.cmb_inv_seq.value==''){
frm1.cmb_inv_seq.value=docObjects[0].GetCellValue(1, "sv_inv_seq");
frm1.f_inv_no.value=docObjects[0].GetCellValue(1, "sv_inv_no");
frm1.inv_no.value=docObjects[0].GetCellValue(1, "sv_inv_no");
		btnLoad();
		doWork('SEARCHLIST');
	}else{
		if(isInvChg){
			doWork('SEARCHLIST');
			//저장시
			getInvAmtInfo(getInvSeqKeys());
		}
	}
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
function sheet2_OnSearchEnd(){
	//INVOICE의 합계를 구한다.
	var sheetObj1=docObjects[1];
	var sheetObj2=docObjects[2];
	var inv_amt=0;
	var vat_amt=0
	var tot_amt=0;
var inv_curr=sheetObj1.GetCellValue(1, "inv_curr_cd");
	for(var i=1; i<=sheetObj1.LastRow(); i++){
inv_amt += Number(sheetObj1.GetCellValue(i, "inv_amt"));
vat_amt += Number(sheetObj1.GetCellValue(i, "inv_vat_amt"));
tot_amt += Number(sheetObj1.GetCellValue(i, "inv_sum_amt"));
	}
	if(sheetObj2.LastRow() + 1 > 1){
		sheetObj2.SetCellValue(1, "inv_aply_curr_cd",inv_curr);
		sheetObj2.SetCellValue(1, "inv_ttl_amt",inv_amt);
		sheetObj2.SetCellValue(1, "inv_ttl_vat_amt",vat_amt);
		sheetObj2.SetCellValue(1, "inv_ttl_sum_amt",tot_amt);
		sheetObj2.SetCellValue(1, "smryIbflag","R");
	}else{
		var intRows=sheetObj2.LastRow() + 1;
		sheetObj2.DataInsert(intRows);
		sheetObj2.SetCellValue(intRows, "inv_aply_curr_cd",inv_curr);
		sheetObj2.SetCellValue(intRows, "inv_ttl_amt",inv_amt);
		sheetObj2.SetCellValue(intRows, "inv_ttl_vat_amt",vat_amt);
		sheetObj2.SetCellValue(intRows, "inv_ttl_sum_amt",tot_amt);
		sheetObj2.SetCellValue(intRows, "smryIbflag","R");
	}
	//HIDDEN VALUE 셋팅
	frm1.in_inv_amt.value=inv_amt;
	frm1.in_inv_vat_amt.value=vat_amt;
	frm1.in_inv_sum_amt.value=tot_amt;
	frm1.in_inv_krw_amt.value=tot_amt;
}
/**
 * Invoice 키값을 리턴함
 */
function getInvSeqKeys(){
	var curInvSeqs='';
	var invIdx=docObjects[1].LastRow() + 1;
	for(var i=1; i < invIdx; i++){
curInvSeqs+= docObjects[1].GetCellValue(i, 'inv_seq');
		curInvSeqs+= ',';
	}
	return curInvSeqs;
}
function sheet2_OnChange(sheetObj, row, col){
	/*
var curCd=sheetObj.GetCellValue(row, 'inv_curr_cd');
var invAmt=parseFloat(sheetObj.GetCellValue(row, 'inv_amt'));
var vatAmt=parseFloat(sheetObj.GetCellValue(row, 'inv_vat_amt'));
var sumAmt=parseFloat(sheetObj.GetCellValue(row, 'inv_sum_amt'));
	for(var i=1; i < docObjects[2].LastRow() + 1; i++){
if(curCd==docObjects[2].GetCellValue(i, 'inv_aply_curr_cd')){
if(sheetObj.GetCellValue(row, 'acc_ibflag')=='D'){
docObjects[2].SetCellValue(i, 'inv_ttl_amt',parseFloat(docObjects[2].GetCellValue(i, 'inv_ttl_amt'))-invAmt);
docObjects[2].SetCellValue(i, 'inv_ttl_vat_amt',parseFloat(docObjects[2].GetCellValue(i, 'inv_ttl_vat_amt'))-vatAmt);
docObjects[2].SetCellValue(i, 'inv_ttl_sum_amt',parseFloat(docObjects[2].GetCellValue(i, 'inv_ttl_sum_amt'))-sumAmt);
			}else{
docObjects[2].SetCellValue(i, 'inv_ttl_amt',parseFloat(docObjects[2].GetCellValue(i, 'inv_ttl_amt'))+invAmt);
docObjects[2].SetCellValue(i, 'inv_ttl_vat_amt',parseFloat(docObjects[2].GetCellValue(i, 'inv_ttl_vat_amt'))+vatAmt);
docObjects[2].SetCellValue(i, 'inv_ttl_sum_amt',parseFloat(docObjects[2].GetCellValue(i, 'inv_ttl_sum_amt'))+sumAmt);
			}
		}
	}
	*/
}
function checkPostDate(){
	var formObj=document.frm1;
	// 마감 POST DATE와  BL POST DATE 비교( BL의 POST_DT가 SLIP의 MAX(POST_DT)보다 작으면 안됨
	var bl_post=formObj.inv_dt.value;
	var slip_post=formObj.slip_post.value;
	if(bl_post != "" && slip_post != ""){
		bl_post=bl_post.replaceAll("-","");
		bl_post=bl_post.substring(4,8)+bl_post.substring(0,2)+bl_post.substring(2,4);
		slip_post=slip_post.substring(4,8)+slip_post.substring(0,2)+slip_post.substring(2,4);
		if(slip_post >= bl_post){
			//Invalid [Billing Date]
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_DATE') + "\n\n: ACC_INV_0080.921");
			formObj.inv_dt.value="";
			formObj.clt_due_dt.value="";
			formObj.inv_dt.select();
			return false;
		}
	}
}
function INV_POPLIST(rtnVal){
		var formObj=document.frm1;
		if (rtnVal==""||rtnVal=="undefined"||rtnVal==undefined){
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_inv_no.value=rtnValAry[0];//inv_no
	   		frm1.f_cmd.value=SEARCH;
    	frm1.submit();
	}
	}
