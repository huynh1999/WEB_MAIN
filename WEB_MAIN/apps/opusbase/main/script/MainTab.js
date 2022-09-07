var tabObjects=new Array();
var tabCnt=0 ;
var _tabIdx = 1;
var dragging = 0;
var parentTabId = '';
var tabFocus = null;
var focusLR = ''; 
var tabOnLoadIdx = -1;

function setTabObject(tab_obj){
	tabObjects[tabCnt++]=tab_obj;
}

function loadPage() {
   for(k=0;k<tabObjects.length;k++){
       initTab(tabObjects[k],k+1);
       tabObjects[k].SetSelectedIndex(0);
   }
}

function ComTabObjectIB(tabid, sBaseColor, iWidth, iHeight, iVisible , nTabType , strTheme) {
	try {
		if (iWidth == undefined || iWidth == null) {
			iWidth = "100%";
		}
		if (iHeight == undefined || iHeight == null) {
			iHeight = parseInt($(window).height() - 60) + "px";
		}
		if (sBaseColor == undefined || sBaseColor == null)
			sBaseColor = "white";
		if (iVisible == undefined || iVisible == null)
			iVisible = true;

		var sTag = "";
		sTag += "<div class='cIBTabMainDiv' id='DIV_" + tabid + "' style='width:" + iWidth + ";height:" + iHeight +";'>\n";
		sTag += "<script>IBTab('" + tabid + "', '" + nTabType + "','" + iWidth + "','" + iHeight + "','" + strTheme + "'); </script>\n"
		sTag += "</div>\n";

		//<![CDATA[
	    document.write(sTag);
		//]]>

		window[tabid] =IBTabs[tabid];

		if (ComFuncCheck("setTabObject")){
			tabJson.push({"tabid":tabid , "sBaseColor":sBaseColor, "nTabType":nTabType});
			setTabObject(window[tabid]);
		}
		
	} catch (err) {
		ComFuncErrMsg(err.message);
	}
}

