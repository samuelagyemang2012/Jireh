var global_id, global_username, global_telephone, global_password, global_length;
var hide = 0;
var stitle, sname, fname, oname, spousename, numchildren, raddress, mtel, otel, dob, email, occup, nation, ename, eaddress, mstatus, funds, mincome, iden, idnum, doi, edate, literacy, hometown, soc_sec, nummembers, numdep, father, mother, kinname, kinaddress, kintel, kinrel, spouseaddress, spousetel, susername, spassword, scpassword, pic;

$(function () {
    //$("[data-role=header]").toolbar();
    //$("[data-role=popup]").popup().enhanceWithin();
});

function send_request(url) {
    "use strict";
    var obj, result;
    obj = $.ajax({
        url: url,
        async: false
    });
    result = $.parseJSON(obj.responseText);
    return result;
}

function change_page(page, transition) {
    $.mobile.pageContainer.pagecontainer("change", page, {transition: transition});
}

function login() {

    var url, username, password, obj;

    username = $("#username").val();
    password = $("#password").val();

    //not null
    if (username.length > 0 && password.length > 0) {

        //api
        //url = "./server-side/controller.php?cmd=2&username=" + username + "&password=" + password;
        //obj = send_request(url);

        var result = 1

        if (result == 1) {

            //global_id = obj.id;

            //set_cookies(global_id);

            setTimeout(
                function () {
                    change_page("#myloanpage", "slide");
                }, 800);

        } else {
            $("#loginfailpopup").popup("open", {transition: "slide"});
        }
    } else {
        $("#loginfailpopup2").popup("open", {transition: "slide"});
    }
}

function get_fields_create() {

    stitle = $("#stitle").val();
    sname = $("#sname").val();
    fname = $("#fname").val();
    oname = $("#oname").val();
    spousename = $("#spousename").val();
    numchildren = $("#numchilren").val();
    raddress = $("#raddress").val();
    mtel = $("#mtel").val();
    otel = $("#otel").val();
    dob = $("#dob").val();
    email = $("#email").val();
    occup = $("#occup").val();
    nation = $("#nation").val();
    ename = $("#ename").val();
    eaddress = $("#eaddress").val();
    mstatus = $("#mstatus").val();
    funds = $("#funds").val();
    mincome = $("#mincome").val();
    iden = $("#iden").val();
    idnum = $("#idnum").val();
    doi = $("#doi").val();
    edate = $("#edate").val();
    literacy = $("#literacy").val();
    hometown = $("#hometown").val();
    soc_sec = $("#soc_sec").val();
    nummembers = $("#nummembers").val();
    numdep = $("#numdep").val();
    father = $("#father").val();
    mother = $("#mother").val();
    kinname = $("#kinname").val();
    kinaddress = $("#kinaddress").val();
    kintel = $("#kintel").val();
    kinrel = $("#kinrel").val();
    spouseaddress = $("#spouseaddress").val();
    spousetel = $("#spousetel").val();
    susername = $("#susername").val();
    spassword = $("#spassword").val();
    scpassword = $("#scpassword").val();
    pic = $("#pic").val();
}

function get_fields_loans() {

}

function get_profile_data() {
    var url, url1, id, obj, obj1, build;

    id = global_id;
    build = "";

    url = "./server-side/controller.php?cmd=1&id=" + id;
    url1 = "./server-side/controller.php?cmd=12&id=" + id;

    obj = send_request(url);
    obj1 = send_request(url1);

    if (obj1.result == 1) {

        //alert(obj1.groups[0].group_name);
        for (var i in obj1.groups) {
            build += "<p class='align-center'>" + obj1.groups[i].group_name + "</p>";
        }

        $("#pgroups").html(build);
    }

    if (obj.result == 1) {

        set_profile_info(obj.username, obj.firstname, obj.middlename, obj.lastname, obj.email, obj.phonenumber);
        //set_edit_info(obj.username, obj.firstname, obj.middlename, obj.lastname, obj.email, obj.phonenumber);

        setTimeout(
            function () {
                change_page("#profilepage", "")
            }, 800);
    }//must have else;
}

function create_account() {
    var url, obj, build;

    //stitle, sname, fname, oname, spousename, numchildren, raddress, mtel, otel, dob, email, occup, nation, ename, eaddress, mstatus, funds, mincome, iden, idnum, doi, edate, literacy, hometown, soc_sec, nummembers, numdep, father, mother, kinname, kinaddress, kintel, kinrel, spouseaddress, spousetel, susername, spassword, scpassword,pic

    get_fields_create();

    //url = "./server-side/controller.php?cmd=6&id=" + id;
    //obj = send_request(url);

    change_page("#ainfopage", "pop");
}

function create_loan() {

}

function set_profile_info(u, f, m, l, e, t) {

    $("#pusername").val(u);
    $("#pfname").val(f);
    $("#pmname").val(m);
    $("#plname").val(l);
    $("#pemail").val(e);
    $("#ptelephone").val(t);
}

