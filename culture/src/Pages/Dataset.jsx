
import { useState, useEffect } from 'react';
import Data from '../components/csv/data.csv';
import Papa from 'papaparse';


function App() {

  const [data, setData] = useState([]);

  // parse CSV data & store it in the component state

  // const handleFileUpload = (e) => {
  //   const file = e.target.files[0];
  //   Papa.parse(file, {
  //     header: true,
  //     complete: (results) => {
  //       setData(results.data);
  //     },
  //   });
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, { 
        header: true, 
        skipEmptyLines: true 
      }).data;
      setData(parsedData);
    };
    fetchData();
  }, []);

  return (
    <div className="text-center mt-14 px-10 py-4">

      {/* <input type="file" accept=".csv" onChange={handleFileUpload} /> */}

      {data.length ? (
        <table className="table border-collapse border border-slate-500 ">
          <thead>
            <tr className='bg-slate-200 '>
              <th className='border border-slate-600 px-20 py-4'>State</th>
              <th className='border border-slate-600 px-6'>Year</th>
              <th className='border border-slate-600 '>Festivals</th>
              <th className='border border-slate-600 px-6 '>Amount_Sanctioned</th>
              <th className='border border-slate-600 px-6'>Amount_Released</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td className='border border-slate-700 py-3'>{row.State}</td>
                <td className='border border-slate-700'>{row.Year}</td>
                <td className='border border-slate-700'>{row.Festivals}</td>
                <td className='border border-slate-700'>{row.Amount_Sanctioned}</td>
                <td className='border border-slate-700'>{row.Amount_Released}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

    </div>
  );
}

export default App;
