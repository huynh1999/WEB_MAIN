var strSeperator="-";
//var MSG_KEY = new Array();
/**
 * I18n 적용관련
 */
function getLabel(inKey){
    var clsCd=MSG_KEY[inKey];
    return clsCd;
}
function getLabel2(inKey, objArr){
    var clsCd=MSG_KEY[inKey];
    for(var i=0; i<objArr.length; i++){
        clsCd=clsCd.replace("@", objArr[i]);
    }
    return clsCd;
}
/**
 * To Upper Case
 */
function strToUpper(obj){
    obj.value=obj.value.toUpperCase();
    // TestArea일 경우 Tab을 Space로 치환한다.
    if ("textarea" == obj.type) {
    	obj.value=obj.value.replaceAll("\t"," ");
    }
}
function urlRemark(obj){
    var regex ="((http|https|HTTP|HTTPS)://)((www|WWW).)?[a-zA-Z0-9!@$:`^*[]()\|{}\"\':;<>%._\\-+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9!@$:`^*[]()\|{}\"\':;<>%._\\-+~#?&//=]*)",
     modified = obj.value.replace(/[^\s]+/g, function (match) {
	 return match.search(regex)  != -1 ? match : match.toUpperCase();
	});
	obj.value = modified;
	
}
/**
 * 공통 팝업창 GET으로 호출. 기본 스타일이 지정되어있음
 * @param : url     - 호출될 팝업 주소
 * @param : str     - 후출 팝업의 ID
 * @param : inWidth - 팝업 넓이
 * @param : inHeight- 팝업 높이
 * @return Open Window object
 */
function popGET(url, str, inWidth, inHeight)
{
    var height=screen.height;
    var width=screen.width;
    var leftpos=width/2 - inWidth/2;
    var toppos=height/2 - inHeight/2;
    if(leftpos<0) leftpos=0;
    if(toppos<0) toppos=0;
    if (url.indexOf('RPT_RD') >= 0) {
    	str=str + getTimeStamp();
    }
    //var popName = window.open('./blank.screen', str, "status=no,  width="+inWidth+", height="+inHeight+", resizable=no, scrollbars=no, left="+leftpos+", top="+toppos);
    /* 
    var popName=window.open('./blank.screen', str, "status=yes,  width="+inWidth+", height="+inHeight+", resizable=no, scrollbars=no, left="+leftpos+", top="+toppos);
    popName.location.href=url;
    */
    var popName=window.open(url, str, "status=yes,  width="+inWidth+", height="+inHeight+", resizable=no, scrollbars=no, left="+leftpos+", top="+toppos);
    popName.focus();
    return popName;
}
/**
 * 공통 팝업창 GET으로 호출. 스타일을 지정함.
 * @param : url     - 호출될 팝업 주소
 * @param : str     - 후출 팝업의 ID
 * @param : inWidth - 팝업 넓이
 * @param : inHeight- 팝업 높이
 * @param : inStyle - 팝업의 스타일
 * @return Open Window object
 */
function popGET(url, str, inWidth, inHeight, inStyle)
{
    var height=screen.height;
    var width=screen.width;
    var leftpos=width/2 - inWidth/2;
    var toppos=height/2 - inHeight/2;
    if(leftpos<0) leftpos=0;
    if(toppos<0) toppos=0;
    if (url.indexOf('RPT_RD') >= 0) {
    	str=str + getTimeStamp();
    }
    /*
    var popName=window.open('./blank.screen', str, "status=yes,  width="+inWidth+", height="+inHeight+","+inStyle+",left="+leftpos+", top="+toppos);
    popName.location.href=url;
    */
    var popName=window.open(url, str, "status=yes,  width="+inWidth+", height="+inHeight+","+inStyle+",left="+leftpos+", top="+toppos);
    popName.focus();
    return popName;
}
/**
 * 공통 팝업창 POST으로 호출. parameter로 지정된 항목은 본 메소드 호출전 등록이 되어야함. 기본 스타일이 지정되어있음.
 * @param : inForm  - 호출시 사용할 form instance
 * @param : url     - 호출될 팝업 주소
 * @param : str     - 후출 팝업의 ID
 * @param : inWidth - 팝업 넓이
 * @param : inHeight- 팝업 높이
 * @return Open Window object
 */
function popPOST(inForm, url, str, inWidth, inHeight)
{
	var height=screen.height;
    var width=screen.width;   
    var leftpos=0;
    var toppos=0;
	//#5664 [Webtrans] Popup size option complaint
	if(POPUP_FULL_SCREEN == "Y"){
		inHeight = screen.availHeight - 50;
		inWidth = screen.availWidth - 10;
		leftpos=(width/2) - ((inWidth/2) + 10);
	    toppos=(height/2) - ((inHeight/2) + 50);
	} else{
		leftpos=width/2 - inWidth/2;
		toppos=height/2 - inHeight/2;
	}
  
    if(leftpos<0) leftpos=0;
    if(toppos<0) toppos=0;
    if (url.indexOf('RPT_RD') >= 0) {
    	str=str + getTimeStamp();
    }
    var orgAction=inForm.action;
    /*
    var popName=window.open('./blank.screen', str, "status=no,  width="+inWidth+", height="+inHeight+", resizable=no, scrollbars=no, left="+leftpos+", top="+toppos);
    inForm.method='POST';
    inForm.action=url;
    */
    
    //#5064 A/N Print 시에 Error Log 확인 필요(v5.0 동일 처리 - RPT_RD_0010 두 번 호출되는 오류수정)
    //var popName=window.open(url, str, "status=no,  width="+inWidth+", height="+inHeight+", resizable=no, scrollbars=no, left="+leftpos+", top="+toppos);
    
    // #6686 [Airbridge/BNX/LMS] 특정 PC - RD Page Blank screen 에러
    var popName=window.open('', str, "status=no,  width="+inWidth+", height="+inHeight+", resizable=no, scrollbars=no, left="+leftpos+", top="+toppos);
    
    inForm.method='POST';
    inForm.action=url;
    inForm.target=str;
    inForm.submit();
    inForm.action=orgAction;
    inForm.target='_self';
    return popName;
    
}
/**
 * 공통 팝업창 POST으로 호출. parameter로 지정된 항목은 본 메소드 호출전 등록이 되어야함. 스타일을 지정함.
 * @param : inForm  - 호출시 사용할 form instance
 * @param : url     - 호출될 팝업 주소
 * @param : str     - 후출 팝업의 ID
 * @param : inWidth - 팝업 넓이
 * @param : inHeight- 팝업 높이
 * @param : inStyle - 팝업의 스타일
 * @return Open Window object
 */
function popPOST(inForm, url, str, inWidth, inHeight, inStyle)
{
	var height=0;
    var width=0;
    var leftpos=0;
    var toppos=0;
	//#5664 [Webtrans] Popup size option complaint
	if(POPUP_FULL_SCREEN == "Y"){
		height=screen.height;
	    width=screen.width;
		inHeight = screen.availHeight - 50;
		inWidth = screen.availWidth - 10;
		leftpos=(width/2) - ((inWidth/2) + 10);
	    toppos=(height/2) - ((inHeight/2) + 50);
	    if(leftpos<0) leftpos=0;
	    if(toppos<0) toppos=0;
	} else{
		height=screen.height - 80;
	    width=screen.width;
	    leftpos=width/2 - inWidth/2;
	    toppos=height/2 - inHeight/2;
	    if(leftpos<0) leftpos=0;
	    if(toppos<0) toppos=0;
	    leftpos=25;
	    toppos=25;
	}
    height -= 50;
    width -= 50;
    if (url.indexOf('RPT_RD') >= 0) {
    	str=str + getTimeStamp();
    }
    var orgAction=inForm.action;
//	var popName = window.open('./blank.screen', str, "status=no,  width="+inWidth+", height="+inHeight+","+inStyle+",left="+leftpos+", top="+toppos);
    /*
    var popName=window.open('./blank.screen', str, "resizable=yes, status=no,  width="+width+", height="+height+","+inStyle+",left="+leftpos+", top="+toppos);
    inForm.method='POST';
    inForm.action=url;
    */
    //#5064 A/N Print 시에 Error Log 확인 필요(v5.0 동일 처리 - RPT_RD_0010 두 번 호출되는 오류수정)
    //var popName=window.open(url, str, "resizable=yes, status=no,  width="+width+", height="+height+","+inStyle+",left="+leftpos+", top="+toppos);
	var popName = window.open('', str, "status=no,  width="+inWidth+", height="+inHeight+","+inStyle+",left="+leftpos+", top="+toppos);
	
    inForm.method='POST';
    inForm.action=url;
    inForm.target=str;
    inForm.submit();
    inForm.action=orgAction;
    inForm.target='_self';
    return popName;
}
/**
 * Ajax를 사용한 처리후 Return Value를 처리하기 위한 메소드임
 * @param regVal XML 메시지
 */
