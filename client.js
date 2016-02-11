$(document).ready(function(){

  //Only if we are on root do we wanna transform to network graph
  var isIndexPage = location.pathname === "/";
  var BODY_SELECTOR = ".content";
  var SITE_SIDEBAR = ".sidebar";

  var NODE_FONT = {
    color: "#839496",
    face: 'Verdana, serif'
  };

  var NOODE_SECONDARY = {
    border: "#7dded6",
    background: "#2aa198"
  }

  var NODE_COLOR = {
    border: "#2aa198",
    background: "#7dded6",
    highlight: NOODE_SECONDARY,
    hover: NOODE_SECONDARY
  }

  makeBodyVisible();
  if(!isIndexPage){
    return;
  }

  var nodes = new vis.DataSet(getNodes());
  var edges = new vis.DataSet(getEdges(getTags()));
  var hrefs = getHrefs();

  var data = {
    nodes: nodes,
    edges: edges
  };

  var options = {
    interaction: {
      selectable:true,
      hover:true
    }
  };

  var network = new vis.Network(getContainer(), data, options);
  network.on("doubleClick", onClickHandler);

  function onClickHandler(event){
    console.log(event);
    location.pathname = hrefs[_.first(event.nodes)];
  }

  function makeBodyVisible(body){
    body = body || $(BODY_SELECTOR);
    body.css("display","block");
  }

  function getHrefs(){
    return $("article").map(function(index, post){
      return $(post).find(".internal-link").attr("href")
    }).toArray();
  }

  function getNodes(){
    return $("article").map(function(index, post){
      var hasImage = $(post).find("img").length > 0;
      if(hasImage){
        return {
          id: index,
          label: $(post).find("h1").html(),
          shape: "image",
          image: $(post).find("img").attr("src"),
          font: NODE_FONT,
          color: NODE_COLOR

        }
      } else {
        return {
          id: index,
          label: $(post).find("h1").html(),
          shape: "dot",
          font: NODE_FONT,
          color: NODE_COLOR
        }
      }

    }).toArray();
  }

  function getContainer(){
    var body = $(BODY_SELECTOR);
    var width = "calc(100vw - "+getSidebarWidth()+")";
    body.css("width",width);
    makeBodyVisible(body);
    return body[0];
  }

  function getSidebarWidth(){
    return $(SITE_SIDEBAR)[0].getBoundingClientRect().width +"px";
  }

  function getTags(){
    return $("article").toArray().reduce(function(memo, post, postId){
      $(post).find("#tags li").each(function(tagI, tag){
        var tagText = tag.textContent;
        if(memo[tagText]){
          memo[tagText].push(postId);
        } else {
          memo[tagText] = [postId];
        }
      })
      return memo;
    }, {});
  }

  function getEdges(tags){
    return _.chain(tags)
    .map(function(arrayOfIds, key){
      return arrayOfIds;
    })
    .map(function(arrayOfIds){
      return _.map(arrayOfIds, function(fromId, fromIndex){
        var resultArray = [];
        arrayOfIds.forEach(function(toId, toIndex){
          if(toIndex > fromIndex){
            resultArray.push({from: fromId, to:toId});
          }
        });
        return resultArray;
      })
    })
    .flatten()
    .compact()
    .uniq()
    .value();
  }
})
