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
        liveUrl="/"
        githubUrl="https://github.com/paraiii/personalWebsite"
      />
      <ProjectCard
        title="Interview Tracker – Smart To-Do with Question Bank"
        description="A productivity tool designed for job seekers and engineers preparing for interviews."
        technologies={["React", "TypeScript", "REST API"]}
        imageUrl="https://personal-interview-question-list.netlify.app/"
        liveUrl="/"
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
I'm a passionate software engineer with a deep interest in creating innovative solutions that make a difference. My journey in technology began with curiosity and has evolved into a career focused on building robust, scalable applications.

## Skills & Expertise
- **Frontend Development**: React, Vue.js, TypeScript, CSS3
- **Backend Development**: Node.js, Python, Django, Express
- **Database**: PostgreSQL, MongoDB, Redis
- **DevOps**: Docker, AWS, CI/CD, Git
- **Other**: Machine Learning, Data Analysis, UI/UX Design

## Philosophy
I believe in writing clean, maintainable code and creating user experiences that are both beautiful and functional. Every project is an opportunity to learn and grow.

## Current Focus
Currently exploring the intersection of AI and web development, working on projects that leverage machine learning to create more intelligent and responsive applications.
    `}
    />
  </Container>
);

const ProjectsPage: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <MarkdownRenderer
      content={`
# Past Projects

## 2023
### E-commerce Platform
Built a full-stack e-commerce solution with React frontend and Node.js backend. Features include user authentication, payment processing, and inventory management.

### Weather App
Developed a weather application using OpenWeather API with location-based forecasting and interactive maps.

## 2022
### Task Management System
Created a collaborative task management tool with real-time updates and team collaboration features.

### Portfolio Website
Designed and developed a responsive portfolio website with modern animations and SEO optimization.

## 2021
### Blog Platform
Built a content management system for blogs with markdown support and comment system.

### API Gateway
Developed a microservices API gateway with rate limiting and authentication middleware.
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
