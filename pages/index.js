import useSWR from 'swr'
import {useState} from 'react'
import {Button} from 'antd'
import Head from 'next/head'

export default function Movies3(){
    const [url, setUrl] = useState('')
    const {data, error} = useSWR(url, theFetcher)
    const onClickHandler = (e) => {
        e.preventDefault()
        if (url === '') setUrl('http://www.omdbapi.com/?apikey=8c3ab9c9&s=bagdad')
        else setUrl('')
    }
    return (
        <div>
            <TheLink url={url} handler={onClickHandler}/>
            <TheMovies data={ error?{error:'Erro na pesquisa'}: data ? data: {Search:''} } show={url !== ''}/>
        </div>
    )
}

async function theFetcher(url) {
    if (url === null || url === '') return {Search:''}
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

export function TheMovies({data,show}){
    if (!show) return (<div></div>)    
    if (data.error) return (
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
            <Button type="text">falha na requisição</Button>
        </div>)
    if (data.Search === '' ) 
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
        <Button type="primary" loading>carregando...</Button>
    </div>)
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
            { data.Search.map( (m) => <div><Button type="text" key={m.imdbID} href={`/onemovie/${m.imdbID}`}>{m.Title} --- {m.Year}</Button></div>  ) }            
        </div>
    )
}

export function TheLink({url, handler}){    
    return (
        <div>
            <Head>
                <meta
                    http-equiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
            </Head>
            <style jsx>{`
                div {
                    display: flex;
                    flex-direction: column;
                    font-family: Arial, Verdana, sans-serif;
                    justify-content: center;
                }
            `}
            </style>
            <Button type="primary" href="/searchmovies/[key].js">Pesquisar</Button>
            <Button type="link" href="/index.js" onClick={handler}> {url === '' ? 'Mostrar' : 'Ocultar'} </Button>
        </div>
    )
}
