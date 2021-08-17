/**
 * Created by Shiva on 05/06/20.
 */

var baseurl;
var Vanshavalliservleturl ;
var Vanshavallifetchservleturl ;

var baseurl = window.location.origin;
Vanshavalliservleturl = "/VanshavaliServlet";
Vanshavallifetchservleturl = "/VanshavaliUpdateServlet";
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



function LoadMemberName()
{
    //  var select = document.getElementById("selectmemberdropdown");
    var select1 = jQuery('#selectmemberdropdown');
    var SelectedMember = jQuery("#selectmemberdropdown").val();
    jQuery('#selectmemberdropdown').empty();
    jQuery('<option>').val("Select Member").text("Select Member").appendTo(select1);

    // $.each(items, function() {
    //     $("<option />")
    //         .attr("value", this.value)
    //         .html(this.name)
    //         .appendTo("#firstmenu");
    //     temp[this.value] = this.subitems;
    // });
    //
    // $("#firstmenu").change(function() {
    //     var value = $(this).val();
    //     var menu = $("#secondmenu");
    //
    //     menu.empty();
    //     $.each(temp[value], function() {
    //         $("<option />")
    //             .attr("value", this.value)
    //             .html(this.name)
    //             .appendTo(menu);
    //     });
    // }).change();

    for( var i=1 ; i<jsondata.length; i++)
    {
        jQuery('<option>').val(jsondata[i].MemberName + " -" + jsondata[i].MemberID).text(jsondata[i].MemberName + " -" + jsondata[i].MemberID ).appendTo(select1);
    }

    jQuery("#selectmemberdropdown").val(SelectedMember) ;
}



function LoadFatherName()
{
    //  var select = document.getElementById("selectmemberdropdown");
    var select1 = jQuery('#loadfathername');
    jQuery('#loadfathername').empty();
    jQuery('<option>').val("Unknown").text("Unknown").appendTo(select1);



    for( var i=0 ; i<jsondata.length; i++)
    {
        jQuery('<option>').val(jsondata[i].MemberName + " -" + jsondata[i].MemberID).text(jsondata[i].MemberName + " -" + jsondata[i].MemberID ).appendTo(select1);
    }

}


function LoadMotherName()
{
    //  var select = document.getElementById("selectmemberdropdown");
    var select1 = jQuery('#MFnamedropdown');
    var SelectedMember = jQuery("#MFnamedropdown").val();
    jQuery('#MFnamedropdown').empty();
    jQuery('<option>').val("Unknown").text("Unknown").appendTo(select1);

    var father = jQuery('#Fname').val();
    for( var i=0 ; i<jsondata.length; i++)
    {
        if(jsondata[i].Gender==="Male") {
        jQuery('<option>').val(jsondata[i].MemberName + " -" + jsondata[i].Spouse).text(jsondata[i].MemberName + " -" + jsondata[i].Spouse ).appendTo(select1);
    }else
    {
        jQuery('<option>').val(jsondata[i].Spouse+ " -" + jsondata[i].MemberName).text(jsondata[i].Spouse+ " -" + jsondata[i].MemberName).appendTo(select1);
    }
    }
    jQuery("#MFnamedropdown").val(SelectedMember);
}



function onUpdateLoadMotherName()
{
    //  var select = document.getElementById("selectmemberdropdown");
    var select1 = jQuery('#uMFnamedropdown');
    var SelectedMember = jQuery("#uMFnamedropdown").val();
    jQuery('#uMFnamedropdown').empty();
    jQuery('<option>').val("Unknown").text("Unknown").appendTo(select1);

    var father = jQuery('#Fname').val();
    for( var i=0 ; i<jsondata.length; i++)
    {
        if(jsondata[i].Gender==="Male") {
            jQuery('<option>').val(jsondata[i].MemberName + " -" + jsondata[i].Spouse).text(jsondata[i].MemberName + " -" + jsondata[i].Spouse ).appendTo(select1);
        }else
        {
            jQuery('<option>').val(jsondata[i].Spouse+ " -" + jsondata[i].MemberName).text(jsondata[i].Spouse+ " -" + jsondata[i].MemberName).appendTo(select1);
        }
    }
    jQuery("#uMFnamedropdown").val(SelectedMember);

}


