import React from 'react'




class ImageSwiper extends React.Component{

    handleWeel = e =>{
        this.handleMovement(e.deltaX)
    }
    
    handleMovement = deltaX =>{
      this.setState(state =>{
          const maxLength = state.imgs.length -1;
          let nextMovement = state.movement + deltaX

          if(nextMovement < 0 ){
              nextMovement = 0
          }
          if(nextMovement > maxLength){
              
          }
      })
    } 


state = {
    imgs: this.props.images,
    currentIndex: 0,
    movement: 0
}
    render() {
        
        return (
            <div className='container' onWheel={this.handleWeel}>
                <div className="image-swiper">

                </div>
            </div>
        );
    }
}

export default ImageSwiper