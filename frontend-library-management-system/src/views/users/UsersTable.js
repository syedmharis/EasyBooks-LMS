import React from 'react';
import { variables } from 'Variables';

export default class UserTable extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            users:[],
            userName:"",
            userContact:"",
            userPassword:"",
            userId:0
        }
    }
    
    refreshList() {
        fetch(variables.API_URL+'user')
        .then(response=>response.json())
        .then(data=>{this.setState({users:data});
        });
    }

    componentDidMount()
    {
        this.refreshList();
    }

    changeName = (e)=>{
        this.setState({userName:e.target.value});
    }

    changeContact = (e)=>{
        this.setState({userContact:e.target.value});
    }

    changePassword = (e)=>{
        this.setState({userPassword:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:'Add User',
            userId:0,
            userName:"",
            userContact:"",
            userPassword:""
        });
    }

    editClick(cs){
        this.setState({
            modalTitle:'Edit User',
            userId:cs.userId,
            userName:cs.userName,
            userContact:cs.userContact,
            userPassword:cs.userPassword
        });
    }

    createClick(){
        fetch(variables.API_URL+'user',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userName:this.state.userName,
                userContact:this.state.userContact,
                userPassword:this.state.userPassword
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
        fetch(variables.API_URL+'user',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userId:this.state.userId,
                userName:this.state.userName,
                userContact:this.state.userContact,
                userPassword:this.state.userPassword
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
        fetch(variables.API_URL+'user',{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                userId:cs.userId
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
            users,
            modalTitle,
            userId,
            userName,
            userContact,
            userPassword,
        } = this.state;

        return(
            <div>
                <button type='button'
                className='btn btn-primary mt-3 mb-3 float-end'
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add User
                </button>
                <div className='card'>
                <div class="card-body">
                <table className="table table-hover">
                    <thead className='thead-dark'>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Password</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(cs=>
                                <tr key={cs.userId}>
                                    <td>{cs.userId}</td>
                                    <td>{cs.userName}</td>
                                    <td>{cs.userContact}</td>
                                    <td>{cs.userPassword}</td>
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
                                    <span className="input-group-text">Name</span>
                                    <input type="text" className="form-control" value={userName} onChange={this.changeName}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Contact</span>
                                    <input type="text" className="form-control" value={userContact} onChange={this.changeContact}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Password</span>
                                    <input type="number" className="form-control" value={userPassword} onChange={this.changePassword}/>
                                </div>

                                {userId===0?
                                <button type="button"
                                className="btn btn-primary float-start"
                                onClick={()=>this.createClick()}
                                >Create</button>
                                :null}

                                {userId!==0?
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
