import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { HeroSection } from "./components/HeroSection";
import Layout from "./components/Layout";
import { MarkdownRenderer } from "./components/MarkdownRenderer";
import { WeatherPage } from "./components/page/WeatherPage";
import { ProjectCard } from "./components/ProjectCard";
import { Section } from "./components/Section";
import { WeatherProvider } from "./contexts/WeatherContext";
import { useThemeToggle } from "./hooks/useThemeToggle";

import weatherImage from "./assets/weatherImg.png";
import { CounterTimer } from "./components/page/CounterTimer";
import { TestPage } from "./components/page/TestPage";

const HomePage: React.FC = () => (
  <Container maxWidth="xl" sx={{ py: 4 }}>
    <HeroSection />
    <Section title="Featured Projects" maxWidth="xl">
      <ProjectCard
        title="Weather Now"
        description="A sleek, animated weather interface built with React, MUI, and Emotion, featuring real-time weather data powered by Open-Meteo's public API."
        technologies={["React", "TypeScript", "REST API"]}
        imageUrl={weatherImage}
        liveUrl="/weather"
        githubUrl="https://github.com/paraiii/personalWebsite"
      />
      <ProjectCard
        title="Interview Tracker – Smart To-Do with Question Bank"
        description="A productivity tool designed for job seekers and engineers preparing for interviews."
        technologies={["React", "TypeScript", "REST API"]}
        imageUrl="https://personal-interview-question-list.netlify.app/"
        liveUrl="https://personal-interview-question-list.netlify.app/"
        githubUrl="https://github.com/paraiii/Add-Question-App"
      />
      <ProjectCard
        title="Developing..."
        description="Developing..."
        technologies={["Vue.js", "D3.js", "Express", "MySQL"]}
        imageUrl="https://via.placeholder.com/400x250/1a1b26/9bb5e6?text=Data+Viz"
      />
    </Section>
  </Container>
);

const AboutPage: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <MarkdownRenderer
      content={`      
# More About Me

## Background  
I'm a software engineer with a strong frontend focus and a passion for building thoughtful, responsive, and scalable web applications. My journey started with a curiosity for how things work and evolved into a career driven by hands-on problem solving, attention to detail, and creating value through clean design and robust architecture.

## Skills & Expertise
- **Frontend Development**: React, Svelte, JavScript, TypeScript, MUI, Emotion, Styled Components
- **Backend & APIs**: RESTful APIs, GraphQL  
- **Testing & Quality**: Jest, React Testing Library, CI/CD pipelines  
- **CI/CD & Automation**: Azure DevOps Pipelines (YAML), Dockerized deployment, Build triggers, Test stages
- **Dev Experience Tools**: MSW for API mocking, Storybook for component isolation, Chrome DevTools, Lighthouse for auditing
- **Tooling & Design**: Figma, Storybook, VSCode, ESLint, Prettier  
- **Collaboration**: Agile, cross-functional teamwork, stakeholder communication  
- **Version Control & Workflow**: Git, GitHub Flow, Azure DevOps Boards, Pull Request Reviews

## Philosophy
I believe good software is not just functional — it should be elegant, maintainable, and user-centric. Whether it's improving accessibility, refactoring complex flows, or introducing better developer tooling, I enjoy iterating toward clean, modular solutions that scale.


## Current Focus
I'm currently deepening my work across interactive system design, real-world API integration, and architecture for complex flows. I'm also exploring design systems, signals/reactivity patterns, and applying AI to streamline development workflows.
    `}
    />
  </Container>
);

