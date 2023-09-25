

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

const ModalComment = ({ agencyId, agencyName }) => {
  const [isOpen, setIsOpen] = useState  (false);
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
    setIsOpen(!isOpen)
  };
  
  return (
    <div className="modal--complaints">
      <h3>Rate and Review</h3>
      <div className="star">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div
            key={rating}
            className={`${rating <= selectedRating ? 'filled' : 'empty'}`}
            onClick={() => handleRatingClick(rating)}
            >
            {rating <= selectedRating ? <Star /> : <StarBorder />}
          </div>
        ))}
      </div>
      {isOpen && (<Feedback agencyId={agencyId} agencyName={agencyName} />)}
    </div>
  )
}

export default ModalComment;