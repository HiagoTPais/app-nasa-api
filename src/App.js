import React, { useState, useEffect } from "react"
import Http from "./Http"
import Modal from "./Modal"

const App = () => {
    const [apod, setApod] = useState({})
    const [neo, setNeo] = useState({})

    useEffect(() => {
        Http.getApod().then(apodData => {
            setApod(apodData.data)
        })
        Http.getNeo().then(neoData => {
            setNeo(neoData.data)
        })
    }, [])

    return (
        <div className="m-5">
            <div className="flex flex-col">
                <div className="flex justify-center">
                    <h1 className="text-3xl font-bold">Imagem do Dia</h1>
                </div>

                {apod && (
                    <article>
                        <br />
                        <div className="flex justify-center">
                            <h2>{apod.title} - {apod.date}</h2>
                        </div>

                        <br />
                        <div className="flex justify-center">
                            <Modal url={apod.url} title={apod.title} />

                            <div className="flex">
                                <p className="m-5">{apod.explanation}</p>
                            </div>
                        </div>

                        <div className="flex items-center border-b border-teal-500 py-2 w-96 m-5">
                            <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                onChange={(e) => Http.getApod(e.target.value).then(apodData => {
                                    setApod(apodData.data)
                                })} type="date" />
                        </div>

                        {/* <div className="flex justify-center">
                            <h1 className="text-3xl font-bold m-5">Últimas Notícias</h1>
                        </div>
                        <div>
                           
                        </div> */}
                    </article>
                )}
            </div>


        </div>

    )
}

export default App