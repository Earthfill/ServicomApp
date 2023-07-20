import { useState } from "react"

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

const ModalComplaint = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // const closeModal = () => {
  //   setIsOpen(false);
  // }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [complaint, setComplaint] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedState, setSelectedState] = useState('');
  const [selectedLGA, setSelectedLGA] = useState('');
  const [selectedWard, setSelectedWard] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'complaint':
        setComplaint(value);
        break;
      case 'rating':
        setRating(parseInt(value));
        break;
      default:
        break;
    }
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    setSelectedLGA('');
    setSelectedWard('');
  };

  const handleLGAChange = (event) => {
    setSelectedLGA(event.target.value);
    setSelectedWard('');
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary form submission actions here

    // For this example, we'll just display the "thank you" message and set isSubmitted to true
    setIsSubmitted(true);
  };

  return (
    <div className="modal--complaints">
      <h3>Complaints</h3>
      <div className="modal--complaints--button">
        <button onClick={() => setIsOpen(!isOpen)}>MAKE A COMPLAINT</button>
      </div>
      {isOpen && (
        <div className="modal-container">
          <div className="modal">
            {isSubmitted ? (
              // Show the "thank you" message and a green checkmark
              <div className="submission-thank-you">
                <span role="img" aria-label="Checkmark">
                  &#9989;
                </span>{" "}
                Thank you for submitting!
              </div>
            ) : (
              <>
                <p>Complaint form</p>
                <form className="complaint--input" onSubmit={handleSubmit}>
                  <input
                    className="form-input"
                    name="firstName"
                    value={firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                  />
                  <input
                    className="form-input"
                    name="lastName"
                    value={lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                  />
                  <input
                    className="form-input"
                    type="tel"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                  />
                  <input
                    className="form-input"
                    type="date"
                    name="date"
                    value={date}
                    onChange={handleInputChange}
                    placeholder="Date"
                  />
                  <textarea
                    className="form-textarea"
                    name="complaint"
                    value={complaint}
                    onChange={handleInputChange}
                    placeholder="Complaint"
                  />
                  <select
                    className="form-select"
                    name="rating"
                    value={rating}
                    onChange={handleInputChange}
                  >
                    <option value="0">Select Rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                  <select
                    className="form-select"
                    name="state"
                    value={selectedState}
                    onChange={handleStateChange}
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                  <select
                    className="form-select"
                    name="lga"
                    value={selectedLGA}
                    onChange={handleLGAChange}
                    disabled={!selectedState}
                  >
                    <option value="">Select LGA</option>
                    {selectedState &&
                      lgasByState[selectedState].map((lga) => (
                        <option key={lga} value={lga}>
                          {lga}
                        </option>
                      ))}
                  </select>
                  <select
                    className="form-select"
                    name="ward"
                    value={selectedWard}
                    onChange={handleWardChange}
                    disabled={!selectedLGA}
                  >
                    <option value="">Select Ward</option>
                    {selectedLGA &&
                      wardsByLGA[selectedLGA].map((ward) => (
                        <option key={ward} value={ward}>
                          {ward}
                        </option>
                      ))}
                  </select>
                  <button className="form-button">SUBMIT</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalComplaint