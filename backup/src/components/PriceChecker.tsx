import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Autocomplete,
  CircularProgress,
  Alert,
} from '@mui/material';
import { supabase } from '../lib/supabase';

interface PriceData {
  location: string;
  item: string;
  price: number;
}

export default function PriceChecker() {
  const [location, setLocation] = useState('');
  const [item, setItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [loadingItems, setLoadingItems] = useState(false);

  // Function to fetch locations based on search input
  const fetchLocations = async (searchText: string) => {
    if (!searchText || searchText.length < 2) {
      setLocations([]);
      return;
    }

    try {
      setLoadingLocations(true);
      const { data, error } = await supabase
        .from('prices')
        .select('location')
        .ilike('location', `%${searchText}%`)
        .order('location')
        .limit(10);

      if (error) throw error;

      const uniqueLocations = [...new Set(data.map(row => row.location))];
      setLocations(uniqueLocations);
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch locations');
      setLocations([]);
    } finally {
      setLoadingLocations(false);
    }
  };

  // Function to fetch items based on search input
  const fetchItems = async (searchText: string) => {
    if (!searchText || searchText.length < 2) {
      setItems([]);
      return;
    }

    try {
      setLoadingItems(true);
      const { data, error } = await supabase
        .from('prices')
        .select('item')
        .ilike('item', `%${searchText}%`)
        .order('item')
        .limit(10);

      if (error) throw error;

      const uniqueItems = [...new Set(data.map(row => row.item))];
      setItems(uniqueItems);
    } catch (err) {
      console.error('Error fetching items:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch items');
      setItems([]);
    } finally {
      setLoadingItems(false);
    }
  };

  const handleCheckPrice = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('prices')
        .select('*')
        .eq('location', location)
        .eq('item', item)
        .single();

      if (error) throw error;

      if (data) {
        setPriceData(data);
      } else {
        setError('No price data found for this location and item');
      }
    } catch (err) {
      console.error('Error checking price:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 1600, mx: 'auto', mt: 4, p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h3" gutterBottom sx={{ mb: 4 }}>
            Price Checker
            <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
              Check the price of an item or service in a specific location
            </Typography>
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 3,
            maxWidth: '100%',
            width: '100%'
          }}>
            <Box sx={{ flex: 2, minWidth: 0 }}>
              <Autocomplete
                value={location}
                onChange={(_, newValue) => setLocation(newValue || '')}
                onInputChange={(_, newInputValue) => {
                  fetchLocations(newInputValue);
                }}
                options={locations}
                loading={loadingLocations}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location"
                    fullWidth
                    size="medium"
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        height: '56px',
                        width: '100%'
                      } 
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingLocations ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ flex: 2, minWidth: 0 }}>
              <Autocomplete
                value={item}
                onChange={(_, newValue) => setItem(newValue || '')}
                onInputChange={(_, newInputValue) => {
                  fetchItems(newInputValue);
                }}
                options={items}
                loading={loadingItems}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Item/Service"
                    fullWidth
                    size="medium"
                    sx={{ 
                      '& .MuiOutlinedInput-root': { 
                        height: '56px',
                        width: '100%'
                      } 
                    }}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <>
                          {loadingItems ? <CircularProgress color="inherit" size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={handleCheckPrice}
            disabled={!location || !item || loading}
            fullWidth
            sx={{ 
              py: 2, 
              mt: 3,
              height: '56px',
              backgroundColor: '#2E6F40',
              '&:hover': {
                backgroundColor: '#1e4f30'
              }
            }}
            size="large"
          >
            {loading ? <CircularProgress size={24} /> : 'Check Price'}
          </Button>

          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}

          {priceData && (
            <Alert severity="success" sx={{ mt: 3 }}>
              Price in {priceData.location}: ${priceData.price.toFixed(2)}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
} 