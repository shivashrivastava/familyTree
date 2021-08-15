package com.prakash.vanshavali.model;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;




public class ConvertExcel2Json {


    /**
     * Read Excel File into Java List Objects
     *
     * @param filePath
     * @return
     */
    public static List<Person> readExcelFile(String filePath) throws IOException {

        Workbook workbook = null;

        FileInputStream fip = null;
        try {
            // FileInputStream excelFile = new FileInputStream(new File(filePath));
            //  Workbook workbook = new XSSFWorkbook(excelFile);


            File file = new File(filePath);

            // Create a FileInputStream object
            // for getting the information of the file
             fip = new FileInputStream(file);

            if (filePath.endsWith("xlsx")) {
                workbook = new XSSFWorkbook(fip);
            } else if (filePath.endsWith("xls")) {
                workbook = new HSSFWorkbook(fip);
            } else {
                throw new IllegalArgumentException("The specified file is not Excel file");
            }

            Sheet sheet = workbook.getSheetAt(0);
           // Iterator<Row> rows = sheet.iterator();

            List<Person> lstCustomers = new ArrayList<Person>();

            int rowCount = sheet.getLastRowNum();





            for (int i = 1; i <= rowCount; i++)
                     {
                         Person person = new Person();
                         for (int j = 1; j <= 17; j++) {

                             if (sheet.getRow(i).getCell(j) == null) {
                                 if(i==9) {
                                     sheet.getRow(i).createCell(j).setCellType(Cell.CELL_TYPE_NUMERIC);

                                 }
                                 sheet.getRow(i).createCell(j).setCellType(Cell.CELL_TYPE_STRING);
                                 sheet.getRow(i).createCell(j).setCellValue("");
                             }
                         }
                        person.setMemberID((int) sheet.getRow(i).getCell(0).getNumericCellValue());
                        person.setMemberName( sheet.getRow(i).getCell(1).getStringCellValue());
                        person.setMemberDOB( sheet.getRow(i).getCell(2).getStringCellValue());
                        person.setMemberDOD( sheet.getRow(i).getCell(3).getStringCellValue());
                        person.setSpouse( sheet.getRow(i).getCell(4).getStringCellValue());
                        person.setSpouseDOB( sheet.getRow(i).getCell(5).getStringCellValue());
                        person.setSpouseDOD( sheet.getRow(i).getCell(6).getStringCellValue());

                        person.setMemberFatherName( sheet.getRow(i).getCell(7).getStringCellValue());
                        person.setMemberMotherName( sheet.getRow(i).getCell(8).getStringCellValue());
                        person.setMemberParentID( (int) sheet.getRow(i).getCell(9).getNumericCellValue());
                        person.setMemberAddress( sheet.getRow(i).getCell(10).getStringCellValue());
                        person.setMemberTown( sheet.getRow(i).getCell(11).getStringCellValue());
                        person.setMemberCountry( sheet.getRow(i).getCell(12).getStringCellValue());
                        person.setMemberPlaceOfBirth( sheet.getRow(i).getCell(13).getStringCellValue());
                        person.setMemberQualification( sheet.getRow(i).getCell(14).getStringCellValue());
                        person.setMemberProfession( sheet.getRow(i).getCell(15).getStringCellValue());
                        person.setMemberAboutMe( sheet.getRow(i).getCell(16).getStringCellValue());
                        person.setGender( sheet.getRow(i).getCell(17).getStringCellValue());



                lstCustomers.add(person);
                person = null;
            }




            return lstCustomers;
        } catch (IOException e) {
            throw new RuntimeException("FAIL! -> message = " + e.getMessage());
        } finally {
            if(fip !=null)
                fip.close();
        }


    }

//    /**
//     * Convert Java Objects to JSON String
//     *
//     * @param personList
//
//     */
//    public static String convertObjects2JsonString(List<Person> personList) {
//        ObjectMapper mapper = new ObjectMapper();
//        String jsonString = "";
//
//        try {
//            jsonString = mapper.writeValueAsString(personList);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//
//        return jsonString;
//    }
}