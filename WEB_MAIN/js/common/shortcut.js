/**
 * http://www.openjs.com/scripts/events/keyboard_shortcuts/
 * Version : 2.01.B
 * By Binny V A
 * License : BSD
 */
var codeNameOK = true; 	// [ALT+Q로 저장시] codeNameAction 함수가 실행완료 된 후 ,순차적으로 dowork("SAVE")함수를 실행 시키기 위해
var dateFmtOK = true;	// ALT+Q로 저장시 실행되는 체크로서 false인 경우, dowork("SAVE")실행 안시키기 위해

shortcut={
	'all_shortcuts':{},//All the shortcuts are stored in this array
	'add': function(shortcut_combination,callback,opt) {
		//Provide a set of default options
		var default_options={
			'type':'keydown',
			'propagate':false,
			'disable_in_input':false,
			'target':document,
			'keycode':false
		}
		if(!opt) opt=default_options;
		else {
			for(var dfo in default_options) {
				if(typeof opt[dfo] == 'undefined') opt[dfo]=default_options[dfo];
			}
		}
		var ele=opt.target;
		if(typeof opt.target == 'string') ele=document.getElementById(opt.target);
		var ths=this;
		shortcut_combination=shortcut_combination.toLowerCase();
		//The function to be called at keypress
		var func=function(e) {
			e=e || window.event;
			if(opt['disable_in_input']) { //Don't enable shortcut keys in Input, Textarea fields
				var element;
				if(e.target) element=e.target;
				else if(e.srcElement) element=e.srcElement;
				if(element.nodeType==3) element=element.parentNode;
				if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;
			}else{			//[20121226 OJG] 입력필드 enable & Enter Key 기능 작동
				var element;
				try {
					if(e.target) element=e.target;
					else if(e.srcElement) element=e.srcElement;
					if(element.nodeType==3) element=element.parentNode;
					if(e.keyCode ==13 && (element.tagName == 'INPUT' || element.tagName == 'TEXTAREA')) return;
				} catch(e) {
					// 권한에러
				}				
			}
			//Find Which key is pressed
			if (e.keyCode) code=e.keyCode;
			else if (e.which) code=e.which;
			var character=String.fromCharCode(code).toLowerCase();
			if(code == 188) character=","; //If the user presses , when the type is onkeydown
			if(code == 190) character="."; //If the user presses , when the type is onkeydown
			var keys=shortcut_combination.split("+");
			//Key Pressed - counts the number of valid keypresses - if it is same as the number of keys, the shortcut function is invoked
			var kp=0;
			//Work around for stupid Shift key bug created by using lowercase - as a result the shift+num combination was broken
			var shift_nums={
				"`":"~",
				"1":"!",
				"2":"@",
				"3":"#",
				"4":"$",
				"5":"%",
				"6":"",
				"7":"&",
				"8":"*",
				"9":"(",
				"0":")",
				"-":"_",
				"=":"+",	
				";":":",
				"'":"\"",
				",":"<",
				".":">",
				"/":"?",
				"\\":"|"
			}
			//Special Keys - and their codes
			var special_keys={
				'esc':27,
				'escape':27,
				'tab':9,
				'space':32,
				'return':13,
				'enter':13,
				'backspace':8,
				'scrolllock':145,
				'scroll_lock':145,
				'scroll':145,
				'capslock':20,
				'caps_lock':20,
				'caps':20,
				'numlock':144,
				'num_lock':144,
				'num':144,
				'pause':19,
				'break':19,
				'insert':45,
				'home':36,
				'delete':46,
				'end':35,
				'pageup':33,
				'page_up':33,
				'pu':33,
				'pagedown':34,
				'page_down':34,
				'pd':34,
				'left':37,
				'up':38,
				'right':39,
				'down':40,
				'f1':112,
				'f2':113,
				'f3':114,
				'f4':115,
				'f5':116,
				'f6':117,
				'f7':118,
				'f8':119,
				'f9':120,
				'f10':121,
				'f11':122,
				'f12':123
			}
			var modifiers={ 
				shift: { wanted:false, pressed:false},
				ctrl : { wanted:false, pressed:false},
				alt  : { wanted:false, pressed:false},
				meta : { wanted:false, pressed:false}	//Meta is Mac specific
			};
			if(e.ctrlKey)	modifiers.ctrl.pressed=true;
			if(e.shiftKey)	modifiers.shift.pressed=true;
			if(e.altKey)	modifiers.alt.pressed=true;
			if(e.metaKey)   modifiers.meta.pressed=true;
			for(var i=0; k=keys[i],i<keys.length; i++) {
				//Modifiers
				if(k == 'ctrl' || k == 'control') {
					kp++;
					modifiers.ctrl.wanted=true;
				} else if(k == 'shift') {
					kp++;
					modifiers.shift.wanted=true;
				} else if(k == 'alt') {
					kp++;
					modifiers.alt.wanted=true;
				} else if(k == 'meta') {
					kp++;
					modifiers.meta.wanted=true;
				} else if(k.length > 1) { //If it is a special key
					if(special_keys[k] == code) kp++;
				} else if(opt['keycode']) {
					if(opt['keycode'] == code) kp++;
				} else { //The special keys did not match
					if(character == k) kp++;
					else {
						if(shift_nums[character] && e.shiftKey) { //Stupid Shift key bug created by using lowercase
							character=shift_nums[character]; 
							if(character == k) kp++;
						}
					}
				}
			}
			if(kp == keys.length && 
						modifiers.ctrl.pressed == modifiers.ctrl.wanted &&
						modifiers.shift.pressed == modifiers.shift.wanted &&
						modifiers.alt.pressed == modifiers.alt.wanted &&
						modifiers.meta.pressed == modifiers.meta.wanted) {
				callback(e);
					if(!opt['propagate']) { //Stop the event
						//e.cancelBubble is supported by IE - this will kill the bubbling process.
						try {
							e.cancelBubble=true;
							e.returnValue=false;
						} catch(e){
							// 권한에러 
						}
					//e.stopPropagation works in Firefox.
					if (e.stopPropagation) {
						e.stopPropagation();
						e.preventDefault();
					}
					return false;
				}
			}
		}
		this.all_shortcuts[shortcut_combination]={
			'callback':func, 
			'target':ele, 
			'event': opt['type']
		};
		//Attach the function with the event
		if(ele.addEventListener) ele.addEventListener(opt['type'], func, false);
		else if(ele.attachEvent) ele.attachEvent('on'+opt['type'], func);
		else ele['on'+opt['type']]=func;
	},
	//Remove the shortcut - just specify the shortcut and I will remove the binding
	'remove':function(shortcut_combination) {
		shortcut_combination=shortcut_combination.toLowerCase();
		var binding=this.all_shortcuts[shortcut_combination];
		delete(this.all_shortcuts[shortcut_combination])
		if(!binding) return;
		var type=binding['event'];
		var ele=binding['target'];
		var callback=binding['callback'];
		if(ele.detachEvent) ele.detachEvent('on'+type, callback);
		else if(ele.removeEventListener) ele.removeEventListener(type, callback, false);
		else ele['on'+type]=false;
	}
}
function btnGetVisible(cmd){
 	var	 visible=true;
	
	if(cmd == "PRINT" || cmd == "Print"){
		if(document.getElementById("btnPrint") == null){
			visible=false;
		}else if(document.getElementById("btnPrint") != null && document.getElementById("btnPrint").style.display == "none"){
   	   		visible=false;
   	   	}
	}else if(cmd == "COPY" || cmd == "MAWB_COPY" || cmd == "HAWB_COPY" || cmd == "MBL_COPY" || cmd == "HBL_COPY"){
		if(document.getElementById("btnCopy") == null){
			visible=false;
		}else if(document.getElementById("btnCopy") != null && document.getElementById("btnCopy").style.display == "none"){
   	   		visible=false;
   	   	}
	}else if(cmd == "REMOVE" || cmd == "DELETE" || cmd == "MBL_DELETE" || cmd == "HBL_DELETE"){
		if(document.getElementById("btnDelete") != null && document.getElementById("btnDelete").style.display == "none"){
   	   		visible=false;
   	   	}
	}else if(cmd == "ADD"){
		if(document.getElementById("btnAdd") ==null){
			visible=false;
		}else if(document.getElementById("btnAdd") != null && document.getElementById("btnAdd").style.display == "none"){
   	   		visible=false;
   	   	}
	}else if(cmd == "MODIFY"){
		if(document.getElementById("btnModify") == null){
			visible=false;
		}else if(document.getElementById("btnModify") != null && document.getElementById("btnModify").style.display == "none"){
   	   		visible=false;
   	   	}
	}else if(cmd == "SAVE"){
		if(document.getElementById("btnSave") == null){
			visible=false;
		}else if(document.getElementById("btnSave") != null && document.getElementById("btnSave").style.display == "none"){
   	   		visible=false;
   	   	}
	}else if(cmd == "CLOSE_MODIFY"){
		if(document.getElementById("closeModiObj") == null){
			visible=false;
		}else if(document.getElementById("closeModiObj") != null && document.getElementById("closeModiObj").style.display == "none"){
   	   		visible=false;
   	   	}
	}else if(cmd == "GOTOACCT"){
		if(document.getElementById("btnAccounting") == null){
			visible=false;
		}else if(document.getElementById("btnAccounting") != null && document.getElementById("btnAccounting").style.display == "none"){
   	   		visible=false;
   	   	}
	}	
	//alert(cmd + visible);
	return visible;
}
shortcut.remove("Alt+1");
shortcut.remove("Alt+2");
shortcut.remove("Alt+3");
shortcut.remove("Alt+4");
shortcut.remove("Alt+5");
shortcut.remove("Alt+6");
shortcut.remove("Alt+Q");
shortcut.remove("Alt+W");
shortcut.remove("Alt+F1");
shortcut.remove("F2");
shortcut.remove("F8");
shortcut.remove("Ctrl+Q");
shortcut.remove("Alt+C");
shortcut.remove("ctrl+1");
//OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen
shortcut.remove("F9");
//공통 단축키추가.  (RETRIEVE, COPY, PRINT, ACCT, SAVE, CLOSE)
//shortcut.add("ENTER",function() {
	//doWork('SEARCHLIST');
