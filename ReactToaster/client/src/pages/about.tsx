import { Target, Users, TrendingUp, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="text-page-title">
            من نحن
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            مهنتي هي الشبكة المهنية الأولى في ليبيا التي تربط الخريجين الليبيين بأفضل فرص العمل
          </p>
        </div>

        <div className="prose prose-lg max-w-none mb-12">
          <Card className="border-none shadow-lg mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">رؤيتنا</h2>
              <p className="text-muted-foreground leading-relaxed">
                نسعى لأن نكون المنصة الرائدة في ليبيا لربط المواهب الوطنية بفرص العمل المناسبة، ودعم الشركات 
                في العثور على الكفاءات المؤهلة. نؤمن بأن كل خريج ليبي يستحق فرصة عادلة للنجاح المهني، وأن كل 
                شركة تستحق الوصول إلى أفضل المواهب.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-none shadow-lg hover-elevate transition-all">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mx-auto">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold">مهمتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  تسهيل عملية البحث عن الوظائف للخريجين الليبيين وتوفير منصة موثوقة للشركات للعثور على المواهب المؤهلة
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover-elevate transition-all">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mx-auto">
                  <Heart className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold">قيمنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  الشفافية، المساواة في الفرص، دعم المواهب الوطنية، والالتزام بتطوير سوق العمل الليبي
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">ما نقدمه</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-bold">للباحثين عن عمل</h3>
                  <p className="text-sm text-muted-foreground">
                    منصة سهلة الاستخدام للبحث عن الوظائف المناسبة والتقدم إليها
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <TrendingUp className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-bold">للشركات</h3>
                  <p className="text-sm text-muted-foreground">
                    أدوات فعالة للوصول إلى المواهب المؤهلة وإدارة عملية التوظيف
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                    <Target className="text-blue-600" size={24} />
                  </div>
                  <h3 className="font-bold">للمجتمع</h3>
                  <p className="text-sm text-muted-foreground">
                    دعم تطوير سوق العمل الليبي وتمكين الشباب من تحقيق أهدافهم المهنية
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">انضم إلى مجتمعنا المهني</h2>
          <p className="text-lg text-blue-100 mb-6">
            كن جزءاً من الشبكة المهنية الأولى في ليبيا وابدأ رحلتك نحو النجاح المهني
          </p>
        </div>
      </div>
    </div>
  );
}
