function getHrefs(){
  return $("article").map(function(index, post){
    return $(post).find(".internal-link").attr("href")
  }).toArray();
}

module.exports = getHrefs;