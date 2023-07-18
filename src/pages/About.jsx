import RatedStar from "../components/RatedStar"
// import StarRating from "../components/StarRating"
import Address from "../links/Address"
import PhoneNumber from "../links/PhoneNumber"
import Website from "../links/Website"
import { Language, LocationOn, Phone } from "@mui/icons-material"
import ModalComplaint from "../modals/ModalComplaint"

const About = () => {
  return (
    <div>
      <div className='about'>
        <div className="about--profile">
          <img src='../assets/FMOH-logo-lg.jpg' alt="" className="about--image" />
        </div>
        <h4 className="about--agency">MINISTRY OF HEALTH</h4>
        <div className='about--info'>
         <span className='about--top--rating'>4.0</span>
         <span className='about--top--rating'><RatedStar rating={4.0}/></span>
        </div>
        <hr />
        <div className='about--about'>
          <h3>About</h3>
          <p className='about--text--info'>Lorem ipsum..</p>
        </div>
        <hr />
        <div className='about--details'>
          <div>
            <LocationOn style={{ color: 'red' }} fontSize="small" />
            <div className='address'><Address address={'Abuja'}/></div>
          </div>
          <div>
            <Phone color="success" fontSize="small" />
            <div className='telephone'><PhoneNumber number={'+234'}/></div>
          </div>
          <div>
            <Language color="primary" />
            <div className='website'><Website website={'www'}/></div>
          </div>
        </div>
        <hr />
        <ModalComplaint />
      </div>
    </div>
  )
}

export default About