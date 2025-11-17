import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Search, Filter, MapPin, Building2, Briefcase, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { LIBYAN_CITIES, SECTORS, JOB_TYPES, EXPERIENCE_LEVELS, type Job } from '@shared/schema';

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');

  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
  });

  const filteredJobs = jobs?.filter((job) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      job.title.toLowerCase().includes(searchLower) || 
      job.description.toLowerCase().includes(searchLower);
    const matchesCity = cityFilter === 'all' || job.city === cityFilter;
    const matchesSector = sectorFilter === 'all' || job.sector === sectorFilter;
    const matchesJobType = jobTypeFilter === 'all' || job.jobType === jobTypeFilter;
    const matchesExperience = experienceFilter === 'all' || job.experienceLevel === experienceFilter;
    return matchesSearch && matchesCity && matchesSector && matchesJobType && matchesExperience;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-testid="text-page-title">
          تصفح الوظائف
        </h1>
        <p className="text-muted-foreground">اكتشف آلاف الفرص الوظيفية في ليبيا</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-8 border">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="search"
              placeholder="ابحث عن وظيفة..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-jobs"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block text-muted-foreground">المدينة</label>
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger data-testid="select-city-filter">
                  <SelectValue placeholder="اختر المدينة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المدن</SelectItem>
                  {LIBYAN_CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-muted-foreground">القطاع</label>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger data-testid="select-sector-filter">
                  <SelectValue placeholder="اختر القطاع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع القطاعات</SelectItem>
                  {SECTORS.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-muted-foreground">نوع الوظيفة</label>
              <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                <SelectTrigger data-testid="select-job-type-filter">
                  <SelectValue placeholder="اختر النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  {JOB_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block text-muted-foreground">مستوى الخبرة</label>
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger data-testid="select-experience-filter">
                  <SelectValue placeholder="اختر المستوى" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المستويات</SelectItem>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground" data-testid="text-results-count">
          {isLoading ? 'جاري التحميل...' : `${filteredJobs?.length || 0} وظيفة متاحة`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
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
        ) : filteredJobs && filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
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
            <Briefcase className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا توجد نتائج</h3>
            <p className="text-muted-foreground">جرب تغيير معايير البحث للعثور على وظائف أخرى</p>
          </div>
        )}
      </div>
    </div>
  );
}
