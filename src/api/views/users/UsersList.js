import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../helpers/actions'


class UsersList extends Component {
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderUser() {
        return this.props.users.map(user => {
            return <li key={user._id}>{user.firstName}</li>;
        });
    }

    render() {
        return (
            <div>
                UsersList
                <ul>{this.renderUser()}</ul>
                <Link to="/admin">Back</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { users: state.users };
};

const loadData = (store) => {
    return store.dispatch(fetchUsers());
};

export default {
    loadData,
    component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
