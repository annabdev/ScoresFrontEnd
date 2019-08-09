import React from "react";
import { MDBMask, MDBRow, MDBCol, MDBView, MDBContainer } from "mdbreact";


class VideoBackgroundPage extends React.Component {
    state = {
        collapseID: ""
        };
        
        toggleCollapse = collapseID => () =>
        this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));


render() {

return (
<div id="videobackground">
  
  <MDBView>
    <video className="video-intro"  playsInline
      autoPlay  loop>
      <source src='public/assets/05_DELIVERABLES/_RENDER-BLACK.mp4' type="video/mp4" />
    </video>
    <MDBMask className="d-flex justify-content-center align-items-center gradient">
      <MDBContainer className="px-md-3 px-sm-0">
        <MDBRow>
          <MDBCol md="12" className="mb-4 white-text text-center">
           
           
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBMask>
  </MDBView>

  <MDBContainer>
    
  </MDBContainer>
</div>
);
}
}

export default VideoBackgroundPage;