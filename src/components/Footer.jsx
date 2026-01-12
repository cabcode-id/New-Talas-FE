import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getClusters } from "../services/api/clusterService";

const Footer = () => {
  const [topics, setTopics] = useState([]);
  const [isLoadingTopics, setIsLoadingTopics] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchTopics = async () => {
      try {
        const data = await getClusters();
        if (!isMounted) return;

        setTopics(Object.values(data?.clusters || {}));
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        if (isMounted) {
          setTopics([]);
        }
      } finally {
        if (isMounted) {
          setIsLoadingTopics(false);
        }
      }
    };

    fetchTopics();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredTopics = useMemo(() => topics.slice(0, 6), [topics]);

  const sections = [
    {
      title: "COMPANY",
      links: [
        { label: "Home", to: "/home" },
        { label: "About Us", to: "/about-us" },
        { label: "Subscribe", href: "http://pukulenam.id" },
      ],
    },
    {
      title: "TOPICS",
      links: featuredTopics.map((topic, index) => ({
        label: topic,
        to: `/get-clusters/${index}`,
      })),
      placeholder: isLoadingTopics
        ? "Loading topics..."
        : "Topics will be available soon.",
    },
  ];

  const linkClasses =
    "text-sm transition-colors duration-200 hover:text-[var(--text-primary)] block mb-2";

  const renderLink = (link) =>
    link.to ? (
      <Link key={link.label} to={link.to} className={linkClasses}>
        {link.label}
      </Link>
    ) : (
      <a
        key={link.label}
        href={link.href}
        className={linkClasses}
        target="_blank"
        rel="noreferrer"
      >
        {link.label}
      </a>
    );

  return (
    <footer className="border-t bg-[var(--surface-primary)] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/home" className="inline-block mb-4">
              <img src="/talas1.svg" alt="Talas" className="h-20" />
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Menghadirkan rangkuman berita multi-sumber setiap hari dengan gaya
              editorial yang bersih dan mudah dibaca, dilengkapi dengan analisis prespektif.
            </p>
            <a
              href="http://pukulenam.id"
              className="subscribe-btn inline-flex items-center justify-center rounded px-6 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-95"
            >
              Subscribe
            </a>
          </div>

          {/* Links Sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-4">
                {section.title}
              </h3>
              <div className="space-y-1 text-[var(--text-secondary)]">
                {section.links.length > 0 ? (
                  section.links.map((link) => renderLink(link))
                ) : (
                  <p className="text-xs text-[var(--text-muted)] italic">
                    {section.placeholder}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
          <div className="text-center">
            <p className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} Talas. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;