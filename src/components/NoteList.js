import React, { Component } from 'react';
import { NoteData } from '../FireBaseConnection';
import NoteItem from './NoteItem';

class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFireBase: []

        }
    }


    componentWillMount() {
        NoteData.on('value', (notes) => {
            var arrayData = [];
            notes.forEach(element => {
                const key = element.key;
                const Notetitle = element.val().Notetitle;
                const NoteContent = element.val().NoteContent;
                arrayData.push({
                    key: key,
                    Notetitle: Notetitle,
                    NoteContent: NoteContent
                })

            })
            this.setState({
                dataFireBase: arrayData
            })
            // console.log(notes.val());
            // console.log(arrayData);


        })
    }


    getData = () => {
        if(this.state.dataFireBase) 
        {
            return this.state.dataFireBase.map((value,key)=> {
                
                // console.log(value.NoteContent);
                
                return (
                    <NoteItem 
                    
                    key = {key}
                    i = {key}
                    note = {value}
                    Notetitle = {value.Notetitle}
                    NoteContent = {value.NoteContent}
                    />
                )
            })
        }
        //  console.log(this.state.dataFireBase);
        
        
    }

    render() {

        return (

            <div className="col">.
                <div id="noteList" role="tablist" aria-multiselectable="true">
                    {this.getData()}
                    
                </div>
            </div>
        );
    }
}

export default NoteList;