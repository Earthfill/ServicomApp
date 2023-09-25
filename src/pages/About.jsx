import { useEffect, useState } from "react"
import servicomService from '../services/servicom'
import RatedStar from "../components/RatedStar"
// import StarRating from "../components/StarRating"
import Address from "../links/Address"
import PhoneNumber from "../links/PhoneNumber"
import Website from "../links/Website"
import { Language, LocationOn, Phone, Star, StarBorder } from "@mui/icons-material"
import { Link, useParams } from "react-router-dom"

const About = () => {
  const [agency, setAgency] = useState([]);
  const [error, setError] = useState(false);
  const params = useParams();
  const {uniqueGuid} = params;
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await servicomService.getByGuid(uniqueGuid);
        setAgency(result.data);
      } catch (error) {
        setError(true);
      }
    }
    
    fetchData();
  }, [uniqueGuid]);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <div>
      <div className='about'>
        <div className="about--profile">
          <img src={agency.logoUrl} alt="" className="about--image" />
        </div>
        <h4 className="about--agency"><div>{agency.name}</div> {agency.outlet === null && <div>[{agency.state}]</div>}</h4>
        <div className='about--info'>
         <span className='about--top--rating'><RatedStar rating={agency.rating}/></span>
         <span className='about--top--rating'>{agency.rating  > 1.0 ? agency.rating.toFixed(1) : '0.0'}</span>
          <img className='about--top--rating' src={agency.hqOutletStatus} alt="" />
        </div>
        <hr />
        <div className='about--about'>
          <h3>About</h3>
          <p className='about--text--info'>{agency.about}</p>
        </div>
        <hr />
        <div className='about--details'>
          <div className="about--address">
            <LocationOn style={{ color: 'red' }} fontSize="small" />
            <span className='address'><Address address={agency.address}/></span>
          </div>
          <div className="about--telephone">
            <Phone color="success" fontSize="small" />
            <div className='telephone'><PhoneNumber number={agency.phoneNumber}/></div>
          </div>
          <div className="about--website">
            <Language color="primary" />
            <div className='website'><Website website={agency.websiteUrl}/></div>
          </div>
        </div>
        <hr />
        <div className="">
          <h3>Rate and Review</h3>
          <div className="about--star">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Link
                to={`/feedback/${agency.id}`}
                key={rating}
                className={`${rating <= selectedRating ? 'filled' : 'empty'}`}
                onClick={() => handleRatingClick(rating)}
                >
                {rating <= selectedRating ? <Star /> : <StarBorder />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About