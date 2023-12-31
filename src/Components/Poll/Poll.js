import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CircularProgress, FormControl, MenuItem, Pagination, Select, Snackbar, TextField } from '@mui/material';
import { useDebounce } from "use-lodash-debounce";
import PollElement from './pollElement';

const Poll = () => {  
    const pageSize = 10;
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
            setErrMsg('An error occurred while get polls.');
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
        <div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20}}>
            <FormControl sx={{ marginRight: 10 }} size = 'small'> 
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
                <MenuItem value="description">Description</MenuItem>
              </Select>
            </FormControl>
            <TextField 
              label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size = 'small'
              
            />
          </div>
          {polls.length > 0 ? (
            polls.map((poll) => (
              <PollElement key={poll.id} poll={poll} />
            ))
          ) : (
            <p style={{textAlign: 'center'}}>No polls to show.</p>
          )}
            
            <Snackbar
            open={!!errMsg}
            autoHideDuration={3000}
            onClose={() => {setErrMsg("")}}
            message={errMsg}
            />
            
            {polls.length > 0 ? (
           <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
           <Pagination count={Math.ceil(totalPages / pageSize)} page={currentPage} onChange={handlePageChange} />
         </div>
          ) : (
            <></>
          )}
            {loading && <CircularProgress
            sx={{ position:"absolute", top :"50%", left:"50%", transform:"translate(-50%,-50%)"}} />
            }
        </div>
    );
}

export default Poll;