function SetGenderMale() {


    if (document.getElementById("male").checked == true) {
        document.getElementById("female").checked = false;
    }


    if (document.getElementById("umale").checked == true) {
        document.getElementById("ufemale").checked = false;
    }
}

function SetGenderFemale() {
    if(document.getElementById("female").checked==true){
        document.getElementById("male").checked=false;
    }

    if(document.getElementById("ufemale").checked==true){
        document.getElementById("umale").checked=false;
    }
}


function GetDate(str) {
  //  debugger;
    if(str != undefined && str !="") {
    var arr = str.split('-');
    var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN','JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    var i = 0;
    for (i; i <= months.length; i++) {
        if (months[i] == arr[1])
        {
            break;
        }
    }

    i =i+1 ;
        var a = i ;
    if(i<10) {
        a = '0'+ i;
    }
    var formatddate = arr[2] +  '-' + a + '-' + arr[0]   ;
        return formatddate;
    }

    return "";
}


/**
 * @return {string}
 */
function SetDate(str) {

    if(str != undefined && str !="") {

        //YYYY-MM-DD to - DD-MMM-YYYY

        var arr = str.split('-');

        var months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN','JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        var i = 0;
        var month ;
        for (i; i <= months.length; i++) {
            if (i+1 === parseInt(arr[1]))
            {
                month = months[i]
                break;
            }
        }
        var formatddate = arr[2] +  '-' + month + '-' + arr[0]   ;
        return formatddate;
    }
    return "";

}

function setMemberID(memberID) {
    MemberID = memberID;
}

function getMemberID(){
    return MemberID;
}
function PopulateDataToUpdate()
{
    getJsondata();
    onUpdateLoadMotherName();
    var SelectedMember = jQuery("#selectmemberdropdown").val();
    var SelectedMemberDetails= SelectedMember.split(" -",-1);


    for( var i=0 ; i<jsondata.length; i++)
    {
        if(jsondata[i].MemberName === SelectedMemberDetails[0] && jsondata[i].MemberID.toString() === SelectedMemberDetails[1]) {
            document.getElementById("umale").checked=false;
            document.getElementById("ufemale").checked=false;

            if(jsondata[i].Gender === "Male") {
                document.getElementById("umale").checked=true;
            }else {
                document.getElementById("ufemale").checked=true;
            }

            MemberID = jsondata[i].MemberID;
            setMemberID(jsondata[i].MemberID);
            jQuery("#uname").val(jsondata[i].MemberName);
            jQuery("#uDOB").val(GetDate(jsondata[i].MemberDOB));
            jQuery("#uDOD").val(GetDate(jsondata[i].MemberDOD));
            jQuery("#uSpouse").val(jsondata[i].Spouse);
            jQuery("#uSDOB").val(GetDate(jsondata[i].SpouseDOB));
            jQuery("#uSDOD").val(GetDate(jsondata[i].SpouseDOD));
            jQuery("#uFname").val(jsondata[i].MemberFatherName);
            jQuery("#uMname").val(jsondata[i].MemberMotherName);
            // MemberParentID = jQuery("#ParentID").val();
            jQuery("#uAddress").val(jsondata[i].MemberAddress);
            jQuery("#uTown").val(jsondata[i].MemberTown);
            jQuery("#uCountry").val(jsondata[i].MemberCountry);
            jQuery("#uPlaceOfBirth").val(jsondata[i].MemberPlaceOfBirth);
            jQuery("#uQualification").val(jsondata[i].MemberQualification);
            jQuery("#uProfession").val(jsondata[i].MemberProfession);
            jQuery("#uAbout").val(jsondata[i].MemberAboutMe);
            jQuery("#uMFnamedropdown").val(jsondata[i].MemberFatherName + " -"+ jsondata[i].MemberMotherName ).change();

            break;
        }
    }
}

