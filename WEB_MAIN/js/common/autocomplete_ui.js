/********************************************************************************************
 * JS DESCTIPTION : 추천단어 설정 및 자동입력
 * CREATE DATE : 2016-12-12
 * AUTH : JEOUNG JAE IL
 * 
 * [function API]
 * 
 * fnSetAutocomplete  	 - 추천단어 설정 함수
 * fnCheckMultiSet    	 - 기타 정보설정 index를 반환한다.
 * fnGetMultiSet      	 - 자동완성 설정 시 입력된 버튼 ID를 반환한다.
 * fnSetItems 		  	 - 추천단어 조회 결과를 전역 배열 변수에 담는다.
 * fnSetMultiItems    	 - 추천단어 선택 후 멀티입력 설정
 * fnSetLINER_POPLIST 	 - 고객명 선택 시 동시에 자동설정될 component 설정[LINER_POPLIST]
 * fnSetLINER_POPLIST_MS - 고객명 선택 시 동시에 자동설정될 component 설정[LINER_POPLIST_MS]
 * fnSetLOCATION_POPLIST - 지역명 선택 시 동시에 자동설정될 component 설정[LOCATION_POPLIST]
 * fnIsNull 		  	 - 문자열의 null 여부를 반환한다.
 * fnIsNotNull 		  	 - 문자열의 null 여부를 반환한다.
 * getObject 		  	 - 검색 ID OR NAME에 해당하는 object를 반환한다.
 ********************************************************************************************/

var arrayItem;	// 추천단어 목록(array)
var rtnDetailArray; // 추천단어를 포함한 기타정보
var arraySearchIndex = ["LINER_POPLIST", "LINER_POPLIST_BLANK", "LINER_POPLIST_MS", "LINER_POPLIST_M", "LINER_POPLIST_AIR_M", "LINER_POPLIST_IATA", "LOCATION_POPLIST", "LOCATION_POPLIST_BLANK", "CNEE_POPLIST","ACC_POPLIST","PDO_POPLIST","VESSEL_POPLIST"];
var arraySearchType = ["shrt_nm", "shrt_nm", "shrt_nm", "shrt_nm", "shrt_nm", "shrt_nm", "loc_nm", "loc_nm",  "shrt_nm",  "shrt_nm","shrt_nm","vsl_nm"]; // 검색 type
var arraySearchUrl = ["searchTlRecommendCustInfoList"
                      , "searchTlRecommendCustInfoList"
                      , "searchTlRecommendCustInfoList"
                      , "searchTlRecommendCustInfoList"
                      , "searchTlRecommendCustInfoList"
                      , "searchTlRecommendCustInfoList"
                      , "searchTlRecommendLocInfoList"
                      , "searchTlRecommendLocInfoList"
                      , "searchTlRecommendCustInfoList"
                      , "searchTlRecommendCustInfoList"
                      , "searchTlRecommendCustInfoList"
                      , "searchTlRecommendVesselInfoList"
                      ]; // 검색 url

var V_MULTI_COMP_ID = new Array(); // 기타정보 입력 compoent id 목록(array)
var multiLanguage = false;
/**
 * descrition : - component type 이 'input'인 객체에 자동완성기능을 설정한다.
 * 				- 3자 이상 키 입력 시에만 동작한다.
 * 				- 멀티 입력의 경우 SET으로 구성된 버튼 ID를 입력한다(기존 팝업의 결과처리 함수사용).
 * 
 * arguements : fnSetAutocomplete(A, B, C, D, E, F, G)
 * 				A : 추천단어를 입력 받을 component id									[필수]
 * 				B : 검색 TYPE - arraySearchIndex 참고									[필수]
 * 				C : 버튼 ID															[option]
 *  			D : 키 입력 후 얼마 후에 조회를 할것인지 설정(MILLISECONDS default 100)	[option]
 *  			E : 검색하기 위한 최소 문자수 설정(default 3)							[option]
 *  			F : 자동으로 첫번쩨 추천단어를 하이라이트 한다.(default false)				[option]
 *  			G : 자동완성기능 활성화여부(활성:false, 비활성:true default true)			[option]
 * create date : 2016-12-12 최초작성
 * 
 * ex : fnSetAutocomplete('input_comp_id', 'LINER_POPLIST');
 * 		fnSetAutocomplete('input_comp_id', 'LINER_POPLIST', 'BUTTON_ID');
 * 		fnSetAutocomplete('input_comp_id', 'LINER_POPLIST', null, 100, null);
 * 		fnSetAutocomplete('input_comp_id', 'LINER_POPLIST', 'BUTTON_ID', 100, null, false, true);
 * 
 * return 설정결과 값[true : 설정성공, false : 설정실패]			 
 */
