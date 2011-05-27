(function(){if(window.require)
return;var require,scripts=document.getElementsByTagName('script'),body=document.body,cache={},queue={},endFunc=function(){},scriptCounter=0,loadedCounter=0,strictFiles=false;require=function(arr,fnc,strict){var windowLoad=window.onload||function(){};strictFiles=strict||false;window.onload=function(){windowLoad();arr=arr.push()?arr:[arr];endFunc=fnc;for(var j in scripts){if(scripts[j].src){cache[getName(scripts[j].src)]=j;}}
for(var i in arr){var script=getName(arr[i]);if(cache[script]||queue[script])continue;create(arr[i],i);scriptCounter++;}
if(scriptCounter===0)
endFunc();};};function create(file,index){var script=document.createElement('script');script.onload=script.onerror=function(event){if(event.type=="error")
console.log("File "+file+" cannot be loaded");loadedCounter++;delete queue[getName(file)];cache[getName(file)]=index;if(loadedCounter==scriptCounter)
endFunc();return true;};queue[getName(file)]=index;script.async=1;script.src=file;body.appendChild(script);}
function getName(file){return strictFiles?file.toString().split('/').pop():file;}
window.require=require;})();