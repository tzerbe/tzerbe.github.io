function getNodes(options){
  return $("article").map(function(index, post){
    var hasImage = $(post).find("img").length > 0;
    if(hasImage){
      return {
        id: index,
        label: $(post).find("h1").html(),
        shape: "image",
        image: $(post).find("img").attr("src"),
        font: options.NODE_FONT,
        color: options.NODE_COLOR

      }
    } else {
      return {
        id: index,
        label: $(post).find("h1").html(),
        shape: "dot",
        font: options.NODE_FONT,
        color: options.NODE_COLOR
      }
    }

  }).toArray();
}

module.exports = getNodes;