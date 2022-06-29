import { Fragment } from 'react';

import CarsSummary from "./CarsSummary";
import AvaliableCars from "./AvaliableCars";
const Cars = () => {

    return (
        <Fragment>
            <CarsSummary />
            <AvaliableCars />
        </Fragment>
    );
};

export default Cars;