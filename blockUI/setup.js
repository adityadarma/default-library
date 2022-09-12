// Show BlockUI
function showBlockUI() {
    $.blockUI({
        message: "Mohon Tunggu ...",
        css: {
            "z-index": 10002,
            border: "none",
            padding: "15px",
            backgroundColor: "#000",
            "-webkit-border-radius": "10px",
            "-moz-border-radius": "10px",
            opacity: 0.5,
            color: "#fff",
        },
    });
}

// Close BlockUI
function closeBlockUI() {
    $.unblockUI();
}