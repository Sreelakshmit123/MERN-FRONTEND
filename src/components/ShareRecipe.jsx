import React, { useState } from 'react'
import { Offcanvas, Button } from 'react-bootstrap';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import RecipePdf from './RecipePdf';

function ShareRecipe({recipeData}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("recipe prop:",recipeData);

    const generatePDF = () => {
        const blob = new Blob([<RecipePdf recipeData={recipeData} />], { type: 'application/pdf' });
        console.log("blob:",blob);
        const pdfUrl = URL.createObjectURL(blob);
        console.log(pdfUrl);
         return pdfUrl;
       
    };

    const pdfUrl = generatePDF();
    

    const downloadPDF = () => {
      const pdfUrl = generatePDF();
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'recipe.pdf'; // Set the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (

        <>
            <Button className='btn btn-dark share' onClick={handleShow}>
               <i class="fa-solid fa-share-from-square"></i>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="top" className='w-50 mt-5 rounded shadow-lg bg-light' style={{ left: '25%' }}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Sharing options</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='d-flex justify-content-between'>
                <a className='fs-3' href="#" onClick={downloadPDF}><i class="fa-solid fa-file-pdf"></i> Download PDF</a>

                    <WhatsappShareButton style={{marginBottom:'89px'}}
                        url={pdfUrl}
                        title="Check out this recipe PDF!">
                        <WhatsappIcon size={55} round={true} />
                    </WhatsappShareButton>
                </Offcanvas.Body>
            </Offcanvas>
        </> 
        
    )
}

export default ShareRecipe