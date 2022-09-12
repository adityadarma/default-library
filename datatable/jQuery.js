$.extend(true, $.fn.dataTable.defaults, {
    searching: false,
    ordering: false,
});

$.fn.dataTable.ext.errMode = function (settings, tn, msg) {
    if (settings && settings.jqXHR && settings.jqXHR.status == 401) {
        closeBlockUI();
        alert("Silakan melakukan login ulang!");
        location.reload();
    }
};

function reloadTable(id, reset = false) {
    var table = $(id).DataTable();
    table.cleanData;
    table.ajax.reload(null, reset);
}

$('.table').not('.table-2').on( 'length.dt', function ( e, settings, len ) {
    showBlockUI();
});

$('.table').not('.table-2').on( 'page.dt', function ( e, settings, len ) {
    showBlockUI();
});

$('.table').not('.table-2').on( 'preDraw.dt', function ( e, settings, len ) {
    showBlockUI();
});

$('.table').not('.table-2').on( 'draw.dt', function () {
    closeBlockUI();
});