import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

EMAIL_PENGIRIM = ""
SANDI_APLIKASI_GOOGLE = "" 
EMAIL_PENERIMA = ""

def kirim_email(subjek, isi_pesan):
    msg = MIMEMultipart()
    msg['From'] = EMAIL_PENGIRIM
    msg['To'] = EMAIL_PENERIMA
    msg['Subject'] = subjek
    msg.attach(MIMEText(isi_pesan, 'plain'))
    
    try:
        print("Sedang Mengirim Pesan")
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL_PENGIRIM, SANDI_APLIKASI_GOOGLE)
        server.send_message(msg)
        server.quit()
        print("Email berhasil dikirim.")
    except Exception as e:
        print(f"Gagal mengirim email: {e}")

if __name__ == "__main__":
    print("Kirim Pesan Email")
    try:
        while True:
            pesan_input = input("\nMasukkan pesan: ")
            
            if pesan_input.strip().lower() in ['exit', 'keluar']:
                print("Program dihentikan.")
                break
                
            if not pesan_input.strip():
                print("Pesan tidak boleh kosong.")
                continue
                
            subjek_email = "Pesan dari CMD"
            kirim_email(subjek_email, pesan_input)
    except KeyboardInterrupt:
        print("\nexit")
