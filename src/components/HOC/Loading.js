import { Component } from 'react';
import './Loading.css';

const isEmpty = prop =>
    prop === null ||
    prop === undefined ||
    (prop.hasOwnProperty('length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0 );

const Loading = loadingProp => WrappedComponenet =>{
    return class LoadingHOC extends Component{
        componentDidMount(){
            this.startTimer = Date.now();
        }
        componentWillUpdate(nextProps){
            if(!isEmpty(nextProps[loadingProp])){
                this.endTimer = Date.now();
            }
        }
        render(){
            const myProps = {
                loadingTime : ((this.endTimer - this.startTimer ) / 1000).toFixed(2)
            };
            return isEmpty(this.props[loadingProp]) ? (
                <div className = 'loader' ></div>
            ) : (
                <WrappedComponenet {...this.props} {...myProps} />
            );
        }
    }
}

export default Loading;