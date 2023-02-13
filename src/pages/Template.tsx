
import { Autocomplete, InputAdornment, Paper, TextField } from "@mui/material";
import "./Template.scss"
import {useState,useEffect, useCallback} from 'react'
import AxiosApi from "../Api/AxiosApi";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { TemplateColumn } from "../Components/TableTemplate";
import SearchIcon from '@mui/icons-material/Search';


const Template = () => {
  interface tempInterface{
    id:number;
    sno:number;
    abbreviation:string;
    attribute:string;
    modifier:string;
    noun:string;
    mandatory:boolean;
    shortSequence:number;

}
const [SearchVal, setSearchVal] = useState('abbreviation');
const [pageSize,setPageSize]=useState<number>(10);
const [ApiData,setApiData]=useState<tempInterface[]>([]);
const [ApiSearchData,setSearchApiData]=useState<tempInterface[]>([]);
const getAllTemplate=async()=>{
  try{
    const response:any= await AxiosApi.get(`temp/getALl`)
    const data=await response?.data;
    console.log(data)
    setApiData(data)
  }catch(e){
    console.log(e)
  }
}
const handleChange = (event: SelectChangeEvent) => {
  setSearchVal(event.target.value as string);
};
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
        const response:any= await AxiosApi.get(`temp/search?keyword=${letter}`
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
      <p>Template Table</p>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={SearchVal}
          label="search"
          onChange={handleChange}
          size='small'
         
        >
          <MenuItem value={'abbreviation'}>Abbreviation</MenuItem>
          <MenuItem value={'attribute'}>Attribute</MenuItem>
         {/*  <MenuItem value={'noun'}>Noun</MenuItem> */}
       
        </Select>
      <Autocomplete
            freeSolo
            disableClearable
            sx={{ width: "12rem" }}
            options={Array.isArray(ApiSearchData) ? ApiSearchData?.map((option: any) => SearchVal ==='abbreviation'?option.abbreviation:option.attribute):[]}
            renderInput={(params) => (
              <TextField
                {...params}
                id="SearchTextBox"
                margin="dense"
                onChange={ApiHandlerSrc}
                placeholder="Search here"
                onKeyUp={handlerKeyPress}
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
         columns={TemplateColumn}
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

export default Template