function getAjaxMsgXML(reqVal){
    var rtnArr;
    var doc;
    try{
         rtnArr=new Array(2);
         var root;
        // Mozilla and Netscape browsers
        if (document.implementation.createDocument) {
        	 var xmlDoc = ComGetXmlDoc(reqVal.responseText);
             if (xmlDoc == null) return;
             var xmlRoot = xmlDoc.documentElement;
             root=xmlRoot;
             var node = root.childNodes;
             var iNode = 0;
             for (i=0; i < node.length; i++) {
            	 if(node[i].attributes != null && node[i].textContent != ""){
            		 rtnArr[iNode++]=node[i].textContent;
            	 }
            }
        // MSIE
        } else if (window.ActiveXObject) {
            doc=new ActiveXObject("Microsoft.XMLDOM");
            doc.async="false";
            doc.loadXML(reqVal.responseText);
            root=doc.getElementsByTagName('ajaxRtn').item(0);
            //alert(reqVal.responseText);
            for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
                var node = root.childNodes.item(iNode);

                for (i = 0; i < node.childNodes.length; i++) {
                   var sibling = node.childNodes.item(i);
                   rtnArr[iNode] = sibling.data;
                }
             }
        }
        
    }catch (err) {
    	if(!!err.description) {
    		alert("Error is : "  + err.description + " <br>Error number is " + err.number);
    	}
    	else {
    		console.log("Session Check");
    	}
    }
    return rtnArr;
}
/**
 * Document의 Object를 return함
 */
function getBtnObj(objName){
	if(document.getElementById(objName) == null || document.getElementById(objName) == 'undefined' || document.getElementById(objName) == undefined){
		return document.getElementById("hiddenButton");
	}else{
		return document.getElementById(objName);
	}
}
function getObj(objName){
	return document.getElementById(objName);
}

/**
 * 입력받은 문자열에 해당하는 조건들을 비교하여 문자열을 변환함
 *
 * 문자열.replaceAll('>', '&alt;');  => 문자열에 포함된 '>'를 ' '&alt;'로변경
 *
 * @param searchStr 찾을 문자
 * @param replaceStr 변경할 문자
 */
String.prototype.replaceAll=function( searchStr, replaceStr ){
    var temp=this;
    while( temp.indexOf( searchStr ) != -1 ){
        temp=temp.replace( searchStr, replaceStr );
    }
    return temp;
}
/**
 * 현재 Window의 Center의 위치를 찾을 때 사용한다.
 */
function getCenterPosition(){
    var winCenter=new Array(2);
    //Explorer 6 Strict모드
    if(document.documentElement&&document.documentElement.clientHeight){
//		x = (screen.Width-document.documentElement.clientWidth)/2;
//		y = (screen.Height-document.documentElement.clientHeight)/2;
//        x = (coordinates.x-document.body.scrollLeft+window.screenLeft)/2;
//        y = (coordinates.y-document.body.scrollTop+window.screenTop)/2;
        winCenter[0]=document.body.clientWidth/2;
        winCenter[1]=document.body.clientHeight/2;
    //IE6이하
    }else if(document.body){
        winCenter[0]=document.body.clientWidth/2;
        winCenter[1]=document.body.clientHeight/2;
    }
    return winCenter;
}
function doShowProcess(){
    disFullProcess('WORKING', document);
}
function disFullProcess(objName, curDoc){
    var tmpName=objName+'_IMG';
    var dispObj=curDoc.getElementById(tmpName);
    /*
    dispObj.style.posLeft=3;
    dispObj.style.posTop=0;
    dispObj.style.posWidth += 5;
    */
    if (dispObj != null)
    	dispObj.style.display='block';
}
/**
 * 프로세스바 3초 표시
 * @param objName 표시할 Progress Bar ID
 * @param curDoc Process Bar가 선언되어 있는 해당 Document의 Instance
 */
function showCompleteProcess(){
	 var objName='COMPLETE';
	 var curDoc=document;
	 var tmpName=objName+'_IMG';
	 var dispObj=curDoc.getElementById(tmpName);
	 dispObj.style.display='block';
     setTimeout(function(){
    	   hideProcess(objName, curDoc);
    	   
    	   if(saveCloseBtnYn == "Y"){
    		   var prTab = parent.window[_MTAB];
    		   //#5878 [BNX-JAPAN] BNX C/S 요구사항
    		   for(var i = 0; i < prTab.aTabItemList.length; i++){
    			   if(prTab.aTabItemList[i].uid == saveCloseUid){
    				   prTab.DeleteItem(i, true);
    				   break;
    			   }
    		   }
    		   //prTab.DeleteItem(prTab.GetSelectedIndex(), true);
    	       //  window.close(); 
    	   }
    	}, 1000);
}
/**
 * 프로세스바 표시
 * @param objName 표시할 Progress Bar ID
 * @param curDoc Process Bar가 선언되어 있는 해당 Document의 Instance
 */
function showProcess(objName, curDoc){
    var tmpName=objName+'_IMG';
    var dispObj=curDoc.getElementById(tmpName);
    var barPosition=getCenterPosition();
    dispObj.style.posLeft=parseInt(barPosition[0])-180;
    dispObj.style.posTop=parseInt(barPosition[1])-180;
    dispObj.style.display='block';
}
function doHideProcess(){
    hideProcess('WORKING', document);
}
/**
 * 프로세스바 숨기기
 * @param objName 표시할 Progress Bar ID
 * @param curDoc Process Bar가 선언되어 있는 해당 Document의 Instance
 */
function hideProcess(objName, curDoc){
    var tmpName=objName+'_IMG';
    var dispObj=curDoc.getElementById(tmpName);
    if(dispObj!=null&&typeof(dispObj)!='undefined'){
        dispObj.style.display='none';
    }
}
/**
 *Input type=text의 입력값의 길이를 비교한다.
 *@param docObj 체크할 document Instance
 *@param objStr 체크할 항목들의 String 구문. 항목의 구분의 Semicolon(;)으로
 *       예) kck;kdke;
 *@return Array를 리턴함. Array[0]: Maxlength를 초과한 항목의 name.  항목의 구분의 Semicolon(;)으로
 *        Array[1]: 입력값이 없는 항목의 name.  항목의 구분의 Semicolon(;)으로
 *        Array[2]: Maxlength보다 길이가 긴 값이 들어간 항목들. 항목의 구분의 Semicolon(;)으로
 *        Array[3]: 처리중 오류난 항목들. 항목의 구분의 Semicolon(;)으로
 **/
function checkLen(docObj, objStr){
     var objArr=objStr.split(';');
     var totLen=objArr.length-1;
     var rtnObjs=new Array(2);
     var overObj='';    //MaxLength를 초과하는 객체이름
     var zeroObj='';    //입력값이 없는 객체이름
     var errorObj='';    //검증실패한 객체이름
     for(var i=0; i< totLen; i++){
         var tmpObj=docObj.getElementsByName(objArr[i])
         if(tmpObj.length>0){
             for(var j=0; j < tmpObj.length; j++){
                 if(typeof(tmpObj[j])!='undefined'){
                     //입력값이 없는경우
                     if(tmpObj[j].value.length==0){
                         zeroObj+= tmpObj[j].name+';';
                     }else if(tmpObj[j].value.length>tmpObj[j].maxLength){
                         overObj+= tmpObj[j].name+';';
                     }
                 }
             }
        }else{
             errorObj+= objArr[i]+';';
        }
     }
     rtnObjs[0]=zeroObj;
     rtnObjs[1]=overObj;
     rtnObjs[2]=errorObj;
     return rtnObjs;
}
function getShowErrMsg(errObj){
    if(typeof(errObj.title)!='undefined'){
        return 'Error! At'+errObj.title+'. Please check your input value!', 'Error!Please check your input value';
    }else{
        return 'Error!Please check your input value';
    }
}
/**
 * 주어진 파일명(URL)이 승인 받은 형식의 파일인지를 확인할 때 사용함
 * @param curUrl 확인해야할 파일명(URL)
 * @param apprDocExt 업로드 가능한 파일 확장자 형식
 * @return true: 승인된 형식의 확장자인 경우, false: 승인 받지 않은 확장자인 경우
 */