//});

shortcut.add("Alt+1",function() {
	setTimeout(
		function doWorkProcess() {
			if(window.top == window.self && window[_MTAB] != undefined) {
			    var tabIframe = window[_MTAB].GetTabIframe(-1);
			    tabIframe.contentWindow.doWork('PRINT');
			    tabIframe.contentWindow.doWork('Print');
			    tabIframe.contentWindow.doWork('ArrivalNotice');
			} else {
				doWork('PRINT');
				doWork('Print');
				doWork('ArrivalNotice');
			}
		},100);
});

shortcut.add("Alt+2",function() {
	setTimeout(
			function doWorkProcess() {
				if(window.top == window.self && window[_MTAB] != undefined) {
				    var tabIframe = window[_MTAB].GetTabIframe(-1);
				    tabIframe.contentWindow.doWork('COPY');
					tabIframe.contentWindow.doWork('MAWB_COPY');
					tabIframe.contentWindow.doWork('HAWB_COPY');
					tabIframe.contentWindow.doWork('MBL_COPY');
					tabIframe.contentWindow.doWork('HBL_COPY');
				} else {
					doWork('COPY');
					doWork('MAWB_COPY');
					doWork('HAWB_COPY');
					doWork('MBL_COPY');
					doWork('HBL_COPY');
				}
			},100);
});

