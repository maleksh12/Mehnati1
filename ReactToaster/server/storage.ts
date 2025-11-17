import { type Company, type InsertCompany, type Job, type InsertJob, type Stats } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Companies
  getCompany(id: string): Promise<Company | undefined>;
  getAllCompanies(): Promise<Company[]>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: string, updates: Partial<InsertCompany>): Promise<Company | undefined>;
  deleteCompany(id: string): Promise<boolean>;
  getFeaturedCompanies(limit: number): Promise<Company[]>;
  
  // Jobs
  getJob(id: string): Promise<Job | undefined>;
  getAllJobs(): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: string, updates: Partial<InsertJob>): Promise<Job | undefined>;
  deleteJob(id: string): Promise<boolean>;
  getRecentJobs(limit: number): Promise<Job[]>;
  getJobsByCompany(companyId: string): Promise<Job[]>;
  
  // Stats
  getStats(): Promise<Stats>;
}

export class MemStorage implements IStorage {
  private companies: Map<string, Company>;
  private jobs: Map<string, Job>;

  constructor() {
    this.companies = new Map();
    this.jobs = new Map();
    this.seedData();
  }

  // Companies
  async getCompany(id: string): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getAllCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = randomUUID();
    const company: Company = {
      ...insertCompany,
      id,
      followersCount: 0,
      createdAt: new Date().toISOString(),
    };
    this.companies.set(id, company);
    return company;
  }

  async updateCompany(id: string, updates: Partial<InsertCompany>): Promise<Company | undefined> {
    const existing = this.companies.get(id);
    if (!existing) return undefined;
    // Preserve computed fields
    const updated: Company = {
      ...existing,
      ...updates,
      id: existing.id,
      followersCount: existing.followersCount,
      createdAt: existing.createdAt,
    };
    this.companies.set(id, updated);
    return updated;
  }

  async deleteCompany(id: string): Promise<boolean> {
    // Check for associated jobs
    const companyJobs = await this.getJobsByCompany(id);
    if (companyJobs.length > 0) {
      // Soft delete: mark associated jobs as inactive
      companyJobs.forEach(job => {
        this.jobs.set(job.id, { ...job, isActive: false });
      });
    }
    return this.companies.delete(id);
  }

  async getFeaturedCompanies(limit: number): Promise<Company[]> {
    return Array.from(this.companies.values())
      .sort((a, b) => b.followersCount - a.followersCount)
      .slice(0, limit);
  }

  // Jobs
  async getJob(id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.isActive);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = randomUUID();
    const job: Job = {
      ...insertJob,
      id,
      applicationsCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: string, updates: Partial<InsertJob>): Promise<Job | undefined> {
    const existing = this.jobs.get(id);
    if (!existing) return undefined;
    // Preserve computed fields and validate companyId if changed
    if (updates.companyId && updates.companyId !== existing.companyId) {
      const company = await this.getCompany(updates.companyId);
      if (!company) return undefined; // Invalid company reference
    }
    const updated: Job = {
      ...existing,
      ...updates,
      id: existing.id,
      applicationsCount: existing.applicationsCount,
      createdAt: existing.createdAt,
    };
    this.jobs.set(id, updated);
    return updated;
  }

  async deleteJob(id: string): Promise<boolean> {
    // Soft delete: mark as inactive instead of removing
    const job = this.jobs.get(id);
    if (!job) return false;
    this.jobs.set(id, { ...job, isActive: false });
    return true;
  }

  async getRecentJobs(limit: number): Promise<Job[]> {
    return Array.from(this.jobs.values())
      .filter(job => job.isActive)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  async getJobsByCompany(companyId: string): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(
      job => job.companyId === companyId && job.isActive
    );
  }

  // Stats
  async getStats(): Promise<Stats> {
    const companies = await this.getAllCompanies();
    const jobs = await this.getAllJobs();
    return {
      graduates: 15000,
      companies: companies.length,
      jobs: jobs.length,
    };
  }

  // Seed data
  private seedData() {
    // Seed companies
    const companiesData: InsertCompany[] = [
      {
        name: 'شركة النفط الوطنية الليبية',
        description: 'الشركة الوطنية للنفط هي شركة ليبية حكومية مسؤولة عن إدارة قطاع النفط والغاز في ليبيا. تأسست في عام 1970 وتعتبر من أكبر الشركات في القطاع النفطي بالمنطقة.',
        sector: 'النفط والغاز',
        city: 'طرابلس',
        website: 'https://noc.ly',
        companyType: 'حكومية',
        employeeCount: '5000+',
      },
      {
        name: 'مصرف ليبيا المركزي',
        description: 'البنك المركزي في ليبيا المسؤول عن السياسة النقدية والإشراف على القطاع المصرفي. يلعب دوراً محورياً في تنظيم النظام المالي وإصدار العملة الوطنية.',
        sector: 'المحاسبة والمالية',
        city: 'طرابلس',
        website: 'https://cbl.gov.ly',
        companyType: 'حكومية',
        employeeCount: '1000+',
      },
      {
        name: 'ليبيا للاتصالات والتقنية',
        description: 'شركة رائدة في مجال الاتصالات وتقنية المعلومات في ليبيا. تقدم حلول تقنية متطورة للشركات والأفراد وتسهم في تطوير البنية التحتية الرقمية.',
        sector: 'التقنية والبرمجة',
        city: 'بنغازي',
        website: 'https://ltt.ly',
        companyType: 'خاصة',
        employeeCount: '500-1000',
      },
      {
        name: 'مستشفى طرابلس المركزي',
        description: 'أكبر مستشفى في ليبيا يقدم خدمات صحية شاملة ومتخصصة. يضم أقسام متعددة ويعتبر مرجعاً طبياً رئيسياً في البلاد.',
        sector: 'الصحة',
        city: 'طرابلس',
        companyType: 'حكومية',
        employeeCount: '2000+',
      },
      {
        name: 'شركة المدار الجديد',
        description: 'شركة اتصالات رائدة تقدم خدمات الهاتف المحمول والإنترنت لملايين المستخدمين في ليبيا. تتميز بشبكة تغطية واسعة وخدمات عالية الجودة.',
        sector: 'التقنية والبرمجة',
        city: 'مصراتة',
        website: 'https://almadar.ly',
        companyType: 'خاصة',
        employeeCount: '1000-2000',
      },
      {
        name: 'جامعة طرابلس',
        description: 'جامعة حكومية رائدة في ليبيا تقدم برامج تعليمية متنوعة في مختلف التخصصات. تضم كليات عديدة وتستقبل آلاف الطلاب سنوياً.',
        sector: 'التعليم',
        city: 'طرابلس',
        website: 'https://uot.edu.ly',
        companyType: 'حكومية',
        employeeCount: '3000+',
      },
    ];

    const seededCompanies: Company[] = [];
    companiesData.forEach((companyData, index) => {
      const id = `company-${index + 1}`;
      const company: Company = {
        ...companyData,
        id,
        followersCount: Math.floor(Math.random() * 1000) + 500,
        createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
      };
      this.companies.set(id, company);
      seededCompanies.push(company);
    });

    // Seed jobs
    const jobsData = [
      {
        companyId: seededCompanies[0].id,
        title: 'مهندس نفط',
        description: 'نبحث عن مهندس نفط ذو خبرة للعمل في مشاريع الاستكشاف والإنتاج. المسؤوليات تشمل التخطيط والإشراف على عمليات الحفر والإنتاج، وتحليل البيانات الجيولوجية، والتأكد من الامتثال لمعايير السلامة والبيئة.',
        requirements: '- شهادة بكالوريوس في هندسة النفط أو ما يعادلها\n- خبرة لا تقل عن 3 سنوات في مجال الاستكشاف والإنتاج\n- إجادة اللغة الإنجليزية تحدثاً وكتابة\n- معرفة ببرامج المحاكاة والتصميم الهندسي\n- القدرة على العمل في بيئات صعبة',
        jobType: 'دوام كامل',
        experienceLevel: 'متوسط',
        city: 'طرابلس',
        sector: 'النفط والغاز',
        salaryRange: '3000-5000 دينار',
      },
      {
        companyId: seededCompanies[1].id,
        title: 'محاسب مالي',
        description: 'مطلوب محاسب مالي للعمل في قسم المحاسبة. المسؤوليات تشمل إعداد التقارير المالية، إدارة الحسابات، المراجعة الداخلية، والتأكد من الامتثال للمعايير المحاسبية الدولية.',
        requirements: '- شهادة بكالوريوس في المحاسبة أو المالية\n- خبرة 2-3 سنوات في مجال المحاسبة المالية\n- معرفة ببرامج المحاسبة (ERP، Excel المتقدم)\n- إلمام بالمعايير المحاسبية الدولية\n- دقة عالية في العمل والالتزام بالمواعيد',
        jobType: 'دوام كامل',
        experienceLevel: 'متوسط',
        city: 'طرابلس',
        sector: 'المحاسبة والمالية',
        salaryRange: '2000-3000 دينار',
      },
      {
        companyId: seededCompanies[2].id,
        title: 'مطور برمجيات Full Stack',
        description: 'نبحث عن مطور برمجيات متمكن في React و Node.js للعمل على مشاريع تطوير تطبيقات الويب. ستكون مسؤولاً عن تصميم وتطوير الواجهات الأمامية والخلفية، والعمل ضمن فريق متعدد التخصصات.',
        requirements: '- خبرة عملية في React, Node.js, MongoDB أو PostgreSQL\n- معرفة بـ Git، REST APIs، وأدوات التطوير الحديثة\n- القدرة على العمل ضمن فريق وإدارة الوقت بفعالية\n- فهم جيد لمبادئ تصميم الواجهات وتجربة المستخدم\n- معرفة بـ TypeScript ميزة إضافية',
        jobType: 'دوام كامل',
        experienceLevel: 'متوسط',
        city: 'بنغازي',
        sector: 'التقنية والبرمجة',
        salaryRange: '2500-4000 دينار',
      },
      {
        companyId: seededCompanies[3].id,
        title: 'ممرض/ممرضة',
        description: 'مطلوب ممرضين وممرضات للعمل في قسم الطوارئ. يجب أن يكون لديهم خبرة في التعامل مع الحالات الحرجة وتقديم الرعاية الصحية الطارئة.',
        requirements: '- شهادة تمريض معتمدة من وزارة الصحة\n- خبرة سنتين على الأقل في قسم الطوارئ\n- القدرة على العمل تحت الضغط وفي أوقات مختلفة\n- مهارات تواصل ممتازة مع المرضى وأسرهم\n- الالتزام بمعايير الجودة والسلامة الطبية',
        jobType: 'دوام كامل',
        experienceLevel: 'مبتدئ',
        city: 'طرابلس',
        sector: 'الصحة',
        salaryRange: '1500-2500 دينار',
      },
      {
        companyId: seededCompanies[4].id,
        title: 'مهندس شبكات',
        description: 'مطلوب مهندس شبكات للعمل على تصميم وصيانة البنية التحتية للشبكات. المسؤوليات تشمل إدارة الشبكات، حل المشاكل التقنية، وضمان الأمن السيبراني.',
        requirements: '- شهادة بكالوريوس في هندسة الحاسوب أو الشبكات\n- شهادات مهنية (CCNA أو CCNP)\n- خبرة 3-5 سنوات في مجال إدارة الشبكات\n- معرفة عميقة ببروتوكولات الشبكات والأمن السيبراني\n- القدرة على حل المشاكل التقنية المعقدة',
        jobType: 'دوام كامل',
        experienceLevel: 'خبير',
        city: 'مصراتة',
        sector: 'التقنية والبرمجة',
        salaryRange: '3000-4500 دينار',
      },
      {
        companyId: seededCompanies[5].id,
        title: 'أستاذ جامعي - علوم الحاسوب',
        description: 'مطلوب أستاذ جامعي في قسم علوم الحاسوب للتدريس والإشراف على الأبحاث. ستكون مسؤولاً عن تدريس مقررات البرمجة والخوارزميات والإشراف على مشاريع الطلاب.',
        requirements: '- درجة الدكتوراه في علوم الحاسوب أو مجال ذي صلة\n- خبرة في التدريس الجامعي والبحث الأكاديمي\n- منشورات بحثية في مجلات أو مؤتمرات محكّمة\n- إجادة اللغتين العربية والإنجليزية\n- شغف بالتعليم والبحث العلمي',
        jobType: 'دوام كامل',
        experienceLevel: 'محترف',
        city: 'طرابلس',
        sector: 'التعليم',
        salaryRange: '4000-6000 دينار',
      },
      {
        companyId: seededCompanies[2].id,
        title: 'مصمم UI/UX',
        description: 'نبحث عن مصمم واجهات مستخدم لتصميم تطبيقات جوال وويب حديثة. ستعمل على تحسين تجربة المستخدم وإنشاء واجهات جذابة وسهلة الاستخدام.',
        requirements: '- خبرة عملية في Figma، Adobe XD، أو Sketch\n- معرفة بمبادئ تصميم تجربة المستخدم (UX) والواجهات (UI)\n- Portfolio قوي يعرض أعمالك السابقة\n- فهم جيد لمبادئ التصميم والألوان والطباعة\n- القدرة على العمل مع فرق التطوير',
        jobType: 'دوام جزئي',
        experienceLevel: 'مبتدئ',
        city: 'بنغازي',
        sector: 'التقنية والبرمجة',
        salaryRange: '1500-2500 دينار',
      },
      {
        companyId: seededCompanies[0].id,
        title: 'متدرب هندسة',
        description: 'برنامج تدريبي لطلاب الهندسة في مجال النفط والغاز. مدة التدريب 6 أشهر. ستتاح لك الفرصة للتعلم من مهندسين ذوي خبرة والعمل على مشاريع حقيقية.',
        requirements: '- طالب في السنة الأخيرة من كلية الهندسة (نفط، كيمياء، ميكانيكا)\n- معدل تراكمي جيد (لا يقل عن 3.0)\n- رغبة قوية في التعلم والتطوير\n- القدرة على الالتزام بساعات العمل\n- مهارات تواصل جيدة',
        jobType: 'تدريب',
        experienceLevel: 'مبتدئ',
        city: 'طرابلس',
        sector: 'النفط والغاز',
        salaryRange: '500-1000 دينار',
      },
    ];

    jobsData.forEach((jobData, index) => {
      const id = `job-${index + 1}`;
      const job: Job = {
        ...jobData,
        id,
        applicationsCount: Math.floor(Math.random() * 150) + 10,
        isActive: true,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
      this.jobs.set(id, job);
    });
  }
}

export const storage = new MemStorage();
