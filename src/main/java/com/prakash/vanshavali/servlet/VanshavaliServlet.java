package com.prakash.vanshavali.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.reflect.TypeToken;
import com.prakash.vanshavali.model.ConvertExcel2Json;
import com.prakash.vanshavali.model.Person;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import java.io.OutputStream;


//@SuppressWarnings("serial")
@WebServlet("/VanshavaliServlet")
public class VanshavaliServlet extends HttpServlet {

    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, java.io.IOException {

        response.setContentType("text/html;charset=utf-8");
        response.getWriter().print("prakash@123");
        response.getWriter().flush();

    }

//    @SuppressWarnings({ "resource", "unused" })
//    @Autowired
    public void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, java.io.IOException {
        OutputStream fileOut = null;
        try {
            String userDir = System.getProperty("user.dir");

            System.out.println(userDir);

            //  userDir =   userDir.substring(0,userDir.lastIndexOf("/") + 1) + "webapps/ROOT/";

            String excelFilePath = userDir + "/Vanshavali_Data2.xlsx";

            Person personelement = new Person();

            //        personelement.setMemberID();
            personelement.setMemberName(request.getParameter("MemberName"));

            System.out.println(personelement.getMemberName());
            personelement.setMemberDOB(request.getParameter("MemberDOB"));
            personelement.setMemberDOD(request.getParameter("MemberDOD"));
            personelement.setSpouse(request.getParameter("Spouse"));
            personelement.setSpouseDOB(request.getParameter("SpouseDOB"));
            personelement.setSpouseDOD(request.getParameter("SpouseDOD"));
            personelement.setMemberFatherName(request.getParameter("MemberFatherName"));
            personelement.setMemberMotherName(request.getParameter("MemberMotherName"));

            //        personelement.setMemberParentID(request.getParameter("MemberParentID"));

            personelement.setMemberAddress(request.getParameter("MemberAddress"));
            personelement.setMemberTown(request.getParameter("MemberTown"));
            personelement.setMemberCountry(request.getParameter("MemberCountry"));
            personelement.setMemberPlaceOfBirth(request.getParameter("MemberPlaceOfBirth"));
            personelement.setMemberQualification(request.getParameter("MemberQualification"));
            personelement.setMemberProfession(request.getParameter("MemberProfession"));
            personelement.setMemberAboutMe(request.getParameter("MemberAboutMe"));
            personelement.setGender(request.getParameter("Gender"));
            personelement.setMemberID(Integer.parseInt(request.getParameter("MemberId")));

            String updateAdd = request.getParameter("updateAdd");

            File file = new File(excelFilePath);

            if (!file.exists()) {
              //  file.mkdirs();
                Workbook wb = new XSSFWorkbook();

                // An output stream accepts output bytes and sends them to sink.
                 fileOut = new FileOutputStream(excelFilePath);

                // Creating Sheets using sheet object
                Sheet sheet1 = wb.createSheet("Sheet1");

                createHeaderRow(sheet1);

                wb.write(fileOut);
                fileOut.close();

            }


            writeExcel(personelement, excelFilePath, updateAdd);

            /// output to Servlet


            ConvertExcel2Json E2J = new ConvertExcel2Json();
            List<Person>  personList = E2J.readExcelFile(userDir + "/Vanshavali_Data2.xlsx");


            JsonArray jsonArray = null;
            JsonElement element = null;
            Gson gson = null;
            // to convert java object to json format use gson
            gson = new Gson();
            element = gson.toJsonTree(personList, new TypeToken<List<Person>>() {
            }.getType());

//        jsonArray = element.getAsJsonArray();

            response.setContentType("text/html;charset=utf-8");
            response.setContentType("application/json");
            response.getWriter().print(element);
            System.out.println(element);
            response.getWriter().flush();
        }catch(Exception e) {}
        finally {
            if( fileOut!= null){
                fileOut.close();
            }
        }
    }