function fnSetAutocomplete(){	
	var input_id    = arguments[0]; // 추천단어를 입력 받을 input='text' compoent id
	var searchType  = arguments[1]; // customer/locate 중 추천단어를 검색 할 타입
	var curObjBtnId = arguments[2]; // 버튼 ID
	var tpType 		= arguments[3]; // TP type
    var pDelay	    = arguments[4];
    var pMinLength  = arguments[5];
    var pAutoFocus  = arguments[6];
	var pDisabled   = arguments[7];
		
	//'input' component
	if(typeof(input_id) === 'undefined'){
		return false;
	}
	
	//search Type
	if(fnIsNull(searchType) || fnGetSearchIndex(searchType) == -1 ){
		return false;
	}
	
	var inputObj = fnGetObject(input_id);
		
	if(inputObj == null){
		return false;
	}
		
	if($(inputObj).attr('type') != 'text'){
		return false;
	}
	
	if(fnIsNull(pDelay)){
		pDelay = 100;
	}
	/*
	if ($(inputObj)[0].getAttribute("dataformat") != null){
		alert($(inputObj)[0].getAttribute("dataformat"))
		multiLanguage = true;
	}
	*/
	if(fnIsNull(pMinLength)){
		pMinLength = (multiLanguage) ? 2 : 3;;
	}
	
	if(fnIsNull(pAutoFocus)){
		pAutoFocus = false;
	}
    
	if(fnIsNull(pDisabled)){		
		pDisabled = false;
	}
		
	var multiItems = new Array(input_id, curObjBtnId); // 멀티설정 배열에 추천단어component id 추가(다중 설정 시 검색을 위해)
	V_MULTI_COMP_ID.push(multiItems);	// 메모리에 추가(이후 각 component에서 추천단어 선택 시 사용)
	
	var typeIndex = fnGetSearchIndex(searchType);
	
	var url = arraySearchUrl[typeIndex];		// 검색 type 별 url
	var param = arraySearchType[typeIndex];	// 검색 type 별 parameter
	
	var tpParam = null;
	
	if(typeIndex < 5 && (tpType == 'O' || tpType == 'A')){
		
		if(curObjBtnId=='liner'){
			// carrier 조회
   			if(tpType=='A'){
   				tpParam='&tpType=AC';		   				
   			}else{
   				tpParam='&tpType=LN';
   			}
   		}
		
	}else if((typeIndex == 6 ||typeIndex == 7 ) && tpType == 'O'){
		//해운 location 조 회
		tpParam = '&tpType=L01';
	}else if((typeIndex == 6 ||typeIndex == 7 ) && tpType == 'A'){
		//항공 location 조회
		tpParam = '&tpType=L02';
	}else if((typeIndex == 8 ) && (tpType == 'O' || tpType == 'A')){ 
		if(curObjBtnId=='liner'){
			// carrier 조회
   			if(tpType=='A'){
   				tpParam='&tpType=AC';		   				
   			}else{
   				tpParam='&tpType=LN';
   			}
   		}
		
	}
	
	$('.ui-autocomplete').css("max-height", "100px");
	//2017-02-08 요청 : 자동완성 기능 시 조회된 Data 를 노출시키는 영역의 가로 길이 조정 overflow-y auto --> hidden으로 변경
	$('.ui-autocomplete').css("overflow-y", "hidden");
	$('.ui-autocomplete').css("overflow-x", "hidden");
	
	var isSelected = false;
	
	$(inputObj).autocomplete({
        width: 300,
        max: 10,
        delay: pDelay,
        minLength: pMinLength,
        autoFocus: pAutoFocus,
        disabled: pDisabled,
        cacheLength: 1,
        scroll: true,
		highlight: false,
        source: function(request, response) {
            //입력 창에 문자열 변경 시
        	if(AUTOCOMPLETE_YN == 'Y'){
        		isSelected = false;
        		var dataformat =  $(inputObj)[0].getAttribute("dataformat"); //(multiLanguage) ? $(inputObj)[0].getAttribute("dataformat") : "";
        		if(dataformat == "multiLanguage"){
        			multiLanguage = true;
        		}else{
        			multiLanguage = false;
        		}
        		//alert(multiLanguage);
        		//var ajaxParam = '&goWhere=aj&bcKey=' + url + '&' + param + '=' + $(inputObj).val() + '&dataformat='+dataformat;
        		//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
        		var inputVal = $(inputObj).val().substring($(inputObj).val().indexOf("｜")+1,$(inputObj).val().length);
        		if(param == "shrt_nm")
        			inputVal = encodeURIComponent(inputVal);
        		var ajaxParam = '&goWhere=aj&bcKey=' + url + '&' + param + '=' + inputVal + '&dataformat='+dataformat;
        		
        		if(fnIsNotNull(tpParam)){
        			ajaxParam += tpParam;
        		}
        		
            	ajaxSendPost(fnSetItems, 'reqVal', ajaxParam, './GateServlet.gsl');        
            	
            	if(arrayItem.length > 0){
            		
            		response(arrayItem);	// 추천단어 설정
            	}else{
            		
            		response(new Array());  // 빈 배열 추가(스크립트 오류 방지)
            	}        	
        	}
        },
        select:function (event, ui) {
            //추천단어 선택 시
        	isSelected = true;
            var value = ui.item.value.split("｜");
            var index = fnCheckMultiSet(input_id);
            
            if(index > -1){
            //멀티 설정값 적용
            fnSetMultiItems(typeIndex, value[0], fnGetMultiSet(index));
            setTimeout(function() { 
            	var idValue = $(inputObj).val().split("｜");
            	$(inputObj).val(idValue[1]);
            }, 70);
            }
            }
        //#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
        }).bind("keypress blur", function() {
            var index = fnCheckMultiSet(input_id);
            var val = $(inputObj).val().substring(0,$(inputObj).val().indexOf("｜"));
            var name = $(inputObj).val().substring($(inputObj).val().indexOf("｜")+1,$(inputObj).val().length);
            if(val != null && val != "" && !isSelected){
            	fnSetMultiItems(typeIndex, val, fnGetMultiSet(index));
            	setTimeout(function() {
            		$(inputObj).val(name);
            	}, 80)
            }        	
        });

    return true;
    }
