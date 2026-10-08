import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight, ShieldCheck, MessageCircle, Clock } from "lucide-react";

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Twitter = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();
  const waUrl = "https://wa.me/94774652552?text=" + encodeURIComponent("Hello, I'm interested in Green Hills Agriculture products.");

  return (
    <footer className="bg-muted pt-16 pb-8 border-t border-border mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/" className="inline-block group">
              <img
                src="/img/Green_Hills_Logo_Footer.svg"
                alt="Green Hills Agriculture"
                className="w-[180px] h-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium Centella asiatica (Gotu Kola) exporter. Delivering SL-GAP certified quality to local retail giants and global pharmaceutical, cosmetic, and wellness brands.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white rounded-full shadow-sm text-primary hover:bg-primary hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm text-primary hover:bg-primary hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm text-primary hover:bg-primary hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-white rounded-full shadow-sm text-primary hover:bg-primary hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-outfit font-semibold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {['Home', 'About Us', 'Products', 'Gallery', 'News', 'Events', 'Services', 'Contact'].map((item) => {
                const href =
                  item === 'About Us'
                    ? '/about'
                    : `/${item.toLowerCase().replace(' ', '') === 'home' ? '' : item.toLowerCase().replace(' ', '')}`;
                return (
                  <li key={item}>
                    <Link href={href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                      <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-outfit font-semibold text-lg mb-6 relative inline-block">
              Our Services
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              {['Export Services', 'Wholesale Supply', 'Retail Partnerships', 'Quality Assurance', 'Custom Packaging', 'Contract Farming'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight className="w-3.5 h-3.5 text-primary opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications & Business Hours */}
          <div>
            <h3 className="font-outfit font-semibold text-lg mb-6 relative inline-block">
              Compliance & Hours
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>

            <div className="flex flex-col gap-5">
              {/* SL-GAP Badge */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Certifications</span>
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary/20 rounded-xl max-w-max text-xs text-primary font-bold shadow-sm">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>SL-GAP Certified</span>
                </div>
              </div>

              {/* Hours */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  Business Hours
                </span>
                <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
                  <p><span className="font-semibold text-foreground">Mon - Fri:</span> 8:00 AM - 5:00 PM</p>
                  <p><span className="font-semibold text-foreground">Saturday:</span> 8:00 AM - 1:00 PM</p>
                  <p><span className="font-semibold text-primary">Sunday:</span> Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-outfit font-semibold text-lg mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Manuwangama/E, Chilaw, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+94 77 465 2552</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+94 76 865 6882</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="break-all">info@greenhillsagri.com</span>
              </li>
              <li className="pt-2">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs bg-[#25D366] hover:bg-[#20ba5a] text-white px-3.5 py-2 rounded-full font-bold transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  WhatsApp Inquiry
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} Green Hills Agriculture Products. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-1 text-center md:text-right">
            <span>Website Developed by</span>
            <a
              href="https://zynovratech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Zynovra Technologies (Pvt) Ltd
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
