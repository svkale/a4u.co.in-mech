// google script run function and paste response text on target_id
function gsrfnts(query, target_id) {
  var p =
    "https://script.google.com/macros/s/AKfycbxS0ArgmHoB0pYL9N053ItYk4dxeO2xgftvdiXl_EeJJgugAdLCDrqmxgdppvC2Scb2zQ/exec?" +
    query;
  request_promise(p).then((res) => {
    if (document.getElementById(target_id)) {
      document.getElementById(target_id).innerHTML = res.responseText;
    }
  });
}
function gsrfn(query, target_id) {
  var p =
    "https://script.google.com/macros/s/AKfycbw9eXxMIO6sw6CtNa7APdyeuFdiijxLlGpIe8UYY47LPGhitGU4qqbzOHnhIzy_s1oO3w/exec?" +
    query;
  request_promise(p).then((res) => {
    if (document.getElementById(target_id)) {
      document.getElementById(target_id).innerHTML = res.responseText;
    }
  });
}
function gsrfnjq(query, target_id) {
  var p =
    "https://script.google.com/macros/s/AKfycbw9eXxMIO6sw6CtNa7APdyeuFdiijxLlGpIe8UYY47LPGhitGU4qqbzOHnhIzy_s1oO3w/exec?" +
    query;
  request_promise(p).then((res) => {
    if (document.getElementById(target_id)) {
      let rrt = res.responseText;
      var msjq = rrt.toString().split(".jqscript.");
      console.log("msjq.length = " + msjq.length);
      if (msjq.length > 1) {
        html = [];
        for (var i = 2; i < msjq.length; i = i + 2) {
          html.push(msjq[i - 1]);
        }
        for (var i = 2; i < msjq.length; i = i + 2) {
          rrt = rrt.replace(".jqscript." + html[i / 2 - 1] + ".jqscript.", "");
        }
        html = html.join("");
        html = decodeURI(html);
      }
      document.getElementById(target_id).innerHTML = rrt;
      //console.log(html)
      if (html != null && html != "") {
        var F = new Function(html);
        return F();
      }
    }
  });
}
function gid(id) {
  return document.getElementById(id);
}
function sidh(id, val) {
  if (gid(id) == null) {
    console.log(id);
  }
  return (document.getElementById(id).innerHTML = val);
}
function unhide(id) {
  document.getElementById(id).hidden = false;
}
function hide(id) {
  document.getElementById(id).hidden = true;
}
function gidh(id) {
  if (gid(id) == null) {
    console.log(id);
    return "";
  }
  return document.getElementById(id).innerHTML;
}
function gidbg(id) {
  return document.getElementById(id).style.backgroundColor;
}
function sidbg(id, color) {
  return (document.getElementById(id).style.backgroundColor = color);
}
function SelectMCQ(evt, cityName, QNo) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("MCQtabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("MCQtablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  if (QNo != null) {
    tablinks[Number(QNo) + 1].className += " active";
  } else {
    evt.currentTarget.className += " active";
  }
  return false;
}

var doc_ele_HTML,
  style_loaded = 0;
