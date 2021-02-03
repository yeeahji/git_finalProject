<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Admin login</title>
        <link href="/market/admin/css/login.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/js/all.min.js" crossorigin="anonymous"></script>
    </head>
    <body class="bg-primary">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-5">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header"><h3 class="text-center font-weight-light my-4">Login</h3></div>
                                    <div class="card-body">
                                    
                                        <form id="adminLoginForm">
                                            <div class="form-group">
                                                <label class="mb-1" for="inputEmailAddress">Id</label>
                                                <input class="form-control py-4" id="inputId" name="inputId" type="text"/>
                                                <div id="loginIdDiv"></div>
                                            </div>
                                            <div class="form-group">
                                                <label class="mb-1" for="inputPassword">Password</label>
                                                <input class="form-control py-4" id="inputPassword" name="inputPassword" type="password"/>
                                                <div id="loginPwdDiv"></div>
                                            </div>
                                           
                                            <div class="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                <a class="btn btn-primary" onclick="adminLogin()">Login</a>
                                            </div>
                                        </form>
                                        
                                    </div>
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
   		<script src="/market/admin/js/login.js"></script>
   		<script>
   		function adminLogin(){
   		 $('#loginIdDiv').empty();
   	     $('#loginPwdDiv').empty();
   	     
   			if(document.getElementById("inputId").value==""){
   				$('#loginIdDiv').text('아이디를 입력')
                .css('color','red')
                .css('font-size','8pt')
                .css('font-weight','bold');
   			}else if(document.getElementById("inputPassword").value==""){
	   			 $('#loginPwdDiv').text('비밀번호를 입력')
	             .css('color','red')
	             .css('font-size','8pt')
	             .css('font-weight','bold');
   			}else 
   				document.adminLoginForm.submit();
   		}
   		</script>
    </body>
</html>
