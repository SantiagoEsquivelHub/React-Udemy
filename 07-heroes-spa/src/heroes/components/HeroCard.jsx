import { Link } from "react-router-dom";

export const HeroCard = ({
    id,
    superhero,
    alter_ego,
    first_appearance,
    characters,
}) => {

    const CharactersByHero = ({ alter_ego, characters }) => {

        if (alter_ego !== characters) {
            return (<p>{characters}</p>)
        }
    }

    const heroeImgUrl = `/assets/heroes/${id}.jpg`;
    //const charactersByHero = (<p>{characters}</p>);

    return (
        <div className="col">
            <div className="card">
                <div className="row no-gutters">
                    <div className="col-4">
                        <img src={heroeImgUrl} className="card-img" alt={superhero} />
                    </div>

                    <div className="col-8">
                        <div className="card-body">
                            <h5 className="card-title">{superhero}</h5>
                            <p className="card-text">{alter_ego}</p>
                            <CharactersByHero alter_ego={alter_ego} characters={characters} />
                            <p className="card-text text-muted">{first_appearance}</p>
                            <Link to={`/hero/${id}`}>
                                Más...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
