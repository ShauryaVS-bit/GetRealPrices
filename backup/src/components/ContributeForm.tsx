import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import { supabase } from '../lib/supabase';

export default function ContributeForm() {
  const [location, setLocation] = useState('');
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location || !item || !price) {
      setError('Please fill in all fields');
      return;
    }

    const priceNumber = parseFloat(price);
    if (isNaN(priceNumber) || priceNumber <= 0) {
      setError('Please enter a valid price');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const { error } = await supabase
        .from('prices')
        .insert([
          {
            location: location.trim(),
            item: item.trim(),
            price: priceNumber,
          },
        ]);

      if (error) throw error;

      setSuccess(true);
      // Clear form
      setLocation('');
      setItem('');
      setPrice('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Contribute Price Data
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Help us expand our database by adding prices from your location
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  placeholder="e.g., New York, Los Angeles"
                  size="medium"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Item/Service"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  required
                  placeholder="e.g., Coffee, Movie Ticket"
                  size="medium"
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  type="number"
                  inputProps={{ step: "0.01", min: "0" }}
                  placeholder="e.g., 4.99"
                  size="medium"
                />
              </Grid>
              <Grid xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 2 }}
                  size="large"
                >
                  {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Thank you for your contribution! The data has been added successfully.
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
} 