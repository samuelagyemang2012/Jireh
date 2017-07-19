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

function popout_close(id, transition) {
    $("#" + id).popup("close", {transition: transition});
}

function change_page(page, transition) {
    $.mobile.pageContainer.pagecontainer("change", page, {transition: transition});
}

function login() {

    var url, username, password;


    username = $("#username").val();
    password = $("#lpassword").val();

    if (username.length == 0 || password.length == 0) {
        popout('loginfailpopup2', 'pop');
    }

    $.post("http://5.9.86.210:19111/api/login/" + username + "/" + password,

        function (response) {

            if (response.code == 1) {

                $.cookie('email', username);

                get_loans(username);

            } else {
                popout('loginfailpopup', 'pop');
            }
        });
}

function add_client(e) {

    var built = '';

    popout('loading', 'pop');

    e.preventDefault();

    var is_empty = is_form_empty('signupform');

    //alert(is_empty);

    var password = $("#password").val();
    var cpassword = $("#cpassword").val();

    var agree = $("#agree").val();

    if (is_empty == true) {
        //alert('null field');
        setTimeout(
            function () {
                document.getElementById('loading').innerHTML = "Please fill all required fields";
                document.getElementById('loading').style.color = "crimson";
            }, 200);

        setTimeout(
            function () {
                popout_close('loading', 'pop');
                document.getElementById('loading').innerHTML = "Processing Request";
                document.getElementById('loading').style.color = "#4CAF50";
                //popout_close('apploading', 'pop');
            }, 1500);
        return;
    }

    if (password.localeCompare(cpassword) != 0) {
        setTimeout(
            function () {
                document.getElementById('loading').innerHTML = "Both passwords must match";
                document.getElementById('loading').style.color = "crimson";
            }, 200);

        setTimeout(
            function () {
                popout_close('loading', 'pop');
                document.getElementById('loading').innerHTML = "Processing Request";
                document.getElementById('loading').style.color = "#4CAF50";
                //popout_close('apploading', 'pop');
            }, 1500);
        return;
    }

    if (agree == 2) {

        setTimeout(
            function () {
                document.getElementById('loading').innerHTML = "You must agree with the terms and conditions";
                document.getElementById('loading').style.color = "crimson";
            }, 200);

        setTimeout(
            function () {
                popout_close('loading', 'pop');
                document.getElementById('loading').innerHTML = "Processing Request";
                document.getElementById('loading').style.color = "#4CAF50";
                //popout_close('apploading', 'pop');
            }, 1500);

        //popout('sfailpopup3', 'pop');
    }

    if (is_empty == false && agree == 1) {

        e.preventDefault();

        var form = $('#signupform')[0];

        var formData = new FormData(form);

        $.ajax({
            url: 'http://5.9.86.210:19111/api/add-client',
            data: formData,
            type: 'POST',
            contentType: false,
            processData: false,

            success: function (data) {

                if (data.code == '12') {

                    setTimeout(
                        function () {

                            for (var i in data.msg) {
                                //built += "<br>";
                                built += "<p style='color: crimson;'>" + data.msg[i] + "</p>";
                            }
                            built += "<a href='#' class='ui-btn ui-btn-inline waves-button' onclick='sethidden()'>Close</a>";
                            built += "<br>";
                            $("#errors").html(built);
                            $("#errors").show();
                        }, 200);

                    setTimeout(
                        function () {
                            popout_close('loading', 'pop');
                            document.getElementById('loading').innerHTML = "Processing Request";
                            document.getElementById('loading').style.color = "saddlebrown";
                            //popout_close('apploading', 'pop');
                        }, 1200);
                }

                if (data.code == '11') {

                    setTimeout(
                        function () {
                            document.getElementById('loading').innerHTML = "Invalid Data Provided";
                            document.getElementById('loading').style.color = "crimson";
                        }, 200);

                    setTimeout(
                        function () {
                            popout_close('loading', 'pop');
                            document.getElementById('loading').innerHTML = "Processing Request";
                            document.getElementById('loading').style.color = "saddlebrown";
                        }, 1500);
                }

                if (data.code == '14') {

                    setTimeout(
                        function () {
                            document.getElementById('loading').innerHTML = "Picture failed to upload";
                            document.getElementById('loading').style.color = "crimson";
                        }, 200);

                    setTimeout(
                        function () {
                            popout_close('loading', 'pop');
                            document.getElementById('loading').innerHTML = "Processing Request";
                            document.getElementById('loading').style.color = "saddlebrown";
                        }, 1500);
                }

                if (data.code == 0) {

                    //popout('successpopup', '');
                    alert("Sign Up Sucessful");
                    document.getElementById('signupform').reset();

                    setTimeout(
                        function () {
                            //popout('successpopup', 'slide')
                            change_page("#loginpage", "pop");
                        }, 1000);
                }
            },

            error: function (data) {

                if (data.code == 9) {
                    popout('failpopup', 'pop');
                    change_page('#loginpage', 'pop');
                }
                //alert("fail");
            }
        });
    }
}

