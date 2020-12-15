	
var base_url = window.location.origin;
var wor = $('#content').attr('data-wellorder-reference');

		var lang_txt = {
			"upload_button":"Upload csv file",
			"back_button":"Go back to CCS",
			"send_button":"Send wells to CCS",
			"loaded_cards_title":"Current wells",
			"connections":"Lines",
			"wells":"Wells",
			"total":"Total",
			"avg_height":"avg. height",
			"desc":"Description",
			"dia":"Diameter",
			"height_ground":"Height ground",
			"height_water":"Height water",
			"height":"Height",
			"height_deposit":"Deposit",
			"angle":"Angle",
			"outlet":"Outlet",
			"inlet":"Inlet",
			"wanted":"Wanted",
			"cards":"Cards",
			"telescope":"Telescope",
			"lid":"Lid",
			"frame":"Frame",
			"frame_parts":"Frame parts",
			"water_lock":"Water lock",
			"base":"Base",
			"addons":"Addons",
			"others":"Others",
			"sure":"Are you sure?",
			"model":"Model",
			"not_found":"Not found",
			"missing_file":"Missing file!",
			"file_not_supported":"File type not supported!",
			"file_unknown":"File type unknown!",
			"upload_file_error":"Upload a file first!",
			"duplicate_id":"Duplicate id!",
			"connection_error":"Connection error, try again in a second.",
			"error":"Error"
		};

	var auth_token = $('#content').attr('data-authenticity-token');

		var data_wrap = '<div id="import_data">'+
							'<div id="button_wrap">'+
								'<div class="upload_button"><button id="file_upload_button">'+lang_txt["upload_button"]+'</button><input type="file" id="file_upload" /></div>'+
								'<a href="'+base_url+'/heavyuser_wellorders/'+wor+'" id="return_button">'+lang_txt["back_button"]+'</a><a href="#" id="send_codes">'+lang_txt["send_button"]+'</a>'+
							'</div>'+
						'</div>'+
						'<div id="imported_content"><div class="map_content"></div><div class="loaded_cards"></div><div class="import_cards"></div></div>'+
						'<div id="menu_items"></div>'+
						'<span class="spinner"></span>';

	$('#csv_importer').before('<div class="hidden" id="zoning_token">'+auth_token+'</div>');
	$('#csv_importer').html(data_wrap);

	var spinner = $('.spinner');
	var map_content = $('.map_content');
	var loaded_cards = $('.loaded_cards');
	var import_cards = $('.import_cards');
	var menu_items = $('#menu_items');
	var helper = null;
	var api;

	var old_wells = [];

	(function () {
		window.api = ZoningData();
	})();

	api.categories(function(o) {
		console.log(o);
		helper = api.category_helper(o.categories);
	}, function(o) {
		console.log('Failure');
		console.log(o);
	});
  
	api.wellgroups(function(o) {

		var tags = '';

		o.sort((a, b) => a.name.localeCompare(b.name))
		
			$.each(o, function(i, item) {
				if(o[i].disabled !== true){
					tags += '<a href="#" class="tag" data-type="'+o[i].product_family.toUpperCase()+'" data-identifier="'+o[i].identifier+'">'+o[i].name+'</a>';
				}
			});

			menu_items.append(tags);

		}, function(o) {
			console.log('Failure');
	});

    api.wellorder_reference(
        wor,
        function(o) {
            console.log(o);
			zoning_data = o.zoning_plan;
			old_wells = o.wellorders;
            if(o.wellorders.length > 0){setTimeout(function(){reload_order(o.wellorders);}, 1500);}
        }, function(o) {
              console.log('Failure');
              console.log(o);
        }
    );


	function reload_order(order_json) {

		loaded_cards.append('<h4>'+lang_txt["loaded_cards_title"]+'</h4>');
		
		try {
			var order = order_json;
				
			for (i = 0; i < order.length; i++) {

			var obj_id_full = order[i].identifier,
				obj_wellgroup = order[i].wellgroup,
				obj_title = $('.tag[data-identifier="'+obj_wellgroup+'"]').text();
 
				loaded_cards.append('<div class="preloaded_card" data-id="'+obj_id_full+'"><span>'+obj_id_full+'</span> '+obj_title+'</div>');

			}

		} 

		catch(err) {
			
			$('#send_codes').remove();
			alert(lang_txt["error"]);
			
		}

	}