/*
Active-X 버전에는 "Alt+3" 단축키를 사용하지 않도록 되어 있음.
shortcut.add("Alt+3",function() {
	doWork('REMOVE');
	doWork('DELETE');
	//doWork('MBL_DELETE');
	//doWork('HBL_DELETE');
});
*/
shortcut.add("Alt+4",function() {
	try{
		if(parent.sixd == "" || parent.sixd == "undefined" || parent.sixd == undefined){
			//doWork('CLOSE');
		}else{
			//parent.doDeleteWin(parent.sixd,true);
		}
	}catch(e){
	}

});

shortcut.add("Alt+5",function() {
	setTimeout(
		function doWorkProcess() {
			//doWork('PROFIT_REPORT_BY_HBL');
			doWork('HBL_ENTRY');
		},100);
});
shortcut.add("Alt+6",function() {
	try{
		if(parent.sixd == "" || parent.sixd == "undefined" || parent.sixd == undefined){
			doWork('CLOSE');
		}else{
			parent.doDeleteWin(parent.sixd,true);
		}
	}catch(e){
	}

});
/*shortcut.add("Alt+Q",function() {
	try{
		//#23925 oyh 포커스 이동처리를 위해 현재 작업중인 Cell을 선택
		docObjects[0].SelectCell(docObjects[0].GetSelectRow(),docObjects[0].GetSelectCol());
	}catch(e){
	}
	doWork('SAVE');
	doWork('ADD');
	doWork('MODIFY');
});*/
function setFocusIndex(index, curFocusObj) {
	// ACCOUNTING 화면때문에 고려. onblur판단하여 처리
	var strElekeyup = String(document.forms[0].elements[index].onkeyup);
	var strCurkeyup = String(curFocusObj.onkeyup);
	var iType = "";
	try{
		iType = docObjects[0].GetCellProperty(docObjects[0].GetSelectRow(), docObjects[0].GetSelectCol(), "Type");
	}catch(e){
	}
	
	if (strElekeyup.indexOf("mkDateFormat") == -1) {
		if(curFocusObj.name == document.forms[0].elements[index].name){
			index++;
		}
		document.forms[0].elements[index].focus();
		curFocusObj.focus();
	} else {
		if (strCurkeyup.indexOf("mkDateFormat") != -1 || iType == "Date") {
			mkDateFormatType(curFocusObj, event, true,1);
		}
	}
}

