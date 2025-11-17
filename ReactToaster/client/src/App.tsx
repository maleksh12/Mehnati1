import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import HomePage from "@/pages/home";
import JobsPage from "@/pages/jobs";
import JobDetailPage from "@/pages/job-detail";
import CompaniesPage from "@/pages/companies";
import CompanyDetailPage from "@/pages/company-detail";
import AboutPage from "@/pages/about";
import ContactPage from "@/pages/contact";
import HelpPage from "@/pages/help";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/jobs" component={JobsPage} />
      <Route path="/jobs/:id" component={JobDetailPage} />
      <Route path="/companies" component={CompaniesPage} />
      <Route path="/companies/:id" component={CompanyDetailPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/help" component={HelpPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Layout>
          <Router />
        </Layout>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