    private Workbook getWorkbook(String excelFilePath)
            throws IOException {
        Workbook workbook = null;
        // from where file is to be read
        File file = new File(excelFilePath);

        // Create a FileInputStream object
        // for getting the information of the file
        FileInputStream fip = new FileInputStream(file);

        if (excelFilePath.endsWith("xlsx")) {
            workbook = new XSSFWorkbook(fip);
        } else if (excelFilePath.endsWith("xls")) {
            workbook = new HSSFWorkbook(fip);
        } else {
            throw new IllegalArgumentException("The specified file is not Excel file");
        }

        return workbook;
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




    public void writeExcel( Person person, String excelFilePath , String updateAdd) throws IOException {




        Workbook workbook =    getWorkbook(excelFilePath);
        Sheet sheet =  workbook.getSheet("Sheet1");

        int rowCount = sheet.getLastRowNum();
        int memberRow  = 0 ;
        if(updateAdd.equalsIgnoreCase("Update")) {
            for (int i = 1; i <= rowCount; i++) {
                int validatememberID =(int) (sheet.getRow(i).getCell(0).getNumericCellValue());
                if(person.getMemberID() == validatememberID)
                { memberRow = i ;
                    break;}

            }

            Row row = sheet.getRow(memberRow);

            boolean flag = false;
            for (int i = 1; i <= rowCount; i++) {

                Cell membercell = sheet.getRow(i).getCell(1);
                Cell spousecell = sheet.getRow(i).getCell(4);

                if( spousecell == null)
                    sheet.getRow(i).createCell(4) ;


                if( membercell == null)
                    sheet.getRow(i).createCell(1) ;


                if ((sheet.getRow(i).getCell(1).getStringCellValue().equalsIgnoreCase(person.getMemberFatherName()) && sheet.getRow(i).getCell(4).getStringCellValue().equalsIgnoreCase(person.getMemberMotherName())) || (sheet.getRow(i).getCell(1).getStringCellValue().equalsIgnoreCase(person.getMemberMotherName()) && sheet.getRow(i).getCell(4).getStringCellValue().equalsIgnoreCase(person.getMemberFatherName()))) {
                    flag = true;
                    person.setMemberParentID((int) sheet.getRow(i).getCell(0).getNumericCellValue());
                    break;
                }

            }

            if (!flag) {


                    person.setMemberParentID(2);
                    person.setMemberFatherName("ShrivastavaFamily");
                    person.setMemberMotherName("ShrivastavaFamily");

            }

            if(row.getCell(1) == null)
                row.createCell(1).setCellType(Cell.CELL_TYPE_STRING);
            row.getCell(1).setCellValue(person.getMemberName());

            if(row.getCell(2) == null)
                row.createCell(2).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(2).setCellValue(person.getMemberDOB());

            if(row.getCell(3) == null)
                row.createCell(3).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(3).setCellValue(person.getMemberDOD());

            if(row.getCell(4) == null)
                row.createCell(4).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(4).setCellValue(person.getSpouse());

            if(row.getCell(5) == null)
                row.createCell(5).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(5).setCellValue(person.getSpouseDOB());

            if(row.getCell(6) == null)
                row.createCell(6).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(6).setCellValue(person.getSpouseDOD());

            if(row.getCell(7) == null)
                row.createCell(7).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(7).setCellValue(person.getMemberFatherName());

            if(row.getCell(8) == null)
                row.createCell(8).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(8).setCellValue(person.getMemberMotherName());

            if(row.getCell(9) == null)
                row.createCell(9).setCellType(Cell.CELL_TYPE_NUMERIC);;
            row.getCell(9).setCellValue(person.getMemberParentID());

            if(row.getCell(10) == null)
                row.createCell(10).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(10).setCellValue(person.getMemberAddress());

            if(row.getCell(11) == null)
                row.createCell(11).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(11).setCellValue(person.getMemberTown());

            if(row.getCell(12) == null)
                row.createCell(12).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(12).setCellValue(person.getMemberCountry());

            if(row.getCell(13) == null)
                row.createCell(13).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(13).setCellValue(person.getMemberPlaceOfBirth());

            if(row.getCell(14) == null)
                row.createCell(14).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(14).setCellValue(person.getMemberQualification());

            if(row.getCell(15) == null)
                row.createCell(15).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(15).setCellValue(person.getMemberProfession());

            if(row.getCell(16) == null)
                row.createCell(16).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(16).setCellValue(person.getMemberAboutMe());

            if(row.getCell(17) == null)
                row.createCell(17).setCellType(Cell.CELL_TYPE_STRING);;
            row.getCell(17).setCellValue(person.getGender());



        }else {

            int memberid = (int) (sheet.getRow(rowCount).getCell(0).getNumericCellValue());
            person.setMemberID(memberid + 1);

            boolean flag = false;
            for (int i = 1; i <= rowCount; i++) {
                if ((sheet.getRow(i).getCell(1).getStringCellValue().equalsIgnoreCase(person.getMemberFatherName()) && sheet.getRow(i).getCell(4).getStringCellValue().equalsIgnoreCase(person.getMemberMotherName())) || (sheet.getRow(i).getCell(1).getStringCellValue().equalsIgnoreCase(person.getMemberMotherName()) && sheet.getRow(i).getCell(4).getStringCellValue().equalsIgnoreCase(person.getMemberFatherName()))) {
                    flag = true;
                    person.setMemberParentID((int) sheet.getRow(i).getCell(0).getNumericCellValue());
                    break;
                }

            }

            if (!flag) {
                person.setMemberParentID(2);
                person.setMemberFatherName("ShrivastavaFamily");
                person.setMemberMotherName("ShrivastavaFamily");
            }


            Row row = sheet.createRow(++rowCount);

            Cell cell = row.createCell(0);
            cell.setCellType(Cell.CELL_TYPE_NUMERIC);
            cell.setCellValue(person.getMemberID());


            cell = row.createCell(1);
            cell.setCellType(Cell.CELL_TYPE_STRING);

            cell.setCellValue(person.getMemberName());
            cell = row.createCell(2);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberDOB());

            cell = row.createCell(3);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberDOD());

            cell = row.createCell(4);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getSpouse());

            cell = row.createCell(5);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getSpouseDOB());
            cell = row.createCell(6);

            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getSpouseDOD());
            cell = row.createCell(7);

            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberFatherName());


            cell = row.createCell(8);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberMotherName());


            cell = row.createCell(9);
            cell.setCellType(Cell.CELL_TYPE_NUMERIC);
            cell.setCellValue(person.getMemberParentID());


            cell = row.createCell(10);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberAddress());

            cell = row.createCell(11);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberTown());


            cell = row.createCell(12);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberCountry());

            cell = row.createCell(13);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberPlaceOfBirth());

            cell = row.createCell(14);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberQualification());

            cell = row.createCell(15);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberProfession());

            cell = row.createCell(16);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getMemberAboutMe());

            cell = row.createCell(17);
            cell.setCellType(Cell.CELL_TYPE_STRING);
            cell.setCellValue(person.getGender());

        }


        try (FileOutputStream outputStream = new FileOutputStream(excelFilePath)) {
        workbook.write(outputStream);
        // outputStream.close();
    }

    File file=new File(excelFilePath);


        touch(file);

    }

    public static void touch(File file) throws IOException{
        long timestamp = System.currentTimeMillis();
        touch(file, timestamp);
    }

    public static void touch(File file, long timestamp) throws IOException{
        if (!file.exists()) {
            new FileOutputStream(file).close();
        }

        file.setLastModified(timestamp);
    }


}