/**
 * 버튼id를 활용하지 않는 Callback 형태의 자동완성기능
 * @returns {Boolean}
 */
function fnSetAutocompleteCallBack(){
	
	var input_id    = arguments[0]; // 추천단어를 입력 받을 input='text' compoent id
	var callbackFnc = arguments[1]; // 결과처리 함수
	var searchType  = arguments[2]; // 검색 type
	var tpType 		= arguments[3]; // TP type
    var pDelay	    = arguments[4];
    var pMinLength  = arguments[5];
    var pAutoFocus  = arguments[6];
	var pDisabled   = arguments[7];
	
	//'input' component
	if(typeof(input_id) === 'undefined'){
		
		return false;
	}
	
	//callback function
	if(fnIsNull(callbackFnc)){
		
		return false;
	}
	
	//search type
	if(fnIsNull(searchType)){
		
		return false;
	}
		
	var inputObj = fnGetObject(input_id);
		
	if(inputObj == null){
		
		return false;
	}
		
	if($(inputObj).attr('type') != 'text'){
		
		return false;
	}
	
	if(fnIsNull(pDelay)){
		
		pDelay = 100;
	}
	
	if(fnIsNull(pMinLength)){
		
		pMinLength = 3;
	}
	
	if(fnIsNull(pAutoFocus)){
		
		pAutoFocus = false;
	}
    
	if(fnIsNull(pDisabled)){		
		
		pDisabled = false;
	}
		
	var multiItems = new Array(input_id, callbackFnc); // 멀티설정 배열에 추천단어component id 추가(다중 설정 시 검색을 위해)
	V_MULTI_COMP_ID.push(multiItems);	// 메모리에 추가(이후 각 component에서 추천단어 선택 시 사용)
	
	var typeIndex = fnGetSearchIndex(searchType);
	
	var url = arraySearchUrl[typeIndex];		// 검색 type 별 url
	var param = arraySearchType[typeIndex];	// 검색 type 별 parameter
	
	var tpParam = null;
	
	if(typeIndex == 2 && tpType == 'O'){
		//해운 carrier 조회
		tpParam = '&tpType=LN';
	}else if(typeIndex == 2 && tpType == 'A'){
		//항공 carrier 조회
		tpParam = '&tpType=AC';
	}else if(typeIndex > 5 && tpType == 'O'){
		//해운 location 조 회
		tpParam = '&tpType=L01';
	}else if(typeIndex > 5 && tpType == 'A'){
		//항공 location 조회
		tpParam = '&tpType=L02';
	}
	
	$('.ui-autocomplete').css("max-height", "100px");
	//2017-02-08 요청 : 자동완성 기능 시 조회된 Data 를 노출시키는 영역의 가로 길이 조정 overflow-y auto --> hidden으로 변경
	$('.ui-autocomplete').css("overflow-y", "hidden");
	$('.ui-autocomplete').css("overflow-x", "hidden");
	
	var isSelected = false;
	
	$(inputObj).autocomplete({
        width: 300,
        max: 10,
        delay: pDelay,
        minLength: pMinLength,
        autoFocus: pAutoFocus,
        disabled: pDisabled,
        cacheLength: 1,
        scroll: true,
        highlight: false,
        source: function(request, response) {
            //입력 창에 문자열 변경 시
        	if(AUTOCOMPLETE_YN == 'Y'){
        		isSelected = false;
        		//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
        		var inputVal = $(inputObj).val().substring($(inputObj).val().indexOf("｜")+1,$(inputObj).val().length);
        		if(param == "shrt_nm")
        			inputVal = encodeURIComponent(inputVal);
	        	var ajaxParam = '&goWhere=aj&bcKey=' + url + '&' + param + '=' + inputVal;        	
	        	
	        	if(fnIsNotNull(tpParam)){
        			ajaxParam += tpParam;
        		}
	        	
	        	ajaxSendPost(fnSetItems, 'reqVal', ajaxParam, './GateServlet.gsl');        
	        	
	        	if(arrayItem.length > 0){
	        		
	        		response(arrayItem);	// 추천단어 설정
	        	}else{
	        		
	        		response(new Array());  // 빈 배열 추가(스크립트 오류 방지)
	        	}        	
        	}
        },
        select:function (event, ui) {
        	isSelected = true;
        	var value = ui.item.value.split("｜");
        	var index = fnCheckMultiSet(input_id);
        	if(index > -1){
        		//멀티 설정값 적용
        		fnSetMultiItemsCallBack(searchType, value[0], fnGetMultiSet(index));
        		setTimeout(function() { 
        			var idValue = $(inputObj).val().split("｜");
        			$(inputObj).val(idValue[1]);
        		}, 70);
        	}
        }
      //#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)        
    }).bind("keypress blur", function() {
    	var index = fnCheckMultiSet(input_id);
        var val = $(inputObj).val().substring(0,$(inputObj).val().indexOf("｜"));
        var name = $(inputObj).val().substring($(inputObj).val().indexOf("｜")+1,$(inputObj).val().length);
        if(val != null && val != "" && !isSelected){
        	fnSetMultiItemsCallBack(searchType, val, fnGetMultiSet(index));
        	setTimeout(function() {
        		$(inputObj).val(name);
        	}, 80)
        }
    });
	
	return true;
}

