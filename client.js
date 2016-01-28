$(document).ready(function(){
  
  //Only if we are on root do we wanna transform to network graph
  var isIndexPage = location.pathname === "/";
  var BODY_SELECTOR = ".page-content";
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
      selectable:true
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
      return {
        id: index,
        label: $(post).find("h1").html()
      }
    }).toArray();
  }

  function getContainer(){
    var body = $(BODY_SELECTOR);
    var height = "calc(100vh - "+getHeaderHeight()+")";
    body.css("height",height);

    makeBodyVisible(body);
    return body[0];
  }

  function getHeaderHeight(){
    return $(".site-header")[0].getBoundingClientRect().height +"px";
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