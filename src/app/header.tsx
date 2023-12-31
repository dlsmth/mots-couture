import Link from "next/link";
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal, PromiseLikeOfReactNode } from "react";

const arrowBack = (

    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M447-181 169-459q-5-5-7-10t-2-11q0-6 2-11t7-10l279-279q8-8 20-8t21 9q9 9 9 21t-9 21L262-510h496q13 0 21.5 8.5T788-480q0 13-8.5 21.5T758-450H262l228 228q8 8 8 20t-9 21q-9 9-21 9t-21-9Z"/></svg>
    );

const Header = (props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => {
    return (
        <div>
            <Link href="/">
            <span>
                {arrowBack}
            </span>
            </Link>
            <h1>{props.children}</h1>
        </div>
    );
};

export default Header;