function ScrollZoom(container,max_scale,factor){
    var target = container.children().first()
    var size = {w:target.width(),h:target.height()}
    var pos = {x:0,y:0}
    var zoom_target = {x:0,y:0}
    var zoom_point = {x:0,y:0}
    var scale = 1
	
    target.css('transform-origin','0 0')
    target.on("mousewheel DOMMouseScroll",scrolled)

    function scrolled(e){
        var offset = container.offset()
        zoom_point.x = (e.pageX - offset.left);
        zoom_point.y = (e.pageY - offset.top);

        e.preventDefault();
        var delta = e.delta || e.originalEvent.wheelDelta;
        if (delta === undefined) {
          delta = e.originalEvent.detail;
        }
        delta = Math.max(-1,Math.min(1,delta))

        zoom_target.x = (zoom_point.x - pos.x)/scale
        zoom_target.y = (zoom_point.y - pos.y)/scale

        scale += delta*factor * scale
        scale = Math.max(1,Math.min(max_scale,scale))

        pos.x = -zoom_target.x * scale + zoom_point.x
        pos.y = -zoom_target.y * scale + zoom_point.y

        if(pos.x>0)
            pos.x = 0
        if(pos.x+size.w*scale<size.w)
            pos.x = -size.w*(scale-1)
        if(pos.y>0)
            pos.y = 0
         if(pos.y+size.h*scale<size.h)
            pos.y = -size.h*(scale-1)

        update()
    }

    function update(){

        target.css('transform','translate('+(pos.x)+'px,'+(pos.y)+'px) scale('+scale+','+scale+')')
		
		if(scale < 2){
			target.attr('data-scale', 1);
		} else if(scale < 3){
			target.attr('data-scale', 2);
		} else {
			target.attr('data-scale', 3);
		}
    }
}




	$(document).on('click', '#send_codes', function(e) {
		e.preventDefault();
		var check = confirm(lang_txt["sure"]);
		if (check == true) {
			final_code();
		}
	});
	
	$(document).on('click', '.checkbox_content .tag', function(e) {
		e.preventDefault();

		var clicked = $(this),
			parent_frame = clicked.parents('.card');

		parent_frame.attr('data-frame_id', clicked.attr('data-identifier'));
		parent_frame.attr('data-frame_type', clicked.attr('data-type'));
		parent_frame.attr('data-frame_name', clicked.text());
		create_menu_from_source(parent_frame);
		
		build_map();

	});
	

	function strip_to_15_chars(text) {
		return text.substring(0, 15);
	}
	
	$(document).on('input change', '.final_well_id', function(e) {

		var current_input = $(this),
			parent_frame = current_input.parents('.card');

		var stripped_val = strip_to_15_chars(current_input.val());
		
		current_input.val(stripped_val);
		
		parent_frame.attr('data-well_name', stripped_val);
		build_map();

	});



	function uploadFile () {}; 

	uploadFile.prototype.getFile = function(e) {
       
		var input = document.getElementById('file_upload');
			input.addEventListener('change', function() {
				
			import_cards.html('');
			map_content.html('');
	
			if (this.files && this.files[0]) {
				
				var filePath = $("#file_upload").val(); 
				var file_ext = filePath.substr(filePath.lastIndexOf('.')+1,filePath.length).toLowerCase();

				if(file_ext == 'csv' || file_ext == 'xml'){
					
					var myFile = this.files[0];
					var reader = new FileReader();
					
					reader.addEventListener('load', function (e) {
						
						var filedata = e.target.result;
						
						if(file_ext == 'csv'){
							parseFile.parsecsvdata(filedata);
						} else if(file_ext == 'xml'){
							parseFile.parsexmldata(filedata); 
						}
						
					});
					
					reader.readAsBinaryString(myFile);
					
				} else {
					import_cards.html(lang_txt["file_not_supported"]);
				} 
				
			} else {
				import_cards.html(lang_txt["missing_file"]);
			}

		});
    }

    uploadFile.prototype.parsecsvdata = function(data) {

        var parsedata = [];

        var newLinebrk = data.split("\n");

        for(var i = 0; i < newLinebrk.length; i++) {
            parsedata.push(newLinebrk[i].split(";"));
        }

        for(var row = 1; row < parsedata.length; row++) {

            var csv_card_data = '';
            var frame_id = 0;
			var well_name = 0;
			var pipe_models = '';

            for(var row_col = 0; row_col < parsedata[row].length; row_col++) {

                var row_col_key = parsedata[0][row_col];
                var row_col_val = parsedata[row][row_col];
                var breaks = /\r/.exec(row_col_val);
                
                if(!breaks && row_col_val !== ""){
                    
                    if(row_col_key == 'outlet_diameter'){
                        csv_card_data += '<div class="card_outlet_wrap"><div class="dynamic_wrap"></div>';
                    }
                    
                    if(row_col_key == 'inlet1_diameter' || row_col_key == 'inlet2_diameter' || row_col_key == 'inlet3_diameter' || row_col_key == 'inlet4_diameter'){
                        csv_card_data += '<div class="card_inlet_wrap"><div class="dynamic_wrap"></div>';
                    }

					if(row_col_key == 'height'){
						csv_card_data += '<div class="label_row"><label>'+lang_txt["height"]+':<input type="number" min="0" class="well_height" name="well_height" min="0" step="0.01" value="'+(parseFloat(row_col_val)/1000)+'">m</label>';
						csv_card_data += '<label>'+lang_txt["height_deposit"]+':<input type="number" min="0" class="custom_sakkapesa_length" name="custom_sakkapesa_length" min="0" step="0.01" value="0">m</label></div>';
					} else {
						csv_card_data += '<div class="val_tag" data-key="'+row_col_key+'" data-value="'+row_col_val+'"></div>';
					}
                   
                    if(row_col_key == 'outlet_angle' || row_col_key == 'inlet1_angle' || row_col_key == 'inlet2_angle' || row_col_key == 'inlet3_angle' || row_col_key == 'inlet4_angle'){
                        
						var css_angle = '';
						
						if(parseInt(row_col_val) > 0 && parseInt(row_col_val) < 180){
							css_angle = 'r180'
						} else if(parseInt(row_col_val) >= 180){
							css_angle = 'r360'
						}
						
						pipe_models += '<div class="pipe_model_wrap" style="transform:rotate('+parseFloat(row_col_val)+'deg);"><div class="pipe_model"><span class="'+css_angle+'">'+parseFloat(row_col_val).toFixed(0)+'&deg;</span></div></div>';
						
						csv_card_data += '</div>';

                    }

                }

                if(row_col_key == 'item_number'){
                    frame_id = row_col_val;    
                }
				
                if(row_col_key == 'name'){
                    well_name = row_col_val;    
                }

            }


			var vector = '<div class="obj_2d"><div class="obj_2d_center">'+pipe_models+'</div></div>';
			
            if(frame_id !== 0){
                var csv_card = '<div class="card csv_card" data-well_id="'+well_name.split('-')[1]+'" data-well_name="'+strip_to_15_chars(well_name)+'" data-frame_id="'+frame_id+'">'+ vector + '<div class="card_details">'+csv_card_data +'</div><div class="multi_selector_wrap"></div></div>';
                import_cards.append(csv_card);   
            }

        }
		
        create_sources();

    }


	var xml_groups = JSON.parse('{"311200":"JVTK,VTK","311300":"JVTP,VTP","311400":"PVPK","311600":"JVP","312200":"SVTK,HVTK,STK","312300":"STP,SVTP","312400":"SVK,PVK,HVK,HV"}');
	var chamber_sizes = [200, 315, 400, 500, 560, 860, 1000, 1200, 1400, 1600];

	function next_size(dia){
		return chamber_sizes.sort( (a, b) => Math.abs(dia - a) - Math.abs(dia - b) )[0];
	}

	function final_dia(unit, measure){

		if(unit == 'meter'){
			return measure*1000;
		} else if(unit == 'millimeter'){
			return parseInt(measure);
		}
		
	}
	
	function get_frame_id(a, dia){
		
		var obj_arr = a.split(',');
		var chosen_id = 0;
		
		for(var i = 0; i < obj_arr.length; i++){
			
			var test_tag_1 = menu_items.find('.tag[data-type*="'+obj_arr[i]+'"]:contains("'+dia+'/")').last(),
				test_tag_2 = menu_items.find('.tag[data-type*="'+obj_arr[i]+'"]:contains("'+dia+'")').last(),
				test_tag_3 = menu_items.find('.tag:contains("'+dia+'/")').last(),
				test_tag_4 = menu_items.find('.tag[data-type*="'+obj_arr[i]+'"]').first(),
				test_tag_5 = menu_items.find('.tag').first();
	
			if(test_tag_1.length){
				return test_tag_1.attr('data-identifier');
			} else if(test_tag_2.length){
				return test_tag_2.attr('data-identifier');
			} else if(test_tag_3.length){
				return test_tag_3.attr('data-identifier');
			} else if(test_tag_4.length){
				return test_tag_4.attr('data-identifier');
			}

			//final, still no match
			if(i+1 == obj_arr.length){
				return test_tag_5.attr('data-identifier');
			}
			
		}

	}

	
	function parseXML(text) {
		var doc;

		if(window.DOMParser) {
			var parser = new DOMParser();
			doc = parser.parseFromString(text, "text/xml");
		}
		else if(window.ActiveXObject) {
			doc = new ActiveXObject("Microsoft.XMLDOM");
			doc.async = "false";
			doc.loadXML(text);
		}
		else {
			throw new Error("Cannot parse XML");
		}

		return doc;
	}

	
    uploadFile.prototype.parsexmldata = function(data) {
		
		var fixed_data = data.replace(/Ã„/g, "Ä").replace(/Ã–/g, "Ö").replace(/Ã¤/g, "ä").replace(/Ã¶/g, "ö");
		
		var xmlDoc = parseXML(fixed_data),
			xml_content = $(xmlDoc);
			
		var get_xml_format = xml_content.find('Application').attr('name');
		
		var xml_format = '';
		
		if(get_xml_format == 'Novapoint'){
			scrape_nova(xml_content);
		} else if(get_xml_format == 'AutoCAD Civil 3D' || get_xml_format == 'Tekla Civil'){
			scrape_civil(xml_content);
		} else {
			alert(lang_txt["file_unknown"]);
			return;
		}

    }

	
	
	function scrape_civil(xml){
		
		var xml_content = xml,
			dia_units = xml_content.find('Metric').attr('diameterUnit'),
			linear_units = xml_content.find('Metric').attr('linearUnit');
		
			xml_content.find('Struct').each(function() {

				var pipes = '',
					pipe_models = '';

				var current_elem = $(this);
				
				var obj_material = current_elem.find('CircStruct').attr('material').toLowerCase();
				
				if (['pe', 'peh', 'pvc'].includes(obj_material)){
				
					var well_name = current_elem.attr('name'),
						well_desc = current_elem.attr('desc'),
						well_id = current_elem.find('[label="structLabel"]').attr('value'),
						well_dia = current_elem.find('CircStruct').attr('diameter'),
						well_thickness = current_elem.find('CircStruct').attr('thickness'),
						mp = parseFloat(current_elem.attr('elevRim')),
						vj = parseFloat(current_elem.attr('elevSump')),
						well_deposit = current_elem.find('[label="heightDeposit"]').attr('value'),
						well_height = (mp - vj).toFixed(2);

						if(!well_id){
							well_id = well_name;
						}
		
						if(!well_deposit){
							well_deposit = 0;
						}
						
					

					var zero_pipe_id = current_elem.find('Invert[flowDir="in"]').attr('refPipe'),
						well_final_dia = next_size(final_dia(dia_units, well_dia)),
						well_group = current_elem.find('[label="infraCoding"]').attr('value'),
						well_type = xml_groups[well_group];
						

						if(!well_type){
							well_type = 'NaN';
						}
						
					var elem_pos = current_elem.find('Center').text().split(' ');
						
					var start_pos = {
						x: elem_pos[1],
						y: elem_pos[0]
					};	
					
					var end_pos = {x: start_pos.x,y: start_pos.y},
						zero_target = '',
						zero_target_id = '';

					if(zero_pipe_id){
						
						zero_target = xml_content.find('Pipe[name="'+zero_pipe_id+'"]').attr('refStart');
						
						if(zero_target == well_name){
							zero_target = xml_content.find('Pipe[name="'+zero_pipe_id+'"]').attr('refEnd');
						}
						
						zero_target_id = zero_target;

						var zero_coords = xml_content.find('Struct[name="'+zero_target+'"]').find('Center').text().split(' ');

						end_pos = {
							x: zero_coords[1],
							y: zero_coords[0]
						};

						var zero_direction = 360 - (Math.atan2(start_pos.y - end_pos.y, start_pos.x - end_pos.x) * 180 / Math.PI + 180);

					}
					
					var connect_pipe_dia = '',
						connect_pipe_material = '';
					
					current_elem.find('Invert').each(function() {
						
						var current_pipe_ref = $(this), 
							flow_direction = current_pipe_ref.attr('flowDir'),
							ref_pipe = current_pipe_ref.attr('refPipe'),
							height = ((parseFloat(current_pipe_ref.attr('elev')) - vj) * 100).toFixed(0);

						var pipe_wrap = xml_content.find('Pipe[name="'+ref_pipe+'"]'),
							pipe_type = pipe_wrap.find('CircPipe').attr('material'),
							pipe_dia = final_dia(dia_units, pipe_wrap.find('CircPipe').attr('diameter')),
							pipe_thickness = final_dia(linear_units, pipe_wrap.find('CircPipe').attr('thickness')),
							pipe_final_dia = 0;

						var current_direction = 0;
						
							pipe_final_dia = parseInt((parseFloat(pipe_dia) + parseFloat(pipe_thickness*2)));
							
							if(flow_direction == 'in'){
								
								var o = '<div data-key="outlet_diameter" data-value="'+pipe_final_dia+'"></div>'+
										'<div data-key="outlet_height" data-value="'+height+'"></div>'+
										'<div data-key="outlet_type" data-value="'+pipe_type+'"></div>'+
										'<div data-key="outlet_angle" data-value="'+current_direction+'"></div>';

								pipes += '<div class="card_outlet_wrap">'+o+'<div class="dynamic_wrap"></div></div>';
							
								connect_pipe_dia = pipe_final_dia,
								connect_pipe_material = pipe_type;
							}
							
							if(flow_direction == 'out'){

								var pipe_target = xml_content.find('Pipe[name="'+ref_pipe+'"]').attr('refEnd');
								var current_target = xml_content.find('Struct[name="'+pipe_target+'"]').find('Center').text().split(' ');	

								
								var current_target_pos = {
									x: current_target[1],
									y: current_target[0]
								};

								current_direction = Math.abs((360 - (Math.atan2(start_pos.y - current_target_pos.y, start_pos.x - current_target_pos.x) * 180 / Math.PI + 180)-zero_direction)).toFixed(0);

								var i = '<div data-key="inlet_diameter" data-value="'+pipe_final_dia+'"></div>'+
										'<div data-key="inlet_height" data-value="'+height+'"></div>'+
										'<div data-key="inlet_type" data-value="'+pipe_type+'"></div>'+
										'<div data-key="inlet_angle" data-value="'+current_direction+'"></div>';

								pipes += '<div class="card_inlet_wrap">'+i+'<div class="dynamic_wrap"></div></div>';

							}

						var css_angle = '';
							
						if(parseInt(current_direction) > 0 && parseInt(current_direction) < 180){
							css_angle = 'r180'
						} else if(parseInt(current_direction) >= 180){
							css_angle = 'r360'
						}

						pipe_models += '<div class="pipe_model_wrap" style="transform:rotate('+current_direction+'deg);"><div class="pipe_model"><span class="'+css_angle+'">'+current_direction+'&deg;</span></div></div>';

					});
					
					var elem_details = '<div class="card_details">'+ 
									   '<div>'+lang_txt["desc"]+': '+well_desc+'</div>'+
									   '<div>'+lang_txt["dia"]+': '+well_final_dia+'</div>'+
									   '<div>'+lang_txt["height_ground"]+': '+mp.toFixed(2)+'</div>'+
									   '<div>'+lang_txt["height_water"]+': '+vj.toFixed(2)+'</div>'+
									   '<div class="label_row"><label>Korkeus: <input type="number" min="0" class="well_height" name="well_height" step="0.01" value="'+well_height+'" readonly>m</label>'+
									   '<label>'+lang_txt["height_deposit"]+': <input type="number" min="0" class="custom_sakkapesa_length" name="custom_sakkapesa_length" step="0.01" value="'+well_deposit+'">m</label></div>'+									
									   pipes+
									   '</div><div class="multi_selector_wrap"></div>';

					var vector = '<div class="obj_2d"><div class="obj_2d_center">'+pipe_models+'</div></div>';	 	

					var frame_code = get_frame_id(well_type, well_final_dia);
					
					import_cards.append('<div class="card" data-well_id="'+well_id+'" data-well_name="'+well_name+'" data-frame_id="'+frame_code+'" data-pipe_dia="'+connect_pipe_dia+'" data-pipe_material="'+connect_pipe_material+'" data-zero_x="'+end_pos.x+'" data-zero_y="'+end_pos.y+'" data-target_id="'+zero_target_id+'" data-height="'+well_height+'" data-mp="'+mp+'" data-vj="'+vj+'" data-pos_x="'+start_pos.x+'" data-pos_y="'+start_pos.y+'">'+ vector + elem_details +'</div>');

				}
			});	

			map_content.html('<div class="import_map_pad"><div class="import_map_wrap" style="transform-origin: 0px 0px; transform: translate(0px, 0px) scale(1, 1);"><div class="import_map"></div></div></div><div class="import_counter"><div class="pipe_counter"></div><div class="well_counter"></div></div>');

			create_sources();
			build_map();

	}
	
	
	function scrape_nova(xml){
		
		var xml_content = xml,
			dia_units = xml_content.find('Metric').attr('diameterUnit'),
			linear_units = xml_content.find('Metric').attr('linearUnit');
		
			xml_content.find('Struct').each(function() {


				var pipes = '',
					pipe_models = '';

				var current_elem = $(this);
				
				var obj_material = current_elem.find('CircStruct').attr('material').toLowerCase();
				
				if (['pe', 'peh', 'pvc'].includes(obj_material)){

					var well_name = current_elem.find('[label="structLabel"]').attr('value'),
						well_desc = current_elem.attr('desc'),
						well_id = well_name,
						well_dia = current_elem.find('CircStruct').attr('diameter'),
						well_thickness = current_elem.find('CircStruct').attr('thickness'),
						mp = parseFloat(current_elem.attr('elevRim')),
						vj = parseFloat(current_elem.attr('elevSump')),
						well_deposit = current_elem.find('[label="heightDeposit"]').attr('value'),
						well_height = (mp - vj).toFixed(2);

						if(!well_deposit){
							well_deposit = 0;
						}


					var zero_pipe_id = current_elem.find('Invert[flowDir="out"]').attr('refPipe'),
						well_final_dia = next_size(final_dia(dia_units, well_dia));
						well_group = current_elem.find('[label="infraCoding"]').attr('value'),
						well_type = xml_groups[well_group];

					var elem_pos = current_elem.find('Center').text().split(' ');
						
					var start_pos = {
						x: elem_pos[1],
						y: elem_pos[0]
					};	
					
 
					var end_pos = {x: start_pos.x,y: start_pos.y},
						zero_target = '',
						zero_target_id = '';

					if(zero_pipe_id){
						
						var target_wrap = xml_content.find('Pipe[name="'+zero_pipe_id+'"]');
							zero_target = xml_content.find('Pipe[name="'+zero_pipe_id+'"]').attr('refEnd');
							zero_target_id = xml_content.find('Struct[name="'+zero_target+'"]').find('[label="structLabel"]').attr('value');

						var zero_coords = xml_content.find('Struct[name="'+zero_target+'"]').find('Center').text().split(' ');

						end_pos = {
							x: zero_coords[1],
							y: zero_coords[0]
						};

						var zero_direction = 360 - (Math.atan2(start_pos.y - end_pos.y, start_pos.x - end_pos.x) * 180 / Math.PI + 180);

					}
					
					var connect_pipe_dia = '',
						connect_pipe_material = '';
					
					current_elem.find('Invert').each(function() {
						
						var current_pipe_ref = $(this), 
							flow_direction = current_pipe_ref.attr('flowDir'),
							ref_pipe = current_pipe_ref.attr('refPipe'),
							height = ((parseFloat(current_pipe_ref.attr('elev')) - vj) * 100).toFixed(0);
							
						var pipe_wrap = xml_content.find('Pipe[name="'+ref_pipe+'"]'),
							pipe_type = pipe_wrap.find('CircPipe').attr('material'),
							pipe_dia = final_dia(dia_units, pipe_wrap.find('CircPipe').attr('diameter')),
							pipe_thickness = final_dia(linear_units, pipe_wrap.find('CircPipe').attr('thickness')),
							pipe_final_dia = 0;

						var current_direction = 0;
						
							pipe_final_dia = parseInt((parseFloat(pipe_dia) + parseFloat(pipe_thickness*2)));
							
							if(flow_direction == 'out'){
								
								var o = '<div data-key="outlet_diameter" data-value="'+pipe_final_dia+'"></div>'+
										'<div data-key="outlet_height" data-value="'+height+'"></div>'+
										'<div data-key="outlet_type" data-value="'+pipe_type+'"></div>'+
										'<div data-key="outlet_angle" data-value="'+current_direction+'"></div>';
									
								pipes += '<div class="card_outlet_wrap">'+o+'<div class="dynamic_wrap"></div></div>';

								connect_pipe_dia = pipe_final_dia,
								connect_pipe_material = pipe_type;
							}
							
							if(flow_direction == 'in'){

								var pipe_target = xml_content.find('Pipe[name="'+ref_pipe+'"]').attr('refStart');
								var current_target = xml_content.find('Struct[name="'+pipe_target+'"]').find('Center').text().split(' ');
								
								var current_target_pos = {
									x: current_target[1],
									y: current_target[0]
								};

								current_direction = Math.abs((360 - (Math.atan2(start_pos.y - current_target_pos.y, start_pos.x - current_target_pos.x) * 180 / Math.PI + 180))).toFixed(0);

								var i = '<div data-key="inlet_diameter" data-value="'+pipe_final_dia+'"></div>'+
										'<div data-key="inlet_height" data-value="'+height+'"></div>'+
										'<div data-key="inlet_type" data-value="'+pipe_type+'"></div>'+
										'<div data-key="inlet_angle" data-value="'+current_direction+'"></div>';

								pipes += '<div class="card_inlet_wrap">'+i+'<div class="dynamic_wrap"></div></div>';
								
							}

						var css_angle = '';
							
						if(parseInt(current_direction) > 0 && parseInt(current_direction) < 180){
							css_angle = 'r180'
						} else if(parseInt(current_direction) >= 180){
							css_angle = 'r360'
						}
							
						pipe_models += '<div class="pipe_model_wrap" style="transform:rotate('+current_direction+'deg);"><div class="pipe_model"><span class="'+css_angle+'">'+current_direction+'&deg;</span></div></div>';
						
						
					});
					
					var elem_details = '<div class="card_details">'+ 
									   '<div>'+lang_txt["desc"]+': '+well_desc+'</div>'+
									   '<div>'+lang_txt["dia"]+': '+well_final_dia+'</div>'+
									   '<div>'+lang_txt["height_ground"]+': '+mp.toFixed(2)+'</div>'+
									   '<div>'+lang_txt["height_water"]+': '+vj.toFixed(2)+'</div>'+
									   '<div class="label_row"><label>Korkeus: <input type="number" min="0" class="well_height" name="well_height" step="0.01" value="'+well_height+'" readonly>m</label>'+
									   '<label>'+lang_txt["height_deposit"]+': <input type="number" min="0" class="custom_sakkapesa_length" name="custom_sakkapesa_length" step="0.01" value="'+well_deposit+'">m</label></div>'+									
									   pipes+
									   '</div><div class="multi_selector_wrap"></div>';

					var vector = '<div class="obj_2d"><div class="obj_2d_center">'+pipe_models+'</div></div>';	 	

					var frame_code = get_frame_id(well_type, well_final_dia);
					
					import_cards.append('<div class="card" data-well_id="'+well_id+'" data-well_name="'+well_name+'" data-frame_id="'+frame_code+'" data-pipe_dia="'+connect_pipe_dia+'" data-pipe_material="'+connect_pipe_material+'" data-zero_x="'+end_pos.x+'" data-zero_y="'+end_pos.y+'" data-target_id="'+zero_target_id+'" data-height="'+well_height+'" data-mp="'+mp+'" data-vj="'+vj+'" data-pos_x="'+start_pos.x+'" data-pos_y="'+start_pos.y+'">'+ vector + elem_details +'</div>');
					
				}
			});	

			map_content.html('<div class="import_map_pad"><div class="import_map_wrap" style="transform-origin: 0px 0px; transform: translate(0px, 0px) scale(1, 1);"><div class="import_map"></div></div></div><div class="import_counter"><div class="pipe_counter"></div><div class="well_counter"></div></div>');


			create_sources();
			build_map();
			
	}	

	
	function create_sources(){
		
		$('.card').each(function() {
			create_menu_from_source($(this));
		});
		
	}

	
	function build_map(){

		var import_map = $('.import_map'),
			import_counter = $('.import_counter');

			import_map.html('');
			import_counter.find('.pipe_counter').html('');
			import_counter.find('.well_counter').html('');
		
		var map_width = import_map.width(),
			map_height = import_map.height(),
			x_height = 0;
			

		var x_array = [],
			y_array = [];
		
		$('.card').each(function() {
				
			var current_card = $(this);
				
			var pos_x = parseFloat(current_card.attr('data-pos_x')),
			pos_y = parseFloat(current_card.attr('data-pos_y'));

			x_array.push(pos_x);
			y_array.push(pos_y);
			
		});
	
		var map_x_min = Math.min(...x_array) - 50,
			map_x_max = Math.max(...x_array) + 50;
			
		var map_y_min = Math.min(...y_array) - 50,
			map_y_max = Math.max(...y_array) + 50;
			
		var max_x_diff = map_x_max - map_x_min,
			max_y_diff = map_y_max - map_y_min;


		if(max_y_diff > max_x_diff){
			x_height = map_width * (max_x_diff / max_y_diff);
		} else {
			x_height = map_width * (max_y_diff / max_x_diff);
		}

		import_map.css({'height': x_height+'px'});
		
		
		
		import_counter.find('.pipe_counter').append('<h3>Linjat:</h3>');
		import_counter.find('.well_counter').append('<h3>Kaivot:</h3>');
		
		$('.card').each(function() {
				
			var current_card = $(this),
				card_title = current_card.attr('data-well_name'),
				card_type = current_card.attr('data-frame_type'),
				card_id = current_card.attr('data-well_id'),
				target_title = current_card.attr('data-target_id'),
				mid_pipe_dia = parseFloat(current_card.attr('data-pipe_dia')),
				mid_pipe_material = current_card.attr('data-pipe_material'),
				well_height = parseFloat(current_card.attr('data-height')),
				well_tag = current_card.attr('data-frame_name'),
				well_code = current_card.attr('data-frame_id');
				
				

			var find_well = import_counter.find('.well_counter').find('.well_wrap[data-frame_id="'+well_code+'"]');

			if(find_well.length !== 0){
				var total_atm = parseFloat(find_well.find('.obj_total').text()),
					new_total = (total_atm + well_height).toFixed(2),
					new_count = parseInt(find_well.attr('data-count')) + 1;
					
					find_well.find('.obj_total').text(new_total);
					find_well.attr('data-count', new_count);
				
				find_well.find('.obj_avg').text(parseFloat(new_total/new_count).toFixed(2));
			} else {
				import_counter.find('.well_counter').append('<div class="well_wrap" data-count="1" data-frame_id="'+well_code+'" data-frame_name="'+well_tag+'">'+lang_txt["total"]+': <span class="obj_total">'+well_height.toFixed(2)+'</span> <span>m</span>, '+lang_txt["avg_height"]+': <span class="obj_avg"></span> <span>m</span></div>');               
			}



			var width_class = (mid_pipe_dia/100).toFixed(0);

			var target_x = parseFloat(current_card.attr('data-zero_x')),
				target_y = parseFloat(current_card.attr('data-zero_y'));

			var obj_x = parseFloat(current_card.attr('data-pos_x')),
				obj_y = parseFloat(current_card.attr('data-pos_y'));

			var obj_x_diff = 100 * ((map_x_max - obj_x) / max_x_diff),
				obj_y_diff = 100 * ((map_y_max - obj_y) / max_y_diff);
				

			var a = target_x - obj_x,
				b = target_y - obj_y;

			var distance = Math.sqrt(a*a + b*b);
		
			zero_direction = 360 - (Math.atan2(obj_y - target_y, obj_x - target_x) * 180 / Math.PI + 180);

			var zero_wrap = '<div class="zero_wrap" data-pipe_distance="'+distance+'" data-dia="'+mid_pipe_dia+'" data-type="'+mid_pipe_material+'" data-start_id="'+card_title+'" data-end_id="'+target_title+'" style="transform:rotate('+zero_direction+'deg);"><span class="target_line width_'+width_class+'"></span></div>';

			import_map.append('<div class="map_obj" data-title="'+card_type+'-'+card_id+'" style="top:'+obj_x_diff+'%;left:'+obj_y_diff+'%;">'+zero_wrap+'</div>');

		});

		//build mid pipes
		$('.zero_wrap').each(function() {

			var current = $(this);

			var pipe_start = current.attr('data-start_id'),
				pipe_end = current.attr('data-end_id'),
				pipe_dia = current.attr('data-dia'),
				pipe_type = current.attr('data-type'),
				pipe_length = parseFloat(current.attr('data-pipe_distance'));

			if(pipe_dia == '' || pipe_type == ''){return;}
			
			var find_pipe = import_counter.find('.pipe_counter').find('.line_wrap[data-dia="'+pipe_dia+'"][data-type="'+pipe_type+'"]');

			if(find_pipe.length !== 0){
				var new_length = parseFloat(find_pipe.attr('data-length')) + pipe_length;
				find_pipe.attr('data-length', new_length.toFixed(0));
			} else {
				import_counter.find('.pipe_counter').append('<div class="line_wrap" data-dia="'+pipe_dia+'" data-type="'+pipe_type+'" data-length="'+pipe_length.toFixed(0)+'"></div>');
			}

			var own_pos = current.offset(),
				target_pos = $('.zero_wrap[data-start_id="'+pipe_end+'"]').offset();

			if(!target_pos){return;}
			
			var a_pos = target_pos.top - own_pos.top;
			var b_pos = target_pos.left - own_pos.left;

			var line_length = Math.sqrt(a_pos*a_pos + b_pos*b_pos) - 20;

			current.find('.target_line').css({'height': line_length+'px'})
		});
		
		
		new ScrollZoom($('.import_map_pad'),5,0.2);
		

	}
	
	
	function create_menu_from_source(card) {

		spinner.addClass('active');

		var card_wrap = card;
		var card_identifier = card_wrap.attr('data-frame_id');
		var well_name = card_wrap.attr('data-well_name');
		var frame_name = menu_items.find('.tag[data-identifier="'+card_identifier+'"]').text();
		var frame_type = menu_items.find('.tag[data-identifier="'+card_identifier+'"]').attr('data-type');

		card.attr('data-frame_name', frame_name);
		card.attr('data-frame_type', frame_type);
		
		if(well_name){
			
			card_wrap.find('.well_tag').remove();
			card_wrap.prepend('<div class="well_tag"><span><label><input type="text" class="final_well_id" name="final_well_id" value="'+well_name+'"></label></span> ('+frame_name+')</div>');
			card_wrap.find('.multi_selector_wrap').html('');


			var outlets_arr = helper.find_category_by_path(['yhde']), outlets_opts = '', inlets_opts = '';
			var kansi_cats_arr = helper.find_category_by_path(['kansi']), kansi_opts = '';
			var lisavaruste_cats_arr = helper.find_category_by_path(['lisavaruste']), lisavaruste_opts = '';
			var muu_cats_arr = helper.find_category_by_path(['muu']), muu_opts = '';
			var pohja_cats_arr = helper.find_category_by_path(['pohja']), pohja_opts = '';
			var runko_cats_arr = helper.find_category_by_path(['runko']), runko_opts = '';
			var sakkapesa_cats_arr = helper.find_category_by_path(['sakkapesa']), sakkapesa_opts = '';
			var teleskoopit_cats_arr = helper.find_category_by_path(['teleskoopit']), teleskoopit_opts = '';
			var venttiili_cats_arr = helper.find_category_by_path(['venttiili']), venttiili_opts = '';

			var outlets_cats = outlets_arr.children, outlets_cats_main_id = outlets_arr.id;
			var kansi_cats = kansi_cats_arr.children, kansi_cats_main_id = kansi_cats_arr.id;
			var lisavaruste_cats = lisavaruste_cats_arr.children, lisavaruste_cats_main_id = lisavaruste_cats_arr.id;
			var muu_cats = muu_cats_arr.children, muu_cats_main_id = muu_cats_arr.id;
			var pohja_cats = pohja_cats_arr.children, pohja_cats_main_id = pohja_cats_arr.id;
			var runko_cats = runko_cats_arr.children, runko_cats_main_id = runko_cats_arr.id;
			var sakkapesa_cats = sakkapesa_cats_arr.children, sakkapesa_cats_main_id = sakkapesa_cats_arr.id;
			var teleskoopit_cats = teleskoopit_cats_arr.children, teleskoopit_cats_main_id = teleskoopit_cats_arr.id;
			var venttiili_cats = venttiili_cats_arr.children, venttiili_cats_main_id = venttiili_cats_arr.id;


			api.wellingredients(
				card_identifier,
				function(o) {

				//outlets n inlets parts
				$.each(outlets_cats, function(i, item) {
					var current_cat = item.identifier,
						current_cat_id = item.id,
						current_sub = helper.category_and_children(helper.find_category_by_path(['yhde', current_cat]));

					var current_json = helper.filter_ingredients_by_categories(o, current_sub);

					$.each(current_json, function(i, item) {

						if(current_cat == 'poisto' || current_cat == 'tulo_tai_poisto'){	
							outlets_opts += '<option class="primary" data-parent_id="'+outlets_cats_main_id+'" data-category_id="'+current_cat_id+'" data-search="'+current_json[i].name.toLowerCase()+'" value="'+current_json[i].code+'" data-necessity="'+current_json[i].necessity+'" data-outlet_diameter="'+current_json[i].diameter+'" data-outlet_amount="'+current_json[i].amount+'" data-outlet_unit="'+current_json[i].unit+'">'+current_json[i].name.toUpperCase()+'</option>';
						}
				
						if(current_cat == 'tulo' || current_cat == 'tulo_tai_poisto'){	
							inlets_opts += '<option class="primary" data-parent_id="'+outlets_cats_main_id+'" data-category_id="'+current_cat_id+'" data-search="'+current_json[i].name.toLowerCase()+'" value="'+current_json[i].code+'" data-necessity="'+current_json[i].necessity+'" data-outlet_diameter="'+current_json[i].diameter+'" data-outlet_amount="'+current_json[i].amount+'" data-outlet_unit="'+current_json[i].unit+'">'+current_json[i].name.toUpperCase()+'</option>';
						}			
						
					});
				});

				//basic parts
				$.each(kansi_cats, function(i, item) {
					var current_cat = item.identifier,
						current_cat_id = item.id,
						current_sub = helper.category_and_children(helper.find_category_by_path(['kansi', current_cat]));

					var current_json = helper.filter_ingredients_by_categories(o, current_sub);

					$.each(current_json, function(i, item) {
						var json_val = encodeURIComponent(JSON.stringify({"code": current_json[i].code, "amount": current_json[i].amount, "height": 0, "angle": 0, "drop": 0, "frame": 0, "parent_id": kansi_cats_main_id, "category_id": current_cat_id}));                                            
							kansi_opts += '<label><input type="checkbox" data-necessity="'+current_json[i].necessity+'" data-id="'+current_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+current_json[i].unit+'">'+current_json[i].name+'</label>';
					});
				});

				$.each(lisavaruste_cats, function(i, item) {
					var current_cat = item.identifier,
						current_cat_id = item.id,
						current_sub = helper.category_and_children(helper.find_category_by_path(['lisavaruste', current_cat]));
					
					var current_json = helper.filter_ingredients_by_categories(o, current_sub);

					$.each(current_json, function(i, item) {
						var json_val = encodeURIComponent(JSON.stringify({"code": current_json[i].code, "amount": current_json[i].amount, "height": 0, "angle": 0, "drop": 0, "frame": 0, "parent_id": lisavaruste_cats_main_id, "category_id": current_cat_id}));                                            
							lisavaruste_opts += '<label><input type="checkbox" data-necessity="'+current_json[i].necessity+'" data-id="'+current_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+current_json[i].unit+'">'+current_json[i].name+'</label>';
					});
				});
				
				$.each(muu_cats, function(i, item) {
					var current_cat = item.identifier,
						current_cat_id = item.id,
						current_sub = helper.category_and_children(helper.find_category_by_path(['muu', current_cat]));
					
					var current_json = helper.filter_ingredients_by_categories(o, current_sub);

					$.each(current_json, function(i, item) {
						var json_val = encodeURIComponent(JSON.stringify({"code": current_json[i].code, "amount": current_json[i].amount, "height": 0, "angle": 0, "drop": 0, "frame": 0, "parent_id": muu_cats_main_id, "category_id": current_cat_id}));                                            
							muu_opts += '<label><input type="checkbox" data-necessity="'+current_json[i].necessity+'" data-id="'+current_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+current_json[i].unit+'">'+current_json[i].name+'</label>';
					});
				});

				$.each(pohja_cats, function(i, item) {
					var current_cat = item.identifier,
						current_cat_id = item.id,
						current_sub = helper.category_and_children(helper.find_category_by_path(['pohja', current_cat]));
					
					var current_json = helper.filter_ingredients_by_categories(o, current_sub);

					$.each(current_json, function(i, item) {
						var json_val = encodeURIComponent(JSON.stringify({"code": current_json[i].code, "amount": current_json[i].amount, "height": 0, "angle": 0, "drop": 0, "frame": 0, "parent_id": pohja_cats_main_id, "category_id": current_cat_id}));                                            
							pohja_opts += '<label><input type="checkbox" data-necessity="'+current_json[i].necessity+'" data-id="'+current_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+current_json[i].unit+'">'+current_json[i].name+'</label>';
					});
				});

				$.each(runko_cats, function(i, item) {
					var current_cat = item.identifier,
						current_cat_id = item.id,
						current_sub = helper.category_and_children(helper.find_category_by_path(['runko', current_cat]));
					
					var current_json = helper.filter_ingredients_by_categories(o, current_sub);

					$.each(current_json, function(i, item) {
						var json_val = encodeURIComponent(JSON.stringify({"code": current_json[i].code, "amount": current_json[i].amount, "height": 0, "angle": 0, "drop": 0, "frame": 1, "parent_id": runko_cats_main_id, "category_id": current_cat_id}));                                            
							runko_opts += '<label><input type="checkbox" data-necessity="'+current_json[i].necessity+'" data-id="'+current_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+current_json[i].unit+'">'+current_json[i].name+'</label>';
					});
				});
				
				$.each(sakkapesa_cats, function(i, item) {
					var current_cat = item.identifier,
						current_cat_id = item.id,
						current_sub = helper.category_and_children(helper.find_category_by_path(['sakkapesa', current_cat]));
					
					var current_json = helper.filter_ingredients_by_categories(o, current_sub);

					$.each(current_json, function(i, item) {
						var json_val = encodeURIComponent(JSON.stringify({"code": current_json[i].code, "amount": current_json[i].amount, "height": 0, "angle": 0, "drop": 0, "frame": 0, "parent_id": sakkapesa_cats_main_id, "category_id": current_cat_id}));                                            
							sakkapesa_opts += '<label><input type="checkbox" data-necessity="'+current_json[i].necessity+'" data-id="'+current_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+current_json[i].unit+'">'+current_json[i].name+'</label>';
					});
				});
				
				$.each(teleskoopit_cats, function(i, item) {
					var current_cat = item.identifier,
						current_cat_id = item.id,
						current_sub = helper.category_and_children(helper.find_category_by_path(['teleskoopit', current_cat]));
					
					var current_json = helper.filter_ingredients_by_categories(o, current_sub);

					$.each(current_json, function(i, item) {
						var json_val = encodeURIComponent(JSON.stringify({"code": current_json[i].code, "amount": current_json[i].amount, "height": 0, "angle": 0, "drop": 0, "frame": 0, "parent_id": teleskoopit_cats_main_id, "category_id": current_cat_id}));                                            
							teleskoopit_opts += '<label><input type="checkbox" data-necessity="'+current_json[i].necessity+'" data-id="'+current_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+current_json[i].unit+'">'+current_json[i].name+'</label>';
					});
				});
				
				$.each(venttiili_cats, function(i, item) {
					var current_cat = item.identifier,
						current_cat_id = item.id,
						current_sub = helper.category_and_children(helper.find_category_by_path(['venttiili', current_cat]));
					
					var current_json = helper.filter_ingredients_by_categories(o, current_sub);

					$.each(current_json, function(i, item) {
						var json_val = encodeURIComponent(JSON.stringify({"code": current_json[i].code, "amount": current_json[i].amount, "height": 0, "angle": 0, "drop": 0, "frame": 0, "parent_id": venttiili_cats_main_id, "category_id": current_cat_id}));                                            
							venttiili_opts += '<label><input type="checkbox" data-necessity="'+current_json[i].necessity+'" data-id="'+current_json[i].code+'" value="'+json_val+'" data-outlet_unit="'+current_json[i].unit+'">'+current_json[i].name+'</label>';
					});
				});


				card_wrap.find('.multi_selector_wrap').append('<div class="checkbox_wrap cards_wrap"><div class="details_title">'+lang_txt["cards"]+':</div><div class="checkbox_content">'+$('#menu_items').html()+'</div></div>');
				var scroll_el = card_wrap.find('.cards_wrap .tag[data-identifier="'+card_identifier+'"]');
				var scroll_offset = scroll_el.position().top;
				
				scroll_el.addClass('active');
				card_wrap.find('.cards_wrap .checkbox_content').scrollTop(scroll_offset);
				
				if(sakkapesa_opts.length > 0){card_wrap.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title">'+lang_txt["height_deposit"]+':</div><div class="checkbox_content">'+sakkapesa_opts+'</div></div>');}
				if(teleskoopit_opts.length > 0){card_wrap.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title">'+lang_txt["telescope"]+':</div><div class="checkbox_content">'+teleskoopit_opts+'</div></div>');}
				if(kansi_opts.length > 0){card_wrap.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title">'+lang_txt["lid"]+':</div><div class="checkbox_content">'+kansi_opts+'</div></div>');} 
				if(runko_opts.length > 0){card_wrap.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title">'+lang_txt["frame"]+':</div><div class="checkbox_content">'+runko_opts+'</div></div>');} 

				if(venttiili_opts.length > 0){card_wrap.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title">'+lang_txt["water_lock"]+':</div><div class="checkbox_content">'+venttiili_opts+'</div></div>');}
				if(pohja_opts.length > 0){card_wrap.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title">'+lang_txt["base"]+':</div><div class="checkbox_content">'+pohja_opts+'</div></div>');}
				if(lisavaruste_opts.length > 0){card_wrap.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title">'+lang_txt["addons"]+':</div><div class="checkbox_content">'+lisavaruste_opts+'</div></div>');}
				if(muu_opts.length > 0){card_wrap.find('.multi_selector_wrap').append('<div class="checkbox_wrap"><div class="details_title">'+lang_txt["others"]+':</div><div class="checkbox_content">'+muu_opts+'</div></div>');}


				//outlet select
				var outlet_wrap = card_wrap.find('.card_outlet_wrap');
 
				var outlet_dia = outlet_wrap.find('div.val_tag').eq(0).attr('data-value'),
					outlet_height = outlet_wrap.find('div.val_tag').eq(1).attr('data-value'),
					outlet_type = outlet_wrap.find('div.val_tag').eq(2).attr('data-value'),
					outlet_angle = outlet_wrap.find('div.val_tag').eq(3).attr('data-value');

				var outlet_obj = '<div class="outlet_wrap">'+
									'<label>'+lang_txt["outlet"]+':'+
										'<select class="outlet_select" name="outlet_select">'+
										
										'</select>'+
									'</label>'+
									'<label>'+lang_txt["height"]+':<input type="number" min="0" class="outlet_height" name="outlet_height" value="'+outlet_height+'" disabled>cm</label>'+
									'<label>'+lang_txt["angle"]+':<input type="number" min="0" class="outlet_angle" name="outlet_angle" value="'+outlet_angle+'" disabled>&deg;</label>'+

								  '</div>';

				outlet_wrap.find('.dynamic_wrap').html(outlet_obj);


				var outlet_select = outlet_wrap.find('.outlet_select');
				outlet_select.append(outlets_opts);
					
				outlet_wrap.find('.outlet_select option').each(function() {
					var current_option = $(this),
						current_size = current_option.attr('data-outlet_diameter');
				  
					current_option.attr("disabled", false).prop("disabled", false);
				  
					if(current_size !== outlet_dia) {
					  current_option.attr("disabled", true).prop("disabled", true);
					}
				  
				});

				select_by_type(outlet_type, outlet_dia, outlet_select);
				

				//inlet select
				var inlet_count = 1;
				
				card_wrap.find('.card_inlet_wrap').each(function() {

					var inlet_wrap = $(this);

					var inlet_dia = inlet_wrap.find('div.val_tag').eq(0).attr('data-value'),
						inlet_height = inlet_wrap.find('div.val_tag').eq(1).attr('data-value'),
						inlet_type = inlet_wrap.find('div.val_tag').eq(2).attr('data-value'),
						inlet_angle = inlet_wrap.find('div.val_tag').eq(3).attr('data-value');

						if(inlet_height !== '0'){inlet_height = parseFloat(inlet_height)/10}
						
					var inlet_obj = '<div class="inlet_wrap">'+
										'<label>'+lang_txt["inlet"]+' '+inlet_count+':'+
											'<select class="inlet_select" name="inlet_select'+inlet_count+'">'+
											
											'</select>'+
										'</label>'+
										'<label>'+lang_txt["height"]+':<input type="number" min="0" class="inlet_height" name="inlet_height'+inlet_count+'" value="'+inlet_height+'">cm</label>'+
										'<label>'+lang_txt["angle"]+':<input type="number" min="0" class="inlet_angle" name="inlet_angle'+inlet_count+'" value="'+inlet_angle+'" disabled>&deg;</label>'+
									'</div>';

					inlet_wrap.find('.dynamic_wrap').html(inlet_obj);
					
					
					var current_select = inlet_wrap.find('.inlet_select');
					current_select.append(inlets_opts);


					inlet_wrap.find('.inlet_select option').each(function() {
						var current_option = $(this),
							current_size = current_option.attr('data-outlet_diameter');
					  
							current_option.attr("disabled", false).prop("disabled", false);
					  
						if(current_size !== inlet_dia) {
						  current_option.attr("disabled", true).prop("disabled", true);
						}
					  
					});

					select_by_type(inlet_type, inlet_dia, current_select);
				  
					inlet_count++;
				
				});
				

				card_wrap.find('.multi_selector_wrap').each(function() {
			
					$('input:checkbox[data-necessity="default"]').each(function() {
						var current_input = $(this)
						current_input.prop('checked',true);
					});

				});

				spinner.removeClass('active');
					
			}, function(o) {
					console.log('Failure');
					spinner.removeClass('active');
				}
			);
		
		} else {
			card_wrap.prepend('<div class="well_tag"><span>'+well_name+'</span> '+lang_txt["model"]+' '+card_identifier+' '+lang_txt["not_found"]+'</div>');
			card_wrap.addClass('error');
			spinner.removeClass('active');
		}

	}



	var group_array = JSON.parse('{"1":"pvc","2":"dreenaz","3":"pragma","4":"pe", "PP": "nal", "PVC": "nal"}');

	function select_by_type(group, diameter, target_select_wrap){
		
		var contains_word = group_array[group],
			option_to_select = target_select_wrap.find('option[data-outlet_diameter="'+diameter+'"][data-search*="'+contains_word+'"]').first();


		if(option_to_select.length == 0){
			option_to_select = target_select_wrap.find('option[data-outlet_diameter="'+diameter+'"]').first();
			target_select_wrap.addClass('warning');
			target_select_wrap.after('<span class="warning_msg">wanted: '+contains_word+' '+diameter+'</span>');
		}

		option_to_select.attr('selected','selected').prop('selected',true);

	}


	function final_code() {
		
	var wells_json = [],
		cards_found = false,
		duplicate = false;

		$('.card').not('.error').each(function() {

		cards_found = true;
		
		var obj = $(this),
			well_id = obj.attr('data-well_name');
			json_row = [],
			json_id = null,
			json_ingredients = [];
		  
		if(old_wells.length){
			
			$.each(old_wells, function(i, v) {
					if (v.identifier == well_id) {
						json_row = v;
						json_id = v.id;
						json_ingredients = v.ingredients;
						return false;
					}
			});

		}

		  
		if($('.card[data-well_name="'+well_id+'"]').not(obj).length > 0){

			duplicate = true;

			obj.addClass('duplicate');
			$('html, body').scrollTop(obj.position().top - 100);
			
			setTimeout(function(){obj.removeClass('duplicate');}, 3000);
			
			alert(lang_txt["duplicate_id"]);

			return false;

		}

		var obj_id_full = well_id,
			obj_height = parseFloat(obj.find('.well_height').val()),
			obj_height_chamber = parseFloat(obj.find('.custom_sakkapesa_length').val()),
			obj_wellgroup = obj.attr('data-frame_id');

			var card_code = [];
			var card_ingredients_json = [];

			//perusosat
			obj.find('input:checked').each(function() {
				var current_addon = $(this),
					addon_code = JSON.parse(decodeURIComponent(current_addon.val()));
					card_ingredients_json.push(addon_code);
			});

			//poistot
			obj.find('.outlet_wrap').each(function() {

				var wrap = $(this),
					selected = wrap.find('option:selected'),
					selected_part = selected.val(),
					o_amount = parseFloat(selected.attr('data-outlet_amount')),
					o_main_id = parseFloat(selected.attr('data-parent_id')),
					o_sub_id = parseFloat(selected.attr('data-category_id')),
					o_height = 0,
					o_angle = 0,
					o_drop = 0,
					o_frame = 0;
	 
				var card_ingredients = {'code': selected_part, 'amount': o_amount, 'height': o_height, 'angle': o_angle, 'drop': o_drop, 'parent_id': o_main_id, 'category_id': o_sub_id, 'frame': o_frame};
	 
				card_ingredients_json.push(card_ingredients);
			});
			
			//tulot
			obj.find('.inlet_wrap').each(function() {

				var wrap = $(this),
					selected = wrap.find('option:selected'),
					selected_part = selected.val(),
					o_amount = parseFloat(selected.attr('data-outlet_amount')),
					o_main_id = parseFloat(selected.attr('data-parent_id')),
					o_sub_id = parseFloat(selected.attr('data-category_id')),
					o_height = parseFloat(wrap.find('.inlet_height').val()),
					o_angle = parseFloat(wrap.find('.inlet_angle').val()),
					o_drop = 0,
					o_frame = 0;
	 
				var card_ingredients = {'code': selected_part, 'amount': o_amount, 'height': o_height, 'angle': o_angle, 'drop': o_drop, 'parent_id': o_main_id, 'category_id': o_sub_id, 'frame': o_frame};
	 
				card_ingredients_json.push(card_ingredients);
			});

			var id_runner = 0;
			
			/*
					$.each(card_ingredients_json, function(i, v) {

						if(json_ingredients[id_runner]){
							var db_id = json_ingredients[id_runner].id;
							v['id'] = db_id;
						}

						id_runner++;
						
					});		
			*/

			card_code = {'identifier': obj_id_full, 'amount': 1, 'height_ground': obj_height, 'height_water': 0, 'custom_sakkapesa_length': obj_height_chamber, 'wellgroup': obj_wellgroup, 'ingredients': card_ingredients_json};
			
			if(json_id){
				card_code['id'] = json_id;
			}

			wells_json.push(card_code);

		});
		
		console.log(wells_json);

		if(duplicate == false && cards_found == true){

			spinner.addClass('active');


				$.ajax("/zoning_data/wellorder_references/" + wor + "/update", {
					method: "POST",
					dataType: "json",
					headers: {
					"zoning-token": auth_token,
					},
					data: {
					wells: wells_json,
					},
					error: function (xhr, err, ex) {
					alert("Request failed: " + xhr.statusText);
					spinner.removeClass('active');
					alert(lang_txt["connection_error"]);
					},
					success: function (data, st, xhr) {
					if (typeof data["message"] !== "undefined") alert(data["message"]);
					
						spinner.removeClass('active');
						window.open(base_url+'/heavyuser_wellorders/'+wor);
						
						$('#send_codes').hide();
					
					}
				});

		}
		
		if(cards_found == false){
			alert(lang_txt["upload_file_error"]);
		}

	}




	var parseFile = new uploadFile();
	parseFile.getFile();
	
	
	
