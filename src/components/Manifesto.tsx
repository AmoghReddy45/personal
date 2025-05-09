import React from "react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";

interface ManifestoProps {
  className?: string;
}

const Manifesto: React.FC<ManifestoProps> = ({ className }) => {
  return (
    <section id="resume" className={cn("py-20 bg-gray-50", className)}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif mb-10 text-center">
              Work Experience
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="space-y-12">
              {/* Elora AI */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-serif font-medium">
                  Elora AI — Autonomous AI Support Platform
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Founder & Engineer | Jan 2025 – Present
                </p>
                <ul className="mt-4 space-y-3 text-sm md:text-base">
                  <li>
                    Building a secure, compliant AI agent platform that resolves
                    complex customer support queries end-to-end, tailored for
                    SaaS and Fintech.
                  </li>
                  <li>
                    Implemented self-healing agent architecture, human fallback
                    logic, and real-time decisioning flows for multi-turn
                    conversation handling.
                  </li>
                  <li>
                    Created a modular knowledge ingestion system to ground AI
                    responses in company-specific content with governance
                    guardrails.
                  </li>
                  <li>
                    Developed and deployed a branded landing page showcasing
                    value props, verticals, and pain point resolution for
                    decision-makers and support teams.
                  </li>
                </ul>
              </div>

              {/* American Express | Resy */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-serif font-medium">
                  American Express | Resy
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Backend & DevOps Software Engineer Internship | June 2024 –
                  August 2024
                </p>
                <ul className="mt-4 space-y-3 text-sm md:text-base">
                  <li>
                    Developed REST APIs using FastAPI, enhancing responsiveness
                    and scalability of Resy's core customer-facing services.
                  </li>
                  <li>
                    Collaborated with the DevOps team to configure CI/CD
                    pipelines, streamline deployment processes, and expose
                    application endpoints using Load Balancer services.
                  </li>
                  <li>
                    Leveraged Docker and Kubernetes to implement a microservices
                    architecture, improving system scalability by 10% and
                    reducing deployment cycles by 20%.
                  </li>
                </ul>
              </div>

              {/* Ganas Consulting */}
              <div className="border-b border-gray-200 pb-8">
                <h3 className="text-xl font-serif font-medium">
                  Ganas Consulting
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Front-End Software Engineer Internship | June 2023 – August
                  2023
                </p>
                <ul className="mt-4 space-y-3 text-sm md:text-base">
                  <li>
                    Led the design and development of a comprehensive
                    observability platform dashboard using React.js, translating
                    client concepts to interactive models.
                  </li>
                  <li>
                    Enhanced data accuracy by 15% refining real-time analytics
                    and system health indicators.
                  </li>
                  <li>
                    Optimized database queries, achieving a 20% improvement in
                    data retrieval efficiency and supporting system scalability.
                  </li>
                </ul>
              </div>

              {/* Shoku */}
              <div>
                <h3 className="text-xl font-serif font-medium">Shoku – App</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Co-Founder & Developer | April 2023 - February 2024
                </p>
                <ul className="mt-4 space-y-3 text-sm md:text-base">
                  <li>
                    Spearheaded the ideation, design, and deployment of Shoku,
                    an innovative platform for personalized restaurant discovery
                    and social culinary experiences.
                  </li>
                  <li>
                    Architected and implemented a responsive Python backend with
                    FastAPI, leveraging asynchronous request handling to enhance
                    application performance.
                  </li>
                  <li>
                    Managed database operations through SQLAlchemy ORM, crafting
                    a stable and secure PostgreSQL schema on AWS RDS.
                  </li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
