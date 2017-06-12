var hide = 0;
var is_empty = false;

$(function () {
    //$("[data-role=header]").toolbar();
    //$("[data-role=popup]").popup().enhanceWithin();
});

function popout_message(contentid, msg) {
    $("#" + contentid).html(msg);
}

function popout(id, transition) {
    $("#" + id).popup("open", {transition: transition});
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

            } else {
                popout('loginfailpopup', 'slide');
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

function create_loan(e) {

    e.preventDefault();

    $("#client_email").val($.cookie('email'));

    is_form_empty();

    var agree = $("#ag").val();

    if (is_empty == true) {
        popout('loanpopup2', 'slide');
    }

    if (agree == 2) {
        popout('loanpopup1', slide)
    }


    if (is_empty == false && agree == 1) {


        e.preventDefault();
        //
        //$("#client_email").val($.cookie('email'));
        //
        var datastring = $("#loanform").serialize();

        $.ajax({
            type: 'get',
            url: 'http://5.9.86.210:19111/api/add-loan?',
            data: datastring,

            success: function (results) {

                get_loans($.cookie('email'));

                popout('loanpopup', 'slide');

                setTimeout(
                    function () {
                        change_page("#myloanpage", "slide");
                    }, 1000);
            },

            error: function (results) {
                //
                //            //if (results.errors != null) {
                //            //    alert(results.errors);
                //            //}
                //            //alert('error');
                //            //popout_message('loanpopupmsg', "Your loan application was successful.");
                //            //popout('loanpopup', 'slide');
            }
        });

    }
}

function is_form_empty() {

    var form = document.getElementById('loanform');
    // get all the inputs within the submitted form
    var inputs = form.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        // only validate the inputs that have the required attribute

        if (inputs[i].value == "") {
            is_empty = true;
            //alert(inputs[i].name);
            break;
        } else {
            is_empty = false;
        }
    }

    //is_empty = false;
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


