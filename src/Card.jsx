import profilePic from './assets/a.jpg'

function Card(){
    return (
        // with react(jsx) we use classname not class  
        <div className="card">
            <img className="card-image" src={profilePic} alt="Profile Picture"></img>
            <h2 className="card-title"> Aditya Sharma</h2>
            <p className="card-text">Undergrad. BCA and video editor</p>
        </div>
    );
}

export default Card