function checkFileExt(curUrl, apprDocExt){
    var isOk=false;
    if(curUrl!=''){
        var curExt='';
        for(var i=curUrl.length-1; i >0; i-- ){
            if(curUrl.charAt(i)=='.'){
                curExt=curUrl.substring(i+1);
                curExt=curExt.toLowerCase();
                break;
            }
        }
        var tmpExt=apprDocExt.split('.');
        for(var i=0; i<tmpExt.length; i++){
            if(tmpExt[i]==curExt){
                isOk=true;
                break;
            }
        }
    }else{
        isOk=true;
    }
    return isOk;
}
function getFileNameLength(curUrl){
    var fileLen=0;
    if(curUrl!=''){
        var dirStr='/';
        if(curUrl.indexOf('\\')!=-1){
            dirStr='\\';
        }
        for(var i=curUrl.length-1; i >0; i-- ){
            if(curUrl.charAt(i)==dirStr){
                break;
            }
            fileLen++;
        }
    }
    return fileLen;
}
/**
 * 문자로된 금액 포맷하기
 * @author Kang,Jung-Gu
 */
function doMoneyFmt(orgStrVal){
    orgStrVal+= '';
    var isMin=false;
    var idxLen=orgStrVal.substring(0, 1);
    if(idxLen=='-'){
        orgStrVal=orgStrVal.substring(1);
        isMin=true;
    }
    var len=0;
    var inStrVal=orgStrVal.replace(/,/g, '');
    var dotIdx=inStrVal.indexOf('.');
    var dotStr='';
    if(dotIdx>0){
        dotStr=inStrVal.substr(dotIdx);
        inStrVal=inStrVal.substring(0, dotIdx);
    }
    len=inStrVal.length;
    var str1='';
    if(len>3){
        var toLen=len-i-3;
        for(var i=0; len-i-3 > 0; i+=3){
            var tmpVal=inStrVal.substring(len-3-i, len-i);
            str1=','+tmpVal+str1;
        }
        str1=inStrVal.substring(0, len-i)+str1;
        str1=str1+dotStr;
    }else{
        str1=orgStrVal;
    }
    if(idxLen=='-'){
        str1=idxLen+str1;
    }
    return str1;
}

function doMoneyFmt2(orgStrVal, pointCount){

	var str = '';
	var tmpStrVal = doMoneyFmt(orgStrVal);
	if(pointCount > 0) {
		if(tmpStrVal.indexOf('.') > 0) {
			var arrStrVal = tmpStrVal.split('.');
			if(arrStrVal[1].length < pointCount) {
				for(var i=pointCount - arrStrVal[1].length; i<pointCount; i++) {
					arrStrVal[1] += '0';
				}
			}
			str = arrStrVal[0] + '.' + arrStrVal[1];
		} else {
			tmpStrVal += '.';
			for(var i=0; i<pointCount; i++) {
				tmpStrVal += '0';
			}
			str = tmpStrVal;
		}
	} else {
		str = tmpStrVal;
	}

	return str;
}

function rmMoneyFmt(formattedVal){
	formattedVal += "";
    if(formattedVal==''){
        return '0';
    }else{
        return formattedVal.replace(/,/g, '');
    }
}
//-----------------------------------입력값 확인-----------------------------------
/**
 * <select>가 선택되었는지를 확인할 때 사용하는 함수임.
 * 예)   checkSelectVal('', '날자');
 *@param inStr 확인한 Value
 *@msgStr 오류시 표시할 항목명
 *@return O:성공, S: 선택된 항목이 없음
 **/
function checkSelectVal(inStr, msgStr){
    var inStr=inStr.replaceAll(' ', '');
    if(inStr.length==0){       //최소값 비교
        alert(' \"'+msgStr+'\" '+CM_MSG2);
        return 'S';
    }else{
        return 'O';
    }
}
function getStringLength (str){
 var retCode=0;
 var strLength=0;
 for (i=0; i < str.length; i++)
 {
  var code=str.charCodeAt(i)
  var ch=str.substr(i,1).toUpperCase()
  code=parseInt(code)
  if ((ch < "0" || ch > "9") && (ch < "A" || ch > "Z") && ((code > 255) || (code < 0)))
   strLength=strLength + 2;
  else
   strLength=strLength + 1;
 }
 return strLength;
}
/** [전면 재점검. Data Type/Validation/Message] - S.Y BAIK (2013.01.31)
 * 입력값의 최소,최대 값 및 형식을 확인 합니다.
 * 예)   checkInputVal('2008-02', 7, 7, 'd', '날자');
 *       checkInputVal('333.33.02', 1, 10, 'M', '계약금');
 *       checkInputVal('333.33.02', 1, 10, 'N', '세액');
 *@param inStr 확인한 Value
 *@minLen 최소 길이.
 *@maxLen 최대 길이. 양식이 포함된 경우 포함된 양식도 포함. 2008-09-11 -> 10
 *@inType 입력받은 값의 타입. T: Text, D: yyyyMMdd 일자, d: yyyyMM 일자, N: Number, M: 금액
 *@msgStr 오류시 표시할 항목명
 *@return O:성공, S: 최소길이 미달, M: 최대값 초과, T: 입력타입 불일치(Number인데 문자가 들어간 경우)
 **/
function checkInputVal(inStr, minLen, maxLen, inType, msgStr){
    var inLen=0;
    var isChar=true;
    //NUMBER & AMOUNT Minus인경우 처리
    inStr=trim(inStr+"");	//String 변환
    if(inType=='N'||inType=='M'){
        if(inStr!=''){
            inStr=rmMoneyFmt(inStr);
            var dotIdx=inStr.indexOf('.');
            if(dotIdx>0){
                inStr=inStr.substring(0, dotIdx);
            }
            inLen=inStr.length;
            if(inLen>1){
                if(inStr.charAt(0)=='-'){
                    inLen--;
                    inStr=inStr.substr(1);
                }
            }
            isChar=false; 
        }
    }
    else{
        inLen=getStringLength(inStr);        
    }
    if(inLen<minLen){ //최소값 비교    	
        //alert(CM_MSG1_1+msgStr+CM_MSG1_2+minLen+CM_MSG1_3);    	
    	var paramArr=new Array(1);
    	paramArr[0]=minLen;
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + msgStr + getLabel2('FMS_COM_ALT077', paramArr));
        return 'S';
    }else if(inLen>maxLen){ //최대값 비교
        var krAmt=maxLen/2;
        if(isChar){
            //alert(CM_MSG1_1+msgStr+CM_MSG1_4+maxLen+' Alphabet Characters or '+krAmt+' Korean Characters'+CM_MSG1_5);
        	//msgStr은 getlabel()을 통해 전달된 Label명 
        	var paramArr=new Array(1);
        	paramArr[0]=maxLen;
        	alert(getLabel('FMS_COM_ALT007') + "\n - " + msgStr + getLabel2('FMS_COM_ALT030', paramArr));
        }else{
            //alert(CM_MSG1_1+msgStr+CM_MSG1_4+maxLen+CM_MSG1_5);
        	alert(getLabel('FMS_COM_ALT007') + "\n - " + msgStr);
        }
        return 'M';
    }
    else if(!checkInType(inStr, inType)){  //타입비교
        //alert(CM_MSG1_1+msgStr+CM_MSG1_6);
    	alert(getLabel('FMS_COM_ALT007') + "\n - " + msgStr);
        return 'T';
    }
    else{
        return 'O';
    }
}
function checkInType(inStr, inType){
    var checkResult=false;
    if(inType=='T'){    //Text
        checkResult=true;
    }else if(inType=='D'){  //날자 yyyyMMdd
        if(inDateValid(inStr, 'MMddyyyy')){
            checkResult=true;
        }
    }else if(inType=='d'){  //날자 yyyyMM
        if(inDateValid(inStr, 'yyyyMM')){
            checkResult=true;
        }
    }else if(inType=='N'){  //Number
        if(inNumValid(inStr)){
            checkResult=true;
        }
    }else if(inType=='M'){  //Money
        if(inNumValid(inStr)){
            checkResult=true;
        }
    }else if(inType=='DD'){  //날자 yyyyMMdd
        if(inDateValid(inStr, 'MMddyyyy')){
            checkResult=true;
        }
    }
    return checkResult;
}
/**
 * 입력받은 정보가 Number만 있는지 확인한다.
 */
