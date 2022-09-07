echo off

rem Find current directory.

SET JAVA_PATH=C:\Program Files\Java\jre1.8.0_144
SET CURR_PATH=%cd%
set classpath=.
set classpath=%classpath%;WEB-INF\classes
set classpath=%classpath%;WEB-INF\lib\commons-net-3.1.jar
set classpath=%classpath%;WEB-INF\lib\log4j-1.2.13.jar
set classpath=%classpath%;WEB-INF\lib\sqljdbc4.jar
set classpath=%classpath%;WEB-INF\lib\jakarta-oro-2.0.3.jar
set classpath=%classpath%;WEB-INF\lib\Synapse-1.0.jar
set classpath=%classpath%;WEB-INF\lib\gson-2.3.1.jar

cd C:\clt\OPUS_FWD_2014\WEB_MAIN

"%JAVA_PATH%\bin\java" -cp %classpath%  com.clt.apps.fis.edi.po.basic.EdiPoStatusSend costcotw %1 %2

rem Move to root folder
