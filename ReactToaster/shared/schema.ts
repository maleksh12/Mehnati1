import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Companies table
export const companies = pgTable("companies", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  sector: text("sector").notNull(),
  city: text("city").notNull(),
  website: text("website"),
  companyType: text("company_type").notNull(),
  employeeCount: text("employee_count").notNull(),
  followersCount: integer("followers_count").notNull().default(0),
  createdAt: text("created_at").notNull(),
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  followersCount: true,
  createdAt: true,
});

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

// Jobs table
export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  companyId: varchar("company_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: text("requirements").notNull(),
  jobType: text("job_type").notNull(),
  experienceLevel: text("experience_level").notNull(),
  city: text("city").notNull(),
  sector: text("sector").notNull(),
  salaryRange: text("salary_range"),
  isActive: boolean("is_active").notNull().default(true),
  applicationsCount: integer("applications_count").notNull().default(0),
  createdAt: text("created_at").notNull(),
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  applicationsCount: true,
  createdAt: true,
  isActive: true,
});

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

// Stats interface
export interface Stats {
  graduates: number;
  companies: number;
  jobs: number;
}

// Libyan Cities
export const LIBYAN_CITIES = [
  'طرابلس', 'بنغازي', 'مصراتة', 'الزاوية', 'البيضاء', 'سبها', 'غريان', 'زليتن', 'الخمس',
  'صبراتة', 'الزنتان', 'ترهونة', 'صرمان', 'درنة', 'طبرق', 'المرج', 'أجدابيا'
];

// Sectors
export const SECTORS = [
  'النفط والغاز', 'التقنية والبرمجة', 'التعليم', 'الصحة', 'الهندسة', 'المحاسبة والمالية',
  'التسويق والمبيعات', 'البناء والتشييد', 'السياحة والضيافة', 'القانون', 'الإعلام'
];

// Job Types
export const JOB_TYPES = ['دوام كامل', 'دوام جزئي', 'تدريب', 'عن بعد'];

// Experience Levels
export const EXPERIENCE_LEVELS = ['مبتدئ', 'متوسط', 'خبير', 'محترف'];

// Company Types
export const COMPANY_TYPES = ['حكومية', 'خاصة', 'مختلطة'];