function set_cookies(i) {
    $.cookie('id', i);
}

function view_appointments() {

    var url, obj, build;

    url = "./server-side/controller.php?cmd=10&id=" + global_id;
    obj = send_request(url);

    build = "";
    //build += '<a onclick="" data-role="button" class="ui-btn-fab ui-btn ui-btn-inline" id="add" style="background-color: #4CAF50; color: #fff;"data-transition="slidedown"href="#addapppage"><i class="zmdi zmdi-plus zmd-2x"></i> </a>';

    if (obj.result == 0) {

        build += "<div class='align-center'>";
        build += "<p>No Appointments yet !</p>";
        build += "</div>";
        $("#app").html(build);

    } else {

        build += "<label>Appointments</label>";

        for (var i in obj.myapps) {

            build += "<div class='nd2-card'>";
            build += "<div class='card-title'>";
            build += "<h4 style='color: #4CAF50' class='' style=''>" + obj.myapps[i].purpose + "</h4>";
            //build += "<h5>From " + +" to " + +"</h5>";
            build += "<div class='card-action'>";
            build += "<div class='row between-xs'>";
            build += "<div class='col-xs-12 align-left'>";
            build += "<div class='box'>";
            build += "<p><i style='color: #4CAF50' class='zmdi zmdi-account'></i> &nbsp;" + obj.myapps[i].who_to_see + "</p>";
            build += "<p><i style='color: #4CAF50' class='zmdi zmdi-time'></i> &nbsp;" + obj.myapps[i].duration + "</p>";
            build += "<p><i style='color: #4CAF50' class='zmdi zmdi-calendar'></i>&nbsp;&nbsp;" + obj.myapps[i].date + "</p>"
            build += "</div>";
            build += "</div>";
            build += "</div>";
            build += "</div>";

            build += "<div class='row'>";
            build += "<div class='col-xs-6'>";
            //build += "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button waves-effect waves-button' onclick=''><i style='font-size: 20px' class='zmdi zmdi-arrow-back'></i></a>";
            build += "</div>"
            build += "<div class='col-xs-6 align-right'>"
            //build += "<a href='#' class='ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button waves-effect waves-button' onclick=''><i style='font-size: 20px; color: #4CAF50' class='zmdi zmdi-delete'></i></a>";
            build += "</div>";
            //build += "<a href='#' style='background-color: gainsboro' class='ui-btn waves-effect waves-button waves-effect waves-button' onclick='join(" + obj.id + ")'><i style='font-size: 20px' class='zmdi zmdi-account-add'></i></a>";
            build += "</div>";

            build += "</div>";
            build += "</div>";

        }

        build += '</ui>';

        $("#app").html(build);
    }
    change_page("#appointmentpage", "");
}

function update() {
    var url, username, firstname, middlename, lastname, email, telephone, id, obj;

    username = $("#eusername").val();
    firstname = $("#efname").val();
    middlename = $("#emname").val();
    lastname = $("#elname").val();
    email = $("#eemail").val();
    telephone = $("#etelephone").val();
    id = $.cookie("id");

    if (username.length > 0 && firstname.length > 0 && lastname.length > 0 && email.length > 0 && telephone.length > 0) {

        if (telephone.length < 10) {
            $("#efailpopup3").popup("open", {transition: "slide"});
        }

        //if (password.length < 8) {
        //    $("#efailpopup5").popup("open", {transition: "slide"});
        //}

        //bool = password.localeCompare(cpassword);

        //if (bool !== 0) {
        //    $("#efailpopup4").popup("open", {transition: "slide"});
        //}

        //$username = $_GET['username'];
        //$firstname = $_GET['firstname'];
        //$middlename = $_GET['middlename'];
        //$lastname = $_GET['lastname'];
        //$email = $_GET['email'];
        //$telephone = $_GET['telephone'];
        //$id = $_GET['id'];

        if (telephone.length >= 10) {
            //alert('ready');
            url = "./server-side/controller.php?cmd=3&username=" + username + "&firstname=" + firstname + "&middlename=" + middlename + "&lastname=" + lastname + "&email=" + email + "&telephone=" + telephone + "&id=" + id;
            obj = send_request(url);

            if (obj.result == 1) {

                //alert(obj.result);

                $("#esuccesspopup").popup("open", {transition: "slide"});

                setTimeout(
                    function () {
                        get_profile_data();
                    }, 800);

            } else {
                $("#efailpopup").popup("open", {transition: "slide"});
            }
        }

    } else {
        $("#efailpopup2").popup("open", {transition: "slide"});
    }
}

function hideDoneButton() {
//alert(hide);
    if (hide === 0) {
        hide = 1;
        $("#createaccbtn").hide();
        return;
    }

    if (hide === 1) {
        hide = 0;
        $("#createaccbtn").show();
        return;
    }
    //alert("hide");
    //var sel = $("#agree");
    //if (sel.selectedIndex == 1) {
    //alert("hide");
    //}

}

function myloans(){
    change_page("#myloanpage", "slide");
}

