import { useEffect, useState } from "react"
import servicomService from '../services/servicom'
import RatedStar from "../components/RatedStar"
// import StarRating from "../components/StarRating"
import ReactLoading from "react-loading";
import Address from "../links/Address"
import PhoneNumber from "../links/PhoneNumber"
import Website from "../links/Website"
import { Language, LocationOn, Phone, Star, StarBorder } from "@mui/icons-material"
import { useNavigate, useParams } from "react-router-dom"

const About = () => {
  const [agency, setAgency] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const params = useParams();
  const {uniqueGuid} = params;
  const [selectedRating, setSelectedRating] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await servicomService.getByGuid(uniqueGuid);
        setAgency(result.data);
        setIsLoading(false);
        setTimeout(() => {
          setAgency(result.data)
          setIsLoading(true)
        }, 900)
      } catch (error) {
        setError(true);
        setIsLoading(true);
      }
    }
    
    fetchData();
  }, [uniqueGuid]);

  const handleRatingClick = (rating) => {
    setSelectedRating(rating);
  };

  const handleFeedbackClick = () => {
    navigate(`/feedback/${agency.uniqueGuid}`, {
      state: {
        agencyName: agency.name,
        agencyId: agency.id
      },
    });
  };

  if (!isLoading) {
    return (
      <div className='loading'>
        <ReactLoading
          type="bars"
          color="#288331" 
          height={100} 
          width={100}
          delay={5}
        />
      </div>
    )
  } else {

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
                <div
                  key={rating}
                  className={`${rating <= selectedRating ? 'fill' : 'blank'}`}
                  onClick={() => {
                    handleRatingClick(rating)
                    handleFeedbackClick()
                  }}
                >
                  {rating <= selectedRating ? <Star style={{ fontSize: '48px' }} /> : <StarBorder style={{ fontSize: '20px' }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About