/**
 * 버튼id를 활용하는 Callback 형태의 자동완성기능
 * @returns {Boolean}
 */
function fnSetAutocompleteCallBack2(){
	
	var input_id    = arguments[0]; // 추천단어를 입력 받을 input='text' compoent id
	var callbackFnc = arguments[1]; // 결과처리 함수
	var searchType  = arguments[2]; // 검색 type
	var curObjBtnId = arguments[3]; // 버튼 id
	var tpType 		= arguments[4]; // TP type
    var pDelay	    = arguments[5];
    var pMinLength  = arguments[6];
    var pAutoFocus  = arguments[7];
	var pDisabled   = arguments[8];
	
	//'input' component
	if(typeof(input_id) === 'undefined'){
		
		return false;
	}
	
	//callback function
	if(fnIsNull(callbackFnc)){
		
		return false;
	}
	
	//search type
	if(fnIsNull(searchType)){
		
		return false;
	}
	
	var inputObj = fnGetObject(input_id);
		
	if(inputObj == null){
		
		return false;
	}
		
	if($(inputObj).attr('type') != 'text'){
		
		return false;
	}
	
	if(fnIsNull(pDelay)){
		
		pDelay = 100;
	}
	
	if(fnIsNull(pMinLength)){
		
		pMinLength = 3;
	}
	
	if(fnIsNull(pAutoFocus)){
		
		pAutoFocus = false;
	}
    
	if(fnIsNull(pDisabled)){		
		
		pDisabled = false;
	}
		
	var multiItems = new Array(input_id, callbackFnc, curObjBtnId); // 멀티설정 배열에 추천단어component id 추가(다중 설정 시 검색을 위해)
	V_MULTI_COMP_ID.push(multiItems);	// 메모리에 추가(이후 각 component에서 추천단어 선택 시 사용)
	
	var typeIndex = fnGetSearchIndex(searchType);
	
	var url = arraySearchUrl[typeIndex];		// 검색 type 별 url
	var param = arraySearchType[typeIndex];	// 검색 type 별 parameter
	
	var tpParam = null;
	
	if(typeIndex < 5 && (tpType == 'O' || tpType == 'A')){
		
		if(curObjBtnId=='liner'){
			// carrier 조회
   			if(tpType=='A'){
   				tpParam='&tpType=AC';		   				
   			}else{
   				tpParam='&tpType=LN';
   			}
   		}
		
	}else if(typeIndex > 5 && tpType == 'O'){
		//해운 location 조 회
		tpParam = '&tpType=L01';
	}else if(typeIndex > 5 && tpType == 'A'){
		//항공 location 조회
		tpParam = '&tpType=L02';
	}
	
	$('.ui-autocomplete').css("max-height", "100px");
	//2017-02-08 요청 : 자동완성 기능 시 조회된 Data 를 노출시키는 영역의 가로 길이 조정 overflow-y auto --> hidden으로 변경
	$('.ui-autocomplete').css("overflow-y", "hidden");
	$('.ui-autocomplete').css("overflow-x", "hidden");
	
	var isSelected = false;
	
	$(inputObj).autocomplete({
        width: 300,
        max: 10,
        delay: pDelay,
        minLength: pMinLength,
        autoFocus: pAutoFocus,
        disabled: pDisabled,
        cacheLength: 1,
        scroll: true,
        highlight: false,
        source: function(request, response) {
            //입력 창에 문자열 변경 시
        	if(AUTOCOMPLETE_YN == 'Y'){
        		isSelected = false;
        	
        		//#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)
        		var inputVal = $(inputObj).val().substring($(inputObj).val().indexOf("｜")+1,$(inputObj).val().length);
        		if(param == "shrt_nm")
        			inputVal = encodeURIComponent(inputVal);
	        	var ajaxParam = '&goWhere=aj&bcKey=' + url + '&' + param + '=' + inputVal;        	
	        	
	        	if(fnIsNotNull(tpParam)){
        			ajaxParam += tpParam;
        		}
	        	
	        	ajaxSendPost(fnSetItems, 'reqVal', ajaxParam, './GateServlet.gsl');        
	        	
	        	if(arrayItem.length > 0){
	        		
	        		response(arrayItem);	// 추천단어 설정
	        	}else{
	        		
	        		response(new Array());  // 빈 배열 추가(스크립트 오류 방지)
	        	}
        	}
        },
        select:function (event, ui) {
        	isSelected = true;
        	var value = ui.item.value.split("｜");
        	var index = fnCheckMultiSet(input_id);
        	if(index > -1){
        		//멀티 설정값 적용
        		fnSetMultiItemsCallBack2(searchType, value[0], fnGetMultiSetArray(index));
        		setTimeout(function() { 
        			var idValue = $(inputObj).val().split("｜");
        			$(inputObj).val(idValue[1]);
        		}, 70);
        	}
        }
      //#4008 [GENESIS] CANNOT SAVE INVOICE BECAUSE WRONG SHIPPER INFO FROM HBL (#3463 reopen)        
    }).bind("keypress blur", function() {
    	var index = fnCheckMultiSet(input_id);
        var val = $(inputObj).val().substring(0,$(inputObj).val().indexOf("｜"));
        var name = $(inputObj).val().substring($(inputObj).val().indexOf("｜")+1,$(inputObj).val().length);
        if(val != null && val != "" && !isSelected){
        	fnSetMultiItemsCallBack2(searchType, val, fnGetMultiSetArray(index));
        	setTimeout(function() {
        		$(inputObj).val(name);
        	}, 80)
        }
    });
	
	return true;
}

