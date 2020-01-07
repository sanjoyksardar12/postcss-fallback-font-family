let postcss = require('postcss')

module.exports = postcss.plugin('postcss-fallback-font-family', (opts = { }) => {

  // Work with options here

  return (root, result) => {

    // Transform CSS AST here

    //looping through each selector block
    root.walkRules(function(rule){

      //looping through each property
      // rule.walkDecls(function(decl){
      //   //we work with each "decl" object here
      //   //decl.prop.indexOf('overflow) ===0
      // })
      rule.walkDecls(/^overflow-?/, function(decl){
        var hasTouch = rule.some(function(i){
          return i.prop === "-webkit-overflow-scrolling";
        });
        if(!hasTouch){
          if(decl.value === "scroll"){
            rule.append({
              prop: "-webkit-overflow-scrolling",
              value: "touch"
            });
          }
        }
      });
    })
  }
})
