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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { supabase } from '../lib/supabase';

// Currency conversion rates (example rates, you might want to fetch these from an API)
const CURRENCY_RATES: { [key: string]: number } = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 151.62,
  INR: 83.12,
  AUD: 1.52,
  CAD: 1.35,
  CHF: 0.90,
  CNY: 7.23,
  SGD: 1.35,
};

const CURRENCIES = Object.keys(CURRENCY_RATES);

export default function ContributeForm() {
  const [location, setLocation] = useState('');
  const [item, setItem] = useState('');
  const [price, setPrice] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const convertToUSD = (price: number, fromCurrency: string): number => {
    return price / CURRENCY_RATES[fromCurrency];
  };

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

      // Convert the price to USD before saving to database
      const priceInUSD = convertToUSD(priceNumber, selectedCurrency);

      const { error } = await supabase
        .from('prices')
        .insert([
          {
            location: location.trim(),
            item: item.trim(),
            price: priceInUSD,
          },
        ]);

      if (error) throw error;

      setSuccess(true);
      // Clear form
      setLocation('');
      setItem('');
      setPrice('');
      setSelectedCurrency('USD');
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
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
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    label="Currency"
                    size="medium"
                  >
                    {CURRENCIES.map((currency) => (
                      <MenuItem key={currency} value={currency}>
                        {currency}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={`Price (in ${selectedCurrency})`}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  type="number"
                  inputProps={{ step: "0.01", min: "0" }}
                  placeholder={`e.g., 4.99 ${selectedCurrency}`}
                  size="medium"
                />
              </Grid>
              <Grid item xs={12}>
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