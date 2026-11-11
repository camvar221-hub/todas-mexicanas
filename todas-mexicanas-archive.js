async function getCatalog(page = 0) {
  let rows = 100;
  let q = "mediatype:movies AND language:spa AND (subject:Mexico OR subject:Mexican OR subject:Mexicana OR description:Mexico OR collection:mexican_films)";
  let query = encodeURIComponent(q);
  let api = `https://archive.org/advancedsearch.php?q=${query}&fl[]=identifier,title,year,description&sort[]=titleSorter asc&rows=${rows}&page=${page}&output=json`;
  let res = await fetch(api);
  let data = await res.json();
  return data.response.docs.map(m => ({
    tmdbId: m.identifier,
    title: m.title,
    year: m.year || "Sin año",
    description: m.description || "",
    poster: `https://archive.org/services/img/${m.identifier}`,
    url: `https://archive.org/download/${m.identifier}/${m.identifier}.mp4`
  }));
}
async function getStreams(tmdbId) {
  return [{
    title: "Archive.org - Mexicana HD",
    url: `https://archive.org/download/${tmdbId}/${tmdbId}.mp4`,
    quality: "HD"
  }];
}
