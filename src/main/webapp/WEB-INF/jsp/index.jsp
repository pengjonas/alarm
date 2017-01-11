<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html lang="en">
<link rel="stylesheet" href="${contextPath}/webjars/bootstrap/css/bootstrap.min.css">
<link rel="stylesheet" href="${contextPath}/webjars/font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" href="${contextPath}/css/app.css">
<link rel="stylesheet" href="${contextPath}/css/load-mask.css">
<head>
    <script src="${contextPath}/webjarsjs"></script>
    <script data-main="${contextPath}/app" src="${contextPath}/webjars/requirejs/require.min.js"></script> 
    <meta charset="UTF-8">
    <title>Title</title>
    <script type="text/javascript">
        window.trimap = {
            context: {
                path: "${contextPath}"
            }
        }
    </script>
</head>

<body>
    <div id="alarmApp" class="container-fluid">
        <div class="container-fluid" ng-controller="routeInit" ui-view></div>
    </div>
    <div id="loadMask">
        <div class="b"></div>
        <div class="f">
            <div class="s">
                <i class="fa fa-refresh fa-spin"></i>
            </div>
        </div>
    </div>
</body>
</html>