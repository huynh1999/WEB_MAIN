
/*
*#2410 [CLT] 보안취약점 점검 - 아키텍처 검토 사항
* Input, textarea의 "첫번째 문자"로 = , 공백 오지 못하도록 막는 스크립트.
* '=' 입력되었을 경우, IBSheet list를 엑셀로 다운 받았을 경우, 엑셀함수로 실행파일 실행 가능하기때문.
* 따라서, '='의 입력을 막되, 공백+'=' 입력이 가능하기 때문에, 공백과 '='를 함께 막는 스크립트.
*/
$(document).ready(function(){
	$("input").change(function(){
		while($(this).val().search(/^=/)==0) {
			$(this).val($(this).val().replace(/^=/,''));
		}
	});

	$("textarea").change(function(){
		while($(this).val().search(/^=/)==0) {
			$(this).val($(this).val().replace(/^=/,''));
		}
	});
});

//#4212 AMS 전송시 특수문자 validation  추가
/*
 obj: Object 혹은 Ibsheet value
 SheetYN: obj이 Ibsheet Value 일 경우, Y, 아닐 경우, N 혹은 빈값
 type: EDI type
 
 아래는 실제 사용 예시.

	speChr = replChar(docObjects[0].GetCellValue(i, "ntfy_nm"),'Y','AMS')
	if(speChr.length > 0) {
		if(speChrSet ==""){
			speChrSet = speChrSet + "* HB/L No. : " +  docObjects[0].GetCellValue(i, "hbl_no") + "\n";
			speChrSet = speChrSet + "Notify Name : " + docObjects[0].GetCellValue(i, "ntfy_nm") + "\n";
		}else {
			speChrSet = speChrSet + "Notify Name : " + docObjects[0].GetCellValue(i, "ntfy_nm") + "\n";
		}
	}
 * */
function replChar(obj, sheetYN ,type) {
	var orgVal ='';
	var repVal ='';
	
	if(type == 'DT')
		orgVal = obj.datebox('getText');
	else if(sheetYN == 'Y'){
		orgVal = obj;
	}else{
		orgVal = obj.val();
	}
			
	//ALL TRIM
	if (type=='AMS'){							  	
		repVal = orgVal.replace(/[A-Za-z0-9<>@`{}.:,';!#&()"?\-_=+%$\/[\]\n ]/g, "");	
	} else if (type=='AFR'){				  	
		repVal = orgVal.replace(/[A-Za-z0-9!"#%&'\(\)\+,-\.:;<=>?@\n\\\/  ]/g, "");
	} else if (type=='AFR2'){ // Naccs Upgrade 2017.08.30 - add * 			  	
		repVal = orgVal.replace(/[A-Za-z0-9!"#%&*'\(\)\+,-\.:;<=>?@\n\\\/  ]/g, "");	
	} else if (type=='ACI'){				  	
		repVal = orgVal.replace(/[A-Za-z0-9`@#$%\^&\(\)\-_+\[\]\{\};\/?\n ",.<> ]/g, "");			
	//only alphabete
	} else if (type=='OA'){
		repVal = orgVal.replace(/[A-Za-z]/g, "");
	//only alphanumeric	
	} else if (type=='AN'){
		repVal = orgVal.replace(/[A-Za-z0-9]/g, "");	
	//only alphanumeric	space
	} else if (type=='ANS'){
		repVal = orgVal.replace(/[A-Za-z0-9 ]/g, "");
	//ALPHA NUMERIC BAR
	} else if (type=='ANB'){
		repVal = orgVal.replace(/[A-Za-z0-9\-]/g, "");
	//ALPHA NUMERIC POINT
	} else if (type=='ANP'){
		repVal = orgVal.replace(/[A-Za-z0-9.]/g, "");	
	//only numeric		
	} else if (type=='ON'){
		repVal = orgVal.replace(/[0-9]/g, "");	
	//only numeric point			
	} else if (type=='ONP'){
		repVal = orgVal.replace(/[0-9.]/g, "");
	//only numeric comma	
	} else if (type=='ONC'){
		repVal = orgVal.replace(/[0-9,]/g, "");	
	//only vessel		
	} else if (type=='VN'){
		repVal = orgVal.replace(/[A-Za-z0-9.'()\- ]/g, "");
	//only datetype		
	} else if (type=='DT'){
		repVal = orgVal.replace(/[0-9\-]/g, "");	
		
	} else if (type=="SI"){
		repVal = orgVal.replace(/[A-Za-z0-9~^*<>@`{ }.\n:,';!#&()"?\-_=+%$\/[\]\]]/g, "");	
	}
	
	return repVal;
}