/**
 * 검색 타입의 index를 반환한다.
 * @returns arraySearchIndex index
 */
function fnGetSearchIndex(){
	var type = arguments[0]
	var index = -1;
	
	if(fnIsNull(type)){
		
		return index;
	}
	
	return arraySearchIndex.indexOf(type);
}

/**
 * 기타 정보설정 index를 반환한다.
 * 설정값이 없다면 -1을 반환한다.
 *  
 * @returns Array index
 */
function fnCheckMultiSet(){
	var input_id = arguments[0];
	var retVal = -1;
	
	for(var i=0; V_MULTI_COMP_ID.length>i; i++){
		
		if(V_MULTI_COMP_ID[i][0] == input_id && fnIsNotNull(V_MULTI_COMP_ID[i][1])){
			
			retVal = i;
			break;
		}
	}
	
	return retVal;
}

/**
 * 자동완성 설정 시 입력된 버튼 ID or CallBack 함수를 반환한다.
 *  
 * @returns 버튼 ID 
 */
function fnGetMultiSet(){
	
	var index = arguments[0];
				
	return V_MULTI_COMP_ID[index][1];
}

/**
 * 자동완성 설정 시 입력된 버튼 ID or CallBack 함수를 반환한다.
 * @returns {Array} [0] : CallBack 함수, [1] : 버튼 ID 
 */
function fnGetMultiSetArray(){
	
	var index = arguments[0];
	var retArray = new Array(V_MULTI_COMP_ID[index][1], V_MULTI_COMP_ID[index][2]);
	
	return retArray;
}

/**
 * 추천단어 조회 결과를 전역 배열 변수에 담는다.
 * @param reqVal
 */
function fnSetItems(){
	
	if(typeof(arguments[0]) === 'undefined'){
	
		return false;
	}
	
	var doc=getAjaxMsgXML(arguments[0]);
	
	arrayItem = new Array();
	
	if(doc[0]=='OK'){
	
		if(typeof(doc[1])!='undefined'){
			
			var rtnMasterArray = doc[1].split("@@;");
			
			rtnDetailArray = new Array(rtnMasterArray.length-1);			
			arrayItem = new Array(rtnMasterArray.length-1);
			
			for(var i = 0; rtnMasterArray.length-1 > i; i++){
				
				var arrayItems = rtnMasterArray[i].split("^@");
				
				rtnDetailArray[i] = arrayItems;		
				
				if(arrayItems.length > 10){
					
					arrayItem[i] = String((multiLanguage) ? rtnDetailArray[i][0] + "｜" + rtnDetailArray[i][10] : rtnDetailArray[i][0] + "｜" + rtnDetailArray[i][2]);
				}else{
					
					arrayItem[i] = String(rtnDetailArray[i][0] + "｜" + rtnDetailArray[i][1]);
				}				
			}			
		}
	}
}

/**
 * 추천단어 선택 후 멀티입력 설정
 * @returns {Boolean}
 */
