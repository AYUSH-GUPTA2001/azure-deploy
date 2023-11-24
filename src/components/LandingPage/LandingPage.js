
import './LandingPage.css'
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
export default function LandingPage(){
 
return(
    <>
  <header class="fixed-header">
        <div class="logo">
        <h1><a><span class="logo-text">INCvest</span><span class="dot">.</span></a></h1>
        </div>
        <nav>
            <ul>
            <li><a href="#hero">Home</a></li>
          <li><a href="#about">About Us</a></li>
          {/* <li><a href="#services">Services</a></li> */}
       
          <li><a href="#team">Team</a></li>
          {/* <li><a href="#contact">Contact</a></li> */}
        
          
          <li ><a href="./advisor">Advisor </a></li>
          <li><a href='./investor'>Investor </a></li>
            
          
          
            </ul>
        </nav>
    </header>
    
    <section id="hero" >
    <div class="container2" data-aos="zoom-out" data-aos-delay="100">
      <h1>Welcome to <span>INCvest</span></h1>
      <h2>Your Go to Website for Investments</h2>
      <div class="d-flex">
        <a href="#about" class="btn-get-started ">Get Started</a>
        <a href="https://youtu.be/tmryHfunyQ4?si=WpEubHRXrQZ4LrFy" target ="_blank" class="btn-watch-video"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>
      </div>
    </div>
  </section>

  <section id="about" class="about section-bg">
      <div class="container3" data-aos="fade-up">

        <div class="section-title">
          <h2>About</h2>
          <h3>What is <span>INCvest</span></h3>
          <p>Experience a variety of investment options on INCvest. You can invest in Stocks,Mutual Funds,SIPs and many more.</p>
        </div>
    </div>
    <div class="container4">
    <div class="box1"></div>
    <div class="box2 "><h3>Our Features</h3>
            <ul>
              <li>
               
                <div>
                  <h5>View real-time stock prices</h5>
                  <p>View the Biggest Gainers,Losers, Indices just a click away.</p>
                </div>
              </li>
              <li>
                
                <div>
                  <h5>Buy and sell</h5>
                  <p>Presenting Options such as transaction history, ability to withdraw funds and investment details.</p>
                </div>
              </li>
            </ul>
            </div>
</div>

    </section>

    <section id="team" class="team section-bg">
      

        <div class="section-title">
          <h2>Team</h2>
          <h3>Our<span> Team</span></h3>
        </div>
<div class='row1'>
    
     <div class="container6" data-aos="fade-up" data-aos-delay="100">
            <div class="member">
              <div class="member-img1">
                {/* <img src="./Priyanka Aggrawal.jpg" class="img-fluid" alt=""/> */}
               
              </div>
              <div class="member-info">
                <h4>Priyanka Aggarwal</h4>
                <span>Backend Developer</span>
              </div>
            </div>
          </div>
        
     <div class="container6" data-aos="fade-up" data-aos-delay="100">
            <div class="member">
              <div class="member-img2">
                {/* <img src="assets/img/team/Priyanka Aggrawal.jpg" class="img-fluid" alt=""/> */}
               
              </div>
              <div class="member-info">
                <h4>Amandeep Kumar</h4>
                <span>Frontend Developer</span>
              </div>
            </div>
          </div>
    
          <div class="container6" data-aos="fade-up" data-aos-delay="100">
            <div class="member">
              <div class="member-img3">
                {/* <img src="assets/img/team/Priyanka Aggrawal.jpg" class="img-fluid" alt=""/> */}
               
              </div>
              <div class="member-info">
              <h4>Tanmay Mahajan</h4>
                <span>Backend Developer</span>
              </div>
            </div>
          </div>


          <div class="container6" data-aos="fade-up" data-aos-delay="100">
            <div class="member">
              <div class="member-img4">
                {/* <img src="assets/img/team/Priyanka Aggrawal.jpg" class="img-fluid" alt=""/> */}
               
              </div>
              <div class="member-info">
              <h4>Ritika Agrawal</h4>
                <span>Backend Developer</span>
              </div>
            </div>
          </div>


</div>




<div class='row1'>
    
     <div class="container6" data-aos="fade-up" data-aos-delay="100">
            <div class="member">
              <div class="member-img5">
                {/* <img src="assets/img/team/Priyanka Aggrawal.jpg" class="img-fluid" alt=""/> */}
               
              </div>
              <div class="member-info">
              <h4>Ayush Gupta</h4>
                <span>DevOps Engineer</span>
              </div>
            </div>
          </div>
        
     <div class="container6" data-aos="fade-up" data-aos-delay="100">
            <div class="member">
              <div class="member-img6">
                {/* <img src="assets/img/team/Priyanka Aggrawal.jpg" class="img-fluid" alt=""/> */}
               
              </div>
              <div class="member-info">
              <h4>Sahil Malpotra</h4>
                <span>DevOps Engineer</span>
              </div>
            </div>
          </div>
    
          <div class="container6" data-aos="fade-up" data-aos-delay="100">
            <div class="member">
              <div class="member-img7">
                {/* <img src="assets/img/team/Priyanka Aggrawal.jpg" class="img-fluid" alt=""/> */}
               
              </div>
              <div class="member-info">
              <h4>Vikash Kumar</h4>
                <span>Backend Developer</span>
              </div>
            </div>
          </div>


          <div class="container6" data-aos="fade-up" data-aos-delay="100">
            <div class="member">
              <div class="member-img8">
                {/* <img src="assets/img/team/Priyanka Aggrawal.jpg" class="img-fluid" alt=""/> */}
               
              </div>
              <div class="member-info">
              <h4>Uttam Kumar Sharma</h4>
                <span>Backend Developer</span>
              </div>
            </div>
          </div>


</div>
      
    </section>
    <footer>
    <div class="footer-container">
        <div class="address">
        <h2>INCvest<span>.</span></h2>
            <p>
              Plot No.-248, Phase IV <br/>
              Udyog Vihar, Sector 18<br/>
              Gurugram, Haryana 122015 <br/><br/>
              <strong>Phone:</strong> +1 5589 55488 55<br/>
              <strong>Email:</strong> hello.incvest@gmail.com<br/>
            </p>
        </div>
        <div class="links">
        <h3>Links</h3>
            <ul>
              <li> <a href="#">Home</a></li>
              <li> <a href="#about">About us</a></li>
           
              <li> <a href="#team">Team</a></li>
             
            </ul>
        </div>
        <div class="services">
        <h3>Our Services</h3>
            <ul>
              <li><i class="bx bx-chevron-right"></i> Buy Stocks</li>
              <li><i class="bx bx-chevron-right"></i> Markets</li>
              <li><i class="bx bx-chevron-right"></i> Trusted Advisors</li>
            </ul>
        </div>
        <div class="social-media">
        <h3>Our Social Networks</h3>
            <p>For more information check our Social Media handles.</p>
            <ul>
                <li><FacebookIcon  sx={{color:"#4b49ac"}} /></li>
                <li><TwitterIcon sx={{color:"#4b49ac"}}/></li>
                <li><LinkedInIcon sx={{color:"#4b49ac"}}/></li>
                <li><InstagramIcon sx={{color:"#4b49ac"}}/></li>
            </ul>
        </div>
    </div>
</footer>



    </>
)
}