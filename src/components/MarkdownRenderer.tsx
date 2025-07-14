import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownRendererProps = {
  content: string;
};

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: (props) => (
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{
              color: "var(--heading1)",
              textShadow: "0 0 10px var(--heading1), 0 0 20px var(--heading1)",
              fontSize: "2.5rem", // 大字号
            }}
            {...props}
          />
        ),
        h2: (props) => (
          <Typography
            variant="h5"
            fontWeight={700}
            gutterBottom
            sx={{
              color: "var(--heading2)",
              marginTop: 3,
              marginBottom: 1.5,
              letterSpacing: 1,
            }}
            {...props}
          />
        ),
        h3: (props) => (
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
            sx={{
              color: "var(--heading3)",
              fontWeight: 700,
              letterSpacing: 0.5,
            }}
            {...props}
          />
        ),
        p: (props) => (
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: "var(--editor-foreground)",
              lineHeight: 1.7,
            }}
            {...props}
          />
        ),
        li: (props) => (
          <li
            style={{
              marginLeft: "1.5em",
              listStylePosition: "outside",
            }}
          >
            <Typography
              variant="body1"
              component="span"
              sx={{
                color: "var(--body)",
                lineHeight: 1.7,
              }}
              {...props}
            />
          </li>
        ),
        strong: (props) => (
          <strong style={{ color: "var(--keywords)" }} {...props} />
        ),
        em: (props) => <em style={{ color: "var(--strings)" }} {...props} />,
        code: (props) => {
          const { className } = props;
          const isInline = !className?.includes("language-");

          if (isInline) {
            return (
              <code
                style={{
                  backgroundColor: "var(--terminal-background)",
                  color: "var(--terminal-foreground)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontSize: "0.9em",
                  fontFamily: "Fira Code, Monaco, Consolas, monospace",
                  border: "1px solid var(--operators)",
                }}
                {...props}
              />
            );
          }
          return (
            <Box
              component="pre"
              sx={{
                backgroundColor: "var(--terminal-background)",
                color: "var(--terminal-foreground)",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid var(--operators)",
                boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)",
                overflow: "auto",
                fontFamily: "Fira Code, Monaco, Consolas, monospace",
                fontSize: "0.9em",
                lineHeight: 1.5,
                margin: "16px 0",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, var(--purple-accent), transparent)",
                },
              }}
            >
              <code {...props} />
            </Box>
          );
        },
        blockquote: (props) => (
          <Box
            component="blockquote"
            sx={{
              borderLeft: "4px solid var(--purple-accent)",
              paddingLeft: "16px",
              margin: "16px 0",
              fontStyle: "italic",
              color: "var(--comments)",
              backgroundColor: "rgba(128, 79, 179, 0.05)",
              padding: "12px 16px",
              borderRadius: "4px",
            }}
            {...props}
          />
        ),
        ul: (props) => <ul style={{ marginBottom: "1em" }} {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
