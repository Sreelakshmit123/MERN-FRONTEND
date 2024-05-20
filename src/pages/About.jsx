import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AboutImg from '../assets/images/aboutImg.png'
import Header from '../components/Header'
import Footer from '../components/Footer'

function About() {
  return (
    <>
    
    <Header/>
     <div id='about' style={{backgroundSize:"cover" ,backgroundImage:`url('https://media.istockphoto.com/id/841278796/photo/fresh-vegetables-and-herbs.webp?b=1&s=170667a&w=0&k=20&c=9ugVPjl2d93Xnmg-0lRBTrduTlyvItozwfuXewCHMjY=')`}}>
        <Container className='shadow bg-light-transparent pb-5 pe-5  ps-5 fw-bolder text-'  style={{ marginTop: '100px' }}>
          <Row >
            <Col sm={5}><img className='w-100 h-100 ' src={AboutImg} alt="" />
            
            </Col>
            <Col sm={7}>
              <h1 className='text-dark  pt-5' style={{ fontFamily: '"Satisfy", cursive', fontSize: '70px' }}><b>About Us</b></h1>
              <h3><b>Who We Are</b></h3>
              <div>Home cooks are our heroes—it's as simple as that. TastyTales is a community built by and for kitchen experts: The cooks who will dedicate the weekend to a perfect beef bourguignon but love the simplicity of a slow-cooker rendition, too. The bakers who labor over a showstopping 9-layer cake but will just as happily doctor boxed brownies for a decadent weeknight dessert. The entertainers who just want a solid snack spread, without tons of dirty dishes at the end of the night.
                <br />
                <br />
                <p>Most importantly, TastyTales connects home cooks with their greatest sources of inspiration — other home cooks. We're the world's leading digital food brand, and that inspires us to do everything possible to keep our community connected. Sixty-million home cooks deserve no less.</p></div>
              <h1>Above all, we are</h1>
              <div className='mt-4'>
                * <b>Friendly </b>We love trading ideas and hanging out with fellow home cooks. <br /> <br />
  
                * <b>Supportive </b>Struggling with dinner inspo? We’re here to help! <br /><br />
                * <b>Creative</b> Cooking is an art. We like to experiment and express ourselves. <br /><br />
                * <b>Approachable </b>We don't judge—all cooking levels and recipes are welcome. <br /><br />
                *<b> Down-to-Earth </b>We love good food, period. It doesn’t need to be fussy to be great. <br /><br />
                *<b> Fun </b>Like you, we enjoy friends, family, cooking, and having a good laugh.</div>
            </Col>
          </Row>
          <Row className='mt-5'>
            
            <Col sm={7}>
            <p style={{fontSize:'35px'}} className='text-center mt-5 '> <b>Recipe Approval and Testing</b></p>
  <p style={{fontSize:'25px'}} className='text-center  ' ><b>Kitchen-Approved Recipes</b></p>
  <p >When Allrecipes’ readers add a recipe to the site, they may choose to save it as private, only share it on their profile page, or submit it for Kitchen Approved consideration. Recipes submitted to be Kitchen Approved are evaluated by our team of recipe editors, who ensure the originality and reliability of each recipe, and edit for Allrecipes style. Each recipe undergoes a series of reviews for: </p>
  
    
    <p><b>Duplication:</b> Editors verify that the recipe doesn't duplicate another that has already been published. </p>
    <p><b>Completion:</b> The ingredient list is evaluated to be sure it is complete, that measurements are correct, and that ingredients are properly ordered and grouped according to their use. </p>
    <p>
      <b>Accuracy: </b>Serving sizes and yields are checked for accuracy and to be sure that recipes reflect USDA dietary recommendations. 
      
    </p>
    <p>
    
     <b> Replication: </b>Recipes are reviewed and edited to ensure they are replicable when following the instructions. Editors assess the techniques, equipment, and appliances used in the recipes, and  explain any intermediate or advanced techniques with simple language and visuals. 
      
    </p>
    <p>
     <b> Health claims:</b> Editors evaluate the use of any health or nutrition claims — such as healthy, low-carb, low-fat, or paleo — based on guidelines from the dieticians at our sister brand, Eating Well. 
      
    </p>
    <p>
      Once recipes are evaluated and edited, they are not only reliable but also compatible with our nutrition analysis, scaling, shopping list, and other recipe tools. Only the best recipes achieve Kitchen Approved status and get published and promoted.  
      
    </p>
    <p>
      After publication, the Allrecipes audience can add their own photos, ratings, and reviews to recipes. In the reviews, they share tips for making recipes even better and adjusting them to personal tastes or diets
      
    </p>      
            </Col>
            <Col sm={5}>
              <img style={{marginTop:'110px'}} className='w-100 h-80  rounded-circle' src="https://64.media.tumblr.com/aca598bf41f9fb9d9c7b2f1211d20d48/tumblr_ox336ywlyH1u9ooogo1_540.gif" alt="" />
            </Col>
          </Row>
        
  
           
  
        </Container>

      <hr />
      </div>
      <Footer/>
      <div class="up-arrow icon">
                <a href="#about"><i class="fa-solid fa-angle-up brand"></i></a>
            </div>
    </>
  )
}

export default About