import React from 'react'
import {Grid, Image, Icon} from 'semantic-ui-react'
import uuid from 'uuidv4'
import './style.css'
import uuidv4 from 'uuidv4';



let count = 0;


class DisplayImageNewsFeed extends React.Component{
    state = {
        images: this.props,
    }

    

    nextImage = event =>{
        let key = event.target.getAttribute('id')
        
        let imageSlide = document.getElementById(key)
        console.log(imageSlide)
        let size = document.querySelectorAll(`#${key} img`)[0].clientWidth
        imageSlide.style.transition = 'transform 0.5s ease-in-out'
        count++
        imageSlide.style.transform = `translateX(${-size*count}px)`
           


        // const imageSlider = document.getElementById('image-slider');
        
        // let size = document.querySelectorAll('#image-slider img')[0].clientWidth
            
            
        //     imageSlider.style.transition = 'transform 0.5s ease-in-out'
            
        //     imageSlider.style.transform = `translateX(${-size*count}px)`
        //     count++
        
        


        // document.getElementById('image-slider').style.transition = "transform 0.4s ease-in-out"
        
        // document.getElementById('image-slider').style.transform = `translateX(${(-document.querySelectorAll('#image-slider img')[0].clientWidth*1)}px)`
        
       
    }


 


    render(){
        const {images,defaultImage} = this.state;
 
        if(this.props.images !== undefined){
            return(
                <div className='container'  >
                    <div className="image-slider"  id={this.props.a}>
                        {this.props.images.map(val =>(
                            
                                <Image  fluid src={val}   />
                                
                           
                        ))}
                        
                        {/* {images.images.length > 1 ? (
                        <div>
                            
                            {count === 1 || count < images.images.length ? (
                                <div className= {`arrow-right ${this.props.a}`} onClick={this.nextImage}  >
                                <Icon name='chevron right' size='large' id={this.props.a} circular inverted  style={{background: '#ffffff',opacity: 0.3}}  />
                            
                                </div>
                            ) :(
                                <div className='arrow-left' key ={this.props.a} >
                                <Icon name='chevron left' size='large' circular inverted  style={{background: '#ffffff',opacity: 0.3}}  onClick={this.nextImage}  />
                            
                            </div>
                            ) }
                            
                        </div>
                        
                    ): ''} */}
                        
                    </div>
                   {/* {window.addEventListener('resize',function(e){
                       const imageSlider = document.getElementById('image-slider');
                       let size = document.querySelectorAll('.image-slider img')[0].clientWidth
                           
                           imageSlider.style.transition = 'none'
                           imageSlider.style.transform = `translateX(${-size*(count-1)}px)`
                   },true)} */}

<div className= {`arrow-right ${this.props.a}`} onClick={this.nextImage}  >
                                <Icon name='chevron right' size='large' id={this.props.a} circular inverted  style={{background: '#ffffff',opacity: 0.3}}  />
                            
                                </div>
                                <div className='arrow-left' key ={this.props.a} >
                                <Icon name='chevron left' size='large' circular inverted  style={{background: '#ffffff',opacity: 0.3}}  onClick={this.nextImage}  />
                            
                            </div>

                </div>
            )
        }
        // if(images.images.length === 1){
        //     return(
        //         <div className='container'>
        //             <Grid className='grid-container' style={{width: '100%', padding: 0, margin: 0}}>
        //                 <Grid.Row>
        //                     <Grid.Column className='border height-one background' style={{background: `url(${images.images[0]})`}}>

        //                     </Grid.Column>
        //                 </Grid.Row>
        //             </Grid>
        //         </div>
        //     )
        // }if(images.images.length > 1 && images.images.length == 2){
        //     return(
        //         <div className='container'>
        //             <Grid className='grid-container' style={{width: '100%', padding: 0, margin: 0}}>
        //                 <Grid.Row style={{padding: 0}}> 
        //                     <Grid.Column className='border height-two background' style={{background: `url(${images.images[0]})`}}>

        //                     </Grid.Column>
        //                 </Grid.Row>
        //                 <Grid.Row style={{padding: 0}}>
        //                     <Grid.Column className='border height-two background' style={{background: `url(${images.images[1]})`}}>

        //                     </Grid.Column>
        //                 </Grid.Row>
        //             </Grid>
        //         </div>
        //     )
        // }if(images.images.length > 2 && images.images.length === 3){
        //     return(
        //         <div className='container'>
        //             <Grid className='grid-container' style={{width: '100%', padding: 0, margin: 0}}>
        //                 <Grid.Row style={{padding: 0}}>
        //                     <Grid.Column className='border height-two background' style={{background: `url(${images.images[0]})`}}>

        //                     </Grid.Column>
        //                 </Grid.Row>
        //                 <Grid.Row style={{padding: 0}}>
        //                     <Grid.Column className='border height-three-bottom background' style={{background: `url(${images.images[1]})`,width:'50%'}}>

        //                     </Grid.Column>
        //                     <Grid.Column className='border height- background' style={{background: `url(${images.images[2]})`, width: '50%'}}>

        //                     </Grid.Column>
        //                 </Grid.Row>
        //             </Grid>
        //         </div>
        //     )
        // }

//         return(
//             images.images.length === 1 ?(
//             <div className='container'>
//                 <Grid style={{width: '100%', padding: 0, margin: 0}}>
//                     <Grid.Row>
//                         <Grid.Column className="border height-one background" style={{background: 'url(' + images.images[0] + ')' }}>

//                         </Grid.Column>
//                     </Grid.Row>
//                 </Grid>
//             </div>
//                 ) : images.images.length === 3 ? (
//                     <div className='container'>
//                 <Grid style={{width: '100%', padding: 0, margin: 0}} >
//                     <Grid.Row style={{padding: 0}}>
//                         {/* <Image src={images.images[0]} /> */}
//                         <Grid.Column className="border height-three background" style={{background: 'url('+ images.images[0]+ ')'}}>

//                         </Grid.Column>
//                     </Grid.Row>
//                     <Grid.Row style={{padding: 0}}>
//                     <Grid.Column className="border height-three background" style={{background: 'url('+ images.images[1]+ ')',width: '50%'}}>

// </Grid.Column>
// <Grid.Column className="border height-three background" style={{background: 'url('+ images.images[2]+ ')',width: '50%'}}>

// </Grid.Column>
//                     </Grid.Row>
//                 </Grid>
//                 </div>
//             ) : ''
            
//         )
return null
    }
}

export default DisplayImageNewsFeed