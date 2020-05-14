import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoteItem extends Component {
    constructor(props) {
        super(props);

    }

    twoActionButton = () => {
        this.props.ChangeEditStatus(); // doi trang thai -> action 1
        // lay noi dung store de store update du lieu
        // console.log(this.props.note);
        this.props.getEditData(this.props.note);

    }
    deleteData = () => {
        this.props.getDeleteData(this.props.note.key);
        this.props.alertOn("xoa ghi chu" + this.props.note.Notetitle + " thanh cong","danger")
    }

    render() {
        return (

            <div className="card">
                <div className="card-header" role="tab" id="note1">
                    <h5 className="mb-0">
                        <a data-toggle="collapse" data-parent="#noteList" href={"#number" + this.props.i} aria-expanded="true" aria-controls="section1ContentId">
                            {this.props.Notetitle}
                        </a>
                        <div className="btn-group float-right">
                            <button className="btn btn-primary float-right" onClick={() => this.twoActionButton()}>Sua</button>
                            <button className="btn btn-danger float-right" onClick={() => this.deleteData()}>Xoa</button>
                        </div>
                    </h5>

                </div>
                <div id={"number" + this.props.i} className="collapse in" role="tabpanel" aria-labelledby="note1">
                    <div className="card-body">
                        {this.props.NoteContent}
                    </div>
                </div>
            </div>


        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        editStatus: state.isEdit
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        ChangeEditStatus: () => {
            dispatch({ type: "CHANGE_EDIT_STATUS" })
        },
    
        getEditData: (editObject) => {
            dispatch({ type: "GET_EDIT_DATA",editObject })
        },
        getDeleteData: (deleteId) => {
            dispatch({ type: "DELETE",deleteId })
        },
        alertOn: (alertContent,alertType) => {
            dispatch({ type: "ALERT_ON", alertContent,alertType })
        },
        alertOff: () => {
            dispatch({ type: "ALERT_OFF" })
        }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteItem)