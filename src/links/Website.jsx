const Website = ({ website }) => {
  const handleWebsiteClick = () => {
    window.open = (`https://${website}`);
  };

  return (
    <div>
			<a href="#" onClick={handleWebsiteClick}>{website}</a>
		</div>
  )
}

export default Website