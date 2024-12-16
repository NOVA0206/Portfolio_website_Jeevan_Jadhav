import java.io.IOException;
import java.io.PrintWriter;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Data")
public class Data1Servlet extends HttpServlet {
    private static final String query = "SELECT email, password FROM login";

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        // get PrintWriter
        PrintWriter pw = res.getWriter();
        // set content type
        res.setContentType("text/html");
        // LOAD jdbc driver
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException cnf) {
            cnf.printStackTrace();
        }
        // generate the connection
        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/mysql?zeroDateTimeBehavior=convertToNull", "root", "Jeevan@020604");
             PreparedStatement ps = con.prepareStatement(query);) {
            ResultSet rs = ps.executeQuery();
            pw.println("<!DOCTYPE html>");
            pw.println("<html>");
            pw.println("<head>");
            pw.println("<title>Login Data</title>");
            pw.println("<style>");
            pw.println("table {");
            pw.println("    border-collapse: collapse;");
            pw.println("    width: 50%;");
            pw.println("}");
            pw.println("th, td {");
            pw.println("    padding: 8px;");
            pw.println("    text-align: left;");
            pw.println("    border-bottom: 1px solid #ddd;");
            pw.println("}");
            pw.println("th {");
            pw.println("    background-color: #f2f2f2;");
            pw.println("}");
            pw.println("</style>");
            pw.println("</head>");
            pw.println("<body>");
            pw.println("<center>");            
            pw.println("<h2>Login Data</h2>");
            pw.println("<table>");
            pw.println("<tr>");
            pw.println("<th>Email</th>");
            pw.println("<th>Password</th>");
            pw.println("</tr>");

            while (rs.next()) {
                pw.println("<tr>");
                pw.println("<td>" + rs.getString(1) + "</td>");
                pw.println("<td>" + rs.getString(2) + "</td>");
                pw.println("</tr>");
            }
            pw.println("</table>");
            pw.println("</center>"); 
            pw.println("</body>");   
            pw.println("</html>");   
        } catch (SQLException ex) {
            Logger.getLogger(Data1Servlet.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
        doGet(req, res);
    }
}
