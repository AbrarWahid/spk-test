const nodemailer = require('nodemailer');
const prompt = require('prompt-sync')({sigint: true});

// Konfigurasi Email
const EMAIL_PENGIRIM = "223443001@mhs.polman-bandung.ac.id";
const SANDI_APLIKASI_GOOGLE = "kxdipmbljymalfvz"; 
const EMAIL_PENERIMA = "abrarrwahidd@gmail.com";

// Membuat koneksi ke Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_PENGIRIM,
        pass: SANDI_APLIKASI_GOOGLE
    }
});

async function jalankan_program() {
    console.log("Kirim Pesan Email");
    
    while (true) {
        console.log("");
        const pesan = prompt('Masukkan pesan: ');
        
        if (pesan === null) {
            console.log("Program dihentikan");
            break;
        }
        
        if (pesan.toLowerCase() === 'exit' || pesan.toLowerCase() === 'keluar') {
            console.log("Program dihentikan");
            break;
        }
        
        if (pesan.trim() === '') {
            console.log("Pesan tidak boleh kosong");
            continue;
        }
        
        // Kirim email
        try {
            console.log("Sedang Mengirim Pesan");
            await transporter.sendMail({
                from: EMAIL_PENGIRIM,
                to: EMAIL_PENERIMA,
                subject: "Pesan dari CMD",
                text: pesan
            });
            console.log("Email berhasil dikirim.");
        } catch (error) {
            console.log(`Gagal mengirim email: ${error.message}`);
        }
    }
}

// Menjalankan fungsi
jalankan_program();