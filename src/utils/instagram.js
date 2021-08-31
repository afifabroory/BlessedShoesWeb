async function fetchAPI(url) {
    console.log("[DEBUG]: fetchAPI()");
    const response = await fetch(url);
    return await response.json();
}

function getURL(field, path) {
    const ACCESS_TOKEN = "IGQVJXUVdZANDk5NDd5RzRNdU1TSlFjNVh3S1JkelhtczFqbUM5UWh2VVNxUTUtUlI2bnJuLWc3YmN6X1BSWDBxLXNPdG9oSE9hMnJlUTNORTh3NTZAZAd3BiREFyc056R0FiYkV6Xzh3";
    return `https://graph.instagram.com/${path}?fields=${field}&access_token=${ACCESS_TOKEN}`
}

function fetchListMedia() {
    // Ada tambahana field media_url
    return fetchAPI(getURL('id,media_type,permalink,media_url', 'me/media'));
}

function fetchMediaByID(id) {
    return fetchAPI(getURL('media_url', id));
}

function fetchAlbumByID(id) {
    return fetchAPI(getURL('media_url,media_type', `${id}/children`))
}

export { fetchListMedia, fetchMediaByID, fetchAlbumByID }