const formatDate = (dateParams) => {

    const dateObj = new Date(dateParams);

    // Array hari & bulan dalam Bahasa Indonesia
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    // Ambil bagian-bagian tanggal
    const day = days[dateObj.getUTCDay()];
    const date = `${dateObj.getUTCDate()} ${months[dateObj.getUTCMonth()]} ${dateObj.getUTCFullYear()}`;

    // Format jam (padStart biar dua digit)
    const hours = String(dateObj.getUTCHours()).padStart(2, '0');
    const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
    const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');
    const time = `${hours}:${minutes}:${seconds}`;

    // Buat objek hasil
    const result = { day, date, time };
    return result;

} 

export default formatDate;