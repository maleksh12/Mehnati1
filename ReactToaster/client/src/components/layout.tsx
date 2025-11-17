import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Briefcase, Building2, Home as HomeIcon, Info, Phone, HelpCircle, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navLinks = [
    { path: '/', label: 'الرئيسية', icon: HomeIcon },
    { path: '/jobs', label: 'الوظائف', icon: Briefcase },
    { path: '/companies', label: 'الشركات', icon: Building2 },
    { path: '/about', label: 'من نحن', icon: Info },
    { path: '/contact', label: 'اتصل بنا', icon: Phone },
    { path: '/help', label: 'المساعدة', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50" dir="rtl">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2" data-testid="logo-link">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                <Briefcase className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                مهنتي
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location === link.path;
                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`flex items-center gap-2 font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                    data-testid={`nav-${link.label}`}
                  >
                    <Icon size={18} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="outline"
                className="border-blue-600 text-blue-600"
                data-testid="button-login"
              >
                تسجيل الدخول
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                data-testid="button-register"
              >
                إنشاء حساب
              </Button>
            </div>

            <button
              className="md:hidden p-2 hover-elevate active-elevate-2 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="قائمة التنقل"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden py-4 border-t border-blue-100" data-testid="mobile-nav">
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="text-gray-700 hover:text-blue-600 py-2 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Separator className="my-2" />
                <Button variant="outline" className="border-blue-600 text-blue-600 w-full">
                  تسجيل الدخول
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 w-full">
                  إنشاء حساب
                </Button>
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="min-h-[calc(100vh-4rem)]">{children}</main>

      <footer className="bg-gradient-to-br from-slate-900 to-blue-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Briefcase className="text-white" size={20} />
                </div>
                <span className="text-2xl font-bold">مهنتي</span>
              </div>
              <p className="text-blue-200 text-sm leading-relaxed">
                الشبكة المهنية الأولى في ليبيا - نربط المواهب بالفرص
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">روابط سريعة</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="text-blue-200 hover:text-white transition-colors">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="/jobs" className="text-blue-200 hover:text-white transition-colors">
                    الوظائف
                  </Link>
                </li>
                <li>
                  <Link href="/companies" className="text-blue-200 hover:text-white transition-colors">
                    الشركات
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">الدعم</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-blue-200 hover:text-white transition-colors">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-200 hover:text-white transition-colors">
                    اتصل بنا
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-blue-200 hover:text-white transition-colors">
                    مركز المساعدة
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">تابعنا</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover-elevate active-elevate-2 transition-colors"
                  aria-label="فيسبوك"
                  data-testid="link-facebook"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover-elevate active-elevate-2 transition-colors"
                  aria-label="إنستغرام"
                  data-testid="link-instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover-elevate active-elevate-2 transition-colors"
                  aria-label="لينكد إن"
                  data-testid="link-linkedin"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>

          <Separator className="my-8 bg-white/20" />
          <div className="text-center text-blue-200 text-sm">
            <p>© 2025 مهنتي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
