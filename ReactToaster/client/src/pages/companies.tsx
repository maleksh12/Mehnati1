import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Search, Building2, Users, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { LIBYAN_CITIES, SECTORS, type Company } from '@shared/schema';

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');

  const { data: companies, isLoading } = useQuery<Company[]>({
    queryKey: ['/api/companies'],
  });

  const filteredCompanies = companies?.filter((company) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      company.name.toLowerCase().includes(searchLower) || 
      company.description.toLowerCase().includes(searchLower);
    const matchesCity = cityFilter === 'all' || company.city === cityFilter;
    const matchesSector = sectorFilter === 'all' || company.sector === sectorFilter;
    return matchesSearch && matchesCity && matchesSector;
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2" data-testid="text-page-title">
          تصفح الشركات
        </h1>
        <p className="text-muted-foreground">تعرف على أفضل الشركات في ليبيا</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-8 border">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              type="search"
              placeholder="ابحث عن شركة..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-companies"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-muted-foreground" data-testid="text-results-count">
          {isLoading ? 'جاري التحميل...' : `${filteredCompanies?.length || 0} شركة`}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover-elevate">
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-20 w-20 rounded-lg" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : filteredCompanies && filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`}>
              <Card className="hover-elevate transition-all h-full" data-testid={`card-company-${company.id}`}>
                <CardContent className="p-6 space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                    <Building2 className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2 leading-tight">{company.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{company.sector}</Badge>
                    <Badge variant="outline" className="gap-1">
                      <MapPin size={12} />
                      {company.city}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users size={16} />
                      {company.followersCount} متابع
                    </span>
                    <Badge variant="outline">{company.companyType}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Building2 className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا توجد نتائج</h3>
            <p className="text-muted-foreground">جرب تغيير معايير البحث للعثور على شركات أخرى</p>
          </div>
        )}
      </div>
    </div>
  );
}