function putins_make_page_from_gdoc(request_obj, params) {
  let nav_ele_id = params[0],
    doc_ele_id = params[1],
    pastehtml=0,
    element = decodeURI(params[2]);
  //console.log("element",element);
  if (params[3]) {
    var parentURL = params[3];
  }
  let nav_ele = document.getElementById(nav_ele_id);
  let nav_ele_mob = document.getElementById(nav_ele_id + "_mob");
  let doc_ele = document.getElementById(doc_ele_id);
  let elementIndex=-1,eidno=0;
  if (!doc_ele_HTML) {
    doc_ele_HTML = request_gdoc_published_inline_contents(request_obj, [
      doc_ele_id,
    ]);
  }
  let domParser = new DOMParser(),
    dom;
  dom = domParser.parseFromString(doc_ele_HTML, "text/html");
  //console.log(dom.documentElement);
  while (dom.documentElement.querySelector("style")) {
    document
      .getElementsByTagName("head")[0]
      .insertAdjacentElement(
        "beforeend",
        dom.documentElement.querySelector("style")
      );
  }
  let nav_contents = dom.documentElement
      .querySelector("body")
      .innerText.substring(
        dom.documentElement
          .querySelector("body")
          .innerText.search("{NAVIGATION}") + 12,
        dom.documentElement
          .querySelector("body")
          .innerText.search("{/NAVIGATION}")
      )
      .split("|"),
    nav_HTML = "",
    head_no = 0,
    exec_dropdown_script = 0;
  
  for (let i of nav_contents) {
    let j = i.split("<>");
    if (j.length >= 2) {
	    //console.log(j);
      if(element==j[0]){elementIndex=eidno;}  //console.log("elementIndex",elementIndex);}
      if (j[1] == "Heading") {
        if (head_no != 0) {
          nav_HTML += "</div>";
        }
        head_no = 1;
        nav_HTML +=
          '<div class="cont1" data-button-target-selector="' +
          j[0].substr(j[0].search("&nbsp;") + 6) +
          '"><li class="u1 nav_heading" style="background-color: var(--main-color-2);">' +
          j[0] +
          "</li>";
      } else if (j[1] == "Text" || (j[1] == "Fixed" && j[0] == "Staff Name")) {
          nav_HTML +=
            '<span class="u1" style="text-align: center;font-weight: bold;">' +
            j[2] +
            "</span>";
      }else if (j[1] == "PasteHTML") {
	  /*
          nav_HTML +=
            "<li class='u1 dyn_data'><div class='putins' data-target-url='" +
            j[2] +
            "' data-function-name='request_response'></div></li>";
	  */
	      console.log("pasteHTML.");
	  //"https://script.google.com/macros/s/AKfycbx7kmBiPvF2HwSHvUKJArTMw510MuuuiToUiCOMk5yE6G881pa-6VDUkfBiXmwj33IL/exec?fn=GetCell&id=1lmMF-pV1qrh6qbHx3_I-iZdkYILNvEDQC7CjJTa01tw&ssn=RecentNotices&cell=D1"
	  nav_HTML += '<span class="u1" style="text-align: left;font-weight: bold;padding-left: 15px;" id="pasteHTML'+pastehtml+'" ></span>';
	  async function paste_HTML(phtml){
		let data = await fetch(j[2])
  			.then(x => x.text())
			.then(data => {return data;})
			.catch(error => {console.error(error);});    
		console.log(data);
		document.getElementById("pasteHTML"+phtml).innerHTML = data; //'<span class="u1" style="text-align: center;font-weight: bold;">' + data + '</span>';
	  }
	  paste_HTML(pastehtml);
	  pastehtml++;
	      
	      
	      //fetch (j[2])
		//.then(x => x.text())
		//.then(y => nav_HTML += '<span class="u1" style="text-align: center;font-weight: bold;">' + y + "</span>");
          var dyn_data_yn = false;
          //nav_HTML +=
          //  '<span class="u1" style="text-align: center;font-weight: bold;">' +
          //  j[2] +
          //  "</span>";
      } else if (j[1] == "EmptyLine") {
        nav_HTML += '<div class="u1 empty_line">.</div>';
      } else if (j[1] == "Separator"  || (j[1] == "Fixed" && j[0] == "Separator")) {
        nav_HTML += '<div class="u1 Separator"></div>';
      } else if (j[1] == "UserPhotoLink" || (j[1] == "Fixed" && j[0] == "UserPhotoLink")) {
        nav_HTML +=
          '<section class="cont" style="--cont-width: 50%; margin-left: 25%;"><img class=\'media1\' src="' +
          j[2] +
          '"></section>';
      } else if (j[1] == "ImageLink") {
        nav_HTML +=
          "<img class='cont' style='--cont-width: 60%;margin-left: 20%;' src=\"" +
          j[2] +
          '"></section>';
      } else if (j[1] == "Weblink") {
        nav_HTML +=
          '<li><a class="u1 web_link" target="_blank" href="' +
          j[2] +
          '" style="padding-left: 4%;text-decoration: none;">' +
          j[0] +
          ' <svg height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="var(--main-color-2)" d="M432,320H400a16,16,0,0,0-16,16 V448 H64 V128 H208 a16,16,0,0,0,16-16 V80 a16,16,0,0,0-16-16 H48 A48,48,0,0,0,0,112 V464 a48,48,0,0,0,48,48 H400 a48,48,0,0,0,48-48 V336 A16,16,0,0,0,432,320ZM488,0h-128 c-21.37,0-32.05,25.91-17,41 l35.73,35.73 L135,320.37a24,24,0,0,0,0,34 L157.67,377 a24,24,0,0,0,34,0 L435.28,133.32,471,169 c15,15,41,4.5,41-17 V24 A24,24,0,0,0,488,0Z"></path></svg></a></li>';
      } else if (j[1] == "Page") {
        nav_HTML +=
          "<li id='EID_"+eidno+++"' class='u1 doc_page' onclick='putins_make_subpage(this.innerText.trim(),\"" +
          doc_ele_id +
          "\");'><div";
        if (j[0].endsWith("Home")) {
          nav_HTML += ' style="font-weight: bold;"';
        }
        nav_HTML += ">" + j[0] + "</div></li>";
       } else if (j[1] == "RTF" || (j[1] == "Fixed" && j[0] == "Home")) {  
	  //console.log(doc_ele_id,j);
	  let doc_ele = document.getElementById(doc_ele_id), rtfhtml="";
	  if (
	    doc_ele_HTML.includes("{" + j[0] + "}") &&
	    doc_ele_HTML.includes("{/" + j[0] + "}")
	  ) {
	      rtfhtml = 
	      doc_ele_HTML.substring(
	        doc_ele_HTML.indexOf("{" + j[0] + "}") + 2 + j[0].length,
	        doc_ele_HTML.indexOf("{/" + j[0] + "}")
	      );		  
	  } else rtfhtml = "<span>Error! Tag not found.</span>";  
	//console.log("RTF or Home");  //console.log("rtfhtml");console.log(rtfhtml);
	      //console.log(rtfhtml);	    
	      let rtfhtml2=rtfhtml.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
	rtfhtml=encodeURI(JSON.stringify(rtfhtml));
	      
	nav_HTML +=
          "<li id='EID_"+eidno+++"' class='u1 doc_page' onclick='location.hash=this.innerText.trim();document.getElementById(\"" +
          doc_ele_id +
          "\").innerHTML=JSON.parse(decodeURI(\"" + rtfhtml + "\"));'><div";
        nav_HTML += ">" + j[0] + "</div></li>";		      	
	      	console.log(rtfhtml2);
	      	let doc = new DOMParser().parseFromString(rtfhtml2, 'text/html');
    		doc.querySelectorAll('script').forEach((item1,i1)=>{console.log(item1.textContent);eval(item1.textContent);});
      } else if (j[1] == "Image") {
	//console.log(j[2]);
	let img_str='<div align="center"><img src="'+j[2].replace("https://drive.google.com/file/d/","https://drive.google.com/thumbnail?id=").replace("/preview","")+'" ></div>';
	nav_HTML +=
          "<li id='EID_"+eidno+++"' class='u1 doc_page' onclick='location.hash=this.innerText.trim();document.getElementById(\"" +
          doc_ele_id +
          "\").innerHTML=decodeURI(\"" + encodeURI(img_str) + "\");'><div";
        nav_HTML += ">" + j[0] + "</div></li>";	
      } else if (j[1] == "HTML") {
	//console.log(j[2]);
	nav_HTML +=
          "<li id='EID_"+eidno+++"' class='u1 doc_page' onclick='location.hash=this.innerText.trim();document.getElementById(\"" +
          doc_ele_id +
          "\").innerHTML=decodeURI(\"" + encodeURI(j[2]) + "\");'><div";
        nav_HTML += ">" + j[0] + "</div></li>";	
       } else if(j[1]=="indexSlideShow"){  //slideshow in index column
	  //console.log("indexSlideShow");console.log(j);
	  let url="https://script.google.com/macros/s/AKfycbzy53ifIUTm2YNc_T_uv1Y0RV0PaLlE8i00V2DTvzBFCuG1Q8ocrvguw4mKUfkiykJSHA/exec?fn=fileList&transpose=false&folderID="+j[2].split("/")[0],
	      slideShowId="slideshow",timeInterval=3000,atag=true,labelOnImage=false,widthHeight="width:150px;height:200px;";
	  if(j[2].split("/").length>=1 && j[2].split("/")[1]!=""){slideShowId=j[2].split("/")[1];}
	  if(j[2].split("/").length>=2 && j[2].split("/")[2]!=""){timeInterval=j[2].split("/")[2];}
	  if(j[2].split("/").length>=3 && j[2].split("/")[3]!=""){atag=j[2].split("/")[3];}
	  if(j[2].split("/").length>=4 && j[2].split("/")[4]!=""){labelOnImage=j[2].split("/")[4];}
	  if(j[2].split("/").length>=5 && j[2].split("/")[5]!=""){widthHeight=j[2].split("/")[5];}
	  //console.log(slideShowId,timeInterval,atag,labelOnImage);
	  let div_str='<div align="center"><div id="'+slideShowId+'" style="max-width:500px;overflow:hidden;'+widthHeight+'"></div></div>';
	  nav_HTML +=
          '<section class="cont" style="--cont-width: 50%; margin-left: 25%;"><div align="center"><div id="'+slideShowId+'" style="max-width:150px;overflow:hidden;"></div></div></section>';
	  getSlidesData(url,slideShowId,timeInterval,atag,labelOnImage);
       } else if(j[1]=="gSlideShow"){
	  //console.log("gSlideShow");console.log(j);
	  let url="https://script.google.com/macros/s/AKfycbzy53ifIUTm2YNc_T_uv1Y0RV0PaLlE8i00V2DTvzBFCuG1Q8ocrvguw4mKUfkiykJSHA/exec?fn=fileList&transpose=false&folderID="+j[2].split("/")[0],
	      slideShowId="slideshow",timeInterval=3000,atag=false,labelOnImage=false,widthHeight="width:150px;height:200px;";
	  if(j[2].split("/").length>=1 && j[2].split("/")[1]!=""){slideShowId=j[2].split("/")[1];}
	  if(j[2].split("/").length>=2 && j[2].split("/")[2]!=""){timeInterval=j[2].split("/")[2];}
	  if(j[2].split("/").length>=3 && j[2].split("/")[3]!=""){atag=j[2].split("/")[3];}
	  if(j[2].split("/").length>=4 && j[2].split("/")[4]!=""){labelOnImage=j[2].split("/")[4];}
	  if(j[2].split("/").length>=5 && j[2].split("/")[5]!=""){widthHeight=j[2].split("/")[5];}
	  //console.log(slideShowId,timeInterval,atag,labelOnImage);
	
	  let div_str='<div align="center"><div id="'+slideShowId+'" style="max-width:500px;overflow:hidden;'+widthHeight+'"></div></div>';
	  nav_HTML +=
	  "<li id='EID_"+eidno+++"' class='u1 doc_page' onclick='location.hash=this.innerText.trim();document.getElementById(\"" +
          doc_ele_id +
          "\").innerHTML=decodeURI(\"" + encodeURI(div_str) + "\");'><div";
          nav_HTML += ">" + j[0] + "</div></li>";
	  getSlidesData(url,slideShowId,timeInterval,atag,labelOnImage);
     } else if (j[1] == "FramePage" || j[1] == "PDF" || j[1] == "GOOGLEFORM") {
        nav_HTML +=
          "<li id='EID_"+eidno+++"' class='u1 doc_page' onclick='let domParser=new DOMParser(),dom,doc_ele=document.getElementById(\"" +
          doc_ele_id +
          '");dom=domParser.parseFromString("<p>{frame_link}' +
          j[2] +
          '{/frame_link}</p>","text/html");putins_make_subpage_from_HTML(dom,doc_ele,this.innerText.trim());\'><div';
        if (j[0] == "Home") nav_HTML += ' style="font-weight: bold;"';
        nav_HTML += ">" + j[0] + "</div></li>";
      } else if (j[1] == "HitCounter" || j[1] == "Hitcount") {
        nav_HTML +=
          "<li class='u1 hit_counter' id='hit_counter'><big class='putins' data-target-url='https://script.google.com/macros/s/AKfycbw9eXxMIO6sw6CtNa7APdyeuFdiijxLlGpIe8UYY47LPGhitGU4qqbzOHnhIzy_s1oO3w/exec?fn=hitCounter&site=" +
          j[2] +
          "' data-function-name='request_response'></big></li>";
        var hit_count_yn = true;
      } else if (j[1] == "HeaderImage") {
        document
          .getElementsByTagName("header")[0]
          .getElementsByTagName("img")[0]
          .setAttribute("src", parentURL + j[2]);
      } else if (j[1] == "ScrollText" || (j[1] == "Fixed" && j[0] == "ScrollText")) {
        if (document.getElementById("top_scroll_text")) {
          document.getElementById("top_scroll_text").innerHTML = j[2];
        }
      } else if (j[1] == "InputText") {
        nav_HTML +=
          '<input class="u1" type="text" id="' +
          j[2] +
          '" placeholder="' +
          j[0] +
          '" />';
      } else if (j[1] == "Button") {
        nav_HTML +=
          '<button class="u1" onclick="' +
          j[2] +
          '" style="text-align: center;"><span>' +
          j[0] +
          "</span></button>";
      } else if (j[1] == "DropDown") {
        nav_HTML +=
          '<section class="u1 hover_dropdown"><button class="u1 hover_dropdown_button" style="background-color: aliceblue;">' +
          j[0] +
          ' &#9662;</button><ul class="hover_dropdown_list">';
        exec_dropdown_script = 1;
      } else if (j[1] == "DropDownItem") {
        if (j[2] != "") {
          nav_HTML +=
            '<li style="padding: 0;"><a target="_blank" href="' +
            j[2] +
            '">' +
            j[0] +
            "</a></li>";
        } else {
          nav_HTML += "<li>" + j[0] + "</li>";
        }
      } else if (j[1] == "DropDownEnd") {
        nav_HTML += "</ul></section>";
      } else if (j[1] == "SCRIPT") {
        var scr = document.createElement("script");
        scr.setAttribute("type", "text/javascript");
        scr.innerHTML = j[2];
        document.getElementsByTagName("html")[0].appendChild(scr);
      }
    }
  }
  nav_ele.innerHTML = nav_HTML;
  if (exec_dropdown_script) {
    let dropdown_script = document.createElement("script");
    dropdown_script.setAttribute("type", "text/javascript");
    dropdown_script.innerHTML = `
		let dropdowns=document.querySelectorAll(".hover_dropdown");
		function setDropDown(obj)
		{
			for(let i of obj[0].target.getElementsByClassName("hover_dropdown"))
			{
				i.style.visibility= obj[0].contentRect.height==0 ? "hidden" : "visible";
				i.parentElement.style.overflow="visible";
			}
		}
		for(i of dropdowns)
		{
			new ResizeObserver(setDropDown).observe(i.parentElement);
		}
		`;
    document.getElementsByTagName("html")[0].appendChild(dropdown_script);
  }
  if (hit_count_yn) {
    putins_load("hit_counter");
  }
  if (dyn_data_yn) {
    putins_load("dyn_data", true);
  }
  if (nav_ele_mob) {
    nav_ele_mob.innerHTML = "";
    let nav_ele_innersvgs = document.querySelectorAll(
      "#" + nav_ele_id + " svg"
    );
    let nav_count = 0;
    for (k of nav_ele_innersvgs) {
      if (k.parentElement.classList.contains("nav_heading")) {
        j = k.cloneNode("true");
        j.style.height = "var(--nav_svgs)";
        j.style.width = "var(--nav_svgs)";
        j.style.paddingLeft = "3%";
        j.style.paddingRight = "3%";
        j.classList.add("button_visibility_control");
        j.classList.add("hide_md");
        j.setAttribute("data-button-target", k.parentElement.innerText.trim());
        j.setAttribute("data-button-get-from", "attribute");
        if (window.innerWidth > 575) {
          j.setAttribute("data-button-status", "visible");
        } else {
          j.setAttribute("data-button-status", "hidden");
        }
        nav_ele_mob.appendChild(j);
        nav_count++;
      }
    }
    load_buttons();
    nav_ele_mob.setAttribute(
      "style",
      nav_ele_mob.getAttribute("style") +
        ";--nav_svgs: " +
        100 / nav_count +
        "%;"
    );
  }
  let nav_load_script = document.createElement("script");
  nav_load_script.setAttribute("type", "text/javascript");
  nav_load_script.innerHTML = "load_navs();";
  document.getElementsByTagName("body")[0].appendChild(nav_load_script);
  //putins_make_subpage(element, doc_ele_id);
	//console.log("EID_"+elementIndex);
  try{document.getElementById("EID_"+elementIndex+"").click(); }catch(err){console.log("err",err);document.getElementById("EID_0").click();}
  return;
}
function putins_make_subpage(element, doc_ele_id) {
	//console.log("element",element,", doc_ele_id",doc_ele_id);
  let domParser = new DOMParser(),
    dom,
    doc_ele = document.getElementById(doc_ele_id);
  if (
    doc_ele_HTML.includes("{" + element + "}") &&
    doc_ele_HTML.includes("{/" + element + "}")
  ) {
    dom = domParser.parseFromString(
      doc_ele_HTML.substring(
        doc_ele_HTML.indexOf("{" + element + "}") + 2 + element.length,
        doc_ele_HTML.indexOf("{/" + element + "}")
      ),
      "text/html"
    );
  } else return (doc_ele.innerHTML = "<span>Error! Tag not found.</span>");
  putins_make_subpage_from_HTML(dom, doc_ele, element);
}