const ProjectsPage: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <MarkdownRenderer
      content={`
# Past Projects

## 2025

### Personal Developer Website  
A modular, cyberpunk-inspired portfolio built with **React + TypeScript + MUI + Emotion**.  
- Dark/light mode with custom theme provider  
- Scroll-snapping FeaturedProjects module with project cards  
- Weather integration via React Context + Open-Meteo API  
- Responsive design, deployed via Netlify

### ARB E-commerce Platform – Vehicle Selector & Suspension Configurator  
Led the front-end development of key product configuration tools with **React + JavaScro[t] + MUI + Emotion** in a large-scale **GraphQL + RESTful** architecture and integrated with **AEM website:  
- **Vehicle Selector**:  
  - Built a multi-step selector UI for make/model/year/trim with scroll snapping, form state tracking, and MSW-mocked APIs  
  - Integrated with AEM via vanilla JS + React bridge  
  - Used GraphQL mutations to add products to Quote Cart based on selected vehicleID  
- **Suspension Configurator**:  
  - Built a dynamic stepper experience based on API-driven questions  
  - Integrated snapshot recovery, session ID refresh, backstep logic, and result summary  
  - Applied modularization and caching strategies for better UX and maintainability  
- CI/CD with **Azure DevOps**, containerized via **Docker**

## 2024 – Present

### Interview Tracker  
A productivity tool for tracking coding interview questions.  
- Developed using **React + TypeScript + MUI**  
- Support for tagging, filtering, progress tracking  
- Emphasized accessibility, modular architecture, and smooth local state experience

### ARB Centre Storefront Admin  
Built and maintained internal tools and UI components to support e-commerce product lifecycle:  
- Responsive admin dashboards  
- GraphQL queries/mutations for quote cart management  
- Close collaboration with external vendors (AEM, Magento)

## 2023 – 2024

### RPV Intranet Platforms  
As a frontend engineer at **Rail Projects Victoria**, developed dynamic intranet tools using **Svelte + TypeScript + MUI**:  
- Built responsive admin portals with tabview navigation, dynamic tables, filter/sort/date toggles  
- Enabled CRUD operations via REST API (connected to SharePoint lists)  
- Implemented dark/light mode, modal forms, and accessible design patterns  
- Integrated with SharePoint through modern script editor + iframe web parts  
- Designed and maintained **Azure YAML pipelines** for CI/CD deployments:
  - Multi-branch triggers
  - Build agents on Windows VM
  - Rollout coordination across environments

## 2022

### AHRI Website Project  
Worked on corporate website development using **WordPress + HTML + CSS + JavaScript**.  
- Customized themes and components  
- Implemented responsive layout and SEO optimization

    `}
    />
  </Container>
);

const ResumePage: React.FC = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <MarkdownRenderer
      content={`
# Resume

## Experience

### Senior Software Engineer
**Tech Company Inc.** | 2022 - Present
- Led development of microservices architecture
- Mentored junior developers and conducted code reviews
- Implemented CI/CD pipelines reducing deployment time by 60%

### Full Stack Developer
**Startup XYZ** | 2020 - 2022
- Built and maintained multiple web applications
- Collaborated with design team on UI/UX improvements
- Optimized database queries improving performance by 40%

## Education

### Bachelor of Computer Science
**University of Technology** | 2016 - 2020
- GPA: 3.8/4.0
- Relevant coursework: Data Structures, Algorithms, Web Development

## Certifications
- AWS Certified Developer Associate
- Google Cloud Professional Developer
- MongoDB Certified Developer

## Skills
**Programming Languages**: JavaScript, TypeScript, Python, Java
**Frameworks**: React, Vue.js, Node.js, Django, Express
**Databases**: PostgreSQL, MongoDB, Redis
**Tools**: Git, Docker, AWS, CI/CD
    `}
    />
  </Container>
);

const PlaygroundPage: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <MarkdownRenderer
      content={`
# Playground

Welcome to my experimental space! Here you'll find various projects and experiments I'm working on.

## Current Experiments

### AI Chat Interface
Building an AI-powered chat interface using OpenAI's API with custom styling and real-time responses.

### 3D Web Graphics
Exploring Three.js for creating interactive 3D graphics and animations in the browser.

### Data Visualization
Creating dynamic data visualizations using D3.js and Chart.js for real-time data display.

## Coming Soon
- Interactive Code Editor
- Real-time Collaboration Tools
- Machine Learning Demos
- Game Development Projects

Feel free to explore and provide feedback on any of these projects!
    `}
    />
  </Container>
);

export const App = () => {
  const { theme } = useThemeToggle();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WeatherProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/timer" element={<CounterTimer />} />
            <Route path="/test" element={<TestPage />} />
          </Routes>
        </Layout>
      </WeatherProvider>
    </ThemeProvider>
  );
};
