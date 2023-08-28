const PhoneNumber = ({ number }) => {
  const handlePhoneNumberClick = () => {
    window.location.href = `tel:${number}`;
  };

  return (
    <div>
			<a href={`tel:${number}`} onClick={handlePhoneNumberClick}>{number}</a>
		</div>
  )
}

export default PhoneNumber