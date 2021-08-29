import ReactDOM from "react-dom";

const PortalModal = ({children}) => {
    const portal = document.getElementById('root');
    return ReactDOM.createPortal(children, portal);
};

export default PortalModal;