function fnSetMultiItems(){
	
	var typeIndex   = arguments[0];	// 검색 type
	var searchItem  = arguments[1]; // 검색어
	var curObjBtnId = arguments[2];	// 다중설정 component id
	
	if(typeof(typeIndex) === 'undefined'){
		return false;
	}
	
	if(typeof(searchItem) === 'undefined'){
		return false;
	}
	
	var arrayItems;
	
	for(var i=0; rtnDetailArray.length; i++){
		
		var tempItems = rtnDetailArray[i];
		var strValue = '';
		
//		if(typeIndex == 6 ||typeIndex == 7 ){
//			
//			strValue = String(tempItems[0])
//		}else{
//			
//			strValue = String((multiLanguage) ? tempItems[0] : tempItems[2])
//		}
		if(String(tempItems[0]) == String(searchItem)){
			arrayItems = tempItems;
			break;
		}
	}
	
	var retArray="";	
	
	if(typeIndex >= 0 && typeIndex <= 5){
		// LINER		
		retArray = fnGetRetStr(0, arrayItems);
	}else if(typeIndex==8){
	    //CNEE
		retArray = fnGetRetStr(0, arrayItems);
	}else if(typeIndex==9){
	    //Accounting
		retArray = fnGetRetStr(0, arrayItems);
	}else if(typeIndex==10){
	    //CNEE
		retArray = fnGetRetStr(0, arrayItems);
	}else if(typeIndex==12){
		//VSL
		retArray = fnGetRetStr(0, arrayItems);
	}else{
		//LOCATION		
		retArray = fnGetRetStr(1, arrayItems);
	}
	
	if(typeIndex == 0){
		//LINER_POPLIST
		
		fnSetLINER_POPLIST(retArray, curObjBtnId);
	
	}else if(typeIndex == 1){
		//LINER_POPLIST_BLANK
		
		fnSetLINER_POPLIST(retArray, curObjBtnId);
	}else if(typeIndex == 2){
		//LINER_POPLIST_MS
		
		fnSetLINER_POPLIST_MS(retArray, curObjBtnId);
	}else if(typeIndex == 3){
		//LINER_POPLIST_M
		
		fnSetLINER_POPLIST_M(retArray, curObjBtnId);
	}else if(typeIndex == 4){
		//LINER_POPLIST_AIR_M
		
		fnSetLINER_POPLIST_AIR_M(retArray, curObjBtnId);
	}else if(typeIndex == 5){
		//LINER_POPLIST_IATA
		
		fnSetLINER_POPLIST_IATA(retArray, curObjBtnId);
	}else if(typeIndex == 6){
		//LOCATION_POPLIST
		
		fnSetLOCATION_POPLIST(retArray, curObjBtnId);
	}else if(typeIndex == 7){
		//LOCATION_POPLIST_BLANK		
		
		fnSetLOCATION_POPLIST(retArray, curObjBtnId);
	}else if(typeIndex == 8){
		//CNEE_POPLIST		
		
		fnSetCNEE_POPLIST(retArray, curObjBtnId);
	}else if(typeIndex == 9){
		//CNEE_POPLIST		
		
		fnSetACC_POPLIST(retArray, curObjBtnId);
	}else if(typeIndex == 10){
		//CNEE_POPLIST		
		
		fnSetPDO_POPLIST(retArray, curObjBtnId);
	}else if(typeIndex == 11){
		//VESSEL_POPLIST		
		
		fnSetVESSEL_POPLIST(retArray, curObjBtnId);
	}
	
	return true;
}


/**
 * 추천단어 선택 후 멀티입력 설정
 * @returns {Boolean}
 */
function fnSetMultiItemsCallBack(){
	
	var searchType  = arguments[0];	// 검색 type
	var searchItem  = arguments[1]; // 검색어
	var callBackFnc = arguments[2];	// 결과처리 function
	
	if(typeof(searchType) === 'undefined'){
		return false;
	}
	
	if(typeof(searchItem) === 'undefined'){
		return false;
	}
	
	var typeIndex = fnGetSearchIndex(searchType);
	var arrayItems;
	
	for(var i=0; rtnDetailArray.length; i++){
		
		var tempItems = rtnDetailArray[i];		
		var strValue = '';
		
//		if(typeIndex > 5){
//			
//			strValue = String(tempItems[1])
//		}else{
//			
//			strValue = String(tempItems[2])
//		}
		
		if(String(tempItems[0]) == String(searchItem)){
			
			arrayItems = tempItems;
			break;
		}
	}
	
	var retArray="";	
	
	if(typeIndex > 5){
		//LOCATION
		
		retArray = fnGetRetStr(1, arrayItems);
		
	}else{
		// Customer
		
		retArray = fnGetRetStr(0, arrayItems);
	}
		
	if(fnIsNotNull(callBackFnc)){
		
		eval(callBackFnc  + "(retArray);");
	}
	
	return true;
}

/**
 * 추천단어 선택 후 멀티입력 설정
 * @returns {Boolean}
 */
