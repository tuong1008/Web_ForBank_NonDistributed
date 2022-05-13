<%--
    Document   : index.jsp
    Created on : Nov 20, 2021, 1:32:01 PM
    Author     : Tuong
--%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>File Upload</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
        <form method="POST" action="test" enctype="multipart/form-data" >
            File:
            <input type="file" name="picture" id="file" /> <br/>
            Destination:
            <input type="text" value="/tmp" name="folderToSave"/>
            </br>
            <input type="submit" value="Upload" name="upload" id="upload" />
        </form>
    </body>
</html>