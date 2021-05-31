import React from 'react';
import './User.css';


type UserProps = {
    fotoUrl: string,
    nameSurname: string,
    nickname: string
}

class User extends React.Component<UserProps> {

    constructor(props: UserProps) {
        super(props)
    }

    render() {
        return (
            <div className='user-container'>
                <img className='user-foto' src={this.props.fotoUrl}/>
                <div className='user-info'>
                    <span className='name-surname'> {this.props.nameSurname} </span>
                    <span className='nickname'> @{this.props.nickname} </span>
                </div>
            </div>
        );
    }
}


export default User; 