import React, { Component } from 'react';
import { connect } from 'react-redux';


class NoteForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:"",
            Notetitle: "",
            NoteContent: ""
        }
    }

    isChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        // console.log(name);
        // console.log(value);


        this.setState({
            [name]: value
        })
    }


    UNSAFE_componentWillMount() {
        if (this.props.editItem) {
            this.setState({
                Notetitle: this.props.editItem.Notetitle,
                NoteContent: this.props.editItem.NoteContent,
                id: this.props.editItem.key

            })
        }
    
        
    }

    // cach dung React binh thuong
    // addData = (title,content) => {
    //     var item = {};
    //     item.Notetitle = title;
    //     item.NoteContent = content;
    //     // gui item len app de xu ly
    //     // console.log(item);
    //     this.props.getData(item);
    //     alert('Them du lieu ' + JSON.stringify(item) + "thanh cong");

    // }

    //su dung redux
    addData = (title, content) => {
        if (this.state.id) {//edit case
            console.log("chuan bi sua chua");

            var editObject={};

            editObject.id = this.state.id;
            editObject.Notetitle = this.state.Notetitle;
            editObject.NoteContent = this.state.NoteContent;

            this.props.editDataStore(editObject);
            this.props.changeEditStatus();
            this.props.alertOn("sua thanh cong","success");

        }
        else {
            var item = {};
            item.Notetitle = title;
            item.NoteContent = content;
            // item = JSON.stringify(item)
            this.props.adddataStore(item); // su dung reducer trong store and dispatch ADD_DATA
            this.props.alertOn("them moi thanh cong","success");
        }
    }
    printTitle = () => {
        if(this.props.addStatus){//true =>add case
            return <h4 className="text-center">Them Moi Ghi Chu</h4>
        }
        else {
            return <h4 className="text-center">Sua ghi chu'</h4>
        }
    }
    render() {
        // console.log(this.props.editItem.key);

        return (


            <div className="col-4">
                {this.printTitle()}
                <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle" >Note Title</label>
                        <input defaultValue={this.props.editItem.Notetitle} onChange={(event) => this.isChange(event)} type="text" className="form-control" name="Notetitle" id="Notetitle" aria-describedby="NotetitlehelpId" placeholder="tieu de note" />

                    </div>
                    <div className="form-group">
                        <label htmlFor="noteContent">Note Content</label>
                        <textarea defaultValue={this.props.editItem.NoteContent} onChange={(event) => this.isChange(event)} type="text" className="form-control" name="NoteContent" id="NoteContend" aria-describedby="NoteContenthelpId" placeholder="noi dung note" />

                    </div>
                    <button type="reset" onClick={() => this.addData(this.state.Notetitle, this.state.NoteContent)} className="btn btn-block btn-primary">Submit</button>
                </form>
            </div>






        );
    }
}


//Su dung redux
const mapStateToProps = (state, ownProps) => {
    return {
        editItem: state.editItem,
        addStatus: state.isAdd
    }
}
// this.props.editItem

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        adddataStore: (getitem) => {
            dispatch({ type: "ADD_DATA", getitem })
        },
        editDataStore: (getItem) => {
            dispatch({ type: "EDIT", getItem })
        },
        changeEditStatus: () => {
            dispatch({ type: "CHANGE_EDIT_STATUS", })
        },
        alertOn: (alertContent,alertType) => {
            dispatch({ type: "ALERT_ON", alertContent,alertType })
        },
        alertOff: () => {
            dispatch({ type: "ALERT_OFF" })
        }
    }
}
// this.props.adddataStore

export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);
