import { useEffect, useState } from "react"
import servicomService from "../services/servicom";
import { ArrowBack, CheckCircle, Star, StarBorder } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Feedback = ({ agencyId, agencyName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [complaint, setComplaint] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState("");
  const [body, setBody] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);

  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setIsOpen(!isOpen)
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

  return (
    <div className="modal-container">
      <div className="modal">
        {isSubmitted ? (
          <div className="submission--thank--you">
            <CheckCircle style={{ color: 'green', fontSize: 48 }}/>
            <div>Thank you for submitting!</div>
          </div>
        ) : (
          <div className="form--label">
            <div className="form--back">
              <span><ArrowBack /></span>
              <span className="form--title">Feedback</span>
            </div>
            <form className="body--input" onSubmit={handleSubmit}>
              <div className="rating--label">Rate your experience</div>
              <div className="star">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div
                  key={rating}
                    className={`${rating <= selectedRating ? 'filled' : 'empty'}`}
                    onClick={() => handleRatingClick(rating)}
                    >
                    {rating <= selectedRating ? <Star className="star--star"/> : <StarBorder />}
                  </div>
                ))}
              </div>
              <hr className="feedback--line"/>
              <div>
                <div className='modal--form--header'>Add Tags (optional)</div>
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
                        borderRadius: "10px"
                      }}
                    />
                  ))}
                </div>
              </div>
              <hr className="feedback--line"/>
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
                <textarea
                  type="text"
                  className="form-textarea"
                  name="body"
                  value={body}
                  onChange={handleInputChange}
                  placeholder={`Type details of your experience at ${agencyName}`}
                />
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
              <button type="submit" className="form--button">Send</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Feedback