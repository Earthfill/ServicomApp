const RatedStar = ({ rating }) => {
  const stars = [];
  
  for (let i = 0; i < 5; i++) {
    stars.push(<span key={i} className={i < Math.floor(rating) ? 'filled' : 'empty'}>★</span>);
  }
  return (
    <div>{stars}</div>
  )
}

export default RatedStar