shortcut.add("Alt+Q",function() {
	 var divArr = $("div[name^=SheetName_]");
	 for(var i =0; divArr.length > i; i++){
		 var tSheet = eval(divArr[i].id.substr(4));
		 tSheet.SetEndEdit(1);
	 }
	try{
		//#23925 oyh 포커스 이동처리를 위해 현재 작업중인 Cell을 선택
		//docObjects[0].SelectCell(docObjects[0].GetSelectRow(),docObjects[0].GetSelectCol());
	}catch(e){
	}
	// 현재 포커스 위치
	var curFocusObj = document.activeElement;
	if (curFocusObj != null && typeof(curFocusObj.value) != 'undefined') {
		//Blur이벤트 발생시키기 위해
		for (var i = 0; i <document.forms[0].elements.length; i++ ) {
			if (document.forms[0].elements[i].type == "text" && !document.forms[0].elements[i].disabled) {	
				setFocusIndex(i,curFocusObj);
				break;
			}
		}
	} 
	
	// ※ 새로운 onBlur에 해당하는 함수에 대하여, 유효성 체크 후, return Value로 true/false를 판단하여 아래의 doWork를 실행해야함.
	// dateFmtOK(날짜 함수관련 Flag) : mkDateFormatType()함수에서 체크 후 false인 경우,하기 dowork()함수 실행 시키지 않음 
	// codeNameOK(코드 유효성 체크 함수 Flag) : codeNameAction()함수에서 체크 후 false인 경우,하기 dowork()함수 실행 시키지 않음 
	// setTimeout()함수 사용 이유 : onblur이벤트 발생시 mkDateFormatType()함수 또는 codeNameAction()에서 validation 체크 후,
	//                        리턴되는 결과값을 취득하는데 시간이 소요됨.
	setTimeout(
		function doWorkProcess() {
			if(window.top == window.self && window[_MTAB] != undefined) {
			    var tabIframe = window[_MTAB].GetTabIframe(-1);
			    tabIframe.contentWindow.doWork('SAVE');
			    tabIframe.contentWindow.doWork('ADD');
			    tabIframe.contentWindow.doWork('MODIFY');
			    tabIframe.contentWindow.doWork('CLOSE_MODIFY');
			} else {
				//if (dateFmtOK && codeNameOK) {	[20150107 OJG] Validation Remove
				doWork('SAVE');
				doWork('ADD');
				doWork('MODIFY');
				doWork('CLOSE_MODIFY');
			//}
			}
		},10);
	
});

shortcut.add("Alt+F1",function() {
	setTimeout(
		function doWorkProcess() {
			if(window.top == window.self && window[_MTAB] != undefined) {
			    var tabIframe = window[_MTAB].GetTabIframe(-1);
			    tabIframe.contentWindow.doWork('SEARCH');
			    tabIframe.contentWindow.doWork('SEARCHLIST');
			} else {
				doWork('SEARCH');
				doWork('SEARCHLIST');
			}		
		},100);
});

shortcut.add("Alt+W",function() {
	setTimeout(
		function doWorkProcess() {
			if(window.top == window.self && window[_MTAB] != undefined) {
			    var tabIframe = window[_MTAB].GetTabIframe(-1);
			    tabIframe.contentWindow.doWork('NEW');
			} else {
				doWork('NEW');
			}				
		},100);
});


