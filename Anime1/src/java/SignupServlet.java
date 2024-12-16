import java.io.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
 import
javax.servlet.*; import
javax.servlet.http.*;
import javax.sql.*;
public class SignupServlet extends HttpServlet {
@Override
protected void doPost(HttpServletRequest request, HttpServletResponse
response) throws ServletException, IOException {
response.setContentType("text/html"); PrintWriter out =
response.getWriter(); try{
String  emailid, password, repeat_password;
emailid =request.getParameter("emailid"); 
password =request.getParameter("password");
repeat_password =request.getParameter("repeat_password");
Class.forName("com.mysql.jdbc.Driver");
Connection con =
DriverManager.getConnection("jdbc:mysql://localhost:3306/mysql?zeroDateTimeBehavior=convertToNull","root","Jeevan@020604");
String query = "insert into signup values(?,?,?)";
PreparedStatement ps =con.prepareStatement(query);
ps.setString(1, emailid);
ps.setString(2,password);
ps.setString(3,repeat_password);
ps.executeUpdate();
con.close();
out.print("record saved successfully!");
RequestDispatcher rd=request.getRequestDispatcher("singed.html");
rd.forward(request, response);
}
catch(Exception e){
out.println(e);
}
}
}
