import {Input, Button} from 'antd'

export default function SearchMovies({data, error}){
    if (error) return (
        <div>Error</div>
    )
    if (data.Search) return (
        <div>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    font-family: Arial, Verdana, sans-serif;
                    justify-content: center;
                }
            `}
            </style>
            <form>
                <Input placeholder="Pesquise o título do filme aqui..." id="text" name="text" type="text" onSearch={() => {}} enterButton />
                <Input type="submit" value="Pesquisar" />
            </form>
            <div>
                { data.Search.map( (m) => <div><Button type="text" key={m.imdbID} href={`/onemovie/${m.imdbID}`}>{m.Title} --- {m.Year}</Button></div> )}               
            </div>
        </div>
    )
    return (
    <div>
        <style jsx>{`
            div {
                display: flex;
                flex-direction: column;
                font-family: Arial, Verdana, sans-serif;
                justify-content: center;
            }
        `}
        </style>
        <Button type="text">Sem resultados</Button>
    </div>)
}

export async function getServerSideProps(context){
    const { text } = context.query
    try {
        const res = await fetch(`http://www.omdbapi.com/?apikey=8c3ab9c9&s=${text}`)
        const data = await res.json()  
        return {
            props: {
                data
            }
        }
    } catch(err) {
        return {
            props: {
                error:`${err}`
            }
        }
    }
}