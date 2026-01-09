import React from "react";

function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-[#FFD7CF] py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-900">
              Tentang Talas
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8">
              Kami memiliki misi untuk menyediakan analisis berita yang tidak
              bias dan membantu pembaca memahami berbagai perspektif media.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900">
              Misi Kami
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 text-center">
              Di Talas, kami percaya pada kekuatan warga yang terinformasi
              dengan baik. Misi kami adalah menganalisis berita dari berbagai
              sumber dan memberikan pembaca wawasan tentang bias dan perspektif
              media.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 text-center">
              Kami menggunakan kecerdasan buatan canggih dan keahlian manusia
              untuk mengevaluasi artikel berita dari seluruh spektrum politik,
              membantu Anda memahami sudut pandang yang berbeda tentang isu-isu
              penting.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900">
              Cerita Kami
            </h2>
            <div className="space-y-4 sm:space-y-6 text-gray-700">
              <p className="text-base sm:text-lg">
                Talas didirikan dengan tujuan untuk memberikan perspektif yang
                seimbang dalam dunia berita yang semakin terpolarisasi. Di era
                informasi digital saat ini, banyak orang cenderung hanya
                mengonsumsi berita yang sesuai dengan keyakinan mereka yang
                sudah ada.
              </p>
              <p className="text-base sm:text-lg">
                Kami hadir untuk menjembatani kesenjangan ini dengan menyediakan
                platform di mana pembaca dapat melihat bagaimana berbagai outlet
                berita meliput cerita yang sama, dan memahami bias halus (dan
                terkadang tidak begitu halus) dalam pelaporan.
              </p>
              <p className="text-base sm:text-lg">
                Dengan menggunakan teknologi analisis teks dan kecerdasan
                buatan, kami mengkategorikan berita berdasarkan kecenderungan
                politiknya, membantu pembaca untuk mendapatkan gambaran yang
                lebih lengkap tentang isu-isu penting. Kami berkomitmen pada
                transparansi, akurasi, dan membantu pembaca kami menjadi warga
                yang lebih terinformasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-900">
              Nilai-Nilai Kami
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                  Keseimbangan
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Kami berkomitmen untuk menyajikan berbagai sudut pandang
                  politik tanpa bias, memungkinkan pembaca untuk membentuk
                  pendapat mereka sendiri berdasarkan informasi yang lengkap.
                </p>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                  Transparansi
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Kami terbuka tentang metodologi kami dan bagaimana kami
                  mengkategorikan berita, sehingga pembaca dapat memahami proses
                  di balik analisis kami.
                </p>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                  Akurasi
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Kami berusaha untuk memberikan analisis yang akurat dan
                  faktual, dengan meninjau dan memperbarui metodologi kami
                  secara teratur.
                </p>
              </div>
              <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                  Pendidikan
                </h3>
                <p className="text-sm sm:text-base text-gray-700">
                  Kami percaya dalam memberdayakan pembaca melalui literasi
                  media, membantu mereka mengembangkan keterampilan berpikir
                  kritis tentang berita yang mereka konsumsi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
