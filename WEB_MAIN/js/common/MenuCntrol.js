/** Application명 **/
/*
var values = location.pathname.split("/");
var contextRoot =  values[1];
var APP_PATH = "/"+contextRoot;*/ 

if (typeof window.attachEvent=='object'){
document.write('<!--[if lte IE 6]>\n'+
'<script type="text/javascript">\n'+
'var ie6_or_less=1;\n'+
'<\/script>\n'+
'<![endif]-->\n'+
'<!--[if lt IE 5.5]>\n'+
'<script type="text/javascript">\n'+
'var less_than_ie5_5=1;\n'+
'<\/script>\n'+
'<![endif]-->')
}
var menu=[], resizereinit=true;
function truebody(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
}
function getedge(o, is_top){
	var edge;
	if (is_top){
		edge=window.pageYOffset? window.pageYOffset : truebody().scrollTop? truebody().scrollTop : 0;
	}else{
		edge=o.menupos=='left'? 0 : truebody().clientWidth? truebody().clientWidth : window.innerWidth&&truebody().offsetHeight<=window.innerHeight? window.innerWidth :  window.innerWidth? window.innerWidth-20 : 0;
		edge+=window.pageXOffset? window.pageXOffset : truebody().scrollLeft? truebody().scrollLeft: 0;
	}
	return edge;
}
function keep_in_view(o){
	if(o.keepinview){
	if(o.m.ft){
		o.m.ft=0;
		o.m.topP=o.m.offsetTop;
		o.m.ltop=0;
	}
	var pt=getedge(o, 'top'), ks=typeof o.keepinview=='number'&&o.keepinview<o.m.topP&&o.keepinview>0? o.keepinview : o.m.topP, smooth=0;
	if (pt!=o.m.ltop){
		if(o.menupos=='top')
			o.m.style.visibility='hidden';
			smooth=pt>o.m.topP-ks? .2 * (pt - o.m.ltop - o.m.topP + ks) : o.m.ltop>0? -.2 * o.m.ltop : 0;
			smooth=smooth > 0 ? Math.ceil(smooth) : Math.floor(smooth);
		}else if(o.menupos=='top')
			o.m.style.visibility='';
			o.m.style.top=(o.m.style.top? parseInt(o.m.style.top) : o.m.topP)+smooth+'px';
			o.m.ltop += smooth;
	}
	if(o.menupos=='top'){
		if(typeof o.menuleft=='string'){
			o.m.style.left=o.menuleft
			o.m.style.marginLeft=Math.floor(o.m.getElementsByTagName('div')[0].offsetWidth/-2)+'px';
			o.lleft=o.m.offsetLeft;
		}
		o.m.style.marginLeft=0;
		o.m.style.left=o.lleft+(window.pageXOffset? window.pageXOffset : truebody().scrollLeft? truebody().scrollLeft: 0)+'px';
	}else{
		o.m.style.left=getedge(o)-(o.menupos=='right'? o.m.offsetWidth : 0)+'px';
	}
}
var fr;		//Back-ground Iframe
var frTab;	// Tab용 Iframe
function moveToInside(el, num){
	var lftNum=parseInt(el.getElementsByTagName('div')[0].style[el.menupos])+num;
	var tabNum=(lftNum+146)+'px';
	lftNum+='px';
	el.getElementsByTagName('div')[0].style[el.menupos]=lftNum;
	if(fr==null){
		fr=document.getElementById('dispFr');		
	}
	if(frTab==null){
		frTab=document.getElementById('dispFr2');		
	}
	frTab.style.left=tabNum;
	fr.style.left=lftNum;
	el.moving=setTimeout(function(){movein(el)},   el.menuspeed)
}
function moveToOutside(el, num){
	var lftNum=parseInt(el.getElementsByTagName('div')[0].style[el.menupos])+num;
	var tabNum=(lftNum+148)+'px';
	lftNum+='px';
	el.getElementsByTagName('div')[0].style[el.menupos]=lftNum;
	if(fr==null){
		fr=document.getElementById('dispFr');		
	}
	if(frTab==null){
		frTab=document.getElementById('dispFr2');		
	}
	if(lftNum=='-141px'){
		fr.style.left='-149px';
		frTab.style.left='0px';
	}else{
		fr.style.left=lftNum;
		frTab.style.left=tabNum;
	}
	el.moving=setTimeout(function(){moveout1(el)}, el.menuspeed)
}
function movein(el){
	var m1=parseInt(el.getElementsByTagName('div')[0].style[el.menupos]);
	if(el.moving){
		clearTimeout(el.moving);
	}
	if (m1<-1*el.borderwidth){
		moveToInside(el, Math.min(-1*m1-el.borderwidth, 10));
	}
}
function moveout(el){
	if(el.moving)
		clearTimeout(el.moving);
	el.moving=setTimeout(function(){moveout1(el)}, el.menupause);
}
function moveout1(el){
	var aw=el.menupos=='top'? el.b.offsetHeight : el.b.offsetWidth, m1=el.getElementsByTagName('div')[0];
	if(el.moving)
		clearTimeout(el.moving);
	if (parseInt(m1.style[el.menupos])>aw-(el.menupos=='top'? m1.offsetHeight : m1.offsetWidth)+10){
		moveToOutside(el, -10);
	}else {
		m1.style[el.menupos]=aw-(el.menupos=='top'? m1.offsetHeight : m1.offsetWidth)+'px';
		if(el.menupos=='right'){
			el.style.width=aw+'px';
			if(el.kviewtype=='absolute'){
				var ed=truebody().clientWidth? truebody().clientWidth : window.innerWidth&&truebody().offsetHeight<=window.innerHeight? window.innerWidth :  window.innerWidth? window.innerWidth-20 : 0;
				ed+=window.pageXOffset? window.pageXOffset : truebody().scrollLeft? truebody().scrollLeft: 0;
				el.style.left=ed-el.offsetWidth+'px';
			}
		}
	}
}
//###########################################한번에 Tab 숨기기 시작###########################################
var tabClick=false;
function doWorkMemu(){
	if(tabClick){
		tabClick=false;
		moveToOutsideAtOnce(menu1);
	}else{
		tabClick=true;
		moveinAtOnce(menu1);
	}
}
function doWorkMemuOnly(){
	tabClick=true;
	moveinAtOnce(menu1);
	/*
	if(tabClick){
		tabClick=false;
		moveToOutsideAtOnce(menu1);
	}else{
		tabClick=true;
		moveinAtOnce(menu1);
	}
	*/
}
function moveToOutsideAtOnce(el){
	if(frTab==null){
		frTab=document.getElementById('dispFr2');		
	}
	if(fr==null){
		fr=midFr.mainFrSet;
	}
	frTab.style.left='0px';
	fr.cols='0px,*';
	el.getElementsByTagName('div')[0].style[el.menupos]=-147;
}
function moveinAtOnce(el){
	if(frTab==null){
		frTab=document.getElementById('dispFr2');		
	}
	if(fr==null){
		fr=midFr.mainFrSet;
	}
	frTab.style.left='146px';
	fr.cols='147px,*';
	el.getElementsByTagName('div')[0].style[el.menupos]=-1;
}
//###########################################한번에 Tab 숨기기 끝###########################################
function to_em(n, o){
	return Math.round((n/(16*parseInt(o.fontsize)/100))*1000)/1000;
}
function getrows(o){
	var r=o.menuItems.length+(o.wrapbar? 1 : 0);
	for (var i_tem=0; i_tem < o.menuItems.length; i_tem++)
		if (o.menuItems[i_tem][4]&&o.menuItems[i_tem][4]=='no')
			r--;
	return r;
}
function make_style(o){
	if(o.user_defined_stylesheet&&!o.design_mode)
	return '';
	var sheet='body { margin: 0px; }'
	sheet+='#'+o.id+' {\n'+
		(o.menupos=='top'? 'top:0;\n' : 'top:'+o.menutop+'px; /*set initial Height from top*/\n')+
		(o.menupos=='top'? 'left:'+o.menuleft+(typeof o.menuleft=='number'? 'px' : '')+';\n' : '')+
		(o.menupos=='right'&&o.kviewtype=='fixed'? 'right:0;\n' : '')+
		'position:'+o.kviewtype+';\n'+
		'overflow:'+(o.menupos=='right'? 'hidden' : 'visible')+';\n'+
		'z-index:100;\n'+
		 'height:100%;\n'+
	'}\n'+
	'#'+o.id+' div {\n'+
		'border-width:'+(typeof o.outbrdwidth=='number'? o.outbrdwidth+'px' : o.outbrdwidth)+'; /*Menu\'s outer border*/\n'+
		'border-style:'+o.outbrdstyle+';\n'+
		(o.outbrdcolor=='none'? '' : 'border-color:'+o.outbrdcolor+';\n')+
		'position:absolute;\n'+
		'color:black;\n'+
		'background-color:transparent;\n'+
	'}\n'+
	'.left_menu_1th { '+
		'font-family: Tahoma, Arial, Helvetica; '+
		'font-size: 13px; '+
		'font-weight: bold; '+
		'color: #FFFFFF; '+
		'height: 19px; '+
		'background-image: url('+APP_PATH+'/web/img/left/left_1thmenu_bg.gif); '+
		'background-repeat: repeat-x; '+
		'text-indent: 10px; '+
		'vertical-align: middle; '+
	'} '+
	'.left_menu_nochoice { '+
		'font-family: Tahoma, Arial, Helvetica; '+
		'font-size: 11px; '+
		'font-weight: bold; '+
		'color: #4860a5; '+
		'text-decoration: none; '+
		'height: 15px; '+
		'vertical-align: baseline; '+
		'background-color: #F1F0EF; '+
		'padding-left: 10px; '+
	'} '+
	'.left_menu_choice { '+
		'font-family: Tahoma, Arial, Helvetica; '+
		'font-size: 11px; '+
		'font-weight: bold; '+
		'color: #7a03e0; '+
		'text-decoration: none; '+
		'height: 19px; '+
		'padding-top: 5px; '+
		'padding-bottom: 0px; '+
		'vertical-align: baseline; '+
		'padding-right: 0px; '+
		'padding-left: 10px; '+
		'background-repeat: repeat-x; '+
		'background-color: #F1F0EF; '+
	'} '+
	'.left_submenu { '+
		'-ms-word-wrap:break-word;'+
		'font-family: Tahoma, Arial, Helvetica; '+
		'font-size: 11px; '+
		'font-weight: normal; '+
		'color: #4860a5; '+
		'text-decoration: none; '+
		'height: 10px; '+
		'width: 120px; '+
		'vertical-align: middle; '+
		'background-color: #F1F0EF; '+
	'} '+
	'.logon_id { '+
		'font-family: Tahoma, Arial, Helvetica; '+
		'font-size: 11px; '+
		'color: #616675; '+
		'font-weight: normal; '+
		'text-align: left; '+
		'line-height: 100%; '+
		'padding-left: 5px; '+
	'} ';
/*	
	if(o.design_mode){
		if(document.getElementById('ooostyle'))
			alert('Only one menu\'s script generated styles may be displayed at a time!\n\nCurrently showing '+document.getElementById('ooostyle').tell+'\'s stylesheet\n\n(or there is a syntax error - most\n\u00a0\u00a0\u00a0\u00a0likely in the menuItem.js file)');
		else{
			document.write('<textarea id="ooostyle" cols="40" rows="65" wrap="off" style="margin-left:50px;overflow:auto;position:absolute;top:10px;left:50%;z-index:1000;">\n');
			document.write('</textarea>')
			document.getElementById('ooostyle').tell=o.id;
		}
	}
	ooostyle.value=sheet;
*/
	if(!o.user_defined_stylesheet)
		return '<style type="text/css">\n'+sheet+'</style>';
	return '';
}
function make_style_make_menu(o, s){
	//메뉴스타일 적용
	if(s){
		if(!o.id) {alert('a unique id is required for each menu');return;};
		if(!o.menuItems||o.menuItems.constructor!=Array) {alert('an array of menu items is required for each menu');return;};
		if(!o.menutop) {o.menutop=54};
		if(!o.menuleft) {o.menuleft='50%'};
		if(!o.keepinview&&typeof o.keepinview=='boolean')
		o.keepinview=false;
		else if(!o.keepinview) {o.keepinview=30};
		if(!o.menuspeed) {o.menuspeed=20};
		if(!o.menupause) {o.menupause=500};
		if(!o.d_colspan) {o.d_colspan=2};
		if(!o.allowtransparent) {o.allowtransparent=false};
		if(!o.barwidth) {o.barwidth=22};
		if(!o.hdingwidth) {o.hdingwidth=0};
		if(!o.hdingheight) {o.hdingheight=22};
		if(!o.hdingindent) {o.hdingindent=1};
		if(!o.linkheight) {o.linkheight=16};
		if(!o.outbrdwidth) {o.outbrdwidth=0};
		if(!o.outbrdcolor) {o.outbrdcolor="none"};
		if(!o.outbrdstyle) {o.outbrdstyle="none"};
		if(!o.borderwidth) {o.borderwidth=1};
		if(!o.bordercolor) {o.bordercolor="none"};
		if(!o.borderstyle) {o.borderstyle="solid"};
		if(!o.barcolor) {o.barcolor="white"};
		//if(!o.barbgcolor) {o.barbgcolor="#444444"};
		if(!o.barfontweight) {o.barfontweight="bold"};
		if(!o.baralign) {o.baralign="center"};
		if(!o.menufont) {o.menufont="verdana"};
		if(!o.fontsize) {o.fontsize="80%"};
		if(!o.hdingcolor) {o.hdingcolor="white"};
		//if(!o.hdingbgcolor) {o.hdingbgcolor="#170088"};
		if(!o.hdingfontweight) {o.hdingfontweight="bold"};
		if(!o.hdingvalign) {o.hdingvalign="middle"};
		if(!o.hdingtxtalign) {o.hdingtxtalign="left"};
		if(!o.linktopad) {o.linktopad=0};
		if(!o.linktxtalign) {o.linktxtalign="left"};
		if(!o.linktarget) {o.linktarget=""};
		if(!o.menupos) {o.menupos="left"};
		if(!o.bartext) {
			//o.bartext = "SIDE MENU"
			var sideMsg='<img src="'+APP_PATH+'/web/img/left/toggle1.gif"   onclick="" style="cursor:hand;" width="14" height="26" vspace="1" border="0"><br>';
			sideMsg+= '<img src="'+APP_PATH+'/web/img/left/toggle_home.gif"   onclick="" style="cursor:hand;" width="14" height="39" vspace="1" border="0"><br>';
			sideMsg+= '<img src="'+APP_PATH+'/web/img/left/toggle_logout.gif" onclick="" style="cursor:hand;" width="14" height="48" vspace="1" border="0"><br>';
			sideMsg+= '<img src="'+APP_PATH+'/web/img/left/toggle_help.gif"   onclick="" style="cursor:hand;" width="14" height="34" vspace="1" border="0"><br>';
			o.bartext=sideMsg;
		};
		if(!o.user_defined_stylesheet) {o.user_defined_stylesheet=false};
		if(!o.user_defined_markup) {o.user_defined_markup=false};
		if(!o.design_mode) {o.design_mode=true};
		if(!o.wrapbar) {o.wrapbar=false};
		if(!o.kviewtype) {o.kviewtype='absolute'};
		if(typeof ie6_or_less!='undefined')
			o.kviewtype='absolute';
		else if(o.menupos=='top'&&o.kviewtype=='absolute')
			o.kviewtype='fixed';
		//메뉴표시
		if(o.menuItems.length>0){
			while(!o.menuItems[o.menuItems.length-1]){
				o.menuItems.length=o.menuItems.length-1;
			}
		}
		document.write(make_style(o));
		return;
	//실재메뉴
	}else {
		if(o.design_mode||!o.user_defined_markup){
			var hw=o.hdingwidth;
			//var ifm = "<iframe id='dispFr'  src='./blankblue.screen' scrolling='no' frameborder='0' style='margin-top:54px;position:absolute;width:148px; height: 100%; top:0px;border:none;display:block;left:-212px'></iframe>";
			//ifm += "   <iframe id='dispFr2' src='./tabMenu.screen'   scrolling='no' frameborder='0' style='margin-top:54px;position:absolute;width:16px; height: 158px; top:0px;border:none;display:block;left:0px'></iframe>";
			/*
			var ifm="   <iframe id='dispFr2' src='./tabMenu.screen'   scrolling='no' frameborder='0' style='margin-top:54px;position:absolute;width:16px; height: 158px; top:0px;border:1;display:block;left:0px'></iframe>";
			document.write(ifm);
			var e;
			var tb='<div id="'+o.id+'"><div>\n';
			tb+='<table width="130" border="0" height="300" bordercolor="#666666" cellspacing="0" cellpadding="0" bgcolor="#F4F4F4"> \n';
			tb+='	<tr> \n';
			tb+='   	<td width="130" valign="top"> \n';
			//tb+='       	<table id="innerTbl" width="148" onmouseover="movein(menu1);" onmouseout="moveout(menu1);"> \n';
			tb+='       	<table id="innerTbl" width="148"> \n';
			tb+='        		<tr> \n';
			tb+='        			<td align="center" valign="top"> \n';
			tb+='        				<table width="103" border="0" cellpadding="0" cellspacing="0"> \n';
			tb+='        					<tr> \n';
			tb+='        						<td width="100" height="10" align="right" valign="top"></td> \n';
			tb+='	        				</tr> \n';
			tb+='   	     				<tr> \n';
			tb+='       	 					<td width="100" align="center" valign="bottom"><img src="'+APP_PATH+'/web/img/left/left_id_top.gif"></td> \n';
			tb+='        					</tr> \n';
			tb+='        					<tr> \n';
			tb+='        						<td align="center" valign="top" background="'+APP_PATH+'/web/img/left/left_id_bg.gif"> \n';
			tb+='        							<table width="95%" border="0" cellspacing="5" cellpadding="0"> \n';
			tb+='        								<tr> \n';
			tb+='        									<td class="logon_id" align="center">ID : ';
			tb+= userId;
			tb+='        									</td> \n';
			tb+='        								</tr> \n';
			tb+='        							</table> \n';
			tb+='        						</td> \n';
			tb+='        					</tr> \n';
			tb+='        					<tr> \n';
			tb+='        						<td width="100" align="right" valign="top"><img src="'+APP_PATH+'/web/img/left/left_id_bottom.gif"></td> \n';
			tb+='        					</tr> \n';
			tb+='        					<tr><td height="10px;"></td></tr> \n';
			tb+='        				</table> \n';
			tb+='       	 			<table  border="0" width="130"  border="0"> \n';
			tb+= '      			       <tr> ';
			tb+= '      				    <td id="menuSpace"></td> ';
			tb+= '      			       </tr> ';
			tb+= '      			</table> \n';
			tb+= '				</td> \n';
			tb+= '  		</tr>  \n';
			tb+= '  	</table>  \n';
			tb+= '  </td>  \n';
			tb+= '  <td id="menu1bar" width="1" bgcolor="#FFFFFF" valign="top"></td> \n';
			tb+= '</tr> \n';
			document.write(tb+'</table></div></div>');
			*/
			/*
			if(o.design_mode){
				document.getElementById('ooostyle').value+='\n\n<!-- The Markup for '+o.id+' -->\n\n'+tb+'</table></div></div>\n\n<!-- End '+o.id+'\'s Markup -->'
			}
			*/			
			//o.m=document.getElementById(o.id);
			//var b=document.getElementById(o.id+'bar');
			//o.m.b=b;
			//o.m.ft=1;
			//o.m.menupos=o.menupos;
			//o.m.menupause=o.menupause;
			///o.m.menuspeed=o.menuspeed;
			//o.m.borderwidth=o.borderwidth;
			//o.m.kviewtype=o.kviewtype;
			//resizevent(o);
		}
	}
}
function resizevent(o){
	var m1=o.m.getElementsByTagName('div')[0], bo=o.menupos=='top'? o.m.b.offsetHeight : o.m.b.offsetWidth;
	m1.style[o.menupos]=bo-(o.menupos=='top'? m1.offsetHeight : m1.offsetWidth)+'px'
	if(o.menupos=='right'){
		if(o.kviewtype=='absolute')
			o.m.style.left=getedge(o)-o.m.offsetWidth+'px';
		o.m.style.width=bo+'px';
		o.m.SetSheetHeight(m1.offsetHeight+'px');
		if(typeof less_than_ie5_5!='undefined'){
			o.m.onmouseover(o.m);
			o.m.onmouseout(o.m);
		}
	}
	if(o.menupos=='top'){
		o.m.style.width=m1.style.width=o.m.getElementsByTagName('table')[0].offsetWidth+'px';
		if(typeof o.menuleft=='string')
			o.m.style.marginLeft=Math.floor(m1.offsetWidth/-2)+'px';
	}
}
var ontextresizeLastSize=false;
if (window.attachEvent) window.attachEvent("onload", initOntextresizeListener);
else if (window.addEventListener) window.addEventListener("load", initOntextresizeListener, false);
function initOntextresizeListener() {
	if(!resizereinit||typeof less_than_ie5_5!='undefined')
		return;
	var testDiv=document.createElement("div");
	testDiv.style.position="absolute";
	testDiv.SetSheetHeight("1em");
	testDiv.style.width="1em";
	testDiv.style.top="-2em";
	testDiv.style.left="-2em";
	var docTestDiv=document.body.appendChild(testDiv);
	docTestDiv.id="ontextresizeTestDiv";
	ontextresizeListener=setInterval("ontextresizeCheckTestDiv()",100);
}
function ontextresizeCheckTestDiv() {
	if (ontextresizeLastSize!=document.getElementById("ontextresizeTestDiv").offsetWidth) {
		if (ontextresizeLastSize && window.ontextresize) window.ontextresize.call();
		ontextresizeLastSize=document.getElementById("ontextresizeTestDiv").offsetWidth;
	}
}
window.ontextresize=function(){
	for (var i_tem=0; i_tem < menu.length; i_tem++)
		if(typeof menu[i_tem]!='undefined')
			resizevent(menu[i_tem]);
};
function make_menus(){
	if(document.getElementById){
		make_style_make_menu(menu[1], 's');			
		make_style_make_menu(menu[1]);
	}
}
function callTabObj(){
	movein(menu1);
}
function getBtnObj(strKey){
	if(document.getElementById(strKey) == null || document.getElementById(strKey) == 'undefined' || document.getElementById(strKey) == undefined){
		return document.getElementById("hiddenButton");
	}else{
		return document.getElementById(strKey);
	}
}
function getObj(strKey){
	return document.getElementById(strKey);
}



