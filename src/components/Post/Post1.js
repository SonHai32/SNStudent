import React from 'react'
import {Menu,Segment}  from 'semantic-ui-react'
import firebase from '../../firebase'


class Post1 extends React.Component{
    state = {
        postRef: firebase.database().ref('posts'),

    }

    componentDidMount(){
       this.postListener()
    }

    postListener = () =>{
        const {postRef} = this.state;
        const postLoading = async () =>{
        return new Promise((reslove,reject)=>{
            postRef.on('value', snapshot=>{
                reslove(snapshot.val())
            })
        })
        }

        const postLoaded = postLoading();
        postLoaded.then(val =>{
            console.log(val)
        }).catch(err=>{
            console.log(err)
        })
}
    
    
    
    render(){
        return(
            <Segment>
                aaa
            </Segment>
        )
    }
}

export default Post1
