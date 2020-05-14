import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import {NoteData} from "./FireBaseConnection.js";
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Alert } from 'react-bs-notifier';
import AlertInfo from './components/AlertInfo';




class App extends Component { 
  constructor(props) {
    super(props);
    this.state ={

    }
  }

  //An va hien form
  showForm = () => {
    if (this.props.isEdit) {
      return <NoteForm/>
    }
  }
// su dung react binh thuong
  // addData = (item) => {
  //   NoteData.push(item)
  // }
  
  render() {
    // console.log(NoteData);

    // console.log(NoteData.once('value').then(function(snapshot){
    //   return (snapshot.val());
    // }));
    
    return (
      <div>
        <Nav />
        <AlertInfo/>
        <div className="container">
          <div className="row">
            <NoteList/>
            
            {this.showForm()}

          </div>
        </div>
      </div>
    );
  }
}

const  mapStateToProps = (state, ownProps) => {
  return {
    isEdit: state.isEdit
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     ChangeEditStatus: () => {
//       dispatch({type:"CHANGE_EDIT_STATUS"})
//     }
//   }
// }

export default connect(mapStateToProps)(App)
