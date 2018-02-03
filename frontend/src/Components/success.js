import React from 'react';
import ReactDOM from 'react-dom';
import './../index.css';

class Success extends React.Component{
    logout=()=>{
        if(localStorage.getItem('user')){
            ReactDOM.render(
                    <h1 style={{
                        position:'absolute',
                        top: '200px',
                        left:'500px'
                    }}>
                        Logged Out Successfully
                    </h1>

                ,document.getElementById('root'));
            localStorage.removeItem('user');
        }
        else{
            ReactDOM.render(<div>

            </div>,document.getElementById('root'));
        }

    };
    render(){
        return(
            <div>


                <div align="center">
                    Logged in Successfully..<br/>
                    <button className='btn btn-dark' onClick={this.logout}>Logout</button>
                </div>
            </div>
        );
    }
}
export default Success;