function putins_make_subpage_from_HTML(dom, doc_ele, element) {
  location.hash = element;
  document.getElementById("contents_page").scrollIntoView(true);
  let doc_text = dom.documentElement.innerText,
    exec_video_style_script = 0,
    exec_frame_style_script = 0,
    exec_internal_page_script = 0,
    exec_nested_doc_style_script = 0,
    exec_presentation_style_script = 0,
    exec_noticeboard_script = 0;
  while (
    (dom.documentElement.innerText.includes("{video_gdrive}") &&
      dom.documentElement.innerText.includes("{/video_gdrive}")) ||
    (dom.documentElement.innerText.includes("{video_youtube}") &&
      dom.documentElement.innerText.includes("{/video_youtube}"))
  ) {
    video_type = dom.documentElement.innerText.includes("{video_gdrive}")
      ? "video_gdrive"
      : "video_youtube";
    dom.documentElement.innerHTML = dom.documentElement.innerHTML
      .replace(
        "{" + video_type + "}",
        '<section class="u1" style="margin-right: 1%;position: relative;"><div class="loading_half_circle"></div><iframe class="media1 request_google_video" src="'
      )
      .replace(
        "{/" + video_type + "}",
        '" style="visibility: hidden;" allow="accelerometer;autoplay;clipboard-white;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></section>'
      );
    exec_video_style_script = 1;
  }
  let doc_frame_no = 0;
  while (
    dom.documentElement.innerText.includes("{frame_link}") &&
    dom.documentElement.innerText.includes("{/frame_link}")
  ) {
    doc_text = dom.documentElement.innerText;
    let frame_ele =
      '<section class="u1" style="margin-right: 1%;position: relative;"><iframe class="cont1 external_frame_from_doc" src="' +
      doc_text.substring(
        doc_text.search("{frame_link}") + 12,
        doc_text.search("{/frame_link}")
      ) +
      '" style="border: 0;visibility: hidden;" allow="encrypted-media;" allowfullscreen></iframe></section>';
    let frame_target = dom.evaluate(
      "//*[contains(.,'" +
        doc_text.substring(
          doc_text.search("{frame_link}"),
          doc_text.search("{/frame_link}")
        ) +
        "{/frame_link}" +
        "')]",
      dom,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    let l,
      ltemp = true;
    while (ltemp) {
      l = ltemp;
      if (l.innerText) {
        if (
          l.innerText ==
          doc_text.substring(
            doc_text.search("{frame_link}"),
            doc_text.search("{/frame_link}")
          ) +
            "{/frame_link}"
        ) {
          break;
        }
      }
      ltemp = frame_target.iterateNext();
    }
    while (l.tagName == "HTML" || l.tagName == "BODY") {
      l = frame_target.iterateNext();
    }
    if (frame_ele.includes(window.location.hostname)) {
      l.outerHTML = frame_ele
        .replace("external_frame_from_doc", "internal_page")
        .replace("visibility: hidden;", "");
      exec_internal_page_script = 1;
    } else if (
      frame_ele.includes("https://docs.google.com/presentation/") &&
      (frame_ele.includes("/preview") || frame_ele.includes("/embed"))
    ) {
      l.outerHTML = frame_ele
        .replace("external_frame_from_doc", "external_presentation")
        .replace("visibility: hidden;", "");
      exec_presentation_style_script = 1;
    } else if (
      frame_ele.includes("https://docs.google.com/document/d/e") &&
      frame_ele.includes("embedded=true")
    ) {
      frame_ele =
        '<section data-target-url="' +
        doc_text.substring(
          doc_text.search("{frame_link}https://docs.google.com/document/d/e") +
            12,
          doc_text.search("embedded=true{/frame_link}")
        ) +
        'embedded=true" class="u1 putins" data-function-name="request_gdoc_published_inline_contents" id="doc_frame_' +
        doc_frame_no +
        '" data-parameter-custom="doc_frame_' +
        doc_frame_no +
        '"></section>';
      l.outerHTML = frame_ele;
      exec_nested_doc_style_script = 1;
      doc_frame_no++;
    } else {
      l.outerHTML = frame_ele;
      exec_frame_style_script = 1;
    }
  }
  var count = 0;
  while (
    dom.documentElement.innerText.includes("{COLUMN2}") &&
    dom.documentElement.innerText.includes("{/COLUMN2}")
  ) {
    dom.documentElement.innerHTML = dom.documentElement.innerHTML
      .replace("{COLUMN2}", '<section class="u1 md2">')
      .replace("{/COLUMN2}", "</section>");
  }
  count = 0;
  while (
    dom.documentElement.innerText.includes("{COLUMN3}") &&
    dom.documentElement.innerText.includes("{/COLUMN3}")
  ) {
    dom.documentElement.innerHTML = dom.documentElement.innerHTML
      .replace("{COLUMN3}", '<section class="u1 lg3">')
      .replace("{/COLUMN3}", "</section>");
  }
  while (
    dom.documentElement.innerText.includes("{noticeboard}") &&
    dom.documentElement.innerText.includes("{/noticeboard}") &&
    dom.documentElement.innerText.includes("{noticeboard_layout}") &&
    dom.documentElement.innerText.includes("{/noticeboard_layout}")
  ) {
    var notice_script_link = doc_text.substring(
      doc_text.search("{noticeboard}") + 13,
      doc_text.search("{/noticeboard}")
    );

    [...dom.documentElement.querySelectorAll("p")]
      .filter(
        (p) =>
          p.innerText.startsWith("{noticeboard}") &&
          p.innerText.endsWith("{/noticeboard}")
      )
      .forEach((p) => (p.innerHTML = ""));
    doc_text = dom.documentElement.innerText;
    let doc_html = dom.documentElement.innerHTML;
    dom.documentElement.innerHTML = dom.documentElement.innerHTML
      .replace(
        "{noticeboard_layout}",
        '<section id="notices" class="cont1 ignore-revert">'
      )
      .replace("{/noticeboard_layout}", "</section>");
    exec_noticeboard_script = 1;
  }
  // while (
  //   dom.documentElement.innerText.includes("{htmlCode}") &&
  //   dom.documentElement.innerText.includes("{/htmlCode}")
  // ) {
	 // let doc_html = dom.documentElement.innerHTML;
	 //  //dom.documentElement.innerHTML = "Hello";
  // }
  while (
    dom.documentElement.innerText.includes("{notice}") &&
    dom.documentElement.innerText.includes("{/notice}")
  ) {
    doc_text = dom.documentElement.innerText;
    let doc_html = dom.documentElement.innerHTML;
    dom.documentElement.innerHTML = dom.documentElement.innerHTML.replace(
      doc_html.substring(
        doc_html.search("{notice}"),
        doc_html.search("{/notice}") + 9
      ),
      '<section id="' +
        doc_text.substring(
          doc_text.search("{notice}") + 8,
          doc_text.search("{/notice}")
        ) +
        '_notices" class="cont1"><div class="media1" style="position: relative;"><div class="u1 loading_half_circle_10px"></div></div></section>'
    );
  }

  doc_text = dom.documentElement.innerText;
  [...dom.documentElement.querySelectorAll("p")]
    .filter(
      (p) => p.innerText.startsWith("{html}") && p.innerText.endsWith("{/html}")
    )
    .forEach((p) =>      
      console.log(
        p,
        p.innerText,
        p.innerHTML= p.innerText.substr(0, p.innerText.length - 7).substr(6)
      )	
	        let ihtml=p.innerText.substr(0, p.innerText.length - 7).substr(6);
	        let ihtml2=ihtml.replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
	      	console.log(ihtml2);
	      	let doc = new DOMParser().parseFromString(ihtml2, 'text/html');
    		doc.querySelectorAll('script').forEach((item1,i1)=>{console.log(item1.textContent);eval(item1.textContent);});
    );
  while (
    dom.documentElement.innerText.includes("{function}") &&
    dom.documentElement.innerText.includes("{/function}")
  ) {
    doc_text = dom.documentElement.innerText;
    let doc_html = dom.documentElement.innerHTML;
    dom.documentElement.innerHTML = dom.documentElement.innerHTML.replace(
      doc_html.substring(
        doc_html.search("{function}"),
        doc_html.search("{/function}") + 11
      ),
      window[
        doc_text.substring(
          doc_text.search("{function}") + 10,
          doc_text.search("{/function}")
        )
      ]()
    );
  }
  while (
    dom.documentElement.innerText.includes("{eval}") &&
    dom.documentElement.innerText.includes("{/eval}")
  ) {
    doc_text = dom.documentElement.innerText;
    let doc_html = dom.documentElement.innerHTML;
    let fs = document.createElement("script");
    fs.setAttribute("type", "text/javascript");
    fs.innerText = doc_text
      .substring(doc_text.search("{eval}") + 6, doc_text.search("{/eval}"))
      .replace(/%%quot%%/g, '"')
      .replace(/%%apos%%/g, "'");
    document.getElementsByTagName("html")[0].appendChild(fs);
    //console.log(doc_html.search("{eval}"));
    //console.log(doc_html.search("{/eval}"));
    //console.log(doc_text.substring(doc_text.search("{eval}"),doc_text.search("{/eval}")+7));
    dom.documentElement.innerHTML = dom.documentElement.innerHTML.replace(
      doc_html.substring(
        doc_html.search("{eval}"),
        doc_html.search("{/eval}") + 7
      ),
      ""
    );
  }
  while (dom.documentElement.innerText.includes("{StarRating}{/StarRating}")) {
    let doc_html = dom.documentElement.innerHTML;
    let html_text =
      '<span>★ Rating: </span><span id=SRV_mytc></span><span>&nbsp;&nbsp;&nbsp;&nbsp;<select name="StarRating" id="StarRating" required onchange=alert("Thank_you_for_your_response.");this.disabled=true;gsrfn("fn=StarRating&value="+this.value+"&page="+(document.URL).replace("#","///")); ><option disabled selected value> -- Rate This Page -- </option><option value="1">&#9733;</option><option value="2">&#9733;&#9733;</option> <option value="3">&#9733;&#9733;&#9733;</option><option value="4">&#9733;&#9733;&#9733;&#9733;</option> <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option></select></span>';

    let srscript = document.createElement("script");
    srscript.setAttribute("type", "text/javascript");
    srscript.innerHTML =
      'gsrfn("fn=StarRating&page="+(document.URL).replace("#","///"),"SRV_mytc");';
    document.getElementsByTagName("html")[0].appendChild(srscript);

    dom.documentElement.innerHTML = dom.documentElement.innerHTML.replace(
      "{StarRating}{/StarRating}",
      html_text
    );
  }

  doc_ele.innerHTML = dom.documentElement
    .querySelector("body")
    .outerHTML.replace("<body", "<div")
    .replace("</body>", "</div>");
  console.log(dom);
  // if(dom.documentElement.querySelector("body>div"))	{
  // 	doc_ele.insertAdjacentElement("beforeend",dom.documentElement.querySelector("body>div"));
  // } else if(dom.documentElement.querySelector("body>section")) {
  // 	doc_ele.insertAdjacentElement("beforeend",dom.documentElement.querySelector("body>section"));
  // } else {
  // 	doc_ele.insertAdjacentElement("beforeend",dom.documentElement.querySelector("body"));
  // }
  loading_show();
  if (exec_noticeboard_script) {
    let frame_script = document.createElement("script");
    frame_script.setAttribute("type", "text/javascript");
    frame_script.innerHTML =
      `
		request(\"` +
      notice_script_link +
      `\",\"notice_board_process_gs_request\",\"notices\",\"cont1\",\"\");
		`;
    document.getElementsByTagName("html")[0].appendChild(frame_script);
  }
  if (exec_video_style_script) {
    setTimeout(function () {
      loading_show();
      let video_drive_script = document.createElement("script");
      video_drive_script.setAttribute("type", "text/javascript");
      video_drive_script.innerHTML = `
			var i;
			var frame_videos=document.getElementsByClassName('request_google_video');
			for(i=0;i<frame_videos.length;i++)
			{
				frame_videos[i].style.height=(frame_videos[i].offsetWidth*9/16)+"px";
				frame_videos[i].style.visibility="visible";
				window.addEventListener("resize",function()
				{
					frame_videos[i].style.height=(frame_videos[i].offsetWidth*9/16)+"px";
				});
			}
			i=0;
			while(frame_elements[i])
			{
				frame_elements[i].classList.remove(\"request_google_video\");
				i++;
			}
			`;
      document.getElementsByTagName("html")[0].appendChild(video_drive_script);
    }, 500);
  }
  if (exec_frame_style_script == 1) {
    setTimeout(function () {
      var frame_script = document.createElement("script");
      frame_script.setAttribute("type", "text/javascript");
      frame_script.innerHTML = `
			var frame_elements=document.getElementsByClassName('external_frame_from_doc');
			var i;
			for(i=0;i<frame_elements.length;i++)
			{
				frame_elements[i].style.visibility="visible";
				frame_elements[i].style.height=(frame_elements[i].offsetWidth*4/3)+"px";
				window.addEventListener("resize",function()
				{
					if(frame_elements[i]){frame_elements[i].style.height=(frame_elements[i].offsetWidth*4/3)+"px";}
				});
			}
			i=0;
			while(frame_elements[i])
			{
				frame_elements[i].classList.remove(\"external_frame_from_doc\");
				i++;
			}
			`;
      document.getElementsByTagName("html")[0].appendChild(frame_script);
    }, 500);
  }
  if (exec_internal_page_script) {
    setTimeout(function () {
      var frame_script = document.createElement("script");
      frame_script.setAttribute("type", "text/javascript");
      frame_script.innerHTML = `
			var internal_page_elements=document.getElementsByClassName('internal_page');
			var i;
			for(i=0;i<internal_page_elements.length;i++)
			{
				let frame_conts=internal_page_elements[i].contentDocument;
				let html_txt=frame_conts.querySelector("#contents_page").innerHTML;
				//console.log(html_txt);
				frame_conts.querySelector("body").innerHTML=html_txt;
				internal_page_elements[i].style.height=(frame_conts.querySelector("html").offsetHeight)+"px";
				window.addEventListener("resize",function()
				{
					if(internal_page_elements[i]){internal_page_elements[i].style.height=(frame_conts.querySelector("html").offsetHeight)+"px";}
				});
			}
			i=internal_page_elements.length-1;
			while(i>=0) internal_page_elements[i--].classList.remove(\"internal_page\");
			`;
      document.getElementsByTagName("html")[0].appendChild(frame_script);
    }, 500);
  }
  if (exec_presentation_style_script) {
    setTimeout(function () {
      var frame_script = document.createElement("script");
      frame_script.setAttribute("type", "text/javascript");
      frame_script.innerHTML = `
			var presentation_elements=document.getElementsByClassName('external_presentation');
			var i;
			for(i=0;i<presentation_elements.length;i++)
			{
				presentation_elements[i].style.height=(presentation_elements[i].offsetWidth*569/960)+"px";
				window.addEventListener("resize",function()
				{
					if(presentation_elements[i]){presentation_elements[i].style.height=(presentation_elements[i].offsetWidth*569/960)+"px";}
				});
			}
			i=presentation_elements.length-1;
			while(presentation_elements[i])
			{
				presentation_elements[i].classList.remove(\"external_presentation\");
				i--;
			}
			`;
      document.getElementsByTagName("html")[0].appendChild(frame_script);
    }, 500);
  }
  if (exec_nested_doc_style_script == 1) {
    setTimeout(function () {
      var nested_doc_script = document.createElement("script");
      nested_doc_script.setAttribute("type", "text/javascript");
      nested_doc_script.innerHTML = `putins_load();`;
      document.getElementsByTagName("html")[0].appendChild(nested_doc_script);

      var nested_doc_style = document.createElement("style");
      nested_doc_style.setAttribute("type", "text/css");
      let nested_doc_style_HTML = "";
      for (let i = 0; i < doc_frame_no; i++) {
        nested_doc_style_HTML += "#doc_frame_" + i + " *,";
      }
      nested_doc_style_HTML = nested_doc_style_HTML.substring(
        0,
        nested_doc_style_HTML.length - 1
      );
      nested_doc_style_HTML +=
        "{padding: initial;border: initial;color: initial;}";
      for (let i = 0; i < doc_frame_no; i++) {
        nested_doc_style_HTML += "#doc_frame_" + i + " *[class^='c'],";
      }
      nested_doc_style_HTML = nested_doc_style_HTML.substring(
        0,
        nested_doc_style_HTML.length - 1
      );
      nested_doc_style_HTML +=
        "{margin: 0;padding: initial;text-indent: initial;border: initial;color: initial;font-size: initial;font-weight: initial;color: black;background-color: initial;text-decoration: initial;max-width: initial;line-height: initial;height: initial;}";
      nested_doc_style.innerHTML = nested_doc_style_HTML;
      if (
        !document
          .getElementsByTagName("head")[0]
          .innerText.includes(nested_doc_style_HTML)
      ) {
        document.getElementsByTagName("head")[0].appendChild(nested_doc_style);
      }
    }, 500);
  }

  setTimeout(function () {
    var frame_script = document.createElement("script");
    frame_script.setAttribute("type", "text/javascript");
    frame_script.innerHTML =
      `
		var inpage_a_elements=document.querySelectorAll("#` +
      doc_ele.getAttribute("id") +
      ` a");
		for(var i of inpage_a_elements)
		{
			i.setAttribute("target","_blank");
		}
		putins_select_load();
		`;
    document.getElementsByTagName("html")[0].appendChild(frame_script);
  }, 500);
  return;
}
function getSlidesData(url,slideShowId,timeInterval=3000,atag=false,labelOnImage=false) {
  console.log(slideShowId,timeInterval,atag,labelOnImage);
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    //console.log(this.responseText)
    if (this.readyState == 4 && this.status == 200) {
      processSlideShow(this.responseText,slideShowId,timeInterval,atag,labelOnImage);
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function processSlideShow(text,slideShowId,timeInterval,atag,labelOnImage){
  let Data=JSON.parse(text);
  Data.sort();
  //console.log(Data);
  let sshtml ='<div style="overflow:hidden; position:relative; margin:auto; padding:1px;">';

  sshtml +='<div class="slidesContainer" id="'+slideShowId+'_slidesContainer" style="display:flex; width:100%; height:100%; transition:transform 0.5s ease-in-out;">';

  for (let i = 1; i <= Data.length; i++) {
    //console.log("Data["+(i-1)+"][1]",Data[i-1][1]);
    sshtml +='<div class="slide" align=center style="position: relative; width: 100%; height: 100%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 2em; border: 1px solid navyblue;">';
    if(atag==true || atag=="true"){sshtml +='<a style="width:100%;height: 100%;" href="https://drive.google.com/uc?export=view&amp;id='+Data[i-1][1]+'" target="_blank">';}
    sshtml +='<img class="strechImage" src="https://drive.google.com/thumbnail?id='+Data[i-1][1]+'" alt="" style="border:1px solid #023BA2;zoom: 2;  display: block; margin: auto;  height: auto; max-height: 100%;  width: auto; max-width: 100%;">';
    if(labelOnImage==true || labelOnImage=="true"){
	let ImageLabel=Data[i-1][0].slice(0, Data[i-1][0].lastIndexOf(".")); if(ImageLabel.split("...").length>=2){ImageLabel=ImageLabel.split("...")[1];}
	ImageLabel=ImageLabel.replace("Dr. ","Dr.&nbsp;").replace("..",".&nbsp;");
	sshtml += '<div style="position: absolute;bottom: 5px;left: 50%;transform: translate(-50%, 0%);background-color:rgba(0, 0, 0, 0.2);color:white;" >'+ImageLabel+'</div>';
    };
    if(atag==true || atag=="true"){sshtml +='</a>';}
    sshtml +='</div>';
  }
  sshtml += '</div></div>';  //appendChild(slidesContainer);
  document.getElementById(slideShowId).innerHTML=sshtml;
  let currentIndex = 0;
  setInterval(() => {
    //currentIndex = (currentIndex) % Data.length;
    let containerId=slideShowId+"_slidesContainer"
    document.getElementById(containerId).style.transform = `translateX(-${(currentIndex++)%Data.length * 100}%)`;
  }, timeInterval);
}
