'use client'


export default function BackgroundAnimation() {
  return (
    <>
<div className="blur absolute top-0 grayscale">
		<div className="gradient-mask">
			<div className="spinning-gradient opacity-[0.6]"></div>
		</div>
	</div>
</>
  )
}