shortcut.add("F2",function() {
	setTimeout(
			function doWorkProcess() {
				
				//window.top 은 browser 
				//window.self 은 현재 위치 

				//현재 위치가 browser일 경우
				if(window.top == window.self && window[_MTAB] != undefined) {

					//window[_MTAB].GetTabIframe(-1) 은 현재 열려 있는 tab(Iframe)입니다 
				    var tabIframe = window[_MTAB].GetTabIframe(-1);
				    
				    //현재 tab에서 함수 호출 
				    tabIframe.contentWindow.doWork('GOTOACCT');

				//현재 window.location이 현재 tab일 경우
				} else {
				    doWork('GOTOACCT');
				}
			},100);
	
});

shortcut.add("F8",function() {
	setTimeout(
		function doWorkProcess() {
			if(window.top == window.self && window[_MTAB] != undefined) {
			    var tabIframe = window[_MTAB].GetTabIframe(-1);
			    tabIframe.contentWindow.doWork('HBL_LIST');
			    tabIframe.contentWindow.doWork('MBL_LIST');
			} else {
				doWork('HBL_LIST');
				doWork('MBL_LIST');
			}			
		},100);
});

shortcut.add("Ctrl+Q",function() {
	 var divArr = $("div[name^=SheetName_]");
	 for(var i =0; divArr.length > i; i++){
		 var tSheet = eval(divArr[i].id.substr(4));
		 tSheet.SetEndEdit(1);
	 }
	try{
		//#23925 oyh 포커스 이동처리를 위해 현재 작업중인 Cell을 선택
		//docObjects[0].SelectCell(docObjects[0].GetSelectRow(),docObjects[0].GetSelectCol());
	}catch(e){
	}
	// 현재 포커스 위치
	var curFocusObj = document.activeElement;
	if (curFocusObj != null && typeof(curFocusObj.value) != 'undefined') {
		//Blur이벤트 발생시키기 위해
		for (var i = 0; i <document.forms[0].elements.length; i++ ) {
			if (document.forms[0].elements[i].type == "text" && !document.forms[0].elements[i].disabled) {	
				setFocusIndex(i,curFocusObj);
				break;
			}
		}
	} 
	
	// ※ 새로운 onBlur에 해당하는 함수에 대하여, 유효성 체크 후, return Value로 true/false를 판단하여 아래의 doWork를 실행해야함.
	// dateFmtOK(날짜 함수관련 Flag) : mkDateFormatType()함수에서 체크 후 false인 경우,하기 dowork()함수 실행 시키지 않음 
	// codeNameOK(코드 유효성 체크 함수 Flag) : codeNameAction()함수에서 체크 후 false인 경우,하기 dowork()함수 실행 시키지 않음 
	// setTimeout()함수 사용 이유 : onblur이벤트 발생시 mkDateFormatType()함수 또는 codeNameAction()에서 validation 체크 후,
	//                        리턴되는 결과값을 취득하는데 시간이 소요됨.
	setTimeout(
		saveCloseBtnClick()
//		function doWorkProcess() {
//			//if (dateFmtOK && codeNameOK) {	[20150107 OJG] Validation Remove
//				doWork('SAVE');
//				doWork('ADD');
//				doWork('MODIFY');
//				doWork('CLOSE_MODIFY');
//			//}
//		}
		,10);
	
//	setInterval(
//		function doWorkProcess() {
//			if(saveEndOK){
//				window.close();
//			}	
//		},1000);
});
shortcut.add("Alt+C",function() {
	 var prTab = parent.window[_MTAB];
	 prTab.DeleteItem(prTab.GetSelectedIndex(), true);
	 e.preventDefault();
});
shortcut.add("ctrl+1",function(e) {
	 var allTab = parent.window[_MTAB].GetCount();
	 var selTab = parent.window[_MTAB].GetSelectedIndex();
	 parent.window[_MTAB].SetSelectedIndex((selTab+1)%allTab);
	 parent.window.focus();
	 e.preventDefault();
});
//OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen
shortcut.add("F9", function(){
	setTimeout(
		function doWorkProcess(){
			if(window.top == window.self && window[_MTAB]){
				var tabIframe = window[_MTAB].GetTabIframe(-1);
				tabIframe.contentWindow.doWork('HBL_LIST');
			} else {
				doWork('HBL_LIST');
			}
		}
	,100);
});