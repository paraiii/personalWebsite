import { GitHub, Launch } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

type ProjectCardProps = {
  title: string;
  description: string;
  technologies?: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
};

export default function ProjectCard({
  title,
  description,
  technologies,
  imageUrl,
  liveUrl,
  githubUrl,
}: ProjectCardProps) {
  const theme = useTheme();

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card
        variant="outlined"
        sx={{
          mb: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 0 10px rgba(128, 79, 179, 0.1)"
              : "0 4px 6px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 0 20px rgba(128, 79, 179, 0.2)"
                : "0 8px 16px rgba(0, 0, 0, 0.1)",
            borderColor: theme.palette.primary.main,
          },
          transition: "all 0.3s ease",
        }}
      >
        {imageUrl && (
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={title}
            sx={{ objectFit: "cover" }}
          />
        )}
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={600}
            gutterBottom
            sx={{ color: theme.palette.text.primary }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            sx={{ color: theme.palette.text.secondary }}
          >
            {description}
          </Typography>
          {technologies && (
            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
              {technologies.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  size="small"
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(128, 79, 179, 0.1)"
                        : "rgba(128, 79, 179, 0.05)",
                    color: theme.palette.primary.main,
                    border: `1px solid ${theme.palette.divider}`,
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(128, 79, 179, 0.2)"
                          : "rgba(128, 79, 179, 0.1)",
                    },
                  }}
                />
              ))}
            </Stack>
          )}
        </CardContent>
        <CardActions>
          {liveUrl && (
            <Button
              size="small"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<Launch />}
              sx={{
                color: theme.palette.primary.main,
                "&:hover": {
                  color: theme.palette.primary.dark,
                  boxShadow: `0 0 10px ${theme.palette.primary.main}40`,
                },
              }}
            >
              Live Demo
            </Button>
          )}
          {githubUrl && (
            <Button
              size="small"
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<GitHub />}
              sx={{
                color: theme.palette.text.secondary,
                "&:hover": {
                  color: theme.palette.text.primary,
                  boxShadow: `0 0 10px ${theme.palette.text.secondary}40`,
                },
              }}
            >
              GitHub
            </Button>
          )}
        </CardActions>
      </Card>
    </motion.div>
  );
}