function fnSetMultiItemsCallBack2(){
	
	var searchType  = arguments[0];	// 검색 type
	var searchItem  = arguments[1]; // 검색어
	var objArray 	= arguments[2];	// 결과처리 function
	
	if(typeof(searchType) === 'undefined'){
		return false;
	}
	
	if(typeof(searchItem) === 'undefined'){
		return false;
	}
	
	var typeIndex = fnGetSearchIndex(searchType);
	var arrayItems;
	
	for(var i=0; rtnDetailArray.length; i++){
		
		var tempItems = rtnDetailArray[i];
		var strValue = '';
		
//		if(typeIndex > 5){
//			
//			strValue = String(tempItems[1])
//		}else{
//			
//			strValue = String(tempItems[2])
//		}
		
		if(String(tempItems[0]) == String(searchItem)){
			
			arrayItems = tempItems;
			break;
		}
	}
	
	var retArray = "";	
	
	if(typeIndex > 5){
		
		//LOCATION
		retArray = fnGetRetStr(1, arrayItems);
	}else{
		
		// Customer
		retArray = fnGetRetStr(0, arrayItems);
	}
		
	if(fnIsNotNull(objArray[0]) && fnIsNotNull(objArray[1])){
		
		cur_curObj = document.getElementById(objArray[1]);
		eval(objArray[0]  + "(retArray);");
	}
	
	return true;
}

/**
 * 검색 결과 생성
 * @returns
 */
function fnGetRetStr(){
	
	var retType = arguments[0];
	var arrayItems = arguments[1];
	
	var retArray = "";
	
	if(retType == 0){
		
		retArray += String(arrayItems[0]); //Trdp_cd
		retArray += "|";
		retArray += "|";
		retArray += String(arrayItems[2]); // eng_nm
		retArray += "|";
		retArray += String(arrayItems[3]); // pic_nm
		retArray += "|";
		retArray += String(arrayItems[4]); // pic_phn
		retArray += "|";
		retArray += String(arrayItems[5]); // pic_fax
		retArray += "|";
		retArray += String(arrayItems[6]); // pic_eml
		retArray += "|";
		retArray += String(arrayItems[7]); // eng_addr
		retArray += "|";
		retArray += String(arrayItems[8]); // trdp_tp_cd
		retArray += "|";
		retArray += String(arrayItems[9]); // cmp_rmk
		retArray += "|";
		retArray += String(arrayItems[10]); // locl_nm
		retArray += "|";
		retArray += String(arrayItems[11]); // rep_zip
		retArray += "|";
		retArray += String(arrayItems[12]); // cnt_cd
		retArray += "|";
		retArray += String(arrayItems[13]); // sls_gp_cd
		retArray += "|";
		retArray += String(arrayItems[14]); // crd_lmt_amt
		retArray += "|";
		retArray += String(arrayItems[15]); // cur_lmt_amt
		retArray += "|";
		retArray += String(arrayItems[16]); // lgl_addr
		retArray += "|";
		retArray += String(arrayItems[17]); // cr_term_cd
		retArray += "|";
		retArray += String(arrayItems[18]); // cr_term_dt
		retArray += "|";
		retArray += String(arrayItems[19]); // city_nm
		retArray += "|";
		retArray += String(arrayItems[20]); // state_cd
		retArray += "|";
		retArray += String(arrayItems[21]); // prefix
		retArray += "|";
		retArray += String(arrayItems[22]); // iata_cd
		retArray += "|";
		retArray += String(arrayItems[23]); // biz_no
		retArray += "|";
		retArray += String(arrayItems[24]); // cmdt_cd
		retArray += "|";
		retArray += String(arrayItems[25]); // cmdt_nm
		retArray += "|";
		retArray += String(arrayItems[26]); // trdp_addr
		retArray += "|";
		retArray += String(arrayItems[27]); // trdp_addr2
		retArray += "|";
		retArray += String(arrayItems[28]); // tax_type
		retArray += "|";
		retArray += String(arrayItems[29]); // over_due
		retArray += "|";
		retArray += String(arrayItems[30]); // over_limit
		retArray += "|";
		retArray += String(arrayItems[31]); // grand_total
		retArray += "|";
		retArray += String(arrayItems[32]); // reserve_field09
		retArray += "|";
		retArray += String(arrayItems[33]); // profit_share
		retArray += "|";
		retArray += String(arrayItems[34]); // an_bond_no
		retArray += "|";
		retArray += String(arrayItems[35]); // an_bond_exp_dt
		retArray += "|";
		retArray += String(arrayItems[36]); // ctrt_no
		retArray += "|";
		retArray += String(arrayItems[37]); // dflt_addr
		retArray += "|";
		retArray += String(arrayItems[38]); // ofc_fm_hr
		retArray += "|";
		retArray += String(arrayItems[39]); // ofc_to_hr
		//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
		retArray += "|";
		retArray += "|";
		retArray += String(arrayItems[41]); // overdue_total
	}else{
		
		retArray += String(arrayItems[0]); // loc_cd
		retArray += "|";
		retArray += String(arrayItems[2]); // nod_cd
		retArray += "|";
		retArray += String(arrayItems[1]); // loc_name
		retArray += "|";
		retArray += String(arrayItems[3]); // ams_loc_val
		retArray += "|";	 	
		retArray += String(arrayItems[4]); // cnt_nm
		retArray += "|";	 	
		retArray += String(arrayItems[5]); // cnt_cd
		retArray += "|";	 	
		retArray += String(arrayItems[6]); // stn_no
		retArray += "|";	 	
		retArray += String(arrayItems[7]); // state_cd
		retArray += "|";	 	
		retArray += String(arrayItems[8]); // cbsa_loc_cd
		retArray += "|";	 	
		retArray += String(arrayItems[9]); // un_loc_cd
	}
	
	return retArray;
}

