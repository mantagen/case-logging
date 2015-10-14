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
    var prefixNum = 1;
    var prefix = 'flags';
    $.each(data, function(key, value) {
        $("input[name='password']").prop('readonly', true).css('text-indent', '-999em');
        var thisInput;
        var keyCss = key.replace(/_/g, '');
        if (value) {
            if (parseInt(keyCss[prefix.length]) > prefixNum) {
                console.log('repeat');
                $('.add-multiple[data-prefix='+prefix+']').parent().find('.add-multiple-button').trigger('click');
                console.log(keyCss);
                prefixNum++;
                //console.log(thisInput.parents('.add-multiple-parent').children('.add-multiple-button'));
            }
            if ($("input[name='" + keyCss + "']").parents('.add-multiple-parent').length ||
                $("textarea[name='" + keyCss + "']").parents('.add-multiple-parent').length ||
                $("select[name='" + keyCss + "']").parents('.add-multiple-parent').length
            ) {
                if ($("input[name='" + keyCss + "']").length) {
                    thisInput = $("input[name='" + keyCss + "']");
                } else if ($("textarea[name='" + keyCss + "']").length) {
                    thisInput = $("textarea[name='" + keyCss + "']");
                } else if ($("select[name='" + keyCss + "']").length) {
                    thisInput = $("select[name='" + keyCss + "']");
                }
                if (thisInput.parents('.add-multiple').data('prefix') !== prefix) {
                    prefix = thisInput.parents('.add-multiple').data('prefix');
                    prefixNum = 1;
                }


            }
        }

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
