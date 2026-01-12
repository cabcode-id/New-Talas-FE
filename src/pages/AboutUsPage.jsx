import React from "react";

function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[var(--surface-primary)] text-[color:var(--text-primary)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(140deg,_var(--surface-secondary)_0%,_var(--surface-primary)_55%,_var(--surface-secondary)_100%)]" />
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-[radial-gradient(circle_at_top,_var(--brand-orange)_0%,_transparent_70%)] opacity-40" />
        <div className="absolute bottom-[-12%] left-[-6%] h-80 w-80 rounded-full bg-[radial-gradient(circle_at_bottom,_var(--brand-navy)_0%,_transparent_70%)] opacity-30" />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-[var(--brand-orange)]" />
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight text-[color:var(--text-primary)]">
              Tentang Talas
            </h1>
            <p className="mt-4 text-base sm:text-lg lg:text-xl text-[color:var(--text-secondary)]">
              Kami memiliki misi untuk menyediakan analisis berita yang tidak
              bias dan membantu pembaca memahami berbagai perspektif media.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[color:var(--text-primary)]">
                Misi Kami
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[color:var(--text-secondary)]">
                Di Talas, kami percaya pada kekuatan warga yang terinformasi
                dengan baik. Misi kami adalah menganalisis berita dari berbagai
                sumber dan memberikan pembaca wawasan tentang bias dan perspektif
                media.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-secondary)] p-5 sm:p-6 shadow-sm">
                <p className="text-base sm:text-lg text-[color:var(--text-secondary)]">
                  Kami menggunakan kecerdasan buatan canggih dan keahlian manusia
                  untuk mengevaluasi artikel berita dari seluruh spektrum politik,
                  membantu Anda memahami sudut pandang yang berbeda tentang isu-isu
                  penting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-16 bg-[var(--surface-secondary)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[color:var(--text-primary)]">
                Cerita Kami
              </h2>
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-primary)] p-5 sm:p-6 shadow-sm">
                <p className="text-base sm:text-lg text-[color:var(--text-secondary)]">
                  Talas didirikan dengan tujuan untuk memberikan perspektif yang
                  seimbang dalam dunia berita yang semakin terpolarisasi. Di era
                  informasi digital saat ini, banyak orang cenderung hanya
                  mengonsumsi berita yang sesuai dengan keyakinan mereka yang
                  sudah ada.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-primary)] p-5 sm:p-6 shadow-sm">
                <p className="text-base sm:text-lg text-[color:var(--text-secondary)]">
                  Kami hadir untuk menjembatani kesenjangan ini dengan menyediakan
                  platform di mana pembaca dapat melihat bagaimana berbagai outlet
                  berita meliput cerita yang sama, dan memahami bias halus (dan
                  terkadang tidak begitu halus) dalam pelaporan.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-primary)] p-5 sm:p-6 shadow-sm">
                <p className="text-base sm:text-lg text-[color:var(--text-secondary)]">
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
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-[color:var(--text-primary)]">
              Nilai-Nilai Kami
            </h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="group rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-secondary)] p-5 sm:p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-3 h-1 w-10 rounded-full bg-[var(--brand-orange)]" />
                <h3 className="text-lg sm:text-xl font-semibold text-[color:var(--text-primary)]">
                  Keseimbangan
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[color:var(--text-secondary)]">
                  Kami berkomitmen untuk menyajikan berbagai sudut pandang
                  politik tanpa bias, memungkinkan pembaca untuk membentuk
                  pendapat mereka sendiri berdasarkan informasi yang lengkap.
                </p>
              </div>
              <div className="group rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-secondary)] p-5 sm:p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-3 h-1 w-10 rounded-full bg-[var(--brand-navy)]" />
                <h3 className="text-lg sm:text-xl font-semibold text-[color:var(--text-primary)]">
                  Transparansi
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[color:var(--text-secondary)]">
                  Kami terbuka tentang metodologi kami dan bagaimana kami
                  mengkategorikan berita, sehingga pembaca dapat memahami proses
                  di balik analisis kami.
                </p>
              </div>
              <div className="group rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-secondary)] p-5 sm:p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-3 h-1 w-10 rounded-full bg-[var(--brand-orange)]" />
                <h3 className="text-lg sm:text-xl font-semibold text-[color:var(--text-primary)]">
                  Akurasi
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[color:var(--text-secondary)]">
                  Kami berusaha untuk memberikan analisis yang akurat dan
                  faktual, dengan meninjau dan memperbarui metodologi kami
                  secara teratur.
                </p>
              </div>
              <div className="group rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-secondary)] p-5 sm:p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-3 h-1 w-10 rounded-full bg-[var(--brand-navy)]" />
                <h3 className="text-lg sm:text-xl font-semibold text-[color:var(--text-primary)]">
                  Pendidikan
                </h3>
                <p className="mt-2 text-sm sm:text-base text-[color:var(--text-secondary)]">
                  Kami percaya dalam memberdayakan pembaca melalui literasi
                  media, membantu mereka mengembangkan keterampilan berpikir
                  kritis tentang berita yang mereka konsumsi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;
