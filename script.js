var x; // Variabel untuk menyimpan interval timer
var countdownTime; // Waktu hitung mundur yang dipilih
var isRunning = false; // Status apakah timer sedang berjalan atau tidak
var warningSound = new Audio("bell-98033.mp3"); // Suara peringatan
var finalSound = new Audio("bell-98033.mp3"); // Suara saat waktu habis

// Variabel kontrol untuk mencegah suara terus dimainkan setiap detik
var warning5Played = false;
var warning3Played = false;

function setTimer(minutes) {
    clearInterval(x); // Hentikan timer jika ada yang berjalan
    countdownTime = (minutes * 60 * 1000) + 1000; // Konversi menit ke milidetik
    document.getElementById("demo").innerHTML = minutes + ":00"; // Tampilkan waktu awal

    // Kembalikan background ke hijau
    document.body.style.backgroundColor = "#2ecc71"; 

    // Reset variabel kontrol suara
    warning5Played = false;
    warning3Played = false;

    // Aktifkan tombol Start, nonaktifkan tombol lain sampai Start ditekan
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    document.getElementById("reset").disabled = true;

    document.getElementById("timer-buttons").style.display = "block"; // Pastikan tombol muncul
}

function startTimer() {
    if (isRunning) return; // Mencegah timer berjalan lebih dari satu kali
    isRunning = true;

    var now = new Date().getTime();
    var countDownDate = now + countdownTime; // Menggunakan waktu yang telah dipilih

    x = setInterval(function () {
        now = new Date().getTime();
        var distance = countDownDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("demo").innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        // Nonaktifkan tombol Start setelah timer berjalan
        document.getElementById("start").disabled = true;
        document.getElementById("stop").disabled = false;
        document.getElementById("reset").disabled = false;

        // Perubahan warna dan suara saat waktu tersisa 5 menit (hanya berbunyi sekali)
        if (distance <= 300000 && distance > 180000 && !warning5Played) { 
            document.body.style.backgroundColor = "#f1c40f"; // Kuning
            warningSound.play();
            warning5Played = true; // Cegah suara terus berbunyi
        }

        // Perubahan warna dan suara saat waktu tersisa 3 menit (hanya berbunyi sekali)
        if (distance <= 180000 && distance > 0 && !warning3Played) {
            document.body.style.backgroundColor = "#e74c3c"; // Merah
            warningSound.play();
            warning3Played = true; // Cegah suara terus berbunyi
        }

        // Jika waktu habis
        if (distance < 0) {
            clearInterval(x);
            isRunning = false;
            document.getElementById("demo").innerHTML = "TIME'S UP!";
            document.body.style.backgroundColor = "#e74c3c"; // Tetap merah saat habis
            finalSound.play(); // Memainkan suara saat waktu habis
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(x); // Hentikan timer
    isRunning = false;

    // Aktifkan kembali tombol Start, nonaktifkan tombol Stop
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
}

function reset() {
    clearInterval(x); // Hentikan timer sepenuhnya
    isRunning = false;

    // Kembalikan background ke hijau
    document.body.style.backgroundColor = "#2ecc71"; 

    document.getElementById("demo").innerHTML = "&nbsp;";
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("reset").disabled = true;

    // Reset variabel kontrol suara
    warning5Played = false;
    warning3Played = false;
}
