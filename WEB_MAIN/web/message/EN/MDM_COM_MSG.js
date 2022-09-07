////CODE (MDM) COMMON IBSHEET GRID TITLE
MSG_KEY['MDM_MCM_0010_HDR'] 	= "CHK|STS|No.|Continent\nCode|Continent\nName|Description|Use\nY/N";
MSG_KEY['MDM_MCM_0020_HDR'] 	= "CHK|STS|No.|Sub\nContinent\nCode|Sub\nContinent\nName|Description|Use\nY/N|ENG_NM|CONTI_CD|CONIT_NM|USRID|OFCCD|TMS|USRID|OFCCD|TMS";
MSG_KEY['MDM_MCM_0030_HDR'] 	= "CHK|STS|No.|Contry\nCode|Country\nName\n(Local)|Desc|Continent|Sub\nContinent|Use\nY/N|ENG_NM|CONTI_CD|CONIT_NM|USRID|OFCCD|TMS|USRID|OFCCD|TMS";
MSG_KEY['MDM_MCM_0040_HDR'] 	= "CHK|STS|No.|Location\nCode|Location\nName|Description|Contry\nName\n(Local)|Use\nY/N|ENG_NM|CONTI_CD|CONIT_NM|USRID|OFCCD|TMS|USRID|OFCCD|TMS|DESC|TD_QTY";
MSG_KEY['MDM_MCM_0050_HDR'] 	= "CHK|STS|No.|Office Code|Office Name|Description|Contry|Location|Use Y/N|ENG_NM|CONTI_CD|CONIT_NM|USRID|OFCCD|TMS|USRID|OFCCD|TMS";
MSG_KEY['MDM_MCM_0051_HDR'] 	= "DEL||No.||Title|Detail|Default";
MSG_KEY['MDM_MCM_0060_HDR'] 	= "CHK|STS|No.|No.de\nCode|Node\nName|Description|Location|Use\nY/N|ENG_NM|CONTI_CD|CONIT_NM|USRID|OFCCD|TMS|USRID|OFCCD|TMS";
//#47 #52766 - [ZEN] Mark & Desc Tab SAY 항목 Long Name 지정
MSG_KEY['MDM_MCM_0080_HDR'] 	= "CHK|STS|No.|Use Y/N|Container TP/SZ Code|Container TP/SZ Name|Temp.|Vent.|GROUP CD|TEU|ISO Code|AMS Code|Local Customs Code|User Define Code1|User Define Code2|Description";

//MSG_KEY['MDM_MCM_0120_HDR'] 	= "CHK|STS|No.|Use Y/N|HS Group|Commodity\nCode|Commodity\nName|Unit1|Unit2|Upper Commodity\nCode|IMO Code|Group Commodity\nName|Description";
MSG_KEY['MDM_MCM_0120_HDR'] 	= "CHK|STS|No.|Use Y/N|HS Group|Commodity\nCode|Commodity\nName|Unit1|Unit2|Upper Commodity\nCode|IMO Code|Description";
MSG_KEY['MDM_MCM_0130_HDR'] 	= "CHK|STS|No.|Use Y/N|Package Code|Package Name|AMS Code|Customs Code|Description";
MSG_KEY['MDM_MCM_0140_HDR_1'] 	= "CHK|STS|No.|DEL|Use Y/N|Vessel Code|Name|Nationality|Carrier|Carrier|CallSign|Description";
MSG_KEY['MDM_MCM_0140_HDR_2'] 	= "CHK|STS|No.|DEL|Use Y/N|Vessel Code|Name|Nationality|Code|Name|CallSign|Description";
MSG_KEY['MDM_MCM_0170_HDR'] 	= "CHK|STS|No.|Contry|Freight Code|Description|Rate(%)|Use Y/N";
MSG_KEY['MDM_MCM_0180_HDR'] 	= "CHK|STS|No.|Freight Code|Name|Group Code|Currency|Use Y/N|Default|Sort|Us Y/N|Default|Sort|Description";
MSG_KEY['MDM_MCM_0250_HDR'] 	= "CHK|STS|No.|Partner Code|TP Type|Name(Local)|Name(English)|Biz.Reg. No.|CEO|Contry|Phone";
MSG_KEY['MDM_MCM_0160_HDR1_1'] 	= "DEL||No.|Billing Code|Name(Eng.)|Name(Local)|Currency|Pfmc.|Tax|Tax|Revenue|Revenue|Cost|Cost|CR/DB|CR/DB|Department|Department|Department|Department|Department|Department|Department|Department|Department|Department|Department|Department|Group|Sort|Use|Default|IT Group";
MSG_KEY['MDM_MCM_0160_HDR1_2'] 	= "DEL||No.|Billing Code|Name(Eng.)|Name(Local)|Currency|Pfmc.|Y/N|%|Code|Name|Code|Name|Code|Name|A/R|A/P|D/C|Gnr.|O/IM|O/IH|A/IM|A/IH|O/EM|O/EH|A/EM|A/EH|Group|Sort|Use|Default|IT Group";
MSG_KEY['MDM_MCM_0300_HDR1'] 	= "|DEL|No.|G/L Group|G/L Group|G/L Code|Type|Group|Description|Sub|Acct. G/L Code|Active|Block|||Payment";
MSG_KEY['MDM_MCM_0301_HDR1'] 	= "|DEL|No.|G/L Group Code|G/L Type|G/L Group|Name|Active|gl_cnt|Indexing";
MSG_KEY['MDM_MCM_0310_HDR1'] 	= "|Seq|State|Name|Name|Description|Country||Use Y/N|||||";
MSG_KEY['MDM_MCM_0340_HDR1'] 	= "ibflag|Type|Description|Prefix|No.|Use\Y/N";

//OFFICE HIERARCHY (REFINE FUNCTION)
MSG_KEY['SYS_OFC_0010_HDR1']= "Status|OFC_CD|CK|Level|Office Name|Office Name|Country|Address";


////CODE (MDM) COMMON MESSAGE (2012.11.26) 
MSG_KEY['MDM_COM_ALT001'] = 'Please enter a Value correctly! (Between -24 ~ 24) '; //-24 ~ 24의 값만 입력이 가능합니다! 
MSG_KEY['MDM_COM_ALT002'] = 'You can be entered up to 5 Lines! '; //5 라인까지 입력할 수 있습니다!
MSG_KEY['MDM_COM_ALT003'] = 'Please enter a Value correctly! (Package code) ';
MSG_KEY['MDM_COM_ALT004'] = "Billing code is duplicate.";
MSG_KEY['MDM_COM_ALT005'] = 'End Number have to be input greater than Next Number.';
MSG_KEY['MDM_COM_ALT006'] = 'Next Number is 8 digits.';
MSG_KEY['MDM_COM_ALT007'] = 'End Number is 8 digits.';
MSG_KEY['MDM_COM_ALT008'] = 'Please input Next Numbe] and End Number';
MSG_KEY['MDM_COM_ALT009'] = 'Duplicate data.';
MSG_KEY['MDM_COM_ALT010'] = 'Minimum length is two characters.';
MSG_KEY['MDM_COM_ALT011'] = 'Remark code is duplicate.';
MSG_KEY['MDM_COM_ALT012'] = 'Please input Office Code';

MSG_KEY['MDM_MCM_0260_HDR'] = 'CHK|STS|Item|Attribute|Value|Lable|Package Type|Size|Net Kgs|Net Lbs|Grs Kgs|Grs Lbs|Amount';
