<?xml version="1.0" encoding="EUC-KR"?>
<!--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
<!-- $Id: projectteam2fo.xsl,v 1.2 2012/04/12 08:38:44 aifadmin Exp $ -->
<xsl:stylesheet version="1.1" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:fo="http://www.w3.org/1999/XSL/Format" exclude-result-prefixes="fo">
  <xsl:output method="xml" version="1.0" omit-xml-declaration="no" indent="yes"/>
  <xsl:param name="versionParam" select="'1.0'"/> 
  
  <!-- ========================= -->
  <!-- root element: projectteam -->
  <!-- ========================= -->
  <xsl:template match="projectteam">
    <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format">
      <fo:layout-master-set>
        <fo:simple-page-master master-name="simpleA4" page-height="29.7cm" page-width="21cm" margin-top="2cm" margin-bottom="2cm" margin-left="2cm" margin-right="2cm">
          <fo:region-body/>
        </fo:simple-page-master>
      </fo:layout-master-set>
      <fo:page-sequence master-reference="simpleA4">
        <fo:flow flow-name="xsl-region-body">
          <fo:block font-size="16pt" font-weight="bold" space-after="5mm">
			HANJIN LOGISTICS <xsl:value-of select="projectname"/>
          </fo:block>
          <fo:block font-size="12pt" space-after="5mm">Version <xsl:value-of select="$versionParam"/>
          </fo:block>

          <fo:block>
				<fo:external-graphic src="url:http://img.yahoo.co.kr/home/renw2007/yh_logo2.gif" display-align="center"/>
          </fo:block>
			<!--
          <fo:block font-size="10pt">
-->          
            <!-- <fo:external-graphic src="url:http://img.yahoo.co.kr/home/renw2007/yh_logo2.gif" content-height="500px" content-width="400px" display-align="center"/> -->
   <!--       	<fo:external-graphic src="url:http://img.yahoo.co.kr/home/renw2007/yh_logo2.gif" display-align="center"/>
            
			<fo:table table-layout="fixed" width="100%" border-top-color="black">
		       <xsl:attribute name="border-style">solid</xsl:attribute>
		       <xsl:attribute name="border-width">1pt</xsl:attribute>

              <fo:table-column column-width="4cm">
			      <xsl:attribute name="border-style">solid</xsl:attribute>
		          <xsl:attribute name="border-width">1pt</xsl:attribute>
              </fo:table-column>
              <fo:table-column column-width="4cm">
			      <xsl:attribute name="border-style">solid</xsl:attribute>
		          <xsl:attribute name="border-width">1pt</xsl:attribute>
              </fo:table-column>
              <fo:table-column>
			      <xsl:attribute name="border-style">solid</xsl:attribute>
		          <xsl:attribute name="border-width">1pt</xsl:attribute>
              </fo:table-column>
              <fo:table-body>
                	<xsl:apply-templates select="member"/>
              </fo:table-body>
            </fo:table>
				
          </fo:block>-->
        </fo:flow>
      </fo:page-sequence>
    </fo:root>
  </xsl:template>
  
  <!-- ========================= -->
  <!-- child element: member     -->
  <!-- ========================= -->
<!--
  <xsl:template match="member">
    <fo:table-row>
      <xsl:if test="function = 'lead'">
        <xsl:attribute name="font-weight">bold</xsl:attribute>
      </xsl:if>
      <fo:table-cell background-color="white">
        <fo:block>
        	<fo:inline font-family="Batang"><xsl:value-of select="name"/></fo:inline>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell background-color="white">
        <fo:block>
          <xsl:value-of select="function"/>
        </fo:block>
      </fo:table-cell>
      <fo:table-cell  background-color="white"  background-image="url:http://localhost:8001/OPUS_FWD/img/button/btn_apply.gif">
        <fo:block>
          <xsl:value-of select="email"/>
        </fo:block>
      </fo:table-cell>
    </fo:table-row>
  </xsl:template>
-->
</xsl:stylesheet>
