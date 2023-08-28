const Address = ({ address }) => {
  const handleAddressClick = () => {
    window.open(`https://maps.google.com/maps?q=${address}`);
  };
	
  return (
    <div>
			<a href="#" onClick={handleAddressClick}>{address}</a>
    </div>
  )
}

export default Address