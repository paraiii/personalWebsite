import { Box, Container, Typography, useTheme } from "@mui/material";
import type { ReactNode } from "react";

type SectionProps = {
  title?: string;
  children: ReactNode;
  dataSection?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
};

export default function Section({
  title,
  children,
  dataSection,
  maxWidth = "xl",
}: SectionProps) {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: 6 }} data-section={dataSection}>
      <Container maxWidth={maxWidth}>
        {title && (
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            fontWeight={700}
            sx={{ color: theme.palette.text.primary }}
          >
            {title}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  );
}
