import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

const onChange = (e) => {
  console.log('file: ', e.target.files)
}


function App() {
  return (
    <div className="App">
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={onChange}/>
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>
    </div>
  );
}

export default App;
