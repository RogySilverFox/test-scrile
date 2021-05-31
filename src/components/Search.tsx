import React from 'react'
import Autocomplete from 'react-autocomplete'
import ClipLoader from "react-spinners/ClipLoader";
import User from './User'
import imgNot from '../images/img-not.png'
import { getUsersAction } from '../actions'
import './Search.css'


type SearchProps = {}

type UserData = {
    id: number,
    fotoUrl: string,
    nameSurname: string,
    nickname: string
}

type SearchState = {
    userDataArray: Array<UserData>,
    autocompleteValue: string,
    isDataLoaded: boolean,
}

class Search extends React.Component<SearchProps, SearchState> {

    constructor(props: SearchProps) {
        super(props);
        this.state = {
            userDataArray: [],
            autocompleteValue: '',
            isDataLoaded: false,
        };
    }

//-------------------------------------------------------------------------------------------------------
//-- Actions functions
    getUsersData = (usersData: any) => {
        let currentUserArray: Array<UserData>
        let currentPhotoArray: Array<any>

        usersData.usersArray.forEach((element:any) => {
            currentUserArray = this.state.userDataArray.filter((user: UserData) => { return user.id === element.id })
            currentPhotoArray = usersData.photosArray.filter((photo: any) => {return photo.id === element.id})

            if (currentUserArray.length === 0) {
                this.state.userDataArray.push({
                    id: element.id,
                    fotoUrl: currentPhotoArray.length === 0 ? imgNot : currentPhotoArray[0].thumbnailUrl,
                    nameSurname: element.name,
                    nickname: element.username
                })
            }
        })
        this.setState({
            userDataArray: this.state.userDataArray,
            isDataLoaded: true
        })
    }
//-------------------------------------------------------------------------------------------------------

//-------------------------------------------------------------------------------------------------------
//-- Autocomplete functions
    renderAutocompleteItem = (item: UserData, isHighlighted: boolean) => {
        if (this.state.isDataLoaded)
            return <div style={{ background: isHighlighted ? 'lightgray': 'white' }}>
                <User
                    fotoUrl = {item.fotoUrl}
                    nameSurname = {item.nameSurname}
                    nickname = {item.nickname}
                />
            </div>
        else
            return <div className='clip-loader-container'>
                <ClipLoader color='rgb(227,33,119)' loading={!this.state.isDataLoaded} size={80} speedMultiplier={0.4} />
            </div>

    }

    getAutocompleteItemValue = (item: UserData) => {
        return item.nameSurname
    }

    onAutocompleteSelect = (value: string, item: UserData) => {
        this.setState({autocompleteValue: item.nameSurname})
    }

    onAutocompleteChange = (event: any, value: string) => {
        this.setState({autocompleteValue: value})
    }

    onAutocompleteMenuVisibilityChange = (isOpen: boolean) => {
        if (!this.state.isDataLoaded && isOpen) {
            getUsersAction(this.getUsersData)
        }
    }

    shouldAutocompleteItemRender = (item: UserData, value: string) => 
        item.nameSurname.toLowerCase().indexOf(value.toLowerCase()) > -1
//-------------------------------------------------------------------------------------------------------

    render() {
        return (
            <Autocomplete 
                getItemValue={this.getAutocompleteItemValue}
                items={this.state.isDataLoaded ? this.state.userDataArray: [{nameSurname: ''}]}
                renderItem={this.renderAutocompleteItem}
                value={this.state.autocompleteValue}
                onChange={this.onAutocompleteChange}
                onSelect={this.onAutocompleteSelect}
                onMenuVisibilityChange={this.onAutocompleteMenuVisibilityChange}
                shouldItemRender={this.shouldAutocompleteItemRender}
                inputProps={{placeholder: 'Search', className: 'search-input'}}
                menuStyle={
                    {
                        borderRadius: '0 0 5px 5px',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        padding: '0',
                        fontSize: '90%',
                        position: 'fixed',
                        overflow: 'auto',
                        maxHeight: '50%',
                    }
                }
            />
        );
    }
}


export default Search; 