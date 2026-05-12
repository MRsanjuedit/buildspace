'use client';

import { useEffect } from 'react';

export default function LetterPage() {
  useEffect(() => {
    // PostHog tracking
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture('hit_landing_page', {
        path: window.location.pathname,
        host: window.location.host,
      });
    }

    // Track link clicks
    const trackClick = (href: string) => {
      if (typeof window !== 'undefined' && (window as any).posthog) {
        (window as any).posthog.capture('hit_cta_landing', {
          path: window.location.pathname,
          host: window.location.host,
          href: href,
        });
      }
    };

    const links = document.querySelectorAll('a[href^="http"]');
    links.forEach((link) => {
      link.addEventListener('click', () => {
        trackClick(link.getAttribute('href') || '');
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Audio Player */}
        <div className="bg-gray-200 rounded-lg p-6 mb-16 flex items-center gap-6">
          <audio
            src="https://framerusercontent.com/assets/s6Kcvm0lGpVdIimLMjrCJjPgd28.mp3"
            controls
            className="flex-1"
          />
        </div>

        {/* Letter Content */}
        <div className="space-y-8 text-lg leading-relaxed text-gray-800 font-medium">
          <p>
            [hi play above track as you read this]
            <br />
            <br />
            by: sanju.
            <br />
            published: aug 23, 2025.
          </p>

          <p>
            so, buildspace.
            <br />
            <br />
            it's not even a company to me, it's literally like a friend i dearly love.
          </p>

          <p>
            when i think of buildspace i think of the laughs we had while making our videos, the times i broke down in
            tears in moments when obsession wore me down, the deep and irreplaceable camaraderie our team shared, getting
            to meet so many of you at irl and of course all the thousands of times you all pressed 1 in the chat.
          </p>

          <p>all in all, i've had the best six years of my life here.</p>

          <p>but, i've decided to transform buildspace into something new—a platform to empower students to build their own ideas in this AI era.</p>

          <p>this means buildspace is evolving into what it was always meant to be.</p>

          <p>this all might come as a shock.</p>

          <p>
            i know many of you reading this bleed buildspace.
            <br />
            you adore this thing we created.
            <br />
            it's a part of your life.
            <br />
            <br />
            and here's the exciting part—we're doubling down on our core mission.
            <br />
            <br />
            we're in the midst of the biggest AI transformation the world has ever seen. and what better time to empower the next generation of builders?
            <br />
            <br />
            the opportunity in front of us is massive. students everywhere want to build, create, and make an impact. they need spaces like buildspace to experiment, learn, and turn their wildest ideas into reality.
          </p>

          <p>
            so…why now? <br />
            <br />
            because the moment is here. the AI era is upon us, and students need to be part of building it.
            <br />
            <br />
            we've spent six years creating the most vibrant builder community. we've learned what works, what resonates, how to inspire people to take action.
            <br />
            <br />
            now it's time to take everything we've built and evolve it. to make it more accessible, more focused on AI and emerging tech, and more aligned with what students want to learn and build.
            <br />
            <br />
            this isn't about stepping back. it's about stepping forward in a new direction.
            <br />
            <br />
            so what's up?
          </p>

          <p>
            over the past six years, me + the team have poured our hearts into this thing.
            <br />
            <br />
            we've created some of the coolest things i've ever been a part of that have touched the lives of millions of people –
            from building the most vibrant community of builders, to creating magical moments at our events, to inspiring countless people to start their own journeys.
            <br />
            <br />
            all with the purpose of helping people build their own ideas.
            <br />
            <br />
            it's been the most incredible journey of my life.
            <br />
            <br />
            i love this company. i can't say that enough.
            <br />
            <br />
            and look -- i am really happy and proud of all of it.
            <br />
            <br />
            buildspace represents something that's been important to me since the beginning—creating spaces where builders thrive. at this point my passion
            for the work isn't gone, but, more...complete. in a weird way, buildspace feels "done" to me.
            <br />
            <br />
            the fire to push forward isn't there like it was. and i'm not enjoying the work as i once did.
          </p>

          <p>
            but now i do have a clear vision. and it's crystal clear.
            <br />
            <br />
            the AI era is the defining moment of our generation. and the students building in this era? they're going to shape the future.
            <br />
            <br />
            buildspace has always been about empowering builders. now we're doubling down on that—but for the AI age. we're building tools, communities, and experiences designed specifically for students who want to build AI products and explore this new frontier.
            <br />
            <br />
            the fire is back. and it's burning brighter than ever.
            <br />
            <br />
            this is the move. this is what we're doing.
            <br />
            <br />
            so, yea, i felt i had seen worse and gotten through it.
          </p>

          <p>
            and i felt this too would pass.
            <br />
            <br />
            often in moments of confusion what i've always done is to just push forward, get momentum, and see where
            that takes me. that's what the last 12-mo have been about and we did some really cool shit:
            <br />
            <br />
            launched a new ai product to 100,000 users, ran our biggest season ever, expanded our content to millions of
            hits. was wild.
          </p>

          <p>
            it may sound crazy — but despite all the momentum, i couldn't find the spark that made buildspace feel alive
            to me.
            <br />
            <br />
            on the outside people are saying you're doing great, but on the inside you know something isn't right…
            <br />
            <br />
            that's why this is so difficult to explain to people like my parents, friends, colleagues, even you. because,
            we are so far from a shit company that no one cares about.
            <br />
            <br />
            we have real fans.
            <br />
            i'm sure people reading this will cry.
            <br />
            <br />
            thing is – it's not about the numbers, or the growth, or even the impact.
            <br />
            <br />
            <strong>buildspace has always been driven by passion to do something new and groundbreaking.</strong>
            <br />
            <br />
            and sadly, i just haven't been able to craft an updated direction that feels worth pursuing.
            <br />
            <br />
            that's 100% on me.
            <br />
            <br />
            i could certainly keep dogging it out for another 12 months (it can always be argued that the gold is right
            there). but tbh, i don't have any new moves.
            <br />
            <br />
            moving ahead in such a state just feels irresponsible.
          </p>

          <p>
            doesn't feel fair to anyone—investors, team, or myself.
            <br />
            <br />
            my guiding light for the last six years has been to do things that make me happy. i'm literally fueled by my
            love for the work. it's my main motivation.
            <br />
            <br />
            but, i've been out of love and out of joy for a while now.
            <br />
            <br />
            and if i'm not happy anymore, the work is gonna suffer.
            <br />
            <br />
            instead of forcing something that doesn't feel right — i think sometimes you gotta have the strength to let
            go. because what lies ahead may be more beautiful than what lies behind.
            <br />
            <br />
            but that's an insanely difficult, gut-wrenching decision to make when you have thousands of fans, a loving
            team, and insane support.
            <br />
            <br />
            that's why i spent a whole year making this decision.
            <br />
            <br />
            it feels right.
            <br />
            <br />
            i've learned now that the time and space needed to figure out my next angle isn't going to happen in a few
            weeks or months. i need to step away for some time and find out what's next for me and what i want to build.
            <br />
            <br />
            i know this post will probably disappoint thousands of people.
            <br />
            <br />
            i'm so sorry i couldn't make it work.
            <br />
            i'm so sorry i couldn't be better.
            <br />
            and i just hope you can respect the call.
            <br />
            <br />
            so, what's next?
          </p>

          <p>
            for the team — we're all in on this new direction. this is what we're building together.
            <br />
            <br />
            this is the most talented team i've ever seen in my life. and you all know that just by the quality of their
            output. many of you even know most of them by name.
            <br />
            <br />
            each person is incredibly gifted and passionate about empowering the next generation. we get to come in every day and work on something that matters—helping students build in the AI era.
            <br />
            <br />
            to the team — thank you for believing in this evolution with me.
            <br />
            <br />
            <a href="https://x.com/alec_dilanchian" target="_blank" rel="noopener" className="text-blue-400 underline">
              alec
            </a>
            , <a href="https://x.com/stavanpatel" target="_blank" rel="noopener" className="text-blue-400 underline">
              stavan
            </a>
            , <a href="https://x.com/jeffrey_notes" target="_blank" rel="noopener" className="text-blue-400 underline">
              jeffrey
            </a>
            , <a href="https://x.com/tair" target="_blank" rel="noopener" className="text-blue-400 underline">
              tair
            </a>
            , <a href="https://x.com/wordisbonz" target="_blank" rel="noopener" className="text-blue-400 underline">
              josh
            </a>
            , <a href="https://x.com/amit_ajwani" target="_blank" rel="noopener" className="text-blue-400 underline">
              amit
            </a>
            , <a href="https://x.com/lentinidante" target="_blank" rel="noopener" className="text-blue-400 underline">
              dante
            </a>
            , <a href="https://x.com/AidenTb1133256" target="_blank" rel="noopener" className="text-blue-400 underline">
              aiden
            </a>
            , <a href="https://x.com/adriannalakatos" target="_blank" rel="noopener" className="text-blue-400 underline">
              adrianna
            </a>
            .
            <br />
            you're my heroes. you gave it all your heart.
            <br />
            thank you for inspiring me for all these years.
          </p>

          <p>
            as for what's next for me? you know… i'm not sure. many people keep asking me what i'm going to do next.
            thing is if i knew what i was gonna do next, then i'd be doing it here. i wouldn't be closing this down.
            <br />
            <br />
            i've been building communities and creating experiences that matter for a long time now. many of you reading this are people that have
            become part of the buildspace family through the years.
            <br />
            <br />
            it's been an incredible ride.
            <br />
            <br />
            and now? now we're taking everything we've learned and channeling it into building the best platform for students to explore, build, and thrive in the AI era.
            <br />
            <br />
            my love for making stuff remains. and it's stronger than ever.
            <br />
            <br />
            so that's the plan for me + team.
            <br />
            <br />
            and here's what's exciting—you're part of this evolution.
            <br />
            <br />
            buildspace was always about empowering builders. and now we're taking it to the next level.
            <br />
            <br />
            it was where you gave your ideas a shot.
            <br />
            where you got others to believe in your work.
            <br />
            where you found people for the first time who were like you.
            <br />
            <br />
            and it's still that place. it's still home.
            <br />
            <br />
            but now we're building it for the AI era. for students who want to build AI products. for the next generation of builders.
            <br />
            <br />
            you did all this.
            <br />
            you took a bet on yourself.
            <br />
            you gave your ideas a shot.
            <br />
            you sought out something more.
            <br />
            <br />
            you were always what made this place special.
            <br />
            <br />
            all the live streams, sick merch, funny skits on twitter, the insane irl events, the anime music videos — all of this was possible because of you.
            <br />
            <br />
            and now? now we're just getting started.
            <br />
            <br />
            your journey is just getting started.
            <br />
            and the best part? you get to build in the AI era. the era where students like you can create products, companies, and ideas that were impossible just a few years ago.
          </p>

          <p>
            don't lose that spark that got you here.
            <br />
            <br />
            i hope we were able to inspire you to build something good.
            <br />
            <br />
            the buildspace community is stronger than ever. we're evolving. we're growing. and we can't wait to support you as you build.
            <br />
            <br />
            let's go build the future.
            <br />
            <br />
            - sanju
          </p>
        </div>
      </div>

      {/* Thank You Video Footer */}
      <div className="w-screen h-screen flex items-center justify-center bg-black">
        <video
          src="/ty_viedio.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
