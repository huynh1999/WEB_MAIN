var _FrameWait=null;

/**
 * 함수명 : waitAndCallFunc
 * 기능 :
 *    화면을 대기(Waiting) 상태로 변경하고, 특정 javascript Function을 호출할 경우 사용
 *    Function 종료시 자동으로 대기 상태 원복됨
 * 파라미터(Parameter)
 *    - func : 호출할 Function 명
 *    - bOpenLayer : Waiting 이미지 표시 여부
 * 호출예 : waitAndCallFunc("setBkgCargo()", true);
 * @param func:공통으로 적용되어야할 함수명, bOpenLayer:Waiting 이미지 표시 여부
 * @return
 */
function waitAndCallFunc(func, bOpenLayer) {
	zu_openRunning(true, bOpenLayer);
	setTimeout(func+";zu_openRunning(false);", 1000)
}

/**
 * 함수명 : zu_openRunning
 * 기능 :
 *    화면을 대기(Waiting) 상태로 변경 / 원복
 * 호출예 : waitAndCallFunc("setBkgCargo()", true);
 * @param flag:대기모드(true)/해제(false), bOpenLayer:Waiting 이미지 표시 여부
 * @return
 */
function zu_openRunning(flag, bOpenLayer){

  if(document.getElementById('__FrameWaitIframe__')==null&&flag)
  {
    if(!flag)return;
    var currentW=document.body.clientWidth;
    var currentH=document.body.clientHeight;

    var msgW=348;
    var msgH=126;
	
    if(currentW <msgW)
    	var leftPos=0;
    else 
    	var leftPos=currentW/2-msgW/2;
    if(currentH <msgH)
    	var topPos=0;
    else 
    	var topPos=currentH/2-msgH/2 + document.body.scrollTop;
	
    var _FrameWait=document.createElement("<div id='FrameWait' style='z-index:999; position:absolute;display:none;'></div>");
    document.body.insertBefore(_FrameWait);
    
    var _WaitImage=document.createElement("<div id='WaitImage' style='z-index:1000;position:absolute;left:"+leftPos+";top:"+topPos+";display:inline;'></div>");
	document.body.insertBefore(_WaitImage);
	
    var wait = "<iframe id='__FrameWaitIframe__' allowtransparency='true' style='position:absolute;' ";
    wait		+= " frameBorder='0' scrolling='no' src='./js/common/wait.html'></iframe>";
    wait		+= "<table border=0 bordercolor=red cellspacing=0 id='contents' style='position:absolute;'>";
    wait		+= "<tr>";
    wait		+= "<td valign='center' align='center'>&nbsp;</td>";
    wait		+= "</tr>";
    wait		+= "</table>";
    
    _FrameWait.innerHTML=wait;
	
	var waitImage = "<IFRAME id='__WaitImgIframe__' marginwidth=0 marginheight=0 frameborder=0 width="+msgW+"px height="+msgH+"px style='visibility:visible;' src='//js/common/wait.html'/>";
	_WaitImage.innerHTML=waitImage;
  }

  if(flag)
  {
    window.defaultStatus="Processing......";
    window.status="Processing......";
    window.document.body.style.cursor="wait";

	var divTag = document.getElementById("FrameWait");
	var iFrameTag = document.getElementById("__FrameWaitIframe__");
	var tableTag = document.getElementById("contents");
	var waitImage = document.getElementById("WaitImage");

	divTag.style.left=0;
	divTag.style.top=0;
	divTag.style.width=currentW;
	divTag.style.height=currentH;

	iFrameTag.style.left = 0;
	iFrameTag.style.top = 0;
	iFrameTag.style.width = divTag.style.width;
	iFrameTag.style.height = divTag.style.height;
	iFrameTag.style.zIndex = divTag.style.zIndex-1;

	tableTag.style.left = 0;
	tableTag.style.top = 0;
	tableTag.style.width = divTag.style.width;
	tableTag.style.height = divTag.style.height;
	tableTag.style.zIndex = divTag.style.zIndex;

	tableTag.style.backgroundColor="#BEDDFC";
	
	divTag.style.filter="alpha(opacity=10)";
	
	divTag.style.display = "block";
	
	if(bOpenLayer != null && !bOpenLayer) {
		waitImage.style.display = "none";
	}
	
	// Waiting Layer Load 체크 
	// - setTimeout으로는 해결방안이 없어, pause() 메소드를 사용 (sleep 기능)
	if(wait_IsIE()) {
    	if(wait_getIeVer() < 7) {	// Explorer 7.0 미만
			var bLoadComplete = checkLayerLoad();
			while(!bLoadComplete) {
				pauseInScreen(100);
				bLoadComplete = checkLayerLoad();
			}
    	}
	}
  } 
  else if(document.all.FrameWait)
  {
    window.defaultStatus="";
    window.status="";
    window.document.body.style.cursor="default";

	var divTag = document.getElementById("FrameWait");
	var waitImage = document.getElementById("WaitImage");
	
	divTag.removeNode(true);
	waitImage.removeNode(true);
  }
}

