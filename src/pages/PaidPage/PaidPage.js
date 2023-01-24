import { Header, Paid, Footer } from "../../components";
import './PaidPage.css';


const PaidPage = () => {

    return(
        <div className="paid-page">
            <Header/>
            <Paid/>
            <Footer/>
        </div>
    )
};

export {
    PaidPage
};