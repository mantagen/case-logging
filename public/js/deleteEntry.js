function deleteEntry(deleteIn) {
    return function() {
        var entryId;
        if ($('#caseid').length) {entryId=document.getElementById('caseid').value;}
        if ($('#userId').length) {entryId=document.getElementById('userId').value;}
            if (window.XMLHttpRequest) {
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp = new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    // var searchResponse = JSON.parse(xmlhttp.responseText);
                    // console.log(searchResponse);
                    // populateForm(searchResponse);
                }
            };
            xmlhttp.open("GET", deleteIn+"?deleteId=" + entryId, true);
            xmlhttp.send();
    };
}


$('.delete-button').each(function() {
    var deleteHere = $(this).attr('data-delete');
    $(this).click(
        deleteEntry(deleteHere)
    );
});
