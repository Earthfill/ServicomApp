import { useEffect, useState } from "react"
import servicomService from '../services/servicom'
import RatedStar from "../components/RatedStar"
// import StarRating from "../components/StarRating"
import ModalComplaint from "../modals/ModalComplaint"
import Address from "../links/Address"
import PhoneNumber from "../links/PhoneNumber"
import Website from "../links/Website"
import { Language, LocationOn, Phone } from "@mui/icons-material"
import { useParams } from "react-router-dom"

const About = () => {
  const [agency, setAgency] = useState([]);
  const [error, setError] = useState(false);
  const params = useParams();
  const {uniqueGuid} = params;

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

  return (
    <div>
      <div className='about'>
        <div className="about--profile">
          <img src={agency.logoUrl} alt="" className="about--image" />
          <div className="verification--icon">
            {!agency.isHeadquarters && (
              <span className="stamp--licensed">Headquarters</span>
            )}
            {agency.isHeadquarters && (
              <span className="stamp--unlicensed">Outlet</span>
            )}
          </div>
        </div>
        <h4 className="about--agency"><div>{agency.name}</div> {agency.outlet === null && <div>[{agency.state}]</div>}</h4>
        <div className='about--info'>
         <span className='about--top--rating'><RatedStar rating={agency.rating}/></span>
         <span className='about--top--rating'>{agency.rating  > 1.0 ? agency.rating.toFixed(1) : '0.0'}</span>
        </div>
        <hr />
        <div className='about--about'>
          <h3>About</h3>
          <p className='about--text--info'>{agency.about}</p>
        </div>
        <hr />
        <div className='about--details'>
          <div>
            <LocationOn style={{ color: 'red' }} fontSize="small" />
            <div className='address'><Address address={agency.address}/></div>
          </div>
          <div>
            <Phone color="success" fontSize="small" />
            <div className='telephone'><PhoneNumber number={agency.phoneNumber}/></div>
          </div>
          <div>
            <Language color="primary" />
            <div className='website'><Website website={agency.websiteUrl}/></div>
          </div>
        </div>
        <hr />
        <ModalComplaint agencyId={agency.id} />
      </div>
    </div>
  )
}

export default About