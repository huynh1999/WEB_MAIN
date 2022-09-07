echo off

rem Find current directory.

SET CURR_PATH=%cd%
set classpath=.
set classpath=%classpath%;WEB-INF\classes
set classpath=%classpath%;WEB-INF\lib\commons-net-3.1.jar
set classpath=%classpath%;WEB-INF\lib\log4j-1.2.13.jar
set classpath=%classpath%;WEB-INF\lib\sqljdbc4.jar
set classpath=%classpath%;WEB-INF\lib\jakarta-oro-2.0.3.jar
set classpath=%classpath%;WEB-INF\lib\Base64Coder.jar
set classpath=%classpath%;WEB-INF\lib\Synapse-1.0.jar

rem 모니터링은 sealbeach server OPUS_FWD_2014_v4.6.1.0 폴더에서만 돌아간다.
cd C:\clt\OPUS_FWD_2014_v4.6.1.0\WEB_MAIN
"%JAVA_HOME%\bin\java" -cp %classpath% com.clt.apps.common.util.BatchEdiMonitoring %1

rem Move to root folder