function checkLayerLoad() {	
	var bLoadComplete = false;
	
	var divTag = document.getElementById("FrameWait");
	var iFrameTag = document.getElementById("__FrameWaitIframe__");
	var tableTag = document.getElementById("contents");
	var divWaitImage = document.getElementById("WaitImage");
	var waitImage = document.getElementById("__WaitImgIframe__");
	
	if(divTag.readyState == "complete") {
		bLoadComplete = true;
	} else {
		bLoadComplete = false;
	}
	
	if(iFrameTag.readyState == "complete") {
		bLoadComplete = true;
	} else {
		bLoadComplete = false;
	}
	
	if(tableTag.readyState == "complete") {
		bLoadComplete = true;
	} else {
		bLoadComplete = false;
	}
	
	if(divWaitImage.readyState == "complete") {
		bLoadComplete = true;
	} else {
		bLoadComplete = false;
	}
	
	if(waitImage.readyState == "complete") {
		bLoadComplete = true;
	} else {
		bLoadComplete = false;
	}
	
	return bLoadComplete;
	
	/*if(!bLoadComplete) {
		setTimeout("checkLayerLoad()", 1000);		
	}*/
}	
	
/**
 *@description pause( iMilliseconds ) Cause the single Javascript thread 
 * to hald/pause/sleep/wait for a specified period of time, by opening in modalDialog window 
 * (IE only) that modally locks the browser until it returns.  This modal dialog is not 
 * opened to any page, but uses the Javascript: protocol to execute a javascript setTimeout.  
 * In this modal context the setTimeout, has the desired affect of preventing any other script
 * execution.  The sole purpose of the timeout execution script is to close the modal dialog 
 * which will return control/unluck the browser.  The intention was to find a way to allow 
 * the UI to be updated and rendered in the middle of function/method without the need to 
 * split the method up, remove nested calls, or use closures.  Used in this fashion to update 
 * the UI, a 0 (zero) is usually passed (or optionally omitted altogether) so that the only 
 * delay is for the UI to render.
 *@version Note Please be aware that the user interface WILL update its rendering 
 * (if you've made and DOM/CSS/Text changes they will appear) and this may significantly slow 
 * down program execution if looping.
 *@keywords pause sleep wait halt javascript show modal dialog set timeout multi-threaded single thread
 *@version 1.2
 * @param {Object} iMilliseconds [optional] the number of milliseconds the code will pause before returning - If no value is passed the code will returned immediately (as if a 0 were passed)
 * @return undefined  there is no return value from this function
 */
function pauseInScreen(iMilliseconds) {
    // For IE5.
//    if(wait_IsIE()) {
//    	if(wait_getIeVer() < 7) {	// Explorer 7.0 미만
    		var sDialogScript = 'window.setTimeout( function () { window.close(); }, ' + iMilliseconds + ');';
	    	var result = window.showModalDialog('javascript:document.writeln ("<script>' + sDialogScript + '<' + '/script>")');
//    	} else {					// Explorer 7.0
//    		var WScript = new ActiveXObject("WScript.Shell");
//	     	WScript.Sleep(100);
			    		
//    		var arrArg = new Array(1);
//		    arrArg[0] = iMilliseconds;
//		    
//		    var sFeatures="dialogWidth:0px;dialogHeight:0px;";
//		    window.showModalDialog("/hanjin/script/wait.html", arrArg, sFeatures);
//    	}
//    }
}

function wait_IsIE() { 
	var browser = navigator.appName;
	return browser == "Microsoft Internet Explorer";
}

function wait_getIeVer() { 
	var rtn = 0;
	
	var appVer = navigator.appVersion;
	var idx   = 0;
	idx = appVer.indexOf('MSIE');
	if(idx >= 0 && appVer.length >= idx+8){
		rtn   = parseFloat(appVer.substring(idx+4,idx+8));
	}
	
	return rtn;
}