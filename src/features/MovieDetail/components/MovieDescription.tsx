interface MovieDescriptionProps {
  description: string | undefined
}

export function MovieDescription({ description }: MovieDescriptionProps) {
  if (!description) {
    return null
  }

  return (
    <div className="movie-description" data-testid="movie-description">
      <h3 className="description-title">Synopsis</h3>
      <p className="description-text">{description}</p>
    </div>
  )
}