function create_loan(e) {

    var built = '';

    popout('loading2', 'pop');

    e.preventDefault();
    //
    $("#client_email").val($.cookie('email'));
    //
    var is_empty = is_form_empty('loanform');

    var agree = $("#ag").val();

    if (is_empty == true) {

        setTimeout(
            function () {
                document.getElementById('loading2').innerHTML = "Please fill all required fields";
                document.getElementById('loading').style.color = "crimson";
            }, 200);

        setTimeout(
            function () {
                popout_close('loading', 'pop');
                document.getElementById('loading').innerHTML = "Processing Request";
                document.getElementById('loading').style.color = "saddlebrown";
                //popout_close('apploading', 'pop');
            }, 1500);
        return;
        //popout('loanpopup2', 'pop');
    }

    if (agree == 2) {
        setTimeout(
            function () {
                document.getElementById('loading').innerHTML = "You must agree with the terms and conditions";
                document.getElementById('loading').style.color = "crimson";
            }, 200);

        setTimeout(
            function () {
                popout_close('loading', 'pop');
                document.getElementById('loading').innerHTML = "Processing Request";
                document.getElementById('loading').style.color = "#4CAF50";
                //popout_close('apploading', 'pop');
            }, 1500);
        return;
        //popout('loanpopup1', 'pop');
    }


    if (is_empty == false && agree == 1) {

        e.preventDefault();
        //
        //$("#client_email").val($.cookie('email'));
        //
        var datastring = $("#loanform").serialize();

        $.ajax({
            type: 'post',
            url: 'http://5.9.86.210:19111/api/add-loan?',
            data: datastring,

            success: function (results) {

                if (results.code == '11') {

                    setTimeout(
                        function () {

                            for (var i in results.msg) {
                                built += "<p style='color: crimson;'>" + results.msg[i] + "</p>";
                            }
                            built += "<a href='#' class='ui-btn ui-btn-inline waves-button' onclick='sethidden2()'>Close</a>";
                            built += "<br>";
                            $("#errors2").html(built);
                            $("#errors2").show();
                        }, 200);

                    setTimeout(
                        function () {
                            popout_close('loading2', 'pop');
                            document.getElementById('loading2').innerHTML = "Processing Request";
                            document.getElementById('loading2').style.color = "saddlebrown";
                            //popout_close('apploading', 'pop');
                        }, 1200);
                }

                if (results.code == '1') {

                    get_loans($.cookie('email'));

                    //popout('loanpopup', 'pop');
                    alert("Loan Request Successful");
                    document.getElementById('loanform').reset();

                    setTimeout(
                        function () {
                            change_page("#myloanpage", "pop");
                        }, 3000);
                }

                if (results.code == '0') {

                    setTimeout(
                        function () {
                            document.getElementById('loading').innerHTML = "Loan request failed";
                            document.getElementById('loading').style.color = "crimson";
                        }, 200);

                    setTimeout(
                        function () {
                            popout_close('loading', 'pop');
                            document.getElementById('loading').innerHTML = "Processing Request";
                            document.getElementById('loading').style.color = "saddlebrown";
                        }, 1500);
                }
            },

            error: function (results) {
                //
                //            //if (results.errors != null) {
                //            //    alert(results.errors);
                //            //}
                //            //alert('error');
                //            //popout_message('loanpopupmsg', "Your loan application was successful.");
                //            //popout('loanpopup', 'pop');
            }
        });
    }
}

function is_form_empty(form) {

    var form = document.getElementById(form);
    // get all the inputs within the submitted form
    var inputs = form.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        // only validate the inputs that have the required attribute

        if (inputs[i].value == "") {
            return true;
            //alert(inputs[i].name);
            break;
        } else {
            return false;
        }
    }
}

function get_loans(email) {

    var build;

    build = "";

    $.post("http://5.9.86.210:19111/api/getloans/" + email,

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

function sendImage(e) {

    e.preventDefault();

    //var form = $('#testform')[0];

    var formData = $("#testform").serialize();

    $.post("http://5.9.86.210:19111/api/test?" + formData,

        function (response) {

            //alert("sasada");

            if (response.code == 9) {

                alert(response.msg);

            }
        });
}

function sethidden() {
    $("#errors").hide();
}

function sethidden2() {
    $("#errors2").hide();
}