function inNumValid(inStr){
    var tmpStr=inStr.replaceAll(',', '');
    var isDot=false;
    var isOk=true;
    var cmpStr='1234567890';
    var strLen=tmpStr.length;
    if(strLen<1){
        isOk=false;
    }
    else{
        for(var i=0; i < strLen; i++){
            var tmpVal=tmpStr.charAt(i);
            if(tmpVal=='.'){
                if(isDot){
                    isOk=false;
                    break;
                }
                else{
                    isDot=true;
                }
            }
            else{
                var strIdx=cmpStr.indexOf(tmpVal);
                if(strIdx==-1){
                    isOk=false;
                    break;
                }
            }
        }
    }
    return isOk;
}
/**
 * 입력받은 날자 데이터가 맞는지 확인함
 **/
function inDateValid(inStr, dateTp){
    var tmpStr=inStr.replaceAll(strSeperator, '');
    var isOk=true;
    //문자인지 숫자인지 비교
    if(inNumValid(tmpStr)){
        var tmpLen=tmpStr.length;
        if(dateTp=='yyyyMMdd'){
            if(tmpStr.substr(0, 1)=='0'){
                isOk=false;
            }else{
                var tmpDate=tmpStr.substr(4, 2);
                var intMonth=parseInt(tmpDate, 10);
                //월확인
                if(intMonth>0&&intMonth<13){
                    isOk=true;
                    //일확인
                    tmpDate=tmpStr.substr(6, 2);
                    var intDay=parseInt(tmpDate, 10);
                    if(intDay>0&&intDay<31){
                        isOk=true;
                        if(intMonth==2){
                            if(intDay>=30){
                                isOk=false;
                            }
                        }
                    }
                }
            }
        }else if(dateTp=='yyyyMM'){
            if(tmpStr.substr(0, 1)=='0'){
                isOk=false;
            }else{
                var tmpDate=tmpStr.substr(4, 2);
                var intMonth=parseInt(tmpDate, 10);
                //월확인
                if(intMonth>0&&intMonth<13){
                    isOk=true;
                }
            }
        }else if(dateTp=='MMddyyyy'){
        	// MM및 dd 추출 잘못되어있어서 수정
        	/*
            var tmpDate = tmpStr.substr(2, 4);
            var intMonth= parseInt(0, 2);
            */
            var tmpDate = tmpStr.substr(2, 2);
            var intMonth= parseInt(tmpStr.substr(0, 2));
            
            //월확인
            if(intMonth>0&&intMonth<13){
                isOk=true;
                //일확인
                tmpDate=tmpStr.substr(2, 4);
                var intDay=parseInt(tmpDate, 10);
                if(intDay>0&&intDay<31){
                    isOk=true;
                    if(intMonth==2){
                        if(intDay>=30){
                            isOk=false;
                        }
                    }
                }
            }
        }else{
            isOk=false;
        }
    //문자가 포함된 경우
    }else{
        isOk=false;
    }
    return isOk;
}
/**
 * <select> Object에 년도 Options를 더하는 메소드임. 기본 현재해에서 2년을 더하고 전체 10년까지의 년도를 포함한
 * Select Object를 리턴함.
 */
function getYearSelectList(yearSelectObj){
    mkYearSelect(yearSelectObj, 2, 10, true, '');
}
/**
 * <select> Object에 년도 Options를 더하는 메소드임
 */
function mkYearSelect(yearSelectObj, addYear, loopCnt, isDecend, callYear){
    var curYear=todayYear();
    if(callYear.length==4){
        curYear=parseInt(callYear);
    }
    //생성일
    var fromYear=curYear+addYear;
    //유저 브라우저상의 년도를 선택함
    var yearVals=yearSelectObj;
    if(isDecend){
        for(var i=0; i < loopCnt; i++){
            var tmpOpt=new Option(fromYear, fromYear);
            if(curYear==fromYear){
                tmpOpt.selected=true;
            }
            yearVals.add(tmpOpt);
            fromYear--;
        }
    }
}
//-----------------------------------------------------------------------
//                         Auto Search 관련 Method
//-----------------------------------------------------------------------
var autoCurRow;
var autoCurCol;
var autoToCol;
var curEventSheet;
var autoCodeTp;
/**
 * Code조회를 시작함
 * @param sheetObj 이벤트가 일어난 Sheet
 * @param row 이벤트가 일어난 row
 * @param col 이벤트가 일어난 col
 * @param codeTp 조회시 사용할 코드타입
 * @param codeStr 해당 코드값
 * @param curCellNm 현재 Cell의 SaveName
 * @param toCellNm  표시할 Cell의 SaveName
 */
function doAutoSearch(sheetObj, row, col, codeTp, codeStr, curCellNm, toCellNm, param){
    //선택된 Sheet를 Set함
    curEventSheet=sheetObj;
    autoCurRow=row;
    autoCurCol=col;
    autoCodeTp = codeTp;
    autoToCol=toCellNm;
    sheetObj.SetCellValue(row, curCellNm,codeStr.toUpperCase(),0);
    if(typeof(param) == "undefined"){
        param="";
    }
    //#3112 [IMPEX, STAR CLUSTER, BNX] #1968, 1600, 2657 포함 요청
ajaxSendPost(setRtnValToCell, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+codeTp+'&s_code='+escape(sheetObj.GetCellValue(row, curCellNm)) + param, './GateServlet.gsl');
}
/**
 * Code Return 값을 Cell에 담는다
 */
function setRtnValToCell(rtnMsg){
    var doc=getAjaxMsgXML(rtnMsg);
    if(doc[0]=='OK'){
        if(typeof(doc[1])=='undefined'){
            //curEventSheet.SelectCell(autoCurRow, autoCurCol);
            curEventSheet.SetCellValue(autoCurRow, autoCurCol,'',0);
            curEventSheet.SetCellValue(autoCurRow, autoToCol,'',0);
            alert(CODE_NOT_FND);
        }else{
            var rtnArr=doc[1].split('@@;');
            var masterVals=rtnArr[0].split('@@^');
            curEventSheet.SetCellValue(autoCurRow, autoToCol, masterVals[3], 0);
            //(2017/06/08 1차)  릴리스 테스트 내역 - 미진 사항 
            if(autoCodeTp == "freight"){
            	var objPfx = autoToCol.replaceAll("fr_frt_cd_nm", "");
            	curEventSheet.SetCellValue(autoCurRow, objPfx + "fr_vat_rt",masterVals[24],0);	//Tax Rate
            	//#1773 [PATENT] Freight Default Unit Option
            	if (masterVals[30]!= ""&& masterVals[30]!= "null"){
            	curEventSheet.SetCellValue(autoCurRow, objPfx + "fr_aply_ut_cd",masterVals[30]);	//Unit
            	}
            	//#1774 [Split - 1] [PATENT] Freight Default Unit Option
               	curEventSheet.SetCellValue(autoCurRow, objPfx + "fr_ru",masterVals[33]);	//sell_buy_rate
            	//#1824 [Split - 1] [PATENT]Freight Local Name 적용(AR, AP)
            	if (objPfx!="dc_"){
            		curEventSheet.SetCellValue(autoCurRow, objPfx + "fr_frt_cd_nm",masterVals[16]);	//local name
            	}
            	
            }else if(autoCodeTp == "trdpcode"){
            	var objPfx = autoToCol.replaceAll("fr_trdp_nm", "");
            	if (objPfx !=	"dc_"){
            		curEventSheet.SetCellValue(autoCurRow, objPfx + "fr_trdp_nm",masterVals[16]);	//local name
            	}
            }
        }
    }else{
        alert(AJ_FND_ERR);
    }
}
//--------------------------------------------
var units=new Array("ONE","TWO","THREE","FOUR","FIVE","SIX","SEVEN","EIGHT","NINE");
var teens=new Array("TEN","ELEVEN","TWELVE","THIRTEEN","FOURTEEN","FIFTEEN","SIXTEEN","SEVENTEEN","EIGHTEEN ","NINETEEN");
var tens=new Array("TWENTY","THIRTY","FORTY","FIFTY","SIXTY","SEVENTY","EIGHTY","NINETY");
var illions=new Array('M','B','TR','QUADR','QUINT','SEXT','SEPT','OCT','NON','DEC','UNDEC','DUODEC','TREDEC','QUATTUORDEC','QUINDEC','SEXDEC','SEPTENDEC','OCTODEC','NOVEMDEC','VIGINT','UNVIGINT','DUOVIGINT','TREVIGINT','QUATTUORVIGINT','QUINVIGINT','SEXVIGINT','SEPTENVIGINT','OCTOVIGINT','NOVEMVIGINT','TRIGINT','UNTRIGINT','DUOTRIGINT','TRETRIGINT','QUATTUORTRIGINT','QUINTRIGINT','SEXTRIGINT','SEPTENTRIGINT','OCTOTRIGINT','NOVEMTRIGINT','QUADRAGINT','UNQUADRAGINT','DUOQUADRAGINT','TREQUADRAGINT','QUATTUORQUADRAGINT','QUINQUADRAGINT','SEXQUADRAGINT','SEPTENQUADRAGINT','OCTOQUADRAGINT','NOVEMQUADRAGINT','QUINQUAGINT','UNQUINQUAGINT','DUOQUINQUAGINT','TREQUINQUAGINT','QUATTUORQUINQUAGINT','QUINQUINQUAGINT','SEXQUINQUAGINT','SEPTENQUINQUAGINT','OCTOQUINQUAGINT','NOVEMQUINQUAGINT','SEXAGINT','UNSEXAGINT','DUOSEXAGINT','TRESEXAGINT','QUATTUORSEXAGINT','QUINSEXAGINT','SEXSEXAGINT','SEPTSEXAGINT','OCTOSEXAGINT','NOVEMSEXAGINT','SEPTUAGINT','UNSEPTUAGINT','DUOSEPTUAGINT','TRESEPTUAGINT','QUATTUORSEPTUAGINT','QUINSEPTUAGINT','SEXSEPTUAGINT','SEPTSEPTUAGINT','OCTOSEPTUAGINT','NOVEMSEPTUAGINT','OCTOGINT','UNOCTOGINT','DUOOCTOGINT','TREOCTOGINT','QUATTUOROCTOGINT','QUINOCTOGINT','SEXOCTOGINT','SEPTOCTOGINT','OCTOOCTOGINT','NOVEMOCTOGINT','NONAGINT','UNNONAGINT','DUONONAGINT','TRENONAGINT','DUATTUORNONAGINT','QUINNONAGINT','SEXNONAGINT','SEPTNONAGINT','OCTONONAGINT','NOVEMNONAGINT','CENT','CENUNT','DUOCENT','CENTRET');
/**
 * 숫자를 영문 문자로
 */
