(function(){"use strict";var XModule={};XModule.Descriptor=function(){var Descriptor=function(element){this.element=element;this.update=_.bind(this.update,this)};Descriptor.prototype.onUpdate=function(callback){if(!this.callbacks){this.callbacks=[]}this.callbacks.push(callback)};Descriptor.prototype.update=function(){var data,callbacks,i,length;data=this.save();callbacks=this.callbacks;length=callbacks.length;$.each(callbacks,function(index,callback){callback(data)})};Descriptor.prototype.save=function(){return{}};return Descriptor}();this.XBlockToXModuleShim=function(runtime,element,initArgs){var moduleType,module;if(initArgs){moduleType=initArgs["xmodule-type"]}if(!moduleType){moduleType=$(element).data("type")}if(moduleType==="None"){return}try{module=new window[moduleType](element);if($(element).hasClass("xmodule_edit")){$(document).trigger("XModule.loaded.edit",[element,module])}if($(element).hasClass("xmodule_display")){$(document).trigger("XModule.loaded.display",[element,module])}return module}catch(error){console.error("Unable to load "+moduleType+": "+error.message)}};this.XModule=XModule}).call(this);(function(){var __hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child};this.MetadataOnlyEditingDescriptor=function(_super){__extends(MetadataOnlyEditingDescriptor,_super);function MetadataOnlyEditingDescriptor(element){this.element=element}MetadataOnlyEditingDescriptor.prototype.save=function(){return{data:null}};return MetadataOnlyEditingDescriptor}(XModule.Descriptor)}).call(this);(function(){var __hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child};this.VerticalDescriptor=function(_super){__extends(VerticalDescriptor,_super);function VerticalDescriptor(){return VerticalDescriptor.__super__.constructor.apply(this,arguments)}return VerticalDescriptor}(XModule.Descriptor)}).call(this);(function(){var __hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child};this.XMLEditingDescriptor=function(_super){__extends(XMLEditingDescriptor,_super);function XMLEditingDescriptor(element){this.element=element;this.edit_box=CodeMirror.fromTextArea($(".edit-box",this.element)[0],{mode:"xml",lineNumbers:true,lineWrapping:true})}XMLEditingDescriptor.prototype.save=function(){return{data:this.edit_box.getValue()}};return XMLEditingDescriptor}(XModule.Descriptor)}).call(this);(function(){var _this=this;this.TabsEditingDescriptor=function(){TabsEditingDescriptor.isInactiveClass="is-inactive";function TabsEditingDescriptor(element){var currentTab,_this=this;this.onSwitchEditor=function(e,firstTime,html_id){return TabsEditingDescriptor.prototype.onSwitchEditor.apply(_this,arguments)};this.element=element;this.$tabs=$(".tab",this.element);this.$content=$(".component-tab",this.element);this.element.find(".editor-tabs .tab").each(function(index,value){return $(value).on("click",_this.onSwitchEditor)});currentTab=this.$tabs.filter(".current");if(currentTab.length!==1){currentTab=this.$tabs.first()}this.html_id=this.$tabs.closest(".wrapper-comp-editor").data("html_id");currentTab.trigger("click",[true,this.html_id])}TabsEditingDescriptor.prototype.onSwitchEditor=function(e,firstTime,html_id){var $currentTarget,content_id,isInactiveClass,onSwitchFunction,previousTab;e.preventDefault();isInactiveClass=TabsEditingDescriptor.isInactiveClass;$currentTarget=$(e.currentTarget);if(!$currentTarget.hasClass("current")||firstTime===true){previousTab=null;this.$tabs.each(function(index,value){if($(value).hasClass("current")){return previousTab=$(value).data("tab_name")}});TabsEditingDescriptor.Model.updateValue(this.html_id,previousTab);onSwitchFunction=TabsEditingDescriptor.Model.modules[this.html_id].tabSwitch[$currentTarget.data("tab_name")];if($.isFunction(onSwitchFunction)){onSwitchFunction()}this.$tabs.removeClass("current");$currentTarget.addClass("current");content_id=$currentTarget.attr("href");return this.$content.addClass(isInactiveClass).filter(content_id).removeClass(isInactiveClass)}};TabsEditingDescriptor.prototype.save=function(){var current_tab;this.element.off("click",".editor-tabs .tab",this.onSwitchEditor);current_tab=this.$tabs.filter(".current").data("tab_name");return{data:TabsEditingDescriptor.Model.getValue(this.html_id,current_tab)}};TabsEditingDescriptor.prototype.setMetadataEditor=function(metadataEditor){return TabsEditingDescriptor.setMetadataEditor.apply(TabsEditingDescriptor,arguments)};TabsEditingDescriptor.prototype.getStorage=function(){return TabsEditingDescriptor.getStorage()};TabsEditingDescriptor.prototype.addToStorage=function(id,data){return TabsEditingDescriptor.addToStorage.apply(TabsEditingDescriptor,arguments)};TabsEditingDescriptor.Model={addModelUpdate:function(id,tabName,modelUpdateFunction){this.initialize(id);return this.modules[id].modelUpdate[tabName]=modelUpdateFunction},addOnSwitch:function(id,tabName,onSwitchFunction){this.initialize(id);return this.modules[id].tabSwitch[tabName]=onSwitchFunction},updateValue:function(id,tabName){var modelUpdateFunction;this.initialize(id);modelUpdateFunction=this.modules[id]["modelUpdate"][tabName];if($.isFunction(modelUpdateFunction)){return this.modules[id]["value"]=modelUpdateFunction()}},getValue:function(id,tabName){if(!this.modules[id]){return null}if($.isFunction(this.modules[id]["modelUpdate"][tabName])){return this.modules[id]["modelUpdate"][tabName]()}else{if(typeof this.modules[id]["value"]==="undefined"){return null}else{return this.modules[id]["value"]}}},modules:{},Storage:{},initialize:function(id){this.modules[id]=this.modules[id]||{};this.modules[id].tabSwitch=this.modules[id]["tabSwitch"]||{};return this.modules[id].modelUpdate=this.modules[id]["modelUpdate"]||{}}};TabsEditingDescriptor.setMetadataEditor=function(metadataEditor){return TabsEditingDescriptor.Model.Storage["MetadataEditor"]=metadataEditor};TabsEditingDescriptor.addToStorage=function(id,data){return TabsEditingDescriptor.Model.Storage[id]=data};TabsEditingDescriptor.getStorage=function(){return TabsEditingDescriptor.Model.Storage};return TabsEditingDescriptor}()}).call(this);(function(){var __hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child};this.SequenceDescriptor=function(_super){__extends(SequenceDescriptor,_super);function SequenceDescriptor(){return SequenceDescriptor.__super__.constructor.apply(this,arguments)}return SequenceDescriptor}(XModule.Descriptor)}).call(this);(function(){var _this=this,__hasProp={}.hasOwnProperty,__extends=function(child,parent){for(var key in parent){if(__hasProp.call(parent,key))child[key]=parent[key]}function ctor(){this.constructor=child}ctor.prototype=parent.prototype;child.prototype=new ctor;child.__super__=parent.prototype;return child};this.MarkdownEditingDescriptor=function(_super){__extends(MarkdownEditingDescriptor,_super);MarkdownEditingDescriptor.multipleChoiceTemplate="( ) "+gettext("incorrect")+"\n( ) "+gettext("incorrect")+"\n(x) "+gettext("correct")+"\n";MarkdownEditingDescriptor.checkboxChoiceTemplate="[x] "+gettext("correct")+"\n[ ] incorrect\n[x] correct\n";MarkdownEditingDescriptor.stringInputTemplate="= "+gettext("answer")+"\n";MarkdownEditingDescriptor.numberInputTemplate="= "+gettext("answer")+" +- 0.001%\n";MarkdownEditingDescriptor.selectTemplate="[["+gettext("incorrect")+", ("+gettext("correct")+"), "+gettext("incorrect")+"]]\n";MarkdownEditingDescriptor.headerTemplate=""+gettext("Header")+"\n=====\n";MarkdownEditingDescriptor.explanationTemplate="[explanation]\n"+gettext("Short explanation")+"\n[explanation]\n";function MarkdownEditingDescriptor(element){var _this=this;this.toggleCheatsheetVisibility=function(){return MarkdownEditingDescriptor.prototype.toggleCheatsheetVisibility.apply(_this,arguments)};this.toggleCheatsheet=function(e){return MarkdownEditingDescriptor.prototype.toggleCheatsheet.apply(_this,arguments)};this.onToolbarButton=function(e){return MarkdownEditingDescriptor.prototype.onToolbarButton.apply(_this,arguments)};this.onShowXMLButton=function(e){return MarkdownEditingDescriptor.prototype.onShowXMLButton.apply(_this,arguments)};this.element=element;if($(".markdown-box",this.element).length!==0){this.markdown_editor=CodeMirror.fromTextArea($(".markdown-box",element)[0],{lineWrapping:true,mode:null});this.setCurrentEditor(this.markdown_editor);this.element.on("click",".xml-tab",this.onShowXMLButton);this.element.on("click",".format-buttons button",this.onToolbarButton);this.element.on("click",".cheatsheet-toggle",this.toggleCheatsheet);$(this.element.find(".xml-box")).hide()}else{this.createXMLEditor()}}MarkdownEditingDescriptor.prototype.createXMLEditor=function(text){this.xml_editor=CodeMirror.fromTextArea($(".xml-box",this.element)[0],{mode:"xml",lineNumbers:true,lineWrapping:true});if(text){this.xml_editor.setValue(text)}this.setCurrentEditor(this.xml_editor);$(this.xml_editor.getWrapperElement()).toggleClass("CodeMirror-advanced");return this.xml_editor.refresh()};MarkdownEditingDescriptor.prototype.onShowXMLButton=function(e){e.preventDefault();if(this.cheatsheet&&this.cheatsheet.hasClass("shown")){this.cheatsheet.toggleClass("shown");this.toggleCheatsheetVisibility()}if(this.confirmConversionToXml()){this.createXMLEditor(MarkdownEditingDescriptor.markdownToXml(this.markdown_editor.getValue()));this.xml_editor.setCursor(0);return $(this.element.find(".editor-bar")).hide()}};MarkdownEditingDescriptor.prototype.confirmConversionToXml=function(){return confirm(gettext("If you use the Advanced Editor, this problem will be converted to XML and you will not be able to return to the Simple Editor Interface.\n\nProceed to the Advanced Editor and convert this problem to XML?"))};MarkdownEditingDescriptor.prototype.onToolbarButton=function(e){var revisedSelection,selection;e.preventDefault();selection=this.markdown_editor.getSelection();revisedSelection=null;switch($(e.currentTarget).attr("class")){case"multiple-choice-button":revisedSelection=MarkdownEditingDescriptor.insertMultipleChoice(selection);break;case"string-button":revisedSelection=MarkdownEditingDescriptor.insertStringInput(selection);break;case"number-button":revisedSelection=MarkdownEditingDescriptor.insertNumberInput(selection);break;case"checks-button":revisedSelection=MarkdownEditingDescriptor.insertCheckboxChoice(selection);break;case"dropdown-button":revisedSelection=MarkdownEditingDescriptor.insertSelect(selection);break;case"header-button":revisedSelection=MarkdownEditingDescriptor.insertHeader(selection);break;case"explanation-button":revisedSelection=MarkdownEditingDescriptor.insertExplanation(selection);break}if(revisedSelection!==null){this.markdown_editor.replaceSelection(revisedSelection);return this.markdown_editor.focus()}};MarkdownEditingDescriptor.prototype.toggleCheatsheet=function(e){var _this=this;e.preventDefault();if(!$(this.markdown_editor.getWrapperElement()).find(".simple-editor-cheatsheet")[0]){this.cheatsheet=$($("#simple-editor-cheatsheet").html());$(this.markdown_editor.getWrapperElement()).append(this.cheatsheet)}this.toggleCheatsheetVisibility();return setTimeout(function(){return _this.cheatsheet.toggleClass("shown")},10)};MarkdownEditingDescriptor.prototype.toggleCheatsheetVisibility=function(){return $(".modal-content").toggleClass("cheatsheet-is-shown")};MarkdownEditingDescriptor.prototype.setCurrentEditor=function(editor){if(this.current_editor){$(this.current_editor.getWrapperElement()).hide()}this.current_editor=editor;$(this.current_editor.getWrapperElement()).show();return $(this.current_editor).focus()};MarkdownEditingDescriptor.prototype.save=function(){this.element.off("click",".xml-tab",this.changeEditor);this.element.off("click",".format-buttons button",this.onToolbarButton);this.element.off("click",".cheatsheet-toggle",this.toggleCheatsheet);if(this.current_editor===this.markdown_editor){return{data:MarkdownEditingDescriptor.markdownToXml(this.markdown_editor.getValue()),metadata:{markdown:this.markdown_editor.getValue()}}}else{return{data:this.xml_editor.getValue(),nullout:["markdown"]}}};MarkdownEditingDescriptor.insertMultipleChoice=function(selectedText){return MarkdownEditingDescriptor.insertGenericChoice(selectedText,"(",")",MarkdownEditingDescriptor.multipleChoiceTemplate)};MarkdownEditingDescriptor.insertCheckboxChoice=function(selectedText){return MarkdownEditingDescriptor.insertGenericChoice(selectedText,"[","]",MarkdownEditingDescriptor.checkboxChoiceTemplate)};MarkdownEditingDescriptor.insertGenericChoice=function(selectedText,choiceStart,choiceEnd,template){var cleanSelectedText,line,lines,revisedLines,_i,_len;if(selectedText.length>0){cleanSelectedText=selectedText.replace(/\n+/g,"\n").replace(/\n$/,"");lines=cleanSelectedText.split("\n");revisedLines="";for(_i=0,_len=lines.length;_i<_len;_i++){line=lines[_i];revisedLines+=choiceStart;if(/^\s*x\s+(\S)/i.test(line)){line=line.replace(/^\s*x\s+(\S)/i,"$1");revisedLines+="x"}else{revisedLines+=" "}revisedLines+=choiceEnd+" "+line+"\n"}return revisedLines}else{return template}};MarkdownEditingDescriptor.insertStringInput=function(selectedText){return MarkdownEditingDescriptor.insertGenericInput(selectedText,"= ","",MarkdownEditingDescriptor.stringInputTemplate)};MarkdownEditingDescriptor.insertNumberInput=function(selectedText){return MarkdownEditingDescriptor.insertGenericInput(selectedText,"= ","",MarkdownEditingDescriptor.numberInputTemplate)};MarkdownEditingDescriptor.insertSelect=function(selectedText){return MarkdownEditingDescriptor.insertGenericInput(selectedText,"[[","]]",MarkdownEditingDescriptor.selectTemplate)};MarkdownEditingDescriptor.insertHeader=function(selectedText){return MarkdownEditingDescriptor.insertGenericInput(selectedText,"","\n====\n",MarkdownEditingDescriptor.headerTemplate)};MarkdownEditingDescriptor.insertExplanation=function(selectedText){return MarkdownEditingDescriptor.insertGenericInput(selectedText,"[explanation]\n","\n[explanation]",MarkdownEditingDescriptor.explanationTemplate)};MarkdownEditingDescriptor.insertGenericInput=function(selectedText,lineStart,lineEnd,template){if(selectedText.length>0){return lineStart+selectedText+lineEnd}else{return template}};MarkdownEditingDescriptor.markdownToXml=function(markdown){var toXml;toXml=function(markdown){var xml=markdown,i,splits,scriptFlag;xml=xml.replace(/\r\n/g,"\n");xml=xml.replace(/(^.*?$)(?=\n\=\=+$)/gm,'<h3 class="hd hd-2 problem-header">$1</h3>');xml=xml.replace(/\n^\=\=+$/gm,"");var demandhints="";xml=xml.replace(/(^\s*\|\|.*?\|\|\s*$\n?)+/gm,function(match){var options=match.split("\n");for(i=0;i<options.length;i+=1){var inner=/\s*\|\|(.*?)\|\|/.exec(options[i]);if(inner){demandhints+="  <hint>"+inner[1].trim()+"</hint>\n"}}return""});xml=xml.replace(/{{(.|\n)*?}}/gm,function(match){return match.replace(/\r?\n( |\t)*/g," ")});extractHint=function(text,detectParens){var curly=/\s*{{(.*?)}}/.exec(text);var hint="";var label="";var parens=false;var labelassign="";if(curly){text=text.replace(curly[0],"");hint=curly[1].trim();var labelmatch=/^(.*?)::/.exec(hint);if(labelmatch){hint=hint.replace(labelmatch[0],"").trim();label=labelmatch[1].trim();labelassign=' label="'+label+'"'}}if(detectParens){if(text.length>=2&&text[0]=="("&&text[text.length-1]==")"){text=text.substring(1,text.length-1);parens=true}}return{nothint:text,hint:hint,label:label,parens:parens,labelassign:labelassign}};xml=xml.replace(/\[\[((.|\n)+?)\]\]/g,function(match,group1){if(match.indexOf("\n")==-1){var options=group1.split(/\,\s*/g);var optiontag='  <optioninput options="(';for(i=0;i<options.length;i+=1){optiontag+="'"+options[i].replace(/(?:^|,)\s*\((.*?)\)\s*(?:$|,)/g,"$1")+"'"+(i<options.length-1?",":"")}optiontag+=')" correct="';var correct=/(?:^|,)\s*\((.*?)\)\s*(?:$|,)/g.exec(group1);if(correct){optiontag+=correct[1]}optiontag+='">';return"\n<optionresponse>\n"+optiontag+"</optioninput>\n</optionresponse>\n\n"}var lines=group1.split("\n");var optionlines="";for(i=0;i<lines.length;i++){var line=lines[i].trim();if(line.length>0){var textHint=extractHint(line,true);var correctstr=' correct="'+(textHint.parens?"True":"False")+'"';var hintstr="";if(textHint.hint){var label=textHint.label;if(label){label=' label="'+label+'"'}hintstr=" <optionhint"+label+">"+textHint.hint+"</optionhint>"}optionlines+="    <option"+correctstr+">"+textHint.nothint+hintstr+"</option>\n"}}return"\n<optionresponse>\n  <optioninput>\n"+optionlines+"  </optioninput>\n</optionresponse>\n\n"});xml=xml.replace(/(^\s*\(.{0,3}\).*?$\n*)+/gm,function(match,p){var choices="";var shuffle=false;var options=match.split("\n");for(var i=0;i<options.length;i++){options[i]=options[i].trim();if(options[i].length>0){var value=options[i].split(/^\s*\(.{0,3}\)\s*/)[1];var inparens=/^\s*\((.{0,3})\)\s*/.exec(options[i])[1];var correct=/x/i.test(inparens);var fixed="";if(/@/.test(inparens)){fixed=' fixed="true"'}if(/!/.test(inparens)){shuffle=true}var hint=extractHint(value);if(hint.hint){value=hint.nothint;value=value+" <choicehint"+hint.labelassign+">"+hint.hint+"</choicehint>"}choices+='    <choice correct="'+correct+'"'+fixed+">"+value+"</choice>\n"}}var result="<multiplechoiceresponse>\n";if(shuffle){result+='  <choicegroup type="MultipleChoice" shuffle="true">\n'}else{result+='  <choicegroup type="MultipleChoice">\n'}result+=choices;result+="  </choicegroup>\n";result+="</multiplechoiceresponse>\n\n";return result});xml=xml.replace(/(^\s*((\[.?\])|({{.*?}})).*?$\n*)+/gm,function(match){var groupString="<choiceresponse>\n",options,value,correct;groupString+="  <checkboxgroup>\n";options=match.split("\n");endHints="";for(i=0;i<options.length;i+=1){if(options[i].trim().length>0){var abhint=/^\s*{{\s*\(\((.*?)\)\)(.*?)}}/.exec(options[i]);if(abhint){var hintbody=abhint[2];hintbody=hintbody.replace("&lf;","\n").trim();endHints+='    <compoundhint value="'+abhint[1].trim()+'">'+hintbody+"</compoundhint>\n";continue}value=options[i].split(/^\s*\[.?\]\s*/)[1];correct=/^\s*\[x\]/i.test(options[i]);hints="";var hint=extractHint(value);if(hint.hint){var inner="{"+hint.hint+"}";var select=/{\s*(s|selected):((.|\n)*?)}/i.exec(inner);if(select){hints+='\n      <choicehint selected="true">'+select[2].trim()+"</choicehint>"}var select=/{\s*(u|unselected):((.|\n)*?)}/i.exec(inner);if(select){hints+='\n      <choicehint selected="false">'+select[2].trim()+"</choicehint>"}if(hints){value=hint.nothint}}groupString+='    <choice correct="'+correct+'">'+value+hints+"</choice>\n"}}groupString+=endHints;groupString+="  </checkboxgroup>\n";groupString+="</choiceresponse>\n\n";return groupString});xml=xml.replace(/(^s?\=\s*(.*?$)(\n*(or|not)\=\s*(.*?$))*)+/gm,function(match,p){var answersList=p.split("\n"),processNumericalResponse=function(value){value=value.replace(/^\=\s*/,"");var params,answer,string;var textHint=extractHint(value);var hintLine="";if(textHint.hint){value=textHint.nothint;hintLine="  <correcthint"+textHint.labelassign+">"+textHint.hint+"</correcthint>\n"}if(_.contains(["[","("],value[0])&&_.contains(["]",")"],value[value.length-1])){string='<numericalresponse answer="'+value+'">\n';string+="  <formulaequationinput />\n";string+=hintLine;string+="</numericalresponse>\n\n";return string}if(isNaN(parseFloat(value))){return false}params=/(.*?)\+\-\s*(.*?$)/.exec(value);if(params){answer=params[1].replace(/\s+/g,"");string='<numericalresponse answer="'+answer+'">\n';string+='  <responseparam type="tolerance" default="'+params[2]+'" />\n'}else{answer=value.replace(/\s+/g,"");string='<numericalresponse answer="'+answer+'">\n'}string+="  <formulaequationinput />\n";string+=hintLine;string+="</numericalresponse>\n\n";return string},processStringResponse=function(values){var firstAnswer=values.shift(),string;firstAnswer=firstAnswer.replace(/^s?\=\s*/,"");var textHint=extractHint(firstAnswer);firstAnswer=textHint.nothint;var typ=' type="ci"';if(firstAnswer[0]=="|"){typ=' type="ci regexp"';firstAnswer=firstAnswer.slice(1).trim()}string='<stringresponse answer="'+firstAnswer+'"'+typ+" >\n";if(textHint.hint){string+="  <correcthint"+textHint.labelassign+">"+textHint.hint+"</correcthint>\n"}for(i=0;i<values.length;i+=1){var textHint=extractHint(values[i]);var notMatch=/^not\=\s*(.*)/.exec(textHint.nothint);if(notMatch){string+='  <stringequalhint answer="'+notMatch[1]+'"'+textHint.labelassign+">"+textHint.hint+"</stringequalhint>\n";continue}var orMatch=/^or\=\s*(.*)/.exec(textHint.nothint);if(orMatch){string+='  <additional_answer answer="'+orMatch[1]+'">';if(textHint.hint){string+="<correcthint"+textHint.labelassign+">"+textHint.hint+"</correcthint>"}string+="</additional_answer>\n"}}string+='  <textline size="20"/>\n</stringresponse>\n\n';return string};return processNumericalResponse(answersList[0])||processStringResponse(answersList)});xml=xml.replace(/\[explanation\]\n?([^\]]*)\[\/?explanation\]/gim,function(match,p1){var selectString='<solution>\n<div class="detailed-solution">\n'+gettext("Explanation")+"\n\n"+p1+"\n</div>\n</solution>";return selectString});var split=xml.split("\n");var new_xml=[];var line,i,curlabel,prevlabel="";var didinput=false;for(i=0;i<split.length;i++){line=split[i];if(match=line.match(/>>(.*)<</)){curlabel=match[1].replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");line=line.replace(/>>|<</g,"")}else if(line.match(/<\w+response/)&&didinput&&curlabel==prevlabel){curlabel="";didinput=false}else if(line.match(/<(textline|optioninput|formulaequationinput|choicegroup|checkboxgroup)/)&&curlabel!=""&&curlabel!=undefined){line=line.replace(/<(textline|optioninput|formulaequationinput|choicegroup|checkboxgroup)/,'<$1 label="'+curlabel+'"');didinput=true;prevlabel=curlabel}new_xml.push(line)}xml=new_xml.join("\n");xml=xml.replace(/\[code\]\n?([^\]]*)\[\/?code\]/gim,function(match,p1){var selectString="<pre><code>\n"+p1+"</code></pre>";return selectString});splits=xml.split(/(\<\/?(?:script|pre).*?\>)/g);scriptFlag=false;for(i=0;i<splits.length;i+=1){if(/\<(script|pre)/.test(splits[i])){scriptFlag=true}if(!scriptFlag){splits[i]=splits[i].replace(/(^(?!\s*\<|$).*$)/gm,"<p>$1</p>")}if(/\<\/(script|pre)/.test(splits[i])){scriptFlag=false}}xml=splits.join("");xml=xml.replace(/\n\n\n/g,"\n");if(demandhints){demandhints="\n<demandhint>\n"+demandhints+"</demandhint>"}xml="<problem>\n"+xml+demandhints+"\n</problem>";return xml};return toXml(markdown)};return MarkdownEditingDescriptor}(XModule.Descriptor)}).call(this);(function(){var _this=this;this.HTMLEditingDescriptor=function(){var CUSTOM_FONTS,STANDARD_FONTS,_getFonts;CUSTOM_FONTS="Default='Open Sans', Verdana, Arial, Helvetica, sans-serif;";STANDARD_FONTS="Andale Mono=andale mono,times;"+"Arial=arial,helvetica,sans-serif;"+"Arial Black=arial black,avant garde;"+"Book Antiqua=book antiqua,palatino;"+"Comic Sans MS=comic sans ms,sans-serif;"+"Courier New=courier new,courier;"+"Georgia=georgia,palatino;"+"Helvetica=helvetica;"+"Impact=impact,chicago;"+"Symbol=symbol;"+"Tahoma=tahoma,arial,helvetica,sans-serif;"+"Terminal=terminal,monaco;"+"Times New Roman=times new roman,times;"+"Trebuchet MS=trebuchet ms,geneva;"+"Verdana=verdana,geneva;"+"Webdings=webdings;"+"Wingdings=wingdings,zapf dingbats";_getFonts=function(){return CUSTOM_FONTS+STANDARD_FONTS};function HTMLEditingDescriptor(element){var tiny_mce_css_links,_this=this;this.initInstanceCallback=function(visualEditor){return HTMLEditingDescriptor.prototype.initInstanceCallback.apply(_this,arguments)};this.saveCodeEditor=function(source){return HTMLEditingDescriptor.prototype.saveCodeEditor.apply(_this,arguments)};this.showCodeEditor=function(source){return HTMLEditingDescriptor.prototype.showCodeEditor.apply(_this,arguments)};this.saveLink=function(data){return HTMLEditingDescriptor.prototype.saveLink.apply(_this,arguments)};this.editLink=function(data){return HTMLEditingDescriptor.prototype.editLink.apply(_this,arguments)};this.saveImage=function(data){return HTMLEditingDescriptor.prototype.saveImage.apply(_this,arguments)};this.editImage=function(data){return HTMLEditingDescriptor.prototype.editImage.apply(_this,arguments)};this.setupTinyMCE=function(ed){return HTMLEditingDescriptor.prototype.setupTinyMCE.apply(_this,arguments)};this.element=element;this.base_asset_url=this.element.find("#editor-tab").data("base-asset-url");this.editor_choice=this.element.find("#editor-tab").data("editor");if(this.base_asset_url===void 0){this.base_asset_url=null}this.advanced_editor=CodeMirror.fromTextArea($(".edit-box",this.element)[0],{mode:"text/html",lineNumbers:true,lineWrapping:true});if(this.editor_choice==="visual"){this.$advancedEditorWrapper=$(this.advanced_editor.getWrapperElement());this.$advancedEditorWrapper.addClass("is-inactive");tiny_mce_css_links=[];$("link[rel=stylesheet][href*='tinymce']").filter("[href*='content']").each(function(){tiny_mce_css_links.push($(this).attr("href"))});tinyMCE.baseURL=""+baseUrl+"/js/vendor/tinymce/js/tinymce";tinyMCE.suffix=".min";this.tiny_mce_textarea=$(".tiny-mce",this.element).tinymce({script_url:""+baseUrl+"/js/vendor/tinymce/js/tinymce/tinymce.full.min.js",font_formats:_getFonts(),theme:"modern",skin:"studio-tmce4",schema:"html5",convert_urls:false,directionality:$(".wrapper-view, .window-wrap").prop("dir"),content_css:tiny_mce_css_links.join(", "),formats:{code:{inline:"code"}},visual:false,plugins:"textcolor, link, image, codemirror",codemirror:{path:""+baseUrl+"/js/vendor"},image_advtab:true,toolbar:"formatselect | fontselect | bold italic underline forecolor wrapAsCode | bullist numlist outdent indent blockquote | link unlink image | code",block_formats:interpolate("%(paragraph)s=p;%(preformatted)s=pre;%(heading3)s=h3;%(heading4)s=h4;%(heading5)s=h5;%(heading6)s=h6",{paragraph:gettext("Paragraph"),preformatted:gettext("Preformatted"),heading3:gettext("Heading 3"),heading4:gettext("Heading 4"),heading5:gettext("Heading 5"),heading6:gettext("Heading 6")},true),width:"100%",height:"400px",menubar:false,statusbar:false,valid_children:"+body[style]",valid_elements:"*[*]",extended_valid_elements:"*[*]",invalid_elements:"",setup:this.setupTinyMCE,init_instance_callback:this.initInstanceCallback,browser_spellcheck:true});tinymce.addI18n("en",{"Add to Dictionary":gettext("Add to Dictionary"),Advanced:gettext("Advanced"),"Align center":gettext("Align center"),"Align left":gettext("Align left"),"Align right":gettext("Align right"),Alignment:gettext("Alignment"),"Alternative source":gettext("Alternative source"),Anchor:gettext("Anchor"),Anchors:gettext("Anchors"),Author:gettext("Author"),"Background color":gettext("Background color"),Blockquote:gettext("Blockquote"),Blocks:gettext("Blocks"),Body:gettext("Body"),Bold:gettext("Bold"),"Border color":gettext("Border color"),Border:gettext("Border"),Bottom:gettext("Bottom"),"Bullet list":gettext("Bullet list"),Cancel:gettext("Cancel"),Caption:gettext("Caption"),"Cell padding":gettext("Cell padding"),"Cell properties":gettext("Cell properties"),"Cell spacing":gettext("Cell spacing"),"Cell type":gettext("Cell type"),Cell:gettext("Cell"),Center:gettext("Center"),Circle:gettext("Circle"),"Clear formatting":gettext("Clear formatting"),Close:gettext("Close"),"Code block":gettext("Code block"),Code:gettext("Code"),Color:gettext("Color"),Cols:gettext("Cols"),"Column group":gettext("Column group"),Column:gettext("Column"),"Constrain proportions":gettext("Constrain proportions"),"Copy row":gettext("Copy row"),Copy:gettext("Copy"),"Could not find the specified string.":gettext("Could not find the specified string."),"Custom color":gettext("Custom color"),"Custom...":gettext("Custom..."),"Cut row":gettext("Cut row"),Cut:gettext("Cut"),"Decrease indent":gettext("Decrease indent"),Default:gettext("Default"),"Delete column":gettext("Delete column"),"Delete row":gettext("Delete row"),"Delete table":gettext("Delete table"),Description:gettext("Description"),Dimensions:gettext("Dimensions"),Disc:gettext("Disc"),Div:gettext("Div"),"Document properties":gettext("Document properties"),"Edit HTML":gettext("Edit HTML"),Edit:gettext("Edit"),Embed:gettext("Embed"),Emoticons:gettext("Emoticons"),Encoding:gettext("Encoding"),File:gettext("File"),"Find and replace":gettext("Find and replace"),"Find next":gettext("Find next"),"Find previous":gettext("Find previous"),Find:gettext("Find"),Finish:gettext("Finish"),"Font Family":gettext("Font Family"),"Font Sizes":gettext("Font Sizes"),Footer:gettext("Footer"),Format:gettext("Format"),Formats:gettext("Formats"),Fullscreen:gettext("Fullscreen"),General:gettext("General"),"H Align":gettext("H Align"),"Header 1":gettext("Header 1"),"Header 2":gettext("Header 2"),"Header 3":gettext("Header 3"),"Header 4":gettext("Header 4"),"Header 5":gettext("Header 5"),"Header 6":gettext("Header 6"),"Header cell":gettext("Header cell"),Header:gettext("Header"),Headers:gettext("Headers"),"Heading 1":gettext("Heading 1"),"Heading 2":gettext("Heading 2"),"Heading 3":gettext("Heading 3"),"Heading 4":gettext("Heading 4"),"Heading 5":gettext("Heading 5"),"Heading 6":gettext("Heading 6"),Headings:gettext("Headings"),Height:gettext("Height"),"Horizontal line":gettext("Horizontal line"),"Horizontal space":gettext("Horizontal space"),"HTML source code":gettext("HTML source code"),"Ignore all":gettext("Ignore all"),Ignore:gettext("Ignore"),"Image description":gettext("Image description"),"Increase indent":gettext("Increase indent"),Inline:gettext("Inline"),"Insert column after":gettext("Insert column after"),"Insert column before":gettext("Insert column before"),"Insert date/time":gettext("Insert date/time"),"Insert image":gettext("Insert image"),"Insert link":gettext("Insert link"),"Insert row after":gettext("Insert row after"),"Insert row before":gettext("Insert row before"),"Insert table":gettext("Insert table"),"Insert template":gettext("Insert template"),"Insert video":gettext("Insert video"),Insert:gettext("Insert"),"Insert/edit image":gettext("Insert/edit image"),"Insert/edit link":gettext("Insert/edit link"),"Insert/edit video":gettext("Insert/edit video"),Italic:gettext("Italic"),Justify:gettext("Justify"),Keywords:gettext("Keywords"),"Left to right":gettext("Left to right"),Left:gettext("Left"),"Lower Alpha":gettext("Lower Alpha"),"Lower Greek":gettext("Lower Greek"),"Lower Roman":gettext("Lower Roman"),"Match case":gettext("Match case"),"Merge cells":gettext("Merge cells"),Middle:gettext("Middle"),Name:gettext("Name"),"New document":gettext("New document"),"New window":gettext("New window"),Next:gettext("Next"),"No color":gettext("No color"),"Nonbreaking space":gettext("Nonbreaking space"),None:gettext("None"),"Numbered list":gettext("Numbered list"),Ok:gettext("Ok"),OK:gettext("OK"),"Page break":gettext("Page break"),Paragraph:gettext("Paragraph"),"Paste as text":gettext("Paste as text"),"Paste is now in plain text mode. Contents will now be pasted as plain text until you toggle this option off.":gettext("Paste is now in plain text mode. Contents will now be pasted as plain text until you toggle this option off."),"Paste row after":gettext("Paste row after"),"Paste row before":gettext("Paste row before"),"Paste your embed code below:":gettext("Paste your embed code below:"),Paste:gettext("Paste"),Poster:gettext("Poster"),Pre:gettext("Pre"),Prev:gettext("Prev"),Preview:gettext("Preview"),
Print:gettext("Print"),Redo:gettext("Redo"),"Remove link":gettext("Remove link"),"Replace all":gettext("Replace all"),"Replace all":gettext("Replace all"),"Replace with":gettext("Replace with"),Replace:gettext("Replace"),Replace:gettext("Replace"),"Restore last draft":gettext("Restore last draft"),"Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help":gettext("Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"),"Right to left":gettext("Right to left"),Right:gettext("Right"),Robots:gettext("Robots"),"Row group":gettext("Row group"),"Row properties":gettext("Row properties"),"Row type":gettext("Row type"),Row:gettext("Row"),Rows:gettext("Rows"),Save:gettext("Save"),Scope:gettext("Scope"),"Select all":gettext("Select all"),"Show blocks":gettext("Show blocks"),"Show invisible characters":gettext("Show invisible characters"),"Source code":gettext("Source code"),Source:gettext("Source"),"Special character":gettext("Special character"),Spellcheck:gettext("Spellcheck"),"Split cell":gettext("Split cell"),Square:gettext("Square"),"Start search":gettext("Start search"),Strikethrough:gettext("Strikethrough"),Style:gettext("Style"),Subscript:gettext("Subscript"),Superscript:gettext("Superscript"),"Table properties":gettext("Table properties"),Table:gettext("Table"),Target:gettext("Target"),Templates:gettext("Templates"),"Text color":gettext("Text color"),"Text to display":gettext("Text to display"),"The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?":gettext("The URL you entered seems to be an email address. Do you want to add the required mailto: prefix?"),"The URL you entered seems to be an external link. Do you want to add the required http:// prefix?":gettext("The URL you entered seems to be an external link. Do you want to add the required http:// prefix?"),Title:gettext("Title"),Tools:gettext("Tools"),Top:gettext("Top"),Underline:gettext("Underline"),Undo:gettext("Undo"),"Upper Alpha":gettext("Upper Alpha"),"Upper Roman":gettext("Upper Roman"),Url:gettext("Url"),"V Align":gettext("V Align"),"Vertical space":gettext("Vertical space"),View:gettext("View"),"Visual aids":gettext("Visual aids"),"Whole words":gettext("Whole words"),Width:gettext("Width"),"Words: {0}":gettext("Words: {0}"),"You have unsaved changes are you sure you want to navigate away?":gettext("You have unsaved changes are you sure you want to navigate away?"),"Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.":gettext("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.")})}}HTMLEditingDescriptor.prototype.setupTinyMCE=function(ed){ed.addButton("wrapAsCode",{title:"Code block",image:""+baseUrl+"/images/ico-tinymce-code.png",onclick:function(){return ed.formatter.toggle("code")}});this.visualEditor=ed;ed.on("SaveImage",this.saveImage);ed.on("EditImage",this.editImage);ed.on("SaveLink",this.saveLink);ed.on("EditLink",this.editLink);ed.on("ShowCodeEditor",this.showCodeEditor);return ed.on("SaveCodeEditor",this.saveCodeEditor)};HTMLEditingDescriptor.prototype.editImage=function(data){if(data["src"]){return data["src"]=rewriteStaticLinks(data["src"],this.base_asset_url,"/static/")}};HTMLEditingDescriptor.prototype.saveImage=function(data){if(data["src"]){return data["src"]=rewriteStaticLinks(data["src"],"/static/",this.base_asset_url)}};HTMLEditingDescriptor.prototype.editLink=function(data){if(data["href"]){return data["href"]=rewriteStaticLinks(data["href"],this.base_asset_url,"/static/")}};HTMLEditingDescriptor.prototype.saveLink=function(data){if(data["href"]){return data["href"]=rewriteStaticLinks(data["href"],"/static/",this.base_asset_url)}};HTMLEditingDescriptor.prototype.showCodeEditor=function(source){var content;content=rewriteStaticLinks(source.content,this.base_asset_url,"/static/");return source.content=content};HTMLEditingDescriptor.prototype.saveCodeEditor=function(source){var content;content=rewriteStaticLinks(source.content,"/static/",this.base_asset_url);return source.content=content};HTMLEditingDescriptor.prototype.initInstanceCallback=function(visualEditor){visualEditor.setContent(rewriteStaticLinks(visualEditor.getContent({no_events:1}),"/static/",this.base_asset_url));this.starting_content=visualEditor.getContent({format:"raw",no_events:1});return visualEditor.focus()};HTMLEditingDescriptor.prototype.getVisualEditor=function(){return this.visualEditor};HTMLEditingDescriptor.prototype.save=function(){var raw_content,text,visualEditor;text=void 0;if(this.editor_choice==="visual"){visualEditor=this.getVisualEditor();raw_content=visualEditor.getContent({format:"raw",no_events:1});if(this.starting_content!==raw_content){text=rewriteStaticLinks(visualEditor.getContent({no_events:1}),this.base_asset_url,"/static/")}}if(text===void 0){text=this.advanced_editor.getValue()}return{data:text}};return HTMLEditingDescriptor}()}).call(this);
