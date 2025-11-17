import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      question: 'كيف يمكنني إنشاء حساب على مهنتي؟',
      answer: 'يمكنك إنشاء حساب بالنقر على زر "إنشاء حساب" في أعلى الصفحة. ستحتاج إلى تقديم بريدك الإلكتروني وإنشاء كلمة مرور. بعد التسجيل، يمكنك إكمال ملفك الشخصي وإضافة سيرتك الذاتية.',
    },
    {
      question: 'كيف أبحث عن وظيفة مناسبة؟',
      answer: 'يمكنك تصفح الوظائف من خلال صفحة "الوظائف" أو استخدام شريط البحث للعثور على وظائف محددة. يمكنك أيضاً تصفية النتائج حسب المدينة، القطاع، نوع الوظيفة، ومستوى الخبرة للعثور على الوظيفة المناسبة لك.',
    },
    {
      question: 'كيف أتقدم لوظيفة؟',
      answer: 'بعد العثور على وظيفة تهمك، انقر على عنوان الوظيفة لعرض التفاصيل الكاملة. ثم اضغط على زر "تقدم الآن" واتبع التعليمات لإرسال طلبك. تأكد من إكمال ملفك الشخصي وإضافة سيرتك الذاتية قبل التقديم.',
    },
    {
      question: 'هل الخدمة مجانية؟',
      answer: 'نعم، منصة مهنتي مجانية تماماً للباحثين عن عمل. يمكنك إنشاء حساب، البحث عن الوظائف، والتقدم إليها دون أي رسوم.',
    },
    {
      question: 'كيف يمكنني متابعة شركة؟',
      answer: 'عند زيارة صفحة أي شركة، ستجد زر "متابعة". بالنقر عليه، ستتلقى إشعارات عندما تنشر الشركة وظائف جديدة أو تحديثات مهمة.',
    },
    {
      question: 'كيف أقوم بتحديث سيرتي الذاتية؟',
      answer: 'يمكنك تحديث سيرتك الذاتية في أي وقت من خلال صفحة "ملفي الشخصي". انقر على "تعديل الملف" وستتمكن من تحديث معلوماتك، مهاراتك، وخبراتك.',
    },
    {
      question: 'ماذا أفعل إذا نسيت كلمة المرور؟',
      answer: 'في صفحة تسجيل الدخول، انقر على "نسيت كلمة المرور؟" وأدخل بريدك الإلكتروني. سنرسل لك رابطاً لإعادة تعيين كلمة المرور.',
    },
    {
      question: 'كيف يمكنني الاتصال بالدعم الفني؟',
      answer: 'يمكنك التواصل معنا من خلال صفحة "اتصل بنا" أو إرسال بريد إلكتروني إلى info@mehnati.ly. فريق الدعم لدينا متاح للرد على استفساراتك.',
    },
    {
      question: 'هل يمكنني حذف حسابي؟',
      answer: 'نعم، يمكنك حذف حسابك في أي وقت من خلال إعدادات الحساب. يرجى ملاحظة أن حذف الحساب سيؤدي إلى إزالة جميع بياناتك بشكل دائم.',
    },
    {
      question: 'كيف تحمون خصوصية بياناتي؟',
      answer: 'نحن ملتزمون بحماية خصوصيتك. نستخدم تقنيات التشفير لحماية بياناتك، ولا نشارك معلوماتك الشخصية مع أطراف ثالثة دون موافقتك. يمكنك الاطلاع على سياسة الخصوصية الكاملة في صفحة الشروط والأحكام.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="text-white" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
            مركز المساعدة
          </h1>
          <p className="text-xl text-muted-foreground">
            أجوبة على الأسئلة الأكثر شيوعاً
          </p>
        </div>

        <Card className="border-none shadow-lg">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">الأسئلة الشائعة</h2>
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-right hover:no-underline">
                    <span className="font-semibold text-lg">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 md:p-12 text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">لم تجد الإجابة التي تبحث عنها؟</h2>
          <p className="text-lg text-blue-100 mb-6">
            تواصل معنا مباشرة وسنكون سعداء بمساعدتك
          </p>
        </div>
      </div>
    </div>
  );
}
