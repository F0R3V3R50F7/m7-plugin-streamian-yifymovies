page.loading = true;
var relevantTitlePartMatch = title.match(/\s(S\d{2}E\d{2})/i);
if (relevantTitlePartMatch) {
    console.log('Yify Movies | Show detected, skipping...');
    return [];
}

var apiUrl = "https://yts.mx/api/v2/list_movies.json?query_term=" + encodeURIComponent(title);
var response = http.request(apiUrl);
var json = JSON.parse(response);
if (json.data && json.data.movies && json.data.movies.length > 0) {
    var results = [];
    json.data.movies.forEach(function (movie) {
        movie.torrents.forEach(function (torrent) {
            var seederCount = torrent.seeds;
            var magnetLink = torrent.url;
            if (/[xXhH]265/i.test(magnetLink)) {var codec = 'H265';};
            var item = magnetLink + " - " + '' + " - " + seederCount + " - " + codec;
            results.push(item);
        });
    });
    page.loading = false;
    return results;
} else {
    //page.appendItem("", "message", { title: "No results found on YTS for " + decodedTitle });
    page.loading = false;
    return [];
}
