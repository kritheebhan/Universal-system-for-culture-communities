import React, { useState } from 'react';
import Papa from 'papaparse';

import dataCSV from '../components/csv/data.csv'; // Import the CSV file

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    // Assuming your CSV file is named 'data.csv', adjust the path as needed
    Papa.parse(dataCSV, {
      download: true,
      header: true,
      complete: function(results) {
        console.log('Parsed CSV Data:', results.data); // Log parsed data
        const searchData = results.data;
        const filteredResults = searchData.filter(row => {
          // Assuming 'State' is the column header for the state names
          return row.State.toLowerCase().includes(searchTerm.toLowerCase());
        });
        console.log('Search Results:', filteredResults); // Log search results
        setSearchResults(filteredResults);
      },
      error: function(error) {
        console.error('Error parsing CSV:', error); // Log parsing error
      }
    });
  };
  
  

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  
    // Filter suggestions based on the input value
    const filteredSuggestions = searchResults
      .filter(result => {
        // Check if the result is an array and has the expected data structure
        return Array.isArray(result) && result.length > 0 && typeof result[0] === 'string' && result[0].toLowerCase().includes(value.toLowerCase());
      })
      .map(result => result[0]);
    setSuggestions(filteredSuggestions);
  };
  

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  return (
    <div className='mt-24'>
      <div className="flex justify-center ">
        <input
          type="text"
          placeholder="Search..."
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-full"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {/* Display suggestions */}
      <div>
        {suggestions.map((suggestion, index) => (
          <div key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </div>
        ))}
      </div>

{/* Display search results */}

      <div className="flex justify-center text-center mt-14 px-10 py-4">
      <table className="table border-collapse border border-slate-500 ">
  <thead>
    <tr>
      <th className='border border-slate-600 px-20 py-4'>State</th>
      <th className='border border-slate-600 px-6'>Year</th>
      <th className='border border-slate-600 px-8'>Festivals</th>
      <th  className='border border-slate-600 px-6 '>Amount Sanctioned</th>
      <th className='border border-slate-600 px-6'>Amount Released</th>
    </tr>
  </thead>
  <tbody>
    {searchResults.map((result, index) => (
      <tr key={index}>
        <td className='border border-slate-700 py-3'>{result.State}</td>
        <td className='border border-slate-700 py-3'>{result.Year}</td>
        <td className='border border-slate-700 py-3'>{result.Festivals}</td>
        <td className='border border-slate-700 py-3'>{result.Amount_Sanctioned}</td>
        <td className='border border-slate-700 py-3'>{result.Amount_Released}</td>
      </tr>
    ))}
  </tbody>
</table>
      </div>
    </div>
  );
}

export default Search;
