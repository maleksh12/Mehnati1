import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'شكراً لتواصلك معنا!',
      description: 'سنرد على رسالتك في أقرب وقت ممكن',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
            اتصل بنا
          </h1>
          <p className="text-xl text-muted-foreground">
            نحن هنا للمساعدة والإجابة على أي أسئلة قد تكون لديك
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border-none shadow-lg hover-elevate transition-all">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mx-auto">
                <Mail className="text-white" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">البريد الإلكتروني</h3>
                <a
                  href="mailto:info@mehnati.ly"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  info@mehnati.ly
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover-elevate transition-all">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mx-auto">
                <Phone className="text-white" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">الهاتف</h3>
                <a
                  href="tel:+218123456789"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  +218 12 345 6789
                </a>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover-elevate transition-all">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mx-auto">
                <MapPin className="text-white" size={28} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">العنوان</h3>
                <p className="text-muted-foreground">طرابلس، ليبيا</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-lg">
          <CardHeader className="p-6 md:p-8">
            <CardTitle className="text-2xl">أرسل لنا رسالة</CardTitle>
          </CardHeader>
          <CardContent className="p-6 md:p-8 pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    الاسم
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="أدخل اسمك"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    البريد الإلكتروني
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  الموضوع
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="موضوع الرسالة"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  data-testid="input-subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  الرسالة
                </label>
                <Textarea
                  id="message"
                  placeholder="اكتب رسالتك هنا..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  data-testid="input-message"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 gap-2"
                data-testid="button-submit-contact"
              >
                <Send size={20} />
                إرسال الرسالة
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