var oldKey=-1;
var imgObj;
var midObj;
var subObj;
var oldPgm;	//프로그램 선택시 표시	
function setOldKeyClear(){
	oldKey=-1;
}
function showSubOwn(key){
    //이전에 선택된 내용이 없는경우
    midObj=getObj('mid'+key);
    imgObj=getObj('img'+key);
    subObj=getObj('sub'+key);
    //Submenu가 열려있는 경우
    if(subObj.style.display=='block'){
        if(typeof(imgObj)!='undefined'&&imgObj!=null){
            imgObj.src=APP_PATH+'/web/img/left/left_2thmenu_icon+.gif';
        }
        if(typeof(subObj)!='undefined'&&subObj!=null){
        	subObj.style.display='none';
        }
    //Submenu가 열려있는 경우
    }else{
        if(typeof(imgObj)!='undefined'&&imgObj!=null){
            imgObj.src=APP_PATH+'/web/img/left/left_2thmenu_icon-.gif';
        }
        if(typeof(subObj)!='undefined'&&subObj!=null){
        	subObj.style.display='block';
        }
    }
}
/**
 * 하나의 서브 메뉴만을 표시하는 Function 
 */
function showSub(key){
    //이전에 선택된 내용이 없는경우
    if(oldKey==-1){
        oldKey=key;
        midObj=getObj('mid'+key);
		midObj.className='left_menu_choice';
        imgObj=getObj('img'+key);
        if(typeof(imgObj)!='undefined'&&imgObj!=null){
            imgObj.src=APP_PATH+'/web/img/left/left_2thmenu_icon-.gif';
        }
        subObj=getObj('sub'+key);
        if(typeof(subObj)!='undefined'&&subObj!=null){
        	subObj.style.display='block';
        }
    }else{
         if(oldKey!=key){
            //imgObj;
            imgObj.src=APP_PATH+'/web/img/left/left_2thmenu_icon+.gif';
            if(typeof(subObj)!='undefined'&&subObj!=null){
            	subObj.style.display='none';
            }
            if(typeof(midObj)!='undefined'&&midObj!=null){
            	midObj.className='left_menu_nochoice';
            }
            midObj=getObj('mid'+key);
            if(typeof(midObj)!='undefined'&&midObj!=null){
            	midObj.className='left_menu_choice';
            }
            imgObj=getObj('img'+key);
            if(typeof(imgObj)!='undefined'&&imgObj!=null){
                imgObj.src=APP_PATH+'/web/img/left/left_2thmenu_icon-.gif';
            }
            subObj=getObj('sub'+key);
            if(typeof(subObj)!='undefined'&&subObj!=null){
            	subObj.style.display='block';
            }
         }
    }
    oldKey=key;
}
function doChg(obj){
    if(typeof(oldPgm)=='undefined'){
        obj.style.fontWeight='bold';
        oldPgm=obj;            
    }else if(typeof(oldPgm)!='undefined'&&obj!=oldPgm){
        oldPgm.style.fontWeight='normal';
        obj.style.fontWeight='bold';
        oldPgm=obj;            
    }
	//showProcess('WORKING', document);
}
//One global variable to set, use true if you want the menus to reinit when the user changes text size (recommended):
resizereinit=true;
menu[1]={
id:'menu1', //use unique quoted id (quoted) REQUIRED!!
fontsize:'100%', // express as percentage with the % sign
linkheight:22 ,  // linked horizontal cells height
hdingwidth:210 ,  // heading - non linked horizontal cells width
menuItems:[]}; // REQUIRED!! do not edit or remove
var userId='';
var deptName='';
//make_menus();
function setMyPgm(){
}
