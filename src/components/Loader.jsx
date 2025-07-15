"use client"
import { BounceLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "black",
};

const Loader = ({loading = true, color="#000000"}) => {
    return (
        <BounceLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    )
}

export default Loader