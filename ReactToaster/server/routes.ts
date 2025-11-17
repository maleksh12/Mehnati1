import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCompanySchema, insertJobSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Stats endpoint
  app.get("/api/stats", async (_req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Companies endpoints
  app.get("/api/companies", async (_req, res) => {
    try {
      const companies = await storage.getAllCompanies();
      res.json(companies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  });

  app.get("/api/companies/featured", async (_req, res) => {
    try {
      const companies = await storage.getFeaturedCompanies(4);
      res.json(companies);
    } catch (error) {
      console.error("Error fetching featured companies:", error);
      res.status(500).json({ error: "Failed to fetch featured companies" });
    }
  });

  app.get("/api/companies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const company = await storage.getCompany(id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      console.error("Error fetching company:", error);
      res.status(500).json({ error: "Failed to fetch company" });
    }
  });

  app.get("/api/companies/:id/jobs", async (req, res) => {
    try {
      const { id } = req.params;
      const jobs = await storage.getJobsByCompany(id);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching company jobs:", error);
      res.status(500).json({ error: "Failed to fetch company jobs" });
    }
  });

  // Jobs endpoints
  app.get("/api/jobs", async (_req, res) => {
    try {
      const jobs = await storage.getAllJobs();
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/recent", async (_req, res) => {
    try {
      const jobs = await storage.getRecentJobs(6);
      res.json(jobs);
    } catch (error) {
      console.error("Error fetching recent jobs:", error);
      res.status(500).json({ error: "Failed to fetch recent jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const job = await storage.getJob(id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      console.error("Error fetching job:", error);
      res.status(500).json({ error: "Failed to fetch job" });
    }
  });

  // Create company (with validation)
  app.post("/api/companies", async (req, res) => {
    try {
      const result = insertCompanySchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }
      const company = await storage.createCompany(result.data);
      res.status(201).json(company);
    } catch (error) {
      console.error("Error creating company:", error);
      res.status(500).json({ error: "Failed to create company" });
    }
  });

  // Create job (with validation)
  app.post("/api/jobs", async (req, res) => {
    try {
      const result = insertJobSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }
      const job = await storage.createJob(result.data);
      res.status(201).json(job);
    } catch (error) {
      console.error("Error creating job:", error);
      res.status(500).json({ error: "Failed to create job" });
    }
  });

  // Update company (with validation)
  app.patch("/api/companies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = insertCompanySchema.partial().safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }
      const company = await storage.updateCompany(id, result.data);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      console.error("Error updating company:", error);
      res.status(500).json({ error: "Failed to update company" });
    }
  });

  // Delete company
  app.delete("/api/companies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteCompany(id);
      if (!success) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting company:", error);
      res.status(500).json({ error: "Failed to delete company" });
    }
  });

  // Update job (with validation)
  app.patch("/api/jobs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = insertJobSchema.partial().safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ error: validationError.message });
      }
      const job = await storage.updateJob(id, result.data);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.json(job);
    } catch (error) {
      console.error("Error updating job:", error);
      res.status(500).json({ error: "Failed to update job" });
    }
  });

  // Delete job
  app.delete("/api/jobs/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const success = await storage.deleteJob(id);
      if (!success) {
        return res.status(404).json({ error: "Job not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting job:", error);
      res.status(500).json({ error: "Failed to delete job" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
