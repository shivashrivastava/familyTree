package com.prakash.vanshavali.servlet;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;
import com.prakash.vanshavali.model.ConvertExcel2Json;
import com.prakash.vanshavali.model.Person;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

//@SuppressWarnings("serial")
@WebServlet("/VanshavaliUpdateServlet")
public class VanshavaliUpdateServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, java.io.IOException {
    }

//    @SuppressWarnings({ "resource", "unused" })
//    @Autowired
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, java.io.IOException
    {
        List<Person> personList = null;
        OutputStream fileOut = null;
        try {
            // Step 1: Read Excel File into Java List Objects

            String userDir = System.getProperty("user.dir");

            System.out.println(userDir);


           // userDir =   userDir.substring(0,userDir.lastIndexOf("/") + 1) + "webapps/ROOT/";

            File file = new File(userDir + "/Vanshavali_Data2.xlsx");

            if(!file.exists()) {

                //file.mkdirs();
                Workbook wb = new XSSFWorkbook();

                // An output stream accepts output bytes and sends them to sink.
                 fileOut = new FileOutputStream("Vanshavali_Data2.xlsx");

                // Creating Sheets using sheet object
                Sheet sheet1 = wb.createSheet("Sheet1");

                createHeaderRow(sheet1);

                wb.write(fileOut);
                fileOut.close();

            }

            ConvertExcel2Json E2J = new ConvertExcel2Json();
            personList = E2J.readExcelFile(userDir + "/Vanshavali_Data2.xlsx");
            // Step 2: Convert Java Objects to JSON String
          //  String jsonString = E2J.convertObjects2JsonString(personList);

       //     System.out.println(jsonString);


            /// output to Servlet

            JsonArray jsonArray = null;
            JsonElement element = null;
            Gson gson = null;
            // to convert java object to json format use gson
            gson = new Gson();
            element = gson.toJsonTree(personList, new TypeToken<List<Person>>() {
            }.getType());

            jsonArray = element.getAsJsonArray();

            response.setContentType("text/html;charset=utf-8");
            response.setContentType("application/json");
            response.getWriter().print(jsonArray);
            System.out.println(jsonArray);
            response.getWriter().flush();


        } catch (IOException e) {
            e.printStackTrace();
        }finally{
            if( fileOut!= null){
                fileOut.close();
            }
    }






    }

    private void createHeaderRow(Sheet sheet) {

        CellStyle cellStyle = sheet.getWorkbook().createCellStyle();
        Font font = sheet.getWorkbook().createFont();
        //font.setBold(true);
        font.setFontHeightInPoints((short) 16);
        cellStyle.setFont(font);

        cellStyle.setAlignment(CellStyle.ALIGN_CENTER);
        cellStyle.setFont(font);
        cellStyle.setWrapText(true);


        Row row = sheet.createRow(0);
        Cell cellNumric = row.createCell(0);
        cellNumric.setCellValue("MemberID");
        cellNumric.setCellStyle(cellStyle);

        cellNumric = row.createCell(1);
        cellNumric.setCellValue("MemberName");
        cellNumric.setCellStyle(cellStyle);

        cellNumric = row.createCell(2);
        cellNumric.setCellValue("MemberDOB");
        cellNumric.setCellStyle(cellStyle);

        cellNumric = row.createCell(3);
        cellNumric.setCellValue("MemberDOD");
        cellNumric.setCellStyle(cellStyle);

        cellNumric = row.createCell(4);
        cellNumric.setCellValue("Spouse");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(5);
        cellNumric.setCellValue("SpouseDOB");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(6);
        cellNumric.setCellValue("SpouseDOD");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(7);
        cellNumric.setCellValue("MemberFatherName");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(8);
        cellNumric.setCellValue("MemberMotherName");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(9);
        cellNumric.setCellValue("MemberParentID");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(10);
        cellNumric.setCellValue("MemberAddress");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(11);
        cellNumric.setCellValue("MemberTown");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(12);
        cellNumric.setCellValue("MemberCountry");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(13);
        cellNumric.setCellValue("MemberPlaceOfBirth");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(14);
        cellNumric.setCellValue("MemberQualification");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(15);
        cellNumric.setCellValue("MemberProfession");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(16);
        cellNumric.setCellValue("MemberAboutMe");
        cellNumric.setCellStyle(cellStyle);
        cellNumric = row.createCell(17);
        cellNumric.setCellValue("Gender");
        cellNumric.setCellStyle(cellStyle);



        row = sheet.createRow(1);

        cellNumric = row.createCell(0);
        cellNumric.setCellType(Cell.CELL_TYPE_NUMERIC);
        cellNumric.setCellValue(2);
        cellNumric.setCellStyle(cellStyle);


        for (int i=1 ; i<=17 ; i ++ ) {
            if(i==9) {
                cellNumric = row.createCell(i);
                cellNumric.setCellType(Cell.CELL_TYPE_NUMERIC);
                cellNumric.setCellValue(1);
                cellNumric.setCellStyle(cellStyle);
            }else {
                Cell cellString = row.createCell(i);
                cellString.setCellType(Cell.CELL_TYPE_STRING);
                cellString.setCellValue("ShrivastavaFamily");
                cellString.setCellStyle(cellStyle);
            }
        }

//        cellPrice.setCellValue("Name");
    }

}
