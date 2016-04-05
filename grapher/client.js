$(document).ready(main)

var getNodes = require('./nodes.js');
var getTags  = require('./tags.js').getTags
var getEdges  = require('./tags.js').getEdges
var getHrefs  = require('./hrefs.js')
var _ = require('underscore')

function main(){

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

  var options = {
    NODE_FONT: NODE_FONT,
    NODE_COLOR: NODE_COLOR
  }

  var nodes = new vis.DataSet(getNodes(options));
  var edges = new vis.DataSet(getEdges(getTags()));
  var hrefs = getHrefs();

  var data = {
    nodes: nodes,
    edges: edges
  };

  var options = {
    hierachical: {
      enabled: true,
      levelSeparation: 100,
      treeSpacing: 200,
      nodeSpacing: 200,
      parenCentralization: true,
      sortMethod: 'directed',
      direction: 'UD',
    },
    interaction: {
      selectable:true,
      hover:true
    }
  };

  var network = new vis.Network(getContainer(), data, options);
  network.on("doubleClick", onClickHandler);

  function onClickHandler(event){
    location.pathname = hrefs[_.first(event.nodes)];
  }

  function makeBodyVisible(body){
    body = body || $(BODY_SELECTOR);
    body.css("display","block");
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
}
