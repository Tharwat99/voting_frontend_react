import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, FormControl, MenuItem, Pagination, Select, Snackbar, TextField } from '@mui/material';
import { useDebounce } from "use-lodash-debounce";
import PollElement from './pollElement';

const Poll = () => {  
    const [loading, setLoading] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [polls, setPolls] = useState([]);  
    const [searchQuery, setSearchQuery] = useState('');
    const [searchField, setSearchField] = useState('title');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const debouncedSearch = useDebounce(searchQuery, 800);
    
      const getPolls = async (page) => {
        setLoading(true)
        try {
            const response = await axios.get(`http://127.0.0.1:8000/poll/list-polls-pages/?page=${page}&${searchField}=${searchQuery}`);
            setCurrentPage(page);
            setPolls(response.data.results)
            setTotalPages(response.data.count);
          } catch (error) {
            setErrMsg('An error occurred while editing employee.');
        }
        setLoading(false)
      }
      useEffect(() => {
        getPolls(1)
      }, [debouncedSearch]);

      const handlePageChange = (event, value) => {
        getPolls(value)
      };
    return (
        <div >
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
            <FormControl sx={{ marginRight: 10 }}>
              <Select
                value={searchField}
                onChange={(e) => {
                  setSearchField(e.target.value);
                  setSearchQuery('');
                }}
                displayEmpty
              >
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="choice_text">Choice</MenuItem>
              </Select>
            </FormControl>
          <TextField
            label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ marginRight: 10 }}
          />
         </div>
            {polls.map((poll) => (
              <PollElement key={poll.id} poll={poll} />
            ))}
            <Snackbar
            open={!!errMsg}
            autoHideDuration={3000}
            onClose={() => {setErrMsg("")}}
            message={errMsg}
            />
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
              <Pagination count={Math.ceil(totalPages / 2)} page={currentPage} onChange={handlePageChange} />
            </div>
            {loading && <CircularProgress
            sx={{ position:"absolute", top :"50%", left:"50%", transform:"translate(-50%,-50%)"}} />
            }
        </div>
    );
}

export default Poll;