function changeNumTostr(s){
  if (s.length>315) {
//    alert("Your number is "+s.length+" digits long.\nThe maximum length is 303  digits.");
    alert(BIZ_MSG1_1+s.length+BIZ_MSG1_2);
    return false;
  }
  var r="", temp="";
  while(s.length%3>0)s="0"+s;
  var max=Math.ceil(s.length/3);
  for (var i=0; i<max; i++) {
    temp=toChgSmallNum(s.substr(i*3, 3));
    if (temp!="") {
      if (max-i==1 && r!="" && s.substr(i*3, 3)<100) r+=" AND ";
      else if (r!="") r+=", ";
      if (max-i==2) temp+=" THOUSAND";
      if (max-i>2) temp+=" "+illions[max-i-3]+"ILLION";
    }
    r+=temp;
  }
  if(s==0){
      r="zero";
  }
  r=r.charAt(0).toUpperCase()+r.substring(1,r.length);
  return r;
}
function toChgSmallNum(num, mag){
  var a=num.charAt(0);
  var b=num.charAt(1);
  var c=num.charAt(2);
  var s="";
  if (a!=0) {
    s+=units[a-1] + " HUNDRED";
    if (b==0 && c==0) return s;
    else s+=" and ";
  }
  if (b==0) {
    if (c==0) return "";
    return s+units[c-1];
  }
  if (b==1) {
    return s+teens[c];
  }
  if (b>1) {
    s+=tens[b-2];
    if (c>0) s+="-" + units[c-1];
    return s;
  }
}
/**
 * HTML태그(Object)의 onKeyPress 이벤트에서 이 함수를 호출할수 있으며, 키보드로 입력되는 값을 숫자만으로 제어한다. <br>
 * 예를 들어 다음과 같이 사용한다.<br>
 *     &lt;input type="text" name="txtAmt" <font color="red">onKeyPress="onlyNumberCheck()"</font>&gt; <br>
 * 인자로 사용되는 sSubChar 인자는 숫자이외에 부가적으로 입력할수 있는 문자를 여러개 연결하여 설정한다.<br>
 * <font color="red">주의!</font> style="ime-mode:disabled"은 반드시 설정해야 기능이 정확히 처리된다. <br>
 * <br><b>Example :</b>
 * <pre>
 *     &lt;input type="text" name="txtAmt" onKeyPress="onlyNumberCheck()"&gt;
 *     &lt;input type="text" name="txtAmt" onKeyPress="onlyNumberCheck('-')"&gt;
 *     &lt;input type="text" name="txtAmt" onKeyPress="onlyNumberCheck('-.,')"&gt;
 * </pre>
 * @param {string} sSubChar 선택,숫자이외의 부가 글자
 * @returns 없음 <br>
 */
function onlyNumberCheck(sSubChar) {
    var keyValue=ComGetEvent("keycode") ? ComGetEvent("keycode") : event.which ? event.which : event.charCode;
    if((keyValue >= 48 && keyValue <= 57) || keyValue == 8 || keyValue == 9 || keyValue == 46) {//숫자
        event.returnValue=true;
    } else if(sSubChar != undefined && sSubChar != null && sSubChar.constructor==String && sSubChar.length > 0) {
    	//SubChar가 여러개 설정된 경우 여러개 글자 모두 처리한다.
    	for(var i=0; i<sSubChar.length; i++) {
     		if (keyValue == sSubChar.charCodeAt(i)) {
                event.returnValue=true;
                return;
    		}
    	}
        event.returnValue=false;
    } else {
        event.returnValue=false;
    }
}
/**
 * OnKeyPress시 TEXTAREA에 대한 MaxLength기능
 */
function keyPress_maxLength(obj) {
    if (obj.value.length > obj.maxLength - 1 || ComGetLenByByte(obj.value) > obj.maxLength - 1) {
        event.returnValue=false;
    } else {
        event.returnValue=true;
    }
}
/**
 * OnKeyUp시 TEXTAREA에 대한 MaxLength기능
 */
function keyUp_maxLength(obj) {
    if (obj.value.length > obj.maxLength) {
        obj.value=obj.value.substring(0, obj.maxLength);
    } else{
    	ComBizChkLen(obj, obj.maxLength);
    }
}
/**
 * OnKeyPress시 TEXTAREA에 대한 MaxLength기능
 */
function keyPress_maxLength2(obj, len) {
    if (obj.value.length > len - 1 || ComGetLenByByte(obj.value) > len - 1) {
        event.returnValue=false;
    } else {
        event.returnValue=true;
    }
}
/**
 * OnKeyUp시 TEXTAREA에 대한 MaxLength기능
 */
function keyUp_maxLength2(obj, len) {
    if (obj.value.length > len) {
        obj.value=obj.value.substring(0, len);
    } else{
    	ComBizChkLen(obj, len);
    }
}
//#1276 [Purchase Order Entry] Show error message and save unsuccessfully
/**
 * ComBizChkLen
 * Check lenght special character
 */
function ComBizChkLen(obj, len) {
	var byteLength = 0;
    for (var inx = 0; inx < obj.value.length; inx++) {
        var oneChar = escape(obj.value.charAt(inx));
        if      ( oneChar.length == 1 )         { byteLength ++;  }
        else if (oneChar.indexOf("%u") != -1)   { byteLength += 3;} //utf-8 기준으로 한글은 3Byte 처리함
        else if (oneChar.indexOf("%0A") != -1)    { byteLength += 2; } //Enter
        else if (oneChar.indexOf("%") != -1)    { byteLength += oneChar.length/3; }        
        if(byteLength > len){
        	obj.value=obj.value.substring(0, inx);
        	return;
        }       
    } 
}
/**
 * 11자리(10자리는 넘버 11번째는 CheckDigit(숫자)
 *    - Sample Value: RDMU2128271
 *    - Sample Value: OOLU7086955
 * Container Number Check
 */
