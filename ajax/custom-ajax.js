"use strict";

$.ajaxSetup({
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        "INTERNAL-KEY": $('meta[name="internal-key"]').attr("content")
    },
    error: function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 401) {
            closeBlockUI();
            alert("Silakan melakukan login ulang!");
            location.reload();
        }
    },
});

function ajaxGet(url, data = null) {
    return $.ajax({
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
    }).fail(function (res) {
        Swal.fire({
            title: "FAILED",
            text: res.responseJSON.message,
            type: "error",
        });
    });
}

function ajaxGetBlockUI(url, data = null) {
    return $.ajax({
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
        beforeSend: function () {
            showBlockUI();
        },
        complete: function () {
            closeBlockUI();
        },
    }).fail(function (res) {
        Swal.fire({
            title: "FAILED",
            text: res.responseJSON.message,
            type: "error",
        });
    });
}

function ajaxPost(url, data) {
    return $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
        contentType: false,
        processData: false,
    }).fail(function (res) {
        Swal.fire({
            title: "FAILED",
            text: res.responseJSON.message,
            type: "error",
        });
    });
}

function ajaxPostForm(url, data, form, btn, text = "Sedang Diproses") {
    var btn_before = $(btn).text();
    return $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
        contentType: false,
        processData: false,
        beforeSend: function () {
            $(btn).attr("disabled", true).text(text);
        },
        complete: function () {
            $(btn).attr("disabled", false).text(btn_before);
        },
    }).fail(function (res) {
        if (res.status == 422) {
            $.each(res.responseJSON.errors, function (i, v) {
                let getName  = getConvertedName(i);
                let getClass = getConvertedClass(i);
                
                $(form + " .error-" + getClass).html("*" + v);
                $(form + ' input[name="'+getName+'"]').addClass('is-invalid');
                $(form + ' select[name="'+getName+'"]').addClass('is-invalid');
                $("input[name='" + getName + "']")
                    .keypress(function () {
                        $(".error-" + getClass).text("");
                        $(this).removeClass('is-invalid');
                    })
                    .keyup(function () {
                        $(".error-" + getClass).text("");
                        $(this).removeClass('is-invalid');
                    })
                    .change(function () {
                        $(".error-" + getClass).text("");
                        $(this).removeClass('is-invalid');
                    });
                $("select[name='" + getName + "']").change(function () {
                    $(".error-" + getClass).text("");
                    $(this).removeClass('is-invalid');
                });
                $("textarea[name='" + getName + "']")
                    .keypress(function () {
                        $(".error-" + getClass).text("");
                        $(this).removeClass('is-invalid');
                    })
                    .keyup(function () {
                        $(".error-" + getClass).text("");
                        $(this).removeClass('is-invalid');
                    });
            });
        } else {
            Swal.fire({
                title: "FAILED",
                text: res.responseJSON.message,
                type: "error",
            });
        }
    });
}

function ajaxPostFormBlockUI(url, data, form, btn, text = "Sedang Diproses") {
    var btn_before = $(btn).text();
    return $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
        contentType: false,
        processData: false,
        beforeSend: function () {
            $(btn).attr("disabled", true).text(text);
            showBlockUI();
        },
        complete: function () {
            $(btn).attr("disabled", false).text(btn_before);
            closeBlockUI();
        },
    }).fail(function (res) {
        if (res.status == 422) {
            $.each(res.responseJSON.errors, function (i, v) {
                let getName  = getConvertedName(i);
                let getClass = getConvertedClass(i);
                
                $(form + " .error-" + getClass).html("*" + v);
                $(form + ' input[name="'+getName+'"]').addClass('is-invalid');
                $(form + ' select[name="'+getName+'"]').addClass('is-invalid');
                $("input[name='" + getName + "']")
                    .keypress(function () {
                        $(".error-" + getClass).text("");
                        $(this).removeClass('is-invalid');
                    })
                    .keyup(function () {
                        $(".error-" + getClass).text("");
                        $(this).removeClass('is-invalid');
                    })
                    .change(function () {
                        $(".error-" + getClass).text("");
                        $(this).removeClass('is-invalid');
                    });
                $("select[name='" + getName + "']").change(function () {
                    $(".error-" + getClass).text("");
                    $(this).removeClass('is-invalid');
                });
                $("textarea[name='" + getName + "']")
                    .keypress(function () {
                        $(".error-" + getClass).text("");
                        $(this).removeClass('is-invalid');
                    })
                    .keyup(function () {
                        $(".error-" + getClass).text("");
                        $(this).removeClass('is-invalid');
                    });
            });
        } else {
            Swal.fire({
                title: "FAILED",
                text: res.responseJSON.message,
                type: "error",
            });
        }
    });
}

function ajaxPostDataObject(url, data) {
    return $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
    }).fail(function (res) {
        Swal.fire({
            title: "FAILED",
            text: res.responseJSON.message,
            type: "error",
        });
    });
}

function ajaxPostDataObjectBlockUI(url, data) {
    return $.ajax({
        type: "post",
        url: url,
        data: data,
        dataType: "json",
        beforeSend: function () {
            showBlockUI();
        },
        complete: function () {
            closeBlockUI();
        },
    }).fail(function (res) {
        Swal.fire({
            title: "FAILED",
            text: res.responseJSON.message,
            type: "error",
        });
    });
}

function getConvertedName(key) {
    let text = '';
    let arrayName = key.split(".");
    if (arrayName.length == 3) {
        text = arrayName[0] + '[' + arrayName[1] + '][' + arrayName[2] + ']';
    } else {
        text = arrayName[0];
    }
    return text;
}

function getConvertedClass(key) {
    let text = '';
    let arrayName = key.split(".");
    if (arrayName.length == 3) {
        text = arrayName[0] + '_' + arrayName[1] + '_' + arrayName[2];
    } else {
        text = arrayName[0];
    }
    return text;
}
