/**
 * Created by Shiva on 05/06/20.
 */

var baseurl;
var Vanshavalliservleturl ;

var baseurl = window.location.origin;
// baseurl = ""; // jQuery('input[title="baseURL"]').val();
Vanshavalliservleturl = "/VanshavaliServlet";


var dataString=null;

var female=null;
var male=null;




var MemberID = null ;
var MemberName = null ;
var MemberDOB = new Date();
var MemberDOD = new Date();
var Spouse = null ;
var SpouseDOB = new Date();
var SpouseDOD = new Date();
var MemberFatherName = null ;
var MemberMotherName = null ;
var MemberParentID = null ;
var MemberAddress = null ;
var MemberTown = null ;
var MemberCountry = null ;
var MemberPlaceOfBirth = null ;
var MemberQualification = null ;
var MemberProfession = null ;
var MemberAboutMe = null ;
var Gender = null ;







var resp;

function AddMember1()
{

     resp = window.prompt("Pease Enter your passcode");
    var passcode;
    $.ajax({
        type: "Get",
        url: baseurl + Vanshavalliservleturl ,
        dataType: "text",
        content: "application/text; charset=UTF-8",
        // data : JSON.stringify(data),
        success: function (callbackresponse) {
            passcode=callbackresponse.toString();
            if (resp===passcode)
            {
                FetchData();
                VerifyMendatoryFields();



                // var ParentName = jQuery("#MFnamedropdown").val();
                // var parentsName = ParentName.split(" -");
                // MemberFatherName = parentsName[0];
                // MemberMotherName = parentsName[0];


                dataString = "MemberName=" + MemberName +
                    "&MemberDOB=" + SetDate(MemberDOB) +
                    "&MemberDOD=" + SetDate(MemberDOD) +
                    "&Spouse=" + Spouse +
                    "&SpouseDOB=" + SetDate(SpouseDOB) +
                    "&SpouseDOD=" + SetDate(SpouseDOD) +
                    "&MemberFatherName=" + MemberFatherName +
                    "&MemberMotherName=" + MemberMotherName +
                    "&MemberAddress=" + MemberAddress +
                    "&MemberTown=" + MemberTown +
                    "&MemberCountry=" + MemberCountry +
                    "&MemberPlaceOfBirth=" + MemberPlaceOfBirth +
                    "&MemberQualification=" + MemberQualification +
                    "&MemberProfession=" + MemberProfession +
                    "&MemberAboutMe=" + MemberAboutMe +
                    "&Gender=" + Gender +
                    "&updateAdd=Add"+
                    "&MemberId=0"  ;
                addDataToExcel(dataString);
                console.log(dataString);
                // alert("ye wali" + dataString);
               // alert("Member added successfully!!!!");
                // PostData();
            }else
            {
                alert("Sorry,Your passcode doesnt match'/n Try Again!!!!");
            }

        },
        error: function (callbackresponse) {

            alert("Something went wrong please save again!!!!");
        },
        done: function(callbackresponse){

        },
        complete: function(){

        }
    });

}


function FetchData()
{

    female = null;
    male = null;

    if ( document.getElementById("male").checked == true )
        male = jQuery("#umale").val();
    if ( document.getElementById("female").checked == true )
        female = jQuery("#ufemale").val();

     //female = jQuery("#female").val();
    // male = jQuery("#male").val();


    //MemberID = jQuery("#MemberID").val();
    MemberName = jQuery("#name").val();
    MemberDOB = jQuery("#DOB").val();
    MemberDOD = jQuery("#DOD").val();
    Spouse = jQuery("#Spouse").val();
    SpouseDOB = jQuery("#SDOB").val();
    SpouseDOD = jQuery("#SDOD").val();

    var ParentName = jQuery("#MFnamedropdown").val();
    var parentsName = ParentName.split(" -");
    MemberFatherName = parentsName[0];
    MemberMotherName = parentsName[1]; // jQuery("#Mname").val();
    // MemberParentID = jQuery("#ParentID").val();
    MemberAddress = jQuery("#Address").val();
    MemberTown = jQuery("#town").val();
    MemberCountry = jQuery("#Country").val();
    MemberPlaceOfBirth = jQuery("#PlaceOfBirth").val();
    MemberQualification = jQuery("#Qualification").val();
    MemberProfession = jQuery("#Profession").val();
    MemberAboutMe = jQuery("#About").val();

    if(female === null) {
        Gender = "Male";
    }else {
        Gender = "Female";
    }
    // Gender = jQuery("#Gender").val();



     //alert("Fetch data completed");

}
function VerifyMendatoryFields()
{
    if(MemberName==="")
    {
        alert("Please Enter Name and click on Add Member");
    }else if(MemberFatherName==="")
    {
        alert("Please Enter Mother's and Father's Name and click on Add Member");
    }else if(MemberMotherName==="")
    {
        alert("Please Enter Mother'' and Father's Name and click on Add Member");
        // addDataToExcel(dataString);
    }


}


