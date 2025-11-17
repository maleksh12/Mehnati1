import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { MapPin, Building2, Briefcase, Clock, Users, DollarSign, ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import type { Job, Company } from '@shared/schema';

export default function JobDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: job, isLoading: jobLoading } = useQuery<Job>({
    queryKey: ['/api/jobs', id],
    enabled: !!id,
  });

  const { data: company, isLoading: companyLoading } = useQuery<Company>({
    queryKey: ['/api/companies', job?.companyId],
    enabled: !!job?.companyId,
  });

  const handleApply = () => {
    toast({
      title: 'شكراً لاهتمامك!',
      description: 'سيتم إضافة نظام التقديم قريباً',
    });
  };

  if (jobLoading) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Briefcase className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">الوظيفة غير موجودة</h2>
        <p className="text-muted-foreground mb-6">الوظيفة التي تبحث عنها غير متاحة</p>
        <Link href="/jobs">
          <Button>العودة إلى الوظائف</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/jobs">
          <Button variant="ghost" className="mb-6 gap-2" data-testid="button-back-to-jobs">
            <ArrowRight size={16} />
            العودة إلى الوظائف
          </Button>
        </Link>

        <Card className="mb-6 border-none shadow-lg">
          <CardHeader className="space-y-4 p-6 md:p-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" data-testid="text-job-title">
                {job.title}
              </h1>
              {company && (
                <Link href={`/companies/${company.id}`}>
                  <div className="flex items-center gap-3 hover-elevate active-elevate-2 inline-flex p-2 -m-2 rounded-md">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                      <Building2 className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{company.name}</div>
                      <div className="text-sm text-muted-foreground">{company.sector}</div>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge variant="secondary" className="gap-2 px-4 py-2">
                <MapPin size={16} />
                {job.city}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                <Briefcase size={16} className="ml-1" />
                {job.jobType}
              </Badge>
              <Badge className="px-4 py-2">{job.experienceLevel}</Badge>
              {job.salaryRange && (
                <Badge variant="outline" className="text-green-600 border-green-600 px-4 py-2">
                  <DollarSign size={16} className="ml-1" />
                  {job.salaryRange}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4 border-t">
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{job.applicationsCount} متقدم</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>منذ يومين</span>
              </div>
            </div>
          </CardHeader>

          <Separator />

          <CardContent className="p-6 md:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">وصف الوظيفة</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="text-job-description">
                {job.description}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold mb-4">المتطلبات</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="text-job-requirements">
                {job.requirements}
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xl font-bold mb-4">معلومات إضافية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">القطاع</div>
                    <div className="text-sm text-muted-foreground">{job.sector}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">الموقع</div>
                    <div className="text-sm text-muted-foreground">{job.city}, ليبيا</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-blue-100 p-4 rounded-lg shadow-lg">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 gap-2"
              onClick={handleApply}
              data-testid="button-apply-job"
            >
              <Send size={20} />
              تقدم الآن
            </Button>
            <Button size="lg" variant="outline" className="flex-1" data-testid="button-save-job">
              حفظ الوظيفة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
