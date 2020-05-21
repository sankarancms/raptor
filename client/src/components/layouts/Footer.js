import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer className="container">
                <p>&copy; Raptor {new Date().getFullYear()} </p>
            </footer>
        );
    }
}

export default Footer;
