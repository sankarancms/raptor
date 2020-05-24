import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchConfigs } from '../../helpers/actions'

class AdminSettings extends React.Component {
    componentDidMount() {
        this.props.fetchConfigs();
    }
    renderConfig() {
        return this.props.configs.map(config => {
            return <li key={config._id}>{config.name}</li>;
        });
    }
    render() {
        return (
            <div>
                AdminSettings
                <ul>{this.renderConfig()}</ul>
                <Link to="/admin">Back</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { configs: state.configs };
};

const loadData = (store) => {
    return store.dispatch(fetchConfigs());
};

export default {
    loadData,
    component: connect(mapStateToProps, { fetchConfigs })(AdminSettings)
};
