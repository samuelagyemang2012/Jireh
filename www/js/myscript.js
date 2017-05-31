var global_id, global_username, global_telephone, global_password, global_length;
var hide = 0;
var stitle, gender, sname, fname, oname, spousename, numchildren, raddress, mtel, otel, dob, email, occup, nation, ename, eaddress, mstatus, funds, mincome, iden, idnum, doi, edate, literacy, hometown, soc_sec, nummembers, numdep, father, mother, kinname, kinaddress, kintel, kinrel, spouseaddress, spousetel, susername, spassword, scpassword, pic;

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

    var url, username, password;


    username = $("#username").val();
    password = $("#lpassword").val();

    $.get("http://5.9.86.210:19111/api/login/" + username + "/" + password,

        function (response) {

            if (response.code == 1) {
                $.cookie('email', username);

                get_loans(username);

                change_page("#myloanpage", "slide");
            }

        });
}

function add_client() {

    //$("form").on("submit", function (event) {
    //    event.preventDefault();
    //    console.log($(this).serialize());
    //});

    var datastring = $("form").serialize();

    $.ajax({
        type: "GET",
        url: "http://5.9.86.210:19111/api/add-client",
        data: datastring,
        dataType: "json",

        success: function (data) {
            alert(data.msg);
        },
        error: function () {
            change_page('loginpage#')
        }
    });
}

function get_loans(email) {

    var build;

    build = "";

    //alert("dsa");

    $.get("http://5.9.86.210:19111/api/getloans/" + email,

        function (response) {

            if (response.code == 1) {

                console.log(response);

                for (var i in response.data) {

                    build += "<div class='nd2-card'>";
                    build += "<div class='card-title'>";
                    build += "<h4 class='card-primary-title' style='color: #8A5241;'> Amount Requested </h4>";
                    build += "<h5>" + response.data[i].amount_requested + "</h5>";
                    build += "<h4 class='card-primary-title' style='color: #8A5241;'> Status </h4>";
                    build += "<h5>" + response.data[i].name + "</h5>";
                    build += "<div class='card-action'>";
                    build += "<div class='row between-xs'>";
                    build += "<div class='col-xs-12 align-right'>";
                    build += "<div class='box'>";
                    build += "<a href='#'class='ui-btn ui-btn-inline ui-btn-fab waves-effect waves-button waves-effect waves-button'></a>";
                    build += "</div>";
                    build += "</div>";
                    build += "</div>";
                    build += "</div>";
                    build += "</div>";
                    build += "</div>";
                }

                $("#myloans").html(build);
            }

        });
}


//function get_fields_loans() {
//
//}

//function get_profile_data() {
//    var url, url1, id, obj, obj1, build;
//
//    id = global_id;
//    build = "";
//
//    url = "./server-side/controller.php?cmd=1&id=" + id;
//    url1 = "./server-side/controller.php?cmd=12&id=" + id;
//
//    obj = send_request(url);
//    obj1 = send_request(url1);
//
//    if (obj1.result == 1) {
//
//        //alert(obj1.groups[0].group_name);
//        for (var i in obj1.groups) {
//            build += "build += " < p
//        class
//            = 'align-center' > " + obj1.groups[i].group_name + "
//            build += "</p>";
//        }
//
//        $("#pgroups").html(build);
//    }
//
//    if (obj.result == 1) {
//
//        set_profile_info(obj.username, obj.firstname, obj.middlename, obj.lastname, obj.email, obj.phonenumber);
//        //set_edit_info(obj.username, obj.firstname, obj.middlename, obj.lastname, obj.email, obj.phonenumber);
//
//        setTimeout(
//            function () {
//                change_page("#profilepage", "")
//            }, 800);
//    }//must have else;
//}

//function create_account() {
//    var url, obj, build;
//
//    //stitle, sname, fname, oname, spousename, numchildren, raddress, mtel, otel, dob, email, occup, nation, ename, eaddress, mstatus, funds, mincome, iden, idnum, doi, edate, literacy, hometown, soc_sec, nummembers, numdep, father, mother, kinname, kinaddress, kintel, kinrel, spouseaddress, spousetel, susername, spassword, scpassword,pic
//
//    get_fields_create();
//
//    //url = "./server-side/controller.php?cmd=6&id=" + id;
//    //obj = send_request(url);
//
//    change_page("#ainfopage", "pop");
//}

function create_loan() {

}



