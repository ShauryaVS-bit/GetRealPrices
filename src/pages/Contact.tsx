import {
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Grid,
  IconButton,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Contact() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Contact Me
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton color="primary" size="large">
                  <EmailIcon />
                </IconButton>
                <Box>
                  <Typography variant="h6">Email</Typography>
                  <Link 
                    href="mailto:shauryasingh12veer12@gmail.com"
                    color="primary"
                    underline="hover"
                  >
                    shauryasingh12veer12@gmail.com
                  </Link>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton 
                  color="primary" 
                  size="large"
                  component={Link}
                  href="https://linkedin.com/in/shaurya-veer-singh-23255b356"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </IconButton>
                <Box>
                  <Typography variant="h6">LinkedIn</Typography>
                  <Link 
                    href="https://linkedin.com/in/shaurya-veer-singh-23255b356"
                    color="primary"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    linkedin.com/in/shaurya-veer-singh-23255b356
                  </Link>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <IconButton 
                  color="primary" 
                  size="large"
                  component={Link}
                  href="https://github.com/ShauryaVS-bit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubIcon />
                </IconButton>
                <Box>
                  <Typography variant="h6">GitHub</Typography>
                  <Link 
                    href="https://github.com/ShauryaVS-bit"
                    color="primary"
                    underline="hover"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/ShauryaVS-bit
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
} 