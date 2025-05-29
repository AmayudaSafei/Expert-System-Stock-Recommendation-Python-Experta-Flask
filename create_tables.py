from app_chart import app, db

# Menjalankan dalam konteks aplikasi
with app.app_context():
    db.create_all()
    print("Tabel telah dibuat (jika belum ada).")

# python create_tables.py jalankan di cmd untuk mengimport database kedalam projek ini