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

                //alert("login");

                $.cookie('email', username);
                //
                get_loans(username);

                //change_page("#myloanpage", "slide");
            } else {
                alert('not login');
            }

        });
}

function add_client() {

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
            change_page('loginpage#', "");
        }
    });
}

function create_loan() {

    $("#client_email").val($.cookie('email'));

    var datastring = $("#loanform").serialize();

    $.ajax({
        type: "GET",
        url: "http://5.9.86.210:19111/api/add-loan/",
        data: datastring,
        dataType: "json",
        async: false,

        success: function (data) {

            if (data.code == 1) {

                get_loans($.cookie('email'));
                change_page("#myloanpage","");
                //alert("dsad");

            }
        },
        error: function () {
            //change_page('loginpage#')
            alert("opps");
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

                //console.log(response);

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

                change_page('#myloanpage', '');
            }

        });
}