function tab_design_init(tabid, sBaseColor, nTabType){
	if(!window[tabid].bInitialize) {
		if (sBaseColor == undefined || sBaseColor == null)
			sBaseColor = "white";
		if (nTabType == undefined || nTabType == null)
			nTabType = 1;
	
		window[tabid].Init(nTabType , true , true, "", false, false, true);
		window[tabid].SetContentOutline(false);
		window[tabid].SetTabTitleAlign("center");
		window[tabid].SetSelectFontBold(true);
		// window[tabid].SetViewTabCount(10);
		window[tabid].SetTabItemLayout(1);
		window[tabid].SetTabUserWidth(170);
		var	opt_key = "TAB_MAX";
		ajaxSendPost(tabMaxCount, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}
}

function tabMaxCount(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	window[_MTAB].SetMaxCount(doc[1]);
}

var tabJson =[];
$(document).ready(function(){
	for( var k = 0 ; k < tabJson.length; k++){
		tab_design_init(tabJson[k].tabid , tabJson[k].sBaseColor, tabJson[k].nTabType );
	}
});
    
function initTab(tabObj , tabNo) {
	var referrer =  document.referrer;
	switch(tabNo) {
		case 1:
			with (tabObj) {
				if(!tabObj.bInitialize) {
					tab_design_init(_MTAB);
				}
				if(referrer == "" || referrer.split("/").pop() == "Login.usr" || referrer.split("/").pop() == "UserLogin.usr") {
					InsertItem2(0, "Main", "MainOld.clt");
					attachContextMenu();
					attachEventDragDrop(0);		
					addFocusArrowTab();
				}
			}
		break;
	}
	//console.log("Tab Version : " + tabObj.Version());
}

function IbTabM_OnBeforeDelete(index) {
	//Only allow deleting the new tab when loading
	if (window[_MTAB].GetCount() == 1 || (tabOnLoadIdx >= 0 && tabOnLoadIdx != index)) {
		window[_MTAB].AllowDelete(index, false);
	}
	else{
		//#5161 - [Binex test server] inner tab error
		window[_MTAB].AllowDelete(index, true);
	}
}

function IbTabM_OnAfterDelete(index) {
	tabOnLoadIdx = -1;
}

//#5663 [Webtrans] Inner Tab opening at the end
function IbTabM_OnTabItemCreate(curIdx, oldIdx) {
	//Move the new tab at last position to the right side of the active tab 
	window[_MTAB].MoveItem(curIdx, oldIdx + 1);	
	//Get new tab index 
	tabOnLoadIdx = oldIdx + 1;
}
//#5682 [Ocean Blue] Freight code dropdown not working sometimes in AR Entry (S)
function IbTabM_OnChange(curIdx, oldIdx) {	
	if(tabOnLoadIdx >= 0){ //If the new tab is loading
		window[_MTAB].SetSelectedIndex(tabOnLoadIdx);	
		return
	}
}

function IbTabM_OnLoadIFrame(index) {
	//The new tab loaded
	tabOnLoadIdx = -1;
}
//#5682 [Ocean Blue] Freight code dropdown not working sometimes in AR Entry (E)

//$(".btn_gnb_hide").on("click",function() {
//    $(".gnb_wrap").css('z-index',990);           
//    $("#cIBTabMainDiv").css('z-index',-99);           
//});
/*OFVFOUR-7545[NUEL EXPRESS] ISSUE WITH OPUS LOGISTICS MENU DISPLAY*/
function openTabByMenu(pageUrl, tabTitle, tabItemIdx) {
	hideMenu();
    addTabItem(pageUrl, tabTitle, tabItemIdx);
}

function openPageTab(pageUrl, tabTitle, tabItemIdx) {
    addTabItem(pageUrl, tabTitle, tabItemIdx);
}

function addTabItem(pageUrl, tabTitle, tabItemIdx) {
	if(!!tabItemIdx && tabItemIdx > 0) {
		if(window[_MTAB].aTabItemList[tabItemIdx].content_iframe_url != pageUrl) {
			window[_MTAB].SetTabUrl(tabItemIdx, pageUrl);
		}
		window[_MTAB].SetSelectedIndex(tabItemIdx);
	}
	else {
		IBTAB7_MSG_005 = "The maximum number of tabs(" + window[_MTAB].GetMaxCount() + ") has been reached.";
    	window[_MTAB].InsertItem2(_tabIdx++, tabTitle, pageUrl);
    	attachEventDragDrop(tabOnLoadIdx);
	}
    attachContextMenu();
    
}

function openTabInNewPage(pageUrl, tabTitle, isReloadTab) {
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    hideMenu();
    var tabForm = document.createElement("form");
    tabForm.setAttribute("method", "POST");
    tabForm.setAttribute("action", "Main.clt");
    tabForm.setAttribute("target", "_blank");
    document.body.appendChild(tabForm);

    setInput(tabForm, "pageUrl", pageUrl);
    setInput(tabForm, "tabTitle", tabTitle);
    tabForm.submit();
}

function setInput(tabForm, iName, iVal) {
    var fInput = document.createElement("input");
    fInput.setAttribute("type", "hidden");
    fInput.setAttribute("name", iName);
    fInput.setAttribute("value", iVal);
    tabForm.appendChild(fInput);
}

function hideMenu() {
//    $(".gnb_wrap").find(".gnb_now").removeClass("gnb_now");
//    $(".btn_gnb_hide").triggerHandler(eventType_click);
//    $(".gnb_wrap").stop().animate({
//        width:$(".gnb_list").outerWidth() + 2,
//        left:parseInt("-" + ($(".gnb_list").outerWidth() + 2))
//    },250);
	openAndCloseMenu(false, true);
}

$(function() {
    $.contextMenu(ctxMenu = {
		selector: '.context-menu-one',
        delay: 500,
        autoHide: true,
        callback: function(key, options) {
            window.console && console.log("clicked: " + key);
        },
        items: {
            "new_tab": {name: "Move to Browser Tab", icon: "fa-window-restore",
                disabled: function(key, opt) { 
                    return (window[_MTAB].GetCount() == 1);
                },
                callback: function(key, opt) {
					var tIdx = findTabItemIdx(this);
					var tabIfr = window[_MTAB].GetTabIframe(tIdx);
					var docLoc = tabIfr.contentWindow.document.location;
					openTabInNewPage(docLoc, window[_MTAB].GetTabTitle(tIdx), "false");  
					if(tIdx == 0) {
						window[_MTAB].AllowDelete(0, true);
					}
					window[_MTAB].DeleteItem(tIdx, true);
                }
            },
            "trefresh": {name: "Refresh", icon: "fa-refresh",
                callback: function(key, opt) {
					var tIdx = findTabItemIdx(this);
                    var tabIframe = window[_MTAB].GetTabIframe(tIdx);
                    tabIframe.contentWindow.document.location.reload(true);
                }
			},
			"sep1": "---------",
            "tabsRClose": {name: "Close Tabs to the Right", icon: "fa-arrow-right",
                disabled: function(key, opt) { 
                    return (window[_MTAB].GetCount() == 1);
                },
                callback: function(key, opt) {
					var tIdx = findTabItemIdx(this);
                    var curCount = window[_MTAB].GetCount() - tIdx;
                    for(i = 1; i < curCount; i++) {
                        window[_MTAB].DeleteItem(tIdx + 1, true);
                    }
                }
            },
            "tabsLClose": {name: "Close Tabs to the Left", icon: "fa-arrow-left",
                disabled: function(key, opt) { 
                    return (window[_MTAB].GetCount() == 1);
                },
                callback: function(key, opt) {
					var tIdx = findTabItemIdx(this);
                    while(tIdx > 0) {
						window[_MTAB].DeleteItem(0, true);
						tIdx--;
                    }
                }
            },
            "tabsEClose": {name: "Close Other Tabs", icon: "fa-arrows-h",
                disabled: function(key, opt) { 
                    return (window[_MTAB].GetCount() == 1);
                },
                callback: function(key, opt) {
					var tIdx = findTabItemIdx(this);
					var i = 0;
                    while(window[_MTAB].GetCount() > 1) {
						if(i == tIdx) {
							i = 1;
							continue;
						}
						tIdx--;
                        window[_MTAB].DeleteItem(i, true);
                    }
                }
			}
        }
    });

	/*
    $('.context-menu-one').on('click', function(e){
        console.log('clicked', this);
	})
	*/
});

function findTabItemIdx(thisObj) { 
	var tIdx = thisObj.attr("id").split("_").pop();
	return window[_MTAB].aTabItemList.findIndex(findItemIdx.bind(this, Number(tIdx)));
}

function findTabItemIdx2(tabId) { 
	if(tabId == undefined || tabId == "") return -1;
	var tIdx = tabId.split("_").pop();
	return window[_MTAB].aTabItemList.findIndex(findItemIdx.bind(this, Number(tIdx)));
}

function findItemIdx(val, element) { 
    return element.idx === Number(val); 
}

function attachContextMenu() {
    $("[id^='" + _MTAB + "_tabTitle']").addClass("context-menu-one");
}

function addFocusArrowTab(){
	tabFocus = document.createElement("div");
	tabFocus.classList.add("tabfocus");	
	tabFocus.id = 'tabfocus';
	document.body.appendChild(tabFocus);
}

function attachEventDragDrop(idx) {	
	//var idx = window[_MTAB].aTabItemList.length -1;
	//OFVFOUR-7940: [PQC][OEM B/L Entry] The system shows "System Error" when clicking OK button
	if(window[_MTAB].aTabItemList[idx]) {
		window[_MTAB].aTabItemList[idx].tab_div.setAttribute("draggable", "true");
		window[_MTAB].aTabItemList[idx].tab_div.setAttribute("ondragstart", "ibTabDrag(event)");
		window[_MTAB].aTabItemList[idx].tab_div.setAttribute("ondrop", "ibTabDrop(event)");
		window[_MTAB].aTabItemList[idx].tab_div.setAttribute("ondragover", "ibTabDragOver(event)");
		window[_MTAB].aTabItemList[idx].tab_div.setAttribute("ondragenter", "ibTabDragEnter(event)");
		window[_MTAB].aTabItemList[idx].tab_div.setAttribute("ondragleave", "ibTabDragLeave(event)");
		setDraggable(window[_MTAB].aTabItemList[idx].tab_div.childNodes);
	}
}

function setDraggable(elements){
	if(elements != undefined && elements.length > 0){
		for(var i=0; i < elements.length; i++){
			var element = elements[i];
			if(element instanceof Element || element instanceof (typeof HTMLElement !== "undefined" ? HTMLElement : Element)){
				element.setAttribute("draggable", "false");
				if(element.childNodes.length > 0)
					setDraggable(element.childNodes);
			}
		}
	}
}

function findParentTab(element){
	if(element.parentElement == undefined ||  element.id.indexOf("_IbTabM") > -1){
		parentTabId = element.id;
		return parentTabId;
	}else{
		findParentTab(element.parentElement);
	}
}

function ibTabDragOver(e) {	
	var divTab = document.getElementById(parentTabId);
	var clientRect = divTab.getBoundingClientRect();
	if(clientRect.left +  clientRect.width / 2 > e.pageX){
		tabFocus.style.left = clientRect.left - 3 + "px";
		focusLR = 'L';
	}else{
		tabFocus.style.left = clientRect.left + clientRect.width - 13 + "px";
		focusLR = 'R';
	}
	e.preventDefault();
	return false;
}

function ibTabDrag(e) {
	e.dataTransfer.setData("text", e.target.id);
}

function ibTabDragEnter(e) {
	dragging++;
	findParentTab(e.target);
	tabFocus.style.display = "block";
	e.stopPropagation();
	e.preventDefault();
	return false;
}

function ibTabDragLeave(e) {	
	dragging--;
	if(dragging == 0){	
		findParentTab(e.target);
		tabFocus.style.display = "none";
	}
	e.stopPropagation();
	e.preventDefault();
	return false;
}

function ibTabDrop(e) {
	e.preventDefault();			
	dragging = 0;
	tabFocus.style.display = "none";
	var tabFromId = e.dataTransfer.getData("text");
	var idxFrom = findTabItemIdx2(tabFromId);	
	var idxTo =  -1;	
	if(e.target.id != undefined && e.target.id != ''){		
		idxTo =  findTabItemIdx2(e.target.id)
	}else{
		//If element has not id value
		findParentTab(e.target);
		idxTo =  findTabItemIdx2(parentTabId);
	}
	if(idxFrom == -1 || idxTo == -1 ||(idxFrom - idxTo == 1 && focusLR == 'R') || (idxFrom - idxTo == -1 && focusLR == 'L')) return;
	window[_MTAB].MoveItem(idxFrom, idxTo);		
	return false;
}

/*OFVFOUR-7545[NUEL EXPRESS] ISSUE WITH OPUS LOGISTICS MENU DISPLAY*/
function openAndCloseMenu (isShow ,isSetWidth, event){
	$(".gnb_wrap").css( 'z-index' , 990);
	$("#cIBTabMainDiv").css( 'z-index', -99);
	$(".gnb_wrap").css({ paddingTop: $(".page_title_area").outerHeight() + utilBar_H - 1});
	$(".btn_gnb_hide").attr("disabled", true)
	var objAnimate = {
			left: 0
	}
	if (!isShow){
		$(".gnb_wrap").find(".gnb_now").removeClass("gnb_now");
		objAnimate.left = parseInt("-" + ($(".gnb_wrap").outerWidth() + 2));
	}	
	if (isSetWidth){
		objAnimate.width = $(".gnb_list").outerWidth() + 2;
	}
	$(".gnb_wrap").stop().animate(objAnimate, 250);
	$(".btn_gnb_hide").attr("disabled", false);
}
