import { useEffect } from "react";

type UseDisableScrollbar = (disable: boolean) => void;

const useDisableScrollbar: UseDisableScrollbar = (disable) => {
    useEffect(() => {
        // Apply or remove the CSS class based on the 'disable' argument
        if (disable) {
            document.documentElement.classList.add('disable-scroll');
            document.body.classList.add('disable-scroll');
        } else {
            document.documentElement.classList.remove('disable-scroll');
            document.body.classList.remove('disable-scroll');
        }

        // Clean up the effect when the component using the hook unmounts
        return () => {
            document.documentElement.classList.remove('disable-scroll');
            document.body.classList.remove('disable-scroll');
        };
    }, [disable]);
}

export default useDisableScrollbar;