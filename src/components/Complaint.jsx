import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Grid } from '@mui/material';

const states = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  // ...the rest of the states
];

const lgasByState = {
  Abia: ['Aba North', 'Aba South', 'Umuahia North', 'Umuahia South', /* ... */],
  Adamawa: ['Demsa', 'Fufore', 'Ganye', 'Girei', /* ... */],
  // ...the rest of the LGAs by state
};

const wardsByLGA = {
  'Aba North': ['Aba Central', 'Aba East', 'Aba North'],
  'Aba South': ['Asa', 'Atani', 'Obuda'],
  'Umuahia North': ['Amaise', 'Mgboko', 'Ubakala'],
  'Umuahia South': ['Ahiaeke', 'Ubakala', 'Umuosi'],
  // ...the rest of the wards by LGA
};

const Complaint = () => {
  const [title, setTitle] = useState('');
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [lga, setLGA] = useState('');
  const [ward, setWard] = useState('');
  const [date, setDate] = useState('');
  const [complaint, setComplaint] = useState('');

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   console.log('Form submitted:', {
  //     title,
  //     fullName,
  //     gender,
  //     state,
  //     lga,
  //     ward,
  //     date,
  //     complaint,
  //   });
  // };

  return (
    <div className="complaint">
      <div className="complaint--agency">Ministry of Health</div>
      <div className="complaint--header">
        <div>Complaint form</div>
        <form className="complaint--input">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="title-label">Title</InputLabel>
                <Select
                  labelId="title-label"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  label="Title"
                  sx={{ '& .Mui-selected': { textAlign: 'left' } }} // Align selected MenuItem to the left
                >
                  <MenuItem value="Mr.">Mr.</MenuItem>
                  <MenuItem value="Mrs.">Mrs.</MenuItem>
                  <MenuItem value="Miss">Miss</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="full-name"
                label="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Prefer Not To Say">Prefer Not To Say</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="state-label">State Office</InputLabel>
                <Select
                  labelId="state-label"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  label="State Office"
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="lga-label">LGA</InputLabel>
                <Select
                  labelId="lga-label"
                  id="lga"
                  value={lga}
                  onChange={(e) => setLGA(e.target.value)}
                  label="LGA"
                >
                  {lgasByState[state] &&
                    lgasByState[state].map((lga) => (
                      <MenuItem key={lga} value={lga}>
                        {lga}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="ward-label">Ward</InputLabel>
                <Select
                  labelId="ward-label"
                  id="ward"
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  label="Ward"
                >
                  {wardsByLGA[lga] &&
                    wardsByLGA[lga].map((ward) => (
                      <MenuItem key={ward} value={ward}>
                        {ward}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="date"
                label="Pick a Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="complaint"
                label="Complaint"
                multiline
                rows={4}
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" className="complaint--button">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  )
}

export default Complaint