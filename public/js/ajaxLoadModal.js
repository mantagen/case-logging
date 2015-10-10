var modalResponse;

function showLogs(logType) {
        return function() {
            var caseId = $('#case-id').val();
            console.log(caseId);
            if (caseId == "" | null) {
                console.log('Please select a case, or save the case you are working on.');
                $('.modal-body .panel-group').each(function() {
                    $(this).addClass('hidden');
                });
            } else {

                $('.modal-body .panel-group').each(function() {
                    $(this).addClass('hidden');
                });
                $('.modal-body .panel-group.' + logType).removeClass('hidden');
                //clear current log window
                $('.new-entry').siblings().remove();
                if (window.XMLHttpRequest) {
                    // code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp = new XMLHttpRequest();
                } else {
                    // code for IE6, IE5
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        modalResponse = JSON.parse(xmlhttp.responseText);
                        console.log(modalResponse);
                        var lastSection;
                        var dataToLoad;
                        for (var i = 0; i < modalResponse.length; i++) {
                            $('.' + logType + ' .new-entry').clone().insertBefore('.' + logType + ' .new-entry').removeClass('new-entry').removeClass('hidden').addClass('fill-me');
                            lastSection = $('.' + logType + ' .fill-me').last();
                            dataToLoad = modalResponse[i];
                            populateFormInWith(lastSection, dataToLoad);
                            // if(i<modalResponse.length-1){
                            //     lastSection.parent().siblings('.add-row-button').trigger('click');
                            // }
                        }
                    }
                };
                xmlhttp.open("GET", "cases?case=" + caseId + "&logtype=" + logType, true);
                xmlhttp.send();
            }
        };
    }


function populateFormInWith(elem, data) {
    $.each(data, function(key, value) {
        var keyCss = key.replace(/_/g, '');
        elem.find("input[name='" + keyCss + "'],textarea[name='" + keyCss + "'],checkbox[name='" + keyCss + "'],select[name='" + keyCss + "']").val(value).prop('readonly', true);
    });
}

$('.modal-log-button').each(function() {
    var thisLog = $(this).attr('name');
    $(this).click(
        showLogs(thisLog)
    );
});
