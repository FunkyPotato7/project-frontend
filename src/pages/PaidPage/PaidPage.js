import css from './PaidPage.module.css'
import { Header, Footer, PaidTable } from "../../components";

const PaidPage = () => {

    return(
        <div className={css.paidPage}>
            <Header/>
            <PaidTable/>
            <Footer/>
        </div>
    )
};

export {
    PaidPage
};