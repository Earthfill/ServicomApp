const Website = ({ website }) => {
  const handleWebsiteClick = () => {
    window.open = (`https://${website}`);
  };

  return (
    <div>
			<a 
        href={`${website}`} 
        target="_blank" 
        onClick={handleWebsiteClick} 
        rel="noreferrer"
      >
        {website}
      </a>
		</div>
  )
}

export default Website