var searchResponse;
var responseLinks = "";
var firstRes = "";
var secondRes = "";




function showSearch(searchIn) {
    return function() {
        var searchFor = document.getElementById('search-for').value;
        var searchBy = document.getElementById('search-by').value;
        if (searchFor === "" || searchBy === "") {
            alert('Please fill in both fields.');
            return;
        } else {
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    searchResponse = JSON.parse(xmlhttp.responseText);
                    console.log(searchResponse);
                    if (searchResponse) {
                        for (var i = 0; i < searchResponse.length; i++) {
                            firstRes = searchResponse[i].firstname || searchResponse[i].referral_date;
                            secondRes = searchResponse[i].lastname || searchResponse[i].vic_last_name;
                            console.log(firstRes);
                            responseLinks += "<a href='#collapseTwo' data-parent='#accordion' data-toggle='collapse'  class='response-link' data-response='" + i + "' >" + firstRes + " " + secondRes + "</a>";
                        }
                        document.getElementsByClassName('response-links')[0].innerHTML = responseLinks;
                        //populateForm(searchResponse);
                    }
                }
            };
            xmlhttp.open("GET", searchIn + "?searchBy=" + searchBy + "&searchFor=" + searchFor, true);
            xmlhttp.send();

        }
    };
}

function populateForm(data) {
    $.each(data, function(key, value) {
        var keyCss = key.replace(/_/g, '');
        $("input[name='" + keyCss + "']").val(value);
        $("textarea[name='" + keyCss + "']").val(value);
        $("select[name='" + keyCss + "'] option[value='" + value + "']").prop("selected", true);
    });
    $('input[type="checkbox"]').each(function() {
        cb = $(this);
        cb.prop('checked', cb.val());
    });
}

$('input[type="checkbox"]').change(function() {
    cb = $(this);
    cb.val(cb.prop('checked'));
});

$('.search-button').each(function() {
    var searchHere = $(this).attr('data-search');
    $(this).click(
        showSearch(searchHere)
    );
});
$('body').on('click', '.response-links a', function(event) {
    event.preventDefault();
    console.log($(this).attr('data-response'));
    populateForm(searchResponse[$(this).attr('data-response')]);
});
