import { NoteData } from './FireBaseConnection';

var redux = require('redux');



const nameInitialState = {
    isEdit: false,
    editItem: {},
    isAdd: false,
    AlertShow: false,
    AlertContent:"",
    AlertType:""
}
const allReducer = (state = nameInitialState, action) => {
    switch (action.type) {
        case "ADD_DATA":
            NoteData.push(action.getitem)
            // console.log("du lieu" + JSON.stringify(action.getitem) + "them thanh cong");


            return state
        case "CHANGE_EDIT_STATUS":

            return { ...state, isEdit: !state.isEdit }
        case "CHANGE_ADD_STATUS":

            return { ...state, isAdd: !state.isAdd }

        case "GET_EDIT_DATA":

            return { ...state, editItem: action.editObject }

        case "EDIT":
            //UPDATE LEN TREN DATABASE  
            NoteData.child(action.getItem.id).update({
                NoteContent: action.getItem.NoteContent,
                Notetitle: action.getItem.Notetitle

            })
            console.log("du lieu can sua ma store nhan dc la " + JSON.stringify(action.getItem.NoteContent));

            return { ...state, editItem: {} }
        case "DELETE":
            NoteData.child(action.deleteId).remove();
            console.log("Da xoa phan tu co id la " + action.deleteId);

            return state
        case "ALERT_ON":

            return { ...state, AlertShow: true,AlertContent:action.alertContent,AlertType:action.alertType }

        case "ALERT_OFF":

            return { ...state, AlertShow: false }
        default:
            return state
    }
}

var store = redux.createStore(allReducer);
store.subscribe(function () {
    console.log(JSON.stringify(store.getState()));

})

export default store;