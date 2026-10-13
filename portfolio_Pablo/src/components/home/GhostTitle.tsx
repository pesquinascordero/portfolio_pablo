type GhostTitleProps = {
  text: string
}

// Texto grande y tenue detrás de una sección. Es decorativo, por eso aria-hidden.
function GhostTitle({ text }: GhostTitleProps) {

  return (
    <p className="ghost-title" aria-hidden="true">{text}</p>
  )
}

export default GhostTitle
