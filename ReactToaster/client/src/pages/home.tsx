import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Briefcase, Building2, Users, Search, MapPin, TrendingUp, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import type { Job, Company, Stats } from '@shared/schema';

export default function HomePage() {
  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ['/api/stats'],
  });

  const { data: recentJobs, isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs/recent'],
  });

  const { data: featuredCompanies, isLoading: companiesLoading } = useQuery<Company[]>({
    queryKey: ['/api/companies/featured'],
  });

  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-indigo-900/90 backdrop-blur-sm"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              data-testid="text-hero-title"
            >
              مرحباً بك في مهنتي
            </h1>
            <p
              className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed"
              data-testid="text-hero-subtitle"
            >
              الشبكة المهنية الأولى في ليبيا - نربط الخريجين الليبيين بأفضل الشركات وفرص العمل
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/jobs">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-bold"
                  data-testid="button-browse-jobs"
                >
                  <Search className="ml-2" size={20} />
                  تصفح الوظائف
                </Button>
              </Link>
              <Link href="/companies">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-md font-bold"
                  data-testid="button-browse-companies"
                >
                  <Building2 className="ml-2" size={20} />
                  تصفح الشركات
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {statsLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-none shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <Skeleton className="h-12 w-12 rounded-lg mb-4" />
                    <Skeleton className="h-8 w-24 mb-2" />
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              <Card className="border-none shadow-lg hover-elevate transition-all" data-testid="card-stat-graduates">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mb-4">
                    <Users className="text-white" size={24} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-testid="text-graduates-count">
                    {stats?.graduates.toLocaleString('ar-LY')}+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">خريج مسجل</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover-elevate transition-all" data-testid="card-stat-companies">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="text-white" size={24} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-testid="text-companies-count">
                    {stats?.companies.toLocaleString('ar-LY')}+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">شركة موثوقة</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg hover-elevate transition-all" data-testid="card-stat-jobs">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mb-4">
                    <Briefcase className="text-white" size={24} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-testid="text-jobs-count">
                    {stats?.jobs.toLocaleString('ar-LY')}+
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">فرصة عمل متاحة</div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">أحدث الوظائف</h2>
            <p className="text-muted-foreground">اكتشف أحدث فرص العمل المتاحة</p>
          </div>
          <Link href="/jobs">
            <Button variant="outline" className="gap-2" data-testid="button-view-all-jobs">
              عرض الكل
              <ChevronRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobsLoading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="hover-elevate">
                  <CardHeader className="space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-16 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : recentJobs && recentJobs.length > 0 ? (
            recentJobs.slice(0, 6).map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`}>
                <Card className="hover-elevate transition-all h-full" data-testid={`card-job-${job.id}`}>
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-xl leading-tight">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Building2 size={14} />
                      شركة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <MapPin size={12} />
                        {job.city}
                      </Badge>
                      <Badge variant="outline">{job.jobType}</Badge>
                      {job.salaryRange && (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {job.salaryRange}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-muted-foreground">
                        {job.applicationsCount} متقدم
                      </span>
                      <Badge>{job.experienceLevel}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">لا توجد وظائف متاحة حالياً</p>
            </div>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">الشركات المميزة</h2>
            <p className="text-muted-foreground">تعرف على أفضل الشركات في ليبيا</p>
          </div>
          <Link href="/companies">
            <Button variant="outline" className="gap-2" data-testid="button-view-all-companies">
              عرض الكل
              <ChevronRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {companiesLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="hover-elevate">
                  <CardContent className="p-6 text-center space-y-4">
                    <Skeleton className="h-20 w-20 rounded-lg mx-auto" />
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : featuredCompanies && featuredCompanies.length > 0 ? (
            featuredCompanies.slice(0, 4).map((company) => (
              <Link key={company.id} href={`/companies/${company.id}`}>
                <Card className="hover-elevate transition-all h-full" data-testid={`card-company-${company.id}`}>
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mx-auto">
                      <Building2 className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{company.name}</h3>
                      <p className="text-sm text-muted-foreground">{company.sector}</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-sm pt-2 border-t">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users size={14} />
                        {company.followersCount}
                      </span>
                      <Badge variant="secondary">{company.city}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">لا توجد شركات متاحة حالياً</p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ابدأ رحلتك المهنية اليوم
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف الخريجين الليبيين الذين وجدوا وظائف أحلامهم من خلال مهنتي
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold"
            data-testid="button-create-account-cta"
          >
            <TrendingUp className="ml-2" size={20} />
            ابدأ الآن مجاناً
          </Button>
        </div>
      </section>
    </div>
  );
}