/*
function cntrNumCheck(strCntrNo){
    var cntrLen=strCntrNo.length;
    if(cntrLen!=11){
        alert('This is wrong Container Number!\nPlease check the Contaienr Number!');
        return false;
    }else{
        //고객 요청으로 Disable
        //return true;
        if(true){
            var orgCntrNo=strCntrNo.substring(0, 10);
            var digitNum=strCntrNo.substring(10);
            var addNumStr="A10*B12*C13*D14*E15*F16*G17*H18*I19*J20*K21*L23*M24*N25*O26*P27*Q28*R29*S30*T31*U32*V34*W35*X36*Y37*Z38";
            var alphaNumeric=new Array (10);
            for(var i=0; i <= 3; i++){
                var charVal=orgCntrNo.charAt(i);
                var charIdx=addNumStr.indexOf(charVal);
                alphaNumeric[i]=addNumStr.substring(charIdx+1, charIdx+3);
            }
            for(var i=4; i < 10; i++){
                alphaNumeric[i]=orgCntrNo.charAt(i);
            }
            var calcNum=0;
            for(var i=0; i < 10; i++){
                var strCheckNum=alphaNumeric[i] * Math.pow(2,i);
                calcNum=calcNum + strCheckNum;
            }
            if (calcNum){
                 var val1=calcNum / 11;
                 var val2=Math.floor(val1);
                 var tmpSum=val1 - val2;
                 var secuNum=Math.round(tmpSum*11);
                 if(secuNum!=digitNum){
                    alert('This is wrong Container Number!\nPlease check the Contaienr Number!');
                    return false;
                 }else{
                    return true;
                 }
            }else{
                alert('This is wrong Container Number!\nPlease check the Contaienr Number!');
                return false;
            }
        }
    }
}
*/
/*
 *  2011.12.28
 * 위의 식과 같은 내용인데 계산을 modulo 연산으로 간단히 수행함
 */
function cntrNumCheck(strCntrNo){
//	var alertMsgEn = 'Wrong Number!\nPlease check the Contaienr Number!';
    var alertMsgEn=BIZ_MSG2;
    var cntrLen=strCntrNo.length;
    if(cntrLen!=11){
        alert(alertMsgEn);
        return false;
    }else{
        var cntrNo=strCntrNo.substr(0,10);
        var chkDgt;
        var cntr;
        var i=0;
        var temp=0;
        var total=0;
        while(i < 10){
            cntr=cntrNo.substr(i,1);
            if(cntr.charCodeAt(0) >= "A".charCodeAt(0) && cntr.charCodeAt(0) <= "Z".charCodeAt(0)){
                temp=cntr.charCodeAt(0) - 55;
                if(cntr.charCodeAt(0) >= "B".charCodeAt(0) && cntr.charCodeAt(0) <= "K".charCodeAt(0)){
                    temp=temp + 1;
                }else if(cntr.charCodeAt(0) >= "L".charCodeAt(0) && cntr.charCodeAt(0) <= "U".charCodeAt(0)){
                    temp=temp + 2;
                }else if(cntr.charCodeAt(0) >= "V".charCodeAt(0) && cntr.charCodeAt(0) <= "Z".charCodeAt(0)){
                    temp=temp + 3;
                }
            }else{
                temp=cntr.charCodeAt(0) - 48;
            }
            total=total + Math.pow(2, i) * temp;
            i++;
        }
        total=total % 11;
        if(total >= 10){
            total=total - 10;
        }
        chkDgt=cntrNo + total;
        if(strCntrNo != chkDgt){
            alert(alertMsgEn);
            return false;
        }else{
            return true;
        }
    }
}
/**
 * 주소체크
 */
function checkAddr(obj, cntPerLn, perRow, msgTxt){
    var inAddrTxt=obj.value;
    var addrArr=(inAddrTxt.replace(/\r(?!\n)|\n(?!\r)/g, "\r\n")).split('\r\n'); //cross browser inAddrTxt.split('\r\n');
    var arrLen=addrArr.length;
    if(arrLen>perRow){
//		alert('Please input ['+msgTxt+'] in '+perRow+' rows!\nCurrent line count is '+arrLen);
        alert(BIZ_MSG3_1+msgTxt+BIZ_MSG3_1+perRow+BIZ_MSG3_1+arrLen);
    }else{
        var lineCnt=1;
        for(var i=0; i < arrLen; i++){
            if(cntPerLn<addrArr[i].length){
//				alert('Please input ['+msgTxt+'] in '+cntPerLn+' words per line!\nCheck line '+lineCnt+'. Current character count is '+addrArr[i].length);
                alert(BIZ_MSG4_1+msgTxt+BIZ_MSG4_2+cntPerLn+BIZ_MSG4_3+lineCnt+BIZ_MSG4_4+addrArr[i].length);
                break;
            }
        }
    }
}
/**
* Description 입력시 스크롤시 캐릭터 카운터를 체크
* @Object Textarea Object
* @len    하나의 Line에 입력될 수 있는 글자의 수
*/
function mkDescChk(obj, len, perMsg){
    if(obj.scrollWidth>0){
        mkDescChck(obj, len, 1000, perMsg);
    }
}
/**
* Description 입력시 스크롤시 캐릭터 카운터를 체크
* @Object Textarea Object
* @len    하나의 Line에 입력될 수 있는 글자의 수
*/
function mkChck(obj, len){
    if(obj.scrollWidth>0){
        mkDescChck(obj, len, 1000, 'Mark');
    }
}
/**
* Description 입력시 스크롤시 캐릭터 카운터를 체크
* @Object Textarea Object
* @len    하나의 Line에 입력될 수 있는 글자의 수
*/
function descChk(obj, len){
    if(obj.scrollWidth>0){
        mkDescChck(obj, len, 1000, 'Description');
    }
}
/**
 * Textarea의 Line별 글자수와 Row의 수를 체크함
 * @Object Textarea Object
 * @cntPerLn 하나의 Line에 입력될 수 있는 글자의 수
 * @perRow 입력받을 수 있는 Row의 수
 * @msgTxt 조건을 위배했을 때 Alter Msg
 */
function mkDescChck(obj, cntPerLn, perRow, msgTxt){
    var inAddrTxt=obj.value;
    var splStr='\r\n';
    var addrArr= (inAddrTxt.replace(/\r(?!\n)|\n(?!\r)/g, "\r\n")).split(splStr); //cross browser - inAddrTxt.split(splStr);
    var arrLen=addrArr.length;
    var isOk=false;
    var rtnMsg='';
    if(arrLen>perRow){
        alert('Please input ['+msgTxt+'] in '+perRow+' rows!\nCurrent line count is '+arrLen);
    }else{
        var isOver=false;
        var lineCnt=1;
        for(var i=0; i < arrLen; i++){
            if(i>0){
                rtnMsg+=splStr;
            }
            if(cntPerLn<addrArr[i].length){
                rtnMsg+=addrArr[i].substring(0, cntPerLn);
                isOver=true;
            }else{
                rtnMsg+=addrArr[i];
            }
        }
        if(isOver){
            alert('Please input ['+msgTxt+'] in '+cntPerLn+' character per line!');
        }
    }
    obj.value=rtnMsg;
}
/**
 * 주소항목의 라인수와 라인별 Character count를 체크함
 */
var busy = 0;
function checkTxtAreaLn(obj, cntPerLn, totRow, msgTxt){
	if(busy) return;
	busy = 1;
    var inAddrTxt=obj.value;
    var addrArr=(inAddrTxt.replace(/\r(?!\n)|\n(?!\r)/g, "\r\n")).split('\r\n'); //cross browser -  inAddrTxt.split('\r\n');
    var arrLen=addrArr.length;
    var isOk=true;
    if(arrLen>totRow){
        //alert('Please input ['+msgTxt+'] in '+totRow+' rows!\nCurrent line count is '+arrLen);
    	//#47415 - BL Entry화면의 Trade Partner의 Address Line Limit Message 변경
        //alert('Please input text in '+totRow+' rows!\nCurrent line count is '+arrLen);
        alert("The maximum number of lines allowed for trade partners' address field box is " + totRow + ".\nCurrent line count is " + arrLen + ".");
        isOk=false;
    }else{
        var lineCnt=1;
        for(var i=0; i < arrLen; i++){
            if(cntPerLn<addrArr[i].length){
                //alert('Please input ['+msgTxt+'] in '+cntPerLn+' words per line!\nCheck line '+lineCnt+'. Current character count is '+addrArr[i].length);
            	//#47415 - BL Entry화면의 Trade Partner의 Address Line Limit Message 변경
            	//alert('Please input text in '+cntPerLn+' words per line!\nCheck line '+lineCnt+'. Current character count is '+addrArr[i].length);
                alert("The maximum number of words per line allowed for trade partners' address field box is " + cntPerLn + ".\nCheck line "+lineCnt+". Current character count is "+addrArr[i].length+".");
                isOk=false;
                break;
            }
            lineCnt++;
        }
        if(!isOk){
            //obj.scrollTop = obj.scrollHeight;
            //obj.focus();
        }
    }
    //#1131 [Pickup/Delivery Order] Text Field MaxLength Validation - Can't close message after click OK button (Duc.Nguyen)
    if(!isOk){
    	setTimeout('busy=0;', 1);
    }else{        	
    	busy=0;
    }
    return isOk;
}
/**
 * Paging에 사용하는 메소드임
 */
