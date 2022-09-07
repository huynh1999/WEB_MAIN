////SYSTEM (SYS) COMMON IBSHEET GRID TITLE 
MSG_KEY['TOP_MNU_HDR1'] = "DEL|No.|STS|Menu|Order|Description|Using|Count|Index";
MSG_KEY['MNU_HDR1']     = "DEL|No.|STS|Menu|Order|Description|Using|Used Count";
MSG_KEY['PGM_HDR1']     = "DEL|No.|STS|Program|URL|Order|Description|Using|Used Count";
MSG_KEY['PGM_POP_HDR1']  = "|No.|ID|Program|URL|Description";
MSG_KEY['USERMGMT_HDR1']= "Status|User ID|Name(Eng.)|Local Name|Language|Office|Office|Department|Role|Address|EMail|Phone No.|Fax No.|Status|Default Contract|Default Contract|Warehouse|Outboud Order Type|Password Reset|Office Code"
MSG_KEY['USERMGMT_HDR2'] 	= "|No.|ID|MAC Address|Type|Date";
MSG_KEY['ROLE_HDR1']    = "DEL|STS|Role Code|Role Name|Order|Description|Use Y/N" 
MSG_KEY['ROLE_BTN_HDR1_1'] 	= "||Top Menu|CHK||Sub Menu|CHK||Pgm Menu|CHK|Button|Button|Button|Button|Button|Button|Button|Button|Button|";
MSG_KEY['ROLE_BTN_HDR1_2'] 	= "||Top Menu|CHK||Sub Menu|CHK||Pgm Menu|CHK|Retrieve|New|Save|Delete|Print|Excel|7|8|9|Extension|";

//MAC ADDRESS
MSG_KEY['MGT_MAC_0010_HDR'] = "No.||MAC Address|Description|To Date|From Date|Use|";
MSG_KEY['MGT_MAC_0010_HDR1'] 	= "|DEL|No.||MAC Address|Description|From Date|To Date|Use Y/N";

//HISTORY MANAGEMENT (REFINE FUNCTION)
MSG_KEY['MGT_HIS_0010_HDR1'] = "Del|STS|Group Name";
MSG_KEY['MGT_HIS_0010_HDR2'] = "No|Physical Entity Name|Physical Attribute Name|Logical Attribute Name";
MSG_KEY['MGT_HIS_0020_HDR'] = "DEL||Physical Entity Name|Physical Arribute Name|Logical Attribute Name|Group Name|Key|USE|Warning|Column Description";
MSG_KEY['MGT_HIS_0020_HDR1'] 	= "cng_grp_attr_nm|cng_grp_attr_seq";
MSG_KEY['MGT_HIS_0030_HDR'] = "No.|Group Name|B/L No.|Type|Column|Before|odl_before|After|old_after|Update Date|Office|User ID|C/A No.";
MSG_KEY['MGT_HIS_0040_HDR'] = "|No.||Type|Screen Name|B/L No.|Invoice No.|Filing No.|Issued by|Issued at|Email Address & Fax Number|Send Status|Parameter1|Parameter2|Parameter3";

//EQ STATUS 
MSG_KEY['MGT_EQS_0010_HDR1'] = "|No.|Country||State Code|Location Code|Location|20 STD|40 STD|40 HQ";
MSG_KEY['MGT_EQS_0010_HDR2'] = "|Del|No.|Country|State Code|Location Code|Location Name";

//Alert/Notification 
MSG_KEY['MGT_ALT_0010_HDR'] = "|Del|No.|Alert Type|Event|Office|Starting at( Time +/- ) |Ending at ( Time +/- )|Term|Contents|CC";
MSG_KEY['MGT_ALT_0020_HDR'] = "Del|No.|Use|Type|Event|Office|Starting at( Time +/- ) |Ending at ( Time +/- )|Term|Contents|CC";

//Service Lane
MSG_KEY['MGT_EQS_0030_HDR1'] = "Del||Seq|Port|Port|Origin / Destination|ETB|ETD|Transit Time(day)";
//Service Lane List
MSG_KEY['MGT_EQS_0040_HDR1'] = "No.|Lane|Origin|Destination|Carrier|Created By|Created At|LastModified By|LastModified At|sel_org_cd|sel_des_cd|lane_nm|f_remark|sel_Frequency_cd";

//HOLIDAY MANAGEMENT (REFINE FUNCTION)
 MSG_KEY['MGT_HOL_0010_HDR1_1'] 	= "DEL|No.|ibflag|Apply\nScope|Customer|Customer|From|From|To|To|Exchange\nRate|Day/Month\nType|Apply Date|Apply Date|Issued by|finc_xcrt_seq|Indexing";
MSG_KEY['MGT_HOL_0010_HDR1_2'] 	= "DEL|No.|ibflag|Apply\nScope|Code|Name|Currency|Rate Unit|Currency|Rate Unit|Exchange\nRate|Day/Month\nType|From|To|Issued by|finc_xcrt_seq|Indexing";

//???
MSG_KEY['MGT_MNG_0010_HDR1'] 	= "|User ID|User Name|Date|Start Time|End Time|Work Time";
MSG_KEY['SUBCD_HDR1']   = "Status|DEL|Code|Name|Code Order|Use Y/N|Remark"
MSG_KEY['TOMCD_HDR1']   = "Status|DEL|Code|Name|Parent Code|Code Length|Code Type|Use Y/N|Remark" ;


////SYSTEM (SYS) COMMON MESSAGE (2012.11.26) //CHECK SOURCE: SYS_AUT_0010.js, UserPetition.js
MSG_KEY['SYS_COM_ALT002'] = 'Please change the name of selected File! \nFile Name cannot exceed 40 characters including the Extension. '; //선택한 파일의 파일명을 변경해 주세요! 확장자를 포함한 전체 파일명은 40자를 초과할 수 없습니다. 
MSG_KEY['SYS_COM_ALT003'] = 'There is registrered to authorization previously. \nPlease revoke its authority!'; //이 기능에는 권한이 부여되어 있습니다. 부여된 권한을 먼저 취소해 주세요!
MSG_KEY['SYS_COM_ALT004'] = 'Please Delete Sub-Menu first!'; //Sub-Menu를 먼저 삭제해 주세요!
MSG_KEY['SYS_COM_ALT005'] = 'This role was used at User Information. Please change User Information!'; //사용자 정보에서 사용 중인 Role입니다. 사용자 정보를 변경해 주세요!
MSG_KEY['SYS_COM_ALT006'] = 'This role was used at Role/Screen Mapping. Please change Role/Screen Mapping!'; //
MSG_KEY['SYS_COM_ALT007'] = 'This code was used. Please check the Code!'; //사용 중인 코드입니다. 코드를 확인해 주세요!
MSG_KEY['SYS_COM_ALT008'] = 'End date is greater than start date.'; 
MSG_KEY['SYS_COM_ALT009'] = 'Duplicate data.'; 
MSG_KEY['SYS_COM_ALT010'] = 'Please check date format.'; 
	
////WORD, TERM
MSG_KEY['SYS_COD_EXDT'] = 'Expire Date'; //만료일
MSG_KEY['SYS_COD_TITL'] = 'Title'; //제목
MSG_KEY['SYS_COD_CONT'] = 'Contents'; //게시 내용
MSG_KEY['SYS_COD_MENU'] = 'Menu'; //메뉴
