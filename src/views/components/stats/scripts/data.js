

async function getData(nickName)  {
    let url3 = `https://sr-nextjs.vercel.app/api/halodotapi?path=%2Fgames%2Fhalo-infinite%2Ftooling%2Fleaderboards%2Fcsr%3Fplaylist_id%3Dedfef3ac-9cbe-4fa2-b949-8f29deafd483`
    let url2 = `https://sr-nextjs.vercel.app/api/halodotapi?path=%2Fgames%2Fhalo-infinite%2Fstats%2Fmultiplayer%2Fplayers%2F${nickName}%2Fservice-record%2Fmatchmade%3Ffilter%3Dall`
    let url = `https://sr-nextjs.vercel.app/api/halodotapi?path=%2Fgames%2Fhalo-infinite%2Fstats%2Fmultiplayer%2Fplayers%2F${nickName}%2Fcareer-rank`
    const response = await fetch(url3)
    if (!response.ok) {
        throw new Error('No se cargaron los datos correctamente')
    } else {
        const data = await response.json()
        console.log(data)
    }
}

await getData('drocseth')
