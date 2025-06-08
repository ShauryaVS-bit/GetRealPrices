import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';

export default function About() {
  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4, p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#2E6F40' }}>
            About Get Real Prices
          </Typography>

          <Typography variant="body1" paragraph>
            Get Real Prices is a community-driven platform that aims to provide accurate, up-to-date price information for everyday items and services across different locations. Our mission is to help people make informed decisions about their purchases by understanding the real cost of living in different areas.
          </Typography>

          <Typography variant="body1" paragraph>
            In today's globalized world, prices can vary significantly from one location to another. Whether you're planning a move, traveling, or just curious about cost differences, Get Real Prices helps you understand the actual costs you might encounter.
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 4, color: '#2E6F40' }}>
            What We Offer
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, mb: 4 }}>
            <Box sx={{ flex: 1 }}>
              <Card sx={{ height: '100%', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Real-Time Price Data
                  </Typography>
                  <Typography variant="body2">
                    Access current prices for various items and services, contributed by our community members from around the world.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Card sx={{ height: '100%', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Global Coverage
                  </Typography>
                  <Typography variant="body2">
                    Compare prices across different cities, countries, and regions to understand cost variations worldwide.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Card sx={{ height: '100%', backgroundColor: '#f5f5f5' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Community Driven
                  </Typography>
                  <Typography variant="body2">
                    Our platform grows through user contributions, ensuring diverse and comprehensive price data.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h4" gutterBottom sx={{ mb: 4, color: '#2E6F40' }}>
            About Me
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
            <Box>
              <Typography variant="h6" gutterBottom>
                Shaurya Veer Singh
              </Typography>
              <Typography variant="body1" paragraph>
                As a first-year Computer Science major, I'm passionate about creating solutions that make a real difference in people's lives. Get Real Prices is my attempt to solve a common problem I noticed: the lack of reliable, up-to-date price information across different locations.
              </Typography>
              <Typography variant="body1" paragraph>
                I'm an enthusiastic creator and builder, always looking for opportunities to apply my technical skills to real-world problems. This project combines my interest in technology with my desire to create something useful for the community.
              </Typography>
              <Typography variant="body1">
                Through Get Real Prices, I hope to build a platform that helps people make better-informed decisions about their purchases and understand the real cost of living in different parts of the world.
              </Typography>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
            Get Real Prices is continuously evolving. Your feedback and contributions help make this platform better for everyone.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
} 