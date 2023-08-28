import { useState } from "react"
import servicomService from "../services/servicom";
import { CheckCircle } from "@mui/icons-material";

// const states = [
//   'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 
//   'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 
//   'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'FCT (Abuja)'
// ];

// const lgasByState = {
//   Abia: ['Aba North', 'Aba South', 'Umuahia North', 'Umuahia South'],
//   Adamawa: ['Demsa', 'Fufore', 'Ganye', 'Girei'],
// };
 
// const wardsByLGA = {
//   'Aba North': ['Aba Central', 'Aba East', 'Aba North'],
//   'Aba South': ['Asa', 'Atani', 'Obuda'],
//   'Umuahia North': ['Amaise', 'Mgboko', 'Ubakala'],
//   'Umuahia South': ['Ahiaeke', 'Ubakala', 'Umuosi'],
// };

const ModalComment = ({ agencyId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [complaint, setComplaint] = useState([]);
  
  // const closeModal = () => {
  //   setIsOpen(false);
  // }

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  // const [selectedState, setSelectedState] = useState('');
  // const [selectedLGA, setSelectedLGA] = useState('');
  // const [selectedWard, setSelectedWard] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phoneNumber':
        setPhoneNumber(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'comment':
        setComment(value);
        break;
      case 'rating':
        setRating(parseInt(value, 10));
        break;
      default:
        break;
    }
  };

  // const handleStateChange = (event) => {
  //   setSelectedState(event.target.value);
    // setSelectedLGA('');
    // setSelectedWard('');
  // };

  // const handleLGAChange = (event) => {
  //   setSelectedLGA(event.target.value);
  //   setSelectedWard('');
  // };

  // const handleWardChange = (event) => {
  //   setSelectedWard(event.target.value);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newObject = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      agencyId: agencyId,
      comment: comment,
      rating: rating
    };

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    try {
      const returnedComplaint = await servicomService.create(newObject, { headers });
      setComplaint([...complaint, returnedComplaint]);

      setName("");
      setPhoneNumber("");
      setEmail("");
      setComment("");
      setRating();
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="modal--complaints">
      <h3>Comments</h3>
      <div className="modal--complaints--button">
        <button onClick={() => setIsOpen(!isOpen)}>MAKE A COMMENT</button>
      </div>
      {isOpen && (
        <div className="modal-container">
          <div className="modal">
            {isSubmitted ? (
              // Show the "thank you" message and a green checkmark
              <div className="submission--thank--you">
                <CheckCircle style={{ color: 'green', fontSize: 48 }}/>
                <div>Thank you for submitting!</div>
              </div>
            ) : (
              <>
                <p>Comment form</p>
                <form className="comment--input" onSubmit={handleSubmit}>
                  <input
                    className="form-input"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
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
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                  />
                  <textarea
                    className="form-textarea"
                    name="comment"
                    value={comment}
                    onChange={handleInputChange}
                    placeholder="Comment"
                  />
                  <select
                    className="form-select"
                    name="rating"
                    value={rating}
                    onChange={handleInputChange}
                  >
                    <option value="0">Make Agency Rating</option>
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                  {/* <select
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
                  </select> */}
                  {/* <select
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
                  </select> */}
                  <button type="submit" className="form--button">SUBMIT</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalComment;