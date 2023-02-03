import React from 'react';
import { variables } from 'Variables';

export default class StudentsTable extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            students:[],
            studentRollNo:"",
            studentName:"",
            studentCourse:"",
            studentContact:"",
            studentGender:"",
            studentId:0
        }
    }
    
    refreshList() {
        fetch(variables.API_URL+'Students')
        .then(response=>response.json())
        .then(data=>{this.setState({students:data});
        });
    }

    componentDidMount()
    {
        this.refreshList();
    }

    changeRollNo = (e)=>{
        this.setState({studentRollNo:e.target.value});
    }

    changeName = (e)=>{
        this.setState({studentName:e.target.value});
    }

    changeCourse = (e)=>{
        this.setState({studentCourse:e.target.value});
    }

    changeContact = (e)=>{
        this.setState({studentContact:e.target.value});
    }

    changeGender = (e)=>{
        this.setState({studentGender:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:'Add Student',
            studentId:0,
            studentRollNo:"",
            studentName:"",
            studentCourse:"",
            studentContact:"",
            studentGender:""
        });
    }

    editClick(cs){
        this.setState({
            modalTitle:'Edit Student',
            studentId:cs.studentId,
            studentRollNo:cs.studentRollNo,
            studentName:cs.studentName,
            studentCourse:cs.studentCourse,
            studentContact:cs.studentContact,
            studentGender:cs.studentGender
        });
    }

    createClick(){
        fetch(variables.API_URL+'students',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                studentRollNo:this.state.studentRollNo,
                studentName:this.state.studentName,
                studentCourse:this.state.studentCourse,
                studentContact:this.state.studentContact,
                studentGender:this.state.studentGender
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },()=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'students',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                studentId:this.state.studentId,
                studentRollNo:this.state.studentRollNo,
                studentName:this.state.studentName,
                studentCourse:this.state.studentCourse,
                studentContact:this.state.studentContact,
                studentGender:this.state.studentGender
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },()=>{
            alert('Failed');
        })
    }

    deleteClick(cs){
        if(window.confirm('Are you Sure to Delete?')) {
        fetch(variables.API_URL+'students',{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                studentId:cs.studentId
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },()=>{
            alert('Failed');
        })}
    }

    render(){
        const {
            students,
            modalTitle,
            studentId,
            studentRollNo,
            studentName,
            studentCourse,
            studentContact,
            studentGender,
        } = this.state;

        return(
            <div>
                <button type='button'
                className='btn btn-primary mt-3 mb-3 float-end'
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Students
                </button>
                <div className='card'>
                <div class="card-body">
                <table className="table table-hover">
                    <thead className='thead-dark'>
                        <tr>
                            <th>Id</th>
                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Course</th>
                            <th>Contact</th>
                            <th>Gender</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(cs=>
                                <tr key={cs.studentId}>
                                    <td>{cs.studentId}</td>
                                    <td>{cs.studentRollNo}</td>
                                    <td>{cs.studentName}</td>
                                    <td>{cs.studentCourse}</td>
                                    <td>{cs.studentContact}</td>
                                    <td>{cs.studentGender}</td>
                                    <td>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={()=>this.editClick(cs)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </button>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            onClick={()=>this.deleteClick(cs)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                </div>
                </div>
                
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Roll No</span>
                                    <input type="text" className="form-control" value={studentRollNo} onChange={this.changeRollNo}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Name</span>
                                    <input type="text" className="form-control" value={studentName} onChange={this.changeName}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Course</span>
                                    <input type="text" className="form-control" value={studentCourse} onChange={this.changeCourse}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Contact</span>
                                    <input type="number" className="form-control" value={studentContact} onChange={this.changeContact}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Gender</span>
                                    <input type="text" className="form-control" value={studentGender} onChange={this.changeGender}/>
                                </div>

                                {studentId===0?
                                <button type="button"
                                className="btn btn-primary float-start"
                                onClick={()=>this.createClick()}
                                >Create</button>
                                :null}

                                {studentId!==0?
                                <button type="button"
                                className="btn btn-primary float-start"
                                onClick={()=>this.updateClick()}
                                >Update</button>
                                :null}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        )
    }
}
