import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { Building2, MapPin, Users, ExternalLink, Briefcase, ArrowRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { Company, Job } from '@shared/schema';

export default function CompanyDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: company, isLoading: companyLoading } = useQuery<Company>({
    queryKey: ['/api/companies', id],
    enabled: !!id,
  });

  const { data: jobs, isLoading: jobsLoading } = useQuery<Job[]>({
    queryKey: ['/api/companies', id, 'jobs'],
    enabled: !!id,
  });

  const handleFollow = () => {
    toast({
      title: 'شكراً!',
      description: 'سيتم إضافة نظام المتابعة قريباً',
    });
  };

  if (companyLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Building2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">الشركة غير موجودة</h2>
        <p className="text-muted-foreground mb-6">الشركة التي تبحث عنها غير متاحة</p>
        <Link href="/companies">
          <Button>العودة إلى الشركات</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <Link href="/companies">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back-to-companies">
            <ArrowRight size={16} />
            العودة إلى الشركات
          </Button>
        </Link>

        <Card className="mb-6 border-none shadow-lg">
          <CardHeader className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="text-white" size={40} />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-testid="text-company-name">
                    {company.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">{company.sector}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="secondary" className="gap-2 px-4 py-2">
                    <MapPin size={16} />
                    {company.city}
                  </Badge>
                  <Badge variant="outline" className="px-4 py-2">{company.companyType}</Badge>
                  <Badge variant="outline" className="px-4 py-2">{company.employeeCount} موظف</Badge>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={handleFollow}
                    className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-700"
                    data-testid="button-follow-company"
                  >
                    <UserPlus size={20} />
                    متابعة
                  </Button>
                  {company.website && (
                    <Button variant="outline" className="gap-2" asChild data-testid="button-visit-website">
                      <a href={company.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={20} />
                        زيارة الموقع
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">عن الشركة</h2>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-company-description">
                {company.description}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold mb-4">معلومات الشركة</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">المتابعون</div>
                    <div className="text-sm text-muted-foreground">
                      {company.followersCount.toLocaleString('ar-LY')} متابع
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">نوع الشركة</div>
                    <div className="text-sm text-muted-foreground">{company.companyType}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">القطاع</div>
                    <div className="text-sm text-muted-foreground">{company.sector}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">الموقع</div>
                    <div className="text-sm text-muted-foreground">{company.city}, ليبيا</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">الوظائف المتاحة</h2>
            {jobs && jobs.length > 0 && (
              <Badge variant="secondary" className="text-base px-4 py-2">
                {jobs.length} وظيفة
              </Badge>
            )}
          </div>

          {jobsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6 space-y-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-6 w-1/2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : jobs && jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`}>
                  <Card className="hover-elevate transition-all h-full" data-testid={`card-job-${job.id}`}>
                    <CardHeader>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{job.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="gap-1">
                          <MapPin size={12} />
                          {job.city}
                        </Badge>
                        <Badge variant="outline">{job.jobType}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm pt-2 border-t">
                        <span className="text-muted-foreground">{job.applicationsCount} متقدم</span>
                        <Badge>{job.experienceLevel}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">لا توجد وظائف متاحة حالياً</h3>
                <p className="text-sm text-muted-foreground">
                  تابع الشركة لتصلك إشعارات عند نشر وظائف جديدة
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
