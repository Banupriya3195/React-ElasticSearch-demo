
import { Autocomplete, InputAdornment, MenuItem, Paper, Select, TextField } from "@mui/material";
import "./Template.scss"
import {useState,useEffect, useCallback} from 'react'
import AxiosApi from "../Api/AxiosApi";

import { DataGrid } from "@mui/x-data-grid/DataGrid";

import SearchIcon from '@mui/icons-material/Search';
import { CmplColumn } from "../Components/TableCmpl";
import  { SelectChangeEvent } from '@mui/material/Select';


const CMPL = () => {
  interface cmplInterface{
    id:number;
    sno:number;
    legacy:string;
    legacy2:string;
    materialcode:string;
    itemcode:string;
    noun:string;
    value:string;
    characteristic:string;
    longdesc:string;
    uom:string;
    shortdesc:string;
    modifier:string;
    shortSquence:number;
    squence:number;

}

const [pageSize,setPageSize]=useState<number>(10);
const [ApiData,setApiData]=useState<cmplInterface[]>([]);
const [ApiSearchData,setSearchApiData]=useState<cmplInterface[]>([]);
const [SearchVal, setSearchVal] = useState('materialcode');

    const handleChange = (event: SelectChangeEvent) => {
        setSearchVal(event.target.value as string);
    };
    const getAllTemplate=async()=>{
      try{
        const response:any= await AxiosApi.get(`user/users`)
        const data=await response?.data;
        console.log(data)
        setApiData(data)
      }catch(e){
        console.log(e)
      }
    }
useEffect(()=>{
  
  getAllTemplate()
},[])
const ApiHandlerSrc=useCallback(async(e:any)=>{
    e.preventDefault()
    if(e.target.value === ''){
      getAllTemplate()
   }
    const letter=e.target.value
    try{
        const response:any= await AxiosApi.get(`user/search?keyword=${letter}`
        )
        const data=await response?.data;
        setSearchApiData(data)
        console.log(data)
        console.log(response)
    }catch(e){
        console.log(e)
    }
  

},[])
const handlerKeyPress=(e:any)=>{
  e.preventDefault();
  /* console.log(e.keyCode) */
  console.log(e.key)
  if (ApiSearchData && e.keyCode === 13){
      setApiData(ApiSearchData)
  }
}


  return (
    <main>
      <div className="topView">
      <p>CMPL Table</p>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={SearchVal}
          label="search"
          onChange={handleChange}
          size='small'
         
        >
          <MenuItem value={'noun'}>Noun</MenuItem>
          <MenuItem value={'materialcode'}>Materialcode</MenuItem>
       
        </Select>
      <Autocomplete
            freeSolo
            disableClearable
            sx={{ width: "12rem" }}
            onKeyUp={handlerKeyPress}
            options={Array.isArray(ApiSearchData) ? ApiSearchData?.map((option: any) => SearchVal==='materialcode'?option.materialcode:option.legacy):[]}
            renderInput={(params) => (
              <TextField
                {...params}
                id="SearchTextBox"
                margin="dense"
                onChange={ApiHandlerSrc}
                placeholder="Search here"
                size="small"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: "1.4rem", color: "black" }} />
                    </InputAdornment>
                  ),
                  type: "search",
                }}
              />
            )}
            />
      {/* <TextField id="SourceSearch" sx={{width:'10rem'}}  onChange={ApiHandlerSrc} placeholder="Search Here..." InputProps={{
        startAdornment:(
          <InputAdornment position='start'>
              <SearchIcon sx={{fontSize:'1.4rem',color:'black'}} />
          </InputAdornment>
        )
      }}/> */}
      </div>
        
        <Paper sx={{width:"95vw",height:'30rem' ,overflow:'scroll',margin:0,padding:0}}>
         {ApiData.length <= 0 ? <h1 >Search Above Textbox To get data</h1>:
         <DataGrid 
         className="datagrid"   
         rows={ApiData}
         columns={CmplColumn}
         pageSize={pageSize}
         rowsPerPageOptions={[10, 25, 100]}
         onPageSizeChange={(newPageSize)=>setPageSize(newPageSize)}
         autoHeight
         sx={{
          fontSize:'12px',
          "& .MuiDataGrid-main": {
            // remove overflow hidden overwise sticky does not work
            overflow: "unset"
          },
          "& .MuiDataGrid-columnHeaders": {
            position: "sticky",
            backgroundColor:'white',
            zIndex:'10'
          },
          "& .MuiDataGrid-virtualScroller": {
            // remove the space left for the header
            marginTop: "0!important"
          }
          
         }}
         pagination
         />
         }
       
       </Paper>
       
        </main>
  )
}

export default CMPL

