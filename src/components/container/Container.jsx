import { Children } from "react"

function Container ({Children}) {
    return(
        <div className="w-full max-v-7xl mx-auto">
            {Children}
        </div>
    )
}

export default Container