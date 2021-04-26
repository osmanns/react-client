import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
    scrollTop: {
        position: 'fixed',
        right: '2rem',
        bottom: '4%',
        padding: '.3rem',
        display: 'flex',
        borderRadius: '.4rem',
        zIndex: 10,
        transition: '.4s',
        background: 'rgba(0, 158, 250, 0.5)',
        "&:hover, &.Mui-focusVisible": {
            transition: '.4s',
            color: 'white',
            background: 'rgba(0, 158, 250, 1)',
        }
    },
}))

const ScrollTop = ({showBelow}) => {

    const classes = useStyle();

    const [show, setShow] = useState(showBelow ? false : true);

    const handleScroll = () => {
        if(window.pageYOffset > showBelow) {
            if(!show) setShow(true);
        } else {
            if(show) setShow(false);
        }
    }

    useEffect(() => {
        if(showBelow) {
            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }
    })

    const handleClick = () => {
        window['scrollTo']({ top: 0, behavior: 'smooth' });
    }

    return (
        <div>
            {show &&
                <a href="#" onClick={handleClick} className={classes.scrollTop} id="scroll-top">
                    <ion-icon name="chevron-back-outline"></ion-icon>
                </a> 
            }
        </div>
    )
}

export default ScrollTop
