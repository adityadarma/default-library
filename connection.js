function hasNetwork (online) {
    if (online) {
        return true;
    } else {
        Swal.fire("FAILED", "Tidak Ada Koneksi Internet", "error");
    }
}

window.addEventListener("load", () => {
    hasNetwork(navigator.onLine);

    window.addEventListener("online", () => {
        hasNetwork(true);
    })

    window.addEventListener("offline", () => {
        hasNetwork(false);
    })
})