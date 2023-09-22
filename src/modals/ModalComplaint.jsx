import { useEffect, useState } from "react"
import servicomService from "../services/servicom";
import { CheckCircle, Star, StarBorder } from "@mui/icons-material";
import { Chip } from "@mui/material";

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
  const [availableTags, setAvailableTags] = useState([]);
  
  // const closeModal = () => {
  //   setIsOpen(false);
  // }

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState("");
  const [body, setBody] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  // const [selectedState, setSelectedState] = useState('');
  // const [selectedLGA, setSelectedLGA] = useState('');
  // const [selectedWard, setSelectedWard] = useState('');

  const [selectedTags, setSelectedTags] = useState([]);
  const [showTags, setShowTags] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const toggleTagsVisibility = () => {
    setShowTags(!showTags);
  };

  const toggleFeedbacksVisibility = () => {
    setShowFeedback(!showFeedback);
  };

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
      case 'body':
        setBody(value);
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

  // const autoCloseSubmissionMessage = () => {
  //   setTimeout(() => {
  //     setIsSubmitted(false);
  //   }, 5000);
  // };


  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await servicomService.getTags();
        if (response.isSuccessful) {
          setAvailableTags(response.data);
        } else {
          console.error("Failed to fetch tags");
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchTags();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newObject = {
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      agencyId: agencyId,
      body: body,
      rating: selectedRating,
      tagIds: selectedTags.map((tag) => tag.id),
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
      setBody("");
      setSelectedRating();
      setSelectedTags([]);
      setIsSubmitted(true);

      setTimeout(() => {
        setIsSubmitted(false);
        setIsOpen(false);
      }, 5000);
      
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setName("");
    setPhoneNumber("");
    setEmail("");
    setBody("");
    setSelectedRating(0);
  };
  
  return (
    <div className="modal--complaints">
      <h3>Feedbacks</h3>
      <div className="modal--complaints--button">
        <button onClick={() => setIsOpen(!isOpen)}>POST A FEEDBACK</button>
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
              <div className="form--label">
                <p>Comment form</p>
                <form className="body--input" onSubmit={handleSubmit}>
                  <input
                    className="form-input"
                    name="name"
                    required
                    value={name}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                  />
                  <input
                    className="form-input"
                    type="tel"
                    required
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                  />
                  <input
                    className="form-input"
                    type="email"
                    required
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                  />
                  <div>
                    <button 
                      className='modal--form--header'
                      onClick={toggleTagsVisibility}  
                    >
                      Select Report Tag
                    </button>
                    {showTags && (
                      <div className="tag-chips">
                        {availableTags.map((tag) => (
                          <Chip
                            key={tag.id}
                            label={tag.name}
                            clickable
                            onClick={() => handleTagClick(tag)}
                            className={`reportedTagId ${
                              selectedTags.some((selectedTag) => selectedTag.id === tag.id)
                              ? "selected"
                              : ""
                            }`}
                            style={{
                              backgroundColor: selectedTags.includes(tag)
                                ? "lightgreen"
                                : "white",
                              color: selectedTags.includes(tag)
                                ? "green"
                                : "black",
                              margin: "5px",
                              border: selectedTags.includes(tag)
                                ? "1px solid green"
                                : "1px solid black",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <button 
                      className='modal--form--header'
                      onClick={toggleFeedbacksVisibility}
                    >
                      Type feedback
                    </button>
                    {showFeedback && (
                      <textarea
                        className="form-textarea"
                        name="body"
                        value={body}
                        onChange={handleInputChange}
                        placeholder="Feedback"
                      />
                    )}
                  </div>
                  <div className="rating">
                    <span className="rating-label">Rating:</span>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <span
                        key={rating}
                        className={`star ${rating <= selectedRating ? 'filled' : 'empty'}`}
                        onClick={() => handleRatingClick(rating)}
                      >
                        {rating <= selectedRating ? <Star /> : <StarBorder />}
                      </span>
                    ))}
                  </div>
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
                <div className="form--close">
                  <button className="form--close--button" onClick={closeModal}>&#10005;</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ModalComment;