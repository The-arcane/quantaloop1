export function AnimatedBackground() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#101742] via-transparent to-transparent"></div>
      <div
        className="absolute h-[50vmin] w-[50vmin] rounded-full bg-gradient-to-tr from-primary to-accent opacity-50 blur-3xl animate-move-orb"
        style={{ top: '10vh', left: '10vw' }}
      ></div>
      <div
        className="absolute h-[40vmin] w-[40vmin] rounded-full bg-gradient-to-br from-secondary to-accent opacity-40 blur-3xl animate-move-orb"
        style={{ top: '50vh', left: '60vw', animationDelay: '-5s' }}
      ></div>
       <div
        className="absolute h-[30vmin] w-[30vmin] rounded-full bg-gradient-to-bl from-primary to-secondary opacity-30 blur-3xl animate-move-orb"
        style={{ top: '30vh', left: '30vw', animationDelay: '-10s' }}
      ></div>
    </div>
  )
}