function UpdateMember()
{

     resp = window.prompt("Please Enter your passcode");


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
                    FetchUpdateData();
                    VerifyMendatoryFields();

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
                        "&updateAdd=update" +
                        "&MemberId=" +  getMemberID()  ;

                    console.log(dataString);
                    // alert("ye wali" + dataString);
                    addDataToExcel(dataString);
                    // PostData();
                }else
                {
                    alert("Sorry,Your passcode doesnt match'/n Try Again!!!!")
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


function FetchUpdateData()
{


    female = null;
    male = null;

    if ( document.getElementById("umale").checked == true )
        male = jQuery("#umale").val();
    if ( document.getElementById("ufemale").checked == true )
        female = jQuery("#ufemale").val();



    var ParentName = jQuery("#uMFnamedropdown").val();
    var parentsName = ParentName.split(" -");



    //MemberID = jQuery("#MemberID").val();
    MemberName = jQuery("#uname").val();
    MemberDOB = jQuery("#uDOB").val();
    MemberDOD = jQuery("#uDOD").val();
    Spouse = jQuery("#uSpouse").val();
    SpouseDOB = jQuery("#uSDOB").val();
    SpouseDOD = jQuery("#uSDOD").val();
    // MemberFatherName = jQuery("#uFname").val();
    // MemberMotherName = jQuery("#uMname").val();

    MemberFatherName = parentsName[0];
    MemberMotherName = parentsName[1];
    // MemberParentID = jQuery("#ParentID").val();
    MemberAddress = jQuery("#uAddress").val();
    MemberTown = jQuery("#uTown").val();
    MemberCountry = jQuery("#uCountry").val();
    MemberPlaceOfBirth = jQuery("#uPlaceOfBirth").val();
    MemberQualification = jQuery("#uQualification").val();
    MemberProfession = jQuery("#uProfession").val();
    MemberAboutMe = jQuery("#uAbout").val();

    if(female === null) {
        Gender = "Male";
    }else {
        Gender = "Female";
    }
    // Gender = jQuery("#Gender").val();



  //  alert("Fetch data completed");

}
function VerifyMendatoryFieldsold()
{
alert("hello 2");

}


function PostData()
{

     dataString = "Name=" +
    name + "&DOB=" + DOB +
        "&Age=" + Age +
        "&ParentName1=" + Parent1 +
        "&ParentName2=" + Parent2 +
        "&Gender=" + Gender +
        "&DOD=" + DOD ;

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

var jsondata;

function setJsondata(Jsondata) {
    jsondata = JSON.parse(Jsondata);
    window.localStorage.setItem('jsondata', Jsondata);
    // JSON.stringify(Jsondata)
}

function getJsondata() {
   var JSONdata = window.localStorage.getItem('jsondata');
   jsondata = JSON.parse(JSONdata);
 //jsondata = JSONdata;
    return jsondata;
}

function vanshavaliData() {
    /* set up XMLHttpRequest */
    // var url = "Vanshavali_Data2.xlsx";
    // var oReq = new XMLHttpRequest();
    // oReq.open("GET", url, true);
    // oReq.responseType = "arraybuffer";
    //
    //  oReq.onload  = function(e) {
    //     var arraybuffer = oReq.response;
    //
    //     /* convert data to binary string */
    //     var data = new Uint8Array(arraybuffer);
    //     var arr = new Array();
    //     for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    //     var bstr = arr.join("");
    //
    //     /* Call XLSX */
    //     var workbook = XLSX.read(bstr, {type:"binary"});
    //
    //     /* DO SOMETHING WITH workbook HERE */
    //     var first_sheet_name = workbook.SheetNames[0];
    //     /* Get worksheet */
    //     var worksheet = workbook.Sheets[first_sheet_name];
    //      jsondata  = XLSX.utils.sheet_to_json(worksheet,{raw:true});
    //     // console.log( jsondata);
    //     // data(jsondata);
    //
    //  }
    //
    //
    // oReq.send();


    $.ajax({
        type: "POST",
        url: baseurl + Vanshavallifetchservleturl ,
        dataType: "text",
        content: "application/json; charset=UTF-8",
        // data : JSON.stringify(data),
        success: function (callbackresponse) {


            setJsondata(callbackresponse);

        },
        error: function (callbackresponse) {
           // alert (dataString);

        },
        done: function(callbackresponse){

        },
        complete: function(){

        }
    });

    // jsondata = getJsondata();
    // console.log(jsondata);
    // return   jsondata ;

}


function captureRootChildrens(ParentID ,oldFormat ,TreeDepthNumber){

    var len = oldFormat.length,
        linkData ,
        personData ,
        allchild = [],
        firgi,
        i;
    var flag = 0 ;
    var j=0;
    for ( i=0; i < len; i+=1 ) {
        if (oldFormat[i].MemberParentID === ParentID) {
            flag = 1;
            var labledata ;


                if (TreeDepthNumber === 1) {
                    labledata = "Root";
                } else {
                    labledata = "child" + TreeDepthNumber - 1;
                }
                var linkname;
                if (oldFormat[i].Gender === "Female") {
                    linkname = "Daughter";
                } else if (oldFormat[i].Gender === "Female") {
                    linkname = "Son";
                } else {
                    linkname = "Family_First_Member";
                }

                linkData = {
                    "name": linkname,
                    "MemberName": oldFormat[i].MemberName,
                    "direction": "ASYN"
                };

                personData = {
                    "MemberID": oldFormat[i].MemberID,
                    "MemberName": oldFormat[i].MemberName,
                    "name": oldFormat[i].name,
                    "type": "type" + TreeDepthNumber,
                    "MemberDOB": oldFormat[i].MemberDOB,
                    "MemberDOD": oldFormat[i].MemberDOD,
                    "label": labledata,
                    "Spouse": oldFormat[i].Spouse,
                    "SpouseDOB": oldFormat[i].SpouseDOB,
                    "SpouseDOD": oldFormat[i].SpouseDOD,
                    "ParentID": oldFormat[i].MemberParentID,
                    "FatherName": oldFormat[i].MemberFatherName,
                    "MotherName": oldFormat[i].MemberMotherName,
                    "Address": oldFormat[i].MemberAddress,
                    "Town": oldFormat[i].MemberTown,
                    "Country": oldFormat[i].MemberCountry,
                    "PlaceOfBirth": oldFormat[i].MemberPlaceOfBirth,
                    "Qualification": oldFormat[i].MemberQualification,
                    "Profession": oldFormat[i].MemberProfession,
                    "Aboutme": oldFormat[i].MemberAboutMe,
                    "link": linkData,
                    "children": captureChildrensChildrens(oldFormat[i].MemberID, oldFormat, TreeDepthNumber + 1),
                };


            // if(j>0) {
            //      personData.children = [captureChildrens(oldFormat[i].MemberID, oldFormat, TreeDepthNumber + 1)];
            //     // personData = {"children" : [captureChildrens(oldFormat[i].MemberID, oldFormat, TreeDepthNumber + 1)] };
            //
            //     // personData = $.extend(true, {}, personData, {
            //     //     "children" : [captureChildrens(oldFormat[i].MemberID, oldFormat, TreeDepthNumber + 1)]
            //     // });
            //
            // }
           //  allchild.push(personData);
            // personData = null;
            // j=j+1;
        }
    }

    if(flag === 0) {
        personData = null ;
        // allchild = null;

    }

    return personData;
}


function captureChildrensChildrens(ParentID ,oldFormat ,TreeDepthNumber){

    var len = oldFormat.length,
        linkData ,
        personData ,
        allchild = [],
        firgi,
        i;
    var flag = 0 ;
    var j=0;
    for ( i=0; i < len; i+=1 ) {
        if (oldFormat[i].MemberParentID === ParentID) {
            flag = 1;
            var labledata ;


                if (TreeDepthNumber === 1) {
                    labledata = "Root";
                } else {
                    labledata = "child" + TreeDepthNumber - 1;
                }
                var linkname;
                if (oldFormat[i].Gender === "Female") {
                    linkname = "Daughter";
                } else if (oldFormat[i].Gender === "Female") {
                    linkname = "Son";
                } else {
                    linkname = "Family_First_Member";
                }

                linkData = {
                    "name": linkname,
                    "MemberName": oldFormat[i].MemberName,
                    "direction": "ASYN"
                };

                personData = {
                    "MemberID": oldFormat[i].MemberID,
                    "MemberName": oldFormat[i].MemberName,
                    "name": oldFormat[i].name,
                    "type": "type" + TreeDepthNumber,
                    "MemberDOB": oldFormat[i].MemberDOB,
                    "MemberDOD": oldFormat[i].MemberDOD,
                    "label": labledata,
                    "Spouse": oldFormat[i].Spouse,
                    "SpouseDOB": oldFormat[i].SpouseDOB,
                    "SpouseDOD": oldFormat[i].SpouseDOD,
                    "ParentID": oldFormat[i].MemberParentID,
                    "FatherName": oldFormat[i].MemberFatherName,
                    "MotherName": oldFormat[i].MemberMotherName,
                    "Address": oldFormat[i].MemberAddress,
                    "Town": oldFormat[i].MemberTown,
                    "Country": oldFormat[i].MemberCountry,
                    "PlaceOfBirth": oldFormat[i].MemberPlaceOfBirth,
                    "Qualification": oldFormat[i].MemberQualification,
                    "Profession": oldFormat[i].MemberProfession,
                    "Aboutme": oldFormat[i].MemberAboutMe,
                    "link": linkData,
                    "children": captureChildrensChildrens(oldFormat[i].MemberID, oldFormat, TreeDepthNumber + 1),
                };



              allchild.push(personData);
            // personData = null;
            j=j+1;
        }
    }

    if(flag === 0) {
        // personData = null ;
        // allchild = null;
        return null;

    }

    return allchild;
}


function captureChildrensold(ParentID ,oldFormat ,TreeDepthNumber){

    var len = oldFormat.length,
        linkData = {name:[],MemberName:[],direction:[]},
        personData = {
            MemberID: [],
            MemberName:[],
            name: [],
            type : [],  // "type2"
            MemberDOB : [],
            MemberDOD : [],
            label : [], //"child1"
            Spouse : [],
            SpouseDOB : [],
            SpouseDOD : [],
            ParentID : [],
            FatherName : [],
            MotherName : [],
            Address : [],
            Town : [],
            Country : [],
            PlaceOfBirth : [],
            Qualification : [],
            Profession : [],
            Aboutme : [],
            link:[],children:[]},
        allchild = [],
        firgi,
        i;
    var flag = 0 ;
    var j=0;
    for ( i=0; i < len; i+=1 ) {
        if (oldFormat[i].MemberParentID === ParentID) {
            flag = 1;

            personData.MemberID.push(oldFormat[i].MemberID);
            personData.MemberName.push(oldFormat[i].MemberName);
            personData.name.push(oldFormat[i].name);
            personData.type.push("type" + TreeDepthNumber);
            personData.MemberDOB.push(oldFormat[i].MemberDOB);
            personData.MemberDOD.push(oldFormat[i].MemberDOD);
            if (TreeDepthNumber === 1) {
                personData.label.push("Root");
            } else {
                personData.label.push("child" + TreeDepthNumber-1);
            }

            personData.Spouse.push(oldFormat[i].Spouse);
            personData.SpouseDOB.push(oldFormat[i].SpouseDOB);
            personData.SpouseDOD.push(oldFormat[i].SpouseDOD);
            personData.ParentID.push(oldFormat[i].MemberParentID);
            personData.FatherName.push(oldFormat[i].MemberFatherName);
            personData.MotherName.push(oldFormat[i].MemberMotherName);
            personData.Address.push(oldFormat[i].MemberAddress);
            personData.Town.push(oldFormat[i].MemberTown);
            personData.Country.push(oldFormat[i].MemberCountry);
            personData.PlaceOfBirth.push(oldFormat[i].MemberPlaceOfBirth);
            personData.Qualification.push(oldFormat[i].MemberQualification);
            personData.Profession.push(oldFormat[i].MemberProfession);
            personData.Aboutme.push(oldFormat[i].MemberAboutMe);

            if(oldFormat[i].Gender === "Female"){
                linkData.name.push("Daughter");
            }else{
                linkData.name.push("Son");
            }

            linkData.MemberName.push(oldFormat[i].MemberName);
            linkData.direction.push("ASYN");

            personData.link.push(linkData);
            personData.children.push(captureChildrens(oldFormat[i].MemberID, oldFormat, TreeDepthNumber + 1));
            // allchild.push(personData);
           // personData = null;
            j=j+1;
        }
    }

        if(flag === 0) {
            personData = null ;
           // allchild = null;

        }

    return personData;
}

function createTreeJson(VanshavaliExcelDataInJson){



    var treeJson = {"tree" :captureRootChildrens(1,VanshavaliExcelDataInJson,1)};
    // var stringifyjsondata = JSON.stringify(captureChildrens(1,oldFormat,1));
    // console.log(stringifyjsondata);
    //  treeJson.push("tree",captureChildrens(1,VanshavaliExcelDataInJson,1));
    return treeJson;
}

// function format(oldFormat) {
//     var len = oldFormat.length,
// newData = {aaData:[]},
//         newData1 = {tree:{}},
//         personData = {
//             MemberID: null,
//             MemberName:null,
//             name: null,
//             type : null,  // "type2"
//             MemberDOB : null,
//             MemberDOD : null,
//             label : null, //"child1"
//             Spouse : null,
//             SpouseDOB : null,
//             SpouseDOD : null,
//             ParentID : null,
//             link:{},Children:[]},
//         linkData = {name:null,MemberName:null,direction:"ASYN"},
//         i;
//
//     var stringifyjsondata = JSON.stringify(jsondata);
//     var finalTreeJson ="";
//     for ( i=0; i < len; i+=1 ) {
//         // var data = createdata(oldFormat[i]);
//         // newData.aaData.push({"tree":{"MemberName":oldFormat[i].MemberName,"name": oldFormat[i].MemberName }});
//         // newData.aaData.push({
//         //
//         //             "MemberName":oldFormat[i].MemberName,"name": oldFormat[i].MemberName ,
//         //             "type" : "type2",
//         //             "MemberDOB" : oldFormat[i].MemberDOB,
//         //             "MemberDOD" : oldFormat[i].MemberDOD,
//         //             "label" : "child1",
//         //             "Spouse" : oldFormat[i].Spouse,
//         //             "SpouseDOB" : oldFormat[i].SpouseDOB,
//         //             "SpouseDOD" : oldFormat[i].MemberDOD,
//         //             "link":{"name":oldFormat[i].name , "MemberName" : oldFormat[i].MemberName,
//         //                 "direction" : "ASYN"},"Children": [ ]
//         //
//         // }
//         // );
//
//             // newData.aaData.push( [ oldFormat[i].MemberID, oldFormat[i].MemberName] );
//        // createtree(oldFormat[i]);
//
//     }
//
//
//     var stringdata = stringifyjsondata[0];
//     newData1.tree.push(
//         stringdata
//     );
//     //
//     // newData.aaData.push({"tree":{"MemberName":oldFormat[0].MemberName,"name": oldFormat[0].MemberName ,
//     //         "type" : "type1",
//     //         "MemberDOB" : oldFormat[0].MemberDOB,
//     //         "MemberDOD" : oldFormat[0].MemberDOD,
//     //         "label" : "Root",
//     //         "Spouse" : oldFormat[0].Spouse,
//     //         "SpouseDOB" : oldFormat[0].SpouseDOB,
//     //         "SpouseDOD" : oldFormat[0].MemberDOD,
//     //         "link":{"name":oldFormat[0].name , "MemberName" : oldFormat[0].MemberName,
//     //             "direction" : "ASYN"},"Children": [finalTreeJson]}});
//     // newData.aaData.push( [ oldFormat[i].MemberID, oldFormat[i].MemberName] );
//
//     var stringifyTreejson = JSON.stringify(newData1);
//     return newData1;
// }

function createdata(Persondata) {


}

/*
* $.ajax({
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
    });*/