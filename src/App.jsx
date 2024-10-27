import './App.css'; 
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

  

const App = () => {
  const [category, setCategory] = useState('trivia');
  const [number, setNumber] = useState('');
  const [random, setRandom] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = '';

    try {
      if (random) {
        url = `http://numbersapi.com/random/${category}`;
      } else {
        if (isNaN(number)) {
          throw new Error('The number must be in numeric form');
        }
        url = `http://numbersapi.com/${number}/${category}`;
      }

      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    }
  };

  const handleRandomChange = () => {
    setRandom(!random);
    setNumber(''); 
  };

  return (
    <div className="App">
      <h1>Random Fact Generator</h1>
      <form onSubmit={handleSubmit}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Random</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value="trivia">Random/Trivia</MenuItem>
              <MenuItem value="year">Random/Year</MenuItem>
              <MenuItem value="date">Random/Date</MenuItem>
              <MenuItem value="math">Random/Math</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ marginTop: 2 }}>
          <TextField
            label="Enter a number"
            variant="outlined"
            fullWidth
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            disabled={random}
          />
        </Box>

        <Box>
          <FormControlLabel
            control={<Checkbox checked={random} onChange={handleRandomChange} />}
            label="Generate a random fact"
          />
        </Box>

        <Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Magic
          </Button>
        </Box>
      </form>

      {error && (
        <p className='fact-error'>{error}</p>
      )}

      {data && (
        <div className='fact-container'>
          <h2>Generated Fact:</h2>
          <p className='fact-text'>{data}</p>
        </div>
      )}
    </div>
  );
};

export default App;
