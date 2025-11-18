import { useEffect, useRef } from "react";

import p5 from "p5";
import MainGame from './MainGame.js'




function PisPizza() {

    const p5Element = useRef();

    useEffect(() => {
        const p5Sketch = (p) => {

            // Game.js is going to be your object that 
            let game = new MainGame(p);

            p.setup = () => {
                game.setup();
            };

            p.draw = () => {
                game.draw();
            };
        };

        // 
        const p5Instance = new p5(p5Sketch, p5Element.current);

        return () => {
            // cleanup function that automatically gets called when this component is unmounted (just part of how useEffect works)
            p5Instance.remove();
        };
    }, []);

    // The useRef/ref={} stuff is used by react to store values that shouldn't change on rerenders of the App component
    return (
        <div>

<br />
            <div ref={p5Element}></div>
            
            
            
            </div>

    )


}

export default PisPizza

