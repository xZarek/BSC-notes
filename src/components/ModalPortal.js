import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('root');

class ModalPortal extends React.Component {
    constructor(props) {
        super(props);
        // Create a div that we'll render the modal into. Because each
        // Modal component has its own element, we can render multiple
        // modal components into the modal container.
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // Append the element into the DOM on mount. We'll render
        // into the modal container element (see the HTML tab).
        modalRoot.appendChild(this.el);

    }

    componentWillUnmount() {
        // Remove the element from the DOM when we unmount
        modalRoot.removeChild(this.el);
    }
    render() {
        if (this.props.show === false) {

            return null;
        }

        return ReactDOM.createPortal(

            this.props.children,
            this.el,
        );

    }
}

export default ModalPortal;