function PostData()
{
    var baseurl = window.location.origin;
     dataString = "MemberID =  " + MemberID +
         "&MemberName =  " + MemberName +
         "&MemberDOB =  " + MemberDOB +
         "&MemberDOD =  " + MemberDOD +
         "&Spouse =  " + Spouse +
         "&SpouseDOB =  " + SpouseDOB +
         "&SpouseDOD =  " + SpouseDOD +
         "&MemberFatherName =  " + MemberFatherName +
         "&MemberMotherName =  " + MemberMotherName +
         "&MemberParentID =  " + MemberParentID +
         "&MemberAddress =  " + MemberAddress +
         "&MemberTown =  " + MemberTown +
         "&MemberCountry =  " + MemberCountry +
         "&MemberPlaceOfBirth =  " + MemberPlaceOfBirth +
         "&MemberQualification =  " + MemberQualification +
         "&MemberProfession =  " + MemberProfession +
         "&MemberAboutMe =  " + MemberAboutMe +
         "&Gender =  " + Gender ;

         console.log(dataString);
    alert("Data Recieved ");

    $.ajax({
        type: "POST",
        url: baseurl + Vanshavalliservleturl + "?" + dataString,
        dataType: "text",
        content: "application/json; charset=UTF-8",
        // data : JSON.stringify(data),
        success: function (callbackresponse) {

            treeBoxes('', callbackresponse);

        },
        error: function (callbackresponse) {
            alert (dataString);

        },
        done: function(callbackresponse){

        },
        complete: function(){

        }
    });

}


// function addDataToExcel(){
//    var fetchedExcelDatainJson =  vanshavaliData();
//
//    fetchedExcelDatainJson.push();
//
//
//
// }
//

function addDataToExcel(dataString){


   // alert("add Data to Excel started");


    var baseurl = window.location.origin;

    $.ajax({
        type: "POST",
        url: baseurl + Vanshavalliservleturl + "?" + dataString,
        dataType: "text",
        content: "application/json; charset=UTF-8",
        // data : JSON.stringify(data),
        success: function (callbackresponse) {

        var memberdetail =     JSON.parse(callbackresponse);
        alert("successfully updated details of " + MemberName);
        //setJsondata( JSON.parse(callbackresponse));
            setJsondata( callbackresponse);
            //treeBoxes('', callbackresponse);

        },
        error: function (callbackresponse) {
            alert ("something went wrong, please save again");

        },
        done: function(callbackresponse){

        },
        complete: function(){

        }
    });





}

function genratejsonfile() {

    var xhr = new XMLHttpRequest;
    xhr.open("POST", "data-example3.json", false);
    xhr.setRequestHeader('Content-Type', "application/json;charset=UTF-8" );
    xhr.send(jsondata);

}

function exportDataToExcel(){
    var createXLSLFormatObj = [];

    /* XLS Head Columns */
    var xlsHeader = ["MemberID", "MemberName" , "MemberDOB" , "MemberDOD" , "Spouse" , "SpouseDOB" , "SpouseDOD", "MemberFatherName" , "MemberMotherName" , "MemberParentID", "MemberAddress" , "MemberTown" , "MemberCountry","MemberPlaceOfBirth", "MemberQualification" , "MemberProfession" , "MemberAboutMe" , "Gender"];
    var xlsRows = getJsondata();
    createXLSLFormatObj.push(xlsHeader);
    $.each(xlsRows, function(index, value) {
        var innerRowData = [];

        $.each(value, function(ind, val) {

            innerRowData.push(val);
        });
        createXLSLFormatObj.push(innerRowData);
    });


    /* File Name */
    var filename = "Prakash-Shrivastava_Vanshavali.xlsx";

    /* Sheet Name */
    var ws_name = "Vanshavali";

    if (typeof console !== 'undefined') console.log(new Date());
    var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);

    /* Add worksheet to workbook */
    XLSX.utils.book_append_sheet(wb, ws, ws_name);

    /* Write workbook and Download */
    if (typeof console !== 'undefined') console.log(new Date());
    XLSX.writeFile(wb, filename);
    if (typeof console !== 'undefined') console.log(new Date());
}


function exportDataToExcelold(){

    alert("add Data to Excel started");

    /* set up XMLHttpRequest */
    var url = "Vanshavali_Data2.xlsx";
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload  = function(e) {
        var arraybuffer = oReq.response;

        /* convert data to binary string */
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");

        /* Call XLSX */
        var workbook = XLSX.read(bstr, {type:"binary"});

        /* DO SOMETHING WITH workbook HERE */
        var first_sheet_name = workbook.SheetNames[0];
        /* Get worksheet */
        var worksheet = workbook.Sheets[first_sheet_name];
        XLSX.utils.sheet_add_aoa(worksheet, [[4,5,6,7,8,9,0]], {origin: -1});
        XLSX.writeFile(workbook, url);



        //  var wb = XLSX.utils.book_new();
        //XLSX.utils.book_append_sheet(wb, worksheet, "NewData");

        //worksheet.addRow({MemberID: 1, MemberName: 'John Doe', MemberDOB: new Date(1970,1,1)});
        alert("done");

        // console.log( jsondata);


    }


    oReq.send();



}

