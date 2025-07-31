import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React, { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { MarkdownRenderer } from "./components/MarkdownRenderer";
import { ProjectCard } from "./components/ProjectCard";
import { WeatherProvider } from "./contexts/WeatherContext";
import { WeatherPage } from "./page/WeatherPage";
import { Section } from "./Section";
import { HeroSection } from "./sections/HeroSection";
import { TechnologiesSection } from "./sections/TechnologiesSection";
import { createCyberTheme } from "./theme/theme";

import weatherImage from "./assets/weatherImg.png";
import aboutMe from "./content/about.md?raw";
import playground from "./content/playground.md?raw";
import pastProjects from "./content/projects.md?raw";
import resume from "./content/resume.md?raw";
import { CounterTimer } from "./page/CounterTimer";
import { TestPage } from "./page/TestPage";

const HomePage: React.FC = () => (
  <Container maxWidth="xl" sx={{ py: 4 }}>
    <HeroSection />
    <TechnologiesSection />
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
    <MarkdownRenderer content={aboutMe} />
  </Container>
);

const ProjectsPage: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <MarkdownRenderer content={pastProjects} />
  </Container>
);

const ResumePage: React.FC = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <MarkdownRenderer content={resume} />
  </Container>
);

const PlaygroundPage: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <MarkdownRenderer content={playground} />
  </Container>
);

export const App = () => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return prefersDark ? "dark" : "light";
  });
  const theme = useMemo(() => createCyberTheme(mode), [mode]);
  const toggleTheme = () => {
    setMode((prev) => {
      const next: "light" | "dark" = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WeatherProvider>
        <Layout toggleTheme={toggleTheme} mode={mode}>
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
