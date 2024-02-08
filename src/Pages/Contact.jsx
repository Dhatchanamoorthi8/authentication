import React from 'react'
import { useParallax ,ParallaxBanner } from 'react-scroll-parallax';

function Contact() {

  const parallax = useParallax < HTMLDivElement > ({
    rotate: [0, 360],
  });

  return (
    <>

      <ParallaxBanner
        layers={[
          { image: 'https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww', speed: -20 },
          {
            speed: -15,
            children: (
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-8xl text-white font-thin">Hello World!</h1>
              </div>
            ),
          },
          { image: 'https://plus.unsplash.com/premium_photo-1673306778968-5aab577a7365?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFja2dyb3VuZCUyMGltYWdlfGVufDB8fDB8fHww', speed: -10 },
        ]}
        className="aspect-[2/1]"
      />



    </>
  )
}

export default Contact