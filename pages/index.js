import Head from 'next/head'
import {Button} from 'antd'

const Home = () => {
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
      <Button type="primary" href="/filmes/movies3">Carregar página</Button>
    </div>
  )
}

export default Home;