function doDispPaging(msgStr, tbObj){
	if(msgStr == -1 ){
		msgStr = '';
	}
    if(msgStr!=''){
        msgStr=msgStr.replaceAll('&lt;', '<');
        msgStr=msgStr.replaceAll('&gt;', '>');
        msgStr=msgStr.replaceAll('&#39;', '"');
        msgStr=msgStr.replaceAll('&quot;', '\'');
        tbObj.innerHTML=msgStr;
    }else{
        tbObj.innerHTML='';
    }
}
/*
 * form hidden 생성
 */
function createHidden(n,v) {
    var o=document.createElement("input");
    o.type="hidden";
    o.name=n;
    o.value=v;
    return o;
}
/*
 * 2011.10.14 Kim,Jin-Hyuk
 *  화면별 버튼 권한 설정
 * 버튼은 최대 9개로 제한
 * 는 순차적으로 Retrieve, New, Save, Delete, Print 5개를 유지함
 */
function roleBtnControl(document, attr1, attr2, attr3, attr4, attr5, attr6, attr7, attr8, attr9){
    var Retrieve=document.getElementById("Retrieve");
    var New=document.getElementById("New");
    var Save=document.getElementById("Save");
    var Delete=document.getElementById("Delete");
    var Print=document.getElementById("Print");
    var attr6=document.getElementById("attr6");
    var attr7=document.getElementById("attr7");
    var attr8=document.getElementById("attr8");
    var attr9=document.getElementById("attr9");
    if(Retrieve!=null){
        attr1=="Y" ? Retrieve.style.display="block" : Retrieve.style.display="none";
    }
    if(New!=null){
        attr2=="Y" ? New.style.display="block" : New.style.display="none";
    }
    if(Save!=null){
        attr3=="Y" ? Save.style.display="block" : Save.style.display="none";
    }
    if(Delete!=null){
        attr4=="Y" ? Delete.style.display="block" : Delete.style.display="none";
    }
    if(Print!=null){
        attr5=="Y" ? Print.style.display="block" : Print.style.display="none";
    }
    if(attr6!=null){
        attr6=="Y" ? attr6.style.display="block" : attr6.style.display="none";
    }
    if(attr7!=null){
        attr7=="Y" ? attr7.style.display="block" : attr7.style.display="none";
    }
    if(attr8!=null){
        attr8=="Y" ? attr8.style.display="block" : attr8.style.display="none";
    }
    if(attr9!=null){
        attr9=="Y" ? attr9.style.display="block" : attr9.style.display="none";
    }
}
//화면의 flag value 값을 변경한다.
function flgChange(check) {
    var formObj=document.frm1;
    if(check.checked==true){
        check.value='Y';
    }else{
        check.value='N';
    }
}
//인자값 문자열 중 숫자만 반환
function onlyNumberRtn(str){
    var rtnVal="";
    var curStr="";
    var numStr="0123456789";
    for(var i=0 ; i < str.length ; i++){
        curStr=str.substring(i, i+1);
        if(numStr.indexOf(curStr) != -1){
            rtnVal += curStr;
        }
    }
    return rtnVal;
}
/**
     * HTML태그(Object)의 onKeyPress 이벤트에서 이 함수를 호출할수 있으며, 키보드로 입력되는 값을 영문대문자 또는 영문소문자로 자동 변경 제어한다. <br>
     * 예를 들어 다음과 같이 사용한다.<br>
     *     &lt;input type="text" name="txtName" <font color="red">style="ime-mode:disabled" onKeyPress="ComKeyOnlyAlphabet('upper')"</font>&gt; <br>
     * 인자로 사용되는 sFlag 인자의 설정값은 다음과 같다. <br>
     * sFlag = "upper"      : 영문대문자만 입력할수 있고, 대문자로 자동 변환된다. <br>
     * sFlag = "lower"      : 영문소문자만 입력할수 있고, 소문자로 자동 변환된다. <br>
     * sFlag = "uppernum"   : 영문대문자와 숫자만 입력할수 있고, 대문자로 자동 변환된다. <br>
     * sFlag = "lowernum"   : 영문소문자와 숫자만 입력할수 있고, 소문자로 자동 변환된다. <br>
     * sFlag = "num"        : 영문과 숫자 입력할수 있고, 자동 변환없이 그대로 표시한다. <br>
     * sFlag = 설정안한경우 : 영문만 입력할수 있고, 자동변환없이 그대로 표시한다. <br>
     * <font color="red">주의!</font> style="ime-mode:disabled"은 반드시 설정해야 기능이 정확히 처리된다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     ComKeyOnlyAlphabet('lower');
     *     ComKeyOnlyAlphabet('uppernum',"32|64");    //스페이스와 @문자 입력도 입력가능
     * </pre>
     * @param {string} sFlag 선택,영문모드, default=""
     * @param {string} KeyCodes 선택,예외  키코드, default=""
     * @returns 없음 <br>
     * @see #ComKeyOnlyNumber
     */