/**
 * 고객명 선택 시 동시에 자동설정될 component 설정
 */
function fnSetLINER_POPLIST(){
	
	var retArray   = arguments[0];
	var curObjBtnId = arguments[1];
	
	cur_curObj = document.getElementById(curObjBtnId);
	
	LINER_POPLIST(retArray);
}

/**
 * 고객명 선택 시 동시에 자동설정될 component 설정
 */
function fnSetLINER_POPLIST_MS(){
	
	var retArray   = arguments[0];
	var curObjBtnId = arguments[1];
		
	curObjId = curObjBtnId;  
	cur_curObj = document.getElementById(curObjBtnId);
	LINER_POPLIST_MS(retArray);
}

/**
 * 고객명 선택 시 동시에 자동설정될 component 설정
 */
function fnSetLINER_POPLIST_M(){
	
	var retArray   = arguments[0];
	var curObjBtnId = arguments[1];
		
	curObjId = curObjBtnId;  
	cur_curObj = curObjBtnId;
	LINER_POPLIST_M(retArray);
}

/**
 * 고객명 선택 시 동시에 자동설정될 component 설정
 */
function fnSetLINER_POPLIST_AIR_M(){
	
	var retArray   = arguments[0];
	var curObjBtnId = arguments[1];
	
	curObjId = curObjBtnId;  
	cur_curObj = document.getElementById(curObjBtnId);
	
	LINER_POPLIST_AIR_M(retArray);
}

/**
 * 고객명 선택 시 동시에 자동설정될 component 설정
 */
function fnSetLINER_POPLIST_IATA(){
	
	var retArray   = arguments[0];
	var curObjBtnId = arguments[1];
	
	curObjId = curObjBtnId;  
	cur_curObj = document.getElementById(curObjBtnId);
	LINER_POPLIST_IATA(retArray);
}

/**
 * 지역명 선택 시 동시에 자동설정될 component 설정
 */
function fnSetLOCATION_POPLIST(){
	
	var retArray = arguments[0];
	var curObjBtnId = arguments[1];
	
	cur_curObj = document.getElementById(curObjBtnId);
	LOCATION_POPLIST(retArray);	
}

/**
 * consignee 선택 시 동시에 자동설정될 component 설정
 */
function fnSetCNEE_POPLIST(){
	
	var retArray   = arguments[0];
	var curObjBtnId = arguments[1];
	
	cur_curObj = document.getElementById(curObjBtnId);
	
	CNEE_POPLIST(retArray);
}
/**
 * Accounting에서 원하는 TRDP 선택 시 동시에 자동설정될 component 설정
 */
function fnSetACC_POPLIST(){
	
	var retArray   = arguments[0];
	var curObjBtnId = arguments[1];
	
	cur_curObj = document.getElementById(curObjBtnId);
	ACC_POPLIST(retArray);
}
/**
 * POD에서 원하는 TRDP 선택 시 동시에 자동설정될 component 설정
 */
function fnSetPDO_POPLIST(){
	
	var retArray   = arguments[0];
	var curObjBtnId = arguments[1];
	
	cur_curObj = document.getElementById(curObjBtnId);
	
	PDO_POPLIST(retArray);
}
/**
 * VSL에서 원하는 VSL 선택 시 동시에 자동설정될 component 설정
 */
function fnSetVESSEL_POPLIST(){
	
	var retArray   = arguments[0];
	var curObjBtnId = arguments[1];
	
	cur_curObj = document.getElementById(curObjBtnId);
	
	VESSEL_POPLIST(retArray);
}

/**
 * 문자열의 null 여부를 반환한다.
 * 
 * @returns null이거나 'undefined' or ''은 true 아니면 false를 반한다.
 */
function fnIsNull(){
	
	var strVal = arguments[0];
	if(typeof(strVal) === 'undefined' || $.trim(strVal) == '' || strVal == null){
		
		return true;
	}
	
	return false;
}

/**
 * 문자열의 null 여부를 반환한다.
 * 
 * @returns null이거나 'undefined' or ''은 false 아니면 true를 반한다.
 */
function fnIsNotNull(){
	
	var strVal = arguments[0];
	if(typeof(strVal) === 'undefined' || $.trim(strVal) == '' || strVal == null){
		
		return false;
	}
	
	return true;
}

/**
 * 검색 ID OR NAME에 해당하는 object를 반환한다.
 * @returns object or null
 */
function fnGetObject(){
	
	var searchId = arguments[0];
	
	var inputObj = $("#" + searchId);
	
	if(typeof(inputObj.attr('type')) === 'undefined'){
		
		inputObj = $("input[name=" + searchId + "]");
	}
	
	if(typeof(inputObj.attr('type')) === 'undefined'){
		
		return null;
	}
	
	return inputObj;
}