// function vanshavaliData() {
//     /* set up XMLHttpRequest */
//     var url = "Vanshavali_Data.xlsx";
//     var oReq = new XMLHttpRequest();
//     oReq.open("GET", url, true);
//     oReq.responseType = "arraybuffer";
//
//     oReq.onload  = function(e) {
//         var arraybuffer = oReq.response;
//
//         /* convert data to binary string */
//         var data = new Uint8Array(arraybuffer);
//         var arr = new Array();
//         for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
//         var bstr = arr.join("");
//
//         /* Call XLSX */
//         var workbook = XLSX.read(bstr, {type:"binary"});
//
//         /* DO SOMETHING WITH workbook HERE */
//         var first_sheet_name = workbook.SheetNames[0];
//         /* Get worksheet */
//         var worksheet = workbook.Sheets[first_sheet_name];
//         jsondata  = XLSX.utils.sheet_to_json(worksheet,{raw:true});
//         // console.log( jsondata);
//         // data(jsondata);
//
//     }
//
//
//     oReq.send();
//
//     return   jsondata ;
//
// }
//

// function captureRootChildrens(ParentID ,oldFormat ,TreeDepthNumber){
//
//     var len = oldFormat.length,
//         linkData ,
//         personData ,
//         allchild = [],
//         firgi,
//         i;
//     var flag = 0 ;
//     var j=0;
//     for ( i=0; i < len; i+=1 ) {
//         if (oldFormat[i].MemberParentID === ParentID) {
//             flag = 1;
//             var labledata ;
//
//
//             if (TreeDepthNumber === 1) {
//                 labledata = "Root";
//             } else {
//                 labledata = "child" + TreeDepthNumber - 1;
//             }
//             var linkname;
//             if (oldFormat[i].Gender === "Female") {
//                 linkname = "Daughter";
//             } else if (oldFormat[i].Gender === "Female") {
//                 linkname = "Son";
//             } else {
//                 linkname = "Family_First_Member";
//             }
//
//             linkData = {
//                 "name": linkname,
//                 "MemberName": oldFormat[i].MemberName,
//                 "direction": "ASYN"
//             };
//
//             personData = {
//                 "MemberID": oldFormat[i].MemberID,
//                 "MemberName": oldFormat[i].MemberName,
//                 "name": oldFormat[i].name,
//                 "type": "type" + TreeDepthNumber,
//                 "MemberDOB": oldFormat[i].MemberDOB,
//                 "MemberDOD": oldFormat[i].MemberDOD,
//                 "label": labledata,
//                 "Spouse": oldFormat[i].Spouse,
//                 "SpouseDOB": oldFormat[i].SpouseDOB,
//                 "SpouseDOD": oldFormat[i].SpouseDOD,
//                 "ParentID": oldFormat[i].MemberParentID,
//                 "FatherName": oldFormat[i].MemberFatherName,
//                 "MotherName": oldFormat[i].MemberMotherName,
//                 "Address": oldFormat[i].MemberAddress,
//                 "Town": oldFormat[i].MemberTown,
//                 "Country": oldFormat[i].MemberCountry,
//                 "PlaceOfBirth": oldFormat[i].MemberPlaceOfBirth,
//                 "Qualification": oldFormat[i].MemberQualification,
//                 "Profession": oldFormat[i].MemberProfession,
//                 "Aboutme": oldFormat[i].MemberAboutme,
//                 "link": linkData,
//                 "children": captureChildrensChildrens(oldFormat[i].MemberID, oldFormat, TreeDepthNumber + 1),
//             };
//
//
//             // if(j>0) {
//             //      personData.children = [captureChildrens(oldFormat[i].MemberID, oldFormat, TreeDepthNumber + 1)];
//             //     // personData = {"children" : [captureChildrens(oldFormat[i].MemberID, oldFormat, TreeDepthNumber + 1)] };
//             //
//             //     // personData = $.extend(true, {}, personData, {
//             //     //     "children" : [captureChildrens(oldFormat[i].MemberID, oldFormat, TreeDepthNumber + 1)]
//             //     // });
//             //
//             // }
//             //  allchild.push(personData);
//             // personData = null;
//             // j=j+1;
//         }
//     }
//
//     if(flag === 0) {
//         personData = null ;
//         // allchild = null;
//
//     }
//
//     return personData;
// }
//



