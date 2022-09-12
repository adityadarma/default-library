// Read Image
function readURL(input, target) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            target.attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$("#img-input").change(function () {
  readURL(this, $('#img-input-read'));
});


// Converter
/* Fungsi format Rupiah */
function convertToRupiah(angka) {
    var rupiah = "";
    var angkarev = angka.toString().split("").reverse().join("");
    for (var i = 0; i < angkarev.length; i++)
        if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
    return rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("");
}

/* Fungsi reverse Angka */
function convertToAngka(rupiah) {
    return parseInt(rupiah.replace(/,.*|[^0-9]/g, ""), 10);
}

$(document)
    .on("keypress", ".inputnumber", function (e) {
        var c = e.keyCode || e.charCode;
        switch (c) {
            case 8:
            case 9:
            case 27:
            case 13:
                return;
            case 65:
                if (e.ctrlKey === true) return;
        }
        if (c < 48 || c > 57) e.preventDefault();
    })
    .on("keyup", ".inputnumber", function () {
        var inp = parseInt($(this).val().replace(/\./g, ''));
        if(isNaN(inp)) inp = 0;
        $(this).val(convertToRupiah(inp));
    });


// disable scroll input type number
$("form").on("focus", "input[type=number]", function (e) {
    $(this).on("wheel.disableScroll", function (e) {
        e.preventDefault();
    });
});

// disable blur input type number
$("form").on("blur", "input[type=number]", function (e) {
    $(this).off("wheel.disableScroll");
});


// Tidak bisa pencet enter
$(document).on("keypress keydown", "form :input:not(textarea):not(:submit)", function (e) {
    if(e.which == 13 || e.key == "Enter") {
        e.preventDefault();
    }
});

// Tidak bisa pencet enter saat modal terbuka
$('.modal').on('show.bs.modal', function (e) {
    $(document).on("keydown keypress", ":input:not(textarea):not(:submit)", function(e) {
        if(e.which == 13) {
            e.preventDefault();
        }
    });
})