function ComKeyOnlyAlphabet(sFlag, KeyCodes)
{
    try {
        var keyValue = ComGetEvent("keycode");
        var keyValue2 = keyValue;
        var bCanNum  = false;
        var flag = false;

        if (sFlag==undefined || sFlag==null || sFlag.constructor!=String) sFlag="";
        sFlag = sFlag.toLowerCase();
        if (KeyCodes==undefined || KeyCodes==null) flag=false;
        else{
            var KeyArray = KeyCodes.split("|");
            for(var i =0;i<KeyArray.length;i++){
            	if(KeyArray[i] == keyValue) flag = true;
            }
        }
        
        if (sFlag.length >= 3){
            if (sFlag.substr(sFlag.length-3)=="num") bCanNum=true;
            if (sFlag.length > 5) sFlag = sFlag.substr(0,5);
        }
        if(keyValue >= 97 && keyValue <= 122){                  //ì†Œë¬¸ìž�
            if (sFlag=="upper") keyValue2 = keyValue + 65 - 97;
        } else if(keyValue >= 65 && keyValue <= 90){            //ëŒ€ë¬¸ìž�
            if (sFlag=="lower") keyValue2 = keyValue + 97 - 65;
        } else if(bCanNum && keyValue >= 48 && keyValue <= 57) {//ìˆ«ìž�
        } else if(flag) {									    //ì˜ˆì™¸ë¬¸ìž�.
        } else {
        	ComJsEventStop();
        	return false;
        }
        if (keyValue!=keyValue2){
        	event.keyCode = keyValue2;
        	event.which = keyValue2;
        	event.charCode = keyValue2;
        }
        
        return true;
    } catch(err) { ComFuncErrMsg(err.message); }
}
    /**
     * HTML태그(Object)의 onKeyPress 이벤트에서 이 함수를 호출할수 있으며, 키보드로 입력되는 값을 숫자만으로 제어한다. <br>
     * 예를 들어 다음과 같이 사용한다.<br>
     *     &lt;input type="text" name="txtAmt" <font color="red">onKeyPress="ComKeyOnlyNumber(this)"</font>&gt; <br>
     * 인자로 사용되는 sSubChar 인자는 숫자이외에 부가적으로 입력할수 있는 문자를 여러개 연결하여 설정한다.<br>
     * <font color="red">주의!</font> style="ime-mode:disabled"은 반드시 설정해야 기능이 정확히 처리된다. <br>
     * <br><b>Example :</b>
     * <pre>
     *     &lt;input type="text" name="txtAmt" onKeyPress="ComKeyOnlyNumber(this)"&gt;
     *     &lt;input type="text" name="txtAmt" onKeyPress="ComKeyOnlyNumber(this, "-")"&gt;
     *     &lt;input type="text" name="txtAmt" onKeyPress="ComKeyOnlyNumber(this, "-.,")"&gt;
     * </pre>
     * @param {object} obj      필수,대상 HTML태그(Object)
     * @param {string} sSubChar 선택,숫자이외의 부가 글자
     * @returns 없음 <br>
     * @see #ComKeyOnlyAlphabet
     */
    function ComKeyOnlyNumber(obj,sSubChar)
    {
        try {
	        var keyValue=ComGetEvent("keycode") ? ComGetEvent("keycode") : event.which ? event.which : event.charCode;
            if(keyValue >= 48 && keyValue <= 57) {//숫자
                event.returnValue=true;
            } else if(sSubChar != undefined && sSubChar != null && sSubChar.constructor==String && sSubChar.length > 0) {
            	//SubChar가 여러개 설정된 경우 여러개 글자 모두 처리한다.
            	for(var i=0; i<sSubChar.length; i++) {
             		if (keyValue == sSubChar.charCodeAt(i)) {
		                event.returnValue=true;
		                return;
            		}
            	}
                event.returnValue=false;
            } else {
                event.returnValue=false;
            }
        } catch(err) { ComFuncErrMsg(err.message); }
    }
    function ComFuncErrMsg(err_msg) {
        var sFuncName="";
        try {
            sFuncName=ComFuncErrMsg.caller.toString();
            sFuncName=sFuncName.substring(9, sFuncName.indexOf("("));
        } catch(err){;}
        alert("["+sFuncName+" Error] " + err_msg);
    }
   /*
   BL번호.
style="ime-mode:disabled;text-transform:uppercase;" 
양수 소수점 미포함.
onKeyPress="ComKeyOnlyNumber(this)"
양수 소소점 포함.
onKeyPress="ComKeyOnlyNumber(this, '.')"
알파벳대문자
onKeyPress=ComKeyOnlyAlphabet('upper');
알파벳대문자 + 숫자
onKeyPress=ComKeyOnlyAlphabet('uppernum');
알파벳소문자 + 숫자
onKeyPress=ComKeyOnlyAlphabet('lowernum'); 
*/
function chkSearchCmprAmt(isReq, fmObj, toObj){
 	//Amount field is mandatory.
 	if(isReq){
 		if(fmObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			fmObj.focus();
 			return false;
 		}else if(toObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			toObj.focus();
 			return false;
 		}
 	//Amount field is optional.	
 	}else{
 		if(fmObj.value==''&&toObj.value!=''){
 			alert(getLabel('FMS_COM_ALT002'));
 			fmObj.focus();
 			return false;
 		}else if(fmObj.value!=''&&toObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			toObj.focus();
 			return false;
 		}
 	}
 	if(fmObj.value!=''&&toObj.value!=''){
	     if(compareTwoAmt(fmObj.value, toObj.value)){
	     	curObj.value='';
	     	alert(getLabel('FMS_COM_ALT002'));
	     	curObj.focus();
	     	return false;
	     }else{
	     	return true;
	     }
 	}else{
 		return true;
 	}
}
function chkCmprAmt(flagVal, isReq, curObj, fmObj, toObj){
	if(flagVal){
 		if(curObj.value==''){
 			return;
 		}
 	}
	if(isNaN(curObj.value.replaceAll(',', ''))){
		alert(getLabel('FMS_COM_ALT002'));
		curObj.value='';
		curObj.focus();
		return;
	}
 	//If the amount is mandatory item. 
 	if(isReq){
 		if(curObj.value==''){
 			alert(getLabel('FMS_COM_ALT002'));
 			curObj.focus();
 			return;
 		}
 	 	if(curObj==fmObj&&fmObj.value==''&&toObj.value!=''){
 	 		alert(getLabel('FMS_COM_ALT002'));
 	 		fmObj.focus();
 	 		return;
 	 	}else if(curObj==toObj&&toObj.value==''&&fmObj.value!=''){
 	 		alert(getLabel('FMS_COM_ALT002'));
 	 		toObj.focus();
 	 		return;
 	 	}
 	}
 	if(fmObj.value!=''&&toObj.value!=''){
 	 	//Compare Amount
 	    if(compareTwoAmt(fmObj.value, toObj.value)){
 	     	curObj.value='';
 	     	alert(getLabel('FMS_COM_ALT002'));
 	     	curObj.focus();
 	     	return;
 	     }
 	}
}
function compareTwoAmt(fromVal, toVal){
	var fmAmt=parseInt(fromVal.replaceAll(',', ''));
	var toAmt=parseInt(toVal.replaceAll(',', ''));
	var rtnSts=false;
	if(fmAmt>toAmt){
		rtnSts=true;	
	}
	return rtnSts;
}
/**
 * RD 페이지를 열 때 새로운 창에서 열기위해서 STR 값을 유니크하게 변경함.
 */
function getTimeStamp() {
	var d=new Date();
	var s=""+d.getHours()+""+d.getMinutes()+""+d.getSeconds();
	return s;
}
/**
 *  Role 별 Program 접근권한 체크
 */
var PGM_ROLE_YN="N";
function dispPgmRoleYn(reqVal){
	PGM_ROLE_YN="N";
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] == 'Y'){
				PGM_ROLE_YN="Y";
			}else{
				PGM_ROLE_YN="N";
			}
		}
	}
}
/**
 * 페이지 로딩이 오래 걸리는 경우 IBSeet의 동적 생성을 목적으로 사용
 * @param {htmlTag} String : IBSheet <OBJECT>태그를 담을 html태그
 * @param {ID} String : 생성할 IBSheet ID
 */
function callSheetObject(htmlTag, ID) {
	if (document.all[ID] == undefined || document.all[ID] == "undefined") {
		// htmlTag에 IBSheet <OBJECT>태그 insert
		document.getElementById(htmlTag).innerHTML=SheetObjectTag(ID);    // IBSheetConnfig.js 참조
		var shtObj=document.all[ID];
		// 생성된 IBSheet를 docObjects배열에 추가
		setDocumentObject(shtObj);    // 해당페이지의 js 참조
		// 생성된 IBSheet <OBJECT>태그를 htmlTag에 insert
		SheetEventTag(ID);    // IBSheetConnfig.js 참조 (2013.04.12 추가정의)
		comConfigSheet(shtObj, SYSTEM_FIS);    // IBSheetConnfig.js 참조
		for (var i=0; i<docObjects.length; i++) {
			if (docObjects[i] != undefined && docObjects[i] != "undefined" && docObjects[i].id == ID) {
				initSheet(shtObj, i+1);    // 해당페이지의 js 참조
			}
		}
		comEndConfigSheet(shtObj);    // IBSheetConnfig.js 참조
	}
}
 /**
  * To Upper Case
  */
 function strAuto(obj){
	 if(obj.value == 'AUTO')
	 {
		 obj.value='';
	 }
     //obj.value = obj.value.toUpperCase();
     //frm1.bl_no.value=='AUTO'?frm1.bl_no.value='':frm1.bl_no.value = frm1.bl_no.value;
 }

 
 /**
  * xml 문자열을 파싱하여 xmlDoc을 반환한다.<br>
  * <b>Example :</b>
  * 
  * <pre>
  * var xmlDoc = ComGetXmlDoc(sXml);
  * if (xmlDoc==null) return;
  * </pre>
  * 
  * @param {String}
  *            sXml 필수, xml 문자열
  * @return xml document, 없을경우 null
  */
 function ComGetXmlDoc(sXml){
 	if (sXml==undefined || sXml=="" || sXml==null || sXml=="null") return null;

 	if (sXml.indexOf("?>") > 0) {
 		sXml = sXml.substring(sXml.indexOf("?>") + 2);
 	}
 	xmlDoc = $.parseXML(sXml);
 	if (xmlDoc.documentElement==null) return null;

 	return xmlDoc;
 }
 
 /**
	* @param     : obj => obj
	* @return 	: 
	* 설명		: 리얼타임으로 숫자와 '.'만 입력할때 
	*  firstLen = 정수자리길이, secondLen 소수 자리 길이  
	**/
	function ChkNumberCommaLen(objValue, firstLen, secondLen){
		var intoVal=rmMoneyFmt(objValue);
		var zeroIdx=intoVal.indexOf('00');
		if(zeroIdx==0){
			return 1;
		}else{
			var bgnNum='';
			var curLen=intoVal.indexOf('.');
			if(secondLen==0&&curLen>0){
				return 0;
			}else{
				if(curLen>0){
					bgnNum=intoVal.substring(0, curLen);
					if(bgnNum.length>firstLen){
						return 0;
					}	
					curLen++;
					if(curLen<intoVal.length){
						var unZero=intoVal.substring(curLen);
						if(unZero.length>secondLen){
							return 0;
						}
					}
				}else{
					if(intoVal.length>firstLen){
						return 0;
					}
				}
			}
		}
		return 1;
	}
	//#6301 [JAPT] Mail sending function related request - requirement 1
	function createEmailTitle(optval, bkg, ves, voy, etd, hbl, inv_no){
		var title = optval.replace('[BKG]', bkg);
	    title = title.replace('[VES]', ves);
	    title = title.replace('[VOY]', voy);
	    title = title.replace('[ETD]', etd);
	    title = title.replace('[HBL]', hbl);
	    title = title.replace('[INV_NO]', inv_no); 
	    return title;
	}