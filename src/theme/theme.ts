import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    glass: {
      background: string;
      border: string;
      shadow: string;
      inputBackground: string;
    };
  }
  interface PaletteOptions {
    glass?: {
      background?: string;
      border?: string;
      shadow?: string;
      inputBackground?: string;
    };
  }
}

// Cyber主题颜色调色板
const cyberColors = {
  // 深色主题颜色
  dark: {
    editorForeground: "#9bb5e6",
    variables: "#ff42ac",
    keywords: "#a449ff",
    numbers: "#ffa352",
    classes: "#98a3ff",
    functions: "#4d92ff",
    strings: "#59f7ffe5",
    operators: "#ff67e7",
    comments: "#c5bfd1b7",
    widgetsBackground: "#14121b",
    editorBackground: "#1a1b26",
    purpleAccent: "#804fb3",
    sidebarBackground: "#0d0d0d",
    listBackground: "#14121b",
    listSelected: "#4f4f96",
    listHover: "#504bd5b7",
    terminalBackground: "#1d1f28",
    terminalForeground: "#ffffffc5",
  },
  // 浅色主题颜色（基于深色主题调整亮度和对比度）
  light: {
    editorForeground: "#1a202c",
    variables: "#d53f8c",
    keywords: "#805ad5",
    numbers: "#dd6b20",
    classes: "#3182ce",
    functions: "#2b6cb0",
    strings: "#38b2ac",
    operators: "#e53e3e",
    comments: "#4a5568",
    widgetsBackground: "#f7fafc",
    editorBackground: "#ffffff",
    purpleAccent: "#804fb3",
    sidebarBackground: "#edf2f7",
    listBackground: "#f7fafc",
    listSelected: "#e2e8f0",
    listHover: "#edf2f7",
    terminalBackground: "#2d3748",
    terminalForeground: "#ffffff",
  },
};

export const createCyberTheme = (mode: "light" | "dark") => {
  const colors = cyberColors[mode];

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.purpleAccent,
        light: mode === "dark" ? "#a855f7" : "#9333ea",
        dark: mode === "dark" ? "#7c3aed" : "#6b21a8",
      },
      secondary: {
        main: colors.functions,
        light: mode === "dark" ? "#60a5fa" : "#3b82f6",
        dark: mode === "dark" ? "#2563eb" : "#1d4ed8",
      },
      background: {
        default: colors.editorBackground,
        paper: colors.widgetsBackground,
      },
      text: {
        primary: colors.editorForeground,
        secondary: colors.comments,
      },
      divider: mode === "dark" ? "#2d3748" : "#e2e8f0",
      glass: {
        background:
          mode === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
        border: mode === "dark" ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)",
        shadow:
          mode === "dark"
            ? "0 8px 32px rgba(0,0,0,0.3)"
            : "0 8px 32px rgba(0,0,0,0.1)",
        inputBackground:
          mode === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.04)",
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 500,
      },
      h6: {
        fontWeight: 500,
      },
    },
    components: {
      MuiContainer: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            "@media (min-width: 600px)": {
              paddingLeft: "3rem",
              paddingRight: "3rem",
            },
            "@media (min-width: 960px)": {
              paddingLeft: "4rem",
              paddingRight: "4rem",
            },
            "@media (min-width: 1280px)": {
              paddingLeft: "5rem",
              paddingRight: "5rem",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: colors.widgetsBackground,
            border: `1px solid ${mode === "dark" ? "#2d3748" : "#e2e8f0"}`,
            boxShadow:
              mode === "dark"
                ? `0 0 10px rgba(128, 79, 179, 0.1)`
                : `0 4px 6px rgba(0, 0, 0, 0.05)`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            borderRadius: 8,
            boxShadow:
              mode === "dark" ? `0 0 5px ${colors.purpleAccent}` : "none",
            "&:hover": {
              boxShadow:
                mode === "dark"
                  ? `0 0 10px ${colors.purpleAccent}`
                  : "0 4px 8px rgba(0, 0, 0, 0.1)",
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: colors.listBackground,
            color: colors.editorForeground,
            border: `1px solid ${mode === "dark" ? "#2d3748" : "#e2e8f0"}`,
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: 4,
          },
          indicator: {
            backgroundColor: colors.purpleAccent,
            height: 3,
            borderRadius: 2,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: colors.comments,
            "&.Mui-selected": {
              color: colors.purpleAccent,
            },
            "&:hover": {
              color: colors.editorForeground,
            },
          },
        },
      },